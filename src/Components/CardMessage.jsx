import React from 'react'
import { FaRegMessage } from 'react-icons/fa6'

const MessageCard = (props) => {
  return (
    <div className='w-[100%]'  onClick={() => console.log("hi")}>

        
        <div
         key={props.i}
         className="bg-[#4646468a] mb-4 p-2 rounded-md text-[#ababab] w-[100%]   z-10 flex items-center justify-start gap-2"
        
         >
           <div >
           <FaRegMessage  />
           </div>
            <span className="md:text-sm line-clamp-1">{props.ele}</span>
         </div>
    </div>
  )
}

export default MessageCard