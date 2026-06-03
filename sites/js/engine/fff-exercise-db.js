/* FreeFitFuel modular exercise database loader v6.0 */
(function(){
  'use strict';
  const BASE = 'data/exercises/';
  const MANIFEST = BASE + 'manifest.json';

  const DB = {
    version: '6.0-modular',
    loaded: false,
    exercises: [],
    packs: [],

    async load(packIds){
      const manifest = await fetch(MANIFEST).then(r => {
        if(!r.ok) throw new Error('Exercise manifest failed');
        return r.json();
      });

      let packs = manifest.packs || [];
      if(Array.isArray(packIds) && packIds.length){
        const wanted = new Set(packIds);
        packs = packs.filter(p => wanted.has(p.id));
      }

      const chunks = await Promise.all(packs.map(p =>
        fetch(BASE + p.file).then(r => {
          if(!r.ok) throw new Error('Exercise pack failed: ' + p.file);
          return r.json();
        })
      ));

      const seen = new Set();
      const merged = [];
      chunks.flat().forEach(ex => {
        if(!ex || !ex.key || seen.has(ex.key)) return;
        seen.add(ex.key);
        merged.push(ex);
      });

      this.loaded = true;
      this.packs = packs;
      this.exercises = merged;

      window.FFF_EXERCISE_DB = this;
      window.FFF_EXERCISES = merged;
      window.EXERCISES = merged;

      document.dispatchEvent(new CustomEvent('fff:exercises-loaded', {
        detail: { count: merged.length, packs: packs.map(p => p.id) }
      }));

      return merged;
    },

    getAll(){ return this.exercises || []; },
    getByKey(key){ return (this.exercises || []).find(x => x.key === key) || null; },
    filter(fn){ return (this.exercises || []).filter(fn); }
  };

  window.FFF_EXERCISE_DB = DB;
  window.FFF_EXERCISES = window.FFF_EXERCISES || [];
  window.EXERCISES = window.EXERCISES || [];

  DB.load().catch(err => console.error('[FreeFitFuel] Exercise DB failed:', err));
})();
