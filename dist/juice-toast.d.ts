/* JuiceToast v1.3.2
 * (C) 2026 OpenDN Foundation
 * Type Definitions
 */
/* ================= CORE TYPES ================= */

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export type ToastSize = "sm" | "md" | "lg";

export interface ToastAction {
  label: string;
  onClick?: (ev: MouseEvent) => void;
  closeOnClick?: boolean;
}

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
  iconAnimate?: string;

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

  enterAnimation?: string;
  animation?: string;

  actions?: ToastAction[];

  /* TTS */
  tts?: boolean;
  ttsLang?: string;
  ttsRate?: number;
}

/* ================= CONFIG TYPES ================= */

export type ToastTypeConfig = Record<string, Partial<ToastOptions>>;

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

/* ================= MAIN INTERFACE ================= */

type DynamicToastMethods<T extends string> = {
  [K in T]: (payload?: string | ToastOptions) => void;
};

export interface JuiceToastBase<T extends string = string> {
  /* ===== PUBLIC API ===== */

  setup<C extends Record<string, Partial<ToastOptions>>>(
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
