// FreeFitFuel Engine — Human Coaching Language

window.FFFMessaging = (function () {
  'use strict';

  function exerciseMessage(decision) {
    const latest = decision.latest;
    const profile = decision.profile;

    if (!latest) {
      return {
        headline: 'Start with a clean first marker',
        message: 'Do not chase a heroic first entry. Log one honest set with tidy form and let that become the baseline you build from.'
      };
    }

    if (decision.painFlag) {
      return {
        headline: 'Protect the joint, not the ego',
        message: 'Your notes suggest discomfort. Strip this back today. Shorten the range, lower the load, or swap to a friendlier variation before this becomes a bigger interruption.'
      };
    }

    if (decision.action === 'progress' && decision.emphasis === 'momentum') {
      return {
        headline: 'You are moving in the right direction',
        message: 'This exercise is trending up. Keep the next jump small. The aim is repeatable progress, not a sudden leap that you have to pay for.'
      };
    }

    if (decision.action === 'progress' && decision.emphasis === 'confidence') {
      return {
        headline: 'You look ready for a small step forward',
        message: 'Recovery markers are favourable and nothing here suggests you need to force it. Add a rep or a small load increase only if the last set stayed technically clean.'
      };
    }

    if (decision.action === 'reduce') {
      return {
        headline: 'Today is a trim-the-fat session',
        message: 'You do not need to prove fitness by grinding through a poor recovery day. Reduce the demand, keep the movement honest, and leave enough in the tank to come back stronger.'
      };
    }

    if (decision.action === 'hold' && decision.emphasis === 'technique') {
      return {
        headline: 'Hold the load and sharpen the rep',
        message: 'Performance dipped slightly. That is not failure. Keep the weight where it is, tidy the pattern, and make the next session look better before you ask it to be heavier.'
      };
    }

    if (profile.unknown) {
      return {
        headline: 'Steady work matters',
        message: 'This movement is logged, but it is not yet deeply profiled in the engine. Treat today as a quality practice session and progress in small controlled steps.'
      };
    }

    return {
      headline: 'Keep stacking useful work',
      message: 'The win today is not drama. It is another solid session recorded with enough honesty that the next decision can be smarter.'
    };
  }

  function globalMessage(globalDecision, recovery, mind) {
    if (globalDecision.mode === 'protect') {
      return {
        headline: 'Protect and rebuild',
        message: 'Something in the recent notes suggests you need a calmer hand right now. Reduce intensity, keep movement clean, and lean on physio-style progressions rather than forcing normal training.'
      };
    }

    if (globalDecision.mode === 'downshift') {
      return {
        headline: 'Your capacity matters more than your pride',
        message: 'The engine is reading this more like strain than laziness. Lower the day’s ambition. A reduced session still counts if it keeps the habit and avoids digging a bigger hole.'
      };
    }

    if (globalDecision.mode === 'push') {
      return {
        headline: 'Good day to train with intent',
        message: 'Recovery markers are strong. You do not need chaos, but you do have room for purposeful work and a small progression where form supports it.'
      };
    }

    if (globalDecision.mode === 'recover') {
      return {
        headline: 'Recovery is the session today',
        message: 'Your basics are not supporting hard progress right now. Keep the session lighter, finish feeling more composed, and let sleep, food and hydration do some of the heavy lifting.'
      };
    }

    if (mind.narrative === 'inner_critic_high') {
      return {
        headline: 'Do not let the inner critic write the programme',
        message: 'You do not need punishment. You need useful work. Aim for clean reps, honest effort, and a finish that leaves your confidence more intact than when you started.'
      };
    }

    return {
      headline: 'Keep stacking consistent days',
      message: 'Not every day needs to feel heroic. Enough good days repeated over time will still beat random bursts of motivation.'
    };
  }

  return {
    exerciseMessage,
    globalMessage
  };
})();
