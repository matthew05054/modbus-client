import {
    Stack,
    Button,
  } from "@mui/material";
  
  import Papa from "papaparse";
  
  import useDeviceStore from "../store/deviceStore";
  
  export default function Toolbar() {
    const devices = useDeviceStore(
      (s) => s.devices
    );
  
    const registers = useDeviceStore(
      (s) => s.registers
    );
  
    const addDevice = useDeviceStore(
      (s) => s.addDevice
    );
  
    const addRegister = useDeviceStore(
      (s) => s.addRegister
    );
  
    const exportDevices = () => {
      const csv = Papa.unparse(devices);
  
      download(csv, "devices.csv");
    };
  
    const exportRegisters = () => {
      const csv = Papa.unparse(registers);
  
      download(csv, "registers.csv");
    };
  
    const download = (csv, filename) => {
      const blob = new Blob([csv], {
        type: "text/csv",
      });
  
      const link =
        document.createElement("a");
  
      link.href =
        URL.createObjectURL(blob);
  
      link.download = filename;
  
      link.click();
    };
  
    const importDevices = (e) => {
      const file = e.target.files?.[0];
  
      if (!file) return;
  
      Papa.parse(file, {
        header: true,
  
        complete: (results) => {
          results.data.forEach((row) => {
            addDevice({
              id:
                row.id ||
                crypto.randomUUID(),
  
              name: row.name,
  
              ip: row.ip,
  
              port: Number(row.port),
  
              slaveId: Number(
                row.slaveId
              ),
  
              status:
                row.status ||
                "disconnected",
            });
          });
        },
      });
    };
  
    const importRegisters = (e) => {
      const file = e.target.files?.[0];
  
      if (!file) return;
  
      Papa.parse(file, {
        header: true,
  
        complete: (results) => {
          results.data.forEach((row) => {
            addRegister({
              id:
                row.id ||
                crypto.randomUUID(),
  
              deviceId: row.deviceId,
  
              functionCode:
                row.functionCode,
  
              address: row.address,
  
              dataType: row.dataType,
  
              value: row.value,
  
              pollingInterval:
                row.pollingInterval,
  
              description:
                row.description,
            });
          });
        },
      });
    };
  
    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, mb: 2 }}
      >
        <Button
          variant="outlined"
          onClick={exportDevices}
        >
          Export Devices
        </Button>
  
        <Button
          variant="outlined"
          component="label"
        >
          Import Devices
  
          <input
            hidden
            type="file"
            accept=".csv"
            onChange={importDevices}
          />
        </Button>
  
        <Button
          variant="outlined"
          onClick={exportRegisters}
        >
          Export Registers
        </Button>
  
        <Button
          variant="outlined"
          component="label"
        >
          Import Registers
  
          <input
            hidden
            type="file"
            accept=".csv"
            onChange={importRegisters}
          />
        </Button>
      </Stack>
    );
  }