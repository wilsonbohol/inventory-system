import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Swal from 'sweetalert2';
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  console.log('Rendering Header with user: ', user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.method,
      credentials: 'include',
    });
    const data = await fetchData.json();

    if (data.success) {
      console.log("✅ Connected! Response:", data);
      Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success"
          });
      dispatch(setUserDetails(null)); // This is to remove it from the redux to log out after deleting the token
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
      console.log("✅ Error:", data);
    }
    useEffect(()=>{

    },[user])
  };

  return (
    <header className="h-20 shadow-md w-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 border-b border-2 border-white/10">
  <div className="h-full container mx-auto flex items-center px-6 py-2 justify-between">
    
    <div className="flex items-center space-x-3">
      {/* Logo or branding */}
      <Link
        className="text-white text-2xl font-extrabold tracking-wide flex items-center transition duration-300 ease-in-out hover:text-amber-300"
        to="/"
      >
        <span className="text-amber-400">Inventory</span>System
      </Link>
    </div>
    
    <div className="flex items-center gap-6">
      <div className="transition duration-300 ease-in-out hover:text-amber-300">
        <Link className="text-white text-base">About</Link>
      </div>
      <div className="transition duration-300 ease-in-out hover:text-amber-300">
        <Link className="text-white text-base">Contact Me</Link>
      </div>

      {user ? (
        <>
          <p className="text-white font-medium text-sm">Hello, {user.full_name}</p>
          <button
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full px-5 py-2.5 text-sm transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="px-5 py-2.5 rounded-full text-white bg-rose-600 hover:bg-rose-700 font-semibold text-sm transition duration-200"
        >
          Login
        </Link> // Show login button if user is not logged in
      )}
    </div>
  </div>
</header>
  );
};

export default Header;