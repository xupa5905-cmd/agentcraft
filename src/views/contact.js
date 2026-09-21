import { h } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { sectionHead, panel, terminal } from '../core/ui.js';
import { CONTACT } from '../data/content.js';

function contactLine(line) {
  const row = h('div.contact-line');
  row.appendChild(icon(line.icon, 17));
  row.appendChild(h('b', null, line.label));
  const inner = line.href
    ? h('a.link-inline', { href: line.href, rel: 'noopener noreferrer' }, line.value, icon('arrowOut', 13))
    : h('em', null, line.value);
  row.appendChild(inner);
  return row;
}

export function render() {
  const section = h('section.section', { id: 'contact' });
  const wrap = h('div.wrap');

  wrap.appendChild(
    sectionHead({
      eyebrow: 'CONTACT',
      title: CONTACT.title,
      desc: CONTACT.desc
    })
  );

  const left = h('div.contact-card');
  for (const line of CONTACT.lines) left.appendChild(contactLine(line));

  const cta = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)' } });
  const primary = CONTACT.lines.find((l) => l.href && l.href.indexOf('mailto:') === 0);
  if (primary) {
    cta.appendChild(h('a.btn.btn--primary', { href: primary.href }, '发一封邮件', icon('mail', 16)));
  }
  const gh = CONTACT.lines.find((l) => l.href && l.href.indexOf('http') === 0);
  if (gh) {
    cta.appendChild(
      h('a.btn', { href: gh.href, target: '_blank', rel: 'noopener noreferrer' }, '打开 GitHub', icon('code', 16))
    );
  }
  left.appendChild(cta);

  const leftPanel = panel('联系方式', null, left);
  leftPanel.classList.add('reveal');

  const term = terminal(CONTACT.terminal);
  term.classList.add('reveal');

  const row = h('div.split-2');
  row.appendChild(leftPanel);
  row.appendChild(term);
  wrap.appendChild(row);

  section.appendChild(wrap);
  return section;
}
