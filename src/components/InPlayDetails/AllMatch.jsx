import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import { LoaderContext } from '../../App';
import { inPlayDetailServices } from '../../utils/api/inplayDetails/services';
import { sportServices } from '../../utils/api/sport/services';
import { userServices } from '../../utils/api/user/services';
import "./AllMatch.css"
import { getDeviceType } from './BetSlip';
// import "./Bet.css"
// import TvIconss from "./TvIcon.svg"
import UnSeletdBets from './UnSeletdBets';

// import UnSeletdBets from './UnSeletdBets'

const stylee = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(157,157,158)',
    // border: '2px solid #000',
    // boxShadow: 24,
    // pt: 2,
    px: 4,
    pb: 3,
};
const getValue = (num) => {
    if ((num / 1000000) >= 1) { return num / 1000000 + 'M'; }
    else if ((num / 1000) >= 1) { return num / 1000 + 'K'; }
    else { return num };
}
const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { console.log(htmlElRef.current, "huihuihui"); htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}
const useFocusForDesktop = () => {
    const htmlElRef = useRef(null)
    const setInputFocusForDesktop = () => { console.log(htmlElRef.current, "huihuihui"); htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setInputFocusForDesktop]
}
const AllMatch = ({ bet, setBet, buttonData, event, sportsId }) => {
    const [inputRef, setInputFocus] = useFocus()
    const [inputRefForDesktop, setInputFocusForDesktop] = useFocusForDesktop()
    const [betRecord, setBetRecord] = useState("");
    const [Show, setShow] = useState(false);
    const [errorShow, setErrorShow] = useState(true);
    const [betResultMessage, setBetResultMessage] = useState({});
    console.log(sportsId, "betRecordbetRecord")
    const [userIp, setUserIp] = useState("");
    const [timer, setTimer] = useState(0)
    const handleClose = () => {
        setShow(false)
    }
    console.log(buttonData, "uytfvbnmuh")

    // console.log(ShowTimer, "uytfvbnmuh")
    useEffect(() => {
        const timers = setTimeout(
            () => {
                setShow(false)
            }, 5000)
        return () => clearInterval(timers)
    }, [Show])

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const getIpy = async () => {
            const { response: ipRes } = await userServices.getIpfy();
            setUserIp(ipRes.ip);
        };
        getIpy();
    }, []);
    useEffect(() => {
        const timers = setTimeout(
            () => {
                if (timer > 0) {
                    setTimer(o => o - 1)
                } else {
                    setBet(null)
                }
            }, 1000)
        return () => clearInterval(timers)
    }, [timer])

    useEffect(() => {
        if (bet?.marketId) { setTimer(10) }

        return () => {

        }
    }, [bet?.marketId])
    console.log(bet, "betbetbetbet")
    const { setLoading, loading } = useContext(LoaderContext);
    async function clickHandler() {
        setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: true }));
        const { response, error } = await inPlayDetailServices.updateBetPlace({
            ...bet,
            placeTime: moment(bet?.placeTime).format("YYYY-MM-DD hh:mm:ss.SSS"),
            userIp,
            deviceInfo: {
                userAgent: window.navigator.userAgent,
                browser: "Chrome",
                device: "Macintosh",
                deviceType: getDeviceType(),
                os: "Windows",
                os_version: "windows-10",
                browser_version: "108.0.0.0",
                orientation: "landscape",
            },
        });
        if (response) {
            setBet(null);
            setTimer(0)
            setShow(true)
            // setBetResultMessage(response?.message, "true")
            setBetResultMessage({

                "message": response?.message,
                "data": true
            })
            // console.log(response?.message, "hellooo")
        } else if (error) {
            setShow(true)
            setBetResultMessage({

                "message": error?.message,
                "data": false
            })
        }
        setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: false }));
    }

    console.log(betResultMessage, "betResultMessage")

    useEffect(() => {
        const getList = async () => {
            const { response } = await inPlayDetailServices.betListByMatchId(
                event
            );
            if (response?.data) {

                setBetRecord(response.data);
            }
        };
        setTimeout(() => { getList() }, 5000)
    }, [event, betRecord]);

    const [allGame, setAllGames] = useState({})

    useEffect(() => {

        const getList = async () => {
            // setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
            const { response } = await sportServices.activeEventFromSport(sportsId);
            if (response?.data) {
                console.log(response, "dasdsdasd")
                console.log(response, "dasdfdfd")
                setAllGames(response);
                //   setCount(response.data.totalRecord);
            }
            // setLoading && setLoading((prev) => ({ ...prev, getListdata: false }));
        };
        getList();
        // const response = sportServices.activeEventFromSport(sportsId);

        //     .then((response) => {

        // });
        // if (response?.data?.length > 0) {
        // setActiveEventList(response.data);
        // setShow(false);
        // }
        // } else {
        // setActiveEventList([]);
        // setShow(true);
        // }
    }, [sportsId])


    const [completedMatches, setCompletedMatches] = useState({})

    useEffect(() => {
        const getList = async () => {
            // setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
            const { response } = await inPlayDetailServices.betListHistory(
                { "sportId": sportsId, "fromDate": "2023-06-07", "toDate": "2023-06-21", "index": 0, "noOfRecords": 100, "isdeleted": false }
            );
            if (response?.data) {
                setCompletedMatches(response.data?.dataList?.filter(item => item.matchId === event))
                // setCompletedMatches(response.data?.dataList)
            }
        };
        getList();
    }, [sportsId])
    console.log(bet, "dushyant")
    useEffect(() => { console.log("huihiu"); if (bet?.placeTime) { setInputFocus() } }, [bet?.placeTime])
    useEffect(() => { console.log("huihiu"); if (bet?.placeTime) { setInputFocusForDesktop() } }, [bet?.placeTime])
    // const sportsId = searchParams.get("Sports-id");
    return (
        <div>
            <div>
                <div className="numeric-keypad-main-div-session row">
                    <table className="num-pad Input-close-table">
                        <div className='mobileView'>

                            <tbody>
                                <tr style={{ padding: "5px 0px" }}>
                                    <td
                                        width="10%"
                                        style={{ fontSize: 14, padding: 5, border: "none" }}
                                    >
                                        Amount
                                    </td>
                                    <td width="60%" style={{ border: "none" }}>
                                        <input
                                            list="stacklist"
                                            type="number"
                                            id="stakeInput"
                                            // autoFocus={!!betRecord}
                                            ref={inputRef}
                                            className="quantity-session"
                                            // disabled=""
                                            value={bet?.stake || ""}
                                            onChange={(e) => {
                                                setBet((o) =>
                                                    o ? { ...o, stake: Number(e.target.value) } : null
                                                )
                                            }
                                            }
                                            style={{ width: 150, fontSize: 14, padding: 5, height: 25 }}
                                        />
                                        <datalist id="stacklist">
                                            {buttonData && Object.values(buttonData)?.map(item => <option value={item} />)}
                                        </datalist>
                                    </td>
                                    <td
                                        width="10%"
                                        className="cls-td text-white"
                                        style={{
                                            border: "none",
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            textAlign: "center"
                                        }}
                                    >
                                        <span style={{ padding: "0px 7px", background: "rgb(0, 0, 0)" }}>
                                            {timer}
                                        </span>
                                    </td>
                                    <td
                                        width="20%"
                                        className="numpad-done-button cls-td"
                                        style={{ border: "none" }}
                                    >
                                        <span style={{ padding: "2px 7px" }}>
                                            <button
                                                onClick={clickHandler}
                                                type="button"
                                                // disabled=""
                                                className="btn btn-secondary disabled"
                                                style={{
                                                    border: "none",
                                                    background:
                                                        "linear-gradient(-180deg, rgb(10, 146, 165) 0%, rgb(8, 121, 137) 82%)",
                                                    fontSize: 13,
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                DONE{" "}
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </div>
                    </table>
                </div>
                <div />

                <div className='desktopView'>

                    <div>
                        <div className="row" style={{ fontSize: 18 }}>
                            <div className="col-md-3">
                                <div style={{ textAlign: "left" }}>
                                    <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                                        &nbsp;{bet?.marketName}:&nbsp;{bet?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-3" >
                                <div>

                                    <b>RATE&nbsp;:&nbsp;</b> {bet?.odds === undefined ? "0(NO)" : bet?.isBack === true ? (<>{bet?.odds}({bet?.marketnameid})</>) : (<>{bet?.odds}({bet?.marketnameid})</>)}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <form className="form-inline">
                                    <div className="mb-2 mr-sm-2 mb-sm-0 form-group">
                                        <label className="mr-sm-2">AMOUNT</label>
                                        <input
                                            id="stakeInput"
                                            placeholder="stake"
                                            type="text"
                                            className="form-control"
                                            defaultValue={0}
                                            style={{ fontSize: 18 }}
                                            value={bet?.stake || 0}
                                            ref={inputRefForDesktop}
                                            onChange={(e) => {
                                                setBet((o) =>
                                                    o ? { ...o, stake: Number(e.target.value) } : null
                                                )
                                            }}
                                        />
                                    </div>
                                    <button type="button" className="btn bet_btn btn btn-secondary"
                                        onClick={clickHandler}
                                        disabled={loading.ClickButtonValue}
                                    >
                                        Done
                                    </button>
                                </form>
                                <div className="place-amount load-button-new-className enter-default-value place-bet-buttons-div">
                                    <table className="bet-value-buttons-table ">
                                        <tbody className="stackButton">

                                            <tr className="wrapper">
                                                {buttonData && Object.values(buttonData)?.map(item =>
                                                    <td className="box">
                                                        {console.log(item, "hyghvlj")}
                                                        <button className="default-value-btn"
                                                            onClick={() =>
                                                                setBet((o) =>
                                                                    o ? { ...o, stake: item } : null
                                                                )
                                                            }> {getValue(item)}</button>
                                                    </td>
                                                )}



                                            </tr>
                                            <tr className='clear-time'>
                                                <td className="box">
                                                    <button className="default-value-btn bet-value-clear-button"
                                                        disabled={loading.ClickButtonValue}
                                                        onClick={() => { setBet(null); setTimer(0) }}>
                                                        Clear
                                                    </button>
                                                </td>
                                                <td className="box">
                                                    <button className="default-value-btn bet-value-clear-button">
                                                        {timer}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <UnSeletdBets betRecord={betRecord} completedMatches={completedMatches} />


                {allGame?.data && Object.values(allGame?.data).map((item) => {
                    if (item.matchId !== event) {

                        return (
                            <div>
                                <a href={`/in-play-details/?event-id=${item.matchId}&Sports-id=${searchParams.get("Sports-id")}`}>
                                    <div
                                        className="row"
                                        style={{
                                            color: "1px solid #575a61",
                                            marginBottom: 10,
                                            borderTop: "1px solid #575a61"
                                        }}
                                    >
                                        <div
                                            className="col-12 col-sm-12 col-md-12 col-lg-12"
                                            style={{ textAlign: "left" }}
                                        >
                                            <div className="moreMatch" style={{ color: "rgb(39, 137, 206)", fontWeight: "700" }}>
                                                {item?.matchName}{" "}
                                            </div>
                                            <span
                                                style={{ color: "rgb(119, 119, 119)", fontWeight: 900, fontSize: 10 }}
                                            >
                                                {item?.openDate}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    }

                })
                }



                <Modal
                    open={Show}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box className="bet-box">

                        <div className="Bet-succ">

                            <h2 id="parent-modal-title" style={{ color: betResultMessage?.data === false ? "red" : "white" }}>{betResultMessage?.message}</h2>
                            <button className="Bet-SuccBtn" onClick={handleClose}>OK</button>

                        </div>
                    </Box>
                </Modal>

            </div>

        </div >
    )
}

export default AllMatch