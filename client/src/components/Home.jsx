import React, { useEffect,useState } from 'react'
import { Posts } from './Posts'
import axios from 'axios'
import Host from '../Host'


export const Home = () => {

  const [PostsData,setPostsData] = useState([]) ;

  
  useEffect(()=>{
      const fetchPosts = async ()=>{
        const res = await axios.get(`${Host}/AllgetPosts`)
        setPostsData(res.data)
      }
      fetchPosts() ;
  },[])

  

  return (
   <>
   <div>
    <div className='justify-between flex flex-col bg-gray-950'>
    <p className='text-white text-center font-bold text-3xl pt-3 '>Recent Articles</p>
    {
      (PostsData.length == 0) && (
      <div className='pt-10 flex justify-center items-center'>

      <p className=''> <img src="/images/load.svg" className='h-28' alt="" /> </p>
      
      </div>
      
      )
    }
    <Posts PostsData={PostsData}/>
    </div>
   
   </div>
   </>
  )
}
