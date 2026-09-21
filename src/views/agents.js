import { h, clear } from '../core/dom.js';
import { sectionHead, iconBadge, badge, chip, linkInline, emptyState } from '../core/ui.js';
import { AGENTS, STATUS_LABEL } from '../data/content.js';

const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'live', label: '已上线' },
  { key: 'beta', label: '内测中' },
  { key: 'lab', label: '实验中' }
];

function agentCard(agent) {
  const card = h('article.card.agent-card.reveal');

  const head = h('div.card-head');
  head.appendChild(iconBadge(agent.icon));
  const meta = h('div', { style: { flex: '1 1 auto', minWidth: '0' } });
  meta.appendChild(h('h3.card-title', null, agent.name));
  const st = STATUS_LABEL[agent.status] || STATUS_LABEL.lab;
  meta.appendChild(h('div', { style: { marginTop: '6px' } }, badge(st.kind, st.text)));
  head.appendChild(meta);
  card.appendChild(head);

  card.appendChild(h('p.card-body', null, agent.summary));

  const problem = h('div', {
    style: {
      padding: '10px 12px',
      borderRadius: '10px',
      border: '1px dashed var(--line-2)',
      fontSize: 'var(--t-xs)',
      lineHeight: '1.7',
      color: 'var(--ink-3)'
    }
  }, agent.problem);
  card.appendChild(problem);

  const metrics = h('div.agent-meta');
  for (const m of agent.metrics) {
    metrics.appendChild(h('div', null, h('span', null, m.label), h('b', null, m.value)));
  }
  card.appendChild(metrics);

  const stackRow = h('div.tag-row');
  for (const t of agent.stack) stackRow.appendChild(chip(t));
  card.appendChild(stackRow);

  const links = h('div.agent-links');
  for (const l of agent.links) links.appendChild(linkInline(l.label, l.href, l.icon));
  card.appendChild(links);

  return card;
}

export function render(ctx) {
  const section = h('section.section', { id: 'agents' });
  const wrap = h('div.wrap');

  wrap.appendChild(
    sectionHead({
      eyebrow: 'AGENTS',
      title: 'Agent 作品',
      desc: '每个 Agent 都对应一个真实存在的重复劳动。下面写清它接手了什么、怎么判断它做对了、以及它现在跑在什么状态。',
      counter: '共 ' + AGENTS.length + ' 个 · 按状态分组'
    })
  );

  let active = 'all';
  const bar = h('div.filter-bar.reveal');
  const grid = h('div.grid.grid-2');

  const paint = () => {
    clear(grid);
    const list = active === 'all' ? AGENTS : AGENTS.filter((a) => a.status === active);
    if (!list.length) {
      grid.appendChild(emptyState('该状态下暂无 Agent。'));
      return;
    }
    for (const a of list) grid.appendChild(agentCard(a));
    if (ctx && ctx.afterRender) ctx.afterRender(grid);
  };

  for (const f of FILTERS) {
    const count = f.key === 'all' ? AGENTS.length : AGENTS.filter((a) => a.status === f.key).length;
    const btn = h(
      'button.filter-btn',
      {
        type: 'button',
        'aria-pressed': 'false',
        onclick: () => {
          active = f.key;
          Array.prototype.forEach.call(bar.children, (b) => {
            const on = b === btn;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          paint();
        }
      },
      f.label + ' ' + count
    );
    if (f.key === 'all') {
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
