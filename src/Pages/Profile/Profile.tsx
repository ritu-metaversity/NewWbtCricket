import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { LoaderContext } from "../../App";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import { TitleStyled } from "../../components/custom/styledComponents";
import { userServices } from "../../utils/api/user/services";

const gridItemProps = {
  item: true,
  xs: 4,
  border: "1px solid #d9d9d9",
  p: 1,
  display: "flex",
  alignItems: "center",
};

const Profile = () => {
  const [prolile, setProfile] = React.useState<any>([]);
  const { setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getProfile = async () => {
      if (!prolile?.userId) {
        setLoading && setLoading((prev) => ({ ...prev, getProfile: true }));
        const { response } = await userServices.profile();
        if (response?.data) {
          setProfile(response.data);
        }
      }
      setLoading && setLoading((prev) => ({ ...prev, getProfile: false }));
    };

    getProfile();
    return () => {};
  }, [prolile, setLoading]);

  return (
    <Box p={0.5} fontWeight={700} mx="auto">
      <BacktoMenuButton />
      {/* <TitleStyled>rate information</TitleStyled>
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
        </Grid> */}
      {/* <Grid {...gridItemProps}>
          <Button color="success" fullWidth variant="contained">
            Update
          </Button>
        </Grid> */}
      {/* </Grid> */}

      <TitleStyled>personal information</TitleStyled>
      <Grid container columns={8} mb={4} bgcolor="white">
        <Grid {...gridItemProps}>Client Code:</Grid>
        <Grid {...gridItemProps}>{prolile?.userId}</Grid>
        <Grid {...gridItemProps}>Client Name:</Grid>
        <Grid {...gridItemProps}>{prolile?.username}</Grid>
        <Grid {...gridItemProps}>Contact No:</Grid>
        <Grid {...gridItemProps}>{prolile?.mobile}</Grid>
        <Grid {...gridItemProps}>Date of Joining:</Grid>
        <Grid {...gridItemProps}>{prolile?.doj}</Grid>
        <Grid {...gridItemProps}>Address:</Grid>
        <Grid {...gridItemProps}>{prolile?.city}</Grid>
        {/* {gridData.map((item: any) => (
          <>
            <Grid {...gridItemProps} color={item?.color}>
              {item?.title}
            </Grid>
            <Grid {...gridItemProps} color={item?.color}>
              {item?.value}
            </Grid>
          </>
        ))} */}
      </Grid>

      {/* <TitleStyled>personal information</TitleStyled>
      <Grid container columns={8}>
        <Grid {...gridItemProps}>HELP LINE NO: </Grid>
        <Grid {...gridItemProps}></Grid>
      </Grid> */}
      {/* <StickyHeadTable title="rate information" rows={[]} columns={[]} /> */}
      {/* <BacktoMenuButton /> */}
    </Box>
  );
};

export default Profile;
