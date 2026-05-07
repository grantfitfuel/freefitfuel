// FreeFitFuel — Engine Bridge v1
// Add after fff-exercise-db.js on my-plan.html. Seeds My Plan with the real exercise database.
(function(){
  'use strict';
  function seed(){
    try{
      if(!window.FFFExerciseDB || typeof window.FFFExerciseDB.getMyPlanLibrary !== 'function') return false;
      localStorage.setItem('fff.library.cache.v1', JSON.stringify(window.FFFExerciseDB.getMyPlanLibrary()));
      return true;
    }catch(err){ return false; }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', seed, {once:true}); else seed();
  window.addEventListener('fff:injury-profile-updated', function(){ seed(); });
  window.FFFEngineBridge = { seedMyPlanLibrary: seed };
})();
