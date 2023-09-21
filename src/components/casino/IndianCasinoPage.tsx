import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import "./IndianCasinoPage.css"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { userServices } from '../../utils/api/user/services'

const IndianCasinoPage = () => {
    const { state } = useLocation()
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const handleBackToVCasion = () => {
        navigate("/casino")
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
    console.log(state, "dasdasdasdasdasd");
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
                src={`https://d.fawk.app/#/splash-screen/${token}/9482/?opentable=${state}`}
                // height="82vh"
                // className="mobile_if"
                width="100%"
                style={{ minHeight: "100vh" }}
                title="mobile"
                className="for_Desktop"
                allowFullScreen={true}
            ></iframe>
            <iframe
                src={`https://m.fawk.app/#/splash-screen/${token}/9482/?opentable=${state}`}
                // height="82vh"
                // className="mobile_if"
                width="100%"
                style={{ minHeight: "90vh" }}
                title="mobile"
                className="For_mobile"
                allowFullScreen={true}

            ></iframe>
        </div>
    )
}

export default IndianCasinoPage