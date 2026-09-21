import { s } from './dom.js';

export const PALETTE_STROKE = ['seg-1', 'seg-2', 'seg-3', 'seg-4', 'seg-5'];
export const PALETTE_FILL = ['fill-1', 'fill-2', 'fill-3', 'fill-4', 'fill-5'];

function svgRoot(viewBox, w, h, ariaLabel) {
  return s('svg', { viewBox, width: w, height: h, role: 'img', 'aria-label': ariaLabel });
}

export function donut(items, opts) {
  const o = Object.assign(
    { size: 196, thickness: 15, gapPx: 3, centerValue: '', centerLabel: '', ariaLabel: '占比环形图' },
    opts
  );
  const r = (o.size - o.thickness) / 2 - 2;
  const c = o.size / 2;
  const circ = 2 * Math.PI * r;
  const total = items.reduce((a, b) => a + b.value, 0) || 1;

  const svg = svgRoot('0 0 ' + o.size + ' ' + o.size, o.size, o.size, o.ariaLabel);
  svg.appendChild(s('circle', { cx: c, cy: c, r, fill: 'none', class: 'chart-track', 'stroke-width': o.thickness }));

  const g = s('g', { transform: 'rotate(-90 ' + c + ' ' + c + ')' });
  let acc = 0;
  items.forEach((item, i) => {
    const len = Math.max(0, (item.value / total) * circ - o.gapPx);
    if (len <= 0) {
      acc += (item.value / total) * circ;
      return;
    }
    g.appendChild(
      s('circle', {
        cx: c,
        cy: c,
        r,
        fill: 'none',
        class: 'donut-arc ' + PALETTE_STROKE[i % PALETTE_STROKE.length],
        'stroke-width': o.thickness,
        'stroke-dasharray': len + ' ' + (circ - len),
        'stroke-dashoffset': String(-acc)
      })
    );
    acc += (item.value / total) * circ;
  });
  svg.appendChild(g);

  if (o.centerValue !== '') {
    svg.appendChild(
      s('text', { x: c, y: c - 4, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'donut-value' }, String(o.centerValue))
    );
  }
  if (o.centerLabel !== '') {
    svg.appendChild(
      s('text', { x: c, y: c + 16, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'donut-label' }, String(o.centerLabel))
    );
  }
  return svg;
}

export function bars(items, opts) {
  const o = Object.assign(
    { height: 212, barW: 30, gap: 20, padX: 12, padTop: 32, padBottom: 34, title: '' },
    opts
  );
  const n = Math.max(1, items.length);
  const width = o.padX * 2 + n * o.barW + (n - 1) * o.gap;
  const innerH = o.height - o.padTop - o.padBottom;
  const max = Math.max(1, ...items.map((d) => d.value));
  const y0 = o.padTop + innerH;

  const svg = svgRoot('0 0 ' + width + ' ' + o.height, width, o.height, o.title || '柱状图');
  if (o.title) svg.appendChild(s('title', null, o.title));
  svg.appendChild(s('line', { x1: o.padX, y1: y0, x2: width - o.padX, y2: y0, class: 'chart-grid' }));

  items.forEach((d, i) => {
    const h = Math.max(2, (d.value / max) * innerH);
    const x = o.padX + i * (o.barW + o.gap);
    const y = y0 - h;
    svg.appendChild(
      s('rect', {
        x,
        y,
        width: o.barW,
        height: h,
        rx: 4,
        class: 'bar-rect ' + PALETTE_FILL[i % PALETTE_FILL.length]
      })
    );
    svg.appendChild(
      s('text', { x: x + o.barW / 2, y: y - 9, 'text-anchor': 'middle', class: 'chart-value' }, String(d.value))
    );
    svg.appendChild(
      s('text', { x: x + o.barW / 2, y: y0 + 19, 'text-anchor': 'middle', class: 'chart-axis' }, String(d.label))
    );
  });
  return svg;
}

export function sparkline(values, opts) {
  const o = Object.assign({ width: 300, height: 76, pad: 8, class: 'spark-path' }, opts);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = (o.width - o.pad * 2) / Math.max(1, values.length - 1);
  const pts = values.map((v, i) => {
    const x = o.pad + i * step;
    const y = o.height - o.pad - ((v - min) / span) * (o.height - o.pad * 2);
    return [x, y];
  });

  const svg = svgRoot('0 0 ' + o.width + ' ' + o.height, o.width, o.height, o.ariaLabel || '趋势迷你图');
  const line = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const areaD = line + ' L' + pts[pts.length - 1][0].toFixed(1) + ' ' + o.height + ' L' + pts[0][0].toFixed(1) + ' ' + o.height + ' Z';

  svg.appendChild(s('path', { d: areaD, class: 'spark-area' }));
  svg.appendChild(s('path', { d: line, fill: 'none', class: o.class }));
  const last = pts[pts.length - 1];
  svg.appendChild(s('circle', { cx: last[0].toFixed(1), cy: last[1].toFixed(1), r: 3.4, class: 'spark-dot' }));
  return svg;
}

export function hbars(items, opts) {
  const o = Object.assign({ rowH: 34, width: 360, labelW: 96, valueW: 44 }, opts);
  const height = items.length * o.rowH + 8;
  const max = Math.max(1, ...items.map((d) => d.value));
  const trackW = o.width - o.labelW - o.valueW;

  const svg = svgRoot('0 0 ' + o.width + ' ' + height, o.width, height, o.ariaLabel || '排行条形图');
  items.forEach((d, i) => {
    const y = i * o.rowH + 8;
    const w = Math.max(3, (d.value / max) * trackW);
    svg.appendChild(
      s('text', { x: 0, y: y + 14, class: 'chart-label' }, String(d.label))
    );
    svg.appendChild(s('rect', { x: o.labelW, y: y + 5, width: trackW, height: 9, rx: 5, class: 'chart-track', fill: 'none' }));
    svg.appendChild(
      s('rect', { x: o.labelW, y: y + 5, width: w, height: 9, rx: 5, class: 'bar-rect ' + PALETTE_FILL[i % PALETTE_FILL.length] })
    );
    svg.appendChild(
      s('text', { x: o.width - 4, y: y + 14, 'text-anchor': 'end', class: 'chart-value' }, String(d.value))
    );
  });
  return svg;
}
