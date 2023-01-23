import { Box, Button, FormControlLabel, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Deposit = () => {

    const [file,setFile]= useState();
    const [imageUrl, setImageUrl]=useState();
   function handleChange(event:any){
        setFile(event.target.files[0])
        var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event: any) => { // called once readAsDataURL is completed
        setImageUrl(event.target.result);
    }
  }

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
        Deposit
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
      <Box textAlign={"left"}>
        <TextField
        type={"file"}
          required
          name="password"
          inputProps={{accept:"image/*"}}
        //   value={password}
          onChange={handleChange}
          fullWidth
        />{
         imageUrl &&  <img src={imageUrl} style={{width:"150px", height:"150px", textAlign:"center"}} />
        }
        
       
      </Box>
      <Button variant="contained" size="large"  fullWidth>
        Deposit
      </Button>
    </Box></>
  );
};

export default Deposit;
