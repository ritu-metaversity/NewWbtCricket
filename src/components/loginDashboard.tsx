import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
// import { HeaderTextStyle } from "./Layout/styledComponents";
import "./loginDashboard.css";

import { Link } from "react-router-dom";
import { LoaderContext } from "../App";
// import Footer from "./Layout/Footer";
import { Sports } from "../Pages/Sports";
import { colorHex } from "../utils/constants";
import axios from "axios";

interface Props {
  isSignedIn: boolean;
}

const LoginDashboard: FC<Props> = ({ isSignedIn }) => {
  const { appData } = useContext(LoaderContext);

  const [selfAllowedd, SetselfAllowedd] = useState();
  useEffect(() => {
    let appUrll = window.location.hostname;
    // let appUrll = "localhost";
    axios
      .post(
        "https://api.247365.exchange/admin-new-apis/login/is-self-by-app-url",
        { appUrl: appUrll }
      )
      .then((res) => {
        console.log(res, "dadasdas")
        SetselfAllowedd(res?.data?.data?.logo);
      });
  }, []);
  return (
    <Box height={"100vh"} display="flex" flexDirection={"column"}>
      <div className="main_header"
        style={{ backgroundColor: colorHex.bg2, position: "sticky" }}>

        {/* <h3> */}
        <img
          alt=""
          src={selfAllowedd}
          className="logo w_logo"
          style={{ width: "120px", height: "40px" }}
        />
        {/* </h3> */}
        <div className="Login_btnnnnss">

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
        </div>

      </div>

      <Box flex={1} height={"max-content"}>
        <Sports />
      </Box>
      {/* <Footer isSignedIn={isSignedIn} /> */}
    </Box>
  );
};

export default LoginDashboard;
