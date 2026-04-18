// FreeFitFuel Engine — Messaging Layer (Elite Coaching Tone)

window.FFFMessaging = (function () {
  'use strict';

  function joinReasons(reason) {
    if (!Array.isArray(reason) || !reason.length) return '';
    return reason.join(' ');
  }

  function sentenceCase(str) {
    str = String(str || '').trim();
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function exerciseMessage(decision) {
    if (!decision) {
      return {
        headline: 'No coaching available',
        message: 'The engine could not generate exercise guidance for this movement yet.'
      };
    }

    const phase = decision.phase && decision.phase.stage ? decision.phase.stage : 'unknown';
    const patternState = decision.patternState || 'neutral';
    const reasonText = joinReasons(decision.reason || []);
    const nextStep = decision.nextStep || '';
    const tone = decision.tone || 'grounded';

    if (decision.action === 'start') {
      return {
        headline: 'Start by giving the engine clean signal',
        message: 'This movement does not need a heroic first entry. It needs a useful one. Log a controlled working set, note how it felt, and let the system learn from real data rather than guesswork.'
      };
    }

    if (decision.action === 'protect') {
      return {
        headline: 'Protect this movement for now',
        message: 'This no longer looks like a normal progression question. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'The right move is to reduce load or range, or shift to a friendlier variation. ' +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'recover') {
      return {
        headline: 'Recovery is the limiter here',
        message: 'This looks more like a recovery problem than a motivation problem. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Do not try to solve fatigue by forcing harder reps. ' +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'steady') {
      return {
        headline: patternState === 'fatigued'
          ? 'This pattern needs calming down'
          : 'Keep this session emotionally neutral',
        message: (patternState === 'fatigued'
          ? 'This is not just about one lift. The broader movement pattern looks a bit cooked, so today is about control, not heroics. '
          : 'Do not turn one exercise entry into a verdict on yourself. ') +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'progress') {
      return {
        headline: 'You have earned a measured progression',
        message: 'This is the kind of signal worth trusting. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Progress slightly and keep the standard high. ' +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'refine') {
      return {
        headline: 'Refine before you force',
        message: 'Flat does not automatically mean failing, but in a ' + phase + ' phase it does deserve attention. ' +
          'The answer is usually tighter execution, better rest control, and cleaner reps before extra load. ' +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'adjust') {
      return {
        headline: 'Something needs adjusting, not dramatics',
        message: 'This does not look like a total collapse, but it does suggest the current setup is not giving you the signal we want. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'hold') {
      return {
        headline: patternState === 'watch'
          ? 'Hold the line and watch the pattern'
          : 'Hold steady and build',
        message: (patternState === 'watch'
          ? 'There is enough noise here that pushing would be guesswork. '
          : 'Nothing here suggests panic. ') +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'The smart move is controlled repetition, not impulse progression. ' +
          (nextStep ? nextStep : '')
      };
    }

    if (decision.action === 'push') {
      return {
        headline: 'Good day to push carefully',
        message: 'The wider picture supports a slightly more assertive session. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Push with discipline, not ego. ' +
          (nextStep ? nextStep : '')
      };
    }

    return {
      headline: 'Stay controlled',
      message: (reasonText ? sentenceCase(reasonText) + '. ' : '') +
        (nextStep || 'Keep the work clean and repeatable.')
    };
  }

  function globalMessage(globalDecision, recovery, mind) {
    if (!globalDecision) {
      return {
        headline: 'Coach unavailable',
        message: 'The engine could not produce a global coaching summary.'
      };
    }

    const mode = globalDecision.mode || 'build';
    const reasonText = joinReasons(globalDecision.reason || []);
    const phase = globalDecision.phase && globalDecision.phase.stage ? globalDecision.phase.stage : 'unknown';

    if (mode === 'start') {
      return {
        headline: 'Build consistency before you chase sophistication',
        message: 'Right now the most valuable thing is not intensity but signal. Show up, log honestly, and give the engine enough reality to coach properly.'
      };
    }

    if (mode === 'protect') {
      return {
        headline: 'Protect mode: reduce pressure, keep momentum',
        message: 'The current picture says sustainability matters more than proving a point. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Your job is to keep training viable, not to win today at the expense of next week.'
      };
    }

    if (mode === 'steady') {
      return {
        headline: 'Steady the system before you demand more',
        message: 'The right response here is not to collapse the plan, but to lower the emotional temperature. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'A calm, completed session is more valuable than a strained attempt to feel heroic.'
      };
    }

    if (mode === 'recover') {
      return {
        headline: 'Recovery needs to catch up',
        message: 'This looks like one of those phases where trying harder is the wrong lever. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Keep the plan alive, but let recovery stop being the weak link.'
      };
    }

    if (mode === 'preserve') {
      return {
        headline: 'Preserve strength, do not bully it',
        message: 'In a ' + phase + ' phase, flat or slightly uneven performance does not mean the plan is broken. ' +
          'The win is preserving quality and keeping the basics tight while your wider goal does its work.'
      };
    }

    if (mode === 'hold') {
      return {
        headline: 'Hold the line',
        message: 'You do not need a retreat, but you also do not need false urgency. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Keep the work honest and let recovery earn the next push.'
      };
    }

    if (mode === 'push') {
      return {
        headline: 'Conditions look good for progress',
        message: 'This is the kind of week where a little assertiveness makes sense. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Progress with precision and do not waste a good window by getting sloppy.'
      };
    }

    if (mode === 'build') {
      return {
        headline: 'Keep stacking capable days',
        message: 'This phase rewards patience more than drama. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Judge the trend, not the mood of one workout.'
      };
    }

    return {
      headline: 'Keep building',
      message: (reasonText ? sentenceCase(reasonText) + '. ' : '') +
        'The broader picture still favours steady, repeatable good decisions.'
    };
  }

  return {
    exerciseMessage: exerciseMessage,
    globalMessage: globalMessage
  };
})();
