// FreeFitFuel — Injury Profile Selector v1
// Add as: /js/engine/fff-injury-profile.js
//
// Purpose:
// Adds a structured injury / limitation selector to My Plan.
// Saves user injury state to localStorage and exposes it to the adaptive engine.
//
// Requires:
// - my-plan.html
// - preferably FFFExerciseDB v3, but it also works without it.
//
// Install:
// Add this before </body> on my-plan.html, after the engine scripts:
// <script src="js/engine/fff-injury-profile.js?v=1"></script>

(function(){
  'use strict';

  var KEY = 'fff.myplan.injuries.v1';

  var INJURIES = [
    {
      key:'biceps-tendon-pain',
      label:'Biceps tendon pain',
      group:'Upper body',
      help:'Useful for front-of-arm pain, tendon irritation, curling or pulling discomfort.'
    },
    {
      key:'shoulder-pain',
      label:'Shoulder pain / impingement sensitivity',
      group:'Upper body',
      help:'Useful when pressing, flies, dips, or overhead movement irritate the shoulder.'
    },
    {
      key:'rotator-cuff-sensitivity',
      label:'Rotator cuff sensitivity',
      group:'Upper body',
      help:'For shoulder weakness, pinching, or irritation during rotation and pressing.'
    },
    {
      key:'elbow-pain',
      label:'Elbow pain',
      group:'Upper body',
      help:'Covers tennis/golfer-style elbow irritation or discomfort during curls, rows, pushdowns.'
    },
    {
      key:'wrist-pain',
      label:'Wrist pain',
      group:'Upper body',
      help:'Useful when push-ups, front-loaded positions, or pressing irritate the wrist.'
    },
    {
      key:'knee-pain',
      label:'Knee pain',
      group:'Lower body',
      help:'General knee discomfort during squats, lunges, step-ups, stairs or impact.'
    },
    {
      key:'patellar-tendon-pain',
      label:'Patellar tendon pain',
      group:'Lower body',
      help:'Pain around the front of the knee below the kneecap, often irritated by jumping or deep knee loading.'
    },
    {
      key:'hip-pain',
      label:'Hip pain / impingement sensitivity',
      group:'Lower body',
      help:'Hip discomfort, pinching, deep flexion irritation or difficulty with squats/lunges.'
    },
    {
      key:'ankle-instability',
      label:'Ankle instability',
      group:'Lower body',
      help:'Wobbling, repeated rolling, poor confidence on steps, lunges or uneven surfaces.'
    },
    {
      key:'achilles-calf-sensitivity',
      label:'Achilles / calf sensitivity',
      group:'Lower body',
      help:'Calf tightness, Achilles irritation, or problems with jumping/running impact.'
    },
    {
      key:'low-back-sensitivity',
      label:'Lower back sensitivity',
      group:'Spine / trunk',
      help:'Back discomfort during hinging, lifting, rows, carries or fatigue.'
    },
    {
      key:'disc-sensitivity',
      label:'Disc sensitivity',
      group:'Spine / trunk',
      help:'Use only if this is known or suspected. The engine avoids loaded flexion/twisting bias.'
    },
    {
      key:'left-right-imbalance',
      label:'Left/right imbalance',
      group:'Movement flags',
      help:'One side weaker, less stable, painful, or taking over. The engine favours unilateral work.'
    },
    {
      key:'poor-overhead-mobility',
      label:'Poor overhead mobility',
      group:'Movement flags',
      help:'Difficulty pressing overhead cleanly without arching, shrugging or pinching.'
    },
    {
      key:'beginner-low-confidence',
      label:'Beginner / low confidence',
      group:'Movement flags',
      help:'The engine favours simple, repeatable and confidence-building options.'
    },
    {
      key:'older-adult',
      label:'Older adult / deconditioned',
      group:'Movement flags',
      help:'The engine favours supported, lower-impact, chair-friendly and balance-conscious options.'
    }
  ];

  var SEVERITY = [
    { value:'none', label:'None', score:0 },
    { value:'mild', label:'Mild', score:1 },
    { value:'moderate', label:'Moderate', score:3 },
    { value:'severe', label:'Severe', score:5 }
  ];

  function byId(id){ return document.getElementById(id); }

  function safeParse(raw, fallback){
    try{ return raw ? JSON.parse(raw) : fallback; }
    catch(err){ return fallback; }
  }

  function getStored(){
    return safeParse(localStorage.getItem(KEY), {
      version:1,
      updatedAt:null,
      items:{},
      notes:'',
      maxSeverity:0,
      activeKeys:[]
    });
  }

  function severityScore(value){
    var found = SEVERITY.find(function(s){ return s.value === value; });
    return found ? found.score : 0;
  }

  function normaliseProfile(profile){
    profile = profile || {};
    var items = profile.items || {};
    var activeKeys = [];
    var maxSeverity = 0;

    INJURIES.forEach(function(injury){
      var val = items[injury.key] || 'none';
      var score = severityScore(val);
      if(score > 0){
        activeKeys.push(injury.key);
        if(score > maxSeverity) maxSeverity = score;
      }
    });

    return {
      version:1,
      updatedAt:new Date().toISOString(),
      items:items,
      notes:profile.notes || '',
      activeKeys:activeKeys,
      maxSeverity:maxSeverity
    };
  }

  function saveProfile(){
    var items = {};
    INJURIES.forEach(function(injury){
      var el = byId('injury_' + injury.key);
      items[injury.key] = el ? el.value : 'none';
    });

    var notesEl = byId('injuryNotes');
    var profile = normaliseProfile({
      items:items,
      notes:notesEl ? notesEl.value : ''
    });

    localStorage.setItem(KEY, JSON.stringify(profile));
    syncToEngineState(profile);
    renderSummary(profile);

    return profile;
  }

  function restoreProfile(){
    var profile = normaliseProfile(getStored());

    INJURIES.forEach(function(injury){
      var el = byId('injury_' + injury.key);
      if(el){
        el.value = profile.items[injury.key] || 'none';
      }
    });

    var notesEl = byId('injuryNotes');
    if(notesEl) notesEl.value = profile.notes || '';

    syncToEngineState(profile);
    renderSummary(profile);

    return profile;
  }

  function syncToEngineState(profile){
    profile = normaliseProfile(profile || getStored());

    // General-purpose keys for adapters / planner / training engine.
    localStorage.setItem('fff.injuryProfile.v1', JSON.stringify(profile));
    localStorage.setItem('fff.myplan.injuryKeys.v1', JSON.stringify(profile.activeKeys));
    localStorage.setItem('fff.myplan.maxPainSeverity.v1', String(profile.maxSeverity));

    // If the site has FFFState, gently mirror it there without assuming its shape.
    try{
      if(window.FFFState && typeof window.FFFState.get === 'function' && typeof window.FFFState.set === 'function'){
        var state = window.FFFState.get() || {};
        state.injuryProfile = profile;
        state.injuries = profile.activeKeys.slice();
        state.maxPainSeverity = profile.maxSeverity;
        window.FFFState.set(state);
      }
    }catch(err){}

    // If current plan payload exists, add the injury profile so Workouts can consume it.
    try{
      var plan = safeParse(localStorage.getItem('fff.currentPlan.v1'), null);
      if(plan && typeof plan === 'object'){
        plan.injuryProfile = profile;
        plan.injuries = profile.activeKeys.slice();
        plan.maxPainSeverity = profile.maxSeverity;
        localStorage.setItem('fff.currentPlan.v1', JSON.stringify(plan));
      }
    }catch(err){}

    try{
      var payload = safeParse(localStorage.getItem('fff.libraryPayload'), null);
      if(payload && typeof payload === 'object'){
        payload.injuryProfile = profile;
        payload.injuries = profile.activeKeys.slice();
        payload.maxPainSeverity = profile.maxSeverity;
        localStorage.setItem('fff.libraryPayload', JSON.stringify(payload));
      }
    }catch(err){}

    window.dispatchEvent(new CustomEvent('fff:injury-profile-updated', {
      detail: profile
    }));
  }

  function labelFor(key){
    var found = INJURIES.find(function(i){ return i.key === key; });
    return found ? found.label : key;
  }

  function renderSummary(profile){
    var box = byId('injuryProfileSummary');
    if(!box) return;

    profile = normaliseProfile(profile || getStored());

    if(!profile.activeKeys.length){
      box.innerHTML = '<p class="empty-soft">No active injury or limitation flags selected. The engine will use standard exercise choices.</p>';
      return;
    }

    var list = profile.activeKeys.map(function(key){
      var sev = profile.items[key] || 'none';
      return '<li><strong>' + escapeHtml(labelFor(key)) + '</strong> <span class="tag tag-accent">' + escapeHtml(sev) + '</span></li>';
    }).join('');

    var advice = '';
    if(window.FFFExerciseDB && typeof window.FFFExerciseDB.getInjuryRules === 'function'){
      var rules = window.FFFExerciseDB.getInjuryRules();
      var notes = [];
      profile.activeKeys.forEach(function(key){
        var r = rules[key];
        if(r && Array.isArray(r.notes)) notes = notes.concat(r.notes);
      });
      notes = Array.from(new Set(notes)).slice(0, 6);
      if(notes.length){
        advice = '<div class="plan-line"><strong>Engine bias</strong><div class="sub"><ul>' +
          notes.map(function(n){ return '<li>' + escapeHtml(n) + '</li>'; }).join('') +
          '</ul></div></div>';
      }
    }

    box.innerHTML =
      '<div class="plan-line"><strong>Active movement flags</strong><div class="sub"><ul>' + list + '</ul></div></div>' +
      advice;
  }

  function escapeHtml(str){
    return String(str || '').replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]);
    });
  }

  function groupedInjuries(){
    var groups = {};
    INJURIES.forEach(function(injury){
      if(!groups[injury.group]) groups[inuryGroupKey(injury.group)] = { label: injury.group, items: [] };
      groups[inuryGroupKey(injury.group)].items.push(injury);
    });
    return groups;
  }

  function inuryGroupKey(str){
    return String(str || '').toLowerCase().replace(/[^a-z0-9]+/g,'-');
  }

  function buildSection(){
    if(byId('injuryProfileSection')) return;

    var anchor =
      byId('modePlan') ||
      document.querySelector('.mode-panel[data-mode="plan"]') ||
      document.querySelector('#plan') ||
      document.querySelector('.wrap');

    if(!anchor) return;

    var section = document.createElement('section');
    section.className = 'section';
    section.id = 'injuryProfileSection';

    var groups = groupedInjuries();

    var html = ''
      + '<div class="section-head">'
      + '  <div>'
      + '    <h2>Injuries, limitations and movement flags</h2>'
      + '    <p>Select anything the plan should account for. This does not diagnose anything. It tells the engine how cautious or adaptive to be.</p>'
      + '  </div>'
      + '</div>'
      + '<div class="card">'
      + '  <p class="lead">Severity guide: <strong>mild</strong> means monitor, <strong>moderate</strong> means adapt, <strong>severe</strong> means avoid aggravating patterns and use recovery-biased options.</p>'
      + '</div>';

    Object.keys(groups).forEach(function(groupKey){
      var group = groups[groupKey];
      html += '<div class="card" style="margin-top:12px">';
      html += '<h3>' + escapeHtml(group.label) + '</h3>';
      html += '<div class="injury-grid">';

      group.items.forEach(function(injury){
        html += ''
          + '<label class="injury-card" for="injury_' + injury.key + '">'
          + '  <span class="injury-title">' + escapeHtml(injury.label) + '</span>'
          + '  <span class="injury-help">' + escapeHtml(injury.help) + '</span>'
          + '  <select id="injury_' + injury.key + '" class="input injury-select" data-injury-key="' + injury.key + '">'
          + SEVERITY.map(function(s){ return '<option value="' + s.value + '">' + s.label + '</option>'; }).join('')
          + '  </select>'
          + '</label>';
      });

      html += '</div></div>';
    });

    html += ''
      + '<div class="card" style="margin-top:12px">'
      + '  <label class="field">Extra notes for the engine'
      + '    <textarea id="injuryNotes" placeholder="Example: right knee worse after sitting, left arm weaker during pressing, hip pinches in deep squat."></textarea>'
      + '  </label>'
      + '  <div class="tag-row">'
      + '    <button class="btn btn-primary" type="button" id="btnSaveInjuryProfile">Save injury profile</button>'
      + '    <button class="btn" type="button" id="btnClearInjuryProfile">Clear profile</button>'
      + '  </div>'
      + '</div>'
      + '<div class="card" style="margin-top:12px">'
      + '  <h3>Current injury profile summary</h3>'
      + '  <div id="injuryProfileSummary"></div>'
      + '</div>';

    section.innerHTML = html;

    // Put it near the top of the Plan mode if possible.
    var firstSection = anchor.querySelector && anchor.querySelector('.section');
    if(firstSection && firstSection.parentNode === anchor){
      anchor.insertBefore(section, firstSection.nextSibling);
    }else{
      anchor.appendChild(section);
    }

    addStyles();
    wire();
    restoreProfile();
  }

  function addStyles(){
    if(byId('injuryProfileStyles')) return;
    var style = document.createElement('style');
    style.id = 'injuryProfileStyles';
    style.textContent = ''
      + '.injury-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:10px}'
      + '@media(max-width:760px){.injury-grid{grid-template-columns:1fr}}'
      + '.injury-card{display:flex;flex-direction:column;gap:7px;border:1px solid var(--stroke);background:rgba(255,255,255,.035);border-radius:12px;padding:11px 12px}'
      + '.injury-title{font-weight:800;color:var(--ink)}'
      + '.injury-help{font-size:.86rem;color:var(--inkdim);line-height:1.35}'
      + '.injury-select{margin-top:auto}'
      + '.injury-card:has(select[value="moderate"]),.injury-card:has(select[value="severe"]){border-color:rgba(255,106,0,.38)}';
    document.head.appendChild(style);
  }

  function wire(){
    var saveBtn = byId('btnSaveInjuryProfile');
    if(saveBtn){
      saveBtn.addEventListener('click', function(){
        saveProfile();
        flash(saveBtn, 'Saved');
      });
    }

    var clearBtn = byId('btnClearInjuryProfile');
    if(clearBtn){
      clearBtn.addEventListener('click', function(){
        if(!confirm('Clear all injury and limitation selections?')) return;
        localStorage.removeItem(KEY);
        localStorage.removeItem('fff.injuryProfile.v1');
        localStorage.removeItem('fff.myplan.injuryKeys.v1');
        localStorage.removeItem('fff.myplan.maxPainSeverity.v1');
        INJURIES.forEach(function(injury){
          var el = byId('injury_' + injury.key);
          if(el) el.value = 'none';
        });
        var notesEl = byId('injuryNotes');
        if(notesEl) notesEl.value = '';
        saveProfile();
      });
    }

    document.querySelectorAll('.injury-select').forEach(function(el){
      el.addEventListener('change', saveProfile);
    });

    var notes = byId('injuryNotes');
    if(notes){
      notes.addEventListener('input', debounce(saveProfile, 250));
    }

    window.addEventListener('pagehide', saveProfile);
    window.addEventListener('beforeunload', saveProfile);
  }

  function flash(btn, text){
    if(!btn) return;
    var old = btn.textContent;
    btn.textContent = text;
    setTimeout(function(){ btn.textContent = old; }, 900);
  }

  function debounce(fn, wait){
    var t;
    return function(){
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  function getContextForExerciseDB(){
    var profile = normaliseProfile(getStored());
    return {
      injuries: profile.activeKeys.slice(),
      painLevel: profile.maxSeverity,
      maxPain: profile.maxSeverity
    };
  }

  function init(){
    setTimeout(buildSection, 0);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, { once:true });
  }else{
    init();
  }

  window.FFFInjuryProfile = {
    key: KEY,
    injuries: INJURIES.slice(),
    severity: SEVERITY.slice(),
    get: function(){ return normaliseProfile(getStored()); },
    save: saveProfile,
    restore: restoreProfile,
    context: getContextForExerciseDB
  };
})();
