import { React, useEffect, useState } from 'react'
import { RiImageEditLine } from 'react-icons/ri'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { Navigate } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserDelAlertTrue } from "../Slice"
import Host from '../Host'
import { DelAlrModal } from '../components/DelAlrModal'

export const User = () => {

  const [logUserName, setLogUserName] = useState("");
  const [logUserEmail, setLogUserEmail] = useState("");
  const [logUserID, setLogUserID] = useState("");

  const [openAlrt, setOpenAlrt] = useState(false);


  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${Host}/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })
      setLogUserName(res.data.username)
      setLogUserEmail(res.data.email)
      setLogUserID(res.data._id)
    }
    getData();
  }, [])


  const DelAcc = async () => {
    const res = await axios.delete(`${Host}/users/${logUserID}`)
    setOpenAlrt(false)
    setRedirect(true)
  }

  const openAlr = () => {
    setOpenAlrt(true);
  }


  if (redirect) {
    localStorage.removeItem('accesstoken')
    dispatch(setUserDelAlertTrue())
    return <Navigate to="/" />
  }




  return (
    <>

      <div className='min-h-screen w-full  bg-gray-950 pt-14'>

        {(logUserEmail === "") ? (<div className=' flex justify-center pt-20 items-center'>

          <p className=''> <img src="/images/load.svg" className='h-28' alt="" /> </p>

        </div>)
          :
          <>

            <div className='flex md:px-10 pt-2 flex-col md:flex-row justify-between  text-white gap-1'>

              <div className='md:py-3 py-1 md:text-4xl text-3xl flex flex-row  font-bold'>
                <BiUser size={30} /> Your account
              </div>

            </div>

            <div className=' flex flex-col pt-7 '>

              <div className='flex justify-start py-5 md:gap-0 gap-2  md:flex-col flex-col'>


                <div className=' flex-col  flex justify-center items-center'>

                  <div className='text-white  '>

                    <div className='pb-10 md:text-4xl text-3xl flex flex-col gap-2'>
                      <p className=''><span className='font-bold'>Username</span> : {logUserName}</p>
                      <p className=''><span className='font-bold'>Email</span> : {logUserEmail}</p>
                    </div>

                    {
                      openAlrt &&

                      <div className={`fixed top-56 md:left-96 md:mx-0 mx-5 left-0`}>
                        <div className='bg-gray-800 border rounded-md text-center pt-5 pb-2 text-2xl md:px-6 px-2 font-bold text-white'>
                          <p>Are you sure you want to delete your account ?</p>
                          <div className='flex gap-10 pt-8 justify-center'>
                            <button onClick={() => DelAcc()} className='text-xl bg-red-600 text-white  px-5 rounded-md py-1'>Yes</button>
                            <button onClick={() => setOpenAlrt(false)} className='text-xl bg-blue-600 text-white px-5 rounded-md py-1'>No</button>
                          </div>
                        </div>
                      </div>
                    }

                  </div>


                </div>

                <div className=' py-8  flex justify-end md:px-7 px-4'>
                  <span onClick={() => openAlr()} className='flex cursor-pointer  px-2 py-1 bg-red-600 rounded-md text-white'>
                    <AiOutlineUserDelete size={25} /> <p className='md:text-xl text-lg font-bold'>Delete Account</p>
                  </span>
                </div>



              </div>

            </div>
          </>

        }

      </div>
    </>
  )
}
