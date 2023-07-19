import { Button, Grid, Tab, Tabs } from "@mui/material";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { casinoService } from "../../utils/api/casino/service";
import { ProfitLossPayload } from "../../utils/api/user/services";
import { CasinoList } from "../../components/casino/Casino";
import { SummaryCardProps } from "../../components/Inplay/SummaryCard";
import { LoaderContext } from "../../App";
import { sportServices } from "../../utils/api/sport/services";

const style = {
  padding: "10px",

};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  width: "100%",
};
const inputStyle1 = {
  padding: "10px",
  borderRadius: "5px",
  width: "100%",
}

interface Props {
  formData: ProfitLossPayload;
  handleChange: (e: any) => void;
  handleClick: () => void;
  setFormData: Dispatch<SetStateAction<ProfitLossPayload>>;
}

const lableStyle = { alignSelf: "center" };

const Filter: FC<Props> = ({
  formData,
  setFormData,
  handleChange,
  handleClick,
}) => {
  const [tab, setTab] = useState(0);

  const [casinoTypes, setCasinoTypes] = useState<
    {
      id: number;
      logo: string;
      name: string;
    }[]
  >([]);

  const [casinoList, setCasinoList] = useState<CasinoList[]>([]);

  const nav = useNavigate();
  const getCasinoList = async () => {
    const isSignedIn = localStorage.getItem("token");

    if (!isSignedIn) {
      nav("/");
      return;
    }
    if (tab === 0) return;

    const { response } = await casinoService.getCasinoListByType(
      Number(formData.sportId)
    );

    if (response?.data) {
      setCasinoList(response.data || []);
      // if (response.data[0]) {
      // setFormData((o) => ({ ...o, matchId: response.data[0].gameId }));
      // }
    } else {
      setCasinoList([]);
    }
  };

  useEffect(() => {
    getCasinoList();
  }, [formData.sportId]);

  useEffect(() => {
    if (tab === 0) {
      if (activeSportList[0]) {
        setFormData((i) => ({
          ...i,
          sportId: activeSportList[0].sportId.toString(),
        }));
      }
    } else {
      if (casinoTypes[0]) {
        setFormData((i) => ({ ...i, sportId: casinoTypes[0].id.toString() }));
      }
    }
  }, [tab]);

  useEffect(() => {
    const getCasinoTypes = async () => {
      const isSignedIn = localStorage.getItem("token");
      if (!isSignedIn) {
        nav("/");
        return;
      }
      const { response } = await casinoService.getCasinoTypes();
      if (response) {
        setCasinoTypes(response?.data || []);
        if (response.data[0]) {
          //   setValue(response.data[0].id);
          getCasinoList();
        }
      }
    };
    getCasinoTypes();
  }, []);

  const [activeSportList, setActiveSportList] = useState<
    { sportId: number; sportName: string }[]
  >([]);
  const [activeEventList, setActiveEventList] = useState<SummaryCardProps[]>(
    []
  );
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const getList = async () => {
      setLoading && setLoading((prev) => ({ ...prev, Inplay: true }));
      const { response } = await sportServices.activeSportList();
      console.log(JSON.stringify(response));
      if (response?.data) {
        setActiveSportList(response.data);
        // if (response.data[0]) {
        // setFormData((o) => ({ ...o, sportId: response.data[0].sportId }));
        // }
      }
      setLoading && setLoading((prev) => ({ ...prev, Inplay: false }));
    };
    getList();
  }, [setFormData, setLoading]);

  useEffect(() => {
    const getNewEvent = async () => {


      setLoading && setLoading((prev) => ({ ...prev, getNewEvent: true }));
      const { response } = await sportServices.activeEventFromSport(4);
      console.log(formData.sportId, "jhygtfds")
      if (response?.data) {
        if (response?.data?.length > 0) {
          setActiveEventList(response.data);
          // setFormData((o) => ({ ...o, matchId: response.data[0].matchId }));
        }
      } else {
        setActiveEventList([]);
      }
      setLoading && setLoading((prev) => ({ ...prev, getNewEvent: false }));

    };
    getNewEvent();
  }, []);
  useEffect(() => {
    const getNewEvent = async () => {
      console.log(activeSportList);
      if (!activeSportList.length) return;

      setLoading && setLoading((prev) => ({ ...prev, getNewEvent: true }));
      const { response } = await sportServices.activeEventFromSport(
        Number(formData.sportId)
      );
      console.log(formData.sportId, "jhygtfds")
      if (response?.data) {
        if (response?.data?.length > 0) {
          setActiveEventList(response.data);
          // setFormData((o) => ({ ...o, matchId: response.data[0].matchId }));
        }
      } else {
        setActiveEventList([]);
      }
      setLoading && setLoading((prev) => ({ ...prev, getNewEvent: false }));
    };
    if (tab === 0) {
      getNewEvent();
    }
  }, [formData.sportId, setFormData, setLoading]);

  useEffect(() => {
    if (tab === 0) {
      setFormData((o) => ({ ...o, sportId: "4" }));
    } else if (tab === 1) {
      setFormData((o) => ({ ...o, sportId: "323334" }));
    }
  }, [tab, setFormData]);
  return (
    <>
      <Tabs value={tab} sx={{ m: 2 }} onChange={(e, value) => setTab(value)}>
        <Tab value={0} label="Sports" />
        <Tab value={1} label="Casino" />
      </Tabs>
      <form style={style}>
        <Grid container>
          <Grid item xs={6} md={2} style={style}>
            <label style={lableStyle} htmlFor="fromDate">
              From Date
            </label>
            <input
              style={inputStyle}
              type="date"
              defaultValue={formData.fromDate}
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
              name="fromDate"
            />
          </Grid>

          <Grid item xs={6} md={2} style={style}>
            {" "}
            <label style={lableStyle} htmlFor="toDate">
              To Date
            </label>
            <input
              style={inputStyle}
              type="date"
              defaultValue={formData.toDate}
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
              name="toDate"

            />
          </Grid>
          <Grid item xs={6} md={2} style={style}>
            <label style={lableStyle} htmlFor="type">
              {tab === 1 ? "Select Casino Type" : "Select Sport"}
            </label>
            <select
              value={formData.sportId}
              style={inputStyle1}
              onChange={handleChange}
              name="sportId"

            >
              {/* <option value={""}> Select</option> */}

              {tab === 1
                ? casinoTypes.map((casino) => (
                  <option value={casino.id}>{casino.name}</option>
                ))
                : activeSportList.map((sport) => (
                  <option value={sport.sportId}>{sport.sportName}</option>
                ))}
            </select>
          </Grid>
          <Grid item xs={6} md={2} style={style}>
            {" "}
            <label style={lableStyle} htmlFor="type">
              {tab === 1 ? "Select Casino" : "Select Match"}
            </label>
            <select

              value={formData.matchId}
              style={inputStyle1}
              onChange={handleChange}
              name="matchId"
            >
              <option value={""}>Select</option>
              {tab === 1
                ? casinoList.map((casino) => (
                  <option
                    key={casino.gameId + casino.gameCode}
                    value={casino.gameId}
                  >
                    {casino.gameName}
                  </option>
                ))
                : activeEventList.map((event) => (
                  <option key={event.matchId} value={event.matchId}>
                    {event.matchName}
                  </option>
                ))}
            </select>
          </Grid>
          <Grid
            item
            xs={6}
            md={2}
            style={style}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Button
              fullWidth
              sx={{ mb: "5px" }}
              type="button"
              variant="contained"
              onClick={handleClick}
            >
              search
            </Button>
          </Grid>
          {/* <label style={lableStyle} htmlFor="noOfRecords">No Of Rows</label>
        <select style={inputStyle} onChange={handleChange} name="noOfRecords">
          <option selected value="1">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        */}
        </Grid>
      </form>
    </>
  );
};

export default Filter;
