import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

export const ScoreCardGridItem = styled(Grid)({
    border: '2px dotted black ',
    padding: 4,
    margin:"0",
    boxSizing: "border-box"
})

export const ScoreCardGridText = styled(Typography)({
    fontSize: "0.75rem",
    fontWeight: 600,
    wordSpacing: 2,
    lineHeight: 1.6
})

export const BetText = styled(Typography)({
    fontWeight: 700,
    fontSize:"1.2rem"
});
export const BetTextMedium = styled(Typography)({
  fontWeight: 600,
  fontSize: "0.85rem",
});

export const BetTextSmall = styled(Typography)({
  fontSize: "0.7rem",
  fontWeight: 500,
});