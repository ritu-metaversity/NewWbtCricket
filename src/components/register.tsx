import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import snackBarUtil from "./Layout/snackBarUtil";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegistration] = useState<any>({
    username:"",
    password:"", mobile:"", appUrl:""
  });
//   const [password, setPassword] = useState("");

  const handleClick = async () => {
    let res;
   
   
    
    const { response } = await authServices.registeration(register);
   
    if (response.status) {
        snackBarUtil.success(response.message);
        navigate("/sign-in", { replace: true });
      } else {
        snackBarUtil.error("Some unknown error occurred !");
      }
  };
  const handleChange = (e: any) => {
      setRegistration({ ...register, [e.target.name]: e.target.value,appUrl:window.location.hostname});
  };
 
  
  return (
    <Box
      maxWidth={"450px"}
      mx="auto"
      mb="2em"
      p="2em"
      display={"flex"}
      flexDirection="column"
      gap={"1.5em"}
    >
      <Typography variant="h1" fontWeight={"700"} color="primary">
        MyBet
      </Typography>
      <Typography textAlign={"center"} fontWeight="bold" variant="h5">
        Sign Up
      </Typography>
      <TextField
        required
        label="User Name"
        name="username"
        fullWidth
        value={register?.username}
        onChange={handleChange}
      />
      <TextField
          required
          name="mobile"
          label="Mobile No"
          value={register?.mobile}
          onChange={handleChange}
          fullWidth
        />
      <Box textAlign={"left"}>
        <TextField
          required
          name="password"
          label="Password"
          type="password"
          value={register?.password}
          onChange={handleChange}
          fullWidth
        />
        
      </Box>
      <Button variant="contained" size="large" onClick={handleClick} fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};


export default Register;
