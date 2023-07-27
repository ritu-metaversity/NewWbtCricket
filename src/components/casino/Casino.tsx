import { styled, Tab, Tabs, tabClasses, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { casinoService } from "../../utils/api/casino/service";
import BacktoMenuButton from "../BacktoMenuButton";
import { CasinoIcon, StyledGameThumb } from "./StyledComponent";
import { RxCross2 } from 'react-icons/rx'
import "./Casion.css"
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
  const handleChangeaa = (val: any) => {
    // console.log(val)
    // /m/casino/:id
    if (
      token
    ) {
      setCasionId(val)
      setTrueee(true)
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
      <Modal
        open={trueee}
        onClose={() => setTrueee(false)}
        style={{ padding: "10px" }}
        // m="xl"
        className="slot_game"
      >
        {/* <Box className="bet-box"> */}

        <>
          <RxCross2 className="modal_CrosssIcon" onClick={() => setTrueee(false)} />
          <iframe
            src={`https://d2.fawk.app/#/splash-screen/${token}/9482/?opentable=${casionId}`}
            // height="82vh"
            // className="mobile_if"
            width="100%"
            style={{ minHeight: "100vh" }}
            title="mobile"
            className="for_Desktop"
            allowFullScreen={true}
          ></iframe>
          <iframe
            src={`https://m2.fawk.app/#/splash-screen/${token}/9482/?opentable=${casionId}`}
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
