import Chip from "@mui/material/Chip";

export default function StatusChip({
  status,
}) {
  const color =
    status === "connected"
      ? "success"
      : status === "connecting"
      ? "warning"
      : "error";

  return (
    <Chip
      label={status}
      color={color}
    />
  );
}