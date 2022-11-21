import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import SummaryCard from "../../components/Inplay/SummaryCard";
import { sportsResourses } from "../../utils/api/sport/resources";
import { sportServices } from "../../utils/api/sport/services";

const data = {
  id: "",
  matchName: "SYDNEY SIXERS W V MELBOURNE RENEGADES W (WBBL T-20)",
  openDate: "2022-11-10 09:30:00",
  to: "/in-play-details",
  gridData: [
    {
      title: "Match Bets: ",
      value: 0,
    },
    {
      title: "Session Bets: ",
      value: 0,
    },
    {
      title: "Declared: ",
      value: "No",
    },
    {
      title: "Won By: ",
      value: "nil",
    },
  ],
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Inplay = () => {
  const [activeSportList, setActiveSportList] = useState([]);
  const [activeEventList, setActiveEventList] = useState([]);
  const [tabValue, setTab] = useState(0);
  useEffect(() => {
    const getList = async () => {
      const { response } = await sportServices.activeSportList();
      console.log(response);
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
      const { sportid } = activeSportList[tabValue];
      if (!sportid) return;

      const { response } = await sportServices.activeEventFromSport(sportid);

      if (response?.data) {
        // setActiveEventList(response.data);
        if (response?.data?.length > 0) {
          const events = response?.data.map((item: any) => item.eventId);
          const { response: response1 } = await sportServices.matchOdds(events);
          console.log(response1);
          if (response1?.data?.length > 0) {
            const newEventList = response.data.map((event: any) => {
              const match = response1.data.find(
                (i: any) => i.matchId === event.eventId
              );
              event["inPlay"] = match?.inPlay;
              event["runner"] = match?.runner;
              return event;
            });
            setActiveEventList(newEventList);
            console.log(newEventList);
          }
        }
      } else {
        setActiveEventList([]);
      }
    };
    getNewEvent();
  }, [tabValue, activeSportList]);
  return (
    <Box maxWidth={900} mx="auto">
      <BacktoMenuButton />
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {activeSportList.map((s: any) => (
          <Tab label={s?.name} {...a11yProps(0)} />
        ))}
      </Tabs>
      {activeEventList?.length > 0 ? (
        activeEventList.map((item) => <SummaryCard data={item} />)
      ) : (
        <Typography mt="15vh" variant="h4" color="error">
          {"No active event found"}
        </Typography>
      )}
    </Box>
  );
};

export default Inplay;
