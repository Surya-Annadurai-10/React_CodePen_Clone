import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AnimatePresence, motion } from "motion/react";
import { variantsObj } from "../Containers/Projects";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutData } from "../data/logout";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { LoggedOut } from "../slices/slice";
import { IoIosArrowDown } from "react-icons/io";
import { RiLayoutGridFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { DataContext } from "../App";
import { RiMenu3Line } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { GrProjects } from "react-icons/gr";

const Header = () => {
  // const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn)
  const stateIsLoggedIn = useSelector((state) => state.codepenData.isLoggedIn);
  const stateUserData = useSelector((state) => state.codepenData.userData);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearchOptions , setShowSearchOptions] = useState(false);
  const ctx = useContext(DataContext);
  const {pathname} = useLocation();
  const [showSmallOptions , setShowSmallOptions] = useState(false);
 

  const handleLogOutOptions = () => {
    setShowOptions(true);
    console.log("signout");
  };

  const handleSignOut = async (e) => {
    e.stopPropagation();
    try {
      await auth.signOut();
      dispatch(LoggedOut({
        loggedIn : false,
        userdata : {},
        project : [],
        pinned : []
      }));
      localStorage.clear();
      navigate("/home/authentication");
    } catch (error) {
      console.log("error", error);
      toast.error("Trouble in SignOut", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShowOptions(false);
  };

  const handleSearchOptionClick = () =>{
    navigate("/your_projects")
    setShowSearchOptions(false)
  }

  const handleShowSearchCategory =() =>{
    console.log(pathname)
    setShowSearchOptions(!showSearchOptions)
  }
 

  // console.log(stateUserData.photoURL);

  return (
    <div className=" relative flex justify-between px-4 md:px-8 lg:px-10 items-center w-full h-[9vh] bg-[#000000]">
      <motion.div
        variants={variantsObj}
        initial="hidden"
        animate="visible"
      className="flex items-center justify-start gap-3">
      <div 
      onClick={()  => setShowSmallOptions(!showSmallOptions)}
      className="lg:hidden md:hidden relative bg-[#414040] py-1 rounded flex items-center justify-center">
      <RiMenu3Line  className="text-white  text-2xl"/>
      <MdKeyboardArrowUp className="text-white  text-2xl"/>

      <AnimatePresence>
        {
          showSmallOptions ? <motion.div
          initial={{y:-30 , opacity:0}}
          animate={{y:0 , opacity:1}}
          exit={{opacity:0 , y:30}}
          className="absolute top-[150%] rounded-xl left-0 w-[200px] h-[200px] z-[5] bg-[#1E1F26]">
          <motion.div 
        
          className="flex h-[15vh] flex-col gap-2 items-center justify-center">
            <code className="text-[grey] text-[13px] ">Try our online Editor</code>
  
          <Link to={"/pen/new_project"}
              style={{
                background:
                  "linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b)",
              }}
              className="lg:w-[156px] w-[156px] h-[50px]  rounded lg:h-[55px] mt-[1rem ]  grid place-items-center  "
            >
              <button className="lg:w-[150px] w-[150px] text-white text-[13px] bg-black hover:bg-[#252525] rounded h-[45px] lg:h-[50px] ">
                Start Coding
              </button>
            </Link>
  
  
          </motion.div>
  
            <motion.div 
            
              className="w-full grid place-items-center h-[13vh]">
              <div className="text-[#8f8f8f] lg:w-[60%]  w-[80%]  flex flex-col gap-5  ">
                  <Link to={"/home/trending"} className=" w-full flex items-center justify-start gap-3 hover:text-white cursor-pointer">
                    <MdHomeFilled className="text-[18px] lg:text-xl" />
                    <p  className=" text-[13px] lg:text-[1rem]"> Home</p>
                  </Link>
                  <Link to={"/your_projects"}    className=" w-full flex items-center justify-start gap-3  hover:text-white cursor-pointer ">
                  
                  
                    <GrProjects className="text-[15px] lg:text-xl" />
                    <p className=" text-[13px] lg:text-[1rem]">Your Projects</p>
                  </Link>
                  {/* <Link to={"/home/"}  className=" w-full flex items-center  justify-start gap-3   hover:text-white cursor-pointer">
                    <GiInspiration  className="text-xl" />
                    <p className="text-[1rem]">Inspirations</p>
                  </Link> */}
                </div>
              </motion.div>
          </motion.div> : null
        }
      </AnimatePresence>
      </div>
      {/* <ToastContainer /> */}
      <motion.div
        variants={variantsObj}
        initial="hidden"
        animate="visible"
        className="text-[#868CA0] relative flex items-center gap-2 justify-center text-xl  bg-[#252830] md:w-[250px] w-[150px]  lg:w-[300px] h-[6vh] rounded"
      >
        <FiSearch className="text-xl lg:text-2xl" />
        <input
        onFocus={handleShowSearchCategory}
        value={ctx.searchValue}
        onChange={(e) => ctx.setSearchValue(e.target.value) }
          type="text"
          
          className="text-[#868CA0] md:w-[83%] w-[70%] lg:w-[85%] text-[14px] lg:text-[16px]  outline-0 border-0 rounded placeholder:text-[#868CA0] h-full"
          placeholder="Search..."
        />
        {
          showSearchOptions ? <motion.div  
          variants={variantsObj}
          initial="hidden"
          animate={{opacity:1,y:0}}
          transition={{duration:0.3}}
          className="flex items-center z-40 justify-start px-3 py-2 gap-2 w-[100%] bg-[#1b1c20] shadow-[0px_0px_10px_black]  absolute top-[105%] left-20%">
            
            <motion.div
            onClick={handleSearchOptionClick}
            whileTap={{scale:0.9}}
            className="flex cursor-pointer text-white px-2 py-1 items-center rounded bg-[#3d4259] justify-start gap-1">
            <RiLayoutGridFill className="text-[13px]" />
            <p className="text-[11px]">Projects</p>
            </motion.div>

            <MdCancel
            onClick={()=>setShowSearchOptions(false)}
            className="absolute left-[100%] cursor-pointer" />
          </motion.div> : null
        }
      </motion.div>
      </motion.div>
    <div className="flex items-center justify-center gap-2 md:gap-8 lg:gap-10">
      <motion.div 
         initial={{
          y:-20,
          opacity: 0
        }}

        animate ={{
          y:0,
          opacity:1,
          transition:{
            duration : 1,
            ease:"easeInOut"
          }
        }}
     id="gemini"
      className=" md:w-[35px] w-[30px] lg:w-[40px] lg:h-[40px]  transition-all  hover:bg-[#ffffff] rounded-full relative">
         <motion.img
          animate={{
             rotate : 360,
             
          }}
          transition={{
            duration:2,
             repeat:Infinity,
             ease : "linear",
             delay:1.2
          }}

          onClick={() =>navigate("/ask_ai")}
         className="w-[100%]  "  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="" />
         <p id="ask" className="bg-white ask  absolute w-[50px] z-5 text-center rounded top-[140%] ">Ask  AI </p>
      
      </motion.div>

      <div>
      {stateIsLoggedIn ? (
        <motion.div
        initial={{
          y:-20,
          opacity: 0
        }}

        animate ={{
          y:0,
          opacity:1,
          transition:{
            duration : 1,
            ease:"easeInOut"
          }
        }}
        className="relative flex items-center justify-center gap-3">
          <div>
            <img
              className="w-[40px] rounded-full object-cover "
              src={
                stateUserData.photoURL
                  ? stateUserData.photoURL
                  : "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"
              }
              alt=""
            />
          </div>
          <div
            onClick={handleLogOutOptions}
            className="w-[25px] bg-[#252830] grid place-items-center rounded h-[22px]"
          >
            <IoIosArrowDown className="text-[grey] text-xl " />
          </div>
          <AnimatePresence>
            {showOptions ? (
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions(false);
                }}
                className="bg-[#ffffff00] fixed top-0 left-0 z-[20]  bottom-0 right-0 "
              >
                <motion.div
                  initial={{
                    y: -50,
                    opacity: 0,
                    scale: 1,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,

                    y: 50,
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="text-white absolute top-[10%] py-3 right-[3%] gap-2 flex items-start justify-center flex-col  bg-[#252830]  rounded-md  w-[110px] min-h-14"
                >
                  {logoutData.map((ele, index) => {
                    return (
                      <h2
                        key={`${index}_${ele}`}
                        className="text-[#a7a7a7] px-4 cursor-pointer  w-full hover:bg-[#2f2f2f]"
                      >
                        {ele}
                      </h2>
                    );
                  })}
                  <div
                    onClick={handleSignOut}
                    className="flex  w-full hover:bg-[#2f2f2f] items-center justify-start px-4 cursor-pointer text-[#a7a7a7]"
                  >
                    <h2>SignOut</h2>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <ToastContainer />
        </motion.div>
      ) : (
        <motion.div
          variants={variantsObj}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center gap-5 "
        >
          <Link
            to={"/home/authentication"}
            className="w-[100px] grid place-items-center h-[45px] rounded bg-emerald-500 hover:bg-emerald-700"
          >
            Sign Up
          </Link>
          {/* <Link to={"/home/authentication"} className='bg-[#252830] grid place-items-center w-[100px] h-[45px] hover:bg-[#53596a] text-[#d6d6d6] rounded'>Log In</Link> */}
          <ToastContainer />
        </motion.div>
      )}
      </div>
    </div>
    </div>
  );
};

export default Header;
