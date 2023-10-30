import { Grid } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { BetText, BetTextMedium, BetTextSmall } from "./styledComponents";
import "./custom.css";
import { BetGridItem, redGreenComponent } from "./Bet";
import {
  BetDetailsInterface,
  FancyOddsInterface,
  ProfitInterface,
} from "./types";
import "./Bet.css"
import { TitleStyled } from "../custom/styledComponents";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AllMatch from "./AllMatch";

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
    name: string,
    marketnameid: string,

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
      marketnameid: marketnameid

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

  console.log(CurrentOdd[0]?.t, "awqrewerfcvwevw");

  return (





    <div>
      <div className="scroll-form oddsTable row" style={{ fontSize: 14 }}>
        <table className="table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>

              <th
                className="bet-place-tbl-th run-pos-rate-amt-run-mod-color desktoptableheadSize"

              >
                <div className="bookmakerheader">

                  <ArrowDropUpIcon style={{ fontSize: "30px", transform: show === true ? "" : "rotate(180deg)", cursor: "pointer" }} onClick={handleChange} />

                  {/* {/* {CurrentOdd.map((item) => (
                  <> */}
                  <div className="_child">

                    <span className="_child_max_min_name">
                      {CurrentOdd[0]?.t === "TOSS" ?
                        "TOSS"
                        :
                        "Bookmaker"
                      }
                    </span>
                    <span className="_child_max_min">
                      <span> Min:{CurrentOdd[0]?.minBet}{" "}</span>
                      <span> Max:{CurrentOdd[0]?.maxBet}</span>

                    </span>
                  </div>
                </div>

              </th>
              <th
                className="bet-place-tbl-th lagai-box-color desktop desktopSize"

              >

              </th>
              <th
                className="bet-place-tbl-th lagai-box-color desktop desktopSize"

              >

              </th>
              <th
                className="bet-place-tbl-th lagai-box-color desktopSize"

              >
                LAGAI
              </th>
              <th
                className="bet-place-tbl-th khai-box-color desktopSize"

              >
                KHAI
              </th>
              <th
                className="bet-place-tbl-th khai-box-color desktop desktopSize"

              >

              </th>
              <th
                className="bet-place-tbl-th khai-box-color desktop desktopSize"

              >

              </th>
              <th
                className="bet-place-tbl-th run-pos-rate-amt-run-mod-color desktopSize"

              >
                POS.
              </th>
            </tr>
          </thead>

          {show && <tbody>
            {CurrentOdd.map((item: any) => (
              <tr>

                <td
                  className="bet-place-tbl-td "
                  style={{ textAlign: "left", padding: 10, fontWeight: 750 }}
                >
                  {item?.nation}
                  {/* <div>
                    <span>{redGreenComponent(
                      profits?.find((profit) => profit?.sid === item.sid)?.value
                    )}</span>
                  </div> */}
                  {console.log(item, "kuhgbjkiuytfgcvbnj")}
                </td>

                <td className="bet-place-tbl-td cursor-pointer desktopSize desktop" style={{
                  fontSize: "16px",
                  fontWeight: 750,
                  color: "#5957ff"
                }}
                >
                  <span>0</span>
                </td>
                <td className="bet-place-tbl-td cursor-pointer desktopSize desktop" style={{
                  fontSize: "16px",
                  fontWeight: 750,
                  color: "#5957ff"
                }}
                >
                  <span>0</span>
                </td>
                <td className="bet-place-tbl-td cursor-pointer desktopSize" style={{
                  fontSize: "16px",
                  fontWeight: 750,
                  color: "#5957ff"
                }}

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
                      item.nation,
                      "LAGAI"

                    )
                  }>
                  <span>{item.b1}</span>
                </td>
                <td className="bet-place-tbl-td cursor-pointer desktopSize" style={{
                  fontSize: "16px",
                  fontWeight: 750,
                  color: "#ff5c72"
                }} onClick={() =>
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
                    item.nation,
                    "KHAI"
                  )
                }>
                  <span>{item.l1}</span>
                </td>
                <td className="bet-place-tbl-td cursor-pointer desktopSize desktop" style={{
                  fontSize: "16px",
                  fontWeight: 750,
                  color: "#ff5c72"
                }} >
                  <span>0</span>
                </td>
                <td className="bet-place-tbl-td cursor-pointer desktopSize desktop" style={{
                  fontSize: "16px",
                  fontWeight: 750,
                  color: "#ff5c72"
                }} >
                  <span>0</span>
                </td>
                <td
                  className="bet-place-tbl-td desktopSize"
                  // style={{ color: "rgb(81, 153, 230)" }}
                  style={{
                    fontSize: "16px",
                    fontWeight: 750
                  }}
                >
                  {redGreenComponent(
                    profits?.find((profit) => profit?.sid === item.sid)?.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>

    </div >




  );
};

export default BookMakerOddsgrid;
