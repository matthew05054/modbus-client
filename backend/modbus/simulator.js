import ModbusRTU from "modbus-serial";

export function startSimulator() {

  const vector = {

    getHoldingRegister(addr) {

      // Convert Modbus offset
      // 0 -> 40001

      const realAddress =
        40001 + addr;

      const value =
        global.registerMap[
          realAddress
        ];

      console.log(
        "READ:",
        realAddress,
        value
      );

      return value || 0;
    },
  };

  new ModbusRTU.ServerTCP(
    vector,
    {
      host: "0.0.0.0",
      port: 1502,
      debug: true,
    }
  );

  console.log(
    "Modbus Simulator Started"
  );
}