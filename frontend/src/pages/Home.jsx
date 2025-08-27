import React, { useEffect, useState } from 'react'

function Home() {
  const [data, setData] = useState([])
  useEffect(()=>{
    
  },[])
  return (
     <div className="p-6 max-w-6xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Welcome to Ospital ng Sampaloc Inventory System
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        This system is built to help our hospital manage inventory, track supplies, and maintain accurate records with ease and efficiency.
      </p>

      <img
        src="/hospital.jpg" // make sure this image exists in /public folder
        alt="Ospital ng Sampaloc"
        className="rounded-xl shadow-lg w-full max-h-[500px] object-cover"
      />
    </div>

  )
}

export default Home