import {
    Dialog,
    DialogTitle,
    Button,
    Stack,
  } from "@mui/material";
  
  import Papa from "papaparse";
  import useDeviceStore from "../store/deviceStore";
  
  export default function RegisterUploadDialog({
    open,
    onClose,
    device,
  }) {
    const addRegister = useDeviceStore(
      (s) => s.addRegister
    );
  
    const importCSV = (e) => {
      const file = e.target.files?.[0];
      if (!file || !device) return;
  
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
  
        complete: (res) => {
          console.log("CSV DATA:", res.data);
  
          res.data.forEach((row) => {
            if (!row.address) return;
  
            addRegister({
              id: crypto.randomUUID(),
  
              deviceId: device.id,
  
              functionCode: Number(row.functionCode),
              address: Number(row.address),
              dataType: row.dataType,
              value:
                row.value === ""
                  ? 0
                  : Number(row.value),
  
              pollingInterval: Number(
                row.pollingInterval || 1000
              ),
  
              description: row.description || "",
            });
          });
        },
      });
  
      e.target.value = "";
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Upload Registers for {device?.name}
        </DialogTitle>
  
        <Stack sx={{ p: 2 }}>
          <Button variant="contained" component="label">
            Upload CSV
  
            <input
              hidden
              type="file"
              accept=".csv"
              onChange={importCSV}
            />
          </Button>
        </Stack>
      </Dialog>
    );
  }