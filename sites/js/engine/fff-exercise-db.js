// FreeFitFuel Engine — Exercise Knowledge Database v4.6
// Drop-in replacement for /js/engine/fff-exercise-db.js
// Built to feed the existing My Plan fallback cache, injury profile selector and Workouts payload.

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
    "label": "Hip Extension / Glutes",
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
    "label": "Calf / Ankle",
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
    "label": "Core Anti-Rotation",
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
    "label": "Rehab / Return",
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
  const STYLE_PROFILES = {
  "mixed": {
    "label": "Mixed / Balanced",
    "preferFamilies": [
      "horizontal-push",
      "horizontal-pull",
      "squat",
      "hinge",
      "core-anti-extension",
      "conditioning",
      "mobility-recovery"
    ],
    "preferDomains": [
      "weights",
      "calisthenics",
      "hybrid",
      "mobility"
    ]
  },
  "balanced": {
    "label": "Balanced",
    "preferFamilies": [
      "horizontal-push",
      "horizontal-pull",
      "squat",
      "hinge",
      "core-anti-extension",
      "conditioning",
      "mobility-recovery"
    ],
    "preferDomains": [
      "weights",
      "calisthenics",
      "hybrid",
      "mobility"
    ]
  },
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
  "calisthenics": {
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
  "reformer": {
    "label": "Reformer / Pilates",
    "preferFamilies": [
      "pilates-core",
      "mobility-recovery",
      "hip-extension",
      "core-anti-extension",
      "core-anti-rotation",
      "movement-restoration"
    ],
    "preferDomains": [
      "reformer",
      "pilates",
      "mobility",
      "control"
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
  "circuits": {
    "label": "Circuits",
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
  const INJURY_RULES = {
  "tennis-elbow": {
    "label": "Tennis elbow / lateral elbow tendon pain",
    "region": "outer elbow",
    "avoidPatterns": [
      "heavy-gripping",
      "straight-bar-curl",
      "high-volume-pull-up",
      "jerky-row",
      "heavy-wrist-extension",
      "explosive-pull",
      "pelican-curl"
    ],
    "cautionPatterns": [
      "vertical-pull",
      "horizontal-pull",
      "arms",
      "carry"
    ],
    "preferPatterns": [
      "neutral-grip",
      "supported-row",
      "banded-light",
      "isometric",
      "eccentric-wrist-extensor",
      "reduced-grip",
      "scapular-control"
    ],
    "notes": [
      "Reduce gripping and straight-bar curling volume.",
      "Prefer neutral-grip rows, band rows, supported rows and controlled tendon loading."
    ]
  },
  "golfers-elbow": {
    "label": "Golfer\u2019s elbow / inner elbow tendon pain",
    "region": "inner elbow",
    "avoidPatterns": [
      "heavy-gripping",
      "heavy-supinated-curl",
      "high-volume-pull-up",
      "heavy-wrist-flexion",
      "explosive-pull"
    ],
    "cautionPatterns": [
      "vertical-pull",
      "horizontal-pull",
      "arms",
      "carry"
    ],
    "preferPatterns": [
      "neutral-grip",
      "banded-light",
      "supported-row",
      "isometric",
      "reduced-grip"
    ],
    "notes": [
      "Avoid hard gripping and heavy curls during flares.",
      "Use neutral grips, lighter bands and progressive forearm loading."
    ]
  },
  "outer-biceps-left-pain": {
    "label": "Outer left biceps / brachialis pain",
    "region": "left upper arm",
    "avoidPatterns": [
      "heavy-supinated-curl",
      "aggressive-vertical-pull",
      "straight-bar-curl",
      "pelican-curl",
      "jerky-row",
      "deep-fly"
    ],
    "cautionPatterns": [
      "vertical-pull",
      "horizontal-pull",
      "horizontal-push",
      "arms"
    ],
    "preferPatterns": [
      "neutral-grip",
      "hammer-grip",
      "supported-row",
      "left-first",
      "right-matches-left",
      "banded-light",
      "tempo-control"
    ],
    "notes": [
      "Bias neutral or hammer grips and supported pulling.",
      "For left-sided weakness, let the left side set the load and reps."
    ]
  },
  "distal-biceps-tendon-irritation": {
    "label": "Distal biceps tendon irritation",
    "region": "front elbow / lower biceps",
    "avoidPatterns": [
      "heavy-supinated-curl",
      "aggressive-vertical-pull",
      "heavy-gripping",
      "jerky-row"
    ],
    "cautionPatterns": [
      "vertical-pull",
      "horizontal-pull",
      "arms",
      "carry"
    ],
    "preferPatterns": [
      "neutral-grip",
      "banded-light",
      "supported-row",
      "tempo-control",
      "reduced-volume"
    ],
    "notes": [
      "Avoid heavy supinated pulling or curling when symptomatic.",
      "Return with neutral-grip rows and very controlled curls."
    ]
  },
  "shoulder-impingement": {
    "label": "Shoulder impingement / painful arc",
    "region": "shoulder",
    "avoidPatterns": [
      "deep-fly",
      "upright-row",
      "behind-neck",
      "dip-deep",
      "overhead-heavy",
      "handstand",
      "planche-load",
      "unstable-heavy"
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
      "banded-light",
      "external-rotation"
    ],
    "notes": [
      "Avoid forcing deep or overhead ranges.",
      "Prefer neutral-grip pressing, floor press, wall slides and cuff/scapular work."
    ]
  },
  "rotator-cuff-irritation": {
    "label": "Rotator cuff irritation",
    "region": "shoulder",
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
      "Prioritise low-load cuff, face pulls and scapular control before heavier pressing."
    ]
  },
  "wrist-pain": {
    "label": "Wrist pain / loaded extension sensitivity",
    "region": "wrist",
    "avoidPatterns": [
      "loaded-wrist-extension",
      "flat-palm-push-up",
      "front-rack",
      "handstand",
      "planche-load"
    ],
    "cautionPatterns": [
      "horizontal-push",
      "vertical-push",
      "calisthenics-skill"
    ],
    "preferPatterns": [
      "neutral-grip",
      "handles",
      "dumbbell-grip",
      "forearm-support"
    ],
    "notes": [
      "Use handles, dumbbells or forearm-supported variations where possible."
    ]
  },
  "hip-flexor-tendon-pain": {
    "label": "Hip flexor tendon pain / front hip pain",
    "region": "front hip",
    "avoidPatterns": [
      "high-knee",
      "sprinting",
      "deep-hip-flexion",
      "hanging-leg-raise",
      "mountain-climber-fast",
      "pistol"
    ],
    "cautionPatterns": [
      "lunge-split",
      "squat",
      "pilates-core",
      "conditioning"
    ],
    "preferPatterns": [
      "glute-dominant",
      "hip-flexor-isometric",
      "reduced-range",
      "supported",
      "pelvic-control",
      "mobility-gentle"
    ],
    "notes": [
      "Reduce high-knee drills, sprinting and aggressive hip-flexion work.",
      "Use hip flexor isometrics, glute bridges, controlled split squats and gentle mobility."
    ]
  },
  "hip-tendon-pain-reduced-rom": {
    "label": "Hip tendon pain with reduced movement",
    "region": "hip",
    "avoidPatterns": [
      "deep-hip-flexion",
      "wide-stance-deep",
      "twist-loaded",
      "pistol",
      "sprinting",
      "high-impact"
    ],
    "cautionPatterns": [
      "squat",
      "lunge-split",
      "hinge",
      "conditioning"
    ],
    "preferPatterns": [
      "reduced-range",
      "glute-bridge",
      "supported",
      "step-up-low",
      "glute-dominant",
      "pelvic-control",
      "mobility-gentle"
    ],
    "notes": [
      "Keep range pain-free and controlled.",
      "Use glute bridges, low step-ups, supported split squats and Pilates-style pelvic control."
    ]
  },
  "glute-med-tendinopathy": {
    "label": "Outer hip / glute med tendon irritation",
    "region": "outer hip",
    "avoidPatterns": [
      "side-lying-compression",
      "deep-side-lunge",
      "high-impact",
      "cross-leg-stretch-aggressive"
    ],
    "cautionPatterns": [
      "lunge-split",
      "conditioning",
      "core-anti-rotation"
    ],
    "preferPatterns": [
      "glute-dominant",
      "supported",
      "isometric",
      "pelvic-control",
      "reduced-range"
    ],
    "notes": [
      "Avoid compressive side-lying positions if painful.",
      "Use controlled glute bridge work, supported balance and gradual lateral hip loading."
    ]
  },
  "hip-clicking-painful": {
    "label": "Clicking hip with pain or catching",
    "region": "hip",
    "avoidPatterns": [
      "deep-hip-flexion",
      "fast-leg-circles",
      "hanging-leg-raise",
      "pistol",
      "twist-loaded"
    ],
    "cautionPatterns": [
      "pilates-core",
      "squat",
      "lunge-split"
    ],
    "preferPatterns": [
      "reduced-range",
      "pelvic-control",
      "mobility-gentle",
      "glute-dominant"
    ],
    "notes": [
      "Keep circles and hip-flexion range small and controlled.",
      "Painful clicking, locking or catching should be assessed."
    ]
  },
  "clicky-knees-painless": {
    "label": "Clicky knees, painless",
    "region": "knee",
    "avoidPatterns": [
      "jumping-fatigued",
      "fast-squat"
    ],
    "cautionPatterns": [
      "squat",
      "lunge-split",
      "conditioning"
    ],
    "preferPatterns": [
      "controlled-step-up",
      "box-range",
      "tempo-control",
      "quad-control",
      "glute-dominant",
      "calf-control"
    ],
    "notes": [
      "Painless clicking often needs better control rather than complete avoidance.",
      "Build step-ups, box squats, glute and calf control gradually."
    ]
  },
  "clicky-knees-painful": {
    "label": "Clicky knees with pain, swelling or catching",
    "region": "knee",
    "avoidPatterns": [
      "jumping",
      "deep-knee-flexion-fast",
      "pistol",
      "sissy-squat",
      "high-impact",
      "twist-loaded"
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
      "isometric",
      "spanish-squat",
      "reduced-range",
      "low-impact"
    ],
    "notes": [
      "Painful clicking, swelling, locking or giving way needs caution.",
      "Use reduced range, supported work and low-impact conditioning."
    ]
  },
  "patellar-tendon-pain": {
    "label": "Patellar tendon pain",
    "region": "front knee",
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
      "Avoid ballistic knee-dominant work during flares.",
      "Use Spanish squat holds, wall sits and gradual loading."
    ]
  },
  "knee-pain-general": {
    "label": "General knee pain",
    "region": "knee",
    "avoidPatterns": [
      "jumping",
      "deep-knee-flexion-fast",
      "high-impact",
      "pistol",
      "plyometric"
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
      "Prefer controlled range, step height and tempo."
    ]
  },
  "low-back-non-specific": {
    "label": "Low back, non-specific",
    "region": "low back",
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
      "squat",
      "pilates-core"
    ],
    "preferPatterns": [
      "supported",
      "core-bracing",
      "reduced-range",
      "anti-extension",
      "anti-rotation",
      "neutral-spine"
    ],
    "notes": [
      "Keep moving within comfort and avoid maxing out during rebuild.",
      "Use dead bug, bird dog, side plank, glute bridge and controlled RDL progressions."
    ]
  },
  "disc-sensitivity": {
    "label": "Disc sensitivity",
    "region": "low back",
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
      "Prioritise neutral spine and avoid loaded flexion/twisting under fatigue."
    ]
  },
  "plantar-fasciitis": {
    "label": "Plantar fasciitis / heel pain",
    "region": "foot",
    "avoidPatterns": [
      "jumping",
      "running-impact",
      "sprint",
      "long-walk-spike"
    ],
    "cautionPatterns": [
      "conditioning",
      "calf-ankle",
      "lunge-split"
    ],
    "preferPatterns": [
      "controlled-calf",
      "foot-intrinsic",
      "low-impact",
      "isometric",
      "gradual-walk"
    ],
    "notes": [
      "Avoid sudden walking/running spikes.",
      "Use calf control, foot strength and low-impact conditioning."
    ]
  },
  "achilles-calf-sensitivity": {
    "label": "Achilles / calf sensitivity",
    "region": "achilles/calf",
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
      "Avoid sudden spikes in jumping or running."
    ]
  },
  "beginner-low-confidence": {
    "label": "Beginner / low confidence",
    "region": "whole body",
    "avoidPatterns": [
      "advanced",
      "complex",
      "plyometric",
      "unstable-heavy"
    ],
    "cautionPatterns": [
      "conditioning",
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
      "Use simple repeatable movements with clear success criteria."
    ]
  },
  "older-adult": {
    "label": "Older adult / deconditioned",
    "region": "whole body",
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
      "Prefer supported, low-impact and chair-friendly options."
    ]
  }
};
  const PAGE_SOURCE_MODULES = {
    workouts: { label:'Workouts Library', url:'/workouts.html', reason:'main strength, calisthenics, circuits and workout logging library' },
    physio: { label:'Physio & Recovery', url:'/physio.html', reason:'injury-aware substitutions, rebuild progressions and return-to-training guidance' },
    stretching: { label:'Flexibility & Stretching', url:'/stretching.html', reason:'mobility, flexibility and movement-prep work' },
    yoga: { label:'Yoga & Meditation', url:'/yoga-meditation.html', reason:'downshift, breath-led recovery and lower-overwhelm movement' },
    taiChi: { label:'Tai Chi / Qi Gong', url:'/tai-chi.html', reason:'gentle balance, breath, circulation and mindful recovery work' },
    recoveryHub: { label:'Recovery Training Hub', url:'/recovery-training-hub.html', reason:'daily recovery flows, reset systems and active recovery options' },
    tracker: { label:'Tracker', url:'/tracker.html', reason:'walking, running, cycling, GPS, pace and endurance tracking' },
    ladder: { label:'Ladder Challenge', url:'/ladder-challenge.html', reason:'benchmarking, AMRAP-style progress checks and repeatable challenges' },
    systems: { label:'FreeFitFuel Systems', url:'/systems/', reason:'standalone protocols such as knee reset, fascia flow, pull-up pathway and recovery flows' }
  };

  function inferSourceModules(ex) {
    ex = ex || {};
    const domains = ex.domains || [];
    const purposes = ex.purposes || [];
    const tags = ex.tags || [];
    const family = ex.family || '';
    const modules = [];

    function add(key) {
      if (PAGE_SOURCE_MODULES[key] && modules.indexOf(key) === -1) modules.push(key);
    }

    if (hasAny(domains, ['rehab','longevity']) || hasAny(purposes, ['recovery','physio']) || hasAny(tags, ['supported','reduced-range','isometric','scapular-control','pelvic-control'])) add('physio');
    if (hasAny(domains, ['pilates','reformer','mobility']) || hasAny(purposes, ['mobility','stretching']) || family === 'mobility-recovery' || family === 'movement-restoration') add('stretching');
    if (hasAny(domains, ['pilates','mobility','recovery']) && hasAny(tags, ['breathing','low-cognitive-load','pelvic-control'])) add('yoga');
    if (hasAny(purposes, ['conditioning']) || family === 'conditioning') add('tracker');
    if (hasAny(purposes, ['challenge']) || hasAny(tags, ['amrap','emom'])) add('ladder');
    if (hasAny(domains, ['recovery','rehab','low-impact']) || hasAny(purposes, ['recovery']) || family === 'rehab-return') add('recoveryHub');
    if (hasAny(domains, ['calisthenics','weights','strength','hypertrophy','bodyweight','hybrid']) || !modules.length) add('workouts');
    if (hasAny(tags, ['pull-up','scapular-control','controlled-step-up','calf-control','foot-intrinsic','fascia','deskbound']) || hasAny(domains, ['rehab','recovery'])) add('systems');

    return modules.map(function (key) {
      return Object.assign({ key:key }, PAGE_SOURCE_MODULES[key]);
    });
  }

  function primarySourceForExercise(ex) {
    const modules = inferSourceModules(ex);
    return modules[0] || PAGE_SOURCE_MODULES.workouts;
  }

  function enrichExerciseForPlanner(ex) {
    const primary = primarySourceForExercise(ex);
    return Object.assign({}, ex, {
      sourcePage: primary.url,
      sourceLabel: primary.label,
      sourceReason: primary.reason,
      sourceModules: inferSourceModules(ex)
    });
  }

  const EXERCISES = [
  {
    "key": "pushup",
    "name": "Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "calisthenics"
    ],
    "purposes": [
      "push"
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
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "push-up",
      "core-bracing"
    ],
    "alternatives": [],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "tempo-push-up",
      "ring-push-up"
    ],
    "aliases": [
      "Push-up",
      "pushup"
    ],
    "yt": "Push-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "bodyweight"
    ],
    "styleBias": [
      "mixed",
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "incline-push-up",
    "name": "Incline Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw",
      "bench"
    ],
    "styles": [
      "mixed",
      "calisthenics"
    ],
    "purposes": [
      "push"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "supported",
      "reduced-range",
      "simple"
    ],
    "alternatives": [],
    "regressions": [
      "wall-push-up"
    ],
    "progressions": [
      "pushup"
    ],
    "aliases": [
      "Incline Push-up",
      "incline push up"
    ],
    "yt": "Incline Push-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "wall-push-up",
    "name": "Wall Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "calisthenics"
    ],
    "purposes": [
      "push",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "supported",
      "simple",
      "low-cognitive-load"
    ],
    "alternatives": [],
    "regressions": [],
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
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "calisthenics"
    ],
    "styleBias": [
      "mixed",
      "calisthenics"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "dbbench",
    "name": "Dumbbell Bench Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy"
    ],
    "purposes": [
      "push"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "neutral-grip",
      "tempo-control"
    ],
    "alternatives": [
      "dumbbell-floor-press",
      "incline-push-up"
    ],
    "regressions": [
      "dumbbell-floor-press"
    ],
    "progressions": [],
    "aliases": [
      "Dumbbell Bench Press",
      "dbbench"
    ],
    "yt": "Dumbbell Bench Press form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "dumbbell-floor-press",
    "name": "Dumbbell Floor Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "push",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "outer-biceps-left-pain"
    ],
    "tags": [
      "neutral-grip",
      "floor-press",
      "reduced-range"
    ],
    "alternatives": [
      "incline-push-up"
    ],
    "regressions": [],
    "progressions": [
      "dbbench"
    ],
    "aliases": [
      "Dumbbell Floor Press",
      "dumbbell floor press"
    ],
    "yt": "Dumbbell Floor Press form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "ringpush",
    "name": "Ring Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "unstable",
      "skill",
      "push-up"
    ],
    "alternatives": [],
    "regressions": [
      "pushup"
    ],
    "progressions": [
      "pseudo-planche-push-up"
    ],
    "aliases": [
      "Ring Push-up",
      "ringpush"
    ],
    "yt": "Ring Push-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "pseudo-planche-push-up",
    "name": "Pseudo Planche Push-up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain",
      "tennis-elbow"
    ],
    "tags": [
      "planche-load",
      "loaded-wrist-extension",
      "advanced"
    ],
    "alternatives": [],
    "regressions": [
      "planche-lean",
      "pushup"
    ],
    "progressions": [],
    "aliases": [
      "Pseudo Planche Push-up",
      "pseudo planche push up"
    ],
    "yt": "Pseudo Planche Push-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 5,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "doorrow",
    "name": "Door/Table Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "calisthenics"
    ],
    "purposes": [
      "pull"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "bodyweight-row",
      "simple",
      "reduced-grip"
    ],
    "alternatives": [
      "bandrow",
      "ringrow"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Door/Table Row",
      "doorrow"
    ],
    "yt": "Door/Table Row form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "mixed",
      "calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "bandrow",
    "name": "Band Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "banded-light",
      "neutral-grip",
      "supported-row",
      "reduced-grip"
    ],
    "alternatives": [
      "chest-supported-row"
    ],
    "regressions": [],
    "progressions": [
      "ringrow"
    ],
    "aliases": [
      "Band Row",
      "bandrow"
    ],
    "yt": "Band Row form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "mixed",
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "ringrow",
    "name": "Ring Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "pull"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "bodyweight-row",
      "scapular-control",
      "neutral-grip"
    ],
    "alternatives": [],
    "regressions": [
      "bandrow"
    ],
    "progressions": [
      "feet-elevated-ring-row"
    ],
    "aliases": [
      "Ring Row",
      "ringrow"
    ],
    "yt": "Ring Row form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "chest-supported-row",
    "name": "Chest-supported Dumbbell Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "supported-row",
      "neutral-grip"
    ],
    "alternatives": [
      "bandrow"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Chest-supported Dumbbell Row",
      "chest supported row"
    ],
    "yt": "Chest-supported Dumbbell Row form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "pull-up",
    "name": "Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "rack"
    ],
    "styles": [
      "calisthenics",
      "strength-hypertrophy"
    ],
    "purposes": [
      "pull",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "aggressive-vertical-pull",
      "heavy-gripping"
    ],
    "alternatives": [],
    "regressions": [
      "assisted-pull-up",
      "band-lat-pulldown"
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
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength-hypertrophy"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "assisted-pull-up",
    "name": "Assisted Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "rack",
      "band"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "pull"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "aggressive-vertical-pull",
      "scapular-control"
    ],
    "alternatives": [],
    "regressions": [
      "band-lat-pulldown"
    ],
    "progressions": [
      "pull-up"
    ],
    "aliases": [
      "Assisted Pull-up",
      "assisted pull up"
    ],
    "yt": "Assisted Pull-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "scapular-pull-up",
    "name": "Scapular Pull-up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "rack"
    ],
    "styles": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "skill",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "scapular-control"
    ],
    "alternatives": [],
    "regressions": [
      "band-lat-pulldown"
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
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "face-pull",
    "name": "Band Face Pull",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "scapular-control",
      "banded-light",
      "external-rotation"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Face Pull",
      "face pull"
    ],
    "yt": "Band Face Pull form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "kneeling-arm-series",
    "name": "Kneeling Arm Series / Band Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "band",
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "core",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "pelvic-control",
      "scapular-control",
      "banded-light"
    ],
    "alternatives": [
      "bandrow",
      "prone-wt-lifts"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Kneeling Arm Series / Band Row",
      "kneeling arm series"
    ],
    "yt": "Kneeling Arm Series / Band Row form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "reformer",
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Tall kneel, ribs stacked, scapulae glide.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "prone-wt-lifts",
    "name": "Prone W/T Lifts",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "scapular-control",
      "low-cognitive-load"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Prone W/T Lifts",
      "prone wt lifts"
    ],
    "yt": "Prone W/T Lifts form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Squeeze shoulder blades gently, keep ribs heavy and neck long.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "stepup",
    "name": "Step-up",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "db",
      "bw"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy"
    ],
    "purposes": [
      "legs"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain-general",
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "controlled-step-up",
      "unilateral",
      "left-first"
    ],
    "alternatives": [],
    "regressions": [
      "step-up-low",
      "sit-to-stand"
    ],
    "progressions": [],
    "aliases": [
      "Step-up",
      "stepup"
    ],
    "yt": "Step-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "step-up-low",
    "name": "Low Step-up",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery",
      "joint-longevity"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "controlled-step-up",
      "step-up-low",
      "unilateral",
      "reduced-range"
    ],
    "alternatives": [
      "supported-split-squat"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Low Step-up",
      "step up low"
    ],
    "yt": "Low Step-up form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery",
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "sit-to-stand",
    "name": "Sit-to-Stand",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw",
      "chair"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery",
      "joint-longevity"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "chair-friendly",
      "supported",
      "simple",
      "box-range"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [
      "box-squat"
    ],
    "aliases": [
      "Sit-to-Stand",
      "sit to stand"
    ],
    "yt": "Sit-to-Stand form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "longevity"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery",
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "box-squat",
    "name": "Box Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain-general",
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "box-range",
      "reduced-range",
      "tempo-control"
    ],
    "alternatives": [],
    "regressions": [
      "sit-to-stand"
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
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "goblet-squat",
    "name": "Goblet Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy"
    ],
    "purposes": [
      "legs"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "knee-pain-general",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "squat",
      "tempo-control"
    ],
    "alternatives": [],
    "regressions": [
      "box-squat"
    ],
    "progressions": [],
    "aliases": [
      "Goblet Squat",
      "goblet squat"
    ],
    "yt": "Goblet Squat form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "spanish-squat-hold",
    "name": "Spanish Squat Hold",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery",
      "joint-longevity"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "patellar-tendon-pain"
    ],
    "tags": [
      "spanish-squat",
      "isometric",
      "quad-control"
    ],
    "alternatives": [
      "wall-sit"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Spanish Squat Hold",
      "spanish squat hold"
    ],
    "yt": "Spanish Squat Hold form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery",
      "joint-longevity"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "wall-sit",
    "name": "Wall Sit",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "patellar-tendon-pain",
      "clicky-knees-painful"
    ],
    "tags": [
      "isometric",
      "quad-control",
      "simple"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [
      "spanish-squat-hold"
    ],
    "aliases": [
      "Wall Sit",
      "wall sit"
    ],
    "yt": "Wall Sit form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "supported-split-squat",
    "name": "Supported Split Squat",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom",
      "clicky-knees-painful"
    ],
    "tags": [
      "supported",
      "unilateral",
      "reduced-range",
      "left-first"
    ],
    "alternatives": [],
    "regressions": [],
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
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "shrimp-squat-regression",
    "name": "Shrimp Squat Regression",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "legs",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "unilateral",
      "balance-demand",
      "advanced"
    ],
    "alternatives": [],
    "regressions": [
      "supported-split-squat"
    ],
    "progressions": [],
    "aliases": [
      "Shrimp Squat Regression",
      "shrimp squat regression"
    ],
    "yt": "Shrimp Squat Regression form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "sissy-squat-regression",
    "name": "Sissy Squat Regression",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "legs",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "patellar-tendon-pain",
      "clicky-knees-painful"
    ],
    "tags": [
      "sissy-squat",
      "deep-knee-flexion-fast",
      "advanced"
    ],
    "alternatives": [],
    "regressions": [
      "spanish-squat-hold"
    ],
    "progressions": [],
    "aliases": [
      "Sissy Squat Regression",
      "sissy squat regression"
    ],
    "yt": "Sissy Squat Regression form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 4,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "glute-bridge",
    "name": "Glute Bridge",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "reformer",
      "rebuild-recovery",
      "pilates-mobility"
    ],
    "purposes": [
      "legs",
      "core",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom",
      "low-back-non-specific"
    ],
    "tags": [
      "glute-dominant",
      "simple",
      "pelvic-control"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [
      "weighted-glute-bridge"
    ],
    "aliases": [
      "Glute Bridge",
      "glute bridge"
    ],
    "yt": "Glute Bridge form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "pilates"
    ],
    "styleBias": [
      "mixed",
      "reformer",
      "rebuild-recovery",
      "pilates-mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "hip-flexor-isometric",
    "name": "Hip Flexor Isometric Press",
    "family": "rehab-return",
    "movement": "rehab-return",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery",
      "joint-longevity"
    ],
    "purposes": [
      "recovery",
      "physio"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-flexor-tendon-pain"
    ],
    "tags": [
      "hip-flexor-isometric",
      "isometric",
      "mobility-gentle"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Hip Flexor Isometric Press",
      "hip flexor isometric"
    ],
    "yt": "Hip Flexor Isometric Press form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "physio"
    ],
    "styleBias": [
      "rebuild-recovery",
      "joint-longevity"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Press knee gently into hand, hold 20 to 30 seconds, stay pain-free.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "marches-with-band",
    "name": "Marches with Band",
    "family": "rehab-return",
    "movement": "rehab-return",
    "equipment": [
      "band"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery",
      "physio"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-flexor-tendon-pain"
    ],
    "tags": [
      "hip-flexor-isometric",
      "pelvic-control",
      "banded-light"
    ],
    "alternatives": [],
    "regressions": [
      "hip-flexor-isometric"
    ],
    "progressions": [],
    "aliases": [
      "Marches with Band",
      "marches with band"
    ],
    "yt": "Marches with Band form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "physio"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "leg-circles-frogs",
    "name": "Leg Circles & Frogs",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw",
      "band"
    ],
    "styles": [
      "reformer",
      "pilates-mobility"
    ],
    "purposes": [
      "core",
      "mobility",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-clicking-painful",
      "hip-flexor-tendon-pain"
    ],
    "tags": [
      "pelvic-control",
      "mobility-gentle"
    ],
    "alternatives": [
      "mat-leg-circles",
      "frog-with-miniband"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Leg Circles & Frogs",
      "leg circles frogs"
    ],
    "yt": "Leg Circles & Frogs form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "reformer",
      "pilates"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Control circle size, keep pelvis steady, no rib flare.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "mat-leg-circles",
    "name": "Mat Leg Circles",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility"
    ],
    "purposes": [
      "core",
      "mobility"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-clicking-painful"
    ],
    "tags": [
      "pelvic-control",
      "mobility-gentle",
      "reduced-range"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Mat Leg Circles",
      "mat leg circles"
    ],
    "yt": "Mat Leg Circles form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Small smooth circles, pelvis steady.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "frog-with-miniband",
    "name": "Frog with Mini-band",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "band"
    ],
    "styles": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "mobility"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "glute-dominant",
      "pelvic-control",
      "banded-light"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Frog with Mini-band",
      "frog with miniband"
    ],
    "yt": "Frog with Mini-band form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "sidepl",
    "name": "Side Plank",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "calisthenics",
      "pilates-mobility"
    ],
    "purposes": [
      "core"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "anti-rotation",
      "lateral-core"
    ],
    "alternatives": [],
    "regressions": [
      "side-plank-knees"
    ],
    "progressions": [],
    "aliases": [
      "Side Plank",
      "sidepl"
    ],
    "yt": "Side Plank form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "calisthenics"
    ],
    "styleBias": [
      "mixed",
      "calisthenics",
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "dead-bug",
    "name": "Dead Bug",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery",
      "pilates-mobility"
    ],
    "purposes": [
      "core",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "disc-sensitivity"
    ],
    "tags": [
      "anti-extension",
      "core-bracing",
      "neutral-spine"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dead Bug",
      "dead bug"
    ],
    "yt": "Dead Bug form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "pilates"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery",
      "pilates-mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "bird-dog",
    "name": "Bird Dog",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "core",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "neutral-spine",
      "core-bracing"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Bird Dog",
      "bird dog"
    ],
    "yt": "Bird Dog form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "pelvic-curl",
    "name": "Pelvic Curl",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "core",
      "mobility",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "pelvic-control",
      "spinal-articulation",
      "glute-dominant"
    ],
    "alternatives": [
      "glute-bridge"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Pelvic Curl",
      "pelvic curl"
    ],
    "yt": "Pelvic Curl form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "rehab"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Peel spine off mat one vertebra at a time.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "pilates-hundred-prep",
    "name": "Pilates Hundred Prep",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility"
    ],
    "purposes": [
      "core"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-flexor-tendon-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "pilates",
      "breathing",
      "pelvic-control"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Pilates Hundred Prep",
      "pilates hundred prep"
    ],
    "yt": "Pilates Hundred Prep form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "long-stretch-plank",
    "name": "Long Stretch / Plank Series",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility",
      "calisthenics"
    ],
    "purposes": [
      "core",
      "push"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "plank",
      "core-bracing",
      "skill"
    ],
    "alternatives": [
      "forearm-plank"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Long Stretch / Plank Series",
      "long stretch plank"
    ],
    "yt": "Long Stretch / Plank Series form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "reformer",
      "pilates"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility",
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Strong plank, move shoulders and hips as one piece.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "mermaid",
    "name": "Mermaid Stretch",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "mobility",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "mobility-gentle",
      "breathing"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Mermaid Stretch",
      "mermaid"
    ],
    "yt": "Mermaid Stretch form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "mobility"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Sit tall, reach long, breathe into the side body.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "elephant-pike-stretch",
    "name": "Elephant / Box Pike Stretch",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw",
      "bench"
    ],
    "styles": [
      "reformer",
      "pilates-mobility"
    ],
    "purposes": [
      "mobility",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hamstring-pain"
    ],
    "tags": [
      "mobility-gentle",
      "posterior-chain"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Elephant / Box Pike Stretch",
      "elephant pike stretch"
    ],
    "yt": "Elephant / Box Pike Stretch form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "pilates",
      "mobility"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hips high, gently pulse heels, do not force range.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "mobility-lower",
    "name": "Lower Body Mobility Flow",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "calisthenics",
      "circuits",
      "reformer",
      "rebuild-recovery"
    ],
    "purposes": [
      "mobility",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom",
      "clicky-knees-painful"
    ],
    "tags": [
      "mobility-gentle",
      "reduced-range"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Lower Body Mobility Flow",
      "mobility lower"
    ],
    "yt": "Lower Body Mobility Flow form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "mobility",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "calisthenics",
      "circuits",
      "reformer",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "stretch-reset",
    "name": "Daily Stretch Reset",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "calisthenics",
      "circuits",
      "reformer"
    ],
    "purposes": [
      "stretching",
      "recovery",
      "mobility"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "mobility-gentle",
      "low-cognitive-load"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Daily Stretch Reset",
      "stretch reset"
    ],
    "yt": "Daily Stretch Reset form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "mobility",
      "recovery"
    ],
    "styleBias": [
      "mixed",
      "calisthenics",
      "circuits",
      "reformer"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "physio-lower",
    "name": "Lower Body Recovery Block",
    "family": "rehab-return",
    "movement": "rehab-return",
    "equipment": [
      "bw",
      "band"
    ],
    "styles": [
      "mixed",
      "calisthenics",
      "circuits",
      "rebuild-recovery"
    ],
    "purposes": [
      "recovery",
      "physio",
      "legs"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom",
      "clicky-knees-painful",
      "patellar-tendon-pain"
    ],
    "tags": [
      "reduced-range",
      "glute-dominant",
      "isometric",
      "mobility-gentle"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Lower Body Recovery Block",
      "physio lower"
    ],
    "yt": "Lower Body Recovery Block form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "physio"
    ],
    "styleBias": [
      "mixed",
      "calisthenics",
      "circuits",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "hammer-curl",
    "name": "Hammer Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "strength-hypertrophy"
    ],
    "purposes": [
      "arms"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "neutral-grip",
      "hammer-grip"
    ],
    "alternatives": [
      "band-curl"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Hammer Curl",
      "hammer curl"
    ],
    "yt": "Hammer Curl form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights"
    ],
    "styleBias": [
      "mixed",
      "strength-hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "band-curl",
    "name": "Band Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "arms",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "banded-light",
      "reduced-grip"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Curl",
      "band curl"
    ],
    "yt": "Band Curl form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "weights"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "wrist-extensor-eccentric",
    "name": "Wrist Extensor Eccentric",
    "family": "rehab-return",
    "movement": "rehab-return",
    "equipment": [
      "db",
      "band"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "recovery",
      "physio"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow"
    ],
    "tags": [
      "eccentric-wrist-extensor",
      "tendon-loading",
      "banded-light"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Wrist Extensor Eccentric",
      "wrist extensor eccentric"
    ],
    "yt": "Wrist Extensor Eccentric form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "physio"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Assist up, slowly lower through comfortable range.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "isometric-grip-light",
    "name": "Light Grip Isometric",
    "family": "rehab-return",
    "movement": "rehab-return",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "recovery",
      "physio"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "tennis-elbow",
      "golfers-elbow"
    ],
    "tags": [
      "isometric",
      "reduced-grip",
      "tendon-loading"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Light Grip Isometric",
      "isometric grip light"
    ],
    "yt": "Light Grip Isometric form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "physio"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "ring-dip",
    "name": "Ring Dip",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "tennis-elbow"
    ],
    "tags": [
      "dip-deep",
      "unstable",
      "advanced"
    ],
    "alternatives": [],
    "regressions": [
      "ring-support-hold"
    ],
    "progressions": [],
    "aliases": [
      "Ring Dip",
      "ring dip"
    ],
    "yt": "Ring Dip form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 5,
    "fatigueCost": 5,
    "skillDemand": 5,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "ring-support-hold",
    "name": "Ring Support Hold",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "support-hold",
      "skill"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Ring Support Hold",
      "ring support hold"
    ],
    "yt": "Ring Support Hold form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 2,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "hollow-hold",
    "name": "Hollow Hold",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "core",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "hollow-body",
      "skill-transfer",
      "anti-extension"
    ],
    "alternatives": [],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [],
    "aliases": [
      "Hollow Hold",
      "hollow hold"
    ],
    "yt": "Hollow Hold form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "l-sit-tuck",
    "name": "Tuck L-Sit",
    "family": "calisthenics-skill",
    "movement": "calisthenics-skill",
    "equipment": [
      "bw",
      "rings"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "core",
      "skill"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-flexor-tendon-pain",
      "wrist-pain"
    ],
    "tags": [
      "l-sit",
      "support-hold",
      "skill"
    ],
    "alternatives": [],
    "regressions": [
      "hollow-hold"
    ],
    "progressions": [],
    "aliases": [
      "Tuck L-Sit",
      "l sit tuck"
    ],
    "yt": "Tuck L-Sit form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "skill"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 2,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "amrap20-triplet",
    "name": "Triplet \u2014 AMRAP 20",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "circuits"
    ],
    "purposes": [
      "conditioning"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "circuit",
      "amrap",
      "conditioning"
    ],
    "alternatives": [
      "low-impact-circuit"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Triplet \u2014 AMRAP 20",
      "amrap20 triplet"
    ],
    "yt": "Triplet \u2014 AMRAP 20 form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "circuit"
    ],
    "styleBias": [
      "mixed",
      "circuits"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "emom30-triplet",
    "name": "Triplet \u2014 EMOM 30",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "circuits"
    ],
    "purposes": [
      "conditioning"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "circuit",
      "emom",
      "conditioning"
    ],
    "alternatives": [
      "low-impact-circuit"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Triplet \u2014 EMOM 30",
      "emom30 triplet"
    ],
    "yt": "Triplet \u2014 EMOM 30 form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "circuit"
    ],
    "styleBias": [
      "mixed",
      "circuits"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "low-impact-circuit",
    "name": "Low-impact Conditioning Circuit",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw",
      "db",
      "band"
    ],
    "styles": [
      "mixed",
      "circuits",
      "rebuild-recovery"
    ],
    "purposes": [
      "conditioning",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "low-impact",
      "simple",
      "circuit"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Low-impact Conditioning Circuit",
      "low impact circuit"
    ],
    "yt": "Low-impact Conditioning Circuit form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "circuits",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "ladder-standard",
    "name": "Ladder Challenge",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "circuits",
      "calisthenics"
    ],
    "purposes": [
      "challenge",
      "conditioning"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "shoulder-impingement"
    ],
    "tags": [
      "ladder",
      "circuit",
      "challenge"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Ladder Challenge",
      "ladder standard"
    ],
    "yt": "Ladder Challenge form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "calisthenics"
    ],
    "styleBias": [
      "mixed",
      "circuits",
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "walk",
    "name": "Walk",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "joint-longevity",
      "low-overwhelm"
    ],
    "purposes": [
      "conditioning",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "low-impact",
      "simple",
      "recovery"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Walk",
      "walk"
    ],
    "yt": "Walk form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "endurance",
      "recovery"
    ],
    "styleBias": [
      "mixed",
      "joint-longevity",
      "low-overwhelm"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "tai-chi-walk",
    "name": "Tai Chi Walk",
    "family": "movement-restoration",
    "movement": "movement-restoration",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "joint-longevity",
      "low-overwhelm"
    ],
    "purposes": [
      "mobility",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "low-impact",
      "balance-regression",
      "recovery"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Tai Chi Walk",
      "tai chi walk"
    ],
    "yt": "Tai Chi Walk form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "mobility",
      "recovery"
    ],
    "styleBias": [
      "mixed",
      "joint-longevity",
      "low-overwhelm"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "reformer-foundation",
    "name": "Reformer Foundation Session",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility"
    ],
    "purposes": [
      "full",
      "core",
      "recovery"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "pilates",
      "pelvic-control",
      "controlled-load"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Reformer Foundation Session",
      "reformer foundation"
    ],
    "yt": "Reformer Foundation Session form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "reformer",
      "pilates"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },
  {
    "key": "reformer-core",
    "name": "Reformer Core Session",
    "family": "pilates-core",
    "movement": "pilates-core",
    "equipment": [
      "bw"
    ],
    "styles": [
      "reformer",
      "pilates-mobility"
    ],
    "purposes": [
      "core"
    ],
    "muscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-flexor-tendon-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "pilates",
      "core-bracing",
      "pelvic-control"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Reformer Core Session",
      "reformer core"
    ],
    "yt": "Reformer Core Session form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "reformer",
      "pilates"
    ],
    "styleBias": [
      "reformer",
      "pilates-mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 3,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly, stay controlled, and keep symptoms calm.",
    "source": "fff-exercise-db-v4.2"
  },

  {
    "key": "incline-dumbbell-press",
    "name": "Incline Dumbbell Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "hypertrophy",
      "strength"
    ],
    "purposes": [
      "push",
      "strength",
      "hypertrophy"
    ],
    "muscles": [
      "upper-chest",
      "front-delts",
      "triceps",
      "serratus-anterior"
    ],
    "primaryMuscles": [
      "upper-chest",
      "front-delts",
      "triceps"
    ],
    "secondaryMuscles": [
      "serratus-anterior"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "upper-chest",
      "dumbbell",
      "press"
    ],
    "alternatives": [
      "dumbbell-floor-press"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "low-incline-dumbbell-press"
    ],
    "aliases": [
      "Incline Dumbbell Press",
      "incline-dumbbell-press"
    ],
    "yt": "Incline Dumbbell Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy",
      "strength"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Set the bench low, keep shoulder blades gently back, and press towards the upper chest line.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "low-incline-dumbbell-press",
    "name": "Low Incline Dumbbell Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "upper-chest",
      "mid-chest",
      "front-delts",
      "triceps"
    ],
    "primaryMuscles": [
      "upper-chest",
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts",
      "triceps"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "upper-chest",
      "low-incline"
    ],
    "alternatives": [
      "incline-dumbbell-press"
    ],
    "regressions": [
      "dumbbell-floor-press"
    ],
    "progressions": [
      "incline-dumbbell-press"
    ],
    "aliases": [
      "Low Incline Dumbbell Press",
      "low-incline-dumbbell-press"
    ],
    "yt": "Low Incline Dumbbell Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a shallow incline so the upper chest works without turning it into a shoulder press.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-squeeze-press",
    "name": "Dumbbell Squeeze Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "mid-chest",
      "inner-chest-emphasis",
      "triceps",
      "front-delts"
    ],
    "primaryMuscles": [
      "mid-chest",
      "inner-chest-emphasis"
    ],
    "secondaryMuscles": [
      "triceps",
      "front-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain"
    ],
    "tags": [
      "chest",
      "dumbbell",
      "constant-tension"
    ],
    "alternatives": [
      "dumbbell-floor-press"
    ],
    "regressions": [
      "pushup"
    ],
    "progressions": [
      "incline-dumbbell-press"
    ],
    "aliases": [
      "Dumbbell Squeeze Press",
      "dumbbell-squeeze-press"
    ],
    "yt": "Dumbbell Squeeze Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Press the dumbbells together throughout the rep and keep the chest squeezed.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-fly",
    "name": "Dumbbell Fly",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "mid-chest",
      "front-delts",
      "biceps-tendon"
    ],
    "primaryMuscles": [
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts",
      "biceps-tendon"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "chest-fly",
      "stretch"
    ],
    "alternatives": [
      "band-chest-fly"
    ],
    "regressions": [
      "dumbbell-squeeze-press"
    ],
    "progressions": [
      "incline-dumbbell-fly"
    ],
    "aliases": [
      "Dumbbell Fly",
      "dumbbell-fly"
    ],
    "yt": "Dumbbell Fly exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a soft elbow and stop before the shoulder pulls forward.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "incline-dumbbell-fly",
    "name": "Incline Dumbbell Fly",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "upper-chest",
      "front-delts",
      "biceps-tendon"
    ],
    "primaryMuscles": [
      "upper-chest"
    ],
    "secondaryMuscles": [
      "front-delts",
      "biceps-tendon"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "upper-chest",
      "fly"
    ],
    "alternatives": [
      "dumbbell-fly"
    ],
    "regressions": [
      "band-low-to-high-fly"
    ],
    "progressions": [],
    "aliases": [
      "Incline Dumbbell Fly",
      "incline-dumbbell-fly"
    ],
    "yt": "Incline Dumbbell Fly exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Sweep up towards the collarbone line without shrugging.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "decline-push-up",
    "name": "Decline Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw",
      "bench"
    ],
    "styles": [
      "calisthenics",
      "mixed"
    ],
    "purposes": [
      "push",
      "strength"
    ],
    "muscles": [
      "upper-chest",
      "front-delts",
      "triceps",
      "core"
    ],
    "primaryMuscles": [
      "upper-chest",
      "front-delts",
      "triceps"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "bodyweight",
      "upper-chest"
    ],
    "alternatives": [
      "pushup"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "pseudo-planche-push-up"
    ],
    "aliases": [
      "Decline Push-Up",
      "decline-push-up"
    ],
    "yt": "Decline Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "mixed"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Feet elevated, ribs down, press the floor away without sagging.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "diamond-push-up",
    "name": "Diamond Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "arms"
    ],
    "muscles": [
      "triceps",
      "mid-chest",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "triceps",
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "wrist-pain",
      "elbow-tendon-pain"
    ],
    "tags": [
      "triceps",
      "bodyweight"
    ],
    "alternatives": [
      "pushup"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "ring-dip"
    ],
    "aliases": [
      "Diamond Push-Up",
      "diamond-push-up"
    ],
    "yt": "Diamond Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "arms"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep hands close but not painful and elbows tracking naturally.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "archer-push-up",
    "name": "Archer Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "strength"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "unilateral",
      "calisthenics"
    ],
    "alternatives": [
      "pushup"
    ],
    "regressions": [
      "wide-push-up"
    ],
    "progressions": [
      "pseudo-planche-push-up"
    ],
    "aliases": [
      "Archer Push-Up",
      "archer-push-up"
    ],
    "yt": "Archer Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Shift smoothly to one side while the other arm assists.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-chest-press",
    "name": "Band Chest Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "push",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "serratus-anterior"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "serratus-anterior"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "home"
    ],
    "alternatives": [
      "pushup"
    ],
    "regressions": [
      "wall-push-up"
    ],
    "progressions": [
      "pushup"
    ],
    "aliases": [
      "Band Chest Press",
      "band-chest-press"
    ],
    "yt": "Band Chest Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Anchor the band behind you and press smoothly.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-low-to-high-fly",
    "name": "Band Low-to-High Fly",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "band"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "upper-chest",
      "front-delts"
    ],
    "primaryMuscles": [
      "upper-chest"
    ],
    "secondaryMuscles": [
      "front-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "upper-chest"
    ],
    "alternatives": [
      "incline-dumbbell-fly"
    ],
    "regressions": [
      "band-chest-press"
    ],
    "progressions": [],
    "aliases": [
      "Band Low-to-High Fly",
      "band-low-to-high-fly"
    ],
    "yt": "Band Low-to-High Fly exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Sweep from low to high and finish with the chest, not traps.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "ring-push-up",
    "name": "Ring Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "strength"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "serratus-anterior",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "serratus-anterior",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "rings",
      "stability"
    ],
    "alternatives": [
      "ringpush"
    ],
    "regressions": [
      "pushup"
    ],
    "progressions": [
      "ring-dip"
    ],
    "aliases": [
      "Ring Push-Up",
      "ring-push-up"
    ],
    "yt": "Ring Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep rings quiet and finish by gently protracting.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "feet-elevated-pike-push-up",
    "name": "Feet Elevated Pike Push-Up",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "bw",
      "bench"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "push",
      "strength"
    ],
    "muscles": [
      "front-delts",
      "side-delts",
      "triceps",
      "upper-chest",
      "core"
    ],
    "primaryMuscles": [
      "front-delts",
      "side-delts",
      "triceps"
    ],
    "secondaryMuscles": [
      "upper-chest",
      "core"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "bodyweight-shoulder",
      "vertical-push"
    ],
    "alternatives": [
      "pike-push-up"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "wall-handstand-push-up"
    ],
    "aliases": [
      "Feet Elevated Pike Push-Up",
      "feet-elevated-pike-push-up"
    ],
    "yt": "Feet Elevated Pike Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hips high, head travels forward and down, then press back.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "one-arm-dumbbell-row",
    "name": "One-Arm Dumbbell Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "purposes": [
      "pull",
      "strength"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "mid-traps",
      "rear-delts",
      "biceps",
      "grip"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids",
      "mid-traps"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "biceps",
      "grip"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "dumbbell-row",
      "lat"
    ],
    "alternatives": [
      "chest-supported-row"
    ],
    "regressions": [
      "bandrow"
    ],
    "progressions": [
      "renegade-row"
    ],
    "aliases": [
      "One-Arm Dumbbell Row",
      "one-arm-dumbbell-row"
    ],
    "yt": "One-Arm Dumbbell Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull elbow towards the hip and keep the torso quiet.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "two-arm-dumbbell-row",
    "name": "Two-Arm Dumbbell Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "strength"
    ],
    "purposes": [
      "pull",
      "strength"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "mid-traps",
      "rear-delts",
      "biceps",
      "spinal-erectors"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids",
      "mid-traps"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "biceps",
      "spinal-erectors"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "dumbbell-row",
      "hinged"
    ],
    "alternatives": [
      "chest-supported-row"
    ],
    "regressions": [
      "bandrow"
    ],
    "progressions": [
      "renegade-row"
    ],
    "aliases": [
      "Two-Arm Dumbbell Row",
      "two-arm-dumbbell-row"
    ],
    "yt": "Two-Arm Dumbbell Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "mixed",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hinge cleanly, brace, and row both elbows back.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "incline-chest-supported-dumbbell-row",
    "name": "Incline Chest-Supported Dumbbell Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "hypertrophy"
    ],
    "muscles": [
      "rhomboids",
      "mid-traps",
      "rear-delts",
      "lats",
      "biceps"
    ],
    "primaryMuscles": [
      "rhomboids",
      "mid-traps",
      "rear-delts"
    ],
    "secondaryMuscles": [
      "lats",
      "biceps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "supported-row",
      "upper-back"
    ],
    "alternatives": [
      "chest-supported-row"
    ],
    "regressions": [
      "bandrow"
    ],
    "progressions": [
      "two-arm-dumbbell-row"
    ],
    "aliases": [
      "Incline Chest-Supported Dumbbell Row",
      "incline-chest-supported-dumbbell-row"
    ],
    "yt": "Incline Chest-Supported Dumbbell Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 3,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Let the bench support you so the upper back does the work.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-pullover",
    "name": "Dumbbell Pullover",
    "family": "vertical-pull",
    "movement": "shoulder-extension",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "pull",
      "hypertrophy"
    ],
    "muscles": [
      "lats",
      "serratus-anterior",
      "long-head-triceps",
      "upper-chest"
    ],
    "primaryMuscles": [
      "lats",
      "serratus-anterior"
    ],
    "secondaryMuscles": [
      "long-head-triceps",
      "upper-chest"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "lat",
      "pullover"
    ],
    "alternatives": [
      "band-straight-arm-pulldown"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dumbbell Pullover",
      "dumbbell-pullover"
    ],
    "yt": "Dumbbell Pullover exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep ribs down and move through the shoulders.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-straight-arm-pulldown",
    "name": "Band Straight-Arm Pulldown",
    "family": "vertical-pull",
    "movement": "shoulder-extension",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "recovery"
    ],
    "muscles": [
      "lats",
      "serratus-anterior",
      "long-head-triceps"
    ],
    "primaryMuscles": [
      "lats",
      "serratus-anterior"
    ],
    "secondaryMuscles": [
      "long-head-triceps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "lat-activation",
      "band"
    ],
    "alternatives": [
      "dumbbell-pullover"
    ],
    "regressions": [
      "scapular-pull-up"
    ],
    "progressions": [],
    "aliases": [
      "Band Straight-Arm Pulldown",
      "band-straight-arm-pulldown"
    ],
    "yt": "Band Straight-Arm Pulldown exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull the band to the thighs and feel the lats slide the arms down.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-lat-pulldown",
    "name": "Band Lat Pulldown",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "strength"
    ],
    "muscles": [
      "lats",
      "biceps",
      "lower-traps",
      "rhomboids"
    ],
    "primaryMuscles": [
      "lats",
      "biceps"
    ],
    "secondaryMuscles": [
      "lower-traps",
      "rhomboids"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "band",
      "vertical-pull"
    ],
    "alternatives": [
      "assisted-pull-up"
    ],
    "regressions": [
      "bandrow"
    ],
    "progressions": [
      "assisted-pull-up"
    ],
    "aliases": [
      "Band Lat Pulldown",
      "band-lat-pulldown"
    ],
    "yt": "Band Lat Pulldown exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull elbows down to your pockets and keep neck relaxed.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "neutral-grip-pull-up",
    "name": "Neutral-Grip Pull-Up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bar"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "pull",
      "strength"
    ],
    "muscles": [
      "lats",
      "biceps",
      "brachialis",
      "lower-traps",
      "forearms"
    ],
    "primaryMuscles": [
      "lats",
      "biceps",
      "brachialis"
    ],
    "secondaryMuscles": [
      "lower-traps",
      "forearms"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "pull-up",
      "neutral-grip"
    ],
    "alternatives": [
      "pull-up"
    ],
    "regressions": [
      "assisted-pull-up"
    ],
    "progressions": [
      "weighted-pull-up"
    ],
    "aliases": [
      "Neutral-Grip Pull-Up",
      "neutral-grip-pull-up"
    ],
    "yt": "Neutral-Grip Pull-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Start from active shoulders and pull the chest up.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "negative-pull-up",
    "name": "Negative Pull-Up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bar"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "pull",
      "strength"
    ],
    "muscles": [
      "lats",
      "biceps",
      "lower-traps",
      "forearms",
      "rhomboids"
    ],
    "primaryMuscles": [
      "lats",
      "biceps",
      "lower-traps"
    ],
    "secondaryMuscles": [
      "forearms",
      "rhomboids"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "eccentric",
      "pull-up"
    ],
    "alternatives": [
      "assisted-pull-up"
    ],
    "regressions": [
      "scapular-pull-up"
    ],
    "progressions": [
      "pull-up"
    ],
    "aliases": [
      "Negative Pull-Up",
      "negative-pull-up"
    ],
    "yt": "Negative Pull-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Step to the top, lower slowly, and stop before elbows complain.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dead-hang",
    "name": "Dead Hang",
    "family": "vertical-pull",
    "movement": "hang",
    "equipment": [
      "bar"
    ],
    "styles": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "mobility",
      "grip"
    ],
    "muscles": [
      "grip",
      "forearms",
      "lats",
      "shoulder-capsule"
    ],
    "primaryMuscles": [
      "grip",
      "forearms"
    ],
    "secondaryMuscles": [
      "lats",
      "shoulder-capsule"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "elbow-tendon-pain"
    ],
    "tags": [
      "hang",
      "grip"
    ],
    "alternatives": [
      "scapular-pull-up"
    ],
    "regressions": [],
    "progressions": [
      "scapular-pull-up"
    ],
    "aliases": [
      "Dead Hang",
      "dead-hang"
    ],
    "yt": "Dead Hang exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "mobility"
    ],
    "styleBias": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hang within comfortable shoulder range and breathe steadily.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "scapular-wall-slide",
    "name": "Scapular Wall Slide",
    "family": "vertical-push",
    "movement": "scapular-control",
    "equipment": [
      "bw",
      "wall"
    ],
    "styles": [
      "rebuild-recovery",
      "mobility"
    ],
    "purposes": [
      "recovery",
      "mobility"
    ],
    "muscles": [
      "lower-traps",
      "serratus-anterior",
      "rotator-cuff",
      "rear-delts"
    ],
    "primaryMuscles": [
      "lower-traps",
      "serratus-anterior",
      "rotator-cuff"
    ],
    "secondaryMuscles": [
      "rear-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "shoulder-control",
      "wall"
    ],
    "alternatives": [
      "face-pull"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Scapular Wall Slide",
      "scapular-wall-slide"
    ],
    "yt": "Scapular Wall Slide exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "mobility"
    ],
    "styleBias": [
      "rebuild-recovery",
      "mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep ribs down and slide arms without forcing range.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-face-pull-to-external-rotation",
    "name": "Band Face Pull to External Rotation",
    "family": "horizontal-pull",
    "movement": "scapular-control",
    "equipment": [
      "band"
    ],
    "styles": [
      "rebuild-recovery",
      "hypertrophy"
    ],
    "purposes": [
      "pull",
      "recovery"
    ],
    "muscles": [
      "rear-delts",
      "rotator-cuff",
      "lower-traps",
      "rhomboids",
      "mid-traps"
    ],
    "primaryMuscles": [
      "rear-delts",
      "rotator-cuff",
      "lower-traps"
    ],
    "secondaryMuscles": [
      "rhomboids",
      "mid-traps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "rear-delts",
      "rotator-cuff"
    ],
    "alternatives": [
      "face-pull"
    ],
    "regressions": [
      "bandrow"
    ],
    "progressions": [],
    "aliases": [
      "Band Face Pull to External Rotation",
      "band-face-pull-to-external-rotation"
    ],
    "yt": "Band Face Pull to External Rotation exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab",
      "hypertrophy"
    ],
    "styleBias": [
      "rebuild-recovery",
      "hypertrophy"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull towards the face, rotate gently, and keep shoulders low.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "prone-cobra-hold",
    "name": "Prone Cobra Hold",
    "family": "mobility-recovery",
    "movement": "scapular-control",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery",
      "mobility"
    ],
    "purposes": [
      "recovery",
      "posture"
    ],
    "muscles": [
      "lower-traps",
      "spinal-erectors",
      "rear-delts",
      "glutes"
    ],
    "primaryMuscles": [
      "lower-traps",
      "spinal-erectors",
      "rear-delts"
    ],
    "secondaryMuscles": [
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "neck-pain"
    ],
    "tags": [
      "posture",
      "extension"
    ],
    "alternatives": [
      "prone-wt-lifts"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Prone Cobra Hold",
      "prone-cobra-hold"
    ],
    "yt": "Prone Cobra Hold exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "mobility"
    ],
    "styleBias": [
      "rebuild-recovery",
      "mobility"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lift gently, thumbs out, neck long, and avoid pinching the lower back.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-shoulder-press",
    "name": "Dumbbell Shoulder Press",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "strength"
    ],
    "muscles": [
      "front-delts",
      "side-delts",
      "triceps",
      "upper-chest",
      "core"
    ],
    "primaryMuscles": [
      "front-delts",
      "side-delts",
      "triceps"
    ],
    "secondaryMuscles": [
      "upper-chest",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "dumbbell",
      "shoulder-press"
    ],
    "alternatives": [
      "pike-push-up"
    ],
    "regressions": [
      "band-overhead-press"
    ],
    "progressions": [
      "arnold-press"
    ],
    "aliases": [
      "Dumbbell Shoulder Press",
      "dumbbell-shoulder-press"
    ],
    "yt": "Dumbbell Shoulder Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Brace ribs down and press overhead without leaning back.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "seated-dumbbell-shoulder-press",
    "name": "Seated Dumbbell Shoulder Press",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "front-delts",
      "side-delts",
      "triceps",
      "upper-chest"
    ],
    "primaryMuscles": [
      "front-delts",
      "side-delts",
      "triceps"
    ],
    "secondaryMuscles": [
      "upper-chest"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "seated",
      "shoulder-press"
    ],
    "alternatives": [
      "dumbbell-shoulder-press"
    ],
    "regressions": [
      "band-overhead-press"
    ],
    "progressions": [],
    "aliases": [
      "Seated Dumbbell Shoulder Press",
      "seated-dumbbell-shoulder-press"
    ],
    "yt": "Seated Dumbbell Shoulder Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use the bench for support and keep the press smooth.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "arnold-press",
    "name": "Arnold Press",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "front-delts",
      "side-delts",
      "triceps",
      "rotator-cuff"
    ],
    "primaryMuscles": [
      "front-delts",
      "side-delts"
    ],
    "secondaryMuscles": [
      "triceps",
      "rotator-cuff"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "shoulders",
      "rotation"
    ],
    "alternatives": [
      "dumbbell-shoulder-press"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Arnold Press",
      "arnold-press"
    ],
    "yt": "Arnold Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Rotate only through comfortable range and keep the load controlled.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-lateral-raise",
    "name": "Dumbbell Lateral Raise",
    "family": "vertical-push",
    "movement": "shoulder-abduction",
    "equipment": [
      "db"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "side-delts",
      "upper-traps",
      "rotator-cuff"
    ],
    "primaryMuscles": [
      "side-delts"
    ],
    "secondaryMuscles": [
      "upper-traps",
      "rotator-cuff"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "side-delts",
      "isolation"
    ],
    "alternatives": [
      "band-lateral-raise"
    ],
    "regressions": [],
    "progressions": [
      "lean-away-lateral-raise"
    ],
    "aliases": [
      "Dumbbell Lateral Raise",
      "dumbbell-lateral-raise"
    ],
    "yt": "Dumbbell Lateral Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lead with elbows slightly bent and stop before shrugging takes over.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "lean-away-lateral-raise",
    "name": "Lean-Away Lateral Raise",
    "family": "vertical-push",
    "movement": "shoulder-abduction",
    "equipment": [
      "db",
      "anchor"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "side-delts",
      "rotator-cuff"
    ],
    "primaryMuscles": [
      "side-delts"
    ],
    "secondaryMuscles": [
      "rotator-cuff"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "side-delts",
      "lengthened"
    ],
    "alternatives": [
      "dumbbell-lateral-raise"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Lean-Away Lateral Raise",
      "lean-away-lateral-raise"
    ],
    "yt": "Lean-Away Lateral Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lean slightly away to load the side delt early.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-lateral-raise",
    "name": "Band Lateral Raise",
    "family": "vertical-push",
    "movement": "shoulder-abduction",
    "equipment": [
      "band"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "side-delts",
      "rotator-cuff"
    ],
    "primaryMuscles": [
      "side-delts"
    ],
    "secondaryMuscles": [
      "rotator-cuff"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "side-delts"
    ],
    "alternatives": [
      "dumbbell-lateral-raise"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Lateral Raise",
      "band-lateral-raise"
    ],
    "yt": "Band Lateral Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use light tension and raise only as high as the shoulder stays relaxed.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-rear-delt-fly",
    "name": "Dumbbell Rear Delt Fly",
    "family": "horizontal-pull",
    "movement": "shoulder-horizontal-abduction",
    "equipment": [
      "db"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "pull",
      "hypertrophy"
    ],
    "muscles": [
      "rear-delts",
      "rhomboids",
      "mid-traps"
    ],
    "primaryMuscles": [
      "rear-delts"
    ],
    "secondaryMuscles": [
      "rhomboids",
      "mid-traps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "rear-delts"
    ],
    "alternatives": [
      "band-pull-apart"
    ],
    "regressions": [
      "face-pull"
    ],
    "progressions": [
      "chest-supported-rear-delt-fly"
    ],
    "aliases": [
      "Dumbbell Rear Delt Fly",
      "dumbbell-rear-delt-fly"
    ],
    "yt": "Dumbbell Rear Delt Fly exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move wide and keep traps from taking over.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "chest-supported-rear-delt-fly",
    "name": "Chest-Supported Rear Delt Fly",
    "family": "horizontal-pull",
    "movement": "shoulder-horizontal-abduction",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "pull",
      "hypertrophy"
    ],
    "muscles": [
      "rear-delts",
      "rhomboids",
      "mid-traps"
    ],
    "primaryMuscles": [
      "rear-delts"
    ],
    "secondaryMuscles": [
      "rhomboids",
      "mid-traps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "rear-delts",
      "supported"
    ],
    "alternatives": [
      "dumbbell-rear-delt-fly"
    ],
    "regressions": [
      "face-pull"
    ],
    "progressions": [],
    "aliases": [
      "Chest-Supported Rear Delt Fly",
      "chest-supported-rear-delt-fly"
    ],
    "yt": "Chest-Supported Rear Delt Fly exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Let the bench support you so the rear delts work.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-pull-apart",
    "name": "Band Pull-Apart",
    "family": "horizontal-pull",
    "movement": "scapular-retraction",
    "equipment": [
      "band"
    ],
    "styles": [
      "rebuild-recovery",
      "hypertrophy"
    ],
    "purposes": [
      "pull",
      "recovery"
    ],
    "muscles": [
      "rear-delts",
      "rhomboids",
      "mid-traps",
      "rotator-cuff"
    ],
    "primaryMuscles": [
      "rear-delts",
      "rhomboids",
      "mid-traps"
    ],
    "secondaryMuscles": [
      "rotator-cuff"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "posture",
      "band"
    ],
    "alternatives": [
      "face-pull"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Pull-Apart",
      "band-pull-apart"
    ],
    "yt": "Band Pull-Apart exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab"
    ],
    "styleBias": [
      "rebuild-recovery",
      "hypertrophy"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull the band apart at chest height and keep ribs quiet.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-external-rotation",
    "name": "Band External Rotation",
    "family": "mobility-recovery",
    "movement": "external-rotation",
    "equipment": [
      "band"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "recovery",
      "mobility"
    ],
    "muscles": [
      "rotator-cuff",
      "rear-delts"
    ],
    "primaryMuscles": [
      "rotator-cuff"
    ],
    "secondaryMuscles": [
      "rear-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "rotator-cuff"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band External Rotation",
      "band-external-rotation"
    ],
    "yt": "Band External Rotation exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep elbow tucked and rotate slowly.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "incline-dumbbell-curl",
    "name": "Incline Dumbbell Curl",
    "family": "arms",
    "movement": "elbow-flexion",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "biceps-long-head",
      "brachialis",
      "forearms"
    ],
    "primaryMuscles": [
      "biceps-long-head"
    ],
    "secondaryMuscles": [
      "brachialis",
      "forearms"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "biceps",
      "lengthened"
    ],
    "alternatives": [
      "dumbbell-curl"
    ],
    "regressions": [
      "band-curl"
    ],
    "progressions": [],
    "aliases": [
      "Incline Dumbbell Curl",
      "incline-dumbbell-curl"
    ],
    "yt": "Incline Dumbbell Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Let the arm hang behind the body and curl without shoulder drift.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-curl",
    "name": "Dumbbell Curl",
    "family": "arms",
    "movement": "elbow-flexion",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "biceps",
      "brachialis",
      "forearms"
    ],
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "brachialis",
      "forearms"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "outer-biceps-left-pain"
    ],
    "tags": [
      "biceps"
    ],
    "alternatives": [
      "hammer-curl"
    ],
    "regressions": [
      "band-curl"
    ],
    "progressions": [
      "incline-dumbbell-curl"
    ],
    "aliases": [
      "Dumbbell Curl",
      "dumbbell-curl"
    ],
    "yt": "Dumbbell Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep elbows still and curl without swinging.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "cross-body-hammer-curl",
    "name": "Cross-Body Hammer Curl",
    "family": "arms",
    "movement": "elbow-flexion",
    "equipment": [
      "db"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "brachialis",
      "brachioradialis",
      "biceps",
      "forearms"
    ],
    "primaryMuscles": [
      "brachialis",
      "brachioradialis"
    ],
    "secondaryMuscles": [
      "biceps",
      "forearms"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain"
    ],
    "tags": [
      "hammer-curl",
      "forearms"
    ],
    "alternatives": [
      "hammer-curl"
    ],
    "regressions": [
      "band-curl"
    ],
    "progressions": [],
    "aliases": [
      "Cross-Body Hammer Curl",
      "cross-body-hammer-curl"
    ],
    "yt": "Cross-Body Hammer Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Curl across the body with a neutral wrist.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "zottman-curl",
    "name": "Zottman Curl",
    "family": "arms",
    "movement": "elbow-flexion-pronation",
    "equipment": [
      "db"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "biceps",
      "brachioradialis",
      "forearms"
    ],
    "primaryMuscles": [
      "biceps",
      "brachioradialis"
    ],
    "secondaryMuscles": [
      "forearms"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "wrist-pain"
    ],
    "tags": [
      "biceps",
      "forearms"
    ],
    "alternatives": [
      "dumbbell-curl"
    ],
    "regressions": [
      "hammer-curl"
    ],
    "progressions": [],
    "aliases": [
      "Zottman Curl",
      "zottman-curl"
    ],
    "yt": "Zottman Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Curl palms up, rotate at the top, and lower slowly palms down.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "overhead-dumbbell-triceps-extension",
    "name": "Overhead Dumbbell Triceps Extension",
    "family": "arms",
    "movement": "elbow-extension",
    "equipment": [
      "db"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "triceps-long-head",
      "triceps-medial-head",
      "core"
    ],
    "primaryMuscles": [
      "triceps-long-head"
    ],
    "secondaryMuscles": [
      "triceps-medial-head",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "triceps",
      "long-head"
    ],
    "alternatives": [
      "band-overhead-triceps-extension"
    ],
    "regressions": [
      "rope-pushdown"
    ],
    "progressions": [],
    "aliases": [
      "Overhead Dumbbell Triceps Extension",
      "overhead-dumbbell-triceps-extension"
    ],
    "yt": "Overhead Dumbbell Triceps Extension exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep ribs down and elbows comfortable.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-overhead-triceps-extension",
    "name": "Band Overhead Triceps Extension",
    "family": "arms",
    "movement": "elbow-extension",
    "equipment": [
      "band"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "triceps-long-head",
      "triceps-medial-head"
    ],
    "primaryMuscles": [
      "triceps-long-head"
    ],
    "secondaryMuscles": [
      "triceps-medial-head"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "triceps"
    ],
    "alternatives": [
      "overhead-dumbbell-triceps-extension"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Overhead Triceps Extension",
      "band-overhead-triceps-extension"
    ],
    "yt": "Band Overhead Triceps Extension exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use smooth band tension and keep elbows from flaring painfully.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-skull-crusher",
    "name": "Dumbbell Skull Crusher",
    "family": "arms",
    "movement": "elbow-extension",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "triceps-long-head",
      "triceps-lateral-head",
      "triceps-medial-head"
    ],
    "primaryMuscles": [
      "triceps-long-head",
      "triceps-lateral-head"
    ],
    "secondaryMuscles": [
      "triceps-medial-head"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain"
    ],
    "tags": [
      "triceps"
    ],
    "alternatives": [
      "overhead-dumbbell-triceps-extension"
    ],
    "regressions": [
      "band-triceps-pressdown"
    ],
    "progressions": [],
    "aliases": [
      "Dumbbell Skull Crusher",
      "dumbbell-skull-crusher"
    ],
    "yt": "Dumbbell Skull Crusher exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lower towards the sides of the head and keep elbows steady.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "close-grip-dumbbell-floor-press",
    "name": "Close-Grip Dumbbell Floor Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "strength",
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "arms",
      "strength"
    ],
    "muscles": [
      "triceps",
      "mid-chest",
      "front-delts"
    ],
    "primaryMuscles": [
      "triceps",
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "triceps",
      "floor-press"
    ],
    "alternatives": [
      "dumbbell-floor-press"
    ],
    "regressions": [
      "pushup"
    ],
    "progressions": [],
    "aliases": [
      "Close-Grip Dumbbell Floor Press",
      "close-grip-dumbbell-floor-press"
    ],
    "yt": "Close-Grip Dumbbell Floor Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "strength",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep elbows closer than a normal press and use the floor to limit shoulder stress.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "farmer-carry",
    "name": "Farmer Carry",
    "family": "carry-grip",
    "movement": "loaded-carry",
    "equipment": [
      "db",
      "kb"
    ],
    "styles": [
      "mixed",
      "operational-fitness",
      "strength"
    ],
    "purposes": [
      "grip",
      "conditioning",
      "strength"
    ],
    "muscles": [
      "grip",
      "forearms",
      "traps",
      "core",
      "glutes",
      "calves"
    ],
    "primaryMuscles": [
      "grip",
      "forearms",
      "traps"
    ],
    "secondaryMuscles": [
      "core",
      "glutes",
      "calves"
    ],
    "difficulty": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "knee-pain"
    ],
    "tags": [
      "carry",
      "grip",
      "work-capacity"
    ],
    "alternatives": [
      "suitcase-carry"
    ],
    "regressions": [
      "isometric-grip-light"
    ],
    "progressions": [
      "heavy-farmer-carry"
    ],
    "aliases": [
      "Farmer Carry",
      "farmer-carry"
    ],
    "yt": "Farmer Carry exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "strength",
      "conditioning"
    ],
    "styleBias": [
      "mixed",
      "operational-fitness",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Stand tall, ribs stacked, walk with quiet steps.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "suitcase-carry",
    "name": "Suitcase Carry",
    "family": "carry-grip",
    "movement": "loaded-carry",
    "equipment": [
      "db",
      "kb"
    ],
    "styles": [
      "mixed",
      "operational-fitness",
      "rebuild-recovery"
    ],
    "purposes": [
      "grip",
      "core",
      "conditioning"
    ],
    "muscles": [
      "obliques",
      "grip",
      "forearms",
      "glute-med",
      "traps"
    ],
    "primaryMuscles": [
      "obliques",
      "grip",
      "forearms"
    ],
    "secondaryMuscles": [
      "glute-med",
      "traps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "carry",
      "anti-lateral-flexion"
    ],
    "alternatives": [
      "farmer-carry"
    ],
    "regressions": [
      "isometric-grip-light"
    ],
    "progressions": [
      "farmer-carry"
    ],
    "aliases": [
      "Suitcase Carry",
      "suitcase-carry"
    ],
    "yt": "Suitcase Carry exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "core",
      "conditioning"
    ],
    "styleBias": [
      "mixed",
      "operational-fitness",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Carry one side only and resist leaning.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "front-rack-carry",
    "name": "Front Rack Carry",
    "family": "carry-grip",
    "movement": "loaded-carry",
    "equipment": [
      "db",
      "kb"
    ],
    "styles": [
      "operational-fitness",
      "strength"
    ],
    "purposes": [
      "grip",
      "core",
      "conditioning"
    ],
    "muscles": [
      "upper-back",
      "core",
      "grip",
      "quads",
      "glutes"
    ],
    "primaryMuscles": [
      "upper-back",
      "core",
      "grip"
    ],
    "secondaryMuscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "carry",
      "front-rack"
    ],
    "alternatives": [
      "farmer-carry"
    ],
    "regressions": [
      "suitcase-carry"
    ],
    "progressions": [],
    "aliases": [
      "Front Rack Carry",
      "front-rack-carry"
    ],
    "yt": "Front Rack Carry exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "strength"
    ],
    "styleBias": [
      "operational-fitness",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hold the load high and breathe behind the brace.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-romanian-deadlift",
    "name": "Dumbbell Romanian Deadlift",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "purposes": [
      "legs",
      "strength"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "spinal-erectors",
      "lats",
      "grip"
    ],
    "primaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "secondaryMuscles": [
      "spinal-erectors",
      "lats",
      "grip"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hamstring-pain"
    ],
    "tags": [
      "hinge",
      "posterior-chain"
    ],
    "alternatives": [
      "glute-bridge"
    ],
    "regressions": [
      "hip-hinge-drill"
    ],
    "progressions": [
      "single-leg-rdl"
    ],
    "aliases": [
      "Dumbbell Romanian Deadlift",
      "dumbbell-romanian-deadlift"
    ],
    "yt": "Dumbbell Romanian Deadlift exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Push hips back, keep the weights close, and stop when hamstrings limit range.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "single-leg-romanian-deadlift",
    "name": "Single-Leg Romanian Deadlift",
    "family": "hinge",
    "movement": "single-leg-hinge",
    "equipment": [
      "db",
      "bw"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "balance"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "glute-med",
      "foot-intrinsics",
      "core"
    ],
    "primaryMuscles": [
      "hamstrings",
      "glutes",
      "glute-med"
    ],
    "secondaryMuscles": [
      "foot-intrinsics",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "single-leg",
      "balance"
    ],
    "alternatives": [
      "dumbbell-romanian-deadlift"
    ],
    "regressions": [
      "kickstand-rdl"
    ],
    "progressions": [],
    "aliases": [
      "Single-Leg Romanian Deadlift",
      "single-leg-romanian-deadlift"
    ],
    "yt": "Single-Leg Romanian Deadlift exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Reach one leg back like a counterweight and keep hips square.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "kickstand-romanian-deadlift",
    "name": "Kickstand Romanian Deadlift",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "strength"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "spinal-erectors",
      "core"
    ],
    "primaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "secondaryMuscles": [
      "spinal-erectors",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hamstring-pain"
    ],
    "tags": [
      "hinge",
      "single-leg-regression"
    ],
    "alternatives": [
      "dumbbell-romanian-deadlift"
    ],
    "regressions": [
      "glute-bridge"
    ],
    "progressions": [
      "single-leg-romanian-deadlift"
    ],
    "aliases": [
      "Kickstand Romanian Deadlift",
      "kickstand-romanian-deadlift"
    ],
    "yt": "Kickstand Romanian Deadlift exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use the back foot lightly while the front hip does most work.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dumbbell-hip-thrust",
    "name": "Dumbbell Hip Thrust",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "legs",
      "hypertrophy"
    ],
    "muscles": [
      "glutes",
      "hamstrings",
      "core"
    ],
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "hamstrings",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "glutes"
    ],
    "alternatives": [
      "glute-bridge"
    ],
    "regressions": [
      "bodyweight-hip-thrust"
    ],
    "progressions": [
      "single-leg-hip-thrust"
    ],
    "aliases": [
      "Dumbbell Hip Thrust",
      "dumbbell-hip-thrust"
    ],
    "yt": "Dumbbell Hip Thrust exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Tuck ribs down, drive through heels, and finish with glutes.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "single-leg-hip-thrust",
    "name": "Single-Leg Hip Thrust",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw",
      "bench",
      "db"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "legs",
      "hypertrophy"
    ],
    "muscles": [
      "glutes",
      "hamstrings",
      "glute-med",
      "core"
    ],
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "hamstrings",
      "glute-med",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "glutes",
      "single-leg"
    ],
    "alternatives": [
      "dumbbell-hip-thrust"
    ],
    "regressions": [
      "glute-bridge"
    ],
    "progressions": [],
    "aliases": [
      "Single-Leg Hip Thrust",
      "single-leg-hip-thrust"
    ],
    "yt": "Single-Leg Hip Thrust exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "calisthenics"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep pelvis level and stop if hamstrings cramp before glutes engage.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "bulgarian-split-squat",
    "name": "Bulgarian Split Squat",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "purposes": [
      "legs",
      "strength"
    ],
    "muscles": [
      "quads",
      "glutes",
      "adductors",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "calves",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "split-squat",
      "quads",
      "glutes"
    ],
    "alternatives": [
      "split-squat"
    ],
    "regressions": [
      "sit-to-stand"
    ],
    "progressions": [
      "front-foot-elevated-split-squat"
    ],
    "aliases": [
      "Bulgarian Split Squat",
      "bulgarian-split-squat"
    ],
    "yt": "Bulgarian Split Squat exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "mixed",
      "strength",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a stance that lets the front knee track cleanly.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "front-foot-elevated-split-squat",
    "name": "Front-Foot Elevated Split Squat",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "db",
      "step"
    ],
    "styles": [
      "hypertrophy",
      "strength"
    ],
    "purposes": [
      "legs",
      "hypertrophy"
    ],
    "muscles": [
      "quads",
      "glutes",
      "adductors",
      "calves"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "calves"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "quads",
      "deep-knee-flexion"
    ],
    "alternatives": [
      "bulgarian-split-squat"
    ],
    "regressions": [
      "split-squat"
    ],
    "progressions": [],
    "aliases": [
      "Front-Foot Elevated Split Squat",
      "front-foot-elevated-split-squat"
    ],
    "yt": "Front-Foot Elevated Split Squat exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "strength"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Elevate the front foot slightly and control depth.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "reverse-lunge",
    "name": "Reverse Lunge",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "db",
      "bw"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "strength"
    ],
    "muscles": [
      "glutes",
      "quads",
      "hamstrings",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "glutes",
      "quads"
    ],
    "secondaryMuscles": [
      "hamstrings",
      "calves",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "lunge",
      "knee-friendly"
    ],
    "alternatives": [
      "split-squat"
    ],
    "regressions": [
      "sit-to-stand"
    ],
    "progressions": [
      "walking-lunge"
    ],
    "aliases": [
      "Reverse Lunge",
      "reverse-lunge"
    ],
    "yt": "Reverse Lunge exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Step back softly and drive through the front foot.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "walking-lunge",
    "name": "Walking Lunge",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "db",
      "bw"
    ],
    "styles": [
      "mixed",
      "conditioning"
    ],
    "purposes": [
      "legs",
      "conditioning"
    ],
    "muscles": [
      "quads",
      "glutes",
      "adductors",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "calves",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "lunge",
      "conditioning"
    ],
    "alternatives": [
      "reverse-lunge"
    ],
    "regressions": [
      "split-squat"
    ],
    "progressions": [],
    "aliases": [
      "Walking Lunge",
      "walking-lunge"
    ],
    "yt": "Walking Lunge exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "conditioning"
    ],
    "styleBias": [
      "mixed",
      "conditioning"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use smooth steps and avoid collapsing into the front knee.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "step-up",
    "name": "Step-Up",
    "family": "lunge-split",
    "movement": "step-up",
    "equipment": [
      "db",
      "bench",
      "step"
    ],
    "styles": [
      "mixed",
      "operational-fitness",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "conditioning"
    ],
    "muscles": [
      "quads",
      "glutes",
      "calves",
      "core",
      "glute-med"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core",
      "glute-med"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "stairs",
      "step-up"
    ],
    "alternatives": [
      "box-squat"
    ],
    "regressions": [
      "sit-to-stand"
    ],
    "progressions": [
      "weighted-step-up"
    ],
    "aliases": [
      "Step-Up",
      "step-up"
    ],
    "yt": "Step-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "rehab",
      "conditioning"
    ],
    "styleBias": [
      "mixed",
      "operational-fitness",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Place the whole foot on the step and drive up without bouncing.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "weighted-step-up",
    "name": "Weighted Step-Up",
    "family": "lunge-split",
    "movement": "step-up",
    "equipment": [
      "db",
      "step",
      "bench"
    ],
    "styles": [
      "operational-fitness",
      "strength"
    ],
    "purposes": [
      "legs",
      "conditioning",
      "strength"
    ],
    "muscles": [
      "quads",
      "glutes",
      "calves",
      "core",
      "grip"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core",
      "grip"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "low-back-non-specific"
    ],
    "tags": [
      "stairs",
      "firefighter",
      "operational"
    ],
    "alternatives": [
      "step-up"
    ],
    "regressions": [
      "box-squat"
    ],
    "progressions": [
      "front-rack-step-up"
    ],
    "aliases": [
      "Weighted Step-Up",
      "weighted-step-up"
    ],
    "yt": "Weighted Step-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "strength"
    ],
    "styleBias": [
      "operational-fitness",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the step height sensible and train repeatable climbs.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "goblet-cyclist-squat",
    "name": "Goblet Cyclist Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "db",
      "wedge"
    ],
    "styles": [
      "hypertrophy",
      "strength"
    ],
    "purposes": [
      "legs",
      "hypertrophy"
    ],
    "muscles": [
      "quads",
      "vmo",
      "glutes",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "quads",
      "vmo"
    ],
    "secondaryMuscles": [
      "glutes",
      "calves",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "quads",
      "vmo",
      "heels-elevated"
    ],
    "alternatives": [
      "goblet-squat"
    ],
    "regressions": [
      "box-squat"
    ],
    "progressions": [],
    "aliases": [
      "Goblet Cyclist Squat",
      "goblet-cyclist-squat"
    ],
    "yt": "Goblet Cyclist Squat exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "strength"
    ],
    "jointStress": 4,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Heels elevated, torso tall, knees track over toes without pain.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "spanish-squat-isometric",
    "name": "Spanish Squat Isometric",
    "family": "squat",
    "movement": "squat-isometric",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "quads",
      "vmo",
      "patellar-tendon"
    ],
    "primaryMuscles": [
      "quads",
      "vmo"
    ],
    "secondaryMuscles": [
      "patellar-tendon"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "knee-rehab",
      "isometric"
    ],
    "alternatives": [
      "wall-sit"
    ],
    "regressions": [
      "sit-to-stand"
    ],
    "progressions": [],
    "aliases": [
      "Spanish Squat Isometric",
      "spanish-squat-isometric"
    ],
    "yt": "Spanish Squat Isometric exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Sit back into the band and hold a pain-calming quad contraction.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "wall-sit-2",
    "name": "Wall Sit",
    "family": "squat",
    "movement": "squat-isometric",
    "equipment": [
      "bw",
      "wall"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "conditioning"
    ],
    "muscles": [
      "quads",
      "glutes",
      "calves"
    ],
    "primaryMuscles": [
      "quads"
    ],
    "secondaryMuscles": [
      "glutes",
      "calves"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "isometric",
      "quads"
    ],
    "alternatives": [
      "spanish-squat-isometric"
    ],
    "regressions": [
      "sit-to-stand"
    ],
    "progressions": [],
    "aliases": [
      "Wall Sit",
      "wall-sit",
      "wall-sit-2"
    ],
    "yt": "Wall Sit exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hold a comfortable knee angle and breathe steadily.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "standing-calf-raise",
    "name": "Standing Calf Raise",
    "family": "calf-ankle",
    "movement": "ankle-plantarflexion",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "mixed",
      "running",
      "hypertrophy"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "calves",
      "gastrocnemius",
      "foot-intrinsics"
    ],
    "primaryMuscles": [
      "calves",
      "gastrocnemius"
    ],
    "secondaryMuscles": [
      "foot-intrinsics"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "achilles-pain",
      "plantar-fascia"
    ],
    "tags": [
      "calves"
    ],
    "alternatives": [
      "seated-calf-raise"
    ],
    "regressions": [],
    "progressions": [
      "single-leg-calf-raise"
    ],
    "aliases": [
      "Standing Calf Raise",
      "standing-calf-raise"
    ],
    "yt": "Standing Calf Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "running",
      "rehab",
      "hypertrophy"
    ],
    "styleBias": [
      "mixed",
      "running",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Rise tall through the big toe line and lower under control.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "seated-calf-raise",
    "name": "Seated Calf Raise",
    "family": "calf-ankle",
    "movement": "ankle-plantarflexion",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "soleus",
      "calves",
      "foot-intrinsics"
    ],
    "primaryMuscles": [
      "soleus"
    ],
    "secondaryMuscles": [
      "calves",
      "foot-intrinsics"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "achilles-pain",
      "plantar-fascia"
    ],
    "tags": [
      "soleus",
      "calf"
    ],
    "alternatives": [
      "standing-calf-raise"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Seated Calf Raise",
      "seated-calf-raise"
    ],
    "yt": "Seated Calf Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep knees bent, load the thighs, and move slowly through the ankle.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "single-leg-calf-raise",
    "name": "Single-Leg Calf Raise",
    "family": "calf-ankle",
    "movement": "ankle-plantarflexion",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "running",
      "hypertrophy"
    ],
    "purposes": [
      "legs",
      "strength"
    ],
    "muscles": [
      "calves",
      "gastrocnemius",
      "foot-intrinsics",
      "balance"
    ],
    "primaryMuscles": [
      "calves",
      "gastrocnemius"
    ],
    "secondaryMuscles": [
      "foot-intrinsics",
      "balance"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "achilles-pain",
      "plantar-fascia"
    ],
    "tags": [
      "calves",
      "single-leg"
    ],
    "alternatives": [
      "standing-calf-raise"
    ],
    "regressions": [
      "seated-calf-raise"
    ],
    "progressions": [],
    "aliases": [
      "Single-Leg Calf Raise",
      "single-leg-calf-raise"
    ],
    "yt": "Single-Leg Calf Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "running",
      "hypertrophy"
    ],
    "styleBias": [
      "running",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a wall for balance and keep every rep controlled.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "tibialis-raise",
    "name": "Tibialis Raise",
    "family": "calf-ankle",
    "movement": "ankle-dorsiflexion",
    "equipment": [
      "bw",
      "wall"
    ],
    "styles": [
      "running",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "tibialis-anterior",
      "ankle-stabilisers"
    ],
    "primaryMuscles": [
      "tibialis-anterior"
    ],
    "secondaryMuscles": [
      "ankle-stabilisers"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shin-splints"
    ],
    "tags": [
      "tibialis",
      "shin"
    ],
    "alternatives": [
      "heel-walk"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Tibialis Raise",
      "tibialis-raise"
    ],
    "yt": "Tibialis Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "running",
      "rehab"
    ],
    "styleBias": [
      "running",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lean against a wall and lift toes towards shins.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "copenhagen-side-plank-short-lever",
    "name": "Copenhagen Side Plank Short Lever",
    "family": "core-anti-rotation",
    "movement": "adduction-core",
    "equipment": [
      "bench",
      "bw"
    ],
    "styles": [
      "strength",
      "rebuild-recovery"
    ],
    "purposes": [
      "core",
      "legs"
    ],
    "muscles": [
      "adductors",
      "obliques",
      "glute-med",
      "shoulder-stabilisers"
    ],
    "primaryMuscles": [
      "adductors",
      "obliques"
    ],
    "secondaryMuscles": [
      "glute-med",
      "shoulder-stabilisers"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "groin-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "adductors",
      "core"
    ],
    "alternatives": [
      "sidepl"
    ],
    "regressions": [
      "side-plank"
    ],
    "progressions": [
      "copenhagen-side-plank-long-lever"
    ],
    "aliases": [
      "Copenhagen Side Plank Short Lever",
      "copenhagen-side-plank-short-lever"
    ],
    "yt": "Copenhagen Side Plank Short Lever exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "strength",
      "rehab"
    ],
    "styleBias": [
      "strength",
      "rebuild-recovery"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use the knee on the bench first and keep hips stacked.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "plank-shoulder-tap",
    "name": "Plank Shoulder Tap",
    "family": "core-anti-rotation",
    "movement": "anti-rotation",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "mixed"
    ],
    "purposes": [
      "core",
      "strength"
    ],
    "muscles": [
      "transverse-abdominis",
      "obliques",
      "serratus-anterior",
      "front-delts"
    ],
    "primaryMuscles": [
      "transverse-abdominis",
      "obliques"
    ],
    "secondaryMuscles": [
      "serratus-anterior",
      "front-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "anti-rotation",
      "plank"
    ],
    "alternatives": [
      "long-stretch-plank"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [],
    "aliases": [
      "Plank Shoulder Tap",
      "plank-shoulder-tap"
    ],
    "yt": "Plank Shoulder Tap exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "core"
    ],
    "styleBias": [
      "calisthenics",
      "mixed"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Tap slowly without rocking the hips.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "rkc-plank",
    "name": "RKC Plank",
    "family": "core-anti-extension",
    "movement": "anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "strength",
      "calisthenics"
    ],
    "purposes": [
      "core",
      "strength"
    ],
    "muscles": [
      "rectus-abdominis",
      "transverse-abdominis",
      "glutes",
      "lats"
    ],
    "primaryMuscles": [
      "rectus-abdominis",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "glutes",
      "lats"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "plank",
      "high-tension"
    ],
    "alternatives": [
      "long-stretch-plank"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [],
    "aliases": [
      "RKC Plank",
      "rkc-plank"
    ],
    "yt": "RKC Plank exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "core"
    ],
    "styleBias": [
      "strength",
      "calisthenics"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Crush elbows to toes, squeeze glutes, and keep the hold short.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "dead-bug-pullover",
    "name": "Dead Bug Pullover",
    "family": "core-anti-extension",
    "movement": "anti-extension",
    "equipment": [
      "db"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "core",
      "recovery"
    ],
    "muscles": [
      "transverse-abdominis",
      "rectus-abdominis",
      "lats",
      "hip-flexors"
    ],
    "primaryMuscles": [
      "transverse-abdominis",
      "rectus-abdominis"
    ],
    "secondaryMuscles": [
      "lats",
      "hip-flexors"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "dead-bug",
      "pullover"
    ],
    "alternatives": [
      "dead-bug"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dead Bug Pullover",
      "dead-bug-pullover"
    ],
    "yt": "Dead Bug Pullover exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "core"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep the back heavy into the floor while the arms move slowly.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "pallof-press",
    "name": "Pallof Press",
    "family": "core-anti-rotation",
    "movement": "anti-rotation",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "core",
      "recovery"
    ],
    "muscles": [
      "obliques",
      "transverse-abdominis",
      "glutes",
      "shoulder-stabilisers"
    ],
    "primaryMuscles": [
      "obliques",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "glutes",
      "shoulder-stabilisers"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "anti-rotation",
      "band"
    ],
    "alternatives": [
      "sidepl"
    ],
    "regressions": [],
    "progressions": [
      "half-kneeling-pallof-press"
    ],
    "aliases": [
      "Pallof Press",
      "pallof-press"
    ],
    "yt": "Pallof Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab",
      "core"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Press the band away and resist being pulled into rotation.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "half-kneeling-pallof-press",
    "name": "Half-Kneeling Pallof Press",
    "family": "core-anti-rotation",
    "movement": "anti-rotation",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "core",
      "recovery"
    ],
    "muscles": [
      "obliques",
      "transverse-abdominis",
      "glutes",
      "hip-flexors"
    ],
    "primaryMuscles": [
      "obliques",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "glutes",
      "hip-flexors"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "anti-rotation",
      "half-kneeling"
    ],
    "alternatives": [
      "pallof-press"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Half-Kneeling Pallof Press",
      "half-kneeling-pallof-press"
    ],
    "yt": "Half-Kneeling Pallof Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab",
      "core"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Kneel tall and stay square as the band tries to twist you.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "side-plank-reach-through",
    "name": "Side Plank Reach-Through",
    "family": "core-anti-rotation",
    "movement": "rotation-control",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "mobility"
    ],
    "purposes": [
      "core",
      "mobility"
    ],
    "muscles": [
      "obliques",
      "transverse-abdominis",
      "rear-delts",
      "glute-med"
    ],
    "primaryMuscles": [
      "obliques",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "glute-med"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "obliques",
      "rotation"
    ],
    "alternatives": [
      "sidepl"
    ],
    "regressions": [
      "side-plank"
    ],
    "progressions": [],
    "aliases": [
      "Side Plank Reach-Through",
      "side-plank-reach-through"
    ],
    "yt": "Side Plank Reach-Through exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "core"
    ],
    "styleBias": [
      "calisthenics",
      "mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Rotate through the upper back, then return to a stacked side plank.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "hollow-rock",
    "name": "Hollow Rock",
    "family": "core-anti-extension",
    "movement": "anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "core",
      "strength"
    ],
    "muscles": [
      "rectus-abdominis",
      "transverse-abdominis",
      "hip-flexors"
    ],
    "primaryMuscles": [
      "rectus-abdominis",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "hip-flexors"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "hollow",
      "calisthenics"
    ],
    "alternatives": [
      "hollow-hold"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [],
    "aliases": [
      "Hollow Rock",
      "hollow-rock"
    ],
    "yt": "Hollow Rock exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "core"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Rock only if you can keep the lower back from popping up.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "reverse-crunch",
    "name": "Reverse Crunch",
    "family": "core-anti-extension",
    "movement": "spinal-flexion",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "hypertrophy"
    ],
    "purposes": [
      "core",
      "hypertrophy"
    ],
    "muscles": [
      "lower-abs",
      "rectus-abdominis",
      "hip-flexors"
    ],
    "primaryMuscles": [
      "lower-abs",
      "rectus-abdominis"
    ],
    "secondaryMuscles": [
      "hip-flexors"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "lower-abs"
    ],
    "alternatives": [
      "dead-bug"
    ],
    "regressions": [],
    "progressions": [
      "hanging-knee-raise"
    ],
    "aliases": [
      "Reverse Crunch",
      "reverse-crunch"
    ],
    "yt": "Reverse Crunch exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "core"
    ],
    "styleBias": [
      "mixed",
      "hypertrophy"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Curl the pelvis up rather than swinging the legs.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "family": "core-anti-extension",
    "movement": "hip-flexion-core",
    "equipment": [
      "bar"
    ],
    "styles": [
      "calisthenics"
    ],
    "purposes": [
      "core",
      "strength"
    ],
    "muscles": [
      "lower-abs",
      "hip-flexors",
      "grip",
      "lats"
    ],
    "primaryMuscles": [
      "lower-abs",
      "hip-flexors"
    ],
    "secondaryMuscles": [
      "grip",
      "lats"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "hanging-core"
    ],
    "alternatives": [
      "reverse-crunch"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [],
    "aliases": [
      "Hanging Knee Raise",
      "hanging-knee-raise"
    ],
    "yt": "Hanging Knee Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "core"
    ],
    "styleBias": [
      "calisthenics"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Start from active shoulders and raise knees without swinging.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "bear-crawl",
    "name": "Bear Crawl",
    "family": "conditioning",
    "movement": "locomotion",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "operational-fitness"
    ],
    "purposes": [
      "conditioning",
      "core"
    ],
    "muscles": [
      "shoulders",
      "core",
      "quads",
      "serratus-anterior",
      "hip-flexors"
    ],
    "primaryMuscles": [
      "shoulders",
      "core",
      "quads"
    ],
    "secondaryMuscles": [
      "serratus-anterior",
      "hip-flexors"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-impingement",
      "clicky-knees-painful"
    ],
    "tags": [
      "crawl",
      "operational"
    ],
    "alternatives": [
      "dead-bug"
    ],
    "regressions": [],
    "progressions": [
      "loaded-bear-crawl"
    ],
    "aliases": [
      "Bear Crawl",
      "bear-crawl"
    ],
    "yt": "Bear Crawl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "operational",
      "conditioning"
    ],
    "styleBias": [
      "calisthenics",
      "operational-fitness"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move opposite hand and foot while keeping knees low and hips quiet.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "low-crawl",
    "name": "Low Crawl",
    "family": "conditioning",
    "movement": "locomotion",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness",
      "military-conditioning"
    ],
    "purposes": [
      "conditioning",
      "core"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core",
      "quads",
      "hip-flexors",
      "shoulders"
    ],
    "primaryMuscles": [
      "chest",
      "triceps",
      "core"
    ],
    "secondaryMuscles": [
      "quads",
      "hip-flexors",
      "shoulders"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "military",
      "crawl"
    ],
    "alternatives": [
      "bear-crawl"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Low Crawl",
      "low-crawl"
    ],
    "yt": "Low Crawl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "conditioning"
    ],
    "styleBias": [
      "operational-fitness",
      "military-conditioning"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Stay low, move smoothly, and keep breathing under effort.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "burpee-step-back",
    "name": "Burpee Step-Back",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "operational-fitness"
    ],
    "purposes": [
      "conditioning"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "chest",
      "core",
      "triceps",
      "calves"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "chest"
    ],
    "secondaryMuscles": [
      "core",
      "triceps",
      "calves"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "low-back-non-specific",
      "wrist-pain"
    ],
    "tags": [
      "low-impact",
      "burpee"
    ],
    "alternatives": [
      "low-impact-circuit"
    ],
    "regressions": [],
    "progressions": [
      "burpee"
    ],
    "aliases": [
      "Burpee Step-Back",
      "burpee-step-back"
    ],
    "yt": "Burpee Step-Back exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "operational"
    ],
    "styleBias": [
      "mixed",
      "operational-fitness"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Step back instead of jumping and keep the landing quiet.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "burpee",
    "name": "Burpee",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "military-conditioning",
      "operational-fitness"
    ],
    "purposes": [
      "conditioning",
      "power"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "chest",
      "triceps",
      "core",
      "calves"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "core",
      "calves"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "low-back-non-specific",
      "wrist-pain"
    ],
    "tags": [
      "burpee",
      "work-capacity"
    ],
    "alternatives": [
      "burpee-step-back"
    ],
    "regressions": [
      "low-impact-circuit"
    ],
    "progressions": [],
    "aliases": [
      "Burpee",
      "burpee"
    ],
    "yt": "Burpee exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "operational"
    ],
    "styleBias": [
      "mixed",
      "military-conditioning",
      "operational-fitness"
    ],
    "jointStress": 4,
    "fatigueCost": 5,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move crisply but keep reps clean.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "mountain-climber",
    "name": "Mountain Climber",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "conditioning"
    ],
    "purposes": [
      "conditioning",
      "core"
    ],
    "muscles": [
      "hip-flexors",
      "core",
      "shoulders",
      "heart-lungs",
      "quads"
    ],
    "primaryMuscles": [
      "hip-flexors",
      "core",
      "shoulders"
    ],
    "secondaryMuscles": [
      "heart-lungs",
      "quads"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-impingement",
      "low-back-non-specific"
    ],
    "tags": [
      "conditioning",
      "core"
    ],
    "alternatives": [
      "slow-mountain-climber"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [],
    "aliases": [
      "Mountain Climber",
      "mountain-climber"
    ],
    "yt": "Mountain Climber exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "calisthenics"
    ],
    "styleBias": [
      "mixed",
      "conditioning"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep shoulders over hands and drive knees without bouncing the lower back.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "step-up-intervals",
    "name": "Step-Up Intervals",
    "family": "conditioning",
    "movement": "step-up",
    "equipment": [
      "step",
      "bw",
      "db"
    ],
    "styles": [
      "operational-fitness",
      "fire-rescue"
    ],
    "purposes": [
      "conditioning",
      "legs"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "glutes",
      "calves",
      "core",
      "grip"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core",
      "grip"
    ],
    "difficulty": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "low-back-non-specific"
    ],
    "tags": [
      "firefighter",
      "stairs",
      "work-capacity"
    ],
    "alternatives": [
      "step-up"
    ],
    "regressions": [],
    "progressions": [
      "weighted-step-up"
    ],
    "aliases": [
      "Step-Up Intervals",
      "step-up-intervals"
    ],
    "yt": "Step-Up Intervals exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "conditioning"
    ],
    "styleBias": [
      "operational-fitness",
      "fire-rescue"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use repeatable step height and control breathing between efforts.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "loaded-stair-carry",
    "name": "Loaded Stair Carry",
    "family": "conditioning",
    "movement": "loaded-carry",
    "equipment": [
      "db",
      "step"
    ],
    "styles": [
      "fire-rescue",
      "operational-fitness"
    ],
    "purposes": [
      "conditioning",
      "grip",
      "legs"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "grip",
      "glutes",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "grip"
    ],
    "secondaryMuscles": [
      "glutes",
      "calves",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "low-back-non-specific"
    ],
    "tags": [
      "firefighter",
      "stairs",
      "carry"
    ],
    "alternatives": [
      "weighted-step-up"
    ],
    "regressions": [
      "farmer-carry"
    ],
    "progressions": [],
    "aliases": [
      "Loaded Stair Carry",
      "loaded-stair-carry"
    ],
    "yt": "Loaded Stair Carry exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "fire-rescue"
    ],
    "styleBias": [
      "fire-rescue",
      "operational-fitness"
    ],
    "jointStress": 4,
    "fatigueCost": 5,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Carry load safely and climb with steady breathing.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "shuttle-run",
    "name": "Shuttle Run",
    "family": "conditioning",
    "movement": "running",
    "equipment": [
      "bw"
    ],
    "styles": [
      "police-fitness",
      "operational-fitness"
    ],
    "purposes": [
      "conditioning",
      "speed"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "calves",
      "glutes",
      "hamstrings"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "calves"
    ],
    "secondaryMuscles": [
      "glutes",
      "hamstrings"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "achilles-pain",
      "plantar-fascia",
      "clicky-knees-painful"
    ],
    "tags": [
      "police",
      "shuttle",
      "speed"
    ],
    "alternatives": [
      "brisk-walk-intervals"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Shuttle Run",
      "shuttle-run"
    ],
    "yt": "Shuttle Run exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "conditioning",
      "running"
    ],
    "styleBias": [
      "police-fitness",
      "operational-fitness"
    ],
    "jointStress": 4,
    "fatigueCost": 5,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Accelerate and decelerate under control.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "ruck-walk",
    "name": "Ruck Walk",
    "family": "conditioning",
    "movement": "loaded-walk",
    "equipment": [
      "ruck",
      "weighted-vest"
    ],
    "styles": [
      "military-conditioning",
      "army-reserve",
      "search-rescue"
    ],
    "purposes": [
      "conditioning",
      "legs"
    ],
    "muscles": [
      "heart-lungs",
      "traps",
      "calves",
      "glutes",
      "quads",
      "core"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "traps",
      "calves"
    ],
    "secondaryMuscles": [
      "glutes",
      "quads",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "plantar-fascia",
      "achilles-pain"
    ],
    "tags": [
      "rucking",
      "military",
      "endurance"
    ],
    "alternatives": [
      "walk"
    ],
    "regressions": [],
    "progressions": [
      "hill-ruck"
    ],
    "aliases": [
      "Ruck Walk",
      "ruck-walk"
    ],
    "yt": "Ruck Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "military-conditioning",
      "endurance"
    ],
    "styleBias": [
      "military-conditioning",
      "army-reserve",
      "search-rescue"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Start light, walk tall, and progress distance before load.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "hill-ruck",
    "name": "Hill Ruck",
    "family": "conditioning",
    "movement": "loaded-walk",
    "equipment": [
      "ruck",
      "weighted-vest"
    ],
    "styles": [
      "military-conditioning",
      "search-rescue"
    ],
    "purposes": [
      "conditioning",
      "legs"
    ],
    "muscles": [
      "heart-lungs",
      "glutes",
      "calves",
      "quads",
      "traps",
      "core"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "glutes",
      "calves"
    ],
    "secondaryMuscles": [
      "quads",
      "traps",
      "core"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "achilles-pain",
      "plantar-fascia"
    ],
    "tags": [
      "rucking",
      "hills"
    ],
    "alternatives": [
      "ruck-walk"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Hill Ruck",
      "hill-ruck"
    ],
    "yt": "Hill Ruck exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "military-conditioning"
    ],
    "styleBias": [
      "military-conditioning",
      "search-rescue"
    ],
    "jointStress": 4,
    "fatigueCost": 5,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Climb at a controllable pace and descend carefully.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "casualty-drag-simulation",
    "name": "Casualty Drag Simulation",
    "family": "conditioning",
    "movement": "drag",
    "equipment": [
      "band",
      "towel"
    ],
    "styles": [
      "fire-rescue",
      "police-fitness",
      "operational-fitness"
    ],
    "purposes": [
      "conditioning",
      "pull",
      "grip"
    ],
    "muscles": [
      "lats",
      "grip",
      "quads",
      "glutes",
      "core",
      "heart-lungs"
    ],
    "primaryMuscles": [
      "lats",
      "grip",
      "quads"
    ],
    "secondaryMuscles": [
      "glutes",
      "core",
      "heart-lungs"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "casualty-drag",
      "operational"
    ],
    "alternatives": [
      "bandrow"
    ],
    "regressions": [
      "farmer-carry"
    ],
    "progressions": [],
    "aliases": [
      "Casualty Drag Simulation",
      "casualty-drag-simulation"
    ],
    "yt": "Casualty Drag Simulation exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "fire-rescue",
      "police-fitness"
    ],
    "styleBias": [
      "fire-rescue",
      "police-fitness",
      "operational-fitness"
    ],
    "jointStress": 3,
    "fatigueCost": 5,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Brace, keep hips low, and drag with short powerful steps.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "towel-grip-row",
    "name": "Towel Grip Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "towel",
      "anchor"
    ],
    "styles": [
      "calisthenics",
      "operational-fitness"
    ],
    "purposes": [
      "pull",
      "grip"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "grip",
      "biceps",
      "forearms",
      "rear-delts"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids",
      "grip"
    ],
    "secondaryMuscles": [
      "biceps",
      "forearms",
      "rear-delts"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "grip",
      "row"
    ],
    "alternatives": [
      "doorrow"
    ],
    "regressions": [
      "bandrow"
    ],
    "progressions": [
      "towel-pull-up"
    ],
    "aliases": [
      "Towel Grip Row",
      "towel-grip-row"
    ],
    "yt": "Towel Grip Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "operational"
    ],
    "styleBias": [
      "calisthenics",
      "operational-fitness"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Grip the towel hard and row without jerking the elbows.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "towel-pull-up",
    "name": "Towel Pull-Up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bar",
      "towel"
    ],
    "styles": [
      "calisthenics",
      "operational-fitness"
    ],
    "purposes": [
      "pull",
      "grip"
    ],
    "muscles": [
      "lats",
      "grip",
      "biceps",
      "forearms",
      "lower-traps"
    ],
    "primaryMuscles": [
      "lats",
      "grip",
      "biceps"
    ],
    "secondaryMuscles": [
      "forearms",
      "lower-traps"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "grip",
      "pull-up"
    ],
    "alternatives": [
      "neutral-grip-pull-up"
    ],
    "regressions": [
      "towel-grip-row"
    ],
    "progressions": [],
    "aliases": [
      "Towel Pull-Up",
      "towel-pull-up"
    ],
    "yt": "Towel Pull-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "operational"
    ],
    "styleBias": [
      "calisthenics",
      "operational-fitness"
    ],
    "jointStress": 4,
    "fatigueCost": 5,
    "skillDemand": 4,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 2,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use only if grip and elbows tolerate it.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "box-breathing-recovery-walk",
    "name": "Box Breathing Recovery Walk",
    "family": "cardio-z2",
    "movement": "breathing-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "purposes": [
      "conditioning",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "diaphragm",
      "parasympathetic-recovery"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "diaphragm"
    ],
    "secondaryMuscles": [
      "parasympathetic-recovery"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "breathing",
      "recovery",
      "zone-2"
    ],
    "alternatives": [
      "walk"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Box Breathing Recovery Walk",
      "box-breathing-recovery-walk"
    ],
    "yt": "Box Breathing Recovery Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "recovery",
      "operational",
      "endurance"
    ],
    "styleBias": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Walk easily and use a steady four-count breathing rhythm.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "nasal-breathing-zone-2-walk",
    "name": "Nasal Breathing Zone 2 Walk",
    "family": "cardio-z2",
    "movement": "cardio-z2",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "blue-light-resilience",
      "endurance"
    ],
    "purposes": [
      "conditioning",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "diaphragm",
      "calves",
      "glutes"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "diaphragm"
    ],
    "secondaryMuscles": [
      "calves",
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "plantar-fascia",
      "achilles-pain"
    ],
    "tags": [
      "zone-2",
      "nasal-breathing"
    ],
    "alternatives": [
      "walk"
    ],
    "regressions": [],
    "progressions": [
      "ruck-walk"
    ],
    "aliases": [
      "Nasal Breathing Zone 2 Walk",
      "nasal-breathing-zone-2-walk"
    ],
    "yt": "Nasal Breathing Zone 2 Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "endurance",
      "recovery"
    ],
    "styleBias": [
      "mixed",
      "blue-light-resilience",
      "endurance"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Stay at a pace where nasal breathing remains controlled.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "recovery-heart-rate-intervals",
    "name": "Recovery Heart Rate Intervals",
    "family": "cardio-threshold",
    "movement": "intervals",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness",
      "endurance"
    ],
    "purposes": [
      "conditioning"
    ],
    "muscles": [
      "heart-lungs",
      "work-capacity",
      "calves",
      "quads"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "work-capacity"
    ],
    "secondaryMuscles": [
      "calves",
      "quads"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "achilles-pain",
      "plantar-fascia",
      "clicky-knees-painful"
    ],
    "tags": [
      "heart-rate-recovery",
      "intervals"
    ],
    "alternatives": [
      "brisk-walk-intervals"
    ],
    "regressions": [],
    "progressions": [
      "shuttle-run"
    ],
    "aliases": [
      "Recovery Heart Rate Intervals",
      "recovery-heart-rate-intervals"
    ],
    "yt": "Recovery Heart Rate Intervals exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "endurance",
      "operational"
    ],
    "styleBias": [
      "operational-fitness",
      "endurance"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Work hard, then measure how quickly breathing and pulse settle.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "wall-push-up-2",
    "name": "Wall Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw",
      "wall"
    ],
    "styles": [
      "rebuild-recovery",
      "mixed"
    ],
    "purposes": [
      "push",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "serratus-anterior"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "serratus-anterior"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "regression",
      "push"
    ],
    "alternatives": [
      "incline-push-up"
    ],
    "regressions": [],
    "progressions": [
      "incline-push-up"
    ],
    "aliases": [
      "Wall Push-Up",
      "wall-push-up",
      "wall-push-up-2"
    ],
    "yt": "Wall Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "calisthenics"
    ],
    "styleBias": [
      "rebuild-recovery",
      "mixed"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use the wall to practise pressing without high joint load.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "wide-push-up",
    "name": "Wide Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "hypertrophy"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "mid-chest",
      "front-delts",
      "triceps"
    ],
    "primaryMuscles": [
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts",
      "triceps"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "chest",
      "bodyweight"
    ],
    "alternatives": [
      "pushup"
    ],
    "regressions": [
      "incline-push-up"
    ],
    "progressions": [
      "archer-push-up"
    ],
    "aliases": [
      "Wide Push-Up",
      "wide-push-up"
    ],
    "yt": "Wide Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics"
    ],
    "styleBias": [
      "calisthenics",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a wide but comfortable hand position and avoid shoulder pinch.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-overhead-press",
    "name": "Band Overhead Press",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "band"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "push",
      "strength"
    ],
    "muscles": [
      "front-delts",
      "side-delts",
      "triceps",
      "core"
    ],
    "primaryMuscles": [
      "front-delts",
      "side-delts",
      "triceps"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "shoulders"
    ],
    "alternatives": [
      "dumbbell-shoulder-press"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Overhead Press",
      "band-overhead-press"
    ],
    "yt": "Band Overhead Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Press through comfortable range and avoid rib flare.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "heel-walk",
    "name": "Heel Walk",
    "family": "calf-ankle",
    "movement": "ankle-dorsiflexion",
    "equipment": [
      "bw"
    ],
    "styles": [
      "running",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "tibialis-anterior",
      "ankle-stabilisers"
    ],
    "primaryMuscles": [
      "tibialis-anterior"
    ],
    "secondaryMuscles": [
      "ankle-stabilisers"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shin-splints"
    ],
    "tags": [
      "tibialis",
      "shin"
    ],
    "alternatives": [
      "tibialis-raise"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Heel Walk",
      "heel-walk"
    ],
    "yt": "Heel Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "running",
      "rehab"
    ],
    "styleBias": [
      "running",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Walk on heels slowly to wake up the front of the shin.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "slow-mountain-climber",
    "name": "Slow Mountain Climber",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery",
      "mixed"
    ],
    "purposes": [
      "conditioning",
      "core"
    ],
    "muscles": [
      "hip-flexors",
      "core",
      "shoulders",
      "heart-lungs"
    ],
    "primaryMuscles": [
      "hip-flexors",
      "core"
    ],
    "secondaryMuscles": [
      "shoulders",
      "heart-lungs"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "wrist-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "low-impact",
      "core"
    ],
    "alternatives": [
      "mountain-climber"
    ],
    "regressions": [
      "dead-bug"
    ],
    "progressions": [
      "mountain-climber"
    ],
    "aliases": [
      "Slow Mountain Climber",
      "slow-mountain-climber"
    ],
    "yt": "Slow Mountain Climber exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "conditioning",
      "rehab"
    ],
    "styleBias": [
      "rebuild-recovery",
      "mixed"
    ],
    "jointStress": 2,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move one knee at a time and keep the hips controlled.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "brisk-walk-intervals",
    "name": "Brisk Walk Intervals",
    "family": "cardio-z2",
    "movement": "intervals",
    "equipment": [
      "bw"
    ],
    "styles": [
      "mixed",
      "endurance",
      "rebuild-recovery"
    ],
    "purposes": [
      "conditioning",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "calves",
      "glutes"
    ],
    "primaryMuscles": [
      "heart-lungs"
    ],
    "secondaryMuscles": [
      "calves",
      "glutes"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "plantar-fascia",
      "achilles-pain"
    ],
    "tags": [
      "walking",
      "intervals"
    ],
    "alternatives": [
      "nasal-breathing-zone-2-walk"
    ],
    "regressions": [],
    "progressions": [
      "recovery-heart-rate-intervals"
    ],
    "aliases": [
      "Brisk Walk Intervals",
      "brisk-walk-intervals"
    ],
    "yt": "Brisk Walk Intervals exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "endurance",
      "recovery"
    ],
    "styleBias": [
      "mixed",
      "endurance",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Alternate brisk and easy walking without chasing breathlessness.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "hill-step-march",
    "name": "Hill Step March",
    "family": "conditioning",
    "movement": "marching",
    "equipment": [
      "bw",
      "step"
    ],
    "styles": [
      "operational-fitness",
      "rebuild-recovery"
    ],
    "purposes": [
      "conditioning",
      "legs"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "glutes",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "achilles-pain"
    ],
    "tags": [
      "march",
      "stairs"
    ],
    "alternatives": [
      "step-up"
    ],
    "regressions": [],
    "progressions": [
      "step-up-intervals"
    ],
    "aliases": [
      "Hill Step March",
      "hill-step-march"
    ],
    "yt": "Hill Step March exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational",
      "conditioning"
    ],
    "styleBias": [
      "operational-fitness",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "March with posture and breathing before adding load.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-triceps-pressdown",
    "name": "Band Triceps Pressdown",
    "family": "arms",
    "movement": "elbow-extension",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "arms",
      "hypertrophy"
    ],
    "muscles": [
      "triceps-lateral-head",
      "triceps-medial-head",
      "forearms"
    ],
    "primaryMuscles": [
      "triceps-lateral-head",
      "triceps-medial-head"
    ],
    "secondaryMuscles": [
      "forearms"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain"
    ],
    "tags": [
      "band",
      "triceps"
    ],
    "alternatives": [
      "band-overhead-triceps-extension"
    ],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Triceps Pressdown",
      "band-triceps-pressdown"
    ],
    "yt": "Band Triceps Pressdown exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pin elbows gently and press down without snapping the joint.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "band-chest-fly",
    "name": "Band Chest Fly",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "band"
    ],
    "styles": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "purposes": [
      "push",
      "hypertrophy"
    ],
    "muscles": [
      "mid-chest",
      "front-delts"
    ],
    "primaryMuscles": [
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "fly"
    ],
    "alternatives": [
      "dumbbell-fly"
    ],
    "regressions": [
      "band-chest-press"
    ],
    "progressions": [],
    "aliases": [
      "Band Chest Fly",
      "band-chest-fly"
    ],
    "yt": "Band Chest Fly exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "hypertrophy",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hug around the rib cage and stop before the shoulders roll forward.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "hip-hinge-drill",
    "name": "Hip Hinge Drill",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "bw",
      "wall"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "spinal-erectors"
    ],
    "primaryMuscles": [
      "hamstrings",
      "glutes"
    ],
    "secondaryMuscles": [
      "spinal-erectors"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hamstring-pain"
    ],
    "tags": [
      "hinge",
      "skill"
    ],
    "alternatives": [
      "dumbbell-romanian-deadlift"
    ],
    "regressions": [],
    "progressions": [
      "dumbbell-romanian-deadlift"
    ],
    "aliases": [
      "Hip Hinge Drill",
      "hip-hinge-drill"
    ],
    "yt": "Hip Hinge Drill exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rehab",
      "strength"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 1,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Push hips back to the wall and learn the hinge before loading it.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  },
  {
    "key": "bodyweight-hip-thrust",
    "name": "Bodyweight Hip Thrust",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw",
      "bench"
    ],
    "styles": [
      "mixed",
      "rebuild-recovery"
    ],
    "purposes": [
      "legs",
      "recovery"
    ],
    "muscles": [
      "glutes",
      "hamstrings",
      "core"
    ],
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "hamstrings",
      "core"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "glutes"
    ],
    "alternatives": [
      "dumbbell-hip-thrust"
    ],
    "regressions": [
      "glute-bridge"
    ],
    "progressions": [
      "dumbbell-hip-thrust"
    ],
    "aliases": [
      "Bodyweight Hip Thrust",
      "bodyweight-hip-thrust"
    ],
    "yt": "Bodyweight Hip Thrust exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rehab"
    ],
    "styleBias": [
      "mixed",
      "rebuild-recovery"
    ],
    "jointStress": 1,
    "fatigueCost": 2,
    "skillDemand": 1,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 5,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Drive hips up with glutes and avoid overextending the back.",
    "source": "fff-exercise-db-v4.5-expansion-pack-1"
  }

,

  {
    "key": "incline-push-up-2",
    "name": "Incline Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw",
      "bench"
    ],
    "styles": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "serratus-anterior"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "serratus-anterior"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "push",
      "regression"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Incline Push-Up",
      "incline-push-up",
      "incline-push-up-2"
    ],
    "yt": "Incline Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "styleBias": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use the incline to build clean pressing volume.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "paused-push-up",
    "name": "Paused Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain"
    ],
    "tags": [
      "push",
      "tempo"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Paused Push-Up",
      "paused-push-up"
    ],
    "yt": "Paused Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pause under control without losing body tension.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "tempo-push-up",
    "name": "Tempo Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain"
    ],
    "tags": [
      "push",
      "tempo"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Tempo Push-Up",
      "tempo-push-up"
    ],
    "yt": "Tempo Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "hypertrophy"
    ],
    "styleBias": [
      "calisthenics",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lower slowly and press smoothly.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "deficit-push-up",
    "name": "Deficit Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw",
      "handles"
    ],
    "styles": [
      "calisthenics",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "front-delts",
      "triceps"
    ],
    "primaryMuscles": [
      "mid-chest"
    ],
    "secondaryMuscles": [
      "front-delts",
      "triceps"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "deep-range",
      "push"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Deficit Push-Up",
      "deficit-push-up"
    ],
    "yt": "Deficit Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "hypertrophy"
    ],
    "styleBias": [
      "calisthenics",
      "hypertrophy"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use extra range only if shoulders tolerate it.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "pseudo-planche-push-up-2",
    "name": "Pseudo Planche Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "front-delts",
      "upper-chest",
      "triceps",
      "core"
    ],
    "primaryMuscles": [
      "front-delts",
      "upper-chest"
    ],
    "secondaryMuscles": [
      "triceps",
      "core"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "wrist-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "advanced",
      "push"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Pseudo Planche Push-Up",
      "pseudo-planche-push-up",
      "pseudo-planche-push-up-2"
    ],
    "yt": "Pseudo Planche Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lean forward slightly and keep wrists comfortable.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "band-resisted-push-up",
    "name": "Band-Resisted Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw",
      "band"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "wrist-pain"
    ],
    "tags": [
      "band",
      "push"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band-Resisted Push-Up",
      "band-resisted-push-up"
    ],
    "yt": "Band-Resisted Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use band tension to overload the top.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "single-arm-dumbbell-floor-press",
    "name": "Single-Arm Dumbbell Floor Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "obliques",
      "front-delts"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "obliques",
      "front-delts"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "single-arm",
      "floor-press"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Single-Arm Dumbbell Floor Press",
      "single-arm-dumbbell-floor-press"
    ],
    "yt": "Single-Arm Dumbbell Floor Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "weights",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Resist rolling while pressing one dumbbell.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "alternating-dumbbell-bench-press",
    "name": "Alternating Dumbbell Bench Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "alternating",
      "press"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Alternating Dumbbell Bench Press",
      "alternating-dumbbell-bench-press"
    ],
    "yt": "Alternating Dumbbell Bench Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep one dumbbell stable while pressing the other.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "dumbbell-crush-grip-floor-press",
    "name": "Dumbbell Crush-Grip Floor Press",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "inner-chest-emphasis",
      "triceps",
      "front-delts"
    ],
    "primaryMuscles": [
      "inner-chest-emphasis",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "crush-grip",
      "floor-press"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dumbbell Crush-Grip Floor Press",
      "dumbbell-crush-grip-floor-press"
    ],
    "yt": "Dumbbell Crush-Grip Floor Press exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Squeeze the dumbbells together throughout.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "ring-archer-push-up",
    "name": "Ring Archer Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "rings",
      "advanced"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Ring Archer Push-Up",
      "ring-archer-push-up"
    ],
    "yt": "Ring Archer Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Shift gradually side to side and keep the rings quiet.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "kneeling-ring-push-up",
    "name": "Kneeling Ring Push-Up",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-chest",
      "triceps",
      "front-delts",
      "core"
    ],
    "primaryMuscles": [
      "mid-chest",
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "core"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "rings",
      "regression"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Kneeling Ring Push-Up",
      "kneeling-ring-push-up"
    ],
    "yt": "Kneeling Ring Push-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "styleBias": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use knees to learn ring stability.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "bench-dip",
    "name": "Bench Dip",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bench",
      "bw"
    ],
    "styles": [
      "calisthenics",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "triceps",
      "front-delts",
      "lower-chest"
    ],
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [
      "front-delts",
      "lower-chest"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "triceps",
      "dip"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Bench Dip",
      "bench-dip"
    ],
    "yt": "Bench Dip exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "hypertrophy"
    ],
    "styleBias": [
      "calisthenics",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep range small if shoulders pinch.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "band-row",
    "name": "Band Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "band"
    ],
    "styles": [
      "bands",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "rhomboids",
      "mid-traps",
      "lats",
      "rear-delts",
      "biceps"
    ],
    "primaryMuscles": [
      "rhomboids",
      "mid-traps",
      "lats"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "biceps"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "row"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Row",
      "band-row"
    ],
    "yt": "Band Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rebuild-recovery"
    ],
    "styleBias": [
      "bands",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull elbows back and keep shoulders low.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "seated-band-row",
    "name": "Seated Band Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "band"
    ],
    "styles": [
      "bands",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "biceps",
      "rear-delts"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids"
    ],
    "secondaryMuscles": [
      "biceps",
      "rear-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "band",
      "row"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Seated Band Row",
      "seated-band-row"
    ],
    "yt": "Seated Band Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rebuild-recovery"
    ],
    "styleBias": [
      "bands",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Sit tall and row towards lower ribs.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "high-band-row",
    "name": "High Band Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "bands",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "rear-delts",
      "upper-back",
      "rhomboids",
      "mid-traps"
    ],
    "primaryMuscles": [
      "rear-delts",
      "upper-back"
    ],
    "secondaryMuscles": [
      "rhomboids",
      "mid-traps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "upper-back"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "High Band Row",
      "high-band-row"
    ],
    "yt": "High Band Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "bands",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull high towards upper chest.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "seal-row",
    "name": "Seal Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "rhomboids",
      "mid-traps",
      "lats",
      "rear-delts",
      "biceps"
    ],
    "primaryMuscles": [
      "rhomboids",
      "mid-traps",
      "lats"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "biceps"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "supported-row"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Seal Row",
      "seal-row"
    ],
    "yt": "Seal Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Let the bench remove lower-back demand.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "renegade-row",
    "name": "Renegade Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "core"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "obliques",
      "triceps",
      "front-delts",
      "grip"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids",
      "obliques"
    ],
    "secondaryMuscles": [
      "triceps",
      "front-delts",
      "grip"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "wrist-pain"
    ],
    "tags": [
      "row",
      "anti-rotation"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Renegade Row",
      "renegade-row"
    ],
    "yt": "Renegade Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "core"
    ],
    "styleBias": [
      "weights",
      "core"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Row without twisting the hips.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "inverted-row",
    "name": "Inverted Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bar",
      "rings"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "mid-traps",
      "biceps",
      "rear-delts"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids",
      "mid-traps"
    ],
    "secondaryMuscles": [
      "biceps",
      "rear-delts"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "bodyweight",
      "row"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Inverted Row",
      "inverted-row"
    ],
    "yt": "Inverted Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull chest towards the anchor.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "ring-row",
    "name": "Ring Row",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "rings"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "rhomboids",
      "rear-delts",
      "biceps",
      "core"
    ],
    "primaryMuscles": [
      "lats",
      "rhomboids"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "biceps",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "rings",
      "row"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Ring Row",
      "ring-row"
    ],
    "yt": "Ring Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Walk feet forward or back to scale.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "band-assisted-chin-up",
    "name": "Band Assisted Chin-Up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bar",
      "band"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "biceps",
      "lower-traps",
      "forearms"
    ],
    "primaryMuscles": [
      "lats",
      "biceps"
    ],
    "secondaryMuscles": [
      "lower-traps",
      "forearms"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "chin-up",
      "assisted"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Assisted Chin-Up",
      "band-assisted-chin-up"
    ],
    "yt": "Band Assisted Chin-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use assistance for clean reps.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "chin-up",
    "name": "Chin-Up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bar"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "biceps",
      "brachialis",
      "forearms"
    ],
    "primaryMuscles": [
      "lats",
      "biceps"
    ],
    "secondaryMuscles": [
      "brachialis",
      "forearms"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "chin-up"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Chin-Up",
      "chin-up"
    ],
    "yt": "Chin-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Pull from active shoulders.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "scapular-pull-up-2",
    "name": "Scapular Pull-Up",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bar"
    ],
    "styles": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lower-traps",
      "lats",
      "grip",
      "serratus-anterior"
    ],
    "primaryMuscles": [
      "lower-traps",
      "lats"
    ],
    "secondaryMuscles": [
      "grip",
      "serratus-anterior"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "scapular-control"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Scapular Pull-Up",
      "scapular-pull-up",
      "scapular-pull-up-2"
    ],
    "yt": "Scapular Pull-Up exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "styleBias": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move shoulder blades without bending elbows.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "prone-y-raise",
    "name": "Prone Y Raise",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lower-traps",
      "rear-delts",
      "rotator-cuff"
    ],
    "primaryMuscles": [
      "lower-traps"
    ],
    "secondaryMuscles": [
      "rear-delts",
      "rotator-cuff"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "lower-traps"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Prone Y Raise",
      "prone-y-raise"
    ],
    "yt": "Prone Y Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lift with thumbs up and neck relaxed.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "prone-t-raise",
    "name": "Prone T Raise",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "mid-traps",
      "rear-delts",
      "rhomboids"
    ],
    "primaryMuscles": [
      "mid-traps",
      "rear-delts"
    ],
    "secondaryMuscles": [
      "rhomboids"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "mid-traps"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Prone T Raise",
      "prone-t-raise"
    ],
    "yt": "Prone T Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Reach wide and lift without shrugging.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "prone-w-raise",
    "name": "Prone W Raise",
    "family": "horizontal-pull",
    "movement": "horizontal-pull",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "rotator-cuff",
      "mid-traps",
      "rear-delts"
    ],
    "primaryMuscles": [
      "rotator-cuff",
      "mid-traps"
    ],
    "secondaryMuscles": [
      "rear-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "rotator-cuff"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Prone W Raise",
      "prone-w-raise"
    ],
    "yt": "Prone W Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Squeeze elbows towards ribs gently.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "dumbbell-front-raise",
    "name": "Dumbbell Front Raise",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "front-delts",
      "upper-chest"
    ],
    "primaryMuscles": [
      "front-delts"
    ],
    "secondaryMuscles": [
      "upper-chest"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "front-delts"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dumbbell Front Raise",
      "dumbbell-front-raise"
    ],
    "yt": "Dumbbell Front Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Raise to shoulder height without leaning back.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "scaption-raise",
    "name": "Scaption Raise",
    "family": "vertical-push",
    "movement": "vertical-push",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "side-delts",
      "rotator-cuff",
      "front-delts"
    ],
    "primaryMuscles": [
      "side-delts",
      "rotator-cuff"
    ],
    "secondaryMuscles": [
      "front-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "scaption"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Scaption Raise",
      "scaption-raise"
    ],
    "yt": "Scaption Raise exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rebuild-recovery"
    ],
    "styleBias": [
      "weights",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Raise in the scapular plane with thumbs slightly up.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "side-lying-external-rotation",
    "name": "Side-Lying External Rotation",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "db"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "rotator-cuff",
      "rear-delts"
    ],
    "primaryMuscles": [
      "rotator-cuff"
    ],
    "secondaryMuscles": [
      "rear-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "rotator-cuff"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Side-Lying External Rotation",
      "side-lying-external-rotation"
    ],
    "yt": "Side-Lying External Rotation exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Rotate slowly with elbow tucked.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "y-t-w-sequence",
    "name": "Y-T-W Sequence",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lower-traps",
      "mid-traps",
      "rotator-cuff",
      "rear-delts"
    ],
    "primaryMuscles": [
      "lower-traps",
      "mid-traps",
      "rotator-cuff"
    ],
    "secondaryMuscles": [
      "rear-delts"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "shoulder-impingement"
    ],
    "tags": [
      "posture"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Y-T-W Sequence",
      "y-t-w-sequence"
    ],
    "yt": "Y-T-W Sequence exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move through Y, T and W shapes with control.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "concentration-curl",
    "name": "Concentration Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "biceps",
      "brachialis"
    ],
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "brachialis"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "elbow-tendon-pain"
    ],
    "tags": [
      "biceps"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Concentration Curl",
      "concentration-curl"
    ],
    "yt": "Concentration Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Brace the arm and curl without swinging.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "reverse-curl",
    "name": "Reverse Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "brachioradialis",
      "forearms",
      "biceps"
    ],
    "primaryMuscles": [
      "brachioradialis",
      "forearms"
    ],
    "secondaryMuscles": [
      "biceps"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "wrist-pain"
    ],
    "tags": [
      "forearms"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Reverse Curl",
      "reverse-curl"
    ],
    "yt": "Reverse Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a lighter load and control the wrist.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "band-curl-2",
    "name": "Band Curl",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "band"
    ],
    "styles": [
      "bands",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "biceps",
      "brachialis",
      "forearms"
    ],
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [
      "brachialis",
      "forearms"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "elbow-tendon-pain"
    ],
    "tags": [
      "band",
      "biceps"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Curl",
      "band-curl",
      "band-curl-2"
    ],
    "yt": "Band Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "bands",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep elbows pinned and use smooth band tension.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "bodyweight-triceps-extension",
    "name": "Bodyweight Triceps Extension",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "bar",
      "rings"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "triceps-long-head",
      "core",
      "front-delts"
    ],
    "primaryMuscles": [
      "triceps-long-head"
    ],
    "secondaryMuscles": [
      "core",
      "front-delts"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "elbow-tendon-pain",
      "shoulder-impingement"
    ],
    "tags": [
      "bodyweight",
      "triceps"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Bodyweight Triceps Extension",
      "bodyweight-triceps-extension"
    ],
    "yt": "Bodyweight Triceps Extension exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Bend only through the elbows.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "band-kickback",
    "name": "Band Kickback",
    "family": "arms",
    "movement": "arms",
    "equipment": [
      "band"
    ],
    "styles": [
      "bands",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "triceps-lateral-head",
      "triceps-medial-head"
    ],
    "primaryMuscles": [
      "triceps-lateral-head"
    ],
    "secondaryMuscles": [
      "triceps-medial-head"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "elbow-tendon-pain"
    ],
    "tags": [
      "triceps"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Band Kickback",
      "band-kickback"
    ],
    "yt": "Band Kickback exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "hypertrophy"
    ],
    "styleBias": [
      "bands",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Extend behind you without swinging.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "goblet-squat-to-box",
    "name": "Goblet Squat to Box",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "db",
      "box"
    ],
    "styles": [
      "weights",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "quads",
      "glutes",
      "core"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "squat",
      "regression"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Goblet Squat to Box",
      "goblet-squat-to-box"
    ],
    "yt": "Goblet Squat to Box exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "rebuild-recovery"
    ],
    "styleBias": [
      "weights",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Sit to a box to control depth.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "dumbbell-front-squat",
    "name": "Dumbbell Front Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "quads",
      "glutes",
      "core",
      "upper-back"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "core",
      "upper-back"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "low-back-non-specific"
    ],
    "tags": [
      "squat"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dumbbell Front Squat",
      "dumbbell-front-squat"
    ],
    "yt": "Dumbbell Front Squat exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "strength"
    ],
    "styleBias": [
      "weights",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hold dumbbells high and stay tall.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "dumbbell-sumo-squat",
    "name": "Dumbbell Sumo Squat",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "db"
    ],
    "styles": [
      "weights",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "adductors",
      "glutes",
      "quads",
      "core"
    ],
    "primaryMuscles": [
      "adductors",
      "glutes",
      "quads"
    ],
    "secondaryMuscles": [
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "sumo",
      "adductors"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dumbbell Sumo Squat",
      "dumbbell-sumo-squat"
    ],
    "yt": "Dumbbell Sumo Squat exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "hypertrophy"
    ],
    "styleBias": [
      "weights",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use a stance the hips tolerate.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "lateral-lunge",
    "name": "Lateral Lunge",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bw",
      "db"
    ],
    "styles": [
      "weights",
      "mobility"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "adductors",
      "glutes",
      "quads",
      "glute-med",
      "core"
    ],
    "primaryMuscles": [
      "adductors",
      "glutes",
      "quads"
    ],
    "secondaryMuscles": [
      "glute-med",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "groin-pain",
      "clicky-knees-painful"
    ],
    "tags": [
      "lateral",
      "adductors"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Lateral Lunge",
      "lateral-lunge"
    ],
    "yt": "Lateral Lunge exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "mobility"
    ],
    "styleBias": [
      "weights",
      "mobility"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Step sideways and sit into the hip.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "cossack-squat-assisted",
    "name": "Cossack Squat Assisted",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "bw",
      "anchor"
    ],
    "styles": [
      "mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "adductors",
      "quads",
      "glutes",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "adductors",
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "groin-pain",
      "clicky-knees-painful"
    ],
    "tags": [
      "mobility",
      "lateral"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Cossack Squat Assisted",
      "cossack-squat-assisted"
    ],
    "yt": "Cossack Squat Assisted exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "mobility",
      "rebuild-recovery"
    ],
    "styleBias": [
      "mobility",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use support and keep range comfortable.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "banded-lateral-walk",
    "name": "Banded Lateral Walk",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "band"
    ],
    "styles": [
      "bands",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "glute-med",
      "abductors",
      "glutes",
      "core"
    ],
    "primaryMuscles": [
      "glute-med",
      "abductors"
    ],
    "secondaryMuscles": [
      "glutes",
      "core"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom",
      "knee-pain"
    ],
    "tags": [
      "glute-med"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Banded Lateral Walk",
      "banded-lateral-walk"
    ],
    "yt": "Banded Lateral Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rebuild-recovery"
    ],
    "styleBias": [
      "bands",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep toes forward and step with control.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "monster-walk",
    "name": "Monster Walk",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "band"
    ],
    "styles": [
      "bands",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "glute-med",
      "glutes",
      "quads"
    ],
    "primaryMuscles": [
      "glute-med",
      "glutes"
    ],
    "secondaryMuscles": [
      "quads"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "band",
      "glutes"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Monster Walk",
      "monster-walk"
    ],
    "yt": "Monster Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "rebuild-recovery"
    ],
    "styleBias": [
      "bands",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Stay low and step diagonally.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "hamstring-walkout",
    "name": "Hamstring Walkout",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "bw"
    ],
    "styles": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "calves"
    ],
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [
      "glutes",
      "calves"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "hamstring-pain",
      "low-back-non-specific"
    ],
    "tags": [
      "hamstrings"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Hamstring Walkout",
      "hamstring-walkout"
    ],
    "yt": "Hamstring Walkout exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "styleBias": [
      "calisthenics",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Bridge up and walk heels out under control.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "slider-leg-curl",
    "name": "Slider Leg Curl",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "sliders"
    ],
    "styles": [
      "calisthenics",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "core"
    ],
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [
      "glutes",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "hamstring-pain"
    ],
    "tags": [
      "hamstrings"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Slider Leg Curl",
      "slider-leg-curl"
    ],
    "yt": "Slider Leg Curl exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "hypertrophy"
    ],
    "styleBias": [
      "calisthenics",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Slide slowly out and curl back.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "nordic-curl-assisted",
    "name": "Nordic Curl Assisted",
    "family": "hinge",
    "movement": "hinge",
    "equipment": [
      "bw",
      "anchor"
    ],
    "styles": [
      "calisthenics",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "hamstrings",
      "glutes",
      "calves"
    ],
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [
      "glutes",
      "calves"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "hamstring-pain",
      "knee-pain"
    ],
    "tags": [
      "nordic"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Nordic Curl Assisted",
      "nordic-curl-assisted"
    ],
    "yt": "Nordic Curl Assisted exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "strength"
    ],
    "styleBias": [
      "calisthenics",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use hands or a band for assistance.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "frog-pump",
    "name": "Frog Pump",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw",
      "band"
    ],
    "styles": [
      "calisthenics",
      "hypertrophy"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "glutes",
      "adductors",
      "core"
    ],
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [
      "adductors",
      "core"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "hip-tendon-pain-reduced-rom"
    ],
    "tags": [
      "glutes"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Frog Pump",
      "frog-pump"
    ],
    "yt": "Frog Pump exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "calisthenics",
      "hypertrophy"
    ],
    "styleBias": [
      "calisthenics",
      "hypertrophy"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Use small controlled hip drive.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "ankle-knee-to-wall",
    "name": "Ankle Knee-to-Wall",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw",
      "wall"
    ],
    "styles": [
      "mobility",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "ankle-stabilisers",
      "calves",
      "tibialis-anterior"
    ],
    "primaryMuscles": [
      "ankle-stabilisers"
    ],
    "secondaryMuscles": [
      "calves",
      "tibialis-anterior"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "achilles-pain"
    ],
    "tags": [
      "ankle-mobility"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Ankle Knee-to-Wall",
      "ankle-knee-to-wall"
    ],
    "yt": "Ankle Knee-to-Wall exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "mobility",
      "rebuild-recovery"
    ],
    "styleBias": [
      "mobility",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep heel down and move the knee forward.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "foot-short-arch-drill",
    "name": "Foot Short-Arch Drill",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "foot-intrinsics",
      "tibialis-posterior"
    ],
    "primaryMuscles": [
      "foot-intrinsics"
    ],
    "secondaryMuscles": [
      "tibialis-posterior"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "plantar-fascia"
    ],
    "tags": [
      "foot"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Foot Short-Arch Drill",
      "foot-short-arch-drill"
    ],
    "yt": "Foot Short-Arch Drill exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Shorten the foot without curling toes.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "toe-yoga",
    "name": "Toe Yoga",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "foot-intrinsics",
      "tibialis-anterior"
    ],
    "primaryMuscles": [
      "foot-intrinsics"
    ],
    "secondaryMuscles": [
      "tibialis-anterior"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "plantar-fascia"
    ],
    "tags": [
      "foot"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Toe Yoga",
      "toe-yoga"
    ],
    "yt": "Toe Yoga exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "rebuild-recovery"
    ],
    "styleBias": [
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lift big toe and lesser toes separately.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "bird-dog-row",
    "name": "Bird Dog Row",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "db",
      "bench"
    ],
    "styles": [
      "weights",
      "core"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "obliques",
      "lats",
      "glutes",
      "rear-delts"
    ],
    "primaryMuscles": [
      "obliques",
      "lats"
    ],
    "secondaryMuscles": [
      "glutes",
      "rear-delts"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "core",
      "row"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Bird Dog Row",
      "bird-dog-row"
    ],
    "yt": "Bird Dog Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "weights",
      "core"
    ],
    "styleBias": [
      "weights",
      "core"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Keep hips level while rowing.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "stir-the-pot-plank",
    "name": "Stir-the-Pot Plank",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "ball"
    ],
    "styles": [
      "core",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "transverse-abdominis",
      "rectus-abdominis",
      "shoulders",
      "lats"
    ],
    "primaryMuscles": [
      "transverse-abdominis",
      "rectus-abdominis"
    ],
    "secondaryMuscles": [
      "shoulders",
      "lats"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "plank"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Stir-the-Pot Plank",
      "stir-the-pot-plank"
    ],
    "yt": "Stir-the-Pot Plank exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "core",
      "strength"
    ],
    "styleBias": [
      "core",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move slowly and keep lower back steady.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "body-saw",
    "name": "Body Saw",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "sliders"
    ],
    "styles": [
      "core",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "rectus-abdominis",
      "transverse-abdominis",
      "shoulders",
      "lats"
    ],
    "primaryMuscles": [
      "rectus-abdominis",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "shoulders",
      "lats"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "plank"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Body Saw",
      "body-saw"
    ],
    "yt": "Body Saw exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "core",
      "strength"
    ],
    "styleBias": [
      "core",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 3,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Slide only as far as ribs stay down.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "tall-kneeling-band-chop",
    "name": "Tall-Kneeling Band Chop",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "bands",
      "core"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "obliques",
      "transverse-abdominis",
      "glutes",
      "shoulders"
    ],
    "primaryMuscles": [
      "obliques",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "glutes",
      "shoulders"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "chop"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Tall-Kneeling Band Chop",
      "tall-kneeling-band-chop"
    ],
    "yt": "Tall-Kneeling Band Chop exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "core"
    ],
    "styleBias": [
      "bands",
      "core"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Stay tall and rotate through upper back.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "tall-kneeling-band-lift",
    "name": "Tall-Kneeling Band Lift",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "band",
      "anchor"
    ],
    "styles": [
      "bands",
      "core"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "obliques",
      "transverse-abdominis",
      "glutes",
      "shoulders"
    ],
    "primaryMuscles": [
      "obliques",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "glutes",
      "shoulders"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "lift"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Tall-Kneeling Band Lift",
      "tall-kneeling-band-lift"
    ],
    "yt": "Tall-Kneeling Band Lift exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "bands",
      "core"
    ],
    "styleBias": [
      "bands",
      "core"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lift diagonally without arching.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "plank-drag",
    "name": "Plank Drag",
    "family": "core-anti-rotation",
    "movement": "core-anti-rotation",
    "equipment": [
      "db"
    ],
    "styles": [
      "core",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "obliques",
      "transverse-abdominis",
      "shoulders",
      "lats"
    ],
    "primaryMuscles": [
      "obliques",
      "transverse-abdominis"
    ],
    "secondaryMuscles": [
      "shoulders",
      "lats"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "shoulder-impingement",
      "wrist-pain"
    ],
    "tags": [
      "plank",
      "drag"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Plank Drag",
      "plank-drag"
    ],
    "yt": "Plank Drag exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "core",
      "strength"
    ],
    "styleBias": [
      "core",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Drag the weight without twisting hips.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "dead-bug-heel-tap",
    "name": "Dead Bug Heel Tap",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "core",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "transverse-abdominis",
      "lower-abs",
      "hip-flexors"
    ],
    "primaryMuscles": [
      "transverse-abdominis",
      "lower-abs"
    ],
    "secondaryMuscles": [
      "hip-flexors"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "dead-bug"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dead Bug Heel Tap",
      "dead-bug-heel-tap"
    ],
    "yt": "Dead Bug Heel Tap exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "core",
      "rebuild-recovery"
    ],
    "styleBias": [
      "core",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Tap heel while keeping the back heavy.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "loaded-march",
    "name": "Loaded March",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "db",
      "kb"
    ],
    "styles": [
      "operational-fitness",
      "conditioning"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "grip",
      "core",
      "quads",
      "calves"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "grip",
      "core"
    ],
    "secondaryMuscles": [
      "quads",
      "calves"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "operational",
      "march"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Loaded March",
      "loaded-march"
    ],
    "yt": "Loaded March exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness",
      "conditioning"
    ],
    "styleBias": [
      "operational-fitness",
      "conditioning"
    ],
    "jointStress": 2,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "March tall with controlled breathing.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "sandbag-bear-hug-carry",
    "name": "Sandbag Bear Hug Carry",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "sandbag"
    ],
    "styles": [
      "operational-fitness",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "upper-back",
      "core",
      "grip",
      "glutes",
      "quads"
    ],
    "primaryMuscles": [
      "upper-back",
      "core",
      "grip"
    ],
    "secondaryMuscles": [
      "glutes",
      "quads"
    ],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "sandbag",
      "carry"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Sandbag Bear Hug Carry",
      "sandbag-bear-hug-carry"
    ],
    "yt": "Sandbag Bear Hug Carry exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness",
      "strength"
    ],
    "styleBias": [
      "operational-fitness",
      "strength"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Hug the load tight and walk with short steps.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "sandbag-ground-to-shoulder",
    "name": "Sandbag Ground-to-Shoulder",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "sandbag"
    ],
    "styles": [
      "operational-fitness",
      "conditioning"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "glutes",
      "quads",
      "upper-back",
      "grip",
      "heart-lungs"
    ],
    "primaryMuscles": [
      "glutes",
      "quads",
      "upper-back"
    ],
    "secondaryMuscles": [
      "grip",
      "heart-lungs"
    ],
    "difficulty": [
      "advanced"
    ],
    "cautionIf": [
      "low-back-non-specific"
    ],
    "tags": [
      "sandbag",
      "operational"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Sandbag Ground-to-Shoulder",
      "sandbag-ground-to-shoulder"
    ],
    "yt": "Sandbag Ground-to-Shoulder exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness",
      "conditioning"
    ],
    "styleBias": [
      "operational-fitness",
      "conditioning"
    ],
    "jointStress": 3,
    "fatigueCost": 4,
    "skillDemand": 3,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Brace, lift close, and shoulder smoothly.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "dummy-drag-band-row",
    "name": "Dummy Drag Band Row",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "band"
    ],
    "styles": [
      "operational-fitness",
      "fire-rescue"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "lats",
      "quads",
      "grip",
      "core",
      "glutes"
    ],
    "primaryMuscles": [
      "lats",
      "quads",
      "grip"
    ],
    "secondaryMuscles": [
      "core",
      "glutes"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "low-back-non-specific",
      "shoulder-impingement"
    ],
    "tags": [
      "drag",
      "police",
      "fire"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Dummy Drag Band Row",
      "dummy-drag-band-row"
    ],
    "yt": "Dummy Drag Band Row exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness",
      "fire-rescue"
    ],
    "styleBias": [
      "operational-fitness",
      "fire-rescue"
    ],
    "jointStress": 2,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Drive legs and pull with a braced trunk.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "cone-shuttle-walk",
    "name": "Cone Shuttle Walk",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "calves",
      "quads",
      "glutes"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "calves"
    ],
    "secondaryMuscles": [
      "quads",
      "glutes"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [
      "achilles-pain",
      "plantar-fascia"
    ],
    "tags": [
      "shuttle",
      "low-impact"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Cone Shuttle Walk",
      "cone-shuttle-walk"
    ],
    "yt": "Cone Shuttle Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness",
      "rebuild-recovery"
    ],
    "styleBias": [
      "operational-fitness",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Turn under control and keep pace repeatable.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "lateral-shuffle",
    "name": "Lateral Shuffle",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "police-fitness",
      "conditioning"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "glute-med",
      "quads",
      "calves",
      "heart-lungs"
    ],
    "primaryMuscles": [
      "glute-med",
      "quads",
      "calves"
    ],
    "secondaryMuscles": [
      "heart-lungs"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "ankle-pain"
    ],
    "tags": [
      "agility"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Lateral Shuffle",
      "lateral-shuffle"
    ],
    "yt": "Lateral Shuffle exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "police-fitness",
      "conditioning"
    ],
    "styleBias": [
      "police-fitness",
      "conditioning"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Stay low and avoid crossing feet.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "stair-climb-intervals",
    "name": "Stair Climb Intervals",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "stairs"
    ],
    "styles": [
      "fire-rescue",
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "quads",
      "glutes",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core"
    ],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful",
      "achilles-pain"
    ],
    "tags": [
      "stairs",
      "fire"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Stair Climb Intervals",
      "stair-climb-intervals"
    ],
    "yt": "Stair Climb Intervals exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "fire-rescue",
      "operational-fitness"
    ],
    "styleBias": [
      "fire-rescue",
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Climb steadily and recover fully.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "loaded-step-down",
    "name": "Loaded Step-Down",
    "family": "lunge-split",
    "movement": "lunge-split",
    "equipment": [
      "db",
      "step"
    ],
    "styles": [
      "operational-fitness",
      "strength"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "quads",
      "glutes",
      "calves",
      "core"
    ],
    "primaryMuscles": [
      "quads",
      "glutes"
    ],
    "secondaryMuscles": [
      "calves",
      "core"
    ],
    "difficulty": [
      "intermediate"
    ],
    "cautionIf": [
      "clicky-knees-painful"
    ],
    "tags": [
      "deceleration",
      "stairs"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Loaded Step-Down",
      "loaded-step-down"
    ],
    "yt": "Loaded Step-Down exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness",
      "strength"
    ],
    "styleBias": [
      "operational-fitness",
      "strength"
    ],
    "jointStress": 2,
    "fatigueCost": 4,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Lower slowly and keep knee tracking well.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "breathing-ladder-walk",
    "name": "Breathing Ladder Walk",
    "family": "cardio-z2",
    "movement": "cardio-z2",
    "equipment": [
      "bw"
    ],
    "styles": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "heart-lungs",
      "diaphragm",
      "calves",
      "glutes"
    ],
    "primaryMuscles": [
      "heart-lungs",
      "diaphragm"
    ],
    "secondaryMuscles": [
      "calves",
      "glutes"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [],
    "tags": [
      "breathing"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Breathing Ladder Walk",
      "breathing-ladder-walk"
    ],
    "yt": "Breathing Ladder Walk exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "styleBias": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Gradually lengthen exhales while walking easily.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  },
  {
    "key": "pursed-lip-recovery-breathing",
    "name": "Pursed-Lip Recovery Breathing",
    "family": "cardio-z2",
    "movement": "cardio-z2",
    "equipment": [
      "bw"
    ],
    "styles": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "purposes": [
      "strength",
      "conditioning",
      "hypertrophy",
      "recovery"
    ],
    "muscles": [
      "diaphragm",
      "heart-lungs",
      "parasympathetic-recovery"
    ],
    "primaryMuscles": [
      "diaphragm",
      "heart-lungs"
    ],
    "secondaryMuscles": [
      "parasympathetic-recovery"
    ],
    "difficulty": [
      "beginner"
    ],
    "cautionIf": [],
    "tags": [
      "breathing",
      "recovery"
    ],
    "alternatives": [],
    "regressions": [],
    "progressions": [],
    "aliases": [
      "Pursed-Lip Recovery Breathing",
      "pursed-lip-recovery-breathing"
    ],
    "yt": "Pursed-Lip Recovery Breathing exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "styleBias": [
      "blue-light-resilience",
      "rebuild-recovery"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 4,
    "movementQuality": 4,
    "defaultRx": "3 sets of controlled reps",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Inhale gently, exhale slowly through pursed lips.",
    "source": "fff-exercise-db-v4.6-expansion-pack-2"
  }

,

  {
    "key": "hero-push-exercise-1",
    "name": "Hero Push Exercise 1",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 1",
      "hero-push-exercise-1"
    ],
    "yt": "Hero Push Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-2",
    "name": "Hero Push Exercise 2",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 2",
      "hero-push-exercise-2"
    ],
    "yt": "Hero Push Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-3",
    "name": "Hero Push Exercise 3",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 3",
      "hero-push-exercise-3"
    ],
    "yt": "Hero Push Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-4",
    "name": "Hero Push Exercise 4",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 4",
      "hero-push-exercise-4"
    ],
    "yt": "Hero Push Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-5",
    "name": "Hero Push Exercise 5",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 5",
      "hero-push-exercise-5"
    ],
    "yt": "Hero Push Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-6",
    "name": "Hero Push Exercise 6",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 6",
      "hero-push-exercise-6"
    ],
    "yt": "Hero Push Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-7",
    "name": "Hero Push Exercise 7",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 7",
      "hero-push-exercise-7"
    ],
    "yt": "Hero Push Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-8",
    "name": "Hero Push Exercise 8",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 8",
      "hero-push-exercise-8"
    ],
    "yt": "Hero Push Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-9",
    "name": "Hero Push Exercise 9",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 9",
      "hero-push-exercise-9"
    ],
    "yt": "Hero Push Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-10",
    "name": "Hero Push Exercise 10",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 10",
      "hero-push-exercise-10"
    ],
    "yt": "Hero Push Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-11",
    "name": "Hero Push Exercise 11",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 11",
      "hero-push-exercise-11"
    ],
    "yt": "Hero Push Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-12",
    "name": "Hero Push Exercise 12",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 12",
      "hero-push-exercise-12"
    ],
    "yt": "Hero Push Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-13",
    "name": "Hero Push Exercise 13",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 13",
      "hero-push-exercise-13"
    ],
    "yt": "Hero Push Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-push-exercise-14",
    "name": "Hero Push Exercise 14",
    "family": "horizontal-push",
    "movement": "horizontal-push",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-push"
    ],
    "aliases": [
      "Hero Push Exercise 14",
      "hero-push-exercise-14"
    ],
    "yt": "Hero Push Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-1",
    "name": "Hero Pull Exercise 1",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 1",
      "hero-pull-exercise-1"
    ],
    "yt": "Hero Pull Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-2",
    "name": "Hero Pull Exercise 2",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 2",
      "hero-pull-exercise-2"
    ],
    "yt": "Hero Pull Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-3",
    "name": "Hero Pull Exercise 3",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 3",
      "hero-pull-exercise-3"
    ],
    "yt": "Hero Pull Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-4",
    "name": "Hero Pull Exercise 4",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 4",
      "hero-pull-exercise-4"
    ],
    "yt": "Hero Pull Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-5",
    "name": "Hero Pull Exercise 5",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 5",
      "hero-pull-exercise-5"
    ],
    "yt": "Hero Pull Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-6",
    "name": "Hero Pull Exercise 6",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 6",
      "hero-pull-exercise-6"
    ],
    "yt": "Hero Pull Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-7",
    "name": "Hero Pull Exercise 7",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 7",
      "hero-pull-exercise-7"
    ],
    "yt": "Hero Pull Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-8",
    "name": "Hero Pull Exercise 8",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 8",
      "hero-pull-exercise-8"
    ],
    "yt": "Hero Pull Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-9",
    "name": "Hero Pull Exercise 9",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 9",
      "hero-pull-exercise-9"
    ],
    "yt": "Hero Pull Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-10",
    "name": "Hero Pull Exercise 10",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 10",
      "hero-pull-exercise-10"
    ],
    "yt": "Hero Pull Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-11",
    "name": "Hero Pull Exercise 11",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 11",
      "hero-pull-exercise-11"
    ],
    "yt": "Hero Pull Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-12",
    "name": "Hero Pull Exercise 12",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 12",
      "hero-pull-exercise-12"
    ],
    "yt": "Hero Pull Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-13",
    "name": "Hero Pull Exercise 13",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 13",
      "hero-pull-exercise-13"
    ],
    "yt": "Hero Pull Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-pull-exercise-14",
    "name": "Hero Pull Exercise 14",
    "family": "vertical-pull",
    "movement": "vertical-pull",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-pull"
    ],
    "aliases": [
      "Hero Pull Exercise 14",
      "hero-pull-exercise-14"
    ],
    "yt": "Hero Pull Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-1",
    "name": "Hero Carry Exercise 1",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 1",
      "hero-carry-exercise-1"
    ],
    "yt": "Hero Carry Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-2",
    "name": "Hero Carry Exercise 2",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 2",
      "hero-carry-exercise-2"
    ],
    "yt": "Hero Carry Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-3",
    "name": "Hero Carry Exercise 3",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 3",
      "hero-carry-exercise-3"
    ],
    "yt": "Hero Carry Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-4",
    "name": "Hero Carry Exercise 4",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 4",
      "hero-carry-exercise-4"
    ],
    "yt": "Hero Carry Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-5",
    "name": "Hero Carry Exercise 5",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 5",
      "hero-carry-exercise-5"
    ],
    "yt": "Hero Carry Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-6",
    "name": "Hero Carry Exercise 6",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 6",
      "hero-carry-exercise-6"
    ],
    "yt": "Hero Carry Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-7",
    "name": "Hero Carry Exercise 7",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 7",
      "hero-carry-exercise-7"
    ],
    "yt": "Hero Carry Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-8",
    "name": "Hero Carry Exercise 8",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 8",
      "hero-carry-exercise-8"
    ],
    "yt": "Hero Carry Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-9",
    "name": "Hero Carry Exercise 9",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 9",
      "hero-carry-exercise-9"
    ],
    "yt": "Hero Carry Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-10",
    "name": "Hero Carry Exercise 10",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 10",
      "hero-carry-exercise-10"
    ],
    "yt": "Hero Carry Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-11",
    "name": "Hero Carry Exercise 11",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 11",
      "hero-carry-exercise-11"
    ],
    "yt": "Hero Carry Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-12",
    "name": "Hero Carry Exercise 12",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 12",
      "hero-carry-exercise-12"
    ],
    "yt": "Hero Carry Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-13",
    "name": "Hero Carry Exercise 13",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 13",
      "hero-carry-exercise-13"
    ],
    "yt": "Hero Carry Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hero-carry-exercise-14",
    "name": "Hero Carry Exercise 14",
    "family": "carry-grip",
    "movement": "carry-grip",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hero-carry"
    ],
    "aliases": [
      "Hero Carry Exercise 14",
      "hero-carry-exercise-14"
    ],
    "yt": "Hero Carry Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-1",
    "name": "Police Conditioning Exercise 1",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 1",
      "police-conditioning-exercise-1"
    ],
    "yt": "Police Conditioning Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-2",
    "name": "Police Conditioning Exercise 2",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 2",
      "police-conditioning-exercise-2"
    ],
    "yt": "Police Conditioning Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-3",
    "name": "Police Conditioning Exercise 3",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 3",
      "police-conditioning-exercise-3"
    ],
    "yt": "Police Conditioning Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-4",
    "name": "Police Conditioning Exercise 4",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 4",
      "police-conditioning-exercise-4"
    ],
    "yt": "Police Conditioning Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-5",
    "name": "Police Conditioning Exercise 5",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 5",
      "police-conditioning-exercise-5"
    ],
    "yt": "Police Conditioning Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-6",
    "name": "Police Conditioning Exercise 6",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 6",
      "police-conditioning-exercise-6"
    ],
    "yt": "Police Conditioning Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-7",
    "name": "Police Conditioning Exercise 7",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 7",
      "police-conditioning-exercise-7"
    ],
    "yt": "Police Conditioning Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-8",
    "name": "Police Conditioning Exercise 8",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 8",
      "police-conditioning-exercise-8"
    ],
    "yt": "Police Conditioning Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-9",
    "name": "Police Conditioning Exercise 9",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 9",
      "police-conditioning-exercise-9"
    ],
    "yt": "Police Conditioning Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-10",
    "name": "Police Conditioning Exercise 10",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 10",
      "police-conditioning-exercise-10"
    ],
    "yt": "Police Conditioning Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-11",
    "name": "Police Conditioning Exercise 11",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 11",
      "police-conditioning-exercise-11"
    ],
    "yt": "Police Conditioning Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-12",
    "name": "Police Conditioning Exercise 12",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 12",
      "police-conditioning-exercise-12"
    ],
    "yt": "Police Conditioning Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-13",
    "name": "Police Conditioning Exercise 13",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 13",
      "police-conditioning-exercise-13"
    ],
    "yt": "Police Conditioning Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "police-conditioning-exercise-14",
    "name": "Police Conditioning Exercise 14",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "police-conditioning"
    ],
    "aliases": [
      "Police Conditioning Exercise 14",
      "police-conditioning-exercise-14"
    ],
    "yt": "Police Conditioning Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-1",
    "name": "Fire Rescue Exercise 1",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 1",
      "fire-rescue-exercise-1"
    ],
    "yt": "Fire Rescue Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-2",
    "name": "Fire Rescue Exercise 2",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 2",
      "fire-rescue-exercise-2"
    ],
    "yt": "Fire Rescue Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-3",
    "name": "Fire Rescue Exercise 3",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 3",
      "fire-rescue-exercise-3"
    ],
    "yt": "Fire Rescue Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-4",
    "name": "Fire Rescue Exercise 4",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 4",
      "fire-rescue-exercise-4"
    ],
    "yt": "Fire Rescue Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-5",
    "name": "Fire Rescue Exercise 5",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 5",
      "fire-rescue-exercise-5"
    ],
    "yt": "Fire Rescue Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-6",
    "name": "Fire Rescue Exercise 6",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 6",
      "fire-rescue-exercise-6"
    ],
    "yt": "Fire Rescue Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-7",
    "name": "Fire Rescue Exercise 7",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 7",
      "fire-rescue-exercise-7"
    ],
    "yt": "Fire Rescue Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-8",
    "name": "Fire Rescue Exercise 8",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 8",
      "fire-rescue-exercise-8"
    ],
    "yt": "Fire Rescue Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-9",
    "name": "Fire Rescue Exercise 9",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 9",
      "fire-rescue-exercise-9"
    ],
    "yt": "Fire Rescue Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-10",
    "name": "Fire Rescue Exercise 10",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 10",
      "fire-rescue-exercise-10"
    ],
    "yt": "Fire Rescue Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-11",
    "name": "Fire Rescue Exercise 11",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 11",
      "fire-rescue-exercise-11"
    ],
    "yt": "Fire Rescue Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-12",
    "name": "Fire Rescue Exercise 12",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 12",
      "fire-rescue-exercise-12"
    ],
    "yt": "Fire Rescue Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-13",
    "name": "Fire Rescue Exercise 13",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 13",
      "fire-rescue-exercise-13"
    ],
    "yt": "Fire Rescue Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fire-rescue-exercise-14",
    "name": "Fire Rescue Exercise 14",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fire-rescue"
    ],
    "aliases": [
      "Fire Rescue Exercise 14",
      "fire-rescue-exercise-14"
    ],
    "yt": "Fire Rescue Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-1",
    "name": "Search Rescue Exercise 1",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 1",
      "search-rescue-exercise-1"
    ],
    "yt": "Search Rescue Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-2",
    "name": "Search Rescue Exercise 2",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 2",
      "search-rescue-exercise-2"
    ],
    "yt": "Search Rescue Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-3",
    "name": "Search Rescue Exercise 3",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 3",
      "search-rescue-exercise-3"
    ],
    "yt": "Search Rescue Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-4",
    "name": "Search Rescue Exercise 4",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 4",
      "search-rescue-exercise-4"
    ],
    "yt": "Search Rescue Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-5",
    "name": "Search Rescue Exercise 5",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 5",
      "search-rescue-exercise-5"
    ],
    "yt": "Search Rescue Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-6",
    "name": "Search Rescue Exercise 6",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 6",
      "search-rescue-exercise-6"
    ],
    "yt": "Search Rescue Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-7",
    "name": "Search Rescue Exercise 7",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 7",
      "search-rescue-exercise-7"
    ],
    "yt": "Search Rescue Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-8",
    "name": "Search Rescue Exercise 8",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 8",
      "search-rescue-exercise-8"
    ],
    "yt": "Search Rescue Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-9",
    "name": "Search Rescue Exercise 9",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 9",
      "search-rescue-exercise-9"
    ],
    "yt": "Search Rescue Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-10",
    "name": "Search Rescue Exercise 10",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 10",
      "search-rescue-exercise-10"
    ],
    "yt": "Search Rescue Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-11",
    "name": "Search Rescue Exercise 11",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 11",
      "search-rescue-exercise-11"
    ],
    "yt": "Search Rescue Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-12",
    "name": "Search Rescue Exercise 12",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 12",
      "search-rescue-exercise-12"
    ],
    "yt": "Search Rescue Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-13",
    "name": "Search Rescue Exercise 13",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 13",
      "search-rescue-exercise-13"
    ],
    "yt": "Search Rescue Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "search-rescue-exercise-14",
    "name": "Search Rescue Exercise 14",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "search-rescue"
    ],
    "aliases": [
      "Search Rescue Exercise 14",
      "search-rescue-exercise-14"
    ],
    "yt": "Search Rescue Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-1",
    "name": "TA Conditioning Exercise 1",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 1",
      "ta-conditioning-exercise-1"
    ],
    "yt": "TA Conditioning Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-2",
    "name": "TA Conditioning Exercise 2",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 2",
      "ta-conditioning-exercise-2"
    ],
    "yt": "TA Conditioning Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-3",
    "name": "TA Conditioning Exercise 3",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 3",
      "ta-conditioning-exercise-3"
    ],
    "yt": "TA Conditioning Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-4",
    "name": "TA Conditioning Exercise 4",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 4",
      "ta-conditioning-exercise-4"
    ],
    "yt": "TA Conditioning Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-5",
    "name": "TA Conditioning Exercise 5",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 5",
      "ta-conditioning-exercise-5"
    ],
    "yt": "TA Conditioning Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-6",
    "name": "TA Conditioning Exercise 6",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 6",
      "ta-conditioning-exercise-6"
    ],
    "yt": "TA Conditioning Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-7",
    "name": "TA Conditioning Exercise 7",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 7",
      "ta-conditioning-exercise-7"
    ],
    "yt": "TA Conditioning Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-8",
    "name": "TA Conditioning Exercise 8",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 8",
      "ta-conditioning-exercise-8"
    ],
    "yt": "TA Conditioning Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-9",
    "name": "TA Conditioning Exercise 9",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 9",
      "ta-conditioning-exercise-9"
    ],
    "yt": "TA Conditioning Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-10",
    "name": "TA Conditioning Exercise 10",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 10",
      "ta-conditioning-exercise-10"
    ],
    "yt": "TA Conditioning Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-11",
    "name": "TA Conditioning Exercise 11",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 11",
      "ta-conditioning-exercise-11"
    ],
    "yt": "TA Conditioning Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-12",
    "name": "TA Conditioning Exercise 12",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 12",
      "ta-conditioning-exercise-12"
    ],
    "yt": "TA Conditioning Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-13",
    "name": "TA Conditioning Exercise 13",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 13",
      "ta-conditioning-exercise-13"
    ],
    "yt": "TA Conditioning Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "ta-conditioning-exercise-14",
    "name": "TA Conditioning Exercise 14",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "ta-conditioning"
    ],
    "aliases": [
      "TA Conditioning Exercise 14",
      "ta-conditioning-exercise-14"
    ],
    "yt": "TA Conditioning Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-1",
    "name": "Knee Capacity Exercise 1",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 1",
      "knee-capacity-exercise-1"
    ],
    "yt": "Knee Capacity Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-2",
    "name": "Knee Capacity Exercise 2",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 2",
      "knee-capacity-exercise-2"
    ],
    "yt": "Knee Capacity Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-3",
    "name": "Knee Capacity Exercise 3",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 3",
      "knee-capacity-exercise-3"
    ],
    "yt": "Knee Capacity Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-4",
    "name": "Knee Capacity Exercise 4",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 4",
      "knee-capacity-exercise-4"
    ],
    "yt": "Knee Capacity Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-5",
    "name": "Knee Capacity Exercise 5",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 5",
      "knee-capacity-exercise-5"
    ],
    "yt": "Knee Capacity Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-6",
    "name": "Knee Capacity Exercise 6",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 6",
      "knee-capacity-exercise-6"
    ],
    "yt": "Knee Capacity Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-7",
    "name": "Knee Capacity Exercise 7",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 7",
      "knee-capacity-exercise-7"
    ],
    "yt": "Knee Capacity Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-8",
    "name": "Knee Capacity Exercise 8",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 8",
      "knee-capacity-exercise-8"
    ],
    "yt": "Knee Capacity Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-9",
    "name": "Knee Capacity Exercise 9",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 9",
      "knee-capacity-exercise-9"
    ],
    "yt": "Knee Capacity Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-10",
    "name": "Knee Capacity Exercise 10",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 10",
      "knee-capacity-exercise-10"
    ],
    "yt": "Knee Capacity Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-11",
    "name": "Knee Capacity Exercise 11",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 11",
      "knee-capacity-exercise-11"
    ],
    "yt": "Knee Capacity Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-12",
    "name": "Knee Capacity Exercise 12",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 12",
      "knee-capacity-exercise-12"
    ],
    "yt": "Knee Capacity Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-13",
    "name": "Knee Capacity Exercise 13",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 13",
      "knee-capacity-exercise-13"
    ],
    "yt": "Knee Capacity Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "knee-capacity-exercise-14",
    "name": "Knee Capacity Exercise 14",
    "family": "squat",
    "movement": "squat",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "knee-capacity"
    ],
    "aliases": [
      "Knee Capacity Exercise 14",
      "knee-capacity-exercise-14"
    ],
    "yt": "Knee Capacity Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-1",
    "name": "Hip Reset Exercise 1",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 1",
      "hip-reset-exercise-1"
    ],
    "yt": "Hip Reset Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-2",
    "name": "Hip Reset Exercise 2",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 2",
      "hip-reset-exercise-2"
    ],
    "yt": "Hip Reset Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-3",
    "name": "Hip Reset Exercise 3",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 3",
      "hip-reset-exercise-3"
    ],
    "yt": "Hip Reset Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-4",
    "name": "Hip Reset Exercise 4",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 4",
      "hip-reset-exercise-4"
    ],
    "yt": "Hip Reset Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-5",
    "name": "Hip Reset Exercise 5",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 5",
      "hip-reset-exercise-5"
    ],
    "yt": "Hip Reset Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-6",
    "name": "Hip Reset Exercise 6",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 6",
      "hip-reset-exercise-6"
    ],
    "yt": "Hip Reset Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-7",
    "name": "Hip Reset Exercise 7",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 7",
      "hip-reset-exercise-7"
    ],
    "yt": "Hip Reset Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-8",
    "name": "Hip Reset Exercise 8",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 8",
      "hip-reset-exercise-8"
    ],
    "yt": "Hip Reset Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-9",
    "name": "Hip Reset Exercise 9",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 9",
      "hip-reset-exercise-9"
    ],
    "yt": "Hip Reset Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-10",
    "name": "Hip Reset Exercise 10",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 10",
      "hip-reset-exercise-10"
    ],
    "yt": "Hip Reset Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-11",
    "name": "Hip Reset Exercise 11",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 11",
      "hip-reset-exercise-11"
    ],
    "yt": "Hip Reset Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-12",
    "name": "Hip Reset Exercise 12",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 12",
      "hip-reset-exercise-12"
    ],
    "yt": "Hip Reset Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-13",
    "name": "Hip Reset Exercise 13",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 13",
      "hip-reset-exercise-13"
    ],
    "yt": "Hip Reset Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "hip-reset-exercise-14",
    "name": "Hip Reset Exercise 14",
    "family": "hip-extension",
    "movement": "hip-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "hip-reset"
    ],
    "aliases": [
      "Hip Reset Exercise 14",
      "hip-reset-exercise-14"
    ],
    "yt": "Hip Reset Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-1",
    "name": "Lower Leg Stability Exercise 1",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 1",
      "lower-leg-stability-exercise-1"
    ],
    "yt": "Lower Leg Stability Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-2",
    "name": "Lower Leg Stability Exercise 2",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 2",
      "lower-leg-stability-exercise-2"
    ],
    "yt": "Lower Leg Stability Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-3",
    "name": "Lower Leg Stability Exercise 3",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 3",
      "lower-leg-stability-exercise-3"
    ],
    "yt": "Lower Leg Stability Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-4",
    "name": "Lower Leg Stability Exercise 4",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 4",
      "lower-leg-stability-exercise-4"
    ],
    "yt": "Lower Leg Stability Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-5",
    "name": "Lower Leg Stability Exercise 5",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 5",
      "lower-leg-stability-exercise-5"
    ],
    "yt": "Lower Leg Stability Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-6",
    "name": "Lower Leg Stability Exercise 6",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 6",
      "lower-leg-stability-exercise-6"
    ],
    "yt": "Lower Leg Stability Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-7",
    "name": "Lower Leg Stability Exercise 7",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 7",
      "lower-leg-stability-exercise-7"
    ],
    "yt": "Lower Leg Stability Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-8",
    "name": "Lower Leg Stability Exercise 8",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 8",
      "lower-leg-stability-exercise-8"
    ],
    "yt": "Lower Leg Stability Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-9",
    "name": "Lower Leg Stability Exercise 9",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 9",
      "lower-leg-stability-exercise-9"
    ],
    "yt": "Lower Leg Stability Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-10",
    "name": "Lower Leg Stability Exercise 10",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 10",
      "lower-leg-stability-exercise-10"
    ],
    "yt": "Lower Leg Stability Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-11",
    "name": "Lower Leg Stability Exercise 11",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 11",
      "lower-leg-stability-exercise-11"
    ],
    "yt": "Lower Leg Stability Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-12",
    "name": "Lower Leg Stability Exercise 12",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 12",
      "lower-leg-stability-exercise-12"
    ],
    "yt": "Lower Leg Stability Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-13",
    "name": "Lower Leg Stability Exercise 13",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 13",
      "lower-leg-stability-exercise-13"
    ],
    "yt": "Lower Leg Stability Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lower-leg-stability-exercise-14",
    "name": "Lower Leg Stability Exercise 14",
    "family": "calf-ankle",
    "movement": "calf-ankle",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lower-leg-stability"
    ],
    "aliases": [
      "Lower Leg Stability Exercise 14",
      "lower-leg-stability-exercise-14"
    ],
    "yt": "Lower Leg Stability Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-1",
    "name": "Joint Control Exercise 1",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 1",
      "joint-control-exercise-1"
    ],
    "yt": "Joint Control Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-2",
    "name": "Joint Control Exercise 2",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 2",
      "joint-control-exercise-2"
    ],
    "yt": "Joint Control Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-3",
    "name": "Joint Control Exercise 3",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 3",
      "joint-control-exercise-3"
    ],
    "yt": "Joint Control Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-4",
    "name": "Joint Control Exercise 4",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 4",
      "joint-control-exercise-4"
    ],
    "yt": "Joint Control Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-5",
    "name": "Joint Control Exercise 5",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 5",
      "joint-control-exercise-5"
    ],
    "yt": "Joint Control Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-6",
    "name": "Joint Control Exercise 6",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 6",
      "joint-control-exercise-6"
    ],
    "yt": "Joint Control Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-7",
    "name": "Joint Control Exercise 7",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 7",
      "joint-control-exercise-7"
    ],
    "yt": "Joint Control Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-8",
    "name": "Joint Control Exercise 8",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 8",
      "joint-control-exercise-8"
    ],
    "yt": "Joint Control Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-9",
    "name": "Joint Control Exercise 9",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 9",
      "joint-control-exercise-9"
    ],
    "yt": "Joint Control Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-10",
    "name": "Joint Control Exercise 10",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 10",
      "joint-control-exercise-10"
    ],
    "yt": "Joint Control Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-11",
    "name": "Joint Control Exercise 11",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 11",
      "joint-control-exercise-11"
    ],
    "yt": "Joint Control Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-12",
    "name": "Joint Control Exercise 12",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 12",
      "joint-control-exercise-12"
    ],
    "yt": "Joint Control Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-13",
    "name": "Joint Control Exercise 13",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 13",
      "joint-control-exercise-13"
    ],
    "yt": "Joint Control Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "joint-control-exercise-14",
    "name": "Joint Control Exercise 14",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "joint-control"
    ],
    "aliases": [
      "Joint Control Exercise 14",
      "joint-control-exercise-14"
    ],
    "yt": "Joint Control Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-1",
    "name": "Fascia Flow Exercise 1",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 1",
      "fascia-flow-exercise-1"
    ],
    "yt": "Fascia Flow Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-2",
    "name": "Fascia Flow Exercise 2",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 2",
      "fascia-flow-exercise-2"
    ],
    "yt": "Fascia Flow Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-3",
    "name": "Fascia Flow Exercise 3",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 3",
      "fascia-flow-exercise-3"
    ],
    "yt": "Fascia Flow Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-4",
    "name": "Fascia Flow Exercise 4",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 4",
      "fascia-flow-exercise-4"
    ],
    "yt": "Fascia Flow Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-5",
    "name": "Fascia Flow Exercise 5",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 5",
      "fascia-flow-exercise-5"
    ],
    "yt": "Fascia Flow Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-6",
    "name": "Fascia Flow Exercise 6",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 6",
      "fascia-flow-exercise-6"
    ],
    "yt": "Fascia Flow Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-7",
    "name": "Fascia Flow Exercise 7",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 7",
      "fascia-flow-exercise-7"
    ],
    "yt": "Fascia Flow Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-8",
    "name": "Fascia Flow Exercise 8",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 8",
      "fascia-flow-exercise-8"
    ],
    "yt": "Fascia Flow Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-9",
    "name": "Fascia Flow Exercise 9",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 9",
      "fascia-flow-exercise-9"
    ],
    "yt": "Fascia Flow Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-10",
    "name": "Fascia Flow Exercise 10",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 10",
      "fascia-flow-exercise-10"
    ],
    "yt": "Fascia Flow Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-11",
    "name": "Fascia Flow Exercise 11",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 11",
      "fascia-flow-exercise-11"
    ],
    "yt": "Fascia Flow Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-12",
    "name": "Fascia Flow Exercise 12",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 12",
      "fascia-flow-exercise-12"
    ],
    "yt": "Fascia Flow Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-13",
    "name": "Fascia Flow Exercise 13",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 13",
      "fascia-flow-exercise-13"
    ],
    "yt": "Fascia Flow Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "fascia-flow-exercise-14",
    "name": "Fascia Flow Exercise 14",
    "family": "mobility-recovery",
    "movement": "mobility-recovery",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "fascia-flow"
    ],
    "aliases": [
      "Fascia Flow Exercise 14",
      "fascia-flow-exercise-14"
    ],
    "yt": "Fascia Flow Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-1",
    "name": "Lymphatic Flow Exercise 1",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 1",
      "lymphatic-flow-exercise-1"
    ],
    "yt": "Lymphatic Flow Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-2",
    "name": "Lymphatic Flow Exercise 2",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 2",
      "lymphatic-flow-exercise-2"
    ],
    "yt": "Lymphatic Flow Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-3",
    "name": "Lymphatic Flow Exercise 3",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 3",
      "lymphatic-flow-exercise-3"
    ],
    "yt": "Lymphatic Flow Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-4",
    "name": "Lymphatic Flow Exercise 4",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 4",
      "lymphatic-flow-exercise-4"
    ],
    "yt": "Lymphatic Flow Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-5",
    "name": "Lymphatic Flow Exercise 5",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 5",
      "lymphatic-flow-exercise-5"
    ],
    "yt": "Lymphatic Flow Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-6",
    "name": "Lymphatic Flow Exercise 6",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 6",
      "lymphatic-flow-exercise-6"
    ],
    "yt": "Lymphatic Flow Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-7",
    "name": "Lymphatic Flow Exercise 7",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 7",
      "lymphatic-flow-exercise-7"
    ],
    "yt": "Lymphatic Flow Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-8",
    "name": "Lymphatic Flow Exercise 8",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 8",
      "lymphatic-flow-exercise-8"
    ],
    "yt": "Lymphatic Flow Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-9",
    "name": "Lymphatic Flow Exercise 9",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 9",
      "lymphatic-flow-exercise-9"
    ],
    "yt": "Lymphatic Flow Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-10",
    "name": "Lymphatic Flow Exercise 10",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 10",
      "lymphatic-flow-exercise-10"
    ],
    "yt": "Lymphatic Flow Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-11",
    "name": "Lymphatic Flow Exercise 11",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 11",
      "lymphatic-flow-exercise-11"
    ],
    "yt": "Lymphatic Flow Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-12",
    "name": "Lymphatic Flow Exercise 12",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 12",
      "lymphatic-flow-exercise-12"
    ],
    "yt": "Lymphatic Flow Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-13",
    "name": "Lymphatic Flow Exercise 13",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 13",
      "lymphatic-flow-exercise-13"
    ],
    "yt": "Lymphatic Flow Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "lymphatic-flow-exercise-14",
    "name": "Lymphatic Flow Exercise 14",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "lymphatic-flow"
    ],
    "aliases": [
      "Lymphatic Flow Exercise 14",
      "lymphatic-flow-exercise-14"
    ],
    "yt": "Lymphatic Flow Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-1",
    "name": "Running Drill Exercise 1",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 1",
      "running-drill-exercise-1"
    ],
    "yt": "Running Drill Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-2",
    "name": "Running Drill Exercise 2",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 2",
      "running-drill-exercise-2"
    ],
    "yt": "Running Drill Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-3",
    "name": "Running Drill Exercise 3",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 3",
      "running-drill-exercise-3"
    ],
    "yt": "Running Drill Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-4",
    "name": "Running Drill Exercise 4",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 4",
      "running-drill-exercise-4"
    ],
    "yt": "Running Drill Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-5",
    "name": "Running Drill Exercise 5",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 5",
      "running-drill-exercise-5"
    ],
    "yt": "Running Drill Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-6",
    "name": "Running Drill Exercise 6",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 6",
      "running-drill-exercise-6"
    ],
    "yt": "Running Drill Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-7",
    "name": "Running Drill Exercise 7",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 7",
      "running-drill-exercise-7"
    ],
    "yt": "Running Drill Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-8",
    "name": "Running Drill Exercise 8",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 8",
      "running-drill-exercise-8"
    ],
    "yt": "Running Drill Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-9",
    "name": "Running Drill Exercise 9",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 9",
      "running-drill-exercise-9"
    ],
    "yt": "Running Drill Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-10",
    "name": "Running Drill Exercise 10",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 10",
      "running-drill-exercise-10"
    ],
    "yt": "Running Drill Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-11",
    "name": "Running Drill Exercise 11",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 11",
      "running-drill-exercise-11"
    ],
    "yt": "Running Drill Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-12",
    "name": "Running Drill Exercise 12",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 12",
      "running-drill-exercise-12"
    ],
    "yt": "Running Drill Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-13",
    "name": "Running Drill Exercise 13",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 13",
      "running-drill-exercise-13"
    ],
    "yt": "Running Drill Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "running-drill-exercise-14",
    "name": "Running Drill Exercise 14",
    "family": "conditioning",
    "movement": "conditioning",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "running-drill"
    ],
    "aliases": [
      "Running Drill Exercise 14",
      "running-drill-exercise-14"
    ],
    "yt": "Running Drill Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-1",
    "name": "Core Control Exercise 1",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 1",
      "core-control-exercise-1"
    ],
    "yt": "Core Control Exercise 1 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-2",
    "name": "Core Control Exercise 2",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 2",
      "core-control-exercise-2"
    ],
    "yt": "Core Control Exercise 2 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-3",
    "name": "Core Control Exercise 3",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 3",
      "core-control-exercise-3"
    ],
    "yt": "Core Control Exercise 3 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-4",
    "name": "Core Control Exercise 4",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 4",
      "core-control-exercise-4"
    ],
    "yt": "Core Control Exercise 4 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-5",
    "name": "Core Control Exercise 5",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 5",
      "core-control-exercise-5"
    ],
    "yt": "Core Control Exercise 5 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-6",
    "name": "Core Control Exercise 6",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 6",
      "core-control-exercise-6"
    ],
    "yt": "Core Control Exercise 6 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-7",
    "name": "Core Control Exercise 7",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "beginner",
      "intermediate"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 7",
      "core-control-exercise-7"
    ],
    "yt": "Core Control Exercise 7 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-8",
    "name": "Core Control Exercise 8",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 8",
      "core-control-exercise-8"
    ],
    "yt": "Core Control Exercise 8 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-9",
    "name": "Core Control Exercise 9",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 9",
      "core-control-exercise-9"
    ],
    "yt": "Core Control Exercise 9 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-10",
    "name": "Core Control Exercise 10",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 10",
      "core-control-exercise-10"
    ],
    "yt": "Core Control Exercise 10 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-11",
    "name": "Core Control Exercise 11",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 11",
      "core-control-exercise-11"
    ],
    "yt": "Core Control Exercise 11 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-12",
    "name": "Core Control Exercise 12",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 12",
      "core-control-exercise-12"
    ],
    "yt": "Core Control Exercise 12 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-13",
    "name": "Core Control Exercise 13",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 13",
      "core-control-exercise-13"
    ],
    "yt": "Core Control Exercise 13 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  },
  {
    "key": "core-control-exercise-14",
    "name": "Core Control Exercise 14",
    "family": "core-anti-extension",
    "movement": "core-anti-extension",
    "equipment": [
      "bw"
    ],
    "styles": [
      "operational-fitness"
    ],
    "purposes": [
      "strength",
      "conditioning"
    ],
    "muscles": [
      "full-body"
    ],
    "primaryMuscles": [
      "full-body"
    ],
    "secondaryMuscles": [],
    "difficulty": [
      "intermediate",
      "advanced"
    ],
    "cautionIf": [],
    "tags": [
      "core-control"
    ],
    "aliases": [
      "Core Control Exercise 14",
      "core-control-exercise-14"
    ],
    "yt": "Core Control Exercise 14 exercise form",
    "phaseUse": [
      "cut",
      "transform",
      "maintain",
      "bulk",
      "recomp",
      "build"
    ],
    "domains": [
      "operational-fitness"
    ],
    "styleBias": [
      "operational-fitness"
    ],
    "jointStress": 2,
    "fatigueCost": 3,
    "skillDemand": 2,
    "cognitiveLoad": 1,
    "recoveryFriendliness": 3,
    "movementQuality": 4,
    "defaultRx": "3 sets",
    "tempo": "controlled",
    "rest": "60-120 sec",
    "coachingCue": "Move with control and maintain good form.",
    "source": "fff-exercise-db-v4.7-expansion-pack-3"
  }


];
  const PROGRESSION_TREES = {
  "push-up": [
    "wall-push-up",
    "incline-push-up",
    "pushup",
    "ringpush",
    "pseudo-planche-push-up"
  ],
  "pull-up": [
    "bandrow",
    "scapular-pull-up",
    "assisted-pull-up",
    "pull-up"
  ],
  "tennis-elbow-rebuild": [
    "isometric-grip-light",
    "wrist-extensor-eccentric",
    "bandrow",
    "chest-supported-row",
    "ringrow"
  ],
  "outer-biceps-left-rebuild": [
    "bandrow",
    "hammer-curl",
    "chest-supported-row",
    "assisted-pull-up",
    "pull-up"
  ],
  "hip-tendon-rebuild": [
    "hip-flexor-isometric",
    "glute-bridge",
    "mat-leg-circles",
    "step-up-low",
    "supported-split-squat",
    "stepup"
  ],
  "clicky-knee-control": [
    "sit-to-stand",
    "wall-sit",
    "box-squat",
    "step-up-low",
    "spanish-squat-hold",
    "goblet-squat"
  ],
  "low-back-rebuild": [
    "dead-bug",
    "bird-dog",
    "sidepl",
    "glute-bridge",
    "dumbbell-rdl"
  ],
  "pilates-core": [
    "breathing-reset",
    "posterior-pelvic-tilt-drill",
    "dead-bug",
    "pilates-hundred-prep",
    "pelvic-curl"
  ],
  "calisthenics-core": [
    "dead-bug",
    "hollow-hold",
    "l-sit-tuck"
  ]
};

  function normalise(str) { return String(str || '').toLowerCase().replace(/[–—−]/g,'-').replace(/&/g,'and').replace(/[^a-z0-9+\- ]+/g,' ').replace(/\s+/g,' ').trim(); }
  function slug(str) { return normalise(str).replace(/\s+/g,'-'); }
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
  function safeArray(v) { return Array.isArray(v) ? v : []; }
  function unique(arr) { const seen={}, out=[]; (arr||[]).forEach(v=>{const k=normalise(v); if(k&&!seen[k]){seen[k]=true; out.push(v);}}); return out; }
  function hasAny(arr, vals) { arr=arr||[]; vals=vals||[]; return vals.some(v=>arr.indexOf(v)>-1); }

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
    const direct = BY_KEY[slug(nameOrKey)];
    if(direct) return clone(direct);
    const exact = BY_NAME[normalise(nameOrKey)];
    if(exact) return clone(exact);
    const n = normalise(nameOrKey); let best=null, score=0;
    EXERCISES.forEach(ex => {
      let s=0;
      if(normalise(ex.name).indexOf(n)>-1 || n.indexOf(normalise(ex.name))>-1) s+=4;
      (ex.aliases||[]).forEach(a=>{ if(normalise(a).indexOf(n)>-1 || n.indexOf(normalise(a))>-1) s+=2; });
      if(s>score){best=ex; score=s;}
    });
    return best ? clone(best) : null;
  }

  function labelForKey(key) { const found = BY_KEY[key] || findExercise(key); return found ? found.name : key; }

  function fallbackProfile(name) { return { name:name||'Unknown Exercise', key:slug(name), family:'general', patterns:['general'], primaryJoints:['general'], tissues:['general'], riskZones:['general'], commonFailurePoints:['load outpacing control','rushing reps','ignoring recovery context'], regressions:[], progressions:[], alternatives:[], aliases:[], confidence:'low' }; }

  function getExerciseProfile(name) {
    const ex = findExercise(name); if(!ex) return fallbackProfile(name);
    const fam = familyByKey(ex.family);
    return {
      name:ex.name, key:ex.key, family:ex.family, movement:ex.movement || ex.family,
      patterns:fam ? fam.patterns.slice() : [ex.family], primaryJoints:fam ? fam.primaryJoints.slice() : [],
      tissues:unique((fam ? fam.tissues : []).concat(ex.muscles || [])), riskZones:fam ? fam.riskZones.slice() : [],
      commonFailurePoints:fam ? fam.commonFailurePoints.slice() : [],
      regressions:(ex.regressions || []).map(labelForKey), progressions:(ex.progressions || []).map(labelForKey), alternatives:(ex.alternatives || []).map(labelForKey),
      equipment:(ex.equipment || []).slice(), styles:(ex.styles || []).slice(), purposes:(ex.purposes || []).slice(), muscles:(ex.muscles || []).slice(), cautionIf:(ex.cautionIf || []).slice(), tags:(ex.tags || []).slice(), aliases:(ex.aliases || []).slice(), phaseUse:(ex.phaseUse || []).slice(), domains:(ex.domains || []).slice(), styleBias:(ex.styleBias || []).slice(),
      jointStress:ex.jointStress, fatigueCost:ex.fatigueCost, skillDemand:ex.skillDemand, cognitiveLoad:ex.cognitiveLoad, recoveryFriendliness:ex.recoveryFriendliness, movementQuality:ex.movementQuality, yt:ex.yt, defaultRx:ex.defaultRx, tempo:ex.tempo, rest:ex.rest, coachingCue:ex.coachingCue, confidence:'high'
    };
  }

  function getFamilySummary(name) { const p=getExerciseProfile(name); return { family:p.family, patterns:p.patterns, riskZones:p.riskZones, likelySwapTargets:p.regressions.concat(p.alternatives), likelyProgressions:p.progressions }; }
  function areRelatedExercises(a,b) { const pa=getExerciseProfile(a), pb=getExerciseProfile(b); return !!(pa&&pb&&(pa.family===pb.family || pa.patterns.some(p=>pb.patterns.indexOf(p)>-1))); }
  function analyseGroup(names) { const profiles=(Array.isArray(names)?names:[]).map(getExerciseProfile); return { count:profiles.length, families:unique(profiles.map(p=>p.family)), riskZones:unique([].concat.apply([], profiles.map(p=>p.riskZones||[]))), tissues:unique([].concat.apply([], profiles.map(p=>p.tissues||[]))) }; }

  function contextStyle(context) { const s=slug((context||{}).trainingStyle || (context||{}).stylePreference || (context||{}).style || ''); return STYLE_PROFILES[s] ? s : ''; }

  function scoreExerciseForContext(exercise, context) {
    exercise = typeof exercise === 'string' ? findExercise(exercise) : exercise; if(!exercise) return -999; context=context||{};
    const injuries=safeArray(context.injuries||[]).map(slug);
    const equipment=safeArray(context.equipment||[]).map(slug);
    const styleKey=contextStyle(context); const style=styleKey ? STYLE_PROFILES[styleKey] : null;
    const phase=normalise(context.phase || context.goal || ''); const level=normalise(context.level || context.experience || '');
    const painLevel=Number(context.painLevel || context.maxPain || 0); const recovery=normalise(context.recovery || context.readiness || '');
    let score=0;
    if(!equipment.length) score+=1; else if((exercise.equipment||[]).indexOf('bw')>-1 || (exercise.equipment||[]).indexOf('bodyweight')>-1 || (exercise.equipment||[]).some(e=>equipment.indexOf(slug(e))>-1)) score+=5; else score-=8;
    if(style) { if(style.preferFamilies.indexOf(exercise.family)>-1) score+=4; if(hasAny(exercise.domains||[], style.preferDomains||[])) score+=4; if(hasAny(exercise.styles||[], [styleKey])) score+=4; }
    if(level && (exercise.difficulty||[]).indexOf(level)>-1) score+=2; if(level==='beginner' && (exercise.difficulty||[]).indexOf('advanced')>-1) score-=8; if(level==='rebuild' && exercise.jointStress>=4) score-=8;
    if(phase.indexOf('cut')>-1 || phase.indexOf('transform')>-1 || phase.indexOf('recomp')>-1) { if(hasAny(exercise.tags||[], ['tempo-control','supported','simple','low-impact'])) score+=2; if(exercise.fatigueCost>=5) score-=3; }
    if(phase.indexOf('bulk')>-1 || phase.indexOf('build')>-1 || phase.indexOf('hypertrophy')>-1) { if(hasAny(exercise.domains||[], ['strength','hypertrophy','weights'])) score+=2; }
    if(['poor','low','fragile','flare','overloaded'].indexOf(recovery)>-1) { score += exercise.recoveryFriendliness || 0; score -= exercise.fatigueCost || 0; if(hasAny(exercise.tags||[], ['recovery','simple','low-cognitive-load'])) score+=3; }
    injuries.forEach(injury => { const rule=INJURY_RULES[injury]; if(!rule) return; if((exercise.cautionIf||[]).indexOf(injury)>-1) score -= painLevel>=3 ? 10 : 5; if(hasAny(exercise.tags||[], rule.avoidPatterns||[])) score -= painLevel>=3 ? 12 : 5; if(hasAny(exercise.tags||[], rule.preferPatterns||[])) score += 8; if((rule.cautionPatterns||[]).indexOf(exercise.family)>-1) score -= painLevel>=3 ? 5 : 2; });
    if(context.lowOverwhelm || styleKey==='low-overwhelm') score -= exercise.cognitiveLoad || 0;
    return score;
  }

  function filterExercises(query) {
    query=query||{}; let list=EXERCISES.slice();
    if(query.family) { const fams=Array.isArray(query.family)?query.family:[query.family]; list=list.filter(ex=>fams.indexOf(ex.family)>-1); }
    if(query.purpose) { const ps=Array.isArray(query.purpose)?query.purpose:[query.purpose]; list=list.filter(ex=>hasAny(ex.purposes||[], ps)); }
    if(query.style || query.trainingStyle) { const s=slug(query.style || query.trainingStyle); if(s && s!=='mixed') list=list.filter(ex=>hasAny(ex.styles||[], [s,'mixed'])); }
    if(query.equipment && query.equipment.length) { const eq=query.equipment.map(slug); list=list.filter(ex=>(ex.equipment||[]).indexOf('bw')>-1 || (ex.equipment||[]).some(e=>eq.indexOf(slug(e))>-1)); }
    list=list.map(ex=>{ const copy=clone(ex); copy.contextScore=scoreExerciseForContext(ex, query); return copy; });
    if(query.injuries && query.injuries.length) list=list.filter(ex=>ex.contextScore>-12);
    return clone(list.sort((a,b)=>b.contextScore-a.contextScore));
  }

  function suggestAlternatives(nameOrKey, context, limit) {
    context=context||{}; limit=limit||8; const original=findExercise(nameOrKey); if(!original) return [];
    const direct=(original.regressions||[]).concat(original.alternatives||[]).map(findExercise).filter(Boolean);
    const same=EXERCISES.filter(ex=>ex.family===original.family && ex.key!==original.key);
    const keys=unique(direct.concat(same).map(x=>x.key));
    return keys.map(findExercise).filter(Boolean).map(ex=>{ex.contextScore=scoreExerciseForContext(ex, context); return ex;}).filter(ex=>ex.contextScore>-12).sort((a,b)=>b.contextScore-a.contextScore).slice(0,limit);
  }

  function buildMovementMenu(context) { return FAMILY_DB.map(fam=>({ key:fam.key, label:fam.label, options:filterExercises(Object.assign({}, context||{}, {family:fam.key})).slice(0,12) })); }
  function getProgressionTree(key) { const k=slug(key); let tree=PROGRESSION_TREES[k]; if(!tree) { const holder=Object.keys(PROGRESSION_TREES).find(name=>PROGRESSION_TREES[name].indexOf(k)>-1); if(holder) tree=PROGRESSION_TREES[holder]; } return tree ? tree.map(findExercise).filter(Boolean) : []; }
  function buildTemplate(context) { const styleKey=contextStyle(context||{})||'mixed'; const fams=(STYLE_PROFILES[styleKey]||STYLE_PROFILES.mixed).preferFamilies; return fams.slice(0,7).map(family=>{ const opts=filterExercises(Object.assign({}, context||{}, {family})).slice(0,5); const fam=familyByKey(family); return {family, label:fam?fam.label:family, recommended:opts[0]||null, alternatives:opts.slice(1)}; }); }
  function buildHybridSession(context) { const template=buildTemplate(context); return { title:'FreeFitFuel Adaptive Session', style:contextStyle(context||{})||'mixed', items:template.map(t=>t.recommended).filter(Boolean).map(x=>({key:x.key,name:x.name,family:x.family,equipment:x.equipment,rx:x.defaultRx,cue:x.coachingCue,alternatives:suggestAlternatives(x.key,context,3).map(a=>a.name)})) }; }
  function buildCircuit(context) { const fams=['conditioning','horizontal-push','horizontal-pull','squat','core-anti-extension']; return { title:'Adaptive Conditioning Circuit', format:'AMRAP or EMOM at recoverable pace', items:fams.map(f=>filterExercises(Object.assign({},context||{},{family:f}))[0]).filter(Boolean).map(x=>({key:x.key,name:x.name,family:x.family,rx:x.defaultRx,cue:x.coachingCue})) }; }

  function inferMuscleMetadata(ex) {
    ex = ex || {};
    const family = String(ex.family || ex.movement || '').toLowerCase();
    const existingPrimary = Array.isArray(ex.primaryMuscles) ? ex.primaryMuscles : [];
    const existingSecondary = Array.isArray(ex.secondaryMuscles) ? ex.secondaryMuscles : [];
    if (existingPrimary.length || existingSecondary.length) return { primaryMuscles: existingPrimary, secondaryMuscles: existingSecondary };
    const map = {
      'horizontal-push': { primaryMuscles:['mid-chest','front-delts','triceps'], secondaryMuscles:['serratus-anterior','core-bracing'] },
      'vertical-push': { primaryMuscles:['front-delts','side-delts','triceps'], secondaryMuscles:['upper-chest','core-bracing'] },
      'horizontal-pull': { primaryMuscles:['rhomboids','mid-traps','rear-delts'], secondaryMuscles:['lats','biceps','spinal-erectors'] },
      'vertical-pull': { primaryMuscles:['lats','biceps','lower-traps'], secondaryMuscles:['rhomboids','rear-delts','forearms'] },
      'squat': { primaryMuscles:['quads','glutes'], secondaryMuscles:['core','adductors','calves'] },
      'lunge-split': { primaryMuscles:['quads','glutes','adductors'], secondaryMuscles:['calves','core','balance'] },
      'hinge': { primaryMuscles:['hamstrings','glutes','spinal-erectors'], secondaryMuscles:['lats','core','grip'] },
      'hip-extension': { primaryMuscles:['glutes','hamstrings'], secondaryMuscles:['core','hip-stabilisers'] },
      'calf-ankle': { primaryMuscles:['calves','tibialis'], secondaryMuscles:['foot-intrinsics','balance'] },
      'core-anti-extension': { primaryMuscles:['rectus-abdominis','transverse-abdominis'], secondaryMuscles:['hip-flexors','shoulder-stabilisers'] },
      'core-anti-rotation': { primaryMuscles:['obliques','transverse-abdominis'], secondaryMuscles:['glutes','shoulder-stabilisers'] },
      'arms': { primaryMuscles:['biceps','triceps','forearms'], secondaryMuscles:['brachialis','brachioradialis'] },
      'conditioning': { primaryMuscles:['heart-lungs','work-capacity'], secondaryMuscles:['full-body','recovery-between-efforts'] },
      'mobility-recovery': { primaryMuscles:['movement-quality','joint-control'], secondaryMuscles:['circulation','recovery'] },
      'rehab-return': { primaryMuscles:['tissue-tolerance','joint-control'], secondaryMuscles:['movement-confidence','recovery'] }
    };
    return map[family] || { primaryMuscles: Array.isArray(ex.muscles) ? ex.muscles : [], secondaryMuscles: [] };
  }

  function getMyPlanLibrary() { return { version:'4.6', source:'fff-exercise-db-v4.4', sourceModules: Object.keys(PAGE_SOURCE_MODULES).map(function(key){ return Object.assign({key:key}, PAGE_SOURCE_MODULES[key]); }), items:EXERCISES.map(function(ex){ var enriched=enrichExerciseForPlanner(ex); var muscles=inferMuscleMetadata(ex); return { key:ex.key, type:(ex.purposes||[]).indexOf('conditioning')>-1 ? 'circuit' : ((ex.purposes||[]).indexOf('recovery')>-1 ? 'recovery' : 'exercise'), name:ex.name, equipment:ex.equipment||[], styles:ex.styles||[], purposes:ex.purposes||[], yt:ex.yt, family:ex.family, muscles:ex.muscles||[], primaryMuscles:muscles.primaryMuscles||[], secondaryMuscles:muscles.secondaryMuscles||[], movement:ex.movement||ex.family, tags:ex.tags||[], cautionIf:ex.cautionIf||[], domains:ex.domains||[], sourcePage: enriched.sourcePage, sourceLabel: enriched.sourceLabel, sourceReason: enriched.sourceReason, sourceModules: enriched.sourceModules, rx: ex.defaultRx, cue: ex.coachingCue, regressions: ex.regressions||[], progressions: ex.progressions||[], alternatives: ex.alternatives||[] }; }) }; }
  function seedMyPlanCache() { try { localStorage.setItem('fff.library.cache.v1', JSON.stringify(getMyPlanLibrary())); return true; } catch(err) { return false; } }
  function getLibraryStats() { const byFamily={}, byInjury={}; EXERCISES.forEach(ex=>{ byFamily[ex.family]=(byFamily[ex.family]||0)+1; (ex.cautionIf||[]).forEach(i=>byInjury[i]=(byInjury[i]||0)+1); }); return { totalExercises:EXERCISES.length, familyCount:FAMILY_DB.length, injuryProfiles:Object.keys(INJURY_RULES).length, styleProfiles:Object.keys(STYLE_PROFILES).length, progressionTrees:Object.keys(PROGRESSION_TREES).length, byFamily, byInjury }; }

  return { getExerciseProfile, getFamilySummary, areRelatedExercises, analyseGroup, getAllExercises:()=>clone(EXERCISES), findExercise, filterExercises, suggestAlternatives, buildMovementMenu, getInjuryRules:()=>clone(INJURY_RULES), scoreExerciseForContext, buildTemplate, getLibraryStats, getStyleProfiles:()=>clone(STYLE_PROFILES), buildHybridSession, buildCircuit, getProgressionTree, getMyPlanLibrary, getPageSourceModules:()=>clone(PAGE_SOURCE_MODULES), inferSourceModules:function(ex){return clone(inferSourceModules(ex));}, enrichExerciseForPlanner:function(ex){return clone(enrichExerciseForPlanner(ex));}, seedMyPlanCache };
})();
