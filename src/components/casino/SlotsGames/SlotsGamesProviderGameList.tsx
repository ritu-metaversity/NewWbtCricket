import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Modal, Box } from "@mui/material";
import CasinoModals from "../indianCasion/Aura/CasinoModals";

const SlotsGamesProviderGameList = () => {
  const { state } = useLocation()
  const TokenId = localStorage.getItem("token");
  console.log(state?.filterType, "statestatestatestate");
  let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;
  const [gameFilter, setGameFilter] = useState([])
  const navigate = useNavigate();
  const TokenGame = localStorage.getItem("GameToken");


  useEffect(() => {

    if (
      TokenGame
    ) {
      let data = {
        token: TokenGame, provider: state?.filterType, gameCategory: "SLOT"

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


  const [confirmPopup, setConfirmPopup] = useState(false)
  const [casionId, setCasionId] = useState("")

  const handleNotAgree = () => {
    setConfirmPopup(false)
  }
  const handleClose = () => setConfirmPopup(false);

  const handleAgree = () => {
    navigate("/Slots-Game-page", { state: casionId, })
    setConfirmPopup(false)
  }

  const handleChangeaa = (val: any) => {

    setConfirmPopup(true)
    setCasionId(val)
  }

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

      <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="casino_modals_body" >
          <CasinoModals type={"qtech"} />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={handleNotAgree}>No, I Don't Agree</button>
          </div>
        </Box>
      </Modal>

    </div>
  )
}

export default SlotsGamesProviderGameList