import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../App";
import { colorHex } from "../../utils/constants";
import "./live.css";
import { LoaderContext } from "../../App";

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

const Match = ({ matches, sportId }: Props) => {
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
    <Grid
      container
      onClick={() =>
        navigate(
          isSignedIn
            ? "/in-play-details/?event-id=" + matches.matchId + "&Sports-id=" + sportId
            : "/sign-in"
        )
      }
      // bgcolor={{ xs: colorHex.bg2, lg: colorHex.bg1 }}
      p={{ xs: 0.5, lg: 0 }}
      sx={{ cursor: "pointer" }}
      // m={{ xs: "4px 0px", lg: 0 }}
      // gap={{ xs: 0.5, lg: 0 }}
      border="0.5px solid black"

    // borderBottom={{ xs: "", lg: "1px solid rgba(60,68,75)" }}
    >
      <Grid
        item
        xs={12}
        lg={6.6}
        // bgcolor={colorHex.bg1}
        display="flex"
        fontSize={"0.8rem"}
        alignItems={"center"}
        p={{ xs: 1, lg: 1 }}
        maxWidth={{ lg: "unset" }}
        flex={{ lg: 1 }}
      >
        <Box>
          {matches.inPlay ? (
            <Typography
              component={"div"}
              maxWidth={"min-content"}
              overflow="hidden"
              color="secondary.main"
              mx={2}
            >
              Live
              <Box className="live-under">
                <Box className="live-under-under"></Box>
              </Box>
            </Typography>
          ) : (
            <Box
              display="flex"
              width={{ lg: 150 }}
              sx={{
                opacity: 0.6,
                pr: 2,
                flexDirection: { xs: "column", lg: "row" },
                borderRight: `1px solid ${colorHex.borderLine}`,
              }}
              justifyContent={"space-between"}
            >
              <span>{getDay(matches.openDate)}</span>
              <span>{getTimeInMIn(matches.openDate)}</span>
            </Box>
          )}
        </Box>
        <Box textAlign="left" pl={2}>
          {matches.matchName}
        </Box>
        <Box
          textAlign="left"
          ml={"auto"}
          fontSize={"0.85rem"}
          width={{ lg: "6rem" }}
          fontWeight={900}
          whiteSpace="nowrap"
          sx={{ wordSpacing: "0.2rem" }}
        >
          {matches.bm && "BM   "}
          {matches.GM && "GM   "}
          {matches.SM && "SM   "}
          {matches.F && "F   "}
          {isChannelAvailable && <i className="icon-tv d-icon "></i>}
        </Box>
      </Grid>
      <Grid
        container
        xs={12}
        item
        lg={5.4}
        maxWidth={{ lg: 356, xl: 700 }}
        ml={{
          lg: "auto",
        }}
        py={{ xs: 0, md: 2, lg: 2 }}
        px={{ xs: 0, md: 4, lg: 1 }}
        display="flex"
        alignItems={"center"}
        gap={{ xs: "1.2%", md: "1.2%", lg: 0.5 }}
      >
        <Grid
          {...buttonGridProps}
          marginLeft={{ xs: 0, md: "auto", lg: 0, xl: "auto" }}
          bgcolor="#72BBEF"
        >
          <Button {...ButtonPropps}>{matches.team1Back || "—"} </Button>
        </Grid>{" "}
        <Grid {...buttonGridProps} marginRight="auto" bgcolor="#F994BA">
          <Button {...ButtonPropps}>{matches.team1Lay || "—"} </Button>
        </Grid>
        <Grid {...buttonGridProps} marginLeft="auto" bgcolor="#72BBEF">
          <Button {...ButtonPropps}>{matches.drawBack || "—"}</Button>
        </Grid>{" "}
        <Grid {...buttonGridProps} marginRight="auto" bgcolor="#F994BA">
          <Button {...ButtonPropps}>{matches.drawLay || "—"}</Button>
        </Grid>
        <Grid {...buttonGridProps} marginLeft="auto" bgcolor="#72BBEF">
          <Button {...ButtonPropps}>{matches.team2Back || "—"} </Button>
        </Grid>
        <Grid
          {...buttonGridProps}
          marginRight={{ xs: 0, md: "auto", lg: 0, xl: "auto" }}
          bgcolor="#F994BA"
        >
          <Button {...ButtonPropps}>{matches.team2Lay || "—"} </Button>
        </Grid>{" "}
      </Grid>
    </Grid>
  );
};

export default React.memo(Match);
