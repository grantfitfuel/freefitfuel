// FreeFitFuel Engine — Intervention Layer
// Mental state -> practical, non-repetitive actions

window.FFFInterventions = (function () {
  'use strict';

  var MEMORY_KEY = 'fff.interventions.memory.v1';

  function safeObject(v) {
    return v && typeof v === 'object' ? v : {};
  }

  function safeArray(v) {
    return Array.isArray(v) ? v : [];
  }

  function toNumber(v, fallback) {
    var n = Number(v);
    return isNaN(n) ? (fallback || 0) : n;
  }

  function rand(arr) {
    arr = safeArray(arr);
    if (!arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function clone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (err) {
      return value;
    }
  }

  function getMemory() {
    try {
      var raw = localStorage.getItem(MEMORY_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return safeObject(parsed);
    } catch (err) {
      return {};
    }
  }

  function setMemory(mem) {
    try {
      localStorage.setItem(MEMORY_KEY, JSON.stringify(safeObject(mem)));
      return true;
    } catch (err) {
      return false;
    }
  }

  function recentList(mem, key) {
    mem = safeObject(mem);
    var arr = mem[key];
    return Array.isArray(arr) ? arr : [];
  }

  function pushRecent(mem, key, value, limit) {
    mem = safeObject(mem);
    if (!Array.isArray(mem[key])) mem[key] = [];
    mem[key].push(value);
    while (mem[key].length > limit) {
      mem[key].shift();
    }
  }

  function pickUnique(key, options) {
    options = safeArray(options);
    if (!options.length) return null;

    var mem = getMemory();
    var recent = recentList(mem, key);

    var filtered = options.filter(function (item) {
      return recent.indexOf(item) === -1;
    });

    if (!filtered.length) filtered = options.slice();

    var choice = rand(filtered);

    pushRecent(mem, key, choice, 3);
    setMemory(mem);

    return choice;
  }

  function pickActionSet(key, options) {
    options = safeArray(options);
    if (!options.length) return [];

    var mem = getMemory();
    var recent = recentList(mem, key);

    var labels = options.map(function (opt) {
      return opt && opt.id ? opt.id : JSON.stringify(opt);
    });

    var filtered = options.filter(function (opt) {
      var label = opt && opt.id ? opt.id : JSON.stringify(opt);
      return recent.indexOf(label) === -1;
    });

    if (!filtered.length) filtered = options.slice();

    var choice = rand(filtered);
    var chosenLabel = choice && choice.id ? choice.id : JSON.stringify(choice);

    pushRecent(mem, key, chosenLabel, 4);
    setMemory(mem);

    return choice && Array.isArray(choice.actions) ? choice.actions.slice() : [];
  }

  function detectState(mind, recovery) {
    mind = safeObject(mind);
    recovery = safeObject(recovery);

    var pressure = toNumber(mind.pressure, 20);
    var confidence = toNumber(mind.confidence, 50);
    var avoidance = toNumber(mind.avoidance, 0);
    var selfCriticism = toNumber(mind.selfCriticism, 0);
    var fatigue = toNumber(recovery.fatigue, 20);
    var underRecoveryRisk = toNumber(recovery.underRecoveryRisk, 0);
    var risk = String(mind.risk || 'low').toLowerCase();

    if ((pressure >= 70 && fatigue >= 60) || (risk === 'high' && fatigue >= 50)) {
      return 'overloaded';
    }

    if (avoidance >= 50) {
      return 'avoidant';
    }

    if (selfCriticism >= 45 || (pressure >= 60 && confidence <= 40)) {
      return 'self-critical';
    }

    if (confidence <= 35 || (fatigue >= 60 && pressure < 60)) {
      return 'low';
    }

    if (underRecoveryRisk >= 60) {
      return 'fragile';
    }

    return 'steady';
  }

  var LIB = {
    overloaded: {
      headlines: [
        'Lower the demand',
        'Settle the system first',
        'Bring things down a notch',
        'Ease the pressure before continuing',
        'Do less, but do it cleanly',
        'Calm the system before the session'
      ],
      messages: [
        'Your system looks overloaded. The smart move is to reduce intensity before you ask anything more of yourself.',
        'This looks like mental and physical load stacking together. Bring the demand down first, then decide what is realistic.',
        'Today does not need force. It needs calming, simplification, and one sensible next step.',
        'You are more likely to recover momentum by reducing pressure than by pushing through it.'
      ],
      actionSets: [
        {
          id: 'overloaded_breath_1',
          actions: [
            'Slow your breathing for 2 minutes: inhale 4, exhale 6.',
            'Keep today’s session lighter than planned.',
            'Stop the session while it still feels controlled.'
          ]
        },
        {
          id: 'overloaded_walk_1',
          actions: [
            'Take a slow 5-minute walk before deciding on training.',
            'If you still feel wired or overloaded, switch to recovery work.',
            'Skip progression today.'
          ]
        },
        {
          id: 'overloaded_mobility_1',
          actions: [
            'Do 5 to 10 minutes of easy mobility only.',
            'Treat movement quality as the win today.',
            'Do not turn this into a test.'
          ]
        },
        {
          id: 'overloaded_grounding_1',
          actions: [
            'Pause for one minute and name five things you can see.',
            'Then choose the easiest useful version of your session.',
            'Keep the total session short.'
          ]
        }
      ]
    },

    avoidant: {
      headlines: [
        'Lower the barrier',
        'Make this easy to begin',
        'Re-entry is the win today',
        'Start smaller than you think',
        'The task is to begin',
        'Stop negotiating and make it tiny'
      ],
      messages: [
        'This looks more like avoidance than incapacity. Make the first step small enough that you actually do it.',
        'You do not need the full session to feel possible. You just need a small, credible start.',
        'Momentum matters more than ambition right now. Start with the minimum that gets you moving.',
        'The goal today is not a heroic performance. It is breaking the delay pattern.'
      ],
      actionSets: [
        {
          id: 'avoidant_one_set',
          actions: [
            'Do one set of the first exercise only.',
            'Then decide whether to continue.',
            'Logging the start counts as success.'
          ]
        },
        {
          id: 'avoidant_timer',
          actions: [
            'Set a 3-minute timer and move until it ends.',
            'Ignore the rest of the session until then.',
            'Reassess only after the timer finishes.'
          ]
        },
        {
          id: 'avoidant_warmup',
          actions: [
            'Do the warm-up only.',
            'If momentum appears, continue.',
            'If not, stop without self-criticism.'
          ]
        },
        {
          id: 'avoidant_walk',
          actions: [
            'Start with a 5-minute brisk walk.',
            'Then do the easiest useful version of your session.',
            'Keep the ask deliberately small.'
          ]
        }
      ]
    },

    'self-critical': {
      headlines: [
        'Remove the pressure',
        'Do not turn this into a test',
        'Keep this controlled',
        'Step out of all-or-nothing mode',
        'Repeat well, do not prove anything',
        'Quality is enough today'
      ],
      messages: [
        'The pressure is too high for useful coaching right now. Lower the emotional stakes and do the work cleanly.',
        'Self-criticism is trying to turn this session into a verdict. Refuse that frame and make the target simpler.',
        'The most productive response here is control, not punishment.',
        'You do not need redemption training. You need a clean, repeatable session.'
      ],
      actionSets: [
        {
          id: 'sc_repeat_last',
          actions: [
            'Repeat the last working load cleanly.',
            'Do not increase the load today.',
            'Judge the session by execution, not emotion.'
          ]
        },
        {
          id: 'sc_cap_effort',
          actions: [
            'Cap effort at a moderate level.',
            'Leave reps in reserve on purpose.',
            'Finish while the session still feels tidy.'
          ]
        },
        {
          id: 'sc_quality',
          actions: [
            'Focus on smooth reps only.',
            'Write one note about what felt better.',
            'Ignore whether the numbers were impressive.'
          ]
        },
        {
          id: 'sc_reduce_scope',
          actions: [
            'Cut one block from the session.',
            'Complete the rest with clean form.',
            'A smaller session done well is a win.'
          ]
        }
      ]
    },

    low: {
      headlines: [
        'Bring energy up gently',
        'Lift the floor, not the ceiling',
        'Start moving without overthinking',
        'Keep this light and simple',
        'Activation first, ambition later',
        'Get moving before you judge the day'
      ],
      messages: [
        'This looks more flat than chaotic. The best response is gentle activation, not force.',
        'When energy is low, the right target is movement and rhythm, not intensity.',
        'Treat this like a low-battery day. Keep the cognitive load low and the movement simple.',
        'You do not need to feel brilliant before you begin. You need a calm first action.'
      ],
      actionSets: [
        {
          id: 'low_walk_outside',
          actions: [
            'Take a short walk outside if possible.',
            'Then choose the easiest useful version of your session.',
            'Keep the session brief.'
          ]
        },
        {
          id: 'low_light_circuit',
          actions: [
            'Do a light movement circuit for 5 to 10 minutes.',
            'Keep transitions simple.',
            'Stop if energy improves enough to continue deliberately.'
          ]
        },
        {
          id: 'low_one_block',
          actions: [
            'Choose one main exercise block only.',
            'Complete it without adding extras.',
            'Let that be enough if needed.'
          ]
        },
        {
          id: 'low_mobility_reset',
          actions: [
            'Start with mobility for 5 minutes.',
            'Then decide between recovery work or a reduced session.',
            'Do not demand intensity from a low-energy day.'
          ]
        }
      ]
    },

    fragile: {
      headlines: [
        'Protect the basics today',
        'Recovery comes first here',
        'Keep the system stable',
        'This is a protect-and-preserve day',
        'Hold the line gently',
        'Reduce risk, keep rhythm'
      ],
      messages: [
        'Recovery looks fragile enough that pushing is unlikely to pay off today.',
        'The useful move here is protection, not escalation.',
        'This is a day to preserve momentum without adding strain.',
        'Keep the session viable and the recovery cost low.'
      ],
      actionSets: [
        {
          id: 'fragile_reduce',
          actions: [
            'Cut session volume down.',
            'Use easier exercise versions if needed.',
            'Keep the work well inside control.'
          ]
        },
        {
          id: 'fragile_recovery',
          actions: [
            'Swap the session for recovery-focused work.',
            'Use walking, mobility, or light core work.',
            'Do not chase performance today.'
          ]
        },
        {
          id: 'fragile_short',
          actions: [
            'Keep today’s session short.',
            'Leave plenty in reserve.',
            'Treat completion as the goal.'
          ]
        },
        {
          id: 'fragile_delay_push',
          actions: [
            'Delay progression by one session.',
            'Repeat a lighter, cleaner version today.',
            'Give recovery a chance to catch up.'
          ]
        }
      ]
    },

    steady: {
      headlines: [
        'Keep building',
        'Stay consistent',
        'Nothing needs changing dramatically',
        'Keep stacking good sessions',
        'Steady work still counts',
        'Stay with the plan'
      ],
      messages: [
        'The current picture looks stable enough for normal training.',
        'There is no need for drama here. Keep the plan moving and the execution honest.',
        'You do not need a major adjustment. You need another good session.',
        'The system looks steady. Keep building without rushing.'
      ],
      actionSets: [
        {
          id: 'steady_train',
          actions: [
            'Train as planned.',
            'Keep reps clean and controlled.',
            'Progress only if execution supports it.'
          ]
        },
        {
          id: 'steady_quality',
          actions: [
            'Stay with the plan.',
            'Aim for technical quality first.',
            'Use good notes, not just numbers.'
          ]
        },
        {
          id: 'steady_modest',
          actions: [
            'Keep the session repeatable.',
            'Use one measured progression only if earned.',
            'Do not add unnecessary extras.'
          ]
        },
        {
          id: 'steady_consistent',
          actions: [
            'Focus on consistency over novelty.',
            'Complete the session cleanly.',
            'Let the trend build over time.'
          ]
        }
      ]
    }
  };

  function contextualExtras(state, mind, recovery, weekly) {
    mind = safeObject(mind);
    recovery = safeObject(recovery);
    weekly = safeObject(weekly);

    var extras = [];

    if (state === 'overloaded' && toNumber(recovery.fatigue, 0) >= 60) {
      extras.push('Keep the total demand lower than usual today.');
    }

    if (state === 'avoidant' && toNumber(weekly.sessionsLogged, 0) <= 1) {
      extras.push('The goal is re-entry, not catching up all at once.');
    }

    if (state === 'self-critical' && toNumber(mind.selfCriticism, 0) >= 60) {
      extras.push('Do not use today’s session as evidence for or against yourself.');
    }

    if (state === 'low' && toNumber(mind.confidence, 50) <= 35) {
      extras.push('Choose the simplest useful session option, not the most ambitious one.');
    }

    if (state === 'fragile' && toNumber(recovery.underRecoveryRisk, 0) >= 60) {
      extras.push('Protection is more valuable than intensity right now.');
    }

    return extras.slice(0, 2);
  }

  function getIntervention(mind, recovery, weekly) {
    var state = detectState(mind, recovery);
    var lib = LIB[state] || LIB.steady;

    var headline = pickUnique('headline_' + state, lib.headlines) || 'Keep building';
    var message = pickUnique('message_' + state, lib.messages) || 'Keep the next step simple and useful.';
    var actions = pickActionSet('actions_' + state, lib.actionSets);
    var extras = contextualExtras(state, mind, recovery, weekly);

    return {
      state: state,
      headline: headline,
      message: message,
      actions: actions.concat(extras).slice(0, 4)
    };
  }

  return {
    detectState: detectState,
    getIntervention: getIntervention
  };
})();
