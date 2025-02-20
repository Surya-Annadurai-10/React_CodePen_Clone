import React from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <div className=' flex justify-between px-10 items-center w-full h-[9vh] bg-[#000000]'>

    <div className='text-[#868CA0] flex items-center gap-2 justify-center text-xl  bg-[#252830]  w-[300px] h-[6vh] rounded'>
       <FiSearch className='text-2xl' />
      <input type="text" className='text-[#868CA0] w-[85%]  outline-0 border-0 rounded placeholder:text-[#868CA0] h-full'  placeholder='Search...' />
    </div>
    <div className='flex justify-center items-center gap-5 '>
      <Link to={"/home/authentication"} className='w-[100px] grid place-items-center h-[45px] rounded bg-emerald-500 hover:bg-emerald-700'>Sign Up</Link>
      <Link to={"/home/authentication"} className='bg-[#252830] grid place-items-center w-[100px] h-[45px] hover:bg-[#53596a] text-[#d6d6d6] rounded'>Log In</Link>
    </div>
    </div>
  )
}

export default Header