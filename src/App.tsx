import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Terms from './Pages/Terms';
import Headers from './components/Layout/Headers';
import { Inplay } from './Pages/InPlay';
import Complete from './Pages/Complete/Complete';
import ChangePassword from './Pages/ChangePassword';
import Layout from './components/Layout';
import Ledger from './Pages/Ledger';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="sign-in" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="in-play" element={<Inplay />} />
              <Route path="complete-games" element={<Complete />} />
              <Route path="my-ledger" element={<Ledger />} />
              <Route path="profile" element={<Profile/>} />
            </Route>
            <Route path="password-change" element={<ChangePassword />} />
            <Route path="terms" element={<Terms />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
