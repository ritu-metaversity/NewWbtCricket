import { DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";
import "./ProfitAndLossPageeee.css"
import TablePagination from "@mui/material/TablePagination";

import axios from 'axios';
import moment from 'moment';
import snackBarUtil from '../../components/Layout/snackBarUtil';

const lableStyleeeeee = {
  alignSelf: "center",
  color: "#000",
  fontWeight: "500",
  fontSize: "16px"
};
const inputStyle = {
  padding: "6px",
  borderRadius: "5px",
  width: "85%",
  color: "#514f4f",
  fontSize: "15px",
  cursor: "pointer"
};
const ProfitAndLossPageeee = () => {
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(7, "days").format("YYYY-MM-DD");
  const currentValue = moment().format("YYYY-MM-DD");

  const [toDate, setToData] = useState(currentValue)
  const [formData, setFormData] = useState(defaultValue)
  const [newPages, setNewPages] = useState()
  const [noOfRecords, setNoOfRecords] = useState(25)
  // const [formDataAll, setFormDataAll] = useState({
  //   fromDate: formData,
  //   toDate: toDate,
  //   index: 0,
  //   noOfRecords: 25,
  // });
  console.log(formData, toDate, "formDataformData");
  const [accountStatement, setAccountStatement] = useState([])
  const [countPage, setCount] = React.useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setNewPages(0)
    // setNoOfRecords(25)

    let data = {
      startDate: defaultValue,
      endDate: currentValue,
      index: 0,
      noOfRecords: 25
    }

    axios.post(
      `${REACT_APP_API_URL}/bmx/report/get-my-ledger`, data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      }
    ).then((res) => {
      console.log(res?.data?.data?.list, "sdfygsdfshdj");
      setAccountStatement(res?.data?.data?.list)
      setCount(res.data?.list?.totalPages);

    })
  }, [])

  const handleClick = () => {
    // snackBarUtil.error("Date is required");
    const token = localStorage.getItem("token");
    let data = {
      startDate: formData,
      endDate: toDate,
      index: 0,
      noOfRecords: 100
    }
    axios.post(
      `${REACT_APP_API_URL}/bmx/report/get-my-ledger`, data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      }
    ).then((res) => {
      setAccountStatement(res?.data?.data?.list)
      setCount(res.data?.list?.totalPages);
      // snackBarUtil.error("All fields are mandatory")
      console.log(res, "qwertyu");
    })
  }

  const handleChangePage = (event, newPage) => {
    console.log(newPage, "aaaaaaa");
    setNewPages(newPage)
    const token = localStorage.getItem("token");
    let data = {
      startDate: formData,
      endDate: toDate,
      index: newPage,
      noOfRecords: noOfRecords
    }
    axios.post(
      `${REACT_APP_API_URL}/bmx/report/get-my-ledger`, data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      }
    ).then((res) => {
      setAccountStatement(res?.data?.data?.list)
      setCount(res.data?.list?.totalPages);

    })
  };

  const handleChangeRowsPerPage = (e) => {
    console.log(e.target.value, "aaaaaaa");
    setNoOfRecords(e.target.value)
    const token = localStorage.getItem("token");
    let data = {
      startDate: formData,
      endDate: toDate,
      index: newPages,
      noOfRecords: e.target.value
    }
    axios.post(
      `${REACT_APP_API_URL}/bmx/report/get-my-ledger`, data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      }
    ).then((res) => {
      setAccountStatement(res?.data?.data?.list)
      setCount(res.data?.list?.totalPages);

    })
  };

  const handler = (e) => {
    console.log(e.target.value, "sdsdsdsdssd");
  }
  console.log(accountStatement, "dsfdfsd");
  return (
    <div className='pandloss_maindiv'>
      <span> MY LEDGER</span>
      <div className='pandloss_maindivDate_contamer'>
        <div className='pandloss_maindiv_Date'>
          <label style={lableStyleeeeee} htmlFor="fromDate">
            From Date
          </label>
          <input
            type='date'
            style={inputStyle}
            // type="date"
            // placeholder="MM/DD/YY"
            onChange={(e) => setFormData(e.target.value)}
            value={formData}
            // defaultValue={dayjs(formData )}
            // placeholder="YYYY-MM-DD"
            // onChange={(e, v) => setFormData((prev) => ({ ...prev, fromDate: v }))}
            name="fromDate"
          />
        </div>


        {" "}
        <div className='pandloss_maindiv_Date'>

          <label style={lableStyleeeeee} htmlFor="toDate">
            To Date
          </label>
          <input
            type='date'
            style={inputStyle}
            // type="date"
            onChange={(e) => setToData(e.target.value)}
            value={toDate}
            // defaultValue={dayjs(toDate )}
            // placeholder="YYYY-MM-DD"
            // onChange={(e, v) => setToData((prev) => ({ ...prev, toDate: v }))}
            name="toDate"
          />
        </div>
      </div>
      <button className="bttnttttntntn" onClick={handleClick}>
        Search
      </button>


      <div className="content-top-padding" >
        <div style={{ width: "100%", overflow: "scroll" }}>
          <table className="" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th className="ldg-tbl-th match-box-color padddddd" style={{ width: "50%" }} >
                  DESCRIPTION
                </th>
                <th className="ldg-tbl-th match-box-color padddddd">WON BY</th>
                <th className="ldg-tbl-th match-box-color padddddd">WON</th>
                <th className="ldg-tbl-th match-box-color padddddd">LOST</th>
                <th className="ldg-tbl-th match-box-color padddddd">HISAB</th>
                {/* <th className="ldg-tbl-th match-box-color">WON</th>
                  <th className="ldg-tbl-th match-box-color">LOST</th>
                  <th className="ldg-tbl-th match-box-color">HISAB</th> */}
              </tr>
            </thead>
            <tbody style={{ fontSize: 12 }}>
              {accountStatement?.length > 0 ?
                (accountStatement.map((item) =>
                  <tr>
                    <td
                      className="ldg-tbl-td match-value-box-color"
                      style={{ textAlign: "left" }}
                    >
                      {console.log(item, "sdfdfsdfsd")}
                      {item?.paymentType}
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
                      {item?.credit}
                    </td>

                    <td
                      className="ldg-tbl-td match-value-box-color"
                      style={{ textAlign: "center" }}
                    >
                      {item?.debit}
                    </td>
                    {item?.balance > 0 ?


                      (item?.balance === 0 ?

                        <td className="ldg-tbl-td match-value-box-color" style={{ color: "black" }}>{Math.abs(item?.balance)}</td> :
                        <td className="ldg-tbl-td match-value-box-color" style={{ color: "red" }}>{Math.abs(item?.balance)}</td>)

                      : (item?.balance === 0 ?

                        <td className="ldg-tbl-td match-value-box-color" style={{ color: "black" }}>{Math.abs(item?.balance)}</td> :
                        <td className="ldg-tbl-td match-value-box-color" style={{ color: "green" }}>{Math.abs(item?.balance)}</td>)
                    }

                  </tr>))
                :
                // (!true && (
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
                // )
                // )
              }

            </tbody>
          </table>
        </div>

      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countPage ? countPage * noOfRecords : 0}
        rowsPerPage={noOfRecords}
        page={newPages}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<span>Rows: </span>}
        labelDisplayedRows={({ page }) => {
          return `Page : ${page + 1}`;
        }}
      />
    </div>
  )
}

export default ProfitAndLossPageeee