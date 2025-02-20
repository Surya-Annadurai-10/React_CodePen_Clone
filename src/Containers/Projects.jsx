import React from 'react'
import hero from "../assets/hero.png"
import {easeInOut, motion, stagger} from "motion/react"

const Projects = () => {

  const variantsObj = {
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

  return (
    <div className='bg-[#131417] w-full py-6  h-[91%] text-white'>
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
           <button className='w-[150px] hover:shadow-[0px_0px_10px_green] my-3 h-[45px] rounded bg-emerald-500 hover:bg-emerald-700'>Sign Up for Free</button>
       </motion.div>
       <div className='w-[50%]'>
             <motion.img  variants={variantsObj}
             initial="hidden"
             animate="visible"
             src={hero} alt="" />
       </div>
       </div>
    </div>
  )
}

export default Projects