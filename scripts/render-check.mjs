import { resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

class ClassList {
  constructor(el) {
    this.el = el;
  }
  get list() {
    return new Set((this.el.getAttribute('class') || '').split(/\s+/).filter(Boolean));
  }
  add() {
    const s = this.list;
    for (const n of arguments) s.add(n);
    this.el.setAttribute('class', Array.from(s).join(' '));
  }
  remove() {
    const s = this.list;
    for (const n of arguments) s.delete(n);
    this.el.setAttribute('class', Array.from(s).join(' '));
  }
  contains(n) {
    return this.list.has(n);
  }
  toggle(n, force) {
    const has = this.contains(n);
    const want = force === undefined ? !has : !!force;
    if (want) this.add(n);
    else this.remove(n);
    return want;
  }
}

class Style {
  constructor() {
    this.props = new Map();
  }
  setProperty(k, v) {
    this.props.set(String(k), String(v));
  }
  getPropertyValue(k) {
    return this.props.get(String(k)) || '';
  }
  get cssText() {
    return '';
  }
  set cssText(v) {
    /* noop */
  }
}

class TextNode {
  constructor(value) {
    this.nodeType = 3;
    this._value = String(value);
    this.parentNode = null;
  }
  get textContent() {
    return this._value;
  }
  set textContent(v) {
    this._value = String(v);
  }
  get childNodes() {
    return [];
  }
  get children() {
    return [];
  }
  countText() {
    return this._value.length;
  }
}

class Element {
  constructor(tagName, ns) {
    this.nodeType = 1;
    this.tagName = String(tagName).toUpperCase();
    this.namespaceURI = ns || null;
    this._attrs = new Map();
    this.childNodes = [];
    this.parentNode = null;
    this.style = new Style();
    this._listeners = new Map();
    this.classList = new ClassList(this);
    this.scrollHeight = 0;
  }
  get children() {
    return this.childNodes.filter((n) => n.nodeType === 1);
  }
  get firstChild() {
    return this.childNodes[0] || null;
  }
  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }
  get firstElementChild() {
    return this.children[0] || null;
  }
  get nextElementSibling() {
    if (!this.parentNode) return null;
    const sibs = this.parentNode.children;
    const i = sibs.indexOf(this);
    return i >= 0 ? sibs[i + 1] || null : null;
  }
  appendChild(node) {
    if (!node) return node;
    node.parentNode = this;
    this.childNodes.push(node);
    return node;
  }
  removeChild(node) {
    const i = this.childNodes.indexOf(node);
    if (i >= 0) this.childNodes.splice(i, 1);
    if (node) node.parentNode = null;
    return node;
  }
  replaceChildren() {
    this.childNodes = [];
    for (const n of arguments) this.appendChild(n);
  }
  setAttribute(k, v) {
    this._attrs.set(String(k), String(v));
  }
  getAttribute(k) {
    const key = String(k);
    return this._attrs.has(key) ? this._attrs.get(key) : null;
  }
  hasAttribute(k) {
    return this._attrs.has(String(k));
  }
  removeAttribute(k) {
    this._attrs.delete(String(k));
  }
  addEventListener(type, fn) {
    const arr = this._listeners.get(type) || [];
    arr.push(fn);
    this._listeners.set(type, arr);
  }
  removeEventListener(type, fn) {
    const arr = (this._listeners.get(type) || []).filter((f) => f !== fn);
    this._listeners.set(type, arr);
  }
  fire(type) {
    const arr = (this._listeners.get(type) || []).slice();
    for (const fn of arr) fn({ type, target: this, preventDefault() {} });
    return arr.length;
  }
  contains(node) {
    if (node === this) return true;
    return this.children.some((c) => c.contains(node));
  }
  get textContent() {
    return this.childNodes.map((n) => n.textContent).join('');
  }
  set textContent(v) {
    this.childNodes = [];
    if (String(v) !== '') this.appendChild(new TextNode(String(v)));
  }
  get innerHTML() {
    return this._html || '';
  }
  set innerHTML(v) {
    this._html = String(v);
    throw new Error('shim 拒绝 innerHTML 注入（本工程要求全部用 DOM API 构建）');
  }
  countText() {
    return this.textContent.length;
  }
  querySelectorAll(sel) {
    if (/[\s,]/.test(sel)) {
      throw new Error('shim 仅支持单一复合选择器，收到: ' + sel);
    }
    const out = [];
    collect(this, sel, out);
    return out;
  }
  querySelector(sel) {
    return this.querySelectorAll(sel)[0] || null;
  }
}

