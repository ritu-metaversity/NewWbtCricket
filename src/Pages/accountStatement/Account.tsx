import { Box, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect } from "react";
import StickyTable from "../../components/custom/TableWithoutPagination";
import { ProfitLossPayload, userServices } from "../../utils/api/user/services";
import { LoaderContext } from "../../App";
import moment from "moment";
import Filter from "../Complete/Filter";
import BacktoMenuButton from "../../components/BacktoMenuButton";

interface ProfitLossData {
  pnl: string;
  uplineAmount: string;
  downLineAmount: number | null;
  commssionMila: string;
  commssionDiya: string;
  matchId: string;
  matchName: string;
}
export interface Column {
  id:
  | "pnl"
  | "uplineAmount"
  | "downLineAmount"
  | "commssionMila"
  | "commssionDiya"
  | "matchName"
  | "matchId";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  colorCoded?: boolean;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "matchId", label: "Id", align: "center", minWidth: 120 },
  { id: "pnl", label: "Pnl.", minWidth: 30, align: "center", colorCoded: true },
  // { id: "uplineAmount", label: "uplineAmount", align: "center", minWidth: 120 },
  // {
  //   id: "downLineAmount",
  //   label: "downLineAmount",
  //   minWidth: 20,
  //   align: "right",
  //   colorCoded: true,
  // },
  {
    id: "commssionMila",
    label: "commssionMila",
    minWidth: 20,
    align: "center",
    colorCoded: true,
  },
  // {
  //   id: "commssionDiya",
  //   label: "commssionDiya",
  //   minWidth: 20,
  //   align: "right",
  //   colorCoded: true,
  // },
  {
    id: "matchName",
    label: "Name",
    minWidth: 20,
  },
];
const Account = () => {
  const [countPage, setCount] = React.useState(1);

  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(7, "days").format("YYYY-MM-DD");
  const currentValue = moment().format("YYYY-MM-DD");

  const [formData, setFormData] = React.useState<ProfitLossPayload>({
    fromDate: defaultValue,
    toDate: currentValue,
    sportId: "4",
    matchId: "",
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
    userId: "",
    tabId: 0,
  });

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((preState) => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      };
    });
  }

  const [accountStatement, setAccountStatement] = React.useState<
    ProfitLossData[]
  >([]);
  const { loading, setLoading } = useContext(LoaderContext);

  const handleClick = () => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
      const { response } = await userServices.profitLoss(formData);
      if (response?.data) {
        setAccountStatement(response.data.market);
        setCount(response.data.totalRecord);
      } else {
        setAccountStatement([]);

      }
      setLoading && setLoading((prev) => ({ ...prev, getListdata: false }));
    };
    getList();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((preState) => {
      return {
        ...preState,
        noOfRecords: +Number(event.target.value),
        index: 0,
      };
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (formData.index < countPage)
      setFormData((preState) => {
        return { ...preState, index: newPage };
      });
  };

  useEffect(() => {
    handleClick()
  }, [formData.tabId])

  console.log(accountStatement, "accountStatementaccountStatement")
  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }} style={{ padding: "0px 0px 50px 0px" }}>
      <BacktoMenuButton />

      <Filter
        setFormData={setFormData}
        formData={formData}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <br />
      <br />


      <>
        {" "}
        {/* <StickyTable
            rows={accountStatement}
            columns={columns}
            title={""}
          /> */}
        <table className="" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th colSpan={5} className="bet-place-tbl-th market_type_row ">
                MY LEDGER
              </th>
            </tr>
          </thead>
        </table>
        <div className="content-top-padding" >
          <div style={{ width: "100%", overflow: "scroll" }}>

            <table className="" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th className="ldg-tbl-th match-box-color" style={{ width: "50%" }}>
                    DESCRIPTION
                  </th>
                  <th className="ldg-tbl-th match-box-color">WON BY</th>
                  <th className="ldg-tbl-th match-box-color">WON</th>
                  <th className="ldg-tbl-th match-box-color">LOST</th>
                  <th className="ldg-tbl-th match-box-color">HISAB</th>
                  {/* <th className="ldg-tbl-th match-box-color">WON</th>
                  <th className="ldg-tbl-th match-box-color">LOST</th>
                  <th className="ldg-tbl-th match-box-color">HISAB</th> */}
                </tr>
              </thead>
              <tbody style={{ fontSize: 12 }}>
                {accountStatement?.length > 0 ?
                  (accountStatement.map((item: any) =>
                    <tr>
                      <td
                        className="ldg-tbl-td match-value-box-color"
                        style={{ textAlign: "left" }}
                      >
                        {/* <a href="/"> */}
                        {item?.matchName}
                        {/* </a> */}
                      </td>
                      <td
                        className="ldg-tbl-td match-value-box-color"
                        style={{ textAlign: "center" }}
                      >
                        N/A
                      </td>
                      <td
                        className="ldg-tbl-td match-value-box-color"
                        style={{ textAlign: "center" }}
                      >
                        {item?.pnl < 0 ? 0 : JSON.parse(item?.pnl).toFixed(2)}
                      </td>

                      <td
                        className="ldg-tbl-td match-value-box-color"
                        style={{ textAlign: "center" }}
                      >
                        {item?.pnl > 0 ? 0 : JSON.parse(item?.pnl).toFixed(2)}
                      </td>
                      {item?.pnl < 0 ?

                        (<td className="ldg-tbl-td match-value-box-color" style={{ color: "red", textAlign: "center" }}>{JSON.parse(item?.pnl).toFixed(2)}</td>) :

                        (<td className="ldg-tbl-td match-value-box-color" style={{ color: "green", textAlign: "center" }}>{JSON.parse(item?.pnl).toFixed(2)}</td>)
                      }
                      {/* <td className="ldg-tbl-td match-value-box-color">0</td>
                    <td className="ldg-tbl-td match-value-box-color">190</td>
                    <td className="ldg-tbl-td match-value-box-color">-190</td> */}
                    </tr>))
                  :
                  (!loading.getListdata && (
                    <tr >
                      <td
                        className="ldg-tbl-td match-value-box-color"
                        colSpan={5}
                      >

                        <span style={{ color: "red", fontSize: "14px" }}>

                          No Data Found
                        </span>

                      </td>
                    </tr>
                  )
                  )}

              </tbody>
            </table>
          </div>

        </div>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countPage ? countPage : -1}
          rowsPerPage={formData.noOfRecords}
          page={formData.index}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={<span>Rows: </span>}
          labelDisplayedRows={({ page }) => {
            return `Page : ${page + 1}`;
          }}
        />
      </>

    </Box>
  );
};

export default Account;