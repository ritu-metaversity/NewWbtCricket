import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";
import "./live.css";
import { LoaderContext } from "../../App";
import inplayelogo from "./inplayyyy.svg"
import Binplay from "./b_implay.svg"
import Finplay from "./f_innnplay.svg"
import "./InplayMatch.css"
export interface MatchInterface {
    matchName: string;
    matchId: number;
    openDate: string;
    team1Back: number | null;
    team1Lay: number | null;
    team2Back: number | null;
    team2Lay: number | null;
    drawBack: number | null;
    drawLay: number | null;
    inPlay: string;
    bm: boolean;
    F: boolean;
    GM: boolean;
    SM: boolean;
    channelId?: string;
}

interface Props {
    matches: MatchInterface;
    sportId: string;
}

const buttonGridProps = {
    item: true,
    xl: 1.7,
    lg: 1.8,
    xs: 1.8,
    borderRadius: 1,
};

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const getDay = (date: string) => {
    const now = new Date();
    const dat = new Date(date);
    const nowDate = now.getDate();
    const datDate = dat.getDate();

    if (nowDate === datDate) return "Today";
    now.setDate(nowDate + 1);
    if (now.getDate() === datDate) return "Tomorrow";

    return days[dat.getDay()];
};
const getTimeInMIn = (date: string) => {
    const dat = new Date(date);
    if (!date) return "";
    let hours: string | number = dat.getHours();
    hours = (hours < 10 ? "0" : "") + hours;

    let mins: string | number = dat.getMinutes();
    mins = (mins < 10 ? "0" : "") + mins;
    return hours + ":" + mins;
};

const ButtonPropps = {
    sx: {
        fullWidth: true,
        minWidth: "",
        fontSize: "0.9rem",
        p: { xs: 0.5, lg: 0 },
        width: { xl: "4rem" },
        mx: -0.25,
        color: "#000",
        fontWeight: 700,
    },
};

const InPlayMatch = ({ matches, sportId }: Props) => {
    const navigate = useNavigate();
    const { isSignedIn } = useContext(LoaderContext);
    // const openLoginModal = () => {
    //   if (setModal) {
    //     setModal({ login: true });
    //   }
    // };
    console.log(sportId, 'sdfsdds')
    const isChannelAvailable = useMemo(
        () =>
            matches.channelId && matches.channelId.toString() !== "0" ? true : false,
        [matches.channelId]
    );
    return (


        <div className="mainbox" onClick={() =>
            navigate(
                isSignedIn
                    ? "/in-play-details/?event-id=" + matches.matchId + "&Sports-id=" + sportId
                    : "/sign-in"
            )
        }>
            <div className="inner_box_implauy" >
                <span className="inplay_logo">
                    <img src={inplayelogo} alt="" />
                </span>
                <span className="game_fancy">
                    <p>

                    </p>
                    <img src={Finplay} alt="" />

                </span>

                <span className="game_fancy">
                    <p>

                    </p>
                    <img src={Binplay} alt="" />

                </span>


                <span className="game_date_style">{(matches.openDate)}</span>
            </div>
            <div className="inner_box_implauy2">
                <span className="name_green_button"></span>
                <span className="game_name_style">
                    {matches.matchName}
                </span>

            </div>
        </div >
    );
};

export default React.memo(InPlayMatch);

