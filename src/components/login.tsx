import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
// import axios from "axios";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import "./Login.css"
import LoginIcon from '@mui/icons-material/Login';

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<Props> = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  const [userId, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const host = window.location.hostname;
  const handleClick = async () => {
    const data = {
      userId,
      password,
      appUrl: host === "localhost" ? "localhost" : "localhost",
    };
    const { response } = await authServices.login(data);
    if (response?.token) {
      localStorage.setItem("token", response?.token);
      localStorage.setItem("userid", response?.userId);
      if (response.passwordtype === "old") {
        navigate("/OldChangePassword", { replace: true });
      } else {
        setIsSignedIn(true);
        navigate("/terms", { replace: true });
      }
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name === "login") {
      setLogin(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <div className="loginBackground new-login-content ">
      <div className="logo-img">
        <img src="https://bmxpro.in/static/media/poplogin1609.320f8bee.png" alt="" />
      </div>
      <div className="login-form">
        <span className="login-text">Please Login To Continue</span>
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
        <div className="login_main" onClick={handleClick}>
          <button className="login-Button">
            login
          </button>
          <div>
            <LoginIcon />
          </div>
        </div>
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
