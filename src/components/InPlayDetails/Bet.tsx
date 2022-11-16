import { ExpandCircleDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Grid,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { TitleStyled } from "../custom/styledComponents";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";

const Bet = () => {
  const [amount, setAmount] = useState(10);
  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandCircleDown />}>
          Match Odds
        </AccordionSummary>
        <AccordionDetails>
          <MatchOddsGrid />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandCircleDown />}>
          Session Odds
        </AccordionSummary>
        <AccordionDetails>
          <SessionOddsGrid />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandCircleDown />}>
          Bookmaker Odds
        </AccordionSummary>
        <AccordionDetails>
          <MatchOddsGrid />
        </AccordionDetails>
      </Accordion>

      <Box
        display="flex"
        flexDirection={"column"}
        gap={2}
        my={3}
        alignItems="center"
      >
        <TitleStyled width="100%">Amount</TitleStyled>
        <TextField
          size="small"
          sx={{ width: "200px", margin: "auto" }}
          value={amount}
          onChange={handleChange}
        />

        <ButtonGroup sx={{ maxWidth: "100%" }}>
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((item) => (
            <Button onClick={() => setAmount(item)}>{item}</Button>
          ))}
        </ButtonGroup>
        <Button variant="contained" sx={{ width: "200px", m: "auto" }}>
          Bet
        </Button>
      </Box>
    </>
  );
};
const BetGridItemGridItemProps = {
  item: true,
  bgcolor: "white",
  p: 0.5,
  fontWeight: 700,
};

const BetGridItem = ({ title, values }: { title?: boolean; values: any[] }) => {
  const Props = {
    ...BetGridItemGridItemProps,
    ...(title
      ? {
          bgcolor: blue[50],
          color: "primary.main",
        }
      : {}),
  };
  return (
    <>
      <Grid {...Props} xs={5.7} lg={5.9}>
        {values[0]}
      </Grid>
      <Grid {...Props} xs={3}>
        {values[1]}
      </Grid>
      <Grid {...Props} xs={3}>
        {values[2]}
      </Grid>
    </>
  );
};

export default Bet;

function MatchOddsGrid({}) {
  return (
    <Grid container bgcolor="#dfdfdf" gap={0.5} p={1}>
      <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
      <BetGridItem
        values={[
          "SYDNEY W: 0",
          <BetText color="blue">0.00</BetText>,
          <BetText color="red">0.00</BetText>,
        ]}
      />
      <BetGridItem
        values={[
          "MELBOURNE W: 0",
          <BetText color="blue">0.00</BetText>,
          <BetText color="red">0.00</BetText>,
        ]}
      />
      {/* <BetGridItem title /> */}
    </Grid>
  );
}

function SessionOddsGrid({}) {
  return (
    <Grid container bgcolor="#dfdfdf" gap={0.5} p={1}>
      <BetGridItem title values={["SESSION", "NOT", "YES"]} />
      <BetGridItem
        values={[
          <>
            <BetTextMedium>6 OVER RUNS ST W</BetTextMedium>
            <BetTextSmall>Session Limit: 50k</BetTextSmall>
          </>,
          <BetText color="red">
            35
            <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
          <BetText color="blue">
            35 <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
        ]}
      />{" "}
      <BetGridItem
        values={[
          <>
            <BetTextMedium>6 OVER RUNS ST W</BetTextMedium>
            <BetTextSmall>Session Limit: 50k</BetTextSmall>
          </>,
          <BetText color="red">
            35
            <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
          <BetText color="blue">
            35 <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
        ]}
      />{" "}
      <BetGridItem
        values={[
          <>
            <BetTextMedium>6 OVER RUNS ST W</BetTextMedium>
            <BetTextSmall>Session Limit: 50k</BetTextSmall>
          </>,
          <BetText color="red">
            35
            <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
          <BetText color="blue">
            35 <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
        ]}
      />{" "}
      <BetGridItem
        values={[
          <>
            <BetTextMedium>6 OVER RUNS ST W</BetTextMedium>
            <BetTextSmall>Session Limit: 50k</BetTextSmall>
          </>,
          <BetText color="red">
            35
            <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
          <BetText color="blue">
            35 <BetTextSmall>1.00</BetTextSmall>
          </BetText>,
        ]}
      />
      {/* <BetGridItem title /> */}
    </Grid>
  );
}
