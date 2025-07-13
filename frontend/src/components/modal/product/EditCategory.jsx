import React, { useEffect, useState } from 'react'
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import {modalFadeScale} from '../../../animation/animation'
import Swal from 'sweetalert2';

const EditCategory = ({onClose, selectedCategory, fetchAllCategory}) => {
    const [data,setData] = useState({
        id : '',
        category_name:  '',
        updated_at: '',
    })
    const handleOnChange = (e) => {
    const { name, value } = e.target; //name from the input box
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  useEffect(()=>{
    
    if(selectedCategory){
        setData({
            id: selectedCategory.id,
            category_name: selectedCategory.category_name,
            updated_at: selectedCategory.updated_at
            
        })
    }
  }, [selectedCategory])
  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    const response = await fetch (SummaryApi.updateCategory.url,{
      method: SummaryApi.updateCategory.method,
      headers:{
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    if (responseData){
        Swal.fire({
        title: "Success!",
        text: responseData?.message,
        icon: "success"
        });
        fetchAllCategory()
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
            <form className='flex flex-col gap-4' onSubmit={handleUpdateCategory}>
                <label className=''>Category</label>
                <input type="text" placeholder='Enter Category' 
                className='p-2 border rounded'
                name='category_name'
                value={data.category_name}
                onChange={handleOnChange}></input>
                
                
                <button className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700' type='submit'>Save Changes</button>
                
            </form>
        </motion.div>
    </motion.div>
  )
}

export default EditCategory