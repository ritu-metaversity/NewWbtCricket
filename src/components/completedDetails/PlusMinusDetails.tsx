import { Grid, Paper } from "@mui/material";
import React from "react";
import { TableResultContainer, TitleStyled } from "../custom/styledComponents";

const details = [
  {
    title: "Match Session Plus Minus",
    value: -95,
    withText: true,
  },
  {
    title: "My Commission",
    value: 30,
    withText: false,
  },
  {
    title: "Amount After Commission",
    value: -95,
    withText: true,
  },
  {
    title: "Mob. App. Charges",
    value: -20,
    withText: true,
  },
  {
    title: "Net Plus Minus",
    value: 95,
    withText: true,
  },
];
const PlusMinusDetails = () => {
  return (
    <Grid container gap={3} my={4}>
      {details.map((item) => (
        <Grid m="auto" item xs={12} sm={5.7} md={3.78} justifyContent="center">
          <Paper elevation={3}>
            <TitleStyled>{item.title}</TitleStyled>
            <TableResultContainer
              color={item.value < 0 ? "red" : "success.main"}
            >
              {item.withText
                ? `You  ${
                    (item.value < 0 ? " lost " : " won ") + item.value
                  } coins.`
                : item.value}
            </TableResultContainer>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlusMinusDetails;
