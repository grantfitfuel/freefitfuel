// FreeFitFuel Engine — Coaching Memory Layer

window.FFFMemory = (function () {
  'use strict';

  var KEY = 'fff.memory.v1';

  function safeParse(raw) {
    try {
      return JSON.parse(raw || '{}');
    } catch (e) {
      return {};
    }
  }

  function load() {
    return safeParse(localStorage.getItem(KEY));
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function ensure() {
    var data = load();

    if (!Array.isArray(data.weeklySnapshots)) data.weeklySnapshots = [];
    if (!Array.isArray(data.globalModes)) data.globalModes = [];
    if (!Array.isArray(data.weakestFamilies)) data.weakestFamilies = [];
    if (!Array.isArray(data.strongestFamilies)) data.strongestFamilies = [];
    if (!Array.isArray(data.deloadFlags)) data.deloadFlags = [];
    if (!Array.isArray(data.painRiskStates)) data.painRiskStates = [];
    if (!Array.isArray(data.todayDecisions)) data.todayDecisions = [];

    return data;
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function pushBounded(arr, value, max) {
    arr.push(value);
    while (arr.length > max) arr.shift();
  }

  function updateWeekly(globalSummary) {
    var data = ensure();
    var stamp = todayKey();

    var snapshot = {
      date: stamp,
      mode: globalSummary && globalSummary.mode ? globalSummary.mode : 'unknown',
      weakestFamily: globalSummary && globalSummary.weakestFamily ? globalSummary.weakestFamily : null,
      strongestFamily: globalSummary && globalSummary.strongestFamily ? globalSummary.strongestFamily : null,
      deload: !!(globalSummary && globalSummary.deload && globalSummary.deload.suggested),
      painRisk: globalSummary && globalSummary.painRisk ? globalSummary.painRisk.state : 'unknown',
      adherence: globalSummary && globalSummary.weekly ? Number(globalSummary.weekly.adherence || 0) : 0,
      quality: globalSummary && globalSummary.weekly ? Number(globalSummary.weekly.quality || 0) : 0
    };

    var existingIndex = data.weeklySnapshots.findIndex(function (x) { return x.date === stamp; });
    if (existingIndex > -1) {
      data.weeklySnapshots[existingIndex] = snapshot;
    } else {
      pushBounded(data.weeklySnapshots, snapshot, 12);
    }

    pushBounded(data.globalModes, snapshot.mode, 12);
    pushBounded(data.weakestFamilies, snapshot.weakestFamily, 12);
    pushBounded(data.strongestFamilies, snapshot.strongestFamily, 12);
    pushBounded(data.deloadFlags, snapshot.deload, 12);
    pushBounded(data.painRiskStates, snapshot.painRisk, 12);

    save(data);
    return data;
  }

  function updateTodayDecision(decision) {
    var data = ensure();
    var stamp = todayKey();

    var payload = {
      date: stamp,
      decision: decision && decision.decision ? decision.decision : 'unknown',
      reason: decision && decision.reason ? decision.reason : '',
      target: decision && decision.target ? decision.target : '',
      sessionType: decision && decision.sessionType ? decision.sessionType : ''
    };

    var existingIndex = data.todayDecisions.findIndex(function (x) { return x.date === stamp; });
    if (existingIndex > -1) {
      data.todayDecisions[existingIndex] = payload;
    } else {
      pushBounded(data.todayDecisions, payload, 20);
    }

    save(data);
    return data;
  }

  function summarise() {
    var data = ensure();

    function mostCommon(arr) {
      var counts = {};
      var best = null;
      var bestN = 0;

      arr.filter(Boolean).forEach(function (item) {
        counts[item] = (counts[item] || 0) + 1;
        if (counts[item] > bestN) {
          bestN = counts[item];
          best = item;
        }
      });

      return best;
    }

    var repeatedWeakest = mostCommon(data.weakestFamilies);
    var repeatedStrongest = mostCommon(data.strongestFamilies);
    var repeatedMode = mostCommon(data.globalModes);

    var deloadCount = data.deloadFlags.filter(Boolean).length;
    var highPainWeeks = data.painRiskStates.filter(function (x) { return x === 'high'; }).length;

    return {
      repeatedWeakestFamily: repeatedWeakest,
      repeatedStrongestFamily: repeatedStrongest,
      repeatedMode: repeatedMode,
      deloadCount: deloadCount,
      highPainWeeks: highPainWeeks,
      weeklySnapshots: data.weeklySnapshots.slice()
    };
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  return {
    load: load,
    save: save,
    updateWeekly: updateWeekly,
    updateTodayDecision: updateTodayDecision,
    summarise: summarise,
    clear: clear
  };
})();
