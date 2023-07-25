import {React,useState} from 'react'
import { useDispatch } from 'react-redux'
import {setUserFalse,setLogOutAlertTrue} from '../Slice'
import { Navigate } from 'react-router';

export const Logout = () => {
  
  const [logout, setLogout] = useState(false) ;
  const dispatch = useDispatch() ;

  const Logout = ()=>{
    localStorage.removeItem('accesstoken')
    setLogout(true) ;
    dispatch(setUserFalse()) ;
  }

  if(logout){
    dispatch(setLogOutAlertTrue())
    return <Navigate to="/" />
  }

  return (
   <>

            <div className='min-h-screen text-white bg-gray-950 pt-14'>
                    <div className='flex justify-center items-center flex-col px-5 pt-28 gap-3'>
                        <h1 className='text-3xl text-center '>Are you sure you want to Logout ?</h1>
                        <button onClick={()=>{Logout()}} className='text-xl rounded-md bg-red-600 px-9 font-bold py-2'>Logout</button>
                    </div>
            </div>

   </>
  )
}
