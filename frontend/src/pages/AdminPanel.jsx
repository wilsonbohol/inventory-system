import React from 'react'
import {ChevronFirst, Users, LayoutDashboard, ShoppingCart} from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import "../index.css"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ROLE from '../common/role';
const AdminPanel = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state?.user?.user)
  const isActive = (path)=>{

    return location.pathname === `/admin-panel${path}`;
  }
  useEffect(()=>{
    if(user === undefined){
      return <p className="p-5">Loading user data...</p>
    }
      
    
    
    if(!user || user?.Role !== ROLE.ADMIN){
      navigate("/")
      console.log("Redux user:", user);
    }
    
  },[user])


  return (
    <div className='flex flex-grow'>
      <aside className='bg-white h-full w-full max-w-60 flex flex-col'>
        <div className="p-4 pb-4 border-b-1">
            <div className='flex justify-between items-center'>
              <p className='font-bold p-1 capitalize'>Inventory System</p>
              <button className='p-1.5 rounded'>
                  <ChevronFirst></ChevronFirst>
              </button>
            </div>
        </div>
        <nav className='flex flex-col p-3 flex-1'>
        
         
        <Link to={"dashboard"} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-color hover:bg-blue-500 ${isActive('/dashboard') ? 'bg-blue-300' : ''}`}>
        <LayoutDashboard className='h-5 mr-2'></LayoutDashboard>
        Dashboard
        </Link>
        <Link to={"all-users"} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-color hover:bg-blue-500 ${isActive('/all-users') ? 'bg-blue-300' : ''}`}>
        <Users className='h-5 mr-2'></Users>
        Users
        </Link>
        <Link to={"inventory"} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-color hover:bg-blue-500 ${isActive('/inventory') ? 'bg-blue-300' : ''}`}>
        <ShoppingCart className='h-5 mr-2'></ShoppingCart>
        Inventory
        </Link>
        <Link to={"audit"} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-color hover:bg-blue-500 ${isActive('/audit') ? 'bg-blue-300' : ''}`}>
        <ShoppingCart className='h-5 mr-2'></ShoppingCart>
        Audit
        </Link>
 
        </nav>
        <div className='border-t flex p-3'>
            <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=''
            className='w-10 h-10 rounded-md'>
            </img>
            <div className='flex justify-between items-center w-52 ml-3'>
            <div className='leading-4'>
              <h4 className='font-semibold'>Wilson Bohol</h4>
              <span className='text-xs text-gray-600'>Wilsonbohol012@gmail.com</span>
            </div>
            </div>
        </div>
      </aside>
      <main className='w-full h-full'>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default AdminPanel