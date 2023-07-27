import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TitleStyled } from "../../components/custom/styledComponents";
import { userServices } from "../../utils/api/user/services";
import { LoaderContext } from "../../App";
import "./setButtonValue.css"
const GridItemProps = {
  item: true,
  xs: 6,
  md: 3,
  sx: { textAlign: "center" },
};
const SetButtonValue = () => {
  const [buttonValue, setButtonValue] = useState<{ [x: string]: number }>({
    stack1: 0,
    stack2: 0,
    stack3: 0,
    stack4: 0,
    stack5: 0,
    stack6: 0,
    stack7: 0,
    stack8: 0,
    stack9: 0,
    stack10: 0,
  });

  const handleChange = (e: any) => {
    const buttons = { ...buttonValue };
    if (e.target.value < 100000000)
      setButtonValue({ ...buttons, [e.target.name]: e.target.value });
  };
  const { setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getButtonValue = async () => {
      setLoading && setLoading((prev) => ({ ...prev, getButtonValue: true }));
      const { response } = await userServices.getButtonValue();
      if (response?.data) {
        setButtonValue(response.data);
      }
      setLoading && setLoading((prev) => ({ ...prev, getButtonValue: false }));
    };
    getButtonValue();
    return () => { };
  }, [setLoading]);

  const handleClick = async (e: any) => {
    setLoading && setLoading((prev) => ({ ...prev, SubmitButtonValue: true }));
    await userServices.updateButtonValue(buttonValue);
    setLoading && setLoading((prev) => ({ ...prev, SubmitButtonValue: false }));
  };
  return (
    <Box mx="auto" my={{ sx: 0, md: 4 }}>
      <TitleStyled variant="h6">Change Button Value</TitleStyled>
      <Grid container rowGap={3} my={3} style={{
        padding: "0px 40px 0px 0px", display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexDirection: "column"
      }}>
        {Object.keys(buttonValue).map((item, index) => {
          return (
            <div className="main_stack">

              <button className="btn_stack">{"Stack " + (index + 1)}</button>


              <input
                onChange={handleChange}
                name={item}
                value={buttonValue[item]}
              />

            </div>
          );
        })}
      </Grid>
      <button
        className="btn_save"
        onClick={handleClick}
      >
        {" "}
        Submit
      </button>
    </Box>
  );
};

export default SetButtonValue;
