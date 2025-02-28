import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPushPin } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteFromPinned, deleteProject, pinProject, UnpinProject } from "../slices/slice";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { firestore } from "../firebase";
import { RiUnpinFill } from "react-icons/ri";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

const ProjectCard = (props) => {
  const stateIsLoggedIn = useSelector((state) => state.codepenData.isLoggedIn);
  const stateUserData = useSelector((state) => state.codepenData.userData);
  const stateProjects = useSelector(state => state.codepenData.projects);
  const statePinned = useSelector(state => state.codepenData.pinned);
  const stateTrending = useSelector(state => state.codepenData.trending);
  const dispatch = useDispatch();
  const ctx = useContext(DataContext);
  const navigate = useNavigate();
  // console.log("props",props);
  

  const handleProject =(id) =>{
    console.log("id",id);
    
  }

  const handleDelete = async(id , e)=>{
 try {
    e.stopPropagation();
    console.log("id",id);
    const index = stateProjects.findIndex(ele => ele.id == id);
    console.log((index));

    
    dispatch(deleteProject(index));
   await deleteDoc(doc(firestore,"projects" , id));
 } catch (error) {
    
 }
  }

  const handleDeleteFromPinned = async(id,e) =>{
  try {
    e.stopPropagation();
     console.log("id",id);
    const index = statePinned.findIndex(ele => ele.id == id);
    const findValue = statePinned.find(ele => ele.id == id);
    console.log(index );
    console.log(findValue);
   dispatch(deleteFromPinned(index))
  // await setDoc(doc(firestore , "projects" , id) ,findValue )
  await deleteDoc(doc(firestore,"pinned" , id));
  toast("Deleted From Pinned Successfuly !" , {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
})
  } catch (error) {
    console.log("error in  Unpinning" , error);

    toast("Trouble in Deleteing from Pinning!" , {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
 })
  }

  }

  const handlePin = async(id , e)=>{
   try {
    e.stopPropagation();
    console.log("id",id);
    const index = stateProjects.findIndex(ele => ele.id == id);
    const findValue = stateProjects.find(ele => ele.id == id);
    console.log(index +"");
    console.log(findValue);

    dispatch(pinProject(id));
    await setDoc(doc(firestore , "pinned" , id) ,findValue )
    await deleteDoc(doc(firestore,"projects" , id));

    toast("Pinned Successfuly !" , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
   } catch (error) {
    console.log("error in  pinning" , error);

       toast("Trouble in Pinning!" , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
   }
  }


  const handleProjectBoxClick = (id) =>{
    console.log("Trending Id : " , id)

    const findedData = stateTrending.find(ele => ele.id == id);
    const findedProjectData = stateProjects.find(ele => ele.id == id);
    const value = findedData || findedProjectData
    ctx.setClickedData(value);
    console.log(value);
    navigate(`/pen/id=${id}`);
  }

const handleUnPin = async(id,e) =>{
  try {
    const findValue = statePinned.find(ele => ele.id == id);
  e.stopPropagation();
  console.log("id" , id);
  dispatch(UnpinProject(id));
  await setDoc(doc(firestore , "projects" , id) ,findValue )
  await deleteDoc(doc(firestore,"pinned" , id));
  toast("UnPinned Successfuly !" , {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
})
  } catch (error) {
    toast("Trouble in UnPinning!" , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  })
  }
  
}

  return (
   <>
  <div onClick={() => handleProjectBoxClick(props.id)} className=" cursor-pointer relative">
  <ToastContainer />
   <div onClick={() => handleProject(props.id)} className={`w-[330px] h-[330px] flex flex-col items-start hoverPin justify-center gap-2 ${props.background ?`bg-[#27273c] ` :`bg-[#1E1F26]`} p-4 rounded-md`}>
      <div className="bg-[white]   h-[85%] w-full rounded-md">
        <iframe
          srcDoc={props.result}
          title="result"
          style={{ border: "none", width: "100%", height: "100%" }}
        ></iframe>
      </div>
      <div className="flex  items-center w-full h-[16%] pt-2 justify-between ">
       <div className="flex justify-start items-center gap-3">
       <div>
        {
          !props.trending ? 
          <>
          <div>
                <img
                  className="w-[40px] rounded-xl object-cover "
                  src={
                    props.userData.photoURL
                      ?   props.userData.photoURL
                      : "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"
                  }
                  alt=""
                />
              </div>
          </>
          :<>
            {stateIsLoggedIn ? (
            <div>
              <div>
                <img
                  className="w-[40px] rounded-xl object-cover "
                  src={
                    stateUserData.photoURL
                      ? stateUserData.photoURL
                      : "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"
                  }
                  alt=""
                />
              </div>
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
          </>
        }
        </div>
        <div>
            {
                props.title ? <h3 className="font-bold  text-ellipsis line-clamp-1 text-[14px]">{props.title}</h3> : <h1 className=" font-bold">Untitled</h1>
            }
            <h3 className="text-[grey] text-[11px]">{props.userData.displayName}</h3>
        </div>
       </div>
      {
        props.trending ?  <div className="flex items-center w-[30%] justify-center ">
        {
          props.pinned ?  <RiDeleteBin6Line onClick={(e) => handleDeleteFromPinned(props.id , e)}  className="text-4xl p-2  pin rounded-full hover:bg-[#ffffff] hover:text-black cursor-pointer" />
     :        <RiDeleteBin6Line onClick={(e) => handleDelete(props.id , e)}  className="text-4xl p-2  pin rounded-full hover:bg-[#ffffff] hover:text-black cursor-pointer" />
 
        }      
        {
 
         props.pinned? <RiUnpinFill onClick={(e) => handleUnPin(props.id,e)} className="text-4xl p-2 rounded-full hover:bg-[#ffffff] hover:text-black cursor-pointer`" /> :   <MdPushPin onClick={(e) => handlePin(props.id,e)} className={`text-4xl p-2 pin rounded-full hover:bg-[#ffffff] hover:text-black cursor-pointer`} />
       }
        </div> : null
      }
      </div>
    </div>
  </div>
   </>
  );
};

export default ProjectCard;
