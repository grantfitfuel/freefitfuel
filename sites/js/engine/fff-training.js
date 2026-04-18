// FreeFitFuel Engine — Training Intelligence (Decision Layer)

window.FFFTraining = (function () {
  'use strict';

  function score(log) {
    return (Number(log.weight) || 0) * (Number(log.reps) || 0);
  }

  function getTrend(logs) {
    if (!logs || logs.length < 2) {
      return { trend: 'insufficient', delta: 0 };
    }

    const last = logs[logs.length - 1];
    const prev = logs[logs.length - 2];

    const lastScore = score(last);
    const prevScore = score(prev);
    const delta = lastScore - prevScore;

    if (delta > 0) return { trend: 'up', delta };
    if (delta < 0) return { trend: 'down', delta };

    return { trend: 'flat', delta: 0 };
  }

  function detectPain(logs) {
    if (!logs || !logs.length) return false;

    const latest = logs[logs.length - 1];
    const notes = String(latest.notes || '').toLowerCase();

    const flags = ['pain','sharp','twinge','injury','strain','tight','ache'];
    return flags.some(f => notes.includes(f));
  }

  function decideExercise(profile, logs, recovery, mind) {

    const trend = getTrend(logs);
    const pain = detectPain(logs);

    const readiness = recovery.score || 0;
    const mental = mind.state || 'neutral';

    let action = 'steady';
    let confidence = 'low';
    let reason = [];

    // 🚨 HARD STOP: pain overrides everything
    if (pain) {
      action = 'protect';
      confidence = 'high';
      reason.push('Pain detected in notes');
      return buildDecision();
    }

    // 🧠 RECOVERY OVERRIDE
    if (readiness <= 1) {
      action = 'hold';
      confidence = 'high';
      reason.push('Recovery score low');
      return buildDecision();
    }

    // 📉 DOWN TREND
    if (trend.trend === 'down') {
      if (readiness >= 3) {
        action = 'adjust';
        reason.push('Performance dropped despite good recovery');
      } else {
        action = 'hold';
        reason.push('Performance drop likely recovery related');
      }
    }

    // ➖ FLAT TREND
    if (trend.trend === 'flat') {
      if (readiness >= 3) {
        action = 'push';
        reason.push('Stable performance with good readiness');
      } else {
        action = 'steady';
        reason.push('Flat but recovery not strong enough to push');
      }
    }

    // 📈 UP TREND
    if (trend.trend === 'up') {
      if (readiness >= 3) {
        action = 'progress';
        reason.push('Performance improving with good recovery');
      } else {
        action = 'steady';
        reason.push('Improvement but recovery not optimal');
      }
    }

    // 🧠 MENTAL STATE MODIFIER
    if (mental === 'fatigued' || mental === 'overwhelmed') {
      if (action === 'progress') action = 'steady';
      reason.push('Mental fatigue detected');
    }

    // 🦵 FAMILY-LEVEL SAFETY
    if (profile && profile.riskZones && profile.riskZones.includes('low back') && trend.trend === 'down') {
      action = 'protect';
      reason.push('Back-sensitive movement trending down');
    }

    confidence = reason.length >= 2 ? 'high' : 'moderate';

    return buildDecision();

    function buildDecision() {
      return {
        action,
        trend: trend.trend,
        delta: trend.delta,
        readiness,
        mental,
        reason,
        confidence,
        profile
      };
    }
  }

  function decideGlobal(recovery, mind, roadmap, totalLogs) {

    const readiness = recovery.score || 0;
    const mental = mind.state || 'neutral';
    const phase = roadmap.currentStageType || 'unknown';

    let mode = 'steady';
    let reason = [];

    // 🔁 EARLY STAGE
    if (totalLogs < 5) {
      return {
        mode: 'build-habit',
        reason: ['Not enough data yet — focus on consistency']
      };
    }

    // 🧠 LOW RECOVERY
    if (readiness <= 1) {
      return {
        mode: 'recovery-priority',
        reason: ['Low recovery score — reduce intensity']
      };
    }

    // 🔥 PHASE LOGIC
    if (phase === 'cut') {
      if (readiness >= 3) {
        mode = 'preserve';
        reason.push('Cut phase — maintain strength');
      } else {
        mode = 'recover';
        reason.push('Cut phase with low readiness');
      }
    }

    if (phase === 'build' || phase === 'bulk') {
      if (readiness >= 3) {
        mode = 'push';
        reason.push('Growth phase with readiness');
      } else {
        mode = 'steady';
        reason.push('Growth phase but recovery not optimal');
      }
    }

    if (phase === 'rebuild') {
      mode = 'protect';
      reason.push('Rebuild phase — protect movement quality');
    }

    if (phase === 'maintain') {
      mode = 'steady';
      reason.push('Maintenance phase — consistency over progression');
    }

    // 🧠 MENTAL STATE
    if (mental === 'fatigued') {
      mode = 'recovery-priority';
      reason.push('Mental fatigue detected');
    }

    return {
      mode,
      reason,
      readiness,
      mental,
      phase
    };
  }

  return {
    getTrend,
    decideExercise,
    decideGlobal
  };
})();
