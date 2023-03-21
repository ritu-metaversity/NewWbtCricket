import { Box } from "@mui/system";
import React from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import StickyHeadTable from "../../components/custom/Table";

export interface Column {
  id: "matchName" | "wonBy" | "won" | "lost" | "balance" | string;
  label: string;
  minWidth?: number;
  colorCoded?: boolean;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "matchName", label: "Match Name", minWidth: 120 },
  { id: "wonBy", label: "Won By", align: "center", minWidth: 50 },
  {
    id: "won",
    label: "Won",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "lost",
    label: "Lost",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  matchName: string;
  wonBy: string;
  won: number;
  lost: number;
  balance: number;
}

function createData(
  matchName: string,
  wonBy: string,
  won: number,
  lost: number
): Data {
  const balance = won - lost;
  return { matchName, wonBy, won, lost, balance };
}

const rows = [
  createData(
    "ADELAIDE STRIKERS W V SYDNEY SIXERS W (WBBL T-20) 15/10/2022",
    "ADELAIDE STRIKERS W",
    44,
    30
  ),
  createData(
    "ADELAIDE STRIKERS W V SYDNEY SIXERS W (WBBL T-20) 15/10/2022",
    "ADELAIDE STRIKERS W",
    44,
    30
  ),
  createData(
    "ADELAIDE STRIKERS W V SYDNEY SIXERS W (WBBL T-20) 15/10/2022",
    "ADELAIDE STRIKERS W",
    44,
    30
  ),
  createData(
    "NAMIBIA V NETHERLAND (T=20) 18/10/2022",
    "ADELAIDE STRIKERS W",
    44,
    30
  ),
  createData(
    "ADELAIDE STRIKERS W V SYDNEY SIXERS W (WBBL T-20) 15/10/2022",
    "ADELAIDE STRIKERS W",
    44,
    30
  ),
];

const Ledger = () => {
  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <BacktoMenuButton />
      <StickyHeadTable rows={rows} columns={columns} title={"MY LEDGER"} />
    </Box>
  );
};

export default Ledger;
