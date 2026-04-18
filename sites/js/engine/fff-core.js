// FreeFitFuel Engine — Core Coordinator

window.FFF = (function () {
  'use strict';

  function ensureDeps() {
    const missing = [];

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
    const n = Number(v);
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
      const raw = localStorage.getItem('fff.roadmap.plan.v1');
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

    const current = window.FFFState.getPB(exercise);
    const nextScore = score(weight, reps);

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

    const entry = {
      weight: toNumber(weight),
      reps: toNumber(reps),
      notes: String(notes || ''),
      date: window.FFFState.nowISO()
    };

    window.FFFState.appendLog(exercise, entry);
    const isNewPB = setPB(exercise, weight, reps);

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
    const logs = getLogs(exercise);
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

  function analyseExercise(exercise) {
    ready();

    const logs = window.FFFState.getLogs(exercise) || [];
    const checks = window.FFFState.getChecks() || {};
    const allLogs = window.FFFState.getAllLogs ? window.FFFState.getAllLogs() : {};
    const roadmapSummary = getRoadmapSummary();

    const recovery = window.FFFRecovery.analyse(checks, allLogs);
    const mind = window.FFFMind.analyse(allLogs, checks);
    const profile = window.FFFExerciseDB.getExerciseProfile(exercise);

    const decision = window.FFFTraining.decideExercise(
      profile,
      logs,
      recovery,
      mind,
      roadmapSummary
    );

    const message = window.FFFMessaging.exerciseMessage(decision);

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

    const checks = window.FFFState.getChecks() || {};
    const allLogs = window.FFFState.getAllLogs ? window.FFFState.getAllLogs() : {};
    const roadmapSummary = getRoadmapSummary();
    const recovery = window.FFFRecovery.analyse(checks, allLogs);
    const mind = window.FFFMind.analyse(allLogs, checks);
    const totalLogs = window.FFFState.getTotalLogCount();

    const globalDecision = window.FFFTraining.decideGlobal(
      recovery,
      mind,
      roadmapSummary,
      totalLogs
    );

    const message = window.FFFMessaging.globalMessage(
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
      reason: globalDecision && globalDecision.reason ? globalDecision.reason : []
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

    let roadmapBackup = null;

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
      const stillThere = localStorage.getItem('fff.roadmap.plan.v1');
      if (!stillThere && roadmapBackup) {
        localStorage.setItem('fff.roadmap.plan.v1', roadmapBackup);
      }
    } catch (e) {}

    window.FFFState.load();
    return true;
  }

  return {
    version: '5.0',
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
