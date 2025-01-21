"use client";

import { LOCK_ON_LOGIN_TIMEOUT } from "@/constants/stores/time";
import useChooseOS from "@/hooks/useChooseOS";
import useMachine from "@/hooks/useMachine";
import useOSAccount from "@/hooks/useOSAccount";

import { LockScreenView as WindowsLockScreenView } from "@os-repo/windows/auth";
import { useEffect } from "react";

const lockView = {
  WINDOWS: WindowsLockScreenView,
  LINUX: WindowsLockScreenView,
  MAC: WindowsLockScreenView,
};

export default function OSLockView() {
  const { os } = useChooseOS();
  const { status, login, lock } = useOSAccount();
  const { shutDownMachine } = useMachine();

  const LockComponent = lockView[os];

  let timer: NodeJS.Timeout;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      lock();
    }, LOCK_ON_LOGIN_TIMEOUT);
  };

  useEffect(() => {
    if (status === "LOGIN") {
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("scroll", resetTimer);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [lock, status]);

  return (
    <>
      {LockComponent && (
        <LockComponent
          imageName="LIGHTBLUE"
          onUnlock={login}
          isUnlocked={status === "LOGIN"}
          onShutDown={shutDownMachine}
        />
      )}
    </>
  );
}
