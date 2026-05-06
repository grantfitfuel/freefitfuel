// FreeFitFuel Adapter — Workouts Library v1
// Purpose: improve the payload handoff that workouts.html already reads.
(function(){
  'use strict';
  var KEY = 'fff.libraryPayload';
  function read(){ try{ var raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; }catch(e){ return null; } }
  function write(v){ try{ localStorage.setItem(KEY, JSON.stringify(v)); return true; }catch(e){ return false; } }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function enhance(payload){
    payload = payload || read();
    if(!payload) return null;
    payload.version = payload.version || 1;
    payload.enhancedBy = 'fff-adapter-workouts.v1';
    payload.sessions = arr(payload.sessions).map(function(session, idx){
      session.day = session.day || idx + 1;
      session.items = arr(session.items).map(function(item){
        var profile = window.FFFExerciseDB && item.name ? window.FFFExerciseDB.getExerciseProfile(item.name) : null;
        if(profile){
          item.family = item.family || profile.family;
          item.riskZones = item.riskZones || profile.riskZones;
          item.regressions = item.regressions || profile.regressions;
          item.progressions = item.progressions || profile.progressions;
        }
        return item;
      });
      return session;
    });
    write(payload);
    return payload;
  }
  function injectStatus(){
    var payload = enhance(read());
    var box = document.getElementById('libraryStatus');
    if(!box || !payload) return;
    if(document.getElementById('fffAdapterWorkoutNote')) return;
    var p = document.createElement('p');
    p.id = 'fffAdapterWorkoutNote';
    p.className = 'meta';
    p.textContent = 'Adaptive handoff active: sessions include engine metadata, exercise families, regressions and risk zones where available.';
    box.appendChild(p);
  }
  window.FFFAdapterWorkouts = { version:'1.0', enhance:enhance, read:read, write:write };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectStatus);
  else injectStatus();
})();
