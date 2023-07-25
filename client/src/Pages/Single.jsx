import React, { useEffect, useState } from 'react'
import { SinglePost } from '../components/SinglePost'
import axios from 'axios'
import Host from '../Host'

export const Single = () => {

  const [LogUser,setLogUser] = useState("") ;

  useEffect(()=>{
    const getData = async ()=>{
      const res = await axios.get(`${Host}/status`,{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })
      setLogUser(res.data.username) ;
    }
    getData() ;
  },[])
    
  return (
    <>
       <div className='pt-14 pb-20 min-h-screen bg-gray-950 text-white '>

       <div className='flex justify-center'>
       <SinglePost logUser={LogUser}/>
       </div>

       </div>
    </>
  )
}
