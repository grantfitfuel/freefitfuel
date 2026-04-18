// FreeFitFuel Core Engine v3

window.FFF = (function () {
  const STORAGE_KEYS = {
    pb: 'fff.pb.v1',
    logs: 'fff.logs.v1',
    checks: 'fff.checks.v1',
    coaching: 'fff.coaching.v1'
  };

  let state = {
    pb: {},
    logs: {},
    checks: {},
    coaching: {}
  };

  function safeParse(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      return {};
    }
  }

  function load() {
    state.pb = safeParse(STORAGE_KEYS.pb);
    state.logs = safeParse(STORAGE_KEYS.logs);
    state.checks = safeParse(STORAGE_KEYS.checks);
    state.coaching = safeParse(STORAGE_KEYS.coaching);
  }

  function save() {
    localStorage.setItem(STORAGE_KEYS.pb, JSON.stringify(state.pb));
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(state.logs));
    localStorage.setItem(STORAGE_KEYS.checks, JSON.stringify(state.checks));
    localStorage.setItem(STORAGE_KEYS.coaching, JSON.stringify(state.coaching));
  }

  function ready() {
    load();
    return true;
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function setPB(exercise, weight, reps) {
    const current = state.pb[exercise];
    const score = (Number(weight) || 0) * (Number(reps) || 0);

    if (!current || score > (current.score || 0)) {
      state.pb[exercise] = {
        weight: Number(weight) || 0,
        reps: Number(reps) || 0,
        score,
        date: nowISO()
      };
      save();
      return true;
    }

    return false;
  }

  function getPB(exercise) {
    return state.pb[exercise] || null;
  }

  function logSet(exercise, weight, reps, notes) {
    if (!state.logs[exercise]) state.logs[exercise] = [];

    const entry = {
      weight: Number(weight) || 0,
      reps: Number(reps) || 0,
      notes: notes || '',
      date: nowISO()
    };

    state.logs[exercise].push(entry);
    const isNewPB = setPB(exercise, weight, reps);
    save();

    return {
      entry,
      isNewPB
    };
  }

  function getLogs(exercise) {
    return state.logs[exercise] || [];
  }

  function getLatestLog(exercise) {
    const logs = getLogs(exercise);
    return logs.length ? logs[logs.length - 1] : null;
  }

  function setCheck(name, value) {
    state.checks[name] = !!value;
    save();
  }

  function getCheck(name) {
    return !!state.checks[name];
  }

  function getAllChecks() {
    return { ...state.checks };
  }

  function clearChecks() {
    state.checks = {};
    save();
  }

  function getCheckScore() {
    const checks = getAllChecks();
    return Object.values(checks).filter(Boolean).length;
  }

  function getTotalLogCount() {
    return Object.values(state.logs).reduce((sum, arr) => sum + arr.length, 0);
  }

  function daysBetween(a, b) {
    const ms = Math.abs(new Date(a).getTime() - new Date(b).getTime());
    return ms / 86400000;
  }

  function getExerciseTrend(exercise) {
    const logs = getLogs(exercise);
    if (logs.length < 2) return { trend: 'insufficient', delta: 0 };

    const last = logs[logs.length - 1];
    const prev = logs[logs.length - 2];

    const lastScore = (last.weight || 0) * (last.reps || 0);
    const prevScore = (prev.weight || 0) * (prev.reps || 0);
    const delta = lastScore - prevScore;

    if (delta > 0) return { trend: 'up', delta };
    if (delta < 0) return { trend: 'down', delta };
    return { trend: 'flat', delta: 0 };
  }

  function analyseExercise(exercise) {
    const logs = getLogs(exercise);
    const latest = getLatestLog(exercise);
    const pb = getPB(exercise);
    const trend = getExerciseTrend(exercise);
    const checkScore = getCheckScore();

    if (!latest) {
      return {
        status: 'empty',
        headline: 'No data yet',
        message: 'Log your first set to unlock coaching feedback.'
      };
    }

    const lowerNotes = String(latest.notes || '').toLowerCase();
    const cautionWords = ['pain', 'sharp', 'twinge', 'injury', 'dizzy', 'strain'];
    const caution = cautionWords.some(word => lowerNotes.includes(word));

    if (caution) {
      return {
        status: 'caution',
        headline: 'Caution flag',
        message: 'Your notes suggest discomfort. Reduce load, shorten range, or stop if pain is sharp or worsening.'
      };
    }

    if (pb && latest.weight === pb.weight && latest.reps === pb.reps) {
      return {
        status: 'pb',
        headline: 'New personal best',
        message: 'Progress is real. Keep technique just as clean before pushing again.'
      };
    }

    if (trend.trend === 'up') {
      return {
        status: 'up',
        headline: 'Moving forward',
        message: 'You improved from your last logged set. Small wins like this are exactly what builds long-term results.'
      };
    }

    if (trend.trend === 'flat' && checkScore <= 1) {
      return {
        status: 'recovery',
        headline: 'Recovery may be limiting you',
        message: 'Performance is flat and your daily check score is low. Prioritise sleep, hydration, and fuelling before forcing progression.'
      };
    }

    if (trend.trend === 'down') {
      return {
        status: 'down',
        headline: 'Slight drop today',
        message: 'That is not failure. Hold the load steady, tighten form, and try to bounce back next session.'
      };
    }

    if (checkScore >= 3) {
      return {
        status: 'ready',
        headline: 'Solid readiness',
        message: 'Your daily basics look good. If form was clean today, a small progression next session is reasonable.'
      };
    }

    return {
      status: 'steady',
      headline: 'Steady work',
      message: 'Keep building. Consistent clean reps matter more than chasing every session.'
    };
  }

  function getGlobalCoachingSummary() {
    const totalLogs = getTotalLogCount();
    const checkScore = getCheckScore();

    if (totalLogs === 0) {
      return {
        headline: 'Engine ready',
        message: 'Start logging sessions and the coaching layer will begin responding to your actual training.'
      };
    }

    if (checkScore === 4) {
      return {
        headline: 'All green on recovery basics',
        message: 'Hydration, sleep, macros, and activity are all ticked. Good day to train with intent.'
      };
    }

    if (checkScore <= 1) {
      return {
        headline: 'Low recovery support today',
        message: 'Training still counts, but keep expectations realistic and focus on quality rather than chasing numbers.'
      };
    }

    return {
      headline: 'Keep stacking consistent days',
      message: 'You do not need perfect conditions. You do need enough good days repeated over time.'
    };
  }

  return {
    version: '3.0',
    ready,
    setPB,
    getPB,
    logSet,
    getLogs,
    getLatestLog,
    setCheck,
    getCheck,
    getAllChecks,
    clearChecks,
    getCheckScore,
    getTotalLogCount,
    getExerciseTrend,
    analyseExercise,
    getGlobalCoachingSummary
  };
})();
