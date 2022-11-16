import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { SummaryCardContainer, SummaryCardTitle } from './styledComponents';

const SummaryCard = (props:any) => {
    const {
        matchTitle,
        matchTime,
      gridData,
        to,
    } = props?.data;
  return (
    <SummaryCardContainer>
      <Link to={to} >

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
        </Link>
    </SummaryCardContainer>
  );
}

export default SummaryCard