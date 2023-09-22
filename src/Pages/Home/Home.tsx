import { Grid, GridProps } from "@mui/material";
import React, { FC, useEffect } from "react";
import './Home.css'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";

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
    cardImageSrc: "/inplay1.png",
    cardForwardHref: "/in-play",
  },
  {
    cardTitle: "Statement",
    cardDesc: "matches that are completed and the results are declared",
    cardImageSrc: "/complete2.png",
    cardForwardHref: "/Account_Statement_Page",
  },

  {
    cardTitle: "Indian Casino",
    cardDesc: "Play online Indian casino",
    cardImageSrc: "/casionnewlogo.png",
    cardForwardHref: "/casino",
  },
  // {
  //   cardTitle: "Our Casino",
  //   cardDesc: "Play online Our casino",
  //   cardImageSrc: "/casionnewlogo.png",
  //   cardForwardHref: "/virtual-casino",
  // },
  {
    cardTitle: "International Casino",
    cardDesc: "Play online international casino",
    cardImageSrc: "/casionnewlogo.png",
    cardForwardHref: "/Live-casino",
  },
  {
    cardTitle: "Lottery",
    cardDesc: "Play online international casino",
    cardImageSrc: "/casionnewlogo.png",
    cardForwardHref: "/lottery-casino",
  },
  {
    cardTitle: "Slots",
    cardDesc: "Play online international casino",
    cardImageSrc: "/casionnewlogo.png",
    cardForwardHref: "/Slot-Game-details",
  },
  {
    cardTitle: "Fantasy Game",
    cardDesc: "Play online international casino",
    cardImageSrc: "/casionnewlogo.png",
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
    cardTitle: "Sports",
    // cardDesc: "Sports list",
    cardImageSrc: '/spotssssss.png',
    cardForwardHref: "/sports",
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

const Home = () => {
  const gridItemProps: GridProps = {
    xs: 5.5,
    item: true,
    md: 3.7,
    justifyContent: "center",
    display: "flex",
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   let data = {
  //     startDate: "2023-08-14",
  //     endDate: "2023-09-13",
  //     index: 0,
  //     noOfRecords: 100
  //   }
  //   axios.post(
  //     'https://api.247365.exchange/admin-new-apis/bmx/report/get-my-ledger', data,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },

  //     }
  //   ).then((res) => {
  //     console.log(res?.data, "sdfsdfsdfsd");
  //   })
  // }, [])

  return (
    <div className="main_container" >
      <div className="mid_container">
        {ActionCardPropsList.map((item) => (
          <Link to={item.cardForwardHref} className="single_container"   >

            <img className="img_container" src={item?.cardImageSrc} alt="" />
            <span>{item?.cardTitle}</span>

          </Link>
        ))}

      </div>
      <Outlet />
    </div >
  );
};

export default Home;
