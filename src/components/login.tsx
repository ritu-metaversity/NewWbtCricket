import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/terms",{replace:true})
   }
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
      <Typography variant="h1" fontWeight={"700"} color="primary">MyBet</Typography>
      <Typography textAlign={"center"} fontWeight="bold" variant="h5">
        Sign In
      </Typography>
      <TextField
        //   InputProps={{
        //       startAdornment:
        //      <b>C</b>
        //   }}
        required
        label="User Name"
        fullWidth
      />
      <Box textAlign={"left"}>
        <TextField required label="Password" fullWidth />
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
        />
      </Box>
      <Button variant="contained" size="large" onClick={handleClick} fullWidth>
        Sign in
      </Button>
    </Box>
  );
};


export default Login;
