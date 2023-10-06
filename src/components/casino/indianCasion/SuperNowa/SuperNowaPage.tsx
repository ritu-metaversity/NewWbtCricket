import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import "./SuperNowaPage.css"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { userServices } from '../../../../utils/api/user/services'
import axios from 'axios'

const SuperNowaPage = () => {
  const { state } = useLocation()
  const token = localStorage.getItem("token");
  console.log(state, "statestatestatestate");
  let REACT_APP_API_URL_NEW_ANKIT_SUPERNOWA = process.env.REACT_APP_API_URL_NEW_ANKIT_SUPERNOWA;

  const navigate = useNavigate();
  const handleBackToVCasion = () => {
    navigate("/SuperNowa_casion")
  }
  const [walletBalance, setWalletbalance] = useState();
  const [casionUrl, setCasionUrl] = useState();
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


  useEffect(() => {
    const TokenId = localStorage.getItem("token");

    let dtatata = {
      "game": {
        "gameCode": state?.code,
        "providerCode": state?.providerCode,
      },
      "timestamp": new Date().getTime(),
      user: {
        currency: "INR",
        backUrl: `${window.location.protocol}//${window.location.hostname}/Slot-Game-list`,
      }
    }
    axios
      .post(
        `${REACT_APP_API_URL_NEW_ANKIT_SUPERNOWA}/api/supernowa/authentication`, dtatata,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TokenId}`,
          },
        }
      )
      .then((response) => {
        if (response) {
          setCasionUrl(response?.data?.data?.launchURL)
          console.log(response?.data?.data?.launchURL, "sdfsdfsdfsdfsdfsdfsd")
        } else {
        }
      })
  }, [])


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
        src={casionUrl}
        width="100%"
        style={{ height: "calc(100vh - 29px)" }}
        title="mobile"
        allowFullScreen={true}
      ></iframe>
    </div>
  )
}

export default SuperNowaPage