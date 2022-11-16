import React, { FC } from "react";
import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

interface Props extends DialogProps {
  titlSD?: string | any;
  actions?: any;
}
const Dialog: FC<Props> = ({ titlSD, maxWidth, actions, ...restProps }) => {

    const handleCloseIconClick = (e:any) => {
        if (restProps.onClose) {
          restProps.onClose(e, "backdropClick")
          console.log(restProps)
        }
    }
  return (
    <MuiDialog {...restProps} fullWidth maxWidth={maxWidth || "xs"}>
      <DialogTitle bgcolor={"primary.main"} px={4} position="relative">
        <>
          {titlSD}
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
             onClick={handleCloseIconClick}
          >
            <CloseIcon htmlColor="white" />
          </IconButton>
        </>
      </DialogTitle>
      <DialogContent>{restProps.children}</DialogContent>
      <DialogActions
        sx={{ p: 2, bgcolor: "primary.main", justifyContent: "center" }}
      >
        {actions}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
