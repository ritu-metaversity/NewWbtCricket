import { Box, Grid } from "@mui/material";

import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetGridItem, redGreenComponent } from "./Bet";
import { BetText, BetTextMedium } from "./styledComponents";
import { BetDetailsInterface, ProfitInterface } from "./types";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import "./common.css"
import { useSearchParams } from "react-router-dom";
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
  minBet: number;
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
  OddsPnl: ProfitInterface[];
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
}) => {
  const { runners, status, maxBet, minBet, marketId, Name } = CurrentOdd;
  const { runners: PrevRunner } = PrevOdds;

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
    isFancy: boolean,
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
      marketName: Name,
      odds: odds,
      stake: stake,
      selectionId: selectionId,
      marketId: marketId,
      matchId: matchId.toString(),
      placeTime: placeTime,
      priceValue: priceValue,
      isFancy: isFancy,
      name,
      marketnameid: marketnameid
    });
  };
  const [show, setShow] = useState(true)
  const [searchParams] = useSearchParams();

  const handleChange = () => {
    if (show === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }
  console.log(runners, "runners");

  useEffect(() => {
    if ((searchParams.get("Sports-id") === "4")) {
      setShow(false)
    }
  }, [])

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
                  {/* <div style={{ width: "10%" }}> */}
                  <ArrowDropUpIcon onClick={handleChange} style={{ fontSize: "30px", transform: show === true ? "" : "rotate(180deg)", cursor: "pointer" }} />
                  {/* </div> */}
                  <div className="_child">

                    Min:{minBet}{" "}
                    Max:{maxBet}

                  </div>
                </div>
                {/* <ArrowDropUpIcon onClick={handleChange} /> */}
              </th>
              <th
                className="bet-place-tbl-th run-pos-rate-amt-run-mod-color desktop desktopSize"

              >

              </th>
              <th
                className="bet-place-tbl-th run-pos-rate-amt-run-mod-color desktop desktopSize"

              >

              </th>


              <th
                className="bet-place-tbl-th lagai-box-color desktopSize"
              >LAGAI</th>
              <th
                className="bet-place-tbl-th khai-box-color desktopSize"

              >
                KHAI
              </th>
              <th
                className="bet-place-tbl-th run-pos-rate-amt-run-mod-color desktop desktopSize"

              >

              </th>
              <th
                className="bet-place-tbl-th run-pos-rate-amt-run-mod-colo desktop desktopSize"

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
            {runners.map((item, index) => {
              return (

                <tr>
                  <>

                    <td
                      className="bet-place-tbl-td "
                      style={{ textAlign: "left", padding: 10, fontWeight: 750 }}
                    >
                      {item.name}
                      <div>

                      </div>
                    </td>
                    <td className="bet-place-tbl-td cursor-pointer desktop desktopSize"
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#5957ff",
                        fontWeight: "750"
                      }}>{item.ex.availableToBack[2].price}</span>
                      <div>

                        <span style={{
                          fontSize: "9px",
                          color: "#5957ff",
                          fontWeight: "500"
                        }}>{item.ex.availableToBack[2].size}</span>
                      </div>
                    </td>
                    <td className="bet-place-tbl-td cursor-pointer desktop desktopSize"
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#5957ff",
                        fontWeight: "750"
                      }}>{item.ex.availableToBack[1].price}</span>
                      <div>

                        <span style={{
                          fontSize: "9px",
                          color: "#5957ff",
                          fontWeight: "500"
                        }}>{item.ex.availableToBack[1].size}</span>
                      </div>
                    </td>
                    <td className={`bet-place-tbl-td cursor-pointer desktopSize ${PrevRunner[index].ex.availableToBack[0].price <
                      item.ex.availableToBack[0].price
                      ? "odds-up"
                      : PrevRunner[index].ex.availableToBack[0].price >
                        item.ex.availableToBack[0].price
                        ? "odds-down"
                        : ""}`}
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
                          false,
                          item.name,
                          "LAGAI"
                        )
                      }
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#5957ff",
                        fontWeight: "750"
                      }}>
                        {item.ex.availableToBack[0].price}</span>
                      <div>
                        <span style={{
                          fontSize: "9px",
                          color: "#5957ff",
                          fontWeight: "500"
                        }}>{item.ex.availableToBack[0].size}</span>
                      </div>

                    </td>
                    <td className={`bet-place-tbl-td cursor-pointer desktopSize ${PrevRunner[index].ex.availableToLay[0].price <
                      item.ex.availableToLay[0].price
                      ? "odds-up"
                      : PrevRunner[index].ex.availableToLay[0].price >
                        item.ex.availableToLay[0].price
                        ? "odds-down"
                        : ""}`}
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
                          false,
                          item.name,
                          "KHAI"
                        )
                      }
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#ff5c72",
                        fontWeight: "750"
                      }}>{item.ex.availableToLay[0].price}</span>
                      <div>

                        <span style={{
                          fontSize: "9px",
                          color: "#ff5c72",
                          fontWeight: "500"
                        }}>{item.ex.availableToLay[0].size}</span>
                      </div>
                    </td>
                    <td className="bet-place-tbl-td cursor-pointer desktop desktopSize"
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#ff5c72",
                        fontWeight: "750"
                      }}>{item.ex.availableToBack[1].price}</span>
                      <div>

                        <span style={{
                          fontSize: "9px",
                          color: "#ff5c72",
                          fontWeight: "400"
                        }}>{item.ex.availableToBack[1].size}</span>
                      </div>
                    </td>
                    <td className="bet-place-tbl-td cursor-pointer desktop desktopSize"
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#ff5c72",
                        fontWeight: "750"
                      }}>{item.ex.availableToBack[2].price}</span>
                      <div>

                        <span style={{
                          fontSize: "9px",
                          color: "#ff5c72",
                          fontWeight: "400"
                        }}>{item.ex.availableToBack[2].size}</span>
                      </div>
                    </td>
                    <td className="bet-place-tbl-td cursor-pointer desktopSize"
                      style={{ cursor: "unset" }}
                    >
                      <span style={{
                        fontSize: "16px",
                        color: "#ff5c72",
                        fontWeight: "750"
                      }}> {redGreenComponent(
                        OddsPnl?.find((pnl) => pnl.sid === item.selectionId)
                          ?.value || 0
                      )}</span>
                      <div>

                        {/* <span style={{
                          fontSize: "13px",
                          color: "#5957ff",
                          fontWeight: "400"
                        }}>0</span> */}
                      </div>
                    </td>
                  </>

                </tr>
              )
            })}
          </tbody>
          }
        </table>
      </div>
    </div >
    // <>

    //   <Box display="flex" justifyContent={"space-evenly"}>
    //     <BetTextMedium>Max Bet:{maxBet}</BetTextMedium>
    //     <BetTextMedium>Min Bet:{minBet}</BetTextMedium>
    //   </Box>
    //   <Grid container bgcolor="#dfdfdf" gap={0.5} p={0.5}>
    //     <BetGridItem title values={["TEAM", "LAGAI", "KHAI"]} />
    //     {runners.map((item, index) => {
    //       return (
    //         <>
    //           <BetGridItem
    //             suspended={["SUSPENDED", "CLOSED"].includes(status)}
    //             values={[
    //               <>
    //                 {" "}
    //                 {item.name}
    //                 {redGreenComponent(
    //                   OddsPnl?.find((pnl) => pnl.sid === item.selectionId)
    //                     ?.value || 0
    //                 )}
    //               </>,
    //               <Box
    //                 className={
    //                   PrevRunner[index].ex.availableToBack[0].price <
    //                   item.ex.availableToBack[0].price
    //                     ? "odds-up"
    //                     : PrevRunner[index].ex.availableToBack[0].price >
    //                       item.ex.availableToBack[0].price
    //                     ? "odds-down"
    //                     : ""
    //                 }
    //               >
    //                 <BetText
    //                   onClick={() =>
    //                     updateBet(
    //                       true,
    //                       +item.ex.availableToBack[0].price,
    //                       0,
    //                       item.selectionId,
    //                       marketId,
    //                       matchId,
    //                       date,
    //                       +item.ex.availableToBack[0].price,
    //                       false,
    //                       item.name
    //                     )
    //                   }
    //                   color="blue"
    //                 >
    //                   {item.ex.availableToBack[0].price}
    //                 </BetText>
    //                 {item.ex.availableToBack[0].size}
    //               </Box>,
    //               <Box
    //                 className={
    //                   PrevRunner[index].ex.availableToLay[0].price <
    //                   item.ex.availableToLay[0].price
    //                     ? "odds-up"
    //                     : PrevRunner[index].ex.availableToLay[0].price >
    //                       item.ex.availableToLay[0].price
    //                     ? "odds-down"
    //                     : ""
    //                 }
    //               >
    //                 <BetText
    //                   onClick={() =>
    //                     updateBet(
    //                       false,
    //                       +item.ex.availableToLay[0].price,
    //                       0,
    //                       item.selectionId,
    //                       marketId,
    //                       matchId,
    //                       date,
    //                       +item.ex.availableToLay[0].price,
    //                       false,
    //                       item.name
    //                     )
    //                   }
    //                   color="red"
    //                 >
    //                   {item.ex.availableToLay[0].price}
    //                 </BetText>
    //                 {item.ex.availableToLay[0].size}
    //               </Box>,
    //             ]}
    //           />
    //         </>
    //       );
    //     })}
    //   </Grid>
    // </>
  );
};
