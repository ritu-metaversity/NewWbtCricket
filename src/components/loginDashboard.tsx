import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
// import { HeaderTextStyle } from "./Layout/styledComponents";
import "./loginDashboard.css";

import { Link, useNavigate } from "react-router-dom";
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
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [selfAllowedd, SetselfAllowedd] = useState();
  useEffect(() => {
    let appUrll = window.location.hostname.replace('www.','');
    // let appUrll = "localhost";
    axios
      .post(
        `${REACT_APP_API_URL}/login/is-self-by-app-url`,
        { appUrl: appUrll }
      )
      .then((res) => {
        console.log(res, "dadasdas")
        SetselfAllowedd(res?.data?.data?.logo);
      });
  }, []);

  const handleLoginBtn = () => {
    navigate("/sign-in")
  }
  const handleSignUpBtn = () => {
    navigate("/sign-up")
  }
  return (
    <Box display="flex" flexDirection={"column"}>
      <div className="main_header"
        style={{ backgroundColor: colorHex.bg2, position: "sticky" }}>

        {/* <h3> */}
        <img
          alt=""
          src={selfAllowedd}
          className="logo w_logo"
          style={{ maxWidth: "180px", height: "40px" }}
        />
        {/* </h3> */}
        <div className="Login_btnnnnss">

          <div style={{ display: "flex" }}>
            <Button
              sx={{ fontSize: "0.7rem", color: "black" }}
              variant="contained"

              onClick={handleLoginBtn}
            >
              Login
            </Button>
            {appData?.selfAllowed && (
              <Button
                sx={{ fontSize: "0.7rem", color: "black" }}
                style={{ marginLeft: "10px" }}
                variant="contained"
                color="secondary"
                onClick={handleSignUpBtn}
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>

      </div>

      <Box flex={1} height={"max-content"} >
        <Sports />
      </Box>
      {/* <Footer isSignedIn={isSignedIn} /> */}
    </Box >
  );
};

export default LoginDashboard;
