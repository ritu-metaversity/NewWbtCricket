import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { SummaryCardContainer, SummaryCardTitle } from './styledComponents';

const SummaryCard = (props:any) => {
    const {
        matchTitle,
        matchTime,
        gridData,
    } = props?.data;
  return (
    <SummaryCardContainer>
      <SummaryCardTitle bgcolor="secondary.main">{matchTitle}</SummaryCardTitle>
      <Typography>{matchTime}</Typography>
      <Grid container rowGap={3} py={3}>
        {gridData.map((item: any) => (
          <>
            <Grid item xs={3}  color={item?.color}>
              {item?.title}
            </Grid>
            <Grid item xs={3} color={item?.color}>
              {item?.value}
            </Grid>
          </>
        ))}
      </Grid>
    </SummaryCardContainer>
  );
}

export default SummaryCard