import { createRoot } from "react-dom/client";
import juiceToast from "juice-toast";

export function showJSXToast(node: React.ReactNode, options: any = {}) {
  const container = document.createElement("div");

  const root = createRoot(container);
  root.render(node);

  juiceToast.show({
    ...options,
    render: () => container,
  });
}