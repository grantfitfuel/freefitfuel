// FreeFitFuel Engine — State Layer

window.FFFState = (function () {
  'use strict';

  const STORAGE_KEYS = {
    pb: 'fff.pb.v1',
    logs: 'fff.logs.v1',
    checks: 'fff.checks.v1',
    coaching: 'fff.coaching.v1',
    mind: 'fff.mind.v1',
    recovery: 'fff.recovery.v1',
    roadmap: 'fff.roadmap.plan.v1'
  };

  const DEFAULT_STATE = {
    pb: {},
    logs: {},
    checks: {},
    coaching: {},
    mind: {},
    recovery: {}
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return clone(fallback);
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : clone(fallback);
    } catch (err) {
      return clone(fallback);
    }
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function load() {
    state.pb = safeParse(STORAGE_KEYS.pb, {});
    state.logs = safeParse(STORAGE_KEYS.logs, {});
    state.checks = safeParse(STORAGE_KEYS.checks, {});
    state.coaching = safeParse(STORAGE_KEYS.coaching, {});
    state.mind = safeParse(STORAGE_KEYS.mind, {});
    state.recovery = safeParse(STORAGE_KEYS.recovery, {});
    return getAll();
  }

  function save() {
    localStorage.setItem(STORAGE_KEYS.pb, JSON.stringify(state.pb));
    localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(state.logs));
    localStorage.setItem(STORAGE_KEYS.checks, JSON.stringify(state.checks));
    localStorage.setItem(STORAGE_KEYS.coaching, JSON.stringify(state.coaching));
    localStorage.setItem(STORAGE_KEYS.mind, JSON.stringify(state.mind));
    localStorage.setItem(STORAGE_KEYS.recovery, JSON.stringify(state.recovery));
  }

  function getAll() {
    return clone(state);
  }

  function getRoadmap() {
    return safeParse(STORAGE_KEYS.roadmap, null);
  }

  function setPB(exercise, data) {
    state.pb[exercise] = Object.assign({}, data);
    save();
    return state.pb[exercise];
  }

  function getPB(exercise) {
    return state.pb[exercise] || null;
  }

  function getAllPBs() {
    return clone(state.pb);
  }

  function appendLog(exercise, entry) {
    if (!state.logs[exercise]) state.logs[exercise] = [];
    state.logs[exercise].push(Object.assign({ date: nowISO() }, entry));
    save();
    return state.logs[exercise];
  }

  function getLogs(exercise) {
    return clone(state.logs[exercise] || []);
  }

  function getAllLogs() {
    return clone(state.logs);
  }

  function setCheck(name, value) {
    state.checks[name] = !!value;
    save();
    return state.checks[name];
  }

  function getCheck(name) {
    return !!state.checks[name];
  }

  function getChecks() {
    return clone(state.checks);
  }

  function clearChecks() {
    state.checks = {};
    save();
  }

  function setMind(data) {
    state.mind = Object.assign({}, state.mind, data || {});
    save();
    return clone(state.mind);
  }

  function getMind() {
    return clone(state.mind);
  }

  function setRecovery(data) {
    state.recovery = Object.assign({}, state.recovery, data || {});
    save();
    return clone(state.recovery);
  }

  function getRecovery() {
    return clone(state.recovery);
  }

  function setCoaching(data) {
    state.coaching = Object.assign({}, state.coaching, data || {});
    save();
    return clone(state.coaching);
  }

  function getCoaching() {
    return clone(state.coaching);
  }

  function getTotalLogCount() {
    return Object.values(state.logs).reduce(function (sum, arr) {
      return sum + (Array.isArray(arr) ? arr.length : 0);
    }, 0);
  }

  function clearTrainingData() {
    state.pb = {};
    state.logs = {};
    state.coaching = {};
    state.mind = {};
    state.recovery = {};
    save();
  }

  function clearAllEngineData() {
    state = clone(DEFAULT_STATE);
    save();
  }

  function nukeAllFFFLocalData() {
    Object.values(STORAGE_KEYS).forEach(function (key) {
      localStorage.removeItem(key);
    });

    Object.keys(localStorage).forEach(function (key) {
      if (key.indexOf('fff.') === 0 || key.indexOf('fff_') === 0) {
        localStorage.removeItem(key);
      }
    });

    state = clone(DEFAULT_STATE);
  }

  load();

  return {
    keys: STORAGE_KEYS,
    nowISO,
    load,
    save,
    getAll,
    getRoadmap,
    setPB,
    getPB,
    getAllPBs,
    appendLog,
    getLogs,
    getAllLogs,
    setCheck,
    getCheck,
    getChecks,
    clearChecks,
    setMind,
    getMind,
    setRecovery,
    getRecovery,
    setCoaching,
    getCoaching,
    getTotalLogCount,
    clearTrainingData,
    clearAllEngineData,
    nukeAllFFFLocalData
  };
})();
