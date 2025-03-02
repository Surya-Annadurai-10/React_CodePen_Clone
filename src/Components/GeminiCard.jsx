import React from 'react'
import { useSelector } from 'react-redux'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";

const GeminiCard = (props) => {
const stateUserData = useSelector(state => state.codepenData.userData);

  return (
   <div className='my-10'>
              <div className="flex mb-5 items-start justify-start gap-4">
                <div className='md:w-[fit-content]  '>
                  <img
                    className="lg:w-[40px] w-[30px] md:w-[35px] rounded-full object-cover "
                    src={
                      stateUserData.photoURL
                        ? stateUserData.photoURL
                        : "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"
                    }
                    alt=""
                  />
                </div>
                <div className='w-[90%]'>
                  <h1 className='md:text-[13px] font-bold capitalize'>{props.question}</h1>
                </div>
              </div>
          

              <div className="w-[100%] flex gap-2  items-start">
               <div className="lg:w-[8%] w-[14%] md:w-[6%]">
               <img
                  className="lg:w-[40px] w-[25px] md:w-[28px] image "
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                  alt=""
                />
               </div>
                <div className="lg:w-[92%] w-[86%] md:w-[94%] md:text-[13px]" dangerouslySetInnerHTML={{__html:props.answer}}></div>

                {/* <ReactMarkdown      >{text}</ReactMarkdown> */}
              </div>
            <div className='flex items-center justify-start lg:ml-15 md:ml-6 mt-5 lg:gap-4 md:gap-4 text-4xl'>
            <BiLike className='cursor-pointer hover:bg-[white] hover:text-black rounded-full  p-2 md:p-2 lg:p-1.5' />
            <BiDislike  className='cursor-pointer hover:bg-[white] hover:text-black rounded-full p-2 md:p-2 lg:p-1.5'/>
            <IoShareSocialSharp className='cursor-pointer hover:bg-[white] hover:text-black rounded-full p-2 md:p-2 lg:p-1.5' />
            <TbReload  className='cursor-pointer hover:bg-[white] hover:text-black rounded-full p-2 md:p-2 lg:p-2'/>
            <IoMdMore  className='cursor- hover:bg-[white] hover:text-black rounded-full p-2 md:p-2 lg:p-1.5'/>
            </div>
              </div>
     
  )
}

export default GeminiCard