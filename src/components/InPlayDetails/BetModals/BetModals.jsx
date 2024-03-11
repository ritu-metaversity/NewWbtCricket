import { useContext, useEffect, useRef, useState } from "react";
import "./BetModals.css";
import { userServices } from "../../../utils/api/user/services";
import { useSearchParams } from "react-router-dom";
import { LoaderContext } from "../../../App";
import { inPlayDetailServices } from "../../../utils/api/inplayDetails/services";
import moment from "moment";
import { getDeviceType } from "../BetSlip";
import { Box, Modal } from "@mui/material";

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
const useFocusForDesktop = () => {
  const htmlElRef = useRef(null);
  const setInputFocusForDesktop = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setInputFocusForDesktop];
};

const BetModals = ({
  isOpen,
  onClose,
  setBet,
  bet,
  buttonData,
  event,
  sportsId,
  setBetResultMessage,
  setShow,Show
}) => {
  const [inputRef, setInputFocus] = useFocus();
  const [inputRefForDesktop, setInputFocusForDesktop] = useFocusForDesktop();
  const [betRecord, setBetRecord] = useState("");
  const [userIp, setUserIp] = useState("");
  const [timer, setTimer] = useState(0);
  const handleClose = () => {
    setShow(false);
    setBet(null);
  };

  // console.log(ShowTimer, "uytfvbnmuh")
  useEffect(() => {
    const timers = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearInterval(timers);
  }, [Show]);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const getIpy = async () => {
      const { response: ipRes } = await userServices.getIpfy();
      setUserIp(ipRes.ip);
    };
    getIpy();
  }, []);
  useEffect(() => {
    const timers = setTimeout(() => {
      if (timer > 0) {
        setTimer((o) => o - 1);
      } else {
        setBet(null);
      }
    }, 1000);
    return () => clearInterval(timers);
  }, [timer]);
  useEffect(() => {
    if (bet?.selectionId || bet?.marketId) {
      setTimer(10);
    }

    return () => {};
  }, [bet?.selectionId, bet?.isBack]);

  useEffect(() => {
    if (bet?.marketId) {
      setTimer(10);
    }

    return () => {};
  }, [bet?.marketId]);
  console.log(bet, "betbetbetbet");
  const { setLoading, loading } = useContext(LoaderContext);
  async function clickHandler() {
    setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: true }));
    const { response, error } = await inPlayDetailServices.updateBetPlace({
      ...bet,
      marketnameid: undefined,
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
      if (response?.status === true) {
        setShow(true);
        setBet(null)
      }
      setBetResultMessage({
        message: response?.message,
        data: true,
      });
    } else if (error) {
      setShow(true);
      setBet(null)
      setBetResultMessage({
        message: error?.message,
        data: false,
      });
    }
    setLoading && setLoading((prev) => ({ ...prev, ClickButtonValue: false }));
  }
  useEffect(() => {
    if (bet?.placeTime) {
      setInputFocus();
    }
  }, [bet?.placeTime]);
  useEffect(() => {
    if (bet?.placeTime) {
      setInputFocusForDesktop();
    }
  }, [bet?.placeTime]);
  return (
    <>
      <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
        <div className="bet-modal">
          <div className="modal-content">
            <div
              className="close-modal"
              style={{ cursor: "pointer" }}
              onClick={() => setBet(null)}>
              Cancel
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="bet-strip row">
                  <div className="col-6">
                    <label>Team</label>
                    <p>{bet?.name}</p>
                  </div>
                  <div className="col-3">
                    <label>Rate</label>
                    <p>{bet?.odds}</p>
                  </div>
                  <div className="col-3">
                    <label>Mode</label>
                    <p>{bet?.marketnameid}</p>
                  </div>
                </div>
                <div className="my-3 row">
                  <div
                    className="bet-price-btns col-lg-12 col-md-12 col-sm-12 col-12"
                    style={{ width: "100%" }}>
                    {buttonData &&
                      Object.values(buttonData)?.map((item) => (
                        <button
                          type="button"
                          className="bet-price-btn btn btn-primar"
                          style={{ color: "#fff" }}
                          onClick={() =>
                            setBet((o) => (o ? { ...o, stake: item } : null))
                          }>
                          {" "}
                          {item}
                        </button>
                      ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mbt-3 input-group">
                      <input
                        placeholder="Amount"
                        max={200000}
                        type="Number"
                        className="form-control"
                        id="stakeInput"
                        defaultValue={0}
                        style={{ fontSize: 18 }}
                        value={bet?.stake || 0}
                        ref={inputRefForDesktop}
                        onChange={(e) => {
                          setBet((o) =>
                            o ? { ...o, stake: Number(e.target.value) } : null
                          );
                        }}
                      />
                      <span
                        className="bg-danger text-white input-group-text"
                        id="basic-addon3">
                        {timer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-0 modal-footer"
              style={{
                padding: "0px",
                height: "35px",
              }}>
              <button
                style={{
                  width: "100%",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}
                type="button"
                onClick={clickHandler}
                disabled={loading.ClickButtonValue}
                className="w-100 m-0 btn btn-primary">
                Placebet
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default BetModals;
