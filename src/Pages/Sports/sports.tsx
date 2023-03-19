import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import SummaryCard, {
  SummaryCardProps,
} from "../../components/Inplay/SummaryCard";
import { sportServices } from "../../utils/api/sport/services";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Sports = () => {
  const [activeSportList, setActiveSportList] = useState([]);
  const [activeEventList, setActiveEventList] = useState<SummaryCardProps[]>(
    []
  );
  const [tabValue, setTab] = useState(0);
  const [show, setShow] = useState(false);
  const { loading, setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, Inplay: true }));
      const { response } = await sportServices.activeSportList();
      console.log(JSON.stringify(response));
      if (response?.data) {
        setActiveSportList(response.data);
      }
      setLoading && setLoading((prev) => ({ ...prev, Inplay: false }));
    };
    getList();
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    const getNewEvent = async () => {
      setLoading && setLoading((prev) => ({ ...prev, getNewEvent: true }));
      console.log(activeSportList);
      if (!activeSportList.length) return;
      const { sportId } = activeSportList[tabValue];
      if (!sportId) return;

      const { response } = await sportServices.activeEventFromSport(sportId);
      if (response?.data) {
        if (response?.data?.length > 0) {
          setActiveEventList(response.data);
          setShow(false);
        }
      } else {
        setActiveEventList([]);
        setShow(true);
      }
      setLoading && setLoading((prev) => ({ ...prev, getNewEvent: false }));
    };

    getNewEvent();

    const timer = setInterval(() => getNewEvent(), 60000);
    return () => clearInterval(timer);
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
          <Tab key={s.sportId + "tab"} label={s?.sportName} {...a11yProps(0)} />
        ))}
      </Tabs>
      {activeEventList?.length > 0
        ? activeEventList.map((item) => (
            <SummaryCard key={item.matchId + "summaryCard"} {...item} />
          ))
        : show && (
            <Typography mt="15vh" variant="h4" color="error">
              {"No active event found"}
            </Typography>
          )}
    </Box>
  );
};

export default Sports;
