import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
// import axios from "axios";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import "./Login.css"
import LoginIcon from '@mui/icons-material/Login';
import snackBarUtil from "./Layout/snackBarUtil";
import axios from "axios";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean | null>>;
}

const Login: FC<Props> = ({ setIsSignedIn, setShow }) => {
  const navigate = useNavigate();
  const [userId, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const host = window.location.hostname;
  const [selfAllowedd, SetselfAllowedd] = useState();
  const [selfsignup, Setselfsignup] = useState();
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const [loadinLogin, setLoadingLogin] = useState(false)
  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoadingLogin(true)

    if (password === "" && userId === "") {
      return snackBarUtil.error("All fields are mandatory");
    } else {


      const data = {
        userId,
        password,
        // appUrl: host === "localhost" ? "localhost" : "localhost",
        appUrl: host === "localhost" ? "localhost" : host,
      };
      const { response } = await authServices.login(data);
      console.log(response, "loadinggg")
      if (response?.token) {
        localStorage.setItem("token", response?.token);
        localStorage.setItem("userid", response?.userId);
        localStorage.setItem("passwordType", response?.passwordtype);
        if (response.passwordtype === "old") {
          setLoadingLogin(false)
          navigate("/OldChangePassword", { replace: true });
        } else {
          setIsSignedIn(true);
          setShow(true)
          setLoadingLogin(false)

          navigate("/terms", { replace: true });
        }
      }
    }
  };
  const handleSign = () => {
    navigate("/sign-up");

  }
  const handleChange = (e: any) => {
    if (e.target.name === "login") {
      setLogin(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };


  useEffect(() => {
    let appUrll = window.location.hostname;
    // let appUrll = "localhost";
    axios
      .post(
        `${REACT_APP_API_URL}/login/is-self-by-app-url`,
        { appUrl: appUrll }
      )
      .then((res: any) => {
        console.log(res, "dadasdas")
        SetselfAllowedd(res?.data?.data?.logo);
        Setselfsignup(res?.data?.data?.selfAllowed);
      });
  }, []);
  return (
    <div className="loginBackground new-login-content ">
      <div className="logo-img">
        <img src={selfAllowedd} alt="" className="logoimgggggg" />
      </div>
      <div className="login-form">
        <span className="login-text">Please Login To Continue</span>
        <form onSubmit={handleClick} className="login-form-newww">

          <input className="login-Input"
            placeholder="Username"
            value={userId}
            name="login"
            onChange={handleChange} />

          <input className="login-Input"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleChange} />
          {/* <div className="login_main" > */}

          <button className="login_loginnn" type="submit">
            {
              loadinLogin === true ?

                <span className="loading-login">Loading...</span>
                : <>
                  <span>
                    login
                  </span>
                  <LoginIcon style={{ fontSize: "18px" }} />
                </>

            }


          </button>
          {/* </div> */}
        </form>

        {selfsignup === true ?

          // <div className="login_main" onClick={handleSign}>
          <button className="login_loginnn" onClick={handleSign}>
            <span> Sign up </span>
            <LoginIcon style={{ rotate: "180deg", fontSize: "18px" }} />
          </button>
          : ""


        }

        <div className="_term_section">
          <div className="sub_term">
            <Link to="">
              <span>Privacy Policy</span>
            </Link>
            <Link to="">
              <span>Terms & Conditions</span>
            </Link>
          </div>
          <div>
            <Link to="">

              <span> Rules & Regulations</span>
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;
