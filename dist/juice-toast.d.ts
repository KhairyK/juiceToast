/* --------------------------------------------------
 * 2026 (C) OpenDN Foundation
 * Juice Toast v1.3.0 Type Definitions
 * -------------------------------------------------- */
declare module "juice-toast" {
  /* ================= BASIC ================= */

  export type ToastPosition =
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "center"
    | "top"
    | "bottom";

  export type ToastSize = "sm" | "md" | "lg";

  export type IconPosition = "left" | "right" | "top";

  export type EnterAnimation =
    | "spin"
    | "pulse"
    | "shake"
    | "bounce"
    | "wiggle"
    | "pop";

  export type Animation = string;

  /* ================= ACTION ================= */

  export interface ToastAction {
    label: string;
    onClick?: (ev: MouseEvent) => void;
    closeOnClick?: boolean;
  }

  /* ================= PAYLOAD ================= */

  export interface ToastPayload {
    /* content */
    title?: string;
    message?: string;

    /* size / layout */
    size?: ToastSize;
    width?: string;
    height?: string;
    compact?: boolean;

    /* position */
    position?: ToastPosition;

    /* timing */
    duration?: number;

    /* icon */
    icon?: string;
    iconPack?: string;
    iconSize?: string;
    iconPosition?: IconPosition;
    iconLink?: string;
    iconAnimate?: EnterAnimation;

    /* animation */
    animation?: Animation;
    enterAnimation?: EnterAnimation;

    /* style */
    theme?: string;
    bg?: string;
    color?: string;
    border?: string;

    /* glass */
    glassUI?: boolean | number;

    /* progress */
    progress?: boolean;
    progressColor?: string;

    /* close */
    closable?: boolean;

    /* sound */
    playSound?: string | null;

    /* actions */
    actions?: readonly ToastAction[];

    /* backward compatibility */
    toast?: ToastPosition;
    closeable?: boolean;
    icon_left_top?: string;
    icon_config?: string;
    icon_onClick_url?: string;
    icon_onClick_animate?: EnterAnimation;
  }

  /* ================= SETUP ================= */

  export interface JuiceToastDefaults {
    duration?: number;
    maxVisible?: number;
    swipeThreshold?: number;
    glassUI?: number | boolean;
    playSound?: string | null;
    dev?: boolean;
    injectCSS?: boolean;
    css?: string | null;
  }

  /**
   * setup() config:
   * - known global defaults
   * - custom toast types via index signature
   */
  export type JuiceToastSetup =
    JuiceToastDefaults & {
      readonly [toastType: string]:
        | ToastPayload
        | number
        | string
        | boolean
        | undefined;
    };

  /* ================= PLUGIN ================= */

  export interface JuiceToastPluginContext {
    toast: HTMLElement;
    cfg: Readonly<ToastPayload>;
    type: string;
    root: HTMLElement;
  }

  export type JuiceToastPlugin = (
    ctx: JuiceToastPluginContext
  ) => void;

  /* ================= MAIN API ================= */

  export interface JuiceToast {
    /* core */
    setup(cfg?: JuiceToastSetup): void;
    clear(): void;
    destroy(): void;

    /* theme */
    defineTheme(
      name: string,
      styles: Readonly<{
        bg?: string;
        color?: string;
        border?: string;
      }>
    ): void;

    setTheme(name: string): void;

    /* types */
    addType(
      name: string,
      cfg?: Readonly<ToastPayload>
    ): void;

    /* plugin */
    use(plugin: JuiceToastPlugin): void;

    /**
     * Dynamic toast methods
     * success(), error(), warning(), info(), loading(), custom...
     */
    readonly [type: string]:
      | ((payload?: Readonly<ToastPayload> | string) => void)
      | unknown;
  }

  const juiceToast: JuiceToast;

  export default juiceToast;
  export { juiceToast };
}