import React from 'react'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import SummaryApi from '../common';
import { useEffect } from 'react';
import moment from 'moment';
import { Pencil } from 'lucide-react';
import { Delete } from 'lucide-react';
import AddProductModal from '../components/modal/product/AddProductModal';
import { AnimatePresence, motion } from 'framer-motion';
import EditProductModal from '../components/modal/product/EditProductModal';
import { toast } from 'react-toastify';

function AllProduct() {
    const { slug } = useParams()
    const [allProduct, setAllProduct] = useState([])
    const [addProduct, setAddProduct] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const fetchAllProduct = async ()=>{
        const fetchData = await fetch(SummaryApi.allProductsByCategory(slug).url,{
            method: SummaryApi.allProductsByCategory().method,
            credentials: "include"
        })
        const dataResponse =  await fetchData.json()
        if (dataResponse.success){
            setAllProduct(dataResponse.data)
            console.log("allPRODUCT", dataResponse.data)
        }
         if(dataResponse.err){
              toast.error(dataResponse.message)
            }
    }

    const handleDeleteProduct = async (id) =>{
    const confirm = window.confirm("Are you sure you want to delete?")
    if(!confirm) return
    const {url, method} = SummaryApi.deleteProduct(id)
    try{
      const res = await fetch(url,{
        method,
        credentials: "include"
    })
    const data = await res.json()
    if(res.ok){
      toast.success(data.message)
      fetchAllProduct()
    }
    else{        
      toast.error(data.message)
      }
    }catch(err){
       toast.error("Server Error")
    }
    }
    useEffect(()=>{
        fetchAllProduct()
        
    },[slug])
  return (
    <div>
        <div className="p-1 ml-2">
  {/**THIS IS the 1st childred and 2nd parent */}
  <div className="parent-card">
    <div className="px-4 py-3 border-b border-gray-200 flex justify-between">
      <h2 className="text-lg font-semibold text-gray-800 capitalize">CATEGORY: {slug}</h2>
      <button className='border rounded-full p-1 px-4 bg-rose-500 text-white hover:bg-rose-600 shadow-md cursor-pointer' onClick={()=>{
        setAddProduct(true)
        
      }}>Add Product</button>
    </div>
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-4 py-2 text-left">#</th>
          <th className="px-4 py-2 text-left">Product Name</th>
          <th className="px-4 py-2 text-left">Stock</th>
          <th className="px-4 py-2 text-left">Created_At</th>
          <th className="px-4 py-2 text-left">Updated_At</th>
           <th className="px-10 py-2 text-left">Actions</th>
          
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        
      </tbody>
      <tbody className="divide-y divide-gray-200">
              {allProduct.map((product, index) => (
                <motion.tr
                initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
         transition={{ duration: 0.4 }}
                key={product.id || index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">
                    {moment(product.created_at).format("lll")}
                  </td>
                  <td className="px-4 py-2">
                    {moment(product.updated_at).format("lll")}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                    onClick={()=>{
                      setEditProduct(true)
                      setSelectedProduct(product)
                    }}>
                      
                <Pencil size={16} 
                
                />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full" onClick={()=> handleDeleteProduct(product.id)}>
                <Delete size={16} />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 px-5 rounded-full cursor-pointer">
                VIEW
              </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
    </table>
    
    <div>
      <AnimatePresence>
      {addProduct &&(
        <AddProductModal onClose={()=> setAddProduct(false)} fetchAllProduct={fetchAllProduct} slug={slug}></AddProductModal>
      )}
      {editProduct &&(
        <EditProductModal onClose={()=> setEditProduct(false)} fetchAllProduct={fetchAllProduct} selectedProduct={selectedProduct}></EditProductModal>
      )}
      </AnimatePresence>
    </div>
  </div>
  </div>
  
    </div>
  )
}

export default AllProduct