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
import { BetGridItem, redGreenComponent } from "./Bet";
import { LoaderContext } from "../../App";

const BookMakerOddsgrid: FC<{
  CurrentOdd: any;
  PrevOdds: any;
  matchId: number;
  OddsPnl: any;
  buttonData: any;
}> = ({ CurrentOdd, matchId, OddsPnl, buttonData }) => {
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

  const pnlsOdds = OddsPnl?.find(
    (element: { marketId: any }) => element?.marketId == CurrentOdd[0].mid
  );
  const plnOddsArray = pnlsOdds
    ? [
        { pnl: pnlsOdds.pnl1, selectionId: pnlsOdds.selection1 },
        { pnl: pnlsOdds.pnl2, selectionId: pnlsOdds.selection2 },
        { pnl: pnlsOdds.pnl3, selectionId: pnlsOdds.selection3 },
      ]
    : [];

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
    setLoading &&
      setLoading((prev) => ({ ...prev, ClickButtonValueData: true }));
    const { response } = await sportServices.updateBetPlace(bet);
    setLoading &&
      setLoading((prev) => ({ ...prev, ClickButtonValueData: false }));
    console.log(response.status + " this is status");
    snackBarUtil.success(response.message);
    handleClose();
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
      stake: amount,
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
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        {CurrentOdd.map((item: any) => (
          <BetGridItem
            values={[
              <>
                <BetTextMedium>{item?.nation}</BetTextMedium>
                <BetTextSmall>Session Limit: 50k</BetTextSmall>
                {item.sid}
                {redGreenComponent(
                  plnOddsArray.find((pnl) => pnl.selectionId == item.sid)
                    ?.pnl || 0
                )}
              </>,
              <BetText
                onClick={() =>
                  updateBet(
                    true,
                    +item.b1,
                    amount,
                    item.sid,
                    item.mid,
                    matchId,
                    date,
                    +item.b1,
                    false
                  )
                }
                color="red"
              >
                {item.b1}
                <BetTextSmall>{item.bs1}</BetTextSmall>
              </BetText>,
              <BetText
                onClick={() =>
                  updateBet(
                    false,
                    +item.l1,
                    amount,
                    item.sid,
                    item.mid,
                    matchId,
                    date,
                    +item.l1,
                    false
                  )
                }
                color="blue"
              >
                {item.l1} <BetTextSmall>{item.ls1}</BetTextSmall>
              </BetText>,
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
            Book Maker
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
                <Button onClick={() => setAmount(buttonData[item])}>
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

export default BookMakerOddsgrid;
