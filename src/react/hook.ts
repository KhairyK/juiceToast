import { useEffect, useMemo } from "react";
import juiceToast from "./juice-toast";

export function useJuiceToast() {
  // stable instance
  const toast = useMemo(() => juiceToast, []);

  useEffect(() => {
    // safe for SSR
    if (typeof window !== "undefined") {
      toast.setTheme(toast._theme || "dark");
    }
  }, [toast]);

  return toast;
}