import { Grid, GridProps } from "@mui/material";
import React, { FC } from "react";
import './Home.css'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

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
    cardForwardHref: "/complete-games",
  },

  {
    cardTitle: "My Ledger",
    cardDesc: "check your history, wins and rewards",
    cardImageSrc: "/myledger6.png",
    cardForwardHref: "/account-summary",
  },

  {
    cardTitle: "Profile",
    cardDesc: "View your profile and edit your information",
    cardImageSrc: "/profile2.png",
    cardForwardHref: "/profile",
  },

  {
    cardTitle: "Casino",
    cardDesc: "Play online live casino",
    cardImageSrc: "/casino.png",
    cardForwardHref: "/casino",
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
    cardImageSrc: '/freegame5.png',
    cardForwardHref: "/sports",
  },
  {
    cardTitle: "Current Bet",
    // cardDesc: "change your mybet password",
    cardImageSrc: "/aaaaaaaaa.png",
    cardForwardHref: "/current-bet",
  },]

const Home = () => {
  const gridItemProps: GridProps = {
    xs: 5.5,
    item: true,
    md: 3.7,
    justifyContent: "center",
    display: "flex",
  };

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
