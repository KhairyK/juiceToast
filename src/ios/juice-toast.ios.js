/**
 * OpenDN Foundation (C) 2026
 * Source Of Juice Toast v1.3.2 (iOS user)
 * Read CONTRIBUTE.md To Contribute
 */
const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

const reduceMotion =
  isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// iOS / touch helpers
const isTouch =
  isBrowser &&
  ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0));
const isIOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent || '');
const isIOSStandalone =
  isBrowser &&
  (window.navigator.standalone === true ||
    (window.matchMedia &&
      window.matchMedia('(display-mode: standalone)').matches));

function speakTTS(message, lang = 'en-US', rate = 1) {
  if (!('speechSynthesis' in window)) return;

  const utter = new SpeechSynthesisUtterance(message);
  utter.lang = lang;
  utter.rate = rate;

  const speakNow = () => {
    window.speechSynthesis.speak(utter);
    document.body.removeEventListener('touchstart', speakNow);
    document.body.removeEventListener('click', speakNow);
  };

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS && window.speechSynthesis.speaking === false) {
    document.body.addEventListener('touchstart', speakNow, { once: true });
    document.body.addEventListener('click', speakNow, { once: true });
  } else {
    speakNow();
  }
}

const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  ((fn) => setTimeout(fn, 16));

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
:root {
  --jt-safe-top: env(safe-area-inset-top, 0px);
  --jt-safe-bottom: env(safe-area-inset-bottom, 0px);
}

#juice-toast-root {
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: 10px;
  pointer-events: none;
}

/* bottom (default) */
#juice-toast-root[data-position="bottom"] {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
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
  padding-top: var(--jt-safe-top);
  padding-bottom: var(--jt-safe-bottom);
}


/* ================= TOAST ================= */

.juice-toast {
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

  scroll-behavior: contains;
  -webkit-overflow-scrolling: touch;

  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  touch-action: pan-y;

}

