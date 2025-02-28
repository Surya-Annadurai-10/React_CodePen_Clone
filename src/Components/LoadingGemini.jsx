import React from 'react'
import { motion } from 'motion/react'
import { Skeleton } from '@mui/material'

const LoadingGemini = () => {

    const skeletonStyle = {
        background: "linear-gradient(to right, #4285f4,#242424, #4285f4);"

      };
  return (
    <div className='w-[100%] flex gap-3 h-[100%] 
    '>
         <div 
     id="gemini"
      className=" w-[40px]  h-[40px]  transition-all  hover:bg-[#ffffff] rounded-full relative">
         <motion.img
          animate={{
             rotate : 360,
            
          }}
          transition={{
            duration:2,
             repeat:Infinity,
             ease : "linear"
          }}

          
         className="w-[100%] image "  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="" />
         <p id="ask" className="bg-white ask  absolute w-[50px] text-center rounded top-[140%] ">Ask  AI </p>
      
      </div>
     
      <div className="loading-indicator">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div> 
        <div className="loading-bar"></div>
      </div>
   
    </div>
  )
}

export default LoadingGemini