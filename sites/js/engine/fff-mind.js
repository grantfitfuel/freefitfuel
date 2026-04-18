// FreeFitFuel Engine — Mind / Frame-of-Mind Intelligence

window.FFFMind = (function () {
  'use strict';

  const LEXICON = {
    dread: ['dread', 'avoid', 'avoiding', 'can’t face', 'cannot face', 'not up for', 'no motivation'],
    burnout: ['burnt out', 'burnout', 'fried', 'exhausted', 'drained', 'empty', 'done in'],
    selfAttack: ['useless', 'pathetic', 'weak', 'shit', 'failure', 'hopeless', 'behind'],
    fragility: ['anxious', 'fragile', 'wobbly', 'flat', 'numb', 'off', 'overwhelmed'],
    painFear: ['worried', 'scared', 'fear', 'flare', 'reinjure', 'injure', 'setback']
  };

  function textIncludesAny(text, arr) {
    const t = String(text || '').toLowerCase();
    return arr.some(function (item) { return t.indexOf(item) !== -1; });
  }

  function analyse(allLogs, checks) {
    const notes = [];
    Object.keys(allLogs || {}).forEach(function (k) {
      (allLogs[k] || []).slice(-2).forEach(function (entry) {
        if (entry && entry.notes) notes.push(String(entry.notes));
      });
    });

    const joined = notes.join(' | ').toLowerCase();
    const hydration = !!checks.hydration;
    const sleep = !!checks.sleep;
    const macros = !!checks.macros;

    const state = {
      dread: textIncludesAny(joined, LEXICON.dread),
      burnout: textIncludesAny(joined, LEXICON.burnout),
      selfAttack: textIncludesAny(joined, LEXICON.selfAttack),
      fragility: textIncludesAny(joined, LEXICON.fragility),
      painFear: textIncludesAny(joined, LEXICON.painFear)
    };

    let tone = 'steady';
    if (state.burnout || (!sleep && !macros && !hydration)) tone = 'gentle';
    if (state.selfAttack) tone = 'grounding';
    if (state.dread) tone = 'activation';
    if (state.fragility) tone = 'reassuring';
    if (state.painFear) tone = 'protective';

    let narrative = 'neutral';
    if (state.burnout) narrative = 'capacity_low';
    else if (state.dread) narrative = 'friction_high';
    else if (state.selfAttack) narrative = 'inner_critic_high';
    else if (state.fragility) narrative = 'confidence_delicate';
    else if (hydration && sleep && macros) narrative = 'stable_foundation';

    return {
      state: state,
      tone: tone,
      narrative: narrative
    };
  }

  return {
    analyse
  };
})();
