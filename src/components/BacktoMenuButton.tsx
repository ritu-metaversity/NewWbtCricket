import { Box, Button } from "@mui/material";
import React from "react";

const BacktoMenuButton = () => {
  return (
    <Box m={3}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          border: "1px solid black",
          p: 1,
          fontSize: "1.2rem",
          fontWeight: 700,
        }}
        href="/"
      >
        Back to Main Menu{" "}
      </Button>
    </Box>
  );
};

export default BacktoMenuButton;
