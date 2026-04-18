// FreeFitFuel Engine — Roadmap / Phase Intelligence

window.FFFRoadmap = (function () {
  'use strict';

  const STAGE_RULES = [
    {
      key: 'foundation',
      match: ['foundation', 'beginner', 'base'],
      priority: [
        'technique consistency',
        'habit formation',
        'recoverable training volume',
        'confidence under the bar or in movement'
      ],
      acceptable: [
        'steady repetition',
        'slow improvement',
        'stable execution without dramatic numbers'
      ],
      concerning: [
        'persistent confusion',
        'pain escalation',
        'inconsistent showing up',
        'progression outrunning form'
      ],
      coachBias: 'steady-build',
      progressionExpectation: 'slow'
    },
    {
      key: 'rebuild',
      match: ['rebuild', 'return', 'return to training', 'post-injury', 'rehab'],
      priority: [
        'pain reduction',
        'movement confidence',
        'tolerance to basic loading',
        're-establishing trust in training'
      ],
      acceptable: [
        'flat numbers with better comfort',
        'small wins',
        'good sessions mixed with cautious ones'
      ],
      concerning: [
        'recurring flare-ups',
        'fear-driven avoidance',
        'pushing load while symptoms worsen'
      ],
      coachBias: 'protective-progress',
      progressionExpectation: 'very slow'
    },
    {
      key: 'cut',
      match: ['cut', 'fat loss', 'diet phase'],
      priority: [
        'strength retention',
        'recovery management',
        'adherence',
        'muscle preservation'
      ],
      acceptable: [
        'flat strength',
        'slight performance drift',
        'lower energy on some days'
      ],
      concerning: [
        'sharp strength drop',
        'chronic under-recovery',
        'trying to force growth while in deficit'
      ],
      coachBias: 'preserve',
      progressionExpectation: 'modest'
    },
    {
      key: 'maintain',
      match: ['maintain', 'maintenance'],
      priority: [
        'stable routine',
        'joint-friendly consistency',
        'bodyweight and energy stability',
        'preserving broad fitness'
      ],
      acceptable: [
        'mostly flat performance',
        'small oscillations',
        'no urgency for aggressive increases'
      ],
      concerning: [
        'decline through neglect',
        'repeated missed weeks',
        'drifting into no clear structure'
      ],
      coachBias: 'steady',
      progressionExpectation: 'optional'
    },
    {
      key: 'build',
      match: ['build', 'strength', 'performance'],
      priority: [
        'progressive overload',
        'skill under heavier load',
        'repeatable recovery',
        'clear trend upward'
      ],
      acceptable: [
        'short plateaus',
        'one-off dips',
        'controlled fatigue'
      ],
      concerning: [
        'extended stagnation',
        'fatigue without trend',
        'pain paired with load chasing'
      ],
      coachBias: 'progress-seeking',
      progressionExpectation: 'clear'
    },
    {
      key: 'bulk',
      match: ['bulk', 'muscle gain', 'hypertrophy', 'mass'],
      priority: [
        'muscle gain',
        'volume tolerance',
        'stable appetite and recovery',
        'measured strength increase'
      ],
      acceptable: [
        'steady but not explosive increases',
        'some bodyweight rise',
        'volume-driven fatigue when managed'
      ],
      concerning: [
        'fat gain outrunning performance',
        'persistent lethargy',
        'volume too high to recover from'
      ],
      coachBias: 'volume-aware-progress',
      progressionExpectation: 'moderate'
    },
    {
      key: 'transform',
      match: ['transform', 'recomp', 'recomposition'],
      priority: [
        'body composition shift',
        'retaining or improving strength',
        'consistency across training and nutrition',
        'visible trend over time rather than day to day'
      ],
      acceptable: [
        'mixed short-term signals',
        'flat scale weight if body composition is improving',
        'uneven weekly performance'
      ],
      concerning: [
        'trying to judge everything session by session',
        'dropping consistency',
        'under-fuelling while expecting top performance'
      ],
      coachBias: 'patient-progress',
      progressionExpectation: 'mixed'
    }
  ];

  function normalise(str) {
    return String(str || '').toLowerCase().trim();
  }

  function detectStage(stageName, blurb) {
    const text = normalise(stageName + ' ' + (blurb || ''));
    let best = null;
    let bestScore = 0;

    STAGE_RULES.forEach(function (rule) {
      let score = 0;
      rule.match.forEach(function (m) {
        if (text.indexOf(normalise(m)) > -1) score++;
      });
      if (score > bestScore) {
        best = rule;
        bestScore = score;
      }
    });

    return best || STAGE_RULES[0];
  }

  function stageSummary(stage) {
    stage = stage || {};
    const rule = detectStage(stage.name || '', stage.blurb || '');

    return {
      inputName: stage.name || 'Stage',
      stageType: rule.key,
      coachBias: rule.coachBias,
      progressionExpectation: rule.progressionExpectation,
      priority: rule.priority.slice(),
      acceptable: rule.acceptable.slice(),
      concerning: rule.concerning.slice()
    };
  }

  function roadmapHealth(stageSummaries) {
    const summaries = Array.isArray(stageSummaries) ? stageSummaries : [];
    if (!summaries.length) {
      return {
        complexity: 'none',
        progressionStyle: 'unknown',
        notes: ['No roadmap stages found.']
      };
    }

    const stageTypes = summaries.map(function (s) { return s.stageType; });
    const notes = [];

    if (stageTypes.indexOf('rebuild') > -1) {
      notes.push('Roadmap includes a rebuild context, so pain-free progress matters more than raw numbers.');
    }
    if (stageTypes.indexOf('cut') > -1) {
      notes.push('Roadmap includes a cut phase, so flat strength may still count as success.');
    }
    if (stageTypes.indexOf('build') > -1 || stageTypes.indexOf('bulk') > -1) {
      notes.push('Roadmap includes a growth-oriented phase, so prolonged flat performance deserves scrutiny.');
    }
    if (stageTypes.indexOf('maintain') > -1) {
      notes.push('Maintenance phases should not be treated like underperformance by default.');
    }

    return {
      complexity: summaries.length === 1 ? 'simple' : (summaries.length <= 3 ? 'moderate' : 'complex'),
      progressionStyle: unique(stageTypes).join(' → '),
      notes: notes
    };
  }

  function unique(arr) {
    const seen = {};
    const out = [];
    (arr || []).forEach(function (v) {
      const k = normalise(v);
      if (!k || seen[k]) return;
      seen[k] = true;
      out.push(v);
    });
    return out;
  }

  function summarise(roadmap) {
    if (!roadmap || typeof roadmap !== 'object') {
      return {
        hasRoadmap: false,
        stageCount: 0,
        currentBias: 'unknown',
        currentStageType: 'unknown',
        progressionExpectation: 'unknown',
        stageSummaries: [],
        health: {
          complexity: 'none',
          progressionStyle: 'unknown',
          notes: ['No roadmap loaded.']
        }
      };
    }

    const stages = Array.isArray(roadmap.stages) ? roadmap.stages : [];
    const stageSummaries = stages.map(stageSummary);
    const current = stageSummaries[0] || null;

    return {
      hasRoadmap: stages.length > 0,
      stageCount: stages.length,
      currentBias: current ? current.coachBias : 'unknown',
      currentStageType: current ? current.stageType : 'unknown',
      progressionExpectation: current ? current.progressionExpectation : 'unknown',
      stageSummaries: stageSummaries,
      health: roadmapHealth(stageSummaries)
    };
  }

  function isFlatPerformanceAcceptable(summary) {
    if (!summary) return false;
    return ['cut', 'maintain', 'rebuild', 'transform', 'foundation'].indexOf(summary.currentStageType) > -1;
  }

  function shouldSeekProgress(summary) {
    if (!summary) return false;
    return ['build', 'bulk'].indexOf(summary.currentStageType) > -1;
  }

  return {
    summarise: summarise,
    stageSummary: stageSummary,
    isFlatPerformanceAcceptable: isFlatPerformanceAcceptable,
    shouldSeekProgress: shouldSeekProgress
  };
})();
