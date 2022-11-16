import { Typography } from "@mui/material";
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
  { id: "rate", label: "Rate", align: "center" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "mode", label: "Mode", align: "right" },
  { id: "team", label: "Team", align: "center" },
  { id: "team1", label: "Team 1", align: "right" },
  { id: "team2", label: "Team 2", align: "right" },
];

interface Data {
  team: string;
  amount: number;
  rate: number;
  mode: string;
  team1: number;
  team2: number;
}

function createData(
  team: string,
  mode: string,
  rate: number,
  amount: number,
  team1: number,
  team2: number
): Data {
  return { mode, team, amount, rate, team1, team2 };
}

const rows = [
  createData("ADELAIDE STRIKERS W", "L", 0.04, 30, -100, 15),
  createData("ADELAIDE STRIKERS W", "L", 44, 30, 150, 300),
];

const columns2: readonly Column[] = [
  { id: "session", label: "Session", align: "center" },
  { id: "rate", label: "Rate", align: "center" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "run", label: "Run", align: "right" },
  { id: "mode", label: "Mode", align: "center" },
  { id: "dec", label: "Dec", align: "center" },
];

interface Data2 {
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
  return { mode, session, dec, run, amount, rate };
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
        result={
          <Typography color={"success.main"} fontSize="inherit" fontWeight={"inherit"}>
            You Lost -100
          </Typography>
        }
      />
      <StickyTable
        rows={rows2}
        columns={columns2}
        title={"Session Bets"}
        result={
          <Typography color={"red"} fontSize="inherit" fontWeight={"inherit"}>
            You Won 15
          </Typography>
        }
      />
    </Box>
  );
};

export default BetRecord;
