import {
  isBrowser,
  uid,
  clamp,
  lerp,
  deepMerge,
  PriorityQueue,
  createEventBus,
  now,
} from './utils.js';
import { createSanitizer } from './sanitizer.js';
import { attachPremiumGesture } from './gestures.js';
import { createGroupManager } from './groups.js';
import { createDevTools } from './devtools.js';

const DEFAULT_THEMES = {
  dark: {
    bg: 'linear-gradient(180deg,#1f2937,#111827)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.08)',
  },
  light: {
    bg: '#fff',
    color: '#111827',
    border: '1px solid #e5e7eb',
  },
  glass: {
    bg: 'rgba(17,24,39,.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.10)',
  },
};

const TYPE_ANIM = {
  success: 'jt-bounce',
  error: 'jt-shake',
  warning: 'jt-shake',
  info: 'jt-pulse',
  loading: 'jt-spin',
};

const SIZE_PRESET = {
  sm: { width: '260px', padding: '10px' },
  md: { width: '320px', padding: '14px' },
  lg: { width: '420px', padding: '18px' },
};

const DEFAULT_TYPES = {
  success: {
    icon: 'fa-check',
    iconPack: 'fas',
    bg: '#16a34a',
    duration: 4000,
    progress: true,
  },
  error: {
    icon: 'fa-xmark',
    iconPack: 'fas',
    bg: '#dc2626',
    duration: 4000,
    progress: true,
  },
  info: {
    icon: 'fa-circle-info',
    iconPack: 'fas',
    bg: '#2563eb',
    duration: 4000,
    progress: true,
  },
  warning: {
    icon: 'fa-triangle-exclamation',
    iconPack: 'fas',
    bg: '#f59e0b',
    duration: 4000,
    progress: true,
  },
  loading: {
    icon: 'fa-spinner',
    iconPack: 'fas',
    iconAnim: 'jt-spin',
    duration: 0,
    progress: true,
  },
};

const BASE_CSS = `
:root{
  --jt-radius: 12px;
  --jt-gap: 10px;
  --jt-shadow: 0 12px 32px rgba(0,0,0,.22);
}
[data-juice-root]{
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: var(--jt-gap);
  pointer-events: none;
}
[data-juice-root][data-position="bottom-right"]{ bottom: 20px; right: 20px; flex-direction: column-reverse; align-items: flex-end; }
[data-juice-root][data-position="top-right"]{ top: 20px; right: 20px; flex-direction: column; align-items: flex-end; }
[data-juice-root][data-position="bottom-left"]{ bottom: 20px; left: 20px; flex-direction: column-reverse; align-items: flex-start; }
[data-juice-root][data-position="top-left"]{ top: 20px; left: 20px; flex-direction: column; align-items: flex-start; }
[data-juice-root][data-position="top-center"]{ top: 20px; left: 50%; transform: translateX(-50%); }
[data-juice-root][data-position="bottom-center"]{ bottom: 20px; left: 50%; transform: translateX(-50%); }

.juice-toast{
  position: relative;
  pointer-events: auto;
  min-width: 220px;
  max-width: 420px;
  border-radius: var(--jt-radius);
  padding: 12px 16px;
  background: linear-gradient(180deg, rgba(31,41,55,.96), rgba(17,24,39,.96));
  color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: var(--jt-shadow);
  transform:
    translate3d(var(--jt-drag-x,0), var(--jt-drag-y,0), 0)
    scale(var(--jt-scale,1));
  transition:
    transform .24s cubic-bezier(.2,.8,.2,1),
    opacity .22s ease;
  will-change: transform, opacity;
  user-select: none;
  touch-action: pan-y;
}
.juice-toast.show{ animation: jt-in .32s cubic-bezier(.16,1,.3,1) both; }
.juice-toast.hide{ animation: jt-out .24s cubic-bezier(.2,.8,.2,1) both; pointer-events:none; }
@keyframes jt-in{ from{opacity:0; transform: translate3d(0,12px,0) scale(.97);} to{opacity:1; transform: translate3d(0,0,0) scale(1);} }
@keyframes jt-out{ from{opacity:1; transform: translate3d(0,0,0) scale(1);} to{opacity:0; transform: translate3d(0,12px,0) scale(.97);} }

.juice-toast .icon{
  width: 30px;
  height: 30px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 8px;
  background: rgba(255,255,255,.08);
  flex-shrink: 0;
}
.jt-content{ flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
.jt-title{ font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.jt-message{ font-size:13px; opacity:.95; word-break:break-word; }
.jt-actions{ display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
.jt-action{
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}
.jt-progress{
  position:absolute;
  left:0;
  bottom:0;
  height:4px;
  width:100%;
  border-radius: 999px;
  transform-origin:left;
  transform: scaleX(1);
  transition: transform linear;
}
.juice-toast-close{
  margin-left: 6px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  opacity: .8;
}
.juice-toast-close:hover{ opacity:1; }

.jt-count{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 11px;
  background: rgba(255,255,255,.16);
  vertical-align: middle;
}

.jt-avatar{
  width:36px;
  height:36px;
  border-radius:50%;
  object-fit:cover;
  flex-shrink:0;
}
.jt-avatar-top{ flex-direction: column; align-items:flex-start; }

.jt-bounce{ animation: jt-bounce 1s ease-in-out infinite; }
.jt-shake{ animation: jt-shake .6s ease-in-out infinite; }
.jt-pulse{ animation: jt-pulse 1.1s ease-in-out infinite; }
.jt-spin{ animation: jt-spin 1.2s linear infinite; }
@keyframes jt-bounce{ 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-6px); } }
@keyframes jt-shake{ 0%,100%{ transform: translateX(0); } 25%{ transform: translateX(-5px); } 75%{ transform: translateX(5px); } }
@keyframes jt-pulse{ 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.03); } }
@keyframes jt-spin{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }

.juice-toast.swipe-dismissing{
  opacity: 0;
  transition: transform .18s ease-out, opacity .18s ease-out;
}

[data-juice-root][data-parallax="true"] .juice-toast{
  transition: transform .12s cubic-bezier(.2,.8,.2,1), opacity .2s ease;
}

[data-juice-root][data-glass="true"] .juice-toast{
  background: rgba(17,24,39,.52);
  backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255,255,255,.08);
}

@media (prefers-reduced-motion: reduce){
  .juice-toast, .jt-modal, .jt-modal-overlay{ animation:none !important; transition:none !important; }
}
`;

function buildDefaultConfig(user = {}) {
  return deepMerge(
    {
      duration: 2500,
      maxVisible: 3,
      maxVisiblePerType: {},
      swipeThreshold: 72,
      devTools: false,
      injectCSS: true,
      css: null,
      autoDedupe: false,
      parallaxMode: false,
      parallaxSmoothing: 0.12,
      use3d: false,
      autoFetchFA: true,
      urgentSkipsQueue: false,
      maxQueueRetries: 8,
      theme: 'dark',
      sanitizer: {
        engine: 'auto',
        dompurify: null,
        dompurifyOptions: {},
        allowDataImages: false,
      },
      gestures: {
        enabled: true,
        threshold: 72,
        velocityThreshold: 850,
        rubberBand: 0.22,
        springDuration: 240,
        flingDuration: 190,
      },
      types: {},
    },
    user
  );
}

export function createJuiceToast(userConfig = {}) {
  let config = buildDefaultConfig(userConfig);
  const queue = new PriorityQueue();
  const active = new Map();
  const roots = new Map();
  const plugins = [];
  const bus = createEventBus();
  const groups = createGroupManager();
  const sanitizer = createSanitizer(config.sanitizer || {});
  const themes = { ...DEFAULT_THEMES };
  const types = deepMerge(DEFAULT_TYPES, config.types || {});
  let schedulerRunning = false;
  let schedulerRAF = null;
  let processedScheduled = false;
  let pausedAll = false;
  let faInjected = false;
  let destroyRequested = false;

  const api = {
    emit: bus.emit.bind(bus),
    on: bus.on.bind(bus),
    off: bus.off.bind(bus),

    getSnapshot() {
      return {
        activeCount: active.size,
        queueCount: queue.size,
        groupCount: groups.size(),
        pausedAll,
        active: Array.from(active.values()).map((m) => ({
          id: m.id,
          type: m.type,
          position: m.cfg.position,
          remaining: m.remaining,
          groupId: m.cfg.groupId || null,
        })),
        groups: groups.list(),
        config: {
          duration: config.duration,
          maxVisible: config.maxVisible,
          theme: config.theme,
          devTools: config.devTools,
          parallaxMode: config.parallaxMode,
        },
      };
    },

    setup(next = {}) {
      config = buildDefaultConfig(deepMerge(config, next));
      sanitizer.setConfig(config.sanitizer || {});
      if (next.types) {
  Object.assign(types, next.types);
  
  Object.keys(next.types).forEach((name) => {
    if (!api[name]) {
      registerTypeMethod(name);
    }
  });
}
      if (next.theme) this.setTheme(next.theme);
      if (config.injectCSS !== false) injectCSS(config.css || BASE_CSS);
      plugins.forEach((p) => p.onSetup?.(this, config));
      this.emit('setup', { config });
      if (config.devTools && !devtools.isOpen()) devtools.open();
      return this;
    },

    defineTheme(name, styles = {}) {
      themes[name] = deepMerge(themes[name] || {}, styles);
      return this;
    },

    setTheme(name) {
      config.theme = name;
      roots.forEach((root) => {
        root.dataset.theme = name;
      });
      devtools.refresh();
      return this;
    },

    addType(name, typeConfig = {}) {
      types[name] = deepMerge(types[name] || {}, typeConfig);
      return this;
    },

    use(plugin) {
      const normalized = normalizePlugin(plugin);
      if (!normalized) return this;
      plugins.push(normalized);
      normalized.onInstall?.(this);
      return this;
    },

    unuse(pluginOrName) {
      const idx = plugins.findIndex(
        (p) => p === pluginOrName || p.name === pluginOrName
      );
      if (idx >= 0) plugins.splice(idx, 1);
      return this;
    },

    pauseAll() {
      pausedAll = true;
      devtools.refresh();
    },

    resumeAll() {
      pausedAll = false;
      active.forEach((m) => (m.start = now()));
      startScheduler();
      devtools.refresh();
    },

    dismissAll(filter = {}) {
      const ids = [];
      active.forEach((m, id) => {
        const matchType = filter.type ? m.type === filter.type : true;
        const matchPos = filter.position
          ? (m.cfg.position || 'bottom-right') === filter.position
          : true;
        const matchGroup = filter.groupId ? m.cfg.groupId === filter.groupId : true;
        if (matchType && matchPos && matchGroup) ids.push(id);
      });
      ids.forEach((id) => this.remove(id));
    },

    listActive() {
      return Array.from(active.values()).map((m) => ({
        id: m.id,
        type: m.type,
        position: m.cfg.position,
        remaining: m.remaining,
        groupId: m.cfg.groupId || null,
        createdAt: m.createdAt,
      }));
    },

    clearQueue() {
      queue.clear();
      processedScheduled = false;
      devtools.refresh();
    },

    destroy() {
      destroyRequested = true;
      this.clearQueue();
      this.dismissAll();
      groups.clear();
      roots.forEach((root) => root.remove());
      roots.clear();
      active.clear();
      stopScheduler();
      plugins.forEach((p) => p.onDestroy?.(this));
      plugins.length = 0;
      devtools.close();
      bus.clear();
    },

    promise(promiseInput, states = {}) {
      const p =
        typeof promiseInput === 'function' ? promiseInput() : promiseInput;

      if (!p || typeof p.then !== 'function') {
        this.info({
          title: 'JuiceToast',
          message: 'promise() expects a Promise or a function returning Promise.',
          duration: 3000,
        });
        return;
      }

      const groupId = states.groupId || uid('promise');
      this.loading({
        groupId,
        duration: 0,
        ...normalizeState(states.loading, 'Loading...'),
      });

      let done = false;
      let timer = null;

      if (typeof states.timeout === 'number' && states.timeout > 0) {
        timer = setTimeout(() => {
          if (done) return;
          done = true;
          this.error({
            groupId,
            ...normalizeState(states.timeoutMessage, 'Request timeout'),
          });
        }, states.timeout);
      }

      const clear = () => {
        done = true;
        if (timer) clearTimeout(timer);
      };

      p.then((result) => {
        if (done) return;
        clear();
        this.success({
          groupId,
          ...normalizeState(states.success, 'Success', result),
        });
      }).catch((err) => {
        if (done) return;
        clear();
        this.error({
          groupId,
          ...normalizeState(states.error, 'Error', err),
        });
      });

      return {
        cancel: () => {
          if (done) return;
          clear();
          this.info({
            groupId,
            ...normalizeState(states.cancelMessage, 'Cancelled'),
          });
        },
      };
    },

    enqueueBatch(items = [], opts = {}) {
      const interval = Number(opts.interval || 0);
      if (!Array.isArray(items) || items.length === 0) return;
      items.forEach((it, idx) => {
        const run = () => {
          const type = it.type || 'info';
          const payload = it.payload || it;
          this[type]?.(payload);
        };
        if (interval > 0) setTimeout(run, idx * interval);
        else run();
      });
    },

    group: {
      get: (groupId) => groups.get(groupId),
      list: () => groups.list(),
      clear: (groupId) => groups.clear(groupId),
      has: (groupId) => groups.has(groupId),
      size: () => groups.size(),
    },

    devtools: null, // assigned below
  };

  const devtools = createDevTools(api);
  api.devtools = devtools;

  function normalizePlugin(plugin) {
    if (!plugin) return null;
    if (typeof plugin === 'function') {
      return { name: plugin.name || uid('plugin'), install: plugin };
    }
    if (typeof plugin === 'object') return plugin;
    return null;
  }

  function injectCSS(css) {
    if (!isBrowser || !config.injectCSS) return;
    if (document.getElementById('juice-toast-style')) return;
    const st = document.createElement('style');
    st.id = 'juice-toast-style';
    st.textContent = css || BASE_CSS;
    document.head.appendChild(st);
  }

  function emitLifecycle(name, payload) {
    bus.emit(name, payload);
    plugins.forEach((p) => {
      try {
        p[name]?.(payload, api);
      } catch (_) {}
    });
  }

  function getRoot(position = 'bottom-right') {
    if (!isBrowser) return null;
    if (roots.has(position)) return roots.get(position);

    const root = document.createElement('div');
    root.dataset.juiceRoot = '1';
    root.dataset.position = position;
    root.dataset.theme = config.theme;
    root.style.pointerEvents = 'none';
    root.style.display = 'flex';

    if (config.parallaxMode) root.dataset.parallax = 'true';

    switch (position) {
      case 'top-left':
        root.style.top = '20px';
        root.style.left = '20px';
        root.style.flexDirection = 'column';
        break;
      case 'top-right':
        root.style.top = '20px';
        root.style.right = '20px';
        root.style.flexDirection = 'column';
        break;
      case 'bottom-left':
        root.style.bottom = '20px';
        root.style.left = '20px';
        root.style.flexDirection = 'column-reverse';
        break;
      case 'top-center':
        root.style.top = '20px';
        root.style.left = '50%';
        root.style.transform = 'translateX(-50%)';
        root.style.flexDirection = 'column';
        break;
      case 'bottom-center':
        root.style.bottom = '20px';
        root.style.left = '50%';
        root.style.transform = 'translateX(-50%)';
        root.style.flexDirection = 'column-reverse';
        break;
      case 'bottom-right':
      default:
        root.style.bottom = '20px';
        root.style.right = '20px';
        root.style.flexDirection = 'column-reverse';
        break;
    }

    document.body.appendChild(root);
    roots.set(position, root);
    return root;
  }

  function ensureFA() {
    if (!isBrowser || faInjected || config.autoFetchFA === false) return;
    const hasFA = !!document.querySelector(
      'link[href*="fontawesome"], link[href*="font-awesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]'
    );
    if (hasFA) {
      faInjected = true;
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    faInjected = true;
  }

  function buildDedupeKey(type, payload) {
    const title = String(payload?.title || '').trim().slice(0, 120);
    const message = String(payload?.message || payload?.html || '').trim().slice(0, 240);
    return `${type}::${title}::${message}`;
  }

  function normalizePayload(input) {
    if (input && typeof input === 'object' && !Array.isArray(input)) return { ...input };
    return { message: String(input ?? '') };
  }

  function show(type, payload = {}, forcedId = null) {
    if (!isBrowser) return null;
    injectCSS(config.css || BASE_CSS);
    ensureFA();

    const base = types[type] || {};
    const cfg = deepMerge(base, normalizePayload(payload));
    cfg.position = cfg.position || cfg.toast || 'bottom-right';
    cfg.duration = typeof cfg.duration === 'number' ? cfg.duration : config.duration;
    cfg.closable = cfg.closable ?? cfg.closeable ?? true;
    cfg.groupStrategy = cfg.groupStrategy || config.groupStrategy || 'merge';
    cfg.groupId = cfg.groupId || cfg.group?.id || null;
    cfg.sanitize = cfg.sanitize ?? true;
    cfg.sanitizer = cfg.sanitizer || config.sanitizer || {};
    cfg.gestures = deepMerge(config.gestures, cfg.gestures || {});
    cfg.theme = cfg.theme || config.theme;

    const id = forcedId || uid('toast');

    const dedupeKey =
      cfg.dedupeKey || (config.autoDedupe ? buildDedupeKey(type, cfg) : null);

    if (dedupeKey) {
      for (const root of roots.values()) {
        const existing = Array.from(root.children).find(
          (node) => node.dataset.dedupeKey === dedupeKey
        );
        if (existing) {
          const countEl = existing.querySelector('.jt-count') || createCountBadge(existing);
          countEl.textContent = String((parseInt(countEl.textContent || '1', 10) || 1) + 1);
          if (cfg.mergeMessage) {
            const msg = existing.querySelector('.jt-message');
            if (msg) {
              if (cfg.html) msg.innerHTML = sanitizeHTML(cfg.html, cfg.sanitizer);
              else msg.textContent = String(cfg.message || '');
            }
          }
          return existing.dataset.toastId;
        }
      }
    }

    const root = getRoot(cfg.position);
    if (!root) return null;

    const groupId = cfg.groupId;
    const groupStrategy = cfg.groupStrategy;

    if (groupId) {
      const group = groups.get(groupId);
      if (group && group.ids.length) {
        if (groupStrategy === 'replace') {
          group.ids.slice().forEach((oldId) => api.remove(oldId));
        } else if (groupStrategy === 'merge') {
          const existingId = group.ids[group.ids.length - 1];
          if (existingId && active.has(existingId)) {
            api.update(existingId, cfg);
            return existingId;
          }
        }
      }
    }

    const toast = document.createElement('div');
    toast.className = 'juice-toast';
    toast.dataset.toastId = id;
    toast.dataset.toastType = type;
    toast.dataset.position = cfg.position;
    if (dedupeKey) toast.dataset.dedupeKey = dedupeKey;
    toast.tabIndex = 0;
    toast.setAttribute('role', cfg.ariaRole || (type === 'error' ? 'alert' : 'status'));
    toast.setAttribute('aria-live', type === 'error' || type === 'success' ? 'assertive' : 'polite');
    toast.setAttribute('aria-atomic', 'true');

    const theme = themes[cfg.theme] || themes.dark;
    if (cfg.bgImage) {
      toast.style.backgroundImage = `url(${cfg.bgImage})`;
      toast.style.backgroundSize = cfg.bgSize || 'cover';
      toast.style.backgroundPosition = cfg.bgPosition || 'center';
    } else if (cfg.glassOnly) {
      toast.style.background = 'rgba(255,255,255,.28)';
      toast.style.backdropFilter = 'blur(16px) saturate(140%)';
      toast.style.webkitBackdropFilter = 'blur(16px) saturate(140%)';
      toast.style.color = 'rgba(15,23,42,.9)';
      toast.style.border = '1px solid rgba(0,0,0,.08)';
    } else {
      toast.style.background = cfg.bg || theme.bg;
      toast.style.color = cfg.color || theme.color;
      toast.style.border = cfg.border || theme.border || 'none';
    }

    if (cfg.size && SIZE_PRESET[cfg.size]) {
      const preset = SIZE_PRESET[cfg.size];
      if (preset.width) toast.style.width = preset.width;
      if (preset.padding) toast.style.padding = preset.padding;
    }

    toast.style.position = 'relative';

    const content = document.createElement('div');
    content.className = 'jt-content';

    let titleEl = null;
    if (cfg.title) {
      titleEl = document.createElement('div');
      titleEl.className = 'jt-title';
      titleEl.textContent = cfg.title;
      content.appendChild(titleEl);
    }

    const msgEl = document.createElement('div');
    msgEl.className = 'jt-message';

    if (cfg.html) {
      msgEl.innerHTML = sanitizer.sanitize(cfg.html, cfg.sanitizer && cfg.sanitize !== false ? cfg.sanitizer : false);
    } else {
      msgEl.textContent = String(cfg.message ?? '');
    }

    content.appendChild(msgEl);

    if (Array.isArray(cfg.actions) && cfg.actions.length) {
      const actions = document.createElement('div');
      actions.className = 'jt-actions';
      cfg.actions.forEach((a) => {
        const btn = document.createElement('button');
        btn.className = 'jt-action';
        btn.textContent = a.label || 'Action';
        btn.onclick = (e) => {
          e.stopPropagation();
          try {
            a.onClick?.(e, { id, toast, cfg, type });
          } catch (_) {}
          if (a.closeOnClick !== false) api.remove(id);
        };
        actions.appendChild(btn);
      });
      content.appendChild(actions);
    }

    if (cfg.undo) {
      const undoBtn = document.createElement('button');
      undoBtn.className = 'jt-action';
      undoBtn.textContent = 'Undo';
      undoBtn.onclick = () => {
        try {
          cfg.undo?.();
        } catch (_) {}
        api.remove(id);
      };
      content.appendChild(undoBtn);
    }

    let iconEl = null;
    if (cfg.icon) {
      iconEl = document.createElement('i');
      const iconClass = String(cfg.icon).startsWith('fa') ? cfg.icon : `fa-${cfg.icon}`;
      iconEl.className = ['icon', cfg.iconPack || '', iconClass].join(' ').trim();
      if (cfg.iconSize) iconEl.style.fontSize = cfg.iconSize;
      if (!cfg.reduceMotion) {
        const anim = cfg.iconAnim || TYPE_ANIM[type];
        if (anim) iconEl.classList.add(anim);
      }
      if (cfg.iconLink) {
        iconEl.style.cursor = 'pointer';
        iconEl.addEventListener('click', (e) => {
          e.stopPropagation();
          window.open(cfg.iconLink, '_blank', 'noopener');
        });
      }
    }

    let avatarEl = null;
    if (cfg.avatar) {
      avatarEl = document.createElement('img');
      avatarEl.className = 'jt-avatar';
      avatarEl.loading = cfg.avatarLazy ? 'lazy' : 'eager';
      avatarEl.alt = cfg.avatarAlt || cfg.title || 'avatar';
      avatarEl.src = typeof cfg.avatar === 'string' ? cfg.avatar : cfg.avatarSrc || '';
    }

    const avatarPos = cfg.avatarPosition || 'left';
    const iconPos = cfg.iconPosition || 'left';

    if (avatarEl && avatarPos === 'top') {
      toast.classList.add('jt-avatar-top');
      toast.appendChild(avatarEl);
      if (iconEl && iconPos === 'top') toast.appendChild(iconEl);
      toast.appendChild(content);
    } else {
      if (avatarEl && avatarPos === 'left') toast.appendChild(avatarEl);
      if (iconEl && iconPos === 'left') toast.appendChild(iconEl);
      toast.appendChild(content);
      if (iconEl && iconPos === 'right') toast.appendChild(iconEl);
      if (avatarEl && avatarPos === 'right') toast.appendChild(avatarEl);
    }

    let progressEl = null;
    if (cfg.progress && cfg.duration > 0) {
      progressEl = document.createElement('div');
      progressEl.className = 'jt-progress';
      if (cfg.progressColor) progressEl.style.background = cfg.progressColor;
      toast.appendChild(progressEl);
    }

    if (cfg.closable) {
      const closeBtn = document.createElement('span');
      closeBtn.className = 'juice-toast-close';
      closeBtn.textContent = '×';
      closeBtn.setAttribute('role', 'button');
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        api.remove(id);
      });
      toast.appendChild(closeBtn);
    }

    toast._cachedTitleEl = titleEl;
    toast._cachedMessageEl = msgEl;
    toast._cachedProgressEl = progressEl;

    root.appendChild(toast);

    const meta = {
      id,
      toast,
      cfg,
      type,
      createdAt: now(),
      remaining: cfg.duration,
      start: now(),
      paused: false,
      timer: null,
      dedupeKey,
      groupId: groupId || null,
      cleanupGesture: null,
      hooks: {
        onShow: cfg.onShow,
        onShown: cfg.onShown,
        onClose: cfg.onClose,
        onRemoved: cfg.onRemoved,
      },
    };

    active.set(id, meta);

    if (groupId) {
      groups.register(groupId, id, groupStrategy, { type, position: cfg.position });
    }

    plugins.forEach((p) => {
      try {
        p.onCreate?.({ id, toast, cfg, type, root, meta }, api);
      } catch (_) {}
    });
    emitLifecycle('create', { id, toast, cfg, type, root, meta });

    if (config.gestures?.enabled !== false) {
      meta.cleanupGesture = attachPremiumGesture(toast, {
        threshold: cfg.gestures?.threshold ?? config.gestures.threshold,
        velocityThreshold:
          cfg.gestures?.velocityThreshold ?? config.gestures.velocityThreshold,
        rubberBand: cfg.gestures?.rubberBand ?? config.gestures.rubberBand,
        springDuration:
          cfg.gestures?.springDuration ?? config.gestures.springDuration,
        flingDuration: cfg.gestures?.flingDuration ?? config.gestures.flingDuration,
        onStart: () => {
          meta.paused = true;
          toast.style.transition = 'none';
          emitLifecycle('gesture:start', { id, toast, cfg, type, meta });
        },
        onMove: (motion) => {
          emitLifecycle('gesture:move', { id, toast, cfg, type, meta, motion });
        },
        onEnd: (motion) => {
          meta.paused = false;
          if (motion.shouldDismiss) {
            api.remove(id);
          } else {
            meta.start = now();
            startScheduler();
          }
          emitLifecycle('gesture:end', { id, toast, cfg, type, meta, motion });
        },
        onDismiss: () => api.remove(id),
      });
    }

    toast.addEventListener('mouseenter', () => {
      meta.paused = true;
      emitLifecycle('hover:start', { id, toast, cfg, type, meta });
    });
    toast.addEventListener('mouseleave', () => {
      meta.paused = false;
      meta.start = now();
      startScheduler();
      emitLifecycle('hover:end', { id, toast, cfg, type, meta });
    });
    toast.addEventListener('focusin', () => {
      meta.paused = true;
    });
    toast.addEventListener('focusout', () => {
      meta.paused = false;
      meta.start = now();
      startScheduler();
    });

    requestAnimationFrame(() => {
      if (!cfg.reduceMotion) {
        toast.classList.add('show');
      } else {
        toast.style.opacity = '1';
      }
      try {
        meta.hooks.onShow?.({ id, toast, cfg, type, meta });
      } catch (_) {}
      plugins.forEach((p) => {
        try {
          p.onShow?.({ id, toast, cfg, type, meta }, api);
        } catch (_) {}
      });
      emitLifecycle('show', { id, toast, cfg, type, meta });

      setTimeout(() => {
        try {
          meta.hooks.onShown?.({ id, toast, cfg, type, meta });
        } catch (_) {}
        plugins.forEach((p) => {
          try {
            p.onShown?.({ id, toast, cfg, type, meta }, api);
          } catch (_) {}
        });
        emitLifecycle('shown', { id, toast, cfg, type, meta });
      }, 320);
    });

    if (cfg.duration > 0) {
      meta.remaining = cfg.duration;
      meta.start = now();
      startScheduler();
    }

    if (cfg.playSound) {
      try {
        const sound = new Audio(cfg.playSound);
        sound.volume = clamp(cfg.soundVolume ?? 0.6, 0, 1);
        sound.play().catch(() => {});
      } catch (_) {}
    }

    devtools.refresh();
    return id;
  }

  function createCountBadge(existing) {
    let badge = existing.querySelector('.jt-count');
    if (badge) return badge;
    badge = document.createElement('span');
    badge.className = 'jt-count';
    badge.textContent = '1';
    const title = existing.querySelector('.jt-title') || existing.querySelector('.jt-message');
    title?.appendChild(badge);
    return badge;
  }

  function startScheduler() {
    if (schedulerRunning) return;
    schedulerRunning = true;

    const tick = () => {
      if (destroyRequested) {
        stopScheduler();
        return;
      }

      const t = now();

      if (!pausedAll) {
        active.forEach((meta, id) => {
          if (!meta || meta.paused) return;
          const duration = meta.cfg.duration ?? config.duration;
          if (duration <= 0) return;

          const elapsed = t - meta.start;
          const safeElapsed = clamp(elapsed, 0, 1000);
          meta.remaining -= safeElapsed;
          meta.start = t;

          const progressEl = meta.toast._cachedProgressEl || meta.toast.querySelector('.jt-progress');
          if (progressEl) {
            const pct = clamp(meta.remaining / duration, 0, 1);
            progressEl.style.transform = `scaleX(${pct})`;
          }

          if (meta.remaining <= 0) {
            api.remove(id);
          }
        });
      }

      let anyActiveTimers = false;
      active.forEach((m) => {
        if ((m.cfg.duration ?? config.duration) > 0 && !m.paused) anyActiveTimers = true;
      });

      const anyParallax = false;

      if (!anyActiveTimers && !anyParallax) {
        stopScheduler();
      } else {
        schedulerRAF = requestAnimationFrame(tick);
      }
    };

    schedulerRAF = requestAnimationFrame(tick);
  }

  function stopScheduler() {
    if (!schedulerRunning) return;
    if (schedulerRAF) cancelAnimationFrame(schedulerRAF);
    schedulerRAF = null;
    schedulerRunning = false;
  }

  function processQueue() {
    if (!isBrowser) return;
    const maxGlobal = config.maxVisible ?? Infinity;
    let attempts = 0;

    while (queue.size > 0 && attempts < 200) {
      attempts++;
      const next = queue.pop();
      if (!next) break;

      const root = getRoot(next.payload.position || next.payload.toast || 'bottom-right');
      if (!root) {
        queue.push(next, next.priority);
        break;
      }

      const showing = root.children.length;
      const perTypeCaps = config.maxVisiblePerType || {};
      const capForType = perTypeCaps[next.type];

      if (showing >= maxGlobal) {
        queue.push(next, next.priority);
        break;
      }

      if (typeof capForType === 'number') {
        const countType = Array.from(root.children).filter(
          (n) => n.dataset.toastType === next.type
        ).length;
        if (countType >= capForType) {
          queue.push(next, next.priority);
          break;
        }
      }

      show(next.type, next.payload, next.id);
    }

    processedScheduled = false;
    devtools.refresh();
  }

  function scheduleQueue() {
    if (processedScheduled) return;
    processedScheduled = true;
    setTimeout(() => {
      processedScheduled = false;
      processQueue();
    }, 35);
  }

  api._enqueue = function enqueue(type, payload = {}) {
    const cfg = normalizePayload(payload);
    const priority =
      typeof cfg.priority === 'number'
        ? cfg.priority
        : priorityMap[cfg.priority] ?? 2;

    const id = uid('q');
    const item = { id, type, payload: cfg, priority, retries: 0 };
    queue.push(item, priority);
    scheduleQueue();
    return id;
  };

  function normalizePayload(value) {
    return value && typeof value === 'object' && !Array.isArray(value)
      ? { ...value }
      : { message: String(value ?? '') };
  }

  const priorityMap = { low: 1, normal: 2, high: 3, urgent: 4 };

  function normalizeState(state, fallback, value) {
    if (!state) return { message: fallback };
    if (typeof state === 'string') return { message: state };
    if (typeof state === 'function') return { message: state(value) };
    return { ...state };
  }

  function apiUpdate(id, newCfg = {}) {
    const meta = active.get(id);
    if (!meta) return false;

    meta.cfg = deepMerge(meta.cfg, newCfg);
    const { toast, cfg, type } = meta;

    if (cfg.title) {
      const t = toast.querySelector('.jt-title') || toast._cachedTitleEl;
      if (t) t.textContent = cfg.title;
    }

    const msg = toast.querySelector('.jt-message') || toast._cachedMessageEl;
    if (msg) {
      if (cfg.html) msg.innerHTML = sanitizer.sanitize(cfg.html, cfg.sanitizer && cfg.sanitize !== false ? cfg.sanitizer : false);
      else msg.textContent = String(cfg.message || '');
    }

    const theme = themes[cfg.theme || config.theme] || themes.dark;
    if (!cfg.glassOnly) {
      toast.style.background = cfg.bg || theme.bg;
      toast.style.color = cfg.color || theme.color;
      toast.style.border = cfg.border || theme.border || 'none';
    }

    if (cfg.duration !== undefined) {
      meta.remaining = cfg.duration;
      meta.start = now();
      if (cfg.duration > 0 && !meta.paused) startScheduler();
    }

    plugins.forEach((p) => {
      try {
        p.onUpdate?.({ id, toast, cfg, type, meta }, api);
      } catch (_) {}
    });

    emitLifecycle('update', { id, toast, cfg, type, meta });
    devtools.refresh();
    return true;
  }

  function apiRemove(id) {
    const meta = active.get(id);
    if (!meta) return false;

    const { toast, cfg, type } = meta;
    try {
      meta.hooks.onClose?.({ id, toast, cfg, type, meta });
    } catch (_) {}
    plugins.forEach((p) => {
      try {
        p.onHide?.({ id, toast, cfg, type, meta }, api);
      } catch (_) {}
    });
    emitLifecycle('hide', { id, toast, cfg, type, meta });

    if (!cfg.reduceMotion) toast.classList.add('hide');
    else toast.style.opacity = '0';

    active.delete(id);
    if (meta.cleanupGesture) {
      try {
        meta.cleanupGesture();
      } catch (_) {}
    }

    const finalize = () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);

      if (meta.groupId) groups.unregister(meta.groupId, id);
      if (meta.dedupeKey) {
        // no-op on purpose; dedupe is handled via DOM scan
      }

      try {
        meta.hooks.onRemoved?.({ id, toast, cfg, type, meta });
      } catch (_) {}
      plugins.forEach((p) => {
        try {
          p.onRemove?.({ id, toast, cfg, type, meta }, api);
        } catch (_) {}
      });
      emitLifecycle('remove', { id, toast, cfg, type, meta });

      const root = toast.parentNode;
      if (root && root.children.length === 0) {
        const position = root.dataset.position;
        root.remove();
        roots.delete(position);
      }

      scheduleQueue();
      devtools.refresh();
    };

    if (!cfg.reduceMotion) {
      const onEnd = (e) => {
        if (e.target !== toast) return;
        toast.removeEventListener('animationend', onEnd);
        finalize();
      };
      toast.addEventListener('animationend', onEnd);
      setTimeout(finalize, 700);
    } else {
      finalize();
    }

    return true;
  }

  function addToQueue(type, payload) {
    const item = normalizePayload(payload);
    const priority =
      typeof item.priority === 'number' ? item.priority : priorityMap[item.priority] ?? 2;
    const id = uid('q');
    queue.push({ id, type, payload: item, priority, retries: 0 }, priority);
    scheduleQueue();
    return id;
  }

  function registerTypeMethod(name) {
    api[name] = (payload = {}) => addToQueue(name, payload);
  }

  Object.keys(types).forEach(registerTypeMethod);

  api.show = (type, payload) => addToQueue(type, payload);
  api.update = apiUpdate;
  api.remove = apiRemove;
  api.clear = () => api.dismissAll();
  api.clearQueue = () => {
    queue.clear();
    devtools.refresh();
  };

  api._showNow = show;
  api._groups = groups;
  api._roots = roots;
  api._queue = queue;
  api._active = active;
  api._config = () => config;

  api.setup(config);

  if (config.devTools) {
    devtools.open();
  }

  return api;
}

const juiceToast = createJuiceToast();

export default juiceToast;
export { juiceToast };