import React, { useEffect } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useDispatch } from 'react-redux'
import { addUserData, loggedIn } from '../slices/slice'

const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() =>{
      let user = JSON.parse(localStorage.getItem("userData"))
      if(user){
        dispatch(loggedIn(true));
        dispatch(addUserData(user))
        
      }else  {
        dispatch(loggedIn(false))
        navigate("/home/trending")
      };
    },[])

  return (
   <>
        <div className='flex w-full h-screen'>

            <SideBar />
       
        <div className='w-[100%]'>
            <Header />
            <Outlet />
        </div>
        </div>
        <div>
            <Footer />
        </div>
   
   </>
  )
}

export default Layout