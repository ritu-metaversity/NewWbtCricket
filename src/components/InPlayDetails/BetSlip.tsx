import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoaderContext } from "../../App";
import { inPlayDetailServices } from "../../utils/api/inplayDetails/services";
import { userServices } from "../../utils/api/user/services";
import { BetDetailsInterface, ProfitObjectInterface } from "./types";

export const getDeviceType = () => {
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
  profits: ProfitObjectInterface;
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

const BetSlip: FC<Props> = ({ bet, setBet, profits, buttonData }) => {
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
    const { response } = await inPlayDetailServices.updateBetPlace({
      ...bet,
      placeTime: moment(bet?.placeTime).format("YYYY-MM-DD hh:mm:ss.SSS"),
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
          <Typography id="modal-modal-title" py={1} fontWeight={700}>
            {bet?.name || "dasf"}
          </Typography>
          <Box
            display="flex"
            flexDirection={"column"}
            gap={2}
            my={3}
            alignItems="center"
          >
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  sx={{
                    width: "200px",
                    margin: "auto",
                    bgcolor: bet?.isBack ? "#7dc7fc" : "#ff7bac",
                  }}
                  value={bet.stake}
                  onChange={(e) =>
                    setBet((o) =>
                      o ? { ...o, stake: Number(e.target.value) } : null
                    )
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <p
                  style={{ marginLeft: "20px" }}
                  className="MuiTypography-root MuiTypography-body1 css-33qhfi"
                >
                  Profit:
                  {bet.isBack
                    ? bet.isFancy
                      ? (bet.stake * bet.priceValue) / 100
                      : (bet.marketName === "Bookmaker"
                          ? (bet.odds * bet.stake) / 100
                          : (bet.odds - 1) * bet.stake
                        ).toFixed(2)
                    : bet.stake}
                </p>
              </Grid>
            </Grid>
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
          {bet?.marketName === "Bookmaker"
            ? profits.Bookmaker?.filter(
                (item) => item?.mid === bet?.marketId
              ).map((profit) => <BetResult {...profit} />)
            : bet?.marketName &&
              profits.Odds[bet?.marketId]?.map((profit) => (
                <BetResult {...profit} />
              ))}
        </Box>
      ) : (
        <h1>"No Bet Selected"</h1>
      )}
    </Modal>
  );
};
function BetResult({ value, title }: { value: number; title: string }) {
  return (
    <Box display="flex" m={1} justifyContent={"space-between"}>
      <Typography color="text.secondary" fontSize={"0.8rem"}>
        {title}
      </Typography>
      <Typography color={value >= 0 ? "green" : "red"} fontSize={"0.8rem"}>
        {Number(value?.toFixed(2))}
      </Typography>
    </Box>
  );
}
export default BetSlip;
