import React, { useContext, useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Box } from "@mui/system";
import { userServices } from "../../utils/api/user/services";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../App";

const OldChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setLoading } = useContext(LoaderContext);
  const userid = localStorage.getItem("userid") || "";
  const token = localStorage.getItem("token") || "";

  const handleClick = async (e: any) => {
    setLoading && setLoading((prev) => ({ ...prev, handleClick: true }));
    const { response } = await userServices.oldChangePassword({
      oldPassword,
      newPassword,
      userid,
      token,
    });
    if (response?.type === "success") {
      navigate("/sign-in");
      localStorage.clear();
    }
    setLoading && setLoading((prev) => ({ ...prev, handleClick: false }));
  };

  const handleChange = (e: any) => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };
  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "sm",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          m: 2,
          p: 3,
          gap: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LockPersonIcon sx={{ fontSize: "80px" }} />
        <Typography variant="h4" fontWeight={500}>
          Change Password?
        </Typography>
        <Typography variant="subtitle1">
          You can change your password here.
        </Typography>

        <TextField
          size="small"
          margin="dense"
          label="Enter Current Password"
          fullWidth
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          label="Enter New Password"
          fullWidth
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />
        <Typography variant="subtitle2" textAlign="start">
          {/* आपके अकाउंट की सुरक्षा को ध्यान रखते हुए आपके लिए कंप्यूटर जनित
          पासवर्ड बनाया जा रहा है | नीचे दिए गए बटन पर क्लिक करके एक नया पासवर्ड
          बनाएं|
          <br /> */}
          Keeping in mind the security of your account, a new password is being
          created for you..
          <br />
          <br />
          Create a new password by clicking on the button below
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={handleClick}
          sx={{ p: 1 }}
        >
          Generate Password
        </Button>
      </Paper>
    </Box>
  );
};

export default OldChangePassword;
