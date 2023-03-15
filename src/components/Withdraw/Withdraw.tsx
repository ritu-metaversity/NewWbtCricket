import { WithdrawForm } from "./WithdrawForm";
import React, { useContext, useEffect, useState } from "react";
import { columns } from "./columns";
import { Box } from "@mui/material";
import { userServices } from "../../utils/api/user/services";
import { StatusTypography } from "../Deposit";
import StickyHeadTable from "../custom/Table";
import { LoaderContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const nav = useNavigate();
  const [withdrawList, setWithdrawList] = useState([]);
  const getWithdrawList = async () => {
    const { response } = await userServices.getWithdrawList();
    if (response.data) {
      setWithdrawList(response.data);
    }
  };

  const { appData } = useContext(LoaderContext);

  useEffect(() => {
    if (appData && appData?.selfAllowed === false) {
      nav("/");
    }
  }, [appData]);

  useEffect(() => {
    getWithdrawList();

    return () => {
      setWithdrawList([]);
    };
  }, []);

  return (
    <Box
      sx={{
        textAlign: "left",
        py: 2,
        // backgroundColor: ,
      }}
    >
      <Box mx={2}>
        <WithdrawForm getWithdrawList={getWithdrawList} />
      </Box>

      <StickyHeadTable
        columns={columns}
        rows={
          withdrawList.map((item: any) => {
            item.status = <StatusTypography status={item.status} />;
            return item;
          }) || []
        }
      />
    </Box>
  );
};

export default Withdraw;
