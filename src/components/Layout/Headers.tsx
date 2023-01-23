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
import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneyTwoTone";
import MoneyIcon from "@mui/icons-material/MoneyTwoTone";
import { HeaderTextStyle, UserIconImage } from "./styledComponents";
import { Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { userServices } from "../../utils/api/user/services";
import { authServices } from "../../utils/api/auth/services";
import SummarizeIcon from '@mui/icons-material/Summarize';
     

const data = {
  balance: 0,
  libality: 0,
  uplineAmount: 0,
};

const Headers = () => {
  const [wallet, setWallet] = useState(data);
  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mouseOverButton, setMouseOverButton] = React.useState<Boolean>(false);
  const [mouseOverMenu, setMouseOverMenu] = React.useState<Boolean>(false);

  useEffect(() => {
    const getWallet = async () => {
      const { response } = await userServices.wallet();
      if (response?.data) {
        setWallet(response.data);
      }
    };
    getWallet();
    return () => {};
  }, []);

  // const handleClick = async (e: any) =>  await authServices.logout();


  async function clickHandler(){
    const {response} =await authServices.logout();
    localStorage.removeItem("token");
    navigation("/welcome");
    }


  const handleClose = () => {
    setAnchorEl(null);
  };
  const enterButton = (event: any) => {
    setAnchorEl(event.currentTarget);
    setMouseOverButton(true);
  };

  const leaveButton = () => {
    setTimeout(() => {
      setMouseOverButton(false);
    }, 200);
  };

  const enterMenu = () => {
    setMouseOverMenu(true);
  };

  const leaveMenu = () => {
    setMouseOverMenu(false);
  };
  const open = Boolean(mouseOverButton || mouseOverMenu);

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton title="Go back" onClick={() => navigation(-1)}>
          <KeyboardBackspaceIcon fontSize="large" htmlColor="white" />
        </IconButton>
        <Box>
          <HeaderTextStyle></HeaderTextStyle>
          <HeaderTextStyle>
            Coins: {wallet.balance}
          </HeaderTextStyle>
          <HeaderTextStyle>
            Liability: { wallet.libality}
          </HeaderTextStyle>
        </Box>
        <IconButton
          // onClick={handleClick}
          onMouseOver={enterButton}
          onMouseLeave={leaveButton}
        >
          <UserIconImage src="/user.png" alt="" />
        </IconButton>
        {/* <Box>
          <IconButton>
            <LogoutIcon fontSize="large" htmlColor="white" />
          </IconButton>
          <Typography>Logout</Typography>
        </Box> */}
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 10 }}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          onMouseOver: enterMenu,
          onMouseLeave: leaveMenu,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
        <Box style={{display:"flex"}}>
        <Link to="/deposit">
          <MenuItem>
          <Button variant="contained" style={{borderRadius:"10px"}} color="success">Deposit</Button>
            {/* <Avatar  /> <a style={{color:"black"}}> Deposit </a> */}
          </MenuItem>
        </Link>
        <Link to="/withdraw">
          <MenuItem>
          <Button variant="contained" style={{borderRadius:"10px"}} color="error">Withdraw</Button>
            {/* <Avatar  /> <a style={{color:"black"}}> Profile </a> */}
          </MenuItem>
        </Link>
        </Box>
        <Link to="/profile">
          <MenuItem>
            <Avatar  /> <a style={{color:"black"}}> Profile </a>
          </MenuItem>
        </Link>
        <Link to="/account-summary">
          <MenuItem >
            <AttachMoneyIcon style={{ color:"black"}}/> <a style={{color:"black"}}>Account Statement</a> 
          </MenuItem>
        </Link>
        <Link to="/login-history">
          <MenuItem>
            <SummarizeIcon  style={{ color:"black"}}/> <a style={{color:"black"}}> Login History </a>
          </MenuItem>
        </Link>
        <Link to="/current-bet">
          <MenuItem>
            <AttachMoneyIcon  style={{ color:"black"}}/> <a style={{color:"black"}}> Current Bet</a>
          </MenuItem>
        </Link>
        <Link to="/bet-history">
          <MenuItem>
            <AttachMoneyIcon style={{ color:"black"}}/> <a style={{color:"black"}}> Bet History</a>
          </MenuItem>
        </Link>
        
        <Link to="/set-button-value">
          <MenuItem>
            <MoneyIcon  style={{ color:"black"}}/> <a style={{color:"black"}}> Set button value </a>
          </MenuItem>
        </Link>
        <Divider />
        {/* <MenuItem onClick={handlePasswordChangeClick}>
          <ListItemIcon>
            <LockResetIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
        onClick={clickHandler}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

// export default function ProminentAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <StyledToolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h5"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, alignSelf: "flex-end" }}
//           >
//             MUI
//           </Typography>
//           <IconButton size="large" aria-label="search" color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton
//             size="large"
//             aria-label="display more actions"
//             edge="end"
//             color="inherit"
//           >
//             <MoreIcon />
//           </IconButton>
//         </StyledToolbar>
//       </AppBar>
//     </Box>
//   );
// }
export default Headers;
