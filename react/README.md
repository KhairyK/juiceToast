# JuiceToast React

A lightweight toast notification wrapper for **React**.

JuiceToast React provides a simple API for showing toast notifications in React applications while using the core `juicetoast` engine.

It is **SSR-safe** and works with frameworks like **Next.js**.

---

> [!WARN]
> Do not use this feature in production.
> This feature is still experimental.

---

## Installation

```bash
npm install @juice-toast/plugins-react
```

---

## Usage

```jsx
import { toast } from "@juice-toast/plugins-react"

function App() {

  const showToast = () => {
    toast.success("Hello React 🚀")
  }

  return (
    <button onClick={showToast}>
      Show Toast
    </button>
  )
}
```

---

## Toast Types

```js
toast.success("Success message")

toast.error("Error message")

toast.info("Info message")

toast.warning("Warning message")

toast.loading("Loading...")
```

---

## Update Toast

```js
const id = toast.loading("Uploading...")

setTimeout(() => {
  toast.update(id,{
    message: "Upload complete",
    type: "success",
    duration: 3000
  })
},2000)
```

---

## Promise Toast

```js
toast.promise(
  fetch("/api/data"),
  {
    loading: "Loading...",
    success: "Data loaded",
    error: "Failed to load"
  }
)
```

---

## Dismiss Toast

Remove one toast

```js
toast.dismiss(id)
```

Remove all toasts

```js
toast.dismissAll()
```

---

## Pause / Resume

```js
toast.pause()

toast.resume()
```

---

## React Hook

```jsx
import { useToast } from "@juice-toast/plugins-react"

function App(){

  const toast = useToast()

  return (
    <button onClick={()=>{
      toast.success("Hook toast")
    }}>
      Show Toast
    </button>
  )
}
```

---

## SSR Support

JuiceToast React is **SSR safe**.

If used in server-side rendering environments like Next.js, toast functions automatically become **no-ops on the server**, preventing `window` or `document` errors.

---

## License

Atrosfer 1.0