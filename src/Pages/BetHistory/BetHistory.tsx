import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { userServices } from "../../utils/api/user/services";
import StickyTable from "../../components/custom/TableWithoutPagination";
import TablePagination from "@mui/material/TablePagination";
import { LoaderContext } from "../../App";

export interface Column {
  id:
    | "sportName"
    | "eventName"
    | "marketname"
    | "nation"
    | "rate"
    | "amount"
    | "time"
    | string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  colorCoded?: boolean;
  format?: (value: number) => string;
}

export interface SportsListResponse {
  sportId: number;
  sportName: string;
}

export interface MatchListResponse {
  eventId: number;
  eventName: string;
}

const columns: readonly Column[] = [
  { id: "sportName", label: "Sports", minWidth: 30, align: "center" },
  { id: "eventName", label: "Event Name", align: "center", minWidth: 120 },
  {
    id: "marketname",
    label: "Market Name",
    minWidth: 20,
    align: "center",
  },
  {
    id: "nation",
    label: "Nation",
    minWidth: 20,
    align: "center",
  },
  {
    id: "rate",
    label: "User Rate",
    minWidth: 20,
    align: "right",
  },
  { id: "amount", label: "Amount", align: "right", minWidth: 120 },
  { id: "time", label: "Place Date", align: "center", minWidth: 120 },
];

const BetHistory = () => {
  const [countPage, setCount] = React.useState();

  const [formData, setFormData] = React.useState({
    sportType: 1,
    betType: "1",
    noOfRecords: 25,
    index: 0,
    isDeleted: "false",
  });

  // const [sportsId, setSportsId]=React.useState();

  // const [sportList, setSportsList]= React.useState<SportsListResponse[]>([]);
  // const [matchList, setMatchList]= React.useState<MatchListResponse[]>([]);

  const [accountStatement, setAccountStatement] = React.useState([]);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, bethistory: true }));
      const { response } = await userServices.getBetHistory(formData);
      if (response?.data?.totalPages) {
        setCount(response?.data?.totalPages);
      }
      if (response?.data?.dataList) {
        setAccountStatement(response.data.dataList);
      }
      setLoading && setLoading((prev) => ({ ...prev, bethistory: false }));
    };
    getList();
  }, [formData, setLoading]);

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((preState) => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setFormData((preState) => {
      return { ...preState, index: newPage };
    });
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
  };

  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <form style={{ display: "inline-flex", padding: "10px" }}>
        <input
          type="radio"
          id="all"
          checked={formData.betType === "1"}
          name="betType"
          value="1"
          onChange={handleChange}
        />
        <label htmlFor="all">All</label>
        <br />
        <input
          type="radio"
          id="back"
          name="betType"
          value="2"
          checked={formData.betType === "2"}
          onChange={handleChange}
        />
        <label htmlFor="back">Lagai</label>
        <br />
        <input
          type="radio"
          id="lay"
          name="betType"
          value="3"
          checked={formData.betType === "3"}
          onChange={handleChange}
        />
        <label htmlFor="lay">Khayi</label>
        <br />

        <input
          style={{ marginLeft: "30px" }}
          type="radio"
          id="all"
          checked={formData.isDeleted === "false"}
          name="isDeleted"
          value="false"
          onChange={handleChange}
        />
        <label htmlFor="all">Matched</label>
        <br />
        <input
          type="radio"
          id="back"
          name="isDeleted"
          value="true"
          checked={formData.isDeleted === "true"}
          onChange={handleChange}
        />
        <label htmlFor="back">Deleted</label>
        <br />
      </form>
      <StickyTable
        // rows={accountStatement}
        rows={accountStatement.map((value: any) => {
          value.color = value.isback ? "#b3d9f5" : "#f5bad0";
          value.border = value.isback
            ? "5px solid #7dc7fc"
            : "5px solid #ff7bac";
          return value;
        })}
        columns={columns}
        title={"Current Bets"}
        noOfRecords={formData.noOfRecords}
        totalPage={countPage}
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
    </Box>
  );
};

export default BetHistory;
