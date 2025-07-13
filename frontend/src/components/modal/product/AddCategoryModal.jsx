import React, { useState } from 'react'
import { X } from 'lucide-react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
const AddCategoryModal = ({onClose, fetchAllCategory}) => {
  const [categoryName, setCategoryName] = useState("")
   const handleOnChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleAddCategory = async (e)=>{
    e.preventDefault()
    const dataResponse = await fetch(SummaryApi.addCategory.url,{
      method: SummaryApi.addCategory.method,
      headers: {
        
        "content-type": "application/json" //to tell server that the data is in json format
      },
      credentials: "include",
      body: JSON.stringify({categoryName})
    })
    const dataAPI = await dataResponse.json()
    if(dataAPI.success){
      toast.success(dataAPI.message)
      fetchAllCategory()
      onClose()
      
    }
    if(dataAPI.error){
      toast.error(dataAPI.message)
    }
  }
  return (
     <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
        {/* INSIDE */}
        <div className='bg-white w-[500px] max-w-[90%] p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100 opacity-100'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Edit User</h2>
                <button onClick={onClose} className='cursor-pointer'> <X className='w-8 h-8 text-red-500 hover:text-red-700'></X></button>
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleAddCategory}>
                <label className=''>Category Name</label>
                <input type="text" placeholder='Enter Category Name'
                className='p-2 border rounded'
                name='categoryName'
                value={categoryName}
                onChange={handleOnChange}></input>
               
               
               
                <button className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700' type='submit'>Save Changes</button>
                
            </form>
        </div>
    </div>
  )
}

export default AddCategoryModal