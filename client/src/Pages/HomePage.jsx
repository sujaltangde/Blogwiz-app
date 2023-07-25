import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Home } from '../components/Home'
import { useDispatch, useSelector } from 'react-redux'
import { setLogAlertFalse,setLogOutAlertFalse,setPostDelAlertFalse, setUserDelAlertFalse, setPostCreAlertFalse } from '../Slice'

export const HomePage = () => {

  const dispatch = useDispatch() ;
  const logAlert = useSelector((state) => state.profile.logAlert) ;
  const logOutAlert = useSelector((state)=>state.profile.logOutAlert) ;
  const postDelAlert = useSelector((state)=>state.profile.postDelAlert) ;
  const userDelAlert = useSelector((state)=>state.profile.userDelAlert) ;
  const postCreAlert = useSelector((state)=>state.profile.postCreAlert) ;

  if(logAlert){
  setTimeout(()=>{
    dispatch(setLogAlertFalse())
  },3000)
}
  if(logOutAlert){
   setTimeout(()=>{
    dispatch(setLogOutAlertFalse())
   },3000)
  }

  if(postDelAlert){
    setTimeout(()=>{
      dispatch(setPostDelAlertFalse())
    },3000)
  }
  
  if(userDelAlert){
    setTimeout(()=>{
      dispatch(setUserDelAlertFalse())
    },3000)
  }

  if(postCreAlert){
    setTimeout(()=>{
      dispatch(setPostCreAlertFalse())
    },3000)
  }
  return (
    <>
        <div>
            <Header/>
           { logAlert && <p className='fixed text-white top-14 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-green-400 '>Login Successful !</p>}
           { logOutAlert && <p className='fixed text-white top-14 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-green-400'>LogOut Successful !</p>}
           { postDelAlert && <p className='fixed text-white top-14 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-green-400'>Post Deleted Successful !</p>}
           { userDelAlert && <p className='fixed text-white top-14 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-green-400'>User Deleted Successful !</p>}
           { postCreAlert && <p className='fixed text-white top-14 py-2 px-4 md:w-1/4 w-full font-extrabold opacity-85 bg-green-400'>Post Created Successful !</p>}
            <Home/>
            
        </div>
    </>
  )
}
