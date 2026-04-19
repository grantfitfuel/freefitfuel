// FreeFitFuel Engine — Messaging Layer
// High-end adaptive coaching tone

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

  function familyLabel(family) {
    if (window.FFFTraining && typeof window.FFFTraining.familyLabel === 'function') {
      return window.FFFTraining.familyLabel(family);
    }
    return family || '';
  }

  function swapLine(swaps) {
    swaps = Array.isArray(swaps) ? swaps : [];
    if (!swaps.length) return '';
    return ' Safer swap options right now: ' + swaps.slice(0, 3).join(', ') + '.';
  }

  function exerciseMessage(decision) {
    if (!decision) {
      return {
        headline: 'No coaching available',
        message: 'The engine could not generate exercise guidance for this movement yet.'
      };
    }

    var phase = decision.phase && decision.phase.stage ? decision.phase.stage : 'unknown';
    var patternState = decision.patternState || 'neutral';
    var reasonText = joinReasons(decision.reason || []);
    var nextStep = decision.nextStep || '';
    var fam = decision.profile && decision.profile.family ? familyLabel(decision.profile.family) : '';

    if (decision.action === 'start') {
      return {
        headline: 'Start by giving the engine clean signal',
        message: 'This movement does not need a heroic first entry. It needs a useful one. Log a controlled working set, note how it felt, and let the system learn from real data rather than guesswork.'
      };
    }

    if (decision.action === 'protect') {
      var swaps = decision.profile && decision.profile.regressions ? decision.profile.regressions : [];
      return {
        headline: 'Protect this movement for now',
        message: 'This no longer looks like a normal progression question. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          (fam ? 'Given that this sits inside your ' + fam + ' pattern, it is worth being even more deliberate. ' : '') +
          'The right move is to reduce load or range, or shift to a friendlier variation.' +
          swapLine(swaps) + ' ' + nextStep
      };
    }

    if (decision.action === 'recover') {
      return {
        headline: 'Recovery is the limiter here',
        message: 'This looks more like a recovery problem than a motivation problem. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Do not try to solve fatigue by forcing harder reps. ' + nextStep
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
          (reasonText ? sentenceCase(reasonText) + '. ' : '') + nextStep
      };
    }

    if (decision.action === 'progress') {
      return {
        headline: 'You have earned a measured progression',
        message: 'This is the kind of signal worth trusting. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Progress slightly and keep the standard high. ' + nextStep
      };
    }

    if (decision.action === 'refine') {
      return {
        headline: 'Refine before you force',
        message: 'Flat does not automatically mean failing, but in a ' + phase + ' phase it does deserve attention. ' +
          'The answer is usually tighter execution, better rest control, and cleaner reps before extra load. ' + nextStep
      };
    }

    if (decision.action === 'adjust') {
      return {
        headline: 'Something needs adjusting, not dramatics',
        message: 'This does not look like a total collapse, but it does suggest the current setup is not giving you the signal we want. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') + nextStep
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
          'The smart move is controlled repetition, not impulse progression. ' + nextStep
      };
    }

    if (decision.action === 'push') {
      return {
        headline: 'Good day to push carefully',
        message: 'The wider picture supports a slightly more assertive session. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Push with discipline, not ego. ' + nextStep
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

    var mode = globalDecision.mode || 'build';
    var reasonText = joinReasons(globalDecision.reason || []);
    var phase = globalDecision.phase && globalDecision.phase.stage ? globalDecision.phase.stage : 'unknown';
    var strongest = globalDecision.strongestFamily ? familyLabel(globalDecision.strongestFamily) : '';
    var weakest = globalDecision.weakestFamily ? familyLabel(globalDecision.weakestFamily) : '';
    var weekly = globalDecision.weekly || {};
    var strain = globalDecision.strain || {};
    var nextSession = globalDecision.nextSession || {};
    var deload = globalDecision.deload || {};
    var painRisk = globalDecision.painRisk || {};
    var progPressure = globalDecision.progressionPressure || {};

    var familyLine = (strongest || weakest)
      ? (' ' + (strongest ? ('Strongest area lately: ' + strongest + '. ') : '') + (weakest ? ('Most fragile area lately: ' + weakest + '. ') : ''))
      : '';

    var weeklyLine = weekly && typeof weekly.sessionsLogged === 'number'
      ? (' Weekly picture: ' + weekly.sessionsLogged + ' training day' + (weekly.sessionsLogged === 1 ? '' : 's') +
         ', adherence ' + (weekly.adherence || 0) + '/100, training quality ' + (weekly.quality || 0) + '/100.')
      : '';

    var strainLine = (typeof strain.strainRisk === 'number')
      ? (' Strain risk: ' + strain.strainRisk + '/100. ')
      : '';

    var nextLine = nextSession && nextSession.title
      ? (' Next session: ' + nextSession.title + '. ' + (nextSession.action || ''))
      : '';

    if (mode === 'deload') {
      return {
        headline: 'Deload is now the smart move',
        message: 'This is not quitting. It is intelligent timing. The combined recovery, strain, and weekly quality picture now says a lighter week will serve you better than another forced push.' +
          weeklyLine + strainLine + familyLine + nextLine
      };
    }

    if (mode === 'pain-risk') {
      return {
        headline: 'Pain risk is rising',
        message: 'The recent notes and broader family picture suggest that irritation is building rather than settling. The right move is to lower pressure now, not wait until the pattern becomes an injury story.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'ready') {
      return {
        headline: 'Recovery basics are all in place',
        message: 'Hydration, sleep, food, and daily movement are all showing up. That does not guarantee a perfect session, but it does mean the platform under your training is strong.' +
          weeklyLine + strainLine + familyLine + nextLine
      };
    }

    if (mode === 'good-foundations') {
      return {
        headline: 'Your foundation looks mostly solid',
        message: 'Most of the recovery basics are in place. That is enough to train productively, and the next gain comes from repeating that standard more often.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'mixed-foundations') {
      return {
        headline: 'Some basics are there, some still need tightening',
        message: 'This is not a write-off. It just means the platform under your training is mixed. You will get more from steadier sleep, hydration, and fuelling than from trying to manufacture motivation.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'poor-foundations') {
      return {
        headline: 'The basics need attention first',
        message: 'Very few recovery markers are currently in place. Training can still count, but expectations should stay realistic and the priority should be rebuilding the foundation.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'stabilise') {
      return {
        headline: 'Stabilise the base before you push on',
        message: 'This phase needs consistency, and the basics are not strong enough to ignore. Tighten the daily foundations first and let the plan become easier to sustain.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'habit-priority') {
      return {
        headline: 'Consistency comes before sophistication',
        message: 'Right now the main limiter is not programme design but repeatability. The next gain comes from logging enough consistent sessions to give the coach something worth steering.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'reduce-strain') {
      return {
        headline: 'Reduce strain before you add ambition',
        message: 'The weekly picture suggests too much strain relative to the quality of training. That usually means the answer is not more effort, but cleaner structure, better recovery, and smarter restraint.' +
          weeklyLine + strainLine + familyLine +
          (weekly.swapSuggestions && weekly.swapSuggestions.length ? (' Safer swap ideas for the weakest pattern: ' + weekly.swapSuggestions.slice(0, 3).join(', ') + '.') : '') +
          nextLine
      };
    }

    if (mode === 'family-fatigue') {
      return {
        headline: 'One movement family looks broadly fatigued',
        message: 'This is the important distinction: it does not look like a single bad exercise. ' +
          (weakest ? ('The ' + weakest + ' pattern is where the strain is showing up most clearly. ') : '') +
          'That usually means the answer is not to force one lift harder, but to lower the load on the broader pattern and recover properly.' +
          weeklyLine +
          (weekly.swapSuggestions && weekly.swapSuggestions.length ? (' Safer short-term swaps: ' + weekly.swapSuggestions.slice(0, 3).join(', ') + '.') : '') +
          nextLine
      };
    }

    if (mode === 'protect') {
      return {
        headline: 'Protect mode: reduce pressure, keep momentum',
        message: 'The current picture says sustainability matters more than proving a point. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Your job is to keep training viable, not to win today at the expense of next week.' +
          weeklyLine + strainLine + familyLine + nextLine
      };
    }

    if (mode === 'steady') {
      return {
        headline: 'Steady the system before you demand more',
        message: 'The right response here is not to collapse the plan, but to lower the emotional temperature. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'A calm, completed session is more valuable than a strained attempt to feel heroic.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'recover') {
      return {
        headline: 'Recovery needs to catch up',
        message: 'This looks like one of those phases where trying harder is the wrong lever. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Keep the plan alive, but let recovery stop being the weak link.' +
          weeklyLine + strainLine + familyLine + nextLine
      };
    }

    if (mode === 'preserve') {
      return {
        headline: 'Preserve strength, do not bully it',
        message: 'In a ' + phase + ' phase, flat or slightly uneven performance does not mean the plan is broken. ' +
          'The win is preserving quality and keeping the basics tight while your wider goal does its work.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'hold') {
      return {
        headline: 'Hold the line',
        message: 'You do not need a retreat, but you also do not need false urgency. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Keep the work honest and let recovery earn the next push.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'push') {
      return {
        headline: 'Conditions look good for progress',
        message: 'This is the kind of week where a little assertiveness makes sense. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          (progPressure.state === 'high' ? 'Do not let progression pressure turn a good window into a reckless one. ' : '') +
          'Progress with precision and do not waste a good window by getting sloppy.' +
          weeklyLine + familyLine + nextLine
      };
    }

    if (mode === 'build') {
      return {
        headline: 'Keep stacking capable days',
        message: 'This phase rewards patience more than drama. ' +
          (reasonText ? sentenceCase(reasonText) + '. ' : '') +
          'Judge the trend, not the mood of one workout.' +
          weeklyLine + familyLine + nextLine
      };
    }

    return {
      headline: 'Keep building',
      message: (reasonText ? sentenceCase(reasonText) + '. ' : '') +
        'The broader picture still favours steady, repeatable good decisions.' +
        weeklyLine + familyLine + nextLine
    };
  }

  return {
    exerciseMessage: exerciseMessage,
    globalMessage: globalMessage
  };
})();
