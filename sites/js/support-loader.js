<script>
(function(){
  const mount = document.getElementById('support');
  if(!mount || mount.dataset.loaded) return;
  fetch('/partials/support-uk.html', {credentials:'same-origin'})
    .then(r => r.text())
    .then(html => { mount.outerHTML = html; })
    .catch(()=>{ /* fail silently */ });
})();
</script>
