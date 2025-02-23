import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import {motion} from "motion/react"
import { variantsObj } from '../Containers/Projects';
import { useSelector } from 'react-redux';
import { ToastContainer , toast } from 'react-toastify';


const Header = () => {
  // const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn)
  const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn)
  const stateUserData = useSelector(state => state.codepenData.userData)
 

  useEffect(() =>{
      if(stateIsLoggedIn){
       toast.success("Login Successful !", {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             });
      }
  },[stateIsLoggedIn])

  // console.log(stateUserData.photoURL);
  
   return (
    <div className=' flex justify-between px-10 items-center w-full h-[9vh] bg-[#000000]'>

    <motion.div
    variants ={variantsObj}
    initial ="hidden"
    animate="visible"
    className='text-[#868CA0] flex items-center gap-2 justify-center text-xl  bg-[#252830]  w-[300px] h-[6vh] rounded'>
       <FiSearch className='text-2xl' />
      <input type="text" className='text-[#868CA0] w-[85%]  outline-0 border-0 rounded placeholder:text-[#868CA0] h-full'  placeholder='Search...' />
    </motion.div>
   {
    stateIsLoggedIn ? 
    <div>
      <div>
        <img className='w-[50px] rounded-full object-cover ' src={stateUserData.photoURL ? stateUserData.photoURL : 
          "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"
        } alt="" />
      </div>
    </div>
    :  <motion.div
    variants ={variantsObj}
    initial ="hidden"
    animate="visible"
    className='flex justify-center items-center gap-5 '>
      <Link to={"/home/authentication"} className='w-[100px] grid place-items-center h-[45px] rounded bg-emerald-500 hover:bg-emerald-700'>Sign Up</Link>
      {/* <Link to={"/home/authentication"} className='bg-[#252830] grid place-items-center w-[100px] h-[45px] hover:bg-[#53596a] text-[#d6d6d6] rounded'>Log In</Link> */}
      <ToastContainer />
    </motion.div>
   }

    
    </div>
  )
}

export default Header