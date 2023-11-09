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

const ActionCardPropsList = [
  {
    cardTitle: "In Play",
    cardDesc: "matches that are on going or incoming",
    cardImageSrc: "/in-playLatest.png",
    cardForwardHref: "/in-play",
  },
  {
    cardTitle: "Sports",
    // cardDesc: "Sports list",
    cardImageSrc: '/spotssssss.png',
    cardForwardHref: "/sports",
  },


  {
    cardTitle: "Indian Casino",
    cardDesc: "Play online Indian casino",
    cardImageSrc: "/indian-casino.png",
    cardForwardHref: "/india_casion",
  },
  // {
  //   cardTitle: "Our Casino",
  //   cardDesc: "Play online Our casino",
  //   cardImageSrc: "/our-casino.png",
  //   cardForwardHref: "/virtual-casino",
  // },
  {
    cardTitle: "International Casino",
    cardDesc: "Play online international casino",
    cardImageSrc: "/international-casinoletest.png",
    cardForwardHref: "/Live-casino",
  },
  {
    cardTitle: "Lottery",
    cardDesc: "Play online international casino",
    cardImageSrc: "/lottery.png",
    cardForwardHref: "/lottery-casino",
  },
  {
    cardTitle: "Slots",
    cardDesc: "Play online international casino",
    cardImageSrc: "/slots.png",
    cardForwardHref: "/Slot-Game-details",
  },
  {
    cardTitle: "Fantasy Game",
    cardDesc: "Play online international casino",
    cardImageSrc: "/fantasy-game.png",
    cardForwardHref: "/Fantasy-Game",
  },
  {
    cardTitle: "Profile",
    cardDesc: "View your profile and edit your information",
    cardImageSrc: "/profile2.png",
    cardForwardHref: "/profile",
  },

  {
    cardTitle: "Change Password",
    cardDesc: "change your mybet password",
    cardImageSrc: "/changespassword4.png",
    cardForwardHref: "/password-change",
  },
  {
    cardTitle: "Statement",
    cardDesc: "matches that are completed and the results are declared",
    cardImageSrc: "/complete2.png",
    cardForwardHref: "/Account_Statement_Page",
  },
  {
    cardTitle: "Current Bet",
    // cardDesc: "change your mybet password",
    cardImageSrc: "/now_5579093.png",
    cardForwardHref: "/current-bet",
  },
  {
    cardTitle: "Profit and Loss",
    cardDesc: "check your history, wins and rewards",
    cardImageSrc: "/myledger6.png",
    cardForwardHref: "/profit-and-loss",
  },




]

const Home: FC<Props> = ({ show, setShow }) => {
  const gridItemProps: GridProps = {
    xs: 5.5,
    item: true,
    md: 3.7,
    justifyContent: "center",
    display: "flex",
  };
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const [casinoListData, setCasinoListData] = useState();
  const [casinoListName, setCasinoListName] = useState();
  const [casinoListImg, setCasinoListImg] = useState();
  const nav = useNavigate();

  // useEffect(() => {
  //   const TokenId = localStorage.getItem("token");
  //   axios
  //     .post(
  //       `${REACT_APP_API_URL}/api/supernowa/game-list`, { providerCode: "BT" },

  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${TokenId}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response) {
  //         setCasinoListData(response?.data?.data?.games[0])
  //         setCasinoListName(response?.data?.data?.games[0]?.name)
  //         setCasinoListImg(response?.data?.data?.games[0]?.thumb)
  //       } else {

  //       }


  //     })

  // }, [])

  const handleChange = () => {
    nav("/Sports-Book", { state: casinoListData })

  }

  return (
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
              <h6 className="maintitle" style={{ color: "#fff" }}>Welcome to bmx</h6>
              <button type="button" className="closecross" aria-label="Close" onClick={() => setShow(false)} style={{ cursor: "pointer" }}>
                <span >×</span>
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
        {ActionCardPropsList.map((item) => (
          <Link to={item.cardForwardHref} className="single_container"   >

            <img className="img_container" src={item?.cardImageSrc} alt="" />
            <span>{item?.cardTitle}</span>

          </Link>
        ))}
        {/* <div onClick={() => handleChange()} className="single_container"   >

          <img className="img_container" src={casinoListImg} alt="" />
          <span>{casinoListName}</span>

        </div> */}
      </div>
      <Outlet />
    </div >
  );
};

export default Home;
