import { Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { inPlayDetailServices } from "../../utils/api/inplayDetails/services";
import StickyHeadTable from "../custom/Table";

interface Props {
  fancyId: string;
  matchId: string;
}
const PnlModal: FC<Props> = ({ fancyId, matchId }) => {
  const [pnlBook, setPnlBook] = useState<{ odds: number; pnl: any }[]>([]);

  useEffect(() => {
    const getPnlBook = async () => {
      if (!fancyId) return;
      const { response } = await inPlayDetailServices.fancyPnlBook({
        fancyId,
        matchId,
      });
      if (response?.data) {
        setPnlBook(response.data);
      }
    };
    getPnlBook();
    return () => {
      setPnlBook([]);
    };
  }, [fancyId, matchId]);

  return (
    <StickyHeadTable
      title={"Run and Amount"}
      columns={[
        { id: "odds", label: "Run" },
        { id: "pnl", label: "Amount" },
      ]}
      rows={pnlBook.map((pnlBookItem) => {
        const newItem = { ...pnlBookItem };
        newItem.pnl = (
          <Typography
            color={pnlBookItem.pnl >= 0 ? "green" : "red"}
            fontSize={"0.8rem"}
            mr={0.5}
          >
            {Number(pnlBookItem.pnl?.toFixed(2))}
          </Typography>
        );
        return newItem;
      })}
    />
  );
};

export default PnlModal;
