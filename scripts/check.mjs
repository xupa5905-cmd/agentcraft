import { readFile, readdir } from 'node:fs/promises';
import { join, resolve, dirname, extname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const SKIP_DIRS = new Set(['node_modules', '.git', '.workbuddy', 'dist']);

const BUILTINS = new Set([
  'assert', 'buffer', 'child_process', 'crypto', 'dns', 'events', 'fs', 'http',
  'https', 'net', 'os', 'path', 'perf_hooks', 'process', 'querystring', 'readline',
  'stream', 'string_decoder', 'timers', 'tls', 'tty', 'url', 'util', 'v8', 'vm',
  'worker_threads', 'zlib'
]);

const SCAN_EXEMPT = new Set(['check.mjs']);

const errors = [];
const warnings = [];

function err(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

async function walk(dir, out) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const EXTERNAL_PATTERNS = [
  { re: /<\s*(script|link|img|iframe|source|video|audio)\b[^>]*\b(src|href)\s*=\s*["']?(https?:)?\/\//i, what: 'HTML 引用了外部资源' },
  { re: /@import\s+(url\()?\s*["']?(https?:)?\/\//i, what: 'CSS @import 外部资源' },
  { re: /url\(\s*["']?(https?:)?\/\//i, what: 'CSS url() 指向外部' },
  { re: /(?:from|import)\s*\(\s*["']https?:\/\//i, what: '动态 import 外部地址' },
  { re: /\bfrom\s+["']https?:\/\//i, what: 'ES import 外部地址' },
  { re: /\b(cdn\.|unpkg\.com|jsdelivr|googleapis|fonts\.google|cdnjs\.)/i, what: '出现 CDN / 外链字体域名' }
];

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F2FF}\u{2600}-\u{27BF}\u{FE0F}]/u;

function analyzeImports(source) {
  const specs = [];
  const named = [];
  const re = /import\s+([^'"]*?)\s*from\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(source))) {
    specs.push(m[2]);
    const clause = m[1].trim();
    const braceMatch = clause.match(/\{([^}]*)\}/);
    if (braceMatch) {
      for (const part of braceMatch[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/).pop().trim();
        if (name) named.push({ name, from: m[2] });
      }
    }
  }
  const reDyn = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = reDyn.exec(source))) specs.push(m[1]);
  return { specs, named };
}

function exportedNames(source) {
  const names = new Set();
  let m;
  const reDecl = /export\s+(?:async\s+)?(?:function|const|let|var|class)\s+([A-Za-z0-9_$]+)/g;
  while ((m = reDecl.exec(source))) names.add(m[1]);
  const reList = /export\s*\{([^}]*)\}/g;
  while ((m = reList.exec(source))) {
    for (const part of m[1].split(',')) {
      const token = part.trim().split(/\s+as\s+/).pop().trim();
      if (token) names.add(token);
    }
  }
  return names;
}

const files = await walk(ROOT, []);
const codeFiles = files.filter((f) => ['.js', '.mjs'].includes(extname(f)));
const textFiles = files.filter((f) => ['.html', '.css', '.js', '.mjs', '.svg'].includes(extname(f)));

for (const file of codeFiles) {
  try {
    await execFileAsync(process.execPath, ['--check', file], { cwd: ROOT });
  } catch (e) {
    err('语法错误  ' + relative(ROOT, file) + '\n    ' + String(e.stderr || e.message).trim().split('\n').slice(0, 3).join('\n    '));
  }
}

const moduleExports = new Map();
for (const file of codeFiles) {
  const source = await readFile(file, 'utf8');
  moduleExports.set(resolve(file), exportedNames(source));
}

for (const file of textFiles) {
  const rel = relative(ROOT, file);
  if (SCAN_EXEMPT.has(file.split(sep).pop())) continue;
  const source = await readFile(file, 'utf8');
  for (const p of EXTERNAL_PATTERNS) {
    if (p.re.test(source)) err(rel + '  →  ' + p.what);
  }
  if (EMOJI_RE.test(source)) warn(rel + '  含 emoji，图标应使用内联 SVG');
}

for (const file of codeFiles) {
  const rel = relative(ROOT, file);
  const source = await readFile(file, 'utf8');
  const { specs, named } = analyzeImports(source);

  for (const spec of specs) {
    if (spec.startsWith('node:')) continue;
    if (!spec.startsWith('.')) {
      const pkg = spec.split('/')[0];
      if (BUILTINS.has(pkg)) continue;
      err(rel + '  →  裸模块导入 "' + spec + '"（本工程要求运行时零依赖）');
      continue;
    }
    const target = resolve(dirname(file), spec);
    if (!moduleExports.has(target)) {
      err(rel + '  →  导入路径不可达: ' + spec);
    }
  }

  for (const item of named) {
    const target = resolve(dirname(file), item.from);
    const pool = moduleExports.get(target);
    if (pool && !pool.has(item.name)) {
      err(rel + '  →  ' + item.from + ' 未导出 ' + item.name);
    }
  }
}

const out = [];
out.push('文件总数        ' + files.length);
out.push('脚本/模块       ' + codeFiles.length);
out.push('语法检查        ' + (errors.filter((e) => e.startsWith('语法错误')).length === 0 ? 'PASS' : 'FAIL'));

if (warnings.length) {
  out.push('');
  out.push('警告 (' + warnings.length + ')');
  for (const w of warnings) out.push('  - ' + w);
}

if (errors.length) {
  out.push('');
  out.push('错误 (' + errors.length + ')');
  for (const e of errors) out.push('  - ' + e);
  process.stdout.write(out.join('\n') + '\n');
  process.exit(1);
}

out.push('');
out.push('静态自检全部通过：无外部依赖、无断链导入、无语法错误。');
process.stdout.write(out.join('\n') + '\n');
