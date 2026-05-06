// FreeFitFuel Adapter — My Plan Workout Builder v1
// Purpose: add an adaptive build action to my-plan without replacing existing inline logic.
(function(){
  'use strict';
  function byId(id){ return document.getElementById(id); }
  function readJSON(key, fallback){ try{ var raw=localStorage.getItem(key); return raw?JSON.parse(raw):fallback; }catch(e){ return fallback; } }
  function selectedInjuries(){ return readJSON('fff.injury.profile.v1', {}); }
  function build(){
    if(!window.FFFPlanner) return null;
    var styleEl = byId('mpx-style');
    var daysEl = byId('mpx-days');
    var equip = readJSON('fff.equipment.profile.v1', {});
    var payload = window.FFFPlanner.buildPayload({
      style: styleEl ? styleEl.value : 'adaptive',
      days: daysEl ? daysEl.value : 4,
      equip: equip,
      injuries: selectedInjuries()
    });
    return payload;
  }
  function mountButton(){
    var target = byId('mpxBuild') || byId('btnOpenWorkoutLibrary') || byId('workoutPlanMount') || byId('adaptiveWorkoutPlan');
    if(!target || byId('fffAdaptiveBuildBtn')) return;
    var btn = document.createElement('button');
    btn.type='button';
    btn.id='fffAdaptiveBuildBtn';
    btn.className='btn btn-primary';
    btn.textContent='Build adaptive workout payload';
    btn.addEventListener('click', function(){
      var payload = build();
      if(payload){ alert('Adaptive workout payload built. Open Workouts to log it.'); }
      else alert('Planner not available yet. Check script order.');
    });
    target.parentNode ? target.parentNode.insertBefore(btn, target.nextSibling) : target.appendChild(btn);
  }
  window.FFFAdapterWorkoutPlan = { version:'1.0', build:build, mountButton:mountButton };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountButton);
  else mountButton();
})();
