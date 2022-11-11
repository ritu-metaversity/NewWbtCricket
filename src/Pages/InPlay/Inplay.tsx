import { Box } from '@mui/material'
import React from 'react'
import BacktoMenuButton from '../../components/BacktoMenuButton'
import SummaryCard from '../../components/Inplay/SummaryCard'


const data = {
  matchTitle: "SYDNEY SIXERS W V MELBOURNE RENEGADES W (WBBL T-20)",
  matchTime: "2022-11-10 09:30:00",
  gridData: [
    {
      title: "Match Bets: ",
      value: 0,
    },
    {
      title: "Session Bets: ",
      value: 0,
    },
    {
      title: "Declared: ",
      value: "No",
    },
    {
      title: "Won By: ",
      value: "nil",
    },
  ],
};
const Inplay = () => {
  return (
    <Box maxWidth={900} mx="auto">
      <BacktoMenuButton />
      <SummaryCard data={data} />
      <SummaryCard data={data} />
      <SummaryCard data={data} />
    </Box>
  );
}

export default Inplay