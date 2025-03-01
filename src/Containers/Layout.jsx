import React, { useContext, useEffect } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addPinnedProjects, addProjects, addUserData, initialRender, initialRenderToPinned, initialRenderToTrending, loggedIn } from '../slices/slice'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase'
import { DataContext } from '../App'

const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn);
    const ctx = useContext(DataContext);

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
       const projectsRef = collection(firestore , "projects")
       try {
         const res = await getDocs(projectsRef);
   
         const mappedData = res.docs.map(doc =>{
           return doc.data();
         })
         console.log(mappedData);
         dispatch(initialRender(mappedData))
       } catch (error) {
         console.log("error" , error);
    
       }
     }
   
     if(stateIsLoggedIn){
       fetchData();
     }
   },[]);
   
   useEffect(() =>{
     const fetchData = async() =>{
      
       const pinnedProjectsRef = collection(firestore , "pinned")
       try {
        
         const pinnedRes = await getDocs(pinnedProjectsRef);
         const mappedData = pinnedRes.docs.map(doc =>{
           return doc.data();
         
         })
         console.log(mappedData);
         dispatch(addPinnedProjects(mappedData))
       } catch (error) {
         console.log("error" , error);
    
       }
     }
   
     if(stateIsLoggedIn){
       fetchData();
     }
   },[]);
   
   useEffect(() =>{
     const fetchData = async() =>{
      // console.log("hi");
      
       const trendingProjectsRef = collection(firestore , "trending")
       try {
        
         const trendingRes = await getDocs(trendingProjectsRef);
         const mappedData = trendingRes.docs.map(doc =>{
           return doc.data();
         
         })
         console.log(mappedData);
         dispatch(initialRenderToTrending(mappedData))
       } catch (error) {
         console.log("error" , error);
    
       }
     }
       fetchData();
   },[]);

   
  return (
   <>
        <div className='flex w-full h-[95.7vh]'>

            <SideBar />
       
        <div className={`${ctx.isSideBarOpen ? "lg:w-[85%] md:w-[80%] w-[100%]" : "w-[98%]"}`}>
            <Header />
            <Outlet />
            <Footer />
        </div>
        </div>
        
   
   </>
  )
}

export default Layout