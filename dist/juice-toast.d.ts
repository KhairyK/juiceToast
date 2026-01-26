/**
 * OpenDN Foundation (C) 2026
 * Juice Toast — Type Definitions
 * @license MIT
 */

/* ================= BASIC TYPES ================= */

export type ToastPosition =
  | "top"
  | "center"
  | "bottom"
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export type ToastSize = "sm" | "md" | "lg";

export type IconPosition = "left" | "right" | "top";

export type ToastDuration = number; // 0 = persistent

/* ================= THEME ================= */

export interface ToastTheme {
  bg?: string;
  color?: string;
  border?: string;
  glow?: string;
}

/* ================= ACTION ================= */

export interface ToastAction {
  label: string;
  onClick?: (event: MouseEvent) => void;
  closeOnClick?: boolean;
}

/* ================= PAYLOAD ================= */

export interface ToastPayload {
  /* -------- content -------- */
  message?: string;
  title?: string;

  /* -------- appearance -------- */
  bg?: string;
  color?: string;
  border?: string;
  glow?: string;
  theme?: string;

  width?: string;
  height?: string;
  size?: ToastSize;
  compact?: boolean;

  /* -------- timing & placement -------- */
  duration?: ToastDuration;
  position?: ToastPosition;
  toast?: ToastPosition; // legacy

  pauseOnHover?: boolean; // default true
  swipeToDismiss?: boolean; // default true

  /* -------- close -------- */
  closable?: boolean;
  closeable?: boolean; // legacy

  /* -------- icon (modern) -------- */
  icon?: string;
  iconPack?: string;
  iconSize?: string;
  iconPosition?: IconPosition;
  iconLink?: string;
  iconAnimate?: string;

  /* -------- icon (legacy) -------- */
  icon_left_top?: string;
  icon_config?: string;
  icon_onClick_url?: string;
  icon_onClick_animate?: string;
  
  playSound ? : string | boolean;
  glassUI ? : boolean;

  /* -------- actions -------- */
  actions?: ToastAction[];

  /* -------- advanced -------- */
  render?: (root: HTMLElement) => void;

  /* -------- escape hatch -------- */
  [key: string]: unknown;
}

/* ================= TYPE CONFIG ================= */

export interface ToastTypeConfig extends ToastPayload {}

/* ================= GLOBAL CONFIG ================= */

export interface JuiceToastDefaults {
  duration?: ToastDuration;
  position?: ToastPosition;
  maxVisible?: number;
  swipeThreshold?: number;
  pauseOnHover?: boolean;
  swipeToDismiss?: boolean;
  closable?: boolean;
  playSound?: string | boolean;
  glassUI?: boolean | number;
}

/* ================= CORE API ================= */

export interface JuiceToastAPI {
  /**
   * Register toast types in bulk
   */
  setup<T extends Record<string, ToastTypeConfig>>(
    config?: T & JuiceToastDefaults
  ): void;

  /**
   * Add or override a single toast type
   */
  addType<T extends ToastTypeConfig>(
    name: string,
    config?: T
  ): void;

  /**
   * Global defaults
   */
  defaults(config: JuiceToastDefaults): void;

  /**
   * Theme system
   */
  defineTheme(name: string, styles: ToastTheme): void;
  setTheme(name: string): void;

  /**
   * Queue control
   */
  clear(): void;
  destroy(): void;

  /**
   * Dynamic toast methods
   * juiceToast.success(...)
   * juiceToast.error(...)
   * juiceToast.anything(...)
   */
  [type: string]:
    | ((payload?: string | number | ToastPayload) => void)
    | unknown;
}

/* ================= EXPORT ================= */

declare const juiceToast: JuiceToastAPI;

export default juiceToast;
export { juiceToast };