import React, { useState } from 'react'
import { X } from 'lucide-react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import {motion} from 'framer-motion'
import { modalFadeScale } from '../../../animation/animation';
const AddProductModal = ({onClose, fetchAllProduct, slug}) => {
  const [data,setData] = useState({
    product_name : "",
    quantity: "",
    description: "",
  })
  

  const handleOnChange =(e) =>{
    const {name, value} = e.target
    
    setData((prev) =>{
      
      return{
        ...prev,
        [name] : value
        
      }
    })
  }

  const handleAddProduct = async (e)=>{
    e.preventDefault()
    

      const dataToSend = {
    ...data,
    slug

  };
 

    const dataResponse = await fetch(SummaryApi.addProduct.url,{
      method: SummaryApi.addProduct.method,
      headers:{
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(dataToSend)
    })
    const dataAPI =  await dataResponse.json()
    if (dataAPI.success){
      toast.success(dataAPI.message)
      fetchAllProduct()
      onClose()
    }
    if(dataAPI.error){
      toast.error(dataAPI.message)
    }
  }
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    transition={{duration: 0.2 }}
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'
    >
        {/* INSIDE */}
        <motion.div className='bg-white w-[500px] max-w-[90%] p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100 opacity-100'
        initial="hidden"
                 animate="visible"
                exit="exit"
                variants={modalFadeScale}>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Add Product</h2>
                <button onClick={onClose} className='cursor-pointer'> <X className='w-8 h-8 text-red-500 hover:text-red-700'></X></button>
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleAddProduct}>
                <label className=''>Product Name</label>
                <input type="text" placeholder='Enter Category Name'
                name='product_name'
                value={data.product_name}
                className='p-2 border rounded'
                onChange={handleOnChange}
                ></input>
                <label className=''>Quantity</label>
                <input type="text" placeholder='Enter Quantity'
                onChange={handleOnChange}
                name='quantity'
                value={data.quantity}
                className='p-2 border rounded'
                ></input>
                <label className=''>Description</label>
                <textarea type="text" placeholder='Enter Product Description'
                 name='description'
                value={data.description}
                className='p-2 border rounded h-32 resize-none'
                onChange={handleOnChange}
                ></textarea>
                
               
               
               
                <button className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer' type='submit'>Upload Product</button>
                
            </form>
        </motion.div>
    </motion.div>
  )
}

export default AddProductModal