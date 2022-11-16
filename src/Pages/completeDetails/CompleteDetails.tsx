import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import BetRecord from "../../components/completedDetails/BetRecord";
import PlusMinusDetails from "../../components/completedDetails/PlusMinusDetails";

const CompleteDetails = () => {
  return (
    <Box>
      <Typography
        my={1}
        p={1}
        color="white"
        fontWeight={700}
        borderRadius="10px"
        fontSize="1.1rem"
        bgcolor={"secondary.light"}
      >
        3015 SYDNEY THUNDER W V MELBOURNE RENEGADES W (WBBL T-20) 2022-11-15
        13:40:00
      </Typography>
      <BetRecord />
      <PlusMinusDetails />
    </Box>
  );
};

export default CompleteDetails;
