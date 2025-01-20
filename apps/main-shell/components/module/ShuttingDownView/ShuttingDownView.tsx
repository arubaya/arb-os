"use client";

import useChooseOS from "@/hooks/useChooseOS";
import classNames from "classnames";
import { useEffect, useState } from "react";

import { ShutDownView as WindowsShutDownView } from "@os-repo/windows/boot";
import useMachine from "@/hooks/useMachine";

const shutDownView = {
  WINDOWS: WindowsShutDownView,
  LINUX: WindowsShutDownView,
  MAC: WindowsShutDownView,
};

export default function ShuttingDownView() {
  const { os } = useChooseOS();
  const { turnOffMachine } = useMachine();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut1 = setTimeout(() => {
      setLoading(true);
    }, 1000);
    const timeOut = setTimeout(() => {
      setLoading(false);
      turnOffMachine();
    }, 7000);

    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut);
    };
  }, []);

  const ShutDownComponent = shutDownView[os];

  return (
    <div
      className={classNames(
        "transition-all w-full flex justify-center items-center min-h-screen",
        {
          "opacity-0": !loading,
          "opacity-100 ": loading,
        }
      )}
    >
      {ShutDownComponent && <ShutDownComponent />}
    </div>
  );
}
