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
import { AiFillCaretDown } from "react-icons/ai"
import { BsTrophyFill, BsFillMenuButtonFill, BsKey, BsFileEarmarkRuled } from "react-icons/bs"

import { BiMoneyWithdraw } from "react-icons/bi"
import { MdOutlineRealEstateAgent, MdWorkHistory, MdSportsScore, MdLegendToggle } from "react-icons/md"
import { HiOutlineLogout } from "react-icons/hi"
import { IoMdArrowRoundBack } from 'react-icons/io'


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
  // const navigate = useNavigate();

  const { appData } = useContext(LoaderContext)
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
    localStorage.getItem("passwordType") === "new" && getWallet();
    const timer = setInterval(() => localStorage.getItem("passwordType") === "new" && getWallet(), 5000);

    return () => clearInterval(timer);
  }, []);

  // const handleClick = async (e: any) =>  await authServices.logout();
  async function clickHandler() {
    await authServices.logout();
    localStorage.clear();
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
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;
  const TokenId = localStorage.getItem("token");


  // QTECH APIIIIII

  // useEffect(() => {

  //   if (TokenId) {


  //     const timers = setInterval(
  //       () => {
  //         axios
  //           .post(
  //             `${REACT_APP_API_URL_PLAY_INDIA}/api/qtech/authentication`,
  //             {},
  //             {
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${TokenId}`,
  //               },
  //             }
  //           )
  //           .then((response) => {
  //             console.log(response, "dfsdfksdjfkuhsdjn");

  //             localStorage.setItem("GameToken", response?.data?.data?.access_token);
  //           })
  //           .catch((error) => {
  //             if (error?.response?.data?.status === false) {
  //               navigation("/welcome");
  //               localStorage.clear();

  //             }
  //           })


  //       }, 5000)
  //     return () => clearInterval(timers)
  //   }

  // }, [])


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
  const matches = useMediaQuery('(min-width:900px)');

  const handledrawer = () => {
    if (localStorage.getItem("passwordType") === "new") {
      setDrawerOpen(true)

    } else {
    }
  }
  useEffect(() => {
    setAnchorEl(null)

  }, [matches])
  console.log(window.location.pathname, "appData");


  const handleBackBtn = () => {
    navigation(-1)
  }

  return (
    <>
      <AppBar

        enableColorOnDark
        onClick={handleClose}
        style={{ background: colorHex.bg2, height: "50px", top: "0px", position: "sticky" }}
        className="main_header"
      >
        <div className="header_inner" >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '60%' }}>

            {/* <Link to={(localStorage.getItem("passwordType") === "new") ? "/" : "OldChangePassword"} className="logoimg" >
              <img src={appData?.logo} alt="Logo" className="desktop_logogogo" />

            </Link> */}


            <Box sx={{ display: 'flex', alignItems: 'center', pl: "3px", flexDirection: 'column' }}>

              <Link to={(localStorage.getItem("passwordType") === "new") ? "/" : "OldChangePassword"} >

                {/* <Typography component="p"> */}
                <div className="logo-name">


                  <img src={appData?.logo} alt="Logo" className="desktop_logogogo" style={{ height: "40px" }} />

                  {/* <span className="mobile_logogoggo" style={{ color: "white" }}>

                    {userid}
                  </span> */}
                </div>
                {/* </Typography> */}
              </Link>
            </Box>

          </Box>

          <Stack direction="row" display={{ xs: "none", md: "flex", gap: "10%", width: "40%" }} spacing={2} >
            <Box style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              {/* <HeaderTextStyle>Coins: {wallet.balance}</HeaderTextStyle>
            <HeaderTextStyle>Liability: {wallet.libality}</HeaderTextStyle> */}
              {/* <HeaderTextStyle className="home_icon"> */}
              {/* <div> */}
              <Link to={(localStorage.getItem("passwordType") === "new") ? "/" : "OldChangePassword"} className="home_btn">


                <img src="https://bmxpro.in/home-page-50.png" alt="" style={{ height: "28px", width: "28px", marginBottom: "0" }} />

                <p className="home_lable" style={{ color: "rgb(255, 255, 255)", marginLeft: "4px", margin: '0' }} >HOME</p>
              </Link>
              {/* </div> */}
              {/* </HeaderTextStyle> */}
            </Box>
            <div className="Username_chip">
              <span>
                {userid}
              </span>
              <span >
                chips:{wallet.balance}

              </span>
            </div>
            {/* <Box>
              <HeaderTextStyle className="home_icon" onClick={clickHandler}>
                <p><img src="https://bmxpro.in/images/logout-new.png" alt="" style={{ height: "28px", width: "28px" }} />
                </p>
                <p style={{ color: "rgb(255, 255, 255)", marginLeft: "4px" }} >LOGOUT
                </p></HeaderTextStyle>
            </Box> */}
          </Stack>
          {matches ?
            ((localStorage.getItem("passwordType") === "new") ?
              <IconButton onClick={(e) => { e.stopPropagation(); setAnchorEl((o) => o ? null : e.currentTarget); }}>
                <AiFillCaretDown style={{ color: "white" }} />
              </IconButton>
              :
              <IconButton >
                <AiFillCaretDown style={{ color: "white" }} />
              </IconButton>
            )



            :
            <>
              <span className="mobile_logogoggo" style={{ color: "white" }}>

                {userid}
              </span>
              <GiHamburgerMenu onClick={handledrawer} style={{ width: "8%" }} />
            </>
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
              <li > <Link to="/" onClick={() => setDrawerOpen(false)}><p><span><AiOutlineHome /></span>HOME</p>  <span><FaArrowRight /></span> </Link>  </li>
              <li > <Link to="/profile" onClick={() => setDrawerOpen(false)}><p><span><MdManageAccounts /></span>PROFILE</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/in-play" onClick={() => setDrawerOpen(false)}><p><span><ImPlay3 /></span>IN PLAY</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/sports" onClick={() => setDrawerOpen(false)}><p><span><BsTrophyFill /></span>SPORTS</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/password-change" onClick={() => setDrawerOpen(false)}><p><span><BsKey /></span>CHANGE PASSWORD </p>  <span><FaArrowRight /></span>   </Link></li>
              {
                appData?.selfAllowed === true ?
                  <>
                    <li > <Link to="/deposit" onClick={() => setDrawerOpen(false)}><p><span><BiMoneyWithdraw style={{ rotate: "180deg" }} /></span>DEPOSIT</p>  <span><FaArrowRight /></span>   </Link></li>
                    <li > <Link to="/withdraw" onClick={() => setDrawerOpen(false)}><p><span><BiMoneyWithdraw /></span>WITHDRAW</p>  <span><FaArrowRight /></span>   </Link></li></>
                  : ""

              }

              <li > <Link to="/profit-and-loss" onClick={() => setDrawerOpen(false)}><p><span><AttachMoneyIcon /></span>PROFIT AND LOSS</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/Account_Statement_Page" onClick={() => setDrawerOpen(false)}><p><span><MoneyIcon /></span>ACCOUNT STATEMENT</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/my-ledger-Page" onClick={() => setDrawerOpen(false)}><p><span><MdOutlineRealEstateAgent /></span>MY LEDGER</p>  <span><FaArrowRight /></span>   </Link></li>
              {/* <li > <Link to="/login-history" onClick={() => setDrawerOpen(false)}><p><span><AiOutlineHistory /></span>LOGIN HISTORY</p>  <span><FaArrowRight /></span>   </Link></li> */}
              <li > <Link to="/current-bet" onClick={() => setDrawerOpen(false)}><p><span><MdSportsScore /></span>CURRENT BET</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/bet-history" onClick={() => setDrawerOpen(false)}><p><span><MdWorkHistory /></span>BET HISTORY</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/set-button-value" onClick={() => setDrawerOpen(false)}><p><span><BsFillMenuButtonFill /></span>SET BUTTON VALUE</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/terms" onClick={() => setDrawerOpen(false)}><p><span><BsFileEarmarkRuled /></span>RULES</p>  <span><FaArrowRight /></span>   </Link></li>
              <li > <Link to="/welcome" onClick={clickHandler}><p><span><HiOutlineLogout /></span>LOGOUT</p>  <span><FaArrowRight /></span>   </Link></li>

            </ul>

            {/* #7b7c7f */}

          </Drawer>}
        </div>

      </AppBar>
      <div className="header_chips_expo">
        <div className="inner_chips" style={{ fontWeight: "600" }}>
          {/* {window.location.pathname === "/" || window.location.pathname === "/terms" ?
            "" :
            window.location.pathname === "/" || window.location.pathname === "/terms" ?

              (<button className="banck_btn_for_home" onClick={handleBackBtn}>
                <IoMdArrowRoundBack color="white" className="back_icon" />
                <span>
                  Back
                </span>
              </button>)
              :
              (<button className="banck_btn_for_home" onClick={handleBackBtn}>
                <IoMdArrowRoundBack color="white" className="back_icon" />
                <span>
                  Back
                </span>
              </button>)
          } */}
          <span>Chips: {Number(wallet.balance).toFixed(2)}</span>
          {" "}
          <Link to="/current-bet" style={{ padding: "0px 0px 0px 14px" }}>
            <span>Expo : <span style={{ color: "red" }}>
              {Number(wallet.libality).toFixed(2)}
            </span>
            </span></Link>
        </div>
      </div>
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
            overflow: "scroll",
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
          <MenuItem >
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <Link to="/profit-and-loss">
          <MenuItem className="profitepopup">
            <AttachMoneyIcon /> Profit and Loss
          </MenuItem>
        </Link>
        <Link to="/my-ledger-Page">
          <MenuItem className="profitepopup">
            <MdOutlineRealEstateAgent /> My Ledger
          </MenuItem>
        </Link>
        <Link to="/Account_Statement_Page">
          <MenuItem className="profitepopup">
            <MoneyIcon /> Account Statement
          </MenuItem>
        </Link>
        {/* <Link to="/login-history">
          <MenuItem>
            <SummarizeIcon /> Login History
          </MenuItem>
        </Link> */}
        <Link to="/current-bet">
          <MenuItem className="profitepopup">
            <MdSportsScore /> Current Bet
          </MenuItem>
        </Link>
        <Link to="/bet-history">
          <MenuItem className="profitepopup">
            <MdWorkHistory /> Bet History
          </MenuItem>
        </Link>

        <Link to="/set-button-value">
          <MenuItem className="profitepopup">
            <BsFillMenuButtonFill /> Set button value
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem onClick={clickHandler}>
          <ListItemIcon className="profitepopup">
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      }
      <Marquee speed={50} gradient={false}>
        {message}
      </Marquee>
    </>
  );
};

export default Headers;


