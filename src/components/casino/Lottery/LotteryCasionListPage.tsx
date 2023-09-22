import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import "./LotteryCasionListPage.css"

const LotteryCasionListPage = () => {
    const { state } = useLocation()
    const TokenId = localStorage.getItem("token");
    console.log(state?.filterType, "statestatestatestate");
    let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;
    const [gameFilter, setGameFilter] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
        const TokenGame = localStorage.getItem("GameToken");

        if (
            TokenId
        ) {
            let data = {
                token: TokenGame, provider: state?.filterType, gameCategory: "LOTTERY"

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
        } else {

        }
    }, [])

    const handleChangeaa = (val: any) => {
        console.log(val, "dafusiyhbdchuwdb");
        navigate("/Lottery-Game", { state: val, })
    }
    console.log(gameFilter, "statestatestatestate");

    // Object.keys(betRecord).map((key) => (
    return (
        <div className="main_wrap_game_logog_lottery">


            {gameFilter.map((key: any) => (



                <img
                    onClick={() => handleChangeaa(key?.id)}

                    className="game_logog_lottery"
                    src={key?.images[1]?.url}
                    alt="" />



            ))
            }
        </div>
    )
}

export default LotteryCasionListPage