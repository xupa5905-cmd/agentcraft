import { h, clear } from '../core/dom.js';
import { sectionHead, iconBadge, chip, emptyState } from '../core/ui.js';
import { MECHANISMS, MECH_GROUPS, SKILLS } from '../data/content.js';

function mechCard(item) {
  const card = h('article.card.mech-card.reveal');

  const head = h('div.card-head');
  head.appendChild(iconBadge(item.icon));
  const meta = h('div', { style: { flex: '1 1 auto', minWidth: '0' } });
  meta.appendChild(h('h3.card-title', null, item.name));
  meta.appendChild(h('p.card-sub', null, item.group));
  head.appendChild(meta);
  card.appendChild(head);

  card.appendChild(h('p.card-body', null, item.summary));
  card.appendChild(h('div.mech-scope', null, item.scope));

  const metrics = h('div.agent-meta');
  for (const m of item.metrics) {
    metrics.appendChild(h('div', null, h('span', null, m.label), h('b', null, m.value)));
  }
  card.appendChild(metrics);

  const tags = h('div.tag-row');
  for (const t of item.tags) tags.appendChild(chip(t));
  card.appendChild(tags);

  return card;
}

export function render(ctx) {
  const section = h('section.section', { id: 'agents' });
  const wrap = h('div.wrap');

  wrap.appendChild(
    sectionHead({
      eyebrow: 'MECHANISM',
      title: '运行机制',
      desc: '这 ' + SKILLS.length + ' 个能力包不是各写各的提示词 —— 它们共享同一套判断机制。下面是反复出现在各个平台里的固定动作，每一条都能在能力包里找到对应位置。',
      counter: '共 ' + MECHANISMS.length + ' 项 · 按作用分组'
    })
  );

  let active = '全部';
  const bar = h('div.filter-bar.reveal');
  const grid = h('div.grid.grid-3');

  const paint = () => {
    clear(grid);
    const list = active === '全部' ? MECHANISMS : MECHANISMS.filter((m) => m.group === active);
    if (!list.length) {
      grid.appendChild(emptyState('该分组下暂无内容。'));
      return;
    }
    for (const m of list) grid.appendChild(mechCard(m));
    if (ctx && ctx.afterRender) ctx.afterRender(grid);
  };

  const groups = ['全部'].concat(MECH_GROUPS);
  for (const g of groups) {
    const count = g === '全部' ? MECHANISMS.length : MECHANISMS.filter((m) => m.group === g).length;
    const btn = h(
      'button.filter-btn',
      {
        type: 'button',
        'aria-pressed': 'false',
        onclick: () => {
          active = g;
          Array.prototype.forEach.call(bar.children, (b) => {
            const on = b === btn;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          paint();
        }
      },
      g + ' ' + count
    );
    if (g === '全部') {
      btn.classList.add('is-on');
      btn.setAttribute('aria-pressed', 'true');
    }
    bar.appendChild(btn);
  }

  wrap.appendChild(bar);
  paint();
  wrap.appendChild(grid);
  section.appendChild(wrap);
  return section;
}
