import { Box, Tab, Tabs, Typography, Grid, tabClasses } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import SummaryCard, {
  SummaryCardProps,
} from "../../components/Inplay/SummaryCard";
import { sportServices } from "../../utils/api/sport/services";
import Match from "../../components/Inplay/Match";
import UpperBanner from "../../components/UpperBanner";
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../InPlay/BackBtn/BackBtn";

interface InplayInterface {
  sportId: string;
  sportid: number;
  sportImage: string;
  sportName:string;
  matchList: SummaryCardProps[]; // Assuming SummaryCardProps is imported
}


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Sports = () => {
  const [activeSportList, setActiveSportList] = useState<any>([]);
  const [activeEventList, setActiveEventList] = useState<SummaryCardProps[]>(
    []
  );
  const [gameIdForItemPage, setgameIdForItemPage] = useState(4);


  const [tabValue, setTab] = useState(0);
  const [show, setShow] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const { isSignedIn } = useContext(LoaderContext);

  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, Inplay: true }));
      const { response } = await sportServices.activeSportList();
      if (response?.data) {
        setActiveSportList(response.data);
      }
      setLoading && setLoading((prev) => ({ ...prev, Inplay: false }));
    };
    getList();
  }, [setLoading]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    const getNewEvent = async (withLoading: boolean) => {
      withLoading &&
        setLoading &&
        setLoading((prev) => ({ ...prev, getNewEvent: true }));
      if (!activeSportList.length) return;
      const { sportId } = activeSportList[tabValue];
      if (!sportId) return;


      const { response } = await sportServices.activeEventFromSport(gameIdForItemPage);

      if (response?.data) {
        if (response?.data?.length > 0) {
          setActiveEventList(response.data);
          setShow(false);
        } else {
          setActiveEventList([]);
          setShow(true);
        }
      } else {
        setActiveEventList([]);
        setShow(true);
      }
      withLoading &&
        setLoading &&
        setLoading((prev) => ({ ...prev, getNewEvent: false }));
    };

    getNewEvent(true);

    const timer = setInterval(() => getNewEvent(false), 60000);
    return () => clearInterval(timer);
  }, [gameIdForItemPage, activeSportList, setLoading]);

  const handleMatchId = (val: number) => {
    setgameIdForItemPage(val)
  }

  const navigate = useNavigate();



  return (
    <>
    <UpperBanner />

      {/* <Box sx={{ marginBottom: '40px' }} maxWidth={900} mx="auto"
        style={{ border: "0.5px solid black" }}

      >
        

        <Tabs
          sx={{ backgroundColor: '#dddddd' }}
          value={tabValue}
          TabIndicatorProps={{ sx: { display: "none" } }}
          onChange={handleChange}
          aria-label="basic tabs example"
          scrollButtons
          variant="scrollable"
          style={{ border: "0.5px solid black" }}
        >
          {activeSportList.map((s: any, index: any) => (
            <Tab sx={{ [`&.${tabClasses.selected}`]: { color: "white" }, bgcolor: tabValue === index ? "#002d5b!important" : "" }} key={s.sportId + "tab"} label={s?.sportName} {...a11yProps(0)} />
          ))}
        </Tabs>

        <Grid
          container
          // background-color: #002d5b!important;
          bgcolor="#002d5b!important"
          p={{ xs: "15px", lg: "15px" }}
          // sx={{ cursor: "pointer" }}
          m={{ lg: 0 }}
       
        >
          <Grid item xs={0} display={{ xs: "none", lg: "block" }} lg={6.6} color="#fff">Match Name</Grid>
          <Grid item xs={4} lg={1.8} color="#fff">1</Grid>
          <Grid item xs={4} lg={1.8} color="#fff">x</Grid>
          <Grid item xs={4} lg={1.8} color="#fff">2</Grid>
        </Grid>
        {activeEventList?.length > 0
          ? activeEventList.map((item) => (
            <Match matches={item} sportId={activeSportList[tabValue]?.sportId} />
          ))
          : show && (

            <Typography variant="h6" color="error" border="1px solid black">
              {"No active event found"}
            </Typography>

          )}
      </Box> */}

      <div>
        <ul className='games-types'>
          {activeSportList?.map((item: InplayInterface) => {
            return (
              <li className={+item?.sportId == gameIdForItemPage ? "active" : ""} key={item.sportId} onClick={() => handleMatchId(+item?.sportId)}>

                <img src={`/${item?.sportName}.png`} alt={item?.sportName} />

                {item?.sportName}
              </li>
            )
          })}
        </ul>
      </div>
      {
        activeEventList?.map((res) => {
          return (
            <div className='old-matches-list live-match' onClick={() =>
              navigate(
                isSignedIn
                  ? "/in-play-details/?event-id=" + res.matchId
                  : "/sign-in"
              )
            }>
              <div className='TeamName'>
                <Link to='/'>
                  {res?.matchName}
                  {
                    res?.inPlay && <span className='d-inline-flex align-items-center float-left mx-2'>
                    <div className='blink'>

                    </div>
                  </span>
                  }
                  
                </Link>
              </div>
              <div className='old-match-details'>
                <Link to='/'>
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td width="1%"></td>
                        <td className='GameList' style={{ verticalAlign: "top" }}>
                          <table width="99%">
                            <tbody>
                              <tr>
                                <td className="GameList" align="center">{res?.openDate}</td>
                              </tr>
                              <tr>
                                <td className="GameList" align="center">MATCH BETS : <span>0</span></td>
                              </tr>
                              <tr>
                                <td className="GameList" align="center">Session Bets : <span>0</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td width="1%"></td>
                      </tr>
                    </tbody>
                  </table>
                </Link>

              </div>
            </div>
          )
        })
      }
 <BackBtn />
    </>

  );
};

export default Sports;
