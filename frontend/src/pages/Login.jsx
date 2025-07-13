import React, { useContext, useEffect, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Context from '../context';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import {setUserDetails} from '../store/userSlice'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const Login = () => {
    
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    
   const {fetchUserDetails} = useContext(Context)
    const handleOnChange = async(e)=>{
        const { name, value} = e.target
        setData((prev)=>{
            return{ 
                ...prev,
                [name]: value,
               
            }
        })

    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
                //This sets the Content-Type header of the request to application/json,
                //indicating that the request body contains JSON data.
            },
            
             body: JSON.stringify(data),
            //The body of the request is being set to a
            //JSON string representation of the data object. JSON.stringify(data)
             //converts the JavaScript
            //object data into a JSON-formatted string for transmission
        })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
            
            console.log("📥 Dispatching to Redux:", dataApi.data)
            dispatch(setUserDetails(dataApi.data));
            fetchUserDetails()
            
            console.log("WHAT IS THE RESULT",dataApi.data?.Role)
            if (dataApi.data?.Role === "USER") {
                navigate("/user-panel");
                Swal.fire({
                title: "Success!",
                text: dataApi.message,
                icon: "success"
                });
            } else if (dataApi.data?.Role === "ADMIN") {
                navigate("/admin-panel");
                Swal.fire({
                title: "Success!",
                text: dataApi.message,
                icon: "success"
                });
            }
            
        }
        if (dataApi.error){
            Swal.fire({
                title: "Error!",
                text: dataApi.message,
                icon: "error"
                });
        }
    }
    useEffect(()=>{
        console.log(data)
    },[handleOnChange])
  return (
    
    <section id='login' className=''>
        <div className='mx-auto p-4 container'>
            <div className='bg-white p-2 py-5 w-full mx-auto max-w-sm'>
                <div className='w-20 h-20 mx-auto'>
                PICTURE
                </div>
            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Email</label>
                    <div className='bg-slate-100 p-2'>
                        <input type='email' 
                        placeholder='Enter Email' 
                        className='w-full h-full bg-transparent'
                        name='email'
                        onChange={handleOnChange}></input>
                    </div>
                    <label>Password</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input type='password' 
                        placeholder='Enter Password' 
                        className='w-full h-full bg-transparent'
                        name='password'
                        onChange={handleOnChange}></input>
                        <div className='text-lg'>
                        <FaEyeSlash></FaEyeSlash>
                        </div>
                    </div>
                    <Link to={"/forgot-password"} className='w-fit ml-auto'>
                        Forgot Password
                    </Link>
                </div>
                <button className='bg-blue-500 rounded-2xl hover:bg-blue-600 px-5 
                py-2 hover:scale-110 w-full transition-all mx-auto max-w-[150px] text-white font-bold'>LOGIN</button>
                

            </form>
            <div className='flex'>
            <p className='my-4'>Don't Have an Account? {""}<Link to={"/register"} className='hover:text-red-700 hover:underline p-4 mx-auto'>
            Signup</Link></p>
            
            </div>
        </div>
            </div>
    </section>
  )
}

export default Login