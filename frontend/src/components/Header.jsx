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
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
      console.log("✅ Error:", data);
    }
  };

  useEffect(()=>{
    // optional effect
  }, [user]);

  return (
    <header className="shadow-md w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 border-b border-white/10 h-20">
      {/* Full-width inner div with consistent padding */}
      <div className="flex items-center justify-between px-6 md:px-6 lg:px-8 h-full w-full">
        
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide flex items-center 
                       bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent
                       transition-all duration-500 ease-in-out 
                       hover:scale-110 hover:rotate-1 hover:opacity-90"
          >
            InventorySystem
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
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;