// FreeFitFuel Engine — Recovery Layer

window.FFFRecovery = (function () {
  'use strict';

  function scoreChecks(checks) {
    if (!checks || typeof checks !== 'object') return 0;
    return Object.keys(checks).filter(function (k) { return !!checks[k]; }).length;
  }

  function flattenLogs(allLogs) {
    const out = [];
    if (!allLogs || typeof allLogs !== 'object') return out;

    Object.keys(allLogs).forEach(function (exercise) {
      const arr = Array.isArray(allLogs[exercise]) ? allLogs[exercise] : [];
      arr.forEach(function (entry) {
        out.push({
          exercise: exercise,
          weight: Number(entry.weight) || 0,
          reps: Number(entry.reps) || 0,
          notes: String(entry.notes || ''),
          date: entry.date || null
        });
      });
    });

    out.sort(function (a, b) {
      return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
    });

    return out;
  }

  function recent(flat, n) {
    return flat.slice(Math.max(0, flat.length - n));
  }

  function countPainSignals(entries) {
    const words = ['pain','sharp','strain','injury','twinge','flare','aggravated','niggle','sore','hurt'];
    let hits = 0;
    entries.forEach(function (e) {
      const txt = String(e.notes || '').toLowerCase();
      words.forEach(function (w) {
        if (txt.indexOf(w) > -1) hits++;
      });
    });
    return hits;
  }

  function countSessionDays(flat) {
    const set = {};
    flat.forEach(function (e) {
      const d = String(e.date || '').slice(0, 10);
      if (d) set[d] = true;
    });
    return Object.keys(set).length;
  }

  function getLastLogDate(flat) {
    if (!flat.length) return null;
    return flat[flat.length - 1].date || null;
  }

  function daysSince(date) {
    if (!date) return null;
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / 86400000);
  }

  function computeLoad(entries) {
    return entries.reduce(function (sum, e) {
      return sum + ((Number(e.weight) || 0) * (Number(e.reps) || 0));
    }, 0);
  }

  function analyse(checks, allLogs) {
    const flat = flattenLogs(allLogs);
    const recentLogs = recent(flat, 20);
    const recentLoad = computeLoad(recentLogs);
    const totalDays = countSessionDays(recentLogs);
    const painSignals = countPainSignals(recentLogs);
    const checkScore = scoreChecks(checks);
    const lastDate = getLastLogDate(flat);
    const daysOff = daysSince(lastDate);

    let readiness = 50;
    readiness += checkScore * 10;
    readiness -= painSignals * 6;
    if (daysOff === 0) readiness -= 4;
    if (daysOff === 1) readiness += 3;
    if (daysOff >= 5 && flat.length) readiness -= 8;
    readiness = Math.max(0, Math.min(100, readiness));

    let fatigue = 20;
    fatigue += painSignals * 8;
    if (checkScore <= 1) fatigue += 20;
    if (checkScore === 2) fatigue += 10;
    if (totalDays >= 5) fatigue += 10;
    if (daysOff === 0) fatigue += 8;
    fatigue = Math.max(0, Math.min(100, fatigue));

    let underRecoveryRisk = 0;
    if (checkScore <= 1) underRecoveryRisk += 35;
    if (painSignals >= 2) underRecoveryRisk += 20;
    if (totalDays >= 5 && checkScore <= 2) underRecoveryRisk += 20;
    underRecoveryRisk = Math.max(0, Math.min(100, underRecoveryRisk));

    let consistency = 50;
    if (!flat.length) consistency = 0;
    else {
      consistency += Math.min(25, totalDays * 5);
      if (daysOff >= 5) consistency -= 20;
      if (daysOff >= 8) consistency -= 30;
      consistency = Math.max(0, Math.min(100, consistency));
    }

    let mode = 'normal';
    if (underRecoveryRisk >= 65 || fatigue >= 75) mode = 'protect';
    else if (fatigue >= 55) mode = 'hold';
    else if (readiness >= 70 && underRecoveryRisk < 30) mode = 'push';

    return {
      checkScore: checkScore,
      readiness: readiness,
      fatigue: fatigue,
      underRecoveryRisk: underRecoveryRisk,
      consistency: consistency,
      painSignals: painSignals,
      recentLoad: recentLoad,
      recentSessionDays: totalDays,
      daysSinceLastLog: daysOff,
      mode: mode
    };
  }

  return {
    scoreChecks: scoreChecks,
    analyse: analyse
  };
})();
