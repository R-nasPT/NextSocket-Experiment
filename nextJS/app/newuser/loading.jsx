import { Box, LinearProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "100vh",
        marginTop: "70px",
      }}
    >
      <LinearProgress sx={{ marginTop: "100px" }} />
    </Box>
  );
}
