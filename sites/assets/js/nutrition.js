/* FreeFitFuel – Nutrition Page App
   - No default filter selected
   - No recipes rendered until a filter is chosen
   - Collapsible sections handled in HTML/CSS
*/

/* ==== CONFIG ==== */
// Provide a list of JSON files that exist on your site.
// If you maintain a single big file, keep the first item (recipes.json) and remove others.
const DATA_FILES = [
  'assets/data/recipes.json',
  'assets/data/recipes-21.json',
  'assets/data/recipes-22.json',
  'assets/data/recipes-23.json',
  'assets/data/recipes-24.json',
  'assets/data/recipes-25.json',
  'assets/data/recipes-26.json',
  'assets/data/recipes-27.json',
  // If you have recipes-01..40 etc, add them here
];

// Which fields to use for filters. You can customise this.
const FILTER_SOURCES = [
  { key: 'mealType', label: 'Meal' },
  { key: 'dietary', label: 'Dietary' },          // array
  { key: 'nutritionFocus', label: 'Focus' },     // array
  { key: 'costTag', label: 'Cost' },             // string
  { key: 'spiceLevel', label: 'Spice' }          // number
];

/* ==== GLOBAL STATE ==== */
const state = {
  allRecipes: [],
  currentFilter: null,   // string like "Vegetarian" or special "ALL"
  selectedKey: null,     // which category produced the filter (e.g., dietary)
  weekPlan: [],          // 7 items max
};

/* ==== START EMPTY: PREVENT DEFAULT RENDER ==== */
// Mark the document in start-empty mode so CSS hides any pre-rendered cards.
document.documentElement.setAttribute('data-start-empty','');

/* ==== DOM HOOKS ==== */
const grid        = document.getElementById('recipeGrid');
const chipBar     = document.getElementById('filterChips');
const countEl     = document.getElementById('recipeCount');
const clearBtn    = document.getElementById('clearFiltersBtn');
const exportBtn   = document.getElementById('exportIndexBtn');
const weekAutoBtn = document.getElementById('weekAutoBtn');
const weekClearBtn= document.getElementById('weekClearBtn');
const weekGrid    = document.getElementById('weekSummaryGrid');

/* ==== UTILITIES ==== */
const sleep = (ms)=> new Promise(r=>setTimeout(r,ms));

function uniq(arr){ return [...new Set(arr)]; }

function getTagValues(recipe, srcKey){
  const val = recipe[srcKey];
  if (val == null) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  return [String(val)];
}

