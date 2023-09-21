
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { isMobile, isBrowser } from "react-device-detect";
import "./LiveCasionGamePage.css"
import { userServices } from '../../../utils/api/user/services';
const LiveCasionGamePage = () => {
  const { state } = useLocation()
  const TokenId = localStorage.getItem("token");
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;
  const [gameLobbyUrl, setGameLobbyUrl] = useState("")
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


  const navigate = useNavigate();
  const handleBackToVCasion = () => {
    navigate("/live-casino")
  }
  console.log(state?.item?.gameCode, "sdfsdfnksjfnksdj");

  // `${REACT_APP_API_URL}/api/qtech/gamelobby`,

  useEffect(() => {
    if (state?.item?.gameCode === "Qtech") {

      let data = {
        playerId: "121212",
        currency: "INR",
        country: "IN",
        gender: "M",
        birthDate: "1986-01-01",
        lang: "en_IN",
        mode: "real",
        device: `${(isMobile && "mobile") || (isBrowser && "desktop")}`,
        returnUrl: `${window.location.protocol}//${window.location.hostname}/Live-casino`,
        token: state?.item2,
        walletSessionId: TokenId
      }
      // https://api.playindia.app/api/qtech/gamelink
      axios

        .post(
          `${REACT_APP_API_URL_PLAY_INDIA}/api/qtech/gamelobby`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TokenId}`,
            },
          }
        )
        .then((response) => {
          if (response) {
            console.log(response?.data?.data?.url, "sdfsdfsdfsdfsdfsdfsd")
            setGameLobbyUrl(response?.data?.data?.url)
          } else {

          }
        })



    } else {


      let data = {
        playerId: "121212",
        currency: "INR",
        country: "IN",
        gender: "M",
        gameName: state?.item?.gameCode,
        birthDate: "1986-01-01",
        lang: "en_IN",
        mode: "real",
        device: `${(isMobile && "mobile") || (isBrowser && "desktop")}`,
        returnUrl: `${window.location.protocol}//${window.location.hostname}/Live-casino`,
        token: state?.item2,
        walletSessionId: TokenId
      }
      // https://api.playindia.app/api/qtech/gamelink
      axios

        .post(
          `${REACT_APP_API_URL_PLAY_INDIA}/api/qtech/gamelink`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TokenId}`,
            },
          }
        )
        .then((response) => {
          if (response) {
            console.log(response?.data?.data?.url, "sdfsdfsdfsdfsdfsdfsd")
            setGameLobbyUrl(response?.data?.data?.url)
          } else {

          }
        })

    }

  }, [])




  const getCasinoList = async () => {
    let data: any = { "gameType": "virtual" }
    // const token = localStorage.getItem("token");


  };
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
        src={gameLobbyUrl}
        // height="82vh"
        // className="mobile_if"
        width="100%"
        style={{ minHeight: "100vh" }}
        title="mobile"
        className="for_Desktop"
        allowFullScreen={true}
      ></iframe>
      <iframe
        src={gameLobbyUrl}
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

export default LiveCasionGamePage