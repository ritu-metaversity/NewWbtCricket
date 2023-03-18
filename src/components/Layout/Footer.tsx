import React, { FC } from "react";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CasinoIcon from "@mui/icons-material/Casino";
interface Props {
  isSignedIn: boolean;
}

const Footer: FC<Props> = ({ isSignedIn }) => {
  return (
    <div className="appBottomMenu">
      <Link to={!isSignedIn ? "/sign-in" : "/sports"}>
        <EmojiEventsIcon />
        <br />
        <strong>Sports</strong>
      </Link>

      <Link to={!isSignedIn ? "/sign-in" : "in-play"}>
        <AccessAlarmIcon />
        <br /> <strong>In-Play</strong>
      </Link>

      <Link to={!isSignedIn ? "/sign-in" : "/"}>
        <HomeIcon />
        <br /> <strong>Home</strong>
      </Link>

      <Link to={!isSignedIn ? "/sign-in" : "/casino"}>
        <CasinoIcon />
        <br />
        <strong>Casino</strong>
      </Link>

      <Link to={!isSignedIn ? "/sign-in" : "/profile"}>
        <AccountCircleIcon />
        <br />
        <strong>Account</strong>
      </Link>
    </div>
  );
};

export default Footer;
