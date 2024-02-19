import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { BetDetailsInterface, FancyOddsInterface, FancyPnl } from '../types';
import { redGreenComponent } from '../Bet';

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

const NewSession: FC<Props> = ({ CurrentOdd,
    PrevOdds,
    matchId,
    title,
    setMarketId,
    FancyPnl,
    bet,
    setBet, }) => {
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
        marketName: string,
        marketnameid: string
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
            marketnameid: marketnameid,
        });
    };

    const [show, setShow] = useState(true);
    const handleChange = () => {
        if (show === true) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    const getValue = (num: number): string => {
        if ((num / 1000000) >= 1) { return (num / 1000000) + 'M'; }
        else if ((num / 1000) >= 1) { return (num / 1000) + 'K'; }
        else { return num.toString(); }
    }

    return (
        <div>
            <table className="match-bets-old table table-bordered">
                <thead className="lgaai">

                    <tr>
                        <th style={{ width: "46%", textAlign: "center" }}>
                            {title}
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEqElEQVR4nO2bS28URxDHWyFxFCASBo68X9eIKEImBiQQdyxBThEmtxgCCDvYAk58Cx42OTn5AAgWczYgEvPMBRIn4QMEHBR2hQHDD3W2NhTNzDCz072zu9q/NJK1W11VXd6qrqquMaaDDjoICaAL2AqMAOeAK8CfwAzwTJ4Z+cx+Nya0dk2XaUUAnwL7gAmgQv2oCA/La6FpdgDrgVGgjH+Uhfd602wAVgE/AXMxyt8HTgEDwA5gDdANfCSP/XutfLcfOC1romBl/AisbBb/Ph7zM78NDALLcvBfBgwBdyL4V0R2MXGC6n/shqPUK+A80BNA3mbggsjQmLK6+JaXCKAPeOwo8gvwhQkMYFOE4a0ufaFl/wfx0ZdK+FPgIPCBaRCAecBhka1jw/7Qgk84lv8N+Cyo0GR9NgLTjk4nQgkbcAT9DCwNIiybXt2SQGkcDuHzL5WAS8B80ySwukjCpN2hz2e0f6yYXwcWmCYD8AkwqfT8F9jg45y/4fh8twdle+U/9kQe+4v60gPfJU5MmMqVJ1BNNHS0zx3wgK+AF7wL+9keD/w/B2YV32N50tuKYnTQU8By8weNf4BFHuQcUTwrdaXNVHN7neTkPueBvbwfX3vKE24qnuP1VHVzsviVrwzPcak4HPeYOtdg97Iuy+JRtfi8D4Ua+QtQ8kqK72iWZkZZLfRW2KSIATM+YoBz2tRQTtVUAb5Ri277Ukbx3xNzCjwHdgeQd1fJ6E+zYEItGPStkPLPkiQr9rkYooQWWUfVfkppEp+KWlB3M6NZAKxw3CA+MQK2KeJ7pk3gZIdbkwhHFOEp0yYAzqh9DScR/qAIB0ybAPhO7WssifCqItxu2gTATrWvySTCB4pwVWClNkvHdzDUCaBk2TZ8DX8lET5UhEsCKbNIyl8XJZ9JkCNzqZLzdxLhM0UYpN8es/n/jRBI5sdKxmxhBuDtAiUOPUUa4GFIFwC+T2GAoSJd4IEiXB1AkZMpDHCyyCB4NeQxWKABUh+D50ImQgUaIHUiNKIIT7eRAc6mTYW3KcL7bWSAP9IWQ11OOby81Q1gO8Kpy+GIhshQGxhgOFOiRcCWWEEG+FXx3ptmwUKnKZr7yqooAwBbMjdFI9riF0zrGmAic1s85mJkk2kxAzgt8WwXIxYyilaDvSGeZ1rEAMCHMqVW39WYOj4qPqcuGlUMSaNF+/4KX9fjG3Mq1hO6HLb3mF6ux1ViZIcMapjOWyaHbIhI2WuHrv0MSMSMyFzLMx8kLbGS75aYHduR8Z0arM5r6uUXNSSl54An8g5JiTsM+miKyuYvK/2srrvy8HwHwLdNOia32OljWBxq1KDktJ3JCSIsfcDTPu9twOJ9o7LaHWZlJid3npDxnB9yov1cw26zgF0Rgw63bNe3AbJ7nSSnFvD8+nzKRuNUTDTvNZ4hhU3UETrlLdp7fmHirgwn1JeFvclGh52SVmd4x5rixSqqio4nvDLzu/TlDkiHdp1E7y55FksBtlNozkZMgWtfH89j2GCgurHQL01lq+qKANWmSr/EgzzGKAuP/pZ4bS7Fi5NjMtFtz+5H6sXJR/LZZFu8ONlBB6Zl8BoDx4f75DE/RgAAAABJRU5ErkJggg=="
                                alt="Rules (Bookmaker)"
                                id="BOOKMAKER"
                                style={{
                                    float: "right",
                                    height: 24,
                                    fontSize: 10,
                                    cursor: "pointer"
                                }}
                            />

                        </th>
                        <th
                            style={{ width: "22%", verticalAlign: "middle", backgroundColor: "#002D5B", textAlign: "center", textTransform: "uppercase" }}
                            align="center"
                            className="FontTextWhite10px"

                        >
                            No
                        </th>
                        <th
                            style={{ width: "22%", verticalAlign: "middle", backgroundColor: "#002D5B", textAlign: "center", textTransform: "uppercase" }}

                            className="FontTextWhite10px"
                        >
                            Yes
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CurrentOdd?.map((item, index) => {
                            return (
                                <tr>
                                    <th className="" style={{ color: "black", textAlign: "center", width: "46%" }}>
                                        <p style={{ margin: "0px" }}>{item?.nation}: {" "} <span style={{ display: "inline-block" }}
                                            onClick={() =>
                                                // (FancyPnl?.find((pnl) => pnl.marketId === item.sid)?.pnl ||
                                                // 0) &&
                                                setMarketId(item.sid)
                                            }> {redGreenComponent(
                                                FancyPnl?.find((pnl) => pnl.marketId === item.sid)?.pnl || 0
                                            )}

                                        </span></p>
                                        <p style={{ marginTop: "2px", color: "#1a8754" }}>{getValue(item?.maxBet)}</p>
                                    </th>
                                    <th

                                        className={`text-dark text-center font-17 ${PrevOdds[index].l1 < item.l1
                                            ? "odds-up"
                                            : PrevOdds[index].l1 > item.l1
                                                ? "odds-down"
                                                : ""
                                            }`}
                                        style={{ backgroundColor: "rgb(250, 169, 186)", textAlign: "center", color: "#000", width: "22%" }} onClick={() =>
                                            item.l1 &&
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
                                                "Session",
                                                "NO"
                                            )
                                        }
                                    >
                                        <p style={{ marginBottom: "2px", fontSize: "17px", marginTop: "2px" }}>{item?.l1}</p>
                                        <p style={{ marginTop: "2px", marginBottom: "4px" }}>{item?.ls1}</p>
                                    </th>
                                    <th
                                        className={`text-dark text-center font-17 ${PrevOdds[index].b1 < item.b1
                                            ? "odds-up"
                                            : PrevOdds[index].b1 > item.b1
                                                ? "odds-down"
                                                : ""
                                            }`}
                                        style={{ backgroundColor: "rgb(114, 187, 239)", textAlign: "center", color: "#000", width: "22%" }}
                                        onClick={() =>
                                            item.b1 &&
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
                                                "Session",
                                                "YES"
                                            )
                                        }
                                    >
                                        <p style={{ marginBottom: "2px", fontSize: "17px", marginTop: "2px" }}>{item?.b1}</p>
                                        <p style={{ marginTop: "2px", marginBottom: "4px" }}>{item?.bs1}</p>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default NewSession