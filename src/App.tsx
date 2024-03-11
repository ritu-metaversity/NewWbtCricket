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
import { Route, Routes, useLocation } from "react-router-dom";
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
import Deposit from "../src/components/Deposit/Deposit";
import Withdraw from "../src/components/Withdraw/Withdraw";
import { CircularProgress } from "@mui/material";
import OldChangePassword from "./components/Terms/OldChangePassword";
import Casino from "./components/casino/indianCasion/Aura/Casino";
import CasinoGame from "./components/casino/game/CasinoGame";
import { authServices } from "./utils/api/auth/services";
import Inplay from "./Pages/InPlay/Inplay";
import { Sports } from "./Pages/Sports";
import { selfServices } from "./utils/api/selfWithrawDeposit/service";
import { ImCross } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import StatusIndicator from "./StatusIndicator";
import axios from "axios";
import ProfitAndLossPageeee from "./Pages/profitAndLoss/ProfitAndLossPageeee";
import AccountStatementNewDushyant from "./Pages/accountStatementNewDushyant/AccountStatementNewDushyant";
import Virtualcasino from "./components/casino/VirtualCasino/Virtualcasino";
import VirtualCasinoPage from "./components/casino/VirtualCasino/VirtualCasinoPage";
import LiveCasionList from "./components/casino/LiveCasino/LiveCasionList";
import LiveCasionGamePage from "./components/casino/LiveCasino/LiveCasionGamePage";
import IndianCasinoPage from "./components/casino/indianCasion/Aura/IndianCasinoPage";
import LotteryCasionList from "./components/casino/Lottery/LotteryCasionProvider";
import LotteryCasionListPage from "./components/casino/Lottery/LotteryCasionListPage";
import LotteryCasionListGamePage from "./components/casino/Lottery/LotteryCasionListGamePage";
import SlotsGamesPage from "./components/casino/SlotsGames/SlotsGamesPage";
import SlotsGamesProviderGameList from "./components/casino/SlotsGames/SlotsGamesProviderGameList";
import SlotsGamesProvider from "./components/casino/SlotsGames/SlotsGamesProvider";
import FantasyGameProvider from "./components/casino/FantasyGame/FantasyGameProvider";
import FantasyGameList from "./components/casino/FantasyGame/FantasyGameList";
import FantasyGamePage from "./components/casino/FantasyGame/FantasyGamePage";
import IndianCasion from "./components/casino/indianCasion/IndianCasion";
import SuperNowa from "./components/casino/indianCasion/SuperNowa/SuperNowa";
import SuperNowaPage from "./components/casino/indianCasion/SuperNowa/SuperNowaPage";
import SportBook from "./Pages/Home/SportBook";
// import WhatsAppIcon from "./components/whatsAppIcon/WhatsAppIcon";


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
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [welcomePopup, setWelcomePopup] = useState<boolean | null>(null);

  const { pathname } = useLocation();
  const getSelfAllowed = async () => {
    const { response } = await selfServices.isSelfAllowed({
      appUrl: window.location.hostname.replace('www.','')
    });

    if (response?.data) {
      setAppData(response.data);
    }
  };

  const validateJwt = useCallback(async () => {
    const { response } = await authServices.validateToken();
    if (response?.status) {
      setIsSignedIn(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let timer: ReturnType<typeof setInterval>;
    if (token) {
      if (
        ["welcome", "sign-in", "sign-up", "OldChangePassword"].every(
          (i) => !pathname.includes(i)
        )
      ) {
        validateJwt();
        timer = setInterval(() => validateJwt(), 1000);
      }
    } else {
      setIsSignedIn(false);
    }
    return () => clearInterval(timer);
  }, [pathname, validateJwt]);

  // let REACT_APP_API_URL_PLAY_INDIA = process.env.REACT_APP_API_URL_PLAY_INDIA;


  // useEffect(() => {
  //   const TokenId = localStorage.getItem("token");
  //   if (TokenId) {

  //     axios
  //       .post(
  //         `${REACT_APP_API_URL_PLAY_INDIA}/api/qtech/authentication`,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${TokenId}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         localStorage.setItem("GameToken", response?.data?.data?.access_token);
  //       })
  //   }

  // }, [])



  useEffect(() => {
    getSelfAllowed();
  }, [isSignedIn]);
  useEffect(() => {
    let appUrll = window.location.hostname.replace('www.','');


    axios
      .post(
        `${REACT_APP_API_URL}/login/is-self-by-app-url`,
        { appUrl: appUrll }
      )
      .then((res) => {
        var link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = res.data.data.favicon;
        document.getElementsByTagName('head')[0].appendChild(link);
      })
  }, []);
  return (
    <LoaderContext.Provider
      value={{ loading, appData, isSignedIn, setLoading }}
    >

      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        position="bottom-left"
        closeButton={<div style={{ display: 'flex', alignItems: "center", paddingInline: "3px" }}>
          <ImCross />
        </div>}
      // icon={<></>}
      // progress={undefined:any}
      />
      <StatusIndicator />

      {!Object.keys(loading).every((key) => loading[key] === false) && (
        <div className="loader-container">
          <CircularProgress />
          {/* <img src={loaderImg} alt="" height={60} width={60} /> */}
        </div>
      )}

      {/* <div className={`App ${window.location.pathname.includes("sign-in") || window.location.pathname.includes("sign-up") ? "" : "padding_for_desktop"}`} > */}
      <div className="App"
        style={{
          paddingBottom: window.location.pathname.includes("sign-in") || window.location.pathname.includes("sign-up") || window.location.pathname.includes("virtual-casino-game") ? "" : "50px"
        }}>
        <SnackbarProvider maxSnack={5} autoHideDuration={1000}>

          <main >
            <Routes>


              {/* <Route
                path="/welcome"
                element={<LoginDashboard isSignedIn={isSignedIn} />}
              /> */}
              <Route
                path="/sign-in"
                element={<Login setShow={setWelcomePopup} setIsSignedIn={setIsSignedIn} />}
              />
              <Route path="/sign-up" element={<Register setShow={setWelcomePopup} />} />

              <Route
                path="/"
                element={
                  <Layout
                    setIsSignedIn={setIsSignedIn}
                    isSignedIn={isSignedIn} />
                }
              >
                <Route path="OldChangePassword" element={<OldChangePassword setIsSignedIn={setIsSignedIn} />} />

                <Route path="/" element={<Home show={welcomePopup} setShow={setWelcomePopup}/>} />

                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="in-play" element={<Inplay />} />
                <Route path="sports" element={<Sports />} />
                <Route path="in-play-details" element={<InPlayDetails />} />
                <Route path="complete-games" element={<Complete />} />
                <Route path="my-ledger" element={<Ledger />} />
                <Route path="profile" element={<Profile />} />
                <Route path="set-button-value" element={<SetButtonValue />} />
                <Route path="profit-and-loss" element={<Account />} />
                <Route path="my-ledger-Page" element={<ProfitAndLossPageeee />} />
                <Route path="Account_Statement_Page" element={<AccountStatementNewDushyant />} />
                <Route path="login-history" element={<LoginHistory />} />
                <Route path="bet-history" element={<BetHistory />} />
                <Route path="current-bet" element={<CurrentBet />} />
                <Route path="casino" element={<Casino />} />
                <Route path="india_casion" element={<IndianCasion />} />
                <Route path="SuperNowa_casion" element={<SuperNowa />} />
                <Route path="live-casino" element={<LiveCasionList />} />
                <Route path="lottery-casino" element={<LotteryCasionList />} />
                <Route path="lottery-Game-list" element={<LotteryCasionListPage />} />
                <Route path="Slot-Game-details" element={<SlotsGamesProvider />} />
                <Route path="Slot-Game-list" element={<SlotsGamesProviderGameList />} />
                <Route path="Fantasy-Game" element={<FantasyGameProvider />} />
                <Route path="Fantasy-Game-list" element={<FantasyGameList />} />
                <Route path="virtual-casino" element={<Virtualcasino />} />
                <Route path="casino/:id" element={<CasinoGame />} />
                <Route path="terms" element={<Terms />} />
                <Route path="password-change" element={<ChangePassword setIsSignedIn={setIsSignedIn} />} />


              </Route>
              <Route path="virtual-casino-game" element={<VirtualCasinoPage />} />
              <Route path="Live-casino-game" element={<LiveCasionGamePage />} />
              <Route path="india-casino-game" element={<IndianCasinoPage />} />
              <Route path="Lottery-Game" element={<LotteryCasionListGamePage />} />
              <Route path="Slots-Game-page" element={<SlotsGamesPage />} />
              <Route path="Fantasy-Game-page" element={<FantasyGamePage />} />
              <Route path="SuperNowa-Game-page" element={<SuperNowaPage />} />
              <Route path="Sports-Book" element={<SportBook />} />

            </Routes>
          </main>
          {/* {
            !isSignedIn &&  <WhatsAppIcon />
          } */}
         
          <SnackbarUtilsConfigurator />
        </SnackbarProvider>
      </div>
    </LoaderContext.Provider>
  );
}

export default App;
