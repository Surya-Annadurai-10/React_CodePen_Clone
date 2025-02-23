import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Header = () => {
  // const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn)
  const stateIsLoggedIn = useSelector((state) => state.codepenData.isLoggedIn);
  const stateUserData = useSelector((state) => state.codepenData.userData);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (stateIsLoggedIn) {
      toast.success("Login Successful !", {
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
  }, [stateIsLoggedIn]);

  const handleLogOutOptions = () => {
    setShowOptions(true);
    console.log("signout");
  };

  const handleSignOut = async (e) => {
    e.stopPropagation();
    try {
      await auth.signOut();
      dispatch(LoggedOut(false));
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

  // console.log(stateUserData.photoURL);

  return (
    <div className=" relative flex justify-between px-10 items-center w-full h-[9vh] bg-[#000000]">
      {/* <ToastContainer /> */}
      <motion.div
        variants={variantsObj}
        initial="hidden"
        animate="visible"
        className="text-[#868CA0] flex items-center gap-2 justify-center text-xl  bg-[#252830]  w-[300px] h-[6vh] rounded"
      >
        <FiSearch className="text-2xl" />
        <input
          type="text"
          className="text-[#868CA0] w-[85%]  outline-0 border-0 rounded placeholder:text-[#868CA0] h-full"
          placeholder="Search..."
        />
      </motion.div>
      {stateIsLoggedIn ? (
        <div className="relative flex items-center justify-center gap-3">
          <div>
            <img
              className="w-[40px] rounded-md object-cover "
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
                className="bg-[#ffffff00] fixed top-0 left-0  bottom-0 right-0 "
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
        </div>
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
  );
};

export default Header;
