'use strict';

/* ---------------- env ---------------- */
const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';
const reduceMotion =
  isBrowser &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Priority Queue (max-heap, stable FIFO on ties) ---------------- */
class PriorityQueue {
  constructor() {
    this._heap = [];
  }
  get size() {
    return this._heap.length;
  }
  _parent(i) {
    return Math.floor((i - 1) / 2);
  }
  _left(i) {
    return 2 * i + 1;
  }
  _right(i) {
    return 2 * i + 2;
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  push(item, priority = 0) {
    const node = {
      item,
      priority,
      seq: (PriorityQueue._seq = (PriorityQueue._seq || 0) + 1),
    };
    this._heap.push(node);
    this._siftUp(this._heap.length - 1);
  }
  pop() {
    if (!this._heap.length) return null;
    this._swap(0, this._heap.length - 1);
    const top = this._heap.pop();
    this._siftDown(0);
    return top.item;
  }
  peek() {
    return this._heap[0] ? this._heap[0].item : null;
  }
  _siftUp(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (this._compare(i, p) <= 0) break;
      this._swap(i, p);
      i = p;
    }
  }
  _siftDown(i) {
    while (true) {
      const l = this._left(i),
        r = this._right(i),
        n = this._heap.length;
      let largest = i;
      if (l < n && this._compare(l, largest) > 0) largest = l;
      if (r < n && this._compare(r, largest) > 0) largest = r;
      if (largest === i) break;
      this._swap(i, largest);
      i = largest;
    }
  }
  _compare(a, b) {
    const A = this._heap[a],
      B = this._heap[b];
    // Higher numeric priority should be "greater"
    if (A.priority !== B.priority) return A.priority - B.priority;
    // Tie-breaker: FIFO (older seq wins) => treat smaller seq as greater
    return B.seq - A.seq;
  }
}

/* ---------------- CSS ---------------- */
let __cssInjected = false;
const BASE_CSS = `
:root{
  --jt-radius:10px;
  --jt-bg1:rgba(30,30,30,.95);
  --jt-bg2:rgba(20,20,20,.95);
  --jt-gap:10px;
}

/* ROOT — use data attribute for flexibility */
[data-juice-root]{
  position:fixed;
  z-index:9999;
  display:flex;
  pointer-events:none;
  gap:var(--jt-gap);
  perspective:800px;
}

/* POSITIONS */

[data-juice-root][data-position="bottom-right"]{
  bottom:20px;
  right:20px;
  flex-direction:column-reverse;
  align-items:flex-end;
}

[data-juice-root][data-position="top-right"]{
  top:20px;
  right:20px;
  flex-direction:column;
  align-items:flex-end;
}

[data-juice-root][data-position="bottom-left"]{
  bottom:20px;
  left:20px;
  flex-direction:column-reverse;
  align-items:flex-start;
}

[data-juice-root][data-position="top-left"]{
  top:20px;
  left:20px;
  flex-direction:column;
  align-items:flex-start;
}

[data-juice-root][data-position="top-center"]{
  top:20px;
  left:50%;
  transform:translateX(-50%);
}

[data-juice-root][data-position="bottom-center"]{
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
}

/* TOAST */

.juice-toast{
  pointer-events:auto;
  min-width:220px;
  max-width:420px;
  padding:12px 16px;
  margin:6px 0;
  border-radius:var(--jt-radius);
  background:linear-gradient(180deg,var(--jt-bg1),var(--jt-bg2));
  color:#fff;
  display:flex;
  gap:12px;
  align-items:flex-start;
  box-sizing:border-box;

  transform:
    translate3d(var(--jt-parallax-x,0),var(--jt-parallax-y,0),var(--jt-parallax-z,0))
    translateY(var(--jt-stack-y,0))
    translateX(var(--jt-drag-x,0))
    translateY(var(--jt-drag-y,0))
    rotateX(var(--jt-rot-x,0))
    rotateY(var(--jt-rot-y,0))
    scale(var(--jt-stack-scale,1));

  transform-style:preserve-3d;
  transition:transform .25s cubic-bezier(.4,0,.2,1),opacity .28s ease;
  will-change:transform,opacity;
}

/* STACK DEPTH FEATURE */

.juice-toast[data-stack="1"]{--jt-stack-scale:.97;opacity:.95}
.juice-toast[data-stack="2"]{--jt-stack-scale:.94;opacity:.9}
.juice-toast[data-stack="3"]{--jt-stack-scale:.91;opacity:.85}

/* SHOW/HIDE */

@keyframes jt-slide-in{
  from{opacity:0;transform:translateY(20px) scale(.98)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

@keyframes jt-slide-out{
  from{opacity:1;transform:translateY(0) scale(1)}
  to{opacity:0;transform:translateY(20px) scale(.98)}
}

.juice-toast.show{
  animation:jt-slide-in .32s cubic-bezier(.4,0,.2,1) forwards;
}

.juice-toast.hide{
  animation:jt-slide-out .28s cubic-bezier(.4,0,.2,1) forwards;
  pointer-events:none;
}

/* MICRO ANIMATIONS */

@keyframes jt-bounce{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}

@keyframes jt-shake{
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-6px)}
  75%{transform:translateX(6px)}
}

@keyframes jt-pulse{
  0%,100%{transform:scale(1)}
  50%{transform:scale(1.03)}
}

@keyframes jt-spin{
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
}

.jt-spin{animation:jt-spin 1.5s linear infinite}
.jt-pulse{animation:jt-pulse 1.2s ease-in-out}

/* ICON */

.juice-toast .icon{
  width:30px;
  height:30px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:8px;
  background:rgba(255,255,255,.06);
}

/* CONTENT */

.jt-content{
  display:flex;
  flex-direction:column;
  gap:4px;
  flex:1;
  min-width:0;
}

.jt-title{
  font-weight:700;
  font-size:13px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.jt-message{
  font-size:13px;
  opacity:.95;
  word-break:break-word;
}

/* ACTIONS */

.jt-actions{
  display:flex;
  gap:8px;
  margin-top:10px;
}

.jt-action{
  border:1px solid currentColor;
  padding:4px 10px;
  border-radius:6px;
  font-size:12px;
  cursor:pointer;
  background:transparent;
}

/* PROGRESS */

.jt-progress{
  position:absolute;
  left:0;
  bottom:0;
  height:4px;
  width:100%;
  border-radius:2px;
  background:linear-gradient(90deg,#4ade80,#22c55e);
  transform-origin:left;
  transform:scaleX(1);
  transition:transform linear;
}

/* SWIPE */

.juice-toast.swipe-dismissing{
  opacity:0;
  transition:transform .22s ease-out,opacity .22s ease-out;
}

/* AVATAR */

.jt-avatar{
  width:36px;
  height:36px;
  border-radius:50%;
  object-fit:cover;
  flex-shrink:0;
}

.juice-toast.jt-avatar-top{
  flex-direction:column;
  align-items:flex-start;
}

/* MODAL */

.jt-modal-overlay{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  background:rgba(15,23,42,.55);
  backdrop-filter:blur(6px) saturate(120%);
  opacity:0;
  transition:opacity .25s ease;
  z-index:10000;
}

.jt-modal-overlay.show{opacity:1}

.jt-modal{
  width:100%;
  max-width:520px;
  border-radius:18px;
  padding:24px;
  opacity:0;
  transform:translateY(40px) scale(.96);
  transition:transform .35s cubic-bezier(.16,1,.3,1),opacity .25s ease;
  will-change:transform,opacity;
}

.jt-modal.show{
  opacity:1;
  transform:translateY(0) scale(1);
}

.jt-modal-btn{
  padding:8px 14px;
  border-radius:8px;
  font-size:14px;
  cursor:pointer;
  border:none;
  transition:all .18s ease;
}

/* PRIMARY */

.jt-modal-btn.primary{
  background:#3b82f6;
  color:#fff;
}

.jt-modal-btn.primary:hover{
  background:#2563eb;
}

/* SECONDARY */

.jt-modal-btn.secondary{
  background:#e5e7eb;
  color:#111;
}

.jt-modal-btn.secondary:hover{
  background:#d1d5db;
}

/* OUTLINE */

.jt-modal-btn.outline{
  background:transparent;
  border:1px solid currentColor;
  color:inherit;
}

.jt-modal-btn.outline:hover{
  background:rgba(255,255,255,.06);
}

/* PARALLAX */

[data-juice-root][data-parallax="true"] .juice-toast{
  transition:transform .12s cubic-bezier(.2,.8,.2,1),opacity .2s;
}

/* GLASS FEATURE */

[data-juice-root][data-glass="true"] .juice-toast{
  background:rgba(30,30,30,.55);
  backdrop-filter:blur(14px) saturate(140%);
  border:1px solid rgba(255,255,255,.08);
}

/* REDUCED MOTION */

@media (prefers-reduced-motion:reduce){
  .juice-toast,
  .jt-modal{
    animation:none!important;
    transition:none!important;
  }
}
`;

