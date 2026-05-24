import { create } from "zustand";

import { db } from "../services/db";

const useDeviceStore = create((set, get) => ({
  devices: [],
  registers: [],

  // LOAD FROM INDEXED DB
  loadData: async () => {
    const devices =
      await db.getDevices();

    const registers =
      await db.getRegisters();

    set({
      devices,
      registers,
    });
  },

  // ADD DEVICE
  addDevice: async (device) => {
    const updatedDevices = [
      ...get().devices,
      device,
    ];

    set({
      devices: updatedDevices,
    });

    await db.saveDevices(
      updatedDevices
    );
  },

  // REMOVE DEVICE
  removeDevice: async (id) => {
    const updatedDevices =
      get().devices.filter(
        (d) => d.id !== id
      );

    set({
      devices: updatedDevices,
    });

    await db.saveDevices(
      updatedDevices
    );
  },

  // ADD REGISTER
  addRegister: async (
    register
  ) => {
    const updatedRegisters = [
      ...get().registers,
      register,
    ];

    set({
      registers:
        updatedRegisters,
    });

    await db.saveRegisters(
      updatedRegisters
    );
  },

  // UPDATE REGISTER
  updateRegister: async (
    updatedRegister
  ) => {
    const updatedRegisters =
      get().registers.map((r) =>
        r.id === updatedRegister.id
          ? updatedRegister
          : r
      );

    set({
      registers:
        updatedRegisters,
    });

    await db.saveRegisters(
      updatedRegisters
    );
  },

  // REMOVE REGISTER
  removeRegister: async (
    id
  ) => {
    const updatedRegisters =
      get().registers.filter(
        (r) => r.id !== id
      );

    set({
      registers:
        updatedRegisters,
    });

    await db.saveRegisters(
      updatedRegisters
    );
  },
}));

export default useDeviceStore;