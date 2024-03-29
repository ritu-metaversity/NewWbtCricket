import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import snackBarUtil from "./Layout/snackBarUtil";
import "./Login.css"
import LoginIcon from '@mui/icons-material/Login';
import NewLogogooo from "./WBT99-2.png"
import Fotter from "./Fotter/Fotter";

// interface RegisterInterface {
//   username?: string;
//   password?: string;
// }

const Register = ({ setShow }) => {
  const [open, setOpen] = useState(false);
  const [newCredAfterRegister, setNewCredAfterRegister] = useState("");
  const navigate = useNavigate();
  // const [selfAllowedd, SetselfAllowedd] = useState();
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;

  const [password, setPassword] = useState(0);
  const [mobileNumber, setMobileNumber] = useState();
  const [UserName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [StatusVal, setStatusVal] = useState(true);
  const [StatusCode, setStatusCode] = useState();
  const [logo, setLogo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadinLogin, setLoadingLogin] = useState(false)
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const handleValidation = () => {
    console.log(password, confirmPassword, "kjhgfghj");
    if (UserName === "" && mobileNumber === 0 && password === 0) {
      setUserNameError("User Name is required");
      setPasswordError("Password is required.");
      setmobileNumberError("Mobile number must not be empty.");
      return false;
    } else if (UserName === "") {
      setUserNameError("User Name is required");
      return false;
    } else if (mobileNumber === 0 || mobileNumber === undefined) {
      setmobileNumberError("Mobile number must not be empty.");
      return false;
    } else if (password === 0) {
      setPasswordError("Password is required.");
      return false;
    } else if (confirmPassword === undefined) {
      setConfirmPasswordError("Confirm Password is required.");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Password must be equal.");
      return false;
    } else if (mobileNumber?.length !== 10) {
      return false;
    } else if (password === 0) {
      setPasswordError("Password is required.");
      return false;
    } else if (
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/
      ) === null
    ) {
      return false;
    } else if (UserName?.length < 4) {
      return false;
    } else if (UserName?.length > 8) {
      return false;
    } else if (UserName?.match(/^[a-zA-Z0-9]+$/) === null) {
      return false;
    } else if (password?.length < 8) {
      return false;
    } else if (password.length > 12) {
      return false;
    }
    return true;
  };

  const handlePassWordsValidation = (e) => {
    setPassword(e.target.value);
    const passData = e.target.value;
    if (passData === "") {
      setPasswordError("Password is required.");
    } else if (passData?.length < 8) {
      setPasswordError("Minimum 8 letters required.");
    } else if (passData?.length > 13) {
      setPasswordError("Maximum 12 letters required");
    } else if (
      passData?.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#!%*?&_]{8,12}$/
      ) === null
    ) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else if (passData === confirmPassword) {
      setConfirmPasswordError("")
    } else {
      setPasswordError("");
    }
  };
  const handleConfirmPasswordsValidation = (e) => {
    setConfirmPassword(e.target.value);
    const confirmPass = e.target.value;
    if (password !== confirmPass) {
      setConfirmPasswordError("Password must be equal.");
    } else {
      setConfirmPasswordError("");
    }
  };


  const handleMobileNumber = (e) => {
    // if()
    // console.log(e.target.value, "luhbnoihb")
    // if (e.target.value >= 10) {

    console.log(e.target.value.match(/^[0-9]{0,40}$/) !== null, "lkjhgfdghj");
    if ((e.target.value.match(/^[0-9]{0,40}$/) !== null) === true) {

      if (e.target.value.match(/^[0-9]{0,40}$/) !== null) {

        setMobileNumber(e.target.value);
      }
      if (e.target.value.match(/^[0-9]{0,10}$/) === "") {
        setmobileNumberError("Mobile number must not be empty.");
      } else if (e.target.value?.length !== 10) {
        setmobileNumberError("Mobile number must be 10 digit number");
      } else {
        setmobileNumberError("");
      }
    } else {
      setMobileNumber("")
    }
    // }

  };


  const handleUserName = (e) => {
    setUserName(e.target.value);

    const userData = e.target.value;
    if (userData === "") {
      setUserNameError("User Name is required");
    } else if (userData?.length < 4) {
      setUserNameError("Minimum 4 letters required.");
    } else if (userData?.length > 8) {
      setUserNameError("Maximum 8 letters required.");
    } else if (userData?.match(/^[a-zA-Z0-9]+$/) === null) {
      setUserNameError("Only number and alphabet are allowed.");
    } else {
      setUserNameError("");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true)

    setStatusVal(true);
    if (handleValidation()) {

      axios
        .post(
          `${REACT_APP_API_URL}/user/self-register`,
          {
            appUrl: window.location.hostname.replace('www.',''),
            username: UserName,
            password: password,
            confirmPassword: confirmPassword,
            mobile: mobileNumber,
            userId: UserName,
            casinoComm: allData?.data?.casinoComm,
            fancyComm: allData?.data?.fancyComm,
            oddsComm: allData?.data?.oddsComm
          }
        )
        .then((res) => {
          if (res?.status) {
            console.log(res, "dfsgdshfjgkhfghdgdf");

            if (res?.data?.token) {
              localStorage.setItem("token", res?.data?.token);
              localStorage.setItem("userid", res?.data?.userId);
              localStorage.setItem("passwordType", res?.data?.passwordtype);
              snackBarUtil.success("login successful");
              navigate("/");

              setShow(true)

            } else {
              setOpen(true)
              setLoadingLogin(false)
              setNewCredAfterRegister(res?.data);
            }
          } else {
            snackBarUtil.error(res?.data?.message);
            console.log("loadinLogin")
            setLoadingLogin(false)


          }
        })
        .catch((error) => {
          console.log(error, "loadinLogin")
          setLoadingLogin(false)

          snackBarUtil.error(error.response.data.message);
          // setStatusCode(error.response.status);
          // setErrorMsg(error.response.data.message);
          // setStatusVal(false);
          // setAlertBtnColor("danger");
        });
    }
  };

  const [allData, setAllData] = useState()

  useEffect(() => {
    let appUrll = window.location.hostname.replace('www.','');
    // let appUrll = "maggibook.com";
    axios
      .post(
        `${REACT_APP_API_URL}/login/is-self-by-app-url`,
        { appUrl: appUrll }
      )
      .then((res) => {
        console.log(res, "dadasdas")
        setAllData(res?.data)
        // SetselfAllowedd(res?.data?.data?.logo);
        setLogo(res?.data?.data?.logo);
        // setStatusBtn(res?.data?.data?.selfAllowed);
        // setIsDemoIdLoginAllowed(res?.data?.data?.isDemoIdLoginAllowed)
        if (res?.data?.data?.selfAllowed === false) {

          navigate("/sign-in")
        } else {

        }
      });
  }, []);


  const popupClose = (vl) => {
    setStatusVal(!vl);
  };
  const handleClickLogin = () => {
    navigate("/sign-in")

  }



  return (
    <Box
    // // maxWidth={"450px"}
    // mx="auto"
    // mb="2em"
    // p="2em"
    // display={"flex"}
    // flexDirection="column"
    // gap={"1.5em"}
    >
      <Dialog
        onClose={() => {
          setOpen(false); navigate("/sign-in", { replace: true });
        }}
        open={open}
      >
        <DialogContent>
          <Grid container my={2} py={2} px={2} borderRadius={1} rowGap={6}>
            <Grid item xs={6}>
              Username:
            </Grid>
            <Grid item xs={6}>
              {newCredAfterRegister?.username}
            </Grid>
            <Grid item xs={6}>
              Password:
            </Grid>
            <Grid item xs={6}>
              {newCredAfterRegister?.password}
            </Grid>
          </Grid>
          <Typography color="error.main">
            Please save these details and login with this username and password.
          </Typography>
        </DialogContent>
      </Dialog>
      <div className="loginBackground new-login-content" style={{ overflow: "scroll" }}>
        <div className="logo-img">
          <img src={logo} alt="" className="logoimgggggg" />
        </div>
        <div className="login-form">
          <span className="login-text">Sign up </span>
          <form onSubmit={handleLogin} className="login-form-newww">

            <input className="sign-Input"
              required
              placeholder="User Name"
              name="username"
              value={UserName}

              // value={register?.username}
              onChange={handleUserName}
            />
            <label style={{ color: "red" }}>{userNameError}</label>
            <input className="sign-Input"
              required
              name="mobile"
              placeholder="Mobile No"
              // type="number"
              value={mobileNumber}
              max="10"
              onChange={handleMobileNumber}

            // onKeyDown={(e) =>
            //   symbolsArrMail.includes(e.key) && e.preventDefault()
            // } 
            />
            <label style={{ color: "red" }}>{mobileNumberError}</label>

            <input className="sign-Input"
              required
              name="password"
              placeholder="Password"
              type="password"
              // value={register?.password}
              onChange={handlePassWordsValidation}
            />
            <label style={{ color: "red" }}>{passwordError}</label>

            <input className="sign-Input"
              required
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              // value={register?.confirmPassword}
              onChange={handleConfirmPasswordsValidation}
            />
            <label style={{ color: "red" }}>{confirmPasswordError}</label>
            <div className='comm-data-new'>
              {allData?.data?.oddsComm === 0 ?

                "" :
                <span>
                  <label style={{ color: "#002776", fontSize: "12px", width: "100%", textAlign: "left" }}>Odds Comm..</label>
                  <input value={allData?.data?.oddsComm} disabled style={{ width: "100%" }} />
                </span>
              }

              {allData?.data?.fancyComm === 0 ?

                "" :
                <span>
                  <label style={{ color: "#002776", fontSize: "12px", width: "100%", textAlign: "left" }}>Fancy Comm..</label>
                  <input placeholder={allData?.data?.fancyComm} disabled style={{ width: "100%" }} />
                </span>}
              {allData?.data?.casinoComm === 0 ?

                "" :
                <span>
                  <label style={{ color: "#002776", fontSize: "12px", width: "100%", textAlign: "left" }}>Casino Comm..</label>
                  <input placeholder={allData?.data?.casinoComm} disabled style={{ width: "100%" }} />
                </span>


              }

            </div>
            {/* <button className="login_loginnn" type="submit">

              {
                loadinLogin === true ?

                  <span className="loading-login">Loading...</span>
                  :
                  <>
                    <span>
                      Sign up
                    </span>
                    <LoginIcon style={{ fontSize: "18px" }} />
                  </>
              }
            </button> */}
          </form>

          <button className="login_loginnn" onClick={handleClickLogin}>
            <span> login </span>
            <LoginIcon style={{ rotate: "180deg", fontSize: "18px" }} />
          </button>
        </div>
      </div >
      <Fotter />
    </Box >
  );
};

export default Register;

