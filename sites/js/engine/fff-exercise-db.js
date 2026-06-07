/* FreeFitFuel modular exercise database loader v6.5
   Single exercise API for Workouts, Personalised Plan and Build My Week.
   Exercises live in /sites/data/exercises/*.json. No hard-coded exercise pool here.
*/
(function(){
  'use strict';

  var BASE = 'data/exercises/';
  var MANIFEST = BASE + 'manifest.json';

  var state = {
    version: '6.7-system-metadata-linked',
    loaded: false,
    loading: null,
    manifest: null,
    packs: [],
    exercises: [],
    byKey: {},
    byName: {},
    byPack: {}
  };

  function arr(v){ return Array.isArray(v) ? v : []; }
  function lower(v){ return String(v || '').toLowerCase(); }
  function clone(v){ return JSON.parse(JSON.stringify(v == null ? null : v)); }
  function unique(list){
    var seen = {};
    return arr(list).filter(function(x){
      var k = lower(x);
      if(!k || seen[k]) return false;
      seen[k] = true;
      return true;
    });
  }

  function normaliseEquipmentToken(token){
    token = lower(token);
    if(token === 'bodyweight' || token === 'none') return 'bw';
    if(token === 'dumbbell' || token === 'dumbbells') return 'db';
    if(token === 'bands' || token === 'resistance-band' || token === 'resistance bands') return 'band';
    if(token === 'kettlebells') return 'kb';
    if(token === 'pullup' || token === 'pull-up' || token === 'pull up bar') return 'bar';
    return token;
  }

  function normaliseExercise(ex, pack){
    ex = ex || {};
    var key = ex.key || lower(ex.name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    var packId = pack && pack.id ? pack.id : (ex.packId || ex.pack || '');
    var out = Object.assign({}, ex, {
      key: key,
      name: ex.name || key,
      packId: packId,
      packFile: pack && pack.file ? pack.file : (ex.packFile || ''),
      equipment: unique(arr(ex.equipment).map(normaliseEquipmentToken)),
      styles: unique(arr(ex.styles)),
      purposes: unique(arr(ex.purposes)),
      muscles: unique(arr(ex.muscles)),
      primaryMuscles: unique(arr(ex.primaryMuscles)),
      secondaryMuscles: unique(arr(ex.secondaryMuscles)),
      difficulty: unique(arr(ex.difficulty)),
      cautionIf: unique(arr(ex.cautionIf)),
      tags: unique(arr(ex.tags)),
      domains: unique(arr(ex.domains)),
      styleBias: unique(arr(ex.styleBias)),
      regressions: unique(arr(ex.regressions)),
      progressions: unique(arr(ex.progressions)),
      alternatives: unique(arr(ex.alternatives)),
      systems: unique(arr(ex.systems || ex.systemIds)),
      sourceModules: arr(ex.sourceModules).filter(function(m){ return m && (m.id || m.url || m.label); }),
      sourcePage: ex.sourcePage || '',
      sourceLabel: ex.sourceLabel || '',
      aliases: unique(arr(ex.aliases).concat([ex.name, key]))
    });

    out.searchBlob = lower([
      out.key,
      out.name,
      out.family,
      out.movement,
      out.packId,
      out.equipment.join(' '),
      out.styles.join(' '),
      out.purposes.join(' '),
      out.tags.join(' '),
      out.domains.join(' '),
      out.styleBias.join(' '),
      out.systems.join(' '),
      out.sourceModules.map(function(m){ return [m.id,m.label,m.url].join(' '); }).join(' '),
      out.sourcePage,
      out.sourceLabel,
      out.muscles.join(' '),
      out.difficulty.join(' ')
    ].join(' '));

    return out;
  }

  function indexExercises(exercises){
    state.byKey = {};
    state.byName = {};
    state.byPack = {};

    exercises.forEach(function(ex){
      state.byKey[ex.key] = ex;
      state.byName[lower(ex.name)] = ex;
      arr(ex.aliases).forEach(function(alias){ state.byName[lower(alias)] = ex; });

      var packId = ex.packId || 'unassigned';
      if(!state.byPack[packId]) state.byPack[packId] = [];
      state.byPack[packId].push(ex);
    });
  }

  function load(packIds){
    if(state.loading && !packIds) return state.loading;

    var wanted = Array.isArray(packIds) && packIds.length ? packIds.map(String) : null;

    state.loading = fetch(MANIFEST)
      .then(function(r){
        if(!r.ok) throw new Error('Exercise manifest failed: ' + r.status);
        return r.json();
      })
      .then(function(manifest){
        state.manifest = manifest;
        var packs = arr(manifest.packs);
        if(wanted){
          var wantedSet = {};
          wanted.forEach(function(id){ wantedSet[id] = true; });
          packs = packs.filter(function(p){ return wantedSet[p.id]; });
        }

        return Promise.all(packs.map(function(pack){
          return fetch(BASE + pack.file)
            .then(function(r){
              if(!r.ok) throw new Error('Exercise pack failed: ' + pack.file + ' (' + r.status + ')');
              return r.json();
            })
            .then(function(items){
              return arr(items).map(function(ex){ return normaliseExercise(ex, pack); });
            });
        })).then(function(chunks){
          var seen = {};
          var merged = [];
          chunks.reduce(function(a,b){ return a.concat(b); }, []).forEach(function(ex){
            if(!ex || !ex.key || seen[ex.key]) return;
            seen[ex.key] = true;
            merged.push(ex);
          });

          state.loaded = true;
          state.packs = packs;
          state.exercises = merged;
          indexExercises(merged);

          window.FFF_EXERCISE_DB = API;
          window.FFFExerciseDB = API;
          window.FFF_EXERCISES = merged;
          window.FFFExercises = merged;
          window.EXERCISES = merged;

          document.dispatchEvent(new CustomEvent('fff:exercises-loaded', {
            detail: { count: merged.length, packs: packs.map(function(p){ return p.id; }) }
          }));

          return merged;
        });
      })
      .catch(function(err){
        console.error('[FreeFitFuel] Exercise DB failed:', err);
        throw err;
      });

    return state.loading;
  }

  function ensureLoaded(){
    return state.loaded ? Promise.resolve(state.exercises) : load();
  }

  function getAll(){ return state.exercises || []; }
  function getByKey(key){ return state.byKey[String(key || '')] || null; }
  function getByName(name){ return state.byName[lower(name)] || null; }
  function getExerciseProfile(nameOrKey){ return getByKey(nameOrKey) || getByName(nameOrKey) || null; }
  function getPacks(){ return state.packs || []; }
  function getByPack(packId){ return state.byPack[String(packId || '')] || []; }

  function tokenMatch(ex, tokens){
    tokens = arr(tokens).map(lower).filter(Boolean);
    if(!tokens.length) return true;
    return tokens.some(function(t){ return ex.searchBlob.indexOf(t) > -1; });
  }

  function equipmentAllowed(ex, equipment){
    var available = arr(equipment).map(normaliseEquipmentToken);
    var allowed = {};
    available.forEach(function(e){ allowed[e] = true; });
    allowed.bw = true;

    var needs = arr(ex.equipment);
    if(!needs.length) return true;
    if(needs.indexOf('mixed') > -1) return true;

    return needs.every(function(e){
      e = normaliseEquipmentToken(e);
      if(e === 'bw') return true;
      if(e === 'db') return allowed.db;
      if(e === 'band') return allowed.band;
      if(e === 'bench') return allowed.bench;
      if(e === 'step') return allowed.step || allowed.bench || allowed.box;
      if(e === 'bar') return allowed.bar || allowed.rack || allowed.pullup;
      if(e === 'kb') return allowed.kb;
      return !!allowed[e];
    });
  }

  function injuryAllowed(ex, injuryTokens){
    var blocked = arr(ex.cautionIf).map(lower);
    var injuries = arr(injuryTokens).map(lower);
    if(!blocked.length || !injuries.length) return true;

    return !injuries.some(function(t){
      return blocked.some(function(b){
        return b === t || b.indexOf(t) > -1 || t.indexOf(b) > -1;
      });
    });
  }

  function filter(criteria){
    criteria = criteria || {};
    var packIds = arr(criteria.packIds || criteria.packs);
    var tokens = arr(criteria.tokens || criteria.goals || criteria.purposes || criteria.tags);
    var equipment = arr(criteria.equipment);
    var systems = arr(criteria.systems || criteria.systemIds).map(lower);
    var injuries = arr(criteria.injuries || criteria.injuryTokens);
    var difficulty = arr(criteria.difficulty).map(lower);
    var limit = Number(criteria.limit) || 0;

    var list = getAll().filter(function(ex){
      if(packIds.length && packIds.indexOf(ex.packId) === -1) return false;
      if(tokens.length && !tokenMatch(ex, tokens)) return false;
      if(systems.length && !arr(ex.systems).some(function(s){ return systems.indexOf(lower(s)) > -1; })) return false;
      if(equipment.length && !equipmentAllowed(ex, equipment)) return false;
      if(injuries.length && !injuryAllowed(ex, injuries)) return false;
      if(difficulty.length && !arr(ex.difficulty).some(function(d){ return difficulty.indexOf(lower(d)) > -1; })) return false;
      if(typeof criteria.custom === 'function' && !criteria.custom(ex)) return false;
      return true;
    });

    if(limit > 0) list = list.slice(0, limit);
    return list;
  }

  function getMyPlanLibrary(criteria){
    return filter(criteria || {}).map(function(ex){
      return {
        key: ex.key,
        name: ex.name,
        type: ex.type || 'exercise',
        packId: ex.packId,
        family: ex.family || '',
        movement: ex.movement || '',
        equipment: ex.equipment || [],
        purposes: ex.purposes || [],
        tags: ex.tags || [],
        domains: ex.domains || [],
        styles: ex.styles || [],
        difficulty: ex.difficulty || [],
        muscles: ex.muscles || [],
        primaryMuscles: ex.primaryMuscles || [],
        secondaryMuscles: ex.secondaryMuscles || [],
        cautionIf: ex.cautionIf || [],
        systems: ex.systems || [],
        sourceModules: ex.sourceModules || [],
        sourcePage: ex.sourcePage || '',
        sourceLabel: ex.sourceLabel || '',
        regressions: ex.regressions || [],
        progressions: ex.progressions || [],
        alternatives: ex.alternatives || [],
        yt: ex.yt || (ex.name + ' exercise form'),
        defaultRx: ex.defaultRx || '',
        tempo: ex.tempo || '',
        rest: ex.rest || '',
        coachingCue: ex.coachingCue || '',
        jointStress: ex.jointStress || 2,
        fatigueCost: ex.fatigueCost || 3,
        skillDemand: ex.skillDemand || 2,
        recoveryFriendliness: ex.recoveryFriendliness || 3,
        movementQuality: ex.movementQuality || 4
      };
    });
  }

  function selectRelevantPacks(profile){
    profile = profile || {};
    var text = lower([
      profile.goal,
      profile.style,
      profile.focus,
      profile.notes,
      arr(profile.goals).join(' '),
      arr(profile.injuries).join(' ')
    ].join(' '));

    var packs = ['core-library'];

    function add(id){ if(packs.indexOf(id) === -1) packs.push(id); }

    var explicitOperational = profile.operationalIntent === true || profile.operational === true;
    var explicitPathway = lower([
      profile.operationalPathway,
      profile.pathway,
      profile.selectedPathway,
      profile.goalIntent,
      profile.goalCategory,
      profile.trainingPathway,
      profile.style
    ].join(' '));
    if(/\b(operational fitness|police fitness|fire fitness|fire and rescue|fire & rescue|army reserve|military conditioning|search and rescue|blue-light resilience|blue light resilience)\b/.test(explicitPathway)) explicitOperational = true;
    if(/^(operational|operational-fitness|police|fire|fire-rescue|army|army-reserve|military|rescue|blue-light)$/.test(lower(profile.style || ''))) explicitOperational = true;
    if(explicitOperational) add('operational-fitness');
    if(/knee|patella|squat pain|stairs|step down/.test(text)) add('knee-capacity-reset');
    if(/ankle|calf|shin|achilles|foot|plantar|balance|lower leg/.test(text)) add('lower-leg-stability');
    if(/pull.?up|chin.?up|upper body|grip|biceps|back/.test(text)) add('pullup-upperbody');
    if(/recover|mobility|stress|sleep|fatigue|stiff|pain|flow/.test(text)) add('recovery-mobility');
    if(/run|running|5k|10k|marathon|endurance|conditioning/.test(text)) add('running-conditioning');

    return packs;
  }

  var API = {
    version: state.version,
    load: load,
    ensureLoaded: ensureLoaded,
    getAll: getAll,
    getByKey: getByKey,
    getByName: getByName,
    getExerciseProfile: getExerciseProfile,
    getPacks: getPacks,
    getByPack: getByPack,
    filter: filter,
    getMyPlanLibrary: getMyPlanLibrary,
    selectRelevantPacks: selectRelevantPacks,
    equipmentAllowed: equipmentAllowed,
    injuryAllowed: injuryAllowed,
    _state: state
  };

  window.FFF_EXERCISE_DB = API;
  window.FFFExerciseDB = API;
  window.FFF_EXERCISES = window.FFF_EXERCISES || [];
  window.FFFExercises = window.FFFExercises || [];
  window.EXERCISES = window.EXERCISES || [];

  load().catch(function(){});
})();
