import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    IconButton,
  } from "@mui/material";
  
  import DeleteIcon from "@mui/icons-material/Delete";
  
  import useDeviceStore from "../store/deviceStore";
  
  import StatusChip from "./StatusChip";
  
  import api from "../api/api";
  
  export default function DeviceTable() {
    const devices = useDeviceStore(
      (s) => s.devices
    );
  
    const removeDevice = useDeviceStore(
      (s) => s.removeDevice
    );
  
    const connectDevice = async (
      device
    ) => {
      try {
        await api.post("/connect", device);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>IP</TableCell>
            <TableCell>Port</TableCell>
            <TableCell>Slave ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
  
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>
                {device.name}
              </TableCell>
  
              <TableCell>
                {device.ip}
              </TableCell>
  
              <TableCell>
                {device.port}
              </TableCell>
  
              <TableCell>
                {device.slaveId}
              </TableCell>
  
              <TableCell>
                <StatusChip
                  status={device.status}
                />
              </TableCell>
  
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() =>
                    connectDevice(device)
                  }
                >
                  Connect
                </Button>
  
                <IconButton
                  color="error"
                  onClick={() =>
                    removeDevice(
                      device.id
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }