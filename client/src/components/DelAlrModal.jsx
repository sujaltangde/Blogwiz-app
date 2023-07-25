import React from 'react'

export const DelAlrModal = () => {
  return (
   <div className={`fixed top-56 md:left-96 md:mx-0 mx-5 left-0`}>
     <div className='bg-gray-800 border rounded-md text-center pt-5 pb-2 text-2xl md:px-6 px-2 font-bold text-white'>
        <p>Are you sure you want to delete your account ?</p>
        <div className='flex gap-10 pt-8 justify-center'>
            <button className='text-xl bg-red-600 text-white  px-5 rounded-md py-1'>Yes</button>
            <button className='text-xl bg-blue-600 text-white px-5 rounded-md py-1'>No</button>
        </div>
    </div>
   </div>
  )
}
