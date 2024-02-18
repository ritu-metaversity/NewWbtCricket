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
import NewLogog from "./WBT99-1.png"
import NewLogogooo from "./WBT99-2.png"

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean | null>>;
}

const Login: FC<Props> = ({ setIsSignedIn, setShow }) => {
  const navigate = useNavigate();
  const [userId, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const host = "localhost";
  const [selfAllowedd, SetselfAllowedd] = useState();
  const [selfsignup, Setselfsignup] = useState();
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;


  const [loadinLogin, setLoadingLogin] = useState(false)

  console.log(loadinLogin, "loadinLogin")
  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoadingLogin(true)

    if (password === "" && userId === "") {

      setLoadingLogin(false)
      return snackBarUtil.error("All fields are mandatory")

    } else {


      const data = {
        userId,
        password,
        // appUrl: host === "localhost" ? "localhost" : "localhost",
        appUrl: host === "localhost" ? "localhost" : host,
        // appUrl: "247idhub.com",
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

          navigate("/", { replace: true });
        }
      } else {
        setLoadingLogin(false)

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
    let appUrll = "localhost";
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

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");

    }
  }, [])

  const handleDemoAccount = () => {
    // setLoadingLogin(true)

    axios
      .post(
        `${REACT_APP_API_URL}/login/demo-user-creation-login`,
        { appUrl: "localhost" }
      )
      .then((response) => {
        if (response?.data?.token) {
          axios.defaults.headers.common.Authorization = `Bearer ${response?.data?.token}`
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("userid", response?.data?.userId);
          localStorage.setItem("passwordType", response?.data?.passwordtype);
          localStorage.setItem("userTypeInfo", response?.data?.userTypeInfo);
          // QTECH APPPIIIIIIIIIIIII
          setIsSignedIn(true);
          setShow(true)
          // setLoadingLogin(false)
          navigate("/", { replace: true });
        } else {
          if (response?.data?.status === false) {
            snackBarUtil.error(response?.data?.message)
          }
        }
      })
      .catch((err) => {
        console.log(err, "fsdsdfsdfsd");

      })
  }
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

        <button className="login_loginnn" onClick={handleDemoAccount}>
          <span> Login with demo ID</span>
          <LoginIcon style={{ rotate: "180deg", fontSize: "18px" }} />
        </button>
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
