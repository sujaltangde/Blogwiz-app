import React, { useEffect,useState } from 'react'
import { Posts } from '../components/Posts'
import axios from 'axios'
import Host from '../Host'
import { Link } from 'react-router-dom'


export const MyPosts = () => {

  const [PostsData,setPostsData] = useState([]) ;
    const [logUser,setLogUserName] = useState(null)
    const [showMessage, setShowMessage] = useState(false);

    const getData = async () => {
      const res = await axios.get(`${Host}/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })
      setLogUserName(res.data.username)
    }
    

  useEffect(()=>{
      const fetchPosts = async ()=>{
        const res = await axios.get(`${Host}/AllgetPosts?user=${logUser}`)
        setPostsData(res.data)
      }
      fetchPosts() ;
      getData();
      
    
  },[logUser])


 
  useEffect(() => {
    if (PostsData.length === 0) {
      const timeoutId = setTimeout(() => {
        setShowMessage(true);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [PostsData]);

  return (
   <>
   <div className='pt-14 min-h-screen bg-gray-950'>
    <div className='justify-between flex flex-col bg-gray-950'>
    <p className='text-white text-center font-bold text-3xl pt-3 '>My Articles </p>
     
         {
          (PostsData.length == 0) && (
          <div className=' flex justify-center pt-20 items-center'>
    
          <p className=''> <img src="/images/load.svg" className='h-28' alt="" /> </p>
          
          </div>
          
          )
        }
     {showMessage && (
        <div className='bg-red-500 text-white fixed top-28 z-10 px-3 py-2 text-center text-xl font-semibold rounded'>
          Hey there! It looks like there are no posts yet. Why not <Link className='underline font-bold' to='/Write'>write</Link> one?
        </div>
      )}
   <Posts PostsData={PostsData}/>
    </div>
   
   </div>
   </>
  )
}
