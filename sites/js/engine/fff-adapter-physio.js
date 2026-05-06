// FreeFitFuel Adapter — Physio / Injury Profile v1
(function(){
  'use strict';
  var KEY='fff.injury.profile.v1';
  var OPTIONS=[
    ['biceps-pain','Biceps tendon / left arm pain'],['shoulder-pain','Shoulder pain'],['elbow-pain','Elbow pain'],['wrist-pain','Wrist issues'],
    ['knee-pain','Knee pain'],['patellar-tendon','Patellar tendon pain'],['hip-pain','Hip pain / impingement'],['ankle-instability','Ankle instability'],
    ['lower-back','Lower back sensitivity'],['overhead-mobility','Poor overhead mobility'],['hip-mobility','Poor hip mobility'],['left-right-imbalance','Left/right imbalance']
  ];
  function read(){ try{ var raw=localStorage.getItem(KEY); return raw?JSON.parse(raw):{selected:[],severity:{}}; }catch(e){ return {selected:[],severity:{}}; } }
  function write(v){ try{ localStorage.setItem(KEY, JSON.stringify(v)); return true; }catch(e){ return false; } }
  function mount(){
    var host=document.getElementById('injurySelector') || document.getElementById('mobilityPainSelector') || document.getElementById('coachSummary');
    if(!host || document.getElementById('fffInjurySelector')) return;
    var state=read();
    var wrap=document.createElement('div');
    wrap.id='fffInjurySelector';
    wrap.className='card';
    wrap.innerHTML='<h3>Injury and limitation profile</h3><p class="sub">Select issues so the engine can adapt exercise choice and progression.</p>'+
      OPTIONS.map(function(o){ var checked=(state.selected||[]).indexOf(o[0])>-1?'checked':''; var sev=(state.severity&&state.severity[o[0]])||'mild'; return '<label class="wellness-item"><input type="checkbox" data-injury="'+o[0]+'" '+checked+'> <span><span class="w-title">'+o[1]+'</span><span class="w-sub">Severity <select data-severity="'+o[0]+'"><option '+(sev==='mild'?'selected':'')+'>mild</option><option '+(sev==='moderate'?'selected':'')+'>moderate</option><option '+(sev==='severe'?'selected':'')+'>severe</option></select></span></span></label>'; }).join('')+
      '<button type="button" class="btn btn-primary" id="fffSaveInjuries">Save injury profile</button>';
    host.appendChild(wrap);
    document.getElementById('fffSaveInjuries').addEventListener('click', function(){
      var selected=[], severity={};
      wrap.querySelectorAll('[data-injury]').forEach(function(c){ if(c.checked) selected.push(c.getAttribute('data-injury')); });
      wrap.querySelectorAll('[data-severity]').forEach(function(s){ severity[s.getAttribute('data-severity')]=String(s.value||'mild').toLowerCase(); });
      write({selected:selected,severity:severity,updatedAt:Date.now()});
      alert('Injury profile saved. Rebuild the workout payload to apply it.');
    });
  }
  window.FFFAdapterPhysio={version:'1.0', options:OPTIONS, read:read, write:write, mount:mount};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
