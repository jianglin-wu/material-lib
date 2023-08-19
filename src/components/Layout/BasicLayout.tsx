import React from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
  return (
    <div className="bg-gradient-to-tr from-sky-500 to-purple-500 min-h-screen">
      <Outlet />
    </div>
  );
};

export default BasicLayout;
