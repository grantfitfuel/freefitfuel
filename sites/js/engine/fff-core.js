// FreeFitFuel Core Engine v1

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

  function load() {
    state.pb = JSON.parse(localStorage.getItem(STORAGE_KEYS.pb) || '{}');
    state.logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.logs) || '{}');
    state.checks = JSON.parse(localStorage.getItem(STORAGE_KEYS.checks) || '{}');
  }

  function save() {
    localStorage.setItem(STORAGE_KEYS.pb, JSON.stringify(state.pb));
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(state.logs));
    localStorage.setItem(STORAGE_KEYS.checks, JSON.stringify(state.checks));
  }

  function setPB(exercise, weight, reps) {
    const current = state.pb[exercise];

    if (!current || (weight * reps > current.weight * current.reps)) {
      state.pb[exercise] = { weight, reps, date: new Date().toISOString() };
      save();
      return true;
    }
    return false;
  }

  function getPB(exercise) {
    return state.pb[exercise] || null;
  }

  function logSet(exercise, weight, reps) {
    if (!state.logs[exercise]) state.logs[exercise] = [];

    state.logs[exercise].push({
      weight,
      reps,
      date: new Date().toISOString()
    });

    setPB(exercise, weight, reps);
    save();
  }

  function getLogs(exercise) {
    return state.logs[exercise] || [];
  }

  function setCheck(name, value) {
    state.checks[name] = value;
    save();
  }

  function getCheck(name) {
    return state.checks[name] || false;
  }

  function ready() {
    load();
    console.log('FFF Engine Ready');
  }

  return {
    version: '1.0',
    ready,
    setPB,
    getPB,
    logSet,
    getLogs,
    setCheck,
    getCheck
  };

})();
