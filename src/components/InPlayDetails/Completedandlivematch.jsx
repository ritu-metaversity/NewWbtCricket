import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { inPlayDetailServices } from '../../utils/api/inplayDetails/services';
import { sportServices } from '../../utils/api/sport/services';
import UnSeletdBets from './UnSeletdBets';

const Completedandlivematch = ({ event, sportsId }) => {

    const [betRecord, setBetRecord] = useState("");
    const [allGame, setAllGames] = useState({})
    const [searchParams] = useSearchParams();
    const [completedMatches, setCompletedMatches] = useState({})
    const [completedDetallll, setCompletedDetalll] = useState({})
    const date = new Date();
    const futureDate = date.getDate() - 60;
    date.setDate(futureDate);
    const defaultValue = moment().subtract(7, "days").format("YYYY-MM-DD");
    const currentValue = moment().format("YYYY-MM-DD");

    const eventId = searchParams.get("event-id");
    console.log(eventId, "iuytfvbhjuytfvb")
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

    return (
        <>
            <UnSeletdBets betRecord={betRecord} completedMatches={completedMatches} completedDetallll={completedDetallll} />
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
        </>
    )
}

export default Completedandlivematch