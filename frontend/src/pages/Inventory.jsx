import React, { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import AddCategoryModal from '../components/modal/product/AddCategoryModal'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EditCategory from '../components/modal/product/EditCategory';

const Inventory = () => {
  const [addCategory, setAddCategory] = useState(false)
  const [allCategory, setAllCategory] = useState([])
  const navigate = useNavigate()
  const [clickedSlug, setClickedSlug] = useState(null)
  const [editCategory, setEditCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const fetchAllCategory = async ()=>{
    const fetchData = await fetch(SummaryApi.allCategory.url,{
      method: SummaryApi.allCategory.method,
      credentials: 'include',
    })
    const dataResponse =  await fetchData.json()
    if (dataResponse.success){
      setAllCategory(dataResponse.data)
      
    }
    if(dataResponse.err){
          toast.error(dataResponse.message)
      }

  }
  const handleDeleteCategory = async (id) =>{
    const confirm = window.confirm("Are you sure you want to delete?")
    if(!confirm) return;
    const {url, method} = SummaryApi.deleteCategory(id)
    try{
      const res = await fetch(url,{
        method,
        credentials: 'include'
      })
      const data = await res.json()
      if(res.ok){
        toast.success(data.message)
        fetchAllCategory()
      }
      else{        
        toast.error(data.message)
      }
    }catch(err){
      toast.error("Server Error")

    }
  }
  useEffect(()=>{
    fetchAllCategory()
    console.log("What is Category", allCategory)
  },[])
  return (
    <div className='p-1 ml-1 '>
      <div className="bg-white rounded-md shadow-sm overflow-x-auto">
        <div className='px-4 py-3 border-b border-gray-200 flex justify-between'> 
        <h2 className='text-lg font-semibold text-gray-800'>All inverntory</h2>
        <button className='bg-red-500 rounded-full  p-1 px-3 text-white font-semibold' onClick={()=>{
          setAddCategory(true)
         
        }}
        >Add Category</button>
        </div>
        <table
        className='w-full  text-gray-500'>
          <thead className='bg-gray-100 text-gray-600 uppercase text-sm'>
              <tr className='text-center'>
          <th className="px-4 py-2 text-left">#</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-left">Date Created</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {allCategory.map((el,index) =>(
              <motion.tr
              initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
         transition={{ duration: 0.4 }} 
              className='' key={index}>
                <td className='px-4 py-2'>{index + 1}</td>
            <td className='px-4 py-2'>{el?.category_name}</td>
            <td className='px-4 py-2'>{moment(el?.date_created).format("lll")}</td>
            <td className='px-4 py-2'>
              <div className='flex items-center justify-center gap-2'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                <Pencil size={16} 
                onClick={()=> {
                  setEditCategory(true)
                  setSelectedCategory(el)
               
                }}
                />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              onClick={()=>handleDeleteCategory(el.id)}>
                
                              <Trash size={16} />
              </button>
              <motion.button
              key={el.slug}
              initial={{scale: 1}}
              animate = {clickedSlug === el.slug ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}

              className='bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1 px-4 rounded-full shadow transition duration-200'
              onClick={()=>{
                setClickedSlug(el.slug); // trigger animation
              setTimeout(() => {
              navigate(`/admin-panel/category/${el.slug}`);
            }, 200); // delay to match transition
            }}>
                Next Level
              </motion.button>
              </div>
            </td>
              </motion.tr>
              
            ))}
          
          </tbody>
        </table>
         <div>
          {addCategory &&(
            <AddCategoryModal onClose={()=> setAddCategory(false) } fetchAllCategory={fetchAllCategory}></AddCategoryModal>
          )}
         </div>
         <div>
          {editCategory &&(
            <EditCategory onClose={()=> setEditCategory(false) } fetchAllCategory={fetchAllCategory} selectedCategory={selectedCategory}></EditCategory>
          )}
         </div>
        </div>
    </div>
  )
}

export default Inventory