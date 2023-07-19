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
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import snackBarUtil from "./Layout/snackBarUtil";
import "./Login.css"
import LoginIcon from '@mui/icons-material/Login';

interface RegisterInterface {
  username?: string;
  password?: string;
}

const Register = () => {
  const [open, setOpen] = useState(false);
  const [newCredAfterRegister, setNewCredAfterRegister] = useState<RegisterInterface | null>(null);
  const navigate = useNavigate();
  const [selfAllowedd, SetselfAllowedd] = useState();

  const [register, setRegistration] = useState<any>({
    username: "",
    password: "",
    mobile: "",
    confirmPassword: "",
    appUrl: "",
  });
  //   const [password, setPassword] = useState("");
  const [symbolsArrMail] = useState(["e", "E", "+", "-", "."]);

  const [errorForall, setErrorForall] = useState("")
  const [useeerror, setUserNameError] = useState("")
  const [mobileerror, setmobileNumberError] = useState("")
  const [passworderror, setPasswordError] = useState("")
  const [confirmpassword, setConfirmPasswordError] = useState("")
  const handleClick = async () => {

    if (register.username === "" && register.mobile === "" && register.password === "" && register.confirmPassword === "") {
      return setErrorForall("Please enter all the mandatory details");
    } else if (register?.password !== "" && register?.mobile === "" && register?.username !== "" && register?.confirmPassword !== "") {
      return setErrorForall(" invalid mobile number");
    } else if (register?.password === "" && register?.mobile !== "" && register?.username !== "" && register?.confirmPassword !== "") {
      return setErrorForall("invalid password ");
    } else if (register?.password !== "" && register?.mobile !== "" && register?.username !== "" && register?.confirmPassword === "") {
      return setErrorForall("invalid Confirm password");
    } else if (register.password !== register.confirmPassword) {
      return setErrorForall("Password does not match!!");
    } else if ((register?.password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?#&_]{8,12}$/) ===
      null) === true) {
      return setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {
      const { response } = await authServices.registeration({
        ...register,
        userId: register.username,
      });

      if (response?.status) {
        snackBarUtil.success(response.message);
        setOpen(true);
        setNewCredAfterRegister(response);
        // navigate("/sign-in", { replace: true });
      } else {
      }
    }
  };

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
        if (res?.data?.data?.selfAllowed === false) {

          navigate("/sign-in")
        } else {

        }
      });
  }, []);

  const handleClickLogin = () => {
    navigate("/sign-in")

  }
  // const handleChange = (e: any) => {
  //   setRegistration({
  //     ...register,
  //     [e.target.name]: e.target.value,
  //     appUrl: window.location.hostname,
  //   });
  // };
  const handlePassWordsValidation = (e: any) => {
    setRegistration({
      username: register?.username,
      password: e.target.value,
      mobile: register?.mobile,
      confirmPassword: register?.confirmPassword,
      appUrl: window.location.hostname,
    })
    const passData = e.target.value;
    if (passData === "") {
      setPasswordError("Password is required.");
    } else if (passData?.length < 8) {
      setPasswordError("Minimum 8 letters required.");
    } else if (passData?.length > 13) {
      setPasswordError("Maximum 12 letters required");
    } else if (
      passData?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?#&_]{8,12}$/) ===
      null
    ) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {
      setPasswordError("")
    }
    console.log(passData?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?#&_]{8,12}$/) ===
      null, "uytgbnjiygbn")
  };



  // useEffect(() => {
  //   setPasswordError("")
  //   setmobileNumberError("")
  //   setUserNameError("")
  //   setConfirmPasswordError("")
  // }, [])

  const handleConfirmPasswordsValidation = (e: any) => {
    setRegistration({
      username: register?.username,
      password: register?.password,
      mobile: register?.mobile,
      confirmPassword: e.target.value,
      appUrl: window.location.hostname,
    })
    const confirmPass = e.target.value;
    if (register?.password !== confirmPass) {
      setConfirmPasswordError("Password must be equal.");
    } else {
      setConfirmPasswordError("")
    }
  };
  const handleMobileNumber = (e: any) => {
    setRegistration({
      username: register?.username,
      password: register?.password,
      mobile: e.target.value,
      confirmPassword: register?.confirmPassword,
      appUrl: window.location.hostname,
    })
    if (e.target.value === "") {
      setmobileNumberError("Mobile number must not be empty.");
    } else if (e.target.value?.length !== 10) {
      setmobileNumberError("Must be minimum 10 digit");
    } else {
      setmobileNumberError("")
    }
  };
  const handleUserName = (e: any) => {
    setRegistration({
      username: e.target.value,
      password: register?.password,
      mobile: register?.mobile,
      confirmPassword: register?.confirmPassword,
      appUrl: window.location.hostname,
    })
    // setUserName(e.target.value);
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
      setUserNameError("")
    }
  };











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
          setOpen(false);
          navigate("/sign-in", { replace: true });
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
      <div className="loginBackground new-login-content ">
        <div className="logo-img">
          <img src={selfAllowedd} alt="" className="logoimgggggg" />
        </div>
        <div className="login-form">
          <span className="login-text">Sign up </span>
          <input className="sign-Input"
            required
            placeholder="User Name"
            name="username"

            value={register?.username}
            onChange={handleUserName}
          />
          <label style={{ color: "red" }}>{useeerror}</label>
          <input className="sign-Input"
            required
            name="mobile"
            placeholder="Mobile No"
            type="number"
            value={register?.mobile}
            onChange={handleMobileNumber}

            onKeyDown={(e) =>
              symbolsArrMail.includes(e.key) && e.preventDefault()
            } />
          <label style={{ color: "red" }}>{mobileerror}</label>

          <input className="sign-Input"
            required
            name="password"
            placeholder="Password"
            type="password"
            value={register?.password}
            onChange={handlePassWordsValidation}
          />
          <label style={{ color: "red" }}>{passworderror}</label>

          <input className="sign-Input"
            required
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={register?.confirmPassword}
            onChange={handleConfirmPasswordsValidation}
          />
          <label style={{ color: "red" }}>{confirmpassword}</label>

          <div className="login_main" onClick={handleClick}>
            <button className="login-Button">
              Sign Up
            </button>
            {/* <div> */}

            <LoginIcon />
            {/* </div> */}
          </div>
          <label style={{ color: "red" }}>{errorForall}</label>
          <div className="login_main" onClick={handleClickLogin}>
            <button className="login-Button">
              Login
            </button>
            {/* <div> */}
            <LoginIcon style={{ rotate: "180deg" }} />

            {/* </div> */}
          </div>

        </div>
      </div>
    </Box>
  );
};

export default Register;
