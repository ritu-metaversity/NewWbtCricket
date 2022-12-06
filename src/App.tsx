import React, { useEffect } from 'react';
import './App.css';
import Login from './components/login';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Terms from './Pages/Terms';
import { Inplay } from './Pages/InPlay';
import Complete from './Pages/Complete/Complete';
import ChangePassword from './Pages/ChangePassword';
import Layout from './components/Layout';
import Ledger from './Pages/Ledger';
import Profile from './Pages/Profile';
import SetButtonValue from './Pages/SetButtonValue';
import InPlayDetails from './Pages/InPlayDetails';
import CompleteDetails from './Pages/completeDetails';
import Account from './Pages/accountStatement';
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from './components/Layout/snackBarUtil';



function App() {
  
  return (
    <div className="App">
      <SnackbarProvider maxSnack={5} autoHideDuration={1000} >
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="in-play" element={<Inplay />} />
                <Route path="in-play-details" element={<InPlayDetails />} />
                <Route path="complete-games" element={<Complete />} />
                <Route path="my-ledger" element={<Ledger />} />
                <Route path="profile" element={<Profile />} />
                <Route path="set-button-value" element={<SetButtonValue />} />
                {/* <Route path="in-play-details" element={<InPlayDetails />} /> */}
                <Route path="account-summary" element={<Account />} />
              </Route>
              <Route path="password-change" element={<ChangePassword />} />
              <Route path="terms" element={<Terms />} />
            </Routes>
          </BrowserRouter>
        </main>
        <footer>
          <Footer />
        </footer>

        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </div>
  );
}

export default App;
