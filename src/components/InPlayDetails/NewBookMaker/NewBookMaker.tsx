import React, { Dispatch, FC, SetStateAction } from 'react'
import './style.css'
import { BetDetailsInterface, FancyOddsInterface, ProfitInterface } from '../types';
import { redGreenComponent } from '../Bet';

const NewBookMaker: FC<{
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
            name: name,
            marketnameid: marketnameid

        });
    };
    return (
        <div>
            <table className="match-bets-old table table-bordered">
                <thead className="lgaai">
                    <tr>
                        <th style={{ width: "46%", textAlign: "center" }}>
                            Team
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
                            <p className="m-0">{CurrentOdd[0]?.maxBet}</p>
                        </th>
                        <th
                            style={{ width: "22%", verticalAlign: "middle", backgroundColor: "#002D5B", textAlign: "center", textTransform: "uppercase" }}
                            align="center"
                            className="FontTextWhite10px"

                        >
                            Lagai
                        </th>
                        <th
                            style={{ width: "22%", verticalAlign: "middle", backgroundColor: "#002D5B", textAlign: "center", textTransform: "uppercase" }}

                            className="FontTextWhite10px"
                        >
                            Khai
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CurrentOdd?.map((res) => {
                            return (
                                <tr>
                                    <th className="d-flex justify-content-center align-items-center" style={{ color: "black" }}>
                                        {res?.nation}: <b className="mx-2 text-primary"> {redGreenComponent(
                                            profits?.find((profit) => profit?.sid === res?.sid)?.value
                                        )}</b>
                                    </th>
                                    <th
                                        className="text-dark text-center font-17"
                                        style={{ backgroundColor: "rgb(114, 187, 239)", textAlign: "center", fontSize: "17px", color: "#000" }}
                                        onClick={() =>
                                            updateBet(
                                                true,
                                                +res.b1,

                                                res.sid,
                                                res.mid,
                                                matchId,
                                                date,
                                                +res.b1,
                                                false,
                                                res.t,
                                                res.nation,
                                                "LAGAI"

                                            )
                                        }
                                    >
                                        <span>{res?.b1}</span>
                                    </th>
                                    <th
                                        className="text-dark font-17"
                                        style={{ backgroundColor: "rgb(250, 169, 186)", textAlign: "center", fontSize: "17px", color: "#000" }}
                                        onClick={() =>
                                            updateBet(
                                                false,
                                                +res.l1,
                                                res.sid,
                                                res.mid,
                                                matchId,
                                                date,
                                                +res.l1,
                                                false,
                                                res.t,
                                                res.nation,
                                                "KHAI"
                                            )
                                        }
                                    >
                                        <span>{res?.l1}</span>
                                    </th>
                                </tr>
                            )
                        })
                    }
                    {/* <tr>
                        <th className="d-flex justify-content-center align-items-center">
                            Australia Women: <b className="mx-2 text-primary">0</b>
                        </th>
                        <th
                            className="text-dark text-center font-17"
                            style={{ backgroundColor: "rgb(114, 187, 239)", textAlign: "center" }}
                        >
                            <span>0</span>
                        </th>
                        <th
                            className="text-dark font-17"
                            style={{ backgroundColor: "rgb(250, 169, 186)", textAlign: "center" }}
                        >
                            <span>0.03</span>
                        </th>
                    </tr>
                    <tr>
                        <th className="d-flex justify-content-center align-items-center">
                            South Africa Women: <b className="mx-2 text-primary">0</b>
                        </th>
                        <th
                            className="text-dark text-center font-17"
                            style={{ backgroundColor: "rgb(114, 187, 239)", textAlign: "center" }}
                        >
                            <span>0.00</span>
                        </th>
                        <th
                            className="text-dark font-17"
                            style={{ backgroundColor: "rgb(250, 169, 186)", textAlign: "center" }}
                        >
                            <span>0.00</span>
                        </th>
                    </tr>
                    <tr>
                        <th className="d-flex justify-content-center align-items-center">
                            The Draw: <b className="mx-2 text-primary">0</b>
                        </th>
                        <th
                            className="text-dark text-center font-17"
                            style={{ backgroundColor: "rgb(114, 187, 239)", textAlign: "center" }}
                        >
                            <span>0.00</span>
                        </th>
                        <th
                            className="text-dark font-17"
                            style={{ backgroundColor: "rgb(250, 169, 186)", textAlign: "center" }}
                        >
                            <span>0.00</span>
                        </th>
                    </tr> */}
                </tbody>
            </table>

        </div>
    )
}

export default NewBookMaker