// FreeFitFuel Engine — Training Intelligence
// Pattern-level, family-level, weekly summary, adherence, and swap logic

window.FFFTraining = (function () {
  'use strict';

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  function safeObj(v) {
    return v && typeof v === 'object' ? v : {};
  }

  function score(log) {
    return (Number(log && log.weight) || 0) * (Number(log && log.reps) || 0);
  }

  function dayKey(dateStr) {
    if (!dateStr) return '';
    return String(dateStr).slice(0, 10);
  }

  function flattenLogs(allLogs) {
    allLogs = safeObj(allLogs);
    const out = [];

    Object.keys(allLogs).forEach(function (exercise) {
      safeArray(allLogs[exercise]).forEach(function (entry) {
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

  function lastNDaysLogs(allLogs, days) {
    const flat = flattenLogs(allLogs);
    const cutoff = Date.now() - (days * 86400000);
    return flat.filter(function (entry) {
      return new Date(entry.date || 0).getTime() >= cutoff;
    });
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

  function phaseLens(roadmapSummary) {
    const current = roadmapSummary || {};
    return {
      stage: current.currentStageType || 'unknown',
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

  function classifyFamily(profile) {
    return profile && profile.family ? profile.family : 'general';
  }

  function familyLabel(family) {
    const map = {
      'horizontal-push': 'pressing',
      'vertical-push': 'pressing',
      'horizontal-pull': 'pulling',
      'vertical-pull': 'pulling',
      'squat': 'lower-body',
      'hinge': 'posterior-chain',
      'core-anti-extension': 'core',
      'core-rotation-lateral': 'core',
      'calf-foot': 'foot-calf',
      'cardio-z2': 'easy-cardio',
      'cardio-threshold': 'quality-cardio',
      'general': 'general'
    };
    return map[family] || family || 'general';
  }

  function analyseFamilies(allLogs) {
    allLogs = safeObj(allLogs);
    const families = {};

    Object.keys(allLogs).forEach(function (exercise) {
      const profile = window.FFFExerciseDB && typeof window.FFFExerciseDB.getExerciseProfile === 'function'
        ? window.FFFExerciseDB.getExerciseProfile(exercise)
        : { family: 'general' };

      const family = classifyFamily(profile);
      if (!families[family]) families[family] = [];
      families[family].push({
        exercise: exercise,
        profile: profile,
        logs: safeArray(allLogs[exercise])
      });
    });

    return families;
  }

  function aggregateFamilySignals(familyEntries, recovery) {
    familyEntries = safeArray(familyEntries);

    if (!familyEntries.length) {
      return {
        state: 'unknown',
        concern: 0,
        exerciseCount: 0,
        upCount: 0,
        downCount: 0,
        flatCount: 0,
        painCount: 0,
        longestPattern: 'unknown'
      };
    }

    let concern = 0;
    let upCount = 0;
    let downCount = 0;
    let flatCount = 0;
    let painCount = 0;
    let buildingCount = 0;
    let slidingCount = 0;
    let plateauCount = 0;

    familyEntries.forEach(function (item) {
      const logs = safeArray(item.logs);
      const shortTrend = getTrend(logs);
      const longerTrend = getLongerTrend(logs);
      const pain = detectPain(logs);

      if (shortTrend.trend === 'up') upCount++;
      if (shortTrend.trend === 'down') downCount++;
      if (shortTrend.trend === 'flat') flatCount++;

      if (longerTrend === 'building') buildingCount++;
      if (longerTrend === 'sliding') slidingCount++;
      if (longerTrend === 'plateau') plateauCount++;

      if (pain) painCount++;

      if (shortTrend.trend === 'down') concern += 18;
      if (longerTrend === 'sliding') concern += 20;
      if (longerTrend === 'plateau') concern += 10;
      if (pain) concern += 25;
    });

    if (recovery && recovery.underRecoveryRisk >= 45) concern += 15;
    if (recovery && recovery.fatigue >= 60) concern += 15;

    let state = 'neutral';
    if (painCount >= 1 || concern >= 55) state = 'fatigued';
    else if (downCount >= 1 || slidingCount >= 1 || plateauCount >= 2) state = 'watch';
    else if (upCount >= 1 || buildingCount >= 1) state = 'progressing';

    let longestPattern = 'mixed';
    if (buildingCount > slidingCount && buildingCount >= plateauCount) longestPattern = 'building';
    else if (slidingCount > buildingCount && slidingCount >= plateauCount) longestPattern = 'sliding';
    else if (plateauCount > 0 && plateauCount >= buildingCount && plateauCount >= slidingCount) longestPattern = 'plateau';

    return {
      state: state,
      concern: concern,
      exerciseCount: familyEntries.length,
      upCount: upCount,
      downCount: downCount,
      flatCount: flatCount,
      painCount: painCount,
      longestPattern: longestPattern
    };
  }

  function summariseFamilies(allLogs, recovery) {
    const groups = analyseFamilies(allLogs);
    const out = {};

    Object.keys(groups).forEach(function (family) {
      out[family] = aggregateFamilySignals(groups[family], recovery);
    });

    return out;
  }

  function strongestFamily(familySummary) {
    familySummary = safeObj(familySummary);
    let best = null;
    let bestScore = -Infinity;

    Object.keys(familySummary).forEach(function (family) {
      const s = familySummary[family];
      let value = 0;
      if (s.state === 'progressing') value += 30;
      value += (s.upCount || 0) * 10;
      if (s.longestPattern === 'building') value += 15;
      value -= (s.painCount || 0) * 20;
      if (value > bestScore) {
        bestScore = value;
        best = family;
      }
    });

    return best;
  }

  function weakestFamily(familySummary) {
    familySummary = safeObj(familySummary);
    let worst = null;
    let worstScore = -Infinity;

    Object.keys(familySummary).forEach(function (family) {
      const s = familySummary[family];
      let value = 0;
      if (s.state === 'fatigued') value += 40;
      if (s.state === 'watch') value += 20;
      value += (s.downCount || 0) * 10;
      value += (s.painCount || 0) * 20;
      if (s.longestPattern === 'sliding') value += 15;
      if (value > worstScore) {
        worstScore = value;
        worst = family;
      }
    });

    return worst;
  }

  function recommendedSwapForFamily(family) {
    const map = {
      'horizontal-push': ['floor press', 'incline push-up', 'light dumbbell bench'],
      'vertical-push': ['landmine press', 'half-kneeling press', 'seated dumbbell press'],
      'horizontal-pull': ['chest-supported row', 'band row', 'light seated row'],
      'vertical-pull': ['lat pulldown', 'band-assisted pull-up', 'ring row'],
      'squat': ['box squat', 'chair squat', 'split squat to reduced depth'],
      'hinge': ['glute bridge', 'hip thrust', 'reduced-range RDL'],
      'core-anti-extension': ['dead bug', 'short plank', 'bear hold'],
      'core-rotation-lateral': ['side plank from knees', 'light suitcase carry', 'short pallof press'],
      'calf-foot': ['supported calf raise', 'double-leg heel raise', 'small-range tib raise'],
      'cardio-threshold': ['shorter tempo block', 'fewer intervals', 'easier steady run'],
      'cardio-z2': ['walk', 'easy bike', 'shorter Z2 session']
    };
    return map[family] || [];
  }

  function weeklySummary(allLogs, recovery, roadmapSummary) {
    const last7 = lastNDaysLogs(allLogs, 7);
    const uniqueDays = {};
    const exerciseSet = {};
    let painMentions = 0;
    let totalScore = 0;

    last7.forEach(function (entry) {
      const dk = dayKey(entry.date);
      if (dk) uniqueDays[dk] = true;
      exerciseSet[entry.exercise] = true;
      totalScore += score(entry);

      const txt = String(entry.notes || '').toLowerCase();
      ['pain','sharp','flare','aggravated','injury','strain','twinge','niggle','sore'].forEach(function (w) {
        if (txt.indexOf(w) > -1) painMentions++;
      });
    });

    const familySummary = summariseFamilies(
      groupLogs(last7),
      recovery
    );

    const strongest = strongestFamily(familySummary);
    const weakest = weakestFamily(familySummary);
    const phase = phaseLens(roadmapSummary);

    let adherence = 0;
    adherence += Math.min(Object.keys(uniqueDays).length, 5) * 15;
    if (recovery && typeof recovery.checkScore === 'number') adherence += recovery.checkScore * 5;
    adherence = Math.max(0, Math.min(100, adherence));

    let quality = 50;
    if (painMentions > 0) quality -= Math.min(25, painMentions * 5);
    if (weakest && familySummary[weakest] && familySummary[weakest].state === 'fatigued') quality -= 15;
    if (strongest && familySummary[strongest] && familySummary[strongest].state === 'progressing') quality += 10;
    quality = Math.max(0, Math.min(100, quality));

    let weeklyMode = 'steady';
    if (adherence < 35) weeklyMode = 'rebuild-habit';
    else if (quality < 40) weeklyMode = 'reduce-strain';
    else if (phase.seekProgress && adherence >= 60 && quality >= 55) weeklyMode = 'progress-week';
    else if (phase.flatOk) weeklyMode = 'patient-week';

    return {
      sessionsLogged: Object.keys(uniqueDays).length,
      exercisesTouched: Object.keys(exerciseSet).length,
      painMentions: painMentions,
      weeklyLoadProxy: totalScore,
      adherence: adherence,
      quality: quality,
      strongestFamily: strongest,
      weakestFamily: weakest,
      familySummary: familySummary,
      weeklyMode: weeklyMode,
      swapSuggestions: weakest ? recommendedSwapForFamily(weakest) : []
    };
  }

  function groupLogs(flatLogs) {
    const out = {};
    safeArray(flatLogs).forEach(function (entry) {
      if (!out[entry.exercise]) out[entry.exercise] = [];
      out[entry.exercise].push(entry);
    });
    return out;
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
      if (profile && profile.family) reason.push('This movement sits in the ' + familyLabel(profile.family) + ' pattern');
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

  function decideGlobal(recovery, mind, roadmapSummary, totalLogs, allLogs) {
    const readiness = recovery && typeof recovery.readiness === 'number' ? recovery.readiness : 50;
    const fatigue = recovery && typeof recovery.fatigue === 'number' ? recovery.fatigue : 20;
    const underRecoveryRisk = recovery && typeof recovery.underRecoveryRisk === 'number' ? recovery.underRecoveryRisk : 0;
    const checkScore = recovery && typeof recovery.checkScore === 'number' ? recovery.checkScore : 0;
    const mentalRisk = mind && mind.risk ? mind.risk : 'low';
    const pressure = mind && typeof mind.pressure === 'number' ? mind.pressure : 20;
    const confidence = mind && typeof mind.confidence === 'number' ? mind.confidence : 50;
    const phase = phaseLens(roadmapSummary);

    const familySummary = summariseFamilies(allLogs || {}, recovery);
    const strongest = strongestFamily(familySummary);
    const weakest = weakestFamily(familySummary);
    const week = weeklySummary(allLogs || {}, recovery, roadmapSummary);

    let mode = 'build';
    let reason = [];
    let tone = 'grounded';

    if (!totalLogs) {
      if (checkScore === 4) {
        return {
          mode: 'ready',
          tone: 'confident',
          reason: ['All core recovery markers are in place even though training history is still limited'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }

      if (checkScore === 3) {
        return {
          mode: 'good-foundations',
          tone: 'grounded',
          reason: ['Recovery basics look mostly strong and the system is ready for consistent training'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }

      if (checkScore === 2) {
        return {
          mode: 'mixed-foundations',
          tone: 'grounded',
          reason: ['Some recovery basics are in place, but there is room to tighten the foundation'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }

      if (checkScore <= 1) {
        return {
          mode: 'poor-foundations',
          tone: 'supportive',
          reason: ['Very few recovery basics are currently in place, so expectations should stay realistic'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }
    }

    if (week.weeklyMode === 'rebuild-habit') {
      return {
        mode: 'habit-priority',
        tone: 'supportive',
        reason: ['Weekly adherence is too low to make fine-grained performance calls matter yet'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (underRecoveryRisk >= 65 || fatigue >= 75) {
      return {
        mode: 'protect',
        tone: 'protective',
        reason: ['Global recovery picture is poor enough to prioritise recovery and sustainability'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (mentalRisk === 'high' || pressure >= 75) {
      return {
        mode: 'steady',
        tone: 'steadying',
        reason: ['Mental pressure is high enough that the global ask should come down'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (week.weeklyMode === 'reduce-strain') {
      return {
        mode: 'reduce-strain',
        tone: 'grounded',
        reason: ['The weekly picture suggests too much strain relative to the quality of recent training'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (weakest && familySummary[weakest] && familySummary[weakest].state === 'fatigued') {
      return {
        mode: 'family-fatigue',
        tone: 'grounded',
        reason: ['One movement family looks broadly fatigued rather than this being a one-exercise issue'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (phase.stage === 'rebuild') {
      return {
        mode: 'protect',
        tone: 'protective',
        reason: ['Rebuild phase: movement quality and confidence matter more than forcing numbers'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (phase.stage === 'cut') {
      if (readiness >= 65) {
        return {
          mode: 'preserve',
          tone: 'grounded',
          reason: ['Cut phase: the job is to preserve strength and keep recovery honest'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }
      return {
        mode: 'recover',
        tone: 'supportive',
        reason: ['Cut phase plus lower readiness: hold expectations steady and protect recovery'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (phase.stage === 'maintain') {
      return {
        mode: 'steady',
        tone: 'grounded',
        reason: ['Maintenance phase: consistency matters more than constant escalation'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (phase.stage === 'build' || phase.stage === 'bulk') {
      if (week.weeklyMode === 'progress-week' && readiness >= 65 && mentalRisk !== 'high') {
        return {
          mode: 'push',
          tone: 'confident',
          reason: ['Growth-oriented phase with enough readiness and weekly support to justify progression'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }
      return {
        mode: 'hold',
        tone: 'grounded',
        reason: ['Growth-oriented phase, but the wider weekly picture is not strong enough for aggressive pushing'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    if (phase.stage === 'transform' || phase.stage === 'foundation') {
      if (checkScore === 4 && confidence >= 55) {
        return {
          mode: 'build',
          tone: 'confident',
          reason: ['Recovery basics are strong and this phase rewards patient, steady progress'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }

      if (checkScore <= 1) {
        return {
          mode: 'stabilise',
          tone: 'supportive',
          reason: ['This phase needs consistency, and the recovery basics are too weak to ignore'],
          phase: phase,
          familySummary: familySummary,
          strongestFamily: strongest,
          weakestFamily: weakest,
          weekly: week
        };
      }

      return {
        mode: 'build',
        tone: 'grounded',
        reason: ['This phase rewards patience, clean trendlines, and repeated good decisions'],
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week
      };
    }

    return {
      mode: 'build',
      tone: 'grounded',
      reason: ['The broader picture supports steady accumulation rather than a dramatic shift'],
      phase: phase,
      familySummary: familySummary,
      strongestFamily: strongest,
      weakestFamily: weakest,
      weekly: week
    };
  }

  return {
    getTrend: getTrend,
    decideExercise: decideExercise,
    decideGlobal: decideGlobal,
    summariseFamilies: summariseFamilies,
    strongestFamily: strongestFamily,
    weakestFamily: weakestFamily,
    weeklySummary: weeklySummary,
    familyLabel: familyLabel,
    recommendedSwapForFamily: recommendedSwapForFamily
  };
})();
