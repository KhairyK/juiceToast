import { createContext } from "react"
import juiceToast from "../core/juiceToast"

export const ToastContext = createContext(juiceToast)

export function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={juiceToast}>
      {children}
    </ToastContext.Provider>
  )
}
