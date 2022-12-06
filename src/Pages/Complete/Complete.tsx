import { Box } from "@mui/system";
import React from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import SummaryCard from "../../components/Inplay/SummaryCard";

const data = {
  matchName: "SYDNEY SIXERS W V MELBOURNE RENEGADES W (WBBL T-20)",
  openDate: "2022-11-10 09:30:00",
  to: "/completed-details",

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
      title: "Won By: ",
      value: "nil",
    },

    {
      title: "Lost Coin: ",
      value: -500,
      color: "error.light",
    },
  ],
};

const Complete = () => {
  return (
    <div>
      <Box maxWidth={900} mx="auto">
        <BacktoMenuButton />
        {/* <SummaryCard data={data} />
        <SummaryCard data={data} />
        <SummaryCard data={data} /> */}
      </Box>
    </div>
  );
};

export default Complete;
