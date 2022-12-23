import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { userServices } from "../../utils/api/user/services";
import StickyTable from "../../components/custom/TableWithoutPagination";
import TablePagination from "@mui/material/TablePagination";


export interface Column {
  id: "sportName" | "eventName" | "marketname" | "nation" | "rate" | "amount" | "time" | string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  colorCoded?: boolean;
  format?: (value: number) => string;
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

const CurrentBet = () => {
  const [index, setPage] = React.useState(0);
  const [countPage, setCount] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [formData, setFormData] = React.useState({
    sportType: 1,
    betType: 1,
    noOfRecords: 25,
    index: 0
  });
  const [accountStatement, setAccountStatement] = React.useState([]);
  useEffect(() => {
    const getList = async () => {
      const { response } = await userServices.getCurrentBets(formData);
      if (response?.data?.totalPages) {
        setCount(response?.data?.totalPages)
      }
      if (response?.data?.dataList) {
        setAccountStatement(response.data.dataList)
      }
    };
    getList();
  }, [formData]);

  function handleChange(event: { target: { name: any; value: any; }; }) {
    setFormData(preState => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      }
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setFormData(preState => {
      return {...preState,
      index: newPage,
    }}
    )
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(preState => {
      return {
        ...preState,
        noOfRecords: +event.target.value,
        index: 0
      }
    });
    // setPage(0);
  };
  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <form style={{ display: "inline-flex", padding: "10px" }}>
        <input
          type="radio"
          id="all"
          checked
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
          onChange={handleChange}
        />
        <label htmlFor="back">Lagai</label>
        <br />
        <input
          type="radio"
          id="lay"
          name="betType"
          value="3"
          onChange={handleChange}
        />
        <label htmlFor="lay">Khayi</label>
        <br />
      </form>
      <StickyTable
        rows={accountStatement.map((value: any) => 
          { value.color = (value.isback ? "#b3d9f5" : "#f5bad0");
          // value.border = (value.isback ? "2px solid #b3d9f5" : "2px solid #f5bad0");
            return value 
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
        labelDisplayedRows={({page}) =>{
          return `Page : ${page + 1}`
        }}
      />
    </Box>
  );
};


export default CurrentBet;
