import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { inPlayDetailServices } from '../../utils/api/inplayDetails/services';
import "./UnSeletdBets.css"
import { useSearchParams } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
const UnSeletdBets = ({ betRecord, sportsId }) => {
    const [searchParams] = useSearchParams();
    const [completedMatches, setCompletedMatches] = useState({})
    const [completedDetallll, setCompletedDetalll] = useState({})
    const eventId = searchParams.get("event-id");
    console.log(completedDetallll[0]?.netpnl, "completedMatches")

    useEffect(() => {
        const getList = async () => {
            // setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
            const { response } = await inPlayDetailServices.CompletedBetsonBetpage(
                { "matchId": eventId }
            );
            if (response?.data) {
                setCompletedMatches(response.data?.data)
                setCompletedDetalll(response.data?.totalplusminus)
            }
        };
        getList();
    }, [sportsId])
    console.log(sportsId, eventId, ":sportsId");
    const handleRefresh = () => {
        const getList = async () => {
            // setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
            const { response } = await inPlayDetailServices.CompletedBetsonBetpage(
                { "matchId": eventId }
            );
            if (response?.data) {
                console.log(response?.data, "response?.data");
                setCompletedMatches(response.data?.data)
                setCompletedDetalll(response.data?.totalplusminus)
            }
        };
        getList();

    }
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

    return (<>
        <div>
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
                                            PRICE
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
                                                        <td
                                                            data-modal="modal-1"
                                                            className="bet-place-tbl-td md-trigger runs-2-value-box-color"
                                                        >
                                                            {item?.priveValue}{" "}
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



        <div className="row">
            <div
                className="bet-place-tbl-th"
                style={{ background: "rgb(42, 54, 59)", width: "100%" }}
            >
                <div className='main_div_completebet'>
                    <span>COMPLETED BETS</span>
                    <button className='main_div_completebet_Refesh' onClick={handleRefresh}> <CachedIcon style={{ fontSize: "17px" }} />Refesh</button>
                </div>
            </div>
            <table
                // className="table table-responsive table-bordered table_COMPLETED"
                style={{ width: "100%" }}
            >
                <thead>
                    <tr>
                        <th className="bet-place-tbl-th" style={{ width: "22.5%", border: "1.3px solid" }}>RUNNER</th>
                        <th className="bet-place-tbl-th" style={{ width: "22.5%", border: "1.3px solid" }}>RESULT</th>
                        <th className="bet-place-tbl-th" style={{ width: "22.5%", border: "1.3px solid" }}>AMOUNT</th>
                        <th className="bet-place-tbl-th" style={{ width: "22.5%", border: "1.3px solid" }}>P&amp;L</th>
                    </tr>
                </thead>
                <tbody>
                    {completedMatches?.length > 0 ?
                        <>
                            {completedMatches.map((item) => {
                                return (
                                    <>

                                        <tr style={{ width: "100%" }}>
                                            <td className="bet-place-tbl-td" style={{ width: "22.5%", border: "1.3px solid" }}>
                                                {item?.runner
                                                }
                                            </td>
                                            <td className="bet-place-tbl-td" style={{ width: "22.5%", border: "1.3px solid" }}>
                                                {item?.result}
                                            </td>
                                            <td className="bet-place-tbl-td" style={{ width: "22.5%", border: "1.3px solid" }}>
                                                {item?.amount}
                                            </td>

                                            <td className="bet-place-tbl-td"
                                                style={{ color: item?.pnl > 0 ? "green" : "red", width: "22.5%", border: "1.3px solid black" }}
                                            >
                                                {item?.pnl}
                                            </td>

                                        </tr>

                                    </>
                                )
                            }
                            )}
                            < tr colSpan={4}>
                                <td colSpan={3} className="bet-place-tbl-td" style={{ border: "1.3px solid black" }}>
                                    Total Plus Minus
                                </td>
                                <td colSpan={1} className="bet-place-tbl-td"
                                    style={{ color: completedDetallll[0]?.netpnl > 0 ? "green" : "red", border: "1.3px solid black" }}
                                >
                                    {completedDetallll[0]?.netpnl}
                                </td>

                            </tr>
                        </>
                        :

                        <tr style={{ width: "100%", fontWeight: 650 }}><td class="bet-place-tbl-td" colspan="8">No Bets Available</td></tr>
                    }

                </tbody>
            </table>
        </div>


    </>

    )
}

export default UnSeletdBets