import { h } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { sectionHead, panel } from '../core/ui.js';
import { ABOUT, TIMELINE, PROFILE } from '../data/content.js';

function principleCard(item) {
  const card = h('article.card.card--flat.reveal');
  const head = h('div.card-head');
  head.appendChild(h('div.icon-badge', null, icon(item.icon, 20)));
  head.appendChild(h('h3.card-title', null, item.title));
  card.appendChild(head);
  card.appendChild(h('p.card-body', null, item.desc));
  return card;
}

export function render() {
  const section = h('section.section', { id: 'about' });
  const wrap = h('div.wrap');

  wrap.appendChild(
    sectionHead({
      eyebrow: 'ABOUT',
      title: '关于我',
      desc: '一段尽量具体、少形容词的自我介绍。',
      counter: PROFILE.location + ' · ' + PROFILE.email
    })
  );

  const prose = h('div.panel-stack');
  const body = h('div', { style: { display: 'grid', gap: 'var(--sp-4)' } });
  for (const p of ABOUT.paragraphs) {
    body.appendChild(h('p', { style: { color: 'var(--ink-2)', lineHeight: '1.85' } }, p));
  }
  prose.appendChild(panel('我在做什么', null, body));

  const pr = h('div', { style: { display: 'grid', gap: 'var(--sp-3)' } });
  for (const item of ABOUT.principles) pr.appendChild(principleCard(item));
  const prWrap = h('div', { style: { display: 'grid', gap: 'var(--sp-3)' } });
  prWrap.appendChild(h('p.eyebrow', null, '工作原则'));
  prWrap.appendChild(pr);

  const row = h('div.split-2');
  row.appendChild(prose);
  row.appendChild(prWrap);
  wrap.appendChild(row);

  const tlList = h('div.timeline');
  for (const item of TIMELINE) {
    const li = h('div.tl-item');
    li.appendChild(h('div.tl-when', null, item.when));
    li.appendChild(h('div.tl-what', null, item.what));
    li.appendChild(h('div.tl-note', null, item.note));
    tlList.appendChild(li);
  }
  const tlPanel = panel('时间线', '关键节点', tlList);
  tlPanel.classList.add('reveal');
  wrap.appendChild(h('div', { style: { marginTop: 'var(--sp-5)' } }, tlPanel));

  section.appendChild(wrap);
  return section;
}
