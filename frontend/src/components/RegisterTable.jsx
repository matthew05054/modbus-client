import { AgGridReact } from "ag-grid-react";

import useDeviceStore from "../store/deviceStore";

import { useMemo, useState } from "react";

import {
  Stack,
  Select,
  MenuItem,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

// AG GRID CSS
// import "ag-grid-community/styles/ag-theme-alpine.css";

export default function RegisterTable() {
  const devices = useDeviceStore(
    (s) => s.devices
  );

  const registers = useDeviceStore(
    (s) => s.registers
  );

  const addRegister = useDeviceStore(
    (s) => s.addRegister
  );

  const updateRegister = useDeviceStore(
    (s) => s.updateRegister
  );

  const removeRegister = useDeviceStore(
    (s) => s.removeRegister
  );

  const [
    selectedDevice,
    setSelectedDevice,
  ] = useState("");

  const [newRegister, setNewRegister] =
    useState({
      functionCode: "",
      address: "",
      dataType: "",
      value: "",
      pollingInterval: "",
      description: "",
    });

  // FILTER REGISTERS
 // FILTER REGISTERS
const filteredRegisters =
useMemo(() => {

  // SHOW ALL REGISTERS INITIALLY
  if (!selectedDevice) {
    return registers;
  }

  // SHOW ONLY SELECTED DEVICE REGISTERS
  return registers.filter(
    (r) =>
      String(r.deviceId) ===
      String(selectedDevice)
  );

}, [registers, selectedDevice]);

  // ADD REGISTER
  const handleAddRegister =
    async () => {
      if (!selectedDevice) {
        alert(
          "Please select device"
        );

        return;
      }

      await addRegister({
        id: crypto.randomUUID(),

        deviceId:
          selectedDevice,

        functionCode:
          newRegister.functionCode,

        address:
          newRegister.address,

        dataType:
          newRegister.dataType,

        value:
          newRegister.value,

        pollingInterval:
          newRegister.pollingInterval,

        description:
          newRegister.description,
      });

      // RESET FORM
      setNewRegister({
        functionCode: "",
        address: "",
        dataType: "",
        value: "",
        pollingInterval: "",
        description: "",
      });
    };

  // GRID COLUMNS
  const columns = [
    {
      field: "functionCode",
      headerName:
        "Function Code",
      editable: true,
      width: 150,
    },

    {
      field: "address",
      editable: true,
      width: 120,
    },

    {
      field: "dataType",
      headerName:
        "Data Type",
      editable: true,
      width: 150,
    },

    {
      field: "value",
      editable: true,
      width: 120,
    },

    {
      field: "pollingInterval",
      headerName: "Polling",
      editable: true,
      width: 130,
    },

    {
      field: "description",
      editable: true,
      flex: 1,
    },

    {
      headerName: "Actions",

      width: 140,

      cellRenderer: (
        params
      ) => (
        <Button
          color="error"
          variant="outlined"
          startIcon={
            <DeleteIcon />
          }
          onClick={() =>
            removeRegister(
              params.data.id
            )
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Registers
      </Typography>

      {/* DEVICE SELECT */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Select
          value={
            selectedDevice
          }
          onChange={(e) =>
            setSelectedDevice(
              e.target.value
            )
          }
          displayEmpty
          sx={{
            minWidth: 250,
          }}
        >
          <MenuItem value="">
            Select Device
          </MenuItem>

          {devices.map((d) => (
            <MenuItem
              key={d.id}
              value={d.id}
            >
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {/* ADD REGISTER FORM */}
      {selectedDevice && (
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          sx={{ mb: 3 }}
        >
          <TextField
            label="Function Code"
            value={
              newRegister.functionCode
            }
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                functionCode:
                  e.target.value,
              })
            }
          />

          <TextField
            label="Address"
            value={
              newRegister.address
            }
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                address:
                  e.target.value,
              })
            }
          />

          <TextField
            label="Data Type"
            value={
              newRegister.dataType
            }
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                dataType:
                  e.target.value,
              })
            }
          />

          <TextField
            label="Value"
            value={
              newRegister.value
            }
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                value:
                  e.target.value,
              })
            }
          />

          <TextField
            label="Polling Interval"
            value={
              newRegister.pollingInterval
            }
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                pollingInterval:
                  e.target.value,
              })
            }
          />

          <TextField
            label="Description"
            value={
              newRegister.description
            }
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                description:
                  e.target.value,
              })
            }
          />

          <Button
            variant="contained"
            onClick={
              handleAddRegister
            }
          >
            Add Register
          </Button>
        </Stack>
      )}

      {/* AG GRID */}
      <div
        className="ag-theme-alpine"
        style={{
          height: 450,
          width: "100%",
        }}
      >
        <Typography>
  Total Registers:
  {filteredRegisters.length}
</Typography>
        <AgGridReact
          rowData={
            filteredRegisters
          }
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          onCellValueChanged={(
            params
          ) =>
            updateRegister(
              params.data
            )
          }
        />
      </div>
    </div>
  );
}