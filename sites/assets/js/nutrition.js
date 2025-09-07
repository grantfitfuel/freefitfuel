/* Nutrition Page JS — FreeFitFuel (sites build)
   - Builds Pantry, Planner, Modal UIs
   - Filters + ALL chip + search + live count
   - Pantry mode + cheap-week auto-plan
   - Planner totals + print/copy
   - Recipe modal + print single card
   - Fetches JSON from /sites/assets/data/recipes.json
*/
(function () {
  const qs=(s,el=document)=>el.querySelector(s);
  const qsa=(s,el=document)=>Array.from(el.querySelectorAll(s));
  const norm=s=>(s||'').toString().trim().toLowerCase();

  // DOM hooks already in nutrition.html
  const filterBar   = qs('#filterChips');
  const searchInput = qs('#recipeSearch');
  const grid        = qs('#recipeGrid');
  const countEl     = qs('#recipeCount');
  const clearBtn    = qs('#clearFiltersBtn');

  // Panels (we'll inject their inner HTML)
  const pantryPanel  = qs('#pantryPanel');
  const plannerPanel = qs('#plannerPanel');
  const recipeModal  = qs('#recipeModal');
  const printArea    = qs('#printArea');

  // Buttons (top bar)
  const pantryOpenBtn = qs('#pantryOpenBtn');
  const openPlannerBtn= qs('#openPlannerBtn');

  // State
  let RECIPES = [];
  const PLAN = { breakfast:[], lunch:[], dinner:[], snack:[] };

  // Filters model
  let FILTERS = {
    ALL: true,
    search: '',
    MealType: new Set(),
    Dietary: new Set(),       // Vegetarian, Vegan, Gluten-free, Dairy-free, Nut-free, Egg-free, Soy-free
    Nutrition: new Set(),     // High protein, High carb / Endurance, Low carb, High fibre, Spicy
    KcalBand: new Set(),      // ≤400, ≤600, ≤800
    Protocols: new Set(),     // Low FODMAP, Low sodium
    Time: new Set(),          // ≤15 min, ≤30 min, Slow-cook, No-cook
    CostPrep: new Set(),      // Low cost / Budget, Batch-cook, Freezer-friendly, One-pan, Air-fryer
    Pantry: { active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true }
  };

  const GOALS = {
    'Maintain':  { kcal:'TDEE',        protein:'1.4–1.8 g/kg', carbs:'45–55%', fat:'25–30%' },
    'Cut':       { kcal:'TDEE −15–20%',protein:'1.8–2.2 g/kg', carbs:'30–40%', fat:'25–30%' },
    'Build/Bulk':{ kcal:'TDEE +10–20%',protein:'1.6–2.0 g/kg', carbs:'50–60%', fat:'20–25%' },
    'Transform': { kcal:'≈TDEE',       protein:'2.0–2.4 g/kg', carbs:'35–45%', fat:'25–30%' }
  };

  const CHIP_GROUPS = [
    { id:'ALL', label:'ALL', type:'solo' },
    { id:'MealType', label:'Meal Type', chips:['Breakfast','Lunch','Dinner','Snack'] },
    { id:'Dietary',  label:'Dietary', chips:['Vegetarian','Vegan','Gluten-free','Dairy-free','Nut-free','Egg-free','Soy-free'] },
    { id:'Nutrition',label:'Nutrition Focus', chips:['High protein','High carb / Endurance','Low carb','High fibre','Spicy'] },
    { id:'KcalBand', label:'Low calorie', chips:['≤400','≤600','≤800'] },
    { id:'Protocols',label:'Protocols', chips:['Low FODMAP','Low sodium'] },
    { id:'Time',     label:'Time', chips:['≤15 min','≤30 min','Slow-cook','No-cook'] },
    { id:'CostPrep', label:'Cost/Prep', chips:['Low cost / Budget','Batch-cook','Freezer-friendly','One-pan','Air-fryer'] },
  ];

  // ---------- UI Injection ----------
  function buildPantryUI() {
    pantryPanel.innerHTML = `
      <div class="panel-header">
        <h2>Pantry</h2>
        <button id="pantryCloseBtn" class="btn">Close</button>
      </div>
      <div class="panel-body">
        <label for="pantryInput">Type what you’ve got</label>
        <input id="pantryInput" type="text" placeholder="e.g., rice, pasta, tinned tomatoes, beans, eggs, frozen veg…" />
        <div class="muted" style="font-size:.9rem;">Tip: press Enter or comma to add items as tokens.</div>
        <div id="pantryTokens" class="filters" aria-label="Your pantry items"></div>

        <div class="row two" style="margin-top:.5rem;">
          <label><input type="checkbox" id="pantryStrict" /> Only use my pantry</label>
          <label>Allow up to
            <select id="pantryExtras">
              <option value="0">0 extras</option>
              <option value="1">1 extra</option>
              <option value="2" selected>2 extras</option>
              <option value="3">3 extras</option>
            </select>
          </label>
        </div>

        <div class="row two">
          <label><input type="checkbox" id="pantryBudget" /> Budget only</label>
          <label><input type="checkbox" id="pantryRespectDiet" checked /> Respect dietary filters</label>
        </div>

        <div style="display:flex; gap:.5rem;">
          <button id="pantryFindBtn" class="btn primary">Find recipes</button>
          <button id="pantryPlanWeekBtn" class="btn">Auto-plan cheap week</button>
          <button id="pantryResetBtn" class="btn">Reset Pantry</button>
        </div>
      </div>
    `;
  }

  function buildPlannerUI() {
    plannerPanel.innerHTML = `
      <div class="panel-header">
        <h2>Meal Planner</h2>
        <button id="plannerCloseBtn" class="btn">Close</button>
      </div>
      <div class="panel-body">
        <label for="goalSelect">Goal</label>
        <select id="goalSelect">
          <option value="">— Select —</option>
          <option>Maintain</option>
          <option>Cut</option>
          <option>Build/Bulk</option>
          <option>Transform</option>
        </select>

        <div id="targets" class="kpi">
          <span><strong>Calories:</strong> <span id="targetKcal">—</span></span>
          <span><strong>Protein:</strong> <span id="targetProtein">—</span></span>
          <span><strong>Carbs:</strong> <span id="targetCarbs">—</span></span>
          <span><strong>Fat:</strong> <span id="targetFat">—</span></span>
        </div>

        <div id="daySlots" class="row">
          <h3>Today</h3>
          <div class="row two">
            <div><h4>Breakfast</h4><div id="slot-breakfast"></div></div>
            <div><h4>Lunch</h4><div id="slot-lunch"></div></div>
            <div><h4>Dinner</h4><div id="slot-dinner"></div></div>
            <div><h4>Snack</h4><div id="slot-snack"></div></div>
          </div>
        </div>

        <div id="totals" class="kpi" aria-live="polite">
          <span><strong>Total kcal:</strong> <span id="sumKcal">0</span></span>
          <span><strong>P:</strong> <span id="sumP">0 g</span></span>
          <span><strong>C:</strong> <span id="sumC">0 g</span></span>
          <span><strong>F:</strong> <span id="sumF">0 g</span></span>
        </div>

        <div style="display:flex; gap:.5rem; margin-top:.5rem;">
          <button id="plannerClearBtn" class="btn">Clear day</button>
          <button id="plannerCopyBtn" class="btn">Copy</button>
          <button id="plannerPrintBtn" class="btn">Print</button>
        </div>
      </div>
    `;
  }

  function buildModalUI() {
    recipeModal.innerHTML = `
      <div class="modal-inner">
        <img id="modalImage" class="modal-media" alt="" />
        <div class="modal-content">
          <div class="row">
            <h2 id="recipeTitle">Recipe</h2>
            <div class="kpi">
              <span><strong>Serves:</strong> <span id="recipeServes">—</span></span>
              <span><strong>Time:</strong> <span id="recipeTime">—</span></span>
              <span id="recipeSpice" class="spice" aria-label="Spice level" title="Spice level"></span>
            </div>
          </div>
          <div class="row two">
            <div><h3>Ingredients</h3><ul id="recipeIngredients"></ul></div>
            <div><h3>Method</h3><ol id="recipeMethod"></ol></div>
          </div>
          <div class="row two">
            <div><h3>Macros per serving</h3><ul id="recipeMacros" class="muted"></ul></div>
            <div>
              <h3>Allergens & swaps</h3>
              <p id="recipeAllergens" class="muted"></p>
              <ul id="recipeSwaps" class="muted"></ul>
              <p id="recipeHydration" class="muted"></p>
            </div>
          </div>
          <div class="actions">
            <button id="modalAddToPlanner" class="btn primary">Add to Planner</button>
            <button id="modalPrint" class="btn">Print Recipe Card</button>
            <button id="modalClose" class="btn">Close</button>
          </div>
        </div>
      </div>
    `;
  }

  // Open/close helpers
  function openPanel(panel){ panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); }
  function closePanel(panel){ panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); }

  // Render chips
  function renderChips() {
    const all = filterBar.querySelector('[data-filter="ALL"]');
    filterBar.innerHTML = ''; filterBar.appendChild(all);
    CHIP_GROUPS.filter(g=>g.id!=='ALL').forEach(g=>{
      g.chips.forEach(val=>{
        const b=document.createElement('button');
        b.className='chip'; b.dataset.group=g.id; b.dataset.value=val; b.setAttribute('aria-pressed','false');
        b.textContent=val; filterBar.appendChild(b);
      });
    });
  }

  // Helpers
  function spiceIcons(level){ const n=Number(level||0); return n? '🌶️'.repeat(Math.max(1,Math.min(3,n))) : ''; }
  function kcalBand(k){ if(k<=400)return '≤400'; if(k<=600)return '≤600'; if(k<=800)return '≤800'; return null; }

  // Filtering
  function matchesFilters(r){
    if (FILTERS.search){
      const txt = `${r.title} ${r.mealType} ${(r.dietary||[]).join(' ')} ${(r.nutritionFocus||[]).join(' ')} ${(r.protocols||[]).join(' ')} ${(r.ingredients||[]).map(i=>i.item).join(' ')}`.toLowerCase();
      if(!txt.includes(FILTERS.search)) return false;
    }
    if (FILTERS.MealType.size && !FILTERS.MealType.has(r.mealType)) return false;
    if (FILTERS.Dietary.size){
      const set=new Set(r.dietary||[]);
      for(const need of FILTERS.Dietary) if(!set.has(need)) return false;
    }
    if (FILTERS.Nutrition.size){
      const needSpicy = FILTERS.Nutrition.has('Spicy');
      if (needSpicy && !(r.spiceLevel && r.spiceLevel>=1)) return false;
      const others = new Set([...FILTERS.Nutrition].filter(x=>x!=='Spicy'));
      const have = new Set(r.nutritionFocus||[]);
      for(const tag of others) if(!have.has(tag)) return false;
    }
    if (FILTERS.KcalBand.size){
      const band = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
      if (!band || !FILTERS.KcalBand.has(band)) return false;
    }
    if (FILTERS.Protocols.size){
      const set=new Set(r.protocols||[]);
      for(const need of FILTERS.Protocols) if(!set.has(need)) return false;
    }
    if (FILTERS.Time.size){
      const t=r.time_mins||0;
      const ok=[...FILTERS.Time].every(tag=>{
        if(tag==='≤15 min') return t<=15;
        if(tag==='≤30 min') return t<=30;
        if(tag==='Slow-cook') return (r.slowCook===true) || (r.time_label||'').toLowerCase().includes('slow');
        if(tag==='No-cook') return t===0 || (r.time_label||'').toLowerCase().includes('no-cook');
        return true;
      });
      if(!ok) return false;
    }
    if (FILTERS.CostPrep.size){
      const needsBudget = FILTERS.CostPrep.has('Low cost / Budget');
      if (needsBudget && r.costTag!=='Budget') return false;
      const other = new Set([...FILTERS.CostPrep].filter(x=>x!=='Low cost / Budget'));
      const tags = new Set([...(r.costPrep||[]), r.costTag].filter(Boolean));
      for(const t of other) if(!tags.has(t)) return false;
    }
    if (FILTERS.Pantry.active){
      const keys=new Set((r.pantryKeys||[]).map(norm));
      const have=new Set(FILTERS.Pantry.keys.map(norm));
      let matched=0; have.forEach(k=>{ if(keys.has(k)) matched++; });
      const total=(r.pantryKeys||[]).length;
      const extrasNeeded=Math.max(0,total-matched);
      const budgetOk=!FILTERS.Pantry.budget || r.costTag==='Budget';
      const strictOk=!FILTERS.Pantry.strict ? (extrasNeeded<=FILTERS.Pantry.extras) : (extrasNeeded===0);
      if (!budgetOk || !strictOk) return false;
      if (FILTERS.Pantry.respectDiet && FILTERS.Dietary.size){
        const set=new Set(r.dietary||[]);
        for(const need of FILTERS.Dietary) if(!set.has(need)) return false;
      }
    }
    return true;
  }

  function card(r){
    const el=document.createElement('article');
    el.className='card';
    el.innerHTML=`
      <img class="card-img" src="${r.image}" alt="${r.imageAlt||r.title}">
      <div class="card-body">
        <h3>${r.title}</h3>
        <div class="kpi">
          <span>⏱️ ${r.time_mins||0} min</span>
          <span>🍽️ ${r.mealType||''}</span>
          ${r.nutritionPerServing?.kcal?`<span>🔥 ${r.nutritionPerServing.kcal} kcal</span>`:''}
        </div>
        <div class="badges">
          ${r.costTag?`<span class="badge">${r.costTag}</span>`:''}
          ${(r.dietary||[]).map(t=>`<span class="badge">${t}</span>`).join('')}
          ${(r.nutritionFocus||[]).map(t=>`<span class="badge">${t}</span>`).join('')}
          ${r.spiceLevel?`<span class="badge spice" aria-label="Spice level">${spiceIcons(r.spiceLevel)} <span aria-hidden="true">Spicy</span></span>`:''}
        </div>
        <div class="actions">
          <button class="btn" data-action="view">View Recipe Card</button>
          <button class="btn" data-action="print">Print Recipe Card</button>
          <button class="btn primary" data-action="add">Add to Planner</button>
        </div>
      </div>`;
    el.querySelector('[data-action="view"]').onclick=()=>openModal(r);
    el.querySelector('[data-action="print"]').onclick=()=>printRecipe(r);
    el.querySelector('[data-action="add"]').onclick=()=>addToPlannerPrompt(r);
    return el;
  }

  function render(){
    const list=RECIPES.filter(matchesFilters);
    grid.innerHTML=''; list.forEach(r=>grid.appendChild(card(r)));
    countEl.textContent=`Showing ${list.length} of ${RECIPES.length} recipes`;
    clearBtn.hidden = FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active;
    grid.setAttribute('aria-busy','false');
  }

  // Modal / Print
  function openModal(r){
    const img=qs('#modalImage',recipeModal),
          ttl=qs('#recipeTitle',recipeModal),
          svs=qs('#recipeServes',recipeModal),
          tim=qs('#recipeTime',recipeModal),
          spc=qs('#recipeSpice',recipeModal),
          ing=qs('#recipeIngredients',recipeModal),
          mth=qs('#recipeMethod',recipeModal),
          mcr=qs('#recipeMacros',recipeModal),
          alg=qs('#recipeAllergens',recipeModal),
          swp=qs('#recipeSwaps',recipeModal),
          hyd=qs('#recipeHydration',recipeModal),
          add=qs('#modalAddToPlanner',recipeModal),
          prt=qs('#modalPrint',recipeModal),
          cls=qs('#modalClose',recipeModal);
    img.src=r.image; img.alt=r.imageAlt||r.title;
    ttl.textContent=r.title;
    svs.textContent=r.serves||1;
    tim.textContent=`${r.time_mins||0} min`;
    spc.textContent=r.spiceLevel? `${spiceIcons(r.spiceLevel)} (${['','Mild','Medium','Hot'][r.spiceLevel]||'Spicy'})` : '';
    ing.innerHTML=(r.ingredients||[]).map(i=>`<li>${i.qty?`${i.qty} `:''}${i.item}</li>`).join('');
    mth.innerHTML=(r.method||[]).map(s=>`<li>${s}</li>`).join('');
    if(r.nutritionPerServing){
      const n=r.nutritionPerServing;
      mcr.innerHTML=`
        <li>${n.kcal} kcal</li>
        <li>Protein ${n.protein_g} g</li>
        <li>Carbs ${n.carbs_g} g</li>
        <li>Fat ${n.fat_g} g</li>
        ${n.fibre_g!=null?`<li>Fibre ${n.fibre_g} g</li>`:''}
        ${n.sugar_g!=null?`<li>Sugar ${n.sugar_g} g</li>`:''}
        ${n.salt_g!=null?`<li>Salt ${n.salt_g} g</li>`:''}`;
    } else mcr.innerHTML='<li>—</li>';
    alg.textContent=(r.allergensPresent&&r.allergensPresent.length)?`Allergens: ${r.allergensPresent.join(', ')}`:'Allergens: none listed';
    swp.innerHTML=(r.swaps||[]).map(s=>`<li>${s}</li>`).join('');
    hyd.textContent=r.hydrationTip||'';
    add.onclick=()=>addToPlannerPrompt(r);
    prt.onclick=()=>printRecipe(r);
    cls.onclick=()=>recipeModal.close();
    recipeModal.showModal();
  }

  function printRecipe(r){
    const n=r.nutritionPerServing||{};
    printArea.hidden=false;
    printArea.innerHTML=`
      <article>
        <h1>${r.title}</h1>
        <p>${r.mealType||''} • ${r.time_mins||0} min • Serves ${r.serves||1} ${r.spiceLevel?`• ${spiceIcons(r.spiceLevel)} ${['','Mild','Medium','Hot'][r.spiceLevel]||'Spicy'}`:''}</p>
        <img src="${r.image}" alt="${r.imageAlt||r.title}" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border:1px solid #eee;border-radius:.5rem;margin:.5rem 0;" />
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
      </article>`;
    window.print();
    setTimeout(()=>{ printArea.hidden=true; printArea.innerHTML=''; }, 500);
  }

  // Planner
  function renderPlan(){
    const slotEls={
      breakfast:qs('#slot-breakfast',plannerPanel),
      lunch:qs('#slot-lunch',plannerPanel),
      dinner:qs('#slot-dinner',plannerPanel),
      snack:qs('#slot-snack',plannerPanel),
    };
    Object.keys(slotEls).forEach(k=>{
      const el=slotEls[k];
      el.innerHTML=PLAN[k].map((it,idx)=>`
        <div class="badge" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin:.25rem 0;">
          <span>${it.title}</span>
          <button data-slot="${k}" data-idx="${idx}" style="border:0;background:transparent;color:#FF6A00;cursor:pointer;">remove</button>
        </div>`).join('');
    });
    qsa('#daySlots button[data-slot]',plannerPanel).forEach(btn=>{
      btn.onclick=()=>{ const s=btn.dataset.slot; const i=+btn.dataset.idx; PLAN[s].splice(i,1); renderPlan(); };
    });
    let tk=0,tp=0,tc=0,tf=0;
    Object.values(PLAN).flat().forEach(it=>{
      tk+=+it.macros.kcal||0; tp+=+it.macros.protein_g||0; tc+=+it.macros.carbs_g||0; tf+=+it.macros.fat_g||0;
    });
    qs('#sumKcal',plannerPanel).textContent=Math.round(tk);
    qs('#sumP',plannerPanel).textContent=`${Math.round(tp)} g`;
    qs('#sumC',plannerPanel).textContent=`${Math.round(tc)} g`;
    qs('#sumF',plannerPanel).textContent=`${Math.round(tf)} g`;
    localStorage.setItem('fff_mealplan_v1', JSON.stringify(PLAN));
  }
  function addToPlannerPrompt(r){
    const slot=(prompt('Add to which meal? (breakfast, lunch, dinner, snack)')||'').trim().toLowerCase();
    if(!['breakfast','lunch','dinner','snack'].includes(slot)) return;
    PLAN[slot].push({ slug:r.slug, title:r.title, macros:r.nutritionPerServing||{} });
    renderPlan(); alert(`Added "${r.title}" to ${slot}.`);
  }

  // Pantry
  const pantryState = { set:new Set() };
  function renderPantryTokens(){
    const wrap=qs('#pantryTokens',pantryPanel);
    wrap.innerHTML='';
    [...pantryState.set].forEach(key=>{
      const b=document.createElement('button');
      b.className='chip'; b.textContent=key; b.setAttribute('aria-pressed','true');
      b.onclick=()=>{ pantryState.set.delete(key); renderPantryTokens(); };
      wrap.appendChild(b);
    });
  }

  // Event wiring after UIs exist
  function wireEvents(){
    // Top bar
    pantryOpenBtn.onclick = ()=>openPanel(pantryPanel);
    openPlannerBtn.onclick= ()=>{ openPanel(plannerPanel); };

    // Pantry panel
    qs('#pantryCloseBtn',pantryPanel).onclick=()=>closePanel(pantryPanel);
    const pantryInput = qs('#pantryInput',pantryPanel);
    pantryInput.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===','){
        e.preventDefault();
        pantryInput.value.split(',').map(s=>s.trim()).filter(Boolean).forEach(k=>pantryState.set.add(k));
        pantryInput.value=''; renderPantryTokens();
      }
    });
    qs('#pantryFindBtn',pantryPanel).onclick=()=>{
      FILTERS.Pantry.active=true;
      FILTERS.Pantry.keys=[...pantryState.set];
      FILTERS.Pantry.strict=qs('#pantryStrict',pantryPanel).checked;
      FILTERS.Pantry.extras=+qs('#pantryExtras',pantryPanel).value;
      FILTERS.Pantry.budget=qs('#pantryBudget',pantryPanel).checked;
      FILTERS.Pantry.respectDiet=qs('#pantryRespectDiet',pantryPanel).checked;
      closePanel(pantryPanel); render(); window.scrollTo({top:grid.offsetTop-80,behavior:'smooth'});
    };
    qs('#pantryPlanWeekBtn',pantryPanel).onclick=()=>{
      FILTERS.Pantry.active=true;
      FILTERS.Pantry.keys=[...pantryState.set]; FILTERS.Pantry.strict=false; FILTERS.Pantry.extras=2;
      FILTERS.Pantry.budget=true; FILTERS.Pantry.respectDiet=qs('#pantryRespectDiet',pantryPanel).checked;
      const scored=RECIPES.filter(r=>r.costTag==='Budget').map(r=>{
        const keys=new Set((r.pantryKeys||[]).map(norm)); let matched=0;
        pantryState.set.forEach(k=>{ if(keys.has(norm(k))) matched++; }); return { r, score:matched };
      }).sort((a,b)=>b.score-a.score).slice(0,14).map(x=>x.r);
      const order=['breakfast','lunch','dinner','snack']; Object.keys(PLAN).forEach(k=>PLAN[k]=[]);
      scored.forEach((r,i)=>{ const slot=order[i%order.length]; PLAN[slot].push({ slug:r.slug, title:r.title, macros:r.nutritionPerServing||{} }); });
      renderPlan(); closePanel(pantryPanel); openPanel(plannerPanel);
    };
    qs('#pantryResetBtn',pantryPanel).onclick=()=>{
      pantryState.set.clear(); renderPantryTokens();
      FILTERS.Pantry={ active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true };
      render();
    };

    // Planner events
    qs('#plannerCloseBtn',plannerPanel).onclick=()=>closePanel(plannerPanel);
    qs('#plannerClearBtn',plannerPanel).onclick=()=>{ Object.keys(PLAN).forEach(k=>PLAN[k]=[]); renderPlan(); };
    qs('#plannerCopyBtn',plannerPanel).onclick=()=>{
      const txt=Object.entries(PLAN).map(([k,arr])=>`${k[0].toUpperCase()+k.slice(1)}:\n`+arr.map(i=>`- ${i.title}`).join('\n')).join('\n\n');
      navigator.clipboard.writeText(txt); alert('Plan copied to clipboard.');
    };
    qs('#plannerPrintBtn',plannerPanel).onclick=()=>{
      printArea.hidden=false;
      printArea.innerHTML=`
        <article>
          <h1>Meal Plan — Today</h1>
          ${Object.entries(PLAN).map(([k,arr])=>`<h2>${k[0].toUpperCase()+k.slice(1)}</h2><ul>${arr.map(i=>`<li>${i.title}</li>`).join('')||'<li>—</li>'}</ul>`).join('')}
          <p><strong>Totals:</strong> ${qs('#sumKcal',plannerPanel).textContent} kcal • P ${qs('#sumP',plannerPanel).textContent} • C ${qs('#sumC',plannerPanel).textContent} • F ${qs('#sumF',plannerPanel).textContent}</p>
          <p style="margin-top:1rem;font-size:.9rem;color:#666;">© FreeFitFuel — Grant Cameron Anthony</p>
        </article>`;
      window.print(); setTimeout(()=>{ printArea.hidden=true; printArea.innerHTML=''; }, 500);
    };
    qs('#goalSelect',plannerPanel).onchange=()=>{
      const v=qs('#goalSelect',plannerPanel).value;
      const t=GOALS[v] || {kcal:'—',protein:'—',carbs:'—',fat:'—'};
      qs('#targetKcal',plannerPanel).textContent=t.kcal;
      qs('#targetProtein',plannerPanel).textContent=t.protein;
      qs('#targetCarbs',plannerPanel).textContent=t.carbs;
      qs('#targetFat',plannerPanel).textContent=t.fat;
    };

    // Filters bar
    filterBar.addEventListener('click',e=>{
      const btn=e.target.closest('.chip'); if(!btn) return;
      if(btn.dataset.filter==='ALL'){
        FILTERS.ALL=true;
        ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
        FILTERS.search=''; searchInput.value='';
        FILTERS.Pantry={ active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true };
        updateChipStates(); render(); return;
      }
      const g=btn.dataset.group, v=btn.dataset.value; FILTERS.ALL=false;
      if(FILTERS[g].has(v)) FILTERS[g].delete(v); else FILTERS[g].add(v);
      updateChipStates(); render();
    });

    clearBtn.onclick=()=>{
      FILTERS.ALL=true;
      ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search=''; searchInput.value='';
      FILTERS.Pantry={ active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true };
      updateChipStates(); render();
    };

    searchInput.oninput=()=>{
      FILTERS.ALL=false; FILTERS.search=norm(searchInput.value);
      updateChipStates(); render();
    };
  }

  function updateChipStates(){
    const allBtn=filterBar.querySelector('[data-filter="ALL"]');
    allBtn.setAttribute('aria-pressed', FILTERS.ALL ? 'true':'false');
    qsa('.chip[data-group]').forEach(b=>{
      const g=b.dataset.group, v=b.dataset.value;
      b.setAttribute('aria-pressed', FILTERS[g].has(v) ? 'true':'false');
    });
    clearBtn.hidden = FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active;
  }

  // Init
  function init(){
    // Build dynamic UIs then wire events
    buildPantryUI(); buildPlannerUI(); buildModalUI();
    renderChips(); updateChipStates(); wireEvents(); renderPantryTokens();

    // restore plan
    try{ const saved=JSON.parse(localStorage.getItem('fff_mealplan_v1')||'null'); if(saved){ Object.assign(PLAN,saved); } }catch(_){}
    renderPlan();

    // Fetch recipes (sites path)
    fetch('/sites/assets/data/recipes.json',{cache:'no-store'})
      .then(r=>r.json())
      .then(data=>{
        RECIPES=(Array.isArray(data)?data:(data.recipes||[])).map(r=>{
          r.kcalBand = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
          r.pantryKeys = r.pantryKeys || (r.ingredients||[]).map(i=>norm(i.pantryKey||i.item));
          return r;
        });
        render();
      })
      .catch(err=>{
        console.warn('Could not load recipes.json',err);
        countEl.textContent='No recipes file found. Add /sites/assets/data/recipes.json';
        grid.setAttribute('aria-busy','false');
      });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
