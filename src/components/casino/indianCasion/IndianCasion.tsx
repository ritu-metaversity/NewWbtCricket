import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/system";
import CasinoModals from './Aura/CasinoModals';
import { Modal } from "@mui/material";
import axios from 'axios';


const IndianCasion = () => {
    const navigate = useNavigate();

    const handleChangeaa = () => {
        navigate("/casino")
    }



    const handleChangeSupNowa = () => {
        navigate("/SuperNowa_casion")
    }


    const token = localStorage.getItem("token");
    // const [gameQtech, setGameQTech] = useState<any>()
    const [gameAura, setGameAura] = useState<any>()
    const [gameSuperNova, setGameSuperNova] = useState<any>()
    useEffect(() => {

        axios.post(
            "https://api.247365.exchange/admin-new-apis/user/alloted-casino-list", {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response: any) => {
                //   setGameQTech(response?.data?.data.find((item: any) => item?.name === "QTech"))
                setGameAura(response?.data?.data.find((item: any) => item?.name === "Aura"))
                setGameSuperNova(response?.data?.data.find((item: any) => item?.name === "Super Nova"))
            })

    }, [])
    // let REACT_APP_API_URL = process.env.REACT_APP_API_URL;


    return (

        <div className="main_wrap_live-casion">
            {/* {gamesName.map((item: any) => ( */}
            {gameSuperNova?.active === true ?
                <div className="MainBtn_warp" style={{ border: "0.5px solid" }}
                    onClick={handleChangeSupNowa}
                >
                    <img
                        className="complany-logo-warp"
                        src="https://supernovagamesstudios.com/wp-content/uploads/2021/06/suxnova.png"
                        alt="" />
                    <span className="complany-name-wrap">Super nowa</span>
                </div>
                : ""}

            {gameAura?.active === true ?
                <div className="MainBtn_warp" style={{ border: "0.5px solid" }}
                    onClick={handleChangeaa}
                >
                    <img
                        className="complany-logo-warp"
                        src="https://auragaming.org/images/supercleanaura%20white.png?crc=7159781"
                        alt="" />
                    <span className="complany-name-wrap">Aura</span>
                </div> : ""}
            {/* ))
            } */}


            {/* qtech */}


            {/* <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="casino_modals_body" >
                    <CasinoModals type={"supernowa"} />
                    <div className="agree_btn">
                        <button onClick={handleAgree}>Ok I Agree</button>
                        <button onClick={handleNotAgree}>No, I Don't Agree</button>
                    </div>
                </Box>
            </Modal> */}
        </div>

    )
}

export default IndianCasion