import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const TitleStyled = styled(Typography)({
  backgroundColor: "#00FFFF",
  fontWeight: 700,
  padding: 8,
  textTransform: "uppercase",
  color: "#00F",
});

export const TableCellText = styled(Typography)({
  fontSize: "0.7rem",
  fontWeight: 600,
});

export const TableHeadText = styled(Typography)({
  fontSize: "0.8rem",
  fontWeight: 700,
});

export const TableResultContainer = styled(Box)({
  textAlign: "center",
  padding: 5,
  fontSize: "0.8rem",
  fontWeight: 700,
});
