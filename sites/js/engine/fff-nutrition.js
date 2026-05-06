// FreeFitFuel Engine — Adaptive Nutrition Layer v1
// Purpose: provide phase-aware calorie and macro guidance from roadmap + check-in signals.
(function(){
  'use strict';

  var KEY_TARGETS = 'fff.nutrition.targets.v1';
  var KEY_CHECKINS = 'fff.weekly.checkins.v1';
  var KEY_ROADMAP = 'fff.roadmap.plan.v1';
  var KEY_WEIGHT = 'fff.weight.log.v1';

  function readJSON(key, fallback){
    try{ var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch(err){ return fallback; }
  }
  function writeJSON(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(err){ return false; }
  }
  function num(v, fb){ var n = parseFloat(v); return isNaN(n) ? (fb == null ? null : fb) : n; }
  function clamp(n,a,b){ return Math.max(a, Math.min(b, n)); }
  function round(n, step){ step = step || 5; return Math.round(n / step) * step; }
  function last(arr){ return Array.isArray(arr) && arr.length ? arr[arr.length-1] : null; }
  function prev(arr){ return Array.isArray(arr) && arr.length > 1 ? arr[arr.length-2] : null; }

  function phaseFromRoadmap(roadmap){
    roadmap = roadmap || readJSON(KEY_ROADMAP, null);
    var stage = roadmap && Array.isArray(roadmap.stages) && roadmap.stages.length ? roadmap.stages[0] : null;
    var blob = String((stage && (stage.id + ' ' + stage.name + ' ' + stage.focus + ' ' + stage.blurb)) || '').toLowerCase();
    if(blob.indexOf('cut')>-1 || blob.indexOf('fat')>-1 || blob.indexOf('waist')>-1 || blob.indexOf('deficit')>-1) return 'cut';
    if(blob.indexOf('maint')>-1 || blob.indexOf('bridge')>-1 || blob.indexOf('stabil')>-1) return 'maintenance';
    if(blob.indexOf('build')>-1 || blob.indexOf('hypertrophy')>-1 || blob.indexOf('muscle')>-1 || blob.indexOf('bulk')>-1) return 'build';
    if(roadmap && roadmap.goal){
      var g = String(roadmap.goal).toLowerCase();
      if(g.indexOf('cut')>-1 || g.indexOf('fat')>-1 || g.indexOf('lose')>-1) return 'cut';
      if(g.indexOf('build')>-1 || g.indexOf('muscle')>-1) return 'build';
    }
    return 'recomp';
  }

  function estimateMaintenance(profile){
    profile = profile || {};
    var weight = num(profile.weightKg || profile.weight || profile.currentWeight, null);
    var activity = String(profile.activity || profile.activityLevel || 'moderate').toLowerCase();
    var multiplier = 30;
    if(activity.indexOf('low')>-1 || activity.indexOf('sedentary')>-1) multiplier = 26;
    if(activity.indexOf('high')>-1 || activity.indexOf('active')>-1) multiplier = 34;
    if(!weight){
      var logs = readJSON(KEY_WEIGHT, []);
      var latest = last(logs);
      weight = latest ? num(latest.weight, null) : null;
    }
    return weight ? round(weight * multiplier, 25) : null;
  }

  function checkinSignals(){
    var history = readJSON(KEY_CHECKINS, []);
    var l = last(history), p = prev(history);
    var weightDelta = l && p && l.weight_avg != null && p.weight_avg != null ? num(l.weight_avg,0) - num(p.weight_avg,0) : null;
    var waistDelta = l && p && l.waist_cm != null && p.waist_cm != null ? num(l.waist_cm,0) - num(p.waist_cm,0) : null;
    return {
      latest: l,
      previous: p,
      weightDelta: weightDelta,
      waistDelta: waistDelta,
      energy: l ? num(l.energy, 3) : 3,
      recovery: l ? num(l.recovery, 3) : 3,
      hunger: l ? num(l.hunger, 3) : 3,
      sleep: l ? num(l.sleep, 3) : 3,
      nutrition: l ? num(l.adherence_nutrition, 3) : 3,
      training: l ? num(l.adherence_training, 3) : 3
    };
  }

  function targetFromPhase(maintenance, phase, currentKcal){
    if(currentKcal) return currentKcal;
    if(!maintenance){
      if(phase === 'cut') return 1600;
      if(phase === 'maintenance') return 1800;
      if(phase === 'build') return 1950;
      return 1750;
    }
    if(phase === 'cut') return round(maintenance - 350, 25);
    if(phase === 'maintenance') return round(maintenance, 25);
    if(phase === 'build') return round(maintenance + 200, 25);
    return round(maintenance - 150, 25);
  }

  function proteinTarget(weight, phase){
    if(!weight) return phase === 'cut' ? 130 : 125;
    var perKg = phase === 'cut' ? 1.9 : 1.7;
    if(phase === 'build') perKg = 1.8;
    return round(clamp(weight * perKg, 90, 190), 5);
  }

  function macroRanges(kcal, protein, phase, signals){
    var proteinKcal = protein * 4;
    var fatMin = phase === 'cut' ? 40 : 50;
    var fatMax = phase === 'build' ? 80 : 70;
    var fatBase = phase === 'cut' ? 45 : (phase === 'build' ? 60 : 55);
    if(signals.hunger >= 4 && phase !== 'build') fatBase += 5;
    if(signals.energy <= 2 || signals.training <= 2) fatBase -= 5;
    var fat = clamp(fatBase, fatMin, fatMax);
    var carb = Math.max(60, (kcal - proteinKcal - fat*9) / 4);
    var carbLow = round(carb - 20, 5);
    var carbHigh = round(carb + 20, 5);
    return {
      protein: { target: protein, low: Math.max(80, protein - 10), high: protein + 10 },
      carbs: { target: round(carb, 5), low: Math.max(50, carbLow), high: carbHigh },
      fats: { target: round(fat, 5), low: Math.max(35, fat - 10), high: fat + 10 }
    };
  }

  function recommendation(input){
    input = input || {};
    var roadmap = input.roadmap || readJSON(KEY_ROADMAP, null);
    var phase = input.phase || phaseFromRoadmap(roadmap);
    var signals = input.signals || checkinSignals();
    var profile = input.profile || {};
    var currentTargets = readJSON(KEY_TARGETS, {});
    var maintenance = num(input.maintenance, null) || estimateMaintenance(profile);
    var currentKcal = num(input.currentKcal || currentTargets.kcal, null);
    var kcal = targetFromPhase(maintenance, phase, currentKcal);
    var reasons = [];

    if(phase === 'cut'){
      if(signals.weightDelta != null && signals.weightDelta < -1){ kcal += 100; reasons.push('Weight is dropping quickly, so the deficit should not be pushed harder.'); }
      if(signals.waistDelta != null && signals.waistDelta >= 0 && signals.nutrition >= 4 && signals.recovery >= 3){ kcal -= 75; reasons.push('Waist is not moving despite decent adherence, so a small reduction is reasonable.'); }
      if(signals.energy <= 2 || signals.recovery <= 2){ kcal += 75; reasons.push('Energy or recovery is low, so recovery support beats further restriction.'); }
    }
    if(phase === 'maintenance'){
      if(signals.energy <= 2 || signals.recovery <= 2){ kcal += 75; reasons.push('Maintenance bridge should help recovery catch up.'); }
      if(signals.waistDelta != null && signals.waistDelta > 1){ kcal -= 75; reasons.push('Waist increased quickly, so maintenance needs tightening.'); }
    }
    if(phase === 'build'){
      if(signals.waistDelta != null && signals.waistDelta > 1){ kcal -= 100; reasons.push('Waist is rising too quickly for a lean-build phase.'); }
      if(signals.training >= 4 && signals.energy >= 3 && signals.recovery >= 3){ kcal += 50; reasons.push('Performance conditions are good enough for a small growth-supporting nudge.'); }
    }

    kcal = round(clamp(kcal, 1200, 3500), 25);
    var weight = num(profile.weightKg || profile.weight || (signals.latest && signals.latest.weight_avg), null);
    var protein = proteinTarget(weight, phase);
    var macros = macroRanges(kcal, protein, phase, signals);
    var output = {
      phase: phase,
      calories: { target: kcal, low: kcal - 75, high: kcal + 75, maintenanceEstimate: maintenance },
      macros: macros,
      reasons: reasons.length ? reasons : ['Targets are being held steady until the trend gives a clearer reason to move.'],
      foodStrategy: phase === 'build' ? 'Add affordable carbs around training first, then fats if appetite is low.' : 'Protect protein first, then use simple carbs and fats to keep adherence realistic.'
    };
    writeJSON(KEY_TARGETS, output);
    return output;
  }

  window.FFFNutrition = {
    version: '1.0',
    keys: { targets: KEY_TARGETS, checkins: KEY_CHECKINS, roadmap: KEY_ROADMAP, weight: KEY_WEIGHT },
    phaseFromRoadmap: phaseFromRoadmap,
    estimateMaintenance: estimateMaintenance,
    checkinSignals: checkinSignals,
    recommendation: recommendation,
    saveTargets: function(targets){ return writeJSON(KEY_TARGETS, targets || {}); },
    getTargets: function(){ return readJSON(KEY_TARGETS, {}); }
  };
})();
