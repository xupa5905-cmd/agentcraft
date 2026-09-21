import { h } from './dom.js';
import { icon } from './icons.js';

export function eyebrow(label) {
  return h('p.eyebrow', null, label);
}

export function sectionHead(opts) {
  const wrap = h('div.section-head.reveal');
  if (opts.eyebrow) wrap.appendChild(eyebrow(opts.eyebrow));
  if (opts.title) wrap.appendChild(h('h2.section-title', null, opts.title));
  if (opts.desc) wrap.appendChild(h('p.section-desc', null, opts.desc));
  if (opts.counter) {
    const row = h('p.counter', { style: { marginTop: '14px' } }, opts.counter);
    wrap.appendChild(row);
  }
  return wrap;
}

export function tagRow(list) {
  const row = h('div.tag-row');
  for (const t of list || []) row.appendChild(h('span.tag', null, t));
  return row;
}

export function chip(label) {
  return h('span.chip', null, label);
}

export function badge(kind, label) {
  return h('span.badge.badge--' + kind, null, h('i'), label);
}

export function metricTile(o) {
  const tile = h('div.metric.reveal');
  tile.appendChild(h('div.metric-label', null, o.label));
  const value = h('div.metric-value');
  if (typeof o.value === 'number') {
    value.appendChild(h('span', { 'data-count-to': String(o.value), 'data-count-suffix': o.suffix || '' }, '0'));
  } else {
    value.appendChild(document.createTextNode(String(o.value)));
  }
  if (o.unit) value.appendChild(h('em', null, o.unit));
  tile.appendChild(value);
  if (o.hint) tile.appendChild(h('div.metric-hint', null, o.hint));
  return tile;
}

export function noteStrip(label, iconName) {
  return h('div.note-strip', null, icon(iconName || 'spark', 15), h('span', null, label));
}

export function linkInline(label, href, iconName) {
  const a = h(
    'a.link-inline',
    { href: href || '#', target: href && href.startsWith('http') ? '_blank' : null, rel: 'noopener noreferrer' },
    label,
    icon(iconName || 'arrowOut', 13)
  );
  return a;
}

export function terminal(o) {
  const box = h('div.terminal');
  const bar = h('div.terminal-bar');
  bar.appendChild(h('i'));
  bar.appendChild(h('i'));
  bar.appendChild(h('i'));
  bar.appendChild(h('span', null, o.title || 'shell'));
  box.appendChild(bar);
  const body = h('div.terminal-body');
  for (const line of o.lines || []) {
    if (typeof line === 'string') {
      body.appendChild(document.createTextNode(line + '\n'));
      continue;
    }
    for (const tok of line) {
      const span = h('span', tok.t ? { class: tok.t } : null);
      span.appendChild(document.createTextNode(tok.v));
      body.appendChild(span);
    }
    body.appendChild(document.createTextNode('\n'));
  }
  box.appendChild(body);
  return box;
}

export function legend(items) {
  const wrap = h('div.legend');
  for (const it of items) {
    wrap.appendChild(h('span', null, h('i.' + (it.cls || 'dot-1')), it.label));
  }
  return wrap;
}

export function panel(title, meta, body) {
  const p = h('div.panel');
  if (title) {
    const head = h('div.panel-title', null, h('span', null, title), meta ? h('small', null, meta) : null);
    p.appendChild(head);
  }
  if (body) p.appendChild(body);
  return p;
}

export function meter(value, captionLeft, captionRight) {
  const wrap = h('div.skill-meter');
  const head = h('div.meter-head', null, h('span', null, captionLeft), h('b', null, captionRight));
  wrap.appendChild(head);
  const track = h('div.meter');
  const fill = h('div.meter-fill', { style: { '--val': value + '%' }, 'data-meter': String(value) });
  track.appendChild(fill);
  wrap.appendChild(track);
  return wrap;
}

export function iconBadge(name) {
  return h('div.icon-badge', null, icon(name, 21));
}

export function emptyState(label) {
  return h('div.empty-state', null, label);
}
