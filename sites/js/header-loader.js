<script>
(async function loadHeader(){
  const mount = document.getElementById('site-header');
  if(!mount) return;

  // 1) Fetch & inject the shared header
  const res = await fetch('/partials/header.html', { cache: 'no-cache' });
  mount.innerHTML = await res.text();

  // 2) Burger toggle
  const btn = mount.querySelector('.hamburger');
  const nav = mount.querySelector('#primary-nav');
  if(btn && nav){
    btn.addEventListener('click', ()=>{
      const open = btn.classList.toggle('active');
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 3) Auto-active link (aria-current)
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const key = ({
    '':'home','index.html':'home',
    'ideas.html':'ideas','guides.html':'guides','workouts.html':'workouts',
    'endurance.html':'endurance','nutrition.html':'nutrition','wellbeing.html':'wellbeing',
    'yoga-meditation.html':'yoga-meditation','contact.html':'contact','tracker.html':'tracker'
  })[page] || '';
  mount.querySelectorAll('.main-nav a').forEach(a=>{
    a.removeAttribute('aria-current');
    if(a.dataset.nav === key) a.setAttribute('aria-current','page');
  });

  // 4) Optional calm header on specific pages
  if(document.body.classList.contains('calm-nav')){
    mount.querySelector('.site-header')?.classList.add('calm');
  }
})();
</script>
