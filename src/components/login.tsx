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
import { useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";


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
      appUrl: host === "localhost" ? "localhost" : host,
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
    <>
      <Typography mt="64px" variant="h1" fontWeight={"700"} color="#e91e63">
        {window.location.hostname}
      </Typography>
      <Box
        maxWidth={"450px"}
        mx="auto"
        mb="2em"
        p="2em"
        display={"flex"}
        flexDirection="column"
        gap={"1.5em"}
      >
        <Typography
          textAlign={"center"}
          fontWeight="bold"
          variant="h5"
          color="#3f51b5"
          marginTop="-24px"
        >
          Sign In
        </Typography>
        <TextField
          required
          label="Client Code"
          name="login"
          fullWidth
          value={userId}
          onChange={handleChange}
        />
        <Box textAlign={"left"}>
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel control={<Checkbox />} label="Remember me" />
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
          fullWidth
          sx={{ bgcolor: "#e91e63" }}
        >
          Sign in
        </Button>
      </Box>
    </>
  );
};

export default Login;
