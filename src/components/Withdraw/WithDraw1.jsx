import axios from 'axios';
import { Box, Button, Modal, TextField } from "@mui/material";

import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import snackBarUtil from "../Layout/snackBarUtil";

import { toast } from 'react-toastify';

import './WithDraw1.css'
import { userServices } from '../../utils/api/user/services';
const WithDraw1 = () => {

    const erreeee = {
        Amountfieldrequired: "The Amount field is required",
        AmountNumberrequired: "The Account Number is required",
        AmountNamerequired: "The Account Name field is required",
        bankName: "The Bank Name field is required",
        infcRequired: "The IFSC field is required",
        mobilenorequired: "Mobile Number is required",
        upireq: "UPI ID is required",
        upivalid: "Enter Valid UPI ID",
    };
    const [symbolsArrMail] = useState(["e", "E", "+", "-", "."]);
    const [symbolsArrUpiId] = useState(["."]);

    let REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    const [withdrawData, setWithdrawData] = useState();
    // const [active, setActive] = useState(0);

    const [show, setShow] = useState(false);
    const [withType, setwithType] = useState();
    const [withCoinValue, setwithCoinValue] = useState(0);
    // const [userAmount, setUserAmount] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [accountHolderName, setAccountHolderName] = useState("");
    const [ifsc, setIFSC] = useState();
    const [bankName, setBankName] = useState();
    const [AccountType, setAccountType] = useState("Saving");
    const [errorAlert, setErrorAlert] = useState(false);
    const [message, setMessage] = useState();
    const [colorName, setColorName] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [bankID, setBankId] = useState();
    const [stackValue, setStackValue] = useState();
    const [openForm, setOpenForm] = useState(false);
    const [withdrawType, setWithdrawType] = useState("Normal");
    const [getAccountData, setGetAccountData] = useState();
    const [userBalance, setuserBalance] = useState();
    const [savedBankdetailsName, setSavedBankdetailsName] = useState("")
    const handleClose = () => {
        setShow(false);
        // snackBarUtil.success("Withdraw Request Submited Successfully");
        setErrorAlert(true);
        setIsLoading(false);
        setColorName("success");
        setAccountHolderName("");
        setAccountNumber("");
        setIFSC("");
        setBankName("");
        setwithCoinValue(0);
    };
    console.log(userBalance, "iuhjuhnij");
    // const handleCancel = () => {
    //     setshowWithdraw(false);
    //   };
    const handlePaymentDetails = (val, id) => {
        setwithType(val);
        setBankId(id);
        setOpenForm(true);
        setAccountHolderName("");
        setAccountNumber("");
        setIFSC("");
        setBankName("");
        setRadioButton(false)
        // setwithCoinValue(0);
        setSavedBankdetailsName(val)
        console.log(val, id, "lkjhgfdsa")

    };
    useEffect(() => {
        const TokenId = localStorage.getItem("token");
        axios
            .post(
                `${REACT_APP_API_URL}/withtype-subadmin/get`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TokenId}`,
                    },
                }
            )
            .then((res) => {
                setWithdrawData(res?.data?.data);
            });
        axios
            .post(
                `${REACT_APP_API_URL}/request-stack`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TokenId}`,
                    },
                }
            )
            .then((res) => {
                setStackValue(res?.data?.data);
                console.log(res?.data?.data);
            });
        axios
            .post(
                `${REACT_APP_API_URL}/get/client-bank`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TokenId}`,
                    },
                }
            )
            .then((res) => {
                setGetAccountData(res?.data?.data);
            });
        axios
            .post(
                `${REACT_APP_API_URL}/enduser/get-user-balance`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TokenId}`,
                    },
                }
            )
            .then((res) => {
                setuserBalance(res?.data?.data?.balance);

            });
        // const getWallet = async () => {
        // const { response } = userServices.wallet();
        // if (response) {
        //     console.log(response,"sbhdkjnfds")
        //     setuserBalance(response?.data?.data?.balance);
        // };
        // UserAPI.User_Balance().then((res)=>{
        //   setuserBalance(res?.data?.balance)
        // })
        // getWallet()
    }, []);
    const handleStaticAmountInput = (e) => {
        let Inputvalue = e.target.value;
        setwithCoinValue(parseInt(Inputvalue));
    };
    const handleSaveDetail = () => {
        setAccountHolderName("");
        setAccountNumber("");
        setIFSC("");
        setBankName("");
        setwithCoinValue(0);
        const data = {
            accountHolderName: accountHolderName,
            bankName: bankName,
            accountType: AccountType,
            amount: withCoinValue,
            ifsc: ifsc,
            accountNumber: accountNumber,
            withdrawType: bankID,
        };
        axios
            .post(`${REACT_APP_API_URL}/save/client-bank`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setShow(false);
                setErrorAlert(true);
                setIsLoading(false);
                setColorName("success");
                snackBarUtil.success(res?.data?.message)
                const TokenId = localStorage.getItem("token");

                axios
                    .post(
                        `${REACT_APP_API_URL}/get/client-bank`,
                        {},
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${TokenId}`,
                            },
                        }
                    )
                    .then((res) => {
                        setGetAccountData(res?.data?.data);
                    });
                // setMessage(res?.data?.message);

            })
            .catch((error) => {
                setErrorAlert(true);
                setIsLoading(false);
                setColorName("danger");
                snackBarUtil.error(error?.response?.data?.message)

                // setMessage(error?.response?.data?.message);
            });
    };
    const handleBtnValue = (val) => {
        setwithCoinValue(
            (withCoinValue) => (Number(withCoinValue) || 0) + Number(val)
        );
    };
    //console.log(alert(message))
    const popupClose = (vl) => {
        setErrorAlert(vl);
    };
    const handleAccountName = (e) => {
        const result = e.target.value.replace(/[^a-z]/gi, "");
        setAccountHolderName(e.target.value.replace(/[^a-z]/gi, ""));
    };

    const handleValidate = () => {
        console.log(userBalance, withCoinValue, "gfdsdfgh");
        if (Number(userBalance) < Number(withCoinValue)) {
            snackBarUtil.error("insufficient balance");
            setErrorAlert(true);
            setColorName("danger");
            setIsLoading(false);
            return false;
        }

        if (withType === "BANK") {
            console.log("helooo");
            if (
                withCoinValue === "" ||
                withCoinValue === undefined ||
                withCoinValue === 0
            ) {
                //snackBarUtil.error("Sorry no payment Methods Found")
                //apiWithErrorSnackbar(erreeee?.Amountfieldrequired)
                snackBarUtil.error(erreeee?.Amountfieldrequired)


                setIsLoading(false);
                return false;
            } else if (accountNumber === "") {
                snackBarUtil.error(erreeee?.AmountNumberrequired)
                setIsLoading(false);
                return false;
            } else if (accountNumber.match(/^[0-9]{8,18}$/) === null) {
                snackBarUtil.error("Invalid account number")
                setIsLoading(false);

                setIsLoading(false);
                return false;
            } else if (accountHolderName === "") {
                snackBarUtil.error(erreeee?.AmountNamerequired)
                setIsLoading(false);
                return false;
            } else if (bankName === "") {
                snackBarUtil.error(erreeee?.bankName)
                setIsLoading(false);
                return false;
            // } else if (ifsc === "") {
            //     snackBarUtil.error(erreeee?.infcRequired)
            //     setIsLoading(false);
            //     return false;
            // } else if (ifsc === "") {
            //     snackBarUtil.error(erreeee?.infcRequired)
            //     setIsLoading(false);
            //     return false;
            // }
            // else if (ifsc.match(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/) === null) {
            //     snackBarUtil.error("Please enter a valid IFSC CODE")
            //     setIsLoading(false);
            //     return false;
            }
        } else if (withType === "PAYTM") {
            console.log("heloo");
            if (
                withCoinValue === "" ||
                withCoinValue === undefined ||
                withCoinValue === 0
            ) {
                snackBarUtil.error(erreeee?.Amountfieldrequired)
                setIsLoading(false);
                return false;
            } else if (accountNumber === "") {
                snackBarUtil.error(erreeee?.mobilenorequired)
                setIsLoading(false);
                return false;
            } else if (accountNumber.match(/^[0-9]{10}$/) === null) {
                snackBarUtil.error("Invalid number")
                setIsLoading(false);

                return false;
            } else if (accountHolderName === "") {
                snackBarUtil.error(erreeee?.AmountNamerequired)
                setIsLoading(false);
                return false;
            } else if (accountNumber.length !== 10) {
                snackBarUtil.error("Enter Valid Mobile number");
                // setErrorAlert(true);
                // setColorName("danger");
                setIsLoading(false);
                return false;
            }
        } else if (withType === "UPI") {
            console.log("helo");
            if (
                withCoinValue === "" ||
                withCoinValue === undefined ||
                withCoinValue === 0
            ) {
                snackBarUtil.error(erreeee?.Amountfieldrequired)

                setIsLoading(false);
                return false;
            } else if (accountNumber === "") {
                snackBarUtil.error(erreeee?.upireq)
                setIsLoading(false);
                return false;
            } else if (accountHolderName === "") {
                snackBarUtil.error(erreeee?.AmountNamerequired)
                // setErrorAlert(true);
                // setColorName("danger");
                setIsLoading(false);
                return false;
            } else if (
                accountNumber.match(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/) ===
                null
            ) {
                snackBarUtil.error(erreeee?.upivalid)
                // setErrorAlert(true);
                // setColorName("danger");
                setIsLoading(false);
                return false;
            }
        }
        return true;

    };

    const handleClick = () => {


        setErrorAlert(false);
        setIsLoading(true);

        if (handleValidate()) {
            const data = {
                accountHolderName: accountHolderName,
                bankName: bankName ? bankName : "",
                accountType: withType === "BANK" ? AccountType : "",
                amount: withCoinValue,
                ifsc: ifsc ? ifsc.toUpperCase() : "",
                accountNumber: accountNumber,
                withdrawType: bankID,
                withdrawMode: withdrawType,
            };
            const TokenId = localStorage.getItem("token");
            axios
                .post(`${REACT_APP_API_URL}/self-withdraw-app`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TokenId}`,
                    },
                })
                .then((res) => {
                    // setWithdrawReq(res.data);
                    // setDataLength(res.data.length);
                    // console.log(res?.data?.data                        , "sdsadasd")
                    if (res?.data?.data?.bankExist === false) {
                        // console.log(res, "yutfdgchjiouytfgdxcvbhjkiuygfc")
                        setShow(true);
                        snackBarUtil.success(res?.data?.message)

                    } else {
                        // setMessage(res?.data?.message
                        // );
                        console.log('hellooioiioioi')
                        setErrorAlert(true);
                        setColorName("success");
                        setIsLoading(false);
                        setAccountHolderName("");
                        setAccountNumber("");
                        setIFSC("");
                        setBankName("");
                        setwithCoinValue(0);
                        setAccountType("")
                        setRadioButton(false)
                        snackBarUtil.success(res?.data?.message)

                    }

                })
                .catch((error) => {
                    // setErrorAlert(true);
                    setIsLoading(false);
                    // setColorName("danger");
                    snackBarUtil.error(error?.response?.data?.message)
                    // setMessage(error?.response?.data?.message);
                });
        }
    };
    const [radioButton, setRadioButton] = useState(false)
    const handleWithdrawData = (
        accNumber,
        accHolderName,
        BankName,
        ifscNum,
        accType,
        withdrawType,
        bankid

    ) => {
        setAccountHolderName(accHolderName);
        setAccountNumber(accNumber);
        setBankName(BankName);
        setIFSC(ifscNum);
        setAccountType(accType);
        setwithType(withdrawType)
        setRadioButton(accNumber)
        // setWithdrawType(withdrawType)
    };

    // console.log(message, "dfsfsdfssfgdsdjijfv")
    //const handlepennding = () => setpendingmodal(true);
    //, setWithDrawId] = useState("")

    // const [pendingmodal, setpendingmodal] = useState(false)
    // const handleCloseFancyModal = () => setpendingmodal(false);

    //const handlependingg = (data) => {
    //  setpendingmodal(true)
    //setWithDrawId(data)
    //  }

    //  const handlependingsucesss = () => {
    //      let data = { id: withDrawId }
    //     dispatch(postpendingapppii(data))
    //     setpendingmodal(false)
    // }
    console.log(withdrawData, "kjhgtfdcvgyg")
    return (
        <>
            <div className="withdraw_page">

                <div className="withdrow_coin">
                    <div className="withdrow_title">
                        <p style={{ marginLeft: "-1px", marginBottom: "10px" }}>
                            Withdraw Coins
                        </p>
                        <input
                            placeholder="Withdraw Coins"
                            value={withCoinValue}
                            // onChange={handleStaticAmountInput}
                            onChange={(e) => e.target.value.match(/^[0-9]{0,10}$/) && setwithCoinValue(e.target.value)}

                            // onChange={()=>{  setwithCoinValue(parseInt(Inputvalue)}}
                            // type="number"
                            onKeyDown={(e) =>
                                symbolsArrMail.includes(e.key) && e.preventDefault()
                            }
                        />
                    </div>
                    <div>
                        <p
                            className="choose_val"
                            style={{ marginLeft: "0px", marginBottom: "10px" }}>
                            Choose From your Favourite transaction{" "}
                        </p>
                        <div className="coin_value" style={{ cursor: "pointer" }}>
                            {stackValue?.map((res) => {
                                return (
                                    <button onClick={() => handleBtnValue(res?.value)} style={{ cursor: "pointer" }}>
                                        {res?.key}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div
                    className="withdrow_type"
                    style={{ marginBottom: "12px", width: "100%" }}>
                    <select value={withdrawType} onChange={(e) => setWithdrawType(e.target.value)} style={{ with: "50%", cursor: "pointer" }} >
                        <option value="Normal" style={{ cursor: "pointer" }}>Normal</option>
                        <option value="Instant" style={{ cursor: "pointer" }}>Instant</option>
                    </select>
                </div>
                <div className="with_paymethod">
                    <Container>
                        <div className="bank-logo with_bank_logo">
                            <Row className='innerRow'>
                                {withdrawData?.map((res, id) => {
                                    return (
                                        <>
                                            <Col
                                                className="withdraw_image"
                                                onClick={() =>
                                                    handlePaymentDetails(
                                                        res?.withdrawType,
                                                        res?.id
                                                    )}
                                                style={{ backgroundColor: (bankID === res?.id) ? "#7b7c7f" : "", cursor: "pointer" }}
                                            >
                                                <div className="css-1502y4u">
                                                    <img
                                                        src={res?.image}
                                                        className="css-37vfbv"
                                                        alt="Bank"
                                                    />
                                                    <p className="Typography-root ">
                                                        {res?.withdrawType}
                                                    </p>
                                                </div>
                                            </Col>
                                        </>
                                    );
                                })}
                            </Row>
                        </div>
                    </Container>
                    {
                        withType === "BANK" ? (
                            <div
                                className={`mainAccount main_withdrow ${openForm === true ? "" : "d-none"
                                    } accountWith`}>
                                <div className="mx-input-wrapper account-field">
                                    <label className="account-lable">Account Number</label>

                                    <input
                                        // type="number"
                                        className="account-input"
                                        value={accountNumber}
                                        onChange={(e) => {
                                            e.preventDefault()
                                            // alert(e.target.value + "e.target.value")
                                            console.log(e.target.value, "e.target.value");
                                            e.target.value.match(/^[0-9]{0,18}$/) && setAccountNumber(e.target.value)
                                        }}
                                        onKeyDown={(e) =>
                                            symbolsArrUpiId.includes(e.key) && e.preventDefault()
                                        }
                                    // onChange={(e) =>
                                    //     e.target.value.match(/^[0-9]*$/) &&
                                    //     setAccountNumber(Number(e.target.value))}
                                    // onKeyDown={(e) =>
                                    //     symbolsArrMail.includes(e.key) && e.preventDefault()
                                    // }
                                    />
                                </div>
                                <div className="mx-input-wrapper account-field">
                                    <label className="account-lable">Account Name</label>

                                    <input
                                        type="text"
                                        className="account-input"
                                        value={accountHolderName.trimStart()}
                                        onChange={(e) =>
                                            e.target.value.match(/^[a-zA-Z ]*$/) &&
                                            setAccountHolderName(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            symbolsArrUpiId.includes(e.key) && e.preventDefault()
                                        }
                                    />
                                </div>
                                <div className="mx-input-wrapper account-field">
                                    <label className="account-lable">Bank Name</label>

                                    <input
                                        type="type"
                                        className="account-input"
                                        value={bankName}
                                        onChange={(e) =>
                                            e.target.value.match(/^[a-zA-Z ]*$/) &&
                                            setBankName(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            symbolsArrUpiId.includes(e.key) && e.preventDefault()
                                        }
                                    />
                                </div>
                                <div className="mx-input-wrapper account-field">
                                    <label className="account-lable">IFSC</label>

                                    <input
                                        type="type"
                                        className="account-input"
                                        value={ifsc}
                                        onChange={(e) =>
                                            setIFSC(e.target.value
                                                // .replace(/[^A-Z0-9a-z]+$/, "")
                                                .toUpperCase())
                                        }
                                        onKeyDown={(e) =>
                                            symbolsArrUpiId.includes(e.key) && e.preventDefault()
                                        }
                                    />
                                </div>
                                <div className="mx-input-wrapper account-field">
                                    <label className="account-lable">Account Type</label>

                                    <select
                                        name="reportType"
                                        // style={{ width: "100%" }}
                                        value={AccountType}
                                        className="custom-select select-type accounttype"
                                        onChange={(e) => setAccountType(e.target.value)}>
                                        <option value="Saving">Saving</option>
                                        <option value="Current">Current</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="mainAccount main_withdrow accountWith"
                                style={{ display: openForm === true ? "" : "none" }}
                            >
                                <div className="mx-input-wrapper account-field asdfghjkl">
                                    <label className="account-lable">
                                        {withType === "PAYTM" ? "Mobile No" : "UPI ID"}
                                    </label>

                                    {withType === "PAYTM" ? (
                                        <input
                                            // type="number"
                                            className="account-input"
                                            value={accountNumber}
                                            onChange={(e) => e.target.value.match(/^[0-9]{0,10}$/) && setAccountNumber(e.target.value)}
                                            // onKeyDown={(e) =>
                                            //     symbolsArrMail.includes(e.key) && e.preventDefault()
                                            // }
                                            onKeyDown={(e) =>
                                                symbolsArrMail.includes(e.key) && e.preventDefault()
                                            }
                                        />
                                    ) : (
                                        <input
                                            // type="text"
                                            className="account-input"
                                            value={accountNumber}
                                            onChange={(e) =>
                                                e.target.value.match(/^[a-zA-Z0-9@]*$/) &&
                                                setAccountNumber(e.target.value)}

                                            // onChange={(e) =>
                                            //     setAccountNumber(
                                            //         e.target.value.replace(
                                            //             /[^a-zA-Z0-9.-]{2, 256}@[^a-zA-Z][a-zA-Z]{2, 64}+$/, ""
                                            //         )
                                            //     )
                                            // }
                                            onKeyDown={(e) =>
                                                symbolsArrUpiId.includes(e.key) && e.preventDefault()
                                            }
                                        />
                                    )}
                                </div>
                                <div className="mx-input-wrapper account-field asdfghjkl">
                                    <label className="account-lable">
                                        {withType === "PAYTM" ? "Name" : "Account Name"}
                                    </label>

                                    <input
                                        type="text"
                                        className="account-input"
                                        value={accountHolderName.trimStart()}
                                        onChange={(e) =>
                                            e.target.value.match(/^[a-zA-Z ]*$/) &&
                                            setAccountHolderName(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            symbolsArrUpiId.includes(e.key) && e.preventDefault()
                                        }
                                    />
                                </div>
                            </div>
                        )
                    }
                    <div className={openForm ? "" : "d-none"}>
                        <div className="row row5 mt-2">
                            <div className="col-12">
                                <div className="table-responsive withdrow-table" >
                                    <table
                                        role="table"
                                        aria-busy="false"
                                        aria-colcount="6"
                                        id="_BVID_104"

                                        className="table b-table table-bordered"
                                        style={{
                                            width: withType === "BANK" ? "900px !important" : "500px !important", margin: "auto"
                                        }}>

                                        <thead>
                                            < tr role="row" className="account-detail">
                                                <th
                                                    role="columnheader"
                                                    scope="col"
                                                    aria-colindex="1"
                                                    className="text-left ">
                                                    Account Number
                                                </th>
                                                <th
                                                    role="columnheader"
                                                    scope="col"
                                                    aria-colindex="2"
                                                    className="text-left ">
                                                    Account Name
                                                </th>
                                                <th
                                                    role="columnheader"
                                                    scope="col"
                                                    aria-colindex="4"
                                                    className={`text-left ${withType === "BANK" ? "" : "d-none"
                                                        }`}>
                                                    Bank Name
                                                </th>
                                                <th
                                                    role="columnheader"
                                                    scope="col"
                                                    aria-colindex="5"
                                                    className={`text-left ${withType === "BANK" ? "" : "d-none"
                                                        }`}>
                                                    IFSC Code
                                                </th>
                                                <th
                                                    role="columnheader"
                                                    scope="col"
                                                    aria-colindex="6"
                                                    className={`text-left ${withType === "BANK" ? "" : "d-none"
                                                        }`}>
                                                    Account Type
                                                </th>
                                                <th
                                                    role="columnheader"
                                                    scope="col"
                                                    aria-colindex="6"
                                                    className="text-left">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        {getAccountData?.map((item) => {
                                            if (item.withdrawType !== withType) return <></>;
                                            return (
                                                <tbody
                                                // className={dataLenth === 0 ? "d-none" : ""}
                                                >
                                                    <tr role="row">
                                                        <td
                                                            aria-colindex="1"
                                                            className="text-left withdraw-data">
                                                            {item.accountNumber}
                                                        </td>
                                                        <td
                                                            aria-colindex="2"
                                                            className="text-left withdraw-data">
                                                            {item.accountHolderName}
                                                        </td>
                                                        <td
                                                            aria-colindex="4"
                                                            className={`text-left withdraw-data ${withType === "BANK" ? "" : "d-none"
                                                                }`}>
                                                            {item?.bankName}
                                                        </td>
                                                        <td
                                                            aria-colindex="5"
                                                            className={`text-left withdraw-data ${withType === "BANK" ? "" : "d-none"
                                                                }`}>
                                                            {item?.ifsc}
                                                        </td>
                                                        <td
                                                            aria-colindex="5"
                                                            className={`text-left withdraw-data ${withType === "BANK" ? "" : "d-none"
                                                                }`}>
                                                            {item?.accountType}
                                                        </td>
                                                        {console.log(item, "jhgfds")}
                                                        <td


                                                            aria-colindex="5"
                                                            className="text-left">
                                                            <div className="custom-control custom-control-inline custom-radio">
                                                                <input onClick={() =>
                                                                    handleWithdrawData(
                                                                        item.accountNumber,
                                                                        item.accountHolderName,
                                                                        item?.bankName,
                                                                        item?.ifsc,
                                                                        item?.accountType,
                                                                        item?.withdrawType,
                                                                        item?.id
                                                                    )
                                                                }
                                                                    style={{ cursor: "pointer" }} type="radio" checked={radioButton === item.accountNumber ? true : false} name="radio_btn"

                                                                />{" "}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            );
                                        })}

                                    </table>
                                </div>
                            </div>

                            <div className="withdraw_coin_btn" >
                                {isLoading && (
                                    <p className="lodder depositLoading withloading withdraw_deposit">
                                        <i className="fa fa-spinner fa-spin"></i>
                                    </p>
                                )}
                                <button onClick={handleClick}
                                    //   disabled={!openForm}
                                    style={{ cursor: "pointer" }}
                                >
                                    Withdraw Coins
                                </button>
                            </div>
                        </div>
                    </div>

                </div >


            </div >
            <Modal
                open={show}
                onHide={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={{ marginTop: "53px" }}
            >
                <Box className="bet-boxxxxx">
                    <div className="main-count">
                        <div className="headdddd">
                            Do you want to save the Bank Details?
                        </div>
                        <div className="Bet-succccccc">

                            <button
                                className='btnnn-modal'

                                onClick={handleClose}>
                                Cancel
                            </button>
                            <button
                                className='btnnn-modal'

                                variant=""
                                onClick={handleSaveDetail}>
                                Save
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default WithDraw1

