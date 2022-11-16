import { Box } from "@mui/material";
import React from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import StickyHeadTable from "../../components/custom/Table";

export interface Column {
  id: "matchName" | "wonBy" | "won" | "lost" | "balance" | string;
  label: string;
  minWidth?: number;
    align?: "right" | "center";
    colorCoded?: boolean;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sr", label: "Sr.", minWidth: 30 },
  { id: "date", label: "Date", align: "center", minWidth: 120 },
  {
    id: "won",
    label: "Credit",
    minWidth: 20,
    align: "right",
    colorCoded: true,
  },
  {
    id: "lost",
    label: "Debit",
    minWidth: 20,
    align: "right",
    colorCoded: true,
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 20,
    align: "right",
    colorCoded: true,
  },
  { id: "remark", label: "Remark", align: "center", minWidth: 120 },
];

interface Data {
  sr: number;
  date: string;
  won: number;
  remark: string;
  lost: number;
  balance: number;
}

function createData(remark: string, won: number, lost: number): Data {
  const sr = 1;
  const date = new Date().toDateString();
  const balance = won + lost;
  return { sr, remark, date, won, lost, balance };
}

const rows = [
  createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
  createData("SYDNEY SIXERS W 15/10/2022", 44, -300),
];

const Account = () => {
  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <BacktoMenuButton />
      <StickyHeadTable
        rows={rows}
        columns={columns}
        title={"Account Summary"}
      />
    </Box>
  );
};

export default Account;
