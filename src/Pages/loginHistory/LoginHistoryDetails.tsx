import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useCallback, useContext, useEffect } from "react";
import StickyHeadTable from "../../components/custom/Table";
import { LoginHistoryResponse } from "./LoginHistory";
import { userServices } from "../../utils/api/user/services";
import { LoaderContext } from "../../App";
import moment from "moment";
import { Button } from "react-bootstrap";
import "./LoginHistory.css"

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

export interface HistoryPayload {
  fromDate: string;
  pageSize: number;
  toDate: string;
  type: "login";
  userId: string;
}

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
};
const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  marginRight: " 8px",
  width: "100%",
  maxWidth: "200px",
};
export const LoginhistoryData: FC<any> = () => {
  const [loginHistory, setLoginHistory] = React.useState<
    LoginHistoryResponse[]
  >([]);
  const { loading, setLoading } = useContext(LoaderContext);
  const lableStyle = { alignSelf: "center" };

  const date = new Date();
  const futureDate = date.getDate() - 60;
  date.setDate(futureDate);
  const defaultValue = moment().subtract(7, "days").format("YYYY-MM-DD");
  const currentValue = moment().format("YYYY-MM-DD");

  const [formData, setFormData] = React.useState({
    fromDate: defaultValue,
    toDate: currentValue,
    type: "login",
    pageSize: 25,
    userId: "",
  });

  const getNewEvent = useCallback(async () => {
    setLoading && setLoading((prev) => ({ ...prev, loginHistory: true }));
    const formDAta: any = { ...formData };
    formDAta.fromDate = moment(formData.fromDate).format("DD-MM-YYYY");
    formDAta.toDate = moment(formData.toDate).format("DD-MM-YYYY");
    const { response } = await userServices.getLoginHistory(formDAta);
    if (response?.data) {
      if (response?.data?.length > 0) {
        // console.log(JSON.stringify(response.data.ip), " this is response");
        setLoginHistory([...response.data]);
      }
    } else {
      setLoginHistory([]);
    }
    setLoading && setLoading((prev) => ({ ...prev, loginHistory: false }));
  }, [formData, setLoading]);

  useEffect(() => {
    getNewEvent();
  }, [getNewEvent]);

  function handleChange(event: { target: { name: any; value: any } }) {
    setFormData((preState) => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      };
    });
  }
  console.log(formData, "form");
  return (
    <Box sx={{ m: "auto", maxWidth: "lg" }}>
      {loginHistory?.length > 0 ? (
        <>
          <form style={style}>
            <Grid container>
              <div className="date_time">
                <div className="time_input">
                  <div className="from_date">

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
                  </div>

                  {" "}
                  <div className="from_date">

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
                  </div>
                </div>

                <button
                  // fullWidth
                  className="button_datetime"
                  type="button"
                  // variant="contained"
                  onClick={getNewEvent}
                >
                  search
                </button>
              </div>

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
          <StickyHeadTable
            rows={loginHistory}
            columns={columns}
            title={"Login History"}
          />
        </>
      ) : (
        !loading.loginHistory && (
          <Typography mt="15vh" variant="h4" color="error">
            {"No Data Found"}
          </Typography>
        )
      )}
    </Box>
  );
};
