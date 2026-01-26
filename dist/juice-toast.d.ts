/**
 * OpenDN Foundation (C) 2026
 * Juice Toast — Type Definitions
 * @license MIT
 */

/// <reference lib="dom" />

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

  pauseOnHover?: boolean;
  swipeToDismiss?: boolean;

  /* -------- close -------- */
  closable?: boolean;
  closeable?: boolean; // legacy typo support

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

  /* -------- effects -------- */
  playSound?: string | boolean;
  glassUI?: boolean | number;

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
  setup<T extends Record<string, ToastTypeConfig>>(
    config?: T & JuiceToastDefaults
  ): void;

  addType<T extends ToastTypeConfig>(
    name: string,
    config?: T
  ): void;

  defaults(config: JuiceToastDefaults): void;

  defineTheme(name: string, styles: ToastTheme): void;
  setTheme(name: string): void;

  clear(): void;
  destroy(): void;

  [type: string]:
    | ((payload?: string | number | ToastPayload) => void)
    | unknown;
}

/* ================= EXPORT ================= */

declare const juiceToast: JuiceToastAPI;

export default juiceToast;
export { juiceToast };