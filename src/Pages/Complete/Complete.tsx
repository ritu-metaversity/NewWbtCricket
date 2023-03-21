import { Box, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext } from "react";
import StickyTable from "../../components/custom/TableWithoutPagination";
import { ProfitLossPayload, userServices } from "../../utils/api/user/services";
import { LoaderContext } from "../../App";
import moment from "moment";
import Filter from "./Filter";
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
const Complete = () => {
  const [countPage, setCount] = React.useState(1);

  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(1, "month").format("YYYY-MM-DD");
  const currentValue = moment().format("YYYY-MM-DD");

  const [formData, setFormData] = React.useState<ProfitLossPayload>({
    fromDate: defaultValue,
    toDate: currentValue,
    sportId: 1,
    matchId: "",
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
    userId: "",
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

  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <BacktoMenuButton />

      <Filter
        setFormData={setFormData}
        formData={formData}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <br />
      <br />

      {accountStatement?.length > 0 ? (
        <>
          {" "}
          <StickyTable
            rows={accountStatement}
            columns={columns}
            title={"Account Summary"}
            // noOfRecords={formData.noOfRecords}
          />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={countPage ? countPage * formData.noOfRecords : -1}
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
      ) : (
        !loading.getListdata && (
          <Typography mt="15vh" variant="h4" color="error">
            {"No Data Found"}
          </Typography>
        )
      )}
    </Box>
  );
};

export default Complete;
