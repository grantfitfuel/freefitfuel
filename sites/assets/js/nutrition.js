/* Nutrition Page JS (FreeFitFuel)
   - Filters with ALL + chips
   - Live count
   - Search (title/ingredients/tags)
   - Pantry mode (token input + matching + auto-plan week placeholder)
   - Planner (simple day slots + goal targets)
   - Recipe modal + print card
   - Spice level icons (1–3)
*/

(function () {
  const qs  = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // ---------- DOM ----------
  const filterBar       = qs('#filterChips');
  const countEl         = qs('#recipeCount');
  const clearFiltersBtn = qs('#clearFiltersBtn');
  const grid            = qs('#recipeGrid');
  const searchInput     = qs('#recipeSearch');

  const pantryPanel   = qs('#pantryPanel');
  const pantryOpen    = qs('#pantryOpenBtn');
  const pantryClose   = qs('#pantryCloseBtn');
  const pantryInput   = qs('#pantryInput');
  const pantryTokens  = qs('#pantryTokens');
  const pantryStrict  = qs('#pantryStrict');
  const pantryExtras  = qs('#pantryExtras');
  const pantryBudget  = qs('#pantryBudget');
  const pantryRespect = qs('#pantryRespectDiet');
  const pantryFind    = qs('#pantryFindBtn');
  const pantryPlan    = qs('#pantryPlanWeekBtn');
  const pantryReset   = qs('#pantryResetBtn');

  const plannerPanel   = qs('#plannerPanel');
  const openPlannerBtn = qs('#openPlannerBtn');
  const plannerClose   = qs('#plannerCloseBtn');
  const goalSelect     = qs('#goalSelect');
  const targetKcal     = qs('#targetKcal');
  const targetProtein  = qs('#targetProtein');
  const targetCarbs    = qs('#targetCarbs');
  const targetFat      = qs('#targetFat');

  const slotEls = {
    breakfast: qs('#slot-breakfast'),
    lunch:     qs('#slot-lunch'),
    dinner:    qs('#slot-dinner'),
    snack:     qs('#slot-snack'),
  };
  const sumKcal = qs('#sumKcal');
  const sumP    = qs('#sumP');
  const sumC    = qs('#sumC');
  const sumF    = qs('#sumF');

  const overlay = qs('#overlay');

  // Modal
  const modal = qs('#recipeModal');
  const modalImage      = qs('#modalImage');
  const modalTitle      = qs('#recipeTitle');
  const modalServes     = qs('#recipeServes');
  const modalTime       = qs('#recipeTime');
  const modalSpice      = qs('#recipeSpice');
  const modalIngredients= qs('#recipeIngredients');
  const modalMethod     = qs('#recipeMethod');
  const modalMacros     = qs('#recipeMacros');
  const modalAllergens  = qs('#recipeAllergens');
  const modalSwaps      = qs('#recipeSwaps');
  const modalHydration  = qs('#recipeHydration');
  const modalAdd        = qs('#modalAddToPlanner');
  const modalPrintBtn   = qs('#modalPrint');
  const modalCloseBtn   = qs('#modalClose');
  const printArea       = qs('#printArea');

  // ---------- State ----------
  let RECIPES = [];            // loaded from /assets/data/recipes.json
  let FILTERS = {
    ALL: true,
    search: '',
    MealType: new Set(),        // Breakfast, Lunch, Dinner, Snack
    Dietary: new Set(),         // Vegetarian, Vegan, Gluten-free, Dairy-free, Nut-free, Egg-free, Soy-free
    Nutrition: new Set(),       // High protein, High carb / Endurance, Low carb, High fibre, Low calorie ≤bands, Spicy
    KcalBand: new Set(),        // ≤400, ≤600, ≤800
    Protocols: new Set(),       // Low FODMAP, Low sodium
    Time: new Set(),            // ≤15, ≤30, Slow-cook, No-cook
    CostPrep: new Set(),        // Low cost / Budget, Batch-cook, Freezer-friendly, One-pan, Air-fryer
    Pantry: { active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true }
  };

  const GOAL_DEFAULTS = {
    'Maintain':  { kcal:'TDEE', protein:'1.4–1.8 g/kg', carbs:'45–55%', fat:'25–30%' },
    'Cut':       { kcal:'TDEE −15–20%', protein:'1.8–2.2 g/kg', carbs:'30–40%', fat:'25–30%' },
    'Build/Bulk':{ kcal:'TDEE +10–20%', protein:'1.6–2.0 g/kg', carbs:'50–60%', fat:'20–25%' },
    'Transform': { kcal:'≈TDEE', protein:'2.0–2.4 g/kg', carbs:'35–45%', fat:'25–30%' },
  };

  // ---------- Filters (render chips) ----------
  const CHIP_GROUPS = [
    { id:'ALL',        label:'ALL',  type:'solo' },
    { id:'GOALSPLIT',  label:'—',    type:'spacer' },

    { id:'MealType',   label:'Meal Type', chips:['Breakfast','Lunch','Dinner','Snack'] },

    { id:'Dietary',    label:'Dietary', chips:[
      'Vegetarian','Vegan','Gluten-free','Dairy-free','Nut-free','Egg-free','Soy-free'
    ]},

    { id:'Nutrition',  label:'Nutrition Focus', chips:[
      'High protein','High carb / Endurance','Low carb','High fibre','Spicy'
    ]},

    { id:'KcalBand',   label:'Low calorie', chips:['≤400','≤600','≤800'] },

    { id:'Protocols',  label:'Protocols', chips:['Low FODMAP','Low sodium'] },

    { id:'Time',       label:'Time', chips:['≤15 min','≤30 min','Slow-cook','No-cook'] },

    { id:'CostPrep',   label:'Cost/Prep', chips:['Low cost / Budget','Batch-cook','Freezer-friendly','One-pan','Air-fryer'] },
  ];

  function renderChips() {
    // Keep the initial ALL button, then append the rest
    const existingAll = filterBar.querySelector('[data-filter="ALL"]');
    filterBar.innerHTML = '';
    filterBar.appendChild(existingAll);

    CHIP_GROUPS.slice(1).forEach(group => {
      if (group.type === 'spacer') return;
      group.chips.forEach(ch => {
        const b = document.createElement('button');
        b.className = 'chip';
        b.dataset.group = group.id;
        b.dataset.value = ch;
        b.setAttribute('aria-pressed','false');
        b.textContent = ch;
        filterBar.appendChild(b);
      });
    });
  }

  // ---------- Helpers ----------
  const norm = s => (s||'').toString().trim().toLowerCase();

  function spiceIcons(level) {
    const n = Number(level||0);
    if (!n) return '';
    return '🌶️'.repeat(Math.max(1, Math.min(3, n)));
  }

  function kcalBand(kcal) {
    if (kcal <= 400) return '≤400';
    if (kcal <= 600) return '≤600';
    if (kcal <= 800) return '≤800';
    return null;
  }

  function matchesFilters(r) {
    // Search
    if (FILTERS.search) {
      const txt = `${r.title} ${r.mealType} ${r.dietary?.join(' ')} ${r.nutritionFocus?.join(' ')} ${r.protocols?.join(' ')} ${r.ingredients?.map(i=>i.item).join(' ')}`.toLowerCase();
      if (!txt.includes(FILTERS.search)) return false;
    }

    // MealType
    if (FILTERS.MealType.size && !FILTERS.MealType.has(r.mealType)) return false;

    // Dietary
    if (FILTERS.Dietary.size) {
      const set = new Set(r.dietary||[]);
      for (const need of FILTERS.Dietary) {
        if (!set.has(need)) return false;
      }
    }

    // Nutrition Focus (High protein / High carb / Low carb / High fibre / Spicy)
    if (FILTERS.Nutrition.size) {
      // Spicy is special: check spiceLevel >=1 when selected
      let needsSpicy = FILTERS.Nutrition.has('Spicy');
      const others = new Set([...FILTERS.Nutrition].filter(x => x !== 'Spicy'));
      if (needsSpicy && !(r.spiceLevel && r.spiceLevel >= 1)) return false;
      if (others.size) {
        const nf = new Set(r.nutritionFocus||[]);
        for (const tag of others) if (!nf.has(tag)) return false;
      }
    }

    // KcalBand
    if (FILTERS.KcalBand.size) {
      const band = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal ?? 0);
      if (!band || !FILTERS.KcalBand.has(band)) return false;
    }

    // Protocols
    if (FILTERS.Protocols.size) {
      const set = new Set(r.protocols||[]);
      for (const need of FILTERS.Protocols) if (!set.has(need)) return false;
    }

    // Time
    if (FILTERS.Time.size) {
      const t = r.time_mins || 0;
      const wanted = [...FILTERS.Time];
      const pass = wanted.every(tag => {
        if (tag === '≤15 min') return t <= 15;
        if (tag === '≤30 min') return t <= 30;
        if (tag === 'Slow-cook') return (r.time_label || '').toLowerCase().includes('slow') || (r.slowCook === true);
        if (tag === 'No-cook') return (r.time_label || '').toLowerCase().includes('no-cook') || (t === 0);
        return true;
      });
      if (!pass) return false;
    }

    // Cost/Prep
    if (FILTERS.CostPrep.size) {
      // Low cost / Budget maps to costTag === 'Budget'
      const needsBudget = FILTERS.CostPrep.has('Low cost / Budget');
      if (needsBudget && r.costTag !== 'Budget') return false;

      const other = new Set([...FILTERS.CostPrep].filter(x => x !== 'Low cost / Budget'));
      const tags = new Set([...(r.costPrep || []), r.costTag].filter(Boolean));
      for (const t of other) if (!tags.has(t)) return false;
    }

    // Pantry (if active)
    if (FILTERS.Pantry.active) {
      const keys = new Set((r.pantryKeys || []).map(norm));
      const have = new Set(FILTERS.Pantry.keys.map(norm));
      let matched = 0;
      have.forEach(k => { if (keys.has(k)) matched++; });

      const total = (r.pantryKeys || []).length;
      const extrasNeeded = Math.max(0, total - matched);
      const respectsDiet = !FILTERS.Pantry.respectDiet || checkDietaryRespect(r);

      const budgetOk = !FILTERS.Pantry.budget || r.costTag === 'Budget';
      const strictOk = !FILTERS.Pantry.strict ? (extrasNeeded <= FILTERS.Pantry.extras) : (extrasNeeded === 0);

      if (!(budgetOk && strictOk && respectsDiet)) return false;
    }

    return true;
  }

  function checkDietaryRespect(r) {
    // If user has any Dietary filters active, recipe must include them
    if (!FILTERS.Dietary.size) return true;
    const set = new Set(r.dietary||[]);
    for (const need of FILTERS.Dietary) if (!set.has(need)) return false;
    return true;
  }

  // ---------- Render Cards ----------
  function render() {
    const list = RECIPES.filter(matchesFilters);
    grid.innerHTML = '';
    list.forEach(r => grid.appendChild(card(r)));
    countEl.textContent = `Showing ${list.length} of ${RECIPES.length} recipes`;
    clearFiltersBtn.hidden = FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active ? true : false;
    grid.setAttribute('aria-busy','false');
  }

  function card(r) {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img class="card-img" src="${r.image}" alt="${r.imageAlt || r.title}" />
      <div class="card-body">
        <h3>${r.title}</h3>
        <div class="kpi">
          <span>⏱️ ${r.time_mins || 0} min</span>
          <span>🍽️ ${r.mealType || ''}</span>
          ${r.nutritionPerServing?.kcal ? `<span>🔥 ${r.nutritionPerServing.kcal} kcal</span>`:''}
        </div>
        <div class="badges">
          ${r.costTag ? `<span class="badge">${r.costTag}</span>`:''}
          ${(r.dietary||[]).map(t=>`<span class="badge">${t}</span>`).join('')}
          ${(r.nutritionFocus||[]).map(t=>`<span class="badge">${t}</span>`).join('')}
          ${r.spiceLevel ? `<span class="badge spice" aria-label="Spice level">${spiceIcons(r.spiceLevel)} <span aria-hidden="true">Spicy</span></span>`:''}
        </div>
        <div class="actions">
          <button class="btn" data-action="view">View Recipe Card</button>
          <button class="btn" data-action="print">Print Recipe Card</button>
          <button class="btn primary" data-action="add">Add to Planner</button>
        </div>
      </div>
    `;
    el.querySelector('[data-action="view"]').addEventListener('click', () => openModal(r));
    el.querySelector('[data-action="print"]').addEventListener('click', () => printRecipe(r));
    el.querySelector('[data-action="add"]').addEventListener('click', () => addToPlannerPrompt(r));
    return el;
  }

  // ---------- Modal & Print ----------
  function openModal(r) {
    modalImage.src = r.image;
    modalImage.alt = r.imageAlt || r.title;
    modalTitle.textContent = r.title;
    modalServes.textContent = r.serves || 1;
    modalTime.textContent = `${r.time_mins || 0} min`;
    modalSpice.textContent = r.spiceLevel ? `${spiceIcons(r.spiceLevel)} (${['','Mild','Medium','Hot'][r.spiceLevel] || 'Spicy'})` : '';
    modalIngredients.innerHTML = (r.ingredients||[]).map(i=>`<li>${i.qty ? `${i.qty} `:''}${i.item}</li>`).join('');
    modalMethod.innerHTML = (r.method||[]).map(step=>`<li>${step}</li>`).join('');
    if (r.nutritionPerServing) {
      const n = r.nutritionPerServing;
      modalMacros.innerHTML = `
        <li>${n.kcal} kcal</li>
        <li>Protein ${n.protein_g} g</li>
        <li>Carbs ${n.carbs_g} g</li>
        <li>Fat ${n.fat_g} g</li>
        ${n.fibre_g!=null?`<li>Fibre ${n.fibre_g} g</li>`:''}
        ${n.sugar_g!=null?`<li>Sugar ${n.sugar_g} g</li>`:''}
        ${n.salt_g!=null?`<li>Salt ${n.salt_g} g</li>`:''}
      `;
    } else {
      modalMacros.innerHTML = '<li>—</li>';
    }
    modalAllergens.textContent = (r.allergensPresent && r.allergensPresent.length) ? `Allergens: ${r.allergensPresent.join(', ')}` : 'Allergens: none listed';
    modalSwaps.innerHTML = (r.swaps||[]).map(s=>`<li>${s}</li>`).join('');
    modalHydration.textContent = r.hydrationTip || '';

    modalAdd.onclick = () => addToPlannerPrompt(r);
    modalPrintBtn.onclick = () => printRecipe(r);
    modalCloseBtn.onclick = closeModal;

    modal.showModal();
  }
  function closeModal(){ modal.close(); }

  function printRecipe(r) {
    const n = r.nutritionPerServing || {};
    printArea.hidden = false;
    printArea.innerHTML = `
      <article>
        <h1>${r.title}</h1>
        <p>${r.mealType || ''} • ${r.time_mins || 0} min • Serves ${r.serves || 1} ${r.spiceLevel?`• ${spiceIcons(r.spiceLevel)} ${['','Mild','Medium','Hot'][r.spiceLevel]||'Spicy'}`:''}</p>
        <img src="${r.image}" alt="${r.imageAlt || r.title}" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border:1px solid #eee;border-radius:.5rem;margin:.5rem 0;" />
        <h2>Ingredients</h2>
        <ul>${(r.ingredients||[]).map(i=>`<li>${i.qty?`${i.qty} `:''}${i.item}</li>`).join('')}</ul>
        <h2>Method</h2>
        <ol>${(r.method||[]).map(s=>`<li>${s}</li>`).join('')}</ol>
        <h2>Macros (per serving)</h2>
        <p>${n.kcal||'—'} kcal • P ${n.protein_g||'—'} g • C ${n.carbs_g||'—'} g • F ${n.fat_g||'—'} g${n.fibre_g!=null?` • Fibre ${n.fibre_g} g`:''}${n.sugar_g!=null?` • Sugar ${n.sugar_g} g`:''}${n.salt_g!=null?` • Salt ${n.salt_g} g`:''}</p>
        <p><strong>Allergens:</strong> ${(r.allergensPresent||[]).join(', ') || 'none listed'}</p>
        ${(r.swaps&&r.swaps.length)?`<h2>Swaps</h2><ul>${r.swaps.map(s=>`<li>${s}</li>`).join('')}</ul>`:''}
        ${r.hydrationTip?`<p><em>${r.hydrationTip}</em></p>`:''}
        <p style="margin-top:1rem;font-size:.9rem;color:#666;">© FreeFitFuel — Grant Cameron Anthony</p>
      </article>
    `;
    window.print();
    setTimeout(()=>{ printArea.hidden = true; printArea.innerHTML=''; }, 500);
  }

  // ---------- Planner ----------
  const PLAN = { breakfast:[], lunch:[], dinner:[], snack:[] };

  function addToPlannerPrompt(recipe) {
    // If a slot has focus recently, we could infer; for now prompt.
    const slot = prompt('Add to which meal? (breakfast, lunch, dinner, snack)').trim().toLowerCase();
    if (!['breakfast','lunch','dinner','snack'].includes(slot)) return;
    PLAN[slot].push({ slug:recipe.slug, title:recipe.title, macros:recipe.nutritionPerServing || {} });
    renderPlan();
    alert(`Added "${recipe.title}" to ${slot}.`);
  }

  function renderPlan() {
    Object.keys(slotEls).forEach(k => {
      const el = slotEls[k];
      el.innerHTML = PLAN[k].map((it, idx)=>`
        <div class="badge" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin:.25rem 0;">
          <span>${it.title}</span>
          <button data-slot="${k}" data-idx="${idx}" style="border:0;background:transparent;color:#FF6A00;cursor:pointer;">remove</button>
        </div>
      `).join('');
    });

    qsa('#daySlots button[data-slot]').forEach(btn=>{
      btn.onclick = () => {
        const slot = btn.getAttribute('data-slot');
        const idx  = Number(btn.getAttribute('data-idx'));
        PLAN[slot].splice(idx,1);
        renderPlan();
      };
    });

    // Totals
    let tk=0,tp=0,tc=0,tf=0;
    Object.values(PLAN).flat().forEach(it=>{
      tk += +it.macros.kcal || 0;
      tp += +it.macros.protein_g || 0;
      tc += +it.macros.carbs_g || 0;
      tf += +it.macros.fat_g || 0;
    });
    sumKcal.textContent = Math.round(tk);
    sumP.textContent    = `${Math.round(tp)} g`;
    sumC.textContent    = `${Math.round(tc)} g`;
    sumF.textContent    = `${Math.round(tf)} g`;

    // Persist
    localStorage.setItem('fff_mealplan_v1', JSON.stringify(PLAN));
  }

  // Planner open/close
  openPlannerBtn.addEventListener('click', ()=>openPanel(plannerPanel));
  plannerClose.addEventListener('click', closePanels);

  // Planner actions
  qs('#plannerClearBtn').addEventListener('click', ()=>{
    Object.keys(PLAN).forEach(k=>PLAN[k]=[]);
    renderPlan();
  });
  qs('#plannerCopyBtn').addEventListener('click', ()=>{
    const txt = Object.entries(PLAN).map(([k,arr])=>{
      return `${cap(k)}:\n` + arr.map(i=>`- ${i.title}`).join('\n');
    }).join('\n\n');
    navigator.clipboard.writeText(txt);
    alert('Plan copied to clipboard.');
  });
  qs('#plannerPrintBtn').addEventListener('click', ()=>{
    printArea.hidden = false;
    printArea.innerHTML = `
      <article>
        <h1>Meal Plan — Today</h1>
        ${Object.entries(PLAN).map(([k,arr])=>`
          <h2>${cap(k)}</h2>
          <ul>${arr.map(i=>`<li>${i.title}</li>`).join('') || '<li>—</li>'}</ul>
        `).join('')}
        <p><strong>Totals:</strong> ${sumKcal.textContent} kcal • P ${sumP.textContent} • C ${sumC.textContent} • F ${sumF.textContent}</p>
        <p style="margin-top:1rem;font-size:.9rem;color:#666;">© FreeFitFuel — Grant Cameron Anthony</p>
      </article>
    `;
    window.print();
    setTimeout(()=>{ printArea.hidden=true; printArea.innerHTML=''; }, 500);
  });

  // Goal selector
  goalSelect.addEventListener('change', ()=>{
    const v = goalSelect.value;
    const t = GOAL_DEFAULTS[v] || {kcal:'—',protein:'—',carbs:'—',fat:'—'};
    targetKcal.textContent    = t.kcal;
    targetProtein.textContent = t.protein;
    targetCarbs.textContent   = t.carbs;
    targetFat.textContent     = t.fat;
  });

  function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

  // ---------- Pantry ----------
  let pantrySet = new Set();

  pantryOpen.addEventListener('click', ()=>openPanel(pantryPanel));
  pantryClose.addEventListener('click', closePanels);

  function openPanel(panel){
    overlay.hidden = false;
    overlay.classList.add('show');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
  }
  function closePanels(){
    overlay.classList.remove('show');
    overlay.hidden = true;
    [pantryPanel, plannerPanel].forEach(p=>{ p.classList.remove('open'); p.setAttribute('aria-hidden','true'); });
  }
  overlay.addEventListener('click', closePanels);

  function renderPantryTokens() {
    pantryTokens.innerHTML = '';
    [...pantrySet].forEach(key=>{
      const b = document.createElement('button');
      b.className = 'chip';
      b.textContent = key;
      b.setAttribute('aria-pressed','true');
      b.onclick = ()=>{ pantrySet.delete(key); renderPantryTokens(); };
      pantryTokens.appendChild(b);
    });
  }

  pantryInput.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const raw = pantryInput.value.split(',').map(s=>s.trim()).filter(Boolean);
      raw.forEach(k => pantrySet.add(k));
      pantryInput.value='';
      renderPantryTokens();
    }
  });

  pantryFind.addEventListener('click', ()=>{
    FILTERS.Pantry.active = true;
    FILTERS.Pantry.keys   = [...pantrySet];
    FILTERS.Pantry.strict = pantryStrict.checked;
    FILTERS.Pantry.extras = Number(pantryExtras.value);
    FILTERS.Pantry.budget = pantryBudget.checked;
    FILTERS.Pantry.respectDiet = pantryRespect.checked;
    render();
    closePanels();
    window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
  });

  pantryPlan.addEventListener('click', ()=>{
    // Simple placeholder: pick up to 14 highest-matching Budget recipes
    FILTERS.Pantry.active = true;
    FILTERS.Pantry.keys   = [...pantrySet];
    FILTERS.Pantry.strict = false;
    FILTERS.Pantry.extras = 2;
    FILTERS.Pantry.budget = true;
    FILTERS.Pantry.respectDiet = pantryRespect.checked;

    const scored = RECIPES
      .filter(r=>r.costTag==='Budget')
      .map(r=>{
        const keys = new Set((r.pantryKeys||[]).map(norm));
        let matched = 0;
        pantrySet.forEach(k=>{ if (keys.has(norm(k))) matched++; });
        return { r, score: matched };
      })
      .sort((a,b)=>b.score-a.score)
      .slice(0,14)
      .map(x=>x.r);

    // Spread across meals
    const mapSlots = ['breakfast','lunch','dinner','snack'];
    Object.keys(PLAN).forEach(k=>PLAN[k]=[]);
    scored.forEach((r,i)=>{
      const slot = mapSlots[i % mapSlots.length];
      PLAN[slot].push({ slug:r.slug, title:r.title, macros:r.nutritionPerServing||{} });
    });
    renderPlan();
    closePanels();
    openPanel(plannerPanel);
  });

  pantryReset.addEventListener('click', ()=>{
    pantrySet.clear(); renderPantryTokens();
    FILTERS.Pantry = { active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true };
    render();
  });

  // ---------- Filter interactions ----------
  filterBar.addEventListener('click', (e)=>{
    const btn = e.target.closest('.chip');
    if (!btn) return;
    const filter = btn.dataset.filter;
    if (filter === 'ALL') {
      // reset all
      FILTERS.ALL = true;
      ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search = '';
      searchInput.value = '';
      FILTERS.Pantry = { active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true };
      updateChipStates();
      render();
      return;
    }
    const group = btn.dataset.group;
    const value = btn.dataset.value;
    if (!group || !value) return;

    FILTERS.ALL = false;

    // Toggle pressed
    if (FILTERS[group].has(value)) FILTERS[group].delete(value);
    else FILTERS[group].add(value);

    updateChipStates();
    render();
  });

  function updateChipStates() {
    // ALL button
    const allBtn = filterBar.querySelector('[data-filter="ALL"]');
    allBtn.setAttribute('aria-pressed', FILTERS.ALL ? 'true' : 'false');

    // Other chips
    qsa('.chip[data-group]').forEach(b=>{
      const g = b.dataset.group, v = b.dataset.value;
      const on = FILTERS[g].has(v);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // Clear button
    clearFiltersBtn.hidden = FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active;
  }

  clearFiltersBtn.addEventListener('click', ()=>{
    FILTERS.ALL = true;
    ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
    FILTERS.search = '';
    searchInput.value = '';
    FILTERS.Pantry = { active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true };
    updateChipStates();
    render();
  });

  searchInput.addEventListener('input', ()=>{
    FILTERS.ALL = false;
    FILTERS.search = norm(searchInput.value);
    updateChipStates();
    render();
  });

  // ---------- Init ----------
  function init() {
    renderChips();
    updateChipStates();
    // Load saved plan
    try {
      const saved = JSON.parse(localStorage.getItem('fff_mealplan_v1')||'null');
      if (saved) { Object.assign(PLAN, saved); renderPlan(); }
    } catch(_) {}

    // Fetch recipes
    fetch('assets/data/recipes.json')
      .then(r=>r.json())
      .then(data=>{
        RECIPES = (Array.isArray(data)?data:(data.recipes||[])).map(r=>{
          // Precompute helpful fields
          r.kcalBand = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal ?? 0);
          r.pantryKeys = r.pantryKeys || (r.ingredients||[]).map(i=>norm(i.pantryKey || i.item));
          return r;
        });
        render();
      })
      .catch(err=>{
        console.warn('Could not load recipes.json', err);
        RECIPES = [];
        render();
      });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
