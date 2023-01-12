import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Headers from "./Headers";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome");
    }
  }, []);
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
