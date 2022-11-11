import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { HeaderTextStyle, UserIconImage } from "./styledComponents";

const data = {
  clientName: "SABKA CLIENT",
  coins: 300,
};
const Headers = () => {
  const { clientName, coins } = data;
  return (
    <AppBar position="sticky" color="primary" sx={{py: 0.5 }} enableColorOnDark>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton href="/profile" >
          <UserIconImage src="/user.png" alt="" />
        </IconButton>
        <Box>
          <HeaderTextStyle>{clientName}</HeaderTextStyle>
          <HeaderTextStyle>Coins: {coins}</HeaderTextStyle>
        </Box>
        <Box>
          <IconButton>
            <LogoutIcon fontSize="large" htmlColor="white" />
          </IconButton>
          <Typography>Logout</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// export default function ProminentAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <StyledToolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h5"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, alignSelf: "flex-end" }}
//           >
//             MUI
//           </Typography>
//           <IconButton size="large" aria-label="search" color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton
//             size="large"
//             aria-label="display more actions"
//             edge="end"
//             color="inherit"
//           >
//             <MoreIcon />
//           </IconButton>
//         </StyledToolbar>
//       </AppBar>
//     </Box>
//   );
// }
export default Headers;
