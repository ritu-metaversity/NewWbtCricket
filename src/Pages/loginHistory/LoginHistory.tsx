import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BacktoMenuButton from "../../components/BacktoMenuButton";
import StickyHeadTable from "../../components/custom/Table";
import { userServices } from "../../utils/api/user/services";
import { LoginhistoryData } from "./LoginHistoryDetails";
import { ChnagePasswordHistory } from "./ChangePasswordHistory";

enum SelectedTab {
  LoginHistory,
  PasswordChangeHistory,
}

// const rows = [
//   createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, -30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, 30),
//   createData("SYDNEY SIXERS W 15/10/2022", 44, -300),
// ];

export interface LoginHistoryResponse {
  ip: string;
  lastLogin: string;
  userid: string;
  deviceInfo: string;
}

const LoginHistory = () => {
  // const [loginHistory,setLoginHistory] =React.useState<LoginHistoryResponse[]>([]);
  const [selectedTab, setSelectedTab] = React.useState(
    SelectedTab.LoginHistory
  );
  // useEffect(() => {
  //   const getNewEvent = async () => {
  //     if(loginHistory.length) return;
  //     const { response } = await userServices.getLoginHistory();
  //     if (response?.data) {
  //       if (response?.data?.length > 0) {

  //         console.log(JSON.stringify(response.data.ip )," this is response")
  //         setLoginHistory([...response.data])
  //       }
  //     }
  //     else {
  //       setLoginHistory([]);
  //     }
  //   };
  //   getNewEvent();
  // }
  // , [loginHistory]);
  return (
    <Box maxWidth={900} mx="auto">
      <BacktoMenuButton />
      <Tabs
        value={selectedTab}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
      >
        <Tab label="Login History" />
        <Tab label="User Password Change History" />
      </Tabs>
      {selectedTab.toString() === "0" ? (
        <LoginhistoryData />
      ) : (
        <ChnagePasswordHistory />
        // <Typography mt="15vh" variant="h4" color="error">
        //   {"No active event found"}
        // </Typography>
      )}
    </Box>
  );
};

export default LoginHistory;
