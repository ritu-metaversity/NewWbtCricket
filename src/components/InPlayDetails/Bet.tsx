import { ExpandCircleDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
// import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { FC, useContext, useEffect, useState } from "react";
import { TitleStyled } from "../custom/styledComponents";
import { sportServices } from "../../utils/api/sport/services";
import "./custom.css";
import axios from "axios";
import BookMakerOddsgrid from "./BookmakerOddsGrid";
import { LoaderContext } from "../../App";
import ButtonGroupComponent from "./ButtonGroupComponent";
import { MatchOddsGrid } from "./MatchOddsGrid";
import { SessionOddsGrid } from "./SessionOddsGrid";
import BetSlip from "./BetSlip";
import { BetDetailsInterface } from "./types";

// const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

const Bet: FC<any> = (props: { event: number }) => {
  const [amount, setAmount] = useState(10);
  const [buttonData, setButtonData] = useState<{ [x: string]: number }>({});
  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  const [activeFancy, setActiveFancy] = useState<any[]>([]);
  const [matchOdd, setMatchOdds] = useState<any[]>([]);
  const [preMatchOdds, setPreMetchOdds] = useState<any[]>([]);
  const [preFancyOdds, setPreFancyOdds] = useState<any>();
  const [bookmakerOdd, setBookMakerOdds] = useState<any[]>([]);
  const [originBookMaker, setOriginbookMaker] = useState<any[]>([]);
  const [prvbookmakerOdd, setPrvBookMakerOdds] = useState<any>();
  const [bookmakerToss, setBookMakerToss] = useState<any[]>([]);
  const [preBookmakerToss, setPreBookMakerToss] = useState<any[]>([]);
  const [fancyPnl, setFancyPnl] = useState<FancyPnl[]>([]);
  const [oddPnl, setOddsPnl] = useState<Pnl[]>([]);

  const { loading, setLoading } = useContext(LoaderContext);
  const [bet, setBet] = useState<BetDetailsInterface | null>(null);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getActiveFancyOdds = async () => {
      const { response } = await sportServices.getActiveFancyOdds(props.event);
      if (response) {
        setBookMakerOdds(response.Bookmaker);
        let newBookmakerOdd: any[] = response.Bookmaker;
        if (newBookmakerOdd) {
          setBookMakerToss(() =>
            newBookmakerOdd
              .filter((item) => item.t === "TOSS")
              .filter((item) => item != null)
          );

          setOriginbookMaker(() =>
            newBookmakerOdd
              .filter((item) => item.t !== "TOSS")
              .filter((item) => item != null)
          );
          if (originBookMaker.length) {
            setPrvBookMakerOdds([...originBookMaker]);
          } else {
            setPrvBookMakerOdds(() =>
              bookmakerOdd
                .map((item) => {
                  if (item.t !== "TOSS") {
                    return item;
                  }
                })
                .filter((item) => item != null)
            );
          }
          if (bookmakerToss.length) {
            setPreBookMakerToss([...bookmakerToss]);
          } else {
            setPreBookMakerToss(() =>
              bookmakerOdd
                .map((item) => {
                  if (item.t === "TOSS") {
                    return item;
                  }
                })
                .filter((item) => item != null)
            );
          }
        }
        setMatchOdds(response.Odds);
        if (matchOdd.length) {
          setPreMetchOdds([...matchOdd]);
        } else {
          setPreMetchOdds(response.Odds);
        }
        if (activeFancy.length) {
          setPreFancyOdds([...activeFancy]);
        } else {
          const newResponse = { ...response };
          newResponse.Odds = undefined;
          setPreFancyOdds(newResponse);
        }
        const newResponse = { ...response };
        newResponse.Odds = undefined;
        setActiveFancy(newResponse);
      }
    };
    setTimeout(() => getActiveFancyOdds(), 500);
  }, [activeFancy, matchOdd]);

  const getFancyPnl = async () => {
    const { response } = await sportServices.getuserFancyPnl(props.event);
    if (response) {
      setFancyPnl(response.data);
    }
  };

  const getOddsPnl = async () => {
    const { response } = await sportServices.getuserOddsPnl(props.event);
    if (response) {
      setOddsPnl(response.data);
    }
  };

  useEffect(() => {
    getFancyPnl();
  }, []);

  useEffect(() => {
    getOddsPnl();
  }, []);

  const handleClick = async () => {
    console.log("handle");
    setLoading &&
      setLoading((prev) => ({ ...prev, SubmitButtonValueData: true }));
    await sportServices.updateBetPlace({ ...bet, stake: amount });
    setLoading &&
      setLoading((prev) => ({ ...prev, SubmitButtonValueData: false }));
  };

  const getButtondata = async () => {
    await axios
      .post(
        "http://api.a2zscore.com/admin-new-apis/enduser/get-stake-button",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setButtonData(res?.data?.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getButtondata();
  }, []);

  console.log(matchOdd, "matchOdd");
  return (
    <>
      {matchOdd[0]?.runners[0]?.name ? (
        <TitleStyled>
          {`${matchOdd[0]?.runners[0]?.name}
    ${">"}
      ${matchOdd[0]?.runners[1]?.name}`}
        </TitleStyled>
      ) : (
        ""
      )}
      <BetSlip setBet={setBet} bet={bet} buttonData={buttonData} />

      {matchOdd?.map((match, index) => (
        <Accordion key={"matchodd" + index}>
          <AccordionSummary expandIcon={<ExpandCircleDown />}>
            {match.Name}
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <MatchOddsGrid
              bet={bet}
              setBet={setBet}
              buttonData={buttonData}
              CurrentOdd={match}
              PrevOdds={preMatchOdds[index]}
              matchId={props.event}
              OddsPnl={oddPnl}
            />
          </AccordionDetails>
        </Accordion>
      ))}

      {originBookMaker?.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandCircleDown />}>
            Bookmaker Odds
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <BookMakerOddsgrid
              setBet={setBet}
              bet={bet}
              buttonData={buttonData}
              CurrentOdd={originBookMaker}
              PrevOdds={prvbookmakerOdd}
              matchId={props.event}
              OddsPnl={oddPnl}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {bookmakerToss?.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandCircleDown />}>
            Bookmaker Toss
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <BookMakerOddsgrid
              setBet={setBet}
              bet={bet}
              buttonData={buttonData}
              CurrentOdd={bookmakerToss}
              PrevOdds={preBookmakerToss}
              matchId={props.event}
              OddsPnl={oddPnl}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {Object.keys(activeFancy)?.length > 0 &&
        activeFancy &&
        Object.keys(activeFancy).map((keys: any) => {
          if (["Fancy2", "Fancy3", "OddEven"].includes(keys)) {
            return (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandCircleDown />}>
                  {keys}
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <SessionOddsGrid
                    bet={bet}
                    setBet={setBet}
                    buttonData={buttonData}
                    CurrentOdd={activeFancy[keys]}
                    PrevOdds={preFancyOdds[keys]}
                    matchId={props.event}
                    title={keys}
                    FancyPnl={fancyPnl}
                  />
                </AccordionDetails>
              </Accordion>
            );
          } else return "";
        })}

      <Box
        display="flex"
        flexDirection={"column"}
        gap={2}
        my={3}
        alignItems="center"
      >
        <TitleStyled width="100%">Bets</TitleStyled>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Match Odds
          </Typography>

          <Box
            display="flex"
            flexDirection={"column"}
            gap={2}
            my={3}
            alignItems="center"
          >
            <TextField
              size="small"
              sx={{ width: "200px", margin: "auto" }}
              value={amount}
              onChange={handleChange}
            />
            <ButtonGroupComponent setAmount={setAmount} />
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ width: "200px", m: "auto" }}
            >
              Bet
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const BetGridItemGridItemProps = {
  item: true,
  bgcolor: "white",
  p: 0.5,
  fontWeight: 700,
  marginInline: "auto",
};

export const BetGridItem = ({
  title,
  values,
  suspended,
}: {
  title?: boolean;
  suspended?: boolean;
  values: any[];
}) => {
  const Props = {
    ...BetGridItemGridItemProps,
    ...(title
      ? {
          bgcolor: "rgb(82, 181, 225)",
          color: "#FFF",
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

export interface Pnl {
  marketId: string;
  pnl1: number;
  pnl2: number;
  pnl3: number;
  selection1: string | number;
  selection2: string | number;
  selection3: string | number;
}
export interface FancyPnl {
  marketId: string;
  pnl: number;
}

export const redGreenComponent = (value: any) => {
  return (
    <>
      <Typography
        color={value >= 0 ? "green" : "red"}
        fontSize={"0.8rem"}
        mr={0.5}
      >
        {Number(value?.toFixed(2))}
      </Typography>
    </>
  );
};
