import React, { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment'
import AdminEditUserModal from '../components/modal/user/AdminEditUserModal';
import { AnimatePresence, motion } from 'framer-motion';
const AllUsers = () => {
  const [allUser, setAllUser] = useState([])
  const [editUser, setEditUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  //page paginatioon
  const [currentPage, setCurentPage] = useState(1);
  const usersPerPage = 6
  const fetchAllUsers = async ()=>{
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method: SummaryApi.allUser.method,
      credentials: "include",
    })
    const dataResponse = await fetchData.json()
    if(dataResponse.success){
      setAllUser(dataResponse.data)
    }
    if(dataResponse.err){
      toast.error(dataResponse.message)
    }
  }
  useEffect(()=>{
    fetchAllUsers();
   
  }, [])
  //Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage //this is 1 * 8
  const indexofFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = allUser.slice(indexofFirstUser, indexOfLastUser)
  const totalPage = Math.ceil(allUser.length / usersPerPage)

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage){
      setCurentPage(pageNum)
    }
  }
  return (
    //this is The parent div
    <div className="p-1 ml-2">
  {/**THIS IS the 1st childred and 2nd parent */}
  <div className="bg-white rounded-md shadow-sm overflow-x-auto">
    <div className="px-4 py-3 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">All Users</h2>
    </div>
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-4 py-2 text-left">#</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Role</th>
          <th className="px-4 py-2 text-left">Created</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {currentUsers.map((el, index) => (
          <tr key={index} className="hover:bg-gray-50">
      <td className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {index + 1}
        </motion.div>
      </td>
      <td className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {el?.full_name}
        </motion.div>
      </td>
      <td className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {el?.email}
        </motion.div>
      </td>
      <td className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {el?.Role}
        </motion.div>
      </td>
      <td className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {moment(el.date_created).format("ll")}
        </motion.div>
      </td>
      <td className="px-4 py-2 flex gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex gap-2"
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
            <Pencil
              size={16}
              onClick={() => {
                setSelectedUser(el);
                setEditUser(true);
              }}
            />
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
            <Trash size={16} />
          </button>
        </motion.div>
      </td>
    </tr>

        ))}
      </tbody>
    </table>
    <div className='flex justify-center items-center p-4 space-x-1'>
      <button onClick={()=> handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50'>
        Prev</button>
          {[...Array(totalPage)].map((_, index) =>(
                <button key={index}
                onClick={()=> handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}>{index + 1}</button>
              ))}
    </div>
  </div>
  <div className=''>
    <AnimatePresence>
    {editUser && (
      <AdminEditUserModal userData={selectedUser} onClose={()=> setEditUser(false) } fetchAllUser={fetchAllUsers}></AdminEditUserModal>
    )}
    </AnimatePresence>
  </div>
</div>

  )
}

export default AllUsers