/* visible */
.juice-toast.show {
  opacity: 1;
  --jt-y: 0px;
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

/* ================= COMPACT ================= */

.jt-compact {
  padding: 8px 10px;
  gap: 8px;
  font-size: 0.9em;
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

/* ================= CLASSES ================= */

.spin   { animation: jt-spin .6s linear; }
.pulse  { animation: jt-pulse .4s ease; }
.shake  { animation: jt-shake .4s ease; }
.bounce { animation: jt-bounce .45s ease; }
.wiggle { animation: jt-wiggle .5s ease; }
.pop    { animation: jt-pop .35s ease-out; }

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
    // Merge defaults + optional iOS preset tweaks
    this._config = cfg;
    this._defaults = { ...this._defaults, ...cfg };

    // If iOS, apply some sensible default overrides
    if (isIOS) {
      this._defaults.swipeThreshold = Math.min(
        this._defaults.swipeThreshold || 60,
        50
      );
      this._defaults.glassUI = this._defaults.glassUI || 60;
      this._defaults.duration = this._defaults.duration ?? 2200;
    }

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
    const root = document.querySelector('[id^="juice-toast-root-"]');
    if (root) root.dataset.theme = name;
  },

  clear() {
    this._queue.length = 0;
  },

  destroy() {
    this.clear();
    if (!isBrowser) return;
    const nodes = document.querySelectorAll('[id^="juice-toast-root-"]');
    nodes.forEach((n) => n.remove());
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
        this._warn('Plugin error: ' + (e && e.message ? e.message : String(e)));
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
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
      root.style.gap = '8px';
      root.style.pointerEvents = 'none';

      // Positioning with safe-area awareness
      switch (position) {
        case 'top-left':
          root.style.top = `calc(20px + env(safe-area-inset-top))`;
          root.style.left = '20px';
          root.style.alignItems = 'flex-start';
          break;
        case 'top-right':
          root.style.top = `calc(20px + env(safe-area-inset-top))`;
          root.style.right = '20px';
          root.style.alignItems = 'flex-end';
          break;
        case 'bottom-left':
          root.style.bottom = `calc(20px + env(safe-area-inset-bottom))`;
          root.style.left = '20px';
          root.style.alignItems = 'flex-start';
          break;
        case 'bottom-right':
          root.style.bottom = `calc(20px + env(safe-area-inset-bottom))`;
          root.style.right = '20px';
          root.style.alignItems = 'flex-end';
          break;
        case 'top-center':
          root.style.top = `calc(20px + env(safe-area-inset-top))`;
          root.style.left = '50%';
          root.style.transform = 'translateX(-50%)';
          root.style.alignItems = 'center';
          break;
        case 'bottom-center':
          root.style.bottom = `calc(20px + env(safe-area-inset-bottom))`;
          root.style.left = '50%';
          root.style.transform = 'translateX(-50%)';
          root.style.alignItems = 'center';
          break;
        default:
          // support "center" or other names by centering
          root.style.bottom = `calc(20px + env(safe-area-inset-bottom))`;
          root.style.right = '20px';
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

      const tryPlay = () => {
        audio.play().catch(() => {});
        window.removeEventListener('touchstart', tryPlay);
        window.removeEventListener('click', tryPlay);
      };

      audio.play().catch(() => {
        // Safari on iOS often blocks autoplay until user interaction
        window.addEventListener('touchstart', tryPlay, { once: true });
        window.addEventListener('click', tryPlay, { once: true });
      });
    } catch (e) {
      // ignore
    }
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
      close.tabIndex = 0;
      close.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toast.remove();
          this._next();
        }
      });
    }

    /* SIZE PRESET */
    if (cfg.size && sizePreset[cfg.size]) {
      const p = sizePreset[cfg.size];
      if (p.width) toast.style.width = p.width;
      if (p.padding) toast.style.padding = p.padding;
    }

    let progressEl = null;

    const duration = cfg.duration ?? this._defaults.duration;
    if (cfg.progress && duration > 0) {
      progressEl = document.createElement('div');
      progressEl.className = 'jt-progress';

      if (cfg.progressColor) {
        progressEl.style.background =
          cfg.progressColor || 'rgba(255,255,255,.7)';
      }

      toast.appendChild(progressEl);
    }

    /* TTS (Text To Spech) */
    if (cfg.tts && cfg.message) {
      speakTTS(cfg.message, cfg.ttsLang ?? 'en-US', cfg.ttsRate ?? 1);
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

    if (cfg.glassUI ?? this._defaults.glassUI) {
      toast.classList.add('jt-glass');
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

    // Respect reduced motion
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

    // --- SWIPE / TOUCH HANDLING (iOS-friendly) ---
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    const onTouchStart = (e) => {
      const t = e.touches ? e.touches[0] : e;
      startX = t.clientX;
      currentX = 0;
      isSwiping = true;
      toast.__paused = true; // pause on touch start
    };

    const onTouchMove = (e) => {
      if (!isSwiping) return;
      const t = e.touches ? e.touches[0] : e;
      currentX = t.clientX - startX;
      // use translate3d for better GPU on iOS
      toast.style.transform = `translate3d(${currentX}px, 0, 0)`;
    };

    const onTouchEnd = () => {
      if (!isSwiping) return;
      isSwiping = false;

      if (Math.abs(currentX) > (this._defaults.swipeThreshold || 60)) {
        toast.style.transition = 'transform .25s ease, opacity .2s ease';
        toast.style.transform = `translate3d(${currentX > 0 ? 1000 : -1000}px, 0, 0)`;
        setTimeout(() => {
          toast.replaceWith();
          toast.onclick = null;
          toast.onmousedown = null;
          toast.remove();
          this._next();
        }, 220);
      } else {
        // reset
        toast.style.transition = 'transform .2s ease';
        toast.style.transform = '';
      }
      // resume after small delay to avoid immediate auto-dismiss while still finishing transitions
      setTimeout(() => {
        toast.__paused = false;
      }, 60);
      startX = currentX = 0;
    };

    // Pointer fallback for non-touch
    if (isTouch) {
      toast.addEventListener('touchstart', onTouchStart, { passive: true });
      toast.addEventListener('touchmove', onTouchMove, { passive: true });
      toast.addEventListener('touchend', onTouchEnd);
      toast.addEventListener('touchcancel', onTouchEnd);
    } else {
      // allow mouse drag fallback (desktop)
      toast.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        currentX = 0;
        isSwiping = true;
        toast.__paused = true;
        const onMove = (ev) => {
          currentX = ev.clientX - startX;
          toast.style.transform = `translate3d(${currentX}px, 0, 0)`;
        };
        const onUp = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          onTouchEnd();
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
    }

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
    msg.textContent = cfg.message || '';
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
            toast.replaceWith();
            toast.onclick = null;
            toast.onmousedown = null;
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
      close.innerHTML = '×';
      close.onclick = () => {
        toast.replaceWith();
        toast.onclick = null;
        toast.onmousedown = null;
        toast.remove();
        this._next();
      };
      toast.appendChild(close);
    }

    // optional PWA / standalone tweaks
    if (isIOSStandalone) {
      toast.style.borderRadius = toast.style.borderRadius || '14px';
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

    // show
    requestAnimationFrame(() => {
      // ensure we use CSS show class to trigger opacity/transform transition
      toast.classList.add('show');
    });

    // if duration === 0 => persistent
    if (duration === 0) return;

    // Timer with pause on hover (desktop) and pause on touch (we handled touch start)
    let start = Date.now();
    let remaining = duration;

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
          toast.replaceWith();
          toast.onclick = null;
          toast.onmousedown = null;
          toast.remove();
          this._next();
        }, 300);
      } else {
        raf(tick);
      }

      if (progressEl) {
        // clamp 0..1
        const frac = Math.max(0, Math.min(1, remaining / duration));
        progressEl.style.transform = `scaleX(${frac})`;
      }
    };

    // Desktop hover pause only if not touch device (iOS Safari has no hover)
    if (!isTouch) {
      toast.addEventListener('mouseenter', () => (toast.__paused = true));
      toast.addEventListener('mouseleave', () => (toast.__paused = false));
    }

    // Touch pause/unpause already set in onTouchStart/onTouchEnd
    // For safety add simple handlers (no hover on iOS)
    toast.addEventListener(
      'touchstart',
      () => {
        toast.__paused = true;
      },
      { passive: true }
    );
    toast.addEventListener('touchend', () => {
      toast.__paused = false;
    });

    // Start ticking
    start = Date.now();
    raf(tick);
    // Play sound if configured
    if (cfg.playSound || this._defaults.playSound) {
      this._playSound(cfg.playSound);
    }
  },
};

juiceToast.setup({
  success: {
    icon: 'fa-check',
    iconPack: 'fa-solid',
    bg: '#16a34a',
    progress: true,
    duration: 3000,
  },

  error: {
    icon: 'fa-xmark',
    iconPack: 'fa-solid',
    bg: '#dc2626',
    progress: true,
    duration: 4000,
  },

  info: {
    icon: 'fa-circle-info',
    iconPack: 'fa-solid',
    bg: '#2563eb',
    progress: true,
  },

  warning: {
    icon: 'fa-triangle-exclamation',
    iconPack: 'fa-solid',
    bg: '#f59e0b',
    progress: true,
  },

  loading: {
    icon: 'fa-spinner',
    iconPack: 'fa-solid',
    iconAnimate: 'spin',
    duration: 0,
    progress: false,
    closable: false,
  },
});

export default juiceToast;
export { juiceToast };
