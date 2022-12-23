import { Box } from "@mui/system";
import React, { useEffect } from "react";
import StickyTable from "../custom/TableWithoutPagination";
import { sportServices } from "../../utils/api/sport/services";
export interface Column {
  id: "matchName" | "wonBy" | "won" | "lost" | "balance" | string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sr", label: "Sr.", align: "right" },
  { id: "rate", label: "Rate", align: "right" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "back", label: "Mode", align: "right" },
  { id: "nation", label: "Team", align: "center" },
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
  { id: "nation", label: "Rate", align: "center" },
  { id: "rate", label: "Session", align: "center" },
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

const BetRecord = (props: { item: any; }) => {
  const [betRecord, setBetRecord] = React.useState<any>();
  useEffect(() => {
    const getList = async () => {
      const { response } = await sportServices.betListByMatchId(31846653);
      if (response?.data) {
        setBetRecord(response.data)
      }
    };
    getList();
  }, []);
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {betRecord && Object.keys(betRecord).map(key => <StickyTable
        rows={betRecord[key].map((value: any, index: string) => 
          
          { value.color = (value.back ? "#72BBEF" : "#F994BA"); value.back = (value.back ? "Lagai" : "Khayi");
           value.sr = index + 1;
          
            return value 
          })}

        columns={columns}
        title={key}
        accordion
      />
      )}
    </Box>
  );
};

export default BetRecord;
