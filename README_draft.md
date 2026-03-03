# 🍹 JuiceToast

> Lightweight, powerful, modern toast notification library.  
> Zero dependencies. Promise-ready. Plugin system. Priority queue.

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

## ❓ What is JuiceToast

**JuiceToast** is a lightweight, flexible, and dependency-free toast notification library for modern web applications.  
Designed with a **clean API**, **extensive customization**, and **strong backward compatibility**, JuiceToast fits both small projects and enterprise-scale systems.

It supports **UMD & ESM**, **dynamic toast types**, **theme management**, **queue handling**,  **legacy API compatibility**, and more.

---

## ✨ Features

- ⚡ Lightweight & fast
- 📦 Zero dependencies
- 🎨 Built-in themes (dark, light, glass)
- 🧠 Promise support
- 🔥 Priority queue (max-heap based)
- 👆 Swipe to dismiss (mobile friendly)
- ⏳ Animated progress bar
- 🔁 Grouped notifications (auto counter)
- 🎭 Avatar support
- 🔊 Sound support
- 🧩 Plugin system
- ♿ Accessible (ARIA + focus/hover pause)

---

## 📦 Installation

### NPM
```bash
npm install juice-toast
```

### ESM
```js
import juiceToast from "https://cdn.jsdelivr.net/npm/juice-toast/dist/juice-toast.esm.js";
```

### UMD
```html
<script src="https://cdn.jsdelivr.net/npm/juice-toast/dist/juice-toast.umd.js"></script>
```

---

## 🚀 Basic Usage

```js
juiceToast.success("Success!");
juiceToast.error("Something went wrong!");
juiceToast.info("Information message");
juiceToast.warning("Warning message");
```

---

## 🧠 Advanced Usage

### With Title

```js
juiceToast.success({
  title: "Success",
  message: "Data saved successfully!"
});
```

---

### HTML Content (Sanitized)

```js
juiceToast.info({
  html: "<b>Hello</b> <i>World</i>"
});
```

---

### With Actions

```js
juiceToast.info({
  message: "Delete this item?",
  actions: [
    {
      label: "Confirm",
      onClick: () => console.log("Confirmed"),
      closeOnClick: true
    }
  ]
});
```

---

### With Avatar

```js
juiceToast.success({
  title: "New Message",
  message: "You received a new message",
  avatar: "https://example.com/avatar.jpg",
  avatarPosition: "left"
});
```

Positions:
- `left`
- `right`
- `top`

---

### Progress Bar

```js
juiceToast.success({
  message: "Uploading...",
  progress: true,
  duration: 5000
});
```

---

### Custom Duration

```js
juiceToast.info({
  message: "Auto close in 10s",
  duration: 10000
});
```

---

## 🧠 Promise Support

```js
const request = fetch("/api/data");

juiceToast.promise(request, {
  loading: "Loading...",
  success: "Data loaded!",
  error: "Failed to fetch",
  timeout: 5000,
  timeoutMessage: "Request timeout"
});
```

---

## 🎨 Themes

### Change Theme

```js
juiceToast.setTheme("light");
```

Available:
- `dark`
- `light`
- `glass`

---

### Custom Theme

```js
juiceToast.defineTheme("myTheme", {
  bg: "#111",
  color: "#fff",
  border: "1px solid #333"
});

juiceToast.setTheme("myTheme");
```

---

## 📍 Positions

```js
juiceToast.success({
  message: "Top Left",
  position: "top-left"
});
```

Available:
- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`
- `top-center`
- `bottom-center`

---

## ⚡ Priority System

```js
juiceToast.success({
  message: "Urgent message",
  priority: "urgent"
});
```

Priority levels:
- `low`
- `normal`
- `high`
- `urgent`

Internally powered by a max-heap queue system.

---

## 🔁 Grouped Toast

```js
juiceToast.info({
  message: "New notification",
  groupId: "notifications"
});
```

Same `groupId` = counter increment instead of duplicate toast.

---

## 🔊 Sound Support

```js
juiceToast.setup({
  playSound: "/sound.mp3"
});
```

Per toast:

```js
juiceToast.success({
  message: "With sound",
  playSound: "/sound.mp3"
});
```

---

## 🔄 Undo Support

```js
juiceToast.success({
  message: "Item deleted",
  undo: () => console.log("Undo action"),
  undoTimeout: 5000
});
```

---

## 🧩 Plugin System

```js
juiceToast.use((ctx) => {
  console.log("Toast created:", ctx);
});
```

Plugin context:

```js
{
  toast,
  cfg,
  type,
  root
}
```

---

## ⚙ Global Setup

```js
juiceToast.setup({
  duration: 3000,
  maxVisible: 5,
  swipeThreshold: 80,
  glassUI: true,
  dev: true
});
```

---

## 🗑 API

```js
juiceToast.clear();    // Clear queue
juiceToast.destroy();  // Remove all toast roots
```

---

# 🆚 Comparison

| Feature | 🍹 JuiceToast | 🌟 SweetAlert2 | 🍞 Toastify |
|----------|---------------|---------------|-------------|
| Zero Dependency | ✅ | ❌ | ✅ |
| Lightweight | ✅ | ❌ (larger bundle) | ✅ |
| Promise Integration | ✅ Built-in | ✅ | ❌ |
| Priority Queue | ✅ | ❌ | ❌ |
| Grouped Toast Counter | ✅ | ❌ | ❌ |
| Plugin System | ✅ | ❌ | ❌ |
| Swipe to Dismiss | ✅ | ❌ | ❌ |
| Avatar Support | ✅ | ❌ | ❌ |
| Custom Themes | ✅ | ✅ | Limited |
| Modal Support | ❌ (toast only) | ✅ | ❌ |
| Designed for Toast Only | ✅ | ❌ (modal-focused) | ✅ |

### Compared to SweetAlert2

SweetAlert2 is powerful and great for modal dialogs, but it's heavier and focused on popups rather than pure toast systems.

JuiceToast is:
- Smaller
- Toast-focused
- Queue-driven
- Plugin-extensible

---

### Compared to Toastify

Toastify is simple and lightweight, but lacks:

- Priority queue
- Promise integration
- Grouping system
- Plugin system
- Advanced control

JuiceToast provides more advanced architecture while staying dependency-free.

---

# ♿ Accessibility

- `role="status"`
- Hover pause
- Focus pause
- Reduced motion support

---

# 📄 License

MIT License

---

# ❤️ Contributing

Pull requests are welcome.  
If you find bugs, open an issue.

---

# 🔥 Why JuiceToast?

Because simple toast libraries are boring.

JuiceToast gives you:
 - Real queue system
 - Promise integration
 - Plugins
 - Advanced control
 - Performance focus
 - Clean modern UI