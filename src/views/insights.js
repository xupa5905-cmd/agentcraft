import { h } from '../core/dom.js';
import { sectionHead, metricTile, panel, legend, noteStrip } from '../core/ui.js';
import { donut, bars, hbars, sparkline } from '../core/charts.js';
import { INSIGHTS } from '../data/content.js';

function rosterTable(rows) {
  const wrap = h('div.roster');
  const head = h('div.roster-row.roster-head');
  for (const t of ['能力包', '版本', '结构', '体积', '分组']) head.appendChild(h('span', null, t));
  wrap.appendChild(head);
  for (const r of rows) {
    const row = h('div.roster-row');
    row.appendChild(h('b', null, r.short));
    row.appendChild(h('em', null, r.version));
    row.appendChild(h('em', null, r.structure));
    row.appendChild(h('em', null, r.size));
    row.appendChild(h('span', null, r.group));
    wrap.appendChild(row);
  }
  return wrap;
}

export function render() {
  const section = h('section.section', { id: 'insights' });
  const wrap = h('div.wrap');

  wrap.appendChild(
    sectionHead({
      eyebrow: 'METRICS',
      title: '能力包数据',
      desc: '以下数字全部取自能力包自身的真实元数据：版本号、结构文件数与体积，不含估算的使用强度。使用日志接入后再补调用量与节省工时。',
      counter: '共 ' + INSIGHTS.totals[0].value + ' 个能力包 · 覆盖 ' + INSIGHTS.totals[1].value + ' 个平台'
    })
  );

  const totals = h('div.grid.grid-metric');
  for (const t of INSIGHTS.totals) {
    totals.appendChild(metricTile({ label: t.label, value: t.value, unit: t.unit, hint: t.hint }));
  }
  wrap.appendChild(totals);

  const totalCats = INSIGHTS.categories.reduce((a, b) => a + b.value, 0);

  const donutWrap = h('div.chart-wrap');
  donutWrap.appendChild(
    donut(INSIGHTS.categories, {
      centerValue: String(totalCats),
      centerLabel: '项能力',
      ariaLabel: '能力类型占比环形图'
    })
  );
  const donutPanel = panel('能力类型占比', '按用途分类', donutWrap);
  donutPanel.appendChild(
    legend(INSIGHTS.categories.map((c, i) => ({ label: c.label + ' · ' + c.value, cls: 'dot-' + ((i % 5) + 1) })))
  );

  const barWrap = h('div.chart-wrap');
  barWrap.appendChild(bars(INSIGHTS.bySize, { barW: 34, gap: 24, title: '各能力包体积' }));
  const barPanel = panel('能力包体积对比', '单位：KB', barWrap);

  const row1 = h('div.split-2', { style: { marginTop: 'var(--sp-5)' } });
  row1.appendChild(donutPanel);
  row1.appendChild(barPanel);
  wrap.appendChild(row1);

  const hbarWrap = h('div.chart-wrap');
  hbarWrap.appendChild(hbars(INSIGHTS.structRank, { width: 380, ariaLabel: '结构文件数排行' }));
  const hbarPanel = panel('结构文件数排行', '单位：个', hbarWrap);

  const trendWrap = h('div.chart-wrap');
  trendWrap.appendChild(sparkline(INSIGHTS.trend, { width: 380, height: 92, ariaLabel: '结构文件累计走势' }));
  const trendPanel = panel('结构文件累计', '按能力包从少到多累加', trendWrap);
  trendPanel.appendChild(
    h(
      'p',
      { style: { marginTop: '10px', fontSize: 'var(--t-xs)', color: 'var(--ink-3)', lineHeight: '1.7' } },
      '把 ' + INSIGHTS.roster.length + ' 个能力包按结构文件数从小到大排列后逐项累加，用于说明整体体量的分布，而不是追求增长曲线。'
    )
  );

  const row2 = h('div.split-2', { style: { marginTop: 'var(--sp-4)' } });
  row2.appendChild(hbarPanel);
  row2.appendChild(trendPanel);
  wrap.appendChild(row2);

  const rosterPanel = panel('能力包清单', '共 ' + INSIGHTS.roster.length + ' 项', rosterTable(INSIGHTS.roster));
  rosterPanel.classList.add('reveal');
  wrap.appendChild(h('div', { style: { marginTop: 'var(--sp-4)' } }, rosterPanel));

  wrap.appendChild(h('div', { style: { marginTop: 'var(--sp-5)' } }, noteStrip(INSIGHTS.caliber, 'target')));

  section.appendChild(wrap);
  return section;
}
