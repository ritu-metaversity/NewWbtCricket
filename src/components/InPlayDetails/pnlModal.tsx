import { Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { inPlayDetailServices } from "../../utils/api/inplayDetails/services";
import StickyHeadTable from "../custom/Table";
import "./pnlll.css"
interface Props {
  fancyId: string;
  matchId: string;
  dadadada: any
}
const PnlModal: FC<Props> = ({ fancyId, matchId, dadadada }) => {
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

    <div className="main_for_pnl">
      {pnlBook.length <= 0 ?
        <div style={{ height: "30vh" }}>
          <div style={{ color: "red" }}>No bet found</div>
        </div>
        :
        <>
       
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <table className="" style={{ width: "100% ", border: "1px solid", overflowY: 'scroll' }}>
              <tbody>
                <>

                  <tr >

                    <td className="headerrunname">
                      Run
                    </td>
                    <td className="headerrunname">
                      Amount
                    </td>
                  </tr>
                  {pnlBook?.map((item) => {
                    return (

                      <tr>
                        <td className="headerrunnamedata">
                          {item?.odds}
                        </td>
                        <td className="headerrunnamedata" >
                          <span style={{ color: item.pnl >= 0 ? "green" : "red" }}>
                            {item.pnl}
                          </span>
                        </td>
                      </tr>)
                  })}

                </>
              </tbody>

            </table>
          </div>
        </>
      }

      {/* <StickyHeadTable
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
    /> */}
    </div>

  );
};

export default PnlModal;
