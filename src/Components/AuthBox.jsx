import React, { useEffect, useRef, useState } from 'react'
import {useDispatch} from "react-redux";
import { addUserData, loggedIn } from '../slices/slice';
import { TbMailFilled } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, firestore, githubAuthProvider, googleAuthProvider } from '../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import {motion} from "motion/react"
import { variantsObj } from '../Containers/Projects';
import { useNavigate } from 'react-router-dom';

const AuthBox = () => {
  const dispatch = useDispatch();
  const [showPass , setShowPass] = useState (false);
  const [showLogin , setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const userDetailsRef = collection(firestore , "userDetails");
  const emailInputRef = useRef(null)

  const [alert , setAlert] = useState(false);
  const [alertMsg , setAlertMsg] = useState("");
  const navigate = useNavigate();
  

  const handleLoginWithGoogle = async() =>{
        try {
            const res = await signInWithPopup(auth , googleAuthProvider)
        
           let user = res.user.providerData[0];
            localStorage.setItem("userData" , JSON.stringify(user));
          
            await setDoc(doc(firestore,"userData" , user.uid) , user);
            console.log(user);
            dispatch(addUserData(user))
            dispatch(loggedIn(true));
            toast.success("Login Successful !" , {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            })
          setTimeout(() =>{
            navigate("/home/trending")
          },2000)

        } catch (error) {
             console.log("Error" , error);
             
        }
  }

  const handleLoginWithGithub = async() =>{
    try {
      const res = await signInWithPopup(auth , githubAuthProvider);
      // console.log(res);
      
      console.log(res.user.providerData[0]);
           let user = res.user.providerData[0];
            localStorage.setItem("userData" , JSON.stringify(user));
            await setDoc(doc(firestore , "userData" , user.uid) , user);
            dispatch(addUserData(user))
            dispatch(loggedIn(true));
            toast.success("Login Successful !" , {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            })
           setTimeout(() => {
            navigate("/home/trending")
           }, 2000);

      
    } catch (error) {
      console.log("Error" , error);
      if(error+"".includes("account-exists-with-different-credential")){
          toast.error("Try with different Email" , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          })
      }
      
    }
  }

  const setEmailValue = (value) =>{
       if(value.target.value.includes("@")){
        setEmail(value.target.value);
        emailInputRef.current.style.boxShadow = "none"
       }else{
        setEmail(value.target.value);

        emailInputRef.current.style.boxShadow = "0px 0px 10px red"

       }
  }

 

const createNewUser = async() =>{
  if(!showLogin){
    console.log("Email" , email);
    console.log("password" , password);
    console.log("confirmPassword" , confirmPassword);
    if(password != confirmPassword){
      setAlert(true);
      setAlertMsg("Please Check your Confirm Password");
       
      setTimeout(() =>{
        setAlert(false)
        setAlertMsg("");
      },5000)
      
    }else{
      try {
        const res = await createUserWithEmailAndPassword(auth , email,password);
      console.log(res);
      toast.success("Registration Successful !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setShowLogin(true);
        setEmail("")
        setPassword("")

      } catch (error) {
        console.log("Error" , error);
        if((error.message).includes("weak-password")){
          setAlertMsg(" Password should be atleast 6 characters")
          setAlert(true);
          setTimeout(() =>{
            setAlert(false)
            setAlertMsg("");
          },5000)
        }else if((error.message).includes("invalid-email")){
          setAlertMsg(" Invalid Email")
          setAlert(true);
          setTimeout(() =>{
            setAlert(false)
            setAlertMsg("");
          },5000)
        }
      }
      

    }
    
  }

  if(showLogin){
    console.log("Email" , email);
    console.log("password" , password);
   try {
     
    const res = await signInWithEmailAndPassword(auth , email, password);
    const user = res.user.providerData[0];
    
    localStorage.setItem("userData" , JSON.stringify(user));
    dispatch(addUserData(user));
     dispatch(loggedIn(true));

     await setDoc(doc(firestore , "userData" , user.uid) , user)
     setTimeout(() =>{
      navigate("/home/trending")
     },2000)
    } catch (error) {
      console.log(error);
      // console.log("Error" , error);
      if((error.message).includes("invalid-credential")){
        setAlertMsg("Invalid Credentials")
        setAlert(true);
        setTimeout(() =>{
          setAlert(false)
          setAlertMsg("");
        },5000)
      }
   }
    
  }
}


  return (
  <>


             
        <motion.div
        variants={variantsObj}
        initial="hidden"
        animate="visible"
        className='bg-[#24252d] relative rounded-xl p-7 w-[340px]'>
             <div className='pb-5'>
               <p className='text-[12px]'>Email</p>
              <div   ref={emailInputRef} className='flex p-1.5 bg-white rounded'>
                <TbMailFilled color={'#575757'} fontSize={"1.4rem"} />
                  <input
                
                  value={email}
                  onChange={(e) => setEmailValue(e)}
                  className='w-[90%] px-1 text-[#1E1F26] outline-0 border-0 ' type="email"  placeholder='Email'/>
              </div>
             </div>
             <div className='pb-8'>
               <p className='text-[12px]'>Password</p>
              <div className='flex p-1.5 bg-white rounded'>
                <MdOutlinePassword color={'#575757'} fontSize={"1.4rem"} />
                  <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-[90%] text-[13px] px-2 text-[#1E1F26] outline-0 border-0 ' type={showPass ? "text" : "password"} placeholder='Password' />
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
                   <input 
                   value = {confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   className='w-[90%] text-[13px] px-2 text-[#1E1F26] outline-0 border-0 ' type={showPass ? "text" : "password"} placeholder='Confirm Password' />
                 {
                     showPass ? <IoMdEye onClick={() => setShowPass(!showPass)}  fontSize={"1.4rem"}  className='text-[#1E1F26]'/>
                     : 
                     <IoMdEyeOff onClick={() => setShowPass(!showPass)}  fontSize={"1.4rem"}  className='text-[#1E1F26]'/>
                 }
               </div>
              </div> : null
             }

             {
              setAlert ? <div className='w-full grid place-items-center pb-2'>
                <p className='font-bold text-center text-[12px] text-red-500'>{alertMsg}</p>
                <ToastContainer />
              </div> :null
             }
             <div className='pb-6'>
               <motion.button onClick={createNewUser}  whileTap={{scale:0.9}}  className='w-[100%]  grid place-items-center h-[35px] rounded bg-emerald-500 hover:bg-emerald-700'>{showLogin ? "Login" : "Sign Up"}</motion.button>
             </div>        
             <div className='grid place-items-center'>
               <p className='text-[11px]  text-[#cfcfcf]'>{showLogin ? "Don't have an account?" : "Already Have an account?"} <span onClick={() =>{
                setShowLogin(!showLogin)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                showPass(false)
               }} className=' hover:underline underline-offset-2 cursor-pointer origin-center text-[#00BC7D]' >{showLogin ? "Sign Up Here" : "Login Here"}</span></p>
             </div>
              <div className="flex items-center justify-around py-1 md:py-6 lg:py-6">
               <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>
                <p className='text-[#6f6f6f]'>or</p>
                <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>

             </div>
             <div>
                <motion.button whileTap={{scale:0.9}} onClick={handleLoginWithGoogle} className='flex w-full hover:bg-[#676767] cursor-pointer items-center justify-center gap-2 rounded bg-[#4e4e4e] text-white'>
                    <img className='w-[50px]' src="https://i2.wp.com/www.freepnglogos.com/uploads/new-google-logo-transparent--14.png" alt="" />
                     <p>Login with Google</p>
                </motion.button>
                
             </div>
             <div className="flex items-center justify-around py-1 md:py-6 lg:py-6">
                <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>
                <p className='text-[#6f6f6f]'>or</p>
                <div className='h-[1px] w-[35%] bg-[#6f6f6f]'></div>

             </div>
             <div  >
                <motion.button whileTap={{scale:0.9}} onClick={handleLoginWithGithub} className='flex hover:bg-[#676767]  cursor-pointer w-full items-center justify-center gap-2 rounded bg-[#4e4e4e] text-white'>
                    <img className='w-[38px]' src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="" />
                     <p>Login with GitHub</p>
                </motion.button>
                <ToastContainer />
             </div>
            
        </motion.div>
       

  </>
  )
}

export default AuthBox