import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Login from "./components/login";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";
import Complete from "./Pages/Complete/Complete";
import ChangePassword from "./Pages/ChangePassword";
import Layout from "./components/Layout";
import Ledger from "./Pages/Ledger";
import Profile from "./Pages/Profile";
import SetButtonValue from "./Pages/SetButtonValue";
import InPlayDetails from "./Pages/InPlayDetails";
import Account from "./Pages/accountStatement";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./components/Layout/snackBarUtil";
import LoginHistory from "./Pages/loginHistory";
import CurrentBet from "./Pages/CurrnetBet";
import BetHistory from "./Pages/BetHistory";
import LoginDashboard from "./components/loginDashboard";
import Register from "./components/register";
import Deposit from "./Pages/deposit/Deposit";
import Withdraw from "./Pages/withdraw/withdraw";
import { CircularProgress } from "@mui/material";
import OldChangePassword from "./components/Terms/OldChangePassword";
import Casino from "./components/casino/Casino";
import CasinoGame from "./components/casino/game/CasinoGame";
import { authServices } from "./utils/api/auth/services";
import Inplay from "./Pages/InPlay/Inplay";
import { Sports } from "./Pages/Sports";
import { selfServices } from "./utils/api/selfWithrawDeposit/service";

interface LoadingType {
  [x: string]: boolean;
}

interface LoaderContextINterface {
  loading: LoadingType;
  isSignedIn: boolean;
  appData: AppDataInterface | null;
  setLoading: Dispatch<SetStateAction<LoadingType>> | null;
}
const defaultValue: LoaderContextINterface = {
  isSignedIn: false,
  loading: {},
  appData: null,
  setLoading: null,
};

export const LoaderContext = createContext(defaultValue);

interface AppDataInterface {
  logo: string;
  mobileLogo: string;
  selfAllowed: boolean;
}

function App() {
  const [loading, setLoading] = useState<LoadingType>({});
  const [appData, setAppData] = useState<AppDataInterface | null>(null);

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const { pathname } = useLocation();
  const getSelfAllowed = async () => {
    const { response } = await selfServices.isSelfAllowed({
      // appUrl: "11hub.atozscore1234.com",
      appUrl: window.location.hostname,
    });

    if (response?.data) {
      setAppData(response.data);
    }
  };

  const validateJwt = useCallback(async () => {
    setIsSignedIn(false);
    const { response } = await authServices.validateToken();
    if (response?.status) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
      nav("/welcome");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (["welcome", "sign-in", "sign-up"].every((i) => !pathname.includes(i)))
        validateJwt();
    } else {
      setIsSignedIn(false);
    }
    return () => {};
  }, [pathname, validateJwt]);

  const nav = useNavigate();

  useEffect(() => {
    getSelfAllowed();
  }, [isSignedIn]);

  return (
    <LoaderContext.Provider
      value={{ loading, appData, isSignedIn, setLoading }}
    >
      {!Object.keys(loading).every((key) => loading[key] === false) && (
        <div className="loader-container">
          <CircularProgress />
          {/* <img src={loaderImg} alt="" height={60} width={60} /> */}
        </div>
      )}
      <div className="App">
        <SnackbarProvider maxSnack={5} autoHideDuration={1000}>
          <main>
            <Routes>
              <Route
                path="OldChangePassword"
                element={<OldChangePassword setIsSignedIn={setIsSignedIn} />}
              />

              <Route
                path="/welcome"
                element={<LoginDashboard isSignedIn={isSignedIn} />}
              />
              <Route
                path="/sign-in"
                element={<Login setIsSignedIn={setIsSignedIn} />}
              />
              <Route path="/sign-up" element={<Register />} />

              <Route
                path="/"
                element={
                  <Layout
                    setIsSignedIn={setIsSignedIn}
                    isSignedIn={isSignedIn}
                  />
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="in-play" element={<Inplay />} />
                <Route path="sports" element={<Sports />} />
                <Route path="in-play-details" element={<InPlayDetails />} />
                <Route path="complete-games" element={<Complete />} />
                <Route path="my-ledger" element={<Ledger />} />
                <Route path="profile" element={<Profile />} />
                <Route path="set-button-value" element={<SetButtonValue />} />
                <Route path="account-summary" element={<Account />} />
                <Route path="login-history" element={<LoginHistory />} />
                <Route path="bet-history" element={<BetHistory />} />
                <Route path="current-bet" element={<CurrentBet />} />
                <Route path="casino" element={<Casino />} />
                <Route path="casino/:id" element={<CasinoGame />} />
              </Route>
              <Route
                path="password-change"
                element={<ChangePassword setIsSignedIn={setIsSignedIn} />}
              />
              <Route path="terms" element={<Terms />} />
            </Routes>
          </main>

          <SnackbarUtilsConfigurator />
        </SnackbarProvider>
      </div>
    </LoaderContext.Provider>
  );
}

export default App;
