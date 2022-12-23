import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect } from 'react'
import BacktoMenuButton from '../../components/BacktoMenuButton'
import StickyHeadTable from '../../components/custom/Table'
import { LoginHistoryResponse } from './LoginHistory'
import { userServices } from "../../utils/api/user/services";


export interface Column {
  id: "ip" | "lastLogin" | "user" | "deviceInfo" | string;
  label: string;
  minWidth?: number;
  colorCoded?: boolean;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "ip", label: "Ip Address", minWidth: 100 },
  { id: "lastLogin", label: "last Login", align: "center", minWidth: 50 },
  {
    id: "userid",
    label: "Login User",
    minWidth: 20,
    align: "center",
    
  },
  {
    id: "deviceInfo",
    label: "Login Device",
    minWidth: 20,
    align: "center",
  },
  
];

interface Data {
  ip: string;
  lastLogin: Date;
  userid: string;
  deviceInfo: string;

}

function createData(
  ip: string,
  lastLogin1:string,
  userid: string,
  deviceInfo: string,
): Data {
  var lastLogin = new Date(lastLogin1);
  return { ip, lastLogin, userid, deviceInfo};
}

  export const LoginhistoryData : FC<any>=()=> {
  
    const [loginHistory,setLoginHistory] =React.useState<LoginHistoryResponse[]>([]);
      useEffect(() => {
        const getNewEvent = async () => {
          if(loginHistory.length) return;
          const { response } = await userServices.getLoginHistory();
          if (response?.data) {
            if (response?.data?.length > 0) {
              console.log(JSON.stringify(response.data.ip )," this is response")
              setLoginHistory([...response.data])
            }
          } 
          else {
            setLoginHistory([]);
          }
        };
        getNewEvent();
      }
      , [loginHistory]);

      // const dateChange = loginHistory.filter((c) =>{
      //   c.lastLogin === new Date(c.lastLogin);
      //   return {
      //     ...loginHistory,
      //     loginHistory.lastLogin=dateChange
      //   }
      // } 
    return (
      <Box sx={{ m: "auto", maxWidth: "lg" }}>


        {loginHistory?.length > 0 ? (
        <StickyHeadTable rows={loginHistory} columns={columns} title={"Login History"} />) : (
          <Typography mt="15vh" variant="h4" color="error">
          {"No Data Found"}
        </Typography>)

  }
      </Box>
    );
  }


