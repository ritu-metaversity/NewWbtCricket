import { Box, Button, Grid, MenuItem, Select } from "@mui/material";
import React from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import { TitleStyled } from "../../components/custom/styledComponents";
import StickyHeadTable from "../../components/custom/Table";
import { Column } from "../Ledger/Ledger";

const gridItemProps = {
  item: true,
  xs: 4,
  border: "1px solid #d9d9d9",
  p: 1,
  display: "flex",
  alignItems: "center",
};
const gridData = [
  {
    title: "Client Code:",
    value: "C4545",
  },
  {
    title: "Client Name:",
    value: "Sabka Client",
  },
  {
    title: "Contact No:",
    value: "048320593490",
  },
  {
    title: "Date of Joining:",
    value: "2021-04-11 23:30:18.00",
  },
  {
    title: "Address:",
    value: "India",
  },
];
const Profile = () => {
  const handleRatingChange = (e: any) => {};
  return (
    <Box maxWidth={"lg"} p={0.5} fontWeight={700} mx="auto">
      <BacktoMenuButton />
      <TitleStyled>rate information</TitleStyled>
      <Grid container columns={12} mb={4}>
        <Grid {...gridItemProps}>Rate Difference:</Grid>
        <Grid {...gridItemProps}>
          <Select
            sx={{ m: "auto" }}
            defaultValue={"5"}
            size="small"
            onChange={handleRatingChange}
          >
            {Array.apply(null, Array(5))
              .map(function (_, i) {
                return i;
              })
              .map((item) => (
                <MenuItem value={item + 1}>{item + 1}</MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid {...gridItemProps}>
          <Button color="success" fullWidth variant="contained">
            Update
          </Button>
        </Grid>
      </Grid>

      <TitleStyled>personal information</TitleStyled>
      <Grid container columns={8} mb={4} bgcolor="white">
        {gridData.map((item: any) => (
          <>
            <Grid {...gridItemProps} color={item?.color}>
              {item?.title}
            </Grid>
            <Grid {...gridItemProps} color={item?.color}>
              {item?.value}
            </Grid>
          </>
        ))}
      </Grid>

      <TitleStyled>personal information</TitleStyled>
      <Grid container columns={8}>
        <Grid {...gridItemProps}>HELP LINE NO: </Grid>
        <Grid {...gridItemProps}></Grid>
      </Grid>
      {/* <StickyHeadTable title="rate information" rows={[]} columns={[]} /> */}
      <BacktoMenuButton />
    </Box>
  );
};

export default Profile;
