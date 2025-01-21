"use client";

import useOSCoreStore from "@/stores/useOSCoreStore";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

const useMachine = () => {
  const { status, setMachineStatus, setOS, setAccountStatus } = useOSCoreStore(
    useShallow((state) => ({
      status: state.machineStatus,
      setMachineStatus: state.setMachineStatus,
      setOS: state.setOS,
      setAccountStatus: state.setAccountStatus,
    }))
  );

  const bootMachine = useCallback(
    () => setMachineStatus("MACHINEBOOT"),
    [setMachineStatus]
  );
  const sleepMachine = useCallback(
    () => setMachineStatus("MACHINESLEEP"),
    [setMachineStatus]
  );
  const turnOnMachine = useCallback(
    () => setMachineStatus("MACHINEON"),
    [setMachineStatus]
  );
  const turnOffMachine = useCallback(
    () => setMachineStatus("MACHINEOFF"),
    [setMachineStatus]
  );
  const shutDownMachine = useCallback(() => {
    setMachineStatus("MACHINESHUTDOWN");
    // Do clean task manager and other OS state
    setAccountStatus("LOCK");
    setOS("WINDOWS");
  }, [setAccountStatus, setMachineStatus, setOS]);
  const restartMachine = useCallback(() => {
    setMachineStatus("MACHINERESTART");
    // Do clean task manager and other OS state
    // Then trigger boot machine
    setAccountStatus("LOCK");
    setMachineStatus("MACHINEBOOT");
  }, [setAccountStatus, setMachineStatus]);

  return {
    status,
    bootMachine,
    sleepMachine,
    turnOffMachine,
    turnOnMachine,
    shutDownMachine,
    restartMachine,
  };
};

export default useMachine;
