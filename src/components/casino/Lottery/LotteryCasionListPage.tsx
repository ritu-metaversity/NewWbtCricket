import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"


const LotteryCasionListPage = () => {
    const { state } = useLocation()
    const TokenId = localStorage.getItem("token");
    console.log(state, "statestatestatestate");
    let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;
    const [gameFilter, setGameFilter] = useState([])

    useEffect(() => {
        let data = {
            "token": "26b735ae-d59e-3350-8a88-dee00feb9166", "provider": "", "gameCategory": "LOTTERY"
        }
        if (
            TokenId
        ) {
            axios
                .post(
                    `${REACT_APP_API_URL_PLAY_INDIA}/api/qtech/authentication`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${TokenId}`,
                        },
                    }
                )
                .then((response) => {
                    if (response) {
                        let data = {
                            token: response?.data?.data?.access_token, provider: "", gameCategory: "LOTTERY"

                        }
                        axios.post(
                            `${REACT_APP_API_URL_PLAY_INDIA}/api/qtech/gamelist`, data,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${TokenId}`,
                                },
                            }
                        )
                            .then((response) => {
                                setGameFilter(response?.data?.data?.items)
                                // console.log(response?.data?.data?.items, "statestatestatestate");

                            })
                    }
                })

        } else {

        }
    }, [])
    console.log(gameFilter, "statestatestatestate");

    // Object.keys(betRecord).map((key) => (
    return (
        <div className="main_wrap_live-casion">
            {Object.keys(gameFilter).map((key: any) => (
                <>

                    {
                        Object.keys(gameFilter[key]).map(
                            (item: any) => (
                                <div className="MainBtn_warp" style={{ border: "0.5px solid" }}>
                                    <img
                                        className="complany-logo-warp"
                                        // src={item?.images[1] && item?.images[1]?.url}
                                        alt="" />

                                    <span className="complany-name-wrap">

                                        <>
                                            {console.log(item, "dsfsdfsd")}
                                        </>
                                    </span>
                                </div>
                            ))
                    }
                </>

            ))
            }
        </div>
    )
}

export default LotteryCasionListPage