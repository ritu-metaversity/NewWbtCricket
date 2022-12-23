import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect } from 'react'
import BacktoMenuButton from '../../components/BacktoMenuButton';
import StickyHeadTable from '../../components/custom/Table';
import { userServices } from "../../utils/api/user/services";


export interface Column {
  id: "byUser" | "action" | "createdOn" | "deviceInfo" |  "userId" | "ipAddress" |string;
  label: string;
  minWidth?: number;
  colorCoded?: boolean;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "ipAddress", label: "Ip Address", minWidth: 100 },
  { id: "byUser", label: "Action By", align: "center", minWidth: 50 },
  {
    id: "userId",
    label: "User",
    minWidth: 20,
    align: "center",
    
  },
  {
    id: "action",
    label: "Action",
    minWidth: 20,
    align: "center",
  },
  {
    id: "deviceInfo",
    label: "Device Info",
    minWidth: 20,
    align: "center",
  },
  {
    id: "createdOn",
    label: "Created Data",
    minWidth: 20,
    align: "center",
  },
  
  
  
];

interface Data {
    ipAddress: string;
    byUser: string;
    userId: string;
  deviceInfo: string;
  action:string;
  createdOn:string;


}

// function createData(
//     ipAddress: string,
//   lastLogin: string,
//   userid: string,
//   deviceInfo: string,
// ): Data {
 
//   return { ipAddress, lastLogin, userid, deviceInfo};
// }

  export const ChnagePasswordHistory : FC<any>=()=> {
  
//    let data:LoginHistoryResponse[]=logindata.logindata;

const [changePasswordData, setChangePasswordData]= React.useState([]); 
useEffect(() => {
    const getNewEvent = async () => {
      if(changePasswordData.length) return;
      const { response } = await userServices.getChangePasswordHistory();
      if (response?.data) {
        if (response?.data?.length > 0) {
            setChangePasswordData(response.data)
        }
      } 
      else {
        return;
      }
    };
    getNewEvent();
  }
  , [changePasswordData]);
 
    return (
      <Box sx={{ m: "auto", maxWidth: "lg" }}>
        { changePasswordData.length > 0 ?(
        <StickyHeadTable rows={changePasswordData} columns={columns} title={"Change Password History"} />) : 
        ( <Typography mt="15vh" variant="h4" color="error">
        {"No Data Found"}
      </Typography>)}
      </Box>
    );
  }