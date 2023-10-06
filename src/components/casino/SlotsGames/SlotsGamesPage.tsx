
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { isMobile, isBrowser } from "react-device-detect";
import "./SlotGamePage.css"
import { userServices } from '../../../utils/api/user/services';
const SlotsGamesPage = () => {
  const { state } = useLocation()
  const TokenId = localStorage.getItem("token");
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;
  const [gameLobbyUrl, setGameLobbyUrl] = useState("")
  const [walletBalance, setWalletbalance] = useState();
  const [walletLibality, setWalletlibality] = useState();
  console.log(state, "sfskjsd");

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
    navigate("/Slot-Game-list")
  }
  console.log(state, "sdfsdfnksjfnksdj");

  // `${REACT_APP_API_URL}/api/qtech/gamelobby`,

  useEffect(() => {
    const TokenGame = localStorage.getItem("GameToken");

    let data = {
      playerId: "121212",
      currency: "INR",
      country: "IN",
      gender: "M",
      gameName: state,
      birthDate: "1986-01-01",
      lang: "en_IN",
      mode: "real",
      device: window.innerWidth > 1024 ? "desktop" : "mobile",
      returnUrl: `${window.location.protocol}//${window.location.hostname}/Slot-Game-list`,
      token: TokenGame,
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

    // }

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
        width="100%"
        style={{ height: "calc(100vh - 29px)" }}
        title="mobile"
        allowFullScreen={true}

      ></iframe>
    </div>
  )
}

export default SlotsGamesPage