// FreeFitFuel Engine — Exercise Knowledge Database v4
// Drop-in replacement for: /js/engine/fff-exercise-db.js
// Hybrid adaptive training database: weights + calisthenics + Pilates + circuits + mobility + rehab.

window.FFFExerciseDB = (function () {
  'use strict';

  const FAMILY_DB = [
  {
    "key": "horizontal-push",
    "label": "Horizontal Push",
    "patterns": [
      "horizontal-push"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "vertical-push",
    "label": "Vertical Push",
    "patterns": [
      "vertical-push"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "horizontal-pull",
    "label": "Horizontal Pull",
    "patterns": [
      "horizontal-pull"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "vertical-pull",
    "label": "Vertical Pull",
    "patterns": [
      "vertical-pull"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "squat",
    "label": "Squat / Knee Dominant",
    "patterns": [
      "squat"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "lunge-split",
    "label": "Lunge / Split Stance",
    "patterns": [
      "lunge-split"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "hinge",
    "label": "Hinge / Posterior Chain",
    "patterns": [
      "hinge"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "hip-extension",
    "label": "Glute Bridge / Hip Extension",
    "patterns": [
      "hip-extension"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "calf-ankle",
    "label": "Calves / Ankles",
    "patterns": [
      "calf-ankle"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "core-anti-extension",
    "label": "Core Anti-Extension",
    "patterns": [
      "core-anti-extension"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "core-anti-rotation",
    "label": "Core Anti-Rotation / Lateral",
    "patterns": [
      "core-anti-rotation"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "carry",
    "label": "Loaded Carry",
    "patterns": [
      "carry"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "arms",
    "label": "Arms",
    "patterns": [
      "arms"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "conditioning",
    "label": "Conditioning",
    "patterns": [
      "conditioning"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "mobility-recovery",
    "label": "Mobility / Recovery",
    "patterns": [
      "mobility-recovery"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "rehab-return",
    "label": "Rehab / Return-to-Training",
    "patterns": [
      "rehab-return"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "calisthenics-skill",
    "label": "Calisthenics Skill",
    "patterns": [
      "calisthenics-skill"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "pilates-core",
    "label": "Pilates Core / Control",
    "patterns": [
      "pilates-core"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  },
  {
    "key": "movement-restoration",
    "label": "Movement Restoration",
    "patterns": [
      "movement-restoration"
    ],
    "primaryJoints": [
      "varied"
    ],
    "tissues": [
      "varied"
    ],
    "riskZones": [
      "varied"
    ],
    "commonFailurePoints": [
      "load or leverage outpacing control",
      "range exceeding tolerance",
      "too much volume too soon",
      "ignoring pain or recovery signals"
    ]
  }
];
  const INJURY_RULES = {
  "biceps-tendon-pain": {
    "label": "Biceps tendon pain",
    "avoidPatterns": [
      "heavy-supinated-curl",
      "aggressive-vertical-pull",
      "jerky-row",
      "deep-fly",
      "pelican-curl"
    ],
    "cautionPatterns": [
      "horizontal-pull",
      "vertical-pull",
      "horizontal-push",
      "arms"
    ],
    "preferPatterns": [
      "neutral-grip",
      "supported-row",
      "tempo-control",
      "banded-light",
      "left-first"
    ],
    "notes": [
      "Prefer neutral grips and supported rows.",
      "Avoid heavy curls, jerky rows, pelican curls and grinding pull-ups while symptoms are active."
    ]
  },
  "shoulder-pain": {
    "label": "Shoulder pain / impingement sensitivity",
    "avoidPatterns": [
      "deep-fly",
      "upright-row",
      "behind-neck",
      "dip-deep",
      "overhead-heavy",
      "handstand",
      "unstable-heavy",
      "planche-load"
    ],
    "cautionPatterns": [
      "vertical-push",
      "horizontal-push",
      "vertical-pull",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "neutral-grip",
      "floor-press",
      "scapular-control",
      "reduced-range",
      "supported",
      "banded-light"
    ],
    "notes": [
      "Keep pressing in a pain-free range.",
      "Prioritise neutral grip, floor press, incline push-up and scapular control."
    ]
  },
  "rotator-cuff-sensitivity": {
    "label": "Rotator cuff sensitivity",
    "avoidPatterns": [
      "deep-fly",
      "unstable-heavy",
      "overhead-heavy",
      "dip-deep",
      "handstand"
    ],
    "cautionPatterns": [
      "vertical-push",
      "horizontal-push",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "scapular-control",
      "external-rotation",
      "banded-light",
      "reduced-range"
    ],
    "notes": [
      "Use low load cuff and scapular-control work.",
      "Avoid deep or unstable pressing until tolerance improves."
    ]
  },
  "elbow-pain": {
    "label": "Elbow pain",
    "avoidPatterns": [
      "heavy-curl",
      "heavy-extension",
      "high-volume-pull-up",
      "diamond-push-up",
      "muscle-up-transition"
    ],
    "cautionPatterns": [
      "vertical-pull",
      "arms",
      "horizontal-pull",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "neutral-grip",
      "banded-light",
      "tempo-control",
      "reduced-volume"
    ],
    "notes": [
      "Reduce direct arm loading first.",
      "Use neutral grips and lighter band work."
    ]
  },
  "wrist-pain": {
    "label": "Wrist pain",
    "avoidPatterns": [
      "loaded-wrist-extension",
      "flat-palm-push-up",
      "front-rack",
      "handstand",
      "planche-load"
    ],
    "cautionPatterns": [
      "push-up",
      "front-rack",
      "bear-position",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "neutral-grip",
      "handles",
      "dumbbell-grip",
      "forearm-support"
    ],
    "notes": [
      "Use dumbbells/handles for push-ups where possible.",
      "Avoid forcing loaded wrist extension."
    ]
  },
  "knee-pain": {
    "label": "Knee pain",
    "avoidPatterns": [
      "jumping",
      "deep-knee-flexion-fast",
      "high-impact",
      "pistol",
      "plyometric",
      "running-impact"
    ],
    "cautionPatterns": [
      "squat",
      "lunge-split",
      "step-up",
      "conditioning"
    ],
    "preferPatterns": [
      "box-range",
      "supported",
      "glute-dominant",
      "isometric",
      "low-impact",
      "reduced-range"
    ],
    "notes": [
      "Use controlled range and slow tempo.",
      "Prefer box squats, supported split squats, low step-ups, bridges and hinge work."
    ]
  },
  "patellar-tendon-pain": {
    "label": "Patellar tendon pain",
    "avoidPatterns": [
      "jumping",
      "fast-squat",
      "deep-knee-flexion-fast",
      "plyometric",
      "sissy-squat"
    ],
    "cautionPatterns": [
      "squat",
      "lunge-split",
      "step-up"
    ],
    "preferPatterns": [
      "spanish-squat",
      "isometric",
      "controlled-step-up",
      "box-range"
    ],
    "notes": [
      "Avoid ballistic knee-dominant work.",
      "Use controlled step-ups, Spanish squat holds and gradual loading."
    ]
  },
  "hip-pain": {
    "label": "Hip pain / impingement sensitivity",
    "avoidPatterns": [
      "deep-hip-flexion",
      "wide-stance-deep",
      "twist-loaded",
      "pistol"
    ],
    "cautionPatterns": [
      "squat",
      "lunge-split",
      "hinge",
      "pilates-core"
    ],
    "preferPatterns": [
      "reduced-range",
      "glute-bridge",
      "supported",
      "step-up-low",
      "glute-dominant"
    ],
    "notes": [
      "Avoid forcing deep hip positions.",
      "Prioritise glute bridges, low step-ups and controlled hinge range."
    ]
  },
  "low-back-sensitivity": {
    "label": "Lower back sensitivity",
    "avoidPatterns": [
      "loaded-spinal-flexion",
      "heavy-unsupported-hinge",
      "ballistic-hinge",
      "twist-loaded",
      "unsupported-heavy-row"
    ],
    "cautionPatterns": [
      "hinge",
      "carry",
      "rotation",
      "squat"
    ],
    "preferPatterns": [
      "supported",
      "core-bracing",
      "reduced-range",
      "single-leg-supported",
      "anti-extension",
      "neutral-spine"
    ],
    "notes": [
      "Avoid chasing load when bracing is poor.",
      "Prefer supported rows, glute bridges, dead bugs and reduced-range RDLs."
    ]
  },
  "disc-sensitivity": {
    "label": "Disc sensitivity",
    "avoidPatterns": [
      "loaded-spinal-flexion",
      "twist-loaded",
      "ballistic-hinge",
      "sit-up-loaded",
      "rollover"
    ],
    "cautionPatterns": [
      "hinge",
      "rotation",
      "carry",
      "pilates-core"
    ],
    "preferPatterns": [
      "anti-extension",
      "anti-rotation",
      "supported",
      "neutral-spine"
    ],
    "notes": [
      "Prioritise neutral spine, anti-extension and anti-rotation.",
      "Avoid loaded flexion and twisting under fatigue."
    ]
  },
  "ankle-instability": {
    "label": "Ankle instability",
    "avoidPatterns": [
      "jumping",
      "lateral-hop",
      "unstable-loaded",
      "running-impact"
    ],
    "cautionPatterns": [
      "lunge-split",
      "step-up",
      "running",
      "conditioning"
    ],
    "preferPatterns": [
      "supported",
      "calf-control",
      "balance-regression",
      "low-impact"
    ],
    "notes": [
      "Use stable surfaces and support.",
      "Progress calf/foot control gradually."
    ]
  },
  "achilles-calf-sensitivity": {
    "label": "Achilles / calf sensitivity",
    "avoidPatterns": [
      "jumping",
      "running-impact",
      "sprint",
      "plyometric"
    ],
    "cautionPatterns": [
      "calf-ankle",
      "conditioning"
    ],
    "preferPatterns": [
      "isometric",
      "low-impact",
      "controlled-calf"
    ],
    "notes": [
      "Avoid sudden spikes in jumping or running.",
      "Use controlled calf raises and low-impact conditioning."
    ]
  },
  "left-right-imbalance": {
    "label": "Left/right imbalance",
    "avoidPatterns": [
      "bilateral-hide-imbalance"
    ],
    "cautionPatterns": [
      "bilateral-heavy"
    ],
    "preferPatterns": [
      "unilateral",
      "left-first",
      "right-matches-left",
      "single-side-control"
    ],
    "notes": [
      "Use unilateral work.",
      "Weaker side sets the standard; stronger side matches, not exceeds."
    ]
  },
  "poor-overhead-mobility": {
    "label": "Poor overhead mobility",
    "avoidPatterns": [
      "overhead-heavy",
      "handstand",
      "behind-neck"
    ],
    "cautionPatterns": [
      "vertical-push",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "incline-press",
      "scapular-control",
      "landmine-pattern",
      "thoracic-mobility"
    ],
    "notes": [
      "Do not force overhead range.",
      "Use incline pressing, wall slides, serratus work and mobility first."
    ]
  },
  "beginner-low-confidence": {
    "label": "Beginner / low confidence",
    "avoidPatterns": [
      "advanced",
      "complex",
      "plyometric",
      "unstable-heavy"
    ],
    "cautionPatterns": [
      "conditioning",
      "advanced-core",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "simple",
      "supported",
      "bodyweight",
      "clear-progression",
      "low-cognitive-load"
    ],
    "notes": [
      "Use simple movements with clear success criteria.",
      "Prioritise confidence and repeatability."
    ]
  },
  "older-adult": {
    "label": "Older adult / deconditioned",
    "avoidPatterns": [
      "high-impact",
      "advanced",
      "plyometric",
      "max-effort"
    ],
    "cautionPatterns": [
      "floor-transition",
      "balance-demand"
    ],
    "preferPatterns": [
      "supported",
      "low-impact",
      "chair-friendly",
      "balance-regression",
      "simple"
    ],
    "notes": [
      "Prefer supported, low-impact and chair-friendly options.",
      "Prioritise balance, strength confidence and joint comfort."
    ]
  }
};
  const STYLE_PROFILES = {
  "strength-hypertrophy": {
    "label": "Strength & Hypertrophy",
    "preferFamilies": [
      "horizontal-push",
      "horizontal-pull",
      "vertical-push",
      "vertical-pull",
      "squat",
      "hinge",
      "arms"
    ],
    "preferDomains": [
      "weights",
      "hypertrophy",
      "strength"
    ]
  },
  "movement-calisthenics": {
    "label": "Calisthenics & Movement",
    "preferFamilies": [
      "horizontal-push",
      "vertical-pull",
      "horizontal-pull",
      "calisthenics-skill",
      "core-anti-extension",
      "core-anti-rotation"
    ],
    "preferDomains": [
      "calisthenics",
      "skill",
      "bodyweight"
    ]
  },
  "pilates-mobility": {
    "label": "Pilates & Mobility",
    "preferFamilies": [
      "pilates-core",
      "mobility-recovery",
      "hip-extension",
      "core-anti-extension",
      "core-anti-rotation",
      "movement-restoration"
    ],
    "preferDomains": [
      "pilates",
      "mobility",
      "recovery"
    ]
  },
  "hybrid-athlete": {
    "label": "Hybrid Athlete",
    "preferFamilies": [
      "horizontal-push",
      "horizontal-pull",
      "squat",
      "hinge",
      "conditioning",
      "carry",
      "calisthenics-skill"
    ],
    "preferDomains": [
      "hybrid",
      "strength",
      "conditioning",
      "calisthenics"
    ]
  },
  "fat-loss-conditioning": {
    "label": "Fat-loss Conditioning",
    "preferFamilies": [
      "conditioning",
      "carry",
      "squat",
      "lunge-split",
      "horizontal-push",
      "horizontal-pull",
      "mobility-recovery"
    ],
    "preferDomains": [
      "conditioning",
      "circuit",
      "low-impact"
    ]
  },
  "joint-longevity": {
    "label": "Joint Longevity",
    "preferFamilies": [
      "mobility-recovery",
      "rehab-return",
      "movement-restoration",
      "calf-ankle",
      "core-anti-rotation",
      "hip-extension"
    ],
    "preferDomains": [
      "longevity",
      "rehab",
      "mobility"
    ]
  },
  "low-overwhelm": {
    "label": "Low-overwhelm Mode",
    "preferFamilies": [
      "mobility-recovery",
      "pilates-core",
      "horizontal-push",
      "horizontal-pull",
      "hip-extension",
      "conditioning"
    ],
    "preferDomains": [
      "simple",
      "low-cognitive-load",
      "recovery"
    ]
  },
  "rebuild-recovery": {
    "label": "Rebuild & Recovery",
    "preferFamilies": [
      "rehab-return",
      "movement-restoration",
      "mobility-recovery",
      "pilates-core",
      "hip-extension",
      "calf-ankle"
    ],
    "preferDomains": [
      "rehab",
      "recovery",
      "low-impact"
    ]
  }
};
  const EXERCISES = [
  {
    "key": "wall-push-up",
    "name": "Wall Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bodyweight",
      "wall"
    ],
    "muscles": [
      "chest",
      "triceps"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain"
    ],
    "avoidIf": [],
    "tags": [
      "simple",
      "supported",
      "bodyweight",
      "reduced-range",
      "low-cognitive-load"
    ],
    "alternatives": [
      "incline-push-up",
      "band-chest-press"
    ],
    "regressions": [
      "scapular-wall-push"
    ],
    "progressions": [
      "incline-push-up"
    ],
    "aliases": [
      "Wall Push-up",
      "wall push up"
    ],
    "yt": "Wall Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab",
      "recovery"
    ],
    "styleBias": [
      "low-overwhelm",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "incline-push-up",
    "name": "Incline Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bodyweight",
      "bench",
      "box"
    ],
    "muscles": [
      "chest",
      "triceps"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain"
    ],
    "avoidIf": [],
    "tags": [
      "supported",
      "push-up",
      "simple"
    ],
    "alternatives": [
      "push-up",
      "dumbbell-floor-press"
    ],
    "regressions": [
      "wall-push-up",
      "knee-push-up"
    ],
    "progressions": [
      "push-up"
    ],
    "aliases": [
      "Incline Push-up",
      "incline push up"
    ],
    "yt": "Incline Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "push-up",
    "name": "Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "push-up",
      "core-bracing"
    ],
    "alternatives": [
      "incline-push-up",
      "dumbbell-floor-press"
    ],
    "regressions": [
      "incline-push-up",
      "knee-push-up"
    ],
    "progressions": [
      "tempo-push-up",
      "ring-push-up"
    ],
    "aliases": [
      "Push-up",
      "push up"
    ],
    "yt": "Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "bodyweight"
    ],
    "styleBias": [
      "movement-calisthenics",
      "hybrid-athlete"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "tempo-push-up",
    "name": "Tempo Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "push-up",
      "tempo-control"
    ],
    "alternatives": [
      "push-up",
      "dumbbell-floor-press"
    ],
    "regressions": [
      "push-up"
    ],
    "progressions": [
      "feet-elevated-push-up"
    ],
    "aliases": [
      "Tempo Push-up",
      "tempo push up"
    ],
    "yt": "Tempo Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "ring-push-up",
    "name": "Ring Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain"
    ],
    "avoidIf": [],
    "tags": [
      "unstable",
      "push-up",
      "skill"
    ],
    "alternatives": [
      "push-up",
      "dumbbell-bench-press"
    ],
    "regressions": [
      "push-up"
    ],
    "progressions": [
      "feet-elevated-ring-push-up"
    ],
    "aliases": [
      "Ring Push-up",
      "ring push up"
    ],
    "yt": "Ring Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pseudo-planche-push-up",
    "name": "Pseudo Planche Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "chest",
      "front delts",
      "triceps",
      "core"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "planche-load",
      "advanced",
      "loaded-wrist-extension"
    ],
    "alternatives": [
      "push-up",
      "planche-lean"
    ],
    "regressions": [
      "tempo-push-up",
      "planche-lean"
    ],
    "progressions": [
      "planche-push-up"
    ],
    "aliases": [
      "Pseudo Planche Push-up",
      "pseudo planche push up"
    ],
    "yt": "Pseudo Planche Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dumbbell-floor-press",
    "name": "Dumbbell Floor Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells"
    ],
    "muscles": [
      "chest",
      "triceps"
    ],
    "difficulty": [
      "beginner",
      "rebuild",
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "floor-press",
      "neutral-grip",
      "reduced-range"
    ],
    "alternatives": [
      "dumbbell-bench-press",
      "push-up"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "dumbbell-bench-press"
    ],
    "aliases": [
      "Dumbbell Floor Press",
      "dumbbell floor press"
    ],
    "yt": "Dumbbell Floor Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy",
      "rehab"
    ],
    "styleBias": [
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "single-arm-floor-press",
    "name": "Single-arm Dumbbell Floor Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core"
    ],
    "difficulty": [
      "rebuild",
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "unilateral",
      "left-first",
      "right-matches-left",
      "floor-press"
    ],
    "alternatives": [
      "single-arm-dumbbell-bench-press",
      "dumbbell-floor-press"
    ],
    "regressions": [
      "dumbbell-floor-press"
    ],
    "progressions": [
      "single-arm-dumbbell-bench-press"
    ],
    "aliases": [
      "Single-arm Dumbbell Floor Press",
      "single arm floor press"
    ],
    "yt": "Single-arm Dumbbell Floor Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dumbbell-bench-press",
    "name": "Dumbbell Bench Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "chest",
      "triceps",
      "front delts"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "neutral-grip",
      "tempo-control"
    ],
    "alternatives": [
      "single-arm-dumbbell-bench-press",
      "dumbbell-floor-press",
      "push-up"
    ],
    "regressions": [
      "dumbbell-floor-press"
    ],
    "progressions": [
      "tempo-dumbbell-bench-press"
    ],
    "aliases": [
      "Dumbbell Bench Press",
      "dumbbell bench press"
    ],
    "yt": "Dumbbell Bench Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "single-arm-dumbbell-bench-press",
    "name": "Single-arm Dumbbell Bench Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "unilateral",
      "left-first",
      "right-matches-left",
      "tempo-control"
    ],
    "alternatives": [
      "dumbbell-bench-press",
      "single-arm-floor-press"
    ],
    "regressions": [
      "single-arm-floor-press"
    ],
    "progressions": [
      "tempo-dumbbell-bench-press"
    ],
    "aliases": [
      "Single-arm Dumbbell Bench Press",
      "single arm dumbbell bench press"
    ],
    "yt": "Single-arm Dumbbell Bench Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "strength-hypertrophy",
      "joint-longevity"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "incline-dumbbell-press",
    "name": "Incline Dumbbell Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "upper chest",
      "shoulders",
      "triceps"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "neutral-grip",
      "incline-press"
    ],
    "alternatives": [
      "dumbbell-floor-press",
      "push-up"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "dumbbell-bench-press"
    ],
    "aliases": [
      "Incline Dumbbell Press",
      "incline dumbbell press"
    ],
    "yt": "Incline Dumbbell Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dumbbell-squeeze-press",
    "name": "Dumbbell Squeeze Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "chest",
      "triceps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "neutral-grip",
      "tempo-control"
    ],
    "alternatives": [
      "dumbbell-floor-press",
      "push-up"
    ],
    "regressions": [
      "dumbbell-floor-press"
    ],
    "progressions": [
      "dumbbell-bench-press"
    ],
    "aliases": [
      "Dumbbell Squeeze Press",
      "dumbbell squeeze press"
    ],
    "yt": "Dumbbell Squeeze Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dumbbell-bench-fly",
    "name": "Dumbbell Bench Fly",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "chest"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "deep-fly",
      "tempo-control"
    ],
    "alternatives": [
      "dumbbell-squeeze-press",
      "band-chest-fly"
    ],
    "regressions": [
      "dumbbell-squeeze-press"
    ],
    "progressions": [
      "slow-eccentric-fly"
    ],
    "aliases": [
      "Dumbbell Bench Fly",
      "dumbbell bench fly"
    ],
    "yt": "Dumbbell Bench Fly form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "band-chest-press",
    "name": "Band Chest Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "chest",
      "triceps"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "banded-light",
      "neutral-grip"
    ],
    "alternatives": [
      "incline-push-up",
      "dumbbell-floor-press"
    ],
    "regressions": [
      "wall-push-up"
    ],
    "progressions": [
      "push-up"
    ],
    "aliases": [
      "Band Chest Press",
      "band chest press"
    ],
    "yt": "Band Chest Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "wall-slide",
    "name": "Wall Slide",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bodyweight",
      "wall"
    ],
    "muscles": [
      "serratus",
      "shoulder mobility"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [],
    "avoidIf": [],
    "tags": [
      "scapular-control",
      "thoracic-mobility",
      "simple"
    ],
    "alternatives": [
      "scaption-raise"
    ],
    "regressions": [
      "breathing-reset"
    ],
    "progressions": [
      "scaption-raise"
    ],
    "aliases": [
      "Wall Slide",
      "wall slide"
    ],
    "yt": "Wall Slide form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "mobility",
      "rehab",
      "pilates"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "scapular-push-up",
    "name": "Scapular Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "serratus",
      "scapular stabilisers"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "scapular-control",
      "push-up"
    ],
    "alternatives": [
      "push-up",
      "planche-lean"
    ],
    "regressions": [
      "scapular-wall-push"
    ],
    "progressions": [
      "pseudo-planche-push-up"
    ],
    "aliases": [
      "Scapular Push-up",
      "scapular push up"
    ],
    "yt": "Scapular Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "band-external-rotation",
    "name": "Band External Rotation",
    "family": "rehab-return",
    "movement": "rehab-return",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "rotator cuff"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [
      "rotator-cuff-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "external-rotation",
      "banded-light",
      "scapular-control"
    ],
    "alternatives": [
      "scaption-raise",
      "face-pull"
    ],
    "regressions": [
      "wall-slide"
    ],
    "progressions": [
      "face-pull"
    ],
    "aliases": [
      "Band External Rotation",
      "band external rotation"
    ],
    "yt": "Band External Rotation form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "longevity"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dumbbell-lateral-raise",
    "name": "Dumbbell Lateral Raise",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "dumbbells"
    ],
    "muscles": [
      "side delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "banded-light"
    ],
    "alternatives": [
      "band-lateral-raise",
      "scaption-raise"
    ],
    "regressions": [
      "scaption-raise"
    ],
    "progressions": [
      "lean-away-lateral-raise"
    ],
    "aliases": [
      "Dumbbell Lateral Raise",
      "dumbbell lateral raise"
    ],
    "yt": "Dumbbell Lateral Raise form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "seated-dumbbell-shoulder-press",
    "name": "Seated Dumbbell Shoulder Press",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "shoulders",
      "triceps"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "poor-overhead-mobility"
    ],
    "avoidIf": [],
    "tags": [
      "overhead-heavy"
    ],
    "alternatives": [
      "incline-dumbbell-press",
      "half-kneeling-single-arm-press"
    ],
    "regressions": [
      "incline-dumbbell-press"
    ],
    "progressions": [
      "standing-dumbbell-press"
    ],
    "aliases": [
      "Seated Dumbbell Shoulder Press",
      "seated dumbbell shoulder press"
    ],
    "yt": "Seated Dumbbell Shoulder Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "half-kneeling-single-arm-press",
    "name": "Half-kneeling Single-arm Press",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "dumbbells"
    ],
    "muscles": [
      "shoulders",
      "triceps",
      "core"
    ],
    "difficulty": [
      "rebuild",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "poor-overhead-mobility"
    ],
    "avoidIf": [],
    "tags": [
      "unilateral",
      "core-bracing",
      "single-side-control"
    ],
    "alternatives": [
      "seated-dumbbell-shoulder-press",
      "incline-dumbbell-press"
    ],
    "regressions": [
      "incline-dumbbell-press"
    ],
    "progressions": [
      "standing-dumbbell-press"
    ],
    "aliases": [
      "Half-kneeling Single-arm Press",
      "half kneeling single arm press"
    ],
    "yt": "Half-kneeling Single-arm Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pike-push-up",
    "name": "Pike Push-up",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "shoulders",
      "triceps"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain",
      "poor-overhead-mobility"
    ],
    "avoidIf": [],
    "tags": [
      "overhead-heavy",
      "push-up"
    ],
    "alternatives": [
      "incline-dumbbell-press",
      "seated-dumbbell-shoulder-press"
    ],
    "regressions": [
      "push-up"
    ],
    "progressions": [
      "wall-handstand-hold"
    ],
    "aliases": [
      "Pike Push-up",
      "pike push up"
    ],
    "yt": "Pike Push-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 3,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "wall-walk",
    "name": "Wall Walk",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "bodyweight",
      "wall"
    ],
    "muscles": [
      "shoulders",
      "core",
      "serratus"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain",
      "poor-overhead-mobility"
    ],
    "avoidIf": [],
    "tags": [
      "handstand",
      "overhead-heavy",
      "skill"
    ],
    "alternatives": [
      "pike-push-up",
      "wall-handstand-hold"
    ],
    "regressions": [
      "pike-push-up"
    ],
    "progressions": [
      "chest-to-wall-handstand"
    ],
    "aliases": [
      "Wall Walk",
      "wall walk"
    ],
    "yt": "Wall Walk form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "chest-to-wall-handstand",
    "name": "Chest-to-Wall Handstand",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "bodyweight",
      "wall"
    ],
    "muscles": [
      "shoulders",
      "core",
      "glutes"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain",
      "poor-overhead-mobility"
    ],
    "avoidIf": [],
    "tags": [
      "handstand",
      "overhead-heavy",
      "skill"
    ],
    "alternatives": [
      "wall-handstand-hold",
      "pike-push-up"
    ],
    "regressions": [
      "wall-walk"
    ],
    "progressions": [
      "freestanding-handstand-drill"
    ],
    "aliases": [
      "Chest-to-Wall Handstand",
      "chest to wall handstand"
    ],
    "yt": "Chest-to-Wall Handstand form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "freestanding-handstand-drill",
    "name": "Freestanding Handstand Drill",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "shoulders",
      "core",
      "balance"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain",
      "poor-overhead-mobility"
    ],
    "avoidIf": [],
    "tags": [
      "handstand",
      "skill",
      "balance-demand"
    ],
    "alternatives": [
      "chest-to-wall-handstand"
    ],
    "regressions": [
      "chest-to-wall-handstand"
    ],
    "progressions": [
      "handstand-push-up-negative"
    ],
    "aliases": [
      "Freestanding Handstand Drill",
      "freestanding handstand drill"
    ],
    "yt": "Freestanding Handstand Drill form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 5,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "band-row",
    "name": "Band Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "lats",
      "mid-back",
      "biceps"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "banded-light",
      "neutral-grip",
      "simple"
    ],
    "alternatives": [
      "supported-one-arm-row",
      "chest-supported-row"
    ],
    "regressions": [
      "scapular-row"
    ],
    "progressions": [
      "dumbbell-row"
    ],
    "aliases": [
      "Band Row",
      "band row"
    ],
    "yt": "Band Row form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "door-table-row",
    "name": "Door/Table Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bodyweight",
      "table"
    ],
    "muscles": [
      "lats",
      "mid-back",
      "biceps"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "bodyweight-row",
      "simple"
    ],
    "alternatives": [
      "band-row",
      "ring-row"
    ],
    "regressions": [
      "band-row"
    ],
    "progressions": [
      "inverted-row"
    ],
    "aliases": [
      "Door/Table Row",
      "door table row"
    ],
    "yt": "Door/Table Row form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "bodyweight"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "ring-row",
    "name": "Ring Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "lats",
      "mid-back",
      "biceps",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "bodyweight-row",
      "scapular-control"
    ],
    "alternatives": [
      "band-row",
      "inverted-row"
    ],
    "regressions": [
      "band-row"
    ],
    "progressions": [
      "feet-elevated-ring-row"
    ],
    "aliases": [
      "Ring Row",
      "ring row"
    ],
    "yt": "Ring Row form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "supported-one-arm-row",
    "name": "Supported One-arm Dumbbell Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "lats",
      "mid-back",
      "biceps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "supported-row",
      "unilateral",
      "left-first"
    ],
    "alternatives": [
      "chest-supported-row",
      "band-row"
    ],
    "regressions": [
      "band-row"
    ],
    "progressions": [
      "dumbbell-row"
    ],
    "aliases": [
      "Supported One-arm Dumbbell Row",
      "supported one arm row"
    ],
    "yt": "Supported One-arm Dumbbell Row form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "chest-supported-row",
    "name": "Chest-supported Dumbbell Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "mid-back",
      "lats",
      "rear delts"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "supported-row",
      "neutral-grip"
    ],
    "alternatives": [
      "band-row",
      "supported-one-arm-row"
    ],
    "regressions": [
      "band-row"
    ],
    "progressions": [
      "tempo-chest-supported-row"
    ],
    "aliases": [
      "Chest-supported Dumbbell Row",
      "chest supported row"
    ],
    "yt": "Chest-supported Dumbbell Row form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "rehab"
    ],
    "styleBias": [
      "strength-hypertrophy",
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "kroc-row",
    "name": "Kroc Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "lats",
      "upper back",
      "grip"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "unsupported-heavy-row",
      "high-fatigue"
    ],
    "alternatives": [
      "dumbbell-row",
      "chest-supported-row"
    ],
    "regressions": [
      "dumbbell-row"
    ],
    "progressions": [
      "heavy-dumbbell-row"
    ],
    "aliases": [
      "Kroc Row",
      "kroc row"
    ],
    "yt": "Kroc Row form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 4,
    "fatigueCost": 5,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "face-pull",
    "name": "Band Face Pull",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "rear delts",
      "rotator cuff",
      "upper back"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "scapular-control",
      "banded-light"
    ],
    "alternatives": [
      "band-pull-apart",
      "chest-supported-row"
    ],
    "regressions": [
      "band-pull-apart"
    ],
    "progressions": [
      "chest-supported-row"
    ],
    "aliases": [
      "Band Face Pull",
      "face pull"
    ],
    "yt": "Band Face Pull form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "band-lat-pulldown",
    "name": "Band Lat Pulldown",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "lats",
      "biceps"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "banded-light",
      "scapular-control"
    ],
    "alternatives": [
      "band-row",
      "ring-row"
    ],
    "regressions": [
      "scapular-pulldown"
    ],
    "progressions": [
      "assisted-pull-up"
    ],
    "aliases": [
      "Band Lat Pulldown",
      "band lat pulldown"
    ],
    "yt": "Band Lat Pulldown form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "scapular-pull-up",
    "name": "Scapular Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "pull-up-bar"
    ],
    "muscles": [
      "lats",
      "scapular stabilisers"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "scapular-control"
    ],
    "alternatives": [
      "assisted-pull-up",
      "band-lat-pulldown"
    ],
    "regressions": [
      "scapular-pulldown"
    ],
    "progressions": [
      "assisted-pull-up"
    ],
    "aliases": [
      "Scapular Pull-up",
      "scapular pull up"
    ],
    "yt": "Scapular Pull-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 3,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "assisted-pull-up",
    "name": "Assisted Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "pull-up-bar",
      "bands"
    ],
    "muscles": [
      "lats",
      "biceps",
      "upper back"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "aggressive-vertical-pull"
    ],
    "alternatives": [
      "band-lat-pulldown",
      "ring-row"
    ],
    "regressions": [
      "band-lat-pulldown"
    ],
    "progressions": [
      "pull-up-negative"
    ],
    "aliases": [
      "Assisted Pull-up",
      "assisted pull up"
    ],
    "yt": "Assisted Pull-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 3,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pull-up",
    "name": "Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "pull-up-bar"
    ],
    "muscles": [
      "lats",
      "biceps",
      "upper back"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "aggressive-vertical-pull"
    ],
    "alternatives": [
      "assisted-pull-up",
      "band-lat-pulldown",
      "ring-row"
    ],
    "regressions": [
      "assisted-pull-up"
    ],
    "progressions": [
      "weighted-pull-up"
    ],
    "aliases": [
      "Pull-up",
      "pull up"
    ],
    "yt": "Pull-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "movement-calisthenics",
      "hybrid-athlete"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 3,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "weighted-pull-up",
    "name": "Weighted Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "pull-up-bar",
      "weight"
    ],
    "muscles": [
      "lats",
      "biceps",
      "upper back"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "aggressive-vertical-pull",
      "advanced",
      "max-effort"
    ],
    "alternatives": [
      "pull-up",
      "chest-supported-row"
    ],
    "regressions": [
      "pull-up"
    ],
    "progressions": [
      "heavy-weighted-pull-up"
    ],
    "aliases": [
      "Weighted Pull-up",
      "weighted pull up"
    ],
    "yt": "Weighted Pull-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "weights",
      "strength"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 5,
    "fatigueCost": 5,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "muscle-up-transition-drill",
    "name": "Muscle-up Transition Drill",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "rings",
      "low-bar"
    ],
    "muscles": [
      "lats",
      "chest",
      "triceps",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "elbow-pain",
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "muscle-up-transition",
      "skill",
      "complex"
    ],
    "alternatives": [
      "assisted-muscle-up",
      "ring-row"
    ],
    "regressions": [
      "ring-row",
      "band-lat-pulldown"
    ],
    "progressions": [
      "assisted-muscle-up"
    ],
    "aliases": [
      "Muscle-up Transition Drill",
      "muscle up transition drill"
    ],
    "yt": "Muscle-up Transition Drill form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "ring-support-hold",
    "name": "Ring Support Hold",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "triceps",
      "shoulders",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "elbow-pain",
      "wrist-pain"
    ],
    "avoidIf": [],
    "tags": [
      "ring-support",
      "skill",
      "unstable"
    ],
    "alternatives": [
      "parallel-bar-support",
      "ring-dip"
    ],
    "regressions": [
      "bench-support-hold"
    ],
    "progressions": [
      "ring-dip-negative"
    ],
    "aliases": [
      "Ring Support Hold",
      "ring support hold"
    ],
    "yt": "Ring Support Hold form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "ring-dip",
    "name": "Ring Dip",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "chest",
      "triceps",
      "shoulders"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "dip-deep",
      "unstable",
      "advanced"
    ],
    "alternatives": [
      "parallel-bar-dip",
      "ring-push-up"
    ],
    "regressions": [
      "ring-dip-negative"
    ],
    "progressions": [
      "weighted-ring-dip"
    ],
    "aliases": [
      "Ring Dip",
      "ring dip"
    ],
    "yt": "Ring Dip form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 5,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "sit-to-stand",
    "name": "Sit-to-Stand",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "chair",
      "bodyweight"
    ],
    "muscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain"
    ],
    "avoidIf": [],
    "tags": [
      "chair-friendly",
      "simple",
      "supported"
    ],
    "alternatives": [
      "chair-squat",
      "box-squat"
    ],
    "regressions": [
      "supported-sit-to-stand"
    ],
    "progressions": [
      "chair-squat"
    ],
    "aliases": [
      "Sit-to-Stand",
      "sit to stand"
    ],
    "yt": "Sit-to-Stand form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "longevity"
    ],
    "styleBias": [
      "rebuild-recovery",
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "box-squat",
    "name": "Box Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bodyweight",
      "dumbbells",
      "box"
    ],
    "muscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain"
    ],
    "avoidIf": [],
    "tags": [
      "box-range",
      "reduced-range"
    ],
    "alternatives": [
      "goblet-squat",
      "chair-squat"
    ],
    "regressions": [
      "chair-squat"
    ],
    "progressions": [
      "goblet-squat"
    ],
    "aliases": [
      "Box Squat",
      "box squat"
    ],
    "yt": "Box Squat form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "goblet-squat",
    "name": "Goblet Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "dumbbells",
      "kettlebell"
    ],
    "muscles": [
      "quads",
      "glutes",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "squat"
    ],
    "alternatives": [
      "box-squat",
      "split-squat",
      "step-up"
    ],
    "regressions": [
      "box-squat"
    ],
    "progressions": [
      "tempo-goblet-squat"
    ],
    "aliases": [
      "Goblet Squat",
      "goblet squat"
    ],
    "yt": "Goblet Squat form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "cyclist-squat",
    "name": "Cyclist Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "dumbbells",
      "wedge"
    ],
    "muscles": [
      "quads"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain",
      "patellar-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "deep-knee-flexion-fast"
    ],
    "alternatives": [
      "heel-elevated-goblet-squat",
      "box-squat"
    ],
    "regressions": [
      "box-squat"
    ],
    "progressions": [
      "tempo-cyclist-squat"
    ],
    "aliases": [
      "Cyclist Squat",
      "cyclist squat"
    ],
    "yt": "Cyclist Squat form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "spanish-squat-hold",
    "name": "Spanish Squat Hold",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "quads",
      "patellar tendon"
    ],
    "difficulty": [
      "rebuild",
      "intermediate"
    ],
    "cautionIf": [
      "patellar-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "spanish-squat",
      "isometric"
    ],
    "alternatives": [
      "wall-sit",
      "box-squat"
    ],
    "regressions": [
      "wall-sit"
    ],
    "progressions": [
      "spanish-squat-reps"
    ],
    "aliases": [
      "Spanish Squat Hold",
      "spanish squat hold"
    ],
    "yt": "Spanish Squat Hold form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "sissy-squat-regression",
    "name": "Sissy Squat Regression",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bodyweight",
      "support"
    ],
    "muscles": [
      "quads"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "knee-pain",
      "patellar-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "sissy-squat",
      "deep-knee-flexion-fast",
      "advanced"
    ],
    "alternatives": [
      "spanish-squat-reps",
      "heel-elevated-goblet-squat"
    ],
    "regressions": [
      "spanish-squat-hold"
    ],
    "progressions": [
      "sissy-squat"
    ],
    "aliases": [
      "Sissy Squat Regression",
      "sissy squat regression"
    ],
    "yt": "Sissy Squat Regression form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "weights"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "supported-split-squat",
    "name": "Supported Split Squat",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bodyweight",
      "support"
    ],
    "muscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain",
      "ankle-instability"
    ],
    "avoidIf": [],
    "tags": [
      "supported",
      "unilateral",
      "left-first"
    ],
    "alternatives": [
      "split-squat",
      "step-up-low"
    ],
    "regressions": [
      "chair-squat"
    ],
    "progressions": [
      "split-squat"
    ],
    "aliases": [
      "Supported Split Squat",
      "supported split squat"
    ],
    "yt": "Supported Split Squat form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "bulgarian-split-squat",
    "name": "Bulgarian Split Squat",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "dumbbells",
      "bench"
    ],
    "muscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain",
      "ankle-instability"
    ],
    "avoidIf": [],
    "tags": [
      "unilateral",
      "left-first"
    ],
    "alternatives": [
      "split-squat",
      "step-up"
    ],
    "regressions": [
      "split-squat"
    ],
    "progressions": [
      "front-foot-elevated-split-squat"
    ],
    "aliases": [
      "Bulgarian Split Squat",
      "bulgarian split squat"
    ],
    "yt": "Bulgarian Split Squat form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "shrimp-squat-regression",
    "name": "Shrimp Squat Regression",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bodyweight",
      "support"
    ],
    "muscles": [
      "quads",
      "glutes",
      "balance"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain",
      "ankle-instability"
    ],
    "avoidIf": [],
    "tags": [
      "unilateral",
      "balance-demand",
      "advanced"
    ],
    "alternatives": [
      "split-squat",
      "step-up"
    ],
    "regressions": [
      "supported-split-squat"
    ],
    "progressions": [
      "shrimp-squat"
    ],
    "aliases": [
      "Shrimp Squat Regression",
      "shrimp squat regression"
    ],
    "yt": "Shrimp Squat Regression form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "step-up-low",
    "name": "Low Step-up",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "step",
      "dumbbells"
    ],
    "muscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "knee-pain",
      "hip-pain",
      "ankle-instability"
    ],
    "avoidIf": [],
    "tags": [
      "controlled-step-up",
      "step-up-low",
      "unilateral"
    ],
    "alternatives": [
      "step-up",
      "supported-split-squat"
    ],
    "regressions": [
      "sit-to-stand"
    ],
    "progressions": [
      "step-up"
    ],
    "aliases": [
      "Low Step-up",
      "step up low"
    ],
    "yt": "Low Step-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "peterson-step-up",
    "name": "Peterson Step-up",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "step",
      "support"
    ],
    "muscles": [
      "quads",
      "knee control"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain",
      "patellar-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "controlled-step-up",
      "tendon-loading"
    ],
    "alternatives": [
      "step-up-low",
      "spanish-squat-hold"
    ],
    "regressions": [
      "step-up-low"
    ],
    "progressions": [
      "step-up"
    ],
    "aliases": [
      "Peterson Step-up",
      "peterson step up"
    ],
    "yt": "Peterson Step-up form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dowel-hip-hinge",
    "name": "Dowel Hip Hinge",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "bodyweight",
      "dowel"
    ],
    "muscles": [
      "hamstrings",
      "glutes"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "hip-pain"
    ],
    "avoidIf": [],
    "tags": [
      "reduced-range",
      "simple",
      "neutral-spine"
    ],
    "alternatives": [
      "dumbbell-rdl",
      "glute-bridge"
    ],
    "regressions": [
      "glute-bridge"
    ],
    "progressions": [
      "dumbbell-rdl"
    ],
    "aliases": [
      "Dowel Hip Hinge",
      "dowel hip hinge"
    ],
    "yt": "Dowel Hip Hinge form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "mobility"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dumbbell-rdl",
    "name": "Dumbbell Romanian Deadlift",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "dumbbells"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "back"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "hip-pain",
      "hamstring-pain"
    ],
    "avoidIf": [],
    "tags": [
      "hinge",
      "tempo-control"
    ],
    "alternatives": [
      "glute-bridge",
      "reduced-range-rdl"
    ],
    "regressions": [
      "dowel-hip-hinge",
      "glute-bridge"
    ],
    "progressions": [
      "single-leg-rdl-supported"
    ],
    "aliases": [
      "Dumbbell Romanian Deadlift",
      "dumbbell rdl"
    ],
    "yt": "Dumbbell Romanian Deadlift form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "single-leg-rdl-supported",
    "name": "Supported Single-leg RDL",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "dumbbells",
      "support"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "balance"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "ankle-instability"
    ],
    "avoidIf": [],
    "tags": [
      "unilateral",
      "supported",
      "single-leg-supported"
    ],
    "alternatives": [
      "dumbbell-rdl",
      "glute-bridge"
    ],
    "regressions": [
      "dumbbell-rdl"
    ],
    "progressions": [
      "single-leg-rdl"
    ],
    "aliases": [
      "Supported Single-leg RDL",
      "single leg rdl supported"
    ],
    "yt": "Supported Single-leg RDL form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "glute-bridge",
    "name": "Glute Bridge",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "glutes",
      "hamstrings"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "hip-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "glute-dominant",
      "simple"
    ],
    "alternatives": [
      "single-leg-glute-bridge",
      "hip-thrust"
    ],
    "regressions": [
      "posterior-pelvic-tilt-drill"
    ],
    "progressions": [
      "single-leg-glute-bridge"
    ],
    "aliases": [
      "Glute Bridge",
      "glute bridge"
    ],
    "yt": "Glute Bridge form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "pilates"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "hip-thrust",
    "name": "Hip Thrust",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bench",
      "dumbbells"
    ],
    "muscles": [
      "glutes",
      "hamstrings"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "hip-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "glute-dominant"
    ],
    "alternatives": [
      "glute-bridge",
      "dumbbell-rdl"
    ],
    "regressions": [
      "glute-bridge"
    ],
    "progressions": [
      "weighted-hip-thrust"
    ],
    "aliases": [
      "Hip Thrust",
      "hip thrust"
    ],
    "yt": "Hip Thrust form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "slider-hamstring-curl",
    "name": "Slider Hamstring Curl",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "sliders",
      "towel"
    ],
    "muscles": [
      "hamstrings",
      "glutes"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "hamstring-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "bodyweight",
      "posterior-chain"
    ],
    "alternatives": [
      "hamstring-walkout",
      "dumbbell-rdl"
    ],
    "regressions": [
      "hamstring-walkout"
    ],
    "progressions": [
      "nordic-curl-regression"
    ],
    "aliases": [
      "Slider Hamstring Curl",
      "slider hamstring curl"
    ],
    "yt": "Slider Hamstring Curl form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 3,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "nordic-curl-regression",
    "name": "Nordic Curl Regression",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "bodyweight",
      "anchor"
    ],
    "muscles": [
      "hamstrings"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "hamstring-pain",
      "knee-pain"
    ],
    "avoidIf": [],
    "tags": [
      "advanced",
      "posterior-chain"
    ],
    "alternatives": [
      "slider-hamstring-curl",
      "dumbbell-rdl"
    ],
    "regressions": [
      "slider-hamstring-curl"
    ],
    "progressions": [
      "nordic-curl"
    ],
    "aliases": [
      "Nordic Curl Regression",
      "nordic curl regression"
    ],
    "yt": "Nordic Curl Regression form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "breathing-reset",
    "name": "Breathing Reset",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "nervous system",
      "core"
    ],
    "difficulty": [
      "all"
    ],
    "cautionIf": [],
    "avoidIf": [],
    "tags": [
      "recovery",
      "simple",
      "low-cognitive-load"
    ],
    "alternatives": [
      "mobility-reset"
    ],
    "regressions": [
      "rest"
    ],
    "progressions": [
      "dead-bug"
    ],
    "aliases": [
      "Breathing Reset",
      "breathing reset"
    ],
    "yt": "Breathing Reset form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "pilates",
      "recovery"
    ],
    "styleBias": [
      "low-overwhelm",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "posterior-pelvic-tilt-drill",
    "name": "Posterior Pelvic Tilt Drill",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "deep core",
      "glutes"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "core-bracing",
      "simple",
      "pilates"
    ],
    "alternatives": [
      "glute-bridge",
      "dead-bug"
    ],
    "regressions": [
      "breathing-reset"
    ],
    "progressions": [
      "glute-bridge"
    ],
    "aliases": [
      "Posterior Pelvic Tilt Drill",
      "posterior pelvic tilt drill"
    ],
    "yt": "Posterior Pelvic Tilt Drill form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "pilates-mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dead-bug",
    "name": "Dead Bug",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "deep core"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "disc-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "core-bracing",
      "anti-extension"
    ],
    "alternatives": [
      "plank",
      "bird-dog"
    ],
    "regressions": [
      "breathing-reset"
    ],
    "progressions": [
      "hollow-tuck-hold"
    ],
    "aliases": [
      "Dead Bug",
      "dead bug"
    ],
    "yt": "Dead Bug form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "pilates-mobility",
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pilates-hundred-prep",
    "name": "Pilates Hundred Prep",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "deep core",
      "hip flexors"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "neck-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "pilates",
      "breathing"
    ],
    "alternatives": [
      "dead-bug",
      "heel-tap"
    ],
    "regressions": [
      "breathing-reset"
    ],
    "progressions": [
      "pilates-hundred"
    ],
    "aliases": [
      "Pilates Hundred Prep",
      "pilates hundred prep"
    ],
    "yt": "Pilates Hundred Prep form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "pilates"
    ],
    "styleBias": [
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pilates-roll-down",
    "name": "Pilates Roll-down",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "spinal control",
      "deep core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "disc-sensitivity",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "pilates",
      "spinal-articulation"
    ],
    "alternatives": [
      "cat-cow",
      "pelvic-curl"
    ],
    "regressions": [
      "breathing-reset"
    ],
    "progressions": [
      "roll-up-prep"
    ],
    "aliases": [
      "Pilates Roll-down",
      "pilates roll down"
    ],
    "yt": "Pilates Roll-down form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "pilates",
      "mobility"
    ],
    "styleBias": [
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 1,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "plank",
    "name": "Plank",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "core",
      "shoulders"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "core-bracing",
      "anti-extension"
    ],
    "alternatives": [
      "dead-bug",
      "bear-hold"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [
      "body-saw"
    ],
    "aliases": [
      "Plank",
      "plank"
    ],
    "yt": "Plank form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "pilates"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "hollow-tuck-hold",
    "name": "Hollow Tuck Hold",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "abdominals",
      "deep core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "hollow-body",
      "anti-extension",
      "skill-transfer"
    ],
    "alternatives": [
      "dead-bug",
      "hollow-hold"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [
      "hollow-hold"
    ],
    "aliases": [
      "Hollow Tuck Hold",
      "hollow tuck hold"
    ],
    "yt": "Hollow Tuck Hold form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "hollow-hold",
    "name": "Hollow Hold",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "abdominals",
      "deep core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "hollow-body",
      "advanced-core",
      "anti-extension",
      "skill-transfer"
    ],
    "alternatives": [
      "dead-bug",
      "heel-tap"
    ],
    "regressions": [
      "hollow-tuck-hold"
    ],
    "progressions": [
      "hollow-rock"
    ],
    "aliases": [
      "Hollow Hold",
      "hollow hold"
    ],
    "yt": "Hollow Hold form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "arch-body-hold",
    "name": "Arch Body Hold",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "posterior chain",
      "back",
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "arch-body",
      "skill-transfer"
    ],
    "alternatives": [
      "bird-dog",
      "superman-hold"
    ],
    "regressions": [
      "bird-dog"
    ],
    "progressions": [
      "arch-rock"
    ],
    "aliases": [
      "Arch Body Hold",
      "arch body hold"
    ],
    "yt": "Arch Body Hold form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "side-plank",
    "name": "Side Plank",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "obliques",
      "glutes",
      "shoulders"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "lateral-core"
    ],
    "alternatives": [
      "side-plank-knees",
      "pallof-press"
    ],
    "regressions": [
      "side-plank-knees"
    ],
    "progressions": [
      "copenhagen-plank-short"
    ],
    "aliases": [
      "Side Plank",
      "side plank"
    ],
    "yt": "Side Plank form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "pilates"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pallof-press",
    "name": "Pallof Press",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "obliques",
      "deep core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "anti-rotation",
      "banded-light"
    ],
    "alternatives": [
      "side-plank",
      "dead-bug"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [
      "pallof-hold"
    ],
    "aliases": [
      "Pallof Press",
      "pallof press"
    ],
    "yt": "Pallof Press form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "pilates",
      "weights"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "l-sit-tuck",
    "name": "Tuck L-Sit",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "parallettes",
      "rings",
      "chairs"
    ],
    "muscles": [
      "hip flexors",
      "deep core",
      "triceps"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "wrist-pain",
      "hip-pain"
    ],
    "avoidIf": [],
    "tags": [
      "l-sit",
      "skill",
      "support-hold"
    ],
    "alternatives": [
      "hollow-tuck-hold",
      "ring-support-hold"
    ],
    "regressions": [
      "hollow-tuck-hold"
    ],
    "progressions": [
      "advanced-tuck-l-sit"
    ],
    "aliases": [
      "Tuck L-Sit",
      "l sit tuck"
    ],
    "yt": "Tuck L-Sit form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "pull-up-bar"
    ],
    "muscles": [
      "abs",
      "hip flexors",
      "grip"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-pain",
      "elbow-pain",
      "hip-pain"
    ],
    "avoidIf": [],
    "tags": [
      "hanging-core"
    ],
    "alternatives": [
      "captain-chair-knee-raise",
      "dead-bug"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [
      "hanging-leg-raise"
    ],
    "aliases": [
      "Hanging Knee Raise",
      "hanging knee raise"
    ],
    "yt": "Hanging Knee Raise form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "dragon-flag-regression",
    "name": "Dragon Flag Regression",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bench"
    ],
    "muscles": [
      "abs",
      "lats",
      "hip flexors"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "advanced-core",
      "high-tension"
    ],
    "alternatives": [
      "hollow-hold",
      "hanging-leg-raise"
    ],
    "regressions": [
      "hollow-hold"
    ],
    "progressions": [
      "dragon-flag"
    ],
    "aliases": [
      "Dragon Flag Regression",
      "dragon flag regression"
    ],
    "yt": "Dragon Flag Regression form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 5,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "tuck-front-lever-hold",
    "name": "Tuck Front Lever Hold",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "rings",
      "pull-up-bar"
    ],
    "muscles": [
      "lats",
      "core",
      "scapular stabilisers"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-pain",
      "elbow-pain",
      "biceps-tendon-pain"
    ],
    "avoidIf": [],
    "tags": [
      "front-lever",
      "skill",
      "high-tension"
    ],
    "alternatives": [
      "scapular-pull-up",
      "ring-row"
    ],
    "regressions": [
      "scapular-pull-up"
    ],
    "progressions": [
      "advanced-tuck-front-lever"
    ],
    "aliases": [
      "Tuck Front Lever Hold",
      "tuck front lever hold"
    ],
    "yt": "Tuck Front Lever Hold form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 5,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "planche-lean",
    "name": "Planche Lean",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "front delts",
      "serratus",
      "core",
      "wrists"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "planche-load",
      "loaded-wrist-extension",
      "skill"
    ],
    "alternatives": [
      "scapular-push-up",
      "pseudo-planche-push-up"
    ],
    "regressions": [
      "scapular-push-up"
    ],
    "progressions": [
      "pseudo-planche-push-up",
      "tuck-planche"
    ],
    "aliases": [
      "Planche Lean",
      "planche lean"
    ],
    "yt": "Planche Lean form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "crow-pose",
    "name": "Crow Pose",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "wrists",
      "shoulders",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "balance-demand",
      "loaded-wrist-extension",
      "skill"
    ],
    "alternatives": [
      "frog-stand",
      "planche-lean"
    ],
    "regressions": [
      "frog-stand"
    ],
    "progressions": [
      "tuck-planche"
    ],
    "aliases": [
      "Crow Pose",
      "crow pose"
    ],
    "yt": "Crow Pose form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 3,
    "skillDemand": 4,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "farmer-carry",
    "name": "Farmer Carry",
    "family": "carry",
    "movement": "carry",
    "equipment": [
      "dumbbells",
      "kettlebell"
    ],
    "muscles": [
      "grip",
      "traps",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "carry"
    ],
    "alternatives": [
      "suitcase-carry",
      "marching-carry"
    ],
    "regressions": [
      "suitcase-carry"
    ],
    "progressions": [
      "heavy-farmer-carry"
    ],
    "aliases": [
      "Farmer Carry",
      "farmer carry"
    ],
    "yt": "Farmer Carry form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hybrid",
      "conditioning"
    ],
    "styleBias": [
      "hybrid-athlete",
      "fat-loss-conditioning"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "suitcase-carry",
    "name": "Suitcase Carry",
    "family": "carry",
    "movement": "carry",
    "equipment": [
      "dumbbells",
      "kettlebell"
    ],
    "muscles": [
      "core",
      "grip",
      "obliques"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "low-back-sensitivity",
      "shoulder-pain"
    ],
    "avoidIf": [],
    "tags": [
      "carry",
      "anti-rotation"
    ],
    "alternatives": [
      "pallof-press",
      "side-plank"
    ],
    "regressions": [
      "side-plank"
    ],
    "progressions": [
      "heavy-suitcase-carry"
    ],
    "aliases": [
      "Suitcase Carry",
      "suitcase carry"
    ],
    "yt": "Suitcase Carry form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "rehab",
      "hybrid"
    ],
    "styleBias": [
      "joint-longevity"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "band-curl",
    "name": "Band Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "biceps"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "banded-light"
    ],
    "alternatives": [
      "hammer-curl",
      "alternating-dumbbell-curl"
    ],
    "regressions": [
      "isometric-curl-hold"
    ],
    "progressions": [
      "hammer-curl"
    ],
    "aliases": [
      "Band Curl",
      "band curl"
    ],
    "yt": "Band Curl form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "hammer-curl",
    "name": "Hammer Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "dumbbells"
    ],
    "muscles": [
      "biceps",
      "brachialis",
      "forearms"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "neutral-grip"
    ],
    "alternatives": [
      "band-curl",
      "alternating-dumbbell-curl"
    ],
    "regressions": [
      "band-curl"
    ],
    "progressions": [
      "cross-body-hammer-curl"
    ],
    "aliases": [
      "Hammer Curl",
      "hammer curl"
    ],
    "yt": "Hammer Curl form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "pelican-curl-regression",
    "name": "Pelican Curl Regression",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "biceps",
      "forearms",
      "shoulders"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "biceps-tendon-pain",
      "shoulder-pain",
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "pelican-curl",
      "heavy-curl",
      "advanced"
    ],
    "alternatives": [
      "band-curl",
      "ring-row"
    ],
    "regressions": [
      "band-curl"
    ],
    "progressions": [
      "pelican-curl"
    ],
    "aliases": [
      "Pelican Curl Regression",
      "pelican curl regression"
    ],
    "yt": "Pelican Curl Regression form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "movement-calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 5,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "band-pushdown",
    "name": "Band Pushdown",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "bands"
    ],
    "muscles": [
      "triceps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-pain"
    ],
    "avoidIf": [],
    "tags": [
      "banded-light"
    ],
    "alternatives": [
      "close-grip-push-up",
      "overhead-band-extension"
    ],
    "regressions": [
      "light-band-pushdown"
    ],
    "progressions": [
      "close-grip-push-up"
    ],
    "aliases": [
      "Band Pushdown",
      "band pushdown"
    ],
    "yt": "Band Pushdown form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "strength-hypertrophy"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "walk",
    "name": "Walk",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "cardio",
      "recovery"
    ],
    "difficulty": [
      "beginner",
      "rebuild",
      "all"
    ],
    "cautionIf": [],
    "avoidIf": [],
    "tags": [
      "low-impact",
      "simple"
    ],
    "alternatives": [
      "zone-2-bike",
      "marching-in-place"
    ],
    "regressions": [
      "short-walk"
    ],
    "progressions": [
      "longer-walk"
    ],
    "aliases": [
      "Walk",
      "walk"
    ],
    "yt": "Walk form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "conditioning",
      "recovery"
    ],
    "styleBias": [
      "joint-longevity",
      "low-overwhelm"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "low-impact-circuit",
    "name": "Low-impact Conditioning Circuit",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bodyweight",
      "dumbbells",
      "bands"
    ],
    "muscles": [
      "cardio",
      "full-body"
    ],
    "difficulty": [
      "beginner",
      "rebuild"
    ],
    "cautionIf": [
      "knee-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "low-impact",
      "simple"
    ],
    "alternatives": [
      "walk",
      "zone-2-bike"
    ],
    "regressions": [
      "walk"
    ],
    "progressions": [
      "density-circuit"
    ],
    "aliases": [
      "Low-impact Conditioning Circuit",
      "low impact circuit"
    ],
    "yt": "Low-impact Conditioning Circuit form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "conditioning",
      "circuit",
      "rehab"
    ],
    "styleBias": [
      "fat-loss-conditioning",
      "low-overwhelm"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "emom-triplet",
    "name": "EMOM Triplet",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bodyweight",
      "dumbbells",
      "bands"
    ],
    "muscles": [
      "full-body",
      "cardio"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain",
      "shoulder-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "circuit",
      "emom",
      "conditioning"
    ],
    "alternatives": [
      "low-impact-circuit",
      "density-circuit"
    ],
    "regressions": [
      "low-impact-circuit"
    ],
    "progressions": [
      "advanced-emom"
    ],
    "aliases": [
      "EMOM Triplet",
      "emom triplet"
    ],
    "yt": "EMOM Triplet form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "conditioning",
      "circuit",
      "hybrid"
    ],
    "styleBias": [
      "fat-loss-conditioning",
      "hybrid-athlete"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "amrap-triplet",
    "name": "AMRAP Triplet",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bodyweight",
      "dumbbells",
      "bands"
    ],
    "muscles": [
      "full-body",
      "cardio"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain",
      "shoulder-pain",
      "low-back-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "circuit",
      "amrap",
      "conditioning"
    ],
    "alternatives": [
      "low-impact-circuit",
      "density-circuit"
    ],
    "regressions": [
      "low-impact-circuit"
    ],
    "progressions": [
      "advanced-amrap"
    ],
    "aliases": [
      "AMRAP Triplet",
      "amrap triplet"
    ],
    "yt": "AMRAP Triplet form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "conditioning",
      "circuit",
      "hybrid"
    ],
    "styleBias": [
      "fat-loss-conditioning",
      "hybrid-athlete"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "skipping",
    "name": "Skipping / Jump Rope",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "rope"
    ],
    "muscles": [
      "cardio",
      "calves"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain",
      "ankle-instability",
      "achilles-calf-sensitivity"
    ],
    "avoidIf": [],
    "tags": [
      "jumping",
      "high-impact"
    ],
    "alternatives": [
      "walk",
      "zone-2-bike",
      "low-impact-circuit"
    ],
    "regressions": [
      "marching-in-place"
    ],
    "progressions": [
      "interval-skipping"
    ],
    "aliases": [
      "Skipping / Jump Rope",
      "skipping"
    ],
    "yt": "Skipping / Jump Rope form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "conditioning"
    ],
    "styleBias": [
      "fat-loss-conditioning"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 2,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "tai-chi-walk",
    "name": "Tai Chi Walk",
    "family": "movement-restoration",
    "movement": "movement-restoration",
    "equipment": [
      "bodyweight"
    ],
    "muscles": [
      "balance",
      "mobility",
      "recovery"
    ],
    "difficulty": [
      "beginner",
      "rebuild",
      "all"
    ],
    "cautionIf": [
      "ankle-instability",
      "knee-pain"
    ],
    "avoidIf": [],
    "tags": [
      "low-impact",
      "balance-regression",
      "recovery"
    ],
    "alternatives": [
      "walk",
      "mobility-reset"
    ],
    "regressions": [
      "marching-in-place"
    ],
    "progressions": [
      "walk"
    ],
    "aliases": [
      "Tai Chi Walk",
      "tai chi walk"
    ],
    "yt": "Tai Chi Walk form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "rehab",
      "longevity"
    ],
    "styleBias": [
      "joint-longevity",
      "low-overwhelm"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  },
  {
    "key": "chair-yoga-flow",
    "name": "Chair Yoga Flow",
    "family": "movement-restoration",
    "movement": "movement-restoration",
    "equipment": [
      "chair",
      "bodyweight"
    ],
    "muscles": [
      "mobility",
      "breathing"
    ],
    "difficulty": [
      "rebuild",
      "beginner"
    ],
    "cautionIf": [
      "older-adult"
    ],
    "avoidIf": [],
    "tags": [
      "chair-friendly",
      "low-impact",
      "simple"
    ],
    "alternatives": [
      "mobility-reset",
      "seated-march"
    ],
    "regressions": [
      "breathing-reset"
    ],
    "progressions": [
      "tai-chi-walk"
    ],
    "aliases": [
      "Chair Yoga Flow",
      "chair yoga flow"
    ],
    "yt": "Chair Yoga Flow form",
    "phaseUse": [
      "cut",
      "recomp",
      "maintain",
      "build"
    ],
    "domains": [
      "pilates",
      "mobility",
      "rehab"
    ],
    "styleBias": [
      "joint-longevity",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "coordinationDemand": 1,
    "balanceDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets, controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the movement controlled and pain-free.",
    "source": "fff-exercise-db-v4"
  }
];
  const PROGRESSION_TREES = {
  "push-up": [
    "wall-push-up",
    "knee-push-up",
    "incline-push-up",
    "push-up",
    "tempo-push-up",
    "ring-push-up",
    "pseudo-planche-push-up"
  ],
  "pull-up": [
    "band-lat-pulldown",
    "scapular-pull-up",
    "assisted-pull-up",
    "pull-up",
    "weighted-pull-up"
  ],
  "handstand": [
    "wall-slide",
    "pike-push-up",
    "wall-walk",
    "chest-to-wall-handstand",
    "freestanding-handstand-drill"
  ],
  "l-sit": [
    "dead-bug",
    "hollow-tuck-hold",
    "l-sit-tuck"
  ],
  "front-lever": [
    "scapular-pull-up",
    "ring-row",
    "tuck-front-lever-hold"
  ],
  "planche": [
    "scapular-push-up",
    "crow-pose",
    "planche-lean",
    "pseudo-planche-push-up"
  ],
  "single-leg-stability": [
    "sit-to-stand",
    "step-up-low",
    "supported-split-squat",
    "bulgarian-split-squat",
    "shrimp-squat-regression"
  ],
  "pilates-core": [
    "breathing-reset",
    "posterior-pelvic-tilt-drill",
    "dead-bug",
    "pilates-hundred-prep",
    "pilates-roll-down"
  ]
};

  function normalise(str) {
    return String(str || '').toLowerCase().replace(/[–—−]/g, '-').replace(/&/g, 'and').replace(/[^a-z0-9+\- ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function slug(str) { return normalise(str).replace(/\s+/g, '-'); }
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
  function safeArray(v) { return Array.isArray(v) ? v : []; }
  function unique(arr) {
    const seen = {}, out = [];
    (arr || []).forEach(v => { const k = normalise(v); if(k && !seen[k]){seen[k]=true; out.push(v);} });
    return out;
  }
  function hasAny(arr, values) {
    arr = arr || []; values = values || [];
    return values.some(v => arr.indexOf(v) > -1);
  }

  const BY_KEY = {};
  const BY_NAME = {};
  EXERCISES.forEach(ex => {
    BY_KEY[ex.key] = ex;
    BY_NAME[normalise(ex.name)] = ex;
    (ex.aliases || []).forEach(a => BY_NAME[normalise(a)] = ex);
  });

  function familyByKey(key) { return FAMILY_DB.find(f => f.key === key) || null; }

  function findExercise(nameOrKey) {
    if(!nameOrKey) return null;
    const directKey = slug(nameOrKey);
    if(BY_KEY[directKey]) return clone(BY_KEY[directKey]);
    const exact = BY_NAME[normalise(nameOrKey)];
    if(exact) return clone(exact);
    const n = normalise(nameOrKey);
    let best = null, bestScore = 0;
    EXERCISES.forEach(ex => {
      let score = 0;
      if(normalise(ex.name).indexOf(n) > -1 || n.indexOf(normalise(ex.name)) > -1) score += 4;
      (ex.aliases || []).forEach(a => {
        if(normalise(a).indexOf(n) > -1 || n.indexOf(normalise(a)) > -1) score += 2;
      });
      if(score > bestScore) { best = ex; bestScore = score; }
    });
    return best ? clone(best) : null;
  }

  function labelForKey(key) {
    const found = BY_KEY[key] || findExercise(key);
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
    const found = findExercise(name);
    if(!found) return fallbackProfile(name);
    const fam = familyByKey(found.family);
    return {
      name: found.name,
      key: found.key,
      family: found.family,
      movement: found.movement || found.family,
      patterns: fam ? fam.patterns.slice() : [found.family],
      primaryJoints: fam ? fam.primaryJoints.slice() : [],
      tissues: unique((fam ? fam.tissues : []).concat(found.muscles || [])),
      riskZones: fam ? fam.riskZones.slice() : [],
      commonFailurePoints: fam ? fam.commonFailurePoints.slice() : [],
      regressions: (found.regressions || []).map(labelForKey),
      progressions: (found.progressions || []).map(labelForKey),
      alternatives: (found.alternatives || []).map(labelForKey),
      equipment: (found.equipment || []).slice(),
      muscles: (found.muscles || []).slice(),
      cautionIf: (found.cautionIf || []).slice(),
      tags: (found.tags || []).slice(),
      aliases: (found.aliases || []).slice(),
      phaseUse: (found.phaseUse || []).slice(),
      domains: (found.domains || []).slice(),
      styleBias: (found.styleBias || []).slice(),
      jointStress: found.jointStress,
      fatigueCost: found.fatigueCost,
      skillDemand: found.skillDemand,
      coordinationDemand: found.coordinationDemand,
      balanceDemand: found.balanceDemand,
      cognitiveLoad: found.cognitiveLoad,
      recoveryFriendliness: found.recoveryFriendliness,
      movementQuality: found.movementQuality,
      yt: found.yt,
      defaultRx: found.defaultRx,
      tempo: found.tempo,
      rest: found.rest,
      coachingCue: found.coachingCue,
      confidence: 'high'
    };
  }

  function getFamilySummary(name) {
    const p = getExerciseProfile(name);
    return {
      family: p.family,
      patterns: p.patterns,
      riskZones: p.riskZones,
      likelySwapTargets: p.regressions.concat(p.alternatives),
      likelyProgressions: p.progressions
    };
  }

  function areRelatedExercises(a,b) {
    const pa = getExerciseProfile(a), pb = getExerciseProfile(b);
    if(!pa || !pb) return false;
    if(pa.family === pb.family) return true;
    return pa.patterns.some(p => pb.patterns.indexOf(p) > -1);
  }

  function analyseGroup(exerciseNames) {
    const arr = Array.isArray(exerciseNames) ? exerciseNames : [];
    const profiles = arr.map(getExerciseProfile);
    return {
      count: profiles.length,
      families: unique(profiles.map(p => p.family)),
      riskZones: unique([].concat.apply([], profiles.map(p => p.riskZones || []))),
      tissues: unique([].concat.apply([], profiles.map(p => p.tissues || [])))
    };
  }

  function contextStyle(context) {
    const style = slug((context || {}).trainingStyle || (context || {}).stylePreference || (context || {}).style || '');
    return STYLE_PROFILES[style] ? style : '';
  }

  function scoreExerciseForContext(exercise, context) {
    exercise = typeof exercise === 'string' ? findExercise(exercise) : exercise;
    if(!exercise) return -999;
    context = context || {};
    const injuries = safeArray(context.injuries || []).map(slug);
    const equipment = safeArray(context.equipment || []).map(slug);
    const phase = normalise(context.phase || context.goal || '');
    const painLevel = Number(context.painLevel || context.maxPain || 0);
    const level = normalise(context.level || context.experience || '');
    const styleKey = contextStyle(context);
    const style = styleKey ? STYLE_PROFILES[styleKey] : null;
    const recovery = normalise(context.recovery || context.readiness || '');
    let score = 0;

    if(!equipment.length) score += 1;
    else if((exercise.equipment || []).indexOf('bodyweight') > -1 || (exercise.equipment || []).some(e => equipment.indexOf(slug(e)) > -1)) score += 5;
    else score -= 8;

    if(style) {
      if(style.preferFamilies.indexOf(exercise.family) > -1) score += 4;
      if(hasAny(exercise.domains || [], style.preferDomains || [])) score += 4;
      if((exercise.styleBias || []).indexOf(styleKey) > -1) score += 5;
    }

    if(level && (exercise.difficulty || []).indexOf(level) > -1) score += 2;
    if(level === 'beginner' && (exercise.difficulty || []).indexOf('advanced') > -1) score -= 8;
    if(level === 'rebuild' && exercise.jointStress >= 4) score -= 8;

    if(phase.indexOf('cut') > -1 || phase.indexOf('recomp') > -1) {
      if((exercise.tags || []).indexOf('tempo-control') > -1 || (exercise.tags || []).indexOf('supported') > -1 || (exercise.tags || []).indexOf('simple') > -1) score += 1;
      if(exercise.fatigueCost >= 5) score -= 2;
      if((exercise.tags || []).indexOf('max-effort') > -1) score -= 5;
    }

    if(phase.indexOf('build') > -1 || phase.indexOf('hypertrophy') > -1 || phase.indexOf('bulk') > -1) {
      if((exercise.domains || []).indexOf('strength') > -1 || (exercise.domains || []).indexOf('hypertrophy') > -1) score += 2;
      if((exercise.tags || []).indexOf('recovery') > -1) score -= 1;
    }

    if(recovery === 'poor' || recovery === 'low' || recovery === 'fragile') {
      score += exercise.recoveryFriendliness || 0;
      score -= exercise.fatigueCost || 0;
      if((exercise.tags || []).indexOf('recovery') > -1 || (exercise.tags || []).indexOf('simple') > -1) score += 3;
    }

    injuries.forEach(injury => {
      const rule = INJURY_RULES[injury];
      if(!rule) return;
      if((exercise.cautionIf || []).indexOf(injury) > -1) score -= painLevel >= 3 ? 9 : 4;
      if(hasAny(exercise.tags || [], rule.avoidPatterns || [])) score -= painLevel >= 3 ? 12 : 5;
      if(hasAny(exercise.tags || [], rule.preferPatterns || [])) score += 7;
      if((rule.cautionPatterns || []).indexOf(exercise.family) > -1) score -= painLevel >= 3 ? 6 : 2;
    });

    if((exercise.tags || []).indexOf('unilateral') > -1 && injuries.indexOf('left-right-imbalance') > -1) score += 7;
    if((exercise.tags || []).indexOf('left-first') > -1 && injuries.indexOf('left-right-imbalance') > -1) score += 3;
    if((exercise.tags || []).indexOf('chair-friendly') > -1 && injuries.indexOf('older-adult') > -1) score += 6;
    if((exercise.tags || []).indexOf('low-impact') > -1 && (injuries.indexOf('knee-pain') > -1 || injuries.indexOf('ankle-instability') > -1)) score += 4;
    if(context.lowOverwhelm || styleKey === 'low-overwhelm') score -= exercise.cognitiveLoad || 0;
    return score;
  }

  function filterExercises(query) {
    query = query || {};
    let list = EXERCISES.slice();

    if(query.family) {
      const fams = Array.isArray(query.family) ? query.family : [query.family];
      list = list.filter(ex => fams.indexOf(ex.family) > -1);
    }

    if(query.domain) {
      const domains = Array.isArray(query.domain) ? query.domain : [query.domain];
      list = list.filter(ex => hasAny(ex.domains || [], domains));
    }

    if(query.equipment && query.equipment.length) {
      const eq = query.equipment.map(slug);
      list = list.filter(ex => (ex.equipment || []).indexOf('bodyweight') > -1 || (ex.equipment || []).some(e => eq.indexOf(slug(e)) > -1));
    }

    if(query.difficulty) {
      const difficulty = normalise(query.difficulty);
      list = list.filter(ex => (ex.difficulty || []).indexOf(difficulty) > -1 || (ex.difficulty || []).indexOf('all') > -1);
    }

    list = list.map(ex => {
      const scored = clone(ex);
      scored.contextScore = scoreExerciseForContext(ex, query);
      return scored;
    });

    if(query.injuries && query.injuries.length) list = list.filter(ex => ex.contextScore > -10);
    list.sort((a,b) => b.contextScore - a.contextScore);
    return clone(list);
  }

  function suggestAlternatives(nameOrKey, context, limit) {
    context = context || {};
    limit = limit || 8;
    const original = findExercise(nameOrKey);
    if(!original) return [];
    const directKeys = unique([].concat(original.regressions || [], original.alternatives || []));
    const direct = directKeys.map(findExercise).filter(Boolean);
    const sameFamily = EXERCISES.filter(ex => ex.family === original.family && ex.key !== original.key);
    const keys = unique(direct.concat(sameFamily).map(x => x.key));
    return keys.map(findExercise).filter(Boolean).map(ex => {
      ex.contextScore = scoreExerciseForContext(ex, context);
      return ex;
    }).filter(ex => ex.contextScore > -12).sort((a,b) => b.contextScore - a.contextScore).slice(0, limit);
  }

  function buildMovementMenu(context) {
    context = context || {};
    return FAMILY_DB.map(fam => ({
      key: fam.key,
      label: fam.label,
      options: filterExercises(Object.assign({}, context, { family: fam.key })).slice(0,12)
    }));
  }

  function chooseTop(family, context, used) {
    used = used || {};
    const options = filterExercises(Object.assign({}, context, { family })).filter(x => !used[x.key]);
    const top = options[0] || null;
    if(top) used[top.key] = true;
    return top;
  }

  function buildTemplate(context) {
    context = context || {};
    const styleKey = contextStyle(context);
    let families;
    if(styleKey && STYLE_PROFILES[styleKey]) families = STYLE_PROFILES[styleKey].preferFamilies.slice(0,7);
    else families = ['horizontal-push','horizontal-pull','squat','hinge','core-anti-extension','conditioning'];
    return families.map(family => {
      const options = filterExercises(Object.assign({}, context, { family })).slice(0,5);
      const fam = familyByKey(family);
      return { family, label: fam ? fam.label : family, recommended: options[0] || null, alternatives: options.slice(1) };
    });
  }

  function buildReason(exercise, context) {
    const bits = [];
    const styleKey = contextStyle(context);
    if(styleKey && (exercise.styleBias || []).indexOf(styleKey) > -1) bits.push('matches your style preference');
    if((context.injuries || []).length && exercise.recoveryFriendliness >= 4) bits.push('joint-friendly option');
    if((exercise.tags || []).indexOf('unilateral') > -1) bits.push('helps side-to-side control');
    if((exercise.domains || []).indexOf('pilates') > -1) bits.push('supports deep core and control');
    if((exercise.domains || []).indexOf('calisthenics') > -1) bits.push('builds relative strength and movement skill');
    if((exercise.domains || []).indexOf('strength') > -1) bits.push('supports measurable strength progression');
    return bits.length ? bits.join(', ') : 'best current match for your setup';
  }

  function buildHybridSession(context) {
    context = context || {};
    const used = {};
    const styleKey = contextStyle(context) || 'hybrid-athlete';
    const families = STYLE_PROFILES[styleKey] ? STYLE_PROFILES[styleKey].preferFamilies : STYLE_PROFILES['hybrid-athlete'].preferFamilies;
    const items = families.slice(0,6).map(family => chooseTop(family, context, used)).filter(Boolean).map(pick => ({
      family: pick.family,
      name: pick.name,
      key: pick.key,
      equipment: pick.equipment,
      reason: buildReason(pick, context),
      alternatives: suggestAlternatives(pick.key, context, 3).map(a => a.name),
      cue: pick.coachingCue,
      rx: pick.defaultRx
    }));
    return { title: (STYLE_PROFILES[styleKey] ? STYLE_PROFILES[styleKey].label : 'Hybrid') + ' Adaptive Session', style: styleKey, items };
  }

  function buildCircuit(context) {
    context = context || {};
    const mode = slug(context.circuitMode || context.trainingStyle || 'fat-loss-conditioning');
    const families = mode === 'pilates-mobility'
      ? ['pilates-core','mobility-recovery','hip-extension','core-anti-rotation']
      : mode === 'joint-longevity'
        ? ['movement-restoration','hip-extension','core-anti-rotation','calf-ankle']
        : ['conditioning','horizontal-push','horizontal-pull','squat','core-anti-extension'];
    const used = {};
    const items = families.map(family => chooseTop(family, context, used)).filter(Boolean).map(x => ({
      key: x.key, name: x.name, family: x.family, rx: x.defaultRx, cue: x.coachingCue,
      alternatives: suggestAlternatives(x.key, context, 2).map(a => a.name)
    }));
    return { title: mode === 'pilates-mobility' ? 'Pilates Control Circuit' : 'Adaptive Conditioning Circuit', format: mode === 'pilates-mobility' ? '2-4 rounds, slow controlled quality' : 'AMRAP or EMOM, recoverable pace', items };
  }

  function getProgressionTree(key) {
    const k = slug(key);
    let tree = PROGRESSION_TREES[k];
    if(!tree) {
      const holder = Object.keys(PROGRESSION_TREES).find(name => PROGRESSION_TREES[name].indexOf(k) > -1);
      if(holder) tree = PROGRESSION_TREES[holder];
    }
    return tree ? tree.map(findExercise).filter(Boolean) : [];
  }

  function getLibraryStats() {
    const byFamily = {}, byDomain = {};
    EXERCISES.forEach(ex => {
      byFamily[ex.family] = (byFamily[ex.family] || 0) + 1;
      (ex.domains || []).forEach(d => byDomain[d] = (byDomain[d] || 0) + 1);
    });
    return {
      totalExercises: EXERCISES.length,
      familyCount: FAMILY_DB.length,
      injuryProfiles: Object.keys(INJURY_RULES).length,
      styleProfiles: Object.keys(STYLE_PROFILES).length,
      progressionTrees: Object.keys(PROGRESSION_TREES).length,
      byFamily,
      byDomain
    };
  }

  return {
    getExerciseProfile,
    getFamilySummary,
    areRelatedExercises,
    analyseGroup,
    getAllExercises: () => clone(EXERCISES),
    findExercise,
    filterExercises,
    suggestAlternatives,
    buildMovementMenu,
    getInjuryRules: () => clone(INJURY_RULES),
    scoreExerciseForContext,
    buildTemplate,
    getLibraryStats,
    getStyleProfiles: () => clone(STYLE_PROFILES),
    buildHybridSession,
    buildCircuit,
    getProgressionTree
  };
})();
