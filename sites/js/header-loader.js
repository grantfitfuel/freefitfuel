<!-- /js/header-loader.js -->
<script>
(async function loadHeader(){
  const mount = document.getElementById('site-header');
  if(!mount) return;

  try{
    const res = await fetch('/partials/header.html', {cache: 'no-cache'});
    const html = await res.text();
    mount.innerHTML = html;

    // Burger
    const btn = mount.querySelector('.hamburger');
    const nav = mount.querySelector('#primary-nav');
    if(btn && nav){
      btn.addEventListener('click', ()=>{
        const open = btn.classList.toggle('active');
        nav.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Active nav (aria-current)
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const keyMap = {
      '':'home','index.html':'home',
      'ideas.html':'ideas','guides.html':'guides','workouts.html':'workouts',
      'endurance.html':'endurance','nutrition.html':'nutrition',
      'wellbeing.html':'wellbeing','yoga.html':'yoga','meditation.html':'meditation',
      'contact.html':'contact','tracker.html':'tracker'
    };
    const key = keyMap[page] || '';
    mount.querySelectorAll('.main-nav a').forEach(a=>{
      a.removeAttribute('aria-current');
      if(a.dataset.nav === key) a.setAttribute('aria-current','page');
    });

    // Optional: "calm" styling for Yoga/Meditation (body class hook)
    if(document.body.classList.contains('calm-nav')){
      mount.querySelector('.site-header')?.classList.add('calm');
    }
  }catch(e){
    console.error('Header load failed:', e);
  }
})();
</script>
