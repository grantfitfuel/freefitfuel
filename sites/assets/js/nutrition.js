/* Nutrition JS — full replacement
   - Data path: assets/data/recipes.json
   - Tiles: no images
   - Modal: no image
   - Print: no image (relies on print CSS)
   - Planner: Today + Week (Mon–Sun), no duplicates, Swap/Remove
*/

(function () {
  // ---------- Shortcuts ----------
  const qs=(s,e=document)=>e.querySelector(s);
  const qsa=(s,e=document)=>Array.from(e.querySelectorAll(s));
  const norm=s=>(s||'').toString().trim().toLowerCase();

  // ---------- DOM ----------
  const grid        = qs('#recipeGrid');
  const filterBar   = qs('#filterChips');
  const searchInput = qs('#recipeSearch');
  const countEl     = qs('#recipeCount');
  const clearBtn    = qs('#clearFiltersBtn');

  const pantryPanel   = qs('#pantryPanel');
  const plannerPanel  = qs('#plannerPanel');
  const modal         = qs('#recipeModal');
  const overlay       = qs('#overlay');
  const printArea     = qs('#printArea');

  const pantryOpenBtn  = qs('#pantryOpenBtn');
  const openPlannerBtn = qs('#openPlannerBtn');

  // ---------- State ----------
  let RECIPES = [];

  const FILTERS = {
    ALL: true,
    search: '',
    MealType: new Set(),
    Dietary: new Set(),
    Nutrition: new Set(),
    KcalBand: new Set(),
    Protocols: new Set(),
    Time: new Set(),
    CostPrep: new Set(),
    Pantry: { active:false, keys:[], strict:false, extras:2, budget:false, respectDiet:true }
  };

  // Today planner (simple)
  const PLAN = { breakfast:[], lunch:[], dinner:[], snack:[] };

  // Week planner (7 days x 4 slots; each is null or {slug,title,macros})
  const DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const SLOTS = ['breakfast','lunch','dinner','snack'];
  const PLAN_WEEK = DAYS.map(()=>({ breakfast:null, lunch:null, dinner:null, snack:null }));

  // ---------- Filters / Chips ----------
  const CHIP_GROUPS = [
    {id:'ALL',label:'ALL',type:'solo'},
    {id:'MealType',label:'Meal Type',chips:['Breakfast','Lunch','Dinner','Snack']},
    {id:'Dietary',label:'Dietary',chips:['Vegetarian','Vegan','Gluten-free','Dairy-free','Nut-free','Egg-free','Soy-free']},
    {id:'Nutrition',label:'Nutrition Focus',chips:['High protein','High carb / Endurance','Low carb','High fibre','Spicy']},
    {id:'KcalBand',label:'Low calorie',chips:['≤400','≤600','≤800']},
    {id:'Protocols',label:'Protocols',chips:['Low FODMAP','Low sodium']},
    {id:'Time',label:'Time',chips:['≤15 min','≤30 min','Slow-cook','No-cook']},
    {id:'CostPrep',label:'Cost/Prep',chips:['Low cost / Budget','Batch-cook','Freezer-friendly','One-pan','Air-fryer']}
  ];

  function renderChips(){
    if(!filterBar) return;
    filterBar.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'chip'; all.dataset.filter='ALL';
    all.setAttribute('aria-pressed','true'); all.textContent='ALL';
    filterBar.appendChild(all);

    CHIP_GROUPS.filter(g=>g.id!=='ALL').forEach(g=>{
      g.chips.forEach(v=>{
        const b=document.createElement('button');
        b.className='chip'; b.dataset.group=g.id; b.dataset.value=v; b.setAttribute('aria-pressed','false');
        b.textContent=v; filterBar.appendChild(b);
      });
    });
  }

  function updateChipStates(){
    const all = filterBar.querySelector('[data-filter="ALL"]');
    if(all) all.setAttribute('aria-pressed', FILTERS.ALL?'true':'false');
    qsa('.chip[data-group]', filterBar).forEach(b=>{
      const g=b.dataset.group, v=b.dataset.value;
      b.setAttribute('aria-pressed', FILTERS[g].has(v)?'true':'false');
    });
    clearBtn.style.display = (FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active) ? 'none' : 'inline-flex';
  }

  // ---------- Pantry UI ----------
  function buildPantry(){
    pantryPanel.innerHTML = `
      <div class="panel-header"><h2>Pantry</h2><button id="pantryCloseBtn" class="btn">Close</button></div>
      <div class="wrap" style="padding:12px 16px">
        <label for="pantryInput">Type what you’ve got</label>
        <input id="pantryInput" class="input" placeholder="e.g., rice, pasta, tinned tomatoes…">
        <p class="meta">Tip: press Enter or comma to add items as tokens.</p>
        <div id="pantryTokens" class="mini-nav" aria-label="Your pantry items"></div>

        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin:.5rem 0 .6rem">
          <label><input type="checkbox" id="pantryStrict"> Only use my pantry</label>
          <label>Allow up to <select id="pantryExtras"><option>0</option><option>1</option><option selected>2</option><option>3</option></select> extras</label>
          <label><input type="checkbox" id="pantryBudget"> Budget only</label>
          <label><input type="checkbox" id="pantryRespectDiet" checked> Respect dietary filters</label>
        </div>

        <div style="display:flex;gap:.6rem;margin-top:.6rem;flex-wrap:wrap">
          <button id="pantryFindBtn" class="btn">Find recipes</button>
          <button id="pantryPlanWeekBtn" class="btn">Auto-plan cheap week</button>
          <button id="pantryResetBtn" class="btn">Reset Pantry</button>
        </div>
      </div>
    `;
  }
  const pantry = { set:new Set() };
  function renderPantryTokens(){
    const holder=qs('#pantryTokens',pantryPanel); if(!holder) return;
    holder.innerHTML=''; [...pantry.set].forEach(k=>{
      const b=document.createElement('button');
      b.className='chip'; b.textContent=k; b.setAttribute('aria-pressed','true');
      b.onclick=()=>{ pantry.set.delete(k); renderPantryTokens(); };
      holder.appendChild(b);
    });
  }

  // ---------- Planner (Today + Week) ----------
  function buildPlanner(){
    plannerPanel.innerHTML = `
      <div class="panel-header"><h2>Meal Planner</h2><button id="plannerCloseBtn" class="btn">Close</button></div>
      <div class="wrap" style="padding:12px 16px">
        <h3>Today</h3>
        <div id="dayGrid" class="grid" style="grid-template-columns:repeat(2,1fr)">
          <div><h4>Breakfast</h4><div id="slot-breakfast"></div></div>
          <div><h4>Lunch</h4><div id="slot-lunch"></div></div>
          <div><h4>Dinner</h4><div id="slot-dinner"></div></div>
          <div><h4>Snack</h4><div id="slot-snack"></div></div>
        </div>
        <p class="meta" aria-live="polite">Total kcal: <span id="sumKcal">0</span> • P <span id="sumP">0 g</span> • C <span id="sumC">0 g</span> • F <span id="sumF">0 g</span></p>
        <div style="display:flex;gap:.6rem;margin-bottom:1rem;flex-wrap:wrap">
          <button id="plannerClearBtn" class="btn">Clear day</button>
          <button id="plannerCopyBtn" class="btn">Copy</button>
          <button id="plannerPrintBtn" class="btn">Print</button>
        </div>

        <h3>Plan for the Week</h3>
        <div style="display:flex;gap:.6rem;margin:.4rem 0 .6rem;flex-wrap:wrap">
          <button id="autoWeekBtn" class="btn">Auto-plan Week (no duplicates)</button>
          <button id="clearWeekBtn" class="btn">Clear week</button>
        </div>

        <div id="weekGrid" class="grid" style="grid-template-columns:repeat(4,1fr)"></div>
      </div>`;
  }

  function renderPlan(){
    const s={breakfast:qs('#slot-breakfast',plannerPanel),lunch:qs('#slot-lunch',plannerPanel),
             dinner:qs('#slot-dinner',plannerPanel),snack:qs('#slot-snack',plannerPanel)};
    Object.keys(s).forEach(k=>{
      s[k].innerHTML = PLAN[k].map((it,i)=>`
        <div class="badge" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin:.25rem 0;">
          <span>${it.title}</span>
          <button class="linkbtn" data-remove="${k}:${i}">remove</button>
        </div>
      `).join('') || '<span class="meta">—</span>';
    });
    qsa('[data-remove]', plannerPanel).forEach(b=>b.onclick=()=>{
      const [slot,idx]=b.dataset.remove.split(':'); PLAN[slot].splice(+idx,1); renderPlan(); saveToday();
    });

    let tk=0,tp=0,tc=0,tf=0;
    Object.values(PLAN).flat().forEach(it=>{
      tk+=(+it.macros.kcal||0); tp+=(+it.macros.protein_g||0); tc+=(+it.macros.carbs_g||0); tf+=(+it.macros.fat_g||0);
    });
    qs('#sumKcal',plannerPanel).textContent=Math.round(tk);
    qs('#sumP',plannerPanel).textContent=`${Math.round(tp)} g`;
    qs('#sumC',plannerPanel).textContent=`${Math.round(tc)} g`;
    qs('#sumF',plannerPanel).textContent=`${Math.round(tf)} g`;
  }

  function buildWeekGrid(){
    const wrap=qs('#weekGrid',plannerPanel);
    wrap.innerHTML = DAYS.map((d,di)=>{
      const day=PLAN_WEEK[di];
      const cells = SLOTS.map(sl=>{
        const it=day[sl];
        return `
          <div style="border:1px solid var(--stroke);border-radius:10px;padding:.5rem;margin:.2rem">
            <div class="meta" style="margin-bottom:.25rem"><strong>${sl[0].toUpperCase()+sl.slice(1)}</strong></div>
            ${
              it ? `
                <div class="badge" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem">
                  <span>${it.title}</span>
                  <span>
                    <button class="linkbtn" data-swap="${di}:${sl}">Swap</button>
                    <button class="linkbtn" data-wremove="${di}:${sl}">Remove</button>
                  </span>
                </div>`
                : `<button class="btn" data-pick="${di}:${sl}">Pick</button>`
            }
          </div>
        `;
      }).join('');
      return `<div><h4>${d}</h4>${cells}</div>`;
    }).join('');

    // Wire week actions
    qsa('[data-swap]', plannerPanel).forEach(b=>b.onclick=()=>{
      const [di,sl]=b.dataset.swap.split(':'); swapSlot(+di, sl);
    });
    qsa('[data-wremove]', plannerPanel).forEach(b=>b.onclick=()=>{
      const [di,sl]=b.dataset.wremove.split(':'); PLAN_WEEK[+di][sl]=null; saveWeek(); buildWeekGrid();
    });
    qsa('[data-pick]', plannerPanel).forEach(b=>b.onclick=()=>{
      const [di,sl]=b.dataset.pick.split(':'); swapSlot(+di, sl);
    });
  }

  function saveToday(){ localStorage.setItem('fff_mealplan_today_v1', JSON.stringify(PLAN)); }
  function loadToday(){
    try{ const t=JSON.parse(localStorage.getItem('fff_mealplan_today_v1')||'null'); if(t) Object.assign(PLAN,t); }catch(_){}
  }
  function saveWeek(){ localStorage.setItem('fff_mealplan_week_v1', JSON.stringify(PLAN_WEEK)); }
  function loadWeek(){
    try{
      const w=JSON.parse(localStorage.getItem('fff_mealplan_week_v1')||'null');
      if(Array.isArray(w) && w.length===7){ for(let i=0;i<7;i++) PLAN_WEEK[i]=Object.assign({breakfast:null,lunch:null,dinner:null,snack:null}, w[i]); }
    }catch(_){}
  }

  // ---------- Helpers ----------
  function spiceIcons(n){ n=+n||0; return n? '🌶️'.repeat(Math.max(1,Math.min(3,n))) : ''; }
  function kcalBand(k){ if(k<=400)return '≤400'; if(k<=600)return '≤600'; if(k<=800)return '≤800'; return null; }

  function mealTypeForSlot(slot){ return ({breakfast:'Breakfast',lunch:'Lunch',dinner:'Dinner',snack:'Snack'})[slot]||''; }
  function candidatesFor(slot){
    const type = mealTypeForSlot(slot);
    return RECIPES.filter(r => (!type || r.mealType===type) && matchesFilters(r));
  }
  function toPlanItem(r){ return { slug:r.slug, title:r.title, macros:r.nutritionPerServing||{} }; }
  function currentUsedSlugs(){
    const used=new Set(); PLAN_WEEK.forEach(day=>SLOTS.forEach(sl=>{ if(day[sl]) used.add(day[sl].slug); })); return used;
  }
  function pickUnique(slot, avoid){
    const pool = candidatesFor(slot).filter(r=>!avoid.has(r.slug));
    if(!pool.length) return null;
    const i = Math.floor(Math.random()*pool.length);
    return toPlanItem(pool[i]);
  }
  function autoPlanWeek(){
    const used = currentUsedSlugs();
    for(let d=0; d<DAYS.length; d++){
      for(const sl of SLOTS){
        if(!PLAN_WEEK[d][sl]){
          const p = pickUnique(sl, used);
          if(p){ PLAN_WEEK[d][sl]=p; used.add(p.slug); }
        }
      }
    }
    saveWeek(); buildWeekGrid();
  }
  function swapSlot(dayIndex, slot){
    const used = currentUsedSlugs();
    if(PLAN_WEEK[dayIndex][slot]) used.delete(PLAN_WEEK[dayIndex][slot].slug);
    const next = pickUnique(slot, used);
    if(next){ PLAN_WEEK[dayIndex][slot]=next; saveWeek(); buildWeekGrid(); }
    else alert('No alternative recipes available for this slot under current filters.');
  }
  function clearWeek(){ for(let i=0;i<PLAN_WEEK.length;i++) SLOTS.forEach(sl=>PLAN_WEEK[i][sl]=null); saveWeek(); buildWeekGrid(); }

  // ---------- Matching ----------
  function matchesFilters(r){
    // search
    if(FILTERS.search){
      const hay = `${r.title} ${r.mealType} ${(r.dietary||[]).join(' ')} ${(r.nutritionFocus||[]).join(' ')} ${(r.protocols||[]).join(' ')} ${(r.ingredients||[]).map(i=>i.item).join(' ')}`.toLowerCase();
      if(!hay.includes(FILTERS.search)) return false;
    }
    // groups
    if(FILTERS.MealType.size && !FILTERS.MealType.has(r.mealType)) return false;

    if(FILTERS.Dietary.size){
      const have = new Set(r.dietary||[]);
      for(const need of FILTERS.Dietary) if(!have.has(need)) return false;
    }

    if(FILTERS.Nutrition.size){
      const wantSpicy = FILTERS.Nutrition.has('Spicy');
      if(wantSpicy && !(r.spiceLevel && r.spiceLevel>=1)) return false;
      const need = new Set([...FILTERS.Nutrition].filter(x=>x!=='Spicy'));
      const have = new Set(r.nutritionFocus||[]);
      for(const tag of need) if(!have.has(tag)) return false;
    }

    if(FILTERS.KcalBand.size){
      const band = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
      if(!band || !FILTERS.KcalBand.has(band)) return false;
    }

    if(FILTERS.Protocols.size){
      const have = new Set(r.protocols||[]);
      for(const need of FILTERS.Protocols) if(!have.has(need)) return false;
    }

    if(FILTERS.Time.size){
      const t=r.time_mins||0, label=(r.time_label||'').toLowerCase();
      const ok=[...FILTERS.Time].every(tag=>{
        if(tag==='≤15 min') return t<=15;
        if(tag==='≤30 min') return t<=30;
        if(tag==='Slow-cook') return r.slowCook===true || label.includes('slow');
        if(tag==='No-cook')  return t===0 || label.includes('no-cook');
        return true;
      });
      if(!ok) return false;
    }

    if(FILTERS.CostPrep.size){
      const needsBudget = FILTERS.CostPrep.has('Low cost / Budget');
      if(needsBudget && r.costTag!=='Budget') return false;
      const other = new Set([...FILTERS.CostPrep].filter(x=>x!=='Low cost / Budget'));
      const tags  = new Set([...(r.costPrep||[]), r.costTag].filter(Boolean));
      for(const tag of other) if(!tags.has(tag)) return false;
    }

    // Pantry
    if(FILTERS.Pantry.active){
      const keys=new Set((r.pantryKeys||[]).map(norm));
      const have=new Set(FILTERS.Pantry.keys.map(norm));
      let matched=0; have.forEach(k=>{ if(keys.has(k)) matched++; });
      const total=(r.pantryKeys||[]).length;
      const extrasNeeded=Math.max(0,total-matched);
      const okBudget=!FILTERS.Pantry.budget || r.costTag==='Budget';
      const okStrict = !FILTERS.Pantry.strict ? (extrasNeeded<=FILTERS.Pantry.extras) : (extrasNeeded===0);
      if(!(okBudget && okStrict)) return false;
      if(FILTERS.Pantry.respectDiet && FILTERS.Dietary.size){
        const haveDiet=new Set(r.dietary||[]); for(const d of FILTERS.Dietary) if(!haveDiet.has(d)) return false;
      }
    }

    return true;
  }

  // ---------- Cards / Modal / Print ----------
  function card(r){
    const el=document.createElement('article');
    el.className='card';
    el.innerHTML=`
      <h3 style="margin:.2rem 0 .25rem">${r.title}</h3>
      <p class="meta">⏱️ ${r.time_mins||0} min • 🍽️ ${r.mealType||''} ${r.nutritionPerServing?.kcal?`• 🔥 ${r.nutritionPerServing.kcal} kcal`:''} ${r.spiceLevel?`• ${spiceIcons(r.spiceLevel)}`:''}</p>
      <div class="mini-nav" style="gap:.3rem;margin:.25rem 0 .5rem">
        ${r.costTag?`<span class="chip" aria-pressed="false">${r.costTag}</span>`:''}
        ${(r.dietary||[]).map(t=>`<span class="chip" aria-pressed="false">${t}</span>`).join('')}
        ${(r.nutritionFocus||[]).map(t=>`<span class="chip" aria-pressed="false">${t}</span>`).join('')}
      </div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <button class="btn" data-action="view">View Recipe Card</button>
        <button class="btn" data-action="print">Print Recipe Card</button>
        <button class="btn" data-action="add">Add to Planner</button>
      </div>
    `;
    el.querySelector('[data-action="view"]').onclick=()=>openModal(r);
    el.querySelector('[data-action="print"]').onclick=()=>printRecipe(r);
    el.querySelector('[data-action="add"]').onclick=()=>addToPlannerPrompt(r);
    return el;
  }

  function openModal(r){
    const get=id=>qs(id,modal);
    // Hide hero image entirely (as requested)
    const img = get('#modalImage'); if(img) img.style.display='none';

    get('#recipeTitle').textContent=r.title;
    get('#recipeServes').textContent=r.serves||1;
    get('#recipeTime').textContent=`${r.time_mins||0} min`;
    get('#recipeSpice').textContent=r.spiceLevel? `${spiceIcons(r.spiceLevel)} (${['','Mild','Medium','Hot'][r.spiceLevel]||'Spicy'})` : '';
    get('#recipeIngredients').innerHTML=(r.ingredients||[]).map(i=>`<li>${i.qty?`${i.qty} `:''}${i.item}</li>`).join('');
    get('#recipeMethod').innerHTML=(r.method||[]).map(s=>`<li>${s}</li>`).join('');
    if(r.nutritionPerServing){
      const n=r.nutritionPerServing;
      get('#recipeMacros').innerHTML=`<li>${n.kcal} kcal</li><li>Protein ${n.protein_g} g</li><li>Carbs ${n.carbs_g} g</li><li>Fat ${n.fat_g} g</li>${n.fibre_g!=null?`<li>Fibre ${n.fibre_g} g</li>`:''}${n.sugar_g!=null?`<li>Sugar ${n.sugar_g} g</li>`:''}${n.salt_g!=null?`<li>Salt ${n.salt_g} g</li>`:''}`;
    } else get('#recipeMacros').innerHTML='<li>—</li>';
    get('#recipeAllergens').textContent=(r.allergensPresent&&r.allergensPresent.length)?`Allergens: ${r.allergensPresent.join(', ')}`:'Allergens: none listed';
    get('#recipeSwaps').innerHTML=(r.swaps||[]).map(s=>`<li>${s}</li>`).join('');
    get('#recipeHydration').textContent=r.hydrationTip||'';
    get('#modalAddToPlanner').onclick=()=>addToPlannerPrompt(r);
    get('#modalPrint').onclick=()=>printRecipe(r);
    get('#modalClose').onclick=()=>modal.close();
    modal.showModal();
  }

  function printRecipe(r){
    const n=r.nutritionPerServing||{};
    printArea.innerHTML=`
      <article>
        <h1>${r.title}</h1>
        <p>${r.mealType||''} • ${r.time_mins||0} min • Serves ${r.serves||1} ${r.spiceLevel?`• ${spiceIcons(r.spiceLevel)}`:''}</p>
        <h2>Ingredients</h2><ul>${(r.ingredients||[]).map(i=>`<li>${i.qty?`${i.qty} `:''}${i.item}</li>`).join('')}</ul>
        <h2>Method</h2><ol>${(r.method||[]).map(s=>`<li>${s}</li>`).join('')}</ol>
        <h2>Macros (per serving)</h2>
        <p>${n.kcal??'—'} kcal • P ${n.protein_g??'—'} g • C ${n.carbs_g??'—'} g • F ${n.fat_g??'—'} g${n.fibre_g!=null?` • Fibre ${n.fibre_g} g`:''}${n.sugar_g!=null?` • Sugar ${n.sugar_g} g`:''}${n.salt_g!=null?` • Salt ${n.salt_g} g`:''}</p>
      </article>`;
    // ensure visible for print snapshot
    printArea.removeAttribute('hidden'); printArea.style.display='block';
    const doPrint=()=>window.print();
    requestAnimationFrame(()=>requestAnimationFrame(doPrint));
    const cleanup=()=>{ printArea.innerHTML=''; printArea.setAttribute('hidden',''); printArea.style.display=''; window.removeEventListener('afterprint',cleanup); };
    if('onafterprint' in window) window.addEventListener('afterprint',cleanup); else setTimeout(cleanup,500);
  }

  // ---------- Add to Today ----------
  function addToPlannerPrompt(r){
    const slot=(prompt('Add to which meal? (breakfast, lunch, dinner, snack)')||'').trim().toLowerCase();
    if(!['breakfast','lunch','dinner','snack'].includes(slot)) return;
    PLAN[slot].push({slug:r.slug,title:r.title,macros:r.nutritionPerServing||{}}); renderPlan(); saveToday();
    alert(`Added "${r.title}" to ${slot}.`);
  }

  // ---------- Panels / Overlay ----------
  function openPanel(p){ p.classList.add('open'); p.setAttribute('aria-hidden','false'); overlay.classList.add('show'); }
  function closePanel(p){ p.classList.remove('open'); p.setAttribute('aria-hidden','true'); if(!document.querySelector('.panel.open')) overlay.classList.remove('show'); }

  // ---------- Render grid ----------
  function render(){
    const list = RECIPES.filter(matchesFilters);
    grid.innerHTML=''; list.forEach(r=>grid.appendChild(card(r)));
    countEl.textContent = `Showing ${list.length} of ${RECIPES.length} recipes`;
    grid.setAttribute('aria-busy','false');
  }

  // ---------- Wiring ----------
  function wire(){
    // Top buttons
    pantryOpenBtn.onclick=()=>openPanel(pantryPanel);
    openPlannerBtn .onclick=()=>{ openPanel(plannerPanel); renderPlan(); buildWeekGrid(); };

    overlay.addEventListener('click', ()=>{ document.querySelectorAll('.panel.open').forEach(p=>closePanel(p)); });

    // Pantry logic
    qs('#pantryCloseBtn',pantryPanel).onclick=()=>closePanel(pantryPanel);
    const pantryInput=qs('#pantryInput',pantryPanel);
    pantryInput.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===','){ e.preventDefault();
        pantryInput.value.split(',').map(s=>s.trim()).filter(Boolean).forEach(k=>pantry.set.add(k));
        pantryInput.value=''; renderPantryTokens();
      }
    });
    qs('#pantryFindBtn',pantryPanel).onclick=()=>{
      FILTERS.Pantry.active=true; FILTERS.Pantry.keys=[...pantry.set];
      FILTERS.Pantry.strict=qs('#pantryStrict',pantryPanel).checked;
      FILTERS.Pantry.extras=+qs('#pantryExtras',pantryPanel).value;
      FILTERS.Pantry.budget=qs('#pantryBudget',pantryPanel).checked;
      FILTERS.Pantry.respectDiet=qs('#pantryRespectDiet',pantryPanel).checked;
      closePanel(pantryPanel); render();
    };
    qs('#pantryPlanWeekBtn',pantryPanel).onclick=()=>{
      FILTERS.Pantry.active=true; FILTERS.Pantry.keys=[...pantry.set];
      FILTERS.Pantry.strict=false; FILTERS.Pantry.extras=2; FILTERS.Pantry.budget=true;
      autoPlanWeek(); closePanel(pantryPanel); openPanel(plannerPanel);
    };
    qs('#pantryResetBtn',pantryPanel).onclick=()=>{
      pantry.set.clear(); renderPantryTokens();
      FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      render();
    };

    // Planner today
    qs('#plannerCloseBtn',plannerPanel).onclick=()=>closePanel(plannerPanel);
    qs('#plannerClearBtn',plannerPanel).onclick=()=>{ Object.keys(PLAN).forEach(k=>PLAN[k]=[]); renderPlan(); saveToday(); };
    qs('#plannerCopyBtn',plannerPanel).onclick=()=>{
      const txt=Object.entries(PLAN).map(([k,arr])=>`${k[0].toUpperCase()+k.slice(1)}:\n`+arr.map(i=>`- ${i.title}`).join('\n')).join('\n\n');
      navigator.clipboard.writeText(txt); alert('Plan copied to clipboard.');
    };
    qs('#plannerPrintBtn',plannerPanel).onclick=()=>{
      printArea.innerHTML = `<article><h1>Meal Plan — Today</h1>${
        Object.entries(PLAN).map(([k,arr])=>`<h2>${k[0].toUpperCase()+k.slice(1)}</h2><ul>${arr.map(i=>`<li>${i.title}</li>`).join('')||'<li>—</li>'}</ul>`).join('')
      }</article>`;
      printArea.removeAttribute('hidden'); printArea.style.display='block';
      requestAnimationFrame(()=>requestAnimationFrame(()=>window.print()));
      const cleanup=()=>{ printArea.innerHTML=''; printArea.setAttribute('hidden',''); printArea.style.display=''; window.removeEventListener('afterprint',cleanup); };
      if('onafterprint' in window) window.addEventListener('afterprint',cleanup); else setTimeout(cleanup,500);
    };

    // Week planner
    qs('#autoWeekBtn',plannerPanel).onclick=autoPlanWeek;
    qs('#clearWeekBtn',plannerPanel).onclick=clearWeek;

    // Filters
    filterBar.addEventListener('click',e=>{
      const b=e.target.closest('.chip'); if(!b) return;
      if(b.dataset.filter==='ALL'){
        FILTERS.ALL=true; ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
        FILTERS.search=''; searchInput.value=''; FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
        updateChipStates(); render(); return;
      }
      const g=b.dataset.group, v=b.dataset.value; FILTERS.ALL=false;
      (FILTERS[g].has(v)? FILTERS[g].delete(v) : FILTERS[g].add(v));
      updateChipStates(); render();
    });
    clearBtn.onclick=()=>{
      FILTERS.ALL=true; ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search=''; searchInput.value=''; FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      updateChipStates(); render();
    };
    searchInput.oninput=()=>{ FILTERS.ALL=false; FILTERS.search=norm(searchInput.value); updateChipStates(); render(); };
  }

  // ---------- Boot ----------
  function init(){
    if(!grid) return;
    renderChips(); updateChipStates();
    buildPantry(); buildPlanner(); renderPantryTokens();

    // restore plans
    loadToday(); renderPlan();
    loadWeek();  buildWeekGrid();

    // fetch data
    fetch('assets/data/recipes.json', {cache:'no-store'})
      .then(r=>r.json())
      .then(data=>{
        RECIPES=(Array.isArray(data)?data:(data.recipes||[])).map(r=>{
          r.kcalBand = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
          r.pantryKeys = r.pantryKeys || (r.ingredients||[]).map(i=>norm(i.pantryKey||i.item));
          return r;
        });
        render(); wire();
      })
      .catch(()=>{ countEl.textContent='No recipes file found. Add assets/data/recipes.json'; grid.setAttribute('aria-busy','false'); wire(); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
