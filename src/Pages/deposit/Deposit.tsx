import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../App";
import Deposit from "../../components/Deposit";

const DepositComp = () => {
  const nav = useNavigate();
  const { appData } = useContext(LoaderContext);

  useEffect(() => {
    if (appData && appData?.selfAllowed === false) {
      nav("/");
    }
  }, [appData]);

  return (
    <>
      <Deposit />
    </>
  );
};

export default DepositComp;
