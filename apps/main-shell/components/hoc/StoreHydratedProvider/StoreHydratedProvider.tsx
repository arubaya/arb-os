"use client";

import { BackgroundAnimation } from "@/components/shared/BackgroundAnimation";
import useStoreHydrated from "@/hooks/useStoreHydrated/useStoreHydrated";
import React from "react";

interface StoreHydratedProviderProps {
  children: React.ReactNode;
}

const StoreHydratedProvider = ({ children }: StoreHydratedProviderProps) => {
  const { hydrated } = useStoreHydrated();

  return hydrated ? children : <BackgroundAnimation />;
};

export default StoreHydratedProvider;
