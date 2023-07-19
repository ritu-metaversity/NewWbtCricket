import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { inPlayDetailServices } from '../../utils/api/inplayDetails/services';
import "./UnSeletdBets.css"

const UnSeletdBets = ({ betRecord, completedMatches }) => {
    console.log(completedMatches, "completedMatches")

    // useEffect(() => {
    //     const getList = async () => {
    //         const { response } = await inPlayDetailServices.betListHistory();
    //         if (response?.data) {
    //             console.log(response, "fdsfdsfsdfsfsd")
    //         }
    //     };
    //     getList();
    // }, []);

    // useEffect(() => {
    //     axios
    //         .post("http://api.247365.exchange/admin-new-apis/enduser/bet-list-history", {})
    //         .then((res) => {
    //             console.log(res, "dfsdfkjhsdkfjhksd")
    //         });
    // }, []);
    // const [completedMatches, setCompletedMatches] = useState({})

    // useEffect(() => {
    //     const getList = async () => {
    //         // setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
    //         const { response } = await inPlayDetailServices.betListHistory(
    //             { "sportId": sportsId, "fromDate": "2023-06-07", "toDate": "2023-06-21", "index": 0, "noOfRecords": 100, "isdeleted": false }
    //         );
    //         if (response?.data) {
    //             setCompletedMatches(response.data?.dataList?.filter(item => item.matchId == event))
    //             // console.log(response.data?.dataList?.filter(item => item.matchId == event), "dasdfdasdfsdsdasd")
    //         }
    //     };
    //     getList();
    // }, [sportsId])
    console.log(betRecord, "betRecord")

    return (<>        <div>
        <div className="row">
            {Object.keys(betRecord).map(
                (key) => (
                    <>
                        <table className="table-bordered" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th
                                        colSpan={5}
                                        className="bet-place-tbl-th market-name-row-color"
                                        style={{ background: "rgb(42, 54, 59)" }}
                                    >
                                        {key}
                                    </th>
                                </tr>
                                <tr>
                                    <th className="bet-place-tbl-th mob-col-width-ch run-pos-rate-amt-run-mod-color sess_row_head1">
                                        SESSION
                                    </th>

                                    {key.includes("Fancy") && <th className="bet-place-tbl-th run-pos-rate-amt-run-mod-color">
                                        RUN
                                    </th>}
                                    <th className="bet-place-tbl-th run-pos-rate-amt-run-mod-color">
                                        RATE
                                    </th>
                                    <th className="bet-place-tbl-th run-pos-rate-amt-run-mod-color">
                                        AMOUNT
                                    </th>
                                    <th className="bet-place-tbl-th run-pos-rate-amt-run-mod-color">
                                        MODE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {betRecord &&
                                    betRecord[key].map(
                                        (item, index) => (
                                            <>
                                                <tr>
                                                    <td
                                                        className="bet-place-tbl-td mob-col-width-ch runs-2-value-box-color"
                                                        style={{ textAlign: "left" }}
                                                    >
                                                        {console.log(item, "jhgbvh")}
                                                        {item?.nation}
                                                    </td>
                                                    <td
                                                        data-modal="modal-1"
                                                        className="bet-place-tbl-td md-trigger runs-2-value-box-color"
                                                    >
                                                        {item?.rate}{" "}
                                                    </td>
                                                    {key.includes("Fancy") && <td
                                                        data-modal="modal-1"
                                                        className="bet-place-tbl-td md-trigger runs-2-value-box-color"
                                                    >
                                                        {item?.priveValue}
                                                    </td>}


                                                    <td className="bet-place-tbl-td runs-2-value-box-color">{item?.amount}</td>
                                                    <td className="bet-place-tbl-td runs-2-value-box-color">{item?.back === true ? "YES" : "NO"}</td>
                                                </tr>
                                            </>
                                        )
                                    )}

                            </tbody>
                        </table>
                    </>
                )
            )}
        </div>
    </div>

        <div><div className="row" style={{ justifyContent: "center" }}>
            <div className="container" style={{ fontSize: 14 }}>
                <div className="row">
                    <div
                        className="bet-place-tbl-th"
                        style={{ background: "rgb(42, 54, 59)", width: "100%" }}
                    >
                        COMPLETED FANCY BETS
                    </div>
                    <table
                        className="table table-responsive table-bordered"
                        style={{ width: "100%", display: "inline-table" }}
                    >
                        <thead>
                            <tr>
                                <th className="bet-place-tbl-th">RUNNER</th>
                                <th className="bet-place-tbl-th">DATE</th>
                                <th className="bet-place-tbl-th">RUN</th>
                                <th className="bet-place-tbl-th">RATE</th>
                                <th className="bet-place-tbl-th">RESULT</th>
                                <th className="bet-place-tbl-th">AMOUNT</th>
                                <th className="bet-place-tbl-th">MODE</th>
                                <th className="bet-place-tbl-th">P&amp;L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedMatches?.length > 0 ?
                                Object.values(completedMatches).map((item) => {
                                    return (

                                        <tr style={{ width: "100%" }}>
                                            <td className="bet-place-tbl-td">
                                                1
                                            </td>
                                            <td className="bet-place-tbl-td">
                                                {item?.time}
                                                {console.log(item, "dkiuygvbnk")}
                                            </td>
                                            <td className="bet-place-tbl-td">
                                                1
                                            </td>
                                            <td className="bet-place-tbl-td">
                                                {item?.rate}
                                            </td>
                                            <td className="bet-place-tbl-td">
                                                1
                                            </td>
                                            <td className="bet-place-tbl-td">
                                                {item?.price}
                                            </td>
                                            <td className="bet-place-tbl-td">
                                                1
                                            </td>
                                            <td className="bet-place-tbl-td" style={{ color: item?.pnl > 0 ? "green" : "red" }}>
                                                {item?.pnl}
                                            </td>

                                        </tr>

                                    )
                                }
                                )
                                :

                                <tr style={{ width: "100%", fontWeight: 650 }}><td class="bet-place-tbl-td" colspan="8">No Bets Available</td></tr>
                            }







                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </>

    )
}

export default UnSeletdBets