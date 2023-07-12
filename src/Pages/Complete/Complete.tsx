import { Box, Typography } from "@mui/material";
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
  const timeBefore = moment(curr).subtract(14, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [profitandLossData, setProfitandLossData] = useState([]);
  const [pagination, setPagination] = useState([] as any);
  const [paginationAddNo, setPaginationAddNo] = useState(1);

  console.log(startDate, endDate, "endDateendDateendDateendDateendDate")

  const StartDateValue = (date: any, dateString: any) => {
    setStartDate(dateString);
  };
  const EndDateValue = (date: any, dateString: any) => {
    setEndDate(dateString);
  };
  console.log(paginationAddNo, "paginationAddNo")
  console.log(pagination, "paginationAddNo")

  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(1, "month").format("YYYY-MM-DD");
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

    axios.post("https://api.247365.exchange/admin-new-apis/enduser/account-statement",
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

    axios.post("https://api.247365.exchange/admin-new-apis/enduser/account-statement",
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
      if (paginationAddNo! <= 1) {

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
              <th className="ldg-tbl-th match-box-color" style={{ whiteSpace: "nowrap" }}>Sr no.</th>
              <th className="ldg-tbl-th match-box-color">DATE</th>
              <th className="ldg-tbl-th match-box-color" style={{ width: "40%" }}>
                Remark
              </th>
              {/* <th className="ldg-tbl-th match-box-color"></th> */}
              <th className="ldg-tbl-th match-box-color">CREDIT</th>
              <th className="ldg-tbl-th match-box-color">DEBIT</th>
              {/* <th className="ldg-tbl-th match-box-color">Comm+</th> */}
              {/* <th className="ldg-tbl-th match-box-color">BALANCE</th> */}
            </tr>
          </thead>
          {profitandLossData?.length > 0 ?
            <tbody>

              {profitandLossData?.map((item: any) => {
                return (<tr>
                  <>
                    <td className="ldg-tbl-td match-value-box-color" style={{ textAlign: "left" }}>{item?.sno}</td>
                    <td className="ldg-tbl-td match-value-box-color" style={{ textAlign: "left" }}>{item.date}{" "}</td>
                    <td className="ldg-tbl-td match-value-box-color">{item?.fromto}</td>
                    <td className="ldg-tbl-td match-value-box-color text-green" style={{ color: "green" }}>{item?.credit}</td>
                    <td className="ldg-tbl-td match-value-box-color text-red" style={{ color: "red" }}>{item?.debit}</td>
                    {/* <td className="ldg-tbl-td match-value-box-color text-green">0</td>
            <td className="ldg-tbl-td match-value-box-color">810</td> */}
                  </>
                </tr>
                )
              })}


            </tbody>
            :


            <tbody>

              <tr>
                <td colSpan={5}>

                  No data found
                </td>
              </tr>
            </tbody>

          }
        </table>
      </div>

      <div className="row" style={{ textAlign: "center" }}>
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
              {paginationAddNo}
            </a>
          </li>

          <li onClick={() => handlePaggi("next")} className="next" >
            <a tabIndex={0} role="button" aria-disabled="true">
              Next
            </a>
          </li>



        </ul>
      </div>
      {/* <div className="row">
        <div className="backtoMenu" style={{ width: "100%" }}>
          <a href="/">
            <span className="white">BACK TO MAIN MENU</span>
          </a>
        </div>
      </div> */}
    </div >

  );
};

export default Complete;
