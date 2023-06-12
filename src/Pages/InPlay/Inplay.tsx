import { ExpandCircleDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import SummaryCard, {
  SummaryCardProps,
} from "../../components/Inplay/SummaryCard";
import { sportServices } from "../../utils/api/sport/services";
import Match from "../../components/Inplay/Match";

interface InplayInterface {
  sportId: string;
  name: string;
  matchList: SummaryCardProps[];
}

const Inplay = () => {
  const [activeEventList, setActiveEventList] = useState<InplayInterface[]>([]);

  const { loading, setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getList = async (withLoading: boolean) => {
      withLoading &&
        setLoading &&
        setLoading((prev) => ({ ...prev, Inplay: true }));
      const { response } = await sportServices.inplay();
      console.log(JSON.stringify(response));
      if (response?.data) {
        setActiveEventList(response.data);
      }
      withLoading &&
        setLoading &&
        setLoading((prev) => ({ ...prev, Inplay: false }));
    };

    getList(true);
    const timer = setInterval(() => {
      getList(false);
    }, 60000);
    return () => clearInterval(timer);
  }, [setLoading]);

  return (
    <Box maxWidth={900} mx="auto">
      <BacktoMenuButton />

      {activeEventList?.length > 0
        ? activeEventList.map((sportItem) => (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandCircleDown />}>
                {sportItem.name}
              </AccordionSummary>
              <AccordionDetails sx={{ px: 1 }}>
                {sportItem.matchList.map((item) => (
                  // <SummaryCard key={item.matchId + "summaryCard"} {...item} />
                  <Match matches={item} sportId={sportItem.sportId} />
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        : !loading.Inplay && (
            <Typography mt="15vh" variant="h4" color="error">
              {"No active event found"}
            </Typography>
          )}
    </Box>
  );
};

export default Inplay;
