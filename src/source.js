'use strict';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const reduceMotion = isBrowser && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Priority Queue (max-heap) ---------------- */
class PriorityQueue {
  constructor() { this._heap = []; }
  get size() { return this._heap.length; }
  _parent(i) { return Math.floor((i - 1) / 2); }
  _left(i) { return 2 * i + 1; }
  _right(i) { return 2 * i + 2; }
  _swap(i, j) { [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]; }
  push(item, priority = 0) {
    const node = { item, priority, seq: PriorityQueue._seq = (PriorityQueue._seq || 0) + 1 };
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
  peek() { return this._heap[0] ? this._heap[0].item : null; }
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
      const l = this._left(i), r = this._right(i), n = this._heap.length;
      let largest = i;
      if (l < n && this._compare(l, largest) > 0) largest = l;
      if (r < n && this._compare(r, largest) > 0) largest = r;
      if (largest === i) break;
      this._swap(i, largest);
      i = largest;
    }
  }
  _compare(a, b) {
    const A = this._heap[a], B = this._heap[b];
    if (A.priority !== B.priority) return A.priority - B.priority;
    return B.seq - A.seq; // newer items first when equal priority
  }
}

/* ---------------- CSS Injection (kept lean + safe) ---------------- */
let __cssInjected = false;
const BASE_CSS = `
/* JuiceToast base (v1.4.0) */
#juice-toast-root,[id^="juice-toast-root-"]{position:fixed;z-index:9999;display:flex;pointer-events:none;gap:10px}
#juice-toast-root[data-position="bottom-right"],#juice-toast-root-bottom-right{bottom:20px;right:20px;flex-direction:column-reverse;align-items:flex-end}
#juice-toast-root[data-position="top-right"]{top:20px;right:20px;flex-direction:column;align-items:flex-end}
#juice-toast-root[data-position="bottom-left"]{bottom:20px;left:20px;flex-direction:column-reverse;align-items:flex-start}
#juice-toast-root[data-position="top-left"]{top:20px;left:20px;flex-direction:column;align-items:flex-start}
#juice-toast-root[data-position="top-center"],#juice-toast-root[data-position="bottom-center"]{left:50%;transform:translateX(-50%)}
.juice-toast{pointer-events:auto;min-width:220px;max-width:420px;padding:12px 16px;margin:6px 0;border-radius:10px;background:linear-gradient(180deg,rgba(30,30,30,.95),rgba(20,20,20,.95));color:#fff;display:flex;gap:12px;align-items:flex-start;box-sizing:border-box;transition:opacity .28s ease,transform .32s ease}
@keyframes jt-slide-in{0%{opacity:0;transform:translateY(20px) scale(0.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes jt-slide-out{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(20px) scale(0.95)}}
.juice-toast.show{animation:jt-slide-in .32s cubic-bezier(0.4,0,0.2,1) forwards;opacity:1;transform:translateY(0)}
.juice-toast.hide{animation:jt-slide-out .28s cubic-bezier(0.4,0,0.2,1) forwards;opacity:0;transform:translateY(12px);pointer-events:none}
.juice-toast .icon{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(255,255,255,.06)}
.jt-content{display:flex;flex-direction:column;gap:4px;flex:1}
.jt-title{font-weight:700;font-size:13px}
.jt-message{font-size:13px;opacity:.95}
.jt-actions{display:flex;gap:8px;margin-top:10px}
.jt-action{border:1px solid currentColor;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer;background:transparent}
.jt-progress{position:absolute;left:0;bottom:0;height:4px;width:100%;border-radius:2px;background:linear-gradient(90deg,#4ade80,#22c55e);transform-origin:left;transform:scaleX(1);transition:transform linear}

/* avatar specific */
.jt-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0}

/* ---------------- Modal ---------------- */
/* Overlay */
.jt-modal-overlay{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  background:rgba(15,23,42,.55);
  backdrop-filter:blur(6px) saturate(120%);
  -webkit-backdrop-filter:blur(6px) saturate(120%);
  opacity:0;
  transition:opacity .25s ease;
  z-index:10000;
}
.jt-modal-overlay.show{
  opacity:1;
}

/* Base modal */
.jt-modal{
  width:100%;
  max-width:520px;
  border-radius:18px;
  padding:24px;

  opacity:0;
  transform:translateY(40px) scale(.96);
  transition:
    transform .35s cubic-bezier(.16,1,.3,1),
    opacity .25s ease;
}

.jt-modal.show{
  opacity:1;
  transform:translateY(0) scale(1);
}

.jt-modal-header{
  font-size:18px;
  font-weight:600;
  letter-spacing:.3px;
  margin-bottom:10px;
}

.jt-modal-body{
  font-size:14.5px;
  line-height:1.6;
  opacity:.85;
  margin-bottom:22px;
}

.jt-modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:12px;
}

.jt-modal-btn{
  min-width:88px;
  padding:8px 16px;
  border-radius:12px;
  font-size:13.5px;
  font-weight:500;
  cursor:pointer;
  transition:all .2s ease;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.04);
  color:inherit;
}
.jt-modal-btn:hover{
  background:rgba(255,255,255,.08);
  transform:translateY(-1px);
}
.jt-modal-btn:active{
  transform:translateY(0);
}

.jt-modal-btn.primary{
  background:#6366f1;
  border-color:#6366f1;
  color:#fff;
}
.jt-modal-btn.primary:hover{
  background:#5458ee;
}
`;

