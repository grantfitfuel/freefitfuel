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

  function score(weight, reps) {
    return (Number(weight) || 0) * (Number(reps) || 0);
  }

  function setPB(exercise, weight, reps) {
    ready();
    const current = window.FFFState.getPB(exercise);
    const nextScore = score(weight, reps);

    if (!current || nextScore > (current.score || 0)) {
      window.FFFState.setPB(exercise, {
        weight: Number(weight) || 0,
        reps: Number(reps) || 0,
        score: nextScore,
        date: window.FFFState.nowISO()
      });
      return true;
    }

    return false;
  }

  function getPB(exercise) {
    ready();
    return window.FFFState.getPB(exercise);
  }

  function logSet(exercise, weight, reps, notes) {
    ready();

    const entry = {
      weight: Number(weight) || 0,
      reps: Number(reps) || 0,
      notes: notes || '',
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
    return window.FFFState.getLogs(exercise);
  }

  function getLatestLog(exercise) {
    const logs = getLogs(exercise);
    return logs.length ? logs[logs.length - 1] : null;
  }

  function setCheck(name, value) {
    ready();
    return window.FFFState.setCheck(name, value);
  }

  function getCheck(name) {
    ready();
    return window.FFFState.getCheck(name);
  }

  function getAllChecks() {
    ready();
    return window.FFFState.getChecks();
  }

  function clearChecks() {
    ready();
    window.FFFState.clearChecks();
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

    const logs = window.FFFState.getLogs(exercise);
    const checks = window.FFFState.getChecks();
    const allLogs = window.FFFState.getAllLogs();
    const recovery = window.FFFRecovery.analyse(checks, allLogs);
    const mind = window.FFFMind.analyse(allLogs, checks);
    const profile = window.FFFExerciseDB.getExerciseProfile(exercise);
    const decision = window.FFFTraining.decideExercise(profile, logs, recovery, mind);
    const message = window.FFFMessaging.exerciseMessage(decision);

    return {
      exercise: exercise,
      profile: profile,
      logs: logs,
      latest: logs.length ? logs[logs.length - 1] : null,
      pb: window.FFFState.getPB(exercise),
      trend: decision.trend,
      recovery: recovery,
      mind: mind,
      decision: decision,
      headline: message.headline,
      message: message.message,
      status: decision.action
    };
  }

  function getGlobalCoachingSummary() {
    ready();

    const checks = window.FFFState.getChecks();
    const allLogs = window.FFFState.getAllLogs();
    const roadmap = window.FFFState.getRoadmap();
    const recovery = window.FFFRecovery.analyse(checks, allLogs);
    const mind = window.FFFMind.analyse(allLogs, checks);
    const roadmapSummary = window.FFFRoadmap.summarise(roadmap);
    const totalLogs = window.FFFState.getTotalLogCount();
    const globalDecision = window.FFFTraining.decideGlobal(recovery, mind, roadmapSummary, totalLogs);
    const message = window.FFFMessaging.globalMessage(globalDecision, recovery, mind);

    return {
      headline: message.headline,
      message: message.message,
      recovery: recovery,
      mind: mind,
      roadmap: roadmapSummary,
      totalLogs: totalLogs,
      mode: globalDecision.mode
    };
  }

  function resetWellnessAndLogs() {
    ready();
    window.FFFState.nukeAllFFFLocalData();
  }

  return {
    version: '4.0',
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
    resetWellnessAndLogs: resetWellnessAndLogs
  };
})();
