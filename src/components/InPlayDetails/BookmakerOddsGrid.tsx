import { Box, Grid } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import "./custom.css";
import { BetGridItem, redGreenComponent } from "./Bet";
import {
  BetDetailsInterface,
  FancyOddsInterface,
  ProfitInterface,
} from "./types";

const BookMakerOddsgrid: FC<{
  CurrentOdd: FancyOddsInterface[];
  PrevOdds: FancyOddsInterface[];
  matchId: number;
  bet: BetDetailsInterface | null;
  setBet: Dispatch<SetStateAction<BetDetailsInterface | null>>;
  OddsPnl: any;
  buttonData: any;
  profits: ProfitInterface[];
}> = ({ CurrentOdd, matchId, OddsPnl, buttonData, bet, setBet, profits }) => {
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
    marketName: string,
    name: string
  ) => {
    if (odds <= 0) {
      setBet(null);
      return;
    }
    setBet({
      ...bet,
      isBack: isBack,
      marketName: "Bookmaker",
      odds: odds,
      stake: 0,
      selectionId: selectionId,
      marketId: marketId,
      matchId: matchId.toString(),
      placeTime: placeTime,
      priceValue: priceValue,
      isFancy: isFancy,
      name,
    });
  };

  return (
    <>
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        {CurrentOdd.map((item) => (
          <BetGridItem
            suspended={["suspended", "ball running"].includes(
              item.gstatus.toLowerCase()
            )}
            values={[
              <>
                <BetTextMedium>{item?.nation}</BetTextMedium>
                <BetTextSmall>
                  Max Bet:{item?.maxBet} | Bet Delay:
                  {item?.minBet}
                </BetTextSmall>
                {redGreenComponent(
                  profits?.find((profit) => profit?.sid === item.sid)?.value
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
                    item.t,
                    item.nation
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
                    item.t,
                    item.nation
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
