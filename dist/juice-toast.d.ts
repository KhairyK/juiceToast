export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export type ToastPriority = "low" | "normal" | "high" | "urgent";

export type ToastSize = "sm" | "md" | "lg";

export type ToastTheme = string;

export interface ToastAction {
  label?: string;
  onClick?: (event: Event) => void;
  closeOnClick?: boolean;
  primary?: boolean;
}

export interface ToastOptions {
  id?: string;
  title?: string;
  message?: string;
  html?: string;

  duration?: number;
  position?: ToastPosition;
  priority?: ToastPriority;
  size?: ToastSize;

  theme?: ToastTheme;

  bg?: string;
  color?: string;
  border?: string;

  icon?: string;
  iconPack?: string;
  iconSize?: string;
  iconAnim?: string;
  iconPosition?: "left" | "right" | "top";
  iconLink?: string;
  iconAnimate?: string;

  avatar?: boolean | string;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarPosition?: "left" | "right" | "top";
  avatarSpacing?: string;
  avatarLazy?: boolean;

  progress?: boolean;
  progressColor?: string;

  closable?: boolean;
  closeable?: boolean;

  actions?: ToastAction[];

  undo?: () => void;
  undoTimeout?: number;

  groupId?: string;
  dedupeKey?: string;

  playSound?: string | null;
}

export interface PromiseStates<T = any> {
  loading?: ToastOptions | string;
  success?: ToastOptions | string | ((value: T) => string);
  error?: ToastOptions | string | ((error: any) => string);

  timeout?: number;
  timeoutMessage?: string;
  cancelMessage?: string;
}

export interface ModalOptions {
  title?: string;
  message?: string;
  html?: string;

  block?: boolean;
  blur?: boolean;
  closeOnOverlay?: boolean;
  closable?: boolean;

  animation?: "scale" | "slide" | "fade";
  theme?: ToastTheme;

  actions?: ToastAction[];
}

export interface JuiceToastDefaults {
  duration?: number;
  maxVisible?: number;
  swipeThreshold?: number;
  glassUI?: number;
  playSound?: string | null;
  dev?: boolean;
  injectCSS?: boolean;
  css?: string | null;
}

export interface JuiceToastInstance {
  setup(config?: Record<string, ToastOptions> & JuiceToastDefaults): void;

  use(plugin: (context: {
    toast: HTMLElement;
    cfg: ToastOptions;
    type: string;
    root: HTMLElement;
  }) => void): void;

  addType(name: string, config?: ToastOptions): void;

  defineTheme(name: string, styles?: {
    bg?: string;
    color?: string;
    border?: string;
  }): void;

  setTheme(name: string): void;

  clear(): void;
  destroy(): void;

  promise<T = any>(
    promise: Promise<T>,
    states?: PromiseStates<T>
  ): { cancel: () => void };

  modal(options?: ModalOptions): { close: () => void };

  success(options?: ToastOptions | string): void;
  error(options?: ToastOptions | string): void;
  info(options?: ToastOptions | string): void;
  warning(options?: ToastOptions | string): void;
  loading(options?: ToastOptions | string): void;

  [customType: string]: any;
}

declare const juiceToast: JuiceToastInstance;

export default juiceToast;
export { juiceToast };
