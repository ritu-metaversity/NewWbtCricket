import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import snackBarUtil from "./Layout/snackBarUtil";

interface RegisterInterface {
  username?: string;
  password?: string;
}

const Register = () => {
  const [open, setOpen] = useState(false);
  const [newCredAfterRegister, setNewCredAfterRegister] = useState<RegisterInterface | null>(null);
  const navigate = useNavigate();
  const [register, setRegistration] = useState<any>({
    username: "",
    password: "",
    mobile: "",
    confirmPassword: "",
    appUrl: "",
  });
  //   const [password, setPassword] = useState("");
  const [symbolsArrMail] = useState(["e", "E", "+", "-", "."]);

  const handleClick = async () => {

    if (register.username === "" && register.mobile === "" && register.password === "" && register.confirmPassword === "") {
      return snackBarUtil.error("Please enter all the mandatory details");
    } else if (register?.password !== "" && register?.mobile === "" && register?.username !== "" && register?.confirmPassword !== "") {
      return snackBarUtil.error(" Please provide Mobile no.");
    } else if (register?.password === "" && register?.mobile !== "" && register?.username !== "" && register?.confirmPassword !== "") {
      return snackBarUtil.error("Please provide password ");
    } else if (register?.password !== "" && register?.mobile !== "" && register?.username !== "" && register?.confirmPassword === "") {
      return snackBarUtil.error("Please provide Confirm password");
    } else if (register.password !== register.confirmPassword) {
      return snackBarUtil.error("Password does not match!!");
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
  const handleChange = (e: any) => {
    setRegistration({
      ...register,
      [e.target.name]: e.target.value,
      appUrl: window.location.hostname,
    });
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

      <Typography variant="h1" fontWeight={"700"} color="primary">
        MyBet
      </Typography>
      <Typography textAlign={"center"} fontWeight="bold" variant="h5">
        Sign Up
      </Typography>
      <input
        required
        placeholder="User Name"
        name="username"

        value={register?.username}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "8vh",
          borderRadius: "4px"
        }}
      />
      <input
        required
        name="mobile"
        placeholder="Mobile No"
        type="number"
        value={register?.mobile}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "8vh",
          borderRadius: "4px"
        }}
        onKeyDown={(e) =>
          symbolsArrMail.includes(e.key) && e.preventDefault()
        }
      />
      <Box textAlign={"left"}>
        <input
          required
          name="password"
          placeholder="Password"
          type="password"
          value={register?.password}
          onChange={handleChange}
          style={{
            width: "100%",
            height: "8vh",
            borderRadius: "4px"
          }}
        />
      </Box>
      <Box textAlign={"left"}>
        <input
          required
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={register?.confirmPassword}
          onChange={handleChange}
          style={{
            width: "100%",
            height: "8vh",
            borderRadius: "4px"
          }}
        />
      </Box>
      <Button variant="contained" size="large" onClick={handleClick} fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default Register;
