import { Grid } from "@mui/material";
import React from "react";
import { ScoreCardGridItem, ScoreCardGridText } from "./styledComponents";

export function ScoreCardGrid({ }) {
  return <Grid container >
    <ScoreCardGridItem item xs={3.8} sm={3.85}>
          <ScoreCardGridText>(0)</ScoreCardGridText>
          <ScoreCardGridText>(0)</ScoreCardGridText>
          <ScoreCardGridText>Bowler:</ScoreCardGridText>
        </ScoreCardGridItem>
        <ScoreCardGridItem item xs={5.8} sm={5.9}>
          <ScoreCardGridText>HOBART W 130/8 (20)</ScoreCardGridText>
          <ScoreCardGridText>MELBOURNE W 132/6 (19.1)</ScoreCardGridText>
          <ScoreCardGridText>6 BALLS :</ScoreCardGridText>
        </ScoreCardGridItem>
        <ScoreCardGridItem item xs={2}>
          <img src="/BC.png" alt="" />
        </ScoreCardGridItem>
      </Grid>;
}
  