"use client";

import { useOSCoreStore } from "@/stores/useOSCoreStore";
import { useShallow } from "zustand/shallow";

const useStoreHydrated = () => {
  const hydrated = useOSCoreStore(useShallow((state) => state.hydrated));

  return { hydrated };
};

export default useStoreHydrated;
