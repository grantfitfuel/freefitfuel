/* FreeFitFuel — Nutrition App (FULL)
   (…header comment unchanged…)
*/
(function () {
  // ---------- Shortcuts ----------
  const qs  = (s, e = document) => e.querySelector(s);
  const qsa = (s, e = document) => Array.from(e.querySelectorAll(s));
  const norm = s => (s || '').toString().trim().toLowerCase();

  // ---------- DOM ----------
  const grid        = qs('#recipeGrid');
  const filterBar   = qs('#filterChips');
  const searchInput = qs('#recipeSearch');
  const countEl     = qs('#recipeCount');
  const clearBtn    = qs('#clearFiltersBtn');

  const pantryPanel   = qs('#panryPanel') || qs('#pantryPanel'); // tolerate typo
  const plannerPanel  = qs('#plannerPanel');
  const modal         = qs('#recipeModal');
  const overlay       = qs('#overlay');
  const printArea     = qs('#printArea');

  const pantryOpenBtn  = qs('#pantryOpenBtn');
  const openPlannerBtn = qs('#openPlannerBtn');

  // Main-page week summary
  const weekSummaryGrid = qs('#weekSummaryGrid');
  const weekAutoBtn     = qs('#weekAutoBtn');
  const weekClearBtn    = qs('#weekClearBtn');

  // ---------- State ----------
  let RECIPES = [];
  let FIRST_SUCCESSFUL_LOAD = false;

  const FILTERS = {
    ALL: false,
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

  const PLAN = { breakfast:[], lunch:[], dinner:[], snack:[] };

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
    all.className='chip'; all.dataset.filter='ALL';
    all.setAttribute('aria-pressed','false');
    all.textContent='ALL'; filterBar.appendChild(all);
    CHIP_GROUPS.filter(g=>g.id!=='ALL').forEach(g=>{
      g.chips.forEach(v=>{
        const b=document.createElement('button');
        b.className='chip'; b.dataset.group=g.id; b.dataset.value=v; b.setAttribute('aria-pressed','false');
        b.textContent=v; filterBar.appendChild(b);
      });
    });
  }
  function hasActiveFilters(){
    if (FILTERS.ALL) return true;
    if (FILTERS.search) return true;
    if (FILTERS.Pantry?.active) return true;
    return ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].some(k=>FILTERS[k]?.size>0);
  }
  function updateChipStates(){
    const all = filterBar && filterBar.querySelector('[data-filter="ALL"]');
    if(all) all.setAttribute('aria-pressed', FILTERS.ALL?'true':'false');
    filterBar && qsa('.chip[data-group]', filterBar).forEach(b=>{
      const g=b.dataset.group, v=b.dataset.value;
      b.setAttribute('aria-pressed', FILTERS[g].has(v)?'true':'false');
    });
    if (clearBtn) clearBtn.style.display = hasActiveFilters() ? 'inline-flex' : 'none';
  }

  // ---------- Pantry UI ----------
  function buildPantry(){
    if(!pantryPanel) return;
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
      b.onclick=()=>{ pantry.set.delete(k); renderPantryTokens();};
      holder.appendChild(b);
    });
  }

  // ---------- Planner (Today + Week) ----------
  function buildPlanner(){
    if(!plannerPanel) return;
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
    if(!plannerPanel) return;
    const s={breakfast:qs('#slot-breakfast',plannerPanel),lunch:qs('#slot-lunch',plannerPanel),
             dinner:qs('#slot-dinner',plannerPanel),snack:qs('#slot-snack',plannerPanel)};
    Object.keys(s).forEach(k=>{
      if(!s[k]) return;
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
    const kEl = qs('#sumKcal',plannerPanel);
    const pEl = qs('#sumP',plannerPanel);
    const cEl = qs('#sumC',plannerPanel);
    const fEl = qs('#sumF',plannerPanel);
    if(kEl) kEl.textContent=Math.round(tk);
    if(pEl) pEl.textContent=`${Math.round(tp)} g`;
    if(cEl) cEl.textContent=`${Math.round(tc)} g`;
    if(fEl) fEl.textContent=`${Math.round(tf)} g`;
  }

  function buildWeekGrid(){
    if(!plannerPanel) return;
    const wrap=qs('#weekGrid',plannerPanel); if(!wrap) return;
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
  }

  // ---------- Week summary on MAIN PAGE ----------
  function renderWeekSummary(){
    if(!weekSummaryGrid) return;
    weekSummaryGrid.innerHTML = DAYS.map((d,di)=>{
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
                    <button class="linkbtn" data-swap-main="${di}:${sl}">Swap</button>
                    <button class="linkbtn" data-wremove-main="${di}:${sl}">Remove</button>
                  </span>
                </div>`
                : `<button class="btn" data-pick-main="${di}:${sl}">Pick</button>`
            }
          </div>
        `;
      }).join('');
      return `<div><h4>${d}</h4>${cells}</div>`;
    }).join('');
  }
  function wireWeekSummaryControls(){
    if(weekAutoBtn) weekAutoBtn.onclick = autoPlanWeek;
    if(weekClearBtn) weekClearBtn.onclick = clearWeek;
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

  // Meal-type utilities
  const MEAL_TYPES = ['Breakfast','Lunch','Dinner','Snack'];
  function normaliseMealWord(s){
    s = (s||'').toString().trim();
    const t = s.toLowerCase();
    if(/breakfast/.test(t)) return 'Breakfast';
    if(/lunch/.test(t))     return 'Lunch';
    if(/dinner|supper|main/.test(t)) return 'Dinner';
    if(/snack/.test(t))     return 'Snack';
    return '';
  }
  function splitPossibleList(x){
    if (Array.isArray(x)) return x;
    if (typeof x === 'string') return x.split(/[,&/|]+/);
    return [];
  }
  function deriveMealTypesFromTags(r){
    const pools = []
      .concat(splitPossibleList(r.tags))
      .concat(r.dietary||[])
      .concat(r.nutritionFocus||[])
      .concat(r.protocols||[])
      .concat(r.costPrep||[])
      .concat(r.costTag?[r.costTag]:[]);
    const set = new Set();
    pools.forEach(v=>{
      const mt = normaliseMealWord(v);
      if (mt) set.add(mt);
    });
    return [...set];
  }

  // === STRICT mapping for planner ===
  function mealTypeForSlot(slot){ return ({breakfast:'Breakfast',lunch:'Lunch',dinner:'Dinner',snack:'Snack'})[slot]||''; }

  // This version ignores global MealType chip when planning
  function collectTagsLower(r){
    const arr = []
      .concat(r.dietary || [])
      .concat(r.nutritionFocus || [])
      .concat(r.protocols || [])
      .concat(r.costPrep || [])
      .concat(r.costTag ? [r.costTag] : [])
      .concat(r.tags || []);
    return new Set(arr.filter(Boolean).map(s => String(s).trim().toLowerCase()));
  }

  function matchesFiltersExceptMealType(r){
    const tags = collectTagsLower(r);
    if(FILTERS.search){
      const hay = `${safeTitle(r)} ${(r.__mealTypes||[]).join(' ')} ${r.mealType||''} ${(r.dietary||[]).join(' ')} ${(r.nutritionFocus||[]).join(' ')} ${(r.protocols||[]).join(' ')} ${(r.ingredients||[]).map(i=>i.item).join(' ')}`.toLowerCase();
      if(!hay.includes(FILTERS.search)) return false;
    }
    if(FILTERS.Dietary.size){
      for(const need of FILTERS.Dietary){ if(!tags.has(String(need).toLowerCase())) return false; }
    }
    if(FILTERS.Nutrition.size){
      if(FILTERS.Nutrition.has('Spicy') && !(r.spiceLevel && r.spiceLevel>=1)) return false;
      for(const t of [...FILTERS.Nutrition]){ if(t==='Spicy') continue; if(!tags.has(String(t).toLowerCase())) return false; }
    }
    if(FILTERS.KcalBand.size){
      const band = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
      if(!band || !FILTERS.KcalBand.has(band)) return false;
    }
    if(FILTERS.Protocols.size){
      for(const p of FILTERS.Protocols){ if(!tags.has(String(p).toLowerCase())) return false; }
    }
    if (FILTERS.Time.size) {
      const ok = [...FILTERS.Time].every(tag => {
        if (tag === '≤15 min') return (r.time_mins || 0) <= 15;
        if (tag === '≤30 min') return (r.time_mins || 0) <= 30;
        if (tag === 'Slow-cook') return r.slowCook === true;
        if (tag === 'No-cook')  return r.noCook === true;
        return true;
      });
      if (!ok) return false;
    }
    if(FILTERS.CostPrep.size){
      const tagsLower = collectTagsLower(r);
      for(const need of FILTERS.CostPrep){
        const n = String(need).toLowerCase();
        if(n === 'low cost / budget'){
          if(!(tagsLower.has('budget') || tagsLower.has('low cost') || tagsLower.has('low cost / budget'))) return false;
        } else if(n === 'budget'){
          if(!tagsLower.has('budget')) return false;
        } else if(n === 'low cost'){
          if(!(tagsLower.has('low cost') || tagsLower.has('low cost / budget') || tagsLower.has('budget'))) return false;
        } else {
          if(!tagsLower.has(n)) return false;
        }
      }
    }
    if(FILTERS.Pantry.active){
      const keys=new Set((r.pantryKeys||[]).map(s=>s.toString().trim().toLowerCase()));
      const have=new Set(FILTERS.Pantry.keys.map(k=>k.toString().trim().toLowerCase()));
      let matched=0; have.forEach(k=>{ if(keys.has(k)) matched++; });
      const total=(r.pantryKeys||[]).length;
      const extrasNeeded=Math.max(0,total-matched);
      const tagsLower=collectTagsLower(r);
      const okBudget = !FILTERS.Pantry.budget || tagsLower.has('budget');
      const okStrict = !FILTERS.Pantry.strict ? (extrasNeeded<=FILTERS.Pantry.extras) : (extrasNeeded===0);
      if(!(okBudget && okStrict)) return false;
      if(FILTERS.Pantry.respectDiet && FILTERS.Dietary.size){
        for(const d of FILTERS.Dietary) if(!tagsLower.has(String(d).toLowerCase())) return false;
      }
    }
    return true;
  }

  function candidatesFor(slot){
    const type = mealTypeForSlot(slot);
    return RECIPES.filter(r =>
      r.__ok &&
      (r.__mealTypes || []).includes(type) &&
      matchesFiltersExceptMealType(r)
    );
  }

  function toPlanItem(r){ return { slug:r.slug, title:safeTitle(r), macros:r.nutritionPerServing||{} }; }
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
    saveWeek(); buildWeekGrid(); renderWeekSummary();
  }
  function swapSlot(dayIndex, slot){
    const used = currentUsedSlugs();
    if(PLAN_WEEK[dayIndex][slot]) used.delete(PLAN_WEEK[dayIndex][slot].slug);
    const next = pickUnique(slot, used);
    if(next){ PLAN_WEEK[dayIndex][slot]=next; saveWeek(); buildWeekGrid(); renderWeekSummary(); }
    else alert('No alternative recipes available for this slot under current filters.');
  }
  function clearWeek(){ for(let i=0;i<PLAN_WEEK.length;i++) SLOTS.forEach(sl=>PLAN_WEEK[i][sl]=null); saveWeek(); buildWeekGrid(); renderWeekSummary(); }

  // ---------- Grid filters (for browsing) ----------
  function matchesFilters(r){
    const tags = collectTagsLower(r);
    if(FILTERS.search){
      const hay = `${safeTitle(r)} ${(r.__mealTypes||[]).join(' ')} ${r.mealType||''} ${(r.dietary||[]).join(' ')} ${(r.nutritionFocus||[]).join(' ')} ${(r.protocols||[]).join(' ')} ${(r.ingredients||[]).map(i=>i.item).join(' ')}`.toLowerCase();
      if(!hay.includes(FILTERS.search)) return false;
    }
    if(FILTERS.MealType.size){
      const wants = new Set([...FILTERS.MealType].map(String));
      const hit = (r.__mealTypes||[]).some(mt => wants.has(mt));
      if(!hit) return false;
    }
    if(FILTERS.Dietary.size){ for(const need of FILTERS.Dietary){ if(!tags.has(String(need).toLowerCase())) return false; } }
    if(FILTERS.Nutrition.size){
      if(FILTERS.Nutrition.has('Spicy') && !(r.spiceLevel && r.spiceLevel>=1)) return false;
      for(const t of [...FILTERS.Nutrition]){ if(t==='Spicy') continue; if(!tags.has(String(t).toLowerCase())) return false; }
    }
    if(FILTERS.KcalBand.size){
      const band = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
      if(!band || !FILTERS.KcalBand.has(band)) return false;
    }
    if(FILTERS.Protocols.size){ for(const p of FILTERS.Protocols){ if(!tags.has(String(p).toLowerCase())) return false; } }
    if (FILTERS.Time.size) {
      const ok = [...FILTERS.Time].every(tag => {
        if (tag === '≤15 min') return (r.time_mins || 0) <= 15;
        if (tag === '≤30 min') return (r.time_mins || 0) <= 30;
        if (tag === 'Slow-cook') return r.slowCook === true;
        if (tag === 'No-cook')  return r.noCook === true;
        return true;
      });
      if (!ok) return false;
    }
    if(FILTERS.CostPrep.size){
      for(const need of FILTERS.CostPrep){
        const n = String(need).toLowerCase();
        if(n === 'low cost / budget'){
          if(!(tags.has('budget') || tags.has('low cost') || tags.has('low cost / budget'))) return false;
        } else if(n === 'budget'){
          if(!(tags.has('budget'))) return false;
        } else if(n === 'low cost'){
          if(!(tags.has('low cost') || tags.has('low cost / budget') || tags.has('budget'))) return false;
        } else {
          if(!tags.has(n)) return false;
        }
      }
    }
    if(FILTERS.Pantry.active){
      const keys=new Set((r.pantryKeys||[]).map(s=>s.toString().trim().toLowerCase()));
      const have=new Set(FILTERS.Pantry.keys.map(k=>k.toString().trim().toLowerCase()));
      let matched=0; have.forEach(k=>{ if(keys.has(k)) matched++; });
      const total=(r.pantryKeys||[]).length;
      const extrasNeeded=Math.max(0,total-matched);
      const okBudget = !FILTERS.Pantry.budget || tags.has('budget');
      const okStrict = !FILTERS.Pantry.strict ? (extrasNeeded<=FILTERS.Pantry.extras) : (extrasNeeded===0);
      if(!(okBudget && okStrict)) return false;
      if(FILTERS.Pantry.respectDiet && FILTERS.Dietary.size){
        for(const d of FILTERS.Dietary) if(!tags.has(String(d).toLowerCase())) return false;
      }
    }
    return true;
  }

  // ---------- Cards / Modal / Print ----------
  function card(r){
    const el=document.createElement('article');
    el.className='card';
    el.innerHTML=`
      <h3 style="margin:.2rem 0 .25rem">${safeTitle(r)}</h3>
      <p class="meta">⏱️ ${r.time_mins||0} min • 🍽️ ${(r.mealType|| (r.__mealTypes||[])[0] || '')} ${r.nutritionPerServing?.kcal?`• 🔥 ${r.nutritionPerServing.kcal} kcal`:''} ${r.spiceLevel?`• ${spiceIcons(r.spiceLevel)}`:''}</p>
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

  function ensureModalTemplate(){
    if(!modal || modal.dataset.wired) return;
    modal.innerHTML = `
      <div class="modal-header">
        <h2 id="recipeTitle"></h2>
        <button id="modalClose" class="btn" type="button" aria-label="Close recipe card">Close</button>
      </div>
      <div class="modal-body">
        <p class="meta" id="recipeMeta"></p>

        <div class="cols">
          <div>
            <h3>Ingredients</h3>
            <ul id="recipeIngredients"></ul>

            <h3>Macros (per serving)</h3>
            <ul id="recipeMacros"></ul>
            <p class="meta" id="recipeAllergens"></p>
          </div>

          <div>
            <h3>Method</h3>
            <ol id="recipeMethod"></ol>

            <h3>Swaps</h3>
            <ul id="recipeSwaps"></ul>

            <p class="meta" id="recipeHydration"></p>
          </div>
        </div>

        <div class="btn-row">
          <button id="modalAddToPlanner" class="btn" type="button">Add to Planner</button>
          <button id="modalPrint" class="btn" type="button">Print</button>
        </div>
      </div>
    `;
    modal.dataset.wired='1';
    const close = () => { try { modal.close(); } catch { modal.classList.remove('fallback-open'); } };
    const closeBtn = modal.querySelector('#modalClose'); if (closeBtn) closeBtn.onclick = close;
  }

  function openModal(r){
    if(!modal) return; ensureModalTemplate();
    const get = (sel) => modal.querySelector(sel);
    const title = get('#recipeTitle'); if (title) title.textContent = safeTitle(r);
    const meta = get('#recipeMeta');
    if (meta) {
      const parts = [];
      parts.push(`${r.time_mins || 0} min`);
      parts.push(`Serves ${r.serves || 1}`);
      parts.push(r.mealType || (r.__mealTypes||[])[0] || '');
      if (r.spiceLevel) {
        const levelText = ['','Mild','Medium','Hot'][r.spiceLevel] || 'Spicy';
        parts.push(`${spiceIcons(r.spiceLevel)} (${levelText})`);
      }
      meta.textContent = parts.filter(Boolean).join(' • ');
    }
    const ing = get('#recipeIngredients');
    if (ing) ing.innerHTML = (r.ingredients || []).map(i => `<li>${i.qty ? `${i.qty} ` : ''}${i.item}</li>`).join('');
    const method = get('#recipeMethod');
    if (method) method.innerHTML = (r.method || []).map(step => `<li>${step}</li>`).join('');
    const n = r.nutritionPerServing || {};
    const macros = get('#recipeMacros');
    if (macros) {
      macros.innerHTML = `
        <li>${n.kcal ?? '—'} kcal</li>
        <li>Protein ${n.protein_g ?? '—'} g</li>
        <li>Carbs ${n.carbs_g ?? '—'} g</li>
        <li>Fat ${n.fat_g ?? '—'} g</li>
        ${n.fibre_g != null ? `<li>Fibre ${n.fibre_g} g</li>` : ''}
        ${n.sugar_g != null ? `<li>Sugar ${n.sugar_g} g</li>` : ''}
        ${n.salt_g  != null ? `<li>Salt ${n.salt_g} g</li>`  : ''}
      `;
    }
    const al = get('#recipeAllergens'); if (al) al.textContent = (r.allergensPresent && r.allergensPresent.length) ? `Allergens: ${r.allergensPresent.join(', ')}` : 'Allergens: none listed';
    const swaps = get('#recipeSwaps'); if (swaps) swaps.innerHTML = (r.swaps || []).map(s => `<li>${s}</li>`).join('');
    const hyd = get('#recipeHydration'); if (hyd) hyd.textContent = r.hydrationTip || '';
    const addBtn = get('#modalAddToPlanner'); if (addBtn) addBtn.onclick = () => addToPlannerPrompt(r);
    const printBtn = get('#modalPrint'); if (printBtn) printBtn.onclick = () => printRecipe(r);
    try { modal.showModal(); } catch { modal.classList.add('fallback-open'); }
  }

  function printRecipe(r){
    if(!printArea) return;
    const n=r.nutritionPerServing||{};
    printArea.innerHTML=`
      <article>
        <h1>${safeTitle(r)}</h1>
        <p>${r.mealType || (r.__mealTypes||[])[0] || ''} • ${r.time_mins||0} min • Serves ${r.serves||1} ${r.spiceLevel?`• ${spiceIcons(r.spiceLevel)}`:''}</p>
        <h2>Ingredients</h2><ul>${(r.ingredients||[]).map(i=>`<li>${i.qty?`${i.qty} `:''}${i.item}</li>`).join('')}</ul>
        <h2>Method</h2><ol>${(r.method||[]).map(s=>`<li>${s}</li>`).join('')}</ol>
        <h2>Macros (per serving)</h2>
        <p>${n.kcal??'—'} kcal • P ${n.protein_g??'—'} g • C ${n.carbs_g??'—'} g • F ${n.fat_g??'—'} g${n.fibre_g!=null?` • Fibre ${n.fibre_g} g`:''}${n.sugar_g!=null?` • Sugar ${n.sugar_g} g`:''}${n.salt_g!=null?` • Salt ${n.salt_g} g`:''}</p>
      </article>`;
    printArea.removeAttribute('hidden'); printArea.style.display='block';
    requestAnimationFrame(()=>requestAnimationFrame(()=>window.print()));
    const cleanup=()=>{ printArea.innerHTML=''; printArea.setAttribute('hidden',''); printArea.style.display=''; window.removeEventListener('afterprint',cleanup); };
    if('onafterprint' in window) window.addEventListener('afterprint',cleanup); else setTimeout(cleanup,500);
  }

  function addToPlannerPrompt(r){
    const slot=(prompt('Add to which meal? (breakfast, lunch, dinner, snack)')||'').trim().toLowerCase();
    if(!['breakfast','lunch','dinner','snack'].includes(slot)) return;
    PLAN[slot].push({slug:r.slug,title:safeTitle(r),macros:r.nutritionPerServing||{}}); renderPlan(); saveToday();
    alert(`Added "${safeTitle(r)}" to ${slot}.`);
  }

  function openPanel(p){ p && p.classList.add('open'); p && p.setAttribute('aria-hidden','false'); overlay && overlay.classList.add('show'); }
  function closePanel(p){ p && p.classList.remove('open'); p && p.setAttribute('aria-hidden','true'); if(!document.querySelector('.panel.open') && overlay) overlay.classList.remove('show'); }

  function render(){
    if(!grid) return;
    if (!hasActiveFilters()) {
      grid.innerHTML = '';
      grid.setAttribute('aria-busy','false');
      if (countEl) countEl.textContent = 'Choose a filter to begin';
      return;
    }
    const list = RECIPES.filter(matchesFilters);
    grid.innerHTML=''; list.forEach(r=>grid.appendChild(card(r)));
    if(countEl) countEl.textContent = `Showing ${list.length} of ${RECIPES.length} recipes`;
    grid.setAttribute('aria-busy','false');
    if (!list.length && RECIPES.length) {
      const note = document.createElement('p'); note.className = 'meta';
      note.textContent = 'No recipes match your filters. Click ALL or Clear filters.'; grid.appendChild(note);
    }
    if (!RECIPES.length) {
      const note = document.createElement('p'); note.className = 'meta';
      note.textContent = 'No recipes loaded yet.'; grid.appendChild(note);
    }
  }

  function exportIndex(){
    const index = RECIPES.map(r => ({
      title: r.title,
      mealTypes: r.__mealTypes || [],
      dietary: r.dietary || [],
      nutritionFocus: r.nutritionFocus || [],
      protocols: r.protocols || [],
      time: r.time_mins ? `${r.time_mins} min` : '',
      cost: r.costTag || '',
      allergens: r.allergensPresent || []
    }));
    const blob = new Blob([JSON.stringify(index, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'recipe-index.json'; a.click();
    URL.revokeObjectURL(url);
  }

  // ---------- Normalisers / guards ----------
  function normalizeMealType(s){ return normaliseMealWord(s); }

  function normalizeMealTypesAny(raw){
    // 1) direct mealType
    const arr = [];
    splitPossibleList(raw).forEach(v => { const mt=normaliseMealWord(v); if(mt) arr.push(mt); });
    return arr;
  }

  function safeTitle(r){
    const t = (r && r.title!=null) ? String(r.title).trim() : '';
    if(t) return t;
    if(r && r.slug) return String(r.slug).replace(/[-_]/g,' ').replace(/\s+/g,' ').trim();
    return 'Untitled';
  }

  function sanitizeRecipe(raw){
    if(!raw || typeof raw!=='object') return null;
    const r = {...raw};
    r.title = safeTitle(r);

    // Build __mealTypes from: mealType (array or string) + tags
    const direct = normalizeMealTypesAny(r.mealType);
    const fromTags = deriveMealTypesFromTags(r);
    const mtSet = new Set([...direct, ...fromTags]);
    // If nothing detected, default to Lunch/Dinner (keeps legacy mains out of Breakfast/Snack)
    if (mtSet.size === 0) { mtSet.add('Lunch'); mtSet.add('Dinner'); }
    r.__mealTypes = [...mtSet];

    // Keep a primary mealType for display
    r.mealType = r.mealType ? normalizeMealType(r.mealType) : r.__mealTypes[0] || '';

    if(!r.slug || !String(r.slug).trim()){
      r.slug = r.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    }

    const kcal = r?.nutritionPerServing?.kcal ?? 0;
    r.kcalBand   = r.kcalBand || (kcal ? (kcal<=400 ? '≤400' : kcal<=600 ? '≤600' : kcal<=800 ? '≤800' : null) : null);
    r.pantryKeys = r.pantryKeys || (Array.isArray(r.ingredients) ? r.ingredients.map(i => {
      const k = i && (i.pantryKey ?? i.item);
      return (k||'').toString().trim().toLowerCase();
    }) : []);

    r.dietary        = Array.isArray(r.dietary) ? r.dietary : [];
    r.costPrep       = Array.isArray(r.costPrep) ? r.costPrep : [];
    r.nutritionFocus = Array.isArray(r.nutritionFocus) ? r.nutritionFocus : [];
    r.protocols      = Array.isArray(r.protocols) ? r.protocols : [];
    r.tags           = Array.isArray(r.tags) ? r.tags : r.tags ? splitPossibleList(r.tags) : [];

    r.__ok = true;
    return r;
  }

  // ---------- Robust loader ----------
  function buildRecipeFileList(){
    const list = [];
    for (let i = 1; i <= 99; i++) list.push(`assets/data/recipes-${i.toString().padStart(2,'0')}.json`);
    list.push('assets/data/recipes.json');
    return list;
  }

  async function fetchWithFallback(path) {
    const tryFetch = async (p) => {
      const res = await fetch(p + (p.includes('?') ? '' : ('?v=' + Date.now())));
      return { res, url: p };
    };
    let attempt = await tryFetch(path);
    if (!attempt.res.ok && attempt.res.status === 404 && !path.startsWith('../')) {
      const fallback = '../' + path;
      console.warn('[FFF] 404 for', path, '→ trying', fallback);
      attempt = await tryFetch(fallback);
    }
    return attempt;
  }

  function safeParseJSON(text, fileLabel){
    try { return JSON.parse(text); }
    catch {
      const looksLikeTwoArrays = /^\s*\[[\s\S]*\]\s*\[[\s\S]*\]\s*$/.test(text);
      const hint = looksLikeTwoArrays
        ? 'Looks like TWO top-level arrays back-to-back. Merge into one array or split into separate files.'
        : 'Invalid JSON (missing comma / trailing comma?).';
      throw new Error(`${fileLabel}: ${hint}`);
    }
  }

  async function loadAllRecipes(files) {
    const results = await Promise.allSettled(
      files.map(async (p) => {
        const { res, url } = await fetchWithFallback(p);
        if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
        const text = await res.text();
        const json = safeParseJSON(text, url);
        return { url, json };
      })
    );

    const ok  = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const bad = results.filter(r => r.status === 'rejected');
    if (bad.length) console.error('[FFF] Failed recipe sources:', bad.map(b=>b.reason && b.reason.message || String(b.reason)));

    const mergedRaw = ok.flatMap(({json}) => Array.isArray(json) ? json : (json.recipes || []));
    const seen = new Set();
    RECIPES = mergedRaw
      .map(sanitizeRecipe)
      .filter(Boolean)
      .filter(r => {
        const key = (r.slug || r.title || '').toString().trim().toLowerCase();
        if(!key || seen.has(key)) return false; seen.add(key); return true;
      });

    // ENRICH (unchanged from previous answer, trimmed for brevity)
    for (const r of RECIPES) {
      const keys = new Set((r.pantryKeys || []).map(k => (k||'').toLowerCase()));
      const allergens = new Set((r.allergensPresent || []).map(a => (a||'').toLowerCase()));
      const text = ((r.title||'')+' '+(r.method||[]).join(' ')+' '+(r.time_label||'')).toLowerCase();
      const add = (arr, tag) => { if (!arr.includes(tag)) arr.push(tag); };
      const hasAny = (set, arr) => arr.some(w => set.has(w));
      if (!hasAny(keys, ['milk','butter','cheese','yoghurt','yogurt','cream','ghee']) && !hasAny(allergens, ['milk'])) add(r.dietary,'Dairy-free');
      if (!hasAny(keys, ['egg','eggs']) && !hasAny(allergens, ['egg','eggs'])) add(r.dietary,'Egg-free');
      const nutWords = ['almond','almonds','walnut','walnuts','hazelnut','hazelnuts','pecan','pecans','cashew','cashews','peanut','peanuts','pistachio','pistachios','nut','nuts'];
      if (!hasAny(keys, nutWords) && !hasAny(allergens, ['nuts','peanuts','tree nuts','walnut','almond','hazelnut','cashew','pecan','pistachio'])) add(r.dietary,'Nut-free');
      if (!hasAny(keys, ['soy','soya','soy sauce','soya sauce','tofu','tempeh','edamame','miso','tamari']) && !hasAny(allergens, ['soy','soya'])) add(r.dietary,'Soy-free');

      const m = text.match(/(\d+(?:\.\d+)?)\s*(h|hr|hrs|hour|hours)\b/);
      const hoursMentioned = m ? parseFloat(m[1]||'0') : 0;
      const heatVerbsRe = /(bake|roast|boil|simmer|sear|fry|pan[-\s]?fry|deep[-\s]?fry|saute|sauté|grill|broil|steam|poach|braise|stew|pressure[-\s]?cook|air[-\s]?fry)/;
      const slowWordsRe = /(slow[-\s]?cook|slow cooker|crock[-\s]?pot|low and slow|braise|stew|pulled|cook on low)/;
      const riskyProteins = ['chicken','beef','pork','lamb','turkey','duck','fish','salmon','tuna','cod','prawns','shrimp','seafood','mince','ground beef','sausage','egg','eggs'];
      const heatStaples = ['rice','pasta','spaghetti','noodles','potato','potatoes','gnocchi','quinoa','lentils','beans (dried)','polenta','couscous (dry)'];
      const usesHeat = heatVerbsRe.test(text);
      const hasRiskyProtein = riskyProteins.some(w => keys.has(w) || text.includes(w));
      const hasHeatStaple = heatStaples.some(w => keys.has(w) || text.includes(w));

      r.slowCook = r.slowCook === true || slowWordsRe.test(text) || (r.time_mins && r.time_mins >= 180) || hoursMentioned >= 3;
      r.noCook = !usesHeat && !hasRiskyProtein && !hasHeatStaple;
      if (r.noCook && !/no[-\s]?cook/i.test(r.time_label||'')) r.time_label = ((r.time_label||'') + ' No-cook').trim();
    }

    // CHIP/DATA compat
    for (const r of RECIPES) {
      const cp = new Set((r.costPrep||[]).map(s=>String(s).trim()));
      if (cp.has('Low cost') && !cp.has('Low cost / Budget')) cp.add('Low cost / Budget');
      if (r.costTag === 'Budget') cp.add('Budget');
      const lowNa = (r.dietary||[]).includes('Low sodium') || (r.protocols||[]).includes('Low sodium');
      if (lowNa){ if(!(r.dietary||[]).includes('Low sodium')) (r.dietary||[]).push('Low sodium'); if(!(r.protocols||[]).includes('Low sodium')) (r.protocols||[]).push('Low sodium'); }
      r.costPrep=[...cp];
    }

    if (!FIRST_SUCCESSFUL_LOAD && RECIPES.length) {
      FIRST_SUCCESSFUL_LOAD = true;
      ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search=''; FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      updateChipStates();
    }

    if (countEl) {
      const from = ok.map(o => o.url);
      countEl.innerHTML = RECIPES.length
        ? `Loaded <strong>${RECIPES.length}</strong> recipes from:<br>${from.map(u=>'• '+u).join('<br>')}`
        : `Loaded 0 recipes. Check JSON structure/paths.<br>Tried:<br>${files.map(f => '• ' + f).join('<br>')}`;
    }

    render();

    if (!RECIPES.length && grid) {
      const help = document.createElement('div');
      help.className = 'meta'; help.style.marginTop = '.5rem';
      help.innerHTML = `
        <p><strong>No recipes loaded.</strong> Quick checks:</p>
        <ul>
          <li>Each file should be <code>[{…},{…}]</code> or <code>{"recipes":[…]}</code>.</li>
          <li>Paths are relative to <code>nutrition.html</code>. The loader also tries <code>../</code> as a fallback.</li>
          <li>No trailing commas or missing commas between objects.</li>
        </ul>`;
      grid.prepend(help);
    }
  }

  // ---------- Wiring ----------
  function wire(){
    pantryOpenBtn && (pantryOpenBtn.onclick=()=>openPanel(pantryPanel));
    openPlannerBtn && (openPlannerBtn.onclick=()=>{ openPanel(plannerPanel); renderPlan(); buildWeekGrid(); });

    overlay && overlay.addEventListener('click', ()=>{ document.querySelectorAll('.panel.open').forEach(p=>closePanel(p)); });

    qs('#pantryCloseBtn',pantryPanel) && (qs('#pantryCloseBtn',pantryPanel).onclick=()=>closePanel(pantryPanel));
    const pantryInput=qs('#pantryInput',pantryPanel);
    pantryInput && pantryInput.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===','){ e.preventDefault();
        pantryInput.value.split(',').map(s=>s.trim()).filter(Boolean).forEach(k=>pantry.set.add(k));
        pantryInput.value=''; renderPantryTokens();
      }
    });
    qs('#pantryFindBtn',pantryPanel) && (qs('#pantryFindBtn',pantryPanel).onclick=()=>{
      FILTERS.Pantry.active=true; FILTERS.Pantry.keys=[...pantry.set];
      FILTERS.Pantry.strict=qs('#pantryStrict',pantryPanel).checked;
      FILTERS.Pantry.extras=+qs('#pantryExtras',pantryPanel).value;
      FILTERS.Pantry.budget=qs('#pantryBudget',pantryPanel).checked;
      FILTERS.Pantry.respectDiet=qs('#pantryRespectDiet',pantryPanel).checked;
      closePanel(pantryPanel); updateChipStates(); render();
    });
    qs('#pantryPlanWeekBtn',pantryPanel) && (qs('#pantryPlanWeekBtn',pantryPanel).onclick=()=>{
      FILTERS.Pantry.active=true; FILTERS.Pantry.keys=[...pantry.set];
      FILTERS.Pantry.strict=false; FILTERS.Pantry.extras=2; FILTERS.Pantry.budget=true;
      autoPlanWeek(); closePanel(pantryPanel); openPanel(plannerPanel); updateChipStates();
    });
    qs('#pantryResetBtn',pantryPanel) && (qs('#pantryResetBtn',pantryPanel).onclick=()=>{
      pantry.set.clear(); renderPantryTokens();
      FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      updateChipStates(); render();
    });

    qs('#plannerCloseBtn',plannerPanel) && (qs('#plannerCloseBtn',plannerPanel).onclick=()=>closePanel(plannerPanel));
    qs('#plannerClearBtn',plannerPanel) && (qs('#plannerClearBtn',plannerPanel).onclick=()=>{ Object.keys(PLAN).forEach(k=>PLAN[k]=[]); renderPlan(); saveToday(); });
    qs('#plannerCopyBtn',plannerPanel) && (qs('#plannerCopyBtn',plannerPanel).onclick=()=>{
      const txt=Object.entries(PLAN).map(([k,arr])=>`${k[0].toUpperCase()+k.slice(1)}:\n`+arr.map(i=>`- ${i.title}`).join('\n')).join('\n\n');
      navigator.clipboard.writeText(txt); alert('Plan copied to clipboard.');
    });
    qs('#plannerPrintBtn',plannerPanel) && (qs('#plannerPrintBtn',plannerPanel).onclick=()=>{
      if(!printArea) return;
      printArea.innerHTML = `<article><h1>Meal Plan — Today</h1>${
        Object.entries(PLAN).map(([k,arr])=>`<h2>${k[0].toUpperCase()+k.slice(1)}</h2><ul>${arr.map(i=>`<li>${i.title}</li>`).join('')||'<li>—</li>'}</ul>`).join('')
      }</article>`;
      printArea.removeAttribute('hidden'); printArea.style.display='block';
      requestAnimationFrame(()=>requestAnimationFrame(()=>window.print()));
      const cleanup=()=>{ printArea.innerHTML=''; printArea.setAttribute('hidden',''); printArea.style.display=''; window.removeEventListener('afterprint',cleanup); };
      if('onafterprint' in window) window.addEventListener('afterprint',cleanup); else setTimeout(cleanup,500);
    });

    if (plannerPanel) {
      plannerPanel.addEventListener('click', (e) => {
        const swapBtn   = e.target.closest('[data-swap]');
        const removeBtn = e.target.closest('[data-wremove]');
        const pickBtn   = e.target.closest('[data-pick]');
        if (swapBtn) { const [di, sl] = swapBtn.dataset.swap.split(':'); swapSlot(+di, sl); return; }
        if (removeBtn) { const [di, sl] = removeBtn.dataset.wremove.split(':'); PLAN_WEEK[+di][sl] = null; saveWeek(); buildWeekGrid(); renderWeekSummary(); return; }
        if (pickBtn) { const [di, sl] = pickBtn.dataset.pick.split(':'); swapSlot(+di, sl); return; }
      });
    }

    if (weekSummaryGrid) {
      weekSummaryGrid.addEventListener('click', (e) => {
        const swapBtn   = e.target.closest('[data-swap-main]');
        const removeBtn = e.target.closest('[data-wremove-main]');
        const pickBtn   = e.target.closest('[data-pick-main]');
        if (swapBtn) { const [di, sl] = swapBtn.dataset.swapMain.split(':'); swapSlot(+di, sl); return; }
        if (removeBtn) { const [di, sl] = removeBtn.dataset.wremoveMain.split(':'); PLAN_WEEK[+di][sl] = null; saveWeek(); buildWeekGrid(); renderWeekSummary(); return; }
        if (pickBtn) { const [di, sl] = pickBtn.dataset.pickMain.split(':'); swapSlot(+di, sl); return; }
      });
    }

    wireWeekSummaryControls();

    filterBar && filterBar.addEventListener('click',e=>{
      const b=e.target.closest('.chip'); if(!b) return;
      if(b.dataset.filter==='ALL'){
        FILTERS.ALL=true;
        ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
        FILTERS.search=''; if(searchInput) searchInput.value='';
        FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
        updateChipStates(); render(); return;
      }
      const g=b.dataset.group, v=b.dataset.value; FILTERS.ALL=false;
      (FILTERS[g].has(v)? FILTERS[g].delete(v) : FILTERS[g].add(v));
      updateChipStates(); render();
    });

    clearBtn && (clearBtn.onclick=()=>{
      FILTERS.ALL=false;
      ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search=''; if(searchInput) searchInput.value='';
      FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      updateChipStates(); render();
    });

    searchInput && (searchInput.oninput=()=>{ FILTERS.ALL=false; FILTERS.search=norm(searchInput.value); updateChipStates(); render(); });
  }

  // ---------- Boot ----------
  function init(){
    if(!grid) return;
    renderChips(); updateChipStates();
    buildPantry(); buildPlanner(); renderPantryTokens();
    loadToday(); renderPlan();
    loadWeek();  buildWeekGrid(); renderWeekSummary();
    wireWeekSummaryControls();
    wire();
    const exportBtn = qs('#exportIndexBtn'); exportBtn && exportBtn.addEventListener('click', exportIndex);
    if (countEl) countEl.textContent = 'Choose a filter to begin';
    if (clearBtn) clearBtn.style.display = 'none';
    const recipeFiles = buildRecipeFileList();
    loadAllRecipes(recipeFiles);
  }
  document.addEventListener('DOMContentLoaded', init);
})();
