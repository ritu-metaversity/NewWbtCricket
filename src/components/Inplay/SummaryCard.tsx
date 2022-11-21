import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { SummaryCardContainer, SummaryCardTitle } from "./styledComponents";

interface SummaryCardProps {
  matchName: string;
  openDate: string;
  eventId: string;
  inPlay: string;
  runner: {
    back1price: string;
    lay1price: string;
  }[];
}
const SummaryCard = (props: any) => {
  const { matchName, openDate, inPlay,eventId, runner } = props?.data;
  console.log(props)
  return (
    <SummaryCardContainer>
      <Link to={"/in-play-details/" + eventId}>
        <SummaryCardTitle bgcolor="secondary.main">
          {matchName}
        </SummaryCardTitle>
        <Typography py={1}>{new Date(openDate).toLocaleString()}</Typography>
      </Link>
      <Grid container py={2} bgcolor="rgba(0,0,0,0.1)">
        <Grid item xs={4} marginLeft="auto">
          Total bet count:
        </Grid>
        <Grid item xs={4}>
          0
        </Grid>
        <Grid item xs={4} >
          {inPlay && <Typography component={"div"} maxWidth={"min-content"} overflow="hidden" marginLeft={"auto"} marginRight={2}>
            InPlay
            <Box className="live-under">
              <Box className="live-under-under"></Box>
            </Box>
          </Typography>}
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
        <Grid item xs={2} bgcolor="skyblue">
          <Button fullWidth>{runner[0]?.back1price}</Button>
        </Grid>
        <Grid item xs={2} bgcolor="pink">
          <Button fullWidth>{runner[0]?.lay1price}</Button>
        </Grid>
        <Grid item xs={2} bgcolor="skyblue">
          <Button fullWidth sx={{ color: "black" }}>
            {runner[2]?.back1price || "0"}
          </Button>
        </Grid>
        <Grid item xs={2} bgcolor="pink">
          <Button fullWidth>{runner[2]?.lay1price || "0"}</Button>
        </Grid>
        <Grid item xs={2} bgcolor="skyblue">
          <Button fullWidth>{runner[1]?.back1price}</Button>
        </Grid>
        <Grid item xs={2} bgcolor="pink">
          <Button fullWidth>{runner[1]?.lay1price}</Button>
        </Grid>
      </Grid>
    </SummaryCardContainer>
  );
};

export default SummaryCard;
