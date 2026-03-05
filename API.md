# JuiceToast API Documentation

JuiceToast is a lightweight, customizable toast notification library with support for:

- Priority queue system
- Promise handling
- Theming
- Plugin system
- Grouping
- Swipe-to-dismiss
- Progress bar
- Sound support
- Avatar & Icon support

---

# Installation

```bash
npm install juice-toast
```

# ESM

```js
import juiceToast from "https://cdn.jsdelivr.net/npm/juice-toast/dist/juice-toast.esm.js";
```

# UMD

```html
<script src="https://cdn.jsdelivr.net/npm/juice-toast/dist/juice-toast.umd.js"></script>
```

---

# Basic Usage

```js
juiceToast.success("Success message");
juiceToast.error("Error message");
juiceToast.info("Information");
juiceToast.warning("Warning message");
juiceToast.loading("Loading...");
```

---

# Global Configuration

## `juiceToast.setup(options)`

Configure global defaults.

```js
juiceToast.setup({
  duration: 3000,
  maxVisible: 5,
  swipeThreshold: 80,
  injectCSS: true,
  dev: true
});
```

### Options

| Option | Type | Default | Description |
|--------|------|----------|-------------|
| duration | number | 2500 | Default auto-dismiss duration (ms) |
| maxVisible | number | 3 | Maximum visible toasts per position |
| swipeThreshold | number | 60 | Swipe distance required to dismiss |
| injectCSS | boolean | true | Automatically inject base CSS |
| css | string | internal | Custom CSS override |
| dev | boolean | false | Enable debug logs |
| playSound | string | null | Sound URL |

---

# Toast Methods

Each toast type can accept:

```js
juiceToast.success(options)
```

Or shortcut:

```js
juiceToast.success("Message")
```

---

# Toast Options

| Option | Type | Description |
|--------|------|-------------|
| message | string | Main text |
| title | string | Toast title |
| html | string | Render sanitized HTML |
| duration | number | Auto close duration |
| position | string | Toast position |
| theme | string | Theme name |
| icon | string | Icon class |
| iconPack | string | Icon library prefix |
| iconAnim | string | Icon animation class |
| iconSize | string | Icon font size |
| avatar | string | Avatar image URL |
| avatarAlt | string | Avatar alt text |
| avatarPosition | left/right/top | Avatar position |
| closable | boolean | Show close button |
| progress | boolean | Show progress bar |
| progressColor | string | Custom progress color |
| actions | array | Custom buttons |
| undo | function | Undo callback |
| undoTimeout | number | Timeout before auto-close |
| groupId | string | Group multiple toasts |
| dedupeKey | string | Prevent duplicate toasts |
| priority | low/normal/high/urgent | Priority queue level |
| playSound | string | Override sound |

---

# Positions

Available positions:

- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`
- `top-center`
- `bottom-center`

Default: `bottom-right`

---

# Themes

Built-in themes:

- `dark`
- `light`
- `glass`

## Define Custom Theme

```js
juiceToast.defineTheme("custom", {
  bg: "#111",
  color: "#fff",
  border: "1px solid #333"
});
```

## Set Theme

```js
juiceToast.setTheme("custom");
```

---

# Custom Toast Types

## `juiceToast.addType(name, config)`

```js
juiceToast.addType("custom", {
  bg: "#9333ea",
  icon: "fa-star",
  duration: 5000
});

juiceToast.custom("Hello!");
```

---

# Promise Toast

## `juiceToast.promise(promise, options)`

```js
juiceToast.promise(fetch("/api"), {
  loading: "Loading...",
  success: "Success!",
  error: "Failed",
  timeout: 5000,
  timeoutMessage: "Request timeout"
});
```

### Returns

```js
{
  cancel: Function
}
```

---

# Plugin System

## `juiceToast.use(pluginFunction)`

```js
juiceToast.use(({ toast, cfg, type, root }) => {
  console.log("Toast created:", type);
});
```

---

# Queue Management

## Clear Queue

```js
juiceToast.clear();
```

## Destroy All Toast Roots

```js
juiceToast.destroy();
```

---

# Advanced Features

## Priority Queue

Available priorities:

- `low`
- `normal`
- `high`
- `urgent`

Example:

```js
juiceToast.success({
  message: "Important",
  priority: "urgent"
});
```

---

## Grouped Toast

```js
juiceToast.info({
  message: "Grouped",
  groupId: "network"
});
```

---

## Action Buttons

```js
juiceToast.success({
  message: "Saved",
  actions: [
    {
      label: "Undo",
      onClick: () => console.log("Undo"),
      closeOnClick: true
    }
  ]
});
```

---

# Accessibility

- Uses `role="status"`
- Keyboard focus support
- Pause on hover & focus
- Swipe support (touch & mouse)

---

# Internal Defaults

```js
{
  duration: 2500,
  maxVisible: 3,
  swipeThreshold: 60,
  glassUI: 0,
  playSound: null,
  dev: false,
  injectCSS: true
}
```

# Parallax Mode
```js
juiceToast.success({
  parallaxMode: true
});
```

---

# License

Atrosfer 1.0 License