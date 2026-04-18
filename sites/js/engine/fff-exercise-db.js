// FreeFitFuel Engine — Exercise Knowledge Database

window.FFFExerciseDB = (function () {
  'use strict';

  const FAMILY_DB = [
    {
      key: 'squat',
      patterns: ['squat', 'quad-dominant', 'knee-dominant'],
      match: [
        'squat','goblet squat','front squat','back squat','box squat','hack squat',
        'leg press','split squat','bulgarian','step up','step-up','lunge','reverse lunge',
        'walking lunge','air squat','chair squat','wall sit','spanish squat'
      ],
      primaryJoints: ['knee', 'hip'],
      tissues: ['quads', 'glutes', 'patellar tendon', 'adductors'],
      riskZones: ['knee', 'patellar tendon', 'hip'],
      commonFailurePoints: [
        'knee cave under fatigue',
        'loss of depth consistency',
        'torso collapse',
        'rushing the eccentric',
        'overloading before the pattern is stable'
      ],
      regressions: [
        'box squat',
        'chair squat',
        'split squat to reduced depth',
        'supported step-up',
        'spanish squat hold'
      ],
      progressions: [
        'goblet squat',
        'front squat',
        'back squat',
        'tempo squat',
        'paused squat'
      ]
    },
    {
      key: 'hinge',
      patterns: ['hinge', 'posterior-chain'],
      match: [
        'rdl','romanian deadlift','deadlift','db romanian deadlift','hip hinge',
        'good morning','hip thrust','glute bridge','bridge','pull through',
        'kettlebell swing','kb swing','single-leg rdl','single leg rdl'
      ],
      primaryJoints: ['hip', 'spine'],
      tissues: ['hamstrings', 'glutes', 'spinal erectors'],
      riskZones: ['low back', 'hamstring', 'hip'],
      commonFailurePoints: [
        'losing spinal position',
        'turning the hinge into a squat',
        'loading range that is not owned',
        'hamstrings taking over from glutes late in sets'
      ],
      regressions: [
        'glute bridge',
        'hip thrust',
        'dowel hinge',
        'reduced-range rdl'
      ],
      progressions: [
        'db rdl',
        'barbell rdl',
        'deadlift',
        'single-leg rdl',
        'tempo hinge'
      ]
    },
    {
      key: 'horizontal-push',
      patterns: ['push', 'horizontal-push', 'press'],
      match: [
        'bench','bench press','db bench','dumbbell bench','floor press','push-up',
        'push up','press-up','press up','incline press','incline dumbbell bench',
        'chest press','dip','dips','close-grip push-up','close grip push up'
      ],
      primaryJoints: ['shoulder', 'elbow'],
      tissues: ['pecs', 'triceps', 'front delts'],
      riskZones: ['shoulder', 'elbow', 'wrist'],
      commonFailurePoints: [
        'flare through the shoulder',
        'loss of scapular control',
        'elbows drifting too wide',
        'compensating with lumbar extension'
      ],
      regressions: [
        'incline push-up',
        'floor press',
        'light dumbbell bench',
        'close-grip elevated push-up'
      ],
      progressions: [
        'db bench press',
        'bench press',
        'weighted push-up',
        'dip progression'
      ]
    },
    {
      key: 'vertical-push',
      patterns: ['push', 'vertical-push', 'press'],
      match: [
        'overhead press','ohp','db overhead press','shoulder press','press',
        'landmine press','arnold press','pike push-up','pike push up',
        'handstand push-up','handstand push up'
      ],
      primaryJoints: ['shoulder', 'elbow', 'scapula'],
      tissues: ['delts', 'triceps', 'upper traps', 'serratus'],
      riskZones: ['shoulder', 'neck', 'low back'],
      commonFailurePoints: [
        'rib flare and lumbar overextension',
        'shrugging under fatigue',
        'pressing around pain instead of through clean range',
        'neck tension as load rises'
      ],
      regressions: [
        'landmine press',
        'seated db press',
        'half-kneeling press',
        'light strict press'
      ],
      progressions: [
        'standing db press',
        'barbell overhead press',
        'push press',
        'handstand progression'
      ]
    },
    {
      key: 'horizontal-pull',
      patterns: ['pull', 'horizontal-pull', 'row'],
      match: [
        'row','db row','dumbbell row','one-arm row','one arm row',
        'chest-supported row','chest supported row','seated row','cable row',
        'inverted row','ring row','band row','machine row'
      ],
      primaryJoints: ['shoulder', 'elbow', 'scapula'],
      tissues: ['lats', 'mid-back', 'rear delts', 'biceps'],
      riskZones: ['elbow', 'shoulder', 'upper back'],
      commonFailurePoints: [
        'yanking with the arm',
        'losing torso stability',
        'shrugging instead of rowing',
        'using momentum to finish reps'
      ],
      regressions: [
        'band row',
        'light chest-supported row',
        'supported one-arm row'
      ],
      progressions: [
        'db row',
        'chest-supported row',
        'inverted row',
        'heavy row variations'
      ]
    },
    {
      key: 'vertical-pull',
      patterns: ['pull', 'vertical-pull'],
      match: [
        'pull-up','pull up','chin-up','chin up','lat pulldown','pulldown',
        'assisted pull-up','assisted pull up','band pull-up','band pull up'
      ],
      primaryJoints: ['shoulder', 'elbow', 'scapula'],
      tissues: ['lats', 'biceps', 'forearms', 'upper back'],
      riskZones: ['elbow', 'shoulder', 'wrist'],
      commonFailurePoints: [
        'losing scapular control at the bottom',
        'cranking through elbow pain',
        'using excessive body English',
        'rushing to harder variants too soon'
      ],
      regressions: [
        'band-assisted pull-up',
        'lat pulldown',
        'ring row',
        'eccentric pull-up'
      ],
      progressions: [
        'bodyweight pull-up',
        'weighted pull-up',
        'strict chin-up',
        'higher-volume pull-up work'
      ]
    },
    {
      key: 'core-anti-extension',
      patterns: ['core', 'anti-extension'],
      match: [
        'plank','dead bug','hollow hold','hollow body hold','ab wheel',
        'rollout','body saw','stir the pot'
      ],
      primaryJoints: ['spine', 'ribcage', 'pelvis'],
      tissues: ['abdominals', 'deep core', 'serratus'],
      riskZones: ['low back', 'neck'],
      commonFailurePoints: [
        'lumbar extension under fatigue',
        'rib flare',
        'holding breath instead of bracing'
      ],
      regressions: [
        'dead bug',
        'short plank',
        'bear hold'
      ],
      progressions: [
        'plank',
        'body saw',
        'rollout',
        'hollow variation'
      ]
    },
    {
      key: 'core-rotation-lateral',
      patterns: ['core', 'rotation', 'lateral'],
      match: [
        'side plank','copenhagen','pallof','woodchop','russian twist',
        'carry','farmer carry','suitcase carry','windmill'
      ],
      primaryJoints: ['spine', 'pelvis', 'shoulder'],
      tissues: ['obliques', 'adductors', 'glutes', 'deep core'],
      riskZones: ['groin', 'low back', 'shoulder'],
      commonFailurePoints: [
        'losing stacked posture',
        'rotation coming from the wrong segment',
        'gripping or shrugging to stabilise'
      ],
      regressions: [
        'side plank from knees',
        'short pallof press',
        'light suitcase carry'
      ],
      progressions: [
        'full side plank',
        'copenhagen plank',
        'heavy carry variations'
      ]
    },
    {
      key: 'calf-foot',
      patterns: ['ankle', 'calf', 'foot'],
      match: [
        'calf raise','heel raise','seated calf raise','standing calf raise',
        'tib raise','anterior tib raise','toe raise','eccentric calf raise'
      ],
      primaryJoints: ['ankle', 'foot'],
      tissues: ['calf', 'achilles', 'foot intrinsic'],
      riskZones: ['achilles', 'plantar fascia', 'shin'],
      commonFailurePoints: [
        'bouncing through tendon',
        'not owning the bottom position',
        'too much speed too soon'
      ],
      regressions: [
        'double-leg calf raise',
        'supported heel raise',
        'small-range tib raise'
      ],
      progressions: [
        'single-leg calf raise',
        'loaded calf raise',
        'eccentric calf raise'
      ]
    },
    {
      key: 'cardio-z2',
      patterns: ['cardio', 'z2', 'endurance'],
      match: [
        'z2','zone 2','walk','walking','bike','cycle','cycling','run','running',
        'easy run','easy bike','row','rowing','swim','swimming'
      ],
      primaryJoints: ['systemic'],
      tissues: ['cardiorespiratory'],
      riskZones: ['general fatigue', 'impact accumulation'],
      commonFailurePoints: [
        'drifting too hard on easy days',
        'using cardio as punishment',
        'stacking intensity on poor recovery'
      ],
      regressions: [
        'walk',
        'easy bike',
        'shorter Z2 sessions'
      ],
      progressions: [
        'longer Z2 duration',
        'more consistency',
        'better pace control'
      ]
    },
    {
      key: 'cardio-threshold',
      patterns: ['cardio', 'threshold', 'tempo', 'interval'],
      match: [
        'threshold','tempo','interval','hill repeat','hills','strides','vo2',
        'speed work','quality run'
      ],
      primaryJoints: ['systemic'],
      tissues: ['cardiorespiratory', 'muscular endurance'],
      riskZones: ['fatigue', 'calf', 'achilles', 'hamstring'],
      commonFailurePoints: [
        'doing quality on poor recovery',
        'too much intensity density',
        'turning threshold into race pace'
      ],
      regressions: [
        'short threshold',
        'reduced reps',
        'tempo intervals with more recovery'
      ],
      progressions: [
        'longer quality blocks',
        'more reps',
        'slightly tighter recovery'
      ]
    }
  ];

  const REGION_HINTS = [
    { key: 'knee', words: ['knee','kneecap','patella','patellar'] },
    { key: 'hip', words: ['hip','groin','adductor'] },
    { key: 'low back', words: ['back','low back','lumbar'] },
    { key: 'shoulder', words: ['shoulder','rotator cuff'] },
    { key: 'elbow', words: ['elbow','tennis elbow','golfer elbow'] },
    { key: 'wrist', words: ['wrist','thumb'] },
    { key: 'hamstring', words: ['hamstring'] },
    { key: 'achilles', words: ['achilles'] },
    { key: 'plantar fascia', words: ['plantar','heel','arch'] },
    { key: 'shin', words: ['shin','tibia'] },
    { key: 'neck', words: ['neck'] }
  ];

  function normalise(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[–—−]/g, '-')
      .replace(/\s+/g, ' ')
      .trim();
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

  function inferRegionHints(name) {
    const n = normalise(name);
    const out = [];
    REGION_HINTS.forEach(function (r) {
      r.words.forEach(function (w) {
        if (n.indexOf(normalise(w)) > -1) out.push(r.key);
      });
    });
    return unique(out);
  }

  function findFamily(name) {
    const n = normalise(name);

    let best = null;
    let bestScore = 0;

    FAMILY_DB.forEach(function (fam) {
      let score = 0;
      fam.match.forEach(function (token) {
        if (n.indexOf(normalise(token)) > -1) score++;
      });
      if (score > bestScore) {
        best = fam;
        bestScore = score;
      }
    });

    return best;
  }

  function fallbackProfile(name) {
    const regionHints = inferRegionHints(name);

    return {
      name: name || 'Unknown Exercise',
      family: 'general',
      patterns: ['general'],
      primaryJoints: regionHints.length ? regionHints : ['general'],
      tissues: ['general'],
      riskZones: regionHints.length ? regionHints : ['general'],
      commonFailurePoints: [
        'load outpacing control',
        'rushing reps',
        'ignoring recovery context'
      ],
      regressions: [],
      progressions: [],
      aliases: [],
      confidence: 'low'
    };
  }

  function getExerciseProfile(name) {
    const fam = findFamily(name);
    if (!fam) return fallbackProfile(name);

    const aliases = unique([name].concat(fam.match.slice(0, 8)));

    return {
      name: name || 'Unknown Exercise',
      family: fam.key,
      patterns: fam.patterns.slice(),
      primaryJoints: fam.primaryJoints.slice(),
      tissues: fam.tissues.slice(),
      riskZones: fam.riskZones.slice(),
      commonFailurePoints: fam.commonFailurePoints.slice(),
      regressions: fam.regressions.slice(),
      progressions: fam.progressions.slice(),
      aliases: aliases,
      confidence: 'high'
    };
  }

  function areRelatedExercises(a, b) {
    const pa = getExerciseProfile(a);
    const pb = getExerciseProfile(b);

    if (!pa || !pb) return false;
    if (pa.family === pb.family) return true;

    const sharedPatterns = pa.patterns.filter(function (p) {
      return pb.patterns.indexOf(p) > -1;
    });

    return sharedPatterns.length > 0;
  }

  function getFamilySummary(name) {
    const p = getExerciseProfile(name);
    return {
      family: p.family,
      patterns: p.patterns,
      riskZones: p.riskZones,
      likelySwapTargets: p.regressions,
      likelyProgressions: p.progressions
    };
  }

  function analyseGroup(exerciseNames) {
    const arr = Array.isArray(exerciseNames) ? exerciseNames : [];
    const profiles = arr.map(getExerciseProfile);

    const families = unique(profiles.map(function (p) { return p.family; }));
    const riskZones = unique([].concat.apply([], profiles.map(function (p) { return p.riskZones; })));
    const tissues = unique([].concat.apply([], profiles.map(function (p) { return p.tissues; })));

    return {
      count: profiles.length,
      families: families,
      riskZones: riskZones,
      tissues: tissues
    };
  }

  return {
    getExerciseProfile: getExerciseProfile,
    getFamilySummary: getFamilySummary,
    areRelatedExercises: areRelatedExercises,
    analyseGroup: analyseGroup
  };
})();
