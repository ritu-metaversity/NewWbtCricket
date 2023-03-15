import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../utils/api/auth/services";
import snackBarUtil from "./Layout/snackBarUtil";

interface RegisterInterface {
  username?: string;
  password?: string;
}

const Register = () => {
  const [open, setOpen] = useState(false);
  const [newCredAfterRegister, setNewCredAfterRegister] =
    useState<RegisterInterface | null>(null);
  const navigate = useNavigate();
  const [register, setRegistration] = useState<any>({
    username: "",
    password: "",
    mobile: "",
    appUrl: "",
  });
  //   const [password, setPassword] = useState("");

  const handleClick = async () => {
    const { response } = await authServices.registeration(register);

    if (response?.status) {
      snackBarUtil.success(response.message);
      setOpen(true);
      setNewCredAfterRegister(response);
      // navigate("/sign-in", { replace: true });
    } else {
      snackBarUtil.error("Some unknown error occurred !");
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
