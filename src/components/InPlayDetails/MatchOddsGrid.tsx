
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BetDetailsInterface, ProfitInterface } from "./types";
import "./common.css"
import { useSearchParams } from "react-router-dom";
import { userServices } from "../../utils/api/user/services";
import { redGreenComponent } from "./Bet";
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
  const [newUserWinnerPnl, setNewUserWinnerPnl] = useState<any>()

  useEffect(() => {
    const timer = setInterval(() => {

      if (Name.toLowerCase().includes("winner")) {

        const getList = async () => {
          const { response } = await userServices.UserWinnerPnl({ marketId: marketId });
          if (response?.data) {
            setNewUserWinnerPnl(response)
          }
        };
        getList();

      }
    }, 5000);

    return () => clearInterval(timer);

  }, []);


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
                style={{ width: "46%", textAlign: "center" }}

              >
                <div className="">
                  {/* <ArrowDropUpIcon onClick={handleChange} style={{ fontSize: "30px", transform: show === true ? "" : "rotate(180deg)", cursor: "pointer" }} /> */}
                  <div className="">
                    <span className="_child_max_min_name">
                      {Name}
                      <p style={{ margin: "0px" }}>Max:{maxBet}</p>
                    </span>

                  </div>
                </div>
              </th>
              <th style={{ width: "22%" }}
                className="bet-place-tbl-th lagai-box-color desktopSize"
              >LAGAI</th>
              <th style={{ width: "22%" }}
                className="bet-place-tbl-th khai-box-color desktopSize"
              >
                KHAI
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
                      style={{ padding: 10, fontWeight: 750, width: "46%" }}
                    >
                      <span> {item.name}: <b style={{ display: "inline-block" }}>{Name.toLowerCase().includes("winner") ?

                        redGreenComponent(
                          (newUserWinnerPnl && newUserWinnerPnl?.data?.find((itemmmm: any) => itemmmm?.selctionId == item.selectionId)
                            ?.liability)
                        )
                        :
                        redGreenComponent(
                          OddsPnl?.find((pnl) => pnl.sid === item.selectionId)
                            ?.value || 0
                        )
                      }</b></span>
                      <div>
                      </div>
                    </td>
                    <td style={{ width: "22%", background: "rgb(114, 187, 239)", color: "#000" }} className={`bet-place-tbl-td cursor-pointer desktopSize ${PrevRunner[index].ex.availableToBack[0].price <
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
                        color: "#000",
                        fontWeight: "750"
                      }}>
                        {item.ex.availableToBack[0].price}</span>
                      <div>
                        <span style={{
                          fontSize: "9px",
                          color: "#000",
                          fontWeight: "500"
                        }}>{item.ex.availableToBack[0].size}</span>
                      </div>
                    </td>
                    <td style={{ width: "22%", background: "rgb(250, 169, 186)", color: "#000" }} className={`bet-place-tbl-td cursor-pointer desktopSize ${PrevRunner[index].ex.availableToLay[0].price <
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
                        color: "#000",
                        fontWeight: "750"
                      }}>{item.ex.availableToLay[0].price}</span>
                      <div>
                        <span style={{
                          fontSize: "9px",
                          color: "#000",
                          fontWeight: "500"
                        }}>{item.ex.availableToLay[0].size}</span>
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

  );
};
