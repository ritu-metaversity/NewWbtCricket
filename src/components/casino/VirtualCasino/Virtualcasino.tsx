import { Modal } from "@mui/material";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { casinoService } from "../../../utils/api/casino/service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Virtualcasino.css"
import { RxCross2 } from 'react-icons/rx'


const Virtualcasino = () => {
  const navigate = useNavigate();

  const [casionId, setCasionId] = useState("")
  const [casinoList, setCasinoList] = useState([]);
  const [trueee, setTrueee] = useState(false);
  const [mobileDtaatat, setMobileDtaatat] = useState();
  const [desktopdataa, setDesktopdataa] = useState();
  // const [confirmPopup, setConfirmPopup] = useState(false)
  const TokenId = localStorage.getItem("token");

  const getCasinoList = async () => {
    let data: any = { "gameType": "virtual" }
    // const token = localStorage.getItem("token");

    axios
      .post(


        "http://13.250.53.81/VirtualCasinoBetPlacer/vc/casino-game-list",
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
          setCasinoList(response?.data?.data || []);
        } else {
          setCasinoList([]);
        }
      })
  };


  useEffect(() => {
    getCasinoList();
  }, [])

  const handleChangeaa = (val: any) => {
    if (
      TokenId
    ) {
      setCasionId(val)
      setTrueee(true)
      navigate("/virtual-casino-game", { state: val })
      // setDesktopdataa(val1)
      // setMobileDtaatat(val2)

      // navigate(`/m/casino/${val}`);
    } else {
      // navigate("/m/login");
      // setCasionId(val) 
      // setTrueee(true)
    }
  };
  console.log(casinoList, "casinoList");
  return (
    <Box>
      <Box className="casino_main_list">
        {!(casinoList?.length > 0) && (
          <Typography
            textAlign={"center"}
            sx={{ verticalAlign: "center" }}
            // height={"50vh"}
            flex={1}
          >
            NO Casino Found
          </Typography>
        )}
        {casinoList?.map((item: any) => (
          <Box
            className="casino_inner_list"
          >

            <img src={item.imageUrl} alt="thumb" onClick={() => handleChangeaa(item)} className="csino_img" style={{ width: "100%" }} />{" "}
            <span style={{ width: "100%" }} className="casinoGameNAame"> {item?.gameName}</span>

          </Box>
        ))}
      </Box>
    </Box>

  )
}

export default Virtualcasino