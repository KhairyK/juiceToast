/* JuiceToast v1.3.1 (iOS Enhanced)
 * (C) 2026 OpenDN Foundation
 * Type Definitions
 */

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | string

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"

export type ToastSize = "sm" | "md" | "lg"

export type AnimationType =
  | "spin"
  | "pulse"
  | "shake"
  | "bounce"
  | "wiggle"
  | "pop"
  | string

export interface ToastAction {
  label: string
  onClick?: (event: MouseEvent) => void
  closeOnClick?: boolean
}

export interface ToastOptions {
  /* content */
  title?: string
  message?: string

  /* icon */
  icon?: string
  iconPack?: string
  iconSize?: string | number
  iconPosition?: "left" | "right" | "top"
  iconLink?: string
  iconAnimate?: AnimationType

  /* layout */
  position?: ToastPosition
  size?: ToastSize
  width?: string
  height?: string
  compact?: boolean

  /* behavior */
  duration?: number
  closable?: boolean
  progress?: boolean
  progressColor?: string
  swipeThreshold?: number

  /* style */
  theme?: string
  bg?: string
  color?: string
  border?: string
  glassUI?: boolean | number

  /* animation */
  animation?: AnimationType
  enterAnimation?: AnimationType

  /* actions */
  actions?: ToastAction[]

  /* sound */
  playSound?: string | null

  /* legacy / alias (still supported internally) */
  toast?: ToastPosition
  closeable?: boolean
  icon_left_top?: string
  icon_config?: string
  icon_onClick_url?: string
  icon_onClick_animate?: AnimationType
}

export interface JuiceToastConfig {
  duration?: number
  maxVisible?: number
  swipeThreshold?: number
  glassUI?: number | boolean
  playSound?: string | null
  dev?: boolean
  injectCSS?: boolean
  css?: string

  /* custom toast type defaults */
  [type: string]: any
}

export interface ToastPluginContext {
  toast: HTMLElement
  cfg: ToastOptions
  type: ToastType
  root: HTMLElement
}

export type JuiceToastPlugin = (ctx: ToastPluginContext) => void

export interface JuiceToast {
  /* lifecycle */
  setup(config?: JuiceToastConfig): void
  clear(): void
  destroy(): void

  /* extension */
  use(plugin: JuiceToastPlugin): void
  addType(type: ToastType, defaults?: Partial<ToastOptions>): void
  defineTheme(
    name: string,
    theme: {
      bg?: string
      color?: string
      border?: string
    }
  ): void
  setTheme(name: string): void

  /* dynamic toast functions (success, error, custom, dll) */
  [key: string]: any
}

declare const juiceToast: JuiceToast

export default juiceToast
export { juiceToast }