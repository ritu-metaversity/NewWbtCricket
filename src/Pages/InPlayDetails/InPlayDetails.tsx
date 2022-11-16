import { ScoreCardGrid } from "../../components/InPlayDetails/ScoreCardGrid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { TitleStyled } from "../../components/custom/styledComponents";
import Bet from "../../components/InPlayDetails/Bet";
import BetRecord from "../../components/InPlayDetails/BetRecord";
import { ExpandCircleDown } from "@mui/icons-material";

const InPlayDetails = () => {
  const commentary = "MELDOURNE STARS WOMAN WON BY 4 WKTS ";
  return (
    <Box>
      <TitleStyled>{commentary}</TitleStyled>
      <ScoreCardGrid />
      <Bet />
      <BetRecord />
    </Box>
  );
};

export default InPlayDetails;
