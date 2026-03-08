import juiceToast from "../core/juicetoast"

export function useToast() {
  
  return {
    success: (msg, cfg = {}) =>
      juiceToast.success({ message: msg, ...cfg }),
    
    error: (msg, cfg = {}) =>
      juiceToast.error({ message: msg, ...cfg }),
    
    info: (msg, cfg = {}) =>
      juiceToast.info({ message: msg, ...cfg }),
    
    promise: juiceToast.promise
  }
  
}