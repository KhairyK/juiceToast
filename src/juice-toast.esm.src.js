/**
 * OpenDN Foundation (C) 2026
 * Source Of Juice Toast v120/2026 (NEXT)
 * Read CONTRIBUTE.md To Contribute
 */
const isBrowser =
  typeof window !== "undefined" &&
  typeof document !== "undefined";

/* ================= THEME REGISTRY ================= */

const themes = {
  light: {
    bg: "#ffffff",
    color: "#111",
    border: "1px solid #e5e7eb"
  },
  dark: {
    bg: "#1f2937",
    color: "#fff",
    border: "1px solid rgba(255,255,255,.08)"
  }
};

const sizePreset = {
  sm: { width: "260px", padding: "10px" },
  md: { width: "320px", padding: "14px" },
  lg: { width: "420px", padding: "18px" }
};

/* ================= CORE ================= */

const juiceToast = {
  _config: {},
  _queue: [],
  _showing: false,
  _theme: "dark",
  
  /* ===== PUBLIC API ===== */
  
  setup(cfg = {}) {
   this._config = cfg;
   this._defaults = { ...this._defaults, ...cfg };
   this._registerTypes();
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
    const root = document.getElementById("juice-toast-root");
    if (root) root.dataset.theme = name;
  },
  
  clear() {
    this._queue.length = 0;
  },
  
  destroy() {
    this.clear();
    if (!isBrowser) return;
    document.getElementById("juice-toast-root")?.remove();
  },
  
  /* ===== INTERNAL ===== */
  
  _registerTypes() {
    Object.keys(this._config).forEach(type => {
      if (typeof this[type] === "function" && !this[type].__auto) return;
      const fn = payload => this._enqueue(type, payload);
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
  
  _normalizeGlass(value) {
  if (value === true) return 60;
  if (value === false || value == null) return 0;
  
  const n = Number(value);
  return Number.isFinite(n) ?
    Math.max(0, Math.min(100, n)) :
    0;
},
  
  _getRoot(position) {
    if (!isBrowser) return null;
    let root = document.getElementById("juice-toast-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "juice-toast-root";
      document.body.appendChild(root);
    }
    root.dataset.position = position || "bottom";
    root.dataset.theme = this._theme;
    return root;
  },
  _defaults: {
  duration: 2500,
  maxVisible: 3,
  swipeThreshold: 60,
  glassUI: 0,
  playSound: null
},

_playSound(src) {
  if (!isBrowser) return;
  
  const sound =
    typeof src === "string" && src ?
    src :
    this._defaults.playSound;
  
  if (!sound) return;
  
  try {
    const audio = new Audio(sound);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  } catch {}
},
  
  _showToast(type, payload) {
    if (!isBrowser) return;
    
    const base = this._config[type] || {};
    const data =
      typeof payload === "object" ?
      payload :
      { message: String(payload) };
    
    const cfg = { ...base, ...data };
    
    /* BACKWARD COMPAT */
    cfg.icon = cfg.icon ?? cfg.icon_left_top;
    cfg.iconPack = cfg.iconPack ?? cfg.icon_config;
    cfg.iconLink = cfg.iconLink ?? cfg.icon_onClick_url;
    cfg.iconAnimate = cfg.iconAnimate ?? cfg.icon_onClick_animate;
    cfg.position = cfg.position ?? cfg.toast;
    cfg.closable = cfg.closable ?? cfg.closeable;
    cfg.iconPosition = cfg.iconPosition || "left";
    cfg.compact = !!cfg.compact;
    
    const theme = themes[cfg.theme || this._theme] || {};
    
    const toast = document.createElement("div");
    toast.className = "juice-toast";

    /* SIZE PRESET */
    if (cfg.size && sizePreset[cfg.size]) {
      const p = sizePreset[cfg.size];
      if (p.width) toast.style.width = p.width;
      if (p.padding) toast.style.padding = p.padding;
    }
    
    /* GLASS UI */
const glass = this._normalizeGlass(
  cfg.glassUI ?? this._defaults.glassUI
);

if (glass > 0) {
  toast.classList.add("jt-glass");
  toast.style.setProperty("--jt-glass", glass);
}

/* STYLE */
if (!glass) {
  toast.style.background = cfg.bg || theme.bg;
}
toast.style.color = cfg.color || theme.color;
toast.style.border = cfg.border || theme.border;
    
    /* COMPACT */
    if (cfg.compact) {
     toast.classList.add("jt-compact");
    }
    
    if (cfg.glassUI ?? this._defaults.glassUI) {
     toast.classList.add("jt-glass");
    }

    /* MANUAL WIDTH / HEIGHT */
    if (cfg.width) toast.style.width = cfg.width;
    if (cfg.height) toast.style.height = cfg.height;
    
/* ICON */
let icon = null;

if (cfg.icon) {
  icon = document.createElement("i");
  icon.className = [
    "icon",
    cfg.iconPack || "",
    cfg.icon
  ].join(" ").trim();
  
  if (cfg.iconSize) {
    icon.style.fontSize = cfg.iconSize;
  }
  
  if (cfg.iconLink || cfg.iconAnimate) {
    icon.classList.add("icon-clickable");
    icon.onclick = e => {
      e.stopPropagation();
      if (cfg.iconAnimate) {
        icon.classList.remove(cfg.iconAnimate);
        void icon.offsetWidth;
        icon.classList.add(cfg.iconAnimate);
      }
      if (cfg.iconLink) {
        window.open(cfg.iconLink, "_blank", "noopener");
      }
    };
  }
}

let startX = 0;
let currentX = 0;

toast.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

toast.addEventListener("touchmove", e => {
  currentX = e.touches[0].clientX - startX;
  toast.style.transform = `translateX(${currentX}px)`;
});

toast.addEventListener("touchend", () => {
  if (Math.abs(currentX) > this._defaults.swipeThreshold) {
    toast.style.transform = `translateX(${currentX > 0 ? 1000 : -1000}px)`;
    setTimeout(() => {
      toast.remove();
      this._next();
    }, 200);
  } else {
    toast.style.transform = "";
  }
  startX = currentX = 0;
});

/* CONTENT */
const content = document.createElement("div");
content.className = "jt-content";

if (cfg.title) {
  const t = document.createElement("div");
  t.className = "jt-title";
  t.textContent = cfg.title;
  content.appendChild(t);
}

const msg = document.createElement("div");
msg.className = "jt-message";
msg.textContent = cfg.message || "";
content.appendChild(msg);

/* ICON POSITION */
if (icon && cfg.iconPosition === "top") {
  toast.classList.add("jt-icon-top");
  toast.appendChild(icon);
  toast.appendChild(content);
}
else if (icon && cfg.iconPosition === "right") {
  toast.appendChild(content);
  toast.appendChild(icon);
}
else {
  if (icon) toast.appendChild(icon);
  toast.appendChild(content);
}

if (Array.isArray(cfg.actions) && cfg.actions.length) {
  const actionWrap = document.createElement("div");
  actionWrap.className = "jt-actions";
  
  cfg.actions.forEach(act => {
    const btn = document.createElement("button");
    btn.className = "jt-action";
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
      const close = document.createElement("span");
      close.className = "juice-toast-close";
      close.innerHTML = "×";
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
    
    requestAnimationFrame(() => toast.classList.add("show"));
    
    const duration = cfg.duration ?? 2500;
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
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
      this._next();
    }, 300);
  } else {
    raf = requestAnimationFrame(tick);
  }
};

toast.addEventListener("mouseenter", () => toast.__paused = true);
toast.addEventListener("mouseleave", () => toast.__paused = false);

toast.addEventListener("touchstart", () => toast.__paused = true);
toast.addEventListener("touchend", () => toast.__paused = false);

requestAnimationFrame(tick);
  }
};

export default juiceToast;
export { juiceToast };
