import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";

import "./AccountStatementNewDushyant.css"
import TablePagination from "@mui/material/TablePagination";
import moment from 'moment';
import { Padding } from '@mui/icons-material';
import { userServices } from '../../utils/api/user/services';
import { authServices } from '../../utils/api/auth/services';

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
    fontSize: "15px"
};
const inputStylewwwwww = {
    padding: " 7px 75px",
    borderRadius: "5px",
    width: "85%",
    color: "#514f4f",
    fontSize: "15px"
};

const AccountStatementNewDushyant = () => {

    const date = new Date();
    const futureDate = date.getDate() - 60;
    date.setDate(futureDate);

    const defaultValue = moment().subtract(7, "days").format("YYYY-MM-DD");
    const currentValue = moment().format("YYYY-MM-DD");

    const [toDate, setToData] = useState(currentValue)
    const [formData, setFormData] = useState(defaultValue)

    const [newPages, setNewPages] = useState()
    const [noOfRecords, setNoOfRecords] = useState(25)

    console.log(formData, toDate, "formDataformData");
    const [accountStatement, setAccountStatement] = useState([])
    const [countPage, setCount] = React.useState(1);

    const [dataType, setDataType] = useState("1")

    console.log(dataType, "qewwdwdwe");
    // AccountStateme


    const [open, setOpen] = useState(false);
    const [radiobtnnnn, setRadiobtnnnn] = useState("1")
    const [accountResultMatchId, setAccountResultMatchId] = useState()
    const [accountResult, setAccountResult] = useState([])
    const [accountResultDetails, setAccountResultDetails] = useState({ vl1: "", vl2: "" })
    const [accountResultDatatotalWin, setAccountResultDatatotalWin] = useState()
    const [accountResultDatatotalBets, setAccountResultDatatotalBets] = useState()

    const handleradiobtn = async (vl) => {
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

    const handleChangeesss = async (vl, vl1, vl2) => {
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

    useEffect(() => {
        let data = {
            type: 1,
            noOfRecords: 25,
            index: 0,
            fromDate: defaultValue,
            toDate: currentValue

        }
        setNewPages(0)
        // setNoOfRecords(25)
        const getIpy = async () => {
            const { response } = await userServices.AccountStatement(data);
            console.log(response?.data?.totalPages, "fsdfsdfdfs");
            setAccountStatement(response?.data?.dataList)
            setCount(response.data?.totalPages);
        };
        getIpy();

    }, [])

    const handleClick = async () => {
        let data = {
            type: dataType,
            noOfRecords: 25,

            index: 0,
            fromDate: formData,
            toDate: toDate

        }

        const { response } = await userServices.AccountStatement(data);
        console.log(response?.data?.totalPages, "fsdfsdfdfs");
        setAccountStatement(response?.data?.dataList)
        setCount(response.data?.totalPages);

    }



    const handleChangePage = async (event, newPage) => {
        console.log(newPage, "aaaaaaa");
        setNewPages(newPage)
        let data = {
            type: dataType,
            noOfRecords: noOfRecords,

            index: newPage,
            fromDate: formData,
            toDate: toDate

        }
        if (newPage) {

            const { response } = await userServices.AccountStatement(data);
            console.log(response?.data?.totalPages, "fsdfsdfdfs");
            setAccountStatement(response?.data?.dataList)
            setCount(response.data?.totalPages);

        }

    };


    const handleChangeRowsPerPage = async (e) => {
        console.log(e.target.value, "aaaaaaa");
        setNoOfRecords(e.target.value)


        let data = {
            type: dataType,
            noOfRecords: e.target.value,

            index: newPages,
            fromDate: formData,
            toDate: toDate

        }

        const { response } = await userServices.AccountStatement(data);
        console.log(response?.data?.totalPages, "fsdfsdfdfs");
        setAccountStatement(response?.data?.dataList)
        setCount(response.data?.totalPages);


    };

    const handleSelectGame = (e) => {
        let inputValue = e.target.value;
        setDataType(inputValue)
    }
    return (

        <div className='pandloss_maindiv'>
            <span> Account Statement</span>
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
            <div className='pandloss_maindivDate_contamer'>
                <div className='pandloss_maindiv_Date'>
                    <select
                        style={inputStyle}
                        onChange={handleSelectGame}
                        value={dataType}
                    >
                        <option disabled>Select Type</option>
                        <option value="1">All</option>
                        <option value="3">Deposit/Withdrawal Report</option>
                        <option value="2">Game report</option>
                    </select>

                </div>
                <div className='pandloss_maindiv_Date'>

                    <button className='search_new_datatatat' onClick={handleClick}>
                        <sapn>Search
                        </sapn>
                    </button>
                </div>

            </div>

            <div className="content-top-padding" >
                <div style={{ width: "100%", overflow: "scroll" }}>
                    <table className="" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th className="ldg-tbl-th match-box-color padddddd" >Date</th>
                                <th className="ldg-tbl-th match-box-color padddddd">Sr no	</th>
                                <th className="ldg-tbl-th match-box-color padddddd">Credit</th>
                                <th className="ldg-tbl-th match-box-color padddddd">Debit</th>
                                <th className="ldg-tbl-th match-box-color padddddd">Pts</th>
                                <th className="ldg-tbl-th match-box-color padddddd">Remark
                                </th>
                                {/* <th className="ldg-tbl-th match-box-color">WON</th>
                    <th className="ldg-tbl-th match-box-color">LOST</th>
                    <th className="ldg-tbl-th match-box-color">HISAB</th> */}
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: 12 }}>
                            {accountStatement?.length > 0 ?
                                (accountStatement.map((item) =>
                                    <tr onClick={() => handleChangeesss(item?.marketid, item?.remark, item?.date)}>
                                        <td
                                            className="ldg-tbl-td match-value-box-color"
                                            style={{ textAlign: "center" }}
                                        >
                                            {console.log(item, "sdfdfsdfsd")}
                                            {item?.date}
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

                                        {item?.debit >= 0 ?
                                            <td className="ldg-tbl-td match-value-box-color" style={{ color: "green" }}>{item?.pts}</td>
                                            :
                                            <td className="ldg-tbl-td match-value-box-color" style={{ color: "red" }}>{item?.pts}</td>

                                        }

                                        <td
                                            className="ldg-tbl-td match-value-box-color"
                                            style={{ textAlign: "center" }}
                                        >
                                            {item?.remark}
                                        </td>

                                    </tr>))
                                :
                                // (!true && (
                                <tr >
                                    <td
                                        className="ldg-tbl-td match-value-box-color"
                                        colSpan={6}
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

                                    accountResult?.map((item) => {
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
        </div>


    )
}

export default AccountStatementNewDushyant
