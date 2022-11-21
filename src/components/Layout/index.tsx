import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Headers";

const Layout = () => {
  return (
    <div>
      <header>
        <Headers />
      </header>
      <Box py={2} m="auto" boxSizing={"content-box"} maxWidth={{ xs:"100vw", sm: "lg" }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
