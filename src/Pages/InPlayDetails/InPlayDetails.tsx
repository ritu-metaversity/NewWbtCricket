import { ScoreCardGrid } from "../../components/InPlayDetails/ScoreCardGrid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { TitleStyled } from "../../components/custom/styledComponents";
import Bet from "../../components/InPlayDetails/Bet";
import BetRecord from "../../components/InPlayDetails/BetRecord";
import { ExpandCircleDown } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { sportServices } from "../../utils/api/sport/services";

const InPlayDetails = () => {
  const commentary = "MELDOURNE STARS WOMAN WON BY 4 WKTS ";
  const [eventId, setEventId] = useState(0);
  const [odds, setOdds] = useState<any>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("event-id"));
  useEffect(() => {
    const eventId = searchParams.get("event-id");
    if (eventId && Number(eventId)) setEventId(Number(eventId));
    return () => {
      setEventId(0);
    };
  }, [searchParams]);
  let intervalId:any;

  const getOdds = useCallback(async () => {
    if (!eventId) return;
    const { response } = await sportServices.eventOdds(eventId);
    if (response) {
      console.log(response);
      setOdds(response?.data)
    }
  }, [eventId]);

  useEffect(() => {
    getOdds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // intervalId = setInterval(() => {
    //   getOdds();
    // },500)

    return ()=> clearInterval(intervalId)
  }, [getOdds]);

  if (!eventId  ) {
    return <div>Invalid Url</div>;
  }
  if (!odds) {
    return <div>Loading ....</div>;
  }

  return (
    <Box>
      <TitleStyled>{commentary}</TitleStyled>
      <ScoreCardGrid />

      <Bet {...odds} />
      <BetRecord />
    </Box>
  );
};

export default InPlayDetails;
