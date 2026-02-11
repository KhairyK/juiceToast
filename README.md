# 🍹 JuiceToast


  ![npm download wekkly](https://img.shields.io/npm/dw/juice-toast)
  ![npm download](https://img.shields.io/npm/dt/juice-toast)
  ![npm version](https://img.shields.io/npm/v/juice-toast)
  ![license](https://img.shields.io/npm/l/juice-toast)
  ![stars](https://img.shields.io/github/stars/KhairyK/juiceToast)
  ![issues](https://img.shields.io/github/issues/KhairyK/juiceToast)
  ![repo size](https://img.shields.io/github/repo-size/KhairyK/juiceToast)
  ![browser](https://img.shields.io/badge/browser-all%20modern-brightgreen)
  ![deps](https://img.shields.io/badge/dependencies-0-brightgreen)
  ![ts](https://img.shields.io/badge/types-TypeScript-blue)
  ![last commit](https://img.shields.io/github/last-commit/KhairyK/juiceToast)
  
---

**JuiceToast** is a lightweight, flexible, and dependency-free toast notification library for modern web applications.  
Designed with a **clean API**, **extensive customization**, and **strong backward compatibility**, JuiceToast fits both small projects and enterprise-scale systems.

It supports **ESM**, **dynamic toast types**, **theme management**, **queue handling**, and **legacy API compatibility** out of the box.

---

## ✨ Key Features

- 🚀 Zero dependencies
- 📦 Supports **ESM**
- 🔁 Built-in queue system (one toast displayed at a time)
- 🎨 Theme system (light, dark, and custom themes)
- 🧩 Dynamic toast types (`success`, `error`, etc.)
- ⏳ Auto-dismiss & sticky toasts
- ❌ Closable toasts
- ⭐ Icon support (position, animation, link)
- 📐 Size presets and manual sizing
- 🧱 Full backward compatibility with legacy APIs

---

## 📦 Installation

### ESM
```js
import juiceToast from "https://npdn.kyrt.my.id/npm/juice-toast@1.3.0/dist/juice-toast.esm.js";
```

---

## 🚀 Quick Start

```js
juiceToast.setup({
  success: {
    icon: "check",
    theme: "light",
    duration: 2000
  },
  error: {
    icon: "x",
    bg: "#7f1d1d",
    color: "#fff",
    closable: true
  }
});

juiceToast.success("Operation completed successfully.");
juiceToast.error({
  title: "Error",
  message: "An unexpected error occurred."
});
```

---

## 🧠 Core Concepts

### Toast Types

Toasts are triggered based on **types** registered using `setup()` or `addType()`.

```js
juiceToast.info("Information message");
juiceToast.warning({
  message: "Proceed with caution",
  duration: 4000
});
```

This approach allows a clear separation between **toast configuration** and **runtime usage**.

---

## ⚙️ API Reference

### `setup(config)`
Registers all toast types and their default configuration.

```js
juiceToast.setup({
  success: { bg: "green" },
  error: { bg: "red" }
});
```

---

### `addType(name, config)`
Adds a new toast type dynamically at runtime.

```js
juiceToast.addType("warning", {
  bg: "#facc15",
  color: "#111"
});
```

---

### `defineTheme(name, styles)`
Creates or overrides a theme.

```js
juiceToast.defineTheme("ocean", {
  bg: "#0ea5e9",
  color: "#ffffff",
  border: "1px solid #0284c7"
});
```

---

### `setTheme(name)`
Sets the global theme.

```js
juiceToast.setTheme("dark");
```

---

### `clear()`
Clears all pending toast queues.

```js
juiceToast.clear();
```

---

### `destroy()`
Removes all queues and the root DOM element.

```js
juiceToast.destroy();
```

---

## 🧾 Toast Payload Interface

```ts
interface ToastPayload {
  message?: string;
  title?: string;

  bg?: string;
  color?: string;
  border?: string;
  theme?: string;

  duration?: number; // milliseconds, 0 = sticky
  position?: "top" | "center" | "bottom";
  toast?: "top" | "center" | "bottom"; // legacy support

  closable?: boolean;
  closeable?: boolean; // legacy support

  icon?: string;
  iconPack?: string;
  iconLink?: string;
  iconAnimate?: string;
  iconPosition?: "left" | "right" | "top";

  size?: "sm" | "md" | "lg";
  width?: string;
  height?: string;

  animation?: string;

  actions?: {
    label: string;
    onClick?: (event: MouseEvent) => void;
    closeOnClick?: boolean;
  }[];

  [key: string]: any;
}
```

---

## 🔄 Backward Compatibility

JuiceToast automatically maps legacy options to the modern API.

| Legacy Option | Current Option |
|--------------|----------------|
| `toast` | `position` |
| `closeable` | `closable` |
| `icon_left_top` | `icon` |
| `icon_config` | `iconPack` |
| `icon_onClick_url` | `iconLink` |
| `icon_onClick_animate` | `iconAnimate` |

---

## 🎨 Default Themes

```js
light: {
  bg: "#ffffff",
  color: "#111",
  border: "1px solid #e5e7eb"
}

dark: {
  bg: "#1f2937",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,.08)"
}
```

---

## 📌 Notes

- Browser-only (DOM required)
- Root element is automatically created: `#juice-toast-root`
- Suitable for frameworks, custom runtimes, etc.
- For JuiceToast ^v1.3.0, You don't need import `style.css` manually.
- UMD Are deprecated for maintain reason
- Need Improvment for Handphone user or WebKit user

---

## 📄 License

MIT License © OpenDN Foundation
