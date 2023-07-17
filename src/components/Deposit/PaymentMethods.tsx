import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardContainerContainer } from "./styledComponents";
import BankInfoComponent from "./BankInfoComponent";
import UPIDetails from "./UPIDetails";
import QRcodeComponent from "./QRcodeComponent";
import Card from "./card";
import snackBarUtil from "../Layout/snackBarUtil";
import { selfServices } from "../../utils/api/selfWithrawDeposit/service";
import { AnyARecord } from "dns";

export interface BankDetailInterface {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export interface UPIDetailsInterface {
  upiId: string;
  displayName: string;
  upiName: string;
}
export interface QRDetailInterface {
  displayName: string;
  qrCodeImage: string;
}
interface PaymentDataInterface {
  paymentMethods: { methodName: string; logo: string }[];
  bankDetail: BankDetailInterface;
  upiDetail: UPIDetailsInterface;
  qrCode: QRDetailInterface;
}

export function PaymentMethods() {
  const [selected, setSelected] = useState("");
  const [showw, setShoww] = useState(false);
  const [paymentData, setPaymentData] = useState([])
  const handleClick = (id: string) => {
    setSelected(id);
    setShoww(true)
  };
  useEffect(() => {
    const getPaymentData = async () => {
      const { response } = await selfServices.getPaymentDetail();
      if (response) {
        setPaymentData(response.data);
        try {
          if (response?.data) {
            setSelected(response.data);
          } else {
            snackBarUtil.error("Sorry no payment Methods Found");
          }
        } catch {
          snackBarUtil.error("Sorry no payment Methods Found111111");
        }
      }
    };
    getPaymentData();
  }, []);
  console.log(selected, "lokijiuhuygytfrded")
  return (
    <>
      {" "}
      <Typography my={4}>Pay Manually</Typography>
      <CardContainerContainer>
        {paymentData?.length &&
          paymentData?.map((item: any) => {
            console.log(item, "fdssadfds")
            return (

              <Card
                selected={selected === item.accountType
                }
                details={item}
                handleClick={() => handleClick(item.depositType)}
              />)
          })}


      </CardContainerContainer>
      {showw === true ?

        <BankInfoComponent paymentData={paymentData} type={selected} />
        :
        " "
      }

      {/* {selected.toLowerCase() === "UPI".toLowerCase() && (
        <UPIDetails upiDetails={paymentData?.upiDetail} />
      )}
      {selected.toLowerCase() === "QR".toLowerCase() && (
        <QRcodeComponent qrDetails={paymentData?.qrCode} />
      )} */}
    </>
  );
}
