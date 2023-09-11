import { Box, Dialog, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import StickyTable from "../../components/custom/TableWithoutPagination";
import { ProfitLossPayload, userServices } from "../../utils/api/user/services";
import { LoaderContext } from "../../App";
import moment from "moment";
import Filter from "./Filter";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import './Complete.css'
import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from "axios";
import { type } from "os";
import { authServices } from "../../utils/api/auth/services";

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

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const Complete = () => {

  const [countPage, setCount] = React.useState(1);

  var curr: Date = new Date();
  const timeBefore = moment(curr).subtract(7, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [profitandLossData, setProfitandLossData] = useState([]);
  const [pagination, setPagination] = useState([] as any);
  const [paginationAddNo, setPaginationAddNo] = useState(0);
  const [open, setOpen] = useState(false);



  const StartDateValue = (date: any, dateString: any) => {
    setStartDate(dateString);
  };
  const EndDateValue = (date: any, dateString: any) => {
    setEndDate(dateString);
  };


  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(7, "days").format("YYYY-MM-DD");
  const currentValue = moment().format("YYYY-MM-DD");

  const [formData, setFormData] = React.useState<ProfitLossPayload>({
    fromDate: defaultValue,
    toDate: currentValue,
    sportId: "1",
    matchId: "",
    index: 0,
    noOfRecords: 25,
    totalPages: 1,
    userId: "",
    tabId: 0
  });

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((preState) => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      };
    });
  }
  const token = localStorage.getItem("token");

  const handleOption = (vl: string) => {

    let data =
    {
      noOfRecords: "10",
      index: paginationAddNo,
      fromDate: startDate,
      toDate: endDate,
      type: vl
    }

    axios.post(`${REACT_APP_API_URL}/enduser/account-statement`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        setProfitandLossData(res?.data?.data?.dataList)
        setPagination(res?.data?.data)

      })
  }

  useEffect(() => {
    let data =
    {
      noOfRecords: "10",
      index: paginationAddNo,
      fromDate: startDate,
      toDate: endDate,
      type: "1"
    }

    axios.post(`${REACT_APP_API_URL}/enduser/account-statement`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        setProfitandLossData(res?.data?.data?.dataList)
        setPagination(res?.data?.data)

      })
  }, [startDate, endDate, paginationAddNo])


  const [accountStatement, setAccountStatement] = React.useState<
    ProfitLossData[]
  >([]);
  const { loading, setLoading } = useContext(LoaderContext);


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

  const handlePaggi = ((id: string) => {
    // console.log(id, "id")
    let data = 1
    if (id === "prev") {
      if (paginationAddNo! <= 0) {

      } else {
        setPaginationAddNo(paginationAddNo - 1)

      }
    } else {
      if (pagination?.totalPages === paginationAddNo) {

      } else {

        setPaginationAddNo(paginationAddNo + 1)
      }

    }
  })
  const [radiobtnnnn, setRadiobtnnnn] = useState("1")
  const [accountResult, setAccountResult] = useState([])
  const [accountResultMatchId, setAccountResultMatchId] = useState()
  const [accountResultDatatotalBets, setAccountResultDatatotalBets] = useState()
  const [accountResultDatatotalWin, setAccountResultDatatotalWin] = useState()
  const [accountResultDetails, setAccountResultDetails] = useState({ vl1: "", vl2: "" })
  const handleChangeesss = async (vl: any, vl1: any, vl2: any) => {
    setOpen(true)
    setAccountResultMatchId(vl)
    const { response } = await authServices.searchBetMarketAS({
      betType: 1,
      marketId: vl,
      userId: ""
    });
    if (response) {
      console.log(response?.data, "dfsdffasdfa");

      setAccountResult(response?.data?.betList)
      setAccountResultDatatotalBets(response?.data?.totalBets)
      setAccountResultDatatotalWin(response?.data?.totalStake)
    }
    setAccountResultDetails({ vl1: vl1, vl2: vl2 })
  }

  const handleradiobtn = async (vl: any) => {
    setRadiobtnnnn(vl)
    const { response } = await authServices.searchBetMarketAS({
      betType: vl,
      marketId: accountResultMatchId,
      userId: ""
    });
    if (response) {
      setAccountResult(response?.data?.betList)
    }
  }

  return (

    <div className="container">
      {/* <div className="row">
    <div className="backtoMenu" style={{ width: "100%" }}>
      <a href="/user/dashboard/">
        <span className="white">BACK TO MAIN MENU</span>
      </a>
    </div>
  </div> */}
      <div className="row" style={{ marginTop: 10, textAlign: "center" }}>
        <div className="btn-grad-red" style={{ width: "100%", padding: 8 }}>
          <span className="white">MY ACCOUNT STATEMENT ({pagination?.dataList?.length})</span>
        </div>
      </div>
      {/* <div className="row date_picker" style={{ textAlign: "center", marginTop: 10 }}> */}
      <div
        className="date_and_data"
      >
        <div className="DateRangePicker DateRangePicker_1">
          <Space direction="horizontal" >
            <DatePicker
              className="startDate"
              defaultValue={dayjs(startDate)}
              format={dateFormat}

              onChange={StartDateValue}
              disabledDate={(d) =>
                !d ||
                d.isBefore(dayjs().subtract(2, "month")) ||
                d.isAfter(dayjs())
              }
            />
            <DatePicker
              className="endDate"
              defaultValue={dayjs(endDate)}

              format={dateFormat}
              onChange={EndDateValue}
              disabledDate={(d) =>
                !d ||
                d.isBefore(dayjs().subtract(2, "month")) ||
                d.isAfter(dayjs())
              }
            />
          </Space>
        </div>
        <div role="group" className="btn-group">
          <button type="button" className="all btn btn-primary btn-lg" onClick={() => handleOption("1")} >
            All
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => handleOption("2")}>
            P&amp;L
          </button>
          <button type="button" className="btn btn-primary btn-lg">
            PDC
          </button>
          <button type="button" className="account_btn btn btn-primary btn-lg" onClick={() => handleOption("3")} >
            Account
          </button>
        </div>
        {/* </div> */}

      </div >
      <div className="content-top-padding row" style={{ paddingBottom: 15 }}>
        <table className="" style={{ width: "100%" }}>
          <thead>
            <tr>
              {/* <th className="ldg-tbl-th match-box-color" style={{ whiteSpace: "nowrap" }}>Sr no.</th> */}
              <th className="ldg-tbl-th match-box-color">DATE</th>
              <th className="ldg-tbl-th match-box-color" style={{ width: "40%" }}>
                DESCRIPTION
              </th>
              {/* <th className="ldg-tbl-th match-box-color"></th> */}
              <th className="ldg-tbl-th match-box-color">Prev. Bal</th>
              <th className="ldg-tbl-th match-box-color">CREDIT</th>
              <th className="ldg-tbl-th match-box-color">DEBIT</th>
              <th className="ldg-tbl-th match-box-color">comm+</th>
              <th className="ldg-tbl-th match-box-color">BALANCE</th>
              {/* <th className="ldg-tbl-th match-box-color">Comm+</th> */}
              {/* <th className="ldg-tbl-th match-box-color">BALANCE</th> */}
            </tr>
          </thead>
          <tbody>
            {profitandLossData?.length > 0 ?

              profitandLossData?.map((item: any) => {
                return (<tr onClick={() => handleChangeesss(item?.marketid, item?.remark, item?.date)} style={{ cursor: "pointer" }}>
                  <>
                    {console.log(item, "sfsd")
                    }
                    {/* <td className="ldg-tbl-td match-value-box-color" style={{ textAlign: "left" }}>{item?.sno}</td> */}
                    <td className="ldg-tbl-td match-value-box-color" >{item.date}{" "}</td>
                    <td className="ldg-tbl-td match-value-box-color" style={{ textAlign: "left" }}>{item?.remark}</td>
                    <td className="ldg-tbl-td match-value-box-color text-green" >{Number(item?.pts - item?.credit - item?.debit).toFixed(2)}</td>
                    <td className="ldg-tbl-td match-value-box-color text-green" style={{ color: "green" }}>{Number(item?.credit).toFixed(2)}</td>
                    <td className="ldg-tbl-td match-value-box-color text-red" style={{ color: "red" }}>{Number(item?.debit).toFixed(2)}</td>
                    <td className="ldg-tbl-td match-value-box-color text-red" style={{ color: "red" }}>0</td>
                    <td className="ldg-tbl-td match-value-box-color text-red" >{Number(item?.pts).toFixed(2)}</td>
                    {/* <td className="ldg-tbl-td match-value-box-color text-green">0</td>
            <td className="ldg-tbl-td match-value-box-color">810</td> */}
                  </>
                </tr>
                )
              }) :




              <tr>
                <td colSpan={7} className="ldg-tbl-td match-value-box-color" style={{ color: "red" }}>

                  No data found
                </td>
              </tr>


            }
          </tbody>



        </table>
      </div>
      {
        pagination?.totalPages === 1 ?
          ""
          :
          <div className="row" style={{ textAlign: "center", cursor: "pointer" }}>
            <ul className="pagination">

              <li
                // className={`previous ${pagination ? "disabled" : ""}`}
                onClick={() => handlePaggi("prev")}>
                <a role="button" aria-disabled="true">
                  Prev
                </a>
              </li>
              <li className="active">
                <a
                  role="button"
                >
                  {paginationAddNo + 1}
                </a>
              </li>
              {pagination?.totalPages === paginationAddNo + 1 ?
                "" :
                <li onClick={() => handlePaggi("next")} className="next" >
                  <a tabIndex={0} role="button" aria-disabled="true">
                    Next
                  </a>
                </li>
              }




            </ul>
          </div>
      }

      {/* <div className="row">
        <div className="backtoMenu" style={{ width: "100%" }}>
          <a href="/">
            <span className="white">BACK TO MAIN MENU</span>
          </a>
        </div>
      </div> */}
      <Dialog
        onClose={() => {
          setOpen(false)
        }}
        open={open}
        fullWidth
        maxWidth={"md"}
      >
        <div className="modall_pageeee">

          <div className="modalll_title" >
            <span>Result</span>
            <span onClick={() => {
              setOpen(false)
            }} style={{ cursor: "pointer" }}>X</span>

          </div>
          <div className="modalll_bodyyy">
            <div className="modalll_bodyyy_title">{accountResultDetails?.vl1}</div>
            <div className="modalll_bodyyy_title"><b >Game Time:</b> <span>{accountResultDetails?.vl2}</span></div>
            <div className="modalll_bodyyy_title">
              <input type="radio" onChange={() => handleradiobtn("1")} checked={radiobtnnnn === "1" ? true : false} />
              <label>All</label>
              <input type="radio" onChange={() => handleradiobtn("2")} checked={radiobtnnnn === "2" ? true : false} />
              <label>Back</label>
              <input type="radio" onChange={() => handleradiobtn("3")} checked={radiobtnnnn === "3" ? true : false} />
              <label>Lay</label>
              {/* <input type="radio" onChange={() => handleradiobtn("4")} />
              <label>Deleted</label> */}
            </div>
            <div className="modalll_bodyyy_title">
              <span>Total Bets: <span style={{ color: "green" }}>{accountResultDatatotalBets}</span></span>
              <span>Total wins: <span style={{ color: "green" }}>{accountResultDatatotalWin}</span></span>
            </div>
          </div>
          <div className="modal_table_container">

            <table style={{ width: "100%", border: "1px solid" }}>
              <thead>
                <tr className="modal_table_header_title">
                  <th className="modal_table_head">Nation</th>
                  <th className="modal_table_head width_for_head">Rate</th>
                  <th className="modal_table_head width_for_head">Bhav</th>
                  <th className="modal_table_head width_for_head">Amount</th>
                  <th className="modal_table_head width_for_head">Win</th>
                  <th className="modal_table_head width_for_head">Date</th>
                  <th className="modal_table_head width_for_head">Ip Address</th>
                  <th className="modal_table_head width_for_head">Browser Details</th>
                </tr>
              </thead>
              <tbody>
                {accountResult?.length > 0 ?

                  accountResult?.map((item: any) => {
                    return (<tr onClick={() => setOpen(true)}>
                      <>
                        {item?.isback === true ?
                          <td className="modal_table_headdddddblck" >{item?.selectionname}</td>
                          :

                          <td className="modal_table_headdddddlay" >{item?.selectionname}</td>
                        }
                        <td className="modal_table_head" >{item?.pricevalue}</td>
                        <td className="modal_table_head" >{item?.odds}</td>
                        <td className="modal_table_head" >{item?.stack}</td>
                        <td className="modal_table_head" ><span style={{ color: item?.netpnl <= 0 ? "red" : "green" }}>{item?.netpnl}</span></td>
                        <td className="modal_table_head" >{item?.matchedtime}</td>
                        <td className="modal_table_head" >{item?.ipAddress}</td>
                        <td className="modal_table_head" >
                          <Tooltip title={item?.deviceInfo}>
                            <IconButton style={{
                              fontSize: "18px",
                              color: "black"
                            }}>
                              Detail
                            </IconButton>
                          </Tooltip>
                        </td>
                      </>
                    </tr>
                    )
                  }) :
                  <tr>
                    <td colSpan={8} className="ldg-tbl-td match-value-box-color" style={{ color: "red" }}>

                      No data found
                    </td>
                  </tr>


                }
              </tbody>



            </table>
          </div>

        </div>
      </Dialog>
    </div >

  );
};

export default Complete;
