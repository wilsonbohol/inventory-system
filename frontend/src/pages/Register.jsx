import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from "react-toastify";
const Register = () => {
    const [data,setData] = useState({
        full_name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const handleOnChange = (e) =>{
      const {name , value}  = e.target
      console.log(data)
      setData((prev) =>{
        //throw the data here
        return{
            ...prev,
            [name] : value
        }
      })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const dataResponse  = await fetch(SummaryApi.signUp.url,{
            method: SummaryApi.signUp.method,
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify(data),
        })
        const dataAPI = await dataResponse.json()
        console.log(dataAPI);
        if (dataAPI.success){
            toast.success(dataAPI.message)
            navigate("/login")
            console.log("DATA",data)
        }
        if(dataAPI.error){
            toast.error(dataAPI.message)
            
        }
        console.log("DATA",data)
    }
  return (
    <section id='login' className=''>
        <div className='mx-auto p-4 container'>
            <div className='bg-white p-2 py-5 w-full mx-auto max-w-sm'>
                <div className='w-20 h-20 mx-auto'>
                PICTURE
                </div>
            <form className='pt-6 flex flex-col gap-2'
            onSubmit={handleSubmit}>
                <div className='grid'>
                <label>Name</label>
                    <div className='bg-slate-100 p-2'>
                        <input type='text'
                        name='full_name' 
                        placeholder='Enter Name'
                        onChange={handleOnChange}
                        value={data.full_name} 
                        required
                        className='w-full h-full bg-transparent'></input>
                    </div>
                    <label>Email</label>
                    <div className='bg-slate-100 p-2'>
                        <input type='email' 
                        placeholder='Enter Email'
                        name='email'
                        value={data.email}
                        onChange={handleOnChange}
                        required 
                        className='w-full h-full bg-transparent'></input>
                    </div>
                    <label>password</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input type='password' 
                        placeholder='Enter Password'
                        name='password'
                        onChange={handleOnChange}
                        value={data.password}
                        required
                        className='w-full h-full bg-transparent'></input>
                        <div className='text-lg'>
                        <FaEyeSlash></FaEyeSlash>
                        </div>
                    </div>
                    
                </div>
                <button className='bg-blue-500 rounded-2xl hover:bg-blue-600 px-5 
                py-2 hover:scale-110 w-full transition-all mx-auto max-w-[150px] text-white font-bold'>Register</button>
                

            </form>
          
        </div>
            </div>
    </section>
  )
}

export default Register