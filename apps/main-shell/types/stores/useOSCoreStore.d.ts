type OsType = "WINDOWS" | "MAC" | "LINUX";
type MachineStatusType =
  | "MACHINEOFF"
  | "MACHINEON"
  | "MACHINESLEEP"
  | "MACHINEBOOT"
  | "MACHINESHUTDOWN"
  | "MACHINERESTART";

type OSAccountStatusType = "LOCK" | "LOGOUT" | "LOGIN";

type OSCoreState = {
  os: OsType;
  hydrated: boolean;
  machineStatus: MachineStatusType;
};

type OSCoreActions = {
  setOS: (type: OsType) => void;
  setMachineStatus: (status: MachineStatusType) => void;
  setHydrated: () => void;
};

type OSCoreStore = OSCoreState & OSCoreActions;
