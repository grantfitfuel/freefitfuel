// FreeFitFuel Engine — Training Decisions

window.FFFTraining = (function () {
  'use strict';

  function getTrend(logs) {
    if (!Array.isArray(logs) || logs.length < 2) {
      return { direction: 'insufficient', delta: 0 };
    }

    const last = logs[logs.length - 1];
    const prev = logs[logs.length - 2];

    const lastScore = (Number(last.weight) || 0) * (Number(last.reps) || 0);
    const prevScore = (Number(prev.weight) || 0) * (Number(prev.reps) || 0);
    const delta = lastScore - prevScore;

    if (delta > 0) return { direction: 'up', delta: delta };
    if (delta < 0) return { direction: 'down', delta: delta };
    return { direction: 'flat', delta: 0 };
  }

  function decideExercise(exerciseProfile, logs, recovery, mind) {
    const trend = getTrend(logs);
    const latest = logs.length ? logs[logs.length - 1] : null;
    const notes = latest ? String(latest.notes || '') : '';
    const painFlag = window.FFFRecovery.hasPainSignal(notes);

    let action = 'hold';
    let emphasis = 'quality';

    if (!latest) {
      action = 'start';
      emphasis = 'learn';
    } else if (painFlag) {
      action = 'reduce';
      emphasis = 'protect';
    } else if (recovery.recommendation === 'push_small' && trend.direction !== 'down') {
      action = 'progress';
      emphasis = 'confidence';
    } else if (recovery.recommendation === 'reduce') {
      action = 'reduce';
      emphasis = 'recovery';
    } else if (trend.direction === 'down') {
      action = 'hold';
      emphasis = 'technique';
    } else if (trend.direction === 'up') {
      action = 'progress';
      emphasis = 'momentum';
    }

    if (mind.narrative === 'capacity_low') {
      action = 'reduce';
      emphasis = 'capacity';
    }

    if (mind.narrative === 'inner_critic_high' && action === 'progress') {
      action = 'hold';
      emphasis = 'quality';
    }

    return {
      action: action,
      emphasis: emphasis,
      trend: trend,
      painFlag: painFlag,
      latest: latest,
      profile: exerciseProfile
    };
  }

  function decideGlobal(recovery, mind, roadmapSummary, totalLogs) {
    let mode = 'steady';

    if (recovery.painFlag) mode = 'protect';
    else if (mind.narrative === 'capacity_low') mode = 'downshift';
    else if (recovery.readiness >= 80) mode = 'push';
    else if (recovery.readiness <= 40) mode = 'recover';

    return {
      mode: mode,
      roadmap: roadmapSummary,
      totalLogs: totalLogs
    };
  }

  return {
    getTrend,
    decideExercise,
    decideGlobal
  };
})();
