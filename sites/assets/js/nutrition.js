/* Nutrition JS (Endurance-style paths)
   Data: assets/data/recipes.json
*/
(function () {
  const qs=(s,e=document)=>e.querySelector(s), qsa=(s,e=document)=>Array.from(e.querySelectorAll(s));
  const norm=s=>(s||'').toString().trim().toLowerCase();

  // Hooks
  const filterBar=qs('#filterChips'), searchInput=qs('#recipeSearch'), grid=qs('#recipeGrid');
  const countEl=qs('#recipeCount'), clearBtn=qs('#clearFiltersBtn');
  const pantryPanel=qs('#pantryPanel'), plannerPanel=qs('#plannerPanel'), modal=qs('#recipeModal');
  const printArea=qs('#printArea'), overlay=qs('#overlay');
  const pantryOpenBtn=qs('#pantryOpenBtn'), openPlannerBtn=qs('#openPlannerBtn');

  // State
  let RECIPES=[]; const PLAN={ breakfast:[], lunch:[], dinner:[], snack:[] };
  let FILTERS={ ALL:true, search:'', MealType:new Set(), Dietary:new Set(), Nutrition:new Set(),
    KcalBand:new Set(), Protocols:new Set(), Time:new Set(), CostPrep:new Set(),
    Pantry:{active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true} };

  const GOALS={'Maintain':{kcal:'TDEE',protein:'1.4–1.8 g/kg',carbs:'45–55%',fat:'25–30%'},
               'Cut':{kcal:'TDEE −15–20%',protein:'1.8–2.2 g/kg',carbs:'30–40%',fat:'25–30%'},
               'Build/Bulk':{kcal:'TDEE +10–20%',protein:'1.6–2.0 g/kg',carbs:'50–60%',fat:'20–25%'},
               'Transform':{kcal:'≈TDEE',protein:'2.0–2.4 g/kg',carbs:'35–45%',fat:'25–30%'}};
  const CHIP_GROUPS=[
    {id:'ALL',label:'ALL',type:'solo'},
    {id:'MealType',label:'Meal Type',chips:['Breakfast','Lunch','Dinner','Snack']},
    {id:'Dietary',label:'Dietary',chips:['Vegetarian','Vegan','Gluten-free','Dairy-free','Nut-free','Egg-free','Soy-free']},
    {id:'Nutrition',label:'Nutrition Focus',chips:['High protein','High carb / Endurance','Low carb','High fibre','Spicy']},
    {id:'KcalBand',label:'Low calorie',chips:['≤400','≤600','≤800']},
    {id:'Protocols',label:'Protocols',chips:['Low FODMAP','Low sodium']},
    {id:'Time',label:'Time',chips:['≤15 min','≤30 min','Slow-cook','No-cook']},
    {id:'CostPrep',label:'Cost/Prep',chips:['Low cost / Budget','Batch-cook','Freezer-friendly','One-pan','Air-fryer']}
  ];

  // Build dynamic UIs
  function buildPantry(){ pantryPanel.innerHTML=`
      <div class="panel-header"><h2>Pantry</h2><button id="pantryCloseBtn" class="btn">Close</button></div>
      <div class="wrap" style="padding:12px 16px">
        <label for="pantryInput">Type what you’ve got</label>
        <input id="pantryInput" class="input" placeholder="e.g., rice, pasta, tinned tomatoes…">
        <p class="meta">Tip: press Enter or comma to add items as tokens.</p>
        <div id="pantryTokens" class="mini-nav" aria-label="Your pantry items"></div>
        <label style="display:block;margin:.5rem 0"><input type="checkbox" id="pantryStrict"> Only use my pantry</label>
        <label>Allow up to <select id="pantryExtras"><option>0</option><option>1</option><option selected>2</option><option>3</option></select> extras</label>
        <label style="display:block;margin:.5rem 0"><input type="checkbox" id="pantryBudget"> Budget only</label>
        <label style="display:block;margin:.5rem 0"><input type="checkbox" id="pantryRespectDiet" checked> Respect dietary filters</label>
        <div style="display:flex;gap:.6rem;margin-top:.6rem">
          <button id="pantryFindBtn" class="btn">Find recipes</button>
          <button id="pantryPlanWeekBtn" class="btn">Auto-plan cheap week</button>
          <button id="pantryResetBtn" class="btn">Reset Pantry</button>
        </div>
      </div>`;}
  function buildPlanner(){ plannerPanel.innerHTML=`
      <div class="panel-header"><h2>Meal Planner</h2><button id="plannerCloseBtn" class="btn">Close</button></div>
      <div class="wrap" style="padding:12px 16px">
        <label for="goalSelect">Goal</label>
        <select id="goalSelect"><option value="">— Select —</option><option>Maintain</option><option>Cut</option><option>Build/Bulk</option><option>Transform</option></select>
        <p class="meta">Calories: <span id="targetKcal">—</span> — Protein: <span id="targetProtein">—</span> — Carbs: <span id="targetCarbs">—</span> — Fat: <span id="targetFat">—</span></p>
        <h3>Today</h3>
        <div class="grid" style="grid-template-columns:repeat(2,1fr)">
          <div><h4>Breakfast</h4><div id="slot-breakfast"></div></div>
          <div><h4>Lunch</h4><div id="slot-lunch"></div></div>
          <div><h4>Dinner</h4><div id="slot-dinner"></div></div>
          <div><h4>Snack</h4><div id="slot-snack"></div></div>
        </div>
        <p class="meta" aria-live="polite">Total kcal: <span id="sumKcal">0</span> • P: <span id="sumP">0 g</span> • C: <span id="sumC">0 g</span> • F: <span id="sumF">0 g</span></p>
        <div style="display:flex;gap:.6rem"><button id="plannerClearBtn" class="btn">Clear day</button><button id="plannerCopyBtn" class="btn">Copy</button><button id="plannerPrintBtn" class="btn">Print</button></div>
      </div>`;}
  function buildModal(){ modal.innerHTML=`
      <div class="modal-inner">
        <img id="modalImage" class="modal-media" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover">
        <div class="wrap" style="padding:12px 16px">
          <h2 id="recipeTitle">Recipe</h2>
          <p class="meta">Serves <span id="recipeServes">—</span> • <span id="recipeTime">—</span> • <span id="recipeSpice"></span></p>
          <div class="grid">
            <div>
              <h3>Ingredients</h3><ul id="recipeIngredients"></ul>
            </div>
            <div>
              <h3>Method</h3><ol id="recipeMethod"></ol>
            </div>
          </div>
          <div class="grid">
            <div><h3>Macros per serving</h3><ul id="recipeMacros" class="meta"></ul></div>
            <div><h3>Allergens & swaps</h3><p id="recipeAllergens" class="meta"></p><ul id="recipeSwaps" class="meta"></ul><p id="recipeHydration" class="meta"></p></div>
          </div>
          <div style="display:flex;gap:.6rem;margin-top:.6rem">
            <button id="modalAddToPlanner" class="btn">Add to Planner</button>
            <button id="modalPrint" class="btn">Print Recipe Card</button>
            <button id="modalClose" class="btn">Close</button>
          </div>
        </div>
      </div>`;}

  function spiceIcons(n){ n=+n||0; return n? '🌶️'.repeat(Math.max(1,Math.min(3,n))) : ''; }
  function kcalBand(k){ if(k<=400)return '≤400'; if(k<=600)return '≤600'; if(k<=800)return '≤800'; return null; }
  function openPanel(p){ p.classList.add('open'); p.setAttribute('aria-hidden','false'); overlay.classList.add('show'); }
  function closePanel(p){ p.classList.remove('open'); p.setAttribute('aria-hidden','true'); if(!document.querySelector('.panel.open')) overlay.classList.remove('show'); }

  function renderChips(){
    const base=filterBar.querySelector('[data-filter="ALL"]'); filterBar.innerHTML=''; filterBar.appendChild(base);
    CHIP_GROUPS.filter(g=>g.id!=='ALL').forEach(g=>{
      g.chips.forEach(v=>{
        const b=document.createElement('button'); b.className='chip'; b.dataset.group=g.id; b.dataset.value=v; b.setAttribute('aria-pressed','false'); b.textContent=v;
        filterBar.appendChild(b);
      });
    });
  }

  function matchesFilters(r){
    if(FILTERS.search){
      const txt=`${r.title} ${r.mealType} ${(r.dietary||[]).join(' ')} ${(r.nutritionFocus||[]).join(' ')} ${(r.protocols||[]).join(' ')} ${(r.ingredients||[]).map(i=>i.item).join(' ')}`.toLowerCase();
      if(!txt.includes(FILTERS.search)) return false;
    }
    if(FILTERS.MealType.size && !FILTERS.MealType.has(r.mealType)) return false;
    if(FILTERS.Dietary.size){ const set=new Set(r.dietary||[]); for(const need of FILTERS.Dietary) if(!set.has(need)) return false; }
    if(FILTERS.Nutrition.size){
      const needSpicy=FILTERS.Nutrition.has('Spicy');
      if(needSpicy && !(r.spiceLevel && r.spiceLevel>=1)) return false;
      const others=new Set([...FILTERS.Nutrition].filter(x=>x!=='Spicy')); const have=new Set(r.nutritionFocus||[]);
      for(const t of others) if(!have.has(t)) return false;
    }
    if(FILTERS.KcalBand.size){ const band=r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0); if(!band || !FILTERS.KcalBand.has(band)) return false; }
    if(FILTERS.Protocols.size){ const set=new Set(r.protocols||[]); for(const need of FILTERS.Protocols) if(!set.has(need)) return false; }
    if(FILTERS.Time.size){
      const t=r.time_mins||0; const ok=[...FILTERS.Time].every(tag=>{
        if(tag==='≤15 min') return t<=15; if(tag==='≤30 min') return t<=30;
        if(tag==='Slow-cook') return r.slowCook===true || (r.time_label||'').toLowerCase().includes('slow');
        if(tag==='No-cook') return t===0 || (r.time_label||'').toLowerCase().includes('no-cook');
        return true;
      }); if(!ok) return false;
    }
    if(FILTERS.CostPrep.size){
      const needsBudget=FILTERS.CostPrep.has('Low cost / Budget'); if(needsBudget && r.costTag!=='Budget') return false;
      const other=new Set([...FILTERS.CostPrep].filter(x=>x!=='Low cost / Budget'));
      const tags=new Set([...(r.costPrep||[]), r.costTag].filter(Boolean)); for(const t of other) if(!tags.has(t)) return false;
    }
    if(FILTERS.Pantry.active){
      const keys=new Set((r.pantryKeys||[]).map(norm)), have=new Set(FILTERS.Pantry.keys.map(norm)); let matched=0;
      have.forEach(k=>{ if(keys.has(k)) matched++; }); const total=(r.pantryKeys||[]).length; const extrasNeeded=Math.max(0,total-matched);
      const okBudget=!FILTERS.Pantry.budget || r.costTag==='Budget'; const okStrict=!FILTERS.Pantry.strict ? (extrasNeeded<=FILTERS.Pantry.extras) : (extrasNeeded===0);
      if(!(okBudget && okStrict)) return false;
      if(FILTERS.Pantry.respectDiet && FILTERS.Dietary.size){ const set=new Set(r.dietary||[]); for(const need of FILTERS.Dietary) if(!set.has(need)) return false; }
    }
    return true;
  }

function card(r){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <h3 style="margin:.2rem 0 .35rem">${r.title}</h3>
    <p class="meta">⏱️ ${r.time_mins || 0} min • 🍽️ ${r.mealType || ''} 
      ${r.nutritionPerServing?.kcal ? `• 🔥 ${r.nutritionPerServing.kcal} kcal` : ''}
      ${r.spiceLevel ? `• ${'🌶️'.repeat(Math.max(1, Math.min(3, +r.spiceLevel||0)))}` : ''}
    </p>
    <div class="mini-nav" style="margin:.35rem 0 .55rem">
      ${r.costTag ? `<span class="chip" aria-pressed="false">${r.costTag}</span>` : ''}
      ${(r.dietary || []).map(t => `<span class="chip" aria-pressed="false">${t}</span>`).join('')}
      ${(r.nutritionFocus || []).map(t => `<span class="chip" aria-pressed="false">${t}</span>`).join('')}
    </div>
    <div style="display:flex;gap:.6rem;flex-wrap:wrap">
      <button class="btn" data-action="view">View Recipe Card</button>
      <button class="btn" data-action="print">Print Recipe Card</button>
      <button class="btn" data-action="add">Add to Planner</button>
    </div>
  `;

  el.querySelector('[data-action="view"]').onclick = () => openModal(r);
  el.querySelector('[data-action="print"]').onclick = () => printRecipe(r);
  el.querySelector('[data-action="add"]').onclick = () => addToPlannerPrompt(r);
  return el;
}

  function render(){
    const list=RECIPES.filter(matchesFilters);
    grid.innerHTML=''; list.forEach(r=>grid.appendChild(card(r)));
    countEl.textContent=`Showing ${list.length} of ${RECIPES.length} recipes`;
    clearBtn.style.display = (FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active) ? 'none' : 'inline-flex';
    grid.setAttribute('aria-busy','false');
  }

  // Modal & Print
  function openModal(r){
  const get=id=>qs(id,modal);
  modal.querySelectorAll('*'); // keep

  // ⛔ removed image assignment entirely
  // if you want to keep the <img> node hidden:
  const img = get('#modalImage');
  if (img) img.style.display = 'none';

  get('#recipeTitle').textContent=r.title;
  get('#recipeServes').textContent=r.serves||1;
  get('#recipeTime').textContent=`${r.time_mins||0} min`;
  get('#recipeSpice').textContent=r.spiceLevel? `${spiceIcons[r.spiceLevel]} (${['','Mild','Medium','Hot'][r.spiceLevel]||'Spicy'})` : '';
  get('#recipeIngredients').innerHTML=(r.ingredients||[]).map(i=>`<li>${i.qty?`${i.qty} `:''}${i.item}</li>`).join('');
  get('#recipeMethod').innerHTML=(r.method||[]).map(s=>`<li>${s}</li>`).join('');
  if(r.nutritionPerServing){
    const n=r.nutritionPerServing;
    get('#recipeMacros').innerHTML=`<li>${n.kcal} kcal</li><li>Protein ${n.protein_g} g</li><li>Carbs ${n.carbs_g} g</li><li>Fat ${n.fat_g} g</li>`;
  } else get('#recipeMacros').innerHTML='<li>—</li>';
  get('#recipeAllergens').textContent=(r.allergensPresent&&r.allergensPresent.length)?`Allergens: ${r.allergensPresent.join(', ')}`:'Allergens: none';
  get('#recipeSwaps').innerHTML=(r.swaps||[]).map(s=>`<li>${s}</li>`).join('');
  get('#recipeHydration').textContent=r.hydrationTip||'';
  get('#modalAddToPlanner').onclick=()=>addToPlannerPrompt(r);
  get('#modalPrint').onclick=()=>printRecipe(r);
  get('#modalClose').onclick=()=>modal.close();
  modal.showModal();
}
  function printRecipe(r){
  const n = r.nutritionPerServing || {};
  const area = document.getElementById('printArea');

  // Build the printable markup
  area.innerHTML = `
    <article>
      <h1>${r.title}</h1>
      <p>${r.mealType || ''} • ${r.time_mins || 0} min • Serves ${r.serves || 1}
         ${r.spiceLevel ? ` • ${'🌶️'.repeat(Math.max(1, Math.min(3, +r.spiceLevel || 0)))} ` : ''}</p>
      <h2>Ingredients</h2>
      <ul>${(r.ingredients || []).map(i => `<li>${i.qty ? `${i.qty} ` : ''}${i.item}</li>`).join('')}</ul>
      <h2>Method</h2>
      <ol>${(r.method || []).map(s => `<li>${s}</li>`).join('')}</ol>
      <h2>Macros (per serving)</h2>
      <p>${n.kcal ?? '—'} kcal • P ${n.protein_g ?? '—'} g • C ${n.carbs_g ?? '—'} g • F ${n.fat_g ?? '—'} g
         ${n.fibre_g != null ? ` • Fibre ${n.fibre_g} g` : ''}</p>
    </article>`;

  // Make sure it's visible for the print snapshot
  area.removeAttribute('hidden');
  area.style.display = 'block';

  // Print after the DOM has painted
  const doPrint = () => window.print();
  requestAnimationFrame(() => requestAnimationFrame(doPrint));

  // Cleanup after printing
  const cleanup = () => {
    area.innerHTML = '';
    area.setAttribute('hidden', '');
    area.style.display = '';
    window.removeEventListener('afterprint', cleanup);
  };
  if ('onafterprint' in window) {
    window.addEventListener('afterprint', cleanup);
  } else {
    setTimeout(cleanup, 500);
  }
}

  // Planner
  function renderPlan(){
    const s={breakfast:qs('#slot-breakfast',plannerPanel),lunch:qs('#slot-lunch',plannerPanel),dinner:qs('#slot-dinner',plannerPanel),snack:qs('#slot-snack',plannerPanel)};
    Object.keys(s).forEach(k=>{
      s[k].innerHTML=PLAN[k].map((it,i)=>`
        <div class="badge" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin:.25rem 0;">
          <span>${it.title}</span>
          <button data-slot="${k}" data-idx="${i}" style="border:0;background:transparent;color:var(--accent);cursor:pointer">remove</button>
        </div>`).join('');
    });
    qsa('#daySlots button[data-slot]',plannerPanel).forEach(b=>{
      b.onclick=()=>{ const slot=b.dataset.slot, idx=+b.dataset.idx; PLAN[slot].splice(idx,1); renderPlan(); };
    });
    let tk=0,tp=0,tc=0,tf=0; Object.values(PLAN).flat().forEach(it=>{ tk+=+it.macros.kcal||0; tp+=+it.macros.protein_g||0; tc+=+it.macros.carbs_g||0; tf+=+it.macros.fat_g||0; });
    qs('#sumKcal',plannerPanel).textContent=Math.round(tk); qs('#sumP',plannerPanel).textContent=`${Math.round(tp)} g`;
    qs('#sumC',plannerPanel).textContent=`${Math.round(tc)} g`; qs('#sumF',plannerPanel).textContent=`${Math.round(tf)} g`;
    localStorage.setItem('fff_mealplan_v1', JSON.stringify(PLAN));
  }
  function addToPlannerPrompt(r){
    const slot=(prompt('Add to which meal? (breakfast, lunch, dinner, snack)')||'').trim().toLowerCase();
    if(!['breakfast','lunch','dinner','snack'].includes(slot)) return;
    PLAN[slot].push({slug:r.slug,title:r.title,macros:r.nutritionPerServing||{}}); renderPlan(); alert(`Added "${r.title}" to ${slot}.`);
  }

  // Pantry + events
  const pantry = { set:new Set() };
  function renderPantryTokens(){
    const w=qs('#pantryTokens',pantryPanel); w.innerHTML='';
    [...pantry.set].forEach(k=>{ const b=document.createElement('button'); b.className='chip'; b.textContent=k; b.setAttribute('aria-pressed','true'); b.onclick=()=>{ pantry.set.delete(k); renderPantryTokens(); }; w.appendChild(b); });
  }

  function wire(){
    // Top bar
    pantryOpenBtn.onclick=()=>openPanel(pantryPanel);
    openPlannerBtn.onclick=()=>openPanel(plannerPanel);
    // Overlay closes panels
    overlay.addEventListener('click',()=>{ document.querySelectorAll('.panel.open').forEach(p=>closePanel(p)); });

    // Pantry
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
      FILTERS.Pantry.active=true; FILTERS.Pantry.keys=[...pantry.set]; FILTERS.Pantry.strict=false; FILTERS.Pantry.extras=2; FILTERS.Pantry.budget=true;
      const scored=RECIPES.filter(r=>r.costTag==='Budget').map(r=>{
        const keys=new Set((r.pantryKeys||[]).map(norm)); let m=0; pantry.set.forEach(k=>{ if(keys.has(norm(k))) m++; }); return {r,score:m};
      }).sort((a,b)=>b.score-a.score).slice(0,14).map(x=>x.r);
      const slots=['breakfast','lunch','dinner','snack']; Object.keys(PLAN).forEach(k=>PLAN[k]=[]);
      scored.forEach((r,i)=>PLAN[slots[i%4]].push({slug:r.slug,title:r.title,macros:r.nutritionPerServing||{}}));
      renderPlan(); closePanel(pantryPanel); openPanel(plannerPanel);
    };
    qs('#pantryResetBtn',pantryPanel).onclick=()=>{
      pantry.set.clear(); renderPantryTokens();
      FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true}; render();
    };

    // Planner
    qs('#plannerCloseBtn',plannerPanel).onclick=()=>closePanel(plannerPanel);
    qs('#goalSelect',plannerPanel).onchange=()=>{
      const t=GOALS[qs('#goalSelect',plannerPanel).value]||{kcal:'—',protein:'—',carbs:'—',fat:'—'};
      qs('#targetKcal',plannerPanel).textContent=t.kcal; qs('#targetProtein',plannerPanel).textContent=t.protein;
      qs('#targetCarbs',plannerPanel).textContent=t.carbs; qs('#targetFat',plannerPanel).textContent=t.fat;
    };
    qs('#plannerClearBtn',plannerPanel).onclick=()=>{ Object.keys(PLAN).forEach(k=>PLAN[k]=[]); renderPlan(); };
    qs('#plannerCopyBtn',plannerPanel).onclick=()=>{
      const txt=Object.entries(PLAN).map(([k,arr])=>`${k[0].toUpperCase()+k.slice(1)}:\n`+arr.map(i=>`- ${i.title}`).join('\n')).join('\n\n');
      navigator.clipboard.writeText(txt); alert('Plan copied to clipboard.');
    };
    qs('#plannerPrintBtn',plannerPanel).onclick=()=>{
      printArea.hidden=false;
      printArea.innerHTML=`<article><h1>Meal Plan — Today</h1>${Object.entries(PLAN).map(([k,arr])=>`<h2>${k[0].toUpperCase()+k.slice(1)}</h2><ul>${arr.map(i=>`<li>${i.title}</li>`).join('')||'<li>—</li>'}</ul>`).join('')}
        <p><strong>Totals:</strong> ${qs('#sumKcal',plannerPanel).textContent} kcal • P ${qs('#sumP',plannerPanel).textContent} • C ${qs('#sumC',plannerPanel).textContent} • F ${qs('#sumF',plannerPanel).textContent}</p></article>`;
      window.print(); setTimeout(()=>{ printArea.hidden=true; printArea.innerHTML=''; }, 400);
    };

    // Filters
    filterBar.addEventListener('click',e=>{
      const b=e.target.closest('.chip'); if(!b) return;
      if(b.dataset.filter==='ALL'){
        FILTERS.ALL=true; ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
        FILTERS.search=''; searchInput.value=''; FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
        updateChipStates(); render(); return;
      }
      const g=b.dataset.group, v=b.dataset.value; FILTERS.ALL=false;
      (FILTERS[g].has(v)? FILTERS[g].delete(v) : FILTERS[g].add(v)); updateChipStates(); render();
    });
    clearBtn.onclick=()=>{
      FILTERS.ALL=true; ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search=''; searchInput.value=''; FILTERS.Pantry={active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      updateChipStates(); render();
    };
    searchInput.oninput=()=>{ FILTERS.ALL=false; FILTERS.search=norm(searchInput.value); updateChipStates(); render(); };
  }

  function updateChipStates(){
    const all=filterBar.querySelector('[data-filter="ALL"]'); all.setAttribute('aria-pressed', FILTERS.ALL?'true':'false');
    qsa('.chip[data-group]').forEach(b=>{ const g=b.dataset.group,v=b.dataset.value; b.setAttribute('aria-pressed', FILTERS[g].has(v)?'true':'false'); });
    clearBtn.style.display = (FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active) ? 'none' : 'inline-flex';
  }

  function init(){
    buildPantry(); buildPlanner(); buildModal(); renderChips(); updateChipStates(); wire(); renderPantryTokens();
    try{ const saved=JSON.parse(localStorage.getItem('fff_mealplan_v1')||'null'); if(saved) Object.assign(PLAN,saved); }catch(_){}
    renderPlan();
    fetch('assets/data/recipes.json',{cache:'no-store'})
      .then(r=>r.json())
      .then(data=>{
        RECIPES=(Array.isArray(data)?data:(data.recipes||[])).map(r=>{
          r.kcalBand = r.kcalBand || kcalBand(r?.nutritionPerServing?.kcal??0);
          r.pantryKeys = r.pantryKeys || (r.ingredients||[]).map(i=>norm(i.pantryKey||i.item));
          return r;
        });
        render();
      })
      .catch(()=>{ countEl.textContent='No recipes file found. Add assets/data/recipes.json'; grid.setAttribute('aria-busy','false'); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
