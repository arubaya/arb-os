"use client";

import useChooseOS from "@/hooks/useChooseOS";
import classNames from "classnames";
import { useEffect, useState } from "react";
import OSLogo from "@/public/logo-icon.png";
import Image from "next/image";

import { BootView as WindowsBootView } from "@os-repo/windows/boot";
import useMachine from "@/hooks/useMachine";

const bootView = {
  WINDOWS: WindowsBootView,
  LINUX: WindowsBootView,
  MAC: WindowsBootView,
};

export default function BootingView() {
  const { os } = useChooseOS();
  const { shutDownMachine } = useMachine();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut1 = setTimeout(() => {
      setLoading(true);
    }, 1000);
    const timeOut = setTimeout(() => {
      setLoading(false);
      shutDownMachine();
    }, 7000);

    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut);
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
