"use client";

import useChooseOS from "@/hooks/useChooseOS";
import classNames from "classnames";
import { useEffect, useState } from "react";
import OSLogo from "@/public/logo-icon.png";
import Image from "next/image";

import { BootView as WindowsBootView } from "@os-repo/windows/boot";
import useMachine from "@/hooks/useMachine";
import {
  END_LOADING_TIMEOUT,
  START_LOADING_TIMEOUT,
} from "@/constants/stores/time";

const bootView = {
  WINDOWS: WindowsBootView,
  LINUX: WindowsBootView,
  MAC: WindowsBootView,
};

export default function BootingView() {
  const { os } = useChooseOS();
  const { turnOnMachine } = useMachine();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOutLoadingStart = setTimeout(() => {
      setLoading(true);
    }, START_LOADING_TIMEOUT);
    const timeOutLoadingEnd = setTimeout(() => {
      setLoading(false);
      turnOnMachine();
    }, END_LOADING_TIMEOUT);

    return () => {
      clearTimeout(timeOutLoadingStart);
      clearTimeout(timeOutLoadingEnd);
    };
  }, []);

  const BootComponent = bootView[os];

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
      {BootComponent && (
        <BootComponent logo={<Image height={100} src={OSLogo} alt="ArbOS" />} />
      )}
    </div>
  );
}
