# 🍹 JuiceToast API Reference

JuiceToast is a lightweight, dependency-free toast notification library with rich customization, animation, accessibility, and plugin support.

---

## 📦 Installation

```bash
npm install juice-toast
```

```js
import juiceToast from "juice-toast";
```

---

## 🚀 Quick Start

```js
juiceToast.setup({
  duration: 3000,
  maxVisible: 3,
  glassUI: true
});

juiceToast.success({
  title: "Success",
  message: "Data saved successfully"
});
```

---

## ⚙️ Global Configuration (`setup`)

```js
juiceToast.setup(options);
```

### Options

| Option           | Type             | Default | Description                     |
| ---------------- | ---------------- | ------- | ------------------------------- |
| `duration`       | number           | `2500`  | Toast display duration (ms)     |
| `maxVisible`     | number           | `3`     | Max visible toasts per position |
| `glassUI`        | boolean | number | `0`     | Enable glass effect (0–100)     |
| `playSound`      | string | null    | `null`  | Global sound file               |
| `injectCSS`      | boolean          | `true`  | Auto inject base CSS            |
| `css`            | string | null    | `null`  | Custom CSS override             |
| `swipeThreshold` | number           | `60`    | Swipe distance to dismiss       |
| `dev`            | boolean          | `false` | Enable console warnings         |

---

## 🧩 Toast Methods

Each toast type is auto-generated from configuration or `addType`.

```js
juiceToast.success(payload);
juiceToast.error(payload);
juiceToast.info(payload);
juiceToast.warning(payload);
juiceToast.loading(payload);
```

Payload can be a **string** or **object**.

---

## 📝 Toast Payload Options

### Basic

```js
{
  title: "Title",
  message: "Message",
  duration: 3000
}
```

### Appearance

```js
{
  theme: "dark",
  bg: "#333",
  color: "#fff",
  border: "1px solid #000",
  size: "sm" | "md" | "lg",
  compact: true
}
```

---

## 🎬 Animation

```js
{
  animation: "slide-in" | "fade-in" | "bounce-in",
  enterAnimation: "pop" | "bounce" | "shake" | "wiggle" | "pulse" | "spin"
}
```

> `enterAnimation` respects `prefers-reduced-motion` automatically.

---

## 🧊 Glass UI

```js
{
  glassUI: true        // default intensity (60)
  glassUI: 80          // custom intensity
}
```

---

## 📍 Position / Placement

```js
{
  position: "top-left" |
            "top-right" |
            "top-center" |
            "bottom-left" |
            "bottom-right" |
            "bottom-center"
}
```

---

## 🎯 Icon System

```js
{
  icon: "check-circle",
  iconPack: "fa fa-solid",
  iconSize: "18px",
  iconPosition: "left" | "right" | "top",
  iconAnimate: "bounce",
  iconLink: "https://example.com"
}
```

---

## 🔘 Actions Button

```js
{
  actions: [
    {
      label: "Undo",
      onClick: () => {},
      closeOnClick: true
    }
  ]
}
```

---

## ⏳ Progress Bar

```js
{
  progress: true,
  progressColor: "rgba(255,255,255,.7)"
}
```

---

## 🔊 Sound

```js
{
  playSound: "ding.mp3"
}
```

Supported formats: `.mp3`, `.wav`, `.ogg`, `.opus`, `.aiff`, `.wma`

---

## ✋ Interaction

* Swipe to dismiss (touch devices)
* Pause on hover / touch
* Click close button (`closable: true`)

```js
{ closable: true }
```

---

## ♿ Accessibility (A11Y)

* `role="alert"`
* `aria-live="polite"`
* Keyboard focusable
* Reduced motion support

---

## 🔌 Plugin System

```js
juiceToast.use(ctx => {
  const { toast, cfg, type, root } = ctx;
});
```

---

## 🎨 Theme API

```js
juiceToast.defineTheme("ocean", {
  bg: "#0ea5e9",
  color: "#fff"
});

juiceToast.setTheme("ocean");
```

---

## ➕ Custom Toast Type

```js
juiceToast.addType("custom", {
  icon: "star",
  bg: "gold",
  color: "#000"
});

juiceToast.custom("Hello World");
```

---

## Background image
```js
juiceToast.setup({
  bgImage: { "bgImage": "https://cdn.kyrt.my.id/image/ts-logo-128.svg" }
});

juiceToast.bgImage("Hi");
```

---

## 🧹 Utilities

```js
juiceToast.clear();   // Clear queue
juiceToast.destroy(); // Remove all & cleanup
```

---

## 📄 License

MIT License © 2026 OpenDN Foundation
