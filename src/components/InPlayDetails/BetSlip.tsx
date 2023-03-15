import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoaderContext } from "../../App";
import { sportServices } from "../../utils/api/sport/services";
import { userServices } from "../../utils/api/user/services";
import { BetDetailsInterface } from "./types";

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

interface Props {
  bet: BetDetailsInterface | null;
  setBet: Dispatch<SetStateAction<BetDetailsInterface | null>>;
  buttonData: { [x: string]: number };
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const BetSlip: FC<Props> = ({ bet, setBet, buttonData }) => {
  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    const getIpy = async () => {
      const { response: ipRes } = await userServices.getIpfy();
      setUserIp(ipRes.ip);
    };
    getIpy();
  }, []);
  const { setLoading, loading } = useContext(LoaderContext);
  async function clickHandler() {
    setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: true }));
    const { response } = await sportServices.updateBetPlace({
      ...bet,
      userIp,
      deviceInfo: {
        userAgent: window.navigator.userAgent,
        browser: "Chrome",
        device: "Macintosh",
        deviceType: getDeviceType(),
        os: "Windows",
        os_version: "windows-10",
        browser_version: "108.0.0.0",
        orientation: "landscape",
      },
    });
    if (response) {
      setBet(null);
    }
    setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: false }));
  }
  return (
    <Modal
      open={Boolean(bet)}
      onClose={() => setBet(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {bet ? (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {bet?.marketName}
          </Typography>

          <Box
            display="flex"
            flexDirection={"column"}
            gap={2}
            my={3}
            alignItems="center"
          >
            <div style={{ display: "flex" }}>
              <TextField
                size="small"
                sx={{ width: "200px", margin: "auto" }}
                value={bet.stake}
                onChange={(e) =>
                  setBet((o) =>
                    o ? { ...o, stake: Number(e.target.value) } : null
                  )
                }
              />
              <p
                style={{ marginLeft: "20px" }}
                className="MuiTypography-root MuiTypography-body1 css-33qhfi"
              >
                Profit: {(bet.odds - 1) * bet.stake}
              </p>
            </div>
            <Box display={"flex"} gap={1} flexWrap="wrap">
              {Object.keys(buttonData)?.map((item: any) => (
                <Button
                  sx={{ flex: 3 }}
                  variant="outlined"
                  onClick={() =>
                    setBet((o) =>
                      o ? { ...o, stake: Number(buttonData[item]) } : null
                    )
                  }
                >
                  {buttonData[item]}
                </Button>
              ))}
            </Box>
            <Button
              variant="contained"
              onClick={clickHandler}
              disabled={loading.ClickButtonValue}
              sx={{ width: "200px", m: "auto" }}
            >
              Bet
            </Button>
          </Box>
        </Box>
      ) : (
        <h1>"No Bet Selected"</h1>
      )}
    </Modal>
  );
};

export default BetSlip;
