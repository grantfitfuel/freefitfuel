// FreeFitFuel Engine — Mind / Behaviour Layer

window.FFFMind = (function () {
  'use strict';

  const WORD_BANK = {
    negative: [
      'rubbish','awful','terrible','useless','pathetic','weak','poor','bad',
      'hopeless','flat','stuck','frustrated','annoyed','angry','fed up',
      'worse','struggling','demotivated','unmotivated','drained','burnt out',
      'burned out','exhausted','foggy','heavy','sluggish','shaky'
    ],
    selfCritical: [
      'lazy','soft','useless','pathetic','weak','should have','should’ve',
      'not good enough','not enough','failed','failure','embarrassing',
      'disappointed in myself','angry at myself'
    ],
    avoidance: [
      'skipped','avoided','couldn’t face','could not face','didn’t want',
      'did not want','put off','postponed','bailed','quit early','stopped early'
    ],
    anxiety: [
      'worried','anxious','nervous','uneasy','concerned','fear','afraid',
      'panic','panicky','overthinking','over-thinking','spiralling','spiraling'
    ],
    painFocus: [
      'pain','hurt','aching','ache','twinge','sharp','strain','injury',
      'sore','niggle','niggling','tight','flare','flared','aggravated'
    ],
    positive: [
      'good','strong','solid','steady','better','improving','confident',
      'comfortable','clean','controlled','smooth','happy','pleased',
      'encouraging','energised','energized','capable'
    ],
    confidence: [
      'confident','capable','comfortable','settled','dialled in','dialed in',
      'ready','stronger','better than expected'
    ],
    discipline: [
      'showed up','got it done','did it anyway','stuck to it','kept going',
      'consistent','followed plan','stayed controlled'
    ],
    overpush: [
      'pushed through','ignored it','forced it','went too hard','too heavy',
      'chased it','maxed out','all out','redline','red-lined'
    ]
  };

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  function flattenLogs(allLogs) {
    const out = [];
    if (!allLogs || typeof allLogs !== 'object') return out;

    Object.keys(allLogs).forEach(function (exercise) {
      const arr = safeArray(allLogs[exercise]);
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

  function recentLogs(flatLogs, limit) {
    if (!flatLogs.length) return [];
    return flatLogs.slice(Math.max(0, flatLogs.length - limit));
  }

  function textBlob(entries) {
    return entries.map(function (e) { return String(e.notes || ''); }).join(' || ').toLowerCase();
  }

  function countHits(blob, words) {
    let n = 0;
    words.forEach(function (w) {
      if (blob.indexOf(w.toLowerCase()) > -1) n++;
    });
    return n;
  }

  function scoreChecks(checks) {
    if (!checks || typeof checks !== 'object') return 0;
    return Object.keys(checks).filter(function (k) { return !!checks[k]; }).length;
  }

  function buildTone(state) {
    if (state.risk === 'high') return 'protective';
    if (state.confidence < 35 && state.pressure > 60) return 'steadying';
    if (state.confidence < 45) return 'supportive';
    if (state.discipline > 65 && state.confidence > 60) return 'confident';
    if (state.avoidance > 50) return 'firm';
    return 'grounded';
  }

  function buildHeadline(state) {
    if (state.risk === 'high') return 'Mental load looks high';
    if (state.avoidance > 55) return 'Avoidance pattern showing up';
    if (state.pressure > 65 && state.selfCriticism > 50) return 'Too much pressure, not enough room';
    if (state.confidence > 65 && state.discipline > 60) return 'Mindset looks steady';
    if (state.confidence < 40) return 'Confidence looks dented';
    return 'Mindset is mixed';
  }

  function buildSummary(state) {
    if (state.risk === 'high') {
      return 'Recent notes suggest strain, pressure, or distress. Coaching should lower pressure, protect recovery, and avoid aggressive progression.';
    }
    if (state.avoidance > 55) {
      return 'There are signs of avoidance or reluctance. The coach should aim for re-entry and consistency rather than chasing performance.';
    }
    if (state.pressure > 65 && state.selfCriticism > 50) {
      return 'The user appears to be pressing too hard psychologically. Coaching should reduce all-or-nothing thinking and keep the ask achievable.';
    }
    if (state.confidence > 65 && state.discipline > 60) {
      return 'The recent tone is settled and constructive. Coaching can be more confident and progression-friendly.';
    }
    if (state.confidence < 40) {
      return 'Confidence looks fragile. Messaging should stay calm, specific, and non-judgemental.';
    }
    return 'Mindset signals are mixed. The coach should stay grounded and avoid dramatic conclusions.';
  }

  function analyse(allLogs, checks) {
    const flat = flattenLogs(allLogs);
    const recent = recentLogs(flat, 12);
    const blob = textBlob(recent);
    const checkScore = scoreChecks(checks);

    const negative = countHits(blob, WORD_BANK.negative);
    const selfCritical = countHits(blob, WORD_BANK.selfCritical);
    const avoidance = countHits(blob, WORD_BANK.avoidance);
    const anxiety = countHits(blob, WORD_BANK.anxiety);
    const painFocus = countHits(blob, WORD_BANK.painFocus);
    const positive = countHits(blob, WORD_BANK.positive);
    const confidenceWords = countHits(blob, WORD_BANK.confidence);
    const disciplineWords = countHits(blob, WORD_BANK.discipline);
    const overpush = countHits(blob, WORD_BANK.overpush);

    let confidence = 50;
    confidence += positive * 8;
    confidence += confidenceWords * 10;
    confidence -= negative * 7;
    confidence -= selfCritical * 8;
    confidence -= anxiety * 6;
    confidence = Math.max(0, Math.min(100, confidence));

    let pressure = 20;
    pressure += selfCritical * 12;
    pressure += anxiety * 9;
    pressure += overpush * 10;
    pressure += negative * 5;
    if (checkScore <= 1) pressure += 10;
    pressure = Math.max(0, Math.min(100, pressure));

    let discipline = 40;
    discipline += disciplineWords * 10;
    discipline += positive * 3;
    discipline -= avoidance * 10;
    discipline = Math.max(0, Math.min(100, discipline));

    let avoidanceScore = 0;
    avoidanceScore += avoidance * 18;
    if (checkScore <= 1) avoidanceScore += 8;
    avoidanceScore = Math.max(0, Math.min(100, avoidanceScore));

    let risk = 'low';
    if ((painFocus >= 2 && selfCritical >= 1) || pressure >= 75) risk = 'high';
    else if (painFocus >= 1 || pressure >= 55 || avoidanceScore >= 45) risk = 'moderate';

    const tone = buildTone({
      confidence: confidence,
      pressure: pressure,
      discipline: discipline,
      avoidance: avoidanceScore,
      selfCriticism: Math.min(100, selfCritical * 20),
      risk: risk
    });

    return {
      headline: buildHeadline({
        confidence: confidence,
        pressure: pressure,
        discipline: discipline,
        avoidance: avoidanceScore,
        selfCriticism: Math.min(100, selfCritical * 20),
        risk: risk
      }),
      summary: buildSummary({
        confidence: confidence,
        pressure: pressure,
        discipline: discipline,
        avoidance: avoidanceScore,
        selfCriticism: Math.min(100, selfCritical * 20),
        risk: risk
      }),
      tone: tone,
      risk: risk,
      confidence: confidence,
      pressure: pressure,
      discipline: discipline,
      avoidance: avoidanceScore,
      painFocus: Math.min(100, painFocus * 20),
      negativity: Math.min(100, negative * 15),
      selfCriticism: Math.min(100, selfCritical * 20),
      overpush: Math.min(100, overpush * 20),
      checkSupport: checkScore,
      sampleSize: recent.length
    };
  }

  return {
    analyse: analyse
  };
})();
