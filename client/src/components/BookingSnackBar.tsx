import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface BookingSnackbarProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
}

const BookingSnackbar: React.FC<BookingSnackbarProps> = ({
  open,
  onClose,
  message,
}: BookingSnackbarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BookingSnackbar;
