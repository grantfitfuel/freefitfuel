// FreeFitFuel Engine — Messaging Layer

window.FFFMessaging = (function () {
  'use strict';

  function exerciseMessage(decision) {
    if (!decision) {
      return {
        headline: 'No coaching available',
        message: 'The engine could not generate exercise guidance for this movement yet.'
      };
    }

    switch (decision.action) {
      case 'start':
        return {
          headline: 'Start calm and collect signal',
          message: 'Do not try to prove anything on the first log. Give the engine clean data: controlled set, honest effort, clear notes.'
        };

      case 'protect':
        return {
          headline: 'Protect this movement for now',
          message: 'This no longer looks like a normal progression decision. Reduce load or range, use a safer variation if needed, and prioritise symptom control over numbers.'
        };

      case 'recover':
        return {
          headline: 'Recovery is the limiter today',
          message: 'The issue is probably not effort or character. It looks more like fatigue or under-recovery. Hold or reduce load and rebuild quality first.'
        };

      case 'steady':
        return {
          headline: 'Keep this session emotionally neutral',
          message: 'Do not turn one log into a judgement on yourself. Keep it controlled, finish the work cleanly, and let consistency speak louder than mood.'
        };

      case 'progress':
        return {
          headline: 'You have earned a small progression',
          message: 'This lift is moving in the right direction and the wider picture supports it. Add a rep or a modest load increase next time, not both.'
        };

      case 'refine':
        return {
          headline: 'Refine before you force',
          message: 'This looks like a plateau, not a dead end. Improve execution, rest discipline, and rep quality before trying to bully the numbers upward.'
        };

      case 'push':
        return {
          headline: 'Good day to push carefully',
          message: 'The overall picture is supportive. Be assertive, but still precise. Clean reps first, small progression second.'
        };

      case 'hold':
      default:
        return {
          headline: 'Hold steady and build',
          message: 'Nothing here suggests panic or a dramatic change. Keep the load sensible, own the reps, and keep stacking steady work.'
        };
    }
  }

  function globalMessage(globalDecision, recovery, mind) {
    if (!globalDecision) {
      return {
        headline: 'Coach unavailable',
        message: 'The engine could not produce a global coaching summary.'
      };
    }

    switch (globalDecision.mode) {
      case 'start':
        return {
          headline: 'Engine ready — begin by building consistency',
          message: 'Right now the most valuable thing is not intensity but signal. Log sessions honestly, keep the basics simple, and let the coach learn your patterns.'
        };

      case 'protect':
        return {
          headline: 'Protect mode: reduce pressure and recover',
          message: 'The current picture suggests accumulated stress, pain risk, or under-recovery. Your job today is not to prove toughness. It is to keep the plan sustainable.'
        };

      case 'steady':
        return {
          headline: 'Steady the system before you demand more',
          message: 'The mental or emotional load looks high enough that aggressive coaching would be the wrong call. Keep the ask realistic and finish something clean.'
        };

      case 'hold':
        return {
          headline: 'Hold the line',
          message: 'You do not need to retreat, but you also do not need to chase. Recovery looks mixed, so the smartest move is controlled work and better basics.'
        };

      case 'push':
        return {
          headline: 'Conditions look good for progress',
          message: 'Recovery and mindset are lining up well enough for constructive progression. Push with discipline, not ego.'
        };

      case 'build':
      default:
        return {
          headline: 'Keep stacking capable days',
          message: 'The picture is not calling for a dramatic shift. Stay consistent, keep quality high, and let progress come from repeated good decisions.'
        };
    }
  }

  return {
    exerciseMessage: exerciseMessage,
    globalMessage: globalMessage
  };
})();
