import { styled, Tab, Tabs, tabClasses, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { casinoService } from "../../utils/api/casino/service";
import BacktoMenuButton from "../BacktoMenuButton";
import { CasinoIcon, StyledGameThumb } from "./StyledComponent";
import { RxCross2 } from 'react-icons/rx'
import "./Casion.css"
import CasinoModals from "./CasinoModals";
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

  const [casinoList, setCasinoList] = useState<CasinoList[]>([]);
  const [trueee, setTrueee] = useState(false);
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
    setTrueee(true)
    setConfirmPopup(false)

  }
  const handleChangeaa = (val: any) => {
    // console.log(val)
    // /m/casino/:id
    if (
      token
    ) {
      setCasionId(val)
      setConfirmPopup(true)
      // navigate(`/m/casino/${val}`);
    } else {
      // navigate("/m/login");
      // setCasionId(val) 
      // setTrueee(true)
    }
  };

  return (
    <>
      <BacktoMenuButton />
      {/* {casinoTypes?.length > 0 && (
        <Tabs
          variant="scrollable"
          scrollButtons={true}
          TabScrollButtonProps={{
            sx: {
              opacity: "1 !important",
              borderRadius: "50%",
              width: "40px",
              margin: "auto",
              height: "40px",
              marginRight: "10px",
            },
          }}
          TabIndicatorProps={{ sx: { display: "none" } }}
          sx={{
            paddingY: "0.8rem",
          }}
          value={value}
          onChange={(e, value) => {
            setValue(value);
          }}
        >
          {casinoTypes.map((item) => (
            <StyledTab
              icon={<CasinoIcon src={item.logo} />}
              iconPosition="start"
              value={item.id}
              label={item.name}
            />
          ))}
        </Tabs>
      )} */}
      <Box
      // bgcolor={colorHex.bg1}
      >
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
            >
              {/* <Link to={"/casino/" + item.gameId}> */}
              <img src={item.imageUrl} alt="thumb" onClick={() => handleChangeaa(item.gameId)} className="csino_img" style={{ width: "100%" }} />{" "}
              <span style={{ width: "100%" }} className="casinoGameNAame"> {item?.gameCode}</span>
              {/* </Link> */}
            </Box>
          ))}
        </Box>
      </Box>
      <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="casino_modals_body" >
          <CasinoModals />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={handleNotAgree}>No, I Don't Agree</button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={trueee}
        onClose={() => setTrueee(false)}
        style={{ padding: "17px", overflow: "scroll" }}
        // m="xl"
        className="slot_game"
      >
        {/* <Box className="bet-box"> */}

        <>
          <div className="modal_CrosssIcon">
            <RxCross2 onClick={() => setTrueee(false)} />
          </div>
          <iframe
            src={`https://d.fawk.app/#/splash-screen/${token}/9482/?opentable=${casionId}`}
            // height="82vh"
            // className="mobile_if"
            width="100%"
            style={{ minHeight: "100vh" }}
            title="mobile"
            className="for_Desktop"
            allowFullScreen={true}
          ></iframe>
          <iframe
            src={`https://m.fawk.app/#/splash-screen/${token}/9482/?opentable=${casionId}`}
            // height="82vh"
            // className="mobile_if"
            width="100%"
            style={{ minHeight: "90vh" }}
            title="mobile"
            className="For_mobile"
            allowFullScreen={true}

          ></iframe>
        </>
        {/* </Box> */}
      </Modal>
    </>
  );
};
export default Casino;
