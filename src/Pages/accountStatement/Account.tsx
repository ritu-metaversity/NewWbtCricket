import { Box, Button, TextField, Typography } from "@mui/material";
import { border } from "@mui/system";
import React, { useEffect } from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import StickyHeadTable from "../../components/custom/Table";
import StickyTable from "../../components/custom/TableWithoutPagination";
import { userServices } from "../../utils/api/user/services";

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

  const style = { display: "flex" , alignItems:'center', justifyContent:'space-between', padding:"10px"}
  const inputStyle={padding: "10px" ,borderRadius:"5px",marginRight:" 8px", width:'100%',maxWidth:'200px',  }
  const lableStyle={alignSelf: "center"}
  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-CA');
  const current = new Date();
  const currentValue = current.toLocaleDateString('en-CA');
  const [formData, setFormData] = React.useState({
    fromDate: defaultValue,
    toDate: currentValue,
    type: 1,
    index: 0,
    noOfRecords: 10,
  })

  function handleChange(event: { target: { name: any; value: any; }; }) {
    setFormData(preState => {
      return {
        ...preState,
        [event.target.name]: event.target.value
      }
    })
  }
  const [accountStatement, setAccountStatement] = React.useState([]);
  useEffect(() => {
    const getList = async () => {
      const { response } = await userServices.getAccountStatement(formData);
      if (response?.data?.dataList) {
        setAccountStatement(response.data.dataList)
        // console.log(response.data)
      }
    };
    getList();
  }, []);

  const handleClick = () => {
    const getList = async () => {
      const { response } = await userServices.getAccountStatement(formData);
      if (response?.data?.dataList) {
        setAccountStatement(response.data.dataList)
      }
    };
    getList();
  };

 

  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      <BacktoMenuButton />
      <form style={style}>
      <label style={lableStyle} htmlFor="fromDate">From Date</label>
        <input style={inputStyle} type="date" defaultValue={formData.fromDate} placeholder="YYYY-MM-DD" onChange={handleChange} name="fromDate" />
        <label style={lableStyle} htmlFor="toDate">To Date</label>
        <input style={inputStyle} type="date" defaultValue={formData.toDate} placeholder="YYYY-MM-DD" onChange={handleChange} name="toDate" />
        <label style={lableStyle} htmlFor="type">Type</label>
        <select style={inputStyle} onChange={handleChange} name="type">
          <option selected value="1">ALL</option>
          <option value="2">Deposit/Withdarw Report</option>
          <option value="3">Game Report</option>
        </select>
        {/* <button type="button" onClick={handleClick} style={{

        }}>Search</button>  */}

<Button type="button" variant="contained" onClick={handleClick}>
  search
</Button>
        {/* <label style={lableStyle} htmlFor="noOfRecords">No Of Rows</label>
        <select style={inputStyle} onChange={handleChange} name="noOfRecords">
          <option selected value="1">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        */}
      </form>
      <br />
      <br />

      {accountStatement?.length > 0 ? (
        <StickyTable
          rows={accountStatement}
          columns={columns}
          title={"Account Summary"}
          // noOfRecords={formData.noOfRecords}
        />)
        : (
          <Typography mt="15vh" variant="h4" color="error">
            {"No Data Found"}
          </Typography>)
      }
    </Box>
  );
};

export default Account;
