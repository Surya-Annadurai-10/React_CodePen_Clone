import React, { useEffect } from 'react'
import {useDispatch} from "react-redux";
import { addUserData } from '../slices/slice';
import AuthBox from '../Components/AuthBox';
import {motion} from "motion/react"
import { variantsObj } from './Projects';


const Auth = () => {
  const dispatch = useDispatch();

  const handleClick = () =>{

    const userObj = {
      name:"Surya",
      age : 25,
      city : "Tiruppur"
    }
    dispatch(addUserData(userObj))
  }
  return (
  <>
    <div 

    className='bg-[#131417] p-4 w-full py-6  h-[91%] text-white'>
      <motion.img
      variants={variantsObj}
      initial="hidden"
      animate="visible"
      className='w-[100px]' src="https://cdn.freebiesupply.com/logos/large/2x/codepen-logo-png-transparent.png" alt="" />
        <div className='w-full gap-4 grid place-items-center'>
             <motion.h1
             variants={variantsObj}
               initial="hidden"
               animate="visible"
             >Join Our Community, Lets Grow Together !🤩</motion.h1>
             <AuthBox />
        </div>
             
        
    </div>
  </>
  )
}

export default Auth