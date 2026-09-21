import { h } from '../core/dom.js';
import { sectionHead, tagRow, chip, iconBadge, noteStrip } from '../core/ui.js';
import { AGENTS } from '../data/content.js';

/** 占位骨架的行宽，做出「内容待补」的观感 */
const SKELETON_WIDTHS = ['100%', '86%', '68%'];

function placeholderCard(agent, index) {
  const card = h('article.card.agent-card.is-placeholder.reveal');

  const head = h('div.card-head');
  head.appendChild(iconBadge(agent.icon || 'bot'));
  const meta = h('div');
  meta.appendChild(h('h3.card-title', null, 'Agent ' + String(index + 1).padStart(2, '0')));
  meta.appendChild(h('p.card-sub', null, '占位 · 待补充'));
  head.appendChild(meta);
  card.appendChild(head);

  const body = h('div.skel-body');
  for (const w of SKELETON_WIDTHS) {
    body.appendChild(h('span.skel-line', { style: { width: w }, 'aria-hidden': 'true' }));
  }
  card.appendChild(body);

  card.appendChild(h('p.agent-hint', null, '内容待补 —— 在 content.js 的 AGENTS 里填。'));

  const foot = h('div.card-foot');
  foot.appendChild(chip('待补充'));
  card.appendChild(foot);

  return card;
}

function agentCard(agent) {
  const card = h('article.card.agent-card.reveal');

  const head = h('div.card-head');
  head.appendChild(iconBadge(agent.icon || 'bot'));
  const meta = h('div');
  meta.appendChild(h('h3.card-title', null, agent.name));
  if (agent.role) meta.appendChild(h('p.card-sub', null, agent.role));
  head.appendChild(meta);
  card.appendChild(head);

  if (agent.desc) card.appendChild(h('p.card-body', null, agent.desc));

  if (agent.highlights && agent.highlights.length) {
    const list = h('ul.skill-list');
    for (const item of agent.highlights) list.appendChild(h('li', null, item));
    card.appendChild(list);
  }

  if (agent.tags && agent.tags.length) card.appendChild(tagRow(agent.tags));

  if (agent.status) {
    const foot = h('div.card-foot');
    foot.appendChild(chip(agent.status));
    card.appendChild(foot);
  }

  return card;
}

export function render(ctx) {
  const section = h('section.section', { id: 'agents' });
  const wrap = h('div.wrap');

  const filled = AGENTS.filter((a) => !a.placeholder).length;
  const pending = AGENTS.length - filled;

  wrap.appendChild(
    sectionHead({
      eyebrow: 'AGENT',
      title: 'Agent 能力',
      desc: 'Skills 沉淀的是「怎么判断」，Agent 承担的是「把判断跑起来」——取数、核验、重复动作交给它，决策仍留给人。下面这一排位置是预留的，正在陆续补充。',
      counter: '共 ' + AGENTS.length + ' 个位置 · 已补充 ' + filled + ' 个 · 待补充 ' + pending + ' 个'
    })
  );

  const grid = h('div.grid.grid-3');
  AGENTS.forEach((agent, i) => {
    grid.appendChild(agent.placeholder ? placeholderCard(agent, i) : agentCard(agent));
  });

  wrap.appendChild(grid);
  wrap.appendChild(
    h(
      'div',
      { style: { marginTop: 'var(--sp-5)' } },
      noteStrip('上方 Skills 是已经沉淀好的能力包；这里的 6 个 Agent 位置是预留的，填内容只需改 content.js 的 AGENTS 数组。', 'bot')
    )
  );

  if (ctx && ctx.afterRender) ctx.afterRender(wrap);
  section.appendChild(wrap);
  return section;
}