/* ==== LOAD DATA ==== */
async function loadAllRecipes() {
  const loaded = [];
  for (const url of DATA_FILES) {
    try {
      const res = await fetch(url, { cache:'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data)) loaded.push(...data);
    } catch (e) {
      // ignore missing files
    }
  }
  state.allRecipes = loaded;
}

/* ==== FILTER CHIP RENDER ==== */
function buildFilterChips(recipes) {
  // Gather values per filter source
  const groups = [];
  for (const src of FILTER_SOURCES) {
    const values = uniq(
      recipes.flatMap(r => getTagValues(r, src.key))
    ).filter(v => v !== '' && v !== 'undefined' && v !== 'null');
    if (values.length) {
      groups.push({ src, values: values.sort((a,b)=> String(a).localeCompare(String(b))) });
    }
  }

  // Keep the built-in ALL chip but leave it unpressed
  // Remove old dynamic chips
  chipBar.querySelectorAll('.chip[data-dyn="1"]').forEach(n => n.remove());

  // Insert group labels + chips
  for (const g of groups) {
    // group label (visually like a disabled chip)
    const label = document.createElement('span');
    label.className = 'chip';
    label.textContent = g.src.label + ':';
    label.setAttribute('aria-disabled','true');
    label.style.opacity = '.7';
    label.style.cursor = 'default';
    label.setAttribute('data-dyn','1');
    chipBar.appendChild(label);

    // chips
    for (const val of g.values) {
      const b = document.createElement('button');
      b.className = 'chip';
      b.setAttribute('aria-pressed','false');
      b.textContent = val;
      b.dataset.value = String(val);
      b.dataset.src = g.src.key;
      b.setAttribute('data-dyn','1');
      chipBar.appendChild(b);
    }
  }
}

/* ==== RENDER ==== */
function recipeCard(r){
  const carbs = r?.nutritionPerServing?.carbs_g ?? '—';
  const prot  = r?.nutritionPerServing?.protein_g ?? '—';
  const fat   = r?.nutritionPerServing?.fat_g ?? '—';
  const kcal  = r?.nutritionPerServing?.kcal ?? '—';
  const tags  = [...getTagValues(r,'dietary'), ...getTagValues(r,'nutritionFocus')];

  return `
  <article class="card" data-slug="${r.slug}">
    <h3>${r.title}</h3>
    <div class="meta">${r.mealType || ''} · ${kcal} kcal · P ${prot}g · C ${carbs}g · F ${fat}g</div>
    <div class="mini-nav">
      ${tags.slice(0,4).map(t=>`<span class="chip">${t}</span>`).join('')}
    </div>
    <div style="display:flex;gap:.4rem;flex-wrap:wrap">
      <button class="btn" data-act="add-week">Add to week</button>
      <button class="btn" data-act="view">View</button>
    </div>
  </article>`;
}

function renderGrid(recipes){
  grid.setAttribute('aria-busy','true');
  grid.innerHTML = recipes.map(recipeCard).join('');
  grid.setAttribute('aria-busy','false');
  countEl.textContent = `Showing ${recipes.length} of ${state.allRecipes.length} recipes`;
}

function applyFilter(value, srcKey){
  state.currentFilter = value;
  state.selectedKey = srcKey; // may be null for ALL

  if (value === 'ALL') {
    renderGrid(state.allRecipes);
    return;
  }
  const filtered = state.allRecipes.filter(r => {
    const vals = getTagValues(r, srcKey);
    return vals.map(String).includes(String(value));
  });
  renderGrid(filtered);
}

/* ==== INTERACTION ==== */
function deselectAllChips(){
  chipBar.querySelectorAll('.chip[aria-pressed="true"]').forEach(b=>b.setAttribute('aria-pressed','false'));
}
function selectChip(btn){
  btn.setAttribute('aria-pressed','true');
}

function onChipClick(e){
  const btn = e.target.closest('.chip');
  if (!btn || btn.getAttribute('aria-disabled') === 'true') return;

  // First time a chip is clicked: exit start-empty mode
  if (document.documentElement.hasAttribute('data-start-empty')) {
    document.documentElement.removeAttribute('data-start-empty');
  }

  const value = btn.dataset.value || btn.textContent.trim();
  const src   = btn.dataset.src || null; // null means ALL
  deselectAllChips();
  selectChip(btn);
  applyFilter(value, src);
}

/* WEEK PLAN (simple summary) */
function renderWeek(){
  if (!weekGrid) return;
  weekGrid.innerHTML = state.weekPlan.map((r,i)=>`
    <div class="card">
      <div class="meta">Day ${i+1}</div>
      <strong>${r.title}</strong>
      <div class="meta">${r.mealType || ''} · ${r?.nutritionPerServing?.kcal ?? '—'} kcal</div>
    </div>
  `).join('');
}
function clearWeek(){
  state.weekPlan = [];
  renderWeek();
}
function autoPlanWeek(){
  const pool = [...state.allRecipes];
  // Avoid duplicates; prefer dinners if available
  const dinners = pool.filter(r => (r.mealType||'').toLowerCase()==='dinner');
  const pickFrom = dinners.length >= 7 ? dinners : pool;
  state.weekPlan = [];
  while (state.weekPlan.length < 7 && pickFrom.length) {
    const idx = Math.floor(Math.random()*pickFrom.length);
    const [r] = pickFrom.splice(idx,1);
    state.weekPlan.push(r);
  }
  renderWeek();
}

/* Card buttons */
function onGridClick(e){
  const card = e.target.closest('.card');
  const act  = e.target.closest('button')?.dataset?.act;
  if (!card || !act) return;

  const slug = card.getAttribute('data-slug');
  const recipe = state.allRecipes.find(r=>r.slug===slug);
  if (!recipe) return;

  if (act === 'add-week') {
    if (state.weekPlan.find(r=>r.slug===recipe.slug)) return; // prevent dup
    if (state.weekPlan.length < 7) state.weekPlan.push(recipe);
    renderWeek();
  }
  if (act === 'view') {
    alert(`${recipe.title}\n\nIngredients:\n- ${recipe.ingredients?.map(i=>`${i.qty||''} ${i.item}`).join('\n- ') || 'n/a'}\n\nMethod:\n${(recipe.method||[]).map((s,i)=>`${i+1}. ${s}`).join('\n')}`);
  }
}

/* ==== EXPORT ==== */
function exportIndex(){
  const rows = state.allRecipes.map(r => ({
    title: r.title,
    slug: r.slug,
    mealType: r.mealType || '',
    kcal: r?.nutritionPerServing?.kcal ?? '',
    protein_g: r?.nutritionPerServing?.protein_g ?? '',
    carbs_g: r?.nutritionPerServing?.carbs_g ?? '',
    fat_g: r?.nutritionPerServing?.fat_g ?? '',
    dietary: (r.dietary||[]).join('|'),
    focus: (r.nutritionFocus||[]).join('|')
  }));
  const header = Object.keys(rows[0]||{title:'title'}).join(',');
  const csv = [header, ...rows.map(o=>Object.values(o).map(v => String(v).replace(/"/g,'""')).map(v=>`"${v}"`).join(','))].join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'recipes-index.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ==== INIT ==== */
async function init(){
  // Ensure nothing is selected on load (visual + ARIA)
  chipBar.querySelectorAll('.chip').forEach(ch => ch.setAttribute('aria-pressed','false'));

  // Load data
  await loadAllRecipes();

  // Build dynamic chips from data (leaves the existing ALL chip unpressed)
  buildFilterChips(state.allRecipes);

  // Show starter message; keep grid empty until first click
  if (countEl) countEl.textContent = 'Choose a filter to begin';

  // Listeners
  chipBar.addEventListener('click', onChipClick);
  grid.addEventListener('click', onGridClick);
  if (exportBtn) exportBtn.addEventListener('click', exportIndex);
  if (weekAutoBtn) weekAutoBtn.addEventListener('click', autoPlanWeek);
  if (weekClearBtn) weekClearBtn.addEventListener('click', clearWeek);

  // (Optional) if you want keyboard behaviour on chips (Enter/Space), uncomment:
  // chipBar.addEventListener('keydown', (e) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     const btn = e.target.closest('.chip'); if (!btn) return;
  //     e.preventDefault(); btn.click();
  //   }
  // });
}

// Kick off
init();