class Document extends Element {
  constructor() {
    super('#document');
    this.nodeType = 9;
    this.documentElement = new Element('html');
    this.head = new Element('head');
    this.body = new Element('body');
    this.appendChild(this.documentElement);
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.readyState = 'loading';
    this.documentElement.scrollHeight = 2000;
  }
  createElement(tag) {
    return new Element(tag);
  }
  createElementNS(ns, tag) {
    return new Element(tag, ns);
  }
  createTextNode(v) {
    return new TextNode(v);
  }
  createDocumentFragment() {
    const frag = new Element('#fragment');
    frag.nodeType = 11;
    return frag;
  }
  getElementById(id) {
    return findById(this, id);
  }
}

function tokenize(sel) {
  return sel.match(/^[a-zA-Z][\w-]*|#[\w-]+|\.[\w-]+|\[[^\]]+\]/g) || [];
}

function matchCompound(el, sel) {
  const tokens = tokenize(sel);
  if (!tokens.length) return false;
  if (tokens.join('').length !== sel.length) return false;
  for (const t of tokens) {
    if (t.charAt(0) === '#') {
      if (el.getAttribute('id') !== t.slice(1)) return false;
    } else if (t.charAt(0) === '.') {
      if (!el.classList.contains(t.slice(1))) return false;
    } else if (t.charAt(0) === '[') {
      const inner = t.slice(1, -1);
      const eq = inner.indexOf('=');
      if (eq < 0) {
        if (el.getAttribute(inner) === null) return false;
      } else {
        const key = inner.slice(0, eq);
        const want = inner.slice(eq + 1).replace(/^["']|["']$/g, '');
        if (el.getAttribute(key) !== want) return false;
      }
    } else if (el.tagName !== t.toUpperCase()) {
      return false;
    }
  }
  return true;
}

function collect(root, sel, out) {
  for (const child of root.children) {
    if (matchCompound(child, sel)) out.push(child);
    collect(child, sel, out);
  }
}

function findById(root, id) {
  for (const child of root.children) {
    if (child.getAttribute('id') === id) return child;
    const hit = findById(child, id);
    if (hit) return hit;
  }
  return null;
}

const timers = [];
const observers = [];

class ShimIntersectionObserver {
  constructor(cb) {
    this.cb = cb;
    this.targets = [];
    observers.push(this);
  }
  observe(el) {
    this.targets.push(el);
  }
  unobserve(el) {
    this.targets = this.targets.filter((t) => t !== el);
  }
  disconnect() {
    this.targets = [];
  }
  flush() {
    const entries = this.targets.map((t) => ({ target: t, isIntersecting: true, intersectionRatio: 1 }));
    if (entries.length) this.cb(entries, this);
  }
}

const storage = {
  _map: new Map(),
  getItem(k) {
    return this._map.has(k) ? this._map.get(k) : null;
  },
  setItem(k, v) {
    this._map.set(k, String(v));
  },
  removeItem(k) {
    this._map.delete(k);
  }
};

const doc = new Document();

const win = {
  innerWidth: 1440,
  innerHeight: 900,
  scrollX: 0,
  scrollY: 0,
  devicePixelRatio: 1,
  location: { href: 'http://localhost/', hash: '', protocol: 'http:', host: 'localhost' },
  history: { pushState() {}, replaceState() {} },
  localStorage: storage,
  matchMedia(q) {
    return { matches: false, media: q, addEventListener() {}, removeEventListener() {} };
  },
  getComputedStyle() {
    return { getPropertyValue() { return ''; } };
  },
  requestAnimationFrame() {
    return 0;
  },
  cancelAnimationFrame() {},
  setTimeout(fn, ms) {
    timers.push({ fn, ms: ms || 0 });
    return timers.length;
  },
  clearTimeout() {},
  addEventListener() {},
  removeEventListener() {},
  performance: { now: () => Date.now() },
  IntersectionObserver: ShimIntersectionObserver
};

globalThis.window = win;
globalThis.document = doc;
globalThis.localStorage = storage;
globalThis.IntersectionObserver = ShimIntersectionObserver;
globalThis.requestAnimationFrame = win.requestAnimationFrame;
globalThis.cancelAnimationFrame = win.cancelAnimationFrame;

try {
  Object.defineProperty(globalThis, 'navigator', {
    value: { userAgent: 'node-shim', language: 'zh-CN' },
    configurable: true,
    writable: true
  });
} catch (err) {
  /* already defined, ignore */
}

function drainTimers(limit) {
  let n = 0;
  while (timers.length && n < limit) {
    const task = timers.shift();
    try {
      task.fn();
    } catch (err) {
      /* ignore scheduled task errors, assertions cover output */
    }
    n += 1;
  }
  return n;
}

const failures = [];
const notes = [];

function assert(condition, label, detail) {
  if (condition) {
    notes.push('PASS  ' + label);
  } else {
    failures.push(label + (detail ? '  →  ' + detail : ''));
  }
}

const app = doc.createElement('div');
app.setAttribute('id', 'app');
doc.body.appendChild(app);

const glow = doc.createElement('div');
glow.setAttribute('id', 'cursor-glow');
doc.body.appendChild(glow);

const entry = pathToFileURL(resolve(ROOT, 'src', 'main.js')).href;
const main = await import(entry);
const content = await import(pathToFileURL(resolve(ROOT, 'src', 'data', 'content.js')).href);

assert(typeof main.boot === 'function', 'main.js 导出 boot()');

main.boot();

const SECTIONS = ['hero', 'skills', 'agents', 'insights', 'about', 'contact'];

const skillGroups = [];
for (const s of content.SKILLS) if (skillGroups.indexOf(s.group) < 0) skillGroups.push(s.group);
const EXPECT = {
  skills: content.SKILLS.length,
  mechs: content.MECHANISMS.length,
  badges: content.SKILLS.length + content.MECHANISMS.length + content.ABOUT.principles.length,
  meters: content.SKILLS.length,
  filters: skillGroups.length + 1 + content.MECH_GROUPS.length + 1,
  links: content.PROFILE.links.length + content.CONTACT.lines.filter((l) => l.href).length
};

assert(app.countText() > 600, '首屏渲染出足量文本', app.countText() + ' 字符');

for (const id of SECTIONS) {
  const section = doc.getElementById(id);
  assert(!!section, '区块存在: #' + id);
  if (section) {
    assert(section.countText() > 10, '区块有内容: #' + id, section.countText() + ' 字符');
  }
}

const skillCards = app.querySelectorAll('.skill-card');
const mechCards = app.querySelectorAll('.mech-card');
assert(skillCards.length === EXPECT.skills, 'Skill 卡片数量 ' + skillCards.length + '/' + EXPECT.skills);
assert(mechCards.length === EXPECT.mechs, '机制卡片数量 ' + mechCards.length + '/' + EXPECT.mechs);

const iconSvgs = app.querySelectorAll('.icon-badge');
assert(iconSvgs.length >= EXPECT.badges, '内联 SVG 图标角标 ' + iconSvgs.length + ' 个（期望 ≥ ' + EXPECT.badges + '）');
let iconPathCount = 0;
for (const badge of iconSvgs) {
  const svg = badge.firstElementChild;
  if (svg && svg.children.length) iconPathCount += 1;
}
assert(iconPathCount === iconSvgs.length, '每个图标都画出了图元', iconPathCount + '/' + iconSvgs.length);

const chartSvgs = app.querySelectorAll('.chart-wrap');
assert(chartSvgs.length >= 4, '手写 SVG 图表 ' + chartSvgs.length + ' 组');
let chartShapeCount = 0;
for (const wrap of chartSvgs) {
  const svg = wrap.firstElementChild;
  if (svg && svg.children.length > 1) chartShapeCount += 1;
}
assert(chartShapeCount === chartSvgs.length, '每个图表都有实际图元', chartShapeCount + '/' + chartSvgs.length);

const linkTargets = app.querySelectorAll('a.link-inline');
assert(linkTargets.length >= EXPECT.links, '外链条目 ' + linkTargets.length + ' 个（期望 ≥ ' + EXPECT.links + '）');
let linkHrefCount = 0;
for (const a of linkTargets) if (a.getAttribute('href')) linkHrefCount += 1;
assert(linkHrefCount === linkTargets.length, '每个外链都有 href', linkHrefCount + '/' + linkTargets.length);

const navLinks = app.querySelectorAll('.nav-link');
assert(navLinks.length >= 6, '导航条目 ' + navLinks.length + ' 个');

const bars0 = app.querySelectorAll('.filter-bar');
assert(bars0.length === 2, '筛选栏数量 ' + bars0.length);

for (const o of observers) o.flush();
for (const o of observers) o.flush();

const revealed = app.querySelectorAll('.reveal');
let revealedCount = 0;
for (const node of revealed) if (node.classList.contains('is-in')) revealedCount += 1;
assert(revealedCount === revealed.length, '进场动画元素全部激活', revealedCount + '/' + revealed.length);

let meterCount = 0;
for (const node of app.querySelectorAll('[data-meter]')) {
  if (node.classList.contains('is-in')) meterCount += 1;
}
assert(meterCount >= EXPECT.meters, '能力进度条已激活 ' + meterCount + ' 条（期望 ≥ ' + EXPECT.meters + '）');

drainTimers(220);
const typewriter = doc.getElementById('typewriter');
assert(!!typewriter && typewriter.countText() > 0, '打字机文案已输出', typewriter ? typewriter.textContent : '缺失');

let filterCombos = 0;
const bars = app.querySelectorAll('.filter-bar');
for (const bar of bars) {
  for (const btn of bar.children) {
    btn.fire('click');
    filterCombos += 1;
    const grid = bar.nextElementSibling;
    assert(!!grid, '筛选后仍能定位结果容器');
    if (!grid) continue;
    const cards = grid.querySelectorAll('.card');
    const empties = grid.querySelectorAll('.empty-state');
    assert(cards.length > 0 && empties.length === 0, '筛选状态「' + btn.textContent + '」有结果', cards.length + ' 张卡片');
    assert(grid.countText() > 20, '筛选状态「' + btn.textContent + '」有文本');
  }
}
assert(filterCombos === EXPECT.filters, '共覆盖筛选状态 ' + filterCombos + '/' + EXPECT.filters + ' 个');

const footer = app.querySelectorAll('.site-foot');
assert(footer.length === 1, '页脚已渲染');

const report = [];
report.push('渲染冒烟自检');
report.push('='.repeat(46));
report.push('通过断言  ' + notes.length);
report.push('失败断言  ' + failures.length);
report.push('');

if (failures.length) {
  report.push('失败明细');
  for (const f of failures) report.push('  x  ' + f);
  process.stdout.write(report.join('\n') + '\n');
  process.exit(1);
}

report.push('全部通过。6 个区块 / ' + filterCombos + ' 个筛选状态均渲染出内容，');
report.push('内联 SVG 图标与手写图表均有实际图元，进场动画与进度条已激活。');
process.stdout.write(report.join('\n') + '\n');
