import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
// import { colorHex } from "../../utils/constants";

export const LabelText = styled(Typography)(({ theme }) => ({
  color: "text.secondary",
  fontSize: "0.8rem",
  textAlign: "left",
  marginBlock: 4,
}));

export const WithdrawInput = styled(TextField)(({ theme }) => ({
  // background: colorHex.bg3,
  // background: "#d2d1d1",
  outline: "none",
  // overflow: "hidden",
  display: "block",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: 167,
  },
  // width: { xs: "100%", lg: 156 },

  "& .MuiInputBase-root": {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    height: "50px",
  },
  "& .MuiSelect-select ": {
    fontSize: "0.8rem",
    background: "#d2d1d1",
    // background: colorHex.bg3,
  },
  "& input": {
    fontSize: "0.8rem",
    borderRadius: 8,
    width: "100%",
    fontWeight: 500,
    background: "#d2d1d1",
    // background: colorHex.bg3,
  },
  "& fieldset": {
    borderRadius: 8,
    border: "none",
  },
  borderRadius: 8,
}));
