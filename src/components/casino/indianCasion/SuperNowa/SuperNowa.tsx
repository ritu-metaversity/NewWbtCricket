import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CasinoModals from "../Aura/CasinoModals";
import { styled, Tab, Tabs, tabClasses, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { casinoService } from "../../../../utils/api/casino/service";
import { LoaderContext } from "../../../../App";
import { LocalDining } from "@mui/icons-material";



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

// export interface CasinoList {
//   gameId: number;
//   gameCode: string;
//   gameName: string;
//   imageUrl: string;
// }

const SuperNowa = () => {

  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [casinoList, setCasinoList] = useState([]);
  // const [trueee, setTrueee] = useState(false);
  const [casionId, setCasionId] = useState("")
  const nav = useNavigate();
  // const getCasinoList = async () => {
  //   const isSignedIn = localStorage.getItem("token");
  //   if (!isSignedIn) {
  //     nav("/");
  //     return;
  //   }
  //   const { response } = await casinoService.getCasinoListByType(Number(value));
  //   if (response) {
  //     setCasinoList(response.data || []);
  //   } else {
  //     setCasinoList([]);
  //   }
  // };
  const { setLoading, loading } = useContext(LoaderContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const TokenId = localStorage.getItem("token");

    setLoading && setLoading((prev) => ({ ...prev, superNowaGameList: true }))

    axios
      .post(
        `${REACT_APP_API_URL}/api/supernowa/game-list`, {},

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TokenId}`,
          },
        }
      )
      .then((response) => {
        setLoading && setLoading((prev) => ({ ...prev, superNowaGameList: false }))
        if (response) {
          setCasinoList(response?.data?.data?.games)
          // console.log(response?.data?.data?.games, "sdfsdfsdfsdfsdfsdfsd")
        } else {
        }


      })

  }, [])


  // const [value, setValue] = useState("323334");
  // const [casinoTypes, setCasinoTypes] = useState<
  //   {
  //     id: number;
  //     logo: string;
  //     name: string;
  //   }[]
  // >([]);
  // const navigate = useNavigate();


  // useEffect(() => {
  //   getCasinoList();
  // }, [value]);


  const [confirmPopup, setConfirmPopup] = useState(false)
  const handleNotAgree = () => {
    setConfirmPopup(false)
  }
  const handleClose = () => setConfirmPopup(false);

  const handleAgree = () => {
    nav("/SuperNowa-Game-page", { state: casionId })

    setConfirmPopup(false)
  }
  const handleChangeaa = (val: any) => {
    console.log(val, "uygtfvgbhnjuytfrvb");

    if (
      token
    ) {
      setConfirmPopup(true)
      setCasionId(val)
      // nav("/SuperNowa-Game-page", { state: val })

      // setCasionId(val)
      // setConfirmPopup(true)
    } else {
    }
  };

  return (
    <>
      <Box>
        <Box className="casino_main_list">
          {/* {!(casinoList?.length > 0) && (
            <Typography
              textAlign={"center"}
              sx={{ verticalAlign: "center" }}
              // height={"50vh"}
              flex={1}
            >
              NO Casino Found
            </Typography>
          )} */}
          {casinoList.map((item: any) => (
            <Box
              className="casino_inner_list"
            >
              {/* <Link to={"/casino/" + item.gameId}> */}
              <img src={item.thumb} alt="thumb"
                onClick={() => handleChangeaa(item)}
                className="csino_img" style={{ width: "100%" }} />{" "}
              {/* <span style={{ width: "100%" }} className="casinoGameNAame"> {item?.gameCode}</span> */}
              {/* </Link> */}
            </Box>
          ))}
        </Box>
      </Box>
      <Modal open={confirmPopup} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="casino_modals_body" >
          <CasinoModals type={"supernowa"} />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={handleNotAgree}>No, I Don't Agree</button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default SuperNowa