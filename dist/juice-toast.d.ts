export type ToastPosition = "top" | "center" | "bottom";

export interface ToastTheme {
  bg ? : string;
  color ? : string;
  border ? : string;
  glow ? : string;
}

export interface ToastPayload {
  /* CONTENT */
  message ? : string;
  title ? : string;
  
  /* STYLE */
  bg ? : string;
  color ? : string;
  border ? : string;
  glow ? : string;
  theme ? : string;
  
  /* BEHAVIOR */
  duration ? : number; // ms, 0 = sticky
  position ? : ToastPosition;
  toast ? : ToastPosition; // backward compat
  closable ? : boolean;
  closeable ? : boolean; // backward compat
  
  /* ICON (Fontic / others) */
  icon ? : string;
  icon_left_top ? : string; // backward compat
  icon_config ? : string; // backward compat
  iconPack ? : string;
  
  iconLink ? : string;
  iconAnimate ? : string;
  
  /* any future extension */
  [key: string]: any;
}

export interface ToastTypeConfig extends ToastPayload {}

export interface JuiceToastAPI {
  /* ===== SETUP ===== */
  setup(config: Record < string, ToastTypeConfig > ): void;
  addType(name: string, config ? : ToastTypeConfig): void;
  
  /* ===== THEME ===== */
  defineTheme(name: string, styles: ToastTheme): void;
  setTheme(name: string): void;
  
  /* ===== QUEUE ===== */
  clear(): void;
  destroy(): void;
  
  /* ===== DYNAMIC METHODS ===== */
  [type: string]: ((payload ? : string | number | ToastPayload) => void) | any;
}

/* ===== DEFAULT EXPORT ===== */
declare const juiceToast: JuiceToastAPI;

export default juiceToast;
export { juiceToast };