/**
 * injectCSS - improved: checks for existing element id to avoid double-injection
 */
function injectCSS(css = BASE_CSS) {
  if (!isBrowser || __cssInjected) return;
  if (document.getElementById('juice-toast-style')) { __cssInjected = true; return; }
  const st = document.createElement('style');
  st.id = 'juice-toast-style';
  st.textContent = css;
  document.head.appendChild(st);
  __cssInjected = true;
}

/* ---------------- Utilities ---------------- */
const uid = (() => { let n = 1; return () => 'jt-' + (n++); })();
function now() { return Date.now(); }
function merge(a, b) { return Object.assign({}, a || {}, b || {}); }
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

/**
 * sanitizeHTML - improved: removes dangerous attributes (on*), and javascript: URIs on href/src
 * still simple (lightweight). For full-proof sanitization use DOMPurify externally.
 */
function sanitizeHTML(input) {
  if (!input) return '';
  const t = document.createElement('template');
  t.innerHTML = input;
  t.content.querySelectorAll('script, style, iframe').forEach(el => el.remove());
  const allowed = ['b','i','u','strong','em','code','pre','ul','ol','li','br','p','span','img','h1','h2','h3','h4','h5','h6','a'];
  (function walk(node){
    Array.from(node.childNodes).forEach(ch => {
      if (ch.nodeType === 1) {
        const name = ch.tagName.toLowerCase();
        if (!allowed.includes(name)) {
          ch.replaceWith(...Array.from(ch.childNodes));
        } else {
          // remove event handler attributes and dangerous URIs
          Array.from(ch.attributes || []).forEach(attr => {
            const an = attr.name.toLowerCase();
            const av = attr.value || '';
            if (an.startsWith('on')) {
              ch.removeAttribute(attr.name);
            } else if ((an === 'href' || an === 'src' || an === 'xlink:href') && av.trim().toLowerCase().startsWith('javascript:')) {
              ch.removeAttribute(attr.name);
            } else if (name === 'img' && an === 'srcset') {
              // remove srcset to avoid complex parsing issues
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
  dark: { bg: 'linear-gradient(180deg,#1f2937,#111827)', color: '#fff', border: '1px solid rgba(255,255,255,.06)' },
  light: { bg: '#fff', color: '#111', border: '1px solid #e5e7eb' },
  glass: { bg: 'rgba(30,30,30,.35)', color: '#fff', border: '1px solid rgba(255,255,255,.1)' }
};
const sizePreset = { sm: { width: '260px', padding: '10px' }, md: { width: '320px', padding: '14px' }, lg: { width: '420px', padding: '18px' } };

/* ---------------- Animations map ---------------- */
const TYPE_ANIMATION = { success: 'jt-bounce', error: 'jt-shake', warning: 'jt-shake', info: 'jt-pulse', loading: 'jt-spin' };

/* ---------------- Core ---------------- */
const juiceToast = {
  _defaults: {
    duration: 2500,
    maxVisible: 3,
    swipeThreshold: 60,
    glassUI: 0,
    playSound: null,
    dev: false,
    injectCSS: true,
    css: null,
  },
  _config: {},
  _theme: 'dark',
  _plugins: [],
  _queue: new PriorityQueue(),
  _queueDedupe: new Set(),
  _activeMap: new Map(),
  _roots: new Map(),
  _modalStack: [],

  setup(cfg = {}) {
    const { duration, maxVisible, ...types } = cfg;
    if (duration) this._defaults.duration = duration;
    if (maxVisible) this._defaults.maxVisible = maxVisible;
    this._config = merge(this._config, types);
    this._registerTypes();
  },

  use(plugin) { if (typeof plugin === 'function') this._plugins.push(plugin); },
  addType(name, cfg = {}) { this._config[name] = cfg; this._registerTypes(); },
  defineTheme(name, styles = {}) { themes[name] = merge(themes[name] || {}, styles); },
  setTheme(name) { this._theme = name; if (!isBrowser) return; this._roots.forEach(r => r.dataset.theme = name); },
  clear() { this._queue = new PriorityQueue(); this._queueDedupe.clear(); },
  destroy() { this.clear(); if (!isBrowser) return; this._roots.forEach(r => r.remove()); this._roots.clear(); },

  promise(promise, states = {}) {
    if (!promise || typeof promise.then !== 'function') { this._warn('promise expects a Promise'); return; }
    const ctrl = { id: uid() };
    const id = ctrl.id;
    const timeout = states.timeout;

    this._enqueue('loading', { ...normalizeState(states.loading, 'Loading...'), groupId: id, duration: 0 });

    let timer = null;
    if (timeout) timer = setTimeout(() => {
      this._enqueue('error', { message: states.timeoutMessage || 'Request timeout', groupId: id });
      cleanup();
    }, timeout);

    const cleanup = () => { if (timer) clearTimeout(timer); };

    promise.then(res => {
      cleanup();
      this._enqueue('success', { ...resolveState(states.success, res, 'Success'), groupId: id });
    }).catch(err => {
      cleanup();
      this._enqueue('error', { ...resolveState(states.error, err, 'Error'), groupId: id });
    });

    return { cancel: () => { this._enqueue('info', { message: states.cancelMessage || 'Cancelled', groupId: id }); if (timer) { clearTimeout(timer); } } };
  },

modal(options = {}) {
  if (!isBrowser) return;

  if (this._defaults.injectCSS !== false) {
    injectCSS(this._defaults.css || BASE_CSS);
  }

  const cfg = merge({
    title: '',
    message: '',
    html: null,
    block: true, // 🔥 block content
    blur: true,
    closeOnOverlay: true,
    closable: true,
    animation: 'scale', // scale | slide | fade
    actions: [],
    theme: this._theme
  }, options);

  const theme = themes[cfg.theme] || themes.dark;

  const overlay = document.createElement('div');
  overlay.className = 'jt-modal-overlay';

  if (cfg.block) {
    overlay.style.pointerEvents = 'all';
  } else {
    overlay.style.pointerEvents = 'none';
  }

  if (!cfg.blur) {
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';
  }

  const modal = document.createElement('div');
  modal.className = `jt-modal jt-anim-${cfg.animation}`;
  modal.style.background = theme.bg;
  modal.style.color = theme.color;
  modal.style.border = theme.border || 'none';

  if (cfg.title) {
    const header = document.createElement('div');
    header.className = 'jt-modal-header';
    header.textContent = cfg.title;
    modal.appendChild(header);
  }

  const body = document.createElement('div');
  body.className = 'jt-modal-body';
  cfg.html ? body.innerHTML = sanitizeHTML(cfg.html)
           : body.textContent = cfg.message || '';
  modal.appendChild(body);

  if (cfg.actions?.length) {
    const actions = document.createElement('div');
    actions.className = 'jt-modal-actions';

    cfg.actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'jt-modal-btn' + (a.primary ? ' primary' : '');
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

  if (cfg.block) document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    overlay.classList.add('show');
    modal.classList.add('show');
  });

  const close = () => {
    overlay.classList.remove('show');
    modal.classList.remove('show');
    setTimeout(() => {
      overlay.remove();
      if (cfg.block) document.body.style.overflow = '';
    }, 300);
  };

  if (cfg.closable) {
    if (cfg.closeOnOverlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
      });
    }

    const esc = (e) => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', esc);
      }
    };
    document.addEventListener('keydown', esc);
  }

  return { close };
},

  _registerTypes() {
    Object.keys(this._config).forEach(type => {
      if (typeof this[type] === 'function' && !this[type].__auto) return;
      const fn = (payload) => this._enqueue(type, payload);
      fn.__auto = true; this[type] = fn;
    });
  },

  _enqueue(type, payload = {}) {
    const priority = this._priorityMap?.[payload.priority] ?? 2;
    const dedupeKey = payload.dedupeKey;
    if (dedupeKey && this._queueDedupe.has(dedupeKey)) {
      if (this._defaults.dev) console.log('[JuiceToast] deduped', dedupeKey);
      return;
    }
    const item = { id: uid(), type, payload, priority };
    if (dedupeKey) this._queueDedupe.add(dedupeKey);
    this._queue.push(item, priority);
    this._processQueue();
  },

  _processQueue() {
    if (!isBrowser) return;
    const max = this._defaults.maxVisible;
    while (this._queue.size > 0) {
      const next = this._queue.pop();
      if (!next) break;
      const position = next.payload?.position || 'bottom-right';
      const root = this._getRoot(position);
      const showing = Array.from(root.children).length;
      if (showing >= max) {
        this._queue.push(next, next.priority - 0.001);
        break;
      }
      this._showToast(next.type, next.payload, next.id);
    }
  },

  _getRoot(position = 'bottom-right') {
    if (!isBrowser) return null;
    if (this._roots.has(position)) return this._roots.get(position);
    const root = document.createElement('div');
    root.id = `juice-toast-root-${position}`;
    root.dataset.position = position;
    root.dataset.theme = this._theme;
    root.style.pointerEvents = 'none';
    root.style.display = 'flex';
    switch (position) {
      case 'top-left': root.style.top = '20px'; root.style.left = '20px'; break;
      case 'top-right': root.style.top = '20px'; root.style.right = '20px'; break;
      case 'bottom-left': root.style.bottom = '20px'; root.style.left = '20px'; break;
      case 'bottom-right': root.style.bottom = '20px'; root.style.right = '20px'; break;
      case 'top-center': root.style.top = '20px'; root.style.left = '50%'; root.style.transform = 'translateX(-50%)'; break;
      case 'bottom-center': root.style.bottom = '20px'; root.style.left = '50%'; root.style.transform = 'translateX(-50%)'; break;
      default: root.style.bottom = '20px'; root.style.right = '20px';
    }
    document.body.appendChild(root);
    this._roots.set(position, root);
    return root;
  },

  _warn(msg) { if (this._defaults.dev && typeof console !== 'undefined') console.warn('[JuiceToast]', msg); },

  _playSound(src) {
    if (!isBrowser) return; const s = typeof src === 'string' && src ? src : this._defaults.playSound; if (!s) return;
    try { const a = new Audio(s); a.volume = 0.6; a.play().catch(() => {}); } catch (e) {}
  },

  _updateStackPositionsFor(root) {
    const children = Array.from(root.children);
    const isBottom = root.dataset.position && root.dataset.position.includes('bottom');
    children.forEach((el, i) => {
      const index = isBottom ? i : i;
      const offset = index * 12;
      el.style.setProperty('--jt-stack-y', `-${offset}px`);
      el.style.setProperty('--jt-stack-scale', 1 - index * 0.04);
      el.style.setProperty('--jt-stack-opacity', 1 - index * 0.12);
      el.style.zIndex = 1000 - index;
    });
  },

  _runPlugins(ctx) { this._plugins.forEach(fn => { try { fn(ctx); } catch (e) { this._warn('Plugin error: ' + e.message); } }); },

  _normalizeGlass(value) { if (value === true) return 60; if (!value) return 0; const n = Number(value); return Number.isFinite(n) ? clamp(n, 0, 100) : 0; },

  _showToast(type, payload = {}, id) {
    if (!isBrowser) return;
    if (this._defaults.injectCSS !== false) injectCSS(this._defaults.css || BASE_CSS);

    const base = this._config[type] || {};
    const data = (typeof payload === 'object') ? payload : { message: String(payload) };
    const cfg = merge(base, data);
    cfg.icon = cfg.icon ?? cfg.icon_left_top;
    cfg.position = cfg.position ?? cfg.toast ?? 'bottom-right';
    cfg.closable = cfg.closable ?? cfg.closeable ?? true;
    cfg.duration = cfg.duration ?? this._defaults.duration;

    const theme = themes[cfg.theme || this._theme] || {};
    const toastId = id || uid();

    const toast = document.createElement('div');
    toast.className = 'juice-toast';
    toast.dataset.toastId = toastId;
    toast.dataset.position = cfg.position;
    toast.tabIndex = 0;
    toast.setAttribute('role', 'status');
    toast.style.position = 'relative';
    toast.style.pointerEvents = 'auto';
    toast.style.background = cfg.bg || theme.bg;
    toast.style.color = cfg.color || theme.color;
    toast.style.border = cfg.border || theme.border || 'none';

    if (cfg.size && sizePreset[cfg.size]) { const p = sizePreset[cfg.size]; if (p.width) toast.style.width = p.width; if (p.padding) toast.style.padding = p.padding; }

    const content = document.createElement('div'); content.className = 'jt-content';
    if (cfg.title) { const t = document.createElement('div'); t.className = 'jt-title'; t.textContent = cfg.title; content.appendChild(t); }

    const msg = document.createElement('div'); msg.className = 'jt-message';
    if (cfg.html) { msg.innerHTML = sanitizeHTML(cfg.html); }
    else if (typeof cfg.message === 'string') {
      const parts = cfg.message.split(/(`[^`]+`)/g);
      parts.forEach(part => {
        if (part.startsWith('`') && part.endsWith('`')) { const code = document.createElement('code'); code.textContent = part.slice(1, -1); msg.appendChild(code); }
        else msg.appendChild(document.createTextNode(part));
      });
    } else if (cfg.message) { msg.textContent = String(cfg.message); }

    content.appendChild(msg);

    if (Array.isArray(cfg.actions) && cfg.actions.length) {
      const actions = document.createElement('div'); actions.className = 'jt-actions';
      cfg.actions.forEach(a => {
        const btn = document.createElement('button'); btn.className = 'jt-action'; btn.textContent = a.label || 'Action';
        btn.onclick = (ev) => { ev.stopPropagation(); a.onClick?.(ev); if (a.closeOnClick) removeNow(); };
        actions.appendChild(btn);
      });
      content.appendChild(actions);
    }

    let icon = null;
    if (cfg.icon) {
      icon = document.createElement('i'); icon.className = ['icon', cfg.iconPack || '', cfg.icon].join(' ').trim();
      if (cfg.iconSize) icon.style.fontSize = cfg.iconSize;
      if (!reduceMotion) {
        const anim = cfg.iconAnim || TYPE_ANIMATION[type]; if (anim) icon.classList.add(anim);
      }
      if (cfg.iconLink || cfg.iconAnimate) {
        icon.classList.add('icon-clickable');
        icon.addEventListener('click', (e) => { e.stopPropagation(); if (cfg.iconAnimate) { icon.classList.remove(cfg.iconAnimate); void icon.offsetWidth; icon.classList.add(cfg.iconAnimate); } if (cfg.iconLink) window.open(cfg.iconLink, '_blank', 'noopener'); });
      }
    }

    // --- Avatar handling (fixed placement + small upgrade)
    // cfg.avatar can be string (src) or truthy; cfg.avatarPosition: 'left'|'right'|'top' (default 'left')
    let avatar = null;
    if (cfg.avatar) {
      avatar = document.createElement('img');
      const src = (typeof cfg.avatar === 'string' && cfg.avatar) ? cfg.avatar : (cfg.avatarSrc || '');
      if (src) avatar.src = src;
      avatar.alt = cfg.avatarAlt || cfg.title || 'avatar';
      avatar.className = 'jt-avatar';
      avatar.loading = cfg.avatarLazy ? 'lazy' : 'eager';
      // base inline styles (kept lightweight)
      avatar.style.width = avatar.style.width || '36px';
      avatar.style.height = avatar.style.height || '36px';
      avatar.style.borderRadius = avatar.style.borderRadius || '50%';
      avatar.style.objectFit = avatar.style.objectFit || 'cover';
      avatar.style.flexShrink = '0';
      // positioning spacing depending on requested position
      const aPos = cfg.avatarPosition || 'left';
      if (aPos === 'left') {
        avatar.style.marginRight = cfg.avatarSpacing ?? '10px';
      } else if (aPos === 'right') {
        avatar.style.marginLeft = cfg.avatarSpacing ?? '10px';
      } else if (aPos === 'top') {
        // for top we will append before content and add column layout to toast when necessary
        avatar.style.marginBottom = cfg.avatarSpacing ?? '8px';
      }
    }

    // Append order: avatar (left/top), icon, content — ensures avatar is sibling of content (not inside)
    // For avatarPosition === 'top', we switch layout to column for the toast
    const avatarPos = (cfg.avatarPosition || 'left');
    if (avatar && avatarPos === 'top') {
      // make toast column for top-avatar layout temporarily
      toast.classList.add('jt-avatar-top');
      toast.style.flexDirection = 'column';
      toast.style.alignItems = 'flex-start';
      toast.appendChild(avatar);
      // then icon/content below
      if (icon && cfg.iconPosition === 'top') { toast.appendChild(icon); toast.appendChild(content); }
      else if (icon && cfg.iconPosition === 'right') { /* right icon in column layout -> place after content */ toast.appendChild(content); toast.appendChild(icon); }
      else { if (icon) toast.appendChild(icon); toast.appendChild(content); }
    } else {
      // horizontal layout (default)
      toast.style.flexDirection = 'row';
      toast.style.alignItems = 'center';
      if (avatar && avatarPos === 'left') toast.appendChild(avatar);

      if (icon && cfg.iconPosition === 'right') {
        // content first, then icon
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
        // avatar to the far right; margin-left handles spacing
        // ensure content takes remaining space
        // content is already flex:1 per CSS (.jt-content), so avatar remains right
        toast.appendChild(avatar);
      }
    }

    let progressEl = null;
    if (cfg.progress && (cfg.duration ?? this._defaults.duration) > 0) {
      progressEl = document.createElement('div'); progressEl.className = 'jt-progress';
      if (cfg.progressColor) progressEl.style.background = cfg.progressColor;
      toast.appendChild(progressEl);
    }

    if (cfg.undo) {
      const undoBtn = document.createElement('button'); undoBtn.className = 'jt-action'; undoBtn.textContent = 'Undo'; undoBtn.onclick = () => { try { cfg.undo(); } catch (e) {} removeNow(); };
      content.appendChild(undoBtn);
    }

    if (cfg.closable) {
      const close = document.createElement('span'); close.className = 'juice-toast-close'; close.tabIndex = 0; close.textContent = '×';
      close.addEventListener('click', (e) => { e.stopPropagation(); removeNow(); });
      toast.appendChild(close);
    }

    const root = this._getRoot(cfg.position || 'bottom-right');
    if (!root) return;

    if (cfg.groupId) {
      const existing = Array.from(root.children).find(n => n.dataset.groupId === cfg.groupId);
      if (existing) {
        let countEl = existing.querySelector('.jt-count');
        if (!countEl) { countEl = document.createElement('span'); countEl.className = 'jt-count'; countEl.style.marginLeft = '6px'; existing.querySelector('.jt-title')?.appendChild(countEl); countEl.textContent = '1'; }
        countEl.textContent = String((parseInt(countEl.textContent || '1') + 1));
        return;
      }
      toast.dataset.groupId = cfg.groupId;
    }

    const max = this._defaults.maxVisible;
    if (max && root.children.length >= max) root.removeChild(root.firstElementChild);
    root.appendChild(toast);

    const meta = {
      id: toastId,
      toast,
      cfg,
      createdAt: now(),
      remaining: cfg.duration ?? this._defaults.duration,
      raf: null,
      timer: null,
      start: now(),
      paused: false,
      // bound handlers for robust cleanup
      _boundMove: null,
      _boundUp: null
    };
    this._activeMap.set(toastId, meta);

    this._runPlugins({ toast, cfg, type, root });
    this._updateStackPositionsFor(root);

    // show animation
    requestAnimationFrame(() => toast.classList.add('show'));

    /* ---------------- Pointer drag handling (optimized)
       - we DON'T install persistent global listeners.
       - listeners for move/up are added on pointerdown and removed on pointerup.
    ---------------- */
    let startX = 0, startY = 0, curX = 0, curY = 0, dragging = false;

    const onPointerDown = (e) => {
      const p = (e.touches ? e.touches[0] : e);
      startX = p.clientX; startY = p.clientY; dragging = true;
      meta.paused = true;
      // stop RAF while dragging
      if (meta.raf) { cancelAnimationFrame(meta.raf); meta.raf = null; }
      toast.style.transition = 'none';

      // bind move/up on document only while dragging
      meta._boundMove = onPointerMove;
      meta._boundUp = onPointerUp;

      // touchmove needs passive:true to avoid blocking, but we still want to read coordinates
      document.addEventListener('touchmove', meta._boundMove, { passive: true });
      document.addEventListener('mousemove', meta._boundMove);
      document.addEventListener('touchend', meta._boundUp);
      document.addEventListener('mouseup', meta._boundUp);
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const p = (e.touches ? e.touches[0] : e);
      curX = p.clientX - startX; curY = p.clientY - startY;
      if (Math.abs(curX) > Math.abs(curY)) toast.style.transform = `translateX(${curX}px)`;
      else toast.style.transform = `translateY(${curY}px)`;
    };

    const onPointerUp = () => {
      dragging = false;
      meta.paused = false;
      toast.style.transition = '';
      const swiped = Math.abs(curX) > (this._defaults.swipeThreshold || 60);
      if (swiped) {
        toast.style.transform = `translateX(${curX > 0 ? 1000 : -1000}px)`;
        setTimeout(removeNow, 220);
      } else {
        toast.style.transform = '';
      }
      startX = startY = curX = curY = 0;

      // remove temporary document listeners
      if (meta._boundMove) {
        document.removeEventListener('touchmove', meta._boundMove, { passive: true });
        document.removeEventListener('mousemove', meta._boundMove);
        meta._boundMove = null;
      }
      if (meta._boundUp) {
        document.removeEventListener('touchend', meta._boundUp);
        document.removeEventListener('mouseup', meta._boundUp);
        meta._boundUp = null;
      }

      // restart RAF loop if needed
      startTimerLoop();
    };

    toast.addEventListener('touchstart', onPointerDown, { passive: true });
    toast.addEventListener('mousedown', onPointerDown);

    /* ---------------- Hover / focus pause handling
       - we cancel RAF on enter and restart on leave only when needed.
    ---------------- */
    const onEnter = () => {
      meta.paused = true;
      if (meta.raf) { cancelAnimationFrame(meta.raf); meta.raf = null; }
    };
    const onLeave = () => {
      // unpause and restart the RAF timer loop
      if (!meta.paused) return;
      meta.paused = false;
      // refresh start time and restart tick loop
      meta.start = now();
      startTimerLoop();
    };
    toast.addEventListener('mouseenter', onEnter);
    toast.addEventListener('mouseleave', onLeave);
    toast.addEventListener('focusin', onEnter);
    toast.addEventListener('focusout', onLeave);

    /* ---------------- Timer / RAF loop (optimized)
       - we avoid a RAF loop while paused
       - startTimerLoop will ensure only ONE RAF is active per toast
    ---------------- */
    const duration = cfg.duration ?? this._defaults.duration;

    function tick() {
      // if toast already removed, bail out
      if (!juiceToast._activeMap.has(toastId)) return;
      // if paused, don't continue RAF loop (will be restarted by onLeave/onPointerUp)
      if (meta.paused) { meta.raf = null; meta.start = now(); return; }

      const delta = now() - meta.start;
      meta.remaining -= delta;
      meta.start = now();

      if (progressEl) {
        const scale = Math.max(0, meta.remaining / duration);
        // transform is GPU-accelerated; keep it
        progressEl.style.transform = `scaleX(${scale})`;
      }

      if (meta.remaining <= 0) {
        toast.classList.remove('show');
        setTimeout(removeNow, 280);
        meta.raf = null;
        return;
      }

      meta.raf = requestAnimationFrame(tick);
    }

    function startTimerLoop() {
      if (duration <= 0) return;
      if (meta.raf) return; // already running
      if (meta.paused) return; // don't start while paused
      meta.start = now();
      meta.raf = requestAnimationFrame(tick);
    }

    if (duration > 0) {
      meta.start = now();
      meta.remaining = duration;
      startTimerLoop();
    }

    /* ---------------- removeNow + robust cleanup ---------------- */
    function removeNow() {
      if (!juiceToast._activeMap.has(toastId)) return;
      toast.classList.add('hide');

      // Remove pointerstart listeners attached to toast
      toast.removeEventListener('touchstart', onPointerDown);
      toast.removeEventListener('mousedown', onPointerDown);

      // Remove any document listeners in case they were left
      if (meta._boundMove) {
        document.removeEventListener('touchmove', meta._boundMove, { passive: true });
        document.removeEventListener('mousemove', meta._boundMove);
        meta._boundMove = null;
      }
      if (meta._boundUp) {
        document.removeEventListener('touchend', meta._boundUp);
        document.removeEventListener('mouseup', meta._boundUp);
        meta._boundUp = null;
      }

      // Remove hover/focus listeners
      toast.removeEventListener('mouseenter', onEnter);
      toast.removeEventListener('mouseleave', onLeave);
      toast.removeEventListener('focusin', onEnter);
      toast.removeEventListener('focusout', onLeave);

      // cancel RAF & timers
      const metaLocal = juiceToast._activeMap.get(toastId);
      if (metaLocal?.raf) { cancelAnimationFrame(metaLocal.raf); metaLocal.raf = null; }
      if (metaLocal?.timer) { clearTimeout(metaLocal.timer); metaLocal.timer = null; }

      juiceToast._activeMap.delete(toastId);

      // remove from DOM and update stack
      const parent = toast.parentNode; if (parent) parent.removeChild(toast);
      if (parent) juiceToast._updateStackPositionsFor(parent);
    }

    if (cfg.undoTimeout) {
      meta.timer = setTimeout(removeNow, cfg.undoTimeout);
    }

    if (cfg.playSound || this._defaults.playSound) this._playSound(cfg.playSound || this._defaults.playSound);

    return toastId;
  },

  _priorityMap: { low: 1, normal: 2, high: 3, urgent: 4 },
};

/* ---------------- Backwards helpers ---------------- */
function normalizeState(state, fallback) { if (!state) return { message: fallback }; if (typeof state === 'string') return { message: fallback }; return state; }
function resolveState(state, value, fallback) { if (!state) return { message: fallback }; if (typeof state === 'function') return { message: state(value) }; if (typeof state === 'string') return { message: state }; return state; }

/* ---------------- Default types ---------------- */
juiceToast.setup({
  success: { icon: 'fa-check', iconPack: 'fas', bg: '#16a34a', progress: true, duration: 4000 },
  error: { icon: 'fa-xmark', iconPack: 'fas', bg: '#dc2626', progress: true, duration: 4000 },
  info: { icon: 'fa-circle-info', iconPack: 'fas', bg: '#2563eb', progress: true, duration: 4000 },
  warning: { icon: 'fa-triangle-exclamation', iconPack: 'fas', bg: '#f59e0b', progress: true, duration: 4000 },
  loading: { icon: 'spinner', iconPack: 'fas', iconAnim: 'jt-spin', duration: 0, progress: true }
});

export default juiceToast;
export { juiceToast };