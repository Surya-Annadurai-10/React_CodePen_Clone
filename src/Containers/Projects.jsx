import React, { useContext, useEffect, useRef } from 'react'
import hero from "../assets/hero.png"
import {easeInOut, motion, stagger} from "motion/react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase'
import { initialRenderToTrending } from '../slices/slice'
import ProjectCard from '../Components/ProjectCard'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { DataContext } from '../App'
import Loading from '../Components/Loading'


export const variantsObj = {
  hidden : {
    y : -30,
    opacity : 0
  },
  visible :{
    y :0 ,
    opacity : 1,
    transition :{
      duration : 1,
      ease : easeInOut,
     
    },
 
  }
}

const Projects = () => {

 const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn);
 const stateTrending= useSelector(state => state.codepenData.trending);
const dispatch = useDispatch();
const containerRef= useRef(null)




// useEffect(() =>{
//   const fetchData = async() =>{
   
//     const trendingProjectsRef = collection(firestore , "trending")
//     try {
     
//       const trendingRes = await getDocs(trendingProjectsRef);
//       const mappedData = trendingRes.docs.map(doc =>{
//         return doc.data();
      
//       })
//       console.log(mappedData);
//       dispatch(initialRenderToTrending(mappedData))
//     } catch (error) {
//       console.log("error" , error);
 
//     }
//   }

//   if(stateIsLoggedIn){
//     fetchData();
//   }
// },[]);


const handleLeftScroll = ()=>{
  containerRef.current.scrollLeft -= 520;
}

const handleRightScroll = ()=>{
  containerRef.current.scrollLeft += 670;
}


  return (
<>

<div className='bg-[#131417] w-full py-6  h-[90.5%] text-white overflow-y-scroll'>
       <div className='w-[77%] gap-3  m-auto flex items-center justify-between '>
       <motion.div
       variants ={variantsObj}
        initial ="hidden"
           animate="visible"
           transition={{
         delayChildren : 0.5
           }}
       className='w-[48%] flex flex-col gap-4 ' >
           <div 
           
          
           className='flex gap-5 py-2 items-start'>
            <div>
              <img className='w-[100px]' src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png" alt="" />
            </div>
            <div>
              <h1 className='text-4xl leading-snug font-bold'>The best place to build, test, and discover front-end code.</h1>
            </div>
           </div>
           <p  className='leading-relaxed'>CodePen is a <strong>social development</strong> environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.</p>
        {
          stateIsLoggedIn ? null :   <motion.button whileTap={{scale:0.9}} className='w-[fit-content]'>
          <Link to="/home/authentication" className='grid place-items-center w-[150px] hover:shadow-[0px_0px_10px_green] my-3 h-[45px] rounded bg-emerald-500 hover:bg-emerald-700'>Sign Up for Free</Link>
          </motion.button>
        }
       </motion.div>
       <div className='w-[50%]'>
             <motion.img  variants={variantsObj}
             initial="hidden"
             animate="visible"
             src={hero} alt="" />
       </div>
       </div>
       <div className='w-[90%] m-auto py-4  pt-15 font-bold text-2xl'>
        <h1>Trending</h1>
       </div>
      {
        stateTrending.length != 0 ?  <div className='overflow-hidden  relative w-[95.3%] m-auto p-4 pr-9  px-10'>
        <div ref={containerRef} className=' trending flex w-full items-center  justify-start gap-6  overflow-x-scroll scroll-smooth'>
          {
            // trending w-full flex items-center  justify-start gap-2  overflow-x-scroll scroll-smooth 
           stateTrending.map((ele,i) =>{
            return <ProjectCard key={ele.id} {...ele} trending={false} />
            // return <div key={i} className='text-black'>hellow</div>
           })
          }
      </div>
      <button onClick={handleLeftScroll} className='bg-white shadow-[0px_0px_10px_grey] text-4xl top-[45%] left-2 text-black rounded-full absolute'>
        <MdKeyboardArrowLeft/>
      </button>
  
      <button onClick={handleRightScroll} className='bg-white shadow-[0px_0px_10px_grey] text-4xl top-[45%] right-2 text-black rounded-full absolute'>
        <MdOutlineKeyboardArrowRight/>
      </button>
        </div>:<Loading />
      }
    </div>

</> 
  )
}

export default Projects