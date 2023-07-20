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
import "./OldPassword.css"
import { Header } from "antd/es/layout/layout";
import Headers from "../Layout/Headers";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

const OldChangePassword: FC<Props> = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLoading } = useContext(LoaderContext);

  const [errorForall, setErrorForall] = useState("")
  // const [useeerror, setUserNameError] = useState("")
  // const [mobileerror, setmobileNumberError] = useState("")
  const [passworderror, setPasswordError] = useState("")
  const [confirmpassword, setConfirmPasswordError] = useState("")

  const handleClick = async (e: any) => {
    if (confirmPassword !== newPassword) {
      return snackBarUtil.error("New Password And Confirm Password does not match!");
    } else if (oldPassword === "" && confirmPassword === "" && newPassword === "") {
      return snackBarUtil.error("Something went wrong! Please try again later.");
    }
    const userid = localStorage.getItem("userid") || "";
    const token = localStorage.getItem("token") || "";
    setLoading && setLoading((prev) => ({ ...prev, handleClick: true }));



    if ((newPassword?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?#&_]{8,12}$/) ===
      null) === true) {
      setPasswordError(
        "Password should contain atleast one number and one lower case and one upper case."
      );
    } else {
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
    }

    setLoading && setLoading((prev) => ({ ...prev, handleClick: false }));
  };

  const handlePassWordsValidation = (e: any) => {
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
      setPasswordError("")
    }
  };
  const handleConfirmPasswordsValidation = (e: any) => {
    setConfirmPassword(e.target.value)
    const confirmPass = e.target.value;
    if (newPassword !== confirmPass) {
      setConfirmPasswordError("Password must be equal.");
    } else {
      setConfirmPasswordError("");

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
  console.log(oldPassword, newPassword, confirmPassword, "uytrfcvbhjuyg")
  return (

    <div className="outer_body_pass">
      <div className="inner_body_pass">
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
          <button className="wwwpurp_btn" onClick={handleClick}>
            Done
          </button>
        </div>

      </div>
    </div>

  );
};

export default OldChangePassword;
