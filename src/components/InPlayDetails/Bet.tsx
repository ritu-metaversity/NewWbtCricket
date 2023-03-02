import { ExpandCircleDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
// import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { FC, useContext, useEffect, useState } from "react";
import { TitleStyled } from "../custom/styledComponents";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import { sportServices } from "../../utils/api/sport/services";
import "./custom.css";
import snackBarUtil from "../Layout/snackBarUtil";
import axios from "axios";
import BookMakerOddsgrid from "./BookmakerOddsGrid";
import { LoaderContext } from "../../App";

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
  const [bet, setBet] = useState<any>({
    isBack: false,
    odds: 1.93,
    stake: 900,
    selectionId: 7659,
    marketId: "1.207796438",
    matchId: 31975576,
    placeTime: "2022-12-12 14:09:10",
    priceValue: 90,
    isFancy: false,
    userIp: "115.246.121.179",
    deviceInfo: {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      os: "Windows",
      browser: "Chrome",
      device: "Unknown",
      os_version: "windows-10",
      browser_version: "108.0.0.0",
      deviceType: "desktop",
      orientation: "landscape",
      userIp: "115.246.121.179",
    },
  });

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
              .map((item) => {
                if (item.t === "TOSS") {
                  return item;
                }
              })
              .filter((item) => item != null)
          );

          setOriginbookMaker(() =>
            newBookmakerOdd
              .map((item) => {
                if (item.t !== "TOSS") {
                  return item;
                }
              })
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

  return (
    <>
      {matchOdd.length > 0 && (
        <Accordion>
          {
            <AccordionSummary expandIcon={<ExpandCircleDown />}>
              Match Odds
            </AccordionSummary>
          }
          <AccordionDetails sx={{ p: 0 }}>
            {matchOdd?.map((match, index) => {
              return (
                <MatchOddsGrid
                  buttonData={buttonData}
                  CurrentOdd={match}
                  PrevOdds={preMatchOdds[index]}
                  matchId={props.event}
                  OddsPnl={oddPnl}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      )}
      {originBookMaker?.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandCircleDown />}>
            Bookmaker Odds
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <BookMakerOddsgrid
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
              buttonData={buttonData}
              CurrentOdd={bookmakerToss}
              PrevOdds={preBookmakerToss}
              matchId={props.event}
              OddsPnl={oddPnl}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {Object.keys(activeFancy)?.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandCircleDown />}>
            Session Odds
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {activeFancy &&
              Object.keys(activeFancy).map((keys: any) => {
                if (["Fancy2", "Fancy3", "OddEven"].includes(keys)) {
                  return (
                    <SessionOddsGrid
                      buttonData={buttonData}
                      CurrentOdd={activeFancy[keys]}
                      PrevOdds={preFancyOdds[keys]}
                      matchId={props.event}
                      title={keys}
                      FancyPnl={fancyPnl}
                    />
                  );
                } else return "";
              })}
          </AccordionDetails>
        </Accordion>
      )}
      <Box
        display="flex"
        flexDirection={"column"}
        gap={2}
        my={3}
        alignItems="center"
      >
        <TitleStyled width="100%">Bets</TitleStyled>
      </Box>
      {/* borderLeft={`5px solid ${
        bet.back? colorHex.back[1] : colorHex.lay[1]
      } `} */}
      {/* <MyBet
        bets={{
          "Match Odds": [
            {
              nation: "UAE",
              rate: 1.99,
              amount: 300,
              priveValue: 1.99,
              marketName: "Match Odds",
              back: false,
            },
          ],
        }}
      /> */}

      {/* <Box
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

        <ButtonGroup sx={{ maxWidth: "100%" }   {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((item) => (
            <Button onClick={() => setAmount(item)}>{item}</Button>
          ) style={{padding:"10px"}})}
        </ButtonGroup>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ width: "200px", m: "auto" }}
        >
          Bet
        </Button>
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
            <ButtonGroup sx={{ maxWidth: "100%" }}>
              {Object.keys(buttonData)?.map((item: any) => (
                <Button
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  onClick={() => setAmount(buttonData[item])}
                >
                  {buttonData[item]}
                </Button>
              ))}
            </ButtonGroup>
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

interface MatchOddsGridProps {
  runners: {
    back1price: number;
    lay1price: number;
    team: string;
    runnerStatus: string;
    selectionId: number;
    ex: {
      availableToBack: {
        price: string;
        size: string;
      }[];
      availableToLay: {
        price: string;
        size: string;
      }[];
    };
  }[];
  maxBet: number;
  betDelay: number;
  inPlay: boolean;
  isActive: boolean;
  isPause: boolean;
  status: string;
  marketId: string;
}

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

const MatchOddsGrid: FC<{
  CurrentOdd: MatchOddsGridProps;
  PrevOdds: MatchOddsGridProps;
  matchId: number;
  OddsPnl: Pnl[];
  buttonData: any;
}> = ({ CurrentOdd, PrevOdds, matchId, OddsPnl, buttonData }) => {
  const { runners, status, maxBet, betDelay, marketId } = CurrentOdd;
  const { runners: PrevRunner } = PrevOdds;

  const pnlsOdds = OddsPnl?.find((element) => element?.marketId == marketId);
  const plnOddsArray = pnlsOdds
    ? [
        { pnl: pnlsOdds.pnl1, selectionId: pnlsOdds.selection1 },
        { pnl: pnlsOdds.pnl2, selectionId: pnlsOdds.selection2 },
        { pnl: pnlsOdds.pnl3, selectionId: pnlsOdds.selection3 },
      ]
    : [];

  const [bet, setBet] = useState<any>({
    isBack: false,
    odds: 1.93,
    stake: 900,
    selectionId: 7659,
    marketId: "1.207796438",
    matchId: matchId,
    placeTime: "2022-12-12 14:09:10",
    priceValue: 90,
    isFancy: false,
    deviceInfo: {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      os: "Windows",
      browser: "Chrome",
      device: "Unknown",
      os_version: "windows-10",
      browser_version: "108.0.0.0",
      deviceType: "desktop",
      orientation: "landscape",
      userIp: "115.246.121.179",
    },
    userIp: "115.246.121.179",
  });

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

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
  const [amount, setAmount] = useState(10);
  const { loading, setLoading } = useContext(LoaderContext);
  const handleChange = (e: any) => {
    setAmount(e.target.value);
    setBet({
      ...bet,
      stake: e.target.value,
    });
  };
  const handleClose = () => setOpen(false);

  // const handleClick = async () => await sportServices.updateBetPlace(bet);

  async function clickHandler() {
    // console.log("dfghjk ye wala??");
    setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: true }));
    const { response } = await sportServices.updateBetPlace({
      ...bet,
      stake: amount,
    });
    // console.log(response.status + " this is status");
    if (response) {
      snackBarUtil.success(response?.message);
      handleClose();
    }
    setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: false }));
  }

  const updateBet = (
    isBack: boolean,
    odds: number,
    stake: number,
    selectionId: number,
    marketId: string,
    matchId: number,
    placeTime: string,
    priceValue: number,
    isFancy: boolean
  ) => {
    if (odds > 0) {
      handleOpen();
    }
    setBet({
      ...bet,
      isBack: isBack,
      odds: odds,
      stake: stake,
      selectionId: selectionId,
      marketId: marketId,
      matchId: matchId,
      placeTime: placeTime,
      priceValue: priceValue,
      isFancy: isFancy,
    });
  };

  return (
    <>
      <Box display="flex" justifyContent={"space-evenly"}>
        <BetTextMedium>Max Bet:{maxBet}</BetTextMedium>
        <BetTextMedium>Bet Delay:{betDelay}</BetTextMedium>
      </Box>

      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        {runners.map((item, index) => {
          return (
            <BetGridItem
              suspended={
                ["SUSPENDED", "CLOSED"].includes(status)
                // status === "SUSPENDED" ||
                // !isActive ||
                // isPause ||
                // !inPlay
              }
              values={[
                <>
                  {" "}
                  {item.selectionId}
                  {redGreenComponent(
                    plnOddsArray.find(
                      (pnl) => pnl.selectionId == item.selectionId
                    )?.pnl || 0
                  )}
                </>,
                <Box
                  className={
                    PrevRunner[index].ex.availableToBack[0].price <
                    item.ex.availableToBack[0].price
                      ? "odds-up"
                      : PrevRunner[index].ex.availableToBack[0].price >
                        item.ex.availableToBack[0].price
                      ? "odds-down"
                      : ""
                  }
                >
                  <BetText
                    onClick={() =>
                      updateBet(
                        true,
                        +item.ex.availableToBack[0].price,
                        amount,
                        item.selectionId,
                        marketId,
                        matchId,
                        date,
                        +item.ex.availableToBack[0].price,
                        false
                      )
                    }
                    color="blue"
                  >
                    {item.ex.availableToBack[0].price}
                  </BetText>
                  {item.ex.availableToBack[0].size}
                </Box>,
                <Box
                  className={
                    PrevRunner[index].ex.availableToLay[0].price <
                    item.ex.availableToLay[0].price
                      ? "odds-up"
                      : PrevRunner[index].ex.availableToLay[0].price >
                        item.ex.availableToLay[0].price
                      ? "odds-down"
                      : ""
                  }
                >
                  <BetText
                    onClick={() =>
                      updateBet(
                        false,
                        +item.ex.availableToLay[0].price,
                        amount,
                        item.selectionId,
                        marketId,
                        matchId,
                        date,
                        +item.ex.availableToLay[0].price,
                        false
                      )
                    }
                    color="red"
                  >
                    {item.ex.availableToLay[0].price}
                  </BetText>
                  {item.ex.availableToLay[0].size}
                </Box>,
              ]}
            />
          );
        })}
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
              <div style={{ display: "flex" }}>
                <TextField
                  size="small"
                  sx={{ width: "200px", margin: "auto" }}
                  value={amount}
                  onChange={handleChange}
                />
                <p
                  style={{ marginLeft: "20px" }}
                  className="MuiTypography-root MuiTypography-body1 css-33qhfi"
                >
                  Profit: {(bet.odds - 1) * amount}
                </p>
              </div>
              <ButtonGroup sx={{ maxWidth: "100%" }}>
                {Object.keys(buttonData)?.map((item: any) => (
                  <Button
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    onClick={() => setAmount(buttonData[item])}
                  >
                    {buttonData[item]}
                  </Button>
                ))}
              </ButtonGroup>
              <Button
                variant="contained"
                onClick={clickHandler}
                sx={{ width: "200px", m: "auto" }}
              >
                Bet
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

// const SessionOddsGrid:FC<({ odds:SessionOddsGridProps }) {
const SessionOddsGrid: FC<{
  CurrentOdd: any;
  PrevOdds: any;
  matchId: number;
  title: any;
  FancyPnl: FancyPnl[];
  buttonData: any;
}> = ({ CurrentOdd, PrevOdds, matchId, title, FancyPnl, buttonData }) => {
  const [bet, setBet] = useState<any>({
    isBack: false,
    odds: 1.93,
    stake: 900,
    selectionId: 7659,
    marketId: "1.207796438",
    matchId: matchId,
    placeTime: "2022-12-12 14:09:10",
    priceValue: 90,
    isFancy: false,
    userIp: "115.246.121.179",
    deviceInfo: {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      os: "Windows",
      browser: "Chrome",
      device: "Unknown",
      os_version: "windows-10",
      browser_version: "108.0.0.0",
      deviceType: "desktop",
      orientation: "landscape",
      userIp: "115.246.121.179",
    },
  });

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

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
  const [amount, setAmount] = useState(10);
  const { loading, setLoading } = useContext(LoaderContext);
  const handleChange = (e: any) => {
    setAmount(e.target.value);
    setBet({
      ...bet,
      stake: e.target.value,
    });
  };
  const handleClose = () => setOpen(false);

  // const handleClick = async () => await sportServices.updateBetPlace(bet);

  async function clickHandler() {
    console.log("ye hi hai kya");
    setLoading &&
      setLoading((prev) => ({ ...prev, ClickButtonValueSubmit: true }));
    const { response } = await sportServices.updateBetPlace({
      ...bet,
      stake: amount,
    });
    console.log(response.status + " this is status");
    snackBarUtil.success(response.message);
    handleClose();
    setLoading &&
      setLoading((prev) => ({ ...prev, ClickButtonValueSubmit: false }));
  }

  const updateBet = (
    isBack: boolean,
    odds: number,
    stake: number,
    selectionId: number,
    marketId: string,
    matchId: number,
    placeTime: string,
    priceValue: number,
    isFancy: boolean
  ) => {
    if (odds > 0) {
      handleOpen();
    }
    setBet({
      ...bet,
      isBack: isBack,
      amount,
      odds: odds,
      stake: stake,
      selectionId: selectionId,
      marketId: marketId,
      matchId: matchId,
      placeTime: placeTime,
      priceValue: priceValue,
      isFancy: isFancy,
    });
  };
  return (
    <>
      {title}
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["SESSION", "NOT", "YES"]} />
        {CurrentOdd.map((item: any, index: any) => (
          <BetGridItem
            values={[
              <>
                <BetTextMedium>{item?.nation}</BetTextMedium>
                <BetTextSmall>Session Limit: 50k</BetTextSmall>
                {redGreenComponent(
                  FancyPnl?.find((pnl) => pnl.marketId === CurrentOdd.sid)
                    ?.pnl || 0
                )}
              </>,
              <Box
                className={
                  PrevOdds[index].b1 < item.b1
                    ? "odds-up"
                    : PrevOdds[index].b1 > item.b1
                    ? "odds-down"
                    : ""
                }
              >
                <BetText
                  onClick={() =>
                    updateBet(
                      true,
                      +item.b1,
                      amount,
                      0,
                      item.sid,
                      matchId,
                      date,
                      +item.bs1,
                      true
                    )
                  }
                  color="red"
                >
                  {item.b1}
                  <BetTextSmall>{item.bs1}</BetTextSmall>
                </BetText>
              </Box>,
              <Box
                className={
                  PrevOdds[index].l1 < item.l1
                    ? "odds-up"
                    : PrevOdds[index].l1 > item.l1
                    ? "odds-down"
                    : ""
                }
              >
                <BetText
                  onClick={() =>
                    updateBet(
                      false,
                      +item.l1,
                      amount,
                      0,
                      item.sid,
                      matchId,
                      date,
                      +item.ls1,
                      true
                    )
                  }
                  color="blue"
                >
                  {item.l1} <BetTextSmall>{item.ls1}</BetTextSmall>
                </BetText>
              </Box>,
            ]}
          />
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Session Odds
          </Typography>

          <Box
            display="flex"
            flexDirection={"column"}
            gap={2}
            my={3}
            alignItems="center"
          >
            <div style={{ display: "flex" }}>
              <TextField
                size="small"
                sx={{ width: "200px", margin: "auto" }}
                value={amount}
                onChange={handleChange}
              />
              <p
                style={{ marginLeft: "20px" }}
                className="MuiTypography-root MuiTypography-body1 css-33qhfi"
              >
                Profit: {amount}
              </p>
            </div>
            <ButtonGroup sx={{ maxWidth: "100%" }}>
              {Object.keys(buttonData)?.map((item: any) => (
                <Button
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    // borderRight: "1px solid black",
                  }}
                  onClick={() => setAmount(buttonData[item])}
                >
                  {buttonData[item]}
                </Button>
              ))}
            </ButtonGroup>
            <Button
              variant="contained"
              onClick={clickHandler}
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
