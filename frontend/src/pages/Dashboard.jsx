import {
  Container,
  Typography,
  Button,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import DeviceDialog from "../components/DeviceDialog";

import DeviceTable from "../components/DeviceTable";

import RegisterTable from "../components/RegisterTable";

import Toolbar from "../components/Toolbar";

import useDeviceStore from "../store/deviceStore";

export default function Dashboard() {
  const [open, setOpen] =
    useState(false);

  const loadData = useDeviceStore(
    (s) => s.loadData
  );

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Modbus Simulator
      </Typography>

      <Button
        variant="contained"
        onClick={() =>
          setOpen(true)
        }
      >
        Add Device
      </Button>

      <Toolbar />

      <DeviceDialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />

      <DeviceTable />

      <RegisterTable />
    </Container>
  );
}