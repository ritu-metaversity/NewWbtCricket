import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DepositManually from "./DepositManually";
import { columns } from "./columns";
import ImageModal from "./ImageModal";
import StickyHeaderTable from "../custom/Table";
import { selfServices } from "../../utils/api/selfWithrawDeposit/service";
import { LoaderContext } from "../../App";
import { useNavigate } from "react-router-dom";

interface DepositListInterface {
  image: string;
  time: string;
  status: "Rejected" | "Pending" | "APPROVED";
  amount: number;
}

const colorStatus = {
  Rejected: "error.main",
  Pending: "warning.main",
  APPROVED: "success.main",
};

const Deposit = () => {
  const [depositList, setDepositList] = useState<DepositListInterface[]>([]);
  const nav = useNavigate();
  const { appData } = useContext(LoaderContext);

  useEffect(() => {
    if (appData && appData?.selfAllowed === false) {
      nav("/");
    }
  }, [appData]);
  const getDepositList = async () => {
    const { response } = await selfServices?.getDepositList();
    console.log(response, "deposit data");
    if (response?.data) {
      setDepositList(response?.data);
    }
  };
  const [imageSelected, setImageSelected] = useState("");

  const handleClose = () => {
    setImageSelected("");
  };
  useEffect(() => {
    getDepositList();

    return () => {
      setDepositList([]);
    };
  }, []);

  return (
    <>
      <Box
        marginX="auto"
        rowGap={5}
        position="relative"
        display={"flex"}
        flexDirection="column"
        width={{ xs: "95%" }}
        minHeight={"90vh"}
      >
        <DepositManually getDepositList={getDepositList} />
        <ImageModal
          open={Boolean(imageSelected)}
          src={imageSelected}
          handleClose={handleClose}
        />
        <StickyHeaderTable
          title="Previous Deposits "
          columns={columns}
          rows={
            depositList.map((item: DepositListInterface) => {
              const newItem: any = { ...item };
              newItem.status = <StatusTypography status={item.status} />;
              newItem.image = (
                // <a target={"_blank"} href={item.image}>
                <img
                  onClick={() => setImageSelected(item.image)}
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                  src={item.image}
                  alt="deposit_image"
                // style={{ cursor: "pointer" }}
                />
                // </a>
              );
              return newItem;
            }) || []
          }
        />
      </Box>
    </>
  );
};

export default Deposit;

export function StatusTypography({
  status,
}: {
  status: DepositListInterface["status"];
}) {
  return (
    <Typography
      sx={{
        fontSize: { xs: "0.8rem", lf: "0.9rem" },
        bgcolor: "#dedede",
        borderRadius: 1,
        p: 0.5,
        margin: "auto",
        width: "min-content",
      }}
      color={colorStatus[status]}
    >
      {status}
    </Typography>
  );
}
