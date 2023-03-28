import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneyTwoTone";
import MoneyIcon from "@mui/icons-material/MoneyTwoTone";
import { HeaderTextStyle, UserIconImage } from "./styledComponents";
import { Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { userServices } from "../../utils/api/user/services";
import { authServices } from "../../utils/api/auth/services";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { LoaderContext } from "../../App";

const data = {
  balance: 0,
  libality: 0,
  uplineAmount: 0,
};

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

const Headers: FC<Props> = ({ setIsSignedIn }) => {
  const [wallet, setWallet] = useState(data);
  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [message, setmessage] = useState("");
  useEffect(() => {
    const getWallet = async () => {
      const { response } = await userServices.wallet();
      if (response?.data) {
        setWallet(response.data);
      }
    };
    getWallet();
    const timer = setInterval(() => getWallet(), 5000);

    return () => clearInterval(timer);
  }, []);

  // const handleClick = async (e: any) =>  await authServices.logout();

  async function clickHandler() {
    await authServices.logout();
    localStorage.removeItem("token");
    navigation("/welcome");
    setIsSignedIn(false);
  }

  const handleClose = () => {
    setAnchorEl(null);
    // setMouseOverButton(false);
    // setMouseOverMenu(false);
  };
  // const enterButton = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  //   setMouseOverButton(true);
  // };

  // const leaveButton = () => {
  //   setTimeout(() => {
  //     setMouseOverButton(false);
  //   }, 200);
  // };

  // const enterMenu = () => {
  //   setMouseOverMenu(true);
  // };

  // const leaveMenu = () => {
  //   setMouseOverMenu(false);
  // };
  const open = Boolean(anchorEl);

  const getMsg = async () => {
    await axios
      .post(
        "http://api.a2zscore.com/admin-new-apis/enduser/get-user-message",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setmessage(res?.data?.message);
      });
  };
  useEffect(() => {
    getMsg();
  }, []);

  const { appData } = useContext(LoaderContext);
  return (
    <>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar sx={{ justifyContent: "space-between", bgcolor: "#0336FF" }}>
          <IconButton title="Go back" onClick={() => navigation(-1)}>
            <KeyboardBackspaceIcon fontSize="large" htmlColor="white" />
          </IconButton>
          <Box>
            <HeaderTextStyle></HeaderTextStyle>
            <HeaderTextStyle>Coins: {wallet.balance}</HeaderTextStyle>
            <HeaderTextStyle>Liability: {wallet.libality}</HeaderTextStyle>
          </Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <UserIconImage src="/user.png" alt="" />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          onClick={handleClose}
          id="account-menu"
          open={open}
          onClose={handleClose}
          sx={{ zIndex: 10 }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              color: "black",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {appData?.selfAllowed && (
            <Box style={{ display: "flex" }}>
              <Link to="/deposit">
                <MenuItem>
                  <Button
                    variant="contained"
                    style={{ borderRadius: "10px" }}
                    color="success"
                  >
                    Deposit
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/withdraw">
                <MenuItem>
                  <Button
                    variant="contained"
                    style={{ borderRadius: "10px" }}
                    color="error"
                  >
                    Withdraw
                  </Button>
                </MenuItem>
              </Link>
            </Box>
          )}
          <Link to="/profile">
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          <Link to="/account-summary">
            <MenuItem>
              <AttachMoneyIcon /> Account Statement
            </MenuItem>
          </Link>
          <Link to="/login-history">
            <MenuItem>
              <SummarizeIcon /> Login History
            </MenuItem>
          </Link>
          <Link to="/current-bet">
            <MenuItem>
              <AttachMoneyIcon /> Current Bet
            </MenuItem>
          </Link>
          <Link to="/bet-history">
            <MenuItem>
              <AttachMoneyIcon /> Bet History
            </MenuItem>
          </Link>

          <Link to="/set-button-value">
            <MenuItem>
              <MoneyIcon /> Set button value
            </MenuItem>
          </Link>
          <Divider />

          <MenuItem onClick={clickHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
      <Marquee speed={50} gradient={false}>
        {message}
      </Marquee>
    </>
  );
};

export default Headers;
