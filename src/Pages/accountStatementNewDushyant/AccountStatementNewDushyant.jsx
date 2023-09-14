import React, { useEffect, useState } from 'react'
import "./AccountStatementNewDushyant.css"
import TablePagination from "@mui/material/TablePagination";
import moment from 'moment';
import { Padding } from '@mui/icons-material';
import { userServices } from '../../utils/api/user/services';

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

        const { response } = await userServices.AccountStatement(data);
        console.log(response?.data?.totalPages, "fsdfsdfdfs");
        setAccountStatement(response?.data?.dataList)
        setCount(response.data?.totalPages);


    };


    const handleChangeRowsPerPage = async (e) => {
        console.log(e.target.value, "aaaaaaa");
        setNoOfRecords(e.target.value)


        let data = {
            type: dataType,
            noOfRecords: 25,

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
                        Search
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
                                    <tr>
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

                                        {item?.pts > 0 ?
                                            <td className="ldg-tbl-td match-value-box-color" style={{ color: "red" }}>-{item?.pts}</td>

                                            :
                                            <td className="ldg-tbl-td match-value-box-color" style={{ color: "green" }}>{item?.pts}</td>

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
        </div>


    )
}

export default AccountStatementNewDushyant
