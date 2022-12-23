import { Typography } from "@mui/material";
import React, { useState } from "react";
import Dialog from "../custom/Dialog";
import { FooterStyle, HeaderStyle, WelcomeModalBodyP } from "./styledComponents";

const titleComponent = (
  <>
    <HeaderStyle>
      Welcome to
    </HeaderStyle>
    <HeaderStyle>
      Mybet
    </HeaderStyle>
  </>
);

const actionComponent = <FooterStyle>
    Thanks for Visiting Us.
</FooterStyle>
const WelcomeDialog = () => {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      titlSD={titleComponent}
      actions={actionComponent}
      open={open}
      onClose={onClose}
    >
      <WelcomeModalBodyP>
        अगर कोई सेशन रनिंग मै चल रहा है और टीम जीत जाती है या आलआउट हो जाती है
        तो सेशन डिक्लेअर होगा।
      </WelcomeModalBodyP>
    </Dialog>
  );
};

export default WelcomeDialog;