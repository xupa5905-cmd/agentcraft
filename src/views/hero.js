import { h, s } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { linkInline } from '../core/ui.js';
import { PROFILE } from '../data/content.js';

const TAU = Math.PI * 2;

const NODES = [
  [12, 205, 5], [68, 205, 4], [124, 205, 5], [186, 205, 3.5], [244, 205, 4], [300, 205, 3.5],
  [40, 155, 5], [150, 155, 4], [262, 155, 5], [318, 155, 3.5],
  [90, 105, 4], [210, 105, 5], [330, 105, 4]
];

function pt(angleDeg, radius) {
  const a = (angleDeg / 360) * TAU;
  return [240 + radius * Math.cos(a), 240 + radius * Math.sin(a)];
}

export function heroOrb() {
  const svg = s('svg', {
    viewBox: '0 0 480 480',
    width: 480,
    height: 480,
    role: 'img',
    'aria-label': 'AI 系统示意图：三层能力环与中心内核'
  });
  svg.appendChild(s('title', null, 'AI 系统示意'));
  svg.appendChild(s('desc', null, '中心为内核，三层同心环上分布能力节点，环上有光点持续环绕。'));

  const defs = s('defs');
  const grad = s('radialGradient', { id: 'coreGrad', cx: '50%', cy: '50%', r: '50%' });
  grad.appendChild(s('stop', { offset: '0%', style: { 'stop-color': 'var(--accent)', 'stop-opacity': '0.95' } }));
  grad.appendChild(s('stop', { offset: '55%', style: { 'stop-color': 'var(--accent-2)', 'stop-opacity': '0.34' } }));
  grad.appendChild(s('stop', { offset: '100%', style: { 'stop-color': 'var(--accent-2)', 'stop-opacity': '0' } }));
  defs.appendChild(grad);
  svg.appendChild(defs);

  [[205, 'orb-ring-dash'], [155, ''], [105, 'orb-ring-dash']].forEach((ring) => {
    svg.appendChild(
      s('circle', {
        cx: 240,
        cy: 240,
        r: ring[0],
        fill: 'none',
        class: 'orb-ring ' + ring[1],
        'stroke-width': 1
      })
    );
  });

  for (const [angle, radius] of NODES) {
    const p = pt(angle, radius);
    svg.appendChild(
      s('line', {
        x1: 240,
        y1: 240,
        x2: p[0].toFixed(1),
        y2: p[1].toFixed(1),
        class: 'orb-line',
        'stroke-width': 1
      })
    );
  }

  svg.appendChild(s('circle', { cx: 240, cy: 240, r: 150, fill: 'url(#coreGrad)', class: 'orb-halo' }));
  svg.appendChild(s('circle', { cx: 240, cy: 240, r: 92, fill: 'none', class: 'orb-pulse', 'stroke-width': 1.4 }));
  svg.appendChild(s('circle', { cx: 240, cy: 240, r: 92, fill: 'none', class: 'orb-pulse orb-pulse-late', 'stroke-width': 1.4 }));

  const core = s('g', { class: 'orb-core' });
  core.appendChild(s('circle', { cx: 240, cy: 240, r: 58, class: 'orb-core-bg' }));
  core.appendChild(s('path', {
    d: 'M240 196 L277 218 L277 262 L240 284 L203 262 L203 218 Z',
    fill: 'none',
    class: 'orb-core-line',
    'stroke-width': 1.6
  }));
  core.appendChild(s('circle', { cx: 240, cy: 240, r: 12, class: 'orb-core-dot' }));
  core.appendChild(s('circle', { cx: 240, cy: 240, r: 6, class: 'orb-core-dot-inner' }));
  svg.appendChild(core);

  for (const [angle, radius] of NODES) {
    const p = pt(angle, radius);
    svg.appendChild(
      s('circle', {
        cx: p[0].toFixed(1),
        cy: p[1].toFixed(1),
        r: 3.2,
        class: 'orb-node'
      })
    );
  }

  [[205, 'orb-spin-1', 4.4], [155, 'orb-spin-2', 3.6], [105, 'orb-spin-3', 5]].forEach((cfg) => {
    const g = s('g', { class: cfg[1] });
    g.appendChild(s('circle', { cx: 240, cy: 240 - cfg[0], r: cfg[2], class: 'orb-runner' }));
    svg.appendChild(g);
  });

  return svg;
}

export function render() {
  const section = h('section.section.hero', { id: 'hero' });
  const wrap = h('div.wrap');
  const grid = h('div.hero-grid');

  const left = h('div.hero-copy');

  const status = h('div.hero-status.reveal');
  status.appendChild(h('i.dot-live'));
  status.appendChild(h('span', null, PROFILE.status));
  left.appendChild(status);

  const title = h('h1.hero-title.reveal');
  title.appendChild(h('span.hero-name', null, PROFILE.name));
  left.appendChild(title);

  const typeRow = h('p.type-line.reveal');
  typeRow.appendChild(h('span', { id: 'typewriter' }, ''));
  typeRow.appendChild(h('span.type-caret', null, '\u00a0'));
  left.appendChild(typeRow);

  left.appendChild(h('p.hero-sub.reveal', null, PROFILE.intro));

  const actions = h('div.hero-actions.reveal');
  actions.appendChild(
    h('a.btn.btn--primary', { href: '#skills' }, '查看能力矩阵', icon('arrowDown', 16))
  );
  actions.appendChild(h('a.btn', { href: '#contact' }, '联系方式', icon('mail', 16)));
  left.appendChild(actions);

  const stats = h('div.hero-stats');
  for (const st of PROFILE.stats) {
    const cell = h('div.reveal');
    cell.appendChild(
      h('div.stat-value', null, h('span', { 'data-count-to': String(st.value), 'data-count-suffix': st.suffix || '' }, '0'))
    );
    cell.appendChild(h('div.stat-label', null, st.label));
    stats.appendChild(cell);
  }
  left.appendChild(stats);

  const links = h('div.hero-links.reveal');
  for (const l of PROFILE.links) links.appendChild(linkInline(l.label, l.href, l.icon));
  left.appendChild(links);

  const cue = h('div.scroll-cue.reveal');
  cue.appendChild(h('i'));
  cue.appendChild(h('span', null, 'SCROLL TO EXPLORE'));
  left.appendChild(cue);

  const right = h('div.hero-visual.reveal');
  right.appendChild(heroOrb());

  grid.appendChild(left);
  grid.appendChild(right);
  wrap.appendChild(grid);
  section.appendChild(wrap);
  return section;
}
