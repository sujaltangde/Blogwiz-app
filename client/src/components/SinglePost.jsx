import { React, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router'
import { setPostDelAlertTrue } from '../Slice'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Host from '../Host'


export const SinglePost = ({ logUser }) => {
    const Location = useLocation()
    const path = Location.pathname.slice(6)

    const [post, setPost] = useState([]);
    const [PostDel, setPostDel] = useState(false);

    const [newTitle, setNewTitle] = useState(post.title)
    const [newDesc, setNewDesc] = useState(post.desc)

    const [updateAlert, setUpdateAlert] = useState(false);

    const [updateMode, setUpdateMode] = useState(false)

    const [openAlrt, setOpenAlrt] = useState(false);

    



    const dispatch = useDispatch()

    useEffect(() => {
        const getSinglePost = async () => {
            const res = await axios.get(`${Host}/getPost/` + path);
            setPost(res.data);
        }
        getSinglePost();
    })


    const DelPost = async () => {
        const res = await axios.delete(`${Host}/deletePost/` + path, {
            data: { username: logUser } // Send username in the request body
        })
        setOpenAlrt(false)
        setPostDel(true)
                
    }
    if(PostDel){
        dispatch(setPostDelAlertTrue())
        return <Navigate to="/" />    
    }

    const EditPost = async () => {

        const res = await axios.put(`${Host}/updatePost/${path}`, {
            username: logUser,
            title: newTitle,
            desc: newDesc
        })
        setUpdateAlert(true);
        setUpdateMode(false)
    }

    const openAlr = () => {
        setOpenAlrt(true);
    }

    if (updateAlert) {
        setTimeout(() => {
            setUpdateAlert(false)
        }, 3000)
    }

   

    return (
        <>
            {(post.length === 0) ? (
                <div className='pt-28 flex justify-center items-center'>

                    <p className=''> <img src="/images/load.svg" className='h-28' alt="" /> </p>

                </div>
            ) :
                (<div>


                    <div className='flex flex-col gap-3 py-5'>
                        {
                            updateAlert && <p className='px-3 py-2 left-0 fixed bg-green-400 font-bold text-lg'>Post updated successfully</p>
                        }
                        {updateMode &&
                            <h1 className='text-center md:text-6xl text-5xl   font-bold'>Edit your post</h1>
                        }
                        <div className='flex justify-center md:px-28 px-5  items-center'>

                            <img src={post.photo} className='md:w-2/3 w-full rounded-md' alt="" />
                        </div>

                        <div className='flex justify-center   py-6 w-full gap-3 '>
                            {
                                (updateMode) ? (
                                    <div className='md:w-[62vw] w-full md:pl-0 pl-6'>
                                        <p htmlFor="editTitle" className='md:text-3xl text-2xl font-bold'>Edit Title :</p>
                                        <input onChange={(e) => setNewTitle(e.target.value)} type="text" name='editTitle' className='bg-gray-900 font-white  outline-none py-1 font-bold px-2 rounded-md md:text-4xl text-2xl' defaultValue={post.title} />
                                    </div>) :
                                    (<p className='text-center font-bold md:text-5xl text-4xl'>{post.title}</p>)
                            }

                        </div>

                        <div className='flex justify-between md:px-28 md:text-xl text-sm px-6 text-yellow-400'>
                            <p>Author : {post.username}</p>
                            <p>{new Date(post.createdAt).toDateString()}</p>
                        </div>


                        <div className='md:px-28 px-6'>
                            {
                                (updateMode) ? (
                                    <div className='md:w-[62vw] w-full'>
                                        <p className='text-2xl font-bold'>Edit Description :</p>
                                        <textarea onChange={(e) => setNewDesc(e.target.value)} className='bg-gray-900 text-white rounded-md md:px-2 py-2 outline-none w-full h-52 px-2 ' cols={100} defaultValue={post.desc} />
                                    </div>
                                ) :
                                    (<p>{post.desc}</p>)
                            }
                        </div>
                        {
                        
                        openAlrt &&

                            <div className={`fixed top-56 md:left-96 md:mx-0 mx-5 left-0`}>
                                <div className='bg-gray-800 border rounded-md text-center pt-5 pb-2 text-2xl md:px-6 px-2 font-bold text-white'>
                                    <p>Are you sure you want to delete this post ?</p>
                                    <div className='flex gap-10 pt-8 justify-center'>
                                        <button onClick={() => DelPost()} className='text-xl bg-red-600 text-white  px-5 rounded-md py-1'>Yes</button>
                                        <button onClick={() => setOpenAlrt(false)} className='text-xl bg-blue-600 text-white px-5 rounded-md py-1'>No</button>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='flex py-5 justify-center'>
                            <span className='text-center flex gap-7 '>
                                {
                                    (logUser === post.username) ?
                                        ((!updateMode) ?
                                            (<div className='flex gap-10 pt-10'>
                                      <AiOutlineDelete className='cursor-pointer text-red-500' size={33} onClick={() => setOpenAlrt(true)} />

                                                <FaRegEdit onClick={() => setUpdateMode(true)} className='cursor-pointer text-green-500' size={30} />
                                            </div>) : (<button className='px-2 md:text-2xl text-xl rounded-md md:w-52 w-32 py-1 bg-blue-600 font-bold' onClick={() => EditPost()} >Edit Post</button>)) : null
                                }
                            </span>
                        </div>
                    </div>

                </div>)
            }
        </>
    )
}
