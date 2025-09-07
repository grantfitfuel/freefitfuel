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

  const pantryPanel   = qs('#pantryPanel');
  const plannerPanel  = qs('#plannerPanel');
  const modal         = qs('#recipeModal');
  const overlay       = qs('#overlay');
  const printArea     = qs('#printArea');

  const pantryOpenBtn  = qs('#pantryOpenBtn');
  const openPlannerBtn = qs('#openPlannerBtn');

  // Main-page week summary refs
  const weekSummarySection = qs('#weekSummarySection');
  const weekSummaryGrid    = qs('#weekSummaryGrid');
  const weekAutoBtn        = qs('#weekAutoBtn');
  const weekClearBtn       = qs('#weekClearBtn');

  // ---------- State ----------
  let RECIPES = [];
  let FIRST_SUCCESSFUL_LOAD = false;

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

  // Week planner
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
    const all = filterBar && filterBar.querySelector('[data-filter="ALL"]');
    if(all) all.setAttribute('aria-pressed', FILTERS.ALL?'true':'false');
    filterBar && qsa('.chip[data-group]', filterBar).forEach(b=>{
      const g=b.dataset.group, v=b.dataset.value;
      b.setAttribute('aria-pressed', FILTERS[g].has(v)?'true':'false');
    });
    if (clearBtn) {
      clearBtn.style.display = (FILTERS.ALL && !FILTERS.search && !FILTERS.Pantry.active) ? 'none' : 'inline-flex';
    }
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
      b.onclick=()=>{ pantry.set.delete(k); renderPantryTokens(); };
      holder.appendChild(b);
    });
  }

  // ---------- Planner / Week Summary / Cards ----------
  // (… keep everything you already have here … unchanged …)

  // ---------- Boot ----------
  function init(){
    if(!grid) return;
    renderChips(); updateChipStates();
    buildPantry(); buildPlanner(); renderPantryTokens();

    // restore plans
    loadToday(); renderPlan();
    loadWeek();  buildWeekGrid(); renderWeekSummary();
    wireWeekSummaryControls();

    // bind all UI once
    wire();

    // ==== RECIPES LOADER (multi-file + fallbacks) ====
    const recipeFiles = [
      'assets/data/recipes-01.json',
      'assets/data/recipes-02.json',
      'assets/data/recipes.json' // optional legacy/main file
    ];
    loadAllRecipes(recipeFiles);
  }

  // ---------- Robust loader ----------
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

    // Merge arrays or {recipes:[…]} and de-dup by slug/title
    const mergedRaw = ok.flatMap(({json}) => Array.isArray(json) ? json : (json.recipes || []));
    const seen = new Set();
    RECIPES = mergedRaw.filter(r => {
      const key = r.slug || r.title;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(r => {
      r.kcalBand  = r.kcalBand  || kcalBand(r?.nutritionPerServing?.kcal ?? 0);
      r.pantryKeys = r.pantryKeys || (r.ingredients || []).map(i => norm(i.pantryKey || i.item));
      return r;
    });

    if (!FIRST_SUCCESSFUL_LOAD && RECIPES.length) {
      FIRST_SUCCESSFUL_LOAD = true;
      FILTERS.ALL = true;
      ['MealType','Dietary','Nutrition','KcalBand','Protocols','Time','CostPrep'].forEach(k=>FILTERS[k].clear());
      FILTERS.search = '';
      FILTERS.Pantry = {active:false,keys:[],strict:false,extras:2,budget:false,respectDiet:true};
      updateChipStates();
    }

    // Feedback
    if (countEl) {
      const from = ok.map(o => o.url);
      countEl.innerHTML = RECIPES.length
        ? `Loaded <strong>${RECIPES.length}</strong> recipes from:<br>${from.map(u=>'• '+u).join('<br>')}`
        : `Loaded 0 recipes. Check JSON structure/paths.<br>Tried:<br>${files.map(f => '• ' + f).join('<br>')}`;
    }

    render();

    if (!RECIPES.length && grid) {
      const help = document.createElement('div');
      help.className = 'meta';
      help.style.marginTop = '.5rem';
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

  document.addEventListener('DOMContentLoaded', init);
})();
