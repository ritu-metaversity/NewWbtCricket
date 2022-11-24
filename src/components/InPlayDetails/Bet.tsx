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
import React, { FC, useState } from "react";
import { TitleStyled } from "../custom/styledComponents";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";

interface BetProps {
  Odds: MatchOddsGridProps[];
  Bookmaker: MatchOddsGridProps[];
}
const Bet:FC<BetProps> = ({Odds, Bookmaker}) => {
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
        <AccordionDetails sx={{ p: 0 }}>
          <MatchOddsGrid {...Odds[0]} />
        </AccordionDetails>
      </Accordion>

      {Bookmaker && <Accordion>
        <AccordionSummary expandIcon={<ExpandCircleDown />}>
          Bookmaker Odds
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <MatchOddsGrid {...Bookmaker[0]} />
        </AccordionDetails>
      </Accordion>}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandCircleDown />}>
          Session Odds
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <SessionOddsGrid />
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
  marginInline:"auto"
};

const BetGridItem = ({ title, values, suspended }: { title?: boolean; suspended?:boolean, values: any[] }) => {
  const Props = {
    ...BetGridItemGridItemProps,
    ...(title
      ? {
          bgcolor: blue[50],
          color: "primary.main",
        }
      : {}),
  };
  const gridItems = (
    <>
      <Grid {...Props} xs={3}>
        {values[1]}
      </Grid>
      <Grid {...Props} xs={3}>
        {values[2]}
      </Grid>
    </>
  );
  return (
    <>
      <Grid {...Props} xs={5.6} lg={5.9}>
        {values[0]}
      </Grid>
      {!title && suspended ? (
        <Grid item xs={6.2} lg={6}>
          <Grid display="grid">
            <Box
              sx={{
                gridArea: "1/1",
                color: "#FF3B3C",
                padding: 0.5,
                fontWeight: 700,
                position: "relative",
                bgcolor: "rgba(0,0,0,0.7)",
              }}
            >
              Suspended
            </Box>
            <Grid container sx={{ gridArea: "1/1" }} columns={6}>
              {gridItems}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>{gridItems}</>
      )}
    </>
  );
};

export default Bet;

interface MatchOddsGridProps {
  runner: {
    back1price: number;
    lay1price: number;
    team: string;
    runnerStatus: string;
    selectionId: number;
  }[];
  maxBet: number;
  betDelay: number;
  inPlay: boolean;
  isActive: boolean;
  isPause: boolean;
  status: string;
}
const MatchOddsGrid: FC<MatchOddsGridProps> = ({ runner,status, maxBet, betDelay, isActive, isPause, inPlay }) => {
  if (!runner) { return null; }
  console.log(isActive,isPause,inPlay,"21");
  return (
    <>
      <Box display="flex" justifyContent={"space-evenly"}>
        <BetTextMedium>Max Bet:{maxBet}</BetTextMedium>
        <BetTextMedium>Bet Delay:{betDelay}</BetTextMedium>
      </Box>
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        <BetGridItem
          suspended={
            ["SUSPENDED", "CLOSED"].includes(status) ||
            runner[0]?.runnerStatus === "SUSPENDED" ||
            !isActive ||
            isPause ||
            !inPlay
          }
          values={[
            runner[0]?.team,
            <BetText color="blue">{runner[0]?.back1price}</BetText>,
            <BetText color="red">{runner[0]?.lay1price}</BetText>,
          ]}
        />
        <BetGridItem
          suspended={
            ["SUSPENDED", "CLOSED"].includes(status) ||
            runner[1]?.runnerStatus === "SUSPENDED" ||
            !isActive ||
            isPause ||
            !inPlay
          }
          values={[
            runner[1]?.team,
            <BetText color="blue">{runner[1]?.back1price}</BetText>,
            <BetText color="red">{runner[1]?.lay1price}</BetText>,
          ]}
        />
        {/* <BetGridItem title /> */}
      </Grid>
    </>
  );
}

function SessionOddsGrid({}) {
  return (
    <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
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
