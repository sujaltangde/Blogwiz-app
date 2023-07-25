import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import Host from '../Host'
import { Search } from './Search'


export const Navbar = () => {


  const [UserToggle, setUserToggle] = useState(null)
  const [toggle, setToggle] = useState(false)


  const [logUserPic, setLogUserPic] = useState("");


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${Host}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
          }
        });
        setLogUserPic(res.data.profilePic);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);




  useEffect(() => {
    const LogOrNot = async () => {
      try {
        const res = await axios.get(`${Host}/logOrNot`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        });
        setUserToggle(res.data.loggedIn);
      } catch (error) {
        console.error('Error checking user login status:', error);
      }
    };
    
    LogOrNot();
    const intervalId = setInterval(LogOrNot, 1000);
    return () => clearInterval(intervalId);
  });




  return (
    <>

      <div className=''>
        <div>
          <div className='bg-gray-900 h-14 fixed min-w-full flex justify-between pl-3 md:pr-24 
          pr-10 text-white'>
            <div className='md:hidden flex justify-center items-center'>
              <Link to="/">  <img src="/images/vite.ico" className='md:h-8 md:w-10 h-8' alt="" /> </Link>
              </div>
            <ul className='md:flex hidden gap-7 font-semibold  py-3 justify-center text-2xl'>
              <div className=' '>
              <Link to="/"> <img src="/images/vite.ico" className='md:h-8 md:w-10 h-8' alt="" /> </Link>
              </div>
              <Link className='hover:text-yellow-300' to="/">Home</Link>
              <Link className='hover:text-yellow-300' to="/Write">Write</Link>
              <Link className='hover:text-yellow-300' to="/MyPosts">My Posts</Link>
              <Link className='hover:text-yellow-300' to="/About">About</Link>
            </ul>
           

            <div className='flex justify-center md:gap-7 gap-3 items-center'>
            <div className='md:hidden flex'> <Search /> </div>
                <div className='md:flex hidden '><Search/></div>
              
              <Link to="/User" className={`w-9  h-9  rounded-full bg-cover ${UserToggle ? "flex" : "hidden"}`}>

                <img
                  src="/images/pic.png"
                  className={`rounded-full bg-gray-700 object-cover max-w-full max-h-full `}
                  alt="" />

              </Link>
                

              <div>
                {
                  UserToggle ? (<Link to="/Logout" className='hover:text-yellow-300 text-2xl font-semibold md:flex hidden'>Logout</Link>) :
                    (<div className='md:flex hidden'>
                      <Link className='hover:text-yellow-300 text-2xl font-semibold' to="/Login">Login</Link>
                      <span className='text-2xl font-semibold'>/</span>
                      <Link className='hover:text-yellow-300 text-2xl font-semibold' to="/Register">Register</Link>
                    </div>)
                }
              </div>
            </div>
          </div>

        </div>
        <div className='md:hidden text-white flex justify-center items-center'>
          {
            toggle ? (<RxCross2 onClick={() => setToggle(!toggle)} size={26} className='fixed top-4 cursor-pointer  right-3' />) : (<FaBars onClick={() => setToggle(!toggle)} size={26} className='fixed top-4 cursor-pointer   right-3' />)
          }

        </div>
        <div className='fixed bg-gray-800 text-white z-50  top-14 opacity-90 w-full'>
          <ul className={`${toggle ? "flex" : "hidden"} md:hidden gap-7 pl-5 py-3 flex-col justify-center items-center  text-2xl`}>
         
            <Link onClick={() => setToggle(!toggle)} to={"/"}>Home</Link>
            <Link onClick={() => setToggle(!toggle)} to={"/Write"} >Write</Link>
            <Link onClick={() => setToggle(!toggle)} to={"/MyPosts"} >My Posts</Link>
           
            <Link onClick={() => setToggle(!toggle)} to={"/About"} >About</Link>
            {
              UserToggle ? (<Link onClick={() => setToggle(!toggle)} to="/Logout">Logout</Link>) :
                (<div>
                  <Link onClick={() => setToggle(!toggle)} to="/Login">Login/</Link>
                  <Link onClick={() => setToggle(!toggle)} to="/Register">Register</Link>
                </div>)
            }
          </ul>
        </div>
      </div>

    </>
  )
}