/* ---------------- helpers ---------------- */
function injectCSS(css = BASE_CSS) {
  if (!isBrowser || __cssInjected) return;
  __cssInjected = true;
  if (document.getElementById('juice-toast-style')) return;
  const st = document.createElement('style');
  st.id = 'juice-toast-style';
  st.textContent = css;
  document.head.appendChild(st);
}

const uid = (() => {
  let n = 1;
  return () => {
    return 'jt-' + Date.now().toString(36) + '-' + n++;
  };
})();
function now() {
  return Date.now();
}
function merge(a, b) {
  return Object.assign({}, a || {}, b || {});
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* safer HTML sanitizer (whitelist protocols + remove dangerous data/svg) */
function sanitizeHTML(input) {
  if (!input) return '';
  const t = document.createElement('template');
  t.innerHTML = input;
  t.content
    .querySelectorAll('script, style, iframe, object, embed')
    .forEach((el) => el.remove());
  const allowed = new Set([
    'b',
    'i',
    'u',
    'strong',
    'em',
    'code',
    'pre',
    'ul',
    'ol',
    'li',
    'br',
    'p',
    'span',
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
  ]);

  // require explicit // for http(s) to avoid "https:javascript:"-like tricks
  const protocolWhitelist = /^(https?:\/\/|mailto:|tel:|\/\/)/i;

  (function walk(node) {
    Array.from(node.childNodes).forEach((ch) => {
      if (ch.nodeType === 1) {
        const name = ch.tagName.toLowerCase();
        if (!allowed.has(name)) {
          ch.replaceWith(...Array.from(ch.childNodes));
        } else {
          Array.from(ch.attributes || []).forEach((attr) => {
            const an = attr.name.toLowerCase();
            const av = (attr.value || '').trim();
            if (an.startsWith('on')) {
              ch.removeAttribute(attr.name);
            } else if (an === 'src' || an === 'href' || an === 'xlink:href') {
              if (!protocolWhitelist.test(av)) {
                ch.removeAttribute(attr.name);
              } else if (/^data:\s*image\/svg\+xml/i.test(av)) {
                ch.removeAttribute(attr.name);
              }
            } else if (name === 'img' && an === 'srcset') {
              ch.removeAttribute(attr.name);
            } else if (an === 'style') {
              ch.removeAttribute(attr.name);
            }
          });
          walk(ch);
        }
      }
    });
  })(t.content);
  return t.innerHTML;
}

/* ---------------- Theme & Presets ---------------- */
const themes = {
  dark: {
    bg: 'linear-gradient(180deg,#1f2937,#111827)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.06)',
  },
  light: { bg: '#fff', color: '#111', border: '1px solid #e5e7eb' },
  glass: {
    bg: 'rgba(30,30,30,.35)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.1)',
  },
};
const sizePreset = {
  sm: { width: '260px', padding: '10px' },
  md: { width: '320px', padding: '14px' },
  lg: { width: '420px', padding: '18px' },
};

/* ---------------- Animations map ---------------- */
const TYPE_ANIMATION = {
  success: 'jt-bounce',
  error: 'jt-shake',
  warning: 'jt-shake',
  info: 'jt-pulse',
  loading: 'jt-spin',
};

/* ---------------- Core juiceToast (optimized & fixed) ---------------- */
const juiceToast = {
  _defaults: {
    duration: 2500,
    maxVisible: 3,
    swipeThreshold: 60,
    glassUI: 0,
    glassOnly: false,
    playSound: null,
    dev: false,
    injectCSS: true,
    css: null,
    autoDedupe: false,
    maxVisiblePerType: {},
    parallaxMode: false,
    autoFetchFA: true,
    use3d: false,
    parallaxSmoothing: 0.12,
    // new small knobs
    _maxRequeueRetries: 8,
  },
  _config: {},
  _theme: 'dark',
  _plugins: [],
  _queue: new PriorityQueue(),
  _queueDedupe: new Set(),
  _activeMap: new Map(),
  _roots: new Map(),
  _modalStack: [],
  _faInjected: false,

  // global scheduler state (single RAF for timers + parallax)
  _schedulerRunning: false,
  _schedulerLast: 0,
  _schedulerRAF: null,

  // global pause flag for timers
  _pausedAll: false,

  setup(cfg = {}) {
    const { duration, maxVisible, ...types } = cfg;
    if (typeof duration === 'number') this._defaults.duration = duration;
    if (typeof maxVisible === 'number') this._defaults.maxVisible = maxVisible;
    if (typeof cfg.autoDedupe === 'boolean') this._defaults.autoDedupe = cfg.autoDedupe;
    if (cfg.maxVisiblePerType) this._defaults.maxVisiblePerType = merge(this._defaults.maxVisiblePerType, cfg.maxVisiblePerType);
    if (typeof cfg.parallaxMode === 'boolean') this._defaults.parallaxMode = cfg.parallaxMode;
    if (typeof cfg.autoFetchFA === 'boolean') this._defaults.autoFetchFA = cfg.autoFetchFA;
    if (typeof cfg.use3d === 'boolean') this._defaults.use3d = cfg.use3d;
    if (typeof cfg.parallaxSmoothing === 'number') this._defaults.parallaxSmoothing = clamp(cfg.parallaxSmoothing, 0, 1);
    if (typeof cfg._maxRequeueRetries === 'number') this._defaults._maxRequeueRetries = cfg._maxRequeueRetries;
    this._config = merge(this._config, types);
    this._registerTypes();
    if (this._defaults.injectCSS !== false) injectCSS(this._defaults.css || BASE_CSS);
  },

  use(plugin) {
    if (typeof plugin === 'function') this._plugins.push(plugin);
  },

  addType(name, cfg = {}) {
    this._config[name] = cfg;
    this._registerTypes();
  },

  defineTheme(name, styles = {}) {
    themes[name] = merge(themes[name] || {}, styles);
  },

  setTheme(name) {
    this._theme = name;
    if (!isBrowser) return;
    this._roots.forEach((r) => (r.dataset.theme = name));
  },

  clear() {
    this._queue = new PriorityQueue();
    this._queueDedupe.clear();
  },

  destroy() {
    this.clear();
    if (!isBrowser) return;
    this._roots.forEach((r) => {
      try {
        if (r._parallaxRAF) cancelAnimationFrame(r._parallaxRAF);
        if (r._parallaxHandler) {
          r.removeEventListener('mousemove', r._parallaxHandler);
          r.removeEventListener('touchmove', r._parallaxHandler);
        }
        if (r._parallaxReset) {
          r.removeEventListener('mouseleave', r._parallaxReset);
          r.removeEventListener('touchend', r._parallaxReset);
        }
        r.remove();
      } catch (e) {}
    });
    this._roots.clear();
    // remove all active toasts
    Array.from(this._activeMap.keys()).forEach((id) => this.remove(id));
    this._stopScheduler();
  },

  promise(promiseInput, states = {}) {
  if (!promiseInput || typeof promiseInput.then !== "function") {
    this._warn("promise expects a Promise");
    return;
  }

  const id = uid();
  const timeout = states.timeout;

  let timer = null;
  let cancelled = false;
  let settled = false;

  const cleanup = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // loading toast
  this._enqueue("loading", {
    ...normalizeState(states.loading, "Loading..."),
    groupId: id,
    duration: 0
  });

  // timeout handler
  if (timeout) {
    timer = setTimeout(() => {
      if (settled || cancelled) return;

      settled = true;
      cleanup();

      this._enqueue("error", {
        message: states.timeoutMessage || "Request timeout",
        groupId: id
      });
    }, timeout);
  }

  promiseInput
    .then((res) => {
      if (cancelled || settled) return;

      settled = true;
      cleanup();

      this._enqueue("success", {
        ...resolveState(states.success, res, "Success"),
        groupId: id, 
      });
    })
    .catch((err) => {
      if (cancelled || settled) return;

      settled = true;
      cleanup();

      this._enqueue("error", {
        ...resolveState(states.error, err, "Error"),
        groupId: id
      });
    });

  return {
    cancel: () => {
      if (cancelled || settled) return;

      cancelled = true;
      cleanup();

      this._enqueue("info", {
        message: states.cancelMessage || "Cancelled",
        groupId: id
      });
    }
  };
}, 

  modal(options = {}) {
    if (!isBrowser) return;

    if (this._defaults.injectCSS !== false) {
      injectCSS(this._defaults.css || BASE_CSS);
    }

    const cfg = merge(
      {
        title: '',
        message: '',
        html: null,
        block: true,
        blur: true,
        closeOnOverlay: true,
        closable: true,
        animation: 'scale',
        actions: [],
        theme: this._theme,
        use3d: undefined,
      },
      options
    );

    const use3d = cfg.use3d === undefined ? this._defaults.use3d : !!cfg.use3d;
    const theme = themes[cfg.theme] || themes.dark;

    const overlay = document.createElement('div');
    overlay.className = 'jt-modal-overlay';

    overlay.style.pointerEvents = cfg.block ? 'all' : 'none';
    if (!cfg.blur) {
      overlay.style.backdropFilter = 'none';
      overlay.style.webkitBackdropFilter = 'none';
    }

    const modal = document.createElement('div');
    modal.className = `jt-modal jt-anim-${cfg.animation}`;
    modal.style.background = theme.bg;
    modal.style.color = theme.color;
    modal.style.border = theme.border || 'none';

    if (use3d) {
      overlay.style.perspective = overlay.style.perspective || '900px';
      modal.style.transform = 'translateY(40px) scale(.96) rotateX(8deg)';
    }

    if (cfg.title) {
      const header = document.createElement('div');
      header.className = 'jt-modal-header';
      header.textContent = cfg.title;
      modal.appendChild(header);
    }

    const body = document.createElement('div');
    body.className = 'jt-modal-body';
    cfg.html ? (body.innerHTML = sanitizeHTML(cfg.html)) : (body.textContent = cfg.message || '');
    modal.appendChild(body);

    if (cfg.actions?.length) {
      const actions = document.createElement('div');
      actions.className = 'jt-modal-actions';

      cfg.actions.forEach((a) => {
        const btn = document.createElement('button');
        const type = a.buttonType || (a.primary ? "primary" : "secondary");
        btn.className = `jt-modal-btn ${type}`;
        btn.textContent = a.label || 'OK';
        btn.onclick = (e) => {
          e.stopPropagation();
          a.onClick?.(e);
          if (a.closeOnClick !== false) close();
        };
        actions.appendChild(btn);
      });

      modal.appendChild(actions);
    }

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    this._modalStack.push(overlay);

    if (cfg.block) document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      overlay.classList.add('show');
      modal.classList.add('show');
      if (use3d) {
        modal.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
      }
    });

    const esc = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    if (cfg.closable) {
      if (cfg.closeOnOverlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) close();
        });
      }
      document.addEventListener('keydown', esc);
    }

    const close = () => {
      overlay.classList.remove('show');
      modal.classList.remove('show');
      if (use3d) {
        modal.style.transform = 'translateY(40px) scale(.96) rotateX(8deg)';
      }
      setTimeout(() => {
        try {
          overlay.remove();
        } catch (e) {}
        if (cfg.block) document.body.style.overflow = '';
        document.removeEventListener('keydown', esc);
        const idx = this._modalStack.indexOf(overlay);
        if (idx >= 0) this._modalStack.splice(idx, 1);
      }, 300);
    };

    return { close };
  },

  _registerTypes() {
    Object.keys(this._config).forEach((type) => {
      if (typeof this[type] === 'function' && !this[type].__auto) return;
      const fn = (payload) => this._enqueue(type, payload);
      fn.__auto = true;
      this[type] = fn;
    });
  },

  _enqueue(type, payload = {}) {
    // compute numeric priority: allow string keywords as before
    const priority =
      typeof payload.priority === 'number'
        ? payload.priority
        : this._priorityMap?.[payload.priority] ?? 2;

    const dedupeKey =
      payload.dedupeKey ||
      (this._defaults.autoDedupe ? this._computeDedupeKey(type, payload) : undefined);

    if (dedupeKey && this._queueDedupe.has(dedupeKey)) {
      if (this._defaults.dev) console.log('[JuiceToast] deduped (queue)', dedupeKey);
      return;
    }
    const item = { id: uid(), type, payload, priority };
    item._retries = 0;
    if (dedupeKey) {
      item._dedupeKey = dedupeKey;
      this._queueDedupe.add(dedupeKey);
    }
    this._queue.push(item, priority);
    this._scheduleProcessQueue();
    return item.id;
  },

  // schedule processing to avoid tight requeue spin
  _processQueueScheduled: false,
  _scheduleProcessQueue() {
    if (this._processQueueScheduled) return;
    this._processQueueScheduled = true;
    setTimeout(() => {
      this._processQueueScheduled = false;
      this._processQueue();
    }, 40);
  },

  _processQueue() {
    if (!isBrowser) return;
    const maxGlobal = this._defaults.maxVisible || Infinity;
    let attempts = 0;
    // drain queue
    while (this._queue.size > 0 && attempts < 200) {
      attempts++;
      const next = this._queue.pop();
      if (!next) break;
      const position = next.payload?.position || (next.payload?.toast) || 'bottom-right';
      const root = this._getRoot(position);
      if (!root) {
        // can't render right now — requeue slightly later (with retry count)
        next._retries = (next._retries || 0) + 1;
        if (next._retries > (this._defaults._maxRequeueRetries || 8)) {
          // give up — remove dedupeKey so new toasts can appear later
          if (next._dedupeKey) this._queueDedupe.delete(next._dedupeKey);
          continue;
        }
        setTimeout(() => {
          this._queue.push(next, next.priority);
        }, 120);
        break;
      }
      const showing = Array.from(root.children).length;
      // global cap
      if (showing >= maxGlobal) {
        next._retries = (next._retries || 0) + 1;
        if (next._retries > (this._defaults._maxRequeueRetries || 8)) {
          if (next._dedupeKey) this._queueDedupe.delete(next._dedupeKey);
          continue;
        }
        setTimeout(() => this._queue.push(next, next.priority), 160);
        break;
      }
      // per-type cap
      const perTypeCaps = this._defaults.maxVisiblePerType || {};
      const capForType = perTypeCaps[next.type];
      if (typeof capForType === 'number') {
        const showingOfType = Array.from(root.children).filter((c) => c.dataset.toastType === next.type).length;
        if (showingOfType >= capForType) {
          next._retries = (next._retries || 0) + 1;
          if (next._retries > (this._defaults._maxRequeueRetries || 8)) {
            if (next._dedupeKey) this._queueDedupe.delete(next._dedupeKey);
            continue;
          }
          setTimeout(() => this._queue.push(next, next.priority), 160);
          break;
        }
      }
      this._showToast(next.type, next.payload, next.id);
    }
  },

  _getRoot(position = 'bottom-right') {
    if (!isBrowser) return null;
    if (this._roots.has(position)) {
      const existing = this._roots.get(position);
      return existing;
    }
    const root = document.createElement('div');
    // mark as juice root and position
    root.setAttribute('data-juice-root', '1');
    root.id = `juice-toast-root-${position}`;
    root.dataset.position = position;
    root.dataset.theme = this._theme;
    root.style.pointerEvents = 'none';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    if (this._defaults.parallaxMode) root.dataset.parallax = 'true';

    switch (position) {
      case 'top-left':
        root.style.top = '20px';
        root.style.left = '20px';
        break;
      case 'top-right':
        root.style.top = '20px';
        root.style.right = '20px';
        break;
      case 'bottom-left':
        root.style.bottom = '20px';
        root.style.left = '20px';
        break;
      case 'bottom-right':
        root.style.bottom = '20px';
        root.style.right = '20px';
        break;
      case 'top-center':
        root.style.top = '20px';
        root.style.left = '50%';
        root.style.transform = 'translateX(-50%)';
        break;
      case 'bottom-center':
        root.style.bottom = '20px';
        root.style.left = '50%';
        root.style.transform = 'translateX(-50%)';
        break;
      default:
        root.style.bottom = '20px';
        root.style.right = '20px';
    }
    document.body.appendChild(root);

    // If parallax mode enabled, attach light handler that only sets targets
    if (this._defaults.parallaxMode && !reduceMotion) {
      const smoothing = this._defaults.parallaxSmoothing ?? 0.12;
      root._parallaxTargets = new WeakMap();

      const handler = (e) => {
        const rect = root.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        Array.from(root.children).forEach((child, index) => {
          const depth = (index + 1) / Math.max(1, root.children.length);
          const tx = clamp(((clientX - cx) / rect.width) * depth * 12, -18, 18);
          const ty = clamp(((clientY - cy) / rect.height) * depth * 8, -14, 14);
          const tz = clamp(-depth * 8, -30, 0);
          const rotY = clamp((clientX - cx) / rect.width * depth * -6, -12, 12);
          const rotX = clamp((clientY - cy) / rect.height * depth * 4, -8, 8);

          const target = { tx, ty, tz, rotX, rotY, smoothing };
          root._parallaxTargets.set(child, target);
        });
        // ensure scheduler running
        this._startScheduler();
      };

      const reset = () => {
        Array.from(root.children).forEach((child) => {
          root._parallaxTargets.set(child, { tx: 0, ty: 0, tz: 0, rotX: 0, rotY: 0, smoothing: 0.16 });
        });
        this._startScheduler();
      };

      root._parallaxHandler = handler;
      root._parallaxReset = reset;
      root.addEventListener('mousemove', handler);
      root.addEventListener('touchmove', handler, { passive: true });
      root.addEventListener('mouseleave', reset);
      root.addEventListener('touchend', reset);
    }

    this._roots.set(position, root);
    return root;
  },

  _warn(msg) {
    if (this._defaults.dev && typeof console !== 'undefined')
      console.warn('[JuiceToast]', msg);
  },

  _ensureFA() {
    if (!isBrowser || this._faInjected || !this._defaults.autoFetchFA) return;
    const hasFA = !!document.querySelector('link[href*="fontawesome"], link[href*="font-awesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]');
    if (hasFA) {
      this._faInjected = true;
      return;
    }
    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      this._faInjected = true;
    } catch (e) {
      console.error("[JuiceToast]: Fetching icons failed:", e);
    }
  },

  _playSound(src) {
    if (!isBrowser) return;
    const s = typeof src === 'string' && src ? src : this._defaults.playSound;
    if (!s) return;
    try {
      const a = new Audio(s);
      a.volume = 0.6;
      a.play().catch(() => {});
    } catch (e) {}
  },

  _updateStackPositionsFor(root) {
    const children = Array.from(root.children);
    const isBottom =
      root.dataset.position && root.dataset.position.includes('bottom');
    children.forEach((el, i) => {
      const index = isBottom ? i : i;
      const offset = index * 12;
      el.style.setProperty('--jt-stack-y', `${-offset}px`);
      el.style.setProperty('--jt-stack-scale', 1 - index * 0.04);
      el.style.setProperty('--jt-stack-opacity', 1 - index * 0.12);
      el.style.zIndex = 1000 - index;
      el.style.setProperty('--jt-parallax-z', `${-index * 2}px`);
      el.dataset.stack = String(index);
    });
  },

  _runPlugins(ctx) {
    this._plugins.forEach((fn) => {
      try {
        fn(ctx);
      } catch (e) {
        this._warn('Plugin error: ' + (e?.message || e));
      }
    });
  },

  _normalizeGlass(value) {
    if (value === true) return 60;
    if (!value) return 0;
    const n = Number(value);
    return Number.isFinite(n) ? clamp(n, 0, 100) : 0;
  },

  _computeDedupeKey(type, payload) {
    try {
      const t = type || '';
      const title = payload.title || '';
      const message = payload.message || payload.html || '';
      return `${t}::${String(title).trim().slice(0, 200)}::${String(message).trim().slice(0, 500)}`;
    } catch (e) {
      return undefined;
    }
  },

  _showToast(type, payload = {}, id) {
    if (!isBrowser) return;
    if (this._defaults.injectCSS !== false) injectCSS(this._defaults.css || BASE_CSS);
    this._ensureFA();

    const base = this._config[type] || {};
    const data =
      typeof payload === 'object' ? payload : { message: String(payload) };
    const cfg = merge(base, data);
    cfg.icon = cfg.icon ?? cfg.icon_left_top;
    cfg.position = cfg.position ?? cfg.toast ?? 'bottom-right';
    cfg.closable = cfg.closable ?? cfg.closeable ?? true;
    cfg.duration = typeof cfg.duration === 'number' ? cfg.duration : this._defaults.duration;

    const theme = themes[cfg.theme || this._theme] || {};
    const toastId = id || uid();

    const dedupeKey = cfg.dedupeKey || (this._defaults.autoDedupe ? this._computeDedupeKey(type, cfg) : undefined);
    if (dedupeKey) {
      for (const root of this._roots.values()) {
        const existing = Array.from(root.children).find((n) => n.dataset.dedupeKey === dedupeKey);
        if (existing) {
          let countEl = existing._cachedCountEl;
          if (!countEl) {
            countEl = document.createElement('span');
            countEl.className = 'jt-count';
            countEl.style.marginLeft = '6px';
            existing.querySelector('.jt-title')?.appendChild(countEl);
            existing._cachedCountEl = countEl;
            countEl.textContent = '1';
          }
          countEl.textContent = String(parseInt(countEl.textContent || '1') + 1);
          if (cfg.mergeMessage) {
            const msgEl = existing.querySelector('.jt-message');
            if (msgEl) {
              if (cfg.html) msgEl.innerHTML = sanitizeHTML(cfg.html);
              else msgEl.textContent = String(cfg.message || '');
            }
          }
          return existing.dataset.toastId;
        }
      }
    }

    const toast = document.createElement('div');
    toast.className = 'juice-toast';
    toast.dataset.toastId = toastId;
    toast.dataset.position = cfg.position;
    toast.dataset.toastType = type;
    if (dedupeKey) toast.dataset.dedupeKey = dedupeKey;
    toast.tabIndex = 0;
    toast.setAttribute('role', cfg.ariaRole || (type === 'error' ? 'alert' : 'status'));
    if (!toast.getAttribute('aria-live')) {
      toast.setAttribute('aria-live', (type === 'error' || type === 'success') ? 'assertive' : 'polite');
      toast.setAttribute('aria-atomic', 'true');
    }
    toast.style.position = 'relative';
    toast.style.pointerEvents = 'auto';

    if (cfg.glassOnly) {
      toast.style.background = 'rgba(255,255,255,0.35)';
      toast.style.backdropFilter = 'blur(14px) saturate(140%)';
      toast.style.webkitBackdropFilter = 'blur(14px) saturate(140%)';
      toast.style.color = 'rgba(15,23,42,0.85)';
      toast.style.border = '1px solid rgba(0,0,0,0.08)';
      toast.style.boxShadow =
        '0 8px 28px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.25)';
    } else {
      toast.style.background = cfg.bg || theme.bg;
      toast.style.color = cfg.color || theme.color;
      toast.style.border = cfg.border || theme.border || 'none';
    }
    toast.style.minHeight = toast.style.minHeight || '';

    // initialize transform vars
    toast.style.setProperty('--jt-parallax-x', '0px');
    toast.style.setProperty('--jt-parallax-y', '0px');
    toast.style.setProperty('--jt-parallax-z', '0px');
    toast.style.setProperty('--jt-drag-x', '0px');
    toast.style.setProperty('--jt-drag-y', '0px');
    toast.style.setProperty('--jt-rot-x', '0deg');
    toast.style.setProperty('--jt-rot-y', '0deg');
    toast.style.setProperty('--jt-stack-y', '0px');
    toast.style.setProperty('--jt-stack-scale', '1');

    if (cfg.size && sizePreset[cfg.size]) {
      const p = sizePreset[cfg.size];
      if (p.width) toast.style.width = p.width;
      if (p.padding) toast.style.padding = p.padding;
    }

    // content build (cache nodes where useful)
    const content = document.createElement('div');
    content.className = 'jt-content';
    let titleEl = null;
    if (cfg.title) {
      titleEl = document.createElement('div');
      titleEl.className = 'jt-title';
      titleEl.textContent = cfg.title;
      content.appendChild(titleEl);
    }

    const msg = document.createElement('div');
    msg.className = 'jt-message';
    if (cfg.html) {
      msg.innerHTML = sanitizeHTML(cfg.html);
    } else if (typeof cfg.message === 'string') {
      const parts = cfg.message.split(/(`[^`]+`)/g);
      parts.forEach((part) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          const code = document.createElement('code');
          code.textContent = part.slice(1, -1);
          msg.appendChild(code);
        } else msg.appendChild(document.createTextNode(part));
      });
    } else if (cfg.message) {
      msg.textContent = String(cfg.message);
    }
    content.appendChild(msg);

    if (Array.isArray(cfg.actions) && cfg.actions.length) {
      const actions = document.createElement('div');
      actions.className = 'jt-actions';
      cfg.actions.forEach((a) => {
        const btn = document.createElement('button');
        btn.className = 'jt-action';
        btn.textContent = a.label || 'Action';
        btn.onclick = (ev) => {
          ev.stopPropagation();
          a.onClick?.(ev);
          if (a.closeOnClick !== false) this.remove(toastId);
        };
        actions.appendChild(btn);
      });
      content.appendChild(actions);
    }

    if (!cfg.glassOnly) {
  if (cfg.bgImage) {
    toast.style.backgroundImage = `url(${cfg.bgImage})`;
    toast.style.backgroundSize = cfg.bgSize || 'cover';
    toast.style.backgroundPosition = cfg.bgPosition || 'center';
  } else {
    toast.style.background = cfg.bg || theme.bg;
  }
}

    // ICON
    let icon = null;
    if (cfg.icon) {
      icon = document.createElement('i');
      const iconClass = String(cfg.icon).startsWith('fa') ? cfg.icon : `fa-${cfg.icon}`;
      icon.className = ['icon', cfg.iconPack || '', iconClass].join(' ').trim();
      if (cfg.iconSize) icon.style.fontSize = cfg.iconSize;
      if (!reduceMotion) {
        const anim = cfg.iconAnim || TYPE_ANIMATION[type];
        if (anim) icon.classList.add(anim);
      }
      if (cfg.iconLink || cfg.iconAnimate) {
        icon.classList.add('icon-clickable');
        icon.addEventListener('click', (e) => {
          e.stopPropagation();
          if (cfg.iconAnimate) {
            icon.classList.remove(cfg.iconAnimate);
            void icon.offsetWidth;
            icon.classList.add(cfg.iconAnimate);
          }
          if (cfg.iconLink) window.open(cfg.iconLink, '_blank', 'noopener');
        });
      }
    }

    // Avatar handling
    let avatar = null;
    if (cfg.avatar) {
      avatar = document.createElement('img');
      const src =
        typeof cfg.avatar === 'string' && cfg.avatar
          ? cfg.avatar
          : cfg.avatarSrc || '';
      if (src) avatar.src = src;
      avatar.alt = cfg.avatarAlt || cfg.title || 'avatar';
      avatar.className = 'jt-avatar';
      avatar.loading = cfg.avatarLazy ? 'lazy' : 'eager';
      avatar.style.width = avatar.style.width || '36px';
      avatar.style.height = avatar.style.height || '36px';
      avatar.style.borderRadius = avatar.style.borderRadius || '50%';
      avatar.style.objectFit = avatar.style.objectFit || 'cover';
      avatar.style.flexShrink = '0';
      const aPos = cfg.avatarPosition || 'left';
      if (aPos === 'left') {
        avatar.style.marginRight = cfg.avatarSpacing ?? '10px';
      } else if (aPos === 'right') {
        avatar.style.marginLeft = cfg.avatarSpacing ?? '10px';
      } else if (aPos === 'top') {
        avatar.style.marginBottom = cfg.avatarSpacing ?? '8px';
      }
    }

    // Append order (optimized branches)
    const avatarPos = cfg.avatarPosition || 'left';
    if (avatar && avatarPos === 'top') {
      toast.classList.add('jt-avatar-top');
      toast.style.flexDirection = 'column';
      toast.style.alignItems = 'flex-start';
      toast.appendChild(avatar);
      if (icon && cfg.iconPosition === 'top') {
        toast.appendChild(icon);
        toast.appendChild(content);
      } else if (icon && cfg.iconPosition === 'right') {
        toast.appendChild(content);
        toast.appendChild(icon);
      } else {
        if (icon) toast.appendChild(icon);
        toast.appendChild(content);
      }
    } else {
      toast.style.flexDirection = 'row';
      toast.style.alignItems = 'center';
      if (avatar && avatarPos === 'left') toast.appendChild(avatar);

      if (icon && cfg.iconPosition === 'right') {
        toast.appendChild(content);
        toast.appendChild(icon);
      } else if (icon && cfg.iconPosition === 'top') {
        toast.classList.add('jt-icon-top');
        toast.appendChild(icon);
        toast.appendChild(content);
      } else {
        if (icon) toast.appendChild(icon);
        toast.appendChild(content);
      }

      if (avatar && avatarPos === 'right') {
        toast.appendChild(avatar);
      }
    }

    let progressEl = null;
    if (cfg.progress && (cfg.duration ?? this._defaults.duration) > 0) {
      progressEl = document.createElement('div');
      progressEl.className = 'jt-progress';
      if (cfg.progressColor) progressEl.style.background = cfg.progressColor;
      toast.appendChild(progressEl);
    }

    if (cfg.undo) {
      const undoBtn = document.createElement('button');
      undoBtn.className = 'jt-action';
      undoBtn.textContent = 'Undo';
      undoBtn.onclick = () => {
        try {
          cfg.undo();
        } catch (e) {}
        this.remove(toastId);
      };
      content.appendChild(undoBtn);
    }

    if (cfg.closable) {
      const close = document.createElement('span');
      close.className = 'juice-toast-close';
      close.tabIndex = 0;
      close.textContent = '×';
      close.style.marginLeft = '8px';
      close.addEventListener('click', (e) => {
        e.stopPropagation();
        this.remove(toastId);
      });
      toast.appendChild(close);
    }

    const root = this._getRoot(cfg.position || 'bottom-right');
    if (!root) return;

    if (cfg.groupId) {
  const existing = Array.from(root.children).find(
    (n) => n.dataset.groupId === cfg.groupId
  );
  
  if (existing) {
    const existingId = existing.dataset.toastId;
    
    this.update(existingId, {
      title: cfg.title,
      message: cfg.message,
      html: cfg.html,
      bg: cfg.bg,
      color: cfg.color,
      duration: cfg.duration,
      icon: cfg.icon, 
      iconPack: cfg.iconPack
    });
    
    return existingId;
  }
  
  toast.dataset.groupId = cfg.groupId;
}

    // enforce per-root max (drop oldest if needed)
    const max = this._defaults.maxVisible;
    if (max && root.children.length >= max) {
      // remove oldest child (firstElementChild)
      const oldest = root.firstElementChild;
      if (oldest && oldest.dataset && oldest.dataset.toastId) {
        this.remove(oldest.dataset.toastId);
      } else {
        try { root.removeChild(root.firstElementChild); } catch (e) {}
      }
    }
    root.appendChild(toast);

    // cache some nodes
    toast._cachedTitleEl = titleEl;
    toast._cachedMessageEl = msg;
    toast._cachedProgressEl = progressEl;

    const meta = {
      id: toastId,
      toast,
      cfg,
      type,
      createdAt: now(),
      remaining: cfg.duration ?? this._defaults.duration,
      timer: null,
      start: now(),
      paused: false,
      _boundMove: null,
      _boundUp: null,
      _onPointerDown: null,
      _onEnter: null,
      _onLeave: null,
      dedupeKey,
      hooks: {
        onShow: cfg.onShow,
        onShown: cfg.onShown,
        onClose: cfg.onClose,
        onRemoved: cfg.onRemoved,
      },
    };
    this._activeMap.set(toastId, meta);

    // lifecycle: onShow
    try {
      meta.hooks.onShow?.({ id: toastId, toast, cfg, type });
    } catch (e) {}

    this._runPlugins({ toast, cfg, type, root, meta });

    this._updateStackPositionsFor(root);

    // show animation (respect reduced motion)
    requestAnimationFrame(() => {
      if (!reduceMotion) {
        toast.classList.add('show');
        const animTime = 320;
        setTimeout(() => {
          try {
            meta.hooks.onShown?.({ id: toastId, toast, cfg, type });
          } catch (e) {}
        }, animTime);
      } else {
        toast.style.opacity = '1';
        meta.hooks.onShown?.({ id: toastId, toast, cfg, type });
      }
    });

    /* ---------------- Pointer drag handling ---------------- */
    let startX = 0,
      startY = 0,
      curX = 0,
      curY = 0,
      dragging = false,
      dragAxis = null,
      lastMoveTime = 0,
      lastMoveX = 0;

    const onPointerDown = (e) => {
      const p = e.touches ? e.touches[0] : e;
      startX = p.clientX;
      startY = p.clientY;
      curX = 0;
      curY = 0;
      dragging = true;
      dragAxis = null;
      meta.paused = true;

      // disable transition during drag
      toast.style.transition = 'none';

      meta._boundMove = onPointerMove;
      meta._boundUp = onPointerUp;

      document.addEventListener('touchmove', meta._boundMove, { passive: true });
      document.addEventListener('mousemove', meta._boundMove);
      document.addEventListener('touchend', meta._boundUp);
      document.addEventListener('mouseup', meta._boundUp);

      lastMoveTime = now();
      lastMoveX = startX;
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      curX = p.clientX - startX;
      curY = p.clientY - startY;

      if (!dragAxis) {
        if (Math.abs(curX) > 6) dragAxis = 'x';
        else if (Math.abs(curY) > 6) dragAxis = 'y';
      }

      if (dragAxis === 'x') {
        toast.style.setProperty('--jt-drag-x', `${curX}px`);
      } else if (dragAxis === 'y') {
        toast.style.setProperty('--jt-drag-y', `${curY}px`);
      }

      lastMoveTime = now();
      lastMoveX = p.clientX;
    };

    const onPointerUp = (e) => {
      dragging = false;
      meta.paused = false;

      const absX = Math.abs(curX);
      const absY = Math.abs(curY);
      const axis = dragAxis || (absX > absY ? 'x' : 'y');

      const dt = Math.max(1, now() - lastMoveTime);
      const vx = dt ? (curX / dt) * 1000 : 0;

      const swipedX = axis === 'x' && (absX > (juiceToast._defaults.swipeThreshold || 60) || Math.abs(vx) > 800);
      const swipedY = axis === 'y' && (absY > (juiceToast._defaults.swipeThreshold || 80));

      if (swipedX || swipedY) {
        const sign = curX >= 0 ? 1 : -1;
        if (axis === 'x') {
          toast.style.setProperty('--jt-drag-x', `${sign * 1000}px`);
        } else {
          toast.style.setProperty('--jt-drag-y', `${1000}px`);
        }
        toast.classList.add('swipe-dismissing');
        setTimeout(() => this.remove(toastId), 220);
      } else {
        toast.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
        toast.style.setProperty('--jt-drag-x', `0px`);
        toast.style.setProperty('--jt-drag-y', `0px`);
      }

      curX = curY = 0;

      if (meta._boundMove) {
        document.removeEventListener('touchmove', meta._boundMove);
        document.removeEventListener('mousemove', meta._boundMove);
        meta._boundMove = null;
      }
      if (meta._boundUp) {
        document.removeEventListener('touchend', meta._boundUp);
        document.removeEventListener('mouseup', meta._boundUp);
        meta._boundUp = null;
      }

      // resume timer via scheduler
      meta.start = now();
      this._startScheduler();
    };

    toast._onPointerDown = onPointerDown;
    toast.addEventListener('touchstart', onPointerDown, { passive: true });
    toast.addEventListener('mousedown', onPointerDown);

    /* ---------------- Hover / focus pause handling ---------------- */
    const onEnter = () => {
      meta.paused = true;
    };
    const onLeave = () => {
      if (!meta.paused) return;
      meta.paused = false;
      meta.start = now();
      this._startScheduler();
    };
    meta._onEnter = onEnter;
    meta._onLeave = onLeave;
    toast.addEventListener('mouseenter', onEnter);
    toast.addEventListener('mouseleave', onLeave);
    toast.addEventListener('focusin', onEnter);
    toast.addEventListener('focusout', onLeave);

    /* ---------------- timer handled by global scheduler ---------------- */
    meta.start = now();
    meta.remaining = cfg.duration ?? this._defaults.duration;
    meta.paused = false;

    // if duration <= 0 it's sticky
    if ((cfg.duration ?? this._defaults.duration) > 0) {
      this._startScheduler();
    }

    // undo timeout helper
    if (cfg.undoTimeout) {
      meta.timer = setTimeout(() => this.remove(toastId), cfg.undoTimeout);
    }

    if (cfg.playSound || this._defaults.playSound)
      this._playSound(cfg.playSound || this._defaults.playSound);

    return toastId;
  },

  // global scheduler: updates all active toasts and parallax transforms
  _startScheduler() {
    if (this._schedulerRunning) return;
    this._schedulerRunning = true;
    const step = (ts) => {
      const currentTs = now();
      this._schedulerLast = currentTs;
      // update timers
      if (!this._pausedAll) {
        this._activeMap.forEach((meta, id) => {
          if (!meta || meta.paused) return;
          const duration = meta.cfg.duration ?? this._defaults.duration;
          if (duration <= 0) return;
          const elapsed = currentTs - meta.start;
          // clamp elapsed (avoid enormous values)
          const safeElapsed = Math.max(0, Math.min(elapsed, 1000));
          meta.remaining -= safeElapsed;
          meta.start = currentTs;
          // update progress bar if present
          const progressEl = meta.toast._cachedProgressEl || meta.toast.querySelector('.jt-progress');
          if (progressEl) {
            const scale = Math.max(0, meta.remaining / duration);
            progressEl.style.transform = `scaleX(${scale})`;
          }
          if (meta.remaining <= 0) {
            if (!reduceMotion) meta.toast.classList.remove('show');
            setTimeout(() => this.remove(id), 280);
          }
        });
      }

      // parallax: apply lerped targets from each root._parallaxTargets
      this._roots.forEach((root) => {
        if (!root._parallaxTargets || !root.children.length) return;
        Array.from(root.children).forEach((child) => {
          const target = root._parallaxTargets.get(child) || { tx: 0, ty: 0, tz: 0, rotX: 0, rotY: 0, smoothing: this._defaults.parallaxSmoothing ?? 0.12 };
          child._jtPrev = child._jtPrev || { tx: 0, ty: 0, tz: 0, rotX: 0, rotY: 0 };
          const prev = child._jtPrev;
          const s = target.smoothing ?? (this._defaults.parallaxSmoothing ?? 0.12);
          const nx = lerp(prev.tx, target.tx || 0, s);
          const ny = lerp(prev.ty, target.ty || 0, s);
          const nz = lerp(prev.tz, target.tz || 0, s);
          const nrotX = lerp(prev.rotX, target.rotX || 0, s);
          const nrotY = lerp(prev.rotY, target.rotY || 0, s);

          child.style.setProperty('--jt-parallax-x', `${nx}px`);
          child.style.setProperty('--jt-parallax-y', `${ny}px`);
          child.style.setProperty('--jt-parallax-z', `${nz}px`);
          child.style.setProperty('--jt-rot-x', `${nrotX}deg`);
          child.style.setProperty('--jt-rot-y', `${nrotY}deg`);

          child._jtPrev.tx = nx;
          child._jtPrev.ty = ny;
          child._jtPrev.tz = nz;
          child._jtPrev.rotX = nrotX;
          child._jtPrev.rotY = nrotY;
        });
      });

      // cleanup step: if no active timers and no parallax targets running, stop scheduler
      let activeTimers = false;
      this._activeMap.forEach((m) => {
        const d = m.cfg.duration ?? this._defaults.duration;
        if (d > 0 && !m.paused) activeTimers = true;
      });
      let anyParallax = false;
      this._roots.forEach((r) => {
        if (r._parallaxTargets && r.children.length) anyParallax = true;
      });
      if (!activeTimers && !anyParallax) {
        this._stopScheduler();
      } else {
        this._schedulerRAF = requestAnimationFrame(step);
      }
    };
    this._schedulerRAF = requestAnimationFrame(step);
  },

  _stopScheduler() {
    if (!this._schedulerRunning) return;
    if (this._schedulerRAF) cancelAnimationFrame(this._schedulerRAF);
    this._schedulerRAF = null;
    this._schedulerRunning = false;
    this._schedulerLast = 0;
  },

  /* ---------------- remove (wait animationend) ---------------- */
  remove(id) {
    const meta = this._activeMap.get(id);
    if (!meta) return false;
    const { toast, cfg, type } = meta;

    // lifecycle hook: onClose
    try {
      meta.hooks.onClose?.({ id, toast, cfg, type });
    } catch (e) {}

    if (!reduceMotion) toast.classList.add('hide');
    else toast.style.opacity = '0';

    // Remove pointerstart listeners attached to toast (use stored refs)
    try {
      if (toast._onPointerDown) {
        toast.removeEventListener('touchstart', toast._onPointerDown);
        toast.removeEventListener('mousedown', toast._onPointerDown);
      }
    } catch (e) {}

    // Remove any document listeners in case they were left
    if (meta._boundMove) {
      try {
        document.removeEventListener('touchmove', meta._boundMove);
        document.removeEventListener('mousemove', meta._boundMove);
      } catch (e) {}
      meta._boundMove = null;
    }
    if (meta._boundUp) {
      try {
        document.removeEventListener('touchend', meta._boundUp);
        document.removeEventListener('mouseup', meta._boundUp);
      } catch (e) {}
      meta._boundUp = null;
    }

    // Remove hover/focus listeners (use stored refs)
    try {
      if (meta._onEnter) toast.removeEventListener('mouseenter', meta._onEnter);
      if (meta._onLeave) toast.removeEventListener('mouseleave', meta._onLeave);
      if (meta._onEnter) toast.removeEventListener('focusin', meta._onEnter);
      if (meta._onLeave) toast.removeEventListener('focusout', meta._onLeave);
    } catch (e) {}

    // cancel timers & queued undo timer
    if (meta.timer) {
      clearTimeout(meta.timer);
      meta.timer = null;
    }

    // remove entry from active map
    this._activeMap.delete(id);

    // remove from DOM and update stack — but wait animation end to remove
    const parent = toast.parentNode;
    if (parent) {
      const finalize = () => {
        try {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        } catch (e) {}
        try {
          if (parent.children.length === 0) {
            // clean up root if empty
            try {
              if (parent._parallaxHandler) {
                parent.removeEventListener('mousemove', parent._parallaxHandler);
                parent.removeEventListener('touchmove', parent._parallaxHandler);
              }
              if (parent._parallaxReset) {
                parent.removeEventListener('mouseleave', parent._parallaxReset);
                parent.removeEventListener('touchend', parent._parallaxReset);
              }
              parent.remove();
            } catch (e) {}
            this._roots.delete(parent.dataset.position);
          } else {
            this._updateStackPositionsFor(parent);
          }
        } catch (e) {}
        // remove dedupe key if any
        if (meta.dedupeKey) {
          try {
            this._queueDedupe.delete(meta.dedupeKey);
          } catch (e) {}
        }
        // lifecycle hook: onRemoved
        try {
          meta.hooks.onRemoved?.({ id, cfg, type });
        } catch (e) {}
      };

      // if hide animation used, listen animationend; otherwise remove immediately
      if (!reduceMotion) {
        const onEnd = (ev) => {
          if (ev.target === toast) {
            toast.removeEventListener('animationend', onEnd);
            finalize();
          }
        };
        toast.addEventListener('animationend', onEnd);
        // fallback timeout
        setTimeout(finalize, 700);
      } else {
        finalize();
      }
    } else {
      // already detached
      if (meta.dedupeKey) {
        try {
          this._queueDedupe.delete(meta.dedupeKey);
        } catch (e) {}
      }
      try {
        meta.hooks.onRemoved?.({ id, cfg, type });
      } catch (e) {}
    }

    return true;
  },

  update(id, newCfg = {}) {
    const meta = this._activeMap.get(id);
    if (!meta) {
      this._warn('update: id not found ' + id);
      return false;
    }
    const { toast } = meta;
    meta.cfg = merge(meta.cfg, newCfg);

    if (meta.cfg.title) {
      const t = toast.querySelector('.jt-title') || toast._cachedTitleEl;
      if (t) t.textContent = meta.cfg.title;
    }
    const msgEl = toast.querySelector('.jt-message') || toast._cachedMessageEl;
    if (msgEl) {
      if (meta.cfg.html) msgEl.innerHTML = sanitizeHTML(meta.cfg.html);
      else msgEl.textContent = String(meta.cfg.message || '');
    }
    const theme = themes[meta.cfg.theme || this._theme] || {};
    toast.style.background = meta.cfg.bg || theme.bg;
    toast.style.color = meta.cfg.color || theme.color;
    toast.style.border = meta.cfg.border || theme.border || 'none';

    // duration reset handled by scheduler: set remaining and start time
    if (meta.cfg.duration !== undefined) {
      meta.remaining = meta.cfg.duration;
      meta.start = now();
      if (!meta.paused) this._startScheduler();
      // reset progress bar visually
      const p = meta.toast._cachedProgressEl || meta.toast.querySelector('.jt-progress');
      if (p) p.style.transform = 'scaleX(1)';
    }

    this._runPlugins({ toast, cfg: meta.cfg, type: meta.type, meta });
    return true;
  },

  _priorityMap: { low: 1, normal: 2, high: 3, urgent: 4 },

  /* ---------------- New public API features ---------------- */

  // 1) Pause all timers (global)
  pauseAll() {
    this._pausedAll = true;
  },

  resumeAll() {
    this._pausedAll = false;
    // reset start times for active items
    this._activeMap.forEach((m) => (m.start = now()));
    this._startScheduler();
  },

  // 2) Dismiss all toasts, optional filter { type, position }
  dismissAll(filter = {}) {
    const byType = filter.type;
    const byPos = filter.position;
    const ids = [];
    this._activeMap.forEach((m, id) => {
      const matchesType = byType ? m.type === byType : true;
      const matchesPos = byPos ? (m.cfg.position || m.toast.dataset.position) === byPos : true;
      if (matchesType && matchesPos) ids.push(id);
    });
    ids.forEach((id) => this.remove(id));
  },

  // convenience: get active toasts metadata snapshot
  listActive() {
    const out = [];
    this._activeMap.forEach((m, id) => {
      out.push({ id, type: m.type, remaining: m.remaining, createdAt: m.createdAt, position: m.cfg.position });
    });
    return out;
  },
};

/* ---------------- Backwards helpers ---------------- */
function normalizeState(state, fallback) {
  if (!state) return { message: fallback };
  if (typeof state === 'string') return { message: state };
  return state;
}
function resolveState(state, value, fallback) {
  if (!state) return { message: fallback };
  if (typeof state === 'function') return { message: state(value) };
  if (typeof state === 'string') return { message: state };
  return state;
}

/* ---------------- Default types ---------------- */
juiceToast.setup({
  success: {
    icon: 'fa-check',
    iconPack: 'fas',
    bg: '#16a34a',
    progress: true,
    duration: 4000,
  },
  error: {
    icon: 'fa-xmark',
    iconPack: 'fas',
    bg: '#dc2626',
    progress: true,
    duration: 4000,
  },
  info: {
    icon: 'fa-circle-info',
    iconPack: 'fas',
    bg: '#2563eb',
    progress: true,
    duration: 4000,
  },
  warning: {
    icon: 'fa-triangle-exclamation',
    iconPack: 'fas',
    bg: '#f59e0b',
    progress: true,
    duration: 4000,
  },
  loading: {
    icon: 'fa-spinner',
    iconPack: 'fas',
    iconAnim: 'jt-spin',
    duration: 0,
    progress: true,
  },
});

/* ---------------- Exports ---------------- */
export default juiceToast;
export { juiceToast };