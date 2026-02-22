/**
 * OpenDN Foundation (C) 2026
 * Source Of Juice Toast v1.3.4 (EoS)
 * Read CONTRIBUTE.md To Contribute
 */
console.warn(
  "%cJuiceToast v1.3.x%c — This version is approaching End of Support on Feb 28th 2026. Use %c^v1.4.x (Gold)%c to remove this message.",
  "background: #f59e0b; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;",
  "color: #555; font-weight: normal;",
  "background: #38bdf8; color: #000; font-weight: bold; padding: 2px 4px; border-radius: 3px;", 
  "color: #555; font-weight: normal;"
);
const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

const reduceMotion =
  isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TYPE_ANIMATION = {
  success: 'bounce',
  error: 'shake',
  warning: 'wiggle',
  info: 'pulse',
  loading: 'spin',
};

/* ================= CSS INJECT ================= */
let __cssInjected = false;

const BASE_CSS = `
#juice-toast-root {
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: 10px;
  pointer-events: none;
}

/* top */
#juice-toast-root[data-position="top"] {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
}

/* center */
#juice-toast-root[data-position="center"] {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
}

[id^="juice-toast-root-"] {
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: 10px;
  pointer-events: none;
}


/* ================= TOAST ================= */

.juice-toast {
  /* animation vars (safe for swipe) */
  --jt-x: 0px;
  --jt-y: 12px;

  pointer-events: auto;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  min-width: 220px;
  max-width: 420px;
  padding: 12px 16px;
  margin: 6px 0;

  border-radius: 8px;
  background: #333;
  color: #fff;

  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  font-size: 14px;

  opacity: 0;
  transform: translate(var(--jt-x), var(--jt-y));
  transition:
    opacity .25s ease,
    transform .25s ease,
    background .25s ease,
    color .25s ease,
    box-shadow .25s ease;

  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

/* visible */
.juice-toast.show {
  opacity: 1;
  transform: translate(var(--jt-x), 0px) scale(1);
  transition: transform 0.35s ease, opacity 0.35s ease;
}

/* hide */
.juice-toast.hide {
  opacity: 0;
  transform: translate(var(--jt-x), 12px) scale(0.95);
}


/* ================= ICON ================= */

.juice-toast .icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  flex: 0 0 28px;
}

/* clickable icon */
.icon-clickable {
  opacity: 0.85;
  cursor: pointer;
}

.icon-clickable:hover {
  opacity: 1;
}

/* ================= CONTENT ================= */

.juice-toast .jt-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
}

/* title */
.juice-toast .jt-title {
  font-weight: 700;
  font-size: 13px;
  line-height: 1.1;
}

/* message */
.juice-toast .jt-message {
  font-size: 13px;
  line-height: 1.3;
  opacity: 0.95;
}

/* ================= ICON POSITION ================= */

.jt-icon-top {
  flex-direction: column;
  align-items: flex-start;
}

.jt-icon-top .icon {
  align-self: center;
  margin-bottom: 6px;
}

/* ================= CLOSE ================= */

.juice-toast-close {
  position: absolute;
  top: 6px;
  right: 8px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.75;
  padding: 4px;
  border-radius: 4px;
}

.juice-toast-close:hover {
  opacity: 1;
  background: rgba(255,255,255,0.06);
}

/* ================= ACTIONS ================= */

.jt-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.jt-action {
  background: transparent;
  border: 1px solid currentColor;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.jt-message code {
  background: rgba(255,255,255,0.1);
  color: #facc15; /* kuning */
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}

/* ================= COMPACT ================= */

.jt-compact {
  padding: 6px 8px;
  font-size: 0.85em;
  gap: 6px;
  max-width: 280px;
}

/* ================= GLASS UI ================= */

.jt-glass {
  --g: calc(var(--jt-glass, 60) / 100);

  background: rgba(30, 30, 30, calc(0.2 + var(--g)));
  backdrop-filter: blur(calc(6px + (14px * var(--g))))
                   saturate(calc(1 + (0.4 * var(--g))));
  -webkit-backdrop-filter: blur(calc(6px + (14px * var(--g))))
                           saturate(calc(1 + (0.4 * var(--g))));
}

/* light theme support */
[data-theme="light"] .jt-glass {
  background:
    linear-gradient(
      rgba(255,255,255, calc(0.6 * var(--g))),
      rgba(255,255,255, calc(0.35 * var(--g)))
    ),
    rgba(255,255,255, calc(0.55 - (0.25 * var(--g))));

  color: #111;

  border:
    1px solid rgba(0,0,0, calc(0.05 + 0.12 * var(--g)));

  box-shadow:
    0 10px 30px rgba(0,0,0, calc(0.08 + 0.18 * var(--g))),
    inset 0 1px 0 rgba(255,255,255, calc(0.4 * var(--g)));
}

/* ================= PROGRESS BAR ================= */
.jt-progress {
  position: absolute;
  left: 0;
  bottom: 0;

  height: 3px;
  width: 100%;

  background: linear-gradient(to right, #FFFFFF, #FAFAFA);
  height: 4px;
  transform-origin: left;
  transition: transform linear;
  border-radius: 2px;
  transform: scaleX(1);
  opacity: .85;
}

/* ================= BACKGROUND IMAGE ================= */

.juice-toast.bg-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}

/* ================= ANIMATIONS ================= */

@keyframes jt-spin {
  to { transform: rotate(360deg); }
}

@keyframes jt-pulse {
  50% { transform: scale(1.15); }
}

@keyframes jt-shake {
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
}

@keyframes jt-bounce {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.25); }
  60%  { transform: scale(.95); }
  100% { transform: scale(1); }
}

@keyframes jt-wiggle {
  0%   { transform: rotate(0); }
  25%  { transform: rotate(-10deg); }
  50%  { transform: rotate(10deg); }
  75%  { transform: rotate(-6deg); }
  100% { transform: rotate(0); }
}

@keyframes jt-pop {
  0%   { transform: scale(.7); opacity: 0; }
  70%  { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}

@keyframes jt-slide {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ================= CLASSES ================= */

.spin   { animation: jt-spin .6s linear; }
.pulse  { animation: jt-pulse .4s ease; }
.shake  { animation: jt-shake .4s ease; }
.bounce { animation: jt-bounce .45s ease; }
.wiggle { animation: jt-wiggle .5s ease; }
.pop    { animation: jt-pop .35s ease-out; }
.slide-in { animation: jt-slide .55s ease; }

/* ================= ICON INTERACTION ================= */

.icon-clickable {
  cursor: pointer;
  transition: transform .15s ease, opacity .15s ease;
}

.icon-clickable:hover {
  transform: scale(1.1);
  opacity: .85;
}

/* ================= ACCESSIBILITY ================= */

@media (prefers-reduced-motion: reduce) {
  .spin,
  .pulse,
  .shake,
  .bounce,
  .wiggle,
  .pop {
    animation: none !important;
  }
}

.jt-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.jt-profile.square {
  border-radius: 6px;
  object-fit: cover;
  margin-right: auto;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
}

.juice-toast {
  display: flex;
  align-items: center;
  gap: 10px;
}
`;

function injectCSS(css) {
  if (!isBrowser || __cssInjected) return;

  const style = document.createElement('style');
  style.id = 'juice-toast-style';
  style.textContent = css;

  document.head.appendChild(style);
  __cssInjected = true;
}

/* ================= THEME REGISTRY ================= */

const themes = {
  light: {
    bg: '#ffffff',
    color: '#111',
    border: '1px solid #e5e7eb',
  },
  dark: {
    bg: '#1f2937',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.08)',
  },
  glass: {
    bg: 'rgba(30,30,30,.35)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.15)',
  },
  midnight: {
    bg: '#0f172a',
    color: '#e5e7eb',
    border: '1px solid rgba(255,255,255,.06)',
  },
  soft: {
    bg: '#f8fafc',
    color: '#0f172a',
    border: '1px solid #e2e8f0',
  },
  neutral: {
    bg: '#ffffff',
    color: '#374151',
    border: '1px solid #d1d5db',
  },
  brand: {
    bg: '#6366f1',
    color: '#fff',
    border: 'none',
  },
  gradient: {
    bg: 'linear-gradient(135deg,#6366f1,#ec4899)',
    color: '#fff',
    border: 'none',
  },
  outline: {
    bg: 'transparent',
    color: '#111',
    border: '2px solid currentColor',
  },
};

const sizePreset = {
  sm: { width: '260px', padding: '10px' },
  md: { width: '320px', padding: '14px' },
  lg: { width: '420px', padding: '18px' },
};

/* ================= CORE ================= */
const juiceToast = {
  _config: {},
  _queue: [],
  _showing: false,
  _theme: 'dark',
  _plugins: [],

  /* ===== PUBLIC API ===== */

  setup(cfg = {}) {
    const { duration, maxVisible, ...types } = cfg;

    this._defaults = { ...this._defaults, duration, maxVisible };
    this._config = { ...this._config, ...types };

    this._registerTypes();
  },

  use(plugin) {
    if (typeof plugin === 'function') {
      this._plugins.push(plugin);
    }
  },

  addType(name, cfg = {}) {
    this._config[name] = cfg;
    this._registerTypes();
  },

  defineTheme(name, styles = {}) {
    themes[name] = { ...(themes[name] || {}), ...styles };
  },

  setTheme(name) {
    this._theme = name;
    if (!isBrowser) return;
    const root = document.getElementById('juice-toast-root');
    if (root) root.dataset.theme = name;
  },

  clear() {
    this._queue.length = 0;
  },

  destroy() {
    this.clear();
    if (!isBrowser) return;
    document.getElementById('juice-toast-root')?.remove();
  },

  /* ===== INTERNAL ===== */

  _registerTypes() {
    Object.keys(this._config).forEach((type) => {
      if (typeof this[type] === 'function' && !this[type].__auto) return;
      const fn = (payload) => this._enqueue(type, payload);
      fn.__auto = true;
      this[type] = fn;
    });
  },

  _enqueue(type, payload) {
    this._queue.push({ type, payload });
    if (!this._showing) this._next();
  },

  _next() {
    if (!this._queue.length) {
      this._showing = false;
      return;
    }
    this._showing = true;
    const item = this._queue.shift();
    this._showToast(item.type, item.payload);
  },

  _runPlugins(ctx) {
    this._plugins.forEach((fn) => {
      try {
        fn(ctx);
      } catch (e) {
        this._warn('Plugin error: ' + e.message);
      }
    });
  },

  _normalizeGlass(value) {
    if (value === true) return 60;
    if (value === false || value == null) return 0;

    const n = Number(value);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
  },

  _getRoot(position = 'bottom-right') {
    if (!isBrowser) return null;
    let root = document.getElementById(`juice-toast-root-${position}`);
    if (!root) {
      root = document.createElement('div');
      root.id = `juice-toast-root-${position}`;
      root.dataset.position = position;
      root.dataset.theme = this._theme;

      root.style.position = 'fixed';
      root.style.zIndex = 9999;

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
      }

      document.body.appendChild(root);
    }
    return root;
  },

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

  _warn(msg) {
    if (this._defaults.dev && typeof console !== 'undefined') {
      console.warn('[JuiceToast]', msg);
    }
  },

  _playSound(src) {
    if (!isBrowser) return;

    const sound =
      typeof src === 'string' && src ? src : this._defaults.playSound;

    if (!sound) return;

    try {
      const audio = new Audio(sound);
      audio.volume = 0.6;
      audio.play().catch(() => {});
    } catch {}
  },

  _showToast(type, payload) {
    if (!isBrowser) return;

    if (this._defaults.injectCSS !== false) {
      injectCSS(this._defaults.css || BASE_CSS);
    }

    const base = this._config[type] || {};
    const data =
      typeof payload === 'object' ? payload : { message: String(payload) };

    const cfg = { ...base, ...data };

    /* BACKWARD COMPAT */
    cfg.icon = cfg.icon ?? cfg.icon_left_top;
    cfg.iconPack = cfg.iconPack ?? cfg.icon_config;
    cfg.iconLink = cfg.iconLink ?? cfg.icon_onClick_url;
    cfg.iconAnimate = cfg.iconAnimate ?? cfg.icon_onClick_animate;
    cfg.position = cfg.position ?? cfg.toast;
    cfg.closable = cfg.closable ?? cfg.closeable;
    cfg.iconPosition = cfg.iconPosition || 'left';
    cfg.compact = !!cfg.compact;

    const theme = themes[cfg.theme || this._theme] || {};

    const toast = document.createElement('div');
    toast.className = 'juice-toast';

    const animation = cfg.animation || 'slide-in';
    if (!cfg.enterAnimation) {
      toast.style.animation = `${animation} 0.4s ease forwards`;
    }

    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    toast.setAttribute('aria-atomic', 'true');
    toast.tabIndex = 0;

    if (cfg.closable) {
      const close = document.createElement('span');
      close.tabIndex = 0;
      close.className = 'juice-toast-close';
      close.textContent = '×';
      close.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toast.remove();
          this._next();
        }
      });
    }

let profileImg = null;

if (cfg.profile) {
  profileImg = document.createElement('img');
  profileImg.src = cfg.profile;
  profileImg.className = 'jt-profile';

  if (cfg.profileShape === 'square') {
    profileImg.classList.add('square');
  }

  toast.appendChild(profileImg);
}

    /* SIZE PRESET */
    if (cfg.size && sizePreset[cfg.size]) {
      const p = sizePreset[cfg.size];
      if (p.width) toast.style.width = p.width;
      if (p.padding) toast.style.padding = p.padding;
    }

    let progressEl = null;

    if (cfg.progress && (cfg.duration ?? this._defaults.duration) > 0) {
      progressEl = document.createElement('div');
      progressEl.className = 'jt-progress';

      if (cfg.progressColor) {
        progressEl.style.background =
          cfg.progressColor || 'rgba(255,255,255,.7)';
      }

      toast.appendChild(progressEl);
    }

    /* TTS (Text To Spech) */
    if (cfg.tts && 'speechSynthesis' in window) {
      try {
        const utter = new SpeechSynthesisUtterance(
          cfg.message || cfg.title || ''
        );
        utter.lang = cfg.ttsLang || 'en-US';
        utter.rate = cfg.ttsRate ?? 1;
        window.speechSynthesis.speak(utter);
      } catch (e) {
        this._warn('TTS failed: ' + e.message);
      }
    }

    /* GLASS UI */
    const glass = this._normalizeGlass(cfg.glassUI ?? this._defaults.glassUI);

    if (glass > 0) {
      toast.style.setProperty('--jt-glass', cfg.glassUI ?? 50);
      toast.classList.add('jt-glass');
    }

    /* STYLE */
    if (!glass) {
      toast.style.background = cfg.bg || theme.bg;
    }
    toast.style.color = cfg.color || theme.color;
    toast.style.border = cfg.border || theme.border;

    /* COMPACT */
    if (cfg.compact) {
      toast.classList.add('jt-compact');
    }

    /* MANUAL WIDTH / HEIGHT */
    if (cfg.width) toast.style.width = cfg.width;
    if (cfg.height) toast.style.height = cfg.height;

    /* BACKGROUND IMAGE */
    if (cfg.bgImage) {
      toast.style.backgroundImage = `url(${cfg.bgImage})`;
      toast.classList.add('bg-image');
    }

    /* ICON */
    let icon = null;

    if (cfg.icon) {
      icon = document.createElement('i');
      icon.className = ['icon', cfg.iconPack || '', cfg.icon].join(' ').trim();

      if (cfg.iconSize) {
        icon.style.fontSize = cfg.iconSize;
      }

      if (cfg.iconLink || cfg.iconAnimate) {
        icon.classList.add('icon-clickable');
        icon.onclick = (e) => {
          e.stopPropagation();
          if (cfg.iconAnimate) {
            icon.classList.remove(cfg.iconAnimate);
            void icon.offsetWidth;
            icon.classList.add(cfg.iconAnimate);
          }
          if (cfg.iconLink) {
            window.open(cfg.iconLink, '_blank', 'noopener');
          }
        };
      }
      const iconAnim = cfg.iconAnimate ?? TYPE_ANIMATION[type];

      if (iconAnim) {
        icon.classList.add(iconAnim);

        // restart animation on click
        icon.addEventListener('click', () => {
          icon.classList.remove(iconAnim);
          void icon.offsetWidth;
          icon.classList.add(iconAnim);
        });
      }
    }

    if (reduceMotion) {
      toast.classList.remove(
        'pop',
        'bounce',
        'shake',
        'wiggle',
        'pulse',
        'spin'
      );
      icon?.classList.remove('bounce', 'shake', 'wiggle', 'pulse', 'spin');
    }

    if (!cfg.message && !cfg.title) {
      this._warn('Toast created without message or title');
    }

    if (cfg.icon && !cfg.iconPack) {
      this._warn('icon provided without iconPack');
    }

    if (cfg.duration < 0) {
      this._warn('duration cannot be negative');
    }

    let startX = 0;
    let currentX = 0;

    toast.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    toast.addEventListener('touchmove', (e) => {
      currentX = e.touches[0].clientX - startX;
      toast.style.transform = `translateX(${currentX}px)`;
    });

    toast.addEventListener('touchend', () => {
      if (Math.abs(currentX) > this._defaults.swipeThreshold) {
        toast.style.transform = `translateX(${currentX > 0 ? 1000 : -1000}px)`;
        setTimeout(() => {
          toast.remove();
          this._next();
        }, 200);
      } else {
        toast.style.transform = '';
      }
      startX = currentX = 0;
    });

    /* CONTENT */
    const content = document.createElement('div');
    content.className = 'jt-content';

    const enterAnim = cfg.enterAnimation ?? 'pop';
    if (enterAnim && !reduceMotion) {
      toast.classList.add(enterAnim);
    }

    if (cfg.title) {
      const t = document.createElement('div');
      t.className = 'jt-title';
      t.textContent = cfg.title;
      content.appendChild(t);
    }

    const msg = document.createElement('div');
