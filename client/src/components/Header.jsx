import React from 'react'

export const Header = () => {
  return (
    <>
 
        <div className='min-h-[70vh] bg-[url(/images/bg4.avif)] bg-cover  pt-14'>
            <div className='md:pt-20 pt-36 '>
                <div className='flex justify-center gap-5   bg-opacity-20  items-center flex-col'>
                    <div className='text-center   bg-opacity-10 md:py-7 py-15 rounded-xl md:px-6'>
                    <h1 className=' md:text-8xl text-7xl text-white font-bold'>Blogwiz</h1>
                    <p className='md:text-xl font-bold text-center px-10 text-white text-sm'>Unleash magic through captivating blogs on our user-friendly platform.</p>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}
