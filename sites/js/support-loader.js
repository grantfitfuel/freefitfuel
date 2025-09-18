<script>
(function(){
  // Run after DOM is parsed (prevents "element not found")
  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded', fn);} }

  ready(function(){
    var mount = document.getElementById('support');
    if(!mount){ console.warn('support-loader: #support placeholder not found'); return; }

    // Prevent double-inject / remnants
    if(mount.dataset.loaded === 'true'){ return; }
    mount.dataset.loaded = 'true';

    // Path + cache-bust (bump v to force refresh)
    var url = (mount.dataset.src || '/partials/support-uk.html') + '?v=2';

    fetch(url, {credentials:'same-origin', cache:'no-store'})
      .then(function(r){
        if(!r.ok){ throw new Error('HTTP '+r.status); }
        return r.text();
      })
      .then(function(html){
        // IMPORTANT: partial must start with <section id="support" ...>
        // Replacing outerHTML avoids nesting a section inside a section (no duplicate ids/remnants)
        mount.outerHTML = html;
      })
      .catch(function(err){
        console.error('support-loader: failed to load', url, err);
        // Leave fallback content so page still has a Support box
        // (Optional) mount.style.display='block';
      });
  });
})();
</script>
