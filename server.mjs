import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const rootFlag = argv.indexOf('--root');
const ROOT = resolve(
  (rootFlag >= 0 && argv[rootFlag + 1]) || process.env.SERVE_ROOT || fileURLToPath(new URL('.', import.meta.url))
);
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function safeJoin(target) {
  const p = resolve(join(ROOT, normalize(target)));
  if (p !== ROOT && !p.startsWith(ROOT + sep)) return null;
  return p;
}

async function tryRead(file) {
  try {
    const info = await stat(file);
    if (!info.isFile()) return null;
    return await readFile(file);
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  let pathname = '/';
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  } catch {
    pathname = '/';
  }
  if (pathname.endsWith('/')) pathname += 'index.html';

  const target = safeJoin(pathname);
  let body = target ? await tryRead(target) : null;
  let resolved = target;

  if (!body && target && (await tryRead(target + sep + 'index.html'))) {
    resolved = target + sep + 'index.html';
    body = await tryRead(resolved);
  }

  if (!body) {
    resolved = join(ROOT, 'index.html');
    body = await tryRead(resolved);
  }

  if (!body) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const type = MIME[extname(resolved || '').toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
});

server.listen(PORT, HOST, () => {
  process.stdout.write('serving ' + ROOT + '\n');
  process.stdout.write('http://' + HOST + ':' + PORT + '\n');
});
