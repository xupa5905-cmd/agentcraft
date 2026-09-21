import { s } from './dom.js';

const P = (d) => ['path', { d }];
const C = (cx, cy, r) => ['circle', { cx, cy, r }];
const R = (x, y, width, height, rx) => ['rect', { x, y, width, height, rx: rx === undefined ? 2 : rx }];

export const ICONS = {
  cpu: [
    R(7, 7, 10, 10, 1.5),
    R(10.5, 10.5, 3, 3, 0.5),
    P('M10 3.5V7M14 3.5V7M10 17v3.5M14 17v3.5M3.5 10H7M3.5 14H7M17 10h3.5M17 14h3.5')
  ],
  code: [P('M9.5 8.5L5.5 12l4 3.5'), P('M14.5 8.5l4 3.5-4 3.5'), P('M13 6l-2 12')],
  terminal: [R(3, 4.5, 18, 15), P('M7 10.5l2.5 2.5L7 15.5'), P('M12.5 16h4.5')],
  database: [
    ['ellipse', { cx: 12, cy: 6.5, rx: 7.5, ry: 3.2 }],
    P('M4.5 6.5v11c0 1.77 3.36 3.2 7.5 3.2s7.5-1.43 7.5-3.2v-11'),
    P('M4.5 12c0 1.77 3.36 3.2 7.5 3.2s7.5-1.43 7.5-3.2')
  ],
  bolt: [P('M13.5 2.5L5.5 13.5h5l-1 8 8-11h-5l1-8z')],
  shield: [P('M12 3l7.5 3v5.6c0 4.3-3.1 7.6-7.5 9.4-4.4-1.8-7.5-5.1-7.5-9.4V6L12 3z')],
  chart: [P('M3.5 3.5v17h17'), P('M7 15.5l4-4.5 3 3 5-7')],
  bot: [
    R(4, 8, 16, 11, 3),
    P('M12 4.6v3.4'),
    C(12, 3.4, 1.2),
    P('M9 12.5v1.6M15 12.5v1.6'),
    P('M8.5 19v2M15.5 19v2')
  ],
  network: [
    C(12, 5, 2.4),
    C(5, 18, 2.4),
    C(19, 18, 2.4),
    P('M10.3 6.9L6.6 15.5M13.7 6.9l3.7 8.6M7.4 18h9.2')
  ],
  layers: [
    P('M12 3l8.5 4.5L12 12 3.5 7.5 12 3z'),
    P('M3.5 12.5L12 17l8.5-4.5'),
    P('M3.5 17L12 21.5 20.5 17')
  ],
  spark: [P('M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3z')],
  search: [C(11, 11, 6.4), P('M15.8 15.8l4.2 4.2')],
  cloud: [P('M7.5 18.5h9.2a4.3 4.3 0 000-8.6 5.8 5.8 0 00-11.1 1.7 3.8 3.8 0 001.9 6.9z')],
  lock: [R(4.5, 10.5, 15, 10, 2.5), P('M8 10.5V7.5a4 4 0 018 0v3'), P('M12 14.5v2.5')],
  flow: [
    R(3, 3.5, 7, 6, 1.5),
    R(14, 14.5, 7, 6, 1.5),
    R(3, 14.5, 7, 6, 1.5),
    P('M10 6.5h4a3 3 0 013 3v5')
  ],
  globe: [C(12, 12, 8.5), P('M3.5 12h17'), P('M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5s1.2-6.1 3.6-8.5z')],
  clock: [C(12, 12, 8.5), P('M12 7v5.4l3.4 2')],
  eye: [P('M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z'), C(12, 12, 2.6)],
  cube: [P('M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2l8-4.4z'), P('M4 7.2l8 4.4 8-4.4'), P('M12 11.6v9.6')],
  settings: [C(12, 12, 4), P('M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1')],
  book: [
    P('M3.5 5h6a3 3 0 013 3v11a2.5 2.5 0 00-2.5-2.5h-6.5V5z'),
    P('M20.5 5h-6a3 3 0 00-3 3v11a2.5 2.5 0 012.5-2.5h6.5V5z')
  ],
  mail: [R(3, 5.5, 18, 13, 2.5), P('M3.6 7.2l8.4 6 8.4-6')],
  link: [
    P('M10 13.5a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1 1'),
    P('M14 10.5a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1-1')
  ],
  arrowOut: [P('M7 17L17 7'), P('M9 7h8v8')],
  arrowDown: [P('M12 5v14'), P('M6 13l6 6 6-6')],
  target: [C(12, 12, 8.5), C(12, 12, 4.2), C(12, 12, 0.6)],
  pulse: [P('M3 12h4l2.5-6 4 12 2.5-6h5')],
  pin: [P('M12 21s6.5-6.2 6.5-11a6.5 6.5 0 10-13 0C5.5 14.8 12 21 12 21z'), C(12, 10, 2.4)],
  user: [C(12, 8, 4), P('M4.5 20.5a7.5 7.5 0 0115 0')],
  dot: [C(12, 12, 3.2)]
};

export const ICON_NAMES = Object.keys(ICONS);

export function icon(name, size, opts) {
  const spec = ICONS[name] || ICONS.dot;
  const o = opts || {};
  const el = s('svg', {
    viewBox: '0 0 24 24',
    width: size || 20,
    height: size || 20,
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': o.weight || 1.6,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    focusable: 'false'
  });
  for (const entry of spec) {
    const node = s(entry[0], entry[1]);
    el.appendChild(node);
  }
  return el;
}

export function brandMark(size) {
  const el = s('svg', {
    viewBox: '0 0 64 64',
    width: size || 30,
    height: size || 30,
    'aria-hidden': 'true',
    focusable: 'false'
  });
  el.appendChild(s('path', {
    d: 'M32 10 L50 21 L50 43 L32 54 L14 43 L14 21 Z',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2.6,
    'stroke-linejoin': 'round',
    opacity: '.9'
  }));
  el.appendChild(s('circle', { cx: 32, cy: 32, r: 6.2, fill: 'currentColor', opacity: '.85' }));
  el.appendChild(s('path', {
    d: 'M32 25.8V16M32 38.2V48M26.6 28.9L18 24M37.4 35.1L46 40M37.4 28.9L46 24M26.6 35.1L18 40',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    opacity: '.75'
  }));
  return el;
}
