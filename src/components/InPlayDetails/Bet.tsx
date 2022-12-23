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
import React, { FC, useEffect, useState } from "react";
import { TitleStyled } from "../custom/styledComponents";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import { sportServices } from "../../utils/api/sport/services";
import "./custom.css"

interface BetProps {
  Odds: MatchOddsGridProps[];
  Bookmaker: MatchOddsGridProps[];
}
const Bet:FC<BetProps> = ({Odds, Bookmaker}) => {
  const [amount, setAmount] = useState(10);
  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };


  const [activeFancy, setActiveFancy]=useState<any[]>([]);
  const [matchOdd, setMatchOdds]=useState<any[]>([]);
  const [preMatchOdds, setPreMetchOdds]=useState<any[]>([]);

  useEffect(() => {
    const getData=async () => {
      const { response } = await sportServices.getActiveFancy(31975576);
      if(response?.data?.marketList){
     
        setActiveFancy(response.data.marketList)
      }
    }
    getData();
  },[]);

  
  useEffect(() =>{
    const getOdds =async () => {
      const request=activeFancy.map(item => item.marketId).join(", ");
      const { response }= await sportServices.getMatchOdds(request);
      if(response){
        if(matchOdd.length){
          setPreMetchOdds([...matchOdd])
        }else{
          setPreMetchOdds(response)
        }
        setMatchOdds(response)
      }
    };
    setTimeout(()=> getOdds(),1000)
  },[activeFancy, matchOdd])
  return (
    <>{
     activeFancy.map(item =>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandCircleDown />}>
          { item?.type}
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {
            matchOdd.map((match,index) =>{
              if(match.marketId === item.marketId){
                  return <MatchOddsGrid CurrentOdd={match} PrevOdds={preMatchOdds[index]} />
              }
            })
          }
          
        </AccordionDetails>
      </Accordion>
      )
    }
      

      {/* {Bookmaker && <Accordion>
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
      </Accordion> */}

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
  runners: {
    back1price: number;
    lay1price: number;
    team: string;
    runnerStatus: string;
    selectionId: number;
    ex:{
    availableToBack:{
      price:string,
      size:string
    }[],
    availableToLay:{
      price:string,
      size:string
    }[];
  }
  }[];
  maxBet: number;
  betDelay: number;
  inPlay: boolean;
  isActive: boolean;
  isPause: boolean;
  status: string;
}
const MatchOddsGrid: FC<{CurrentOdd:MatchOddsGridProps;PrevOdds:MatchOddsGridProps}> = ({CurrentOdd,PrevOdds}
  ) => {
   
  const { runners,status, maxBet, betDelay, isActive, isPause, inPlay }=CurrentOdd;
  const { runners:PrevRunner }=PrevOdds;
  // if (!runner) { return null; }

  return (
    <>
      <Box display="flex" justifyContent={"space-evenly"}>
        <BetTextMedium>Max Bet:{maxBet}</BetTextMedium>
        <BetTextMedium>Bet Delay:{betDelay}</BetTextMedium>
      </Box>
      
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        {
          runners.map((item,index) =>{
           return <BetGridItem
          suspended={
            ["SUSPENDED", "CLOSED"].includes(status) 
            // status === "SUSPENDED" ||
            // !isActive ||
            // isPause ||
            // !inPlay
          }
          values={[
            item.selectionId,
            <Box className={PrevRunner[index].ex.availableToBack[0].price < item.ex.availableToBack[0].price
              ? "odds-up"
              : PrevRunner[index].ex.availableToBack[0].price > item.ex.availableToBack[0].price
              ? "odds-down"
              : ""}>
            <BetText color="blue">{item.ex.availableToBack[0].price}</BetText>
            {item.ex.availableToBack[0].size}
            </Box>,
            <Box  className={PrevRunner[index].ex.availableToLay[0].price < item.ex.availableToLay[0].price
              ? "odds-up"
              : PrevRunner[index].ex.availableToLay[0].price > item.ex.availableToLay[0].price
              ? "odds-down"
              : ""}><BetText color="red">{item.ex.availableToLay[0].price}</BetText>
            {item.ex.availableToLay[0].size}</Box>
            
          ]}
        />
          })
          
        }
        
        {/* <BetGridItem
          suspended={
            ["SUSPENDED", "CLOSED"].includes(status) ||
            runners[1]?.runnerStatus === "SUSPENDED" ||
            !isActive ||
            isPause ||
            !inPlay
          }
          values={[
            runners[1]?.team,
            <BetText color="blue">{runners[1]?.back1price}</BetText>,
            <BetText color="red">{runners[1]?.lay1price}</BetText>,
          ]}
        /> */}
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
