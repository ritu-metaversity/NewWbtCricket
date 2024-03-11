import { Box, Grid, responsiveFontSizes, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoaderContext } from "../../App";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import { TitleStyled } from "../../components/custom/styledComponents";
import { userServices } from "../../utils/api/user/services";
import './profile.css'
const gridItemProps = {
  item: true,
  xs: 4,
  border: "1px solid #ccc",
  p: 0.8,
  display: "flex",
  alignItems: "center",
  fontSize: "13px"
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
    return () => { };
  }, [prolile, setLoading]);

  return (
    <Box p={0.5} fontWeight={700} mx="auto">
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

      <Typography component='p' textTransform={'uppercase'} padding="2px" className="personalinfo" >RATE INFORMATION</Typography>
      <Grid container columns={12} bgcolor="white">
        <Grid {...gridItemProps} >Rate Difference :	</Grid>
        <Grid {...gridItemProps} className="rateinfo"><select>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select></Grid>
        <Grid {...gridItemProps}><button type="button" className="btnprofilebtnnn"><div className="conmanybtn_profile">UPDATE</div></button></Grid></Grid>

      <Typography component='p' textTransform={'uppercase'} padding="2px" className="personalinfo" ><div className="conmanybtn_profile">personal information </div></Typography>

      <Grid container columns={8} mb={4} bgcolor="white">
        <Grid {...gridItemProps} >Client Code:</Grid>
        <Grid {...gridItemProps}>{prolile?.userId}</Grid>
        <Grid {...gridItemProps}>Client Name:</Grid>
        <Grid {...gridItemProps}>{prolile?.username}</Grid>
        <Grid {...gridItemProps}>Contact No:</Grid>
        <Grid {...gridItemProps}>{prolile?.mobile}</Grid>
        <Grid {...gridItemProps}>Date of Joining:</Grid>
        <Grid {...gridItemProps}>{prolile?.doj}</Grid>
        <Grid {...gridItemProps}>Address:</Grid>
        <Grid {...gridItemProps}>{prolile?.city}</Grid>
        <Grid {...gridItemProps}>Amount(INR):</Grid>
        <Grid {...gridItemProps}>{prolile?.balance}</Grid>{" "}
        <Grid {...gridItemProps}>Win:</Grid>
        <Grid {...gridItemProps}>{Number(prolile?.win).toFixed(2)}</Grid>{" "}
        <Grid {...gridItemProps}>Exposure:</Grid>
        <Grid {...gridItemProps}>{Number(prolile?.exposure).toFixed(2)}</Grid>
        <Typography component='p' textTransform={'uppercase'} padding="2px" width={"100%"} className="personalinfo" ><div className="conmanybtn_profile">COMPANY INFORMATION</div></Typography>
        <Grid {...gridItemProps}>HELP LINE NO :</Grid>
        <Grid {...gridItemProps}>	+91-1234567890</Grid>

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
      <Typography component='p' textTransform={'uppercase'} height={24} padding="2px" width={"100%"} className="personalinfo" ><Link to="/" className="back_btn_profile" >BACK TO MAIN MENU</Link></Typography>

      {/* {<BacktoMenuButton />} */}

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
