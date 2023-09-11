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
import { userServices } from "../utils/api/user/services";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../App";
import snackBarUtil from "../components/Layout/snackBarUtil";
import "./ChangePassword.css"
interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}
const ChangePassword: FC<Props> = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passworderror, setPasswordError] = useState("")
  const [confirmpassword, setConfirmPasswordError] = useState("")
  const { setLoading } = useContext(LoaderContext);
  const handleClick = async (e: any) => {
    e.preventDefault();

    if (confirmPassword !== newPassword) {
      return snackBarUtil.error("New Password And Confirm Password does not match!");
    } else if (oldPassword === "" && confirmPassword === "" && newPassword === "") {
      return snackBarUtil.error("Something went wrong! Please try again later.");
    }
    setLoading && setLoading((prev) => ({ ...prev, handleClick: true }));
    if ((newPassword?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?#&_]{8,12}$/) ===
      null) === true) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {

      // /user/first-login-cp
      const { response } = await userServices.changePassword({
        oldPassword,
        currentPassword: oldPassword,
        newPassword,
      });
      if (response) {
        navigate("/sign-in");
        localStorage.clear();
        setIsSignedIn(false);
      }
    }
    setLoading && setLoading((prev) => ({ ...prev, handleClick: false }));
  };
  const handlePassWordsValidation = (e: any) => {
    console.log(e.target.value, "fsdfsdfsdfsdfd");

    setNewPassword(e.target.value)
    const passData = e.target.value;
    if (passData === "") {
      setPasswordError("Password is required.");
    } else if (passData?.length < 8) {
      setPasswordError("Minimum 8 letters required.");
    } else if (passData?.length > 13) {
      setPasswordError("Maximum 12 letters required");
    } else if (
      passData?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?#&_]{8,12}$/) ===
      null
    ) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {
      setPasswordError("");

    }
    if (passData !== confirmPassword) {
      setConfirmPasswordError("Password must be equal.");
    } else {
      setConfirmPasswordError("")
    }
  };
  const handleConfirmPasswordsValidation = (e: any) => {

    setConfirmPassword(e.target.value)
    const confirmPass = e.target.value;
    if (newPassword !== confirmPass) {
      setConfirmPasswordError("Password must be equal.");
    } else {
      setConfirmPasswordError("")
    }
  };
  const handleChange = (e: any) => {
    // if (e.target.name === "oldPassword") {
    setOldPassword(e.target.value);
    // } else if (e.target.name === "newPassword") {
    //   setNewPassword(e.target.value);
    // } else if (e.target.name === "confirmPassword") {
    //   setConfirmPassword(e.target.value);
    // }
  };
  return (

    <div className="outer_body_pass">
      <div className="inner_body_pass">
        <form onSubmit={handleClick}>

          <div className="main_div">

            <span className="change_pass">
              Change Password

            </span>
            <input className="login_text_field"
              placeholder="OLD PASSWORD"
              name="oldPassword"
              type="password"
              value={oldPassword}
              onChange={handleChange}

            />
            <input className="login_text_field"
              placeholder="NEW PASSWORD"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={handlePassWordsValidation}
            />
            <label style={{ color: "red" }}>{passworderror}</label>

            <input className="login_text_field"
              placeholder="CONFIRM PASSWORD"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordsValidation}
            />
            <label style={{ color: "red" }}>{confirmpassword}</label>

            <button className="wwwpurp_btn" type="submit" style={{ cursor: "pointer" }}>
              Done
            </button>
          </div>
        </form>

      </div>
    </div>

  );
};

export default ChangePassword;
