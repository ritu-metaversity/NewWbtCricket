import { Grid, GridProps } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import './Home.css'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import Fotter from "../../components/Fotter/Fotter";
interface Props {
  show: boolean | null;
  setShow: Dispatch<SetStateAction<boolean | null>>
}
interface ActionCardProps {
  cardTitle: string;
  cardImageSrc: string;
  cardDesc?: string;
  cardForwardHref: string;
}
// export const ActionAreaCard: FC<ActionCardProps> = ({ cardTitle, cardForwardHref, cardImageSrc, cardDesc }) => {
//   return (
//     <Card sx={{ width: 345, height: "100%" }}>
//       <div  to={cardForwardHref} style={{ textDecoration: "none", color: "unset" }}>
//         <CardActionArea sx={{ height: "100%" }}>
//           <CardMedia
//             component="img"
//             // width="100px"
//             sx={{
//               alignSelf: "center",
//               // height: "100px",
//               width: "100%",
//               maxWidth: "220px",
//               maxHeight: "220px",
//               margin: "auto",
//               pt: 2,
//             }}
//             // height= "200"
//             image={cardImageSrc}
//             // image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
//             alt="icon-image"
//           />
//           <CardContent sx={{ mt: "" }}>
//             <Typography gutterBottom variant="h5" component="div">
//               {cardTitle}
//             </Typography>
//             {/* <Typography variant="body2" color="text.secondary">
//             {cardDesc}
//           </Typography> */}
//           </CardContent>
//         </CardActionArea>
//       </div>
//     </Card>
//   );
// }






const Home: FC<Props> = ({ show, setShow }) => {
  const gridItemProps: GridProps = {
    xs: 5.5,
    item: true,
    md: 3.7,
    justifyContent: "center",
    display: "flex",
  };


  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  // const [casinoListData, setCasinoListData] = useState();
  // const [casinoListName, setCasinoListName] = useState();
  // const [casinoListImg, setCasinoListImg] = useState();
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const [gameQtech, setGameQTech] = useState<any>()
  const [gameAura, setGameAura] = useState<any>()
  const [gameSuperNova, setGameSuperNova] = useState<any>()
  useEffect(() => {

    axios
      .post(
        "https://adminapi.247idhub.com/admin-new-apis/user/alloted-casino-list",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        setGameQTech(
          response?.data?.data.find((item: any) => item?.name === "QTech")
        );
        setGameAura(
          response?.data?.data.find((item: any) => item?.name === "Aura")
        );
        setGameSuperNova(
          response?.data?.data.find((item: any) => item?.name === "Super Nova")
        );
      });

  }, [])

  // const handleChange = () => {
  //   nav("/Sports-Book", { state: casinoListData })

  // }

  return (
    <>
    <div className="main_container" >
      <div className="mid_container">
        <Modal
          open={!!show}
          onClose={() => setShow(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="maindatatashow">
            <div className="mainheader-popup">
              <h6 className="maintitle" style={{ color: "#fff" }}>Welcome to {window.location.hostname.replace('www.','')}</h6>
              <button type="button" className="closecross" aria-label="Close" onClick={() => setShow(false)} style={{ cursor: "pointer" }}>
                <span style={{color:"#fff"}}>×</span>
              </button>
            </div>
            <div className="custom-body" >
              <span className="namehead"> प्रिय ग्राहक,</span>
              <span className="namehead_data">
                {" "}
                आपसे अनुरोध है हमारी कोई डुप्लीकेट साइट नही है हमारी आधिकारिक साइट
                <b>{window.location.hostname.replace("www.", "")} </b>से लॉगिन करें। लॉगइन करने से पहले साइट
                का नाम जरूर देख लें। आपके समर्थन के लिए धन्यवाद। टीम <b> {window.location.hostname.replace("www.", "")}</b>
              </span>
              <span className="namehead2">Dear Client,</span>
              <span className="namehead_data2">
                {" "}
                We don't have any duplicate site , You are requested to login with our
                official site <b>{window.location.hostname.replace("www.", "")} </b>I only. Please check the
                site name before you login. Thanks for your support.<b>{window.location.hostname.replace("www.", "")}</b>
              </span>
            </div>
            <div className="modal-footer" >
              <button type="button" className="cancelbtn" onClick={() => setShow(false)} style={{ cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>

        </Modal>


        <Link to={"/in-play"} className="single_container"   >

          <img className="img_container card_3d" src={"/inplay.gif"} alt="" />
          <span>In Play</span>

        </Link>
        <Link to={"/sports"} className="single_container"   >

          <img className="img_container card_3d" src={'/sport.gif'} alt=""  style={{backgroundColor:"#061e5e",padding: "10px"}}/>
          <span>Sports</span>

        </Link>

        {/* {gameAura?.active === true ?
          <Link to={"/india_casion"} className="single_container"   >

            <img className="img_container" src="/indian-casino.png" alt="" />
            <span>Indian Casino</span>

          </Link>
          : gameSuperNova?.active === true ?
            <Link to={"/india_casion"} className="single_container"   >

              <img className="img_container" src="/indian-casino.png" alt="" />
              <span>Indian Casino</span>

            </Link> : ""

        }

        {gameQtech?.active === true ?

          <Link to={"/Live-casino"} className="single_container"   >

            <img className="img_container" src={"/international-casinoletest.png"} alt="" />
            <span>International Casino</span>

          </Link>
          : ""
        }


        {gameQtech?.active === true ?
          <Link to={"/lottery-casino"} className="single_container"   >

            <img className="img_container" src={"/lottery.png"} alt="" />
            <span>Lottery</span>

          </Link>


          : ""}

        {gameQtech?.active === true ?
          <Link to={"/Slot-Game-details"} className="single_container"   >

            <img className="img_container" src={"/slots.png"} alt="" />
            <span>Slots</span>

          </Link>
          : ""}

        {gameQtech?.active === true ?
          <Link to={"/Fantasy-Game"} className="single_container"   >

            <img className="img_container" src={"/fantasy-game.png"} alt="" />
            <span>Fantasy Game</span>

          </Link>

          : ""
        } */}


        <Link to={"/profile"} className="single_container"   >

          <img className="img_container card_3d" src={"/my_profile.gif"} alt="" />
          <span>Profile</span>

        </Link>
        <Link to={"/password-change"} className="single_container"   >

          <img className="img_container card_3d" src={"/password.gif"} alt="" />
          <span>Change Password</span>

        </Link>
        <Link to={"/Account_Statement_Page"} className="single_container"   >

          <img className="img_container card_3d" src={"/account-statement.gif"} alt=""  style={{backgroundColor:"#061e5e",padding: "27px"}}/>
          <span>Statement</span>

        </Link>


        <Link to={"/current-bet"} className="single_container"   >

          <img className="img_container card_3d" src={"/now_5579093.png"} alt="" style={{backgroundColor:"#061e5e",padding: "13px"}}/>
          <span>Current Bet</span>

        </Link>
        <Link to={"/profit-and-loss"} className="single_container"   >

          <img className="img_container card_3d" src={"/pandl.gif"} alt=""  style={{backgroundColor:"#061e5e",padding: "13px"}}/>
          <span>Profit and Loss</span>

        </Link>
      
      </div>
      
      <Outlet />

    </div >
    <div>

      <Fotter/>
    </div>

    </>
  );
};

export default Home;
