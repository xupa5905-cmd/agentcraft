import { h, clear } from '../core/dom.js';
import { sectionHead, tagRow, chip, meter, iconBadge, emptyState } from '../core/ui.js';
import { SKILLS } from '../data/content.js';

function groups() {
  const seen = [];
  for (const s of SKILLS) if (seen.indexOf(s.group) < 0) seen.push(s.group);
  return ['全部'].concat(seen);
}

function skillCard(skill) {
  const card = h('article.card.skill-card.reveal');

  const head = h('div.card-head');
  head.appendChild(iconBadge(skill.icon));
  const meta = h('div');
  meta.appendChild(h('h3.card-title', null, skill.name));
  meta.appendChild(h('p.card-sub', null, skill.group + ' · v' + skill.version));
  head.appendChild(meta);
  card.appendChild(head);

  card.appendChild(h('p.card-body', null, skill.desc));

  if (skill.highlights && skill.highlights.length) {
    const list = h('ul.skill-list');
    for (const item of skill.highlights) list.appendChild(h('li', null, item));
    card.appendChild(list);
  }

  card.appendChild(tagRow(skill.tags));
  card.appendChild(meter(skill.level, '版本成熟度', 'v' + skill.version));

  const foot = h('div.card-foot');
  foot.appendChild(chip(skill.structure));
  foot.appendChild(chip(skill.size + ' KB'));
  foot.appendChild(chip(skill.structFiles + ' 个结构文件'));
  card.appendChild(foot);

  if (skill.usage) {
    const hint = h('p.card-usage', null, skill.usage);
    card.appendChild(hint);
  }

  return card;
}

export function render(ctx) {
  const section = h('section.section', { id: 'skills' });
  const wrap = h('div.wrap');

  wrap.appendChild(
    sectionHead({
      eyebrow: 'SKILLS',
      title: '能力矩阵',
      desc: '每个 Skill 都是一个边界清晰、可被反复调用的能力单元：以真实利润为第一口径，先诊断再给方案，并标明证据来源与时效。',
      counter: '共 ' + SKILLS.length + ' 项 · 按平台分组 · 合计 ' + SKILLS.reduce((a, s) => a + s.size, 0) + ' KB'
    })
  );

  let active = '全部';

  const bar = h('div.filter-bar.reveal');
  const grid = h('div.grid.grid-3');

  const paint = () => {
    clear(grid);
    const list = active === '全部' ? SKILLS : SKILLS.filter((s) => s.group === active);
    if (!list.length) {
      grid.appendChild(emptyState('该分组下暂无内容。'));
      return;
    }
    for (const skill of list) grid.appendChild(skillCard(skill));
    if (ctx && ctx.afterRender) ctx.afterRender(grid);
  };

  for (const g of groups()) {
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
      g
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