msg.className = 'jt-message';

if (typeof cfg.message === 'string') {
  // regex untuk inline `code`
  const parts = cfg.message.split(/(`[^`]+`)/g);

  parts.forEach(part => {
    if (part.startsWith('`') && part.endsWith('`')) {
      // code block, hapus backtick
      const codeEl = document.createElement('code');
      codeEl.textContent = part.slice(1, -1); // aman, textContent
      msg.appendChild(codeEl);
    } else {
      // teks biasa
      msg.appendChild(document.createTextNode(part));
    }
  });
}

    content.appendChild(msg);

    /* ICON POSITION */
    if (icon && cfg.iconPosition === 'top') {
      toast.classList.add('jt-icon-top');
      toast.appendChild(icon);
      toast.appendChild(content);
    } else if (icon && cfg.iconPosition === 'right') {
      toast.appendChild(content);
      toast.appendChild(icon);
    } else {
      if (icon) toast.appendChild(icon);
      toast.appendChild(content);
    }

    if (Array.isArray(cfg.actions) && cfg.actions.length) {
      const actionWrap = document.createElement('div');
      actionWrap.className = 'jt-actions';

      cfg.actions.forEach((act) => {
        const btn = document.createElement('button');
        btn.className = 'jt-action';
        btn.textContent = act.label;

        btn.onclick = (ev) => {
          ev.stopPropagation();
          act.onClick?.(ev);

          if (act.closeOnClick) {
            toast.remove();
            this._next();
          }
        };

        actionWrap.appendChild(btn);
      });

      content.appendChild(actionWrap);
    }

    /* CLOSE */
    if (cfg.closable) {
      const close = document.createElement('span');
      close.className = 'juice-toast-close';
      close.textContent = '×';
      close.onclick = () => {
        toast.remove();
        this._next();
      };
      toast.appendChild(close);
    }

    const root = this._getRoot(cfg.position);
    const max = this._defaults.maxVisible;
    if (max && root.children.length >= max) {
      root.firstChild.remove();
    }
    root.appendChild(toast);
    this._runPlugins({
      toast,
      cfg,
      type,
      root,
    });

    requestAnimationFrame(() => toast.classList.add('show'));

    const duration = cfg.duration ?? this._defaults.duration;
    if (duration === 0) return;

    let start = Date.now();
    let remaining = cfg.duration ?? this._defaults.duration;
    let raf;

    const tick = () => {
      if (!toast.__paused) {
        const now = Date.now();
        remaining -= now - start;
        start = now;
      } else {
        start = Date.now();
      }

      if (remaining <= 0) {
        toast.classList.remove('show');
        setTimeout(() => {
          toast.remove();
          this._next();
        }, 300);
      } else {
        raf = requestAnimationFrame(tick);
      }

      if (progressEl) {
        progressEl.style.transform = `scaleX(${Math.max(0, remaining / duration)})`;
      }
    };

    toast.addEventListener('mouseenter', () => (toast.__paused = true));
    toast.addEventListener('mouseleave', () => (toast.__paused = false));

    toast.addEventListener('touchstart', () => (toast.__paused = true));
    toast.addEventListener('touchend', () => (toast.__paused = false));

    requestAnimationFrame(tick);
  },
};

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
});

export default juiceToast;
export { juiceToast };
