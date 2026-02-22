import { useEffect } from "react";
import juiceToast from "juice-toast";

interface Props {
  theme?: string;
  children: React.ReactNode;
}

export function JuiceToastProvider({
  theme = "dark",
  children,
}: Props) {
  useEffect(() => {
    juiceToast.setTheme(theme);
  }, [theme]);

  return <>{children}</>;
}