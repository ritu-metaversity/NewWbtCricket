import { Box } from "@mui/system";
import React from "react";
import StickyTable from "../custom/TableWithoutPagination";

export interface Column {
  id: "matchName" | "wonBy" | "won" | "lost" | "balance" | string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sr", label: "Sr." },
  { id: "rate", label: "Rate", align: "center" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "mode", label: "Mode", align: "right" },
  { id: "team", label: "Team", align: "center" },
];

interface Data {
  sr: number;
  team: string;
  amount: number;
  rate: number;
  mode: string;
}

function createData(
  team: string,
  mode: string,
  rate: number,
  amount: number
): Data {
  const sr = 1;
  return { sr, mode, team, amount, rate };
}

const rows = [
  createData("ADELAIDE STRIKERS W", "L", 0.04, 30),
  createData("ADELAIDE STRIKERS W", "L", 44, 30),
];

const columns2: readonly Column[] = [
  { id: "sr", label: "Sr.", align: "center" },
  { id: "rate", label: "Rate", align: "center" },
  { id: "session", label: "Session", align: "center" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "run", label: "Run", align: "right" },
  { id: "mode", label: "Mode", align: "center" },
  { id: "dec", label: "Dec", align: "center" },
];

interface Data2 {
  sr: number;
  amount: number;
  rate: number;
  mode: string;
  run: number;
  dec: number;
  session: string;
}

function createData2(
  session: string,
  mode: string,
  rate: number,
  amount: number,
  run: number,
  dec: number
): Data2 {
  const sr = 1;
  return { sr, mode, session, dec, run, amount, rate };
}

const rows2 = [
  createData2("ADELAIDE STRIKERS W", "NO", 0.04, 30, 32, 0),
  createData2("ADELAIDE STRIKERS W", "NO", 0.04, 30, 32, 0),
];

const BetRecord = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <StickyTable
        rows={rows}
        columns={columns}
        title={"Match Bets"}
        accordion
      />
      <StickyTable
        rows={rows2}
        columns={columns2}
        title={"Session Bets"}
        accordion
      />
      <StickyTable
        rows={rows}
        columns={columns}
        title={"Bookmaker Bets"}
        accordion
      />
    </Box>
  );
};

export default BetRecord;
