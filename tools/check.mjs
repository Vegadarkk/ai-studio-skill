// Checks the skill before a release. Run: node tools/check.mjs
//
// - SKILL.md frontmatter is valid for Claude Code and claude.ai uploads.
// - Every file the skill points at exists.
// - The library is exactly what tools/library.lock.json says: same files, same sha256, LF only.
//   (The lock is written by Scrolltide's library sync, straight from the library database.)
// - Nothing borrowed: no other product's name, host or house vocabulary anywhere in the repo.
// - The manifests parse and agree on the skill's name.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN = 'ai-studio'; // what people install: /plugin install ai-studio@scrolltide
const SKILL = 'scrolltide-ai-studio'; // the skill's own name, as claude.ai lists it
const skillDir = join(root, 'plugins', PLUGIN, 'skills', SKILL);
const problems = [];
const fail = (msg) => problems.push(msg);
const read = (p) => readFileSync(p, 'utf8');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules' || name === 'dist' || name === 'shots') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// --- frontmatter
const skillMd = read(join(skillDir, 'SKILL.md'));
const fm = /^---\n([\s\S]*?)\n---\n/.exec(skillMd);
if (!fm) fail('SKILL.md has no frontmatter');
else {
  const name = /^name:\s*(.+)$/m.exec(fm[1])?.[1].trim();
  const description = /^description:\s*(.+)$/m.exec(fm[1])?.[1].trim() ?? '';
  if (name !== SKILL) fail(`frontmatter name "${name}" is not "${SKILL}"`);
  if (!/^[a-z0-9-]{1,64}$/.test(name ?? '')) fail('name must be lowercase letters, digits and hyphens, 64 at most');
  if (!description) fail('description is empty');
  if (description.length > 1024) fail(`description is ${description.length} characters; the limit is 1024`);
  if (/[<>]/.test(description)) fail('description contains angle brackets');
}

// --- every referenced file exists
const docs = ['SKILL.md', 'patterns/INDEX.md', 'library/INDEX.md', 'checks.md', 'handoff.md'];
for (const doc of docs) {
  const text = read(join(skillDir, doc));
  const base = doc.includes('/') ? join(skillDir, dirname(doc)) : skillDir;
  for (const [, ref] of text.matchAll(/`((?:library|patterns|scripts)\/[\w.-]+\.(?:md|mjs)|[\w-]+\.(?:md|mjs))`/g)) {
    if (!existsSync(join(skillDir, ref)) && !existsSync(join(base, ref))) fail(`${doc} points at ${ref}, which doesn't exist`);
  }
}

// --- library matches its lock
const lockPath = join(root, 'tools', 'library.lock.json');
const lock = JSON.parse(read(lockPath));
const libDir = join(skillDir, 'library');
const shipped = readdirSync(libDir).filter((f) => f.endsWith('.md') && f !== 'INDEX.md');
const index = read(join(libDir, 'INDEX.md'));
for (const entry of lock) {
  const file = join(libDir, `${entry.slug}.md`);
  if (!existsSync(file)) {
    fail(`library/${entry.slug}.md is in the lock but missing`);
    continue;
  }
  const buf = readFileSync(file);
  if (createHash('sha256').update(buf).digest('hex') !== entry.sha256) fail(`library/${entry.slug}.md differs from the lock; re-run the sync`);
  if (!index.includes(`\`${entry.slug}.md\``)) fail(`library/INDEX.md doesn't list ${entry.slug}.md`);
  if (!index.includes(entry.url)) fail(`library/INDEX.md doesn't link ${entry.url}`);
}
for (const f of shipped) if (!lock.some((e) => `${e.slug}.md` === f)) fail(`library/${f} isn't in the lock`);
// The builds keep the database's own line endings, so git must never convert them.
if (!/library\/\*\.md -text/.test(read(join(root, '.gitattributes')))) fail('.gitattributes lost the -text rule for library/*.md');

// --- nothing borrowed
const self = fileURLToPath(import.meta.url);
const BORROWED = [
  /motion\s?sites/i, /uber\s?designer/i, /elaya/i, /slop\s?scan/i, /taste-skill/i, /leonxlnx/i,
  /higgs\.ai/i, /cloudfront\.net/i, /figma\.site/i, /media shelf/i, /look-and-fix/i, /contact sheet/i,
  /spec-template/i, /\bcraft\.md\b/i,
];
for (const file of walk(root)) {
  if (file === self || file === lockPath || /\.(png|jpe?g|webp|gif|zip)$/i.test(file)) continue;
  const text = read(file);
  for (const re of BORROWED) if (re.test(text)) fail(`${relative(root, file)} mentions ${re}`);
}

// --- manifests
const market = JSON.parse(read(join(root, '.claude-plugin', 'marketplace.json')));
const plugin = JSON.parse(read(join(root, 'plugins', PLUGIN, '.claude-plugin', 'plugin.json')));
if (plugin.name !== PLUGIN) fail(`plugin.json name is "${plugin.name}"`);
if (!market.plugins?.some((p) => p.name === PLUGIN && p.source === `./plugins/${PLUGIN}`)) fail('marketplace.json doesn\'t list the plugin at ./plugins/' + PLUGIN);

// --- the credit links carry the campaign tags, and the script parses
if (!/utm_source=claude-skill/.test(skillMd)) fail('SKILL.md credit links lost their utm tags');
try {
  execFileSync(process.execPath, ['--check', join(skillDir, 'scripts', 'scrollshot.mjs')]);
} catch (e) {
  fail(`scripts/scrollshot.mjs doesn't parse: ${String(e.stderr || e.message).split('\n')[0]}`);
}

if (problems.length) {
  console.error(`${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`ok: ${lock.length} library builds match the lock, ${walk(root).length} files clean`);
