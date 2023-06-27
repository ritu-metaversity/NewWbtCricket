import { FancyPnl } from "./Bet";
import { Box, Grid } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { BetGridItem, redGreenComponent } from "./Bet";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import { BetDetailsInterface, FancyOddsInterface } from "./types";
import "./Bet.css"
// import { IoMdArrowDropdown } from "react-icons/fa";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import "./common.css"
interface Props {
  CurrentOdd: FancyOddsInterface[];
  PrevOdds: FancyOddsInterface[];
  matchId: number;
  title: any;
  FancyPnl: FancyPnl[];
  setMarketId: Dispatch<SetStateAction<string>>;
  buttonData: any;
  bet: BetDetailsInterface | null;
  setBet: Dispatch<SetStateAction<BetDetailsInterface | null>>;
}
export const SessionOddsGrid: FC<Props> = ({
  CurrentOdd,
  PrevOdds,
  matchId,
  title,
  setMarketId,
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
    t: string,
    marketName: string
  ) => {
    if (odds > 0) {
      setBet(null);
    }
    setBet({
      ...bet,
      marketName,
      name: t,
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
  const [show, setShow] = useState(true)
  const handleChange = () => {
    if (show === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }
  return (

    <div className="scroll-form row">
      <table className="table-bordered" style={{ width: "100%" }}>
        <thead className="sessions-thead">
          <tr className="sessions-header">

            <th className="bet-place-tbl-th run-pos-rate-amt-run-mod-color sess_row_head1">
              {/* <svg data-testid="ArrowDropUpIcon"></svg>/ */}
              <div className="sessionPart">

                <ArrowDropUpIcon onClick={handleChange} style={{ fontSize: "30px", transform: show === true ? "" : "rotate(180deg)" }} />

                <div className="sessionchild">
                  <span>
                    SESSION
                  </span>

                </div>

                <a href="/terms">
                  <span
                    style={{
                      float: "right",
                      background: "rgb(255, 255, 255)",
                      borderRadius: 15,
                      padding: "0px 6px",
                      color: "rgb(8, 131, 148)"
                    }}
                  >
                    𝓲
                  </span>
                </a>
              </div>
            </th>
            <th
              className="bet-place-tbl-th not-box-color"
              style={{ width: "22%" }}
            >
              NOT
            </th>
            <th
              className="bet-place-tbl-th yes-box-color"
              style={{ width: "23%" }}
            >
              YES
            </th>
          </tr>
        </thead>
        {show &&


          <tbody>

            {CurrentOdd.map((item, index) => (
              <tr>


                <td className="bet-place-tbl-td" style={{ textAlign: "left" }}>
                  <div>
                    <div
                      style={{ fontWeight: 750, overflow: "hidden", height: 20 }}
                    >
                      {item?.nation}
                    </div>
                    <div style={{ fontSize: 10 }}>Session Limit : {item?.maxBet}</div>
                    <div style={{ fontSize: 10 }} onClick={() =>
                      (FancyPnl?.find((pnl) => pnl.marketId === item.sid)?.pnl ||
                        0) &&
                      setMarketId(item.sid)
                    }> {redGreenComponent(
                      FancyPnl?.find((pnl) => pnl.marketId === item.sid)?.pnl || 0
                    )}</div>
                  </div>
                </td>
                <td
                  className={`first-runner-bet-odds-no-value cursor-pointer ${PrevOdds[index].b1 < item.b1
                    ? "odds-up"
                    : PrevOdds[index].b1 > item.b1
                      ? "odds-down"
                      : ""
                    }`}
                  style={{}}
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
                      item.nation,
                      "Session"
                    )
                  }
                >
                  <div style={{ fontWeight: 750 }}>{item.b1}</div>
                  <div style={{ fontSize: 10 }}>{item.bs1}</div>
                </td>
                <td
                  className={`first-runner-bet-odds-yes-value cursor-pointer ${PrevOdds[index].l1 < item.l1
                    ? "odds-up"
                    : PrevOdds[index].l1 > item.l1
                      ? "odds-down"
                      : ""}`}
                  style={{}}
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
                      item.nation,
                      "Session"
                    )
                  }
                >
                  <div>{item.l1}</div>
                  <div style={{ fontSize: 10 }}>{item.ls1}</div>
                </td>
              </tr>
            ))}
          </tbody>}
      </table>
    </div>


  );
};
