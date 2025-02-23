import React, { useEffect } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addProjects, addUserData, initialRender, initialRenderToPinned, loggedIn } from '../slices/slice'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase'

const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn);

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


    useEffect(() =>{
      const fetchData = async() =>{
        const projectsRef = collection(firestore, "projects")
        const pinnedProjectsRef = collection(firestore, "pinned")
        try {
          const res = await getDocs(projectsRef);
          const mappedData = res.docs.map(docs =>{
            return docs.data();
          })
          dispatch(initialRender(mappedData));
          
        } catch (error) {
         console.log(error);
         
        }

        try {
          const res = await getDocs(pinnedProjectsRef);
          const mappedData = res.docs.map(docs =>{
            return docs.data();
          })
          dispatch(initialRenderToPinned(mappedData));
          
        } catch (error) {
         console.log(error);
         
        }
      }

      if(stateIsLoggedIn){
        fetchData()
      }


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