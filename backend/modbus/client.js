import ModbusRTU from "modbus-serial";

const client = new ModbusRTU();

// CONNECT TO MODBUS SERVER
export async function connectClient() {

  await client.connectTCP(
    "127.0.0.1",
    {
      port: 1502,
    }
  );

  client.setID(1);

  console.log(
    "Modbus Client Connected"
  );
}

// POLL DATA
export async function pollData() {

  const data =
    await client.readHoldingRegisters(
      0,
      10
    );

  return data.data;
}