import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React, { FC, useContext } from "react";
import { HeaderTextStyle } from "./Layout/styledComponents";
import "./loginDashboard.css";

import { Link } from "react-router-dom";
import { LoaderContext } from "../App";
import Footer from "./Layout/Footer";
import Inplay from "../Pages/InPlay/Inplay";

interface Props {
  isSignedIn: boolean;
}

const LoginDashboard: FC<Props> = ({ isSignedIn }) => {
  const { appData } = useContext(LoaderContext);

  return (
    <Box height={"100vh"} display="flex" flexDirection={"column"}>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#757ce8" }}
        enableColorOnDark
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <IconButton title="Go back" onClick={() => navigation(-1)}>
            <KeyboardBackspaceIcon fontSize="large" htmlColor="white" />
          </IconButton> */}
          <h3>Exchange</h3>
          <Box>
            <HeaderTextStyle></HeaderTextStyle>
            <HeaderTextStyle></HeaderTextStyle>
            <HeaderTextStyle>
              {/* Liability: { wallet.libality} */}
            </HeaderTextStyle>
          </Box>
          <div style={{ display: "flex" }}>
            <Button
              sx={{ fontSize: "0.7rem" }}
              variant="contained"
              color="primary"
            >
              <Link to={"/sign-in"}>Login</Link>
            </Button>
            {appData?.selfAllowed && (
              <Button
                sx={{ fontSize: "0.7rem" }}
                style={{ marginLeft: "10px" }}
                variant="contained"
                color="secondary"
              >
                <Link to={"/sign-up"}>Sign Up</Link>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Box flex={1} height={"max-content"}>
        <Inplay />
      </Box>
      <Footer isSignedIn={isSignedIn} />
    </Box>
  );
};

export default LoginDashboard;
