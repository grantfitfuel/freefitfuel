// FreeFitFuel — Engine Bridge v2
// Seeds My Plan / Workouts with the modular exercise library.
(function(){
  'use strict';

  function seed(){
    try{
      var db = window.FFFExerciseDB || window.FFF_EXERCISE_DB;
      if(!db || typeof db.getMyPlanLibrary !== 'function') return false;

      var library = db.getMyPlanLibrary();
      localStorage.setItem('fff.library.cache.v1', JSON.stringify(library));

      document.dispatchEvent(new CustomEvent('fff:library-cache-seeded', {
        detail: { count: library.length, source: 'modular-exercise-packs' }
      }));

      return true;
    }catch(err){
      console.warn('[FreeFitFuel] Engine bridge seed failed:', err);
      return false;
    }
  }

  function seedWhenReady(){
    var db = window.FFFExerciseDB || window.FFF_EXERCISE_DB;
    if(db && typeof db.ensureLoaded === 'function'){
      db.ensureLoaded().then(seed).catch(function(){});
      return;
    }
    seed();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', seedWhenReady, {once:true});
  }else{
    seedWhenReady();
  }

  document.addEventListener('fff:exercises-loaded', seed);
  window.addEventListener('fff:injury-profile-updated', seed);

  window.FFFEngineBridge = {
    version: '2.0-modular',
    seedMyPlanLibrary: seed,
    seedWhenReady: seedWhenReady
  };
})();
