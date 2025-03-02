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
import { Typewriter } from 'react-simple-typewriter'


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
     <motion.div
     variants={variantsObj}
     initial="hidden"
     animate="visible"
     className='w-[100%] lg:hidden h-[50px] grid place-items-center'>
      <img className='w-[170px]' src="https://assets.codepen.io/t-1/codepen-wordmark-white.png" alt="" />
     </motion.div>
       <div className='w-[77%] flex-col-reverse flex    gap-3  m-auto lg:flex lg:flex-row items-center justify-between '>
       <motion.div
       variants ={variantsObj}
        initial ="hidden"
           animate="visible"
           transition={{
         delayChildren : 0.5
           }}
       className='lg:w-[48%]  md:w-[100%] md:mb-5  flex flex-col gap-4 ' >
           <div  className='flex h-[30%] lg:gap-5 gap-2 py-2 items-start'>
            <div className='w-[10%]'>
              <img className='lg:w-[100px] lg:block hidden' src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png" alt="" />
            </div>
            <div className=' lg:h-[140px] md:h-[80px] w-[90%]'>
              <h1 className='lg:text-4xl lg:text-left text-center text-3xl leading-snug font-bold'>The best place to
              <span className='colorized_2' >
                  
              <Typewriter
                            words={[` build, test, and discover front-end code.`]}
                            loop={0}
                            cursor ={true}
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                          
                            
                          />
              </span>
                </h1>
            </div>
           </div>
          <div className='h-[70%]'>
          <p  className='leading-relaxed lg:text-left text-center'>CodePen is a <strong>social development</strong> environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.</p>
          </div>
        {
          stateIsLoggedIn ? null :   <motion.button whileTap={{scale:0.9}} className='w-[fit-content]'>
          <Link to="/home/authentication" className='grid place-items-center w-[150px] hover:shadow-[0px_0px_10px_green] my-3 h-[45px] rounded bg-emerald-500 hover:bg-emerald-700'>Sign Up for Free</Link>
          </motion.button>
        }
       </motion.div>
       <div className='lg:w-[50%] w-[100%]'>
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
        <div ref={containerRef} className=' trending lg:flex-row flex-col md:flex-row flex  w-full items-center  justify-start gap-6  overflow-x-scroll scroll-smooth'>
          {
            // trending w-full flex items-center  justify-start gap-2  overflow-x-scroll scroll-smooth 
           stateTrending.map((ele,i) =>{
            return <ProjectCard key={ele.id} {...ele} trending={false} />
            // return <div key={i} className='text-black'>hellow</div>
           })
          }
      </div>
      <button onClick={handleLeftScroll} className='bg-white shadow-[0px_0px_10px_grey] hidden lg:block md:block text-4xl top-[45%] left-2 text-black rounded-full absolute'>
        <MdKeyboardArrowLeft/>
      </button>
  
      <button onClick={handleRightScroll} className='bg-white shadow-[0px_0px_10px_grey] hidden lg:block md:block text-4xl top-[45%] right-2 text-black rounded-full absolute'>
        <MdOutlineKeyboardArrowRight/>
      </button>
        </div>:<Loading />
      }
    </div>

</> 
  )
}

export default Projects