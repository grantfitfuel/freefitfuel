// FreeFitFuel — My Plan Setup Persistence Bridge
// Purpose:
// Keeps the raw "Goal & body setup" values persistent when moving:
// My Plan -> Workouts -> My Plan
//
// Add this file as:
//   /js/engine/fff-my-plan-persistence.js
//
// Then load it on my-plan.html AFTER the existing page script stack.

(function(){
  'use strict';

  var KEY = 'fff.myplan.setup.v1';

  var FIELD_IDS = [
    'bmrSex',
    'bmrAge',
    'bmrHeight',
    'bmrWeight',
    'bmrActivity',
    'useBodyFatSelect',
    'bodyFat',
    'targetBodyFat',
    'trainingStatus',
    'wantsMuscleGain',
    'phaseAggression',
    'trainingEnvironment',
    'equipBw',
    'equipDb',
    'equipBand',
    'equipRack',
    'equipRings',
    'equipBench',
    'equipKb',
    'equipCardio',
    'equipGymAccess'
  ];

  function byId(id){
    return document.getElementById(id);
  }

  function safeParse(raw, fallback){
    try{
      return raw ? JSON.parse(raw) : fallback;
    }catch(err){
      return fallback;
    }
  }

  function getGoal(){
    var pressed = document.querySelector('.goal-chip[aria-pressed="true"]');
    if(pressed && pressed.dataset && pressed.dataset.goal){
      return pressed.dataset.goal;
    }

    if(typeof window.GOAL !== 'undefined' && window.GOAL){
      return String(window.GOAL);
    }

    return 'Maintain';
  }

  function setGoal(goal){
    goal = goal || 'Maintain';

    if(typeof window.setGoalChip === 'function'){
      window.setGoalChip(goal);
      return;
    }

    var chips = document.querySelectorAll('.goal-chip');
    Array.prototype.forEach.call(chips, function(btn){
      btn.setAttribute('aria-pressed', btn.dataset.goal === goal ? 'true' : 'false');
    });
  }

  function readField(id){
    var el = byId(id);
    if(!el) return null;

    if(el.type === 'checkbox'){
      return !!el.checked;
    }

    return el.value;
  }

  function writeField(id, value){
    var el = byId(id);
    if(!el || value === null || typeof value === 'undefined') return;

    if(el.type === 'checkbox'){
      el.checked = !!value;
      return;
    }

    el.value = value;
  }

  function readSetup(){
    var fields = {};

    FIELD_IDS.forEach(function(id){
      fields[id] = readField(id);
    });

    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      goal: getGoal(),
      fields: fields
    };
  }

  function saveSetup(){
    try{
      var data = readSetup();
      localStorage.setItem(KEY, JSON.stringify(data));

      // Keep the existing equipment profile key in sync as well.
      if(typeof window.saveEquipmentProfileFromUI === 'function'){
        window.saveEquipmentProfileFromUI();
      }

      return data;
    }catch(err){
      return null;
    }
  }

  function restoreSetup(){
    var data = safeParse(localStorage.getItem(KEY), null);
    if(!data || !data.fields) return false;

    if(data.goal){
      setGoal(data.goal);
    }

    FIELD_IDS.forEach(function(id){
      if(Object.prototype.hasOwnProperty.call(data.fields, id)){
        writeField(id, data.fields[id]);
      }
    });

    var useBf = byId('useBodyFatSelect');
    var bfWrap = byId('bfWrap');
    if(useBf && bfWrap){
      bfWrap.style.display = useBf.value === 'yes' ? 'block' : 'none';
    }

    if(typeof window.updateEquipmentSummary === 'function'){
      window.updateEquipmentSummary();
    }

    if(typeof window.updateMacroTargets === 'function'){
      window.updateMacroTargets();
    }

    return true;
  }

  function patchRoadmapSave(){
    // Wrap saveRoadmap so each generated roadmap also carries the raw setup snapshot.
    if(typeof window.saveRoadmap !== 'function') return;

    if(window.saveRoadmap.__fffPersistencePatched) return;

    var originalSaveRoadmap = window.saveRoadmap;

    window.saveRoadmap = function(roadmap){
      var setup = readSetup();

      if(roadmap && typeof roadmap === 'object'){
        roadmap.rawSetup = setup;
      }

      localStorage.setItem(KEY, JSON.stringify(setup));
      return originalSaveRoadmap.apply(this, arguments);
    };

    window.saveRoadmap.__fffPersistencePatched = true;
  }

  function bindSetupPersistence(){
    var setupRoot = document.querySelector('#modePlan') || document;

    FIELD_IDS.forEach(function(id){
      var el = byId(id);
      if(!el) return;

      el.addEventListener('input', saveSetup);
      el.addEventListener('change', saveSetup);
    });

    setupRoot.querySelectorAll('.goal-chip').forEach(function(btn){
      btn.addEventListener('click', function(){
        setTimeout(saveSetup, 0);
      });
    });

    ['btnGenerateRoadmap', 'btnGenerateStaged', 'generatePDF'].forEach(function(id){
      var btn = byId(id);
      if(!btn) return;

      btn.addEventListener('click', function(){
        // Save before the existing click handler has any chance to navigate,
        // render, or rebuild from defaults.
        saveSetup();
      }, true);
    });

    window.addEventListener('pagehide', saveSetup);
    window.addEventListener('beforeunload', saveSetup);
  }

  function init(){
    // Existing my-plan code restores from ROADMAP_KEY, but that restore is incomplete:
    // it does not restore sex, age, height, weight, or activity.
    // Run after the current page scripts have had a chance to initialise.
    setTimeout(function(){
      restoreSetup();
      patchRoadmapSave();
      bindSetupPersistence();
      saveSetup();
    }, 0);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, { once:true });
  }else{
    init();
  }

  window.FFFMyPlanPersistence = {
    key: KEY,
    save: saveSetup,
    restore: restoreSetup,
    read: readSetup
  };
})();
