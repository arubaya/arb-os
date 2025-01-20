"use client";

import BootingView from "@/components/module/BootingView";
import LandingPage from "@/components/module/LandingPage";
import ShuttingDownView from "@/components/module/ShuttingDownView";
import useChooseOS from "@/hooks/useChooseOS";
import useMachine from "@/hooks/useMachine/useMachine";
import classNames from "classnames";

export default function Home() {
  const { status } = useMachine();
  const { os } = useChooseOS();

  return (
    <>
      {status === "MACHINEOFF" && <LandingPage />}
      <div
        className={classNames({
          "font-windows": os === "WINDOWS",
          "font-linux": os === "LINUX",
        })}
      >
        {status === "MACHINEBOOT" && <BootingView />}
        {status === "MACHINESHUTDOWN" && <ShuttingDownView />}
      </div>
    </>
  );
}
