"use client";

import useChooseOS from "@/hooks/useChooseOS";
import classNames from "classnames";
import { useEffect, useState } from "react";

import { ShutDownView as WindowsShutDownView } from "@os-repo/windows/boot";
import useMachine from "@/hooks/useMachine";
import {
  END_LOADING_TIMEOUT,
  START_LOADING_TIMEOUT,
} from "@/constants/stores/time";

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
    const timeOutLoadingStart = setTimeout(() => {
      setLoading(true);
    }, START_LOADING_TIMEOUT);
    const timeOutLoadingEnd = setTimeout(() => {
      setLoading(false);
      turnOffMachine();
    }, END_LOADING_TIMEOUT);

    return () => {
      clearTimeout(timeOutLoadingStart);
      clearTimeout(timeOutLoadingEnd);
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
