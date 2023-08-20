import React from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-500 to-purple-500">
      <Outlet />
    </div>
  );
};

export default BasicLayout;
