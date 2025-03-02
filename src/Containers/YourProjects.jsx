import React, { useContext, useEffect } from 'react'
import { DataContext } from '../App';
import SideBar from '../Components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import SignUpPopUp from '../Components/SignUpPopUp';
import { useNavigate } from 'react-router-dom';
import { addPinnedProjects, addUserData, initialRender, loggedIn } from '../slices/slice';
import ProjectCard from '../Components/ProjectCard';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { motion } from 'motion/react';


const YourProjects = () => {
const ctx = useContext(DataContext);
// console.log(ctx);

const dispatch = useDispatch();

const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn);
const stateProjects = useSelector(state => state.codepenData.projects);
const statePinnedProjects = useSelector(state => state.codepenData.pinned);
// console.log("stateIsLoggedIn" , stateIsLoggedIn);
// console.log("stateProjects" , stateProjects);

const navigate = useNavigate();

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
    if(ctx.searchValue){
      console.log(ctx.searchValue);
      
    }
},[ctx.searchValue])

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
    <div>
      {
        stateIsLoggedIn ? 
        <motion.div
      
        className='w-full h-[87vh] p-6 bg-[#131417] text-white overflow-y-scroll scroll-smooth'>
          <h1 className='mb-4 font-bold text-xl'>Your Projects</h1>

         <div className='flex m-auto w-[90%] flex-wrap items-center  justify-center gap-4'>
         {
             statePinnedProjects.filter(ele => ele.title.toLowerCase().includes(ctx.searchValue.toLowerCase()))
            .map((ele) =>{
              return <ProjectCard key={ele.id} {...ele} projectData={{...ele}} pinned={true} background={true} trending={true} />
            })
          }
         {
            stateProjects.filter(ele => ele.title.toLowerCase().includes(ctx.searchValue.toLowerCase()))
            .map((ele) =>{
              return <ProjectCard key={ele.id} {...ele} trending={true} />
            })
          }
         </div>
        </motion.div>
         : 
   <>
    {
      ctx.showSignUpPopUp ? <SignUpPopUp /> : null
    }
   </>
      }

    </div>
  )
}

export default YourProjects