import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";
import { addUserData } from '../slices/slice';
import { TbMailFilled } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, firestore, googleAuthProvider } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const AuthBox = () => {
  const dispatch = useDispatch();
  const [showPass , setShowPass] = useState (false);
  const [showLogin , setShowLogin] = useState(false);
  const userDetailsRef = collection(firestore , "userDetails");

  const handleClick = () =>{

    const userObj = {
      name:"Surya",
      age : 25,
      city : "Tiruppur"
    }
    dispatch(addUserData(userObj))
  }


  const handleLoginWithGoogle = async() =>{
        try {
            const res = await signInWithPopup(auth , googleAuthProvider)
            console.log(res.user.providerData[0]);
           let user = res.user.providerData[0];
            localStorage.setItem("userData" , JSON.stringify(user));
            dispatch(addUserData(user))
            await addDoc(userDetailsRef , user);
            
        } catch (error) {
             console.log("Error" , error);
             
        }
  }

  return (
  <>

    
             
        <div className='bg-[#24252d] rounded-xl p-4 w-[300px]'>
             <div className='pb-5'>
               <p className='text-[12px]'>Email</p>
              <div className='flex p-1.5 bg-white rounded'>
                <TbMailFilled color={'#575757'} fontSize={"1.4rem"} />
                  <input className='w-[90%] px-1 text-[#1E1F26] outline-0 border-0 ' type="email"  placeholder='Email'/>
              </div>
             </div>
             <div className='pb-8'>
               <p className='text-[12px]'>Password</p>
              <div className='flex p-1.5 bg-white rounded'>
                <MdOutlinePassword color={'#575757'} fontSize={"1.4rem"} />
                  <input className='w-[80%] text-[13px] px-2 text-[#1E1F26] outline-0 border-0 ' type={showPass ? "text" : "password"} placeholder='Password' />
                {
                    showPass ? <IoMdEye onClick={() => setShowPass(!showPass)}  fontSize={"1.4rem"}  className='text-[#1E1F26]'/>
                    : 
                    <IoMdEyeOff onClick={() => setShowPass(!showPass)}  fontSize={"1.4rem"}  className='text-[#1E1F26]'/>
                }
              </div>
             </div>
             {
                !showLogin ? <div className='pb-8'>
                <p className='text-[12px]'>Confirm Password</p>
               <div className='flex p-1.5 bg-white rounded'>
                 <MdOutlinePassword color={'#575757'} fontSize={"1.4rem"} />
                   <input className='w-[80%] text-[13px] px-2 text-[#1E1F26] outline-0 border-0 ' type={showPass ? "text" : "password"} placeholder='Confirm Password' />
                 {
                     showPass ? <IoMdEye onClick={() => setShowPass(!showPass)}  fontSize={"1.4rem"}  className='text-[#1E1F26]'/>
                     : 
                     <IoMdEyeOff onClick={() => setShowPass(!showPass)}  fontSize={"1.4rem"}  className='text-[#1E1F26]'/>
                 }
               </div>
              </div> : null
             }
             <div className='pb-6'>
               <button  className='w-[100%]  grid place-items-center h-[35px] rounded bg-emerald-500 hover:bg-emerald-700'>{showLogin ? "Login" : "Sign Up"}</button>
             </div>        
             <div className='grid place-items-center'>
               <p className='text-[11px]  text-[#cfcfcf]'>{showLogin ? "Don't have an account?" : "Already Have an account?"} <span onClick={() =>setShowLogin(!showLogin)} className=' hover:underline underline-offset-2 cursor-pointer origin-center text-[#00BC7D]' >{showLogin ? "Sign Up Here" : "Login Here"}</span></p>
             </div>
              <div className="flex items-center justify-around py-6">
               <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>
                <p className='text-[#6f6f6f]'>or</p>
                <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>

             </div>
             <div>
                <button onClick={handleLoginWithGoogle} className='flex w-full hover:bg-[#676767] cursor-pointer items-center justify-center gap-2 rounded bg-[#4e4e4e] text-white'>
                    <img className='w-[50px]' src="https://i2.wp.com/www.freepnglogos.com/uploads/new-google-logo-transparent--14.png" alt="" />
                     <p>Login with Google</p>
                </button>
                
             </div>
             <div className="flex items-center justify-around py-6">
                <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>
                <p className='text-[#6f6f6f]'>or</p>
                <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>

             </div>
             <div >
                <button className='flex hover:bg-[#676767]  cursor-pointer w-full items-center justify-center gap-2 rounded bg-[#4e4e4e] text-white'>
                    <img className='w-[38px]' src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="" />
                     <p>Login with GitHub</p>
                </button>
                
             </div>
             
        </div>
 
  </>
  )
}

export default AuthBox