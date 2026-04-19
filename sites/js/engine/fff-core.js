// FreeFitFuel Engine — Core Coordinator
// Hardened coordinator matched to current state/recovery/mind/roadmap/training/messaging/intervention layers

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
    if (!window.FFFInterventions) missing.push('FFFInterventions');

    if (missing.length) {
      throw new Error('FreeFitFuel engine missing dependencies: ' + missing.join(', '));
    }
  }

  function safeNumber(v, fallback) {
    var n = Number(v);
    return isNaN(n) ? (fallback || 0) : n;
  }

  function safeObject(v) {
    return v && typeof v === 'object' ? v : {};
  }

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  function ready() {
    ensureDeps();
    if (window.FFFState && typeof window.FFFState.load === 'function') {
      window.FFFState.load();
    }
    return true;
  }

  function score(weight, reps) {
    return safeNumber(weight) * safeNumber(reps);
  }

  function getRoadmapRaw() {
    ready();

    try {
      if (window.FFFState && typeof window.FFFState.getRoadmap === 'function') {
        return window.FFFState.getRoadmap() || null;
      }
    } catch (err) {}

    try {
      var raw = localStorage.getItem('fff.roadmap.plan.v1');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function getRoadmapSummary() {
    ready();

    try {
      return window.FFFRoadmap.summarise(getRoadmapRaw());
    } catch (err) {
      return {
        hasRoadmap: false,
        stageCount: 0,
        currentBias: 'unknown',
        currentStageType: 'unknown',
        progressionExpectation: 'unknown',
        stageSummaries: [],
        health: {
          complexity: 'none',
          progressionStyle: 'unknown',
          notes: ['Roadmap summary unavailable.']
        }
      };
    }
  }

  function getAllLogsSafe() {
    try {
      return window.FFFState && typeof window.FFFState.getAllLogs === 'function'
        ? safeObject(window.FFFState.getAllLogs())
        : {};
    } catch (err) {
      return {};
    }
  }

  function getChecksSafe() {
    try {
      return window.FFFState && typeof window.FFFState.getChecks === 'function'
        ? safeObject(window.FFFState.getChecks())
        : {};
    } catch (err) {
      return {};
    }
  }

  function getRecoverySafe(checks, allLogs) {
    try {
      return safeObject(window.FFFRecovery.analyse(checks, allLogs));
    } catch (err) {
      return {
        checkScore: 0,
        readiness: 50,
        fatigue: 20,
        underRecoveryRisk: 0,
        consistency: 0,
        painSignals: 0,
        recentLoad: 0,
        recentSessionDays: 0,
        daysSinceLastLog: null,
        mode: 'normal'
      };
    }
  }

  function getMindSafe(allLogs, checks) {
    try {
      return safeObject(window.FFFMind.analyse(allLogs, checks));
    } catch (err) {
      return {
        headline: 'Mind layer unavailable',
        summary: 'Mind analysis could not be produced.',
        tone: 'grounded',
        risk: 'low',
        confidence: 50,
        pressure: 20,
        discipline: 40,
        avoidance: 0,
        painFocus: 0,
        negativity: 0,
        selfCriticism: 0,
        overpush: 0,
        checkSupport: 0,
        sampleSize: 0
      };
    }
  }

  function setPB(exercise, weight, reps) {
    ready();

    var name = String(exercise || '').trim();
    if (!name) return false;

    var current = null;
    try {
      current = window.FFFState.getPB(name);
    } catch (err) {
      current = null;
    }

    var nextScore = score(weight, reps);

    if (!current || nextScore > safeNumber(current.score)) {
      window.FFFState.setPB(name, {
        weight: safeNumber(weight),
        reps: safeNumber(reps),
        score: nextScore,
        date: window.FFFState.nowISO()
      });
      return true;
    }

    return false;
  }

  function getPB(exercise) {
    ready();

    try {
      return window.FFFState.getPB(String(exercise || '')) || null;
    } catch (err) {
      return null;
    }
  }

  function logSet(exercise, weight, reps, notes) {
    ready();

    var name = String(exercise || '').trim();
    if (!name) {
      return {
        entry: null,
        isNewPB: false
      };
    }

    var entry = {
      weight: safeNumber(weight),
      reps: safeNumber(reps),
      notes: String(notes || ''),
      date: window.FFFState.nowISO()
    };

    window.FFFState.appendLog(name, entry);
    var isNewPB = setPB(name, weight, reps);

    return {
      entry: entry,
      isNewPB: isNewPB
    };
  }

  function getLogs(exercise) {
    ready();

    try {
      return safeArray(window.FFFState.getLogs(String(exercise || '')));
    } catch (err) {
      return [];
    }
  }

  function getLatestLog(exercise) {
    var logs = getLogs(exercise);
    return logs.length ? logs[logs.length - 1] : null;
  }

  function setCheck(name, value) {
    ready();

    try {
      return window.FFFState.setCheck(String(name || ''), !!value);
    } catch (err) {
      return false;
    }
  }

  function getCheck(name) {
    ready();

    try {
      return !!window.FFFState.getCheck(String(name || ''));
    } catch (err) {
      return false;
    }
  }

  function getAllChecks() {
    ready();
    return getChecksSafe();
  }

  function clearChecks() {
    ready();

    try {
      if (typeof window.FFFState.clearChecks === 'function') {
        window.FFFState.clearChecks();
        return true;
      }
    } catch (err) {}

    try {
      localStorage.removeItem('fff.checks.v1');
      window.FFFState.load();
      return true;
    } catch (err) {
      return false;
    }
  }

  function getCheckScore() {
    ready();

    try {
      return safeNumber(window.FFFRecovery.scoreChecks(getChecksSafe()), 0);
    } catch (err) {
      return 0;
    }
  }

  function getTotalLogCount() {
    ready();

    try {
      return safeNumber(window.FFFState.getTotalLogCount(), 0);
    } catch (err) {
      return 0;
    }
  }

  function getExerciseTrend(exercise) {
    ready();

    try {
      return safeObject(window.FFFTraining.getTrend(getLogs(exercise)));
    } catch (err) {
      return { trend: 'insufficient', delta: 0, lastScore: 0, prevScore: 0 };
    }
  }

  function getFamilySummary() {
    ready();

    var allLogs = getAllLogsSafe();
    var checks = getChecksSafe();
    var recovery = getRecoverySafe(checks, allLogs);

    try {
      return safeObject(window.FFFTraining.summariseFamilies(allLogs, recovery));
    } catch (err) {
      return {};
    }
  }

  function getWeeklySummary() {
    ready();

    var allLogs = getAllLogsSafe();
    var checks = getChecksSafe();
    var roadmapSummary = getRoadmapSummary();
    var recovery = getRecoverySafe(checks, allLogs);

    try {
      return safeObject(window.FFFTraining.weeklySummary(allLogs, recovery, roadmapSummary));
    } catch (err) {
      return {
        sessionsLogged: 0,
        exercisesTouched: 0,
        painMentions: 0,
        weeklyLoadProxy: 0,
        adherence: 0,
        quality: 0,
        strongestFamily: null,
        weakestFamily: null,
        familySummary: {},
        familyBreakdown: {},
        weeklyMode: 'steady',
        swapSuggestions: []
      };
    }
  }

  function analyseExercise(exercise) {
    ready();

    var name = String(exercise || '').trim();
    var logs = getLogs(name);
    var checks = getChecksSafe();
    var allLogs = getAllLogsSafe();
    var roadmapSummary = getRoadmapSummary();
    var recovery = getRecoverySafe(checks, allLogs);
    var mind = getMindSafe(allLogs, checks);

    var profile = null;
    try {
      profile = window.FFFExerciseDB.getExerciseProfile(name);
    } catch (err) {
      profile = {
        name: name || 'Unknown Exercise',
        family: 'general',
        patterns: ['general'],
        primaryJoints: ['general'],
        tissues: ['general'],
        riskZones: ['general'],
        commonFailurePoints: [],
        regressions: [],
        progressions: [],
        aliases: [],
        confidence: 'low'
      };
    }

    var decision;
    try {
      decision = window.FFFTraining.decideExercise(profile, logs, recovery, mind, roadmapSummary);
    } catch (err) {
      decision = {
        action: 'hold',
        reason: ['Exercise intelligence unavailable'],
        tone: 'grounded',
        confidenceBand: 'low',
        trend: { trend: 'insufficient', delta: 0, lastScore: 0, prevScore: 0 },
        longTrend: 'unknown',
        patternState: 'unknown',
        phase: roadmapSummary,
        profile: profile,
        nextStep: 'Stay controlled and keep accumulating useful logs.'
      };
    }

    var message;
    try {
      message = window.FFFMessaging.exerciseMessage(decision);
    } catch (err) {
      message = {
        headline: 'Exercise coaching unavailable',
        message: 'The engine could not produce exercise-specific coaching.'
      };
    }

    return {
      exercise: name,
      profile: profile,
      logs: logs,
      latest: logs.length ? logs[logs.length - 1] : null,
      pb: getPB(name),
      trend: decision && decision.trend ? decision.trend : getExerciseTrend(name),
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

    var checks = getChecksSafe();
    var allLogs = getAllLogsSafe();
    var roadmapSummary = getRoadmapSummary();
    var recovery = getRecoverySafe(checks, allLogs);
    var mind = getMindSafe(allLogs, checks);
    var totalLogs = getTotalLogCount();

    var globalDecision;
    try {
      globalDecision = window.FFFTraining.decideGlobal(
        recovery,
        mind,
        roadmapSummary,
        totalLogs,
        allLogs
      );
    } catch (err) {
      globalDecision = {
        mode: 'build',
        tone: 'grounded',
        reason: ['Global coaching intelligence unavailable'],
        familySummary: {},
        strongestFamily: null,
        weakestFamily: null,
        weekly: {},
        strain: {},
        progressionPressure: {},
        deload: {},
        painRisk: {},
        nextSession: {},
        todayDecision: {},
        nextWeek: {},
        conflicts: []
      };
    }

    var intervention;
    try {
      intervention = window.FFFInterventions.getIntervention(
        mind,
        recovery,
        globalDecision && globalDecision.weekly ? globalDecision.weekly : {}
      );
    } catch (err) {
      intervention = {
        state: 'steady',
        headline: 'Keep building',
        message: 'Keep the next step simple and useful.',
        actions: ['Train as planned.', 'Keep reps clean and controlled.']
      };
    }

    var message;
    try {
      message = window.FFFMessaging.globalMessage(globalDecision);
    } catch (err) {
      message = {
        headline: 'Coach unavailable',
        message: 'The engine could not produce a global coaching summary.'
      };
    }

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
      nextSession: globalDecision && globalDecision.nextSession ? globalDecision.nextSession : {},
      todayDecision: globalDecision && globalDecision.todayDecision ? globalDecision.todayDecision : {},
      nextWeek: globalDecision && globalDecision.nextWeek ? globalDecision.nextWeek : {},
      conflicts: globalDecision && globalDecision.conflicts ? globalDecision.conflicts : [],
      intervention: intervention
    };
  }

  function clearPBsOnly() {
    ready();

    try {
      if (window.FFFState && typeof window.FFFState.clearPBs === 'function') {
        window.FFFState.clearPBs();
        return true;
      }
    } catch (err) {}

    try {
      localStorage.removeItem('fff.pb.v1');
      window.FFFState.load();
      return true;
    } catch (err) {
      return false;
    }
  }

  function clearLogsOnly() {
    ready();

    try {
      if (window.FFFState && typeof window.FFFState.clearLogs === 'function') {
        window.FFFState.clearLogs();
        return true;
      }
    } catch (err) {}

    try {
      localStorage.removeItem('fff.logs.v1');
      window.FFFState.load();
      return true;
    } catch (err) {
      return false;
    }
  }

  function clearCoachingOnly() {
    ready();

    try {
      if (window.FFFState && typeof window.FFFState.clearCoaching === 'function') {
        window.FFFState.clearCoaching();
        return true;
      }
    } catch (err) {}

    try {
      localStorage.removeItem('fff.coaching.v1');
      window.FFFState.load();
      return true;
    } catch (err) {
      return false;
    }
  }

  function resetWellnessAndLogs() {
    ready();

    var roadmapBackup = null;

    try {
      roadmapBackup = localStorage.getItem('fff.roadmap.plan.v1');
    } catch (err) {
      roadmapBackup = null;
    }

    clearPBsOnly();
    clearLogsOnly();
    clearChecks();
    clearCoachingOnly();

    try {
      if (!localStorage.getItem('fff.roadmap.plan.v1') && roadmapBackup) {
        localStorage.setItem('fff.roadmap.plan.v1', roadmapBackup);
      }
    } catch (err) {}

    try {
      window.FFFState.load();
    } catch (err) {}

    return true;
  }

  return {
    version: '10.0',
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
