// FreeFitFuel — Injury Profile Selector v4.3
// Full replacement for: /js/engine/fff-injury-profile.js
// Purpose: force-upgrades My Plan with a detailed injury/symptom selector.
// Fix: merges detailed injury defaults with FFFExerciseDB rules instead of letting older generic rules hide them.

(function(){
  'use strict';

  var KEY = 'fff.myplan.injuries.v2';
  var LEGACY_KEYS = ['fff.myplan.injuries.v1','fff.injuryProfile.v1'];
  var SECTION_ID = 'injuryProfileSection';

  var DETAILED = {
    'tennis-elbow': {
      label:'Tennis elbow / lateral elbow tendon pain',
      region:'Elbow / forearm',
      notes:[
        'Reduce heavy gripping, straight-bar curls, aggressive rows and high-volume pull-ups during flare-ups.',
        'Bias neutral-grip rows, light band work, controlled tempo and forearm tendon loading.'
      ],
      avoidPatterns:['heavy-gripping','straight-bar-curl','high-volume-pull-up','heavy-wrist-extension','jerky-row'],
      preferPatterns:['neutral-grip','banded-light','supported-row','tempo-control','reduced-volume']
    },
    'golfers-elbow': {
      label:'Golfer’s elbow / inner elbow tendon pain',
      region:'Elbow / forearm',
      notes:[
        'Reduce heavy wrist flexion, hard gripping, high-volume curls and repeated loaded pulling.',
        'Use neutral grips, lighter pulling, slower eccentrics and grip-deload options.'
      ],
      avoidPatterns:['heavy-gripping','heavy-curl','high-volume-pull-up'],
      preferPatterns:['neutral-grip','banded-light','supported-row','tempo-control']
    },
    'outer-biceps-left-pain': {
      label:'Outer left biceps / brachialis pain',
      region:'Upper arm / biceps',
      notes:[
        'Flag for left outer biceps or brachialis-type pain, especially during pressing, curling or pulling.',
        'Bias left-first control, neutral-grip rows, supported rows, lighter curls and pain-free pressing range.'
      ],
      avoidPatterns:['heavy-supinated-curl','jerky-row','grinding-press','aggressive-vertical-pull'],
      preferPatterns:['neutral-grip','left-first','right-matches-left','supported-row','banded-light','tempo-control']
    },
    'distal-biceps-tendon-irritation': {
      label:'Distal biceps tendon irritation',
      region:'Upper arm / biceps',
      notes:[
        'Reduce heavy supinated pulling and curling, especially if pain sits near the front of the elbow.',
        'Prefer neutral-grip pulling, supported rows, band rows and careful tempo.'
      ],
      avoidPatterns:['heavy-supinated-curl','chin-up-heavy','aggressive-vertical-pull'],
      preferPatterns:['neutral-grip','supported-row','banded-light','tempo-control']
    },
    'shoulder-impingement': {
      label:'Shoulder impingement / painful arc',
      region:'Shoulder',
      notes:[
        'Avoid forcing painful overhead range, deep flyes, deep dips or unstable pressing.',
        'Bias neutral pressing, floor press, incline push-up, scapular control and cuff work.'
      ],
      avoidPatterns:['deep-fly','dip-deep','overhead-heavy','handstand','upright-row'],
      preferPatterns:['neutral-grip','floor-press','scapular-control','reduced-range','external-rotation']
    },
    'rotator-cuff-irritation': {
      label:'Rotator cuff irritation',
      region:'Shoulder',
      notes:[
        'Bias cuff loading, scapular control, reduced range pressing and banded shoulder work.',
        'Avoid unstable heavy pressing, deep flyes and pushing into sharp pain.'
      ],
      avoidPatterns:['deep-fly','unstable-heavy','overhead-heavy','dip-deep'],
      preferPatterns:['external-rotation','scapular-control','banded-light','reduced-range']
    },
    'wrist-pain': {
      label:'Wrist pain / loaded extension sensitivity',
      region:'Wrist / hand',
      notes:[
        'Avoid loaded wrist extension if it provokes symptoms.',
        'Use dumbbell handles, parallettes, neutral grips, forearm support or reduced wrist loading.'
      ],
      avoidPatterns:['loaded-wrist-extension','flat-palm-push-up','handstand','planche-load'],
      preferPatterns:['neutral-grip','handles','dumbbell-grip','forearm-support']
    },
    'hip-flexor-tendon-pain': {
      label:'Hip flexor tendon pain / front hip pain',
      region:'Hip',
      notes:[
        'Reduce aggressive hip flexor loading, high-volume hanging leg raises and deep hip compression.',
        'Bias glute bridges, pelvic control, reduced ROM step-ups and Pilates-style core control.'
      ],
      avoidPatterns:['deep-hip-flexion','hanging-leg-raise-heavy','pistol','high-knee-volume'],
      preferPatterns:['glute-dominant','pelvic-control','reduced-range','pilates','supported']
    },
    'hip-tendon-pain-reduced-rom': {
      label:'Hip tendon pain with reduced movement',
      region:'Hip',
      notes:[
        'Use reduced range first; do not force deep squats, deep lunges or aggressive hip stretching.',
        'Bias glute bridge, supported split squat, low step-up, hip control and mobility reset work.'
      ],
      avoidPatterns:['deep-hip-flexion','wide-stance-deep','pistol','twist-loaded'],
      preferPatterns:['reduced-range','glute-bridge','supported','step-up-low','glute-dominant','mobility-reset']
    },
    'glute-med-tendinopathy': {
      label:'Outer hip / glute med tendon irritation',
      region:'Hip',
      notes:[
        'Avoid sudden spikes in side-lying volume, aggressive lateral work or painful single-leg loading.',
        'Bias controlled glute med work, supported single-leg balance and gradual lateral loading.'
      ],
      avoidPatterns:['painful-lateral-load','unstable-loaded','deep-hip-adduction'],
      preferPatterns:['supported','glute-dominant','balance-regression','controlled-lateral']
    },
    'hip-clicking-painful': {
      label:'Clicking hip with pain, catching or reduced range',
      region:'Hip',
      notes:[
        'Painful clicking, catching or reduced range should bias conservative hip work and may need professional assessment.',
        'Avoid forcing end-range hip flexion, twisting or loaded deep positions.'
      ],
      avoidPatterns:['deep-hip-flexion','twist-loaded','pistol','wide-stance-deep'],
      preferPatterns:['reduced-range','supported','glute-bridge','pelvic-control']
    },
    'clicky-knees-painless': {
      label:'Clicky knees, painless',
      region:'Knee',
      notes:[
        'Painless clicking alone does not automatically mean injury, but the engine will bias control and tracking.',
        'Use slow tempo, step control, glute work, calf/ankle work and pain-free squat range.'
      ],
      avoidPatterns:['jumping-if-irritated','fast-squat'],
      preferPatterns:['tempo-control','controlled-step-up','glute-dominant','calf-control','box-range']
    },
    'clicky-knees-painful': {
      label:'Clicky knees with pain, swelling, locking or catching',
      region:'Knee',
      notes:[
        'Painful clicking, swelling, locking or catching should trigger more conservative loading and may need professional review.',
        'Avoid jumping, deep fast knee flexion and high-fatigue leg circuits until symptoms settle.'
      ],
      avoidPatterns:['jumping','deep-knee-flexion-fast','plyometric','running-impact','pistol'],
      preferPatterns:['box-range','supported','isometric','controlled-step-up','glute-dominant']
    },
    'patellar-tendon-pain': {
      label:'Patellar tendon pain / front knee tendon pain',
      region:'Knee',
      notes:[
        'Avoid sudden jumps in squatting, jumping or running volume.',
        'Bias Spanish squat holds, controlled step-ups, box range and gradual tendon loading.'
      ],
      avoidPatterns:['jumping','fast-squat','deep-knee-flexion-fast','plyometric'],
      preferPatterns:['spanish-squat','isometric','controlled-step-up','box-range']
    },
    'knee-pain-general': {
      label:'General knee pain',
      region:'Knee',
      notes:[
        'Use pain-free range, slower tempo and supported options.',
        'Bias box squats, low step-ups, glute bridges and controlled hinges.'
      ],
      avoidPatterns:['jumping','deep-knee-flexion-fast','high-impact'],
      preferPatterns:['box-range','supported','glute-dominant','low-impact','reduced-range']
    },
    'low-back-non-specific': {
      label:'Low back sensitivity / non-specific back pain',
      region:'Lower back',
      notes:[
        'Avoid chasing load when bracing is poor or symptoms are flared.',
        'Bias neutral spine, supported rows, glute bridges, dead bugs and reduced-range hinges.'
      ],
      avoidPatterns:['loaded-spinal-flexion','heavy-unsupported-hinge','twist-loaded','ballistic-hinge'],
      preferPatterns:['neutral-spine','supported','anti-extension','glute-dominant','reduced-range']
    },
    'disc-sensitivity': {
      label:'Disc sensitivity / flexion-sensitive back',
      region:'Lower back',
      notes:[
        'Avoid loaded flexion and loaded twisting if these are known triggers.',
        'Bias neutral spine, anti-extension, anti-rotation and supported work.'
      ],
      avoidPatterns:['loaded-spinal-flexion','twist-loaded','sit-up-loaded','rollover'],
      preferPatterns:['anti-extension','anti-rotation','neutral-spine','supported']
    },
    'plantar-fasciitis': {
      label:'Plantar fasciitis / heel pain',
      region:'Foot / ankle',
      notes:[
        'Reduce sudden running, jumping and long barefoot loading spikes.',
        'Bias calf control, foot strength, walking tolerance and low-impact conditioning.'
      ],
      avoidPatterns:['jumping','running-impact','sprint'],
      preferPatterns:['controlled-calf','low-impact','supported','walking-tolerance']
    },
    'achilles-calf-sensitivity': {
      label:'Achilles / calf sensitivity',
      region:'Foot / ankle',
      notes:[
        'Avoid sudden spikes in jumping, sprinting or skipping.',
        'Bias controlled calf raises, isometrics and low-impact conditioning.'
      ],
      avoidPatterns:['jumping','running-impact','sprint','plyometric'],
      preferPatterns:['isometric','controlled-calf','low-impact']
    },
    'left-right-imbalance': {
      label:'Left/right imbalance or loss of power',
      region:'Movement flags',
      notes:[
        'Use unilateral work and let the weaker side set the standard.',
        'The stronger side matches the weaker side rather than exceeding it.'
      ],
      avoidPatterns:['bilateral-hide-imbalance'],
      preferPatterns:['unilateral','left-first','right-matches-left','single-side-control']
    },
    'beginner-low-confidence': {
      label:'Beginner / low confidence',
      region:'Movement flags',
      notes:[
        'Bias simple, repeatable movements with clear progression steps.',
        'Avoid complex high-skill drills until confidence improves.'
      ],
      avoidPatterns:['advanced','complex','plyometric','unstable-heavy'],
      preferPatterns:['simple','supported','bodyweight','clear-progression','low-cognitive-load']
    },
    'older-adult': {
      label:'Older adult / deconditioned',
      region:'Movement flags',
      notes:[
        'Bias supported, low-impact, chair-friendly and balance-conscious options.',
        'Prioritise confidence, control and joint comfort.'
      ],
      avoidPatterns:['high-impact','advanced','plyometric','max-effort'],
      preferPatterns:['supported','low-impact','chair-friendly','balance-regression','simple']
    }
  };

  var SEVERITY = [
    { value:'none', label:'None', score:0 },
    { value:'mild', label:'Mild', score:1 },
    { value:'moderate', label:'Moderate', score:3 },
    { value:'severe', label:'Severe / flare', score:5 }
  ];

  var SYMPTOMS = [
    ['reduced-rom','Reduced movement / restricted range'],
    ['clicking','Clicking / popping'],
    ['swelling','Swelling'],
    ['locking-catching','Locking or catching'],
    ['weakness','Weakness / loss of power'],
    ['worse-after-rest','Worse after rest or inactivity'],
    ['worse-during-load','Worse during loading'],
    ['sharp-pain','Sharp pain'],
    ['shooting-pain','Shooting pain'],
    ['numbness-tingling','Numbness or tingling']
  ];

  function byId(id){ return document.getElementById(id); }
  function esc(s){ return String(s || '').replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function readJSON(k, f){ try{ var r = localStorage.getItem(k); return r ? JSON.parse(r) : f; }catch(e){ return f; } }
  function writeJSON(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function score(v){ var f = SEVERITY.find(function(s){ return s.value === v; }); return f ? f.score : 0; }

  function dbRules(){
    try{
      if(window.FFFExerciseDB && typeof window.FFFExerciseDB.getInjuryRules === 'function'){
        return window.FFFExerciseDB.getInjuryRules() || {};
      }
    }catch(e){}
    return {};
  }

  function mergedRules(){
    var merged = {};
    var db = dbRules();
    Object.keys(db).forEach(function(k){ merged[k] = db[k]; });
    Object.keys(DETAILED).forEach(function(k){
      merged[k] = Object.assign({}, merged[k] || {}, DETAILED[k], {
        notes: Array.from(new Set([].concat((merged[k] && merged[k].notes) || [], DETAILED[k].notes || []))),
        avoidPatterns: Array.from(new Set([].concat((merged[k] && merged[k].avoidPatterns) || [], DETAILED[k].avoidPatterns || []))),
        preferPatterns: Array.from(new Set([].concat((merged[k] && merged[k].preferPatterns) || [], DETAILED[k].preferPatterns || [])))
      });
    });
    return merged;
  }

  function injuryList(){
    var r = mergedRules();
    return Object.keys(r).map(function(k){ return Object.assign({ key:k }, r[k]); }).sort(function(a,b){
      var ra = String(a.region || 'Other');
      var rb = String(b.region || 'Other');
      return ra.localeCompare(rb) || String(a.label || a.key).localeCompare(String(b.label || b.key));
    });
  }

  function legacyProfile(){
    for(var i=0;i<LEGACY_KEYS.length;i++){
      var p = readJSON(LEGACY_KEYS[i], null);
      if(p) return p;
    }
    return {};
  }

  function normaliseProfile(p){
    p = p || {};
    var items = p.items || {};
    var active = [];
    var max = 0;
    injuryList().forEach(function(i){
      var v = items[i.key] || 'none';
      var s = score(v);
      if(s > 0){ active.push(i.key); if(s > max) max = s; }
    });
    return {
      version: 43,
      updatedAt: new Date().toISOString(),
      items: items,
      notes: p.notes || '',
      side: p.side || '',
      symptoms: Array.isArray(p.symptoms) ? p.symptoms : [],
      activeKeys: active,
      maxSeverity: max
    };
  }

  function current(){ return normaliseProfile(readJSON(KEY, legacyProfile())); }

  function save(){
    var items = {};
    injuryList().forEach(function(i){
      var el = byId('injury_' + i.key);
      items[i.key] = el ? el.value : 'none';
    });
    var symptoms = [];
    document.querySelectorAll('[data-fff-symptom]:checked').forEach(function(x){ symptoms.push(x.getAttribute('data-fff-symptom')); });
    var p = normaliseProfile({
      items: items,
      notes: (byId('injuryNotes') || {}).value || '',
      side: (byId('injurySide') || {}).value || '',
      symptoms: symptoms
    });

    writeJSON(KEY, p);
    writeJSON('fff.injuryProfile.v1', p);
    writeJSON('fff.myplan.injuryKeys.v1', p.activeKeys);
    try{ localStorage.setItem('fff.myplan.maxPainSeverity.v1', String(p.maxSeverity)); }catch(e){}

    try{
      var plan = readJSON('fff.currentPlan.v1', null);
      if(plan){
        plan.injuryProfile = p;
        plan.injuries = p.activeKeys;
        plan.maxPainSeverity = p.maxSeverity;
        writeJSON('fff.currentPlan.v1', plan);
      }
    }catch(e){}

    try{
      var payload = readJSON('fff.libraryPayload', null);
      if(payload){
        payload.injuryProfile = p;
        payload.injuries = p.activeKeys;
        payload.maxPainSeverity = p.maxSeverity;
        writeJSON('fff.libraryPayload', payload);
      }
    }catch(e){}

    try{ window.dispatchEvent(new CustomEvent('fff:injury-profile-updated', { detail:p })); }catch(e){}
    renderSummary(p);
    return p;
  }

  function grouped(){
    var g = {};
    injuryList().forEach(function(i){
      var region = i.region || 'Other';
      if(!g[region]) g[region] = [];
      g[region].push(i);
    });
    return g;
  }

  function installStyles(){
    var old = byId('injuryProfileStyles');
    if(old) old.remove();
    var st = document.createElement('style');
    st.id = 'injuryProfileStyles';
    st.textContent = '' +
      '.injury-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:10px}' +
      '@media(max-width:760px){.injury-grid{grid-template-columns:1fr}}' +
      '.injury-card{display:flex;flex-direction:column;gap:7px;border:1px solid var(--stroke);background:rgba(255,255,255,.035);border-radius:12px;padding:11px 12px}' +
      '.injury-title{font-weight:800;color:var(--ink)}' +
      '.injury-help{font-size:.86rem;color:var(--inkdim);line-height:1.35}' +
      '.injury-select{margin-top:auto}' +
      '.injury-symptoms{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}' +
      '@media(max-width:760px){.injury-symptoms{grid-template-columns:1fr}}' +
      '.injury-mini-note{font-size:.88rem;color:var(--inkdim);margin-top:6px}' +
      '.injury-danger{border-left:4px solid var(--accent);padding-left:10px}';
    document.head.appendChild(st);
  }

  function restore(){
    var p = current();
    injuryList().forEach(function(i){
      var el = byId('injury_' + i.key);
      if(el) el.value = p.items[i.key] || 'none';
    });
    if(byId('injurySide')) byId('injurySide').value = p.side || '';
    if(byId('injuryNotes')) byId('injuryNotes').value = p.notes || '';
    (p.symptoms || []).forEach(function(x){
      var el = document.querySelector('[data-fff-symptom="' + x + '"]');
      if(el) el.checked = true;
    });
    renderSummary(p);
  }

  function renderSummary(p){
    var box = byId('injuryProfileSummary');
    if(!box) return;
    p = normaliseProfile(p || current());
    var r = mergedRules();
    if(!p.activeKeys.length && !(p.symptoms || []).length){
      box.innerHTML = '<p class="empty-soft">No active injury or symptom flags selected.</p>';
      return;
    }
    var activeHtml = p.activeKeys.length ? '<ul>' + p.activeKeys.map(function(k){
      return '<li><strong>' + esc((r[k] && r[k].label) || k) + '</strong> <span class="tag tag-accent">' + esc(p.items[k]) + '</span></li>';
    }).join('') + '</ul>' : '<p class="meta">No specific injury severity selected.</p>';

    var symptomHtml = (p.symptoms || []).length ? '<p><strong>Symptoms:</strong> ' + p.symptoms.map(function(s){
      var found = SYMPTOMS.find(function(x){ return x[0] === s; });
      return esc(found ? found[1] : s);
    }).join(', ') + '</p>' : '';

    var notes = [];
    p.activeKeys.forEach(function(k){ if(r[k] && r[k].notes) notes = notes.concat(r[k].notes); });
    notes = Array.from(new Set(notes)).slice(0,8);

    box.innerHTML =
      '<div class="plan-line"><strong>Active movement flags</strong><div class="sub">' + activeHtml + symptomHtml + '</div></div>' +
      (notes.length ? '<div class="plan-line"><strong>Engine bias</strong><div class="sub"><ul>' + notes.map(function(n){ return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div></div>' : '');
  }

  function wire(){
    document.querySelectorAll('.injury-select,[data-fff-symptom],#injurySide').forEach(function(el){ el.addEventListener('change', save); });
    if(byId('injuryNotes')){
      byId('injuryNotes').addEventListener('input', function(){
        clearTimeout(window.__fffInjuryTimer);
        window.__fffInjuryTimer = setTimeout(save, 250);
      });
    }
    if(byId('btnSaveInjuryProfile')) byId('btnSaveInjuryProfile').addEventListener('click', save);
    if(byId('btnClearInjuryProfile')) byId('btnClearInjuryProfile').addEventListener('click', function(){
      try{
        localStorage.removeItem(KEY);
        localStorage.removeItem('fff.injuryProfile.v1');
        localStorage.removeItem('fff.myplan.injuryKeys.v1');
        localStorage.removeItem('fff.myplan.maxPainSeverity.v1');
      }catch(e){}
      build(true);
    });
  }

  function anchorNode(){
    return byId('modePlan') || document.querySelector('[data-mode="plan"]') || document.querySelector('main .wrap') || document.querySelector('main') || document.querySelector('.wrap') || document.body;
  }

  function build(force){
    var existing = byId(SECTION_ID);
    if(existing && force) existing.remove();
    if(existing && !force){
      // If an older/basic selector is present, replace it. This is the critical upgrade path.
      existing.remove();
    }

    var anchor = anchorNode();
    var s = document.createElement('section');
    s.className = 'section';
    s.id = SECTION_ID;

    var html = '';
    html += '<div class="section-head"><div><h2>Injuries, symptoms and movement limits</h2><p>Select specific issues so FreeFitFuel can bias exercise choice, swaps, recovery and progression.</p></div></div>';
    html += '<div class="card injury-danger"><p class="lead"><strong>Important:</strong> this does not diagnose injury. Stop sharp or worsening pain. Seek professional review for swelling, locking, catching, numbness, major weakness, trauma, or symptoms that do not settle.</p></div>';
    html += '<div class="card" style="margin-top:12px"><label class="field">Side or area affected<select id="injurySide" class="input"><option value="">Not specific</option><option value="left">Left</option><option value="right">Right</option><option value="both">Both</option><option value="central">Central</option></select></label>';
    html += '<p class="injury-mini-note">Symptoms help the engine decide whether to reduce range, volume, grip demand, impact or technical complexity.</p><div class="injury-symptoms">';
    SYMPTOMS.forEach(function(x){ html += '<label><input type="checkbox" data-fff-symptom="' + esc(x[0]) + '"> ' + esc(x[1]) + '</label>'; });
    html += '</div></div>';

    var groups = grouped();
    Object.keys(groups).forEach(function(region){
      html += '<div class="card" style="margin-top:12px"><h3>' + esc(region) + '</h3><div class="injury-grid">';
      groups[region].forEach(function(i){
        var note = (i.notes && i.notes[0]) || 'Training will be adapted around this flag.';
        html += '<label class="injury-card" for="injury_' + esc(i.key) + '"><span class="injury-title">' + esc(i.label || i.key) + '</span><span class="injury-help">' + esc(note) + '</span><select id="injury_' + esc(i.key) + '" class="input injury-select">' + SEVERITY.map(function(v){ return '<option value="' + v.value + '">' + v.label + '</option>'; }).join('') + '</select></label>';
      });
      html += '</div></div>';
    });

    html += '<div class="card" style="margin-top:12px"><label class="field">Extra notes for the engine<textarea id="injuryNotes" placeholder="Example: left outer biceps pain during dumbbell bench; hip tendon pain with reduced ROM; clicky knees painless on stairs."></textarea></label><div class="tag-row"><button class="btn btn-primary" type="button" id="btnSaveInjuryProfile">Save injury profile</button><button class="btn" type="button" id="btnClearInjuryProfile">Clear profile</button></div></div>';
    html += '<div class="card" style="margin-top:12px"><h3>Current injury profile summary</h3><div id="injuryProfileSummary"></div></div>';

    s.innerHTML = html;

    var preferred = anchor.querySelector ? (anchor.querySelector('#adaptivePlanSection') || anchor.querySelector('.section')) : null;
    if(preferred && preferred.parentNode === anchor) anchor.insertBefore(s, preferred.nextSibling);
    else anchor.appendChild(s);

    installStyles();
    wire();
    restore();
    save();
  }

  function init(){ setTimeout(function(){ build(true); }, 0); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();

  window.FFFInjuryProfile = {
    key: KEY,
    injuries: injuryList,
    rules: mergedRules,
    severity: SEVERITY.slice(),
    get: current,
    save: save,
    restore: restore,
    rebuild: function(){ build(true); },
    context: function(){
      var p = current();
      return { injuries:p.activeKeys, painLevel:p.maxSeverity, maxPain:p.maxSeverity, side:p.side, symptoms:p.symptoms };
    }
  };
})();
