"use client";

import useOSCoreStore from "@/stores/useOSCoreStore";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

const useOSAccount = () => {
  const { status, setAccountStatus } = useOSCoreStore(
    useShallow((state) => ({
      status: state.accountStatus,
      setAccountStatus: state.setAccountStatus,
    }))
  );

  const login = useCallback(
    () => setAccountStatus("LOGIN"),
    [setAccountStatus]
  );
  const logout = useCallback(
    () => setAccountStatus("LOGOUT"),
    [setAccountStatus]
  );
  const lock = useCallback(() => setAccountStatus("LOCK"), [setAccountStatus]);

  return {
    status,
    lock,
    login,
    logout,
  };
};

export default useOSAccount;
