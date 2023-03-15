import { Grid } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import "./custom.css";
import { BetGridItem, redGreenComponent } from "./Bet";
import { BetDetailsInterface, FancyOddsInterface } from "./types";

const BookMakerOddsgrid: FC<{
  CurrentOdd: FancyOddsInterface[];
  PrevOdds: FancyOddsInterface[];
  matchId: number;
  bet: BetDetailsInterface | null;
  setBet: Dispatch<SetStateAction<BetDetailsInterface | null>>;
  OddsPnl: any;
  buttonData: any;
}> = ({ CurrentOdd, matchId, OddsPnl, buttonData, bet, setBet }) => {
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

  const date = new Date();

  const updateBet = (
    isBack: boolean,
    odds: number,
    selectionId: string,
    marketId: string,
    matchId: number,
    placeTime: Date,
    priceValue: number,
    isFancy: boolean,
    marketName: string
  ) => {
    if (odds > 0) {
      setBet(null);
    }
    setBet({
      ...bet,
      isBack: isBack,
      marketName,
      odds: odds,
      stake: 0,
      selectionId: selectionId,
      marketId: marketId,
      matchId: matchId.toString(),
      placeTime: placeTime,
      priceValue: priceValue,
      isFancy: isFancy,
    });
  };

  return (
    <>
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        {CurrentOdd.map((item) => (
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

                    item.sid,
                    item.mid,
                    matchId,
                    date,
                    +item.b1,
                    false,
                    item.t
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

                    item.sid,
                    item.mid,
                    matchId,
                    date,
                    +item.l1,
                    false,
                    item.t
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
    </>
  );
};

export default BookMakerOddsgrid;
