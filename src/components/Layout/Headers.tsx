import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa"
import './Headers.css'
import { Box } from "@mui/system";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./Header.css"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneyTwoTone";
import MoneyIcon from "@mui/icons-material/MoneyTwoTone";
import { HeaderTextStyle, UserIconImage } from "./styledComponents";
import { HomeRepairServiceOutlined, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { userServices } from "../../utils/api/user/services";
import { authServices } from "../../utils/api/auth/services";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { LoaderContext } from "../../App";
import { colorHex } from "../../utils/constants";
import { ImCross } from "react-icons/im"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdManageAccounts } from "react-icons/md"
import { ImPlay3 } from "react-icons/im"
import { BsTrophyFill, BsFillMenuButtonFill } from "react-icons/bs"

import { BiMoneyWithdraw } from "react-icons/bi"
import { MdOutlineRealEstateAgent, MdWorkHistory, MdSportsScore, MdLegendToggle } from "react-icons/md"
import { HiOutlineLogout } from "react-icons/hi"

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
  const { appData } = useContext(LoaderContext)
  console.log(appData?.logo, "appData")
  const userid = localStorage.getItem("userid");
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
    setDrawerOpen(false)
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
        "enduser/get-user-message",
        {},
        {
          baseURL: process.env.REACT_APP_API_URL,
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

  const [drawerOpen, setDrawerOpen] = useState(false)
  const matches = useMediaQuery('(min-width:500px)');

  return (
    <>
      <AppBar
        position="sticky"
        enableColorOnDark
        style={{ background: colorHex.bg2 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '20px', width: '20%' }}>
            <Link to={"/"} className="logoimg" >
              <img src={appData?.logo} alt="Logo" className="desktop_logogogo" />

            </Link>


            <Box sx={{ display: 'flex', alignItems: 'center', pl: "1rem", flexDirection: 'column' }}>
              <Link to="/" >

                <Typography component="p">
                  <div className="logo-name">


                    <img src={appData?.logo} alt="Logo" className="mobile_logogoggo" style={{ width: "60%" }} />

                    {userid}
                  </div>
                </Typography>
              </Link>
              <Typography component="p" sx={{ display: { xs: "none", md: "block" } }}  >
                chips: <Typography component={'span'}>{wallet.balance}</Typography>
              </Typography>
            </Box>

          </Box>

          <Stack direction="row" display={{ xs: "none", md: "flex" }} spacing={2} style={{ marginLeft: "48%", alignItems: 'center', justifyContent: 'space-around' }}>
            <Box>
              {/* <HeaderTextStyle>Coins: {wallet.balance}</HeaderTextStyle>
            <HeaderTextStyle>Liability: {wallet.libality}</HeaderTextStyle> */}
              <HeaderTextStyle className="home_icon">
                <Link to="/" style={{ padding: '12px' }}>
                  <img src="https://bmxpro.in/home-page-50.png" alt="" style={{ height: "28px", width: "28px", marginBottom: "0" }} />

                  <p className="home_lable" style={{ color: "rgb(255, 255, 255)", marginLeft: "4px", margin: '0' }}>HOME</p>
                </Link>
              </HeaderTextStyle>
            </Box>
            <Box>
              <HeaderTextStyle className="home_icon" onClick={clickHandler}>
                <p><img src="https://bmxpro.in/images/logout-new.png" alt="" style={{ height: "28px", width: "28px" }} />
                </p>
                <p className="home_lable" style={{ color: "rgb(255, 255, 255)", marginLeft: "4px" }} >LOGOUT
                </p></HeaderTextStyle>
            </Box>
          </Stack>
          {matches ?
            <IconButton onClick={(e) => { setAnchorEl(e.currentTarget); }}>
              <UserIconImage src="/user.png" alt="" />
            </IconButton> : <GiHamburgerMenu onClick={() => setDrawerOpen(true)} />
          }
          {!matches && <Drawer
            anchor={"left"}
            open={drawerOpen}
            PaperProps={{
              sx: { width: "100vw", bgcolor: "#7b7c7f" }
            }}
            onClose={() => setDrawerOpen(false)}
            className="sider-drawer"
          >
            <div className="cross-icon" onClick={() => setDrawerOpen(!drawerOpen)}>
              <ImCross />
            </div>

            <ul className="sider-ul">

              {/* <li > <p><span><AiOutlineHome /></span>Home</p>  <span><FaArrowRight /></span>   </li> */}
              <li > <Link to="/" onClick={() => setDrawerOpen(false)}><p><span><AiOutlineHome /></span>Home</p>  <span><FaArrowRight /></span> </Link>  </li>
              <li > <Link to="/profile" onClick={() => setDrawerOpen(false)}><p><span><MdManageAccounts /></span>PROFILE</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/in-play" onClick={() => setDrawerOpen(false)}><p><span><ImPlay3 /></span>IN PLAY</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/sports" onClick={() => setDrawerOpen(false)}><p><span><BsTrophyFill /></span>SPORTS</p>  <span><FaArrowRight /></span>   </Link></li>
              {/* <li > <Link to="/account-summary" onClick={() => setDrawerOpen(false)}><p><span><MdLegendToggle /></span>LADGER</p>  <span><FaArrowRight /></span>   </Link></li> */}
              <li > <Link to="/deposit" onClick={() => setDrawerOpen(false)}><p><span><BiMoneyWithdraw style={{ rotate: "180deg" }} /></span>DEPOSIT</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/withdraw" onClick={() => setDrawerOpen(false)}><p><span><BiMoneyWithdraw /></span>WITHDRAW</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/account-summary" onClick={() => setDrawerOpen(false)}><p><span><MdOutlineRealEstateAgent /></span>ACCOUNT SUMMARY</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/login-history" onClick={() => setDrawerOpen(false)}><p><span><AiOutlineHistory /></span>LOGIN HISTORY</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/current-bet" onClick={() => setDrawerOpen(false)}><p><span><MdSportsScore /></span>CURRENT BET</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/bet-history" onClick={() => setDrawerOpen(false)}><p><span><MdWorkHistory /></span>BET HISTORY</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/set-button-value" onClick={() => setDrawerOpen(false)}><p><span><BsFillMenuButtonFill /></span>SET BUTTON VALUE</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/set-button-value" onClick={clickHandler}><p><span><HiOutlineLogout /></span>Logout</p>  <span><FaArrowRight /></span>   </Link></li>

            </ul>

            {/* #7b7c7f */}

          </Drawer>}
        </Toolbar>
        {matches && <Menu
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
        </Menu>}
      </AppBar>
      <div style={{ padding: "4px", background: "#fff", textAlign: "center", margin: "12px 0px", fontSize: "13px" }}><span>Chips: {wallet.balance}</span> <span>Expo : <span style={{ color: "red" }}>0.00</span></span></div>

      <Marquee speed={50} gradient={false}>
        {message}
      </Marquee>
    </>
  );
};

export default Headers;


