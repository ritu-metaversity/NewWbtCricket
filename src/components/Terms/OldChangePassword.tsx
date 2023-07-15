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
            onChange={handleChange}

          />
          <input className="login_text_field"
            placeholder="CONFIRM PASSWORD"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
          />

          <button className="wwwpurp_btn" onClick={handleClick}>
            Done
          </button>
        </div>

      </div>
    </div>

  );
};

export default OldChangePassword;
