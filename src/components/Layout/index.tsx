import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from './Headers';

const Layout = () => {
  return (
    <div>
      <header>
        <Headers />
      </header>

      <Outlet />
    </div>
  );
}

export default Layout