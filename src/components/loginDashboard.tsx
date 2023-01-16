import { AppBar, Box, Button, Checkbox, FormControlLabel, IconButton, Tab, Tabs, TextField, Toolbar, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { SummaryCardProps } from "./Inplay/SummaryCard";
import { HeaderTextStyle, UserIconImage } from "./Layout/styledComponents";
import "./loginDashboard.css";
import { authServices } from "../utils/api/auth/services";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SummaryCardWithOutLogin from "./Inplay/SummaryCardWithOutLogin";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HomeIcon from '@mui/icons-material/Home';
import PushPinIcon from '@mui/icons-material/PushPin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const LoginDashboard = () => {

    const [activeSportList, setActiveSportList] = useState([]);
  const [activeEventList, setActiveEventList] = useState<SummaryCardProps[]>([]);
  const [tabValue, setTab] = useState(0);
  const [show, setShow]=useState(false);
  useEffect(() => {
    const getList = async () => {
      const { response } = await authServices.activeSportList();
      console.log(JSON.stringify(response));
      if (response?.data) {
        setActiveSportList(response.data);
      }
    };
    getList();
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    const getNewEvent = async () => {
      console.log(activeSportList);
      if(!activeSportList.length) return;
      const { sportId } = activeSportList[tabValue];
      if (!sportId) return;
      
      const { response } = await authServices.activeEventFromSport(sportId);
      if (response?.data) {
      
        
        if (response?.data?.length > 0) {
          setActiveEventList(response.data)
          setShow(false)
        }
      } else {
        setActiveEventList([]);
        setShow(true)
      }
    };
    getNewEvent();
  }, [tabValue, activeSportList]);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

    return (
        <>
            <AppBar position="sticky" style={{ backgroundColor: "#757ce8" }} enableColorOnDark>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* <IconButton title="Go back" onClick={() => navigation(-1)}>
            <KeyboardBackspaceIcon fontSize="large" htmlColor="white" />
          </IconButton> */}
                    <h3>Exchange</h3>
                    <Box>
                        <HeaderTextStyle></HeaderTextStyle>
                        <HeaderTextStyle>

                        </HeaderTextStyle>
                        <HeaderTextStyle>
                            {/* Liability: { wallet.libality} */}
                        </HeaderTextStyle>
                    </Box>
                    <div style={{ display: "flex" }}>
                        <Button sx={{fontSize:"0.7rem"}} variant="contained" color="primary">
                        <Link to={"/sign-in"}>
                            Login
                            </Link>
                        </Button>
                        <Button sx={{fontSize:"0.7rem"}} style={{ marginLeft: "10px" }} variant="contained" color="secondary">
                        <Link to={"/sign-in"}>
                            Sign Up
                            </Link>
                        </Button>
                    </div>
                    {/* <Box>
            <IconButton>
              <LogoutIcon fontSize="large" htmlColor="white" />
            </IconButton>
            <Typography>Logout</Typography>
          </Box> */}
                </Toolbar>

            </AppBar>
            <Box py={2} m="auto" boxSizing={"content-box"} maxWidth={{ xs:"100vw",lg:"lg" }}>

            <Box maxWidth={900} mx="auto">
      <Tabs
        value={tabValue}
        scrollButtons
        variant="scrollable"
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{overflowX:'scroll', width:'100%', fontSize:{xs:'.8rem'}}}
        >
        {activeSportList.map((s: any) => (
          <Tab key={s.sportId+"tab"} label={s?.sportName} {...a11yProps(0)} />
          ))}
      </Tabs>
      {activeEventList?.length > 0 ? (
        activeEventList.map((item) => 
        
        <SummaryCardWithOutLogin key={item.matchId+"summaryCard"}
        {...item} />
        
        
        )
        ) : ( show &&
          <Typography mt="15vh" variant="h4" color="error">
          {"No active event found"}
        </Typography>
      )}
    </Box>
      </Box>
                <div className="appBottomMenu" >
                    <a >
                    <Link to={"/sign-in"}>
                           <EmojiEventsIcon /><br />
                       <strong>Sports</strong>
                       </Link>
                    </a>
                    <a >
                    <Link to={"/sign-in"}>
                        <AccessAlarmIcon /><br/> <strong>In-Play</strong>
                        </Link>
                    </a>
                    <a >
                    <Link to={"/sign-in"}><HomeIcon /><br /> <strong>Home</strong></Link>
                    </a>
                    <a ><Link to={"/sign-in"}><PushPinIcon /><br />
                    <strong>Market</strong></Link>
                    </a>
                    <a ><Link to={"/sign-in"}><AccountCircleIcon /><br />
                    <strong>Account</strong>
                    </Link>
                    </a>
                </div>
            {/* </footer> */}
        </>
    )

}


export default LoginDashboard;