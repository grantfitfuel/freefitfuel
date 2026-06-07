// FreeFitFuel Engine — Modular Planner Layer v2.3
// Purpose: Personalised Plan and Build My Week choose exercises from modular packs.
// Replaces the old hard-coded LIB planner.
(function(){
  'use strict';

  var KEY_ROADMAP = 'fff.roadmap.plan.v1';
  var KEY_EQUIP = 'fff.equipment.profile.v1';
  var KEY_INJURY = 'fff.myplan.injuries.v2';
  var KEY_INJURY_LEGACY = 'fff.injury.profile.v1';
  var KEY_LIBRARY = 'fff.libraryPayload';
  var KEY_CURRENT = 'fff.currentPlan.v1';
  var KEY_PERSONALISED = 'fff.personalisedPlan.v2';
  var KEY_WEEK = 'fff.buildMyWeek.v2';
  var KEY_VARIETY = 'fff.planner.variety.v1';

  function readJSON(key, fallback){
    try{ var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch(e){ return fallback; }
  }
  function writeJSON(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(e){ return false; }
  }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function lower(v){ return String(v || '').toLowerCase(); }
  function unique(list){
    var seen = {};
    return arr(list).filter(function(x){
      var k = lower(x);
      if(!k || seen[k]) return false;
      seen[k] = true;
      return true;
    });
  }

  function getVarietyHistory(){
    var h = readJSON(KEY_VARIETY, null);
    if(!h || typeof h !== 'object') h = {};
    if(!Array.isArray(h.recentKeys)) h.recentKeys = [];
    if(!Array.isArray(h.builds)) h.builds = [];
    return h;
  }

  function saveVarietyHistory(payload){
    payload = payload || {};
    var h = getVarietyHistory();
    var keys = [];
    arr(payload.sessions).forEach(function(session){
      arr(session.items).forEach(function(item){
        if(item && item.key) keys.push(item.key);
      });
    });

    h.recentKeys = unique(keys.concat(h.recentKeys)).slice(0, 80);
    h.builds.unshift({
      date: Date.now(),
      mode: payload.mode || '',
      phase: payload.phase || '',
      packs: payload.packs || [],
      keys: keys
    });
    h.builds = h.builds.slice(0, 12);
    writeJSON(KEY_VARIETY, h);
    return h;
  }

  function seededNoise(key, salt){
    var str = String(key || '') + '|' + String(salt || '') + '|' + Date.now();
    var h = 2166136261;
    for(var i = 0; i < str.length; i++){
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return ((h >>> 0) % 1000) / 1000;
  }

  function equipmentList(equip){
    equip = equip || readJSON(KEY_EQUIP, {});
    var src = equip.equip || equip;
    var out = ['bw'];
    Object.keys(src || {}).forEach(function(k){
      if(src[k]) out.push(k);
    });
    return unique(out.map(function(k){
      if(k === 'dumbbells') return 'db';
      if(k === 'bands') return 'band';
      if(k === 'pullUpBar' || k === 'pullup') return 'bar';
      return k;
    }));
  }

  function injuryDetails(profile){
    profile = profile || readJSON(KEY_INJURY, null) || readJSON(KEY_INJURY_LEGACY, {}) || {};
    var items = profile.items || {};
    var out = [];

    function add(area, item){
      item = item || {};
      if(!area) return;
      var active = item.active !== false;
      if(profile.selected && Array.isArray(profile.selected)) active = profile.selected.indexOf(area) > -1;
      if(!active && item !== true) return;
      out.push({
        area: lower(area),
        severity: lower(item.severity || profile.severity || 'mild'),
        status: lower(item.status || profile.status || 'stable'),
        symptoms: item.symptoms || profile.symptoms || {}
      });
    }

    if(items && typeof items === 'object'){
      Object.keys(items).forEach(function(area){ add(area, items[area]); });
    }

    arr(profile.selected || profile.issues || profile.injuries).forEach(function(area){
      if(!out.some(function(x){ return x.area === lower(area); })) add(area, {active:true});
    });

    Object.keys(profile || {}).forEach(function(k){
      if(profile[k] === true && !out.some(function(x){ return x.area === lower(k); })) add(k, {active:true});
    });

    return out;
  }

  function mapInjuryAreaToTokens(area){
    var out = [area];
    if(/biceps|elbow|forearm/.test(area)) out.push('elbow-tendon-pain','biceps-pain');
    if(/hip|groin/.test(area)) out.push('hip-tendon-pain-reduced-rom','hip-pain');
    if(/knee|patella/.test(area)) out.push('clicky-knees-painful','knee-pain');
    if(/ankle/.test(area)) out.push('ankle-pain');
    if(/achilles/.test(area)) out.push('achilles-pain');
    if(/shin/.test(area)) out.push('shin-splints');
    if(/back|lumbar/.test(area)) out.push('low-back-non-specific');
    if(/shoulder/.test(area)) out.push('shoulder-impingement');
    if(/neck/.test(area)) out.push('neck-pain');
    if(/wrist/.test(area)) out.push('wrist-pain');
    if(/foot|plantar/.test(area)) out.push('foot-pain','plantar-fasciitis');
    return out;
  }

  function symptomTokens(symptoms){
    var out = [];
    symptoms = symptoms || {};
    Object.keys(symptoms).forEach(function(k){
      if(!symptoms[k]) return;
      out.push(lower(k));
      if(k === 'sharp_pain') out.push('sharp-pain');
      if(k === 'locking_or_catching') out.push('locking','catching');
      if(k === 'numbness_or_tingling') out.push('numbness','tingling');
      if(k === 'reduced_range') out.push('reduced-rom');
    });
    return out;
  }

  function injuryTokens(profile){
    var details = injuryDetails(profile);
    var out = [];
    details.forEach(function(item){
      out = out.concat(mapInjuryAreaToTokens(item.area));
      out = out.concat(symptomTokens(item.symptoms));
    });
    var blob = lower(JSON.stringify(profile || {}));
    if(/biceps|elbow|forearm/.test(blob)) out.push('elbow-tendon-pain','biceps-pain');
    if(/hip/.test(blob)) out.push('hip-tendon-pain-reduced-rom','hip-pain');
    if(/knee/.test(blob)) out.push('clicky-knees-painful','knee-pain');
    if(/ankle/.test(blob)) out.push('ankle-pain');
    if(/achilles/.test(blob)) out.push('achilles-pain');
    if(/shin/.test(blob)) out.push('shin-splints');
    if(/back/.test(blob)) out.push('low-back-non-specific');
    if(/shoulder/.test(blob)) out.push('shoulder-impingement');
    return unique(out);
  }

  function hardInjuryTokens(profile){
    var details = injuryDetails(profile);
    var out = [];
    details.forEach(function(item){
      var severe = item.severity === 'moderate' || item.severity === 'significant' || item.status === 'worsening';
      var symptoms = item.symptoms || {};
      if(symptoms.sharp_pain || symptoms.locking_or_catching || symptoms.numbness_or_tingling) severe = true;
      if(severe){
        out = out.concat(mapInjuryAreaToTokens(item.area));
        out = out.concat(symptomTokens(symptoms));
      }
    });
    return unique(out);
  }

  function injuryPenaltyForExercise(ex, profile){
    var details = injuryDetails(profile && profile.rawInjuries);
    if(!details.length || !ex) return 0;
    var caution = arr(ex.cautionIf).map(lower).join(' ');
    var penalty = 0;
    details.forEach(function(item){
      var tokens = mapInjuryAreaToTokens(item.area).concat(symptomTokens(item.symptoms));
      var match = tokens.some(function(t){ return caution.indexOf(lower(t)) > -1 || lower(t).indexOf(caution) > -1; });
      if(!match) return;
      if(item.severity === 'significant') penalty += 30;
      else if(item.severity === 'moderate') penalty += 18;
      else penalty += 8;
      if(item.status === 'worsening') penalty += 12;
    });
    return penalty;
  }

  function currentPhase(){
    var roadmap = readJSON(KEY_ROADMAP, null);
    var stage = roadmap && Array.isArray(roadmap.stages) && roadmap.stages[0] ? roadmap.stages[0] : null;
    var text = lower(stage ? (stage.id + ' ' + stage.name + ' ' + stage.blurb) : JSON.stringify(roadmap || {}));
    if(text.indexOf('cut') > -1 || text.indexOf('fat') > -1) return 'cut';
    if(text.indexOf('maint') > -1 || text.indexOf('bridge') > -1) return 'maintenance';
    if(text.indexOf('build') > -1 || text.indexOf('hypertrophy') > -1 || text.indexOf('bulk') > -1) return 'build';
    return 'recomp';
  }

  function explicitOperationalIntent(options){
    options = options || {};
    if(options.operational === true || options.operationalIntent === true) return true;

    var explicitText = lower([
      options.operationalPathway,
      options.pathway,
      options.selectedPathway,
      options.goalIntent,
      options.goalCategory,
      options.trainingPathway
    ].join(' '));

    if(/\b(operational fitness|police fitness|fire fitness|fire and rescue|fire & rescue|army reserve|military conditioning|search and rescue|blue-light resilience|blue light resilience)\b/.test(explicitText)) return true;

    var style = lower(options.style || '');
    if(/^(operational|operational-fitness|police|fire|fire-rescue|army|army-reserve|military|rescue|blue-light)$/.test(style)) return true;

    return false;
}


  function inferSystemBias(options, rawInjuries, allInjuryTokens){
    options = options || {};
    var out = [];
    function add(id){ if(id && out.indexOf(id) === -1) out.push(id); }
    arr(options.systems || options.systemIds || options.preferredSystems).forEach(add);

    var text = lower([
      options.goal, options.style, options.focus, options.notes,
      arr(options.goals).join(' '), arr(allInjuryTokens).join(' '), JSON.stringify(rawInjuries || {})
    ].join(' '));

    if(/knee|patella|stairs|step.?down|squat pain/.test(text)) add('knee-capacity-reset');
    if(/hip|knee|cramp|sitting stiffness|walking pain/.test(text)) add('hip-knee-pain-reset');
    if(/ankle|calf|shin|achilles|foot|toe|plantar|balance|lower leg|running/.test(text)) add('lower-leg-stability-system');
    if(/pull.?up|chin.?up|scapular|grip|lat|upper body strength/.test(text)) add('pull-up-progression-pathway');
    if(/biceps|elbow|forearm|wrist|pressing pain|bench pain/.test(text)) add('biceps-elbow-pain-protocol');
    if(/joint|control|mobility|stiff|range|warm.?up|beginner|over.?40/.test(text)) add('joint-control-foundations');
    if(/recovery|fatigue|low energy|stress|sleep|easy day/.test(text)) add('daily-recovery-flow');
    if(/fascia|deskbound|whole body|posture|stiffness|flow/.test(text)) add('fascia-flow-reset');
    if(/lymph|circulation|walking|tai chi|low impact|gentle/.test(text)) add('lymphatic-recovery-flow');
    if(/desk|sitting|chair|neck|hips|back|posture|work break/.test(text)) add('deskbound-reset-flow');
    return out;
  }

  function systemsFromSessions(sessions){
    var map = {};
    arr(sessions).forEach(function(session){
      arr(session.items).forEach(function(item){
        arr(item.systems).forEach(function(id){ map[id] = true; });
        arr(item.sourceModules).forEach(function(m){ if(m && m.id) map[m.id] = true; });
      });
    });
    return Object.keys(map);
  }

  function buildProfile(options){
    options = options || {};
    var roadmap = readJSON(KEY_ROADMAP, {}) || {};
    var phase = options.phase || currentPhase();
    var goalText = lower([
      options.goal,
      options.style,
      options.focus,
      phase,
      JSON.stringify(roadmap || {})
    ].join(' '));

    var rawInjuries = options.injuries || readJSON(KEY_INJURY, null) || readJSON(KEY_INJURY_LEGACY, {}) || {};
    var operationalIntent = explicitOperationalIntent(options);
    var injuries = hardInjuryTokens(rawInjuries);
    var allInjuryTokens = injuryTokens(rawInjuries);
    var systemBias = inferSystemBias(options, rawInjuries, allInjuryTokens);
    var equip = equipmentList(options.equip);

    var profile = {
      mode: options.mode || 'personalised',
      phase: phase,
      style: options.style || (phase === 'cut' ? 'preserve-strength' : phase === 'build' ? 'hypertrophy' : 'balanced'),
      days: Math.max(1, Math.min(7, parseInt(options.days || 4, 10))),
      equipment: equip,
      injuries: injuries,
      allInjuryTokens: allInjuryTokens,
      systems: systemBias,
      injuryDetails: injuryDetails(rawInjuries),
      rawInjuries: rawInjuries,
      goalText: goalText,
      operationalIntent: operationalIntent,
      preferredPacks: arr(options.packs),
      recovery: Number(options.recovery || 3),
      experience: options.experience || '',
      availableTime: Number(options.availableTime || 45),
      varietySalt: options.varietySalt || (Date.now() + '-' + Math.random()),
      varietyHistory: getVarietyHistory()
    };

    if(window.FFFExerciseDB && typeof window.FFFExerciseDB.selectRelevantPacks === 'function'){
      profile.packs = unique(arr(options.packs).concat(window.FFFExerciseDB.selectRelevantPacks({
        goal: goalText,
        style: profile.style,
        notes: goalText,
        injuries: allInjuryTokens,
        operationalIntent: operationalIntent
      })));
    }else{
      profile.packs = unique(arr(options.packs).concat(['core-library']));
    }

    if(!profile.packs.length) profile.packs = ['core-library'];
    return profile;
  }

  function scoreExercise(ex, tokens, profile, used){
    var score = 0;
    var blob = lower([
      ex.key, ex.name, ex.family, ex.movement,
      arr(ex.purposes).join(' '),
      arr(ex.tags).join(' '),
      arr(ex.domains).join(' '),
      arr(ex.styles).join(' '),
      arr(ex.styleBias).join(' '),
      arr(ex.systems).join(' '),
      arr(ex.sourceModules).map(function(m){ return m ? [m.id,m.label,m.url].join(' ') : ''; }).join(' '),
      ex.sourcePage || '',
      ex.sourceLabel || '',
      arr(ex.muscles).join(' ')
    ].join(' '));

    tokens.concat(profile.allInjuryTokens || []).forEach(function(t){
      if(blob.indexOf(lower(t)) > -1) score += 12;
    });

    arr(profile.systems).forEach(function(systemId){
      if(arr(ex.systems).indexOf(systemId) > -1) score += 18;
      if(blob.indexOf(lower(systemId)) > -1) score += 8;
    });

    if(profile.phase === 'cut' && /strength|compound|carry|conditioning|work-capacity/.test(blob)) score += 4;
    if(profile.phase === 'build' && /hypertrophy|strength|push|pull|squat|hinge|lunge/.test(blob)) score += 4;
    if(profile.recovery <= 2 && Number(ex.recoveryFriendliness || 0) >= 4) score += 6;
    if(profile.recovery <= 2 && Number(ex.fatigueCost || 3) >= 5) score -= 12;

    if(used[ex.key]) score -= 30;

    var history = profile.varietyHistory || { recentKeys: [] };
    if(history.recentKeys && history.recentKeys.indexOf(ex.key) > -1){
      score -= 14;
    }

    score += Number(ex.movementQuality || 0);
    score -= Math.max(0, Number(ex.jointStress || 2) - 3) * 2;
    score -= injuryPenaltyForExercise(ex, profile);

    // Controlled variety: keeps high-scoring suitable exercises near the top,
    // but stops identical criteria returning the exact same list every time.
    score += seededNoise(ex.key, profile.varietySalt) * 8;

    return score;
  }

  function getPool(profile){
    if(!window.FFFExerciseDB || typeof window.FFFExerciseDB.getMyPlanLibrary !== 'function') return [];
    return window.FFFExerciseDB.getMyPlanLibrary({
      packs: profile.packs,
      equipment: profile.equipment,
      injuries: profile.injuries
    });
  }

  function choose(pool, tokens, profile, used, count){
    count = count || 1;
    var scored = arr(pool)
      .map(function(ex){ return { ex: ex, score: scoreExercise(ex, tokens, profile, used) }; })
      .filter(function(item){ return item.score > -20; })
      .sort(function(a,b){ return b.score - a.score; });

    var picks = [];
    scored.forEach(function(item){
      if(picks.length >= count) return;
      if(used[item.ex.key]) return;
      used[item.ex.key] = true;
      picks.push(item.ex);
    });
    return picks;
  }

  function exercisePayload(ex){
    return {
      key: ex.key,
      name: ex.name,
      type: ex.type || 'exercise',
      packId: ex.packId,
      family: ex.family,
      movement: ex.movement,
      equipment: ex.equipment,
      purposes: ex.purposes,
      tags: ex.tags,
      domains: ex.domains,
      difficulty: ex.difficulty,
      muscles: ex.muscles,
      yt: ex.yt,
      defaultRx: ex.defaultRx,
      tempo: ex.tempo,
      rest: ex.rest,
      coachingCue: ex.coachingCue,
      regressions: ex.regressions || [],
      progressions: ex.progressions || [],
      alternatives: ex.alternatives || [],
      cautionIf: ex.cautionIf || [],
      systems: ex.systems || [],
      sourceModules: ex.sourceModules || [],
      sourcePage: ex.sourcePage || ((ex.sourceModules && ex.sourceModules[0] && ex.sourceModules[0].url) || ''),
      sourceLabel: ex.sourceLabel || ((ex.sourceModules && ex.sourceModules[0] && ex.sourceModules[0].label) || ''),
      fatigueCost: ex.fatigueCost,
      jointStress: ex.jointStress,
      recoveryFriendliness: ex.recoveryFriendliness
    };
  }

  function buildSession(title, subtitle, tokenGroups, pool, profile, used){
    var items = [];
    tokenGroups.forEach(function(group){
      choose(pool, group, profile, used, 1).forEach(function(ex){ items.push(exercisePayload(ex)); });
    });

    return {
      title: title,
      subtitle: subtitle,
      items: items,
      extras: [
        'Chosen from modular exercise packs, not the old hard-coded planner library.',
        'Swap to a regression if pain changes your movement quality.'
      ]
    };
  }

  function sessionTemplates(profile){
    var operational = !!profile.operationalIntent;
    var running = /run|running|endurance|5k|10k|marathon/.test(profile.goalText);
    var injury = profile.injuries.length > 0;

    if(operational){
      return [
        ['Operational Strength', 'Carries, crawling, loaded movement and practical strength.', [['carry','loaded'], ['crawl','ground-to-feet'], ['core','brace']]],
        ['Operational Conditioning', 'Repeatable work capacity without needless chaos.', [['conditioning','shuttle'], ['work-capacity','circuit'], ['breathing','recovery']]],
        ['Lower-Body Capacity', 'Stairs, step-ups, hill or ruck support where appropriate.', [['step-up','stairs'], ['ruck','march'], ['hip','knee']]],
        ['Recovery / Joint Control', 'Keeps the plan repeatable.', [['recovery','mobility'], ['joint-control','balance'], ['fascia','lymphatic']]]
      ];
    }

    if(running){
      return [
        ['Run Support Strength', 'Lower-leg, knee and hip capacity for running.', [['lower-leg','calf','shin'], ['knee','step-down'], ['hip','glute']]],
        ['Conditioning', 'Aerobic or interval support matched to recovery.', [['running','conditioning'], ['zone-2','endurance'], ['breathing']]],
        ['Core + Control', 'Trunk and joint control for better mechanics.', [['core','anti-rotation'], ['balance','stability'], ['mobility']]],
        ['Recovery Flow', 'Low-cost movement to keep frequency sustainable.', [['recovery','mobility'], ['fascia'], ['lymphatic']]]
      ];
    }

    if(injury){
      return [
        ['Pain-Aware Strength', 'Build strength without ignoring current warning signs.', [['strength'], ['supported'], ['control']]],
        ['Targeted Capacity', 'Uses the relevant physio-style packs first.', [['knee','hip','ankle','elbow'], ['stability','balance'], ['mobility']]],
        ['Upper / Lower Balance', 'Keeps training rounded around the limitation.', [['push'], ['pull'], ['hinge','squat']]],
        ['Recovery Flow', 'Protects consistency while symptoms settle.', [['recovery'], ['joint-control'], ['breathing']]]
      ];
    }

    return [
      ['Upper Strength', 'Push and pull work chosen from the relevant packs.', [['push','chest'], ['pull','back'], ['arms','grip']]],
      ['Lower Strength', 'Squat, hinge, glute and trunk work.', [['squat','lunge'], ['hinge','glute'], ['core']]],
      ['Conditioning', 'Work capacity or endurance matched to your goal.', [['conditioning'], ['carry'], ['zone-2']]],
      ['Recovery / Mobility', 'Keeps the plan repeatable.', [['recovery'], ['mobility'], ['joint-control']]]
    ];
  }

  function buildSessions(options){
    var profile = buildProfile(options);
    var pool = getPool(profile);
    var used = {};
    var templates = sessionTemplates(profile);

    var sessions = templates.map(function(t, idx){
      var s = buildSession(t[0], t[1], t[2], pool, profile, used);
      s.day = idx + 1;
      return s;
    });

    if(profile.days > sessions.length){
      sessions.push(buildSession('Optional Capacity Day', 'Only use if recovery is good.', [['conditioning'], ['carry','loaded'], ['recovery']], pool, profile, used));
    }

    return sessions.slice(0, profile.days);
  }

  function buildPayload(options){
    options = options || {};
    var profile = buildProfile(options);
    var sessions = buildSessions(options);

    var payload = {
      source: 'fff-planner-modular',
      version: 2,
      mode: profile.mode,
      style: profile.style,
      phase: profile.phase,
      packs: profile.packs,
      equipment: profile.equipment,
      injuryProfile: profile.injuries,
      injuryDetails: profile.injuryDetails,
      allInjuryTokens: profile.allInjuryTokens,
      systemBias: profile.systems,
      recommendedSystems: systemsFromSessions(sessions),
      sessions: sessions.map(function(s, idx){
        s.day = s.day || idx + 1;
        return s;
      }),
      requestedAt: Date.now()
    };

    writeJSON(KEY_LIBRARY, payload);
    writeJSON(KEY_CURRENT, {
      style: payload.style,
      phase: payload.phase,
      days: String(payload.sessions.length),
      packs: payload.packs,
      payload: payload
    });

    if(profile.mode === 'week') writeJSON(KEY_WEEK, payload);
    else writeJSON(KEY_PERSONALISED, payload);

    saveVarietyHistory(payload);

    document.dispatchEvent(new CustomEvent('fff:planner-payload-built', { detail: payload }));
    return payload;
  }

  function buildPersonalisedPlan(options){
    options = options || {};
    options.mode = 'personalised';
    return buildPayload(options);
  }

  function buildWeek(options){
    options = options || {};
    options.mode = 'week';
    return buildPayload(options);
  }

  function readyBuildPayload(options){
    if(window.FFFExerciseDB && typeof window.FFFExerciseDB.ensureLoaded === 'function'){
      return window.FFFExerciseDB.ensureLoaded().then(function(){ return buildPayload(options); });
    }
    return Promise.resolve(buildPayload(options));
  }

  window.FFFPlanner = {
    version: '2.3-system-metadata-linked',
    keys: {
      roadmap: KEY_ROADMAP,
      equipment: KEY_EQUIP,
      injury: KEY_INJURY,
      library: KEY_LIBRARY,
      current: KEY_CURRENT,
      personalised: KEY_PERSONALISED,
      week: KEY_WEEK
    },
    library: [],
    injuryTokens: injuryTokens,
    hardInjuryTokens: hardInjuryTokens,
    explicitOperationalIntent: explicitOperationalIntent,
    injuryDetails: injuryDetails,
    currentPhase: currentPhase,
    buildProfile: buildProfile,
    buildSessions: buildSessions,
    buildPayload: buildPayload,
    buildPersonalisedPlan: buildPersonalisedPlan,
    buildWeek: buildWeek,
    readyBuildPayload: readyBuildPayload,
    getVarietyHistory: getVarietyHistory,
    clearVarietyHistory: function(){ writeJSON(KEY_VARIETY, { recentKeys: [], builds: [] }); return true; }
  };
})();
