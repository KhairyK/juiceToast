/* JuiceToast v1.3.2 (iOS User)
 * (C) 2026 OpenDN Foundation
 * Type Definitions
 */

/* ================= CORE ================= */

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | string;

export type ToastSize = "sm" | "md" | "lg";

export type ToastAnimation =
  | "spin"
  | "pulse"
  | "shake"
  | "bounce"
  | "wiggle"
  | "pop"
  | string;

/* ================= ACTIONS ================= */

export interface ToastAction {
  label: string;
  onClick?: (ev: MouseEvent) => void;
  closeOnClick?: boolean;
}

/* ================= OPTIONS ================= */

export interface ToastOptions {
  title?: string;
  message?: string;

  theme?: string;
  position?: ToastPosition;

  duration?: number;
  progress?: boolean;
  progressColor?: string;

  icon?: string;
  iconPack?: string;
  iconSize?: string;
  iconPosition?: "left" | "right" | "top";

  iconLink?: string;
  iconAnimate?: ToastAnimation;

  closable?: boolean;

  bg?: string;
  color?: string;
  border?: string;

  width?: string;
  height?: string;

  size?: ToastSize;
  compact?: boolean;

  glassUI?: number | boolean;

  bgImage?: string;

  enterAnimation?: ToastAnimation;
  animation?: string;

  actions?: ToastAction[];

  /* AUDIO */
  playSound?: string;

  /* TTS */
  tts?: boolean;
  ttsLang?: string;
  ttsRate?: number;
}

/* ================= INTERNAL DEFAULTS ================= */

export interface JuiceToastDefaults {
  duration: number;
  maxVisible: number;
  swipeThreshold: number;
  glassUI: number;
  playSound: string | null;
  dev: boolean;
  injectCSS: boolean;
  css: string | null;
}

/* ================= PLUGIN ================= */

export interface JuiceToastPluginContext<T extends string = string> {
  toast: HTMLElement;
  cfg: ToastOptions;
  type: T;
  root: HTMLElement;
}

export type JuiceToastPlugin<T extends string = string> = (
  ctx: JuiceToastPluginContext<T>
) => void;

/* ================= CONFIG ================= */

export type ToastTypeConfig = Record<string, Partial<ToastOptions>>;

/* ================= DYNAMIC METHODS ================= */

type DynamicToastMethods<T extends string> = {
  [K in T]: (payload?: string | ToastOptions) => void;
};

/* ================= CORE INSTANCE ================= */

export interface JuiceToastBase<T extends string = string> {
  _config: ToastTypeConfig;
  _queue: any[];
  _showing: boolean;
  _theme: string;
  _plugins: JuiceToastPlugin<T>[];
  _defaults: JuiceToastDefaults;

  /* ===== PUBLIC API ===== */

  setup<C extends ToastTypeConfig>(
    config: C
  ): JuiceToastBase<keyof C & string> &
    DynamicToastMethods<keyof C & string>;

  use(plugin: JuiceToastPlugin<T>): void;

  addType(name: string, cfg?: Partial<ToastOptions>): void;

  defineTheme(name: string, styles: Record<string, string>): void;

  setTheme(name: string): void;

  clear(): void;
  destroy(): void;
}

/* ================= FINAL TYPE ================= */

export type JuiceToast<T extends string = string> =
  JuiceToastBase<T> & DynamicToastMethods<T>;

declare const juiceToast: JuiceToast;

export default juiceToast;
export { juiceToast };
