// FreeFitFuel Engine — Core Coordinator

window.FFF = (function () {
  'use strict';

  function ensureDeps() {
    var missing = [];

    if (!window.FFFState) missing.push('FFFState');
    if (!window.FFFExerciseDB) missing.push('FFFExerciseDB');
    if (!window.FFFRecovery) missing.push('FFFRecovery');
    if (!window.FFFMind) missing.push('FFFMind');
    if (!window.FFFRoadmap) missing.push('FFFRoadmap');
    if (!window.FFFTraining) missing.push('FFFTraining');
    if (!window.FFFMessaging) missing.push('FFFMessaging');

    if (missing.length) {
      throw new Error('FreeFitFuel engine missing dependencies: ' + missing.join(', '));
    }
  }

  function ready() {
    ensureDeps();
    window.FFFState.load();
    return true;
  }

  function toNumber(v) {
    var n = Number(v);
    return isNaN(n) ? 0 : n;
  }

  function score(weight, reps) {
    return toNumber(weight) * toNumber(reps);
  }

  function getRoadmapRaw() {
    ready();

    if (typeof window.FFFState.getRoadmap === 'function') {
      return window.FFFState.getRoadmap() || null;
    }

    try {
      var raw = localStorage.getItem('fff.roadmap.plan.v1');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function getRoadmapSummary() {
    ready();
    return window.FFFRoadmap.summarise(getRoadmapRaw());
  }

  function setPB(exercise, weight, reps) {
    ready();

    var current = window.FFFState.getPB(exercise);
    var nextScore = score(weight, reps);

    if (!current || nextScore > toNumber(current.score)) {
      window.FFFState.setPB(exercise, {
        weight: toNumber(weight),
        reps: toNumber(reps),
        score: nextScore,
        date: window.FFFState.nowISO()
      });
      return true;
    }

    return false;
  }

  function getPB(exercise) {
    ready();
    return window.FFFState.getPB(exercise) || null;
  }

  function logSet(exercise, weight, reps, notes) {
    ready();

    var entry = {
      weight: toNumber(weight),
      reps: toNumber(reps),
      notes: String(notes || ''),
      date: window.FFFState.nowISO()
    };

    window.FFFState.appendLog(exercise, entry);
    var isNewPB = setPB(exercise, weight, reps);

    return {
      entry: entry,
      isNewPB: isNewPB
    };
  }

  function getLogs(exercise) {
    ready();
    return window.FFFState.getLogs(exercise) || [];
  }

  function getLatestLog(exercise) {
    var logs = getLogs(exercise);
    return logs.length ? logs[logs.length - 1] : null;
  }

  function setCheck(name, value) {
    ready();
    return window.FFFState.setCheck(name, !!value);
  }

  function getCheck(name) {
    ready();
    return !!window.FFFState.getCheck(name);
  }

  function getAllChecks() {
    ready();
    return window.FFFState.getChecks() || {};
  }

  function clearChecks() {
    ready();
    if (typeof window.FFFState.clearChecks === 'function') {
      window.FFFState.clearChecks();
    } else {
      localStorage.removeItem('fff.checks.v1');
      window.FFFState.load();
    }
  }

  function getCheckScore() {
    ready();
    return window.FFFRecovery.scoreChecks(window.FFFState.getChecks());
  }

  function getTotalLogCount() {
    ready();
    return window.FFFState.getTotalLogCount();
  }

  function getExerciseTrend(exercise) {
    ready();
    return window.FFFTraining.getTrend(window.FFFState.getLogs(exercise));
  }

  function getFamilySummary() {
    ready();
    var allLogs = window.FFFState.getAllLogs ? window.FFFState.getAllLogs() : {};
    var checks = window.FFFState.getChecks() || {};
    var recovery = window.FFFRecovery.analyse(checks, allLogs);
    return window.FFFTraining.summariseFamilies(allLogs, recovery);
  }

  function getWeeklySummary() {
    ready();
    var allLogs = window.FFFState.getAllLogs ? window.FFFState.getAllLogs() : {};
    var checks = window.FFFState.getChecks() || {};
    var roadmapSummary = getRoadmapSummary();
    var recovery = window.FFFRecovery.analyse(checks, allLogs);
    return window.FFFTraining.weeklySummary(allLogs, recovery, roadmapSummary);
  }

  function analyseExercise(exercise) {
    ready();

    var logs = window.FFFState.getLogs(exercise) || [];
    var checks = window.FFFState.getChecks() || {};
    var allLogs = window.FFFState.getAllLogs ? window.FFFState.getAllLogs() : {};
    var roadmapSummary = getRoadmapSummary();

    var recovery = window.FFFRecovery.analyse(checks, allLogs);
    var mind = window.FFFMind.analyse(allLogs, checks);
    var profile = window.FFFExerciseDB.getExerciseProfile(exercise);

    var decision = window.FFFTraining.decideExercise(
      profile,
      logs,
      recovery,
      mind,
      roadmapSummary
    );

    var message = window.FFFMessaging.exerciseMessage(decision);

    return {
      exercise: exercise,
      profile: profile,
      logs: logs,
      latest: logs.length ? logs[logs.length - 1] : null,
      pb: window.FFFState.getPB(exercise) || null,
      trend: decision && decision.trend ? decision.trend : window.FFFTraining.getTrend(logs),
      longTrend: decision && decision.longTrend ? decision.longTrend : 'unknown',
      recovery: recovery,
      mind: mind,
      roadmap: roadmapSummary,
      decision: decision,
      headline: message.headline,
      message: message.message,
      status: decision && decision.action ? decision.action : 'unknown'
    };
  }

  function getGlobalCoachingSummary() {
    ready();

    var checks = window.FFFState.getChecks() || {};
    var allLogs = window.FFFState.getAllLogs ? window.FFFState.getAllLogs() : {};
    var roadmapSummary = getRoadmapSummary();
    var recovery = window.FFFRecovery.analyse(checks, allLogs);
    var mind = window.FFFMind.analyse(allLogs, checks);
    var totalLogs = window.FFFState.getTotalLogCount();

    var globalDecision = window.FFFTraining.decideGlobal(
      recovery,
      mind,
      roadmapSummary,
      totalLogs,
      allLogs
    );

    var message = window.FFFMessaging.globalMessage(
      globalDecision,
      recovery,
      mind
    );

    return {
      headline: message.headline,
      message: message.message,
      recovery: recovery,
      mind: mind,
      roadmap: roadmapSummary,
      totalLogs: totalLogs,
      mode: globalDecision && globalDecision.mode ? globalDecision.mode : 'unknown',
      tone: globalDecision && globalDecision.tone ? globalDecision.tone : 'grounded',
      reason: globalDecision && globalDecision.reason ? globalDecision.reason : [],
      familySummary: globalDecision && globalDecision.familySummary ? globalDecision.familySummary : {},
      strongestFamily: globalDecision && globalDecision.strongestFamily ? globalDecision.strongestFamily : null,
      weakestFamily: globalDecision && globalDecision.weakestFamily ? globalDecision.weakestFamily : null,
      weekly: globalDecision && globalDecision.weekly ? globalDecision.weekly : {},
      strain: globalDecision && globalDecision.strain ? globalDecision.strain : {},
      progressionPressure: globalDecision && globalDecision.progressionPressure ? globalDecision.progressionPressure : {},
      deload: globalDecision && globalDecision.deload ? globalDecision.deload : {},
      painRisk: globalDecision && globalDecision.painRisk ? globalDecision.painRisk : {},
      nextSession: globalDecision && globalDecision.nextSession ? globalDecision.nextSession : {}
    };
  }

  function clearPBsOnly() {
    ready();

    if (typeof window.FFFState.clearPBs === 'function') {
      window.FFFState.clearPBs();
    } else {
      localStorage.removeItem('fff.pb.v1');
      window.FFFState.load();
    }
  }

  function clearLogsOnly() {
    ready();

    if (typeof window.FFFState.clearLogs === 'function') {
      window.FFFState.clearLogs();
    } else {
      localStorage.removeItem('fff.logs.v1');
      window.FFFState.load();
    }
  }

  function clearCoachingOnly() {
    ready();

    if (typeof window.FFFState.clearCoaching === 'function') {
      window.FFFState.clearCoaching();
    } else {
      localStorage.removeItem('fff.coaching.v1');
      window.FFFState.load();
    }
  }

  function resetWellnessAndLogs() {
    ready();

    var roadmapBackup = null;

    try {
      roadmapBackup = localStorage.getItem('fff.roadmap.plan.v1');
    } catch (e) {
      roadmapBackup = null;
    }

    clearPBsOnly();
    clearLogsOnly();
    clearChecks();
    clearCoachingOnly();

    try {
      var stillThere = localStorage.getItem('fff.roadmap.plan.v1');
      if (!stillThere && roadmapBackup) {
        localStorage.setItem('fff.roadmap.plan.v1', roadmapBackup);
      }
    } catch (e) {}

    window.FFFState.load();
    return true;
  }

  return {
    version: '8.0',
    ready: ready,

    setPB: setPB,
    getPB: getPB,

    logSet: logSet,
    getLogs: getLogs,
    getLatestLog: getLatestLog,

    setCheck: setCheck,
    getCheck: getCheck,
    getAllChecks: getAllChecks,
    clearChecks: clearChecks,
    getCheckScore: getCheckScore,

    getTotalLogCount: getTotalLogCount,
    getExerciseTrend: getExerciseTrend,
    getFamilySummary: getFamilySummary,
    getWeeklySummary: getWeeklySummary,

    analyseExercise: analyseExercise,
    getGlobalCoachingSummary: getGlobalCoachingSummary,

    getRoadmapRaw: getRoadmapRaw,
    getRoadmapSummary: getRoadmapSummary,

    clearPBsOnly: clearPBsOnly,
    clearLogsOnly: clearLogsOnly,
    clearCoachingOnly: clearCoachingOnly,
    resetWellnessAndLogs: resetWellnessAndLogs
  };
})();
