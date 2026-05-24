import { get, set } from "idb-keyval";

const DEVICES_KEY = "devices";
const REGISTERS_KEY = "registers";

export const db = {
  // DEVICES
  async saveDevices(devices) {
    await set(
      DEVICES_KEY,
      devices
    );
  },

  async getDevices() {
    return (
      (await get(
        DEVICES_KEY
      )) || []
    );
  },

  // REGISTERS
  async saveRegisters(
    registers
  ) {
    await set(
      REGISTERS_KEY,
      registers
    );
  },

  async getRegisters() {
    return (
      (await get(
        REGISTERS_KEY
      )) || []
    );
  },
};