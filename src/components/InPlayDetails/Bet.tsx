// import { ExpandCircleDown } from "@mui/icons-material";
import {
  // Accordion,
  // AccordionDetails,
  // AccordionSummary,
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
// import { TitleStyled } from "../custom/styledComponents";
import "./custom.css";
import "./AllMatch.css";
import "./Bet.css";
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
import NewBookMaker from "./NewBookMaker/NewBookMaker";
import NewSession from "./NewSession/NewSession";
import BetModals from "./BetModals/BetModals";

interface BetResultMessageType {
  data: boolean;
  message: string;
  // Add other properties if needed
}

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
  const [betResultMessage, setBetResultMessage] = useState<BetResultMessageType | undefined>(undefined);
  const [Show, setShow] = useState(false);

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
  const [openBet, setOpenBet] = React.useState(true);

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

  useEffect(() => {
    if (bet !== null) {
      setOpenBet(true);
    } else {
      setOpenBet(false);
    }

  }, [bet])
  

  if (loading.fancyOdds || !(Object.values(activeFancy)?.length > 0)) {
    return <></>
  }



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

        }}>

          <PnlModal
            fancyId={selectedPnlMarketId}
            matchId={props.event.toString()}
            dadadada={() => setSelectedPnlMarketId("")}
          />
        </DialogContent>
      </Dialog>

      <table className="table" style={{ marginBottom: "-4px", marginTop: "-5px" }}>
        <tbody className="">
          <tr>
            <th style={{width:"48%"}} >
              <div className="toggle-tv-old lgaai" onClick={handleTvShow}>
                <p className="active text-left text-light m-0" id="tvBtn">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    style={{ width: 23 }}
                  />
                  Tv
                </p>
              </div>
            </th>
            <th style={{width:"48%"}} className="cursor-pointer" onClick={handleOne}>
              <div className="toggle-tv-old lgaai">
                <p className="active text-center text-light m-0" id="tvBtn">
                  Full Score
                </p>
              </div>
            </th>
          </tr>
        </tbody>
      </table>


      <div>

        {/* <div className="tvdatatatat">
          <div className="scoreCard_icon" onClick={handleTvShow}>
            <img src={inplaytv} alt="Live tv"
              style={{ height: "100%" }} />
            <span style={{ color: "#fff" }}>

              TV
            </span>

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
        </div> */}
        {TvShow ? (
          <div id="scoreboard-box">
            <div className="scorecard scorecard-mobile">
              <div className="score-inner">
                <iframe
                  src={`https://100tun.online/web/${props.event}.html`}
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
                // src={`http://15.207.182.173:3050/event/${props.event}?theme=dark-wolf`}
                src={`https://score.247idhub.com/index.html/event/${props.event}?theme=crazy-diamond`}
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
                  // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${props?.sportsId}/${props.event}`}
                  src={`https://score.247idhub.com/go-score/template/${props?.sportsId}/${props.event}`}
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
        <div className="">
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
            </>
          ))}

          {originBookMaker?.length > 0 && (
            <>
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
          <NewBookMaker setBet={setBet}
            bet={bet}
            profits={profits.Bookmaker}
            buttonData={buttonData}
            CurrentOdd={originBookMaker}
            PrevOdds={prvbookmakerOdd}
            matchId={props.event}
            OddsPnl={oddPnl} />

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
                  <>
                    <NewSession bet={bet}
                      setMarketId={setSelectedPnlMarketId}
                      setBet={setBet}
                      buttonData={buttonData}
                      CurrentOdd={activeFancy[keys]}
                      PrevOdds={preFancyOdds[keys]}
                      matchId={props.event}
                      title={keys === "Fancy2" ? "Session" : keys}
                      FancyPnl={fancyPnl} />
                  </>

                );
              } else return "";
            })}

          <Completedandlivematch
            event={props.event}
            sportsId={props.sportsId}

          />


        </div>
      </div>

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



      <BetModals setBet={setBet}
        bet={bet}
        buttonData={buttonData}
        event={props.event}
        sportsId={props.sportsId} setShow={setShow} Show={Show} setBetResultMessage={setBetResultMessage} isOpen={openBet} onClose={handleClose} />

      <Modal
        open={Show}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box className="bet-box">
          <div className="Bet-succ">
            <h2
              id="parent-modal-title"
              style={{
                color: betResultMessage?.data === false ? "red" : "white",
              }}>
              {betResultMessage?.message}
            </h2>
            <button className="Bet-SuccBtn" onClick={handleClose}>
              OK
            </button>
          </div>
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
