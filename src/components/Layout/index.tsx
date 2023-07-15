import { Box } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Headers from "./Headers";

interface Props {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}
const Layout: FC<Props> = ({ isSignedIn, setIsSignedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome");
    }
  }, []);
  return (
    <Box
      // height={"100vh"}
      width={"100vw"}
      display="flex"
      flexDirection={"column"}
    >
      <header>
        <Headers setIsSignedIn={setIsSignedIn} />
      </header>
      <Box
        py={2}
        flex={1}
        m="auto"
        boxSizing={"content-box"}
        width="100%"
        bgcolor="#dddddd"
        paddingBottom={{ xs: "50px", sm: "50px", }}
        maxWidth={{ xs: "100vw", sm: "lg", }}

      >
        {(isSignedIn || localStorage.getItem("passwordType") === "old") && <Outlet />}
      </Box>
    </Box>
  );
};

export default Layout;
