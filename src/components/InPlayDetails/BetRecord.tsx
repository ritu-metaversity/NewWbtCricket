import { Box } from "@mui/system";
import React, { memo, useEffect } from "react";
import StickyTable from "../custom/TableWithoutPagination";
import { inPlayDetailServices } from "../../utils/api/inplayDetails/services";

export interface Column {
  id: "matchName" | "wonBy" | "won" | "lost" | "balance" | string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sr", label: "Sr.", align: "center" },
  { id: "rate", label: "Rate", align: "center" },
  { id: "amount", label: "Amount", align: "center" },
  { id: "back", label: "Mode", align: "center" },
  { id: "nation", label: "Team", align: "center" },
];

const BetRecord = (props: { item: any }) => {
  const [betRecord, setBetRecord] = React.useState<any>();
  useEffect(() => {
    const getList = async () => {
      const { response } = await inPlayDetailServices.betListByMatchId(
        props.item
      );
      if (response?.data) {
        setBetRecord(response.data);
      }
    };
    getList();
  }, [props.item]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {betRecord &&
        Object.keys(betRecord).map((key) => (
          <StickyTable
            rows={betRecord[key].map((value: any, index: string) => {
              value.color = value.back ? "#b3d9f5" : "#f5bad0";
              value.back = value.back ? "Lagai" : "Khayi";
              value.sr = index + 1;

              return value;
            })}
            columns={columns}
            title={key}
            accordion
          />
        ))}
    </Box>
  );
};

export default memo(BetRecord);
