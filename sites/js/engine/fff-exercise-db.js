// FreeFitFuel Engine — Exercise Knowledge Database v3
// Drop-in replacement for: /js/engine/fff-exercise-db.js
//
// Goal:
// A deeper adaptive movement library for FreeFitFuel.
// This file keeps the existing API expected by the current engine and adds a richer
// exercise selection layer for injuries, equipment, phase, difficulty and progression.
//
// Existing compatible API:
// - getExerciseProfile(name)
// - getFamilySummary(name)
// - areRelatedExercises(a, b)
// - analyseGroup(exerciseNames)
//
// Expanded API:
// - getAllExercises()
// - findExercise(nameOrKey)
// - filterExercises(query)
// - suggestAlternatives(nameOrKey, context, limit)
// - buildMovementMenu(context)
// - getInjuryRules()
// - scoreExerciseForContext(exercise, context)
// - buildTemplate(context)
// - getLibraryStats()

window.FFFExerciseDB = (function () {
  'use strict';

  function normalise(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[–—−]/g, '-')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9+\- ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function slug(str) {
    return normalise(str).replace(/\s+/g, '-');
  }

  function unique(arr) {
    var seen = {};
    var out = [];
    (arr || []).forEach(function (v) {
      var k = normalise(v);
      if (!k || seen[k]) return;
      seen[k] = true;
      out.push(v);
    });
    return out;
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  const INJURY_RULES = {
    'biceps-tendon-pain': {
      label: 'Biceps tendon pain',
      avoidPatterns: ['heavy-supinated-curl', 'aggressive-vertical-pull', 'jerky-row', 'deep-fly'],
      cautionPatterns: ['horizontal-pull', 'vertical-pull', 'horizontal-push', 'arm-isolation'],
      preferPatterns: ['neutral-grip', 'supported-row', 'tempo-control', 'banded-light', 'left-first'],
      notes: [
        'Prefer neutral grips, supported rows and controlled tempo.',
        'Avoid heavy supinated curls, jerky rows and grinding pull-ups while symptoms are active.'
      ]
    },
    'shoulder-pain': {
      label: 'Shoulder pain / impingement sensitivity',
      avoidPatterns: ['deep-fly', 'upright-row', 'behind-neck', 'dip-deep', 'overhead-heavy', 'handstand', 'unstable-heavy'],
      cautionPatterns: ['vertical-push', 'horizontal-push', 'vertical-pull'],
      preferPatterns: ['neutral-grip', 'floor-press', 'scapular-control', 'reduced-range', 'supported', 'banded-light'],
      notes: [
        'Keep pressing in a pain-free range.',
        'Prioritise neutral grip, floor press, incline push-up and scapular control.'
      ]
    },
    'rotator-cuff-sensitivity': {
      label: 'Rotator cuff sensitivity',
      avoidPatterns: ['deep-fly', 'unstable-heavy', 'overhead-heavy', 'dip-deep'],
      cautionPatterns: ['vertical-push', 'horizontal-push'],
      preferPatterns: ['scapular-control', 'external-rotation', 'banded-light', 'reduced-range'],
      notes: [
        'Use low load cuff and scapular-control work.',
        'Avoid deep or unstable pressing until tolerance improves.'
      ]
    },
    'elbow-pain': {
      label: 'Elbow pain',
      avoidPatterns: ['heavy-curl', 'heavy-extension', 'high-volume-pull-up', 'diamond-push-up'],
      cautionPatterns: ['vertical-pull', 'arm-isolation', 'horizontal-pull'],
      preferPatterns: ['neutral-grip', 'banded-light', 'tempo-control', 'reduced-volume'],
      notes: [
        'Reduce direct arm loading first.',
        'Use neutral grips and lighter band work.'
      ]
    },
    'wrist-pain': {
      label: 'Wrist pain',
      avoidPatterns: ['loaded-wrist-extension', 'flat-palm-push-up', 'front-rack', 'handstand'],
      cautionPatterns: ['push-up', 'front-rack', 'bear-position'],
      preferPatterns: ['neutral-grip', 'handles', 'dumbbell-grip', 'forearm-support'],
      notes: [
        'Use dumbbells/handles for push-ups where possible.',
        'Avoid forcing loaded wrist extension.'
      ]
    },
    'knee-pain': {
      label: 'Knee pain',
      avoidPatterns: ['jumping', 'deep-knee-flexion-fast', 'high-impact', 'pistol', 'plyometric', 'running-impact'],
      cautionPatterns: ['squat', 'lunge-split', 'step-up', 'conditioning'],
      preferPatterns: ['box-range', 'supported', 'glute-dominant', 'isometric', 'low-impact', 'reduced-range'],
      notes: [
        'Use controlled range and slow tempo.',
        'Prefer box squats, supported split squats, low step-ups, bridges and hinge work.'
      ]
    },
    'patellar-tendon-pain': {
      label: 'Patellar tendon pain',
      avoidPatterns: ['jumping', 'fast-squat', 'deep-knee-flexion-fast', 'plyometric'],
      cautionPatterns: ['squat', 'lunge-split', 'step-up'],
      preferPatterns: ['spanish-squat', 'isometric', 'controlled-step-up', 'box-range'],
      notes: [
        'Avoid ballistic knee-dominant work.',
        'Use controlled step-ups, Spanish squat holds and gradual loading.'
      ]
    },
    'hip-pain': {
      label: 'Hip pain / impingement sensitivity',
      avoidPatterns: ['deep-hip-flexion', 'wide-stance-deep', 'twist-loaded', 'pistol'],
      cautionPatterns: ['squat', 'lunge-split', 'hinge'],
      preferPatterns: ['reduced-range', 'glute-bridge', 'supported', 'step-up-low', 'glute-dominant'],
      notes: [
        'Avoid forcing deep hip positions.',
        'Prioritise glute bridges, low step-ups and controlled hinge range.'
      ]
    },
    'low-back-sensitivity': {
      label: 'Lower back sensitivity',
      avoidPatterns: ['loaded-spinal-flexion', 'heavy-unsupported-hinge', 'ballistic-hinge', 'twist-loaded', 'unsupported-heavy-row'],
      cautionPatterns: ['hinge', 'loaded-carry', 'rotation', 'squat'],
      preferPatterns: ['supported', 'core-bracing', 'reduced-range', 'single-leg-supported', 'anti-extension'],
      notes: [
        'Avoid chasing load when bracing is poor.',
        'Prefer supported rows, glute bridges, dead bugs and reduced-range RDLs.'
      ]
    },
    'disc-sensitivity': {
      label: 'Disc sensitivity',
      avoidPatterns: ['loaded-spinal-flexion', 'twist-loaded', 'ballistic-hinge', 'sit-up-loaded'],
      cautionPatterns: ['hinge', 'rotation', 'loaded-carry'],
      preferPatterns: ['anti-extension', 'anti-rotation', 'supported', 'neutral-spine'],
      notes: [
        'Prioritise neutral spine, anti-extension and anti-rotation.',
        'Avoid loaded flexion and twisting under fatigue.'
      ]
    },
    'ankle-instability': {
      label: 'Ankle instability',
      avoidPatterns: ['jumping', 'lateral-hop', 'unstable-loaded', 'running-impact'],
      cautionPatterns: ['lunge-split', 'step-up', 'running', 'conditioning'],
      preferPatterns: ['supported', 'calf-control', 'balance-regression', 'low-impact'],
      notes: [
        'Use stable surfaces and support.',
        'Progress calf/foot control gradually.'
      ]
    },
    'achilles-calf-sensitivity': {
      label: 'Achilles / calf sensitivity',
      avoidPatterns: ['jumping', 'running-impact', 'sprint', 'plyometric'],
      cautionPatterns: ['calf', 'conditioning'],
      preferPatterns: ['isometric', 'low-impact', 'controlled-calf'],
      notes: [
        'Avoid sudden spikes in jumping or running.',
        'Use controlled calf raises and low-impact conditioning.'
      ]
    },
    'left-right-imbalance': {
      label: 'Left/right imbalance',
      avoidPatterns: ['bilateral-hide-imbalance'],
      cautionPatterns: ['bilateral-heavy'],
      preferPatterns: ['unilateral', 'left-first', 'right-matches-left', 'single-side-control'],
      notes: [
        'Use unilateral work.',
        'Weaker side sets the standard; stronger side matches, not exceeds.'
      ]
    },
    'poor-overhead-mobility': {
      label: 'Poor overhead mobility',
      avoidPatterns: ['overhead-heavy', 'handstand', 'behind-neck'],
      cautionPatterns: ['vertical-push'],
      preferPatterns: ['incline-press', 'scapular-control', 'landmine-pattern', 'thoracic-mobility'],
      notes: [
        'Do not force overhead range.',
        'Use incline pressing, wall slides, serratus work and mobility first.'
      ]
    },
    'beginner-low-confidence': {
      label: 'Beginner / low confidence',
      avoidPatterns: ['advanced', 'complex', 'plyometric', 'unstable-heavy'],
      cautionPatterns: ['conditioning', 'advanced-core'],
      preferPatterns: ['simple', 'supported', 'bodyweight', 'clear-progression'],
      notes: [
        'Use simple movements with clear success criteria.',
        'Prioritise confidence and repeatability.'
      ]
    },
    'older-adult': {
      label: 'Older adult / deconditioned',
      avoidPatterns: ['high-impact', 'advanced', 'plyometric', 'max-effort'],
      cautionPatterns: ['floor-transition', 'balance-demand'],
      preferPatterns: ['supported', 'low-impact', 'chair-friendly', 'balance-regression', 'simple'],
      notes: [
        'Prefer supported, low-impact and chair-friendly options.',
        'Prioritise balance, strength confidence and joint comfort.'
      ]
    }
  };

  const FAMILY_DB = [
    fam('horizontal-push','Horizontal Push',['push','horizontal-push','press'],['shoulder','elbow','wrist'],['chest','triceps','front delts'],['shoulder','elbow','wrist','biceps tendon']),
    fam('vertical-push','Vertical Push',['push','vertical-push','press'],['shoulder','elbow','scapula'],['delts','triceps','upper traps','serratus'],['shoulder','neck','low back']),
    fam('horizontal-pull','Horizontal Pull',['pull','horizontal-pull','row'],['shoulder','elbow','scapula'],['lats','mid-back','rear delts','biceps'],['elbow','shoulder','biceps tendon','upper back']),
    fam('vertical-pull','Vertical Pull',['pull','vertical-pull'],['shoulder','elbow','scapula'],['lats','biceps','forearms','upper back'],['elbow','shoulder','wrist','biceps tendon']),
    fam('squat','Squat / Knee Dominant',['squat','quad-dominant','knee-dominant'],['knee','hip','ankle'],['quads','glutes','adductors','patellar tendon'],['knee','patellar tendon','hip','ankle']),
    fam('lunge-split','Lunge / Split Stance',['lunge-split','unilateral-leg','knee-dominant'],['knee','hip','ankle'],['quads','glutes','adductors','calves'],['knee','hip','ankle','adductor']),
    fam('hinge','Hinge / Posterior Chain',['hinge','posterior-chain'],['hip','spine'],['hamstrings','glutes','spinal erectors'],['low back','hamstring','hip']),
    fam('hip-extension','Glute Bridge / Hip Extension',['hip-extension','glute-dominant'],['hip','spine'],['glutes','hamstrings','deep core'],['low back','hamstring','hip']),
    fam('calf-ankle','Calves / Ankles',['calf','ankle','foot'],['ankle','foot','knee'],['calves','soleus','feet','achilles'],['achilles','calf','ankle']),
    fam('core-anti-extension','Core Anti-Extension',['core','anti-extension'],['spine','ribcage','pelvis'],['abdominals','deep core','serratus'],['low back','neck']),
    fam('core-anti-rotation','Core Anti-Rotation / Lateral',['core','anti-rotation','lateral'],['spine','pelvis','shoulder'],['obliques','glutes','adductors','deep core'],['low back','groin','shoulder']),
    fam('carry','Loaded Carry',['carry','grip','core'],['shoulder','spine','hip'],['grip','traps','core','glutes'],['low back','neck','shoulder','grip']),
    fam('arms','Arms',['arm-isolation','curl','extension'],['elbow','wrist','shoulder'],['biceps','triceps','forearms'],['elbow','biceps tendon','wrist']),
    fam('conditioning','Conditioning',['conditioning','cardio','work-capacity'],['systemic'],['cardiorespiratory','full-body'],['fatigue','impact accumulation','calf','achilles']),
    fam('mobility-recovery','Mobility / Recovery',['mobility','recovery','activation'],['varied'],['varied'],['overstretching','irritating sensitive range']),
    fam('rehab-return','Rehab / Return-to-Training',['rehab','return','isometric','activation'],['varied'],['varied'],['flare-up','overconfidence','progressing too fast'])
  ];

  function fam(key, label, patterns, joints, tissues, riskZones) {
    return {
      key: key,
      label: label,
      patterns: patterns,
      primaryJoints: joints,
      tissues: tissues,
      riskZones: riskZones,
      commonFailurePoints: [
        'load outpacing control',
        'range exceeding tolerance',
        'too much volume too soon',
        'ignoring pain or recovery signals'
      ]
    };
  }

  function ex(key, name, family, equipment, muscles, difficulty, cautionIf, tags, alternatives, regressions, progressions, extra) {
    extra = extra || {};
    return Object.assign({
      key: key,
      name: name,
      family: family,
      movement: family,
      equipment: equipment || [],
      muscles: muscles || [],
      difficulty: difficulty || ['intermediate'],
      cautionIf: cautionIf || [],
      avoidIf: [],
      tags: tags || [],
      alternatives: alternatives || [],
      regressions: regressions || [],
      progressions: progressions || [],
      aliases: unique([name, key.replace(/-/g, ' ')]),
      yt: name + ' form',
      phaseUse: ['cut', 'recomp', 'maintain', 'build'],
      defaultRx: extra.defaultRx || '3 sets, controlled reps',
      tempo: extra.tempo || 'controlled',
      rest: extra.rest || '60-120 sec',
      coachingCue: extra.coachingCue || 'Keep the movement controlled and pain-free.',
      source: 'fff-exercise-db-v3'
    }, extra);
  }

  const E = [];

  function add(item) { E.push(item); }

  // HORIZONTAL PUSH
  add(ex('wall-push-up','Wall Push-up','horizontal-push',['bodyweight','wall'],['chest','triceps'],['rebuild','beginner'],['shoulder-pain','wrist-pain'],['simple','supported','bodyweight','reduced-range'],['incline-push-up','band-chest-press'],['scapular-wall-push'],['incline-push-up']));
  add(ex('scapular-wall-push','Scapular Wall Push','horizontal-push',['bodyweight','wall'],['serratus','scapular stabilisers'],['rebuild','beginner'],['shoulder-pain'],['scapular-control','simple'],['wall-push-up','wall-slide'],['breathing-reset'],['wall-push-up']));
  add(ex('knee-push-up','Knee Push-up','horizontal-push',['bodyweight'],['chest','triceps'],['beginner'],['wrist-pain','shoulder-pain'],['bodyweight','simple'],['incline-push-up','push-up'],['wall-push-up'],['push-up']));
  add(ex('incline-push-up','Incline Push-up','horizontal-push',['bodyweight','bench','box'],['chest','triceps'],['beginner','rebuild'],['shoulder-pain','wrist-pain'],['supported','push-up','simple'],['push-up','dumbbell-floor-press'],['wall-push-up','knee-push-up'],['push-up']));
  add(ex('push-up','Push-up','horizontal-push',['bodyweight'],['chest','triceps','core'],['beginner','intermediate'],['wrist-pain','shoulder-pain'],['push-up','core-bracing'],['incline-push-up','dumbbell-floor-press','band-chest-press'],['incline-push-up','knee-push-up'],['feet-elevated-push-up','ring-push-up']));
  add(ex('tempo-push-up','Tempo Push-up','horizontal-push',['bodyweight'],['chest','triceps','core'],['intermediate'],['wrist-pain','shoulder-pain'],['push-up','tempo-control'],['push-up','dumbbell-floor-press'],['push-up'],['feet-elevated-push-up']));
  add(ex('feet-elevated-push-up','Feet-Elevated Push-up','horizontal-push',['bodyweight','bench'],['chest','shoulders','triceps'],['intermediate','advanced'],['shoulder-pain','wrist-pain'],['push-up'],['push-up','dumbbell-bench-press'],['push-up'],['ring-push-up']));
  add(ex('dumbbell-floor-press','Dumbbell Floor Press','horizontal-push',['dumbbells'],['chest','triceps'],['beginner','rebuild','intermediate'],['biceps-tendon-pain'],['floor-press','neutral-grip','reduced-range'],['dumbbell-bench-press','push-up'],['incline-push-up','band-chest-press'],['dumbbell-bench-press']));
  add(ex('single-arm-floor-press','Single-arm Dumbbell Floor Press','horizontal-push',['dumbbells'],['chest','triceps','core'],['rebuild','intermediate'],['biceps-tendon-pain'],['unilateral','left-first','right-matches-left','floor-press'],['single-arm-dumbbell-bench-press','dumbbell-floor-press'],['dumbbell-floor-press'],['single-arm-dumbbell-bench-press']));
  add(ex('dumbbell-bench-press','Dumbbell Bench Press','horizontal-push',['dumbbells','bench'],['chest','triceps','front delts'],['intermediate'],['shoulder-pain','biceps-tendon-pain'],['neutral-grip','tempo-control'],['single-arm-dumbbell-bench-press','dumbbell-floor-press','push-up'],['dumbbell-floor-press','incline-push-up'],['tempo-dumbbell-bench-press']));
  add(ex('single-arm-dumbbell-bench-press','Single-arm Dumbbell Bench Press','horizontal-push',['dumbbells','bench'],['chest','triceps','core'],['intermediate'],['shoulder-pain'],['unilateral','left-first','right-matches-left','tempo-control'],['dumbbell-bench-press','single-arm-floor-press'],['single-arm-floor-press'],['tempo-dumbbell-bench-press']));
  add(ex('tempo-dumbbell-bench-press','Tempo Dumbbell Bench Press','horizontal-push',['dumbbells','bench'],['chest','triceps'],['intermediate','advanced'],['shoulder-pain'],['tempo-control'],['dumbbell-bench-press','dumbbell-floor-press'],['dumbbell-bench-press'],['paused-dumbbell-bench-press']));
  add(ex('paused-dumbbell-bench-press','Paused Dumbbell Bench Press','horizontal-push',['dumbbells','bench'],['chest','triceps'],['intermediate','advanced'],['shoulder-pain'],['tempo-control'],['tempo-dumbbell-bench-press','dumbbell-floor-press'],['dumbbell-bench-press'],['heavy-dumbbell-bench-press']));
  add(ex('incline-dumbbell-press','Incline Dumbbell Press','horizontal-push',['dumbbells','bench'],['upper chest','shoulders','triceps'],['intermediate'],['shoulder-pain','biceps-tendon-pain'],['neutral-grip','incline-press'],['dumbbell-floor-press','push-up'],['incline-push-up'],['dumbbell-bench-press']));
  add(ex('dumbbell-squeeze-press','Dumbbell Squeeze Press','horizontal-push',['dumbbells','bench'],['chest','triceps'],['beginner','intermediate'],['shoulder-pain'],['neutral-grip','tempo-control'],['dumbbell-floor-press','push-up'],['dumbbell-floor-press'],['dumbbell-bench-press']));
  add(ex('dumbbell-bench-fly','Dumbbell Bench Fly','horizontal-push',['dumbbells','bench'],['chest'],['intermediate'],['shoulder-pain','biceps-tendon-pain'],['deep-fly','tempo-control'],['dumbbell-squeeze-press','band-chest-fly','push-up'],['dumbbell-squeeze-press'],['slow-eccentric-fly']));
  add(ex('band-chest-press','Band Chest Press','horizontal-push',['bands'],['chest','triceps'],['beginner','rebuild'],['shoulder-pain'],['banded-light','neutral-grip'],['incline-push-up','dumbbell-floor-press'],['wall-push-up'],['push-up']));
  add(ex('band-chest-fly','Band Chest Fly','horizontal-push',['bands'],['chest'],['beginner','intermediate'],['shoulder-pain','biceps-tendon-pain'],['banded-light','deep-fly'],['dumbbell-squeeze-press','push-up'],['band-chest-press'],['dumbbell-bench-fly']));
  add(ex('ring-push-up','Ring Push-up','horizontal-push',['rings'],['chest','triceps','core'],['intermediate','advanced'],['shoulder-pain','wrist-pain'],['unstable','push-up'],['push-up','dumbbell-bench-press'],['push-up','incline-push-up'],['feet-elevated-ring-push-up']));
  add(ex('close-grip-push-up','Close-grip Push-up','horizontal-push',['bodyweight'],['triceps','chest'],['intermediate'],['wrist-pain','shoulder-pain','elbow-pain'],['push-up','diamond-push-up'],['band-pushdown','push-up'],['band-pushdown'],['diamond-push-up']));

  // VERTICAL PUSH / SHOULDERS
  add(ex('wall-slide','Wall Slide','mobility-recovery',['bodyweight','wall'],['serratus','shoulder mobility'],['rebuild','beginner'],[],['scapular-control','thoracic-mobility','simple'],['scaption-raise','band-pull-apart'],['breathing-reset'],['scaption-raise']));
  add(ex('band-pull-apart','Band Pull-apart','mobility-recovery',['bands'],['rear delts','mid-back'],['beginner','rebuild'],[],['scapular-control','banded-light'],['face-pull','scaption-raise'],['wall-slide'],['face-pull']));
  add(ex('scaption-raise','Scaption Raise','vertical-push',['dumbbells','bands'],['side delts','rotator cuff'],['rebuild','beginner'],['shoulder-pain'],['scapular-control','banded-light'],['dumbbell-lateral-raise','band-lateral-raise'],['wall-slide'],['dumbbell-lateral-raise']));
  add(ex('band-external-rotation','Band External Rotation','rehab-return',['bands'],['rotator cuff'],['rebuild','beginner'],['rotator-cuff-sensitivity'],['external-rotation','banded-light','scapular-control'],['scaption-raise','face-pull'],['wall-slide'],['face-pull']));
  add(ex('dumbbell-lateral-raise','Dumbbell Lateral Raise','vertical-push',['dumbbells'],['side delts'],['beginner','intermediate'],['shoulder-pain'],['banded-light'],['band-lateral-raise','scaption-raise'],['scaption-raise'],['lean-away-lateral-raise']));
  add(ex('band-lateral-raise','Band Lateral Raise','vertical-push',['bands'],['side delts'],['beginner','rebuild'],['shoulder-pain'],['banded-light'],['scaption-raise','dumbbell-lateral-raise'],['scaption-raise'],['dumbbell-lateral-raise']));
  add(ex('rear-delt-raise','Rear Delt Raise','horizontal-pull',['dumbbells','bench'],['rear delts','upper back'],['beginner','intermediate'],['shoulder-pain'],['scapular-control'],['face-pull','band-pull-apart'],['band-pull-apart'],['chest-supported-rear-delt-raise']));
  add(ex('seated-dumbbell-shoulder-press','Seated Dumbbell Shoulder Press','vertical-push',['dumbbells','bench'],['shoulders','triceps'],['intermediate'],['shoulder-pain','poor-overhead-mobility'],['overhead-heavy'],['incline-dumbbell-press','half-kneeling-single-arm-press'],['incline-dumbbell-press'],['standing-dumbbell-press']));
  add(ex('standing-dumbbell-press','Standing Dumbbell Press','vertical-push',['dumbbells'],['shoulders','triceps','core'],['intermediate','advanced'],['shoulder-pain','low-back-sensitivity','poor-overhead-mobility'],['overhead-heavy'],['seated-dumbbell-shoulder-press','half-kneeling-single-arm-press'],['seated-dumbbell-shoulder-press'],['push-press']));
  add(ex('half-kneeling-single-arm-press','Half-kneeling Single-arm Press','vertical-push',['dumbbells'],['shoulders','triceps','core'],['rebuild','intermediate'],['shoulder-pain','poor-overhead-mobility'],['unilateral','core-bracing','single-side-control'],['seated-dumbbell-shoulder-press','incline-dumbbell-press'],['incline-dumbbell-press'],['standing-dumbbell-press']));
  add(ex('pike-push-up','Pike Push-up','vertical-push',['bodyweight'],['shoulders','triceps'],['intermediate'],['shoulder-pain','wrist-pain','poor-overhead-mobility'],['overhead-heavy','push-up'],['incline-dumbbell-press','seated-dumbbell-shoulder-press'],['push-up'],['wall-handstand-hold']));
  add(ex('wall-handstand-hold','Wall Handstand Hold','vertical-push',['bodyweight','wall'],['shoulders','core'],['advanced'],['shoulder-pain','wrist-pain','poor-overhead-mobility'],['handstand','overhead-heavy'],['pike-push-up','seated-dumbbell-shoulder-press'],['pike-push-up'],['handstand-push-up-negative']));
  add(ex('push-press','Dumbbell Push Press','vertical-push',['dumbbells'],['shoulders','triceps','legs'],['advanced'],['shoulder-pain','low-back-sensitivity','knee-pain'],['overhead-heavy','complex'],['standing-dumbbell-press'],['seated-dumbbell-shoulder-press'],['complex-conditioning']));

  // HORIZONTAL PULL
  add(ex('band-row','Band Row','horizontal-pull',['bands'],['lats','mid-back','biceps'],['beginner','rebuild'],['biceps-tendon-pain','elbow-pain'],['banded-light','neutral-grip','simple'],['supported-one-arm-row','chest-supported-row'],['scapular-row'],['dumbbell-row']));
  add(ex('scapular-row','Scapular Row','horizontal-pull',['bands','bodyweight'],['scapula','mid-back'],['rebuild','beginner'],[],['scapular-control','simple'],['band-row','ring-row'],['band-pull-apart'],['band-row']));
  add(ex('supported-one-arm-row','Supported One-arm Dumbbell Row','horizontal-pull',['dumbbells','bench'],['lats','mid-back','biceps'],['beginner','intermediate'],['biceps-tendon-pain','low-back-sensitivity'],['supported-row','unilateral','left-first'],['chest-supported-row','band-row'],['band-row'],['dumbbell-row']));
  add(ex('dumbbell-row','One-arm Dumbbell Row','horizontal-pull',['dumbbells','bench'],['lats','mid-back','biceps'],['intermediate'],['biceps-tendon-pain','low-back-sensitivity'],['unilateral','supported-row'],['chest-supported-row','supported-one-arm-row'],['supported-one-arm-row'],['heavy-dumbbell-row']));
  add(ex('chest-supported-row','Chest-supported Dumbbell Row','horizontal-pull',['dumbbells','bench'],['mid-back','lats','rear delts'],['intermediate'],['biceps-tendon-pain'],['supported-row','neutral-grip'],['band-row','supported-one-arm-row'],['band-row'],['tempo-chest-supported-row']));
  add(ex('tempo-chest-supported-row','Tempo Chest-supported Row','horizontal-pull',['dumbbells','bench'],['mid-back','lats'],['intermediate','advanced'],['biceps-tendon-pain'],['tempo-control','supported-row'],['chest-supported-row'],['chest-supported-row'],['heavy-dumbbell-row']));
  add(ex('seal-row-bench','Seal Row on Bench','horizontal-pull',['dumbbells','bench'],['mid-back','rear delts'],['intermediate'],['biceps-tendon-pain'],['supported-row'],['chest-supported-row','band-row'],['chest-supported-row'],['tempo-chest-supported-row']));
  add(ex('inverted-row','Inverted Row','horizontal-pull',['bodyweight','rack'],['lats','mid-back','biceps'],['intermediate'],['biceps-tendon-pain','elbow-pain'],['bodyweight-row'],['ring-row','band-row'],['band-row'],['feet-elevated-inverted-row']));
  add(ex('ring-row','Ring Row','horizontal-pull',['rings'],['lats','mid-back','biceps','core'],['beginner','intermediate'],['biceps-tendon-pain','elbow-pain'],['bodyweight-row','scapular-control'],['band-row','inverted-row'],['band-row'],['feet-elevated-ring-row']));
  add(ex('face-pull','Band Face Pull','horizontal-pull',['bands'],['rear delts','rotator cuff','upper back'],['beginner','intermediate'],['shoulder-pain'],['scapular-control','banded-light'],['band-pull-apart','chest-supported-row'],['band-pull-apart'],['chest-supported-row']));
  add(ex('band-straight-arm-pulldown','Band Straight-arm Pulldown','vertical-pull',['bands'],['lats','serratus'],['beginner','intermediate'],['shoulder-pain'],['banded-light','scapular-control'],['band-lat-pulldown','band-row'],['scapular-pulldown'],['band-lat-pulldown']));

  // VERTICAL PULL
  add(ex('band-lat-pulldown','Band Lat Pulldown','vertical-pull',['bands'],['lats','biceps'],['beginner','rebuild'],['biceps-tendon-pain','elbow-pain'],['banded-light','scapular-control'],['band-row','ring-row'],['scapular-pulldown'],['assisted-pull-up']));
  add(ex('scapular-pulldown','Scapular Pulldown','vertical-pull',['bands','pull-up-bar'],['lats','lower traps'],['rebuild','beginner'],[],['scapular-control'],['band-lat-pulldown','scapular-pull-up'],['band-pull-apart'],['band-lat-pulldown']));
  add(ex('dead-hang','Dead Hang','vertical-pull',['pull-up-bar'],['grip','shoulders'],['beginner','intermediate'],['shoulder-pain','elbow-pain'],['grip','scapular-control'],['scapular-pull-up','band-lat-pulldown'],['band-lat-pulldown'],['scapular-pull-up']));
  add(ex('scapular-pull-up','Scapular Pull-up','vertical-pull',['pull-up-bar'],['lats','scapular stabilisers'],['beginner','rebuild'],['shoulder-pain'],['scapular-control'],['assisted-pull-up','band-lat-pulldown'],['scapular-pulldown'],['assisted-pull-up']));
  add(ex('assisted-pull-up','Assisted Pull-up','vertical-pull',['pull-up-bar','bands'],['lats','biceps','upper back'],['beginner','intermediate'],['biceps-tendon-pain','elbow-pain','shoulder-pain'],['aggressive-vertical-pull'],['band-lat-pulldown','ring-row'],['band-lat-pulldown'],['pull-up-negative']));
  add(ex('pull-up-negative','Pull-up Negative','vertical-pull',['pull-up-bar'],['lats','biceps'],['intermediate'],['biceps-tendon-pain','elbow-pain'],['aggressive-vertical-pull','tempo-control'],['assisted-pull-up','band-lat-pulldown'],['assisted-pull-up'],['pull-up']));
  add(ex('pull-up','Pull-up','vertical-pull',['pull-up-bar'],['lats','biceps','upper back'],['intermediate','advanced'],['biceps-tendon-pain','elbow-pain','shoulder-pain'],['aggressive-vertical-pull'],['assisted-pull-up','band-lat-pulldown','ring-row'],['assisted-pull-up'],['weighted-pull-up']));
  add(ex('chin-up','Chin-up','vertical-pull',['pull-up-bar'],['lats','biceps'],['intermediate','advanced'],['biceps-tendon-pain','elbow-pain'],['aggressive-vertical-pull','heavy-supinated-curl'],['assisted-pull-up','pull-up','ring-row'],['assisted-pull-up'],['weighted-chin-up']));

  // SQUAT / KNEE DOMINANT
  add(ex('sit-to-stand','Sit-to-Stand','squat',['chair','bodyweight'],['quads','glutes'],['rebuild','beginner'],['knee-pain','hip-pain'],['chair-friendly','simple','supported'],['chair-squat','box-squat'],['supported-sit-to-stand'],['chair-squat']));
  add(ex('chair-squat','Chair Squat','squat',['bodyweight','chair'],['quads','glutes'],['beginner','rebuild'],['knee-pain','hip-pain'],['box-range','supported','chair-friendly'],['box-squat','goblet-squat'],['sit-to-stand'],['box-squat']));
  add(ex('box-squat','Box Squat','squat',['bodyweight','dumbbells','box'],['quads','glutes'],['beginner','rebuild'],['knee-pain','hip-pain'],['box-range','reduced-range'],['goblet-squat','chair-squat'],['chair-squat'],['goblet-squat']));
  add(ex('counterbalance-squat','Counterbalance Squat','squat',['bodyweight','light-plate','dumbbell'],['quads','glutes'],['beginner'],['knee-pain','hip-pain'],['simple','squat'],['goblet-squat','box-squat'],['chair-squat'],['goblet-squat']));
  add(ex('goblet-squat','Goblet Squat','squat',['dumbbells','kettlebell'],['quads','glutes','core'],['beginner','intermediate'],['knee-pain','hip-pain','low-back-sensitivity'],['squat'],['box-squat','split-squat','step-up'],['box-squat'],['tempo-goblet-squat']));
  add(ex('tempo-goblet-squat','Tempo Goblet Squat','squat',['dumbbells','kettlebell'],['quads','glutes'],['intermediate'],['knee-pain','hip-pain'],['tempo-control'],['goblet-squat','box-squat'],['box-squat'],['front-foot-elevated-split-squat']));
  add(ex('heel-elevated-goblet-squat','Heel-Elevated Goblet Squat','squat',['dumbbells','kettlebell','wedge'],['quads'],['intermediate'],['knee-pain','patellar-tendon-pain'],['squat','deep-knee-flexion-fast'],['goblet-squat','box-squat'],['box-squat'],['tempo-goblet-squat']));
  add(ex('spanish-squat-hold','Spanish Squat Hold','squat',['bands'],['quads','patellar tendon'],['rebuild','intermediate'],['patellar-tendon-pain'],['spanish-squat','isometric'],['wall-sit','box-squat'],['wall-sit'],['spanish-squat-reps']));
  add(ex('spanish-squat-reps','Spanish Squat Reps','squat',['bands'],['quads'],['intermediate'],['patellar-tendon-pain','knee-pain'],['spanish-squat','controlled'],['spanish-squat-hold','box-squat'],['spanish-squat-hold'],['goblet-squat']));
  add(ex('wall-sit','Wall Sit','squat',['bodyweight','wall'],['quads'],['beginner','rebuild'],['knee-pain'],['isometric'],['spanish-squat-hold','box-squat'],['chair-squat'],['goblet-squat']));
  add(ex('assisted-pistol-box','Assisted Pistol to Box','squat',['bodyweight','box','support'],['quads','glutes'],['advanced'],['knee-pain','hip-pain','ankle-instability'],['pistol','advanced','deep-hip-flexion'],['split-squat','box-squat'],['box-squat'],['pistol-squat']));

  // LUNGE / SPLIT
  add(ex('supported-split-squat','Supported Split Squat','lunge-split',['bodyweight','support'],['quads','glutes'],['beginner','rebuild'],['knee-pain','hip-pain','ankle-instability'],['supported','unilateral','left-first'],['split-squat','step-up-low'],['chair-squat'],['split-squat']));
  add(ex('split-squat','Split Squat','lunge-split',['bodyweight','dumbbells'],['quads','glutes','adductors'],['beginner','intermediate'],['knee-pain','hip-pain','ankle-instability'],['unilateral','left-first'],['supported-split-squat','step-up'],['supported-split-squat'],['bulgarian-split-squat']));
  add(ex('front-foot-elevated-split-squat','Front-Foot-Elevated Split Squat','lunge-split',['bodyweight','dumbbells','wedge'],['quads','glutes'],['intermediate'],['knee-pain','hip-pain'],['unilateral','deep-knee-flexion-fast'],['split-squat','step-up'],['split-squat'],['bulgarian-split-squat']));
  add(ex('bulgarian-split-squat','Bulgarian Split Squat','lunge-split',['dumbbells','bench'],['quads','glutes'],['intermediate','advanced'],['knee-pain','hip-pain','ankle-instability'],['unilateral','left-first'],['split-squat','step-up'],['split-squat'],['front-foot-elevated-split-squat']));
  add(ex('reverse-lunge','Reverse Lunge','lunge-split',['bodyweight','dumbbells'],['quads','glutes'],['intermediate'],['knee-pain','hip-pain','ankle-instability'],['unilateral'],['split-squat','step-up'],['supported-split-squat'],['walking-lunge']));
  add(ex('walking-lunge','Walking Lunge','lunge-split',['bodyweight','dumbbells'],['quads','glutes','conditioning'],['intermediate','advanced'],['knee-pain','hip-pain','ankle-instability'],['unilateral'],['reverse-lunge','split-squat'],['reverse-lunge'],['loaded-walking-lunge']));
  add(ex('lateral-lunge','Lateral Lunge','lunge-split',['bodyweight','dumbbells'],['adductors','glutes','quads'],['intermediate'],['knee-pain','hip-pain','adductor-pain'],['lateral'],['supported-lateral-lunge','split-squat'],['supported-lateral-lunge'],['loaded-lateral-lunge']));
  add(ex('supported-lateral-lunge','Supported Lateral Lunge','lunge-split',['bodyweight','support'],['adductors','glutes'],['beginner','rebuild'],['hip-pain','knee-pain'],['supported','reduced-range','lateral'],['lateral-lunge','step-up-low'],['side-step'],['lateral-lunge']));
  add(ex('step-up-low','Low Step-up','lunge-split',['step','dumbbells'],['quads','glutes'],['beginner','rebuild'],['knee-pain','hip-pain','ankle-instability'],['controlled-step-up','step-up-low','unilateral'],['step-up','supported-split-squat'],['sit-to-stand'],['step-up']));
  add(ex('step-up','Step-up','lunge-split',['step','dumbbells'],['quads','glutes','calves'],['beginner','intermediate'],['knee-pain','hip-pain','ankle-instability'],['controlled-step-up','unilateral','left-first'],['step-up-low','split-squat'],['step-up-low'],['high-step-up']));
  add(ex('high-step-up','High Step-up','lunge-split',['step','dumbbells'],['quads','glutes'],['intermediate','advanced'],['knee-pain','hip-pain'],['unilateral'],['step-up','bulgarian-split-squat'],['step-up'],['loaded-high-step-up']));

  // HINGE / POSTERIOR
  add(ex('dowel-hip-hinge','Dowel Hip Hinge','hinge',['bodyweight','dowel'],['hamstrings','glutes'],['rebuild','beginner'],['low-back-sensitivity','hip-pain'],['reduced-range','simple','neutral-spine'],['dumbbell-rdl','glute-bridge'],['glute-bridge'],['dumbbell-rdl']));
  add(ex('band-good-morning','Band Good Morning','hinge',['bands'],['hamstrings','glutes'],['beginner','rebuild'],['low-back-sensitivity'],['hinge','banded-light'],['dumbbell-rdl','glute-bridge'],['dowel-hip-hinge'],['dumbbell-rdl']));
  add(ex('dumbbell-rdl','Dumbbell Romanian Deadlift','hinge',['dumbbells'],['hamstrings','glutes','back'],['beginner','intermediate'],['low-back-sensitivity','hip-pain','hamstring-pain'],['hinge','tempo-control'],['glute-bridge','reduced-range-rdl'],['dowel-hip-hinge','glute-bridge'],['single-leg-rdl-supported']));
  add(ex('reduced-range-rdl','Reduced-range Dumbbell RDL','hinge',['dumbbells'],['hamstrings','glutes'],['rebuild','beginner'],['low-back-sensitivity','hip-pain'],['reduced-range','neutral-spine'],['dumbbell-rdl','glute-bridge'],['dowel-hip-hinge'],['dumbbell-rdl']));
  add(ex('staggered-stance-rdl','Staggered-stance RDL','hinge',['dumbbells'],['hamstrings','glutes'],['intermediate'],['low-back-sensitivity','hip-pain'],['unilateral','single-side-control'],['dumbbell-rdl','supported-single-leg-rdl'],['dumbbell-rdl'],['single-leg-rdl-supported']));
  add(ex('single-leg-rdl-supported','Supported Single-leg RDL','hinge',['dumbbells','support'],['hamstrings','glutes','balance'],['intermediate'],['low-back-sensitivity','ankle-instability'],['unilateral','supported','single-leg-supported'],['dumbbell-rdl','glute-bridge'],['dumbbell-rdl'],['single-leg-rdl']));
  add(ex('single-leg-rdl','Single-leg RDL','hinge',['dumbbells'],['hamstrings','glutes','balance'],['advanced'],['low-back-sensitivity','ankle-instability','hip-pain'],['unilateral'],['single-leg-rdl-supported','dumbbell-rdl'],['single-leg-rdl-supported'],['single-leg-rdl-reach']));
  add(ex('glute-bridge','Glute Bridge','hip-extension',['bodyweight'],['glutes','hamstrings'],['beginner','rebuild'],['hip-pain','low-back-sensitivity'],['glute-dominant','simple'],['single-leg-glute-bridge','hip-thrust'],['posterior-pelvic-tilt-drill'],['single-leg-glute-bridge']));
  add(ex('posterior-pelvic-tilt-drill','Posterior Pelvic Tilt Drill','hip-extension',['bodyweight'],['deep core','glutes'],['rebuild','beginner'],['low-back-sensitivity'],['core-bracing','simple'],['glute-bridge','dead-bug'],['breathing-reset'],['glute-bridge']));
  add(ex('single-leg-glute-bridge','Single-leg Glute Bridge','hip-extension',['bodyweight'],['glutes','hamstrings','core'],['rebuild','intermediate'],['hip-pain','hamstring-cramp'],['unilateral','left-first','glute-dominant'],['glute-bridge','hip-thrust'],['glute-bridge'],['weighted-glute-bridge']));
  add(ex('weighted-glute-bridge','Weighted Glute Bridge','hip-extension',['dumbbells'],['glutes','hamstrings'],['intermediate'],['low-back-sensitivity','hip-pain'],['glute-dominant'],['glute-bridge','hip-thrust'],['glute-bridge'],['hip-thrust']));
  add(ex('hip-thrust','Hip Thrust','hip-extension',['bench','dumbbells'],['glutes','hamstrings'],['intermediate'],['hip-pain','low-back-sensitivity'],['glute-dominant'],['glute-bridge','dumbbell-rdl'],['glute-bridge'],['weighted-hip-thrust']));
  add(ex('frog-pump','Frog Pump','hip-extension',['bodyweight'],['glutes'],['beginner','rebuild'],['hip-pain'],['glute-dominant','simple'],['glute-bridge'],['posterior-pelvic-tilt-drill'],['glute-bridge']));
  add(ex('kettlebell-swing','Kettlebell Swing','hinge',['kettlebell'],['glutes','hamstrings','conditioning'],['advanced'],['low-back-sensitivity','hip-pain'],['ballistic-hinge','complex'],['dumbbell-rdl','glute-bridge'],['dumbbell-rdl'],['swing-intervals']));

  // CALF / ANKLE
  add(ex('seated-calf-raise','Seated Calf Raise','calf-ankle',['dumbbells','chair'],['soleus','calves'],['beginner','rebuild'],['achilles-calf-sensitivity'],['controlled-calf','simple'],['standing-calf-raise'],['ankle-pump'],['standing-calf-raise']));
  add(ex('standing-calf-raise','Standing Calf Raise','calf-ankle',['bodyweight','dumbbells','support'],['calves'],['beginner','intermediate'],['achilles-calf-sensitivity','ankle-instability'],['controlled-calf','supported'],['seated-calf-raise','single-leg-calf-raise'],['seated-calf-raise'],['single-leg-calf-raise']));
  add(ex('single-leg-calf-raise','Single-leg Calf Raise','calf-ankle',['bodyweight','support'],['calves','feet'],['intermediate'],['achilles-calf-sensitivity','ankle-instability'],['unilateral','controlled-calf'],['standing-calf-raise'],['standing-calf-raise'],['weighted-single-leg-calf-raise']));
  add(ex('tibialis-raise','Tibialis Raise','calf-ankle',['bodyweight','wall'],['tibialis anterior'],['beginner','rebuild'],[],['ankle-control'],['ankle-rocker','standing-calf-raise'],['ankle-pump'],['weighted-tibialis-raise']));
  add(ex('ankle-rocker','Ankle Rocker','calf-ankle',['bodyweight'],['ankle mobility','calves'],['beginner','rebuild'],['ankle-instability'],['balance-regression','mobility'],['tibialis-raise','standing-calf-raise'],['ankle-pump'],['step-down-control']));
  add(ex('step-down-control','Step-down Control','calf-ankle',['step','support'],['quads','calves','ankle'],['rebuild','intermediate'],['knee-pain','ankle-instability'],['controlled-step-up','balance-regression'],['step-up-low','ankle-rocker'],['ankle-rocker'],['step-up']));

  // CORE
  add(ex('breathing-reset','Breathing Reset','mobility-recovery',['bodyweight'],['nervous system','core'],['all'],[],['recovery','simple'],['mobility-reset'],['rest'],['dead-bug']));
  add(ex('dead-bug','Dead Bug','core-anti-extension',['bodyweight'],['deep core'],['beginner','rebuild'],['low-back-sensitivity','disc-sensitivity'],['core-bracing','anti-extension'],['plank','bird-dog'],['breathing-reset'],['hollow-hold']));
  add(ex('heel-tap','Heel Tap','core-anti-extension',['bodyweight'],['deep core'],['beginner'],['low-back-sensitivity'],['anti-extension'],['dead-bug','plank'],['dead-bug'],['hollow-hold']));
  add(ex('bird-dog','Bird Dog','core-anti-extension',['bodyweight'],['core','glutes','back'],['beginner','rebuild'],['low-back-sensitivity','disc-sensitivity'],['core-bracing','neutral-spine'],['dead-bug','plank'],['dead-bug'],['bear-hold']));
  add(ex('plank','Plank','core-anti-extension',['bodyweight'],['core','shoulders'],['beginner','intermediate'],['shoulder-pain','low-back-sensitivity'],['core-bracing','anti-extension'],['dead-bug','bear-hold'],['dead-bug'],['body-saw']));
  add(ex('forearm-plank','Forearm Plank','core-anti-extension',['bodyweight'],['core','shoulders'],['beginner','intermediate'],['wrist-pain','low-back-sensitivity'],['forearm-support','anti-extension'],['plank','dead-bug'],['dead-bug'],['body-saw']));
  add(ex('hollow-hold','Hollow Hold','core-anti-extension',['bodyweight'],['abdominals'],['intermediate','advanced'],['low-back-sensitivity'],['advanced-core','anti-extension'],['dead-bug','heel-tap'],['dead-bug'],['hollow-rock']));
  add(ex('bear-hold','Bear Hold','core-anti-extension',['bodyweight'],['core','shoulders','quads'],['intermediate'],['wrist-pain','shoulder-pain','knee-pain'],['bear-position','core-bracing'],['dead-bug','plank'],['dead-bug'],['bear-crawl']));
  add(ex('side-plank-knees','Side Plank from Knees','core-anti-rotation',['bodyweight'],['obliques','glutes'],['beginner','rebuild'],['shoulder-pain'],['lateral-core','simple'],['side-plank'],['dead-bug'],['side-plank']));
  add(ex('side-plank','Side Plank','core-anti-rotation',['bodyweight'],['obliques','glutes','shoulders'],['beginner','intermediate'],['shoulder-pain'],['lateral-core'],['side-plank-knees','pallof-press'],['side-plank-knees'],['copenhagen-plank']));
  add(ex('pallof-press','Pallof Press','core-anti-rotation',['bands'],['obliques','deep core'],['beginner','intermediate'],['shoulder-pain','low-back-sensitivity'],['anti-rotation','banded-light'],['side-plank','dead-bug'],['dead-bug'],['pallof-hold']));
  add(ex('pallof-hold','Pallof Hold','core-anti-rotation',['bands'],['obliques','deep core'],['beginner','rebuild'],['shoulder-pain','low-back-sensitivity'],['anti-rotation','isometric'],['pallof-press','side-plank'],['dead-bug'],['pallof-press']));
  add(ex('copenhagen-plank-short','Short-lever Copenhagen Plank','core-anti-rotation',['bench'],['adductors','obliques'],['intermediate'],['hip-pain','adductor-pain'],['lateral-core'],['side-plank'],['side-plank'],['copenhagen-plank']));
  add(ex('farmer-carry','Farmer Carry','carry',['dumbbells','kettlebell'],['grip','traps','core'],['intermediate'],['low-back-sensitivity','shoulder-pain'],['carry'],['suitcase-carry','marching-carry'],['suitcase-carry'],['heavy-farmer-carry']));
  add(ex('suitcase-carry','Suitcase Carry','carry',['dumbbells','kettlebell'],['core','grip','obliques'],['intermediate'],['low-back-sensitivity','shoulder-pain'],['carry','anti-rotation'],['pallof-press','side-plank'],['side-plank'],['heavy-suitcase-carry']));
  add(ex('marching-carry','Marching Carry','carry',['dumbbells','kettlebell'],['core','hip flexors','grip'],['beginner','intermediate'],['hip-pain','low-back-sensitivity'],['carry','balance-regression'],['farmer-carry','suitcase-carry'],['marching-in-place'],['farmer-carry']));

  // ARMS
  add(ex('band-curl','Band Curl','arms',['bands'],['biceps'],['beginner','rebuild'],['biceps-tendon-pain','elbow-pain'],['banded-light'],['hammer-curl','alternating-dumbbell-curl'],['isometric-curl-hold'],['hammer-curl']));
  add(ex('isometric-curl-hold','Isometric Curl Hold','arms',['dumbbells','bands'],['biceps'],['rebuild','beginner'],['biceps-tendon-pain','elbow-pain'],['isometric','banded-light'],['band-curl','hammer-curl'],['rest'],['band-curl']));
  add(ex('alternating-dumbbell-curl','Alternating Dumbbell Curl','arms',['dumbbells'],['biceps'],['beginner','intermediate'],['biceps-tendon-pain','elbow-pain'],['heavy-curl'],['hammer-curl','band-curl'],['band-curl'],['incline-curl']));
  add(ex('hammer-curl','Hammer Curl','arms',['dumbbells'],['biceps','brachialis','forearms'],['beginner','intermediate'],['biceps-tendon-pain','elbow-pain'],['neutral-grip'],['band-curl','alternating-dumbbell-curl'],['band-curl'],['cross-body-hammer-curl']));
  add(ex('cross-body-hammer-curl','Cross-body Hammer Curl','arms',['dumbbells'],['brachialis','forearms'],['intermediate'],['elbow-pain'],['neutral-grip'],['hammer-curl','band-curl'],['hammer-curl'],['incline-curl']));
  add(ex('incline-curl','Incline Dumbbell Curl','arms',['dumbbells','bench'],['biceps'],['advanced'],['biceps-tendon-pain','shoulder-pain'],['heavy-curl'],['hammer-curl','alternating-dumbbell-curl'],['alternating-dumbbell-curl'],['slow-eccentric-curl']));
  add(ex('band-pushdown','Band Pushdown','arms',['bands'],['triceps'],['beginner','intermediate'],['elbow-pain'],['banded-light'],['close-grip-push-up','overhead-band-extension'],['light-band-pushdown'],['close-grip-push-up']));
  add(ex('light-band-pushdown','Light Band Pushdown','arms',['bands'],['triceps'],['rebuild','beginner'],['elbow-pain'],['banded-light'],['band-pushdown'],['rest'],['band-pushdown']));
  add(ex('overhead-band-extension','Overhead Band Extension','arms',['bands'],['triceps'],['intermediate'],['elbow-pain','shoulder-pain'],['heavy-extension'],['band-pushdown','close-grip-push-up'],['band-pushdown'],['dumbbell-overhead-extension']));
  add(ex('dumbbell-skullcrusher','Dumbbell Skullcrusher','arms',['dumbbells','bench'],['triceps'],['intermediate'],['elbow-pain','shoulder-pain'],['heavy-extension'],['band-pushdown','close-grip-push-up'],['band-pushdown'],['tempo-skullcrusher']));

  // CONDITIONING
  add(ex('walk','Walk','conditioning',['bodyweight'],['cardio','recovery'],['beginner','rebuild','all'],[],['low-impact','simple'],['zone-2-bike','marching-in-place'],['short-walk'],['longer-walk']));
  add(ex('short-walk','Short Walk','conditioning',['bodyweight'],['cardio','recovery'],['all'],[],['low-impact','simple','recovery'],['walk'],['breathing-reset'],['walk']));
  add(ex('zone-2-bike','Zone 2 Bike','conditioning',['bike'],['cardio'],['beginner','intermediate'],['knee-pain'],['low-impact'],['walk','zone-2-row'],['walk'],['longer-zone-2-bike']));
  add(ex('zone-2-row','Zone 2 Row','conditioning',['rower'],['cardio','back','legs'],['intermediate'],['low-back-sensitivity','knee-pain'],['low-impact'],['zone-2-bike','walk'],['walk'],['row-intervals']));
  add(ex('marching-in-place','Marching in Place','conditioning',['bodyweight'],['cardio','hip flexors'],['beginner','rebuild'],['hip-pain'],['low-impact','simple','chair-friendly'],['walk','low-impact-circuit'],['seated-march'],['step-up-low']));
  add(ex('seated-march','Seated March','conditioning',['chair','bodyweight'],['hip flexors','cardio'],['rebuild','beginner'],['hip-pain'],['chair-friendly','low-impact'],['marching-in-place'],['breathing-reset'],['marching-in-place']));
  add(ex('low-impact-circuit','Low-impact Conditioning Circuit','conditioning',['bodyweight','dumbbells','bands'],['cardio','full-body'],['beginner','rebuild'],['knee-pain','low-back-sensitivity'],['low-impact','simple'],['walk','zone-2-bike'],['walk'],['density-circuit']));
  add(ex('density-circuit','Low-Impact Density Circuit','conditioning',['bodyweight','dumbbells','bands'],['cardio','full-body'],['intermediate'],['knee-pain','low-back-sensitivity'],['low-impact'],['low-impact-circuit','walk'],['low-impact-circuit'],['complex-conditioning']));
  add(ex('skipping','Skipping / Jump Rope','conditioning',['rope'],['cardio','calves'],['intermediate'],['knee-pain','ankle-instability','achilles-calf-sensitivity'],['jumping','high-impact'],['walk','zone-2-bike','low-impact-circuit'],['marching-in-place'],['interval-skipping']));
  add(ex('interval-skipping','Interval Skipping','conditioning',['rope'],['cardio','calves'],['advanced'],['knee-pain','ankle-instability','achilles-calf-sensitivity'],['jumping','high-impact'],['skipping','zone-2-bike'],['skipping'],['sprint-intervals']));
  add(ex('battle-rope-alternative-band-slams','Band Slam Alternative','conditioning',['bands'],['cardio','shoulders','core'],['intermediate'],['shoulder-pain','low-back-sensitivity'],['conditioning'],['low-impact-circuit','band-row'],['band-row'],['density-circuit']));
  add(ex('db-clean-press-light','Light DB Clean and Press','conditioning',['dumbbells'],['full-body','shoulders'],['advanced'],['shoulder-pain','low-back-sensitivity','knee-pain'],['complex','overhead-heavy'],['density-circuit','dumbbell-rdl','incline-dumbbell-press'],['low-impact-circuit'],['db-clean-press']));

  // MOBILITY / RECOVERY / REHAB
  add(ex('mobility-reset','Mobility Reset Flow','mobility-recovery',['bodyweight'],['mobility','recovery'],['all'],[],['recovery','simple'],['daily-recovery-flow','walk'],['breathing-reset'],['longer-mobility-flow']));
  add(ex('daily-recovery-flow','Daily Recovery Flow','mobility-recovery',['bodyweight','bands'],['glutes','core','shoulders'],['all'],[],['recovery','activation'],['mobility-reset','walk'],['breathing-reset'],['loaded-session']));
  add(ex('longer-mobility-flow','Longer Mobility Flow','mobility-recovery',['bodyweight'],['mobility','recovery'],['all'],[],['recovery'],['mobility-reset','yoga-flow'],['mobility-reset'],['loaded-session']));
  add(ex('cat-cow','Cat-Cow','mobility-recovery',['bodyweight'],['spine mobility'],['beginner','rebuild'],['wrist-pain'],['mobility'],['thread-the-needle','childs-pose-breathing'],['breathing-reset'],['thoracic-rotation']));
  add(ex('thoracic-rotation','Thoracic Rotation','mobility-recovery',['bodyweight'],['upper back mobility'],['beginner','rebuild'],['shoulder-pain'],['thoracic-mobility'],['wall-slide','thread-the-needle'],['cat-cow'],['open-book-rotation']));
  add(ex('open-book-rotation','Open Book Rotation','mobility-recovery',['bodyweight'],['thoracic mobility'],['beginner','rebuild'],['shoulder-pain'],['thoracic-mobility'],['thoracic-rotation'],['cat-cow'],['thread-the-needle']));
  add(ex('hip-flexor-rockback','Hip Flexor Rockback','mobility-recovery',['bodyweight'],['hips'],['beginner','rebuild'],['hip-pain'],['mobility','reduced-range'],['glute-bridge','step-up-low'],['breathing-reset'],['split-squat']));
  add(ex('adductor-rockback','Adductor Rockback','mobility-recovery',['bodyweight'],['adductors','hips'],['beginner','rebuild'],['hip-pain','adductor-pain'],['mobility','reduced-range'],['supported-lateral-lunge'],['hip-flexor-rockback'],['lateral-lunge']));
  add(ex('hamstring-floss','Hamstring Floss','mobility-recovery',['bodyweight','band'],['hamstrings'],['beginner','rebuild'],['hamstring-pain','low-back-sensitivity'],['mobility','reduced-range'],['dowel-hip-hinge'],['breathing-reset'],['dumbbell-rdl']));
  add(ex('calf-wall-stretch','Calf Wall Stretch','mobility-recovery',['wall'],['calves','ankle'],['beginner','rebuild'],['achilles-calf-sensitivity'],['mobility'],['ankle-rocker','standing-calf-raise'],['ankle-pump'],['standing-calf-raise']));
  add(ex('ankle-pump','Ankle Pump','mobility-recovery',['bodyweight'],['ankle','calf'],['rebuild','beginner'],[],['simple','mobility'],['ankle-rocker'],['breathing-reset'],['ankle-rocker']));
  add(ex('yoga-flow','Gentle Yoga Flow','mobility-recovery',['bodyweight'],['mobility','recovery'],['beginner','intermediate'],['wrist-pain','knee-pain'],['recovery'],['mobility-reset','longer-mobility-flow'],['breathing-reset'],['loaded-session']));
  add(ex('tai-chi-walk','Tai Chi Walk','mobility-recovery',['bodyweight'],['balance','mobility','recovery'],['beginner','rebuild','all'],['ankle-instability','knee-pain'],['low-impact','balance-regression','recovery'],['walk','mobility-reset'],['marching-in-place'],['walk']));
  add(ex('chair-yoga-flow','Chair Yoga Flow','mobility-recovery',['chair','bodyweight'],['mobility','breathing'],['rebuild','beginner'],['older-adult'],['chair-friendly','low-impact','simple'],['mobility-reset','seated-march'],['breathing-reset'],['tai-chi-walk']));

  // REHAB / RETURN
  add(ex('isometric-wall-push','Isometric Wall Push','rehab-return',['wall','bodyweight'],['chest','shoulders'],['rebuild'],['shoulder-pain'],['isometric','supported','simple'],['wall-push-up','scapular-wall-push'],['breathing-reset'],['wall-push-up']));
  add(ex('isometric-row-hold','Isometric Row Hold','rehab-return',['bands'],['mid-back','lats'],['rebuild'],['biceps-tendon-pain','elbow-pain'],['isometric','banded-light'],['band-row','scapular-row'],['band-pull-apart'],['band-row']));
  add(ex('quad-set','Quad Set','rehab-return',['bodyweight'],['quads'],['rebuild'],['knee-pain','patellar-tendon-pain'],['isometric','simple'],['wall-sit','spanish-squat-hold'],['rest'],['wall-sit']));
  add(ex('straight-leg-raise','Straight Leg Raise','rehab-return',['bodyweight'],['quads','hip flexors'],['rebuild'],['hip-pain'],['simple'],['quad-set','sit-to-stand'],['quad-set'],['sit-to-stand']));
  add(ex('clam-shell','Clam Shell','rehab-return',['bodyweight','bands'],['glute med','hips'],['rebuild','beginner'],['hip-pain'],['glute-dominant','activation'],['side-lying-hip-abduction','glute-bridge'],['breathing-reset'],['side-lying-hip-abduction']));
  add(ex('side-lying-hip-abduction','Side-lying Hip Abduction','rehab-return',['bodyweight','bands'],['glute med','hips'],['rebuild','beginner'],['hip-pain'],['glute-dominant','activation'],['clam-shell','lateral-band-walk'],['clam-shell'],['lateral-band-walk']));
  add(ex('lateral-band-walk','Lateral Band Walk','rehab-return',['bands'],['glute med','hips'],['beginner','intermediate'],['hip-pain','knee-pain'],['activation','glute-dominant'],['side-lying-hip-abduction','clam-shell'],['side-lying-hip-abduction'],['supported-split-squat']));
  add(ex('wrist-neutral-push-up-hold','Neutral Wrist Push-up Hold','rehab-return',['dumbbells','handles'],['chest','triceps','wrist'],['rebuild'],['wrist-pain'],['neutral-grip','dumbbell-grip','isometric'],['incline-push-up','dumbbell-floor-press'],['wall-push-up'],['push-up']));
  add(ex('neck-friendly-row-reset','Neck-friendly Row Reset','rehab-return',['bands'],['mid-back','neck posture'],['rebuild'],['shoulder-pain'],['scapular-control','banded-light'],['band-row','face-pull'],['band-pull-apart'],['band-row']));

  const BY_KEY = {};
  const BY_NAME = {};
  E.forEach(function (item) {
    BY_KEY[item.key] = item;
    BY_NAME[normalise(item.name)] = item;
    (item.aliases || []).forEach(function (a) {
      BY_NAME[normalise(a)] = item;
    });
  });

  function familyByKey(key) {
    return FAMILY_DB.find(function (f) { return f.key === key; }) || null;
  }

  function findExercise(nameOrKey) {
    if (!nameOrKey) return null;
    var directKey = slug(nameOrKey);
    if (BY_KEY[directKey]) return clone(BY_KEY[directKey]);

    var exact = BY_NAME[normalise(nameOrKey)];
    if (exact) return clone(exact);

    var n = normalise(nameOrKey);
    var best = null;
    var bestScore = 0;

    E.forEach(function (ex) {
      var score = 0;
      if (normalise(ex.name).indexOf(n) > -1 || n.indexOf(normalise(ex.name)) > -1) score += 4;
      (ex.aliases || []).forEach(function (a) {
        if (normalise(a).indexOf(n) > -1 || n.indexOf(normalise(a)) > -1) score += 2;
      });
      if (score > bestScore) {
        best = ex;
        bestScore = score;
      }
    });

    return best ? clone(best) : null;
  }

  function labelForKey(key) {
    var found = BY_KEY[key] || findExercise(key);
    return found ? found.name : key;
  }

  function fallbackProfile(name) {
    return {
      name: name || 'Unknown Exercise',
      key: slug(name),
      family: 'general',
      patterns: ['general'],
      primaryJoints: ['general'],
      tissues: ['general'],
      riskZones: ['general'],
      commonFailurePoints: ['load outpacing control', 'rushing reps', 'ignoring recovery context'],
      regressions: [],
      progressions: [],
      alternatives: [],
      aliases: [],
      confidence: 'low'
    };
  }

  function getExerciseProfile(name) {
    var found = findExercise(name);
    if (!found) return fallbackProfile(name);

    var fam = familyByKey(found.family);

    return {
      name: found.name,
      key: found.key,
      family: found.family,
      movement: found.movement,
      patterns: fam ? fam.patterns.slice() : [found.family],
      primaryJoints: fam ? fam.primaryJoints.slice() : [],
      tissues: unique((fam ? fam.tissues : []).concat(found.muscles || [])),
      riskZones: fam ? fam.riskZones.slice() : [],
      commonFailurePoints: fam ? fam.commonFailurePoints.slice() : [],
      regressions: (found.regressions || []).map(labelForKey),
      progressions: (found.progressions || []).map(labelForKey),
      alternatives: (found.alternatives || []).map(labelForKey),
      equipment: found.equipment.slice(),
      muscles: found.muscles.slice(),
      cautionIf: found.cautionIf.slice(),
      tags: found.tags.slice(),
      aliases: found.aliases.slice(),
      phaseUse: found.phaseUse.slice(),
      yt: found.yt,
      defaultRx: found.defaultRx,
      tempo: found.tempo,
      rest: found.rest,
      coachingCue: found.coachingCue,
      confidence: 'high'
    };
  }

  function getFamilySummary(name) {
    var p = getExerciseProfile(name);
    return {
      family: p.family,
      patterns: p.patterns,
      riskZones: p.riskZones,
      likelySwapTargets: p.regressions.concat(p.alternatives),
      likelyProgressions: p.progressions
    };
  }

  function areRelatedExercises(a, b) {
    var pa = getExerciseProfile(a);
    var pb = getExerciseProfile(b);
    if (!pa || !pb) return false;
    if (pa.family === pb.family) return true;
    return pa.patterns.some(function (p) { return pb.patterns.indexOf(p) > -1; });
  }

  function analyseGroup(exerciseNames) {
    var arr = Array.isArray(exerciseNames) ? exerciseNames : [];
    var profiles = arr.map(getExerciseProfile);
    return {
      count: profiles.length,
      families: unique(profiles.map(function (p) { return p.family; })),
      riskZones: unique([].concat.apply([], profiles.map(function (p) { return p.riskZones || []; }))),
      tissues: unique([].concat.apply([], profiles.map(function (p) { return p.tissues || []; })))
    };
  }

  function getAllExercises() {
    return clone(E);
  }

  function hasAny(arr, values) {
    arr = arr || [];
    values = values || [];
    return values.some(function (v) { return arr.indexOf(v) > -1; });
  }

  function normaliseInjuries(list) {
    return safeArray(list).map(function (x) { return slug(x); }).filter(Boolean);
  }

  function scoreExerciseForContext(exercise, context) {
    exercise = typeof exercise === 'string' ? findExercise(exercise) : exercise;
    if (!exercise) return -999;

    context = context || {};
    var injuries = normaliseInjuries(context.injuries || []);
    var equipment = safeArray(context.equipment || []).map(slug);
    var phase = normalise(context.phase || context.goal || '');
    var preferredFamilies = safeArray(context.preferredFamilies || []);
    var avoidedFamilies = safeArray(context.avoidedFamilies || []);
    var painLevel = Number(context.painLevel || context.maxPain || 0);
    var level = normalise(context.level || context.experience || '');

    var score = 0;

    if (!equipment.length) {
      score += 1;
    } else if (exercise.equipment.indexOf('bodyweight') > -1 || exercise.equipment.some(function (e) { return equipment.indexOf(slug(e)) > -1; })) {
      score += 5;
    } else {
      score -= 8;
    }

    if (preferredFamilies.indexOf(exercise.family) > -1) score += 4;
    if (avoidedFamilies.indexOf(exercise.family) > -1) score -= 10;

    if (level && (exercise.difficulty || []).indexOf(level) > -1) score += 2;
    if (level === 'beginner' && (exercise.difficulty || []).indexOf('advanced') > -1) score -= 7;

    if (phase.indexOf('cut') > -1 || phase.indexOf('recomp') > -1) {
      if (exercise.tags.indexOf('tempo-control') > -1 || exercise.tags.indexOf('supported') > -1 || exercise.tags.indexOf('simple') > -1) score += 1;
      if (exercise.tags.indexOf('plyometric') > -1 || exercise.tags.indexOf('max-effort') > -1) score -= 4;
    }

    if (phase.indexOf('build') > -1 || phase.indexOf('hypertrophy') > -1 || phase.indexOf('bulk') > -1) {
      if (exercise.phaseUse.indexOf('build') > -1) score += 1;
      if (exercise.tags.indexOf('recovery') > -1) score -= 1;
    }

    injuries.forEach(function (injury) {
      var rule = INJURY_RULES[injury];
      if (!rule) return;

      if ((exercise.cautionIf || []).indexOf(injury) > -1) score -= painLevel >= 3 ? 9 : 4;
      if (hasAny(exercise.tags, rule.avoidPatterns || [])) score -= painLevel >= 3 ? 12 : 5;
      if (hasAny(exercise.tags, rule.preferPatterns || [])) score += 7;
      if ((rule.cautionPatterns || []).indexOf(exercise.family) > -1) score -= painLevel >= 3 ? 6 : 2;
    });

    if (exercise.tags.indexOf('unilateral') > -1 && injuries.indexOf('left-right-imbalance') > -1) score += 7;
    if (exercise.tags.indexOf('left-first') > -1 && injuries.indexOf('left-right-imbalance') > -1) score += 3;
    if (exercise.tags.indexOf('chair-friendly') > -1 && injuries.indexOf('older-adult') > -1) score += 6;
    if (exercise.tags.indexOf('low-impact') > -1 && (injuries.indexOf('knee-pain') > -1 || injuries.indexOf('ankle-instability') > -1)) score += 4;

    return score;
  }

  function filterExercises(query) {
    query = query || {};
    var list = E.slice();

    if (query.family) {
      var fams = Array.isArray(query.family) ? query.family : [query.family];
      list = list.filter(function (ex) { return fams.indexOf(ex.family) > -1; });
    }

    if (query.equipment && query.equipment.length) {
      var eq = query.equipment.map(slug);
      list = list.filter(function (ex) {
        return ex.equipment.indexOf('bodyweight') > -1 || ex.equipment.some(function (e) { return eq.indexOf(slug(e)) > -1; });
      });
    }

    if (query.difficulty) {
      var difficulty = normalise(query.difficulty);
      list = list.filter(function (ex) {
        return ex.difficulty.indexOf(difficulty) > -1 || ex.difficulty.indexOf('all') > -1;
      });
    }

    list = list.map(function (ex) {
      var scored = clone(ex);
      scored.contextScore = scoreExerciseForContext(ex, query);
      return scored;
    });

    if (query.injuries && query.injuries.length) {
      list = list.filter(function (ex) { return ex.contextScore > -10; });
    }

    list.sort(function (a, b) { return b.contextScore - a.contextScore; });
    return clone(list);
  }

  function suggestAlternatives(nameOrKey, context, limit) {
    context = context || {};
    limit = limit || 8;

    var original = findExercise(nameOrKey);
    if (!original) return [];

    var directKeys = unique([].concat(original.regressions || [], original.alternatives || []));
    var direct = directKeys.map(findExercise).filter(Boolean);

    var sameFamily = E.filter(function (ex) {
      return ex.family === original.family && ex.key !== original.key;
    });

    var combinedKeys = unique(direct.concat(sameFamily).map(function (x) { return x.key; }));
    var combined = combinedKeys
      .map(findExercise)
      .filter(Boolean)
      .map(function (ex) {
        ex.contextScore = scoreExerciseForContext(ex, context);
        return ex;
      })
      .filter(function (ex) { return ex.contextScore > -12; })
      .sort(function (a, b) { return b.contextScore - a.contextScore; });

    return clone(combined.slice(0, limit));
  }

  function buildMovementMenu(context) {
    context = context || {};
    return FAMILY_DB.map(function (fam) {
      return {
        key: fam.key,
        label: fam.label,
        options: filterExercises({
          family: fam.key,
          equipment: context.equipment || [],
          injuries: context.injuries || [],
          painLevel: context.painLevel || context.maxPain || 0,
          phase: context.phase || '',
          level: context.level || ''
        }).slice(0, 12)
      };
    });
  }

  function buildTemplate(context) {
    context = context || {};
    var phase = normalise(context.phase || context.goal || 'recomp');

    var families;
    if (phase.indexOf('cut') > -1 || phase.indexOf('recomp') > -1) {
      families = ['horizontal-push','horizontal-pull','lunge-split','hinge','core-anti-extension','mobility-recovery'];
    } else if (phase.indexOf('build') > -1 || phase.indexOf('hypertrophy') > -1 || phase.indexOf('bulk') > -1) {
      families = ['horizontal-push','vertical-push','horizontal-pull','vertical-pull','squat','hinge','arms'];
    } else {
      families = ['horizontal-push','horizontal-pull','squat','hinge','core-anti-rotation','conditioning'];
    }

    return families.map(function (family) {
      var options = filterExercises(Object.assign({}, context, { family: family })).slice(0, 5);
      return {
        family: family,
        label: (familyByKey(family) || {}).label || family,
        recommended: options[0] || null,
        alternatives: options.slice(1)
      };
    });
  }

  function getInjuryRules() {
    return clone(INJURY_RULES);
  }

  function getLibraryStats() {
    var byFamily = {};
    E.forEach(function (ex) {
      byFamily[ex.family] = (byFamily[ex.family] || 0) + 1;
    });
    return {
      totalExercises: E.length,
      familyCount: FAMILY_DB.length,
      injuryProfiles: Object.keys(INJURY_RULES).length,
      byFamily: byFamily
    };
  }

  return {
    getExerciseProfile: getExerciseProfile,
    getFamilySummary: getFamilySummary,
    areRelatedExercises: areRelatedExercises,
    analyseGroup: analyseGroup,

    getAllExercises: getAllExercises,
    findExercise: findExercise,
    filterExercises: filterExercises,
    suggestAlternatives: suggestAlternatives,
    buildMovementMenu: buildMovementMenu,
    getInjuryRules: getInjuryRules,
    scoreExerciseForContext: scoreExerciseForContext,
    buildTemplate: buildTemplate,
    getLibraryStats: getLibraryStats
  };
})();
