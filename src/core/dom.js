export const SVG_NS = 'http://www.w3.org/2000/svg';

function isNode(v) {
  return v !== null && typeof v === 'object' && typeof v.nodeType === 'number';
}

function splitTag(tag) {
  const parts = String(tag).split('.');
  const name = parts[0] || 'div';
  const classes = parts.slice(1).filter(Boolean);
  return { name, classes };
}

function applyProps(el, props, classes) {
  const list = classes.slice();
  if (props && typeof props === 'object' && !isNode(props)) {
    for (const key of Object.keys(props)) {
      const v = props[key];
      if (v === null || v === undefined || v === false) continue;
      if (key === 'class' || key === 'className') {
        String(v).split(/\s+/).filter(Boolean).forEach((c) => list.push(c));
        continue;
      }
      if (key === 'style' && typeof v === 'object') {
        for (const sk of Object.keys(v)) {
          if (v[sk] === null || v[sk] === undefined) continue;
          el.style.setProperty(sk, String(v[sk]));
        }
        continue;
      }
      if (key === 'dataset' && typeof v === 'object') {
        for (const dk of Object.keys(v)) el.dataset[dk] = String(v[dk]);
        continue;
      }
      if (key.startsWith('on') && typeof v === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), v);
        continue;
      }
      el.setAttribute(key, v === true ? '' : String(v));
    }
  }
  if (list.length) el.setAttribute('class', list.join(' '));
}

function appendChildren(el, children) {
  for (const c of children) {
    if (c === null || c === undefined || c === false || c === true) continue;
    if (Array.isArray(c)) {
      appendChildren(el, c);
      continue;
    }
    if (isNode(c)) {
      el.appendChild(c);
      continue;
    }
    el.appendChild(document.createTextNode(String(c)));
  }
}

function isPropsBag(v) {
  return v !== null && v !== undefined && typeof v === 'object' && !Array.isArray(v) && !isNode(v);
}

function build(create, tag, props, children) {
  const { name, classes } = splitTag(tag);
  const el = create(name);
  if (isPropsBag(props)) {
    applyProps(el, props, classes);
    appendChildren(el, children);
  } else {
    applyProps(el, null, classes);
    appendChildren(el, [props, ...children]);
  }
  return el;
}

export function h(tag, props, ...children) {
  return build((t) => document.createElement(t), tag, props, children);
}

export function s(tag, props, ...children) {
  return build((t) => document.createElementNS(SVG_NS, t), tag, props, children);
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}
