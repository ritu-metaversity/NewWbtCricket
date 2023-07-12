import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Box } from "@mui/system";
import { userServices } from "../../utils/api/user/services";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../App";
import snackBarUtil from "../Layout/snackBarUtil";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

const OldChangePassword: FC<Props> = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLoading } = useContext(LoaderContext);

  const handleClick = async (e: any) => {
    if (confirmPassword !== newPassword) {
      return snackBarUtil.error("New Password And Confirm Password does not match!");
    } else if (oldPassword === "" && confirmPassword === "" && newPassword === "") {
      return snackBarUtil.error("Please enter all the mandatory details");
    }
    const userid = localStorage.getItem("userid") || "";
    const token = localStorage.getItem("token") || "";
    setLoading && setLoading((prev) => ({ ...prev, handleClick: true }));
    const { response } = await userServices.oldChangePassword({
      oldPassword,
      currentPassword: oldPassword,
      newPassword,
      confirmPassword,
      userid,
      token,
    });
    if (response) {
      navigate("/sign-in");
      localStorage.clear();
      setIsSignedIn(false);
    }
    setLoading && setLoading((prev) => ({ ...prev, handleClick: false }));
  };

  const handleChange = (e: any) => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };
  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "sm",
        overflow: "hidden",
        overflowY: "scroll",
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
          overflow: "hidden",
          overflowY: "scroll",
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
          type="password"
          value={oldPassword}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          label="Enter New Password"
          type="password"
          fullWidth
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />
        <TextField
          size="small"
          type="password"
          margin="dense"
          label="Confirm New Password"
          fullWidth
          name="confirmPassword"
          value={confirmPassword}
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
