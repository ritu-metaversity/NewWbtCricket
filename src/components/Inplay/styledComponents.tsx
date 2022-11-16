import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const SummaryCardTitle = styled(Typography)({
  // width: "100%",
  backgroundColor: "secondary",
  padding: 10,
  marginBottom: 5,
  fontSize: "0.8rem",
  fontWeight: "bold",
    color: "white",
  borderRadius: "   10px 10px  0 0",
});

export const SummaryCardContainer = styled(Box)({
    backgroundColor: "#ddd",
    textAlign: "center",
    marginBlock: 10,
    border: "1px dashed #000",
    borderRadius: "10px",
})