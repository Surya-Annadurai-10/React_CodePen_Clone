import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addProjects, addUserData, loggedIn } from "../slices/slice";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FaChevronDown, FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { FaPencilAlt } from "react-icons/fa";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { variantsObj } from "./Projects";
import { FaCheck } from "react-icons/fa6";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast, ToastContainer } from "react-toastify";


const PenEditor = () => {
  const { id } = useParams();
  // const location  = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [result, setResult] = useState("");
  const stateIsLoggedIn = useSelector((state) => state.codepenData.isLoggedIn);
  const stateUserData = useSelector((state) => state.codepenData.userData);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const editRef = useRef(null);
  const [projectTitle, setProjectTitle] = useState("Untitled");

  useEffect(() => {
    if (isEditTitle) {
      editRef.current.select();
      console.log("focussed");
    }
  }, [isEditTitle]);

  useEffect(() => {
    let output = `
    <html>
    <style>${css}</style>
    <body>${html}</body>
    <script>${js}</script>
    </html>`;

    setResult(output);
  }, [html, js, css]);

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
  // console.log("params", id);
  // console.log("location", location);


  const handleSave = async() =>{
    const date = Date.now();
    const projectDetails = {
      id : `${date}`,
      html : html,
      css : css,
      js : js,
      result : result,
      userData : stateUserData,
      title : projectTitle
    }


    try {
      await setDoc(doc(firestore , "projects" , projectDetails.id) , projectDetails)
        toast.success("Project Saved !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }

        )
      
        dispatch(addProjects(projectDetails))
        console.log("projectDetails" ,  projectDetails);
        
    } catch (error) {
       toast.error("Trouble in saving 😕!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        console.log("error" , error);
        
    }

    console.log("projectDetails" , projectDetails);
    
  }

  return (
    <>
    <ToastContainer />
      <div className="w-full h-screen overflow-hidden">
        <header className="w-full relative flex justify-between items-center h-[9vh] px-3 bg-[#000000] border-b-1 border-[#424242]">
          {/* left */}
          
          <motion.div
            variants={variantsObj}
            initial="hidden"
            animate="visible"
            className="flex text-white justify-center h-full  items-center gap-3"
          >
            <Link to={"/home/trending"}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="overflow-hidden rounded-full"
              >
                <motion.img
                  className="w-[35px]"
                  src="https://cdn.pixabay.com/photo/2022/03/15/18/13/code-7070894__480.png"
                  alt=""
                />
              </motion.div>
            </Link>
            <div>
              <div className="flex justify-start items-center gap-2">
               <AnimatePresence>
               {isEditTitle ? (
                  <motion.div className="flex items-center justify-center">
                    <input
                      ref={editRef}
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="bg-[#040404] caret-amber-50 outline-0 text-white"
                      type="text"
                    />
                    <FaCheck
                      onClick={() => {
                        setIsEditTitle(false);
                      }}
                      className="text-emerald-500 text-xl"
                    />
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">{projectTitle}</h2>
                    <FaPencilAlt
                      onClick={() => {
                        setIsEditTitle(true);
                      }}
                    />
                  </>
                )}
               </AnimatePresence>
              </div>
              <div>
                <p className="text-[11px] text-[#8d8d8d]">Surya Annadurai</p>
              </div>
            </div>
          </motion.div>
          {/* right */}
          <motion.div
            variants={variantsObj}
            initial="hidden"
            animate="visible"
            className="text-white flex items-center gap-3"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className="w-24 h-11 text-black hover:bg-emerald-700 bg-emerald-500 rounded"
            >
              Save
            </motion.button>
            <div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="overflow-hidden rounded-full"
              >
                <motion.img
                  whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
                  className="w-[50px] rounded-full object-cover "
                  src={
                    stateUserData.photoURL
                      ? stateUserData.photoURL
                      : "https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0&h=180"
                  }
                  alt=""
                />
              </motion.div>
            </div>
          </motion.div>
          {/* <div>
            <h1 className="text-white">right</h1>
          </div> */}
        </header>
        <motion.section
          variants={variantsObj}
          initial="hidden"
          animate="visible"
          className="w-full h-[91vh] "
        >
          <PanelGroup direction="vertical" className="bg-black">
            <Panel defaultSize={50} minSize={5} maxSize={90}>
              <PanelGroup direction="horizontal">
                <Panel minSize={5} defaultSize={34}>
                  <div>
                    <header className="text-[#9DAEBC]">
                      <div className="flex justify-between items-center mr-2">
                        <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
                          <FaHtml5 className="text-2xl text-red-500" />
                          <h3>HTML</h3>
                        </div>
                        <motion.div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
                          <IoMdSettings />
                          <FaChevronDown />
                        </motion.div>
                      </div>
                    </header>
                    <section className="w-full px-2">
                      <CodeMirror
                        value={html}
                        height="350px"
                        className="w-full h-full"
                        extensions={[javascript({ jsx: true })]}
                        theme={"dark"}
                        onChange={(value, viewUpdate) => setHtml(value)}
                      />
                    </section>
                  </div>
                </Panel>
                <PanelResizeHandle className="handle" />
                <Panel minSize={5} defaultSize={33}>
                  <div>
                    <header className="text-[#9DAEBC]">
                      <div className="flex justify-between items-center mr-2">
                        <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
                          <FaCss3 className="text-sky-500 text-2xl" />
                          <h3>CSS</h3>
                        </div>
                        <div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
                          <IoMdSettings />
                          <FaChevronDown />
                        </div>
                      </div>
                    </header>
                    <section className="w-full px-2">
                      <CodeMirror
                        value={css}
                        height="350px"
                        className="w-full h-full"
                        extensions={[javascript({ jsx: true })]}
                        theme={"dark"}
                        onChange={(value, viewUpdate) => setCss(value)}
                      />
                    </section>
                  </div>
                </Panel>
                <PanelResizeHandle className="handle" />

                <Panel minSize={5} defaultSize={33}>
                  <div>
                    <header className="text-[#9DAEBC]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
                          <FaJsSquare className="text-yellow-300 text-2xl" />
                          <h3>JS</h3>
                        </div>
                        <div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
                          <IoMdSettings />
                          <FaChevronDown />
                        </div>
                      </div>
                    </header>
                    <section className="w-full px-2">
                      <CodeMirror
                        value={js}
                        height="350px"
                        className="w-full h-full"
                        extensions={[javascript({ jsx: true })]}
                        theme={"dark"}
                        onChange={(value, viewUpdate) => setJs(value)}
                      />
                    </section>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle className=".hor_handle" />
            <Panel defaultSize={50} minSize={5} maxSize={90}>
              <div className="bg-[white] overflow-hidden h-full w-full">
                <iframe
                  srcDoc={result}
                  title="result"
                  style={{ border: "none", width: "100%", height: "100%" }}
                ></iframe>
              </div>
            </Panel>
          </PanelGroup>
        </motion.section>
      </div>
    </>
  );
};

export default PenEditor;
