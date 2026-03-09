# JuiceToast React Plugins

> [!WARN]
> Do not use this feature in production.
> This feature is still experimental.

# Use
```js
import React from 'react';
import { useToast } from '@juice-toast/plugins-react';

export default function App() {

  const toast = useToast()

  const save = () => {
    toast.info("saving the data...")

    setTimeout(() => {
      toast.success("Data Saved!")
    }, 2000)
  }

  return (
    <button onClick={save}>
      Save
    </button>
  )
}
```

# License
2026 (C) OpenDN Foundation / Released under Atrosfer 1.0 LICENSE
