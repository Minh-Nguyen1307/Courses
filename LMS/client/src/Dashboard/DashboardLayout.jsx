import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';




export default function DashboardLayout() {
  return (
    <div className='flex'>
    <div className=" w-1/6">
      <Sidebar />
      
      
    </div>
    <div className='w-5/6'>
        <Outlet />
      </div>
    </div>
  );
}
