// Usage: node check-recipe-names.mjs ./path/to/recipes
// Scans recipes-*.json (or all .json) for name issues + duplicate IDs.
// Outputs two CSV files in the current folder:
//
//  - recipe_name_issues.csv
//  - recipe_duplicate_ids.csv
//
import fs from 'fs';
import path from 'path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

// ---- config ----
const FILE_MATCH = (fname) =>
  fname.endsWith('.json') && (fname.startsWith('recipes-') || true); // tweak if you want strictly "recipes-*.json"

const PLACEHOLDER_SET = new Set(['tbd','placeholder','dish','recipe','n/a','null','undefined','sample']);
const GENERIC_SINGLE = new Set(['bowl','salad','curry','stir-fry','stir fry','soup','traybake','poke']);

// ---- helpers ----
function suspiciousName(name) {
  if (typeof name !== 'string') return {bad:true, why:'name not a string'};
  const n = name.trim();
  if (n === '') return {bad:true, why:'empty name'};
  if (n.length < 3) return {bad:true, why:'too short'};
  if (PLACEHOLDER_SET.has(n.toLowerCase())) return {bad:true, why:'placeholder token'};
  if (GENERIC_SINGLE.has(n.toLowerCase()))  return {bad:true, why:'overly generic'};
  if (!/[A-Za-z]/.test(n)) return {bad:true, why:'no letters'};
  return {bad:false, why:''};
}

function readJson(filePath) {
  try {
    const txt = fs.readFileSync(filePath, 'utf8');
    const obj = JSON.parse(txt);
    // Support either {recipes:[...]} or [...] at root
    const arr = Array.isArray(obj) ? obj : (Array.isArray(obj.recipes) ? obj.recipes : []);
    return arr;
  } catch (e) {
    return {__error:e.message};
  }
}

function toCSV(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = (v) => {
    const s = String(v ?? '');
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n');
}

// ---- scan ----
const files = fs.readdirSync(root).filter(FILE_MATCH).sort();

const nameIssues = [];
const idSeen = new Map(); // id -> [{file, index}]
const dupes = [];

for (const fname of files) {
  const fpath = path.join(root, fname);
  const data = readJson(fpath);
  if (data && data.__error) {
    nameIssues.push({file: fname, id: '', name: '', reason: `JSON parse error: ${data.__error}`});
    continue;
  }
  data.forEach((rec, i) => {
    const rid  = rec?.id ?? '';
    const name = rec?.name;

    // duplicate ID tracking
    if (rid) {
      const arr = idSeen.get(rid) || [];
      arr.push({file: fname, index: i});
      idSeen.set(rid, arr);
    }

    // name checks
    const {bad, why} = suspiciousName(name);
    if (bad) {
      nameIssues.push({file: fname, id: rid, name: name ?? '', reason: why});
    }
    // has 'title' but no usable 'name'
    if ((!name || String(name).trim()==='') && rec?.title) {
      nameIssues.push({file: fname, id: rid, name: name ?? '', reason: "has 'title' but no 'name'"});
    }
  });
}

// collect duplicate IDs
for (const [rid, locs] of idSeen.entries()) {
  if (locs.length > 1) {
    locs.forEach(l => dupes.push({id: rid, file: l.file, index: l.index}));
  }
}

// ---- write reports ----
const out1 = toCSV(nameIssues);
const out2 = toCSV(dupes);

fs.writeFileSync('recipe_name_issues.csv', out1 || 'file,id,name,reason\n(no issues found)\n', 'utf8');
fs.writeFileSync('recipe_duplicate_ids.csv', out2 || 'id,file,index\n(no duplicates found)\n', 'utf8');

console.log('✔ Wrote: recipe_name_issues.csv');
console.log('✔ Wrote: recipe_duplicate_ids.csv');
console.log('Done.');
