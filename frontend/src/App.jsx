import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'
import { spinnerRotate } from "./animation/animation";
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import SummaryApi from './common';
import {setUserDetails, setUserLoading} from "./store/userSlice";
import {useDispatch, useSelector} from "react-redux"
import Context from "./context";
import { AnimatePresence, motion } from "framer-motion";


function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector(state => state.user);
  const fetchUserDetails = async()=>{
    try{
      dispatch(setUserLoading(true))
      const dataResponse = await fetch(SummaryApi.currentUser.url,{
      method: SummaryApi.currentUser.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()
      if (dataApi.success){
      dispatch(setUserDetails(dataApi.data))
      console.log('resukt',dataApi.data)
     }else{
      if(location.pathname !== "/" && location.pathname !== "/login"){
        dispatch(setUserLoading(null))
        toast.error(dataApi.message)
     }
    }
    }catch(error){
        dispatch(setUserLoading(null))
    }
    finally {
    dispatch(setUserLoading(false));
  }
   
  
  }
  useEffect(()=>{
    fetchUserDetails()
    console.log("what is the location", location.pathname)
  },[])
  if(loading){
     return (
       <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          variants={spinnerRotate}
          animate="animate"
        />
      </motion.div>
    </AnimatePresence>
     )
  }
  
  return (
    <>
    <div>
      <Context.Provider value={{
        fetchUserDetails
      }}>
    <ToastContainer position="top-center" />
    <div className="flex flex-col min-h-screen">
    <Header></Header>
    <main className="flex-grow p">
    
      <Outlet/>
    </main>
    <Footer></Footer>
    </div>
    </Context.Provider>
    </div>
    
    </>
  )
}

export default App
