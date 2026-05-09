import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  function toast({ title, description }: { title?: string; description?: string }) {
    const id = Date.now();
    const newToast = { id, title, description };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return { toast, toasts };
}