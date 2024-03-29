import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyledAmountInput, StyledButtonSmall } from "./styledComponents";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Typography } from "@mui/material";
import axios from "axios";
// import { colorHex } from "../../utils/constants";
import "./Deposite.css"
let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const buttonAmountArr = [100, 500, 1000, 5000];
interface Props {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}
export function AmountForm({ amount, setAmount }: Props) {
  const handleMinusClick = () => {
    setAmount((prev) => (prev - 10 > 100 ? prev - 10 : 100));
  };
  const handlePlusClick = () => {
    setAmount((prev) => (prev + 10 > 100 ? prev + 10 : 100));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Math.abs(Math.floor(Number(e.target.value)))) {
      setAmount(Math.abs(Math.floor(Number(e.target.value))));
    } else if (e.target.value === "") {
      setAmount(0);
    }
  };
  const [stackValue, setStackValue] = useState([]);

  useEffect(() => {
    const TokenId = localStorage.getItem("token");

    axios
      .post(
        `${REACT_APP_API_URL}/request-stack`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TokenId}`,
          },
        }
      )
      .then((res: any) => {
        setStackValue(res?.data?.data);
        console.log(res?.data?.data);
      });
  }, [])
  console.log(stackValue, "adsasdasdas")
  return (
    <>
      {amount < 100 && amount !== 0 && (
        <Typography textAlign={"left"} color="error.main">
          Amount Should be more than or equal to 100.
        </Typography>
      )}
      <Box
        display={"flex"}
        marginY={2}
        flexDirection={{
          xs: "column",
          md: "row",
        }}
        alignItems={{
          xs: "center",
          md: "flex-end",
        }}
        gap={1}
        rowGap={5}
      >

        <div className="main_for_enter_amount">
          <div className="name_enter_amount" > <span className="name_enter_amount">Enter Amount</span></div>
          <div className="field_for_enter_amount">
            <RemoveIcon onClick={handleMinusClick} style={{ height: "30px", color: "#fff", border: "2px solid black", backgroundColor: "black", cursor: "pointer" }} />
            <StyledAmountInput
              type="text"
              placeholder="Amount"
              value={amount || ""}
              onChange={handleChange}
              className="field_for_enter_amount"
              style={{ border: "solid 1px", height: "30px" }}
            />
            <AddIcon onClick={handlePlusClick} style={{ height: "30px", color: "#fff", border: "2px solid black", backgroundColor: "black", cursor: "pointer" }} />
          </div>
        </div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: '100px' }}>
          {stackValue.map((value: any, index) => (
            <StyledButtonSmall
              // style={{ padding: "0px 0px 7px" }}
              key={`${value.key}-button-${value.value}-${index}`}
              onClick={() => setAmount((o) => o + value?.value)}
            >
              {value?.key}
            </StyledButtonSmall>
          ))}
        </Box>
      </Box>
    </>
  );
}
