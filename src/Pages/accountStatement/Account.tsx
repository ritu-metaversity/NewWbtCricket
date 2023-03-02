import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { border } from "@mui/system";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect } from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import StickyHeadTable from "../../components/custom/Table";
import StickyTable from "../../components/custom/TableWithoutPagination";
import { userServices } from "../../utils/api/user/services";
import { LoaderContext } from "../../App";
import moment from "moment";

export interface Column {
  id: "matchName" | "wonBy" | "won" | "lost" | "balance" | string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  colorCoded?: boolean;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sno", label: "Sr.", minWidth: 30 },
  { id: "date", label: "Date", align: "center", minWidth: 120 },
  {
    id: "credit",
    label: "Credit",
    minWidth: 20,
    align: "right",
    colorCoded: true,
  },
  {
    id: "debit",
    label: "Debit",
    minWidth: 20,
    align: "right",
    colorCoded: true,
  },
  {
    id: "pts",
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

const Account = () => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  };
  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    marginRight: " 8px",
    width: "100%",
    maxWidth: "200px",
  };
  const [countPage, setCount] = React.useState();

  const lableStyle = { alignSelf: "center" };
  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(1, "month").format("YYYY-MM-DD");
  const current = new Date();
  const currentValue = moment().format("YYYY-MM-DD");

  const [formData, setFormData] = React.useState({
    fromDate: defaultValue,
    toDate: currentValue,
    type: 1,
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
  });

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((preState) => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      };
    });
  }
  const [accountStatement, setAccountStatement] = React.useState([]);
  const { loading, setLoading } = useContext(LoaderContext);

  // console.log(loading);
  // console.log(setLoading);
  // setLoading({ data: null });

  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, getList: true }));

      const { response } = await userServices.getAccountStatement(formData);
      if (response?.data?.dataList) {
        setAccountStatement(response.data.dataList);
        // console.log(response.data)
      }
      setLoading && setLoading((prev) => ({ ...prev, getList: false }));
    };
    getList();
  }, [formData]);

  const handleClick = () => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, getListdata: true }));
      const { response } = await userServices.getAccountStatement(formData);
      if (response?.data?.dataList) {
        setAccountStatement(response.data.dataList);
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
        noOfRecords: +event.target.value,
        index: 0,
      };
    });
    // setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setFormData((preState) => {
      return { ...preState, index: newPage };
    });
  };

  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <BacktoMenuButton />
      <form style={style}>
        <Grid container>
          <Grid item xs={6} md={3} style={style}>
            <label style={lableStyle} htmlFor="fromDate">
              From Date
            </label>
            <input
              style={inputStyle}
              type="date"
              defaultValue={formData.fromDate}
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
              name="fromDate"
            />
          </Grid>
          <Grid item xs={6} md={3} style={style}>
            {" "}
            <label style={lableStyle} htmlFor="toDate">
              To Date
            </label>
            <input
              style={inputStyle}
              type="date"
              defaultValue={formData.toDate}
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
              name="toDate"
            />
          </Grid>
          <Grid item xs={6} md={3} style={style}>
            {" "}
            <label style={lableStyle} htmlFor="type">
              Type
            </label>
            <select style={inputStyle} onChange={handleChange} name="type">
              <option selected value="1">
                ALL
              </option>
              <option value="2">Deposit/Withdarw Report</option>
              <option value="3">Game Report</option>
            </select>
          </Grid>
          {/* <button type="button" onClick={handleClick} style={{

        }}>Search</button>  */}

          <Grid item xs={6} md={3} style={style}>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={handleClick}
            >
              search
            </Button>
          </Grid>
          {/* <label style={lableStyle} htmlFor="noOfRecords">No Of Rows</label>
        <select style={inputStyle} onChange={handleChange} name="noOfRecords">
          <option selected value="1">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        */}
        </Grid>
      </form>
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
        <Typography mt="15vh" variant="h4" color="error">
          {"No Data Found"}
        </Typography>
      )}
    </Box>
  );
};

export default Account;
