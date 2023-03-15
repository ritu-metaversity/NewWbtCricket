import { Box, Grid } from "@mui/material";

import React, { Dispatch, FC, SetStateAction } from "react";
import { BetGridItem, Pnl, redGreenComponent } from "./Bet";
import { BetText, BetTextMedium } from "./styledComponents";
import { BetDetailsInterface } from "./types";

interface MatchOddsGridProps {
  runners: {
    back1price: number;
    lay1price: number;
    name: string;
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
  Name: string;
  betDelay: number;
  inPlay: boolean;
  isActive: boolean;
  isPause: boolean;
  status: string;
  marketId: string;
}

interface Props {
  CurrentOdd: MatchOddsGridProps;
  PrevOdds: MatchOddsGridProps;
  matchId: number;
  OddsPnl: Pnl[];
  buttonData: any;
  bet: BetDetailsInterface | null;
  setBet: Dispatch<SetStateAction<BetDetailsInterface | null>>;
}

export const MatchOddsGrid: FC<Props> = ({
  CurrentOdd,
  setBet,
  bet,
  PrevOdds,
  matchId,
  OddsPnl,
  buttonData,
}) => {
  const { runners, status, maxBet, betDelay, marketId, Name } = CurrentOdd;
  const { runners: PrevRunner } = PrevOdds;

  const pnlsOdds = OddsPnl?.find((element) => element?.marketId == marketId);
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
    stake: number,
    selectionId: number,
    marketId: string,
    matchId: number,
    placeTime: Date,
    priceValue: number,
    isFancy: boolean
  ) => {
    if (odds > 0) {
      setBet(null);
    }
    setBet({
      ...bet,
      isBack: isBack,
      marketName: Name,
      odds: odds,
      stake: stake,
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
      <Box display="flex" justifyContent={"space-evenly"}>
        <BetTextMedium>Max Bet:{maxBet}</BetTextMedium>
        <BetTextMedium>Bet Delay:{betDelay}</BetTextMedium>
      </Box>
      <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
        <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
        {runners.map((item, index) => {
          return (
            <>
              <BetGridItem
                suspended={["SUSPENDED", "CLOSED"].includes(status)}
                values={[
                  <>
                    {" "}
                    {item.name}
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
                          0,
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
                          0,
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
            </>
          );
        })}
      </Grid>
    </>
  );
};
