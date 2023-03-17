import { Box } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Headers from "./Headers";

interface Props {
  isSignedIn: boolean;
}
const Layout: FC<Props> = ({ isSignedIn }) => {
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
      <Box
        py={2}
        m="auto"
        boxSizing={"content-box"}
        maxWidth={{ xs: "100vw", sm: "lg" }}
      >
        {isSignedIn && <Outlet />}
      </Box>
    </div>
  );
};

export default Layout;
