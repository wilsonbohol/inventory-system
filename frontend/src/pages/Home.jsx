import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([])
  useEffect(()=>{
    
  },[])
  return (
      <div className="text-center px-5 py-12">
      {/* Hero Section */}
      <section className="mb-7">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to My Inventory System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Manage, track, and monitor your inventory with ease. Our system helps
          businesses stay on top of stock levels, avoid shortages, and improve
          efficiency.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-gray-100 border rounded-lg hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">📦 Real-Time Tracking</h3>
          <p className="text-gray-600">
            Always know your stock levels instantly with accurate data.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">⚠️ Low Stock Alerts</h3>
          <p className="text-gray-600">
            Get notified when items are running low so you never run out.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">📊 Easy Reports</h3>
          <p className="text-gray-600">
            Generate inventory and sales reports in just a few clicks.
          </p>
        </div>
      </section>
    </div>

  )
}

export default Home