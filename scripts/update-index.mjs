/**
 * Point the plugin market index at the npm release that was just published.
 *
 * Run by the publish workflow after `npm publish`. It reads the engines range
 * from package.json so the index entry and the package never disagree.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (version === undefined || version === '') {
  throw new Error('usage: node scripts/update-index.mjs <version>');
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const index = JSON.parse(readFileSync('index.json', 'utf8'));

const plugin = index.plugins.find((entry) => entry.name === pkg.name);
if (plugin === undefined) {
  throw new Error(`index.json does not list "${pkg.name}"`);
}

const existing = plugin.versions.find((candidate) => candidate.version === version);
if (existing !== undefined && existing.source !== undefined && existing.source.type === 'npm') {
  console.log(`index.json already points at the npm release ${version}`);
  process.exit(0);
}

const engines = {};
if (pkg.engines !== undefined && pkg.engines.dsh !== undefined) {
  engines.dsh = pkg.engines.dsh;
}

const entry = {
  version,
  publishTimestamp: Math.floor(Date.now() / 1000),
  source: { type: 'npm' },
  engines,
};

const kept = plugin.versions.filter((candidate) => candidate.version !== version);
plugin.versions = [entry, ...kept].sort((left, right) => compareSemver(right.version, left.version));

writeFileSync('index.json', `${JSON.stringify(index, null, 2)}\n`);

/**
 * Order versions the way the market index expects: descending SemVer.
 * @param {string} left - a version.
 * @param {string} right - another version.
 * @returns a negative, zero, or positive number for Array#sort.
 */
function compareSemver(left, right) {
  const parse = (value) => {
    const [core, prerelease] = value.split('-');
    const numbers = core.split('.').map((part) => Number.parseInt(part, 10) || 0);
    while (numbers.length < 3) numbers.push(0);
    return { numbers, prerelease };
  };
  const a = parse(left);
  const b = parse(right);
  for (let i = 0; i < 3; i += 1) {
    if (a.numbers[i] !== b.numbers[i]) return a.numbers[i] - b.numbers[i];
  }
  if (a.prerelease === undefined && b.prerelease === undefined) return 0;
  if (a.prerelease === undefined) return 1;
  if (b.prerelease === undefined) return -1;
  return a.prerelease.localeCompare(b.prerelease);
}
