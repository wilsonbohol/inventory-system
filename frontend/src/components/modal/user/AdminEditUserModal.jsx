import React, { useEffect, useState } from 'react'
import { CircleX } from 'lucide-react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import {modalFadeScale} from '../../../animation/animation'
const AdminEditUserModal = ({userData, onClose, fetchAllUser}) => {
    const [data, setData] = useState({
        ...userData || "",
        id: userData?.id || "",
        full_name: userData?.full_name || "",
        email: userData?.email ||"",
        role: userData?.Role ||""
    })
    console.log("POOTOANGINA",data)
    useEffect(()=>{
        if(userData){
           setData({
             id: userData?.id || "", 
             full_name: userData?.full_name || "",
             email: userData?.email || "",
             role: userData?.Role || ""
           })
           console.log("WHATIS USERDATA")

        }
    }, [userData])
   
    const handleOnChange = (e) => {
    const { name, value } = e.target; //name from the input box
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    const response =  await fetch (SummaryApi.updateUser.url,{
      method: SummaryApi.updateUser.method,
      headers: {
        "content-type": "application/json",
      },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const responseData = await response.json()
    console.log("From update user",responseData)
    if (responseData){
      toast.success(responseData?.message)
      fetchAllUser()
      onClose()
    }

    if (responseData.error){
      toast.error(responseData?.message)
    }

  }
  return (
    <motion.div
    initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm '>
        {/* INSIDE */}
        <motion.div
         initial="hidden"
         animate="visible"
        exit="exit"
        variants={modalFadeScale}
        className='bg-white w-[500px] max-w-[90%] p-6 rounded-lg shadow-lg'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Edit User</h2>
                
                <button onClick={onClose} className='cursor-pointer'> <X className='w-8 h-8 text-red-400 hover:text-red-500'></X></button>
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleUpdateUser}>
                <label className=''>FullName</label>
                <input type="text" placeholder='Enter New Full Name' value={data.full_name || ""} 
                className='p-2 border rounded'
                name='full_name'
                onChange={handleOnChange}></input>
                <label>Email</label>
                <input type='email' placeholder='Enter New Email' value={data.email || ""}
                className='p-2 border rounded'
                name='email'
                onChange={handleOnChange}></input>
                <label>ROLE</label>
                <select className='p-2 border rounded'
                name='role' value={data.role || "" } onChange={handleOnChange}>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
                <button className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700' type='submit'>Save Changes</button>
                
            </form>
        </motion.div>
    </motion.div>
  )
}

export default AdminEditUserModal