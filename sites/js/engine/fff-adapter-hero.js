// FreeFitFuel Adapter — Hero / Coach Summary v1
(function(){
  'use strict';
  function run(){
    var box=document.getElementById('coachSummary');
    if(!box || !window.FFF || typeof window.FFF.getGlobalCoachingSummary!=='function') return;
    try{
      var summary=window.FFF.getGlobalCoachingSummary();
      var msg=summary && summary.message ? summary.message : null;
      var mode=summary && summary.decision && summary.decision.mode ? summary.decision.mode : (summary && summary.mode) || 'steady';
      if(msg && msg.headline){
        box.innerHTML='<strong>'+msg.headline+'</strong><p>'+msg.message+'</p><p class="meta">Engine mode: '+mode+'</p>';
      }
    }catch(err){}
  }
  window.FFFAdapterHero={version:'1.0', render:run};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
