import { Box } from "@mui/system";
import { Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LiveCasionList.css"
import cassionimg from "../casino.png"
import { useEffect, useState } from "react";
import axios from "axios";
import Qtech from "./qtechlogo.png"
import snackBarUtil from "../../Layout/snackBarUtil";
import CasinoModals from "../indianCasion/Aura/CasinoModals";
// import { styled, Tab, Tabs, tabClasses, Typography, } from "@mui/material";

export const casinoProviderList = [
  {
    name: "EVOLUTION",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/5.png",
    gameCode: "EVO-dhp",
    filterType: "EVO",
  },
  {
    name: "VIVO GAMING",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/21.png",
    gameCode: "VGL-europeanroulette",
    filterType: "VGL",
  },
  {
    name: "EZUGI",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/1.png",
    gameCode: "EZU-32cards",
    filterType: "EZU",
  },
  // {
  //   name: "BGAMING",
  //   logo: "https://global-uploads.webflow.com/63b2c230b49fa188ad86ffec/63f4c9689497e0d7c32f4a31_BGaming_logo.svg",
  //   gameCode: "Qtech",
  //   filterType: "BGM",
  // },
  {
    name: "SKY WIND",
    logo: "https://skywindgroup.com/assets/site/images/skywind_white.svg",
    gameCode: "SWL-atomroulette",

    filterType: "SWL",
  },
  {
    name: "SA GAMING",
    logo: "https://www.sagaming.com/img/logo.png",
    gameCode: "SAG-lobby",
    filterType: "SAG",
  },
  {
    name: "PRAGMATIC PLAY",
    logo: "https://www.pragmaticplay.com/wp-content/themes/gp-theme-basic/libs/dist/images/PP-white-logo.svg",
    gameCode: "PPL-livecasinolobby",
    filterType: "PPL",
  },
  {
    name: "BETTER LIVE",
    logo: "https://live.beter.co/wp-content/themes/artit/assets/images/logo.svg",
    gameCode: "BTL-lobby",
    filterType: "BTL",
  },
  {
    name: "BET GAMES",
    logo: "https://www.betgames.tv/api/uploads/BG_Logo_White_Horizontal_Lock_Up_dcca475d41.png",
    gameCode: "BTV-lobby",
    filterType: "BTV",
  },
  // {
  //   name: " EBET",
  //   logo: "https://ebet.gg/wp-content/uploads/2022/05/EBET-logo.png",
  //   gameCode: "EBT-sicbo",
  //   filterType: "EBT",
  // },
  {
    name: "AVIATOR",
    logo: "https://sitethemedata.com/casino_icons/fantasy/aviator.png",
    gameCode: "SPB-aviator",
    filterType: "SPB",
  },
  {
    name: "Q Tech",
    logo: Qtech,
    gameCode: "Qtech",
    filterType: "SPB",
  }
];

// export const Aviatordata = [
//   ,]

const LiveCasionList = () => {
  const navigate = useNavigate();
  // const TokenId = localStorage.getItem("token");
  const TokenGame = localStorage.getItem("GameToken");
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;

  // const [newToken, setNewToken] = useState("")
  const [confirmPopup, setConfirmPopup] = useState(false)
  const [casionId, setCasionId] = useState("")

  const handleNotAgree = () => {
    setConfirmPopup(false)
  }
  const handleClose = () => setConfirmPopup(false);

  const handleAgree = () => {
    // nav("/SuperNowa-Game-page", { state: casionId })
    navigate("/live-casino-game", { state: casionId })

    setConfirmPopup(false)
  }
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleChangeaa = (val: any) => {

    const token = localStorage.getItem("token");
    axios.post(
      `${REACT_APP_API_URL}/api/getOneUserBetResult`, {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },

      }
    ).then((res) => {
      // setCasionValue(res?.data?.data[type?.type])
      if (res?.data?.data?.qtech === 1) {

        navigate("/live-casino-game", { state: val })
        // navigate("/Lottery-Game", { state: val, })

      } else {
        setConfirmPopup(true)
        setCasionId(val)
      }
    })
  };


  const token = localStorage.getItem("token");

  const [casionProviderData, setCasinoProviderData] = useState<any>()

  useEffect(() => {
    axios
      .post(
        "https://api.247idhub.com/api/qtech/provider", { gameType: "ALL" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        setCasinoProviderData(response?.data?.data)
      })

  }, [])

  console.log(window.innerWidth > 1024, "loiuytrewqasxcvbn");

  return (

    <div className="main_wrap_live-casion">
      {casionProviderData?.liveCasino.map((item: any) => (

        <div className="MainBtn_warp" style={{ border: "0.5px solid" }} onClick={() => handleChangeaa(item)}>
          <img
            className="complany-logo-warp"
            src={item?.image}
            alt="" />
          <span className="complany-name-wrap">{item?.providerName}</span>
        </div>
      ))

      }
      <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="casino_modals_body" >
          <CasinoModals type={"qtech"} />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={handleNotAgree}>No, I Don't Agree</button>
          </div>
        </Box>
      </Modal>
      {/* <div className="MainBtn_warp" style={{ border: "0.5px solid" }} onClick={() => handleChangeaa(Aviatordata[0])}>
        <img
          className="complany-logo-warp"
          src={Aviatordata[0]?.logo}
          alt="" />
        <span className="complany-name-wrap">{Aviatordata[0]?.name}</span>
      </div> */}

    </div>
  )
}

export default LiveCasionList