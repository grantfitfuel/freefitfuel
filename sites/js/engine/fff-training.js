// FreeFitFuel Engine — Training Intelligence
// Elite adaptive coaching engine

window.FFFTraining = (function () {
  'use strict';

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  function safeObj(v) {
    return v && typeof v === 'object' ? v : {};
  }

  function toNumber(v) {
    var n = Number(v);
    return isNaN(n) ? 0 : n;
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
    var out = [];

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

  function groupLogs(flatLogs) {
    var out = {};
    safeArray(flatLogs).forEach(function (entry) {
      if (!out[entry.exercise]) out[entry.exercise] = [];
      out[entry.exercise].push(entry);
    });
    return out;
  }

  function lastNDaysLogs(allLogs, days) {
    var flat = flattenLogs(allLogs);
    var cutoff = Date.now() - (days * 86400000);
    return flat.filter(function (entry) {
      return new Date(entry.date || 0).getTime() >= cutoff;
    });
  }

  function getTrend(logs) {
    logs = safeArray(logs);

    if (logs.length < 2) {
      return { trend: 'insufficient', delta: 0, lastScore: 0, prevScore: 0 };
    }

    var last = logs[logs.length - 1];
    var prev = logs[logs.length - 2];
    var lastScore = score(last);
    var prevScore = score(prev);
    var delta = lastScore - prevScore;

    if (delta > 0) return { trend: 'up', delta: delta, lastScore: lastScore, prevScore: prevScore };
    if (delta < 0) return { trend: 'down', delta: delta, lastScore: lastScore, prevScore: prevScore };
    return { trend: 'flat', delta: 0, lastScore: lastScore, prevScore: prevScore };
  }

  function getLongerTrend(logs) {
    logs = safeArray(logs);
    if (logs.length < 4) return 'short';

    var recent = logs.slice(-4).map(score);
    var rises = 0;
    var falls = 0;
    var flats = 0;

    for (var i = 1; i < recent.length; i++) {
      if (recent[i] > recent[i - 1]) rises++;
      else if (recent[i] < recent[i - 1]) falls++;
      else flats++;
    }

    if (rises >= 2 && falls === 0) return 'building';
    if (falls >= 2 && rises === 0) return 'sliding';
    if (flats >= 2 && rises === 0 && falls === 0) return 'plateau';
    return 'mixed';
  }

  function containsWords(text, words) {
    text = String(text || '').toLowerCase();
    return words.some(function (w) { return text.indexOf(w) > -1; });
  }

  function detectPain(logs) {
    logs = safeArray(logs);
    if (!logs.length) return false;
    var notes = String((logs[logs.length - 1] && logs[logs.length - 1].notes) || '').toLowerCase();
    return containsWords(notes, ['pain','sharp','twinge','injury','strain','tight','ache','flare','aggravated','niggle','sore','hurt']);
  }

  function phaseLens(roadmapSummary) {
    var current = roadmapSummary || {};
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

  function classifyFamily(profile) {
    return profile && profile.family ? profile.family : 'general';
  }

  function familyLabel(family) {
    var map = {
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

  function familyBucketKey(family) {
    if (family === 'horizontal-push' || family === 'vertical-push') return 'push';
    if (family === 'horizontal-pull' || family === 'vertical-pull') return 'pull';
    if (family === 'squat' || family === 'hinge' || family === 'calf-foot') return 'legs';
    if (family === 'core-anti-extension' || family === 'core-rotation-lateral') return 'core';
    if (family === 'cardio-z2' || family === 'cardio-threshold') return 'cardio';
    return 'other';
  }

  function familySignal(profile, logs, recovery) {
    var trend = getTrend(logs);
    var longer = getLongerTrend(logs);

    var familyState = 'neutral';
    var concern = 0;

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

  function analyseFamilies(allLogs) {
    allLogs = safeObj(allLogs);
    var families = {};

    Object.keys(allLogs).forEach(function (exercise) {
      var profile = window.FFFExerciseDB && typeof window.FFFExerciseDB.getExerciseProfile === 'function'
        ? window.FFFExerciseDB.getExerciseProfile(exercise)
        : { family: 'general' };

      var family = classifyFamily(profile);
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
        longestPattern: 'unknown',
        quality: 50
      };
    }

    var concern = 0;
    var upCount = 0;
    var downCount = 0;
    var flatCount = 0;
    var painCount = 0;
    var buildingCount = 0;
    var slidingCount = 0;
    var plateauCount = 0;

    familyEntries.forEach(function (item) {
      var logs = safeArray(item.logs);
      var shortTrend = getTrend(logs);
      var longerTrend = getLongerTrend(logs);
      var pain = detectPain(logs);

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

    var state = 'neutral';
    if (painCount >= 1 || concern >= 55) state = 'fatigued';
    else if (downCount >= 1 || slidingCount >= 1 || plateauCount >= 2) state = 'watch';
    else if (upCount >= 1 || buildingCount >= 1) state = 'progressing';

    var longestPattern = 'mixed';
    if (buildingCount > slidingCount && buildingCount >= plateauCount) longestPattern = 'building';
    else if (slidingCount > buildingCount && slidingCount >= plateauCount) longestPattern = 'sliding';
    else if (plateauCount > 0 && plateauCount >= buildingCount && plateauCount >= slidingCount) longestPattern = 'plateau';

    var quality = 50;
    if (state === 'progressing') quality += 20;
    if (state === 'watch') quality -= 10;
    if (state === 'fatigued') quality -= 25;
    quality += upCount * 5;
    quality -= downCount * 5;
    quality -= painCount * 12;
    quality = Math.max(0, Math.min(100, quality));

    return {
      state: state,
      concern: concern,
      exerciseCount: familyEntries.length,
      upCount: upCount,
      downCount: downCount,
      flatCount: flatCount,
      painCount: painCount,
      longestPattern: longestPattern,
      quality: quality
    };
  }

  function summariseFamilies(allLogs, recovery) {
    var groups = analyseFamilies(allLogs);
    var out = {};

    Object.keys(groups).forEach(function (family) {
      out[family] = aggregateFamilySignals(groups[family], recovery);
    });

    return out;
  }

  function summariseFamilyBuckets(familySummary) {
    familySummary = safeObj(familySummary);
    var buckets = {
      push: [],
      pull: [],
      legs: [],
      core: [],
      cardio: []
    };

    Object.keys(familySummary).forEach(function (family) {
      var key = familyBucketKey(family);
      if (buckets[key]) buckets[key].push(familySummary[family]);
    });

    var out = {};
    Object.keys(buckets).forEach(function (bucket) {
      var items = buckets[bucket];
      if (!items.length) {
        out[bucket] = { quality: 50, state: 'unknown' };
        return;
      }

      var totalQuality = items.reduce(function (sum, item) { return sum + Number(item.quality || 0); }, 0);
      var avgQuality = totalQuality / items.length;

      var state = 'building';
      if (avgQuality >= 70) state = 'strong';
      else if (avgQuality < 40) state = 'weak';

      out[bucket] = {
        quality: Math.round(avgQuality),
        state: state
      };
    });

    return out;
  }

  function strongestFamily(familySummary) {
    familySummary = safeObj(familySummary);
    var best = null;
    var bestScore = -Infinity;

    Object.keys(familySummary).forEach(function (family) {
      var s = familySummary[family];
      var value = 0;
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
    var worst = null;
    var worstScore = -Infinity;

    Object.keys(familySummary).forEach(function (family) {
      var s = familySummary[family];
      var value = 0;
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
    var map = {
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

  function sessionArchetypes() {
    return [
      { id: 'push-strength', label: 'Push Strength', tags: ['push','strength'] },
      { id: 'pull-strength', label: 'Pull Strength', tags: ['pull','strength'] },
      { id: 'lower-strength', label: 'Lower Strength', tags: ['legs','strength'] },
      { id: 'recovery-circuit', label: 'Recovery Circuit', tags: ['recovery','core','cardio'] },
      { id: 'movement-quality', label: 'Movement Quality', tags: ['recovery','mobility','core'] },
      { id: 'z2-builder', label: 'Z2 Builder', tags: ['cardio','easy'] },
      { id: 'deload-upper', label: 'Deload Upper', tags: ['push','pull','deload'] },
      { id: 'deload-lower', label: 'Deload Lower', tags: ['legs','deload'] },
      { id: 'low-irritation-upper', label: 'Low-Irritation Upper', tags: ['push','pull','protect'] },
      { id: 'low-irritation-lower', label: 'Low-Irritation Lower', tags: ['legs','protect'] }
    ];
  }

  function weeklySummary(allLogs, recovery, roadmapSummary) {
    var last7 = lastNDaysLogs(allLogs, 7);
    var uniqueDays = {};
    var exerciseSet = {};
    var painMentions = 0;
    var totalScore = 0;

    last7.forEach(function (entry) {
      var dk = dayKey(entry.date);
      if (dk) uniqueDays[dk] = true;
      exerciseSet[entry.exercise] = true;
      totalScore += score(entry);

      var txt = String(entry.notes || '').toLowerCase();
      ['pain','sharp','flare','aggravated','injury','strain','twinge','niggle','sore'].forEach(function (w) {
        if (txt.indexOf(w) > -1) painMentions++;
      });
    });

    var familySummary = summariseFamilies(groupLogs(last7), recovery);
    var strongest = strongestFamily(familySummary);
    var weakest = weakestFamily(familySummary);
    var phase = phaseLens(roadmapSummary);

    var adherence = 0;
    adherence += Math.min(Object.keys(uniqueDays).length, 5) * 15;
    if (recovery && typeof recovery.checkScore === 'number') adherence += recovery.checkScore * 5;
    adherence = Math.max(0, Math.min(100, adherence));

    var quality = 50;
    if (painMentions > 0) quality -= Math.min(25, painMentions * 5);
    if (weakest && familySummary[weakest] && familySummary[weakest].state === 'fatigued') quality -= 15;
    if (strongest && familySummary[strongest] && familySummary[strongest].state === 'progressing') quality += 10;
    quality = Math.max(0, Math.min(100, quality));

    var weeklyMode = 'steady';
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
      familyBreakdown: summariseFamilyBuckets(familySummary),
      weeklyMode: weeklyMode,
      swapSuggestions: weakest ? recommendedSwapForFamily(weakest) : []
    };
  }

  function computeStrainMetrics(allLogs, recovery, weekly) {
    var last14 = lastNDaysLogs(allLogs, 14);
    var days = {};

    last14.forEach(function (entry) {
      var dk = dayKey(entry.date);
      if (!dk) return;
      if (!days[dk]) days[dk] = 0;
      days[dk] += score(entry);
    });

    var dayLoads = Object.keys(days).sort().map(function (k) { return days[k]; });
    var total = dayLoads.reduce(function (a, b) { return a + b; }, 0);
    var avg = dayLoads.length ? total / dayLoads.length : 0;

    var variance = 0;
    if (dayLoads.length) {
      variance = dayLoads.reduce(function (sum, v) {
        return sum + Math.pow(v - avg, 2);
      }, 0) / dayLoads.length;
    }

    var sd = Math.sqrt(variance);
    var monotony = avg > 0 ? (avg / Math.max(sd, 1)) : 0;
    var density = weekly && weekly.sessionsLogged ? (weekly.sessionsLogged / 7) * 100 : 0;

    var fatigue = recovery && typeof recovery.fatigue === 'number' ? recovery.fatigue : 20;
    var underRecoveryRisk = recovery && typeof recovery.underRecoveryRisk === 'number' ? recovery.underRecoveryRisk : 0;

    var strainRisk = 0;
    strainRisk += Math.min(30, monotony * 10);
    strainRisk += Math.min(20, density * 0.2);
    strainRisk += Math.min(25, fatigue * 0.3);
    strainRisk += Math.min(25, underRecoveryRisk * 0.35);
    strainRisk = Math.max(0, Math.min(100, strainRisk));

    return {
      dayLoads: dayLoads,
      total14d: total,
      averageDayLoad: Math.round(avg),
      monotony: Number(monotony.toFixed(2)),
      density: Math.round(density),
      strainRisk: Math.round(strainRisk)
    };
  }

  function progressionPressure(recovery, mind, roadmapSummary, weekly, familySummary) {
    var phase = phaseLens(roadmapSummary);
    var pressure = 0;

    if (phase.seekProgress) pressure += 25;
    if (weekly && weekly.adherence >= 60) pressure += 15;
    if (weekly && weekly.quality >= 60) pressure += 10;
    if (recovery && recovery.readiness >= 65) pressure += 10;
    if (mind && typeof mind.pressure === 'number') pressure += Math.min(20, mind.pressure * 0.2);

    var weak = weekly && weekly.weakestFamily ? weekly.weakestFamily : null;
    if (weak && familySummary && familySummary[weak] && familySummary[weak].state === 'fatigued') pressure += 15;

    pressure = Math.max(0, Math.min(100, pressure));

    var state = 'normal';
    if (pressure >= 70) state = 'high';
    else if (pressure >= 45) state = 'moderate';

    return {
      score: pressure,
      state: state
    };
  }

  function deloadSignal(recovery, weekly, familySummary, strain) {
    var value = 0;

    if (recovery && recovery.underRecoveryRisk >= 60) value += 30;
    if (recovery && recovery.fatigue >= 70) value += 20;
    if (weekly && weekly.quality < 40) value += 20;
    if (weekly && weekly.painMentions >= 2) value += 15;
    if (strain && strain.strainRisk >= 65) value += 20;

    var weakest = weekly && weekly.weakestFamily ? weekly.weakestFamily : null;
    if (weakest && familySummary && familySummary[weakest] && familySummary[weakest].state === 'fatigued') value += 15;

    value = Math.max(0, Math.min(100, value));

    return {
      score: value,
      suggested: value >= 60
    };
  }

  function painRiskSummary(allLogs, weekly, familySummary) {
    var last7 = lastNDaysLogs(allLogs, 7);
    var risk = 0;

    safeArray(last7).forEach(function (entry) {
      var txt = String(entry.notes || '').toLowerCase();
      if (txt.indexOf('sharp') > -1) risk += 18;
      else if (txt.indexOf('pain') > -1 || txt.indexOf('flare') > -1 || txt.indexOf('aggravated') > -1) risk += 10;
    });

    if (weekly && weekly.painMentions >= 2) risk += 15;
    if (weekly && weekly.weakestFamily && familySummary && familySummary[weekly.weakestFamily] && familySummary[weekly.weakestFamily].state === 'fatigued') {
      risk += 15;
    }

    risk = Math.max(0, Math.min(100, risk));

    var state = 'low';
    if (risk >= 60) state = 'high';
    else if (risk >= 30) state = 'moderate';

    return {
      score: risk,
      state: state
    };
  }

  function goalConflictDetection(roadmapSummary, weekly, strain, progPressure) {
    var phase = phaseLens(roadmapSummary);
    var conflicts = [];

    if (phase.stage === 'cut' && weekly && weekly.quality < 40) {
      conflicts.push('Fat loss goal is being undermined by poor weekly recovery quality.');
    }
    if ((phase.stage === 'build' || phase.stage === 'bulk') && strain && strain.strainRisk >= 65) {
      conflicts.push('Strength or growth goal is colliding with accumulated strain.');
    }
    if (phase.stage === 'maintain' && progPressure && progPressure.state === 'high') {
      conflicts.push('Maintenance goal is clashing with overly aggressive progression pressure.');
    }
    if (phase.stage === 'rebuild' && weekly && weekly.painMentions >= 2) {
      conflicts.push('Rebuild goal is being undermined by repeated irritation signals.');
    }

    return conflicts;
  }

  function chooseSessionType(globalMode, weekly, weakestFamily) {
    var weakBucket = weakestFamily ? familyBucketKey(weakestFamily) : 'other';

    if (globalMode === 'deload') {
      if (weakBucket === 'legs') return 'deload-lower';
      if (weakBucket === 'push' || weakBucket === 'pull') return 'deload-upper';
      return 'movement-quality';
    }

    if (globalMode === 'family-fatigue' || globalMode === 'reduce-strain' || globalMode === 'protect') {
      if (weakBucket === 'legs') return 'low-irritation-lower';
      if (weakBucket === 'push' || weakBucket === 'pull') return 'low-irritation-upper';
      return 'recovery-circuit';
    }

    if (globalMode === 'recover' || globalMode === 'stabilise') return 'movement-quality';
    if (globalMode === 'habit-priority') return 'recovery-circuit';
    if (globalMode === 'push') {
      if (weakBucket === 'legs') return 'pull-strength';
      if (weakBucket === 'push') return 'pull-strength';
      if (weakBucket === 'pull') return 'lower-strength';
      return 'push-strength';
    }

    return 'movement-quality';
  }

  function nextSessionPrescription(globalMode, weekly, recovery, roadmapSummary, familySummary) {
    var weakest = weekly && weekly.weakestFamily ? weekly.weakestFamily : null;
    var swaps = weakest ? recommendedSwapForFamily(weakest) : [];
    var phase = phaseLens(roadmapSummary);
    var sessionType = chooseSessionType(globalMode, weekly, weakest);

    if (globalMode === 'protect' || globalMode === 'reduce-strain' || globalMode === 'family-fatigue') {
      return {
        title: 'Next session: reduce strain',
        action: 'Hold load steady, trim volume, and use friendlier variations where needed.',
        swaps: swaps.slice(0, 3),
        target: weakest ? ('Protect the ' + familyLabel(weakest) + ' pattern.') : 'Protect the most strained pattern.',
        sessionType: sessionType
      };
    }

    if (globalMode === 'recover' || globalMode === 'stabilise') {
      return {
        title: 'Next session: recovery-focused quality',
        action: 'Train, but keep the session technically tidy and emotionally calm. No forced progression.',
        swaps: swaps.slice(0, 2),
        target: 'Preserve rhythm without adding unnecessary strain.',
        sessionType: sessionType
      };
    }

    if (globalMode === 'deload') {
      return {
        title: 'Next session: deload',
        action: 'Reduce total work, keep reps clean, and leave the session feeling better than you started.',
        swaps: swaps.slice(0, 3),
        target: weakest ? ('Calm the ' + familyLabel(weakest) + ' pattern while keeping momentum.') : 'Reduce global strain this week.',
        sessionType: sessionType
      };
    }

    if (globalMode === 'push') {
      return {
        title: 'Next session: measured progression',
        action: 'Progress one lever only: add a rep, add a small load, or sharpen execution.',
        swaps: [],
        target: phase.seekProgress ? 'Use the current readiness window intelligently.' : 'Progress with restraint.',
        sessionType: sessionType
      };
    }

    if (globalMode === 'habit-priority') {
      return {
        title: 'Next session: just show up cleanly',
        action: 'A completed, logged session matters more than a perfect one.',
        swaps: [],
        target: 'Rebuild weekly consistency before chasing optimisation.',
        sessionType: sessionType
      };
    }

    return {
      title: 'Next session: build steadily',
      action: 'Keep the session controlled, repeatable, and technically honest.',
      swaps: swaps.slice(0, 2),
      target: weakest ? ('Keep an eye on the ' + familyLabel(weakest) + ' pattern.') : 'Keep stacking useful sessions.',
      sessionType: sessionType
    };
  }

  function decideToday(globalSummary) {
    globalSummary = safeObj(globalSummary);

    var mode = globalSummary.mode || 'build';
    var nextSession = globalSummary.nextSession || {};
    var deload = globalSummary.deload || {};
    var painRisk = globalSummary.painRisk || {};
    var weakest = globalSummary.weakestFamily || null;

    var decision = 'train-as-planned';
    var reason = 'The current picture supports a normal session.';
    var target = nextSession.target || '';
    var sessionType = nextSession.sessionType || 'movement-quality';

    if (deload && deload.suggested) {
      decision = 'start-deload';
      reason = 'Recovery, strain, and weekly quality now point toward a lighter week.';
    } else if (painRisk && painRisk.state === 'high') {
      decision = 'train-lighter';
      reason = 'Pain-risk signals are high enough that a protective session is smarter than a normal one.';
    } else if (mode === 'protect' || mode === 'family-fatigue' || mode === 'reduce-strain') {
      decision = 'swap-session';
      reason = weakest
        ? ('The ' + familyLabel(weakest) + ' pattern needs a lower-irritation session.')
        : 'The current strain picture favours a lower-irritation session.';
    } else if (mode === 'recover' || mode === 'stabilise') {
      decision = 'recovery-session';
      reason = 'A recovery-biased session makes more sense than pushing today.';
    } else if (mode === 'habit-priority') {
      decision = 'minimum-effective-session';
      reason = 'Consistency matters more than intensity today.';
    } else if (mode === 'push') {
      decision = 'train-with-progression';
      reason = 'Conditions are good enough for a measured step forward.';
    }

    return {
      decision: decision,
      reason: reason,
      target: target,
      sessionType: sessionType
    };
  }

  function adaptiveWeekPlan(globalSummary) {
    globalSummary = safeObj(globalSummary);

    var mode = globalSummary.mode || 'build';
    var weekly = globalSummary.weekly || {};
    var weakest = globalSummary.weakestFamily || null;
    var swaps = weekly.swapSuggestions || [];
    var nextWeek = {
      title: 'Adaptive next-week plan',
      changes: []
    };

    if (mode === 'deload') {
      nextWeek.changes.push('Reduce total working sets by around 30–40%.');
      nextWeek.changes.push('Keep intensity moderate and stop well short of grinding reps.');
      if (weakest) nextWeek.changes.push('Use friendlier variations for the ' + familyLabel(weakest) + ' pattern.');
    } else if (mode === 'family-fatigue' || mode === 'reduce-strain' || mode === 'protect') {
      nextWeek.changes.push('Reduce volume in the weakest movement family by around 20%.');
      nextWeek.changes.push('Keep stronger families moving, but do not pile on extra work.');
      if (swaps.length) nextWeek.changes.push('Use safer swaps: ' + swaps.slice(0, 3).join(', ') + '.');
    } else if (mode === 'push') {
      nextWeek.changes.push('Progress only one lever in your priority lifts: reps, load, or execution.');
      nextWeek.changes.push('Do not add extra density just because readiness is high.');
    } else if (mode === 'habit-priority') {
      nextWeek.changes.push('Aim for more consistent training days before changing the programme itself.');
      nextWeek.changes.push('Keep session length modest and easy to complete.');
    } else {
      nextWeek.changes.push('Keep the programme broadly stable and improve quality of execution.');
      if (weakest) nextWeek.changes.push('Monitor the ' + familyLabel(weakest) + ' pattern closely next week.');
    }

    return nextWeek;
  }

  function decideExercise(profile, logs, recovery, mind, roadmapSummary) {
    logs = safeArray(logs);

    var shortTrend = getTrend(logs);
    var longTrend = getLongerTrend(logs);
    var pain = detectPain(logs);
    var family = familySignal(profile, logs, recovery);
    var phase = phaseLens(roadmapSummary);

    var readiness = recovery && typeof recovery.readiness === 'number' ? recovery.readiness : 50;
    var fatigue = recovery && typeof recovery.fatigue === 'number' ? recovery.fatigue : 20;
    var underRecoveryRisk = recovery && typeof recovery.underRecoveryRisk === 'number' ? recovery.underRecoveryRisk : 0;
    var mentalRisk = mind && mind.risk ? mind.risk : 'low';
    var confidence = mind && typeof mind.confidence === 'number' ? mind.confidence : 50;
    var pressure = mind && typeof mind.pressure === 'number' ? mind.pressure : 20;

    var action = 'hold';
    var reason = [];
    var tone = 'grounded';
    var patternState = family.state;
    var confidenceBand = 'moderate';

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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
        action: action,
        reason: reason,
        tone: tone,
        confidenceBand: confidenceBand,
        trend: shortTrend,
        longTrend: longTrend,
        patternState: patternState,
        phase: phase,
        profile: profile,
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
    var readiness = recovery && typeof recovery.readiness === 'number' ? recovery.readiness : 50;
    var fatigue = recovery && typeof recovery.fatigue === 'number' ? recovery.fatigue : 20;
    var underRecoveryRisk = recovery && typeof recovery.underRecoveryRisk === 'number' ? recovery.underRecoveryRisk : 0;
    var checkScore = recovery && typeof recovery.checkScore === 'number' ? recovery.checkScore : 0;
    var mentalRisk = mind && mind.risk ? mind.risk : 'low';
    var pressure = mind && typeof mind.pressure === 'number' ? mind.pressure : 20;
    var confidence = mind && typeof mind.confidence === 'number' ? mind.confidence : 50;
    var phase = phaseLens(roadmapSummary);

    var familySummary = summariseFamilies(allLogs || {}, recovery);
    var strongest = strongestFamily(familySummary);
    var weakest = weakestFamily(familySummary);
    var week = weeklySummary(allLogs || {}, recovery, roadmapSummary);
    var strain = computeStrainMetrics(allLogs || {}, recovery, week);
    var progPressure = progressionPressure(recovery, mind, roadmapSummary, week, familySummary);
    var deload = deloadSignal(recovery, week, familySummary, strain);
    var painRisk = painRiskSummary(allLogs || {}, week, familySummary);
    var conflicts = goalConflictDetection(roadmapSummary, week, strain, progPressure);

    var mode = 'build';
    var reason = [];
    var tone = 'grounded';

    if (!totalLogs) {
      if (checkScore === 4) return pack('ready', 'confident', ['All core recovery markers are in place even though training history is still limited']);
      if (checkScore === 3) return pack('good-foundations', 'grounded', ['Recovery basics look mostly strong and the system is ready for consistent training']);
      if (checkScore === 2) return pack('mixed-foundations', 'grounded', ['Some recovery basics are in place, but there is room to tighten the foundation']);
      return pack('poor-foundations', 'supportive', ['Very few recovery basics are currently in place, so expectations should stay realistic']);
    }

    if (deload.suggested) return pack('deload', 'protective', ['The combined recovery, strain, and weekly quality picture now supports a deload rather than a push']);
    if (week.weeklyMode === 'rebuild-habit') return pack('habit-priority', 'supportive', ['Weekly adherence is too low to make fine-grained performance calls matter yet']);
    if (underRecoveryRisk >= 65 || fatigue >= 75) return pack('protect', 'protective', ['Global recovery picture is poor enough to prioritise recovery and sustainability']);
    if (mentalRisk === 'high' || pressure >= 75) return pack('steady', 'steadying', ['Mental pressure is high enough that the global ask should come down']);
    if (week.weeklyMode === 'reduce-strain') return pack('reduce-strain', 'grounded', ['The weekly picture suggests too much strain relative to the quality of recent training']);
    if (painRisk.state === 'high') return pack('pain-risk', 'protective', ['Recent notes and family signals suggest a meaningful pain-risk picture developing']);
    if (weakest && familySummary[weakest] && familySummary[weakest].state === 'fatigued') return pack('family-fatigue', 'grounded', ['One movement family looks broadly fatigued rather than this being a one-exercise issue']);

    if (phase.stage === 'rebuild') return pack('protect', 'protective', ['Rebuild phase: movement quality and confidence matter more than forcing numbers']);

    if (phase.stage === 'cut') {
      if (readiness >= 65) return pack('preserve', 'grounded', ['Cut phase: the job is to preserve strength and keep recovery honest']);
      return pack('recover', 'supportive', ['Cut phase plus lower readiness: hold expectations steady and protect recovery']);
    }

    if (phase.stage === 'maintain') return pack('steady', 'grounded', ['Maintenance phase: consistency matters more than constant escalation']);

    if (phase.stage === 'build' || phase.stage === 'bulk') {
      if (week.weeklyMode === 'progress-week' && readiness >= 65 && mentalRisk !== 'high' && progPressure.state !== 'high') {
        return pack('push', 'confident', ['Growth-oriented phase with enough readiness and weekly support to justify progression']);
      }
      return pack('hold', 'grounded', ['Growth-oriented phase, but the wider weekly picture is not strong enough for aggressive pushing']);
    }

    if (phase.stage === 'transform' || phase.stage === 'foundation') {
      if (checkScore === 4 && confidence >= 55) return pack('build', 'confident', ['Recovery basics are strong and this phase rewards patient, steady progress']);
      if (checkScore <= 1) return pack('stabilise', 'supportive', ['This phase needs consistency, and the recovery basics are too weak to ignore']);
      return pack('build', 'grounded', ['This phase rewards patience, clean trendlines, and repeated good decisions']);
    }

    return pack('build', 'grounded', ['The broader picture supports steady accumulation rather than a dramatic shift']);

    function pack(nextMode, nextTone, nextReason) {
      var temp = {
        mode: nextMode,
        tone: nextTone,
        reason: nextReason,
        phase: phase,
        familySummary: familySummary,
        strongestFamily: strongest,
        weakestFamily: weakest,
        weekly: week,
        strain: strain,
        progressionPressure: progPressure,
        deload: deload,
        painRisk: painRisk,
        conflicts: conflicts
      };
      temp.nextSession = nextSessionPrescription(nextMode, week, recovery, roadmapSummary, familySummary);
      temp.todayDecision = decideToday(temp);
      temp.nextWeek = adaptiveWeekPlan(temp);
      return temp;
    }
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
