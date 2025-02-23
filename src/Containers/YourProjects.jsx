import React, { useContext, useEffect } from 'react'
import { DataContext } from '../App';
import SideBar from '../Components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import SignUpPopUp from '../Components/SignUpPopUp';
import { useNavigate } from 'react-router-dom';
import { addUserData, loggedIn } from '../slices/slice';
import ProjectCard from '../Components/ProjectCard';

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
        <div className='w-full h-[91vh] p-6 bg-[#131417] text-white overflow-y-scroll scroll-smooth'>
          <h1 className='mb-4 font-bold text-xl'>Your Projects</h1>

         <div className='flex flex-wrap items-center justify-start gap-3'>
         {
            statePinnedProjects.map((ele) =>{
              return <ProjectCard key={ele.id} {...ele} projectData={{...ele}} pinned={true} background={true} />
            })
          }
         {
            stateProjects.map((ele) =>{
              return <ProjectCard key={ele.id} {...ele} />
            })
          }
         </div>
        </div>
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