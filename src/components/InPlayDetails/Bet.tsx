import { ExpandCircleDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { TitleStyled } from "../custom/styledComponents";
import "./custom.css";
import BookMakerOddsgrid from "./BookmakerOddsGrid";
import { LoaderContext } from "../../App";
import ButtonGroupComponent from "./ButtonGroupComponent";
import { MatchOddsGrid } from "./MatchOddsGrid";
import { SessionOddsGrid } from "./SessionOddsGrid";
import BetSlip from "./BetSlip";
import {
  BetDetailsInterface,
  FancyOddsInterface,
  ProfitObjectInterface,
} from "./types";
import { createProfits } from "./eventUtil";
import PnlModal from "./pnlModal";
import { inPlayDetailServices } from "../../utils/api/inplayDetails/services";
import { userServices } from "../../utils/api/user/services";
import Marquee from "react-fast-marquee";
import AllMatch from "./AllMatch";
import { useParams } from "react-router-dom";
import inplaytv from "./tv_for_inplay.png"
import { RxCross2 } from "react-icons/rx";
import Completedandlivematch from "./Completedandlivematch";

const Bet: FC<any> = (props: { event: number, sportsId: any }) => {
  const [amount, setAmount] = useState(10);
  const [buttonData, setButtonData] = useState<{ [x: string]: number }>({});
  // const [eventidd, setEventIdd] = useState()
  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };
  // let { id } = useParams();
  // useEffect(() => {
  //   setEventIdd(props)
  // }, [])
  console.log(props?.sportsId, "ididididididv")
  const [selectedPnlMarketId, setSelectedPnlMarketId] = useState("");

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
  const { setLoading, loading } = useContext(LoaderContext);
  const [bet, setBet] = useState<BetDetailsInterface | null>(null);

  const [activeFancySlower, setActiveFancySlower] = useState<{
    [x: string]: any[];
  }>({});

  const [profits, setProfits] = useState<ProfitObjectInterface>({
    Odds: {},
    Bookmaker: [],
    Fancy: [],
  });


  const [TvShow, setTvShow] = useState(false)
  const [toggleBtn1, settoggleBtn1] = useState(false)
  const [toggleBtn2, settoggleBtn2] = useState(false)

  const handleTvShow = () => {
    if (TvShow === false) {
      setTvShow(true);
      settoggleBtn1(false)
      settoggleBtn2(false)
    } else {
      setTvShow(false);
    }
  };


  const handleOne = (e: any) => {
    e.preventDefault();
    if (toggleBtn1 === false) {
      settoggleBtn1(true)
      setTvShow(false);
      settoggleBtn2(false)

    } else {
      settoggleBtn1(false)

    }
  };

  const handleTwo = (e: any) => {
    e.preventDefault();

    if (toggleBtn2 === false) {
      settoggleBtn1(false)

      settoggleBtn2(true)
      setTvShow(false);

    } else {

      settoggleBtn2(false)
    }
  };

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

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getFancyOdds = async () => {
      const { response } = await inPlayDetailServices.newFancySlower(
        props.event.toString()
      );
      if (response) {
        setActiveFancySlower(response);
      }
    };
    getFancyOdds();
  }, [props.event]);

  const getFancyOdds = async () => {
    const { response } = await inPlayDetailServices.newFancy(
      props.event.toString()
    );
    if (response) {

      setBookMakerOdds(response.Bookmaker);
      let newBookmakerOdd: FancyOddsInterface[] = response.Bookmaker.map(
        (item: any, index: number) => ({
          ...(activeFancySlower?.Bookmaker
            ? activeFancySlower?.Bookmaker[index] || {}
            : {}),
          ...item,
        })
      );
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
              .filter((item) => item.t !== "TOSS")
              .filter((item) => item != null)
          );
        }
        if (bookmakerToss.length) {
          setPreBookMakerToss([...bookmakerToss]);
        } else {
          setPreBookMakerToss(() =>
            bookmakerOdd
              .filter((item) => item.t === "TOSS")
              .filter((item) => item != null)
          );
        }
      }
      setMatchOdds(
        response.Odds.map((item: any, index: number) => ({
          ...(activeFancySlower?.Odds
            ? activeFancySlower?.Odds[index] || {}
            : {}),
          ...item,
        }))
      );
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
      for (let i in response) {
        if (["Odds"].includes(i)) {
          continue;
        }
        newResponse[i] = response[i].map((single: any, index: number) => ({
          ...(activeFancySlower[i]
            ? activeFancySlower[i].find(
              (odd: FancyOddsInterface) => odd.sid === single.sid
            ) || {}
            : {}),
          ...single,
        }));
      }
      // newResponse.Odds = undefined;
      setLoading && setLoading((prev) => ({ ...prev, fancyOdds: false }))
      setActiveFancy(newResponse);
    }
  };
  console.log(preMatchOdds, "runners");

  useEffect(() => {
    setLoading && setLoading((prev) => ({ ...prev, fancyOdds: true }));
    getFancyOdds()
  }, [])
  useEffect(() => {
    setTimeout(() => getFancyOdds(), 500);
  }, [activeFancy, matchOdd]);

  const getFancyPnl = useCallback(async () => {
    const { response } = await inPlayDetailServices.getuserFancyPnl(
      props.event
    );
    if (response) {
      setFancyPnl(response.data);
    }
  }, [props.event]);

  const getOddsPnl = useCallback(async () => {
    const { response } = await inPlayDetailServices.getuserOddsPnl(props.event);
    if (response) {
      setOddsPnl(response.data);
    }
  }, [props.event]);

  useEffect(() => {
    getFancyPnl();
    getOddsPnl();
    const timer = setInterval(() => {
      getOddsPnl();
      getFancyPnl();
    }, 5000);
    return () => clearInterval(timer);
  }, [getOddsPnl, getFancyPnl]);

  const handleClick = async () => {
    setLoading &&
      setLoading((prev) => ({ ...prev, SubmitButtonValueData: true }));
    await inPlayDetailServices.updateBetPlace({ ...bet, stake: amount });
    setLoading &&
      setLoading((prev) => ({ ...prev, SubmitButtonValueData: false }));
  };

  const getButtondata = async () => {
    const { response } = await userServices.getButtonValue();
    if (response) {

      setButtonData(response.data);
    }
  };


  useEffect(() => {
    getButtondata();
  }, []);

  useEffect(() => {
    createProfits({
      fancyOdds: activeFancy,
      fancyPnl,
      pnl: oddPnl,
      betDetails: null,
      profits,
      setProfits,
    });
  }, [oddPnl, fancyPnl, activeFancy]);

  if (loading.fancyOdds || !(Object.values(activeFancy)?.length > 0)) {
    return <></>
  }

  console.log(bet, "liuytgfvbjh")
  return (
    <>
      <Dialog
        title="Run Amount"
        open={Boolean(selectedPnlMarketId)}
        onClose={() => setSelectedPnlMarketId("")}
        fullWidth

        sx={{
          '& .MuiDialog-paper': {
            overflow: 'unset !important'
          }
        }}
      >
        <DialogTitle>
          <span onClick={() => setSelectedPnlMarketId("")} style={{ cursor: "pointer" }}>
            <RxCross2 onClick={() => setSelectedPnlMarketId("")} style={{
              position: "absolute",
              right: '4px',
              top: "1px"
            }} /></span>
          <div className="main_RunandAmount">
            <span >Run and Amount</span>



          </div>

        </DialogTitle>
        <DialogContent sx={{
          width: '100%',
          // '&.MuiDialogContent-root': {
          //   overflowY: 'hidden !important'
          // }
        }}>

          <PnlModal
            fancyId={selectedPnlMarketId}
            matchId={props.event.toString()}
            dadadada={() => setSelectedPnlMarketId("")}
          />
        </DialogContent>
      </Dialog>
      {/* {matchOdd && matchOdd[0] && (
        <TitleStyled>
          {matchOdd?.length > 0 || bookmakerOdd?.length > 0
            ? ` ${matchOdd[0]?.matchName ||
            (bookmakerOdd && bookmakerOdd[0]?.matchName) ||
            " Name Unavailable "
            } `
            : " &nsbp; "}

          <Typography component={"span"} textAlign={"right"}>
            {matchOdd[0]?.eventTime}
          </Typography>
        </TitleStyled>
      )} */}
      {/* <BetSlip
        profits={profits}
        setBet={setBet}
        bet={bet}
        buttonData={buttonData}
      /> */}
      <div>
        <div className="tvdatatatat">
          <div className="scoreCard_icon" onClick={handleTvShow}>
            <img src={inplaytv} alt="Live tv"
              style={{ height: "100%" }} />
            <span style={{ color: "#fff" }}>

              TV
            </span>
            {/* <img
              alt=""
              style={{ height: "100%" }}
              src="https://d1arlbwbznybm5.cloudfront.net/v1/static/mobile/images/icons/inplay-white.png"
            /> */}
          </div>
          <div className="scoreCard-icon">
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon-medium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ScoreboardIcon">
              <path d="M17.5 13.5H16v-3h1.5v3zM20 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 11.5c0 .55-.45 1-1 1h-2v1h3V15H5v-2.5c0-.55.45-1 1-1h2v-1H5V9h3.5c.55 0 1 .45 1 1v1.5zm3.25 6.5h-1.5v-1.5h1.5V18zm0-3.5h-1.5V13h1.5v1.5zm0-3.5h-1.5V9.5h1.5V11zm0-3.5h-1.5V6h1.5v1.5zM19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1v4z"></path>
            </svg>
            <div>
              <label
                className={`onoffbtn ${toggleBtn1 ? "active" : ""}`}
                onClick={handleOne}>
                <input type="checkbox" />
              </label>
            </div>
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon-medium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ScoreboardIcon">
              <path d="M17.5 13.5H16v-3h1.5v3zM20 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 11.5c0 .55-.45 1-1 1h-2v1h3V15H5v-2.5c0-.55.45-1 1-1h2v-1H5V9h3.5c.55 0 1 .45 1 1v1.5zm3.25 6.5h-1.5v-1.5h1.5V18zm0-3.5h-1.5V13h1.5v1.5zm0-3.5h-1.5V9.5h1.5V11zm0-3.5h-1.5V6h1.5v1.5zM19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1v4z"></path>
            </svg>
            <div>
              <label
                className={`onoffbtn ${toggleBtn2 ? "active" : ""}`}
                onClick={handleTwo}>
                <input type="checkbox" />
              </label>
            </div>
          </div>
        </div>
        {TvShow ? (
          <div id="scoreboard-box">
            <div className="scorecard scorecard-mobile">
              <div className="score-inner">
                <iframe
                  src={`https://100tun.online/web/${props.event}.html`}
                  // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${gameIframeId}/${id}`}
                  width="100%"
                  height="290px"
                  className="score-card"
                  title="scorecord"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        ) : ""}
        {toggleBtn1 === true ? <div id="scoreboard-box">
          <div className="scorecard scorecard-mobile">
            <div className="score-inner">
              <iframe
                src={`http://15.207.182.173:3050/event/${props.event}?theme=dark-wolf`}

                // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${gameIframeId}/${id}`}
                width="100%"
                height="290px"
                className="score-card"
                title="scorecord"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div> : ""}
        {
          toggleBtn2 === true ? <div id="scoreboard-box">
            <div className="scorecard scorecard-mobile">
              <div className="score-inner">
                <iframe
                  //  src={`http://15.207.182.173:3050/event/${id}`}

                  src={`https://internal-consumer-apis.jmk888.com/go-score/template/${props?.sportsId}/${props.event}`}
                  width="100%"
                  height="290px"
                  className="score-card"
                  title="scorecord"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div> : ""
        }
        <div className="container">
          {matchOdd.map((match, index) => (
            <>
              {" "}
              {/* <Accordion key={"matchodd" + index} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandCircleDown />}>
                {match.Name}
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}> */}
              <MatchOddsGrid
                bet={bet}
                setBet={setBet}
                CurrentOdd={match}
                PrevOdds={preMatchOdds[index]}
                matchId={props.event}
                OddsPnl={profits.Odds[match?.marketId]}
              />
              {/* </AccordionDetails>
            </Accordion> */}
              <Marquee speed={50} gradient={false}>
                <Typography fontSize="0.8rem" fontWeight={600} color="error.main">
                  {match.display_message}
                </Typography>
              </Marquee>
              {bet?.marketId && bet?.marketId === match.marketId && <AllMatch
                setBet={setBet}
                bet={bet}
                buttonData={buttonData}
                event={props.event}
                sportsId={props.sportsId}
              />}
            </>
          ))}


          {originBookMaker?.length > 0 && (
            <>

              <BookMakerOddsgrid
                setBet={setBet}
                bet={bet}
                profits={profits.Bookmaker}
                buttonData={buttonData}
                CurrentOdd={originBookMaker}
                PrevOdds={prvbookmakerOdd}
                matchId={props.event}
                OddsPnl={oddPnl}
              />
              {/* </AccordionDetails> */}
              {/* </Accordion> */}
              <Marquee speed={50} gradient={false}>
                <Typography fontSize="0.8rem" fontWeight={600} color="error.main">
                  {
                    originBookMaker?.find((i: FancyOddsInterface) => i.t !== "TOSS")
                      ?.display_message
                  }
                </Typography>
              </Marquee>
            </>
          )}
          {bookmakerToss?.length > 0 && (
            <>

              <BookMakerOddsgrid
                setBet={setBet}
                bet={bet}
                profits={profits.Bookmaker}
                buttonData={buttonData}
                CurrentOdd={bookmakerToss}
                PrevOdds={prvbookmakerOdd}
                matchId={props.event}
                OddsPnl={oddPnl}
              />
              {/* </AccordionDetails> */}
              {/* </Accordion> */}
              <Marquee speed={50} gradient={false}>
                <Typography fontSize="0.8rem" fontWeight={600} color="error.main">
                  {
                    originBookMaker?.find((i: FancyOddsInterface) => i.t !== "TOSS")
                      ?.display_message
                  }
                </Typography>
              </Marquee>
            </>
          )}
          {bet?.marketId && (bet?.marketId === originBookMaker[0]?.mid ||
            bet?.marketId === bookmakerToss[0]?.mid) && <AllMatch
              setBet={setBet}
              bet={bet}
              buttonData={buttonData}
              event={props.event}
              sportsId={props.sportsId}
            />}
          {/* {matchOdd
        ?.filter((i) => i.Name !== "Match Odds")
        .map((match, index) => (
          <>
            <Accordion key={"matchodd" + index} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandCircleDown />}>
                {match.Name}
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <MatchOddsGrid
                  bet={bet}
                  setBet={setBet}
                  CurrentOdd={match}
                  PrevOdds={preMatchOdds[index]}
                  matchId={props.event}
                  OddsPnl={profits.Odds[match?.marketId]}
                />
              </AccordionDetails>
            </Accordion>
            <Marquee speed={50} gradient={false}>
              <Typography fontSize="0.8rem" fontWeight={600} color="error.main">
                {match.display_message}
              </Typography>
            </Marquee>
          </>
        ))} */}
          {/* {bookmakerToss?.length > 0 && (
        <>
          {" "}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandCircleDown />}>
              Toss
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <BookMakerOddsgrid
                setBet={setBet}
                bet={bet}
                profits={profits.Bookmaker}
                buttonData={buttonData}
                CurrentOdd={bookmakerToss}
                PrevOdds={preBookmakerToss}
                matchId={props.event}
                OddsPnl={oddPnl}
              />
            </AccordionDetails>
          </Accordion>
          <Marquee speed={50} gradient={false}>
            <Typography fontSize="0.8rem" fontWeight={600} color="error.main">
              {
                bookmakerToss?.find((i: FancyOddsInterface) => i.t !== "TOSS")
                  ?.display_message
              }
            </Typography>
          </Marquee>
        </>
      )} */}
          {Object.keys(activeFancy)?.length > 0 &&
            activeFancy &&
            Object.keys(activeFancy).map((keys: any) => {
              if (
                ["BallByBall",
                  "Fancy2",
                  "Fancy3",
                  "OddEven"
                ].includes(keys) &&
                activeFancy[keys]?.length
              ) {
                return (
                  // <Accordion defaultExpanded>
                  //   <AccordionSummary expandIcon={<ExpandCircleDown />}>
                  //     {keys}
                  //   </AccordionSummary>
                  //   <AccordionDetails sx={{ p: 0 }}>
                  <>

                    < SessionOddsGrid
                      bet={bet}
                      setMarketId={setSelectedPnlMarketId}
                      setBet={setBet}
                      buttonData={buttonData}
                      CurrentOdd={activeFancy[keys]}
                      PrevOdds={preFancyOdds[keys]}
                      matchId={props.event}
                      title={keys === "Fancy2" ? "Session" : keys}
                      FancyPnl={fancyPnl}
                    />
                    {bet?.marketId && activeFancy[keys].find((item: FancyOddsInterface) => item.sid === bet?.marketId) && <AllMatch
                      setBet={setBet}
                      bet={bet}
                      buttonData={buttonData}
                      event={props.event}
                      sportsId={props.sportsId}
                    />}
                  </>
                  //   </AccordionDetails>
                  // </Accordion>
                );
              } else return "";
            })}

          <Completedandlivematch
            event={props.event}
            sportsId={props.sportsId}

          />
          {/* <AllMatch
            setBet={setBet}
            bet={bet}
            buttonData={buttonData}
            event={props.event}

            sportsId={props.sportsId}
          /> */}

        </div>
      </div>
      {/* <Box
        display="flex"
        flexDirection={"column"}
        gap={2}
        my={3}
        alignItems="center"
      >
        <TitleStyled width="100%">Bets</TitleStyled>
      </Box> */}
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
          <Grid display="grid" height={"100%"}>
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
        color={(Number(value) || 0) >= 0 ? "green" : "red"}
        fontSize={"0.8rem"}
        mr={0.5}
      >
        {Number(value?.toFixed(2)) || 0}
      </Typography>
    </>
  );
};
