import { CopyAll } from "@mui/icons-material";
import React, { FC, useState } from "react";
import snackBarUtil from "../Layout/snackBarUtil";
import { BankDetailInterface } from "./PaymentMethods";
import { PaymentDetailContainer } from "./styledComponents";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Bank.css"
import { Modal } from "@mui/material";

interface Props {
  paymentData: any,
  type: any
}

export const CopyComp = ({ str }: { str: any }) => {
  const copy = () => snackBarUtil.success("Copied to your clipboard !!!");

  return (
    <CopyToClipboard text={str} onCopy={() => copy()}>
      <CopyAll
        sx={{ cursor: "pointer", fontSize: { xs: "0.9rem", md: "initial" } }}
      />
    </CopyToClipboard>
  );
};
const BankInfoComponent: FC<Props> = ({ paymentData, type }) => {
  // if (!bankDetails) return <></>;
  console.log(paymentData, type, "kuytrfvh")
  const [trueee, setTrueee] = useState(false);

  return (
    <PaymentDetailContainer>
      {paymentData?.length &&
        paymentData?.map((item: any) => {
          if (item.depositType === type)
            return (
              <div className="main_divvvvv">
                <div className="inner_divvvv1">
                  <span className="inner_span" style={{ width: type === "UPI" ? "" : "50%", display: "flex" }}>

                    Bank Name
                  </span>
                  <span style={{ width: type === "UPI" ? "" : "50%" }}>
                    {type === "UPI" ?
                      item.accountNumber
                      :
                      <>
                        <img src={item.accountNumber} alt="" style={{ width: "100%" }} onClick={() => setTrueee(true)} />
                        <Modal
                          open={trueee}
                          onClose={() => setTrueee(false)}
                          style={{ padding: "10px" }}
                          // m="xl"
                          className="slot_game"
                        >
                          <div className="modal_img_qr">
                            <img src={item.accountNumber} alt="" onClick={() => setTrueee(false)} />
                          </div>
                        </Modal>
                      </>

                    }


                  </span>
                </div>
                <div className="inner_divvvv2">
                  <span>

                    Account Holder Name
                  </span>
                  <span>
                    {item.accountHolderName}
                  </span>
                </div>

              </div>

            )
        })}

    </PaymentDetailContainer >

  );
};

export default BankInfoComponent;
