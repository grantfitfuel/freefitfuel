// app.js — lightweight installer + service worker registration

// 1) Register service worker (controls all pages under "/")
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.warn);
  });
}

// 2) Minimal install prompt (Chrome/Edge/Android)
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton(){
  if (document.getElementById('pwa-install')) return;
  const btn = document.createElement('button');
  btn.id = 'pwa-install';
  btn.textContent = 'Install FreeFitFuel';
  btn.style.position='fixed';
  btn.style.right='12px';
  btn.style.bottom='12px';
  btn.style.zIndex='9999';
  btn.style.border='0';
  btn.style.padding='10px 14px';
  btn.style.borderRadius='10px';
  btn.style.background='#FF6A00';
  btn.style.color='#111';
  btn.style.fontWeight='800';
  btn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    btn.remove();
  });
  document.body.appendChild(btn);
}

// 3) Tiny iOS helper (Safari has no prompt)
(function(){
  const iOS = (/iphone|ipad|ipod/i).test(navigator.userAgent);
  const inStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (!iOS || inStandalone) return;

  const tip = document.createElement('div');
  tip.textContent = 'Tip: On iPhone/iPad, tap Share → Add to Home Screen to install FreeFitFuel.';
  tip.style.position='fixed';
  tip.style.left='12px';
  tip.style.right='12px';
  tip.style.bottom='12px';
  tip.style.background='rgba(0,0,0,.8)';
  tip.style.color='#fff';
  tip.style.padding='10px 12px';
  tip.style.border='1px solid rgba(255,255,255,.2)';
  tip.style.borderRadius='10px';
  tip.style.zIndex='9998';
  tip.style.fontSize='14px';
  tip.style.textAlign='center';
  tip.addEventListener('click', ()=> tip.remove());
  setTimeout(()=>document.body.appendChild(tip), 1200);
})();
