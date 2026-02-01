/* --------------------------------------------------
 * 2026 (C) OpenDN Foundation
 * Juice Toast v1.2.0-rc.2026 Type Definitions
 * -------------------------------------------------- */

export type ToastTheme = {
  bg?: string;
  color?: string;
  border?: string;
};

export type ToastSizePreset = "sm" | "md" | "lg";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export type ToastAnimation =
  | "slide-in"
  | "fade-in"
  | "bounce-in"
  | string;

export type ToastAction = {
  label: string;
  onClick?: (event: Event) => void;
  closeOnClick?: boolean;
};

export type ToastPayload = {
  message?: string;
  title?: string;

  duration?: number; // ms, 0 = persistent
  position?: ToastPosition;
  theme?: string;
  bg?: string;
  size?: ToastSizePreset;
  width?: string;
  height?: string;
  compact?: boolean;
  closable?: boolean;
  glassUI?: boolean | number;

  icon?: string;
  iconPack?: string;
  iconSize?: string;
  iconPosition?: "left" | "right" | "top";
  iconLink?: string;
  iconAnimate?: string;

  animation?: ToastAnimation;

  actions?: ToastAction[];
};

export type ToastDefaults = {
  duration: number;
  maxVisible: number;
  swipeThreshold: number;
  glassUI: number;
  playSound: string | null;
};

export interface JuiceToast {
  /* ================= PUBLIC API ================= */

  setup(cfg?: Record<string, ToastPayload>): void;

  addType(name: string, cfg?: ToastPayload): void;

  defineTheme(name: string, styles?: ToastTheme): void;

  setTheme(name: string): void;

  clear(): void;

  destroy(): void;

  /* ================= INTERNAL ================= */

  _config: Record<string, ToastPayload>;
  _queue: Array<{ type: string; payload: any }>;
  _showing: boolean;
  _theme: string;
  _defaults: ToastDefaults;

  _registerTypes(): void;
  _enqueue(type: string, payload: any): void;
  _next(): void;
  _normalizeGlass(value?: boolean | number): number;
  _getRoot(position?: ToastPosition): HTMLElement | null;
  _playSound(src?: string): void;
  _showToast(type: string, payload: ToastPayload | string): void;

  /* ================= DYNAMIC TOAST METHODS ================= */
  [type: string]: ((payload?: ToastPayload | string) => void) | any;
}

declare const juiceToast: JuiceToast;

export default juiceToast;
export { juiceToast };