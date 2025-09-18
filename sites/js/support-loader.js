<script>
(function(){
  // Helper: run after DOM is parsed
  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded', fn);} }

  ready(function(){
    var mount = document.getElementById('support');
    if(!mount){
      console.warn('[support-loader] No #support placeholder on this page.');
      return;
    }

    // prevent double-run/remnants
    if(mount.dataset.loaded === 'true'){
      console.info('[support-loader] Already loaded; skipping.');
      return;
    }
    mount.dataset.loaded = 'true';

    // Source path (allow override via data-src)
    var src = mount.getAttribute('data-src') || '/partials/support-uk.html';

    // Resolve to absolute URL (avoids base/path issues)
    var url = new URL(src, window.location.origin);
    // Cache-bust (bump if you update the partial)
    var v = mount.getAttribute('data-v') || '3';
    url.searchParams.set('v', v);

    console.info('[support-loader] Fetching', url.href);

    fetch(url.href, {credentials:'same-origin', cache:'no-store'})
      .then(function(r){
        if(!r.ok){ throw new Error('HTTP '+r.status); }
        return r.text();
      })
      .then(function(html){
        // Sanity check: partial should start with <section id="support"
        if(!/^\s*<section[^>]*\bid=["']support["']/i.test(html)){
          console.warn('[support-loader] Partial does not start with <section id="support">. Replacing anyway to avoid remnants.');
        }
        // Replace the whole placeholder (no nested section IDs)
        mount.outerHTML = html;
        console.info('[support-loader] Injected OK.');
      })
      .catch(function(err){
        console.error('[support-loader] Failed to load partial:', err);

        // Visible inline fallback so you see the failure on the page
        var fallback =
          '<section id="support" class="section">' +
            '<h2>Support</h2>' +
            '<p class="meta">Couldn’t load support links. Quick refs: 999 (UK emergency), Samaritans 116&nbsp;123, Shout text SHOUT to 85258.</p>' +
          '</section>';
        mount.outerHTML = fallback;
      });
  });
})();
</script>
