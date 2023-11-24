import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/system";
import CasinoModals from './Aura/CasinoModals';
import { Modal } from "@mui/material";


const IndianCasion = () => {
    const navigate = useNavigate();

    let gamesName = [
        {
            name: "Super nowa",
            url: "https://supernovagamesstudios.com/wp-content/uploads/2021/06/suxnova.png",
            filterType: "SP-NOWA"
        },
        // {
        //     name: "Aura",
        //     url: "https://auragaming.org/images/supercleanaura%20white.png?crc=7159781",
        //     filterType: "AURA"
        // },
    ]

    const handleChangeaa = (val: any) => {
        console.log(val, "adcnlkscaksdn");
        if (val?.filterType === "SP-NOWA") {
            navigate("/SuperNowa_casion")
        } else {
            navigate("/casino")

        }


    }

    // qtech

    const [confirmPopup, setConfirmPopup] = useState(false)

    const handleChangeQtech = (val: any) => {
        setConfirmPopup(true)
    }
    const handleClose = () => setConfirmPopup(false);

    const handleAgree = () => {
        let data = {
            name: "Q Tech",
            logo: "https://11bet24.com/static/media/qtechlogo.97b6c0859adf911c43bb.png",
            gameCode: "Qtech",
            filterType: "SPB",
            BackUrl: "/india_casion",
        }
        navigate("/live-casino-game", { state: data })

        setConfirmPopup(false)
    }
    const handleNotAgree = () => {
        setConfirmPopup(false)
    }
    return (

        <div className="main_wrap_live-casion">
            {gamesName.map((item: any) => (

                <div className="MainBtn_warp" style={{ border: "0.5px solid" }}
                    onClick={() => handleChangeaa(item)}
                >
                    <img
                        className="complany-logo-warp"
                        src={item?.url}
                        alt="" />
                    <span className="complany-name-wrap">{item?.name}</span>
                </div>
            ))
            }


            {/* qtech */}


            <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="casino_modals_body" >
                    <CasinoModals type={"supernowa"} />
                    <div className="agree_btn">
                        <button onClick={handleAgree}>Ok I Agree</button>
                        <button onClick={handleNotAgree}>No, I Don't Agree</button>
                    </div>
                </Box>
            </Modal>
        </div>

    )
}

export default IndianCasion