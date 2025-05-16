import React from 'react'
import loader from "../assets/loader.svg"
const Loader = () => {
  return (
    <div className='w-full flex items-center flex-col justify-center  h-[90vh] bg-[#131417]'>
        <img className='w-[100px] ' src={loader} alt="loader" />
        <p className='text-white'>Loading...</p>
    </div>
  )
}

export default Loader