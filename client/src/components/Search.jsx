// import { React, useState, useEffect } from 'react'
// import { FaSearch } from 'react-icons/fa'
// import axios from 'axios'
// import Host from '../Host'
// import { Link, Navigate  } from 'react-router-dom'

// export const Search = () => {

//   const [PostsData, setPostsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]) ;
//   const [keyWord,setKeyword] = useState("")


//   useEffect(() => {
//     const fetchPosts = async () => {
//       const res = await axios.get(`${Host}/AllgetPosts`)
//       setPostsData(res.data)
//     }
//     fetchPosts();
//   }, [])


//   console.log(PostsData)

//   const handleFilter = (e)=>{
//     const searchWord = e.target.value
//     setKeyword(searchWord)
//     const newFilter = PostsData.filter((value)=>{
//       return value.title.toLowerCase().includes(searchWord.toLowerCase()) ;
//       })
//       if(searchWord === ""){
//         setFilteredData([])
      
//       }
//       else{
//       setFilteredData(newFilter)
//       }
//   }
  



  


//   return (
//     <div>
//       <div className='flex flex-row '>
//         <input type="text" value={keyWord} placeholder='Search an article' onChange={handleFilter} className='bg-gray-900 w-64 border text-white border-gray-500 outline-none px-2 text-lg  border-r-0 md:pt-1 rounded-s-sm  ' />
      
//         <span className='bg-gray-900px-1 rounded-e-sm pr-2  border-l-0 border border-gray-500 text-center'>
        
//           <FaSearch className='text-white pt-2' /> 
         

//         </span>

//         {
//          filteredData.length !== 0 && (<div className={`bg-gray-900  rounded-s-md  fixed rounded-e-md md:top-12  w-72 text-white`}>
//           <ul className=' min-h-0 overflow-hidden  overflow-y-hidden flex flex-col  py-1'>
//             {
//               filteredData.slice(0,4).map((e) => (
//                <Link to={`/post/${e._id}`}  > <p  className='hover:bg-gray-800 px-2 text-xl py-1'>{e.title}</p> </Link>
//               ))
//             }
//           </ul>
//         </div>)}

//       </div>
//     </div>
//   )
// }




import { React, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import axios from 'axios';
import Host from '../Host';
import { Link, Navigate } from 'react-router-dom'; 

export const Search = () => {
  const [PostsData, setPostsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyWord, setKeyword] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${Host}/AllgetPosts`);
      setPostsData(res.data);
    };
    fetchPosts();
  });

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setKeyword(searchWord);
    const newFilter = PostsData.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleLinkClick = () => {
    // Clear the filter data and keyword
    setFilteredData([]);
    setKeyword('');
  };

  return (
    <div className=' ' >
      <div className='flex flex-row '>
        <input
          type='text'
          value={keyWord}
          placeholder='Search an article'
          onChange={handleFilter}
          className='bg-gray-900 md:w-56 w-40 border text-white border-gray-500 outline-none px-2 md:text-lg text-sm md:py-0 py-1  border-r-0 md:pt-1 rounded-s-sm  '
        />

        <span className='bg-gray-900px-1 flex justify-center items-center rounded-e-sm pr-2  border-l-0 border border-gray-500 text-center'>
          <FaSearch className='text-white ' />
        </span>

        {filteredData.length !== 0 && (
          <div className={`bg-gray-900  rounded-s-md  fixed rounded-e-md top-12 w-48  md:w-64 text-white`}>
            <ul className=' min-h-0 overflow-hidden  overflow-y-hidden flex flex-col  py-1'>
              {filteredData.slice(0, 4).map((e) => (
                <Link to={`/post/${e._id}`} key={e._id}>
                  <p  className='hover:bg-gray-800  px-2 md:text-xl text-sm py-1' onClick={handleLinkClick}>
                    {e.title}
                  </p>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
