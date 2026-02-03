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