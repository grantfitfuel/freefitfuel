// FreeFitFuel Engine — Training Intelligence (Pattern-Level Decision Layer)

window.FFFTraining = (function () {
  'use strict';

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  function score(log) {
    return (Number(log && log.weight) || 0) * (Number(log && log.reps) || 0);
  }

  function latest(logs) {
    logs = safeArray(logs);
    return logs.length ? logs[logs.length - 1] : null;
  }

  function getTrend(logs) {
    logs = safeArray(logs);

    if (logs.length < 2) {
      return { trend: 'insufficient', delta: 0, lastScore: 0, prevScore: 0 };
    }

    const last = logs[logs.length - 1];
    const prev = logs[logs.length - 2];
    const lastScore = score(last);
    const prevScore = score(prev);
    const delta = lastScore - prevScore;

    if (delta > 0) return { trend: 'up', delta: delta, lastScore: lastScore, prevScore: prevScore };
    if (delta < 0) return { trend: 'down', delta: delta, lastScore: lastScore, prevScore: prevScore };
    return { trend: 'flat', delta: 0, lastScore: lastScore, prevScore: prevScore };
  }

  function getLongerTrend(logs) {
    logs = safeArray(logs);
    if (logs.length < 4) return 'short';

    const recent = logs.slice(-4).map(score);
    let rises = 0;
    let falls = 0;
    let flats = 0;

    for (let i = 1; i < recent.length; i++) {
      if (recent[i] > recent[i - 1]) rises++;
      else if (recent[i] < recent[i - 1]) falls++;
      else flats++;
    }

    if (rises >= 2 && falls === 0) return 'building';
    if (falls >= 2 && rises === 0) return 'sliding';
    if (flats >= 2 && rises === 0 && falls === 0) return 'plateau';
    return 'mixed';
  }

  function detectPain(logs) {
    logs = safeArray(logs);
    if (!logs.length) return false;

    const notes = String((logs[logs.length - 1] && logs[logs.length - 1].notes) || '').toLowerCase();
    const flags = ['pain','sharp','twinge','injury','strain','tight','ache','flare','aggravated','niggle','sore','hurt'];
    return flags.some(function (f) { return notes.indexOf(f) > -1; });
  }

  function familySignal(profile, logs, recovery) {
    const trend = getTrend(logs);
    const longer = getLongerTrend(logs);

    let familyState = 'neutral';
    let concern = 0;

    if (trend.trend === 'down') concern += 20;
    if (longer === 'sliding') concern += 25;
    if (longer === 'plateau') concern += 15;
    if (detectPain(logs)) concern += 30;

    if (profile && safeArray(profile.riskZones).indexOf('low back') > -1 && trend.trend === 'down') concern += 15;
    if (profile && safeArray(profile.riskZones).indexOf('shoulder') > -1 && detectPain(logs)) concern += 15;
    if (recovery && recovery.underRecoveryRisk >= 45) concern += 15;

    if (concern >= 55) familyState = 'fatigued';
    else if (concern >= 35) familyState = 'watch';
    else if (trend.trend === 'up' && longer === 'building') familyState = 'progressing';

    return {
      state: familyState,
      concern: concern,
      trend: trend,
      longer: longer
    };
  }

  function phaseLens(roadmapSummary) {
    const current = roadmapSummary || {};
    const stage = current.currentStageType || 'unknown';

    return {
      stage: stage,
      bias: current.currentBias || 'unknown',
      progressionExpectation: current.progressionExpectation || 'unknown',
      flatOk: !!(window.FFFRoadmap && typeof window.FFFRoadmap.isFlatPerformanceAcceptable === 'function'
        ? window.FFFRoadmap.isFlatPerformanceAcceptable(current)
        : false),
      seekProgress: !!(window.FFFRoadmap && typeof window.FFFRoadmap.shouldSeekProgress === 'function'
        ? window.FFFRoadmap.shouldSeekProgress(current)
        : false)
    };
  }

  function decideExercise(profile, logs, recovery, mind, roadmapSummary) {
    logs = safeArray(logs);

    const shortTrend = getTrend(logs);
    const longTrend = getLongerTrend(logs);
    const pain = detectPain(logs);
    const family = familySignal(profile, logs, recovery);
    const phase = phaseLens(roadmapSummary);

    const readiness = recovery && typeof recovery.readiness === 'number' ? recovery.readiness : 50;
    const fatigue = recovery && typeof recovery.fatigue === 'number' ? recovery.fatigue : 20;
    const underRecoveryRisk = recovery && typeof recovery.underRecoveryRisk === 'number' ? recovery.underRecoveryRisk : 0;
    const mentalRisk = mind && mind.risk ? mind.risk : 'low';
    const confidence = mind && typeof mind.confidence === 'number' ? mind.confidence : 50;
    const pressure = mind && typeof mind.pressure === 'number' ? mind.pressure : 20;

    let action = 'hold';
    let reason = [];
    let tone = 'grounded';
    let patternState = family.state;
    let confidenceBand = 'moderate';

    if (!logs.length) {
      return {
        action: 'start',
        reason: ['No exercise data yet'],
        tone: 'grounded',
        confidenceBand: 'high',
        trend: shortTrend,
        longTrend: longTrend,
        patternState: 'unknown',
        phase: phase,
        profile: profile,
        nextStep: 'Start with a clean baseline set and clear notes.'
      };
    }

    if (pain) {
      action = 'protect';
      tone = 'protective';
      confidenceBand = 'high';
      reason.push('Pain or symptom language appears in the latest note');
      if (profile && profile.family) reason.push('This movement sits in the ' + profile.family + ' family');
      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: 'Reduce load or range, or swap to a friendlier variation.'
      };
    }

    if (underRecoveryRisk >= 65 || fatigue >= 75) {
      action = 'recover';
      tone = 'protective';
      confidenceBand = 'high';
      reason.push('Recovery profile is too weak for aggressive progression');
      if (family.state === 'fatigued') reason.push('This exercise pattern also looks fatigued');
      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: 'Hold or reduce load and prioritise recovery before chasing numbers.'
      };
    }

    if (mentalRisk === 'high' || pressure >= 75) {
      action = 'steady';
      tone = 'steadying';
      confidenceBand = 'high';
      reason.push('Mental pressure is high enough that a calmer ask makes more sense');
      if (confidence < 40) reason.push('Confidence is currently fragile');
      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: 'Aim for clean completion rather than trying to force a jump.'
      };
    }

    if (family.state === 'fatigued') {
      action = 'hold';
      tone = 'grounded';
      confidenceBand = 'high';
      reason.push('This exercise pattern looks fatigued, not just this single set');
      if (shortTrend.trend === 'down') reason.push('The latest signal is down as well');
      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: 'Keep load stable or trim volume while you restore quality.'
      };
    }

    if (shortTrend.trend === 'up' && readiness >= 65 && mentalRisk !== 'high') {
      action = 'progress';
      tone = 'confident';
      confidenceBand = 'moderate';
      reason.push('Performance is moving upward');
      reason.push('Recovery is supportive enough for a measured increase');
      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: 'Add a rep or a small load increase next time, not both.'
      };
    }

    if (shortTrend.trend === 'flat') {
      if (phase.flatOk) {
        action = 'steady';
        tone = 'grounded';
        confidenceBand = 'high';
        reason.push('Flat performance is acceptable in the current phase');
        if (phase.stage !== 'unknown') reason.push('Current phase: ' + phase.stage);
      } else if (phase.seekProgress && readiness >= 60) {
        action = 'refine';
        tone = 'firm';
        confidenceBand = 'moderate';
        reason.push('This phase should usually show progress, so a flat trend deserves attention');
      } else {
        action = 'hold';
        tone = 'grounded';
        confidenceBand = 'moderate';
        reason.push('Flat performance alone is not a crisis');
      }

      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: action === 'refine'
          ? 'Keep the load steady and improve execution, rest discipline, and rep quality.'
          : 'Repeat cleanly and let consistency do the work.'
      };
    }

    if (shortTrend.trend === 'down') {
      if (phase.flatOk && readiness < 60) {
        action = 'steady';
        tone = 'supportive';
        confidenceBand = 'moderate';
        reason.push('A small dip is not unusual in this phase');
        reason.push('Recovery is not strong enough to interpret this as underperformance');
      } else if (phase.seekProgress) {
        action = 'adjust';
        tone = 'firm';
        confidenceBand = 'moderate';
        reason.push('This phase expects clearer progress than the current trend is showing');
      } else {
        action = 'hold';
        tone = 'grounded';
        confidenceBand = 'moderate';
        reason.push('This looks like a manageable dip rather than a collapse');
      }

      return {
        action, reason, tone, confidenceBand, trend: shortTrend, longTrend, patternState, phase, profile,
        nextStep: action === 'adjust'
          ? 'Check recovery, tighten execution, and consider a small programming adjustment rather than forcing harder.'
          : 'Treat this as one session and rebuild quality next time.'
      };
    }

    return {
      action: 'hold',
      reason: ['No strong signal to change course aggressively'],
      tone: 'grounded',
      confidenceBand: 'moderate',
      trend: shortTrend,
      longTrend: longTrend,
      patternState: patternState,
      phase: phase,
      profile: profile,
      nextStep: 'Stay controlled and keep accumulating useful logs.'
    };
  }

  function decideGlobal(recovery, mind, roadmapSummary, totalLogs) {
    const readiness = recovery && typeof recovery.readiness === 'number' ? recovery.readiness : 50;
    const fatigue = recovery && typeof recovery.fatigue === 'number' ? recovery.fatigue : 20;
    const underRecoveryRisk = recovery && typeof recovery.underRecoveryRisk === 'number' ? recovery.underRecoveryRisk : 0;
    const mentalRisk = mind && mind.risk ? mind.risk : 'low';
    const pressure = mind && typeof mind.pressure === 'number' ? mind.pressure : 20;
    const phase = phaseLens(roadmapSummary);

    let mode = 'build';
    let reason = [];
    let tone = 'grounded';

    if (!totalLogs) {
      return {
        mode: 'start',
        tone: 'grounded',
        reason: ['No log history yet — build consistency first'],
        phase: phase
      };
    }

    if (underRecoveryRisk >= 65 || fatigue >= 75) {
      return {
        mode: 'protect',
        tone: 'protective',
        reason: ['Global recovery picture is poor enough to prioritise recovery and sustainability'],
        phase: phase
      };
    }

    if (mentalRisk === 'high' || pressure >= 75) {
      return {
        mode: 'steady',
        tone: 'steadying',
        reason: ['Mental pressure is high enough that the global ask should come down'],
        phase: phase
      };
    }

    if (phase.stage === 'rebuild') {
      return {
        mode: 'protect',
        tone: 'protective',
        reason: ['Rebuild phase: movement quality and confidence matter more than forcing numbers'],
        phase: phase
      };
    }

    if (phase.stage === 'cut') {
      if (readiness >= 65) {
        return {
          mode: 'preserve',
          tone: 'grounded',
          reason: ['Cut phase: the job is to preserve strength and keep recovery honest'],
          phase: phase
        };
      }
      return {
        mode: 'recover',
        tone: 'supportive',
        reason: ['Cut phase plus lower readiness: hold expectations steady and protect recovery'],
        phase: phase
      };
    }

    if (phase.stage === 'maintain') {
      return {
        mode: 'steady',
        tone: 'grounded',
        reason: ['Maintenance phase: consistency matters more than constant escalation'],
        phase: phase
      };
    }

    if (phase.stage === 'build' || phase.stage === 'bulk') {
      if (readiness >= 65 && mentalRisk !== 'high') {
        return {
          mode: 'push',
          tone: 'confident',
          reason: ['Growth-oriented phase with enough readiness to support progression'],
          phase: phase
        };
      }
      return {
        mode: 'hold',
        tone: 'grounded',
        reason: ['Growth-oriented phase, but recovery is not strong enough for aggressive pushing'],
        phase: phase
      };
    }

    if (phase.stage === 'transform' || phase.stage === 'foundation') {
      return {
        mode: 'build',
        tone: 'grounded',
        reason: ['This phase rewards patience, clean trendlines, and repeated good decisions'],
        phase: phase
      };
    }

    return {
      mode: 'build',
      tone: 'grounded',
      reason: ['The broader picture supports steady accumulation rather than a dramatic shift'],
      phase: phase
    };
  }

  return {
    getTrend: getTrend,
    decideExercise: decideExercise,
    decideGlobal: decideGlobal
  };
})();
