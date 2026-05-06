// FreeFitFuel Engine — Adaptive Planner Layer v1
// Purpose: create a workout-library payload from roadmap, equipment, injuries and engine decisions.
(function(){
  'use strict';

  var KEY_ROADMAP = 'fff.roadmap.plan.v1';
  var KEY_EQUIP = 'fff.equipment.profile.v1';
  var KEY_INJURY = 'fff.injury.profile.v1';
  var KEY_LIBRARY = 'fff.libraryPayload';
  var KEY_CURRENT = 'fff.currentPlan.v1';

  function readJSON(key, fallback){ try{ var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }catch(e){ return fallback; } }
  function writeJSON(key, value){ try{ localStorage.setItem(key, JSON.stringify(value)); return true; }catch(e){ return false; } }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function lower(v){ return String(v || '').toLowerCase(); }
  function has(obj, key){ return !!(obj && (obj[key] || (obj.equip && obj.equip[key]))); }

  var LIB = [
    {key:'dbbench', name:'Dumbbell Bench Press', type:'exercise', equipment:['db','bench'], purposes:['push','chest'], yt:'dumbbell bench press form', avoidIf:['shoulder-severe','biceps-severe'], regressions:['dbfloor','single-arm-dbbench','pushup']},
    {key:'single-arm-dbbench', name:'Single-arm Dumbbell Bench Press', type:'exercise', equipment:['db','bench'], purposes:['push','chest','imbalance'], yt:'single arm dumbbell bench press form', preferIf:['left-right-imbalance','biceps-pain'], regressions:['dbfloor','pushup']},
    {key:'dbfly', name:'Dumbbell Bench Fly', type:'exercise', equipment:['db','bench'], purposes:['chest','accessory'], yt:'dumbbell bench fly form', avoidIf:['shoulder-severe'], regressions:['floor-fly','squeeze-press']},
    {key:'dbfloor', name:'Dumbbell Floor Press', type:'exercise', equipment:['db'], purposes:['push','chest'], yt:'dumbbell floor press form', preferIf:['shoulder-pain','biceps-pain']},
    {key:'pushup', name:'Push-up', type:'exercise', equipment:['bw'], purposes:['push','chest'], yt:'push up form'},
    {key:'csrow', name:'Chest-Supported Dumbbell Row', type:'exercise', equipment:['db','bench'], purposes:['pull','back'], yt:'chest supported dumbbell row form', preferIf:['lower-back','biceps-pain']},
    {key:'single-arm-row', name:'Single-arm Dumbbell Row', type:'exercise', equipment:['db'], purposes:['pull','back','imbalance'], yt:'single arm dumbbell row form', preferIf:['left-right-imbalance']},
    {key:'bandrow', name:'Band Row', type:'exercise', equipment:['band'], purposes:['pull','back'], yt:'resistance band row form'},
    {key:'bandlat', name:'Band Lat Pulldown', type:'exercise', equipment:['band'], purposes:['pull','lats'], yt:'band lat pulldown form'},
    {key:'assisted-pullup', name:'Assisted Pull-up / Band Pull-up', type:'exercise', equipment:['pullup','band'], purposes:['pull','pullup'], yt:'band assisted pull up form', avoidIf:['biceps-severe','shoulder-severe'], regressions:['bandlat','bandrow']},
    {key:'altcurl', name:'Alternating Dumbbell Curl', type:'exercise', equipment:['db'], purposes:['arms','biceps'], yt:'alternating dumbbell curl form', avoidIf:['biceps-moderate','biceps-severe'], regressions:['hammer-curl-light']},
    {key:'bandpushdown', name:'Band Pushdown', type:'exercise', equipment:['band'], purposes:['arms','triceps'], yt:'band tricep pushdown form'},
    {key:'split', name:'Bulgarian Split Squat', type:'exercise', equipment:['db','bench'], purposes:['legs','squat'], yt:'bulgarian split squat form', avoidIf:['knee-severe','hip-severe'], regressions:['stepup','supported-split']},
    {key:'stepup', name:'Step-up', type:'exercise', equipment:['db','step'], purposes:['legs','knee-friendly'], yt:'dumbbell step up form', preferIf:['knee-pain','hip-pain']},
    {key:'glutebridge', name:'Single-leg Glute Bridge', type:'exercise', equipment:['bw'], purposes:['glutes','recovery','hip'], yt:'single leg glute bridge form', preferIf:['hip-pain','knee-pain','left-right-imbalance']},
    {key:'dbrdl', name:'Dumbbell Romanian Deadlift', type:'exercise', equipment:['db'], purposes:['hinge','posterior'], yt:'dumbbell romanian deadlift form', avoidIf:['lower-back-severe'], regressions:['glutebridge']},
    {key:'sideplank', name:'Side Plank', type:'exercise', equipment:['bw'], purposes:['core','stability'], yt:'side plank form'},
    {key:'recovery-flow', name:'Daily Recovery Flow', type:'module', equipment:['bw','band'], purposes:['recovery','mobility'], yt:'glute bridge dead bug side plank band pull apart routine'},
    {key:'ladder-standard', name:'Ladder Challenge', type:'module', equipment:['mixed'], purposes:['benchmark','conditioning'], yt:'ladder workout dumbbell bodyweight'}
  ];

  function equipmentAllowed(item, equip){
    equip = equip || {};
    var equipment = arr(item.equipment);
    if(!equipment.length) return true;
    if(equipment.indexOf('mixed') > -1) return true;
    return equipment.every(function(e){
      if(e === 'bw') return true;
      if(e === 'db') return has(equip,'db') || has(equip,'dumbbells');
      if(e === 'band') return has(equip,'band') || has(equip,'bands');
      if(e === 'bench') return has(equip,'bench');
      if(e === 'step') return has(equip,'step');
      if(e === 'pullup') return has(equip,'pullup') || has(equip,'pullUpBar') || has(equip,'rack');
      return has(equip,e);
    });
  }

  function injuryTokens(profile){
    profile = profile || readJSON(KEY_INJURY, {});
    var out = [];
    arr(profile.selected || profile.issues || profile.injuries).forEach(function(x){ out.push(lower(x)); });
    if(profile.bicepsPain || profile.leftArmPain) out.push('biceps-pain');
    if(profile.rightHipPain || profile.hipPain) out.push('hip-pain');
    if(profile.rightKneePain || profile.kneePain) out.push('knee-pain');
    if(profile.imbalance || profile.leftRightImbalance) out.push('left-right-imbalance');
    if(profile.lowerBack) out.push('lower-back');
    return out;
  }

  function blockedByInjury(item, tokens){
    var avoid = arr(item.avoidIf).map(lower);
    return tokens.some(function(t){ return avoid.indexOf(t) > -1 || avoid.indexOf(t + '-severe') > -1; });
  }

  function scoreItem(item, purpose, tokens){
    var score = 0;
    if(arr(item.purposes).indexOf(purpose) > -1) score += 10;
    tokens.forEach(function(t){ if(arr(item.preferIf).map(lower).indexOf(t) > -1) score += 5; });
    return score;
  }

  function choose(purpose, used, equip, tokens){
    used = used || [];
    var pool = LIB.filter(function(item){
      return equipmentAllowed(item, equip) && !blockedByInjury(item, tokens) && arr(item.purposes).indexOf(purpose) > -1;
    }).sort(function(a,b){ return scoreItem(b,purpose,tokens) - scoreItem(a,purpose,tokens); });
    var pick = pool.filter(function(x){ return used.indexOf(x.key) === -1; })[0] || pool[0] || null;
    if(pick) used.push(pick.key);
    return pick;
  }

  function currentPhase(){
    var roadmap = readJSON(KEY_ROADMAP, null);
    var stage = roadmap && Array.isArray(roadmap.stages) && roadmap.stages[0] ? roadmap.stages[0] : null;
    var text = lower(stage ? (stage.id + ' ' + stage.name + ' ' + stage.blurb) : '');
    if(text.indexOf('cut')>-1 || text.indexOf('fat')>-1) return 'cut';
    if(text.indexOf('maint')>-1 || text.indexOf('bridge')>-1) return 'maintenance';
    if(text.indexOf('build')>-1 || text.indexOf('hypertrophy')>-1) return 'build';
    return 'recomp';
  }

  function buildSessions(options){
    options = options || {};
    var equip = options.equip || readJSON(KEY_EQUIP, { equip:{ db:true, band:true, bw:true, bench:true, step:true, pullup:true }});
    var tokens = injuryTokens(options.injuries);
    var phase = options.phase || currentPhase();
    var style = options.style || (phase === 'cut' ? 'preserve-strength' : phase === 'build' ? 'hypertrophy' : 'balanced');
    var days = parseInt(options.days || 4, 10);
    var used = [];
    function item(p){ return choose(p, used, equip, tokens); }
    var sessions = [
      { title:'Upper Push', subtitle: phase === 'cut' ? 'Preserve strength with controlled pressing' : 'Build pressing capacity', items:[item('push'), item('chest'), item('arms')].filter(Boolean), extras:['Use Exercise Form Guide for tempo and pain-free range'] },
      { title:'Upper Pull', subtitle:'Back, pull-up progression and arm-safe pulling', items:[item('pull'), item('pullup'), item('back')].filter(Boolean), extras:['Use Pull-up Progression if full reps are not ready'] },
      { title:'Lower + Stability', subtitle:'Hip/knee-aware lower body and trunk', items:[item('knee-friendly'), item('hinge'), item('glutes'), item('core')].filter(Boolean), extras:['Use Mobility & Pain if pain rises above 2'] },
      { title:'Recovery / Conditioning', subtitle:'Keep the plan repeatable', items:[item('recovery'), item('conditioning')].filter(Boolean), extras:['Use Daily Recovery Flow; keep impact low if knee/hip pain is active'] }
    ];
    if(days >= 5){ sessions.push({ title:'Benchmark / Optional', subtitle:'Only if recovery is good', items:[choose('benchmark', used, equip, tokens)].filter(Boolean), extras:['Skip this if pain, fatigue or sleep debt is high'] }); }
    return sessions.slice(0, Math.max(1, days));
  }

  function buildPayload(options){
    var sessions = buildSessions(options);
    var equip = (options && options.equip) || readJSON(KEY_EQUIP, {});
    var payload = {
      source:'fff-planner',
      version:1,
      style:(options && options.style) || 'adaptive',
      phase:(options && options.phase) || currentPhase(),
      equip:equip,
      injuryProfile: injuryTokens(options && options.injuries),
      sessions:sessions.map(function(s, idx){
        return {
          day:idx+1,
          title:s.title,
          subtitle:s.subtitle,
          items:arr(s.items).map(function(item){ return {
            key:item.key,
            name:item.name,
            type:item.type,
            equipment:item.equipment,
            purposes:item.purposes,
            yt:item.yt,
            regressions:item.regressions || [],
            avoidIf:item.avoidIf || [],
            preferIf:item.preferIf || []
          };}),
          extras:s.extras || []
        };
      }),
      requestedAt:Date.now()
    };
    writeJSON(KEY_LIBRARY, payload);
    writeJSON(KEY_CURRENT, { style:payload.style, phase:payload.phase, days:String(payload.sessions.length), payload:payload });
    return payload;
  }

  window.FFFPlanner = {
    version:'1.0',
    keys:{ roadmap:KEY_ROADMAP, equipment:KEY_EQUIP, injury:KEY_INJURY, library:KEY_LIBRARY, current:KEY_CURRENT },
    library:LIB,
    injuryTokens:injuryTokens,
    buildSessions:buildSessions,
    buildPayload:buildPayload,
    currentPhase:currentPhase
  };
})();
