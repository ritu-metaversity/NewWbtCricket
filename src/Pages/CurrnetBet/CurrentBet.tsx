import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { userServices } from "../../utils/api/user/services";
import StickyTable from "../../components/custom/TableWithoutPagination";
import TablePagination from "@mui/material/TablePagination";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import { LoaderContext } from "../../App";
import "./CurrentBettt.css"

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

const columns: readonly Column[] = [
  {
    id: "sportName",
    label: "Sports",
    minWidth: 30,
    align: "center",
  },
  {
    id: "eventName",
    label: "Event Name",
    align: "center",
    minWidth: 120,
  },
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
    align: "center",
  },
  {
    id: "price",
    label: "User Price",
    minWidth: 20,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    align: "center",
    minWidth: 120,
  },
  {
    id: "time",
    label: "Place Date",
    align: "center",
    minWidth: 120,
  },
];

const CurrentBet = () => {

  const [typeForSportCasion, setTypeForSportCasion] = useState("1")

  const [countPage, setCount] = React.useState();

  const [formData, setFormData] = React.useState({
    sportType: typeForSportCasion,
    betType: "1",
    noOfRecords: 25,
    index: 0,
    isDeleted: "false",
  });

  const [accountStatement, setAccountStatement] = React.useState([]);
  const { setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, currentbet: true }));
      const { response } = await userServices.getCurrentBets(formData);
      if (response?.data) {
        setCount(response?.data?.totalPages);
      }
      if (response?.data) {
        setAccountStatement(response.data.dataList);
      }
      setLoading && setLoading((prev) => ({ ...prev, currentbet: false }));
    };
    getList();
  }, [formData, setLoading]);
  console.log(formData,);

  useEffect(() => {
    setFormData({
      sportType: typeForSportCasion,
      betType: formData?.betType,
      noOfRecords: formData?.noOfRecords,
      index: formData?.index,
      isDeleted: formData?.isDeleted,
    })

  }, [typeForSportCasion])

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((preState) => {
      return {
        ...preState,
        index: 0,
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
    // setPage(0);
  };
  {
    console.log(countPage, formData.index, "count");
  }


  console.log(accountStatement, "accountStatement");
  console.log(accountStatement, "accountStatement");
  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <BacktoMenuButton />
      <div className="Maintypespert">

        <button className="typespert" style={{ backgroundColor: typeForSportCasion === "1" ? "#c4c4c4" : "transparent" }} onClick={() => setTypeForSportCasion("1")}>Sports</button>
        <button className="typespert" style={{ backgroundColor: typeForSportCasion === "2" ? "#c4c4c4" : "transparent" }} onClick={() => setTypeForSportCasion("2")}>Casino</button>
      </div >
      <form style={{ display: "inline-flex", padding: "10px", gap: "20px" }}>

        <input
          type="radio"
          id="all"
          checked={formData.betType === "1"}
          name="betType"
          value="1"
          onChange={handleChange}
          style={{ cursor: "pointer" }}
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
          style={{ cursor: "pointer" }}
        />
        <label htmlFor="back">Back</label>
        <br />
        <input
          type="radio"
          id="lay"
          name="betType"
          value="3"
          checked={formData.betType === "3"}
          onChange={handleChange}
          style={{ cursor: "pointer" }}
        />
        <label htmlFor="lay">Lay</label>
        <br />
      </form>

      <StickyTable
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
        count={countPage ? countPage * formData.noOfRecords : 0}
        rowsPerPage={formData.noOfRecords}
        page={formData.index}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<span>Rows: </span>}
        labelDisplayedRows={({ page }) => {
          return `Page : ${page + 1}`;
        }}
      />
    </Box >
  );
};

export default CurrentBet;
