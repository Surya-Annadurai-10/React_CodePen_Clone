import React, { useEffect } from 'react'
import {useDispatch} from "react-redux";
import { addUserData } from '../slices/slice';
import { TbMailFilled } from "react-icons/tb";
import AuthBox from '../Components/AuthBox';

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
    <div  className='bg-[#131417] p-4 w-full py-6  h-[91%] text-white'>
      <img className='w-[100px]' src="https://cdn.freebiesupply.com/logos/large/2x/codepen-logo-png-transparent.png" alt="" />
        <div className='w-full grid place-items-center'>
             <h1>Become one of Us !🤩</h1>
        </div>
             
        <AuthBox />
    </div>
  </>
  )
}

export default Auth