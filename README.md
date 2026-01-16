# 🍹 JuiceToast

**JuiceToast** is a lightweight, flexible, and dependency-free toast notification library.  
It supports **ESM**, **UMD**, **dynamic toast types**, **theme systems**, **queue handling**, and **backward compatibility**.

Suitable for small projects up to custom-built frameworks.

---

## ✨ Features

- 🚀 Zero dependencies
- 📦 Supports **ESM** & **UMD**
- 🔁 Queue system (toasts are displayed one at a time)
- 🎨 Theme system (light / dark / custom)
- 🧩 Dynamic toast types (`success`, `error`, etc.)
- ⏳ Auto close & sticky toasts
- ❌ Closable toasts
- ⭐ Icon support with animation and link
- 🕰 Backward compatibility with legacy APIs

---

## 📦 Installation

### ESM
```js
import juiceToast from "https://cdn.kyrt.my.id/libs/js;juice-toast/1.0.0/juice-toast.esm.js";
```

### UMD (Browser)
```html
<link rel="stylesheet" href="https://cdn.kyrt.my.id/libs/css/fontic/2.0.0/juice-toast/style.css" />
<script src="https://cdn.kyrt.my.id/libs/js/juice-toast/1.0.0/juice-toast.umd.js"></script>
<script>
  juiceToast.setup({
   success: {
    bg: "#01AA38"
  });
  juiceToast.success("Hello world!");
</script>
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

juiceToast.success("Success!");
juiceToast.error({ title: "Error", message: "An error has occurred" });
```

---

## 🧠 Core Concept

### Toast Types
Toasts are triggered based on **types** defined via `setup()` or `addType()`.

```js
juiceToast.info("Hello");
juiceToast.warning({ message: "Be careful", duration: 4000 });
```

---

## ⚙️ API

### `setup(config)`
Register all toast types.

```js
juiceToast.setup({
  success: { bg: "green" },
  error: { bg: "red" }
});
```

---

### `addType(name, config)`
Add a toast type dynamically.

```js
juiceToast.addType("warning", {
  bg: "#facc15",
  color: "#111"
});
```

---

### `defineTheme(name, styles)`
Create or override a theme.

```js
juiceToast.defineTheme("ocean", {
  bg: "#0ea5e9",
  color: "#fff",
  border: "1px solid #0284c7"
});
```

---

### `setTheme(name)`
Set the global theme.

```js
juiceToast.setTheme("dark");
```

---

### `clear()`
Clear all toast queues.

```js
juiceToast.clear();
```

---

### `destroy()`
Remove all queues and the root DOM element.

```js
juiceToast.destroy();
```

---

## 🧾 Toast Payload

```ts
interface ToastPayload {
  message?: string;
  title?: string;

  bg?: string;
  color?: string;
  border?: string;
  glow?: string;
  theme?: string;

  duration?: number; // ms, 0 = sticky
  position?: "top" | "center" | "bottom";
  toast?: "top" | "center" | "bottom"; // backward compatibility
  closable?: boolean;
  closeable?: boolean; // backward compatibility

  icon?: string;
  iconPack?: string;
  iconLink?: string;
  iconAnimate?: string;

  [key: string]: any;
}
```

---

## 🎯 Full Example

```js
juiceToast.success({
  title: "Login",
  message: "Successfully logged in!",
  icon: "check-circle",
  iconPack: "fa-solid",
  iconAnimate: "shake",
  iconLink: "https://example.com",
  duration: 3000,
  position: "top",
  closable: true
});
```

---

## 🔄 Backward Compatibility

JuiceToast automatically supports legacy APIs:

| Legacy | Current |
|------|---------|
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
  color: "#fff",
  border: "1px solid rgba(255,255,255,.08)"
}
```

---

## 📌 Notes

- Not compatible with SSR (DOM required)
- Root element is automatically created: `#juice-toast-root`

---

## 📄 License

MIT © JuiceToast
