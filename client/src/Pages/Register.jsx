import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRegAlertTrue } from '../Slice'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import Host from '../Host'

export const Register = () => {

    const [username,setUsername] = useState("") ;
    const [email,setEmail] = useState("") ;
    const [password,setPassword] = useState("") ;
    const [showAlert,setShowAlert] = useState("") ;

    const dispatch = useDispatch()
   
  

    const Reg = async (e)=>{
        e.preventDefault() ;
       try{ 
        const res = await axios.post(`${Host}/register`,{
            username,
            email,
            password
        })
        
        setShowAlert("success") ;
        // console.log(res.data) ;
    }catch(err){
        setShowAlert("failed") ;
        console.log("Error User already registered",err) ;}
    }

    if(showAlert === "success"){
        dispatch(setRegAlertTrue())
        return <Navigate to="/login" />
    }

    if(showAlert === "failed"){
        setTimeout(()=>{
            setShowAlert(null)
        },3000)
    }

  return (
    <>
    <div className='min-h-screen w-full text-white bg-gray-950 pt-14'>

            <div className='flex items-center justify-center pt-14 md:px-0 '>
                {
                    (showAlert === "failed") ? (<p className='fixed text-white top-14 
                    md:left-0 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-red-500'>Register Failed, Something went wrong.</p>) : null
                }

                <div>
                    <form action="" onSubmit={Reg} className='flex md:w-80 w-72 flex-col gap-2'>
                        <h1 className='md:text-6xl font-bold text-5xl text-center'>Register</h1>
                       <div className='flex flex-col'>

                       <label className='text-xl'>Username</label>
                        <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Enter username' className='px-2 py-1 bg-gray-700 outline-none rounded-md'  />

                       </div>
                       <div className='flex flex-col'>

                       <label className='text-xl'>Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter email' className='px-2 py-1 bg-gray-700 outline-none rounded-md'  />

                       </div>
                        <div className='flex flex-col'>
                            
                        <label className='text-xl'>Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Enter password' className='px-2 py-1 bg-gray-700 outline-none rounded-md' />

                        </div>
                    <div className='flex justify-center items-center pt-3'>
                        <button className='px-2 w-1/2 py-1 font-bold rounded-md bg-blue-500'>Register</button>
                    </div>
                    <p className='text-center'>Already have a account,
                        <Link to="/Login" className='underline' >Login</Link> here.</p>
                        
                    </form>
                </div>

            </div>

        </div>
    </>
  )
}
