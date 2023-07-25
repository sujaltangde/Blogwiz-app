import { React, useState, useEffect } from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPostCreAlertTrue } from "../Slice"
import Host from '../Host'
import axios from 'axios'


export const Write = () => {



    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [author, setAuthor] = useState("");

    const [postCreated, setPostCreated] = useState(false);
    const [postId, setPostId] = useState("");

    const [alert, setAlert] = useState(true)

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${Host}/status`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            setAuthor(res.data.username)
        }
        getData();
    }, [])



    useEffect(() => {
        const LogOrNot = async () => {
            const res = await axios.get(`${Host}/logOrNot`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            setAlert(res.data.loggedIn)

        }
        LogOrNot();
    },)

    
    const makePost = async (e) => {
        e.preventDefault()
        
        const data = new FormData()
        data.append("photo",file)
        
         const res =  await axios.post(`${Host}/upload`,data);
         const PhotoUrl = res.data
         const newPost = {
            username: author,
            title: title,
            summary: summary,
            desc: desc,
            photo:PhotoUrl
        };

       const savedPost = await axios.post(`${Host}/createPost`,newPost)
       setPostCreated(true)
    };



    if (postCreated) {
        dispatch(setPostCreAlertTrue());
        return <Navigate to="/" />
    }

    return (
        <>
            <div>
                <div className='bg-gray-950 pb-20 text-white min-h-screen pt-14'>

                    <div>
                        <form action="" onSubmit={makePost} className=''>

                            <div className='flex flex-col  justify-center md:px-0 px-5 items-center w-full gap-4'>
                                <div>
                                    <h1 className='md:text-5xl text-4xl font-bold py-6 '>Create your post</h1>
                                </div>
                                {
                                    (alert) ? null : (<p className='fixed top-32 px-2 py-2 bg-red-500 font-bold text-xl'>Please <Link to="/login" className='underline'>Log in</Link> to write a post  </p>)
                                }
                                <div className='flex justify-center items-center'>
                                    {file &&
                                        (<img src={URL.createObjectURL(file)} className='w-full rounded-md' alt="" />)
                                    }
                                </div>
                                <div className='flex gap-2 md:w-1/2 w-full'>
                                    <label htmlFor="fileinput">
                                        <RiImageAddLine className='cursor-pointer' size={32} />
                                    </label>
                                    <input type="file"
                                        onChange={(e) => setFile(e.target.files[0])} className='hidden' id='fileinput' />

                                    <input type="text" placeholder='Add title' id='title'
                                        onChange={(e) => setTitle(e.target.value)} autoFocus={true} className='outline-none text-white bg-gray-800 rounded-md border border-white px-2 py-1 w-full' />
                                </div>

                                <div className='flex gap-2 md:w-1/2 w-full'>
                                    <input type="text" placeholder='Add summary' id='title'
                                        onChange={(e) => setSummary(e.target.value)}
                                        className='outline-none text-white bg-gray-800 rounded-md border border-white px-2 py-1 w-full' />

                                </div>

                                <div className='md:w-1/2'>
                                    <textarea placeholder='Tell your story...' type='text'
                                        onChange={(e) => setDesc(e.target.value)} className='outline-none rounded-md  border border-white bg-gray-800 px-2 py-1 w-full' cols="60" rows="10"></textarea>
                                </div>

                                <div className='py-2'>
                                    <button className="px-6 rounded-md py-1 text-xl bg-blue-500 text-white font-bold">Publish</button>
                                </div>

                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
