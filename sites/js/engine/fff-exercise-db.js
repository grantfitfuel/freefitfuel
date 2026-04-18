// FreeFitFuel Engine — Exercise Intelligence

window.FFFExerciseDB = (function () {
  'use strict';

  const DB = [
    {
      id: 'goblet_squat',
      aliases: ['goblet squat', 'front squat', 'squat', 'air squat', 'box squat', 'chair squat'],
      category: 'lower',
      movementPattern: 'squat',
      equipment: ['bodyweight', 'dumbbells', 'barbell'],
      difficulty: 'beginner',
      muscles: ['quads', 'glutes', 'core'],
      jointStress: { shoulder: 0, elbow: 0, wrist: 1, hip: 1, knee: 2, ankle: 1, back: 1 },
      fatigueCost: 3,
      regressions: ['box squat', 'chair squat', 'supported squat'],
      progressions: ['front squat', 'back squat', 'tempo squat'],
      cues: [
        'Brace before you move.',
        'Keep pressure through the mid-foot.',
        'Let the knees track naturally over the toes.',
        'Stand tall without throwing the ribs up.'
      ],
      injuryFlags: ['knee', 'hip', 'low_back']
    },
    {
      id: 'rdl',
      aliases: ['romanian deadlift', 'rdl', 'deadlift', 'db romanian deadlift', 'hinge'],
      category: 'lower',
      movementPattern: 'hinge',
      equipment: ['bodyweight', 'dumbbells', 'barbell', 'bands'],
      difficulty: 'intermediate',
      muscles: ['glutes', 'hamstrings', 'back'],
      jointStress: { shoulder: 0, elbow: 0, wrist: 1, hip: 1, knee: 1, ankle: 0, back: 2 },
      fatigueCost: 4,
      regressions: ['band hip hinge', 'glute bridge', 'hip hinge drill'],
      progressions: ['barbell rdl', 'single-leg rdl'],
      cues: [
        'Push the hips back first.',
        'Keep the weight close.',
        'Ribs stay stacked and lats stay on.',
        'Stop before the low back starts taking over.'
      ],
      injuryFlags: ['hamstring', 'low_back', 'hip']
    },
    {
      id: 'push_up',
      aliases: ['push-up', 'push up', 'incline push-up', 'knee push-up', 'diamond push-up'],
      category: 'upper',
      movementPattern: 'horizontal_push',
      equipment: ['bodyweight'],
      difficulty: 'beginner',
      muscles: ['chest', 'triceps', 'shoulders', 'core'],
      jointStress: { shoulder: 2, elbow: 1, wrist: 2, hip: 0, knee: 0, ankle: 0, back: 1 },
      fatigueCost: 3,
      regressions: ['wall push-up', 'incline push-up', 'knee push-up'],
      progressions: ['feet-elevated push-up', 'weighted push-up', 'close-grip push-up'],
      cues: [
        'Body moves as one piece.',
        'Hands screw into the floor lightly.',
        'Keep the neck long and ribs quiet.',
        'Stop before the shoulders roll forward.'
      ],
      injuryFlags: ['shoulder', 'wrist', 'elbow']
    },
    {
      id: 'row',
      aliases: ['row', 'db row', 'dumbbell row', 'one-arm db row', 'inverted row', 'chest-supported row'],
      category: 'upper',
      movementPattern: 'horizontal_pull',
      equipment: ['bodyweight', 'dumbbells', 'bands'],
      difficulty: 'beginner',
      muscles: ['lats', 'mid_back', 'biceps'],
      jointStress: { shoulder: 1, elbow: 1, wrist: 1, hip: 0, knee: 0, ankle: 0, back: 1 },
      fatigueCost: 3,
      regressions: ['band row', 'lighter db row', 'supported row'],
      progressions: ['chest-supported row', 'heavier one-arm row'],
      cues: [
        'Pull the elbow toward the back pocket.',
        'Keep the shoulder away from the ear.',
        'Do not twist to manufacture range.',
        'Pause briefly when the shoulder blade comes back.'
      ],
      injuryFlags: ['shoulder', 'elbow']
    },
    {
      id: 'pull_up',
      aliases: ['pull-up', 'pull up', 'chin-up', 'chin up', 'band-assist pull-up', 'negative pull-up'],
      category: 'upper',
      movementPattern: 'vertical_pull',
      equipment: ['bodyweight', 'bands'],
      difficulty: 'intermediate',
      muscles: ['lats', 'biceps', 'grip', 'core'],
      jointStress: { shoulder: 2, elbow: 2, wrist: 1, hip: 0, knee: 0, ankle: 0, back: 1 },
      fatigueCost: 4,
      regressions: ['band-assisted pull-up', 'negative pull-up', 'inverted row'],
      progressions: ['strict pull-up', 'weighted pull-up'],
      cues: [
        'Start from a true hang you can control.',
        'Drive elbows down rather than yanking with the hands.',
        'Keep ribs down and legs quiet.',
        'Own the lowering phase.'
      ],
      injuryFlags: ['shoulder', 'elbow', 'wrist']
    },
    {
      id: 'overhead_press',
      aliases: ['overhead press', 'db overhead press', 'shoulder press', 'strict press', 'pike push-up'],
      category: 'upper',
      movementPattern: 'vertical_push',
      equipment: ['bodyweight', 'dumbbells', 'barbell'],
      difficulty: 'intermediate',
      muscles: ['shoulders', 'triceps', 'upper_back', 'core'],
      jointStress: { shoulder: 3, elbow: 1, wrist: 1, hip: 0, knee: 0, ankle: 0, back: 1 },
      fatigueCost: 3,
      regressions: ['half-kneeling press', 'lighter db press', 'landmine press'],
      progressions: ['standing strict press', 'push press'],
      cues: [
        'Ribs stay down as the weight goes up.',
        'Press up and slightly back.',
        'Finish with the biceps near the ears without shrugging hard.',
        'Do not turn it into a standing backbend.'
      ],
      injuryFlags: ['shoulder', 'neck']
    },
    {
      id: 'split_squat',
      aliases: ['split squat', 'bulgarian split squat', 'reverse lunge', 'walking lunge', 'step up'],
      category: 'lower',
      movementPattern: 'single_leg',
      equipment: ['bodyweight', 'dumbbells'],
      difficulty: 'intermediate',
      muscles: ['quads', 'glutes', 'adductors', 'core'],
      jointStress: { shoulder: 0, elbow: 0, wrist: 0, hip: 1, knee: 2, ankle: 1, back: 1 },
      fatigueCost: 3,
      regressions: ['supported split squat', 'step-back lunge', 'sit-to-stand'],
      progressions: ['rear-foot elevated split squat', 'loaded split squat'],
      cues: [
        'Stay tall through the torso.',
        'Front foot stays rooted.',
        'Lower under control rather than dropping.',
        'Use the front leg to stand, not a bounce.'
      ],
      injuryFlags: ['knee', 'hip', 'ankle']
    },
    {
      id: 'plank',
      aliases: ['plank', 'side plank', 'rkc plank', 'hollow hold'],
      category: 'core',
      movementPattern: 'anti_extension',
      equipment: ['bodyweight'],
      difficulty: 'beginner',
      muscles: ['core', 'obliques', 'glutes', 'shoulders'],
      jointStress: { shoulder: 1, elbow: 0, wrist: 1, hip: 0, knee: 0, ankle: 0, back: 0 },
      fatigueCost: 2,
      regressions: ['short lever plank', 'knee plank', 'dead bug'],
      progressions: ['long lever plank', 'rkc plank', 'side plank'],
      cues: [
        'Ribs down, glutes on.',
        'Long line from head to heel.',
        'Breathe quietly instead of bracing like you are being punched.',
        'End the set before your hips sag.'
      ],
      injuryFlags: ['shoulder', 'wrist']
    },
    {
      id: 'dead_bug',
      aliases: ['dead bug', 'banded dead bug'],
      category: 'core',
      movementPattern: 'anti_extension',
      equipment: ['bodyweight', 'bands'],
      difficulty: 'beginner',
      muscles: ['deep_core', 'hip_flexors'],
      jointStress: { shoulder: 0, elbow: 0, wrist: 0, hip: 0, knee: 0, ankle: 0, back: 0 },
      fatigueCost: 1,
      regressions: ['heel tap dead bug'],
      progressions: ['banded dead bug', 'long lever dead bug'],
      cues: [
        'Keep the low back gently connected to the floor.',
        'Move slowly enough that you do not lose the rib position.',
        'Exhale on the reach.'
      ],
      injuryFlags: ['low_back']
    },
    {
      id: 'farmer_carry',
      aliases: ['farmer carry', 'carry', 'suitcase carry'],
      category: 'carry',
      movementPattern: 'carry',
      equipment: ['dumbbells'],
      difficulty: 'intermediate',
      muscles: ['grip', 'traps', 'core', 'glutes'],
      jointStress: { shoulder: 1, elbow: 0, wrist: 1, hip: 0, knee: 0, ankle: 0, back: 1 },
      fatigueCost: 3,
      regressions: ['static hold', 'lighter carry'],
      progressions: ['heavier carry', 'longer distance', 'suitcase carry'],
      cues: [
        'Stand tall, do not lean into the weight.',
        'Walk quietly and keep the ribs stacked.',
        'Grip hard without shrugging.'
      ],
      injuryFlags: ['shoulder', 'wrist', 'neck']
    },
    {
      id: 'z2_cardio',
      aliases: ['z2', 'zone 2', 'zone 2 cardio', 'liss', 'easy cardio', 'walk', 'brisk walk', 'easy bike', 'easy row'],
      category: 'cardio',
      movementPattern: 'aerobic_base',
      equipment: ['bodyweight', 'bike', 'rower'],
      difficulty: 'beginner',
      muscles: ['cardiorespiratory'],
      jointStress: { shoulder: 0, elbow: 0, wrist: 0, hip: 0, knee: 1, ankle: 1, back: 0 },
      fatigueCost: 2,
      regressions: ['shorter walk', 'flat route', 'cycle'],
      progressions: ['longer duration', 'slight hills'],
      cues: [
        'Keep it conversational.',
        'You should finish feeling better than when you started.',
        'This is not a stealth interval session.'
      ],
      injuryFlags: ['foot', 'achilles', 'shin', 'knee']
    },
    {
      id: 'interval_cardio',
      aliases: ['intervals', 'hiit', 'threshold', 'tempo', 'hill repeats', 'strides'],
      category: 'cardio',
      movementPattern: 'high_intensity',
      equipment: ['bodyweight', 'bike', 'rower'],
      difficulty: 'intermediate',
      muscles: ['cardiorespiratory'],
      jointStress: { shoulder: 0, elbow: 0, wrist: 0, hip: 1, knee: 2, ankle: 2, back: 0 },
      fatigueCost: 4,
      regressions: ['fewer rounds', 'longer recovery', 'bike intervals'],
      progressions: ['more rounds', 'faster pace', 'hill work'],
      cues: [
        'Quality first, not flailing.',
        'Hold a repeatable effort.',
        'If mechanics fall apart, the session is too hard.'
      ],
      injuryFlags: ['achilles', 'shin', 'hamstring', 'knee']
    }
  ];

  function normalise(text) {
    return String(text || '')
      .trim()
      .toLowerCase()
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, ' ');
  }

  function matchExercise(name) {
    const n = normalise(name);
    for (let i = 0; i < DB.length; i++) {
      const ex = DB[i];
      if (ex.aliases.some(function (alias) { return n.indexOf(normalise(alias)) !== -1; })) {
        return ex;
      }
    }
    return null;
  }

  function fallbackProfile(name) {
    return {
      id: 'generic',
      aliases: [],
      category: 'general',
      movementPattern: 'general',
      equipment: ['unknown'],
      difficulty: 'beginner',
      muscles: ['general'],
      jointStress: { shoulder: 1, elbow: 1, wrist: 1, hip: 1, knee: 1, ankle: 1, back: 1 },
      fatigueCost: 2,
      regressions: [],
      progressions: [],
      cues: [
        'Keep technique cleaner than your ego wants.',
        'Move with control.',
        'Stop before position falls apart.'
      ],
      injuryFlags: [],
      unknown: true,
      name: name || 'Exercise'
    };
  }

  function getExerciseProfile(name) {
    const match = matchExercise(name);
    if (!match) return fallbackProfile(name);
    return Object.assign({}, match, { name: name || match.id });
  }

  return {
    all: DB.slice(),
    normalise,
    matchExercise,
    getExerciseProfile
  };
})();
