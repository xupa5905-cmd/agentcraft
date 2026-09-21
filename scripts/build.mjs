/**
 * 零依赖构建：把站点运行时需要的文件组装到 dist/。
 *
 * 只复制「浏览器真正要加载的东西」——scripts/、server.mjs、package.json
 * 这些开发期文件不会进入产物，避免它们被公开发布。
 *
 * 用法：
 *   node scripts/build.mjs
 *   SITE_URL=https://agentcraft.is-a.dev node scripts/build.mjs
 *
 * 设置 SITE_URL 后会额外生成 sitemap.xml，并把 index.html 里的
 * %SITE_URL% 占位替换掉；未设置时，含占位符的整行会被移除。
 */

import { cp, mkdir, rm, writeFile, readdir } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT = join(ROOT, 'dist');
const SITE_URL = String(process.env.SITE_URL || '').trim().replace(/\/+$/, '');

/** 需要进入产物的顶层条目 */
const COPY = ['index.html', 'favicon.svg', 'styles', 'src'];

async function walk(dir, acc) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const item of COPY) {
    await cp(join(ROOT, item), join(OUT, item), { recursive: true });
  }

  // index.html：注入站点地址（未配置时移除占位行）
  const indexPath = join(OUT, 'index.html');
  const { readFile } = await import('node:fs/promises');
  let html = await readFile(indexPath, 'utf8');
  if (SITE_URL) {
    html = html.split('%SITE_URL%').join(SITE_URL);
  } else {
    html = html.replace(/^[ \t]*.*%SITE_URL%.*\r?\n/gm, '');
  }
  await writeFile(indexPath, html);

  // robots.txt
  await writeFile(
    join(OUT, 'robots.txt'),
    'User-agent: *\nAllow: /\n' + (SITE_URL ? 'Sitemap: ' + SITE_URL + '/sitemap.xml\n' : '')
  );

  // sitemap.xml（仅在有站点地址时生成）
  if (SITE_URL) {
    await writeFile(
      join(OUT, 'sitemap.xml'),
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '  <url><loc>' + SITE_URL + '/</loc><changefreq>monthly</changefreq></url>\n' +
        '</urlset>\n'
    );
  }

  const files = await walk(OUT, []);
  const lines = ['构建完成  →  dist/', '站点地址  ' + (SITE_URL || '（未设置，已跳过 sitemap 与 og:url）'), '产物文件  ' + files.length + ' 个', ''];
  for (const f of files.sort()) lines.push('  ' + relative(OUT, f).split('\\').join('/'));
  process.stdout.write(lines.join('\n') + '\n');
}

await main();
