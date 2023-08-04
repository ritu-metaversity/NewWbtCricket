import { Box, Tab, Tabs, Typography, Grid, tabClasses } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import SummaryCard, {
  SummaryCardProps,
} from "../../components/Inplay/SummaryCard";
import { sportServices } from "../../utils/api/sport/services";
import Match from "../../components/Inplay/Match";


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

  const [tabValue, setTab] = useState(0);
  const [show, setShow] = useState(false);
  console.log(activeSportList, "tabValuetabValue")
  const { setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, Inplay: true }));
      const { response } = await sportServices.activeSportList();
      console.log(JSON.stringify(response));
      if (response?.data) {
        console.log(response.data, "adklsjhvbhghvbn")
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
      console.log(activeSportList);
      if (!activeSportList.length) return;
      const { sportId } = activeSportList[tabValue];
      console.log(sportId, "spoeqweqwrtIdsportIdsportIdsportId")
      if (!sportId) return;

      const { response } = await sportServices.activeEventFromSport(sportId);
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
  }, [tabValue, activeSportList, setLoading]);

  // console.log(activeEventList, "sporasdftid");

  return (
    <Box maxWidth={900} mx="auto"
      style={{ border: "0.5px solid black" }}
      
    >
      {/* <BacktoMenuButton /> */}
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
          <Tab sx={{ [`&.${tabClasses.selected}`]: { color: "white" }, bgcolor: tabValue === index ? "#7b7c7f" : "" }} key={s.sportId + "tab"} label={s?.sportName} {...a11yProps(0)} />
        ))}
      </Tabs>

      <Grid
        container
        // background-color: #7b7c7f;
        bgcolor="#7b7c7f"
        p={{ xs: "15px", lg: "15px" }}
        // sx={{ cursor: "pointer" }}
        m={{ lg: 0 }}
      // border="0.5px solid black"
      // gap={{ xs: 0.5, lg: 0 }}
      // borderBottom={{ xs: "", lg: "1px solid rgba(60,68,75)" }}
      >
        <Grid item xs={0} display={{ xs: "none", lg: "block" }} lg={6.6} color="#fff">Match Name</Grid>
        <Grid item xs={4} lg={1.8} color="#fff">1</Grid>
        <Grid item xs={4} lg={1.8} color="#fff">x</Grid>
        <Grid item xs={4} lg={1.8} color="#fff">2</Grid>
      </Grid>
      {activeEventList?.length > 0
        ? activeEventList.map((item) => (
          <Match matches={item} sportId={activeSportList[tabValue]?.sportId} />
          // <SummaryCard key={item.matchId + "summaryCard"} {...item} />
        ))
        : show && (

          <Typography variant="h6" color="error" border="1px solid black">
            {"No active event found"}
          </Typography>

        )}
    </Box>
  );
};

export default Sports;
