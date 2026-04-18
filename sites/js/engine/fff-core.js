// FreeFitFuel Core Engine v2

window.FFF = (function () {
  const STORAGE_KEYS = {
    pb: 'fff.pb.v1',
    logs: 'fff.logs.v1',
    checks: 'fff.checks.v1'
  };

  let state = {
    pb: {},
    logs: {},
    checks: {}
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
  }

  function save() {
    localStorage.setItem(STORAGE_KEYS.pb, JSON.stringify(state.pb));
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(state.logs));
    localStorage.setItem(STORAGE_KEYS.checks, JSON.stringify(state.checks));
  }

  function ready() {
    load();
    return true;
  }

  function setPB(exercise, weight, reps) {
    const current = state.pb[exercise];
    const score = (Number(weight) || 0) * (Number(reps) || 0);

    if (!current) {
      state.pb[exercise] = {
        weight: Number(weight) || 0,
        reps: Number(reps) || 0,
        score,
        date: new Date().toISOString()
      };
      save();
      return true;
    }

    if (score > (current.score || 0)) {
      state.pb[exercise] = {
        weight: Number(weight) || 0,
        reps: Number(reps) || 0,
        score,
        date: new Date().toISOString()
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

    state.logs[exercise].push({
      weight: Number(weight) || 0,
      reps: Number(reps) || 0,
      notes: notes || '',
      date: new Date().toISOString()
    });

    setPB(exercise, weight, reps);
    save();
  }

  function getLogs(exercise) {
    return state.logs[exercise] || [];
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

  return {
    version: '2.0',
    ready,
    setPB,
    getPB,
    logSet,
    getLogs,
    setCheck,
    getCheck,
    getAllChecks,
    clearChecks
  };
})();
