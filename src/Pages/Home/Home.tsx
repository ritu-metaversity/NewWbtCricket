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
export const ActionAreaCard: FC<ActionCardProps> = ({ cardTitle, cardForwardHref, cardImageSrc, cardDesc }) => {
  return (
    <Card sx={{ width: 345, height: "100%" }}>
      <Link to={cardForwardHref} style={{ textDecoration: "none", color: "unset" }}>
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            // width="100px"
            sx={{
              alignSelf: "center",
              // height: "100px",
              width: "100%",
              maxWidth: "220px",
              maxHeight: "220px",
              margin: "auto",
              pt: 2,
            }}
            // height= "200"
            image={cardImageSrc}
            // image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="icon-image"
          />
          <CardContent sx={{ mt: "" }}>
            <Typography gutterBottom variant="h5" component="div">
              {cardTitle}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
            {cardDesc}
          </Typography> */}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

const ActionCardPropsList: ActionCardProps[] = [
  {
    cardTitle: "In Play",
    cardDesc: "matches that are on going or incoming",
    cardImageSrc: "/inplay.png",
    cardForwardHref: "/in-play",
  },
  {
    cardTitle: "Completed Games",
    cardDesc: "matches that are completed and the results are declared",
    cardImageSrc: "/complete.jpg",
    cardForwardHref: "/complete-games",
  },

  {
    cardTitle: "My Ledger",
    cardDesc: "check your history, wins and rewards",
    cardImageSrc: "/ledger.png",
    cardForwardHref: "/account-summary",
  },

  {
    cardTitle: "Profile",
    cardDesc: "View your profile and edit your information",
    cardImageSrc: "/profile.png",
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
    cardImageSrc: "/password.png",
    cardForwardHref: "/password-change",
  },
  {
    cardTitle: "Sports",
    // cardDesc: "Sports list",
    cardImageSrc: '/trophy.png',
    cardForwardHref: "/sports",
  },
  {
    cardTitle: "Profile",
    // cardDesc: "change your mybet password",
    cardImageSrc: "/profile.png",
    cardForwardHref: "/profile",
  },
];
const Home = () => {
  const gridItemProps: GridProps = {
    xs: 5.5,
    item: true,
    md: 3.7,
    justifyContent: "center",
    display: "flex",
  };

  return (
    <div className="main_container">
      <Grid container gap={2} pt={2} justifyContent="center">
        {ActionCardPropsList.map((cardProps, index) => (
          <Grid key={`main-menu-card-${index}`} {...gridItemProps}>
            <ActionAreaCard {...cardProps} />
          </Grid>
        ))}
      </Grid>
      <Outlet />
    </div>
  );
};

export default Home;
