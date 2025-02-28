import React, { useContext, useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { GiInspiration } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import {motion} from "motion/react"
import { variantsObj } from "../Containers/Projects";
import SignUpPopUp from "./SignUpPopUp";
import { DataContext } from "../App";
import { useSelector } from "react-redux";

const SideBar = () => {
  
 const ctx = useContext(DataContext);
//  console.log(ctx);
 
  return (
<>

<div className={`bg-[#1E1F26] ${ctx.isSideBarOpen ?"w-[15%]" : "w-[2%] " } h-[100vh] relative transition duration-300 ease-in-out  `}>
     <div className={`${ctx.isSideBarOpen ? "block" : "hidden"}`}>
      <div className="w-full grid place-items-center py-[1rem] h-[60px] ">
        <motion.img
        variants={variantsObj}
        initial="hidden"
        animate="visible"
          className="w-[180px]"
          src="https://assets.codepen.io/t-1/codepen-wordmark-white.png"
          alt=""
        />
      </div>
      <motion.div 
       variants={variantsObj}
       initial="hidden"
       animate="visible"
      className="flex h-[15vh] flex-col gap-2 items-center justify-center">
        <code className="text-[grey] ">Try our online Editor</code>

       <Link to={"/pen/new_project"}
          style={{
            background:
              "linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b)",
          }}
          className="w-[156px]  rounded h-[55px] mt-[1rem ]  grid place-items-center  "
        >
          <button className="w-[150px] text-white bg-black rounded h-[50px] ">
            Start Coding
          </button>
        </Link>
      </motion.div>

    <motion.div 
     variants={variantsObj}
     initial="hidden"
     animate="visible"
    className="w-full grid place-items-center h-[13vh]">
    <div className="text-[#8f8f8f] w-[60%]   flex flex-col gap-5  ">
        <Link to={"/home/trending"} className=" w-full flex items-center justify-start gap-3 hover:text-white cursor-pointer">
          <MdHomeFilled className="text-xl" />
          <p  className="text-[1rem]"> Home</p>
        </Link>
        <Link to={"/your_projects"}    className=" w-full flex items-center justify-start gap-3  hover:text-white cursor-pointer ">
         
        
          <GrProjects className="text-xl" />
          <p className="text-[1rem]">Your Projects</p>
        </Link>
        {/* <Link to={"/home/"}  className=" w-full flex items-center  justify-start gap-3   hover:text-white cursor-pointer">
          <GiInspiration  className="text-xl" />
          <p className="text-[1rem]">Inspirations</p>
        </Link> */}
      </div>
    </motion.div>

  
    </div>
    <div
    onClick={()=> ctx.setIsSideBarOpen(!ctx.isSideBarOpen)}
    
    className="absolute top-1 hover:bg-[#292b34] z-10 -right-6 bg-[#1E1F26] w-[30px] h-[30px] grid place-items-center rounded-xl">
    {ctx.isSideBarOpen ? <FaAnglesLeft className="text-[#d8d8d8] " /> :
     <FaAnglesRight  className="text-[#d8d8d8] "/>}
    </div>
 </div>
</>
  );
};

export default SideBar;
