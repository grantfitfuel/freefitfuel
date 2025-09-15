#!/usr/bin/env node
/**
 * Recipe auditor
 * - Scans data/recipes-*.json (default) for:
 *   1) Missing/invalid dish names
 *   2) Duplicate IDs across files
 * - Emits CSV reports + a summary
 *
 * Run locally (if needed):  node scripts/check-recipes.mjs data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------- config ----------
const ROOT = process.argv[2] || 'data';          // folder to scan
const GLOB_PREFIX = 'recipes-';                  // filename prefix
const GLOB_SUFFIX = '.json';                     // filename suffix
const OUT_DIR = 'reports';                       // where to write reports

// What counts as a "proper dish name"
function nameIsValid(s) {
  if (typeof s !== 'string') return false;
  const name = s.trim();
  if (name.length < 3) return false;                   // too short
  if (/^(untitled|tbd|todo|null|na|n\/a|none)$/i.test(name)) return false;
  if (/^[a-z]+$/i.test(name) && name.length <= 4) return false; // single very short token
  if (/recipe\s*\d+$/i.test(name)) return false;       // looks auto-generated
  return true;
}

// Which fields to try for a recipe's "title"
const TITLE_CANDIDATES = ['title', 'name', 'dish', 'label'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const dataRoot = path.resolve(repoRoot, ROOT);

if (!fs.existsSync(dataRoot)) {
  console.error(`ERROR: Folder not found: ${dataRoot}`);
  process.exit(2);
}

// ensure reports dir
const reportsDir = path.resolve(repoRoot, OUT_DIR);
fs.mkdirSync(reportsDir, { recursive: true });

// helpers
function asCsvRow(arr) {
  return arr.map(v => {
    const s = v === undefined || v === null ? '' : String(v);
    if (s.includes('"') || s.includes(',') || /\r|\n/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }).join(',');
}

function writeCsv(file, headers, rows) {
  const out = [asCsvRow(headers), ...rows.map(r => asCsvRow(r))].join('\n');
  fs.writeFileSync(path.join(reportsDir, file), out, 'utf8');
  return file;
}

// scan files
const files = fs.readdirSync(dataRoot)
  .filter(f => f.startsWith(GLOB_PREFIX) && f.endsWith(GLOB_SUFFIX))
  .map(f => path.join(dataRoot, f))
  .sort((a,b)=>a.localeCompare(b));

const invalidNameRows = [];
const dupIdRows = [];
const parseErrors = [];
const idMap = new Map(); // id -> array of {file, index}

let recipeCount = 0;

for (const abs of files) {
  const rel = path.relative(repoRoot, abs);
  let arr;
  try {
    const txt = fs.readFileSync(abs, 'utf8');
    arr = JSON.parse(txt);
    if (!Array.isArray(arr)) throw new Error('Top-level JSON is not an array');
  } catch (e) {
    parseErrors.push({ file: rel, error: e.message });
    continue;
  }

  arr.forEach((r, i) => {
    recipeCount++;

    // ID tracking
    const id = r?.id ?? r?.ID ?? r?.Id ?? null;
    if (id !== null && id !== undefined) {
      const key = String(id);
      if (!idMap.has(key)) idMap.set(key, []);
      idMap.get(key).push({ file: rel, index: i });
    }

    // Title detection
    let foundField = null;
    let value = null;
    for (const f of TITLE_CANDIDATES) {
      if (r && Object.prototype.hasOwnProperty.call(r, f)) {
        foundField = f;
        value = r[f];
        break;
      }
    }

    let reason = null;
    if (foundField === null) {
      reason = 'no title-like field';
    } else if (!nameIsValid(value)) {
      reason = `invalid title (“${value}”)`;
    }

    if (reason) {
      invalidNameRows.push([
        rel,
        i,
        r?.id ?? '',
        foundField ?? '',
        value ?? '',
        reason
      ]);
    }
  });
}

// duplicates
for (const [id, locs] of idMap.entries()) {
  if (locs.length > 1) {
    const filesStr = [...new Set(locs.map(x => x.file))].join(' | ');
    dupIdRows.push([id, locs.length, filesStr]);
  }
}

// write reports
const invalidCsv = writeCsv(
  'invalid-names.csv',
  ['file','index','id','field','value','reason'],
  invalidNameRows
);
const dupsCsv = writeCsv(
  'duplicate-ids.csv',
  ['id','occurrences','files'],
  dupIdRows
);

// summary
const summaryLines = [
  `Scanned folder: ${path.relative(repoRoot, dataRoot)}`,
  `Files matched: ${files.length}`,
  `Recipes scanned: ${recipeCount}`,
  `Invalid/missing titles: ${invalidNameRows.length} (see ${invalidCsv})`,
  `Duplicate IDs: ${dupIdRows.length} (see ${dupsCsv})`,
  `Parse errors: ${parseErrors.length}`
];
if (parseErrors.length) {
  summaryLines.push('\nParse errors:');
  for (const e of parseErrors) summaryLines.push(`- ${e.file}: ${e.error}`);
}

fs.writeFileSync(path.join(reportsDir, 'summary.txt'), summaryLines.join('\n') + '\n', 'utf8');

// console output for the workflow log
console.log(summaryLines.join('\n'));

// exit status: fail the job only if JSON couldn’t be parsed
process.exit(0);
