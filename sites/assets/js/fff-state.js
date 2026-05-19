/*
  FreeFitFuel™ Shared State Layer
  Path: /assets/js/fff-state.js or /js/engine/fff-state.js
  Purpose:
    Central shared state access for My Plan, Nutrition, Workouts, Recovery Systems and future tracker hooks.

  Design rules:
    - No external dependencies.
    - UK English.
    - Does not take over existing pages by force.
    - Safe to add before refactoring pages to use it.
    - Preserves existing localStorage keys.
    - Adds validation, versioning, migration helpers and safe fallbacks.
*/

(function () {
  'use strict';

  var STATE_VERSION = 1;

  var KEYS = {
    stateVersion: 'fff.state.version.v1',

    roadmap: 'fff.roadmap.plan.v1',
    currentPlan: 'fff.currentPlan.v1',

    equipmentProfile: 'fff.equipment.profile.v1',

    weeklyCheckins: 'fff.weekly.checkins.v1',
    weightLog: 'fff.weight.log.v1',
    targetWeight: 'fff.target.weight.v1',

    phaseAutomationLast: 'fff.phase.automation.last.v1',
    phaseOverride: 'fff.phase.override.v1',

    wellnessChecks: 'fff.checks.v1',
    workoutLogs: 'fff.logs.v1',
    personalBests: 'fff.pb.v1',
    coaching: 'fff.coaching.v1',

    libraryPayload: 'fff.libraryPayload'
  };

  function nowISODate() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function safeParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function readJSON(key, fallback) {
    return safeParse(localStorage.getItem(key), fallback);
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn('[FFFState] Failed to write key:', key, err);
      return false;
    }
  }

  function removeKey(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  }

  function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  function numberOrNull(value) {
    var n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function stringOrEmpty(value) {
    return value == null ? '' : String(value);
  }

  function clone(value) {
    return safeParse(JSON.stringify(value), value);
  }

  function defaultEquipmentProfile() {
    return {
      environment: 'home',
      equip: {
        bw: true,
        db: true,
        band: true,
        rack: false,
        rings: false,
        bench: false,
        kb: false,
        cardio: false,
        gymAccess: false
      }
    };
  }

  function normaliseEquipmentProfile(profile) {
    var defaults = defaultEquipmentProfile();
    if (!isPlainObject(profile)) return defaults;

    return {
      environment: stringOrEmpty(profile.environment || defaults.environment) || defaults.environment,
      equip: Object.assign({}, defaults.equip, isPlainObject(profile.equip) ? profile.equip : {})
    };
  }

  function loadLegacyWorkoutPrefs() {
    var old = readJSON('fff.workouts.v1.prefs', null);
    if (!old || !old.equip) return null;

    return normaliseEquipmentProfile({
      environment: 'home',
      equip: {
        bw: !!old.equip.bw,
        db: !!old.equip.db,
        band: !!old.equip.band,
        rack: !!old.equip.rack,
        rings: !!old.equip.rings,
        bench: false,
        kb: false,
        cardio: false,
        gymAccess: false
      }
    });
  }

  function getEquipmentProfile() {
    var saved = readJSON(KEYS.equipmentProfile, null);
    if (saved && saved.equip) return normaliseEquipmentProfile(saved);
    return loadLegacyWorkoutPrefs() || defaultEquipmentProfile();
  }

  function saveEquipmentProfile(profile) {
    return writeJSON(KEYS.equipmentProfile, normaliseEquipmentProfile(profile));
  }

  function validateTargets(targets) {
    if (!isPlainObject(targets)) return null;

    var kcal = numberOrNull(targets.kcal);
    var protein = numberOrNull(targets.protein);
    var carbs = numberOrNull(targets.carbs);
    var fats = numberOrNull(targets.fats);

    if (!kcal && !protein && !carbs && !fats) return null;

    return {
      kcal: kcal,
      protein: protein,
      carbs: carbs,
      fats: fats,
      mode: stringOrEmpty(targets.mode),
      hydration_l: numberOrNull(targets.hydration_l),
      hydration_breakdown: stringOrEmpty(targets.hydration_breakdown),
      regime: stringOrEmpty(targets.regime),
      reasons: Array.isArray(targets.reasons) ? targets.reasons.slice() : []
    };
  }

  function validateStage(stage) {
    if (!isPlainObject(stage)) return null;

    var clean = Object.assign({}, stage);
    clean.id = stringOrEmpty(stage.id);
    clean.name = stringOrEmpty(stage.name || stage.id || 'Current Phase');
    clean.targets = validateTargets(stage.targets);

    return clean;
  }

  function validateRoadmap(roadmap) {
    if (!isPlainObject(roadmap)) return null;

    var stages = Array.isArray(roadmap.stages)
      ? roadmap.stages.map(validateStage).filter(Boolean)
      : [];

    if (!stages.length) return null;

    var clean = Object.assign({}, roadmap);
    clean.version = numberOrNull(roadmap.version) || STATE_VERSION;
    clean.goal = stringOrEmpty(roadmap.goal || 'Maintain');
    clean.stages = stages;
    clean.completedStages = Array.isArray(roadmap.completedStages) ? roadmap.completedStages.slice() : [];
    clean.equipmentProfile = roadmap.equipmentProfile
      ? normaliseEquipmentProfile(roadmap.equipmentProfile)
      : getEquipmentProfile();

    return clean;
  }

  function getRoadmap() {
    return validateRoadmap(readJSON(KEYS.roadmap, null));
  }

  function saveRoadmap(roadmap) {
    var clean = validateRoadmap(roadmap);
    if (!clean) return false;

    clean.version = STATE_VERSION;
    clean.updated_at = new Date().toISOString();

    if (!clean.equipmentProfile) {
      clean.equipmentProfile = getEquipmentProfile();
    }

    writeJSON(KEYS.roadmap, clean);
    syncCurrentPlanFromRoadmap(clean);
    return true;
  }

  function getCurrentPhase() {
    var roadmap = getRoadmap();
    if (!roadmap || !Array.isArray(roadmap.stages) || !roadmap.stages.length) return null;
    return roadmap.stages[0] || null;
  }

  function getNextPhase() {
    var roadmap = getRoadmap();
    if (!roadmap || !Array.isArray(roadmap.stages) || roadmap.stages.length < 2) return null;
    return roadmap.stages[1] || null;
  }

  function getTargets() {
    var phase = getCurrentPhase();
    if (phase && phase.targets) {
      return {
        source: 'roadmap',
        phase: phase,
        targets: clone(phase.targets)
      };
    }

    var current = readJSON(KEYS.currentPlan, null);
    if (current && current.targets) {
      var clean = validateTargets(current.targets);
      if (clean) {
        return {
          source: 'currentPlan',
          phase: current.phase || null,
          targets: clean
        };
      }
    }

    return null;
  }

  function syncCurrentPlanFromRoadmap(roadmapInput) {
    var roadmap = validateRoadmap(roadmapInput || getRoadmap());
    if (!roadmap) return false;

    var current = roadmap.stages[0];
    if (!current) return false;

    var payload = {
      version: STATE_VERSION,
      source: 'fff.roadmap.plan.v1',
      updated_at: new Date().toISOString(),
      goal: roadmap.goal || '',
      phase: {
        id: current.id || '',
        name: current.name || ''
      },
      targets: current.targets || null,
      roadmapMode: roadmap.roadmapMode || '',
      aggression: roadmap.aggression || '',
      equipmentProfile: roadmap.equipmentProfile || getEquipmentProfile()
    };

    return writeJSON(KEYS.currentPlan, payload);
  }

  function repairCurrentPlan() {
    var targetSet = getTargets();
    if (targetSet && targetSet.source === 'roadmap') {
      return syncCurrentPlanFromRoadmap();
    }
    return !!targetSet;
  }

  function getWeightLog() {
    var arr = readJSON(KEYS.weightLog, []);
    return Array.isArray(arr) ? arr : [];
  }

  function saveWeightLog(log) {
    return writeJSON(KEYS.weightLog, Array.isArray(log) ? log : []);
  }

  function addWeightEntry(weight, note, date) {
    var n = numberOrNull(weight);
    if (!n) return false;

    var log = getWeightLog();
    log.push({
      date: date || nowISODate(),
      weight: n,
      note: stringOrEmpty(note)
    });

    return saveWeightLog(log);
  }

  function getRecentWeightAverage(count) {
    var log = getWeightLog();
    if (!log.length) return null;

    var slice = log.slice(Math.max(0, log.length - (count || 7)));
    var valid = slice.map(function (entry) {
      return numberOrNull(entry.weight);
    }).filter(function (n) {
      return n !== null;
    });

    if (!valid.length) return null;

    var total = valid.reduce(function (sum, n) { return sum + n; }, 0);
    return Math.round((total / valid.length) * 100) / 100;
  }

  function getTargetWeight() {
    var raw = localStorage.getItem(KEYS.targetWeight);
    if (raw == null || raw === '') return null;
    return numberOrNull(raw);
  }

  function saveTargetWeight(value) {
    var n = numberOrNull(value);
    if (!n) return removeKey(KEYS.targetWeight);

    try {
      localStorage.setItem(KEYS.targetWeight, String(n));
      return true;
    } catch (err) {
      return false;
    }
  }

  function getWeeklyCheckins() {
    var arr = readJSON(KEYS.weeklyCheckins, []);
    return Array.isArray(arr) ? arr : [];
  }

  function saveWeeklyCheckins(checkins) {
    return writeJSON(KEYS.weeklyCheckins, Array.isArray(checkins) ? checkins : []);
  }

  function getLatestCheckin() {
    var history = getWeeklyCheckins();
    return history.length ? history[history.length - 1] : null;
  }

  function addWeeklyCheckin(entry) {
    if (!isPlainObject(entry)) return false;
    var history = getWeeklyCheckins();
    var clean = Object.assign({}, entry);
    clean.date = clean.date || nowISODate();
    history.push(clean);
    return saveWeeklyCheckins(history);
  }

  function getPhaseOverride() {
    return readJSON(KEYS.phaseOverride, null);
  }

  function savePhaseOverride(data) {
    if (!isPlainObject(data)) return false;
    var clean = Object.assign({}, data);
    clean.date = clean.date || nowISODate();
    return writeJSON(KEYS.phaseOverride, clean);
  }

  function clearPhaseOverride() {
    return removeKey(KEYS.phaseOverride);
  }

  function getLastAutomationEvent() {
    return readJSON(KEYS.phaseAutomationLast, null);
  }

  function saveLastAutomationEvent(event) {
    if (!isPlainObject(event)) return false;
    var clean = Object.assign({}, event);
    clean.date = clean.date || nowISODate();
    return writeJSON(KEYS.phaseAutomationLast, clean);
  }

  function buildProfileSignals() {
    var latest = getLatestCheckin();
    var roadmap = getRoadmap();
    var targets = getTargets();
    var equipment = getEquipmentProfile();

    var profile = {
      hasRoadmap: !!roadmap,
      hasTargets: !!targets,
      currentPhaseId: '',
      currentPhaseName: '',
      goal: roadmap ? stringOrEmpty(roadmap.goal) : '',
      equipmentProfile: equipment,

      recoveryNeed: false,
      lowEnergy: false,
      stressSupport: false,
      returningAfterBreak: false,
      beginner: false,
      over40Support: false,

      kneePain: false,
      hipPain: false,
      lowerBodyPain: false,
      walkingPain: false,
      runningPlan: false,
      stiffness: false,
      deskbound: false,
      pullUpGoal: false,
      upperBodyStrength: false,
      elbowPain: false,
      bicepsPain: false,
      pressingPain: false,
      balanceNeed: false,
      lowerLegWeakness: false,

      acuteInjury: false,
      unexplainedSwelling: false,
      medicalRedFlag: false
    };

    var current = getCurrentPhase();
    if (current) {
      profile.currentPhaseId = current.id || '';
      profile.currentPhaseName = current.name || '';
    }

    if (roadmap && roadmap.trainingStatus === 'beginner') profile.beginner = true;

    var notes = stringOrEmpty(latest && latest.notes).toLowerCase();
    var emotion = stringOrEmpty(latest && latest.emotional_level).toLowerCase();
    var recovery = numberOrNull(latest && latest.recovery);
    var energy = numberOrNull(latest && latest.energy);
    var sleep = numberOrNull(latest && latest.sleep);
    var trainingAdherence = numberOrNull(latest && latest.adherence_training);

    if (recovery !== null && recovery <= 3) profile.recoveryNeed = true;
    if (sleep !== null && sleep <= 2) profile.recoveryNeed = true;
    if (energy !== null && energy <= 2) profile.lowEnergy = true;
    if (emotion === 'drained' || emotion === 'flat') profile.lowEnergy = true;
    if (notes.indexOf('stress') > -1 || emotion === 'drained' || emotion === 'flat') profile.stressSupport = true;
    if (trainingAdherence !== null && trainingAdherence <= 2) profile.returningAfterBreak = true;

    var searchText = [
      notes,
      JSON.stringify(roadmap || {}).toLowerCase(),
      JSON.stringify(targets || {}).toLowerCase()
    ].join(' ');

    if (/knee|patella|stairs|squat pain|lunge pain/.test(searchText)) {
      profile.kneePain = true;
      profile.lowerBodyPain = true;
    }
    if (/hip|groin|glute/.test(searchText)) {
      profile.hipPain = true;
      profile.lowerBodyPain = true;
    }
    if (/walk|walking pain|steps/.test(searchText)) profile.walkingPain = true;
    if (/run|running|10k|5k|half marathon|marathon/.test(searchText)) profile.runningPlan = true;
    if (/stiff|tight|mobility|restricted|fascia|sitting/.test(searchText)) profile.stiffness = true;
    if (/desk|sitting|sedentary|office/.test(searchText)) profile.deskbound = true;
    if (/pull.?up|chin.?up/.test(searchText)) profile.pullUpGoal = true;
    if (/upper body|strength|build|bulk|transform/.test(searchText)) profile.upperBodyStrength = true;
    if (/elbow|tennis elbow/.test(searchText)) profile.elbowPain = true;
    if (/bicep|biceps/.test(searchText)) profile.bicepsPain = true;
    if (/press|bench|pressing pain/.test(searchText)) profile.pressingPain = true;
    if (/balance|ankle|calf|foot|feet/.test(searchText)) profile.balanceNeed = true;
    if (/lower leg|shin|ankle|calf|foot|feet/.test(searchText)) profile.lowerLegWeakness = true;

    if (/acute|severe|swelling|redness|locking|numbness|chest pain|dizzy|dizziness/.test(searchText)) profile.acuteInjury = true;
    if (/swelling|heat|redness|locking/.test(searchText)) profile.unexplainedSwelling = true;
    if (/red flag|medical|doctor|hospital|a&e|emergency/.test(searchText)) profile.medicalRedFlag = true;

    return profile;
  }

  function getSystemsForCurrentProfile() {
    if (!window.FFFSystems || typeof window.FFFSystems.getSystemsForPlan !== 'function') return [];
    return window.FFFSystems.getSystemsForPlan(buildProfileSignals());
  }

  function getStateSummary() {
    var roadmap = getRoadmap();
    var current = getCurrentPhase();
    var targets = getTargets();
    var checkins = getWeeklyCheckins();
    var weights = getWeightLog();

    return {
      version: STATE_VERSION,
      hasRoadmap: !!roadmap,
      currentPhase: current ? { id: current.id, name: current.name } : null,
      targetSource: targets ? targets.source : null,
      targets: targets ? targets.targets : null,
      checkinCount: checkins.length,
      weightEntryCount: weights.length,
      recentWeightAverage: getRecentWeightAverage(7),
      equipmentProfile: getEquipmentProfile(),
      latestCheckin: getLatestCheckin(),
      systemsProfile: buildProfileSignals()
    };
  }

  function migrate() {
    var existingVersion = Number(localStorage.getItem(KEYS.stateVersion) || '0');

    if (existingVersion < 1) {
      var roadmap = getRoadmap();
      if (roadmap) {
        saveRoadmap(roadmap);
      }

      var equipment = getEquipmentProfile();
      saveEquipmentProfile(equipment);

      localStorage.setItem(KEYS.stateVersion, String(STATE_VERSION));
    }

    repairCurrentPlan();
  }

  function clearGeneratedStateOnly() {
    [
      KEYS.weeklyCheckins,
      KEYS.weightLog,
      KEYS.phaseAutomationLast,
      KEYS.phaseOverride,
      KEYS.wellnessChecks,
      KEYS.workoutLogs,
      KEYS.personalBests,
      KEYS.coaching
    ].forEach(removeKey);

    return true;
  }

  var API = {
    version: STATE_VERSION,
    keys: Object.assign({}, KEYS),

    safeParse: safeParse,
    readJSON: readJSON,
    writeJSON: writeJSON,

    nowISODate: nowISODate,

    getRoadmap: getRoadmap,
    saveRoadmap: saveRoadmap,
    validateRoadmap: validateRoadmap,

    getCurrentPhase: getCurrentPhase,
    getNextPhase: getNextPhase,

    getTargets: getTargets,
    validateTargets: validateTargets,
    syncCurrentPlanFromRoadmap: syncCurrentPlanFromRoadmap,
    repairCurrentPlan: repairCurrentPlan,

    getEquipmentProfile: getEquipmentProfile,
    saveEquipmentProfile: saveEquipmentProfile,
    defaultEquipmentProfile: defaultEquipmentProfile,

    getWeeklyCheckins: getWeeklyCheckins,
    saveWeeklyCheckins: saveWeeklyCheckins,
    addWeeklyCheckin: addWeeklyCheckin,
    getLatestCheckin: getLatestCheckin,

    getWeightLog: getWeightLog,
    saveWeightLog: saveWeightLog,
    addWeightEntry: addWeightEntry,
    getRecentWeightAverage: getRecentWeightAverage,

    getTargetWeight: getTargetWeight,
    saveTargetWeight: saveTargetWeight,

    getPhaseOverride: getPhaseOverride,
    savePhaseOverride: savePhaseOverride,
    clearPhaseOverride: clearPhaseOverride,

    getLastAutomationEvent: getLastAutomationEvent,
    saveLastAutomationEvent: saveLastAutomationEvent,

    buildProfileSignals: buildProfileSignals,
    getSystemsForCurrentProfile: getSystemsForCurrentProfile,

    getStateSummary: getStateSummary,
    migrate: migrate,
    clearGeneratedStateOnly: clearGeneratedStateOnly
  };

  window.FFFState = API;

  try {
    migrate();
  } catch (err) {
    console.warn('[FFFState] Migration failed safely:', err);
  }
})();
