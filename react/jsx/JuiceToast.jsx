import juiceToast from "juice-toast"

const isBrowser =
  typeof window !== "undefined" &&
  typeof document !== "undefined"

function safeCall(fn) {
  if (!isBrowser) return null
  return fn()
}

function toast(message, opts = {}) {
  return safeCall(() =>
    juiceToast.info({
      message,
      ...opts
    })
  )
}

toast.success = (message, opts={}) =>
  safeCall(()=>juiceToast.success({ message, ...opts }))

toast.error = (message, opts={}) =>
  safeCall(()=>juiceToast.error({ message, ...opts }))

toast.info = (message, opts={}) =>
  safeCall(()=>juiceToast.info({ message, ...opts }))

toast.warning = (message, opts={}) =>
  safeCall(()=>juiceToast.warning({ message, ...opts }))

toast.loading = (message, opts={}) =>
  safeCall(()=>juiceToast.loading({ message, ...opts }))

toast.update = (id, opts) =>
  safeCall(()=>juiceToast.update(id, opts))

toast.dismiss = (id) =>
  safeCall(()=>juiceToast.remove(id))

toast.dismissAll = (filter) =>
  safeCall(()=>juiceToast.dismissAll(filter))

toast.pause = () =>
  safeCall(()=>juiceToast.pauseAll())

toast.resume = () =>
  safeCall(()=>juiceToast.resumeAll())

export { toast }