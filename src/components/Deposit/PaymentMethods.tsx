import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardContainerContainer } from "./styledComponents";
import BankInfoComponent from "./BankInfoComponent";
import UPIDetails from "./UPIDetails";
import QRcodeComponent from "./QRcodeComponent";
import { userServices } from "../../utils/api/user/services";
import Card from "./card";
import snackBarUtil from "../Layout/snackBarUtil";

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
  const [paymentData, setPaymentData] = useState<PaymentDataInterface | null>(
    null
  );
  const handleClick = (id: string) => {
    setSelected(id);
  };
  useEffect(() => {
    const getPaymentData = async () => {
      const { response } = await userServices.getPaymentDetail();
      if (response) {
        setPaymentData(response.data);
        try {
          if (response?.data?.paymentMethods[0]) {
            setSelected(response.data.paymentMethods[0]?.methodName);
          } else {
            snackBarUtil.error("Sorry no payment Methods Found");
          }
        } catch {
          snackBarUtil.error("Sorry no payment Methods Found");
        }
      }
    };
    getPaymentData();
  }, []);

  return (
    <>
      {" "}
      <Typography my={4}>Pay Manually</Typography>
      <CardContainerContainer>
        {paymentData?.paymentMethods?.map((elem) => (
          <Card
            selected={selected === elem.methodName}
            details={elem}
            handleClick={() => handleClick(elem.methodName)}
          />
        ))}
      </CardContainerContainer>
      {selected.toLowerCase() === "Bank".toLowerCase() && (
        <BankInfoComponent bankDetails={paymentData?.bankDetail} />
      )}
      {selected.toLowerCase() === "UPI".toLowerCase() && (
        <UPIDetails upiDetails={paymentData?.upiDetail} />
      )}
      {selected.toLowerCase() === "QR".toLowerCase() && (
        <QRcodeComponent qrDetails={paymentData?.qrCode} />
      )}
    </>
  );
}
