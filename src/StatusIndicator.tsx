import { Alert, Box, Snackbar, SnackbarContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import snackBarUtil from "./components/Layout/snackBarUtil";
const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true;
const useNavigatorOnLine = () => {
    const [status, setStatus] = React.useState(getOnLineStatus());
    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);
    React.useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);
    return status;
};
const StatusIndicator = () => {
    const isOnline = useNavigatorOnLine();
    // useEffect(() => {
    //     isOnline &&
    //         snackBarUtil.success("Back online")

    //     return () => {
    //     }
    // }, [isOnline])

    return <>


        {!isOnline ?
            <Snackbar open={!isOnline} >

                <Alert severity="error" variant="filled" icon={false} sx={{ display: 'flex', alignItems: 'center' }}>
                    {!isOnline && <Box sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: '14px', textTransform: 'capitalize' }}>
                            You seems Offline
                        </Typography>
                    </Box>}
                </Alert>
            </Snackbar> : <></>
        }

    </>

};
export default StatusIndicator