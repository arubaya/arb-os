"use client";

import useOSCoreStore from "@/stores/useOSCoreStore";
import { useShallow } from "zustand/shallow";
import useMachine from "../useMachine";

const useChooseOS = () => {
  const { os, setOS } = useOSCoreStore(
    useShallow((state) => ({
      os: state.os,
      setOS: state.setOS,
    }))
  );

  const { bootMachine } = useMachine();

  const launchOS = (type: OsType) => {
    setOS(type);
    bootMachine();
  };

  return { os, launchOS };
};

export default useChooseOS;
