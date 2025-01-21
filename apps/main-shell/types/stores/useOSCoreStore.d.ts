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
  accountStatus: OSAccountStatusType;
};

type OSCoreActions = {
  setOS: (type: OsType) => void;
  setMachineStatus: (status: MachineStatusType) => void;
  setAccountStatus: (status: OSAccountStatusType) => void;
  setHydrated: () => void;
};

type OSCoreStore = OSCoreState & OSCoreActions;
