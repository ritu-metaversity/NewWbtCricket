import styled from "@emotion/styled";
import {
  Button,
  Paper,
  Theme,
  Typography,
  TypographyProps,
  TypographyTypeMap,
} from "@mui/material";
import { Box } from "@mui/system";

const HeaderStyleProps: any = {
  fontWeight: "800",
  color: " white",
  fontSize: "1.8rem",
  textAlign: "center",
};
export const HeaderStyle = styled(Typography)(HeaderStyleProps);
export const FooterStyle = styled(Typography)({
  ...HeaderStyleProps,
  fontSize: "1.5rem",
});

export const WelcomeModalBodyP = styled(Typography)({
  textAlign: "center",
  margin: "1em",
  lineHeight: 1.6,
  fontSize: "0.7rem",
  letterSpacing: 0.8,
  fontWeight: 800,
});

export const TermsHeader = styled(Box)({
  backgroundColor: "#FF471A",
  fontSize: "1.4rem",
  color: "white",
  padding: 20,
  wordSpacing: 1.2,
  fontWeight: 800,
});

export const TermsContainer = styled(Box)({
  padding: 10,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  gap: 10,
  backgroundColor: "#ddd",
});

export const TermsListContainer = styled(Box)({
  backgroundColor: "white",
  fontWeight: 600,
  wordSpacing: 0,
  fontSize: "0.9rem",
  lineHeight: 2,
  paddingRight: 10,
});

export const TermsFooter = styled(Box)({
  backgroundColor: "#ddd",
  position: "sticky",
  bottom: 0,
  marginTop: "auto",
  padding: "10px 0",
});

export const TermsContinueButton = styled(Button)({
  padding: 15,
  fontSize: "1.3rem",
  width: "100%",
});
