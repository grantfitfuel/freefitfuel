
/*
  FreeFitFuel™ Dynamic System Renderer
  Path: /js/fff-system-renderer.js
*/

(function(){
  'use strict';

  function prettyCategory(category){
    const map = {
      'physio':'Recovery & Pain Relief',
      'recovery':'Recovery & Mobility',
      'strength-skill':'Strength & Skill',
      'movement-foundation':'Movement Foundations'
    };
    return map[category] || category;
  }

  function createCard(system, featured){
    const article = document.createElement('article');
    article.className = 'fff-system-card' + (featured ? ' featured' : '');

    const tags = (system.tags || []).slice(0,4).map(tag =>
      '<span class="chip-mini">' + tag + '</span>'
    ).join('');

    article.innerHTML = `
      ${featured ? '<div class="system-pill">Recommended</div>' : ''}
      <h3>${system.title}</h3>
      <p>${(system.goals && system.goals[0]) || 'Reusable FreeFitFuel system.'}</p>

      <div class="system-meta">
        <span>${system.durationMinutes || 10} mins</span>
        <span>${system.intensity || 'low'}</span>
        <span>${system.frequency || 'Flexible'}</span>
      </div>

      <div class="system-tags">${tags}</div>

      <a class="btn system-btn" href="${system.standaloneUrl}">
        Open System →
      </a>
    `;

    return article;
  }

  function renderSystems(){
    if(!window.FFFSystems || !window.FFFSystems.all) return;

    const featuredWrap = document.getElementById('featuredSystems');
    const libraryWrap = document.getElementById('systemsLibrary');

    if(!featuredWrap || !libraryWrap) return;

    const systems = window.FFFSystems.all;

    const featured = systems.filter(system =>
      system.status === 'ready' ||
      (system.planHooks && system.planHooks.myPlanDrawsFrom)
    ).slice(0,4);

    featured.forEach(system => {
      featuredWrap.appendChild(createCard(system, true));
    });

    const grouped = {};

    systems.forEach(system => {
      const category = system.category || 'other';
      if(!grouped[category]) grouped[category] = [];
      grouped[category].push(system);
    });

    Object.keys(grouped).forEach(category => {
      const section = document.createElement('section');
      section.className = 'system-group';

      const grid = document.createElement('div');
      grid.className = 'system-grid';

      grouped[category].forEach(system => {
        grid.appendChild(createCard(system, false));
      });

      section.innerHTML = `
        <h3 class="system-group-title">${prettyCategory(category)}</h3>
      `;

      section.appendChild(grid);
      libraryWrap.appendChild(section);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', renderSystems);
  } else {
    renderSystems();
  }

})();
