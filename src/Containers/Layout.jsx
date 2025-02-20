import React, { useEffect } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'

const Layout = () => {

    const navigate = useNavigate();

useEffect(() =>{
  navigate("/home/trending")
  

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