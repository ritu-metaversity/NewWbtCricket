import { FancyPnl } from "./Bet";
import { Box, Grid } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { BetGridItem, redGreenComponent } from "./Bet";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import { BetDetailsInterface, FancyOddsInterface } from "./types";

interface Props {
  CurrentOdd: FancyOddsInterface[];
  PrevOdds: FancyOddsInterface[];
  matchId: number;
  title: any;
  FancyPnl: FancyPnl[];
  buttonData: any;
  bet: BetDetailsInterface | null;
  setBet: Dispatch<SetStateAction<BetDetailsInterface | null>>;
}
export const SessionOddsGrid: FC<Props> = ({
  CurrentOdd,
  PrevOdds,
  matchId,
  title,
  FancyPnl,
  bet,
  setBet,
}) => {
  const date = new Date();

  const updateBet = (
    isBack: boolean,
    odds: number,
    stake: number,
    selectionId: number,
    marketId: string,
    matchId: string,
    placeTime: Date,
    priceValue: number,
    isFancy: boolean,
    t: string
  ) => {
    if (odds > 0) {
      setBet(null);
    }
    setBet({
      ...bet,
      marketName: t,
      isBack: isBack,
      odds: odds,
      stake,
      selectionId: selectionId,
      marketId: marketId,
      matchId: matchId,
      placeTime: placeTime,
      priceValue: priceValue,
      isFancy: isFancy,
    });
  };
  return (
    <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
      <BetGridItem title values={["SESSION", "NOT", "YES"]} />
      {CurrentOdd.map((item, index) => (
        <BetGridItem
          values={[
            <>
              <BetTextMedium>{item?.nation}</BetTextMedium>
              <BetTextSmall>Session Limit: 50k</BetTextSmall>
              {redGreenComponent(
                FancyPnl?.find((pnl) => pnl.marketId === item.sid)?.pnl || 0
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
                    0,
                    0,
                    item.sid,
                    matchId.toString(),
                    date,
                    +item.bs1,
                    true,
                    item.nation
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
                    0,
                    0,
                    item.sid,
                    matchId.toString(),
                    date,
                    +item.ls1,
                    true,
                    item.nation
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
  );
};
