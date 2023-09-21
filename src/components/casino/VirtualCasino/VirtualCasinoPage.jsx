import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import "./Virtualcasino.css"
import { IoMdArrowRoundBack } from 'react-icons/io'

const VirtualCasinoPage = () => {
    const { state } = useLocation()
    const TokenId = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleBackToVCasion = () => {
        navigate("/virtual-casino")
    }
    console.log(state, "dsfdfdsf");
    return (
        <div className='main_div_for_back_and_game'>
            <div className='main_back'>

                <button className='bacnk-btn-v-ca' onClick={handleBackToVCasion}>

                    <IoMdArrowRoundBack color="white" className="back_icon" />
                    <span>
                        Back
                    </span>
                </button>
            </div>

            <iframe
                src={`${state?.desktopIframe}?id=${TokenId}`}
                // height="82vh"
                // className="mobile_if"
                width="100%"
                style={{ minHeight: "100vh" }}
                title="mobile"
                className="for_Desktop"
                allowFullScreen={true}
            ></iframe>
            <iframe
                src={`${state?.mobIframe}?id=${TokenId}`}
                // height="82vh"
                // className="mobile_if"
                width="100%"
                style={{ minHeight: "100vh" }}
                title="mobile"
                className="For_mobile"
                allowFullScreen={true}

            ></iframe>
        </div>
    )
}

export default VirtualCasinoPage