import React from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Box } from "@mui/system";

const ChangePassword = () => {
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
        />
        <Typography variant="subtitle2" textAlign="start">
          आपके अकाउंट की सुरक्षा को ध्यान रखते हुए आपके लिए कंप्यूटर जनित
          पासवर्ड बनाया जा रहा है | नीचे दिए गए बटन पर क्लिक करके एक नया पासवर्ड
          बनाएं|
          <br />
          <br />
          Keeping in mind the security of your account, a computer-generated
          password is being created for you.. Create a new password by clicking
          on the button below
        </Typography>
        <Button fullWidth variant="contained" sx={{ p: 1 }}>
          Generate Password
        </Button>
      </Paper>
    </Box>
  );
};

export default ChangePassword;
