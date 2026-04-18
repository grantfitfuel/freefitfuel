// FreeFitFuel Engine — Recovery Intelligence

window.FFFRecovery = (function () {
  'use strict';

  function scoreChecks(checks) {
    let score = 0;
    if (checks.hydration) score += 1;
    if (checks.sleep) score += 1;
    if (checks.macros) score += 1;
    if (checks.cardio) score += 1;
    return score;
  }

  function getTrafficLight(score) {
    if (score >= 4) return 'green';
    if (score >= 2) return 'amber';
    return 'red';
  }

  function hasPainSignal(notes) {
    const text = String(notes || '').toLowerCase();
    const words = ['pain', 'sharp', 'strain', 'injury', 'dizzy', 'flare', 'spasm', 'twinge', 'swollen'];
    return words.some(function (w) { return text.indexOf(w) !== -1; });
  }

  function gatherRecentNotes(allLogs) {
    const notes = [];
    Object.keys(allLogs || {}).forEach(function (exercise) {
      (allLogs[exercise] || []).slice(-3).forEach(function (entry) {
        if (entry && entry.notes) notes.push(entry.notes);
      });
    });
    return notes;
  }

  function analyse(checks, allLogs) {
    const score = scoreChecks(checks || {});
    const light = getTrafficLight(score);
    const recentNotes = gatherRecentNotes(allLogs);
    const painFlag = recentNotes.some(hasPainSignal);

    let readiness = 50;

    if (score === 4) readiness += 35;
    else if (score === 3) readiness += 20;
    else if (score === 2) readiness += 5;
    else readiness -= 20;

    if (painFlag) readiness -= 25;

    readiness = Math.max(0, Math.min(100, readiness));

    let recommendation = 'hold';
    if (painFlag) recommendation = 'protect';
    else if (readiness >= 80) recommendation = 'push_small';
    else if (readiness >= 60) recommendation = 'train_normal';
    else if (readiness >= 40) recommendation = 'hold';
    else recommendation = 'reduce';

    return {
      score: score,
      light: light,
      readiness: readiness,
      painFlag: painFlag,
      recommendation: recommendation
    };
  }

  return {
    scoreChecks,
    getTrafficLight,
    hasPainSignal,
    analyse
  };
})();
