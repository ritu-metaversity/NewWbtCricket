import { Box, Button, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { SummaryCardContainer, SummaryCardTitle } from "./styledComponents";

export interface SummaryCardProps {
  matchName: string;
  matchId: number;
  openDate: string;
  inPlay: string;
  team1Back: null;
  team1Lay: null;
  team2Back: null;
  team2Lay: null;
  drawBack: null;
  drawLay: null;
}
const SummaryCard: FC<SummaryCardProps> = (data) => {
  const { matchName, openDate, inPlay, matchId } = data;
  return (
    <SummaryCardContainer>
      <Link to={"/in-play-details/?event-id=" + matchId}>
        <SummaryCardTitle bgcolor="#FF0266">{matchName}</SummaryCardTitle>
        <Typography color={"black"} py={1}>
          {new Date(openDate).toLocaleString()}
        </Typography>
      </Link>
      <Grid container py={2} bgcolor="rgba(0,0,0,0.1)">
        <Grid item xs={4} marginLeft="auto">
          Total bet count:
        </Grid>
        <Grid item xs={4}>
          0
        </Grid>
        <Grid item xs={4}>
          {inPlay && (
            <Typography
              component={"div"}
              maxWidth={"min-content"}
              overflow="hidden"
              marginLeft={"auto"}
              marginRight={2}
            >
              InPlay
              <Box className="live-under">
                <Box className="live-under-under"></Box>
              </Box>
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container py={1}>
        <Grid item xs={4} py={2}>
          1
        </Grid>
        <Grid item xs={4} py={2}>
          X
        </Grid>
        <Grid item xs={4} py={2}>
          2
        </Grid>
        <Grid item xs={2} py={1} bgcolor="skyblue">
          {data.team1Back}
        </Grid>
        <Grid item xs={2} py={1} bgcolor="pink">
          {data?.team1Lay}
        </Grid>
        <Grid item xs={2} py={1} bgcolor="skyblue">
          {data.drawBack || "0"}
        </Grid>
        <Grid item xs={2} py={1} bgcolor="pink">
          {data.drawLay || "0"}
        </Grid>
        <Grid item xs={2} py={1} bgcolor="skyblue">
          {data.team2Back}
        </Grid>
        <Grid item xs={2} py={1} bgcolor="pink">
          {data.team2Lay}
        </Grid>
      </Grid>
    </SummaryCardContainer>
  );
};

export default SummaryCard;
