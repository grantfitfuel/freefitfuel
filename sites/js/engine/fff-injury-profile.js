// FreeFitFuel — Injury Profile Selector v2
// Full replacement for /js/engine/fff-injury-profile.js
// Uses the detailed injury profiles from FFFExerciseDB where available.
(function(){
  'use strict';
  var KEY='fff.myplan.injuries.v2';
  var LEGACY='fff.myplan.injuries.v1';
  var DEFAULTS = [
  {
    "key": "tennis-elbow",
    "label": "Tennis elbow / lateral elbow tendon pain",
    "region": "outer elbow"
  },
  {
    "key": "golfers-elbow",
    "label": "Golfer\u2019s elbow / inner elbow tendon pain",
    "region": "inner elbow"
  },
  {
    "key": "outer-biceps-left-pain",
    "label": "Outer left biceps / brachialis pain",
    "region": "left upper arm"
  },
  {
    "key": "distal-biceps-tendon-irritation",
    "label": "Distal biceps tendon irritation",
    "region": "front elbow / lower biceps"
  },
  {
    "key": "shoulder-impingement",
    "label": "Shoulder impingement / painful arc",
    "region": "shoulder"
  },
  {
    "key": "rotator-cuff-irritation",
    "label": "Rotator cuff irritation",
    "region": "shoulder"
  },
  {
    "key": "wrist-pain",
    "label": "Wrist pain / loaded extension sensitivity",
    "region": "wrist"
  },
  {
    "key": "hip-flexor-tendon-pain",
    "label": "Hip flexor tendon pain / front hip pain",
    "region": "front hip"
  },
  {
    "key": "hip-tendon-pain-reduced-rom",
    "label": "Hip tendon pain with reduced movement",
    "region": "hip"
  },
  {
    "key": "glute-med-tendinopathy",
    "label": "Outer hip / glute med tendon irritation",
    "region": "outer hip"
  },
  {
    "key": "hip-clicking-painful",
    "label": "Clicking hip with pain or catching",
    "region": "hip"
  },
  {
    "key": "clicky-knees-painless",
    "label": "Clicky knees, painless",
    "region": "knee"
  },
  {
    "key": "clicky-knees-painful",
    "label": "Clicky knees with pain, swelling or catching",
    "region": "knee"
  },
  {
    "key": "patellar-tendon-pain",
    "label": "Patellar tendon pain",
    "region": "front knee"
  },
  {
    "key": "knee-pain-general",
    "label": "General knee pain",
    "region": "knee"
  },
  {
    "key": "low-back-non-specific",
    "label": "Low back, non-specific",
    "region": "low back"
  },
  {
    "key": "disc-sensitivity",
    "label": "Disc sensitivity",
    "region": "low back"
  },
  {
    "key": "plantar-fasciitis",
    "label": "Plantar fasciitis / heel pain",
    "region": "foot"
  },
  {
    "key": "achilles-calf-sensitivity",
    "label": "Achilles / calf sensitivity",
    "region": "achilles/calf"
  },
  {
    "key": "beginner-low-confidence",
    "label": "Beginner / low confidence",
    "region": "whole body"
  },
  {
    "key": "older-adult",
    "label": "Older adult / deconditioned",
    "region": "whole body"
  }
];
  var SEVERITY=[{value:'none',label:'None',score:0},{value:'mild',label:'Mild',score:1},{value:'moderate',label:'Moderate',score:3},{value:'severe',label:'Severe / flare',score:5}];
  function byId(id){return document.getElementById(id);}
  function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function readJSON(k,f){try{var r=localStorage.getItem(k);return r?JSON.parse(r):f;}catch(e){return f;}}
  function rules(){try{if(window.FFFExerciseDB&&window.FFFExerciseDB.getInjuryRules)return window.FFFExerciseDB.getInjuryRules();}catch(e){} var o={}; DEFAULTS.forEach(function(x){o[x.key]={label:x.label,region:x.region,notes:[]};}); return o;}
  function list(){var r=rules(); return Object.keys(r).map(function(k){return Object.assign({key:k}, r[k]);}).sort(function(a,b){return String(a.region||'').localeCompare(String(b.region||'')) || String(a.label||'').localeCompare(String(b.label||''));});}
  function score(v){var f=SEVERITY.find(function(s){return s.value===v;});return f?f.score:0;}
  function normalise(p){p=p||{}; var items=p.items||{}; var active=[], max=0; list().forEach(function(i){var v=items[i.key]||'none'; var s=score(v); if(s>0){active.push(i.key); if(s>max)max=s;}}); return {version:2,updatedAt:new Date().toISOString(),items:items,notes:p.notes||'',side:p.side||'',symptoms:p.symptoms||[],activeKeys:active,maxSeverity:max};}
  function current(){return normalise(readJSON(KEY, readJSON(LEGACY, {})));}
  function save(){var items={}; list().forEach(function(i){var el=byId('injury_'+i.key); items[i.key]=el?el.value:'none';}); var symptoms=[]; document.querySelectorAll('[data-symptom]:checked').forEach(function(x){symptoms.push(x.getAttribute('data-symptom'));}); var p=normalise({items:items,notes:(byId('injuryNotes')||{}).value||'',side:(byId('injurySide')||{}).value||'',symptoms:symptoms}); localStorage.setItem(KEY,JSON.stringify(p)); localStorage.setItem('fff.injuryProfile.v1',JSON.stringify(p)); localStorage.setItem('fff.myplan.injuryKeys.v1',JSON.stringify(p.activeKeys)); localStorage.setItem('fff.myplan.maxPainSeverity.v1',String(p.maxSeverity)); try{var plan=readJSON('fff.currentPlan.v1',null); if(plan){plan.injuryProfile=p; plan.injuries=p.activeKeys; plan.maxPainSeverity=p.maxSeverity; localStorage.setItem('fff.currentPlan.v1',JSON.stringify(plan));}}catch(e){} window.dispatchEvent(new CustomEvent('fff:injury-profile-updated',{detail:p})); renderSummary(p); return p;}
  function grouped(){var g={}; list().forEach(function(i){var key=i.region||'general'; if(!g[key])g[key]=[]; g[key].push(i);}); return g;}
  function build(){ if(byId('injuryProfileSection')) return; var anchor=byId('modePlan')||document.querySelector('.wrap')||document.body; var s=document.createElement('section'); s.className='section'; s.id='injuryProfileSection'; var html='<div class="section-head"><div><h2>Injuries, symptoms and movement limits</h2><p>Select specific issues so FreeFitFuel can bias exercise choice, swaps, recovery and progression.</p></div></div>'; html+='<div class="card"><p class="lead"><strong>Important:</strong> this is not diagnosis. Use it to guide training modifications and seek professional review for severe, worsening, locking, swelling, numbness or weakness.</p></div>'; html+='<div class="card" style="margin-top:12px"><label class="field">Side or area affected<select id="injurySide" class="input"><option value="">Not specific</option><option>Left</option><option>Right</option><option>Both</option><option>Central</option></select></label><div class="injury-symptoms"><label><input type="checkbox" data-symptom="reduced-rom"> Reduced movement</label><label><input type="checkbox" data-symptom="clicking"> Clicking</label><label><input type="checkbox" data-symptom="swelling"> Swelling</label><label><input type="checkbox" data-symptom="locking-catching"> Locking/catching</label><label><input type="checkbox" data-symptom="weakness"> Weakness/loss of power</label><label><input type="checkbox" data-symptom="worse-after-rest"> Worse after rest</label></div></div>'; var groups=grouped(); Object.keys(groups).forEach(function(region){ html+='<div class="card" style="margin-top:12px"><h3>'+esc(region||'General')+'</h3><div class="injury-grid">'; groups[region].forEach(function(i){html+='<label class="injury-card" for="injury_'+i.key+'"><span class="injury-title">'+esc(i.label)+'</span><span class="injury-help">'+esc((i.notes&&i.notes[0])||'Training will be adapted around this flag.')+'</span><select id="injury_'+i.key+'" class="input injury-select">'+SEVERITY.map(function(v){return '<option value="'+v.value+'">'+v.label+'</option>';}).join('')+'</select></label>';}); html+='</div></div>'; }); html+='<div class="card" style="margin-top:12px"><label class="field">Extra notes for the engine<textarea id="injuryNotes" placeholder="Example: left outer biceps pain during dumbbell bench; hip tendon pain with reduced ROM; clicky knees painless on stairs."></textarea></label><div class="tag-row"><button class="btn btn-primary" type="button" id="btnSaveInjuryProfile">Save injury profile</button><button class="btn" type="button" id="btnClearInjuryProfile">Clear profile</button></div></div><div class="card" style="margin-top:12px"><h3>Current injury profile summary</h3><div id="injuryProfileSummary"></div></div>'; s.innerHTML=html; anchor.appendChild(s); styles(); wire(); restore(); }
  function styles(){if(byId('injuryProfileStyles'))return; var st=document.createElement('style'); st.id='injuryProfileStyles'; st.textContent='.injury-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:10px}@media(max-width:760px){.injury-grid{grid-template-columns:1fr}}.injury-card{display:flex;flex-direction:column;gap:7px;border:1px solid var(--stroke);background:rgba(255,255,255,.035);border-radius:12px;padding:11px 12px}.injury-title{font-weight:800;color:var(--ink)}.injury-help{font-size:.86rem;color:var(--inkdim);line-height:1.35}.injury-symptoms{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px}@media(max-width:760px){.injury-symptoms{grid-template-columns:1fr}}'; document.head.appendChild(st);}
  function restore(){var p=current(); list().forEach(function(i){var el=byId('injury_'+i.key); if(el)el.value=p.items[i.key]||'none';}); if(byId('injurySide'))byId('injurySide').value=p.side||''; if(byId('injuryNotes'))byId('injuryNotes').value=p.notes||''; (p.symptoms||[]).forEach(function(x){var el=document.querySelector('[data-symptom="'+x+'"]'); if(el)el.checked=true;}); renderSummary(p);}
  function renderSummary(p){var box=byId('injuryProfileSummary'); if(!box)return; p=normalise(p||current()); if(!p.activeKeys.length){box.innerHTML='<p class="empty-soft">No active injury flags selected.</p>';return;} var r=rules(); var lis=p.activeKeys.map(function(k){return '<li><strong>'+esc((r[k]&&r[k].label)||k)+'</strong> <span class="tag tag-accent">'+esc(p.items[k])+'</span></li>';}).join(''); var notes=[]; p.activeKeys.forEach(function(k){if(r[k]&&r[k].notes)notes=notes.concat(r[k].notes);}); box.innerHTML='<div class="plan-line"><strong>Active movement flags</strong><div class="sub"><ul>'+lis+'</ul></div></div>'+(notes.length?'<div class="plan-line"><strong>Engine bias</strong><div class="sub"><ul>'+Array.from(new Set(notes)).slice(0,6).map(function(n){return '<li>'+esc(n)+'</li>';}).join('')+'</ul></div></div>':'');}
  function wire(){document.querySelectorAll('.injury-select,[data-symptom],#injurySide').forEach(function(el){el.addEventListener('change',save);}); if(byId('injuryNotes'))byId('injuryNotes').addEventListener('input',function(){clearTimeout(window.__fffInjuryT); window.__fffInjuryT=setTimeout(save,250);}); if(byId('btnSaveInjuryProfile'))byId('btnSaveInjuryProfile').addEventListener('click',save); if(byId('btnClearInjuryProfile'))byId('btnClearInjuryProfile').addEventListener('click',function(){localStorage.removeItem(KEY); localStorage.removeItem('fff.injuryProfile.v1'); localStorage.removeItem('fff.myplan.injuryKeys.v1'); localStorage.removeItem('fff.myplan.maxPainSeverity.v1'); location.reload();});}
  function init(){setTimeout(build,0);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.FFFInjuryProfile={key:KEY,get:current,save:save,restore:restore,injuries:list,severity:SEVERITY,context:function(){var p=current(); return {injuries:p.activeKeys,painLevel:p.maxSeverity,maxPain:p.maxSeverity,side:p.side,symptoms:p.symptoms};}};
})();
