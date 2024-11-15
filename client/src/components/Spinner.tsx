import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Spinner: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Spinner;
