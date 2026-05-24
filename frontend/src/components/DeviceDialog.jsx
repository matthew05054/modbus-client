import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Stack,
    Button,
  } from "@mui/material";
  
  import { useState } from "react";
  
  import { v4 as uuid } from "uuid";
  
  import useDeviceStore from "../store/deviceStore";
  
  export default function DeviceDialog({
    open,
    onClose,
  }) {
    const addDevice = useDeviceStore(
      (s) => s.addDevice
    );
  
    const [form, setForm] = useState({
      name: "",
      ip: "",
      port: 502,
      slaveId: 1,
    });
  
    const handleSubmit = () => {
      addDevice({
        id: uuid(),
        ...form,
        status: "disconnected",
      });
  
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Add Device
        </DialogTitle>
  
        <DialogContent>
          <Stack
            spacing={2}
            sx={{ mt: 2, width: 400 }}
          >
            <TextField
              label="Device Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
  
            <TextField
              label="IP Address"
              onChange={(e) =>
                setForm({
                  ...form,
                  ip: e.target.value,
                })
              }
            />
  
            <TextField
              label="Port"
              type="number"
              value={form.port}
              onChange={(e) =>
                setForm({
                  ...form,
                  port: Number(
                    e.target.value
                  ),
                })
              }
            />
  
            <TextField
              label="Slave ID"
              type="number"
              value={form.slaveId}
              onChange={(e) =>
                setForm({
                  ...form,
                  slaveId: Number(
                    e.target.value
                  ),
                })
              }
            />
  
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </Button>
  
            <Button onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }