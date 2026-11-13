#!/usr/bin/env node
'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');

// Layout IDs are selected by app.js for each season/round. Keep this list in
// sync with qa_circuit_maps.js. These are upstream filenames, not aliases.
const LAYOUTS = [
  'bahrain-1','jeddah-1','melbourne-2','suzuka-2','shanghai-1','miami-1','imola-3',
  'monaco-6','montreal-6','catalunya-5','catalunya-6','spielberg-3','silverstone-8',
  'spa-francorchamps-4','hungaroring-3','zandvoort-5','monza-7','baku-1',
  'marina-bay-3','marina-bay-4','austin-1','mexico-city-3','interlagos-2',
  'las-vegas-1','lusail-1','yas-marina-2','paul-ricard-3','madring-1'
];
const OUT = path.join(__dirname, 'circuits', 'maps');
const REPO = 'julesr0y/f1-circuits-svg';
const BRANCH = 'main';
// The upstream project documents this directory layout. Avoid the GitHub
// tree API: it can return 404 in some networks even while raw files are public.
const ASSET_DIRS = [
  `https://raw.githubusercontent.com/${REPO}/${BRANCH}/circuits/minimal/white-outline`,
  `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/circuits/minimal/white-outline`,
  `https://raw.githubusercontent.com/f1db/f1-circuits-svg/main/circuits/minimal/white-outline`,
  `https://cdn.jsdelivr.net/gh/f1db/f1-circuits-svg@main/circuits/minimal/white-outline`
];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function validateSvg(svg, id) {
  const clean = svg.replace(/^\uFEFF/, '').trim();
  if (!/^<\?xml[\s\S]*?>\s*/i.test(clean) && !/^<svg\b/i.test(clean))
    throw new Error(`${id}.svg response does not begin with an SVG document`);
  if (!/<svg\b[^>]*>/i.test(clean) || !/<\/svg>\s*$/i.test(clean))
    throw new Error(`${id}.svg is incomplete or not a valid SVG document`);
  if (!/<path\b/i.test(clean)) throw new Error(`${id}.svg contains no track path`);
  return clean;
}

function candidateUrls(id) {
  return ASSET_DIRS.map(dir => `${dir}/${encodeURIComponent(id)}.svg`);
}

async function fetchSvgFromSources(id) {
  const errors = [];
  for (const url of candidateUrls(id)) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(25000),
          headers: { 'User-Agent': 'GrandPrixManager-CircuitAssetDownloader/0.9.8' } });
        if (!response.ok) {
          const error = new Error(`HTTP ${response.status} from ${url}`);
          error.status = response.status;
          throw error;
        }
        return validateSvg(await response.text(), id);
      } catch (error) {
        errors.push(`${new URL(url).hostname}: ${error.message}`);
        // A 404 means this mirror/path does not contain the file; try next source.
        if (error.status === 404) break;
        if (attempt < 3) await sleep(700 * attempt);
      }
    }
  }
  throw new Error(`${id}.svg could not be downloaded from any configured upstream mirror. ${errors.join(' | ')}`);
}

async function fetchSvg(id) {
  const target = path.join(OUT, `${id}.svg`);
  try {
    validateSvg(await fs.readFile(target, 'utf8'), id);
    return 'cached';
  } catch { /* absent or invalid cached file: fetch a clean copy */ }
  const svg = await fetchSvgFromSources(id);
  const temp = `${target}.part`;
  await fs.writeFile(temp, svg, 'utf8');
  await fs.rename(temp, target);
  return 'downloaded';
}

(async () => {
  await fs.mkdir(OUT, { recursive: true });
  let downloaded = 0, cached = 0;
  for (const id of LAYOUTS) {
    const result = await fetchSvg(id);
    if (result === 'cached') cached++; else downloaded++;
    process.stdout.write(`${result === 'cached' ? 'CACHED    ' : 'DOWNLOADED '} ${id}.svg\n`);
  }
  // Final completeness check prevents electron-builder from packaging a partial set.
  for (const id of LAYOUTS) validateSvg(await fs.readFile(path.join(OUT, `${id}.svg`), 'utf8'), id);
  console.log(`\nCircuit maps ready: ${downloaded} downloaded, ${cached} already present, ${LAYOUTS.length} verified SVGs total.`);
})().catch(error => {
  console.error(`\nCircuit map download failed: ${error.message}`);
  console.error('No installer was produced. Check the failed asset/source and rerun: npm run download:circuits');
  process.exitCode = 1;
});
