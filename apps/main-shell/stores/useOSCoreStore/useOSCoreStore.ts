import { persist } from "zustand/middleware";
import { OS_CORE_INITIAL_STATE } from "@/constants/stores/useOSCoreStore";
import { create } from "zustand";

const useOSCoreStore = create<OSCoreStore>()(
  persist(
    (set) => ({
      ...OS_CORE_INITIAL_STATE,
      setOS: (type) => set({ os: type }),
      setHydrated: () => set({ hydrated: true }),
      setMachineStatus: (status) => set({ machineStatus: status }),
      setAccountStatus: (status) => set({ accountStatus: status }),
    }),
    {
      name: "core-os",
      partialize: (state) => ({
        os: state.os,
        machineStatus: state.machineStatus,
        accountStatus: state.accountStatus,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export default useOSCoreStore;
