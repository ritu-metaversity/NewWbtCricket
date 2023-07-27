import { AmountForm } from "./AmountForm";
import { PaymentMethods } from "./PaymentMethods";
import React, { FC, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ImageUploadContainer } from "./styledComponents";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { selfServices } from "../../utils/api/selfWithrawDeposit/service";
import snackBarUtil from "../Layout/snackBarUtil";

interface Props {
  getDepositList: () => Promise<void>;
}
const DepositManually: FC<Props> = ({ getDepositList }) => {
  const [amount, setAmount] = useState(0);
  const [files, setFiles] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (files?.size && files?.size / (1024 * 1024) > 6) {
      return snackBarUtil.error("File should not be bigger than 6mb !!!");
    }
    const data = new FormData();
    data.append("amount", amount.toString());

    data.append("image", files || "");
    setLoading(true);
    const { response } = await selfServices.selfDeposit(data);
    if (response) {
      setAmount(0);
      setFiles(null);
      getDepositList();
    }
    setLoading(false);
  };
  console.log(files, "file");
  return (
    <>
      {loading && (
        <Box
          sx={{ opacity: 0.8, zIndex: 20 }}
          height={"100%"}
          position="absolute"
          width={"100%"}
        >
          {/* <Loading /> */}
        </Box>
      )}
      <AmountForm amount={amount} setAmount={setAmount} />
      {amount >= 100 && (
        <Box maxWidth={{ md: 500 }} m={{ md: "auto" }}>
          <h2>Pay {amount}/-</h2>
          <PaymentMethods />
          <label style={{ width: "100%" }}>
            {files ? (
              <img
                style={{ maxWidth: "90%", margin: "auto" }}
                src={URL.createObjectURL(files)}
                alt="uploaded_img"
              />
            ) : (
              <ImageUploadContainer>
                <AddCircleIcon htmlColor="blue" />
                <Typography>Click here to upload payment screenshot</Typography>
              </ImageUploadContainer>
            )}
            <input
              onChange={(e) => {
                if (e.target.files?.length) {
                  if (e.target.files[0]?.type.includes("image")) {
                    setFiles(e.target.files[0]);
                  } else {
                    snackBarUtil.error("Only image files allowed.");
                  }
                }
              }}
              // onChange={(e) => e.target.files && setFiles(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
              accept="image/*"
            />
          </label>
          {files && (
            <Button
              fullWidth
              disabled={loading}
              sx={{ my: 3 }}
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              style={{ backgroundColor: "#7b7c7f" }}
            >
              Submit
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default DepositManually;
