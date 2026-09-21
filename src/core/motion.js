function hasWindow() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function reduced() {
  return !!(hasWindow() && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

export function initReveal(root) {
  if (!hasWindow() || !root) return;
  const nodes = Array.prototype.slice.call(root.querySelectorAll('.reveal'));
  if (!nodes.length) return;

  nodes.forEach((node) => {
    if (node.style && node.style.getPropertyValue && node.style.getPropertyValue('--reveal-delay')) return;
    const parent = node.parentNode;
    if (!parent || !parent.children) return;
    const sibs = Array.prototype.filter.call(parent.children, (c) => c.classList && c.classList.contains('reveal'));
    const idx = sibs.indexOf(node);
    if (idx > 0 && node.style) node.style.setProperty('--reveal-delay', Math.min(idx * 70, 300) + 'ms');
  });

  if (reduced() || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }
  );
  nodes.forEach((n) => io.observe(n));
}

export function initCounters(root) {
  if (!hasWindow() || !root) return;
  const nodes = Array.prototype.slice.call(root.querySelectorAll('[data-count-to]'));
  if (!nodes.length) return;

  const run = (el) => {
    const to = Number(el.getAttribute('data-count-to')) || 0;
    const suffix = el.getAttribute('data-count-suffix') || '';
    if (reduced()) {
      el.textContent = to + suffix;
      return;
    }
    const dur = 1100;
    const start = now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  if (typeof IntersectionObserver === 'undefined') {
    nodes.forEach(run);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  nodes.forEach((n) => io.observe(n));
}

function now() {
  return window.performance && window.performance.now ? window.performance.now() : Date.now();
}

export function initMeters(root) {
  if (!hasWindow() || !root) return;
  const nodes = Array.prototype.slice.call(root.querySelectorAll('[data-meter]'));
  if (!nodes.length) return;
  const paint = (el) => {
    el.classList.add('is-in');
  };
  if (reduced() || typeof IntersectionObserver === 'undefined') {
    nodes.forEach(paint);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          paint(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  nodes.forEach((n) => io.observe(n));
}

export function initTypewriter(el, phrases) {
  if (!hasWindow() || !el || !phrases || !phrases.length) return function noop() {};
  if (reduced()) {
    el.textContent = phrases[0];
    return function noop() {};
  }
  let pi = 0;
  let ci = 0;
  let deleting = false;
  let timer = 0;

  const step = () => {
    const current = phrases[pi] || '';
    if (!deleting) {
      ci += 1;
      el.textContent = current.slice(0, ci);
      if (ci >= current.length) {
        deleting = true;
        timer = window.setTimeout(step, 1800);
        return;
      }
      timer = window.setTimeout(step, 64);
      return;
    }
    ci -= 1;
    el.textContent = current.slice(0, Math.max(0, ci));
    if (ci <= 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      timer = window.setTimeout(step, 340);
      return;
    }
    timer = window.setTimeout(step, 26);
  };

  timer = window.setTimeout(step, 480);
  return function stop() {
    window.clearTimeout(timer);
  };
}

export function initCursorGlow(el) {
  if (!hasWindow() || !el || reduced()) return;
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  let raf = 0;
  let tx = 0;
  let ty = 0;
  let shown = false;
  const move = (ev) => {
    tx = ev.clientX;
    ty = ev.clientY;
    if (!shown) {
      shown = true;
      el.classList.add('on');
    }
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      el.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    });
  };
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerleave', () => {
    el.classList.remove('on');
    shown = false;
  });
}

export function initScrollProgress(fill) {
  if (!hasWindow() || !fill) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.width = (p * 100).toFixed(2) + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

export function initTopbar(bar) {
  if (!hasWindow() || !bar) return;
  const update = () => {
    if (window.scrollY > 14) bar.classList.add('is-stuck');
    else bar.classList.remove('is-stuck');
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function initScrollSpy() {
  if (!hasWindow() || typeof IntersectionObserver === 'undefined') return;
  const links = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-target]'));
  if (!links.length) return;
  const pairs = [];
  links.forEach((link) => {
    const section = document.getElementById(link.getAttribute('data-target'));
    if (section) pairs.push([section, link]);
  });
  if (!pairs.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const hit = pairs.find((p) => p[0] === entry.target);
        if (!hit) return;
        links.forEach((l) => l.classList.remove('is-active'));
        hit[1].classList.add('is-active');
      });
    },
    { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
  );
  pairs.forEach((p) => io.observe(p[0]));
}
