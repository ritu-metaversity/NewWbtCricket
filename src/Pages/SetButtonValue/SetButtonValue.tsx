import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TitleStyled } from "../../components/custom/styledComponents";

const GridItemProps = {
  item: true,
  xs: 6,
  md: 3,
  sx: { textAlign: "center" },
};
const GridValue = [
  {
    title: "Button Value 1",
    value: 10,
  },
  {
    title: "Button Value 2",
    value: 10,
  },
  {
    title: "Button Value 3",
    value: 10,
  },
  {
    title: "Button Value 4",
    value: 10,
  },
  {
    title: "Button Value 5",
    value: 10,
  },
  {
    title: "Button Value 6",
    value: 10,
  },
  {
    title: "Button Value 7",
    value: 10,
  },
  {
    title: "Button Value 8",
    value: 10,
  },
  {
    title: "Button Value 9",
    value: 10,
  },
  {
    title: "Button Value 10",
    value: 10,
  },
];
const SetButtonValue = () => {
  // const [ButtonValue, setButtonValue] = useState();
  return (
    <Box mx="auto" my={{ sx: 0, md: 4 }}>
      <TitleStyled variant="h4">Change Button Value</TitleStyled>
      <Grid container rowGap={3} my={3}>
        {GridValue.map((item) => (
          <>
            <Grid {...GridItemProps}>
              <Typography my={2}>{item.title}</Typography>
            </Grid>
            <Grid {...GridItemProps}>
              <TextField defaultValue={item.value} />
            </Grid>
          </>
        ))}
      </Grid>
      <Button variant="contained" fullWidth sx={{ p: 2, my: 2 }}>
        {" "}
        Save and Submit
      </Button>
    </Box>
  );
};

export default SetButtonValue;
