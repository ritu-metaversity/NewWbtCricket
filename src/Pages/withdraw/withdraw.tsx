import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Withdraw = () => {
  
  return (
    <>
    <Box
   maxWidth={"450px"}
   mx="auto"
   mb="2em"
   p="2em"
   display={"flex"}
   flexDirection="column"
   gap={"1.5em"}
 >
   {/* <Typography variant="h1" fontWeight={"700"} color="primary">
     MyBet
   </Typography> */}
   <Typography textAlign={"center"} color="primary" fontWeight="bold" variant="h5">
     Withdraw
   </Typography>
   <TextField
     //   InputProps={{
     //       startAdornment:
     //      <b>C</b>
     //   }}
     required
     label="amount"
     name="amount"
     fullWidth
     type={"number"}
     // value={userId}
     // onChange={handleChange}
   />
   <Box textAlign={"left"} >
     <TextField
     type={"number"}
       required
       label="Account Number"
       name="accountNo"
     //   value={password}
     //   onChange={handleChange}
       fullWidth
     />
     </Box>
     <Box textAlign={"left"} >

<TextField
     type={"text"}
       required
       label="Account Name"
       name="accountName"
     //   value={password}
     //   onChange={handleChange}
       fullWidth
     />
</Box>
<Box textAlign={"left"} >
<TextField
     type={"text"}
       required
       label="Bank Name"
       name="bankName"
     //   value={password}
     //   onChange={handleChange}
       fullWidth
     />
</Box>
<Box textAlign={"left"} >
<TextField
     type={"text"}
       required
       label="IFSC"
       name="ifsc"
     //   value={password}
     //   onChange={handleChange}
       fullWidth
     />
</Box>
<Box textAlign={"left"} >
<TextField
     type={"text"}
       required
       label="Account Type"
       name="type"
     //   value={password}
     //   onChange={handleChange}
       fullWidth
     />
     
   </Box>
   <Button variant="contained" size="large"  fullWidth>
     Withdraw
   </Button>
 </Box></>
  );
};

export default  Withdraw;
