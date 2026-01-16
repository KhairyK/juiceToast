/**
 * OpenDN Foundation (C) 2026
 * Source Of Juice Toast v1.1.0
 * Read CONTRIBUTE.md To Contribute
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.juiceToast = factory();
  }
})(this, function() {
  return (function() {
    
    const isBrowser =
      typeof window !== "undefined" &&
      typeof document !== "undefined";
    
    const themes = {
      light: { bg: "#fff", color: "#111", border: "1px solid #e5e7eb" },
      dark: { bg: "#1f2937", color: "#fff", border: "1px solid rgba(255,255,255,.08)" }
    };
    
    const api = { 
  _config: {},
  _queue: [],
  _showing: false,
  _theme: "dark",
  
  /* ===== PUBLIC API ===== */
  
  setup(cfg = {}) {
    this._config = cfg;
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

    /* MANUAL WIDTH / HEIGHT */
    if (cfg.width) toast.style.width = cfg.width;
    if (cfg.height) toast.style.height = cfg.height;
    
    toast.style.background = cfg.bg || theme.bg;
    toast.style.color = cfg.color || theme.color;
    toast.style.border = cfg.border || theme.border;
    
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
    root.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add("show"));
    
    const duration = cfg.duration ?? 2500;
    if (duration === 0) return;
    
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
        this._next();
      }, 300);
    }, duration);
  } 
};
    
    return api;
  })();
});
