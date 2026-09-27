import { useEffect, type ReactNode } from "react";
import { useRixinStore } from "@/lib/rixin/store";

export function RixinHydrate({ children }: { children: ReactNode }) {
  const setHydrated = useRixinStore((s) => s.setHydrated);

  useEffect(() => {
    void Promise.resolve(useRixinStore.persist.rehydrate()).finally(() =>
      setHydrated(true),
    );
  }, [setHydrated]);

  return children;
}
