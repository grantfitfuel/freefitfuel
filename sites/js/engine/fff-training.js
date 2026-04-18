// FreeFitFuel Engine — Training / Decision Layer

window.FFFTraining = (function () {
  'use strict';

  function score(entry) {
    return (Number(entry.weight) || 0) * (Number(entry.reps) || 0);
  }

  function getTrend(logs) {
    logs = Array.isArray(logs) ? logs : [];
    if (logs.length < 2) {
      return { trend: 'insufficient', delta: 0, slope: 'unknown' };
    }

    const last = logs[logs.length - 1];
    const prev = logs[logs.length - 2];
    const delta = score(last) - score(prev);

    if (delta > 0) return { trend: 'up', delta: delta, slope: 'positive' };
    if (delta < 0) return { trend: 'down', delta: delta, slope: 'negative' };
    return { trend: 'flat', delta: 0, slope: 'flat' };
  }

  function multiTrend(logs) {
    logs = Array.isArray(logs) ? logs : [];
    if (logs.length < 4) return 'short';

    const recent = logs.slice(-4).map(score);
    let rises = 0;
    let falls = 0;
    for (let i = 1; i < recent.length; i++) {
      if (recent[i] > recent[i - 1]) rises++;
      else if (recent[i] < recent[i - 1]) falls++;
    }

    if (rises >= 2 && falls === 0) return 'building';
    if (falls >= 2 && rises === 0) return 'sliding';
    if (rises === 0 && falls === 0) return 'plateau';
    return 'mixed';
  }

  function detectPainRisk(logs, recovery) {
    const arr = Array.isArray(logs) ? logs : [];
    const recent = arr.slice(-4);
    const painWords = ['pain','sharp','strain','injury','twinge','flare','aggravated','niggle','sore','hurt'];
    let hits = 0;

    recent.forEach(function (e) {
      const txt = String(e.notes || '').toLowerCase();
      painWords.forEach(function (w) {
        if (txt.indexOf(w) > -1) hits++;
      });
    });

    if (hits >= 2 || (recovery && recovery.painSignals >= 2)) return 'high';
    if (hits >= 1 || (recovery && recovery.painSignals >= 1)) return 'moderate';
    return 'low';
  }

  function decideExercise(profile, logs, recovery, mind) {
    logs = Array.isArray(logs) ? logs : [];
    const latest = logs.length ? logs[logs.length - 1] : null;
    const trend = getTrend(logs);
    const longer = multiTrend(logs);
    const painRisk = detectPainRisk(logs, recovery);

    if (!latest) {
      return {
        action: 'start',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'No exercise data yet. Start conservatively and build from clean logs.',
        nextStep: 'Log a first controlled working set and note how it felt.'
      };
    }

    if (painRisk === 'high') {
      return {
        action: 'protect',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'Pain or flare language is too prominent to treat this as a normal progression question.',
        nextStep: 'Reduce load or range, swap the movement if needed, and prioritise symptom-calming over numbers.'
      };
    }

    if (recovery && recovery.mode === 'protect') {
      return {
        action: 'recover',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'Recovery markers are poor enough that forcing progression would be low-quality decision making.',
        nextStep: 'Hold or reduce load, keep reps clean, and focus on sleep, hydration, and food.'
      };
    }

    if (mind && mind.risk === 'high') {
      return {
        action: 'steady',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'Mental pressure looks high. The session should feel achievable, not like another test to fail.',
        nextStep: 'Keep today stable and aim for clean completion rather than chasing a jump.'
      };
    }

    if (trend.trend === 'up' && recovery && recovery.readiness >= 65 && (!mind || mind.confidence >= 50)) {
      return {
        action: 'progress',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'Performance is moving upward and readiness looks solid enough to justify a measured increase.',
        nextStep: 'Progress slightly next time: add a rep or a small load increase if form stays clean.'
      };
    }

    if (longer === 'plateau' && recovery && recovery.mode === 'normal') {
      return {
        action: 'refine',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'This looks more like a true plateau than a bad day. The answer is better execution, not random forcing.',
        nextStep: 'Keep load steady, tighten rest and technique, and try to beat quality before load.'
      };
    }

    if (trend.trend === 'down' && recovery && recovery.underRecoveryRisk >= 45) {
      return {
        action: 'hold',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'Numbers are down in a context of poorer recovery. This points to fatigue, not failure.',
        nextStep: 'Hold load or reduce volume next session and rebuild quality first.'
      };
    }

    if (trend.trend === 'down' && mind && mind.selfCriticism >= 50) {
      return {
        action: 'steady',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'There is a small performance dip, but the bigger risk is overreacting to it psychologically.',
        nextStep: 'Treat this as one session, not a verdict. Keep the plan calm and controlled.'
      };
    }

    if (recovery && recovery.mode === 'push' && trend.trend !== 'down') {
      return {
        action: 'push',
        trend: trend,
        painRisk: painRisk,
        reasoning: 'Recovery looks good and there is no strong negative signal in this lift.',
        nextStep: 'A small progression is reasonable if the last reps were technically clean.'
      };
    }

    return {
      action: 'hold',
      trend: trend,
      painRisk: painRisk,
      reasoning: 'The safest high-value choice is to keep building without rushing the progression.',
      nextStep: 'Repeat the movement cleanly and let consistency do the work.'
    };
  }

  function decideGlobal(recovery, mind, roadmapSummary, totalLogs) {
    if (!totalLogs) {
      return {
        mode: 'start',
        reasoning: 'No training history yet. The immediate goal is building the habit and collecting useful signal.'
      };
    }

    if (recovery && recovery.mode === 'protect') {
      return {
        mode: 'protect',
        reasoning: 'Recovery risk is elevated. Global coaching should favour protection, symptom control, and reducing pressure.'
      };
    }

    if (mind && mind.risk === 'high') {
      return {
        mode: 'steady',
        reasoning: 'Psychological pressure or distress looks high. Coaching should stabilise rather than intensify.'
      };
    }

    if (recovery && recovery.mode === 'hold') {
      return {
        mode: 'hold',
        reasoning: 'Recovery is not poor enough for a full protect mode, but not good enough for aggressive progression.'
      };
    }

    if (recovery && recovery.mode === 'push' && mind && mind.confidence >= 55) {
      return {
        mode: 'push',
        reasoning: 'Recovery and mindset both support a slightly more assertive coaching stance.'
      };
    }

    return {
      mode: 'build',
      reasoning: 'The global picture points toward steady accumulation rather than dramatic change.'
    };
  }

  return {
    getTrend: getTrend,
    decideExercise: decideExercise,
    decideGlobal: decideGlobal
  };
})();
