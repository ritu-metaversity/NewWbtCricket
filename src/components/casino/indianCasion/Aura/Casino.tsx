import { styled, Tab, Tabs, tabClasses, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { casinoService } from "../../../../utils/api/casino/service";
import BacktoMenuButton from "../../../BacktoMenuButton";
import { CasinoIcon, StyledGameThumb } from "./StyledComponent";
import { RxCross2 } from 'react-icons/rx'
import "./Casion.css"
import CasinoModals from "./CasinoModals";
import axios from "axios";
const StyledTab = styled(Tab)(({ theme }) => ({
  borderRadius: "20px",
  marginRight: "10px",
  paddingTop: "2px",
  paddingBottom: "2px",
  minHeight: 50,
  border: "2px solid #3c444b",
  [`&.${tabClasses.selected}`]: {
    borderColor: theme.palette.primary.main,
  },
}));

export interface CasinoList {
  gameId: number;
  gameCode: string;
  gameName: string;
  imageUrl: string;
}

const Casino = () => {
  const [value, setValue] = useState("323334");
  const [casinoTypes, setCasinoTypes] = useState<
    {
      id: number;
      logo: string;
      name: string;
    }[]
  >([]);
  // const navigate = useNavigate();

  const [casinoList, setCasinoList] = useState<CasinoList[]>([]);
  // const [trueee, setTrueee] = useState(false);
  const [casionId, setCasionId] = useState("")
  const nav = useNavigate();
  const getCasinoList = async () => {
    const isSignedIn = localStorage.getItem("token");
    if (!isSignedIn) {
      nav("/");
      return;
    }
    const { response } = await casinoService.getCasinoListByType(Number(value));
    if (response) {
      setCasinoList(response.data || []);
    } else {
      setCasinoList([]);
    }
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    getCasinoList();
  }, [value]);

  useEffect(() => {
    const getCasinoTypes = async () => {
      const isSignedIn = localStorage.getItem("token");
      if (!isSignedIn) {
        nav("/");
        return;
      }
      const { response } = await casinoService.getCasinoTypes();
      if (response) {
        setCasinoTypes(response?.data || []);
        if (response.data[0]) {
          setValue(response.data[0].id);
          getCasinoList();
        }
      }
    };
    getCasinoTypes();
    return () => { };
  }, []);
  const setDataForAgree = (vl: any) => {
    console.log(vl, "datataatta")
  }
  const [confirmPopup, setConfirmPopup] = useState(false)
  const handleNotAgree = () => {
    setConfirmPopup(false)
  }
  const handleClose = () => setConfirmPopup(false);

  const handleAgree = () => {
    nav("/india-casino-game", { state: casionId })
    // setTrueee(true)
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
    ).then((res: any) => {
      if (res?.data?.data?.aura === 1) {
        nav("/india-casino-game", { state: val })

      } else {
        setConfirmPopup(true)
        setCasionId(val)
      }
    })

  };

  return (
    <>
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
          {casinoList.map((item) => (
            <Box
              className="casino_inner_list"
              onClick={() => handleChangeaa(item.gameId)}
            >
              {/* <Link to={"/casino/" + item.gameId}> */}
              <img src={item.imageUrl} alt="thumb" onClick={() => handleChangeaa(item.gameId)} className="csino_img" style={{ width: "100%" }} />{" "}
              {/* <span style={{ width: "100%" }} className="casinoGameNAame"> {item?.gameCode}</span> */}
              {/* </Link> */}
            </Box>

          ))}
        </Box>

      </Box>
      <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="casino_modals_body" >
          <CasinoModals type={"aura"} />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={handleNotAgree}>No, I Don't Agree</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Casino;
