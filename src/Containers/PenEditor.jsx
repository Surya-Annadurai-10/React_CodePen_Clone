import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addUserData, loggedIn } from "../slices/slice";
import SplitPane, { Pane } from "react-split-pane";

const PenEditor = () => {
  const { id } = useParams();
  // const location  = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      dispatch(loggedIn(true));
      dispatch(addUserData(user));
    } else {
      dispatch(loggedIn(false));
      navigate("/home/trending");
    }
  }, []);
  console.log("params", id);
  console.log("location", location);

  return (
    <>
   <header className="w-full h-[10vh] bg-[#010101]">
    <div> 
      <div>
        <img src="" alt="" />
      </div>
      <div>

      </div>
    </div>
    <div></div>
   </header>
<div className="w-full h-[90vh] bg-[#0f0f0f] overflow-hidden">
<div className=" w-full h-[full]]  overflow-hidden">
        <SplitPane 
        split="horizontal"
        minSize={"50%"}
        defaultSize={"50%"}
        >
        <SplitPane  split="vertical" defaultSize={"70%"} minSize={500}>
           <SplitPane defaultSize={"50%"}>
           <div>
            <h1 className="text-white">html</h1>
           </div>
           <div>
            <h1 className="text-white">css</h1>
           </div>
           </SplitPane>
           <div>
            <h1 className="text-white">js</h1>
           </div>
        </SplitPane>
           
        </SplitPane>
      </div>
</div>

    </>
  );
};

export default PenEditor;
