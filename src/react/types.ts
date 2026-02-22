export type JuiceToastTheme =
  | "light"
  | "dark"
  | "glass"
  | "midnight"
  | "soft"
  | "neutral"
  | "brand"
  | "gradient"
  | "outline"
  | string;

export interface JuiceToastOptions {
  message?: string;
  title?: string;
  duration?: number;
  theme?: JuiceToastTheme;
  render?: () => HTMLElement;
}