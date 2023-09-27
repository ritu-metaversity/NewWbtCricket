import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import "./Virtualcasino.css"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { userServices } from '../../../utils/api/user/services'

const VirtualCasinoPage = () => {
    const { state } = useLocation()
    const TokenId = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleBackToVCasion = () => {
        navigate("/virtual-casino")
    }
    const [walletBalance, setWalletbalance] = useState();
    const [walletLibality, setWalletlibality] = useState();

    useEffect(() => {
        const getWallet = async () => {
            const { response } = await userServices.wallet();
            if (response?.data) {

                setWalletbalance(response.data?.balance);
                setWalletlibality(response.data?.libality);
            }
        };
        localStorage.getItem("passwordType") === "new" && getWallet();
        const timer = setInterval(() => localStorage.getItem("passwordType") === "new" && getWallet(), 5000);

        return () => clearInterval(timer);
    }, []);
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
                <span>Chips: {Number(walletBalance).toFixed(2)}</span>
                <span>Expo : <span style={{ color: "red" }}>{Number(walletLibality).toFixed(2)}</span></span>
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