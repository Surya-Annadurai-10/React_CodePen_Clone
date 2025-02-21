import React, { useContext } from 'react'
import { DataContext } from '../App'
import { Link } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";

const SignUpPopUp = () => {
    const ctx = useContext(DataContext)

  return (
   <>
    <div className='w-full grid place-items-center text-white  h-screen fixed z-100 top-0 left-0 bg-[#000000b7] ' >
        <div className='w-[400px] h-[200px] relative flex flex-col justify-center items-center gap-4 rounded-xl bg-[#1E1F26]'>
             <h2 className='font-bold text-2xl'>You Haven't Signed Up Yet 😥</h2>
             <p className='text-[grey] text-[12px]'>Kindly Sign Up to Enjoy Unlimited Adventures !</p>
              <Link to={"/home/authentication"} className='w-[150px] grid place-items-center h-[45px] rounded bg-emerald-500 hover:bg-emerald-700'>Sign Up for Free</Link>
              {/* <RxCross2 onClick={() => ctx.setShowSignUpPopUp(false)} className='absolute -top-6  hover:bg-white p-1 rounded-full hover:text-black -right-6 text-3xl text-white ' /> */}
        </div>

    </div>
   </>
  )
}

export default SignUpPopUp