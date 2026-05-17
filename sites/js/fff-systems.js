/*
  FreeFitFuel™ Systems Library
  Path: /js/fff-systems.js
  Purpose: Shared reusable system data for standalone pages, My Plan, workouts, physio, recovery and future tracker hooks.
  UK English. No external dependencies.
*/

(function () {
  'use strict';

  const FFF_SYSTEMS = [
    {
      id: 'knee-capacity-reset',
      title: 'Knee Capacity Reset',
      shortTitle: 'Knee Reset',
      status: 'ready',
      category: 'physio',
      intensity: 'low-to-moderate',
      durationMinutes: 18,
      frequency: '3–5 times per week',
      standaloneUrl: '/systems/knee-capacity-reset.html',
      tags: ['knee pain', 'joint control', 'walking', 'stairs', 'lower body', 'rehab-aware'],
      goals: ['Reduce knee irritation', 'Improve control', 'Build tendon and joint tolerance', 'Support return to training'],
      suitableFor: [
        'Stiff or irritable knees after sitting',
        'Knees that feel uncertain on stairs',
        'Mild discomfort during squats or lunges',
        'Building confidence before lower-body training'
      ],
      notFor: [
        'Sudden severe pain',
        'Major swelling, heat, redness or locking',
        'Recent trauma, fall or suspected ligament injury',
        'Pain that is worsening rapidly or affects normal walking'
      ],
      equipment: ['Chair or wall', 'Step or stair', 'Optional resistance band', 'Optional light dumbbell'],
      planHooks: {
        myPlanDrawsFrom: true,
        suggestedWhen: ['kneePain', 'lowerBodyPain', 'deconditioned', 'returningAfterBreak', 'over40Support'],
        avoidWhen: ['acuteInjury', 'unexplainedSwelling', 'medicalRedFlag'],
        trackerKey: 'fffSystemKneeCapacityReset'
      },
      phases: [
        {
          id: 'settle-and-control',
          title: 'Phase 1: Settle and Control',
          duration: 'Week 1 or whenever symptoms are flared',
          aim: 'Calm irritation, restore movement confidence and avoid poking the pain response.',
          exercises: [
            {
              name: 'Seated Knee Extensions',
              sets: '2–3',
              reps: '8–12 each side',
              tempo: '2 seconds up, 2 seconds down',
              cues: ['Sit tall', 'Straighten the knee without snapping it', 'Pause briefly at the top', 'Keep the movement smooth'],
              regress: 'Use a smaller range of motion.',
              progress: 'Add a 2-second hold at the top.'
            },
            {
              name: 'Wall-Supported Sit-to-Stand',
              sets: '2–3',
              reps: '6–10',
              tempo: 'Controlled lower, steady stand',
              cues: ['Feet flat', 'Knees track over toes', 'Push the floor away', 'Use hands lightly if needed'],
              regress: 'Use a higher chair.',
              progress: 'Slow the lowering phase to 3 seconds.'
            },
            {
              name: 'Standing Calf Raises',
              sets: '2',
              reps: '10–15',
              tempo: 'Smooth lift and lower',
              cues: ['Hold a wall or chair', 'Rise through the big toe side', 'Do not bounce', 'Keep knees soft'],
              regress: 'Use both hands for support.',
              progress: 'Pause at the top for 2 seconds.'
            }
          ]
        },
        {
          id: 'capacity-build',
          title: 'Phase 2: Capacity Build',
          duration: 'Weeks 2–4',
          aim: 'Build strength and tolerance through the knee, hip and ankle chain.',
          exercises: [
            {
              name: 'Step-Up Control',
              sets: '3',
              reps: '6–10 each side',
              tempo: 'Controlled up, controlled down',
              cues: ['Use a low step', 'Whole foot on the step', 'Drive through the mid-foot', 'Keep knee in line with toes'],
              regress: 'Use a smaller step or more hand support.',
              progress: 'Slow the descent to 3 seconds.'
            },
            {
              name: 'Supported Split Squat Hold',
              sets: '2–3',
              reps: '15–30 second holds each side',
              tempo: 'Static hold',
              cues: ['Hold a wall or chair', 'Keep torso tall', 'Front knee tracks over toes', 'Stay within a tolerable range'],
              regress: 'Reduce depth.',
              progress: 'Add gentle pulses in the middle range.'
            },
            {
              name: 'Glute Bridge',
              sets: '3',
              reps: '8–12',
              tempo: '2 seconds up, 2 seconds down',
              cues: ['Feet hip-width', 'Ribs down', 'Squeeze glutes', 'Avoid arching the lower back'],
              regress: 'Reduce height.',
              progress: 'Add a 2-second hold at the top.'
            }
          ]
        },
        {
          id: 'return-to-training',
          title: 'Phase 3: Return to Training',
          duration: 'Weeks 4+ when symptoms are stable',
          aim: 'Prepare the knees for squats, lunges, walking volume, stairs and general training.',
          exercises: [
            {
              name: 'Goblet Box Squat',
              sets: '3',
              reps: '6–10',
              tempo: '3 seconds down, steady up',
              cues: ['Use a chair or box', 'Brace gently', 'Knees track over toes', 'Stand tall without locking out hard'],
              regress: 'Use bodyweight only.',
              progress: 'Use a light dumbbell.'
            },
            {
              name: 'Reverse Lunge to Support',
              sets: '2–3',
              reps: '6–8 each side',
              tempo: 'Controlled step back and return',
              cues: ['Step back softly', 'Hold support if needed', 'Keep front foot grounded', 'Stay smooth'],
              regress: 'Use a smaller step back.',
              progress: 'Reduce hand support or add light load.'
            },
            {
              name: 'Low Pogo Preparation',
              sets: '2',
              reps: '10–20 seconds',
              tempo: 'Light spring',
              cues: ['Tiny bounces only', 'Stay tall', 'Land quietly', 'Stop if pain spikes'],
              regress: 'March in place instead.',
              progress: 'Increase to 30 seconds if completely comfortable.'
            }
          ]
        }
      ],
      redFlags: [
        'Pain above 5 out of 10 during the session',
        'Pain that remains worse the next day',
        'New swelling, heat, redness or locking',
        'Giving way, numbness or unexplained weakness'
      ],
      simpleProgressionRule: 'Only progress when pain stays at 0–3 out of 10 during movement and returns to baseline within 24 hours.',
      recoveryNotes: [
        'Short frequent sessions usually beat one heroic session.',
        'A little muscular effort is fine. Sharp joint pain is not the target.',
        'Walking can stay in the plan if it does not worsen symptoms the next day.',
        'Pair with gentle hip mobility, calf work and daily recovery flow when needed.'
      ]
    },
    {
      id: 'fascia-flow-reset',
      title: 'Fascia Flow Reset',
      shortTitle: 'Fascia Flow',
      status: 'ready',
      category: 'recovery',
      intensity: 'low',
      durationMinutes: 15,
      frequency: 'Daily or after long sitting',
      standaloneUrl: '/systems/fascia-flow-reset.html',
      tags: ['mobility', 'deskbound', 'whole body', 'gut support', 'recovery'],
      goals: ['Restore movement quality', 'Reduce stiffness', 'Support posture', 'Encourage daily movement'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['stiffness', 'deskbound', 'recoveryNeed'], trackerKey: 'fffSystemFasciaFlowReset' }
    },
    {
      id: 'lymphatic-recovery-flow',
      title: 'Lymphatic Recovery Flow',
      shortTitle: 'Lymph Flow',
      status: 'ready',
      category: 'recovery',
      intensity: 'low',
      durationMinutes: 12,
      frequency: 'Daily or on recovery days',
      standaloneUrl: '/systems/lymphatic-recovery-flow.html',
      tags: ['recovery', 'walking', 'tai chi', 'low impact', 'circulation'],
      goals: ['Encourage gentle movement', 'Support recovery habits', 'Reduce sedentary stiffness'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['recoveryNeed', 'lowEnergy', 'deskbound'], trackerKey: 'fffSystemLymphaticRecoveryFlow' }
    },
    {
      id: 'pull-up-progression-pathway',
      title: 'Pull-Up Progression Pathway',
      shortTitle: 'Pull-Up Pathway',
      status: 'ready',
      category: 'strength-skill',
      intensity: 'moderate',
      durationMinutes: 20,
      frequency: '2–3 times per week',
      standaloneUrl: '/systems/pull-up-progression-pathway.html',
      tags: ['pull ups', 'back', 'scapular control', 'calisthenics', 'strength'],
      goals: ['Build lat activation', 'Improve scapular control', 'Progress towards full pull-ups'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['pullUpGoal', 'upperBodyStrength'], trackerKey: 'fffSystemPullUpProgressionPathway' }
    },
    {
      id: 'biceps-elbow-pain-protocol',
      title: 'Biceps / Elbow Pain Protocol',
      shortTitle: 'Biceps Elbow Protocol',
      status: 'ready',
      category: 'physio',
      intensity: 'low',
      durationMinutes: 15,
      frequency: '3–5 times per week as tolerated',
      standaloneUrl: '/systems/biceps-elbow-pain-protocol.html',
      tags: ['elbow pain', 'biceps pain', 'bench press pain', 'tendon', 'upper body'],
      goals: ['Calm irritation', 'Rebuild pulling and pressing tolerance', 'Guide substitutions'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['elbowPain', 'bicepsPain', 'pressingPain'], avoidWhen: ['acuteInjury'], trackerKey: 'fffSystemBicepsElbowPainProtocol' }
    },
    {
      id: 'hip-knee-pain-reset',
      title: 'Hip & Knee Pain Reset',
      shortTitle: 'Hip Knee Reset',
      status: 'ready',
      category: 'physio',
      intensity: 'low-to-moderate',
      durationMinutes: 20,
      frequency: '3–5 times per week',
      standaloneUrl: '/systems/hip-knee-pain-reset.html',
      tags: ['hip pain', 'knee pain', 'cramp', 'walking', 'sitting stiffness'],
      goals: ['Improve hip-knee mechanics', 'Reduce stiffness after sitting', 'Support walking tolerance'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['hipPain', 'kneePain', 'walkingPain'], trackerKey: 'fffSystemHipKneePainReset' }
    },
    {
      id: 'lower-leg-stability-system',
      title: 'Lower-Leg Stability System',
      shortTitle: 'Lower-Leg Stability',
      status: 'ready',
      category: 'strength-skill',
      intensity: 'low-to-moderate',
      durationMinutes: 15,
      frequency: '2–4 times per week',
      standaloneUrl: '/systems/lower-leg-stability-system.html',
      tags: ['ankles', 'calves', 'feet', 'balance', 'running support'],
      goals: ['Improve ankle control', 'Support running and walking', 'Build calf and foot capacity'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['runningPlan', 'balanceNeed', 'lowerLegWeakness'], trackerKey: 'fffSystemLowerLegStabilitySystem' }
    },
    {
      id: 'joint-control-foundations',
      title: 'Joint Control Foundations',
      shortTitle: 'Joint Control',
      status: 'ready',
      category: 'movement-foundation',
      intensity: 'low',
      durationMinutes: 18,
      frequency: '2–5 times per week',
      standaloneUrl: '/systems/joint-control-foundations.html',
      tags: ['mobility', 'control', 'warm up', 'injury-aware', 'foundation'],
      goals: ['Improve joint awareness', 'Create better warm-ups', 'Support safer strength work'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['beginner', 'over40Support', 'stiffness'], trackerKey: 'fffSystemJointControlFoundations' }
    },
    {
      id: 'daily-recovery-flow',
      title: 'Daily Recovery Flow',
      shortTitle: 'Daily Recovery',
      status: 'ready',
      category: 'recovery',
      intensity: 'low',
      durationMinutes: 10,
      frequency: 'Daily',
      standaloneUrl: '/systems/daily-recovery-flow.html',
      tags: ['daily reset', 'tai chi walking', 'breathing', 'recovery', 'low impact'],
      goals: ['Keep the body moving', 'Reduce stiffness', 'Support consistency without overtraining'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['recoveryNeed', 'lowEnergy', 'stressSupport'], trackerKey: 'fffSystemDailyRecoveryFlow' }
    },
    {
      id: 'deskbound-reset-flow',
      title: 'Deskbound Reset Flow',
      shortTitle: 'Deskbound Reset',
      status: 'ready',
      category: 'recovery',
      intensity: 'low',
      durationMinutes: 8,
      frequency: '1–3 times daily during long sitting days',
      standaloneUrl: '/systems/deskbound-reset-flow.html',
      tags: ['deskbound', 'neck', 'hips', 'back', 'posture', 'work breaks'],
      goals: ['Break up long sitting', 'Reduce stiffness', 'Restore posture and breathing'],
      planHooks: { myPlanDrawsFrom: true, suggestedWhen: ['deskbound', 'stiffness', 'hipTightness', 'neckTension'], trackerKey: 'fffSystemDeskboundResetFlow' }
    }
  ];

  function getSystemById(id) {
    return FFF_SYSTEMS.find(system => system.id === id) || null;
  }

  function getSystemsByCategory(category) {
    return FFF_SYSTEMS.filter(system => system.category === category);
  }

  function getReadySystems() {
    return FFF_SYSTEMS.filter(system => system.status === 'ready');
  }

  function getSystemsForPlan(profile) {
    const activeFlags = profile && typeof profile === 'object' ? profile : {};
    return FFF_SYSTEMS.filter(system => {
      if (!system.planHooks || !system.planHooks.myPlanDrawsFrom) return false;
      const avoid = system.planHooks.avoidWhen || [];
      const suggested = system.planHooks.suggestedWhen || [];
      const blocked = avoid.some(flag => activeFlags[flag]);
      if (blocked) return false;
      return suggested.some(flag => activeFlags[flag]);
    });
  }

  function saveSystemCompletion(systemId) {
    const system = getSystemById(systemId);
    if (!system || !system.planHooks || !system.planHooks.trackerKey) return false;

    const key = system.planHooks.trackerKey;
    const today = new Date().toISOString().slice(0, 10);
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ date: today, systemId: systemId, title: system.title });
    localStorage.setItem(key, JSON.stringify(existing));
    return true;
  }

  window.FFFSystems = {
    all: FFF_SYSTEMS,
    getSystemById,
    getSystemsByCategory,
    getReadySystems,
    getSystemsForPlan,
    saveSystemCompletion
  };
})();
