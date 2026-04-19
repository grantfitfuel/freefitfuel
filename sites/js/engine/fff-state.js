// FreeFitFuel Engine — State Layer
// Hardened storage and reset handling

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

  let state = clone(DEFAULT_STATE);

  function clone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (err) {
      return value;
    }
  }

  function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  function safeLocalGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function safeLocalSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err) {
      return false;
    }
  }

  function safeLocalRemove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  }

  function safeParse(key, fallback) {
    try {
      const raw = safeLocalGet(key);
      if (!raw) return clone(fallback);
      const parsed = JSON.parse(raw);

      if (fallback === null) {
        return parsed;
      }

      if (Array.isArray(fallback)) {
        return Array.isArray(parsed) ? parsed : clone(fallback);
      }

      if (isPlainObject(fallback)) {
        return isPlainObject(parsed) ? parsed : clone(fallback);
      }

      return parsed != null ? parsed : clone(fallback);
    } catch (err) {
      return clone(fallback);
    }
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function sanitiseLogEntry(entry) {
    return {
      weight: Number(entry && entry.weight) || 0,
      reps: Number(entry && entry.reps) || 0,
      notes: String(entry && entry.notes || ''),
      date: entry && entry.date ? String(entry.date) : nowISO()
    };
  }

  function sanitiseLogsMap(input) {
    const out = {};
    if (!isPlainObject(input)) return out;

    Object.keys(input).forEach(function (exercise) {
      const arr = Array.isArray(input[exercise]) ? input[exercise] : [];
      out[exercise] = arr.map(sanitiseLogEntry);
    });

    return out;
  }

  function sanitisePBMap(input) {
    const out = {};
    if (!isPlainObject(input)) return out;

    Object.keys(input).forEach(function (exercise) {
      const item = input[exercise];
      if (!isPlainObject(item)) return;

      out[exercise] = {
        weight: Number(item.weight) || 0,
        reps: Number(item.reps) || 0,
        score: Number(item.score) || 0,
        date: item.date ? String(item.date) : nowISO()
      };
    });

    return out;
  }

  function sanitiseBoolMap(input) {
    const out = {};
    if (!isPlainObject(input)) return out;

    Object.keys(input).forEach(function (key) {
      out[key] = !!input[key];
    });

    return out;
  }

  function sanitiseObjectMap(input) {
    return isPlainObject(input) ? clone(input) : {};
  }

  function rebuildStateFromStorage() {
    state.pb = sanitisePBMap(safeParse(STORAGE_KEYS.pb, {}));
    state.logs = sanitiseLogsMap(safeParse(STORAGE_KEYS.logs, {}));
    state.checks = sanitiseBoolMap(safeParse(STORAGE_KEYS.checks, {}));
    state.coaching = sanitiseObjectMap(safeParse(STORAGE_KEYS.coaching, {}));
    state.mind = sanitiseObjectMap(safeParse(STORAGE_KEYS.mind, {}));
    state.recovery = sanitiseObjectMap(safeParse(STORAGE_KEYS.recovery, {}));
  }

  function save() {
    safeLocalSet(STORAGE_KEYS.pb, JSON.stringify(state.pb));
    safeLocalSet(STORAGE_KEYS.logs, JSON.stringify(state.logs));
    safeLocalSet(STORAGE_KEYS.checks, JSON.stringify(state.checks));
    safeLocalSet(STORAGE_KEYS.coaching, JSON.stringify(state.coaching));
    safeLocalSet(STORAGE_KEYS.mind, JSON.stringify(state.mind));
    safeLocalSet(STORAGE_KEYS.recovery, JSON.stringify(state.recovery));
    return getAll();
  }

  function load() {
    rebuildStateFromStorage();
    return getAll();
  }

  function getAll() {
    return clone(state);
  }

  function getRoadmap() {
    const parsed = safeParse(STORAGE_KEYS.roadmap, null);
    return parsed && typeof parsed === 'object' ? parsed : null;
  }

  function setPB(exercise, data) {
    if (!exercise) return null;

    state.pb[String(exercise)] = {
      weight: Number(data && data.weight) || 0,
      reps: Number(data && data.reps) || 0,
      score: Number(data && data.score) || 0,
      date: data && data.date ? String(data.date) : nowISO()
    };

    save();
    return clone(state.pb[String(exercise)]);
  }

  function getPB(exercise) {
    if (!exercise) return null;
    return clone(state.pb[String(exercise)] || null);
  }

  function getAllPBs() {
    return clone(state.pb);
  }

  function appendLog(exercise, entry) {
    if (!exercise) return [];

    const key = String(exercise);
    if (!Array.isArray(state.logs[key])) state.logs[key] = [];

    state.logs[key].push(sanitiseLogEntry(entry));
    save();
    return clone(state.logs[key]);
  }

  function getLogs(exercise) {
    if (!exercise) return [];
    return clone(state.logs[String(exercise)] || []);
  }

  function getAllLogs() {
    return clone(state.logs);
  }

  function setCheck(name, value) {
    if (!name) return false;
    state.checks[String(name)] = !!value;
    save();
    return state.checks[String(name)];
  }

  function getCheck(name) {
    if (!name) return false;
    return !!state.checks[String(name)];
  }

  function getChecks() {
    return clone(state.checks);
  }

  function clearChecks() {
    state.checks = {};
    save();
    return true;
  }

  function setMind(data) {
    state.mind = Object.assign({}, state.mind, sanitiseObjectMap(data));
    save();
    return clone(state.mind);
  }

  function getMind() {
    return clone(state.mind);
  }

  function setRecovery(data) {
    state.recovery = Object.assign({}, state.recovery, sanitiseObjectMap(data));
    save();
    return clone(state.recovery);
  }

  function getRecovery() {
    return clone(state.recovery);
  }

  function setCoaching(data) {
    state.coaching = Object.assign({}, state.coaching, sanitiseObjectMap(data));
    save();
    return clone(state.coaching);
  }

  function getCoaching() {
    return clone(state.coaching);
  }

  function getTotalLogCount() {
    return Object.keys(state.logs).reduce(function (sum, key) {
      const arr = Array.isArray(state.logs[key]) ? state.logs[key] : [];
      return sum + arr.length;
    }, 0);
  }

  function clearPBs() {
    state.pb = {};
    save();
    return true;
  }

  function clearLogs() {
    state.logs = {};
    save();
    return true;
  }

  function clearCoaching() {
    state.coaching = {};
    save();
    return true;
  }

  function clearMind() {
    state.mind = {};
    save();
    return true;
  }

  function clearRecovery() {
    state.recovery = {};
    save();
    return true;
  }

  function clearTrainingData() {
    state.pb = {};
    state.logs = {};
    state.coaching = {};
    state.mind = {};
    state.recovery = {};
    save();
    return true;
  }

  function clearAllEngineData() {
    const roadmapBackup = safeLocalGet(STORAGE_KEYS.roadmap);

    state = clone(DEFAULT_STATE);
    save();

    if (roadmapBackup) {
      safeLocalSet(STORAGE_KEYS.roadmap, roadmapBackup);
    }

    return getAll();
  }

  function nukeAllFFFLocalData(options) {
    const keepRoadmap = !!(options && options.keepRoadmap);
    const roadmapBackup = keepRoadmap ? safeLocalGet(STORAGE_KEYS.roadmap) : null;

    Object.values(STORAGE_KEYS).forEach(function (key) {
      if (keepRoadmap && key === STORAGE_KEYS.roadmap) return;
      safeLocalRemove(key);
    });

    try {
      Object.keys(localStorage).forEach(function (key) {
        if (keepRoadmap && key === STORAGE_KEYS.roadmap) return;
        if (key.indexOf('fff.') === 0 || key.indexOf('fff_') === 0) {
          safeLocalRemove(key);
        }
      });
    } catch (err) {}

    state = clone(DEFAULT_STATE);

    if (keepRoadmap && roadmapBackup) {
      safeLocalSet(STORAGE_KEYS.roadmap, roadmapBackup);
    }

    return getAll();
  }

  load();

  return {
    keys: STORAGE_KEYS,
    nowISO: nowISO,
    load: load,
    save: save,
    getAll: getAll,
    getRoadmap: getRoadmap,

    setPB: setPB,
    getPB: getPB,
    getAllPBs: getAllPBs,
    clearPBs: clearPBs,

    appendLog: appendLog,
    getLogs: getLogs,
    getAllLogs: getAllLogs,
    clearLogs: clearLogs,

    setCheck: setCheck,
    getCheck: getCheck,
    getChecks: getChecks,
    clearChecks: clearChecks,

    setMind: setMind,
    getMind: getMind,
    clearMind: clearMind,

    setRecovery: setRecovery,
    getRecovery: getRecovery,
    clearRecovery: clearRecovery,

    setCoaching: setCoaching,
    getCoaching: getCoaching,
    clearCoaching: clearCoaching,

    getTotalLogCount: getTotalLogCount,
    clearTrainingData: clearTrainingData,
    clearAllEngineData: clearAllEngineData,
    nukeAllFFFLocalData: nukeAllFFFLocalData
  };
})();
