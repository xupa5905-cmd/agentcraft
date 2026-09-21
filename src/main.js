import { h, clear } from './core/dom.js';
import { brandMark } from './core/icons.js';
import { NAV, PROFILE, META, FOOT_NOTE } from './data/content.js';
import {
  initReveal,
  initCounters,
  initMeters,
  initTypewriter,
  initCursorGlow,
  initScrollProgress,
  initTopbar,
  initScrollSpy
} from './core/motion.js';
import * as hero from './views/hero.js';
import * as skills from './views/skills.js';
import * as mechanisms from './views/mechanisms.js';
import * as insights from './views/insights.js';
import * as about from './views/about.js';
import * as contact from './views/contact.js';

const VIEWS = [hero, skills, mechanisms, insights, about, contact];

const ctx = {
  afterRender(node) {
    if (!node) return;
    initReveal(node);
    initCounters(node);
    initMeters(node);
  }
};

function buildShell() {
  const app = document.getElementById('app');
  clear(app);

  const progress = h('div.progress-track', null, h('div.progress-fill'));
  const fill = progress.firstChild;
  app.appendChild(progress);

  const bar = h('header.topbar');
  const inner = h('div.wrap.topbar-inner');

  const brand = h('a.brand', { href: '#hero', 'aria-label': META.siteName });
  brand.appendChild(h('span.brand-mark', null, brandMark(30)));
  brand.appendChild(h('span.brand-text', null, META.siteName));
  inner.appendChild(brand);

  const nav = h('nav.nav-links', { 'aria-label': '主导航' });
  for (const item of NAV) {
    nav.appendChild(h('a.nav-link', { href: '#' + item.id, 'data-target': item.id }, item.label));
  }
  inner.appendChild(nav);
  inner.appendChild(h('a.btn.btn--sm.nav-cta', { href: '#contact' }, '联系我'));
  bar.appendChild(inner);
  app.appendChild(bar);

  const main = h('main', { id: 'main' });
  for (const view of VIEWS) {
    if (typeof view.render === 'function') main.appendChild(view.render(ctx));
  }
  app.appendChild(main);

  const foot = h('footer.site-foot');
  const footInner = h('div.wrap.foot-inner');
  footInner.appendChild(h('span', null, META.owner + '  ·  ' + META.siteName));
  footInner.appendChild(
    h('span.foot-meta', null, 'v' + META.version + '  ·  ' + META.builtAt + '  ·  ' + META.stack)
  );
  foot.appendChild(footInner);
  foot.appendChild(
    h(
      'div.wrap',
      { style: { marginTop: '12px' } },
      h('p', { style: { fontSize: 'var(--t-xs)', color: 'var(--ink-4)', lineHeight: '1.7' } }, FOOT_NOTE)
    )
  );
  app.appendChild(foot);

  return { fill, bar };
}

export function boot() {
  const shell = buildShell();

  initCursorGlow(document.getElementById('cursor-glow'));
  initScrollProgress(shell.fill);
  initTopbar(shell.bar);

  initReveal(document);
  initCounters(document);
  initMeters(document);
  initScrollSpy();

  const typewriter = document.getElementById('typewriter');
  if (typewriter) initTypewriter(typewriter, PROFILE.tagline);
}

export function autostart() {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}

autostart();
