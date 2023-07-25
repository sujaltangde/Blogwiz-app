import { React, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setRegAlertFalse, setLogAlertTrue, setUserTrue } from '../Slice'
import axios from 'axios'
import Host from '../Host'

export const Login = () => {

    const regAlert = useSelector((state) => state.profile.regAlert)
    const dispatch = useDispatch()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState("");

    const Log = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Host}/login`, {
                username,
                password
            })
            setShowAlert("success")
            localStorage.setItem("accesstoken",res.data.accesstoken)
            dispatch(setUserTrue()) ;
            // console.log(res.data.accesstoken) ;
        } catch (err) {
            setShowAlert("failed")
            console.log(err)
        }
    }

    setTimeout(() => {
        dispatch(setRegAlertFalse())
    }, 2000)

    if (showAlert === "success") {
        dispatch(setLogAlertTrue())
        return <Navigate to="/" />
    }

    if (showAlert === "failed") {
        setTimeout(() => {
            setShowAlert(null)
        }, 3000)
    }

    // regAlert

    if (regAlert) {
        setTimeout(() => {
            dispatch(setRegAlertFalse());
        }, 3000)
    }

    return (
        <>
            <div className='min-h-screen w-full text-white bg-gray-950 pt-14'>

                <div className='flex items-center justify-center pt-14 md:px-0 '>

                    {
                        (showAlert === "failed") ? (<p className='fixed text-white top-14 
                        md:left-0 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-red-500'>Login Failed, Something went wrong.</p>) : null
                    }
                    {
                        regAlert && <p className='fixed text-white top-14 
                        md:left-0 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-green-400'>Registration Successfull !</p>
                    }
                    
                    <div>
                        <form action="" onSubmit={Log} className='flex md:w-80 w-72 flex-col gap-2'>
                            <h1 className='md:text-6xl font-bold text-5xl text-center'>Login</h1>
                            <div className='flex flex-col'>

                                <label className='text-xl'>Username</label>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter username' className='px-2 py-1 bg-gray-700 outline-none rounded-md' />

                            </div>
                            <div className='flex flex-col'>

                                <label className='text-xl'>Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password' className='px-2 py-1 bg-gray-700 outline-none rounded-md' />

                            </div>
                            <div className='flex justify-center items-center pt-3'>
                                <button className='px-2 w-1/2 py-1 font-bold rounded-md bg-blue-500'>Login</button>
                            </div>
                            <p className='text-center'>Don't have an account,
                                <Link to="/Register" className='underline' >Register</Link> here.</p>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}
