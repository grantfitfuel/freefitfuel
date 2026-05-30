// FreeFitFuel Engine — Exercise Knowledge Database v4.4
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

  function getMyPlanLibrary() { return { version:'4.4', source:'fff-exercise-db-v4.4', sourceModules: Object.keys(PAGE_SOURCE_MODULES).map(function(key){ return Object.assign({key:key}, PAGE_SOURCE_MODULES[key]); }), items:EXERCISES.map(function(ex){ var enriched=enrichExerciseForPlanner(ex); var muscles=inferMuscleMetadata(ex); return { key:ex.key, type:(ex.purposes||[]).indexOf('conditioning')>-1 ? 'circuit' : ((ex.purposes||[]).indexOf('recovery')>-1 ? 'recovery' : 'exercise'), name:ex.name, equipment:ex.equipment||[], styles:ex.styles||[], purposes:ex.purposes||[], yt:ex.yt, family:ex.family, muscles:ex.muscles||[], primaryMuscles:muscles.primaryMuscles||[], secondaryMuscles:muscles.secondaryMuscles||[], movement:ex.movement||ex.family, tags:ex.tags||[], cautionIf:ex.cautionIf||[], domains:ex.domains||[], sourcePage: enriched.sourcePage, sourceLabel: enriched.sourceLabel, sourceReason: enriched.sourceReason, sourceModules: enriched.sourceModules, rx: ex.defaultRx, cue: ex.coachingCue, regressions: ex.regressions||[], progressions: ex.progressions||[], alternatives: ex.alternatives||[] }; }) }; }
  function seedMyPlanCache() { try { localStorage.setItem('fff.library.cache.v1', JSON.stringify(getMyPlanLibrary())); return true; } catch(err) { return false; } }
  function getLibraryStats() { const byFamily={}, byInjury={}; EXERCISES.forEach(ex=>{ byFamily[ex.family]=(byFamily[ex.family]||0)+1; (ex.cautionIf||[]).forEach(i=>byInjury[i]=(byInjury[i]||0)+1); }); return { totalExercises:EXERCISES.length, familyCount:FAMILY_DB.length, injuryProfiles:Object.keys(INJURY_RULES).length, styleProfiles:Object.keys(STYLE_PROFILES).length, progressionTrees:Object.keys(PROGRESSION_TREES).length, byFamily, byInjury }; }

  return { getExerciseProfile, getFamilySummary, areRelatedExercises, analyseGroup, getAllExercises:()=>clone(EXERCISES), findExercise, filterExercises, suggestAlternatives, buildMovementMenu, getInjuryRules:()=>clone(INJURY_RULES), scoreExerciseForContext, buildTemplate, getLibraryStats, getStyleProfiles:()=>clone(STYLE_PROFILES), buildHybridSession, buildCircuit, getProgressionTree, getMyPlanLibrary, getPageSourceModules:()=>clone(PAGE_SOURCE_MODULES), inferSourceModules:function(ex){return clone(inferSourceModules(ex));}, enrichExerciseForPlanner:function(ex){return clone(enrichExerciseForPlanner(ex));}, seedMyPlanCache };
})();
