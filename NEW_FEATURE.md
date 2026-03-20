# Juice Toast Release Candidate 2026 for v1.2.0/v1.2.1

```js
animation: "slide-in" | "fade-in" | "bounce-in";
glassUI: true | false | number
playSound: "soundName.mp3" // You can play `.wav`, `.aiff/.aif`, `.ogg`, `.wma`, `.opus`, etc.
swipeThreshold: number; // default 60
pauseOnHover: true;    // implicit via mouseenter
```

# Juice Toast Release v1.3.0
```js
animation: "slide-in" | "fade-in" | "bounce-in"; // legacy / css animation
enterAnimation: "pop" | "bounce" | "shake" | "wiggle" | "pulse" | "spin"; // class-based
progress: true;
progressColor: "rgba(255,255,255,.7)";
juiceToast.use(ctx => {
  // ctx.toast
  // ctx.cfg
  // ctx.type
  // ctx.root
});

// Global Setup
juiceToast.setup({
  duration: 2500,
  maxVisible: 3,
  playSound: "ding.mp3",
  glassUI: 40,
  injectCSS: true,
  css: "custom css",
  dev: true
});

```

```A11Y
role="alert"
aria-live="polite"
prefers-reduced-motion supported
```

# Juice Toast Release v1.3.1
See [CHANGELOG.md](https://github.com/KhairyK/juiceToast/blob/main/CHANGELOG.md)

# Juice Toast Release v1.3.2
```js
juiceToast.setup({
  bgImage: { "bgImage": "https://cdn.kyrt.my.id/image/ts-logo-128.svg" }
});

juiceToast.bgImage("Hi");
juiceToast.success("Hello, World"); // Available since version v1.3.2
```

# Juice Toast Release v1.3.3
See [CHANGELOG.md](https://github.com/KhairyK/juiceToast/blob/main/CHANGELOG.md)

# Juice Toast Release v1.3.4
```js
juiceToast.success({
  title: "New Message",
  message: "You received a new message",
  avatar: "https://example.com/avatar.jpg",
  avatarPosition: "left"
});
```

# Juice Toast Release v1.4.1
```js
juiceToast.success({
  html: "<b>Hello</b> <i>World</i>", 
  priority: "normal", 
});

// Promise
const request = fetch("/api/data");

juiceToast.promise(request, {
  loading: "Loading...",
  success: "Data loaded!",
  error: "Failed to fetch",
  timeout: 5000,
  timeoutMessage: "Request timeout"
});
```

# Juice Toast Release v1.4.2
```js
juiceToast.modal({
  title: "Delete File?",
  message: "Are you sure you want to delete this file?",
  actions: [
    { label: "Cancel" },
    { 
      label: "Delete", 
      onClick: () => console.log("Deleted!"),
      closeOnClick: true 
    }
  ]
});
```

# Juice Toast Release v1.4.3
```js
juiceToast.success({
  parallaxMode: true
});
```

# Juice Toast Release v1.4.4 (Pack 0)
```js
juiceToast.success({
  use3d: true
});
```

# JuiceToast v1.4.4 (Pack 1)
```js
juiceToast.pauseAll();
juiceToast.resumeAll();
juiceToast.dismissAll();
juiceToast.listActive(filter);
```

# JuiceToast v1.4.4 (Final)
```js
juiceToast.setup({
  urgentSkipsQueue: true
});
```

# JuiceToast Major 2.0.0 (Pack 0)

[!NOTE]
The Type Registration API has changed.

Custom toast types should now be defined using the `types` option in `setup()`.

```js
import juiceToast from 'juice-toast';
import DOMPurify from 'dompurify';

juiceToast.setup({
  sanitizer: {
    engine: 'dompurify',
    dompurify: DOMPurify,
  },
  types: {
    typeName: {} // juiceToast.typeName
  }, 
  devTools: true
});

juiceToast.info({
  title: 'Upload',
  message: 'File 1 under process',
  groupId: 'upload-01',
  groupStrategy: 'merge',
});
```