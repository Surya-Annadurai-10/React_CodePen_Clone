import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addUserData, loggedIn } from "../slices/slice";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FaChevronDown, FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const PenEditor = () => {
  const { id } = useParams();
  // const location  = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [result, setResult] = useState("");

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
  console.log("params", id);
  console.log("location", location);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <header className="w-full h-[10vh] bg-[#000000]"></header>
        <section className="w-full h-[90vh] ">
          <PanelGroup direction="vertical" className="bg-black">
            <Panel defaultSize={50} minSize={5} maxSize={90}>
              <PanelGroup direction="horizontal">
                <Panel minSize={5} defaultSize={34}>
                  <div>
                    <header className="text-[#9DAEBC]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
                          <FaHtml5 className="text-2xl text-red-500" />
                          <h3>HTML</h3>
                        </div>
                        <div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
                          <IoMdSettings />
                          <FaChevronDown />
                        </div>
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
                      <div className="flex justify-between items-center">
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
                        onChange={(value , viewUpdate) => setJs(value)}
                      />

                  </section>
              </div>
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle className=".hor_handle" />
            <Panel  defaultSize={50} minSize={5} maxSize={90}>
            <div className="bg-[white] overflow-hidden h-full w-full">
               <iframe srcDoc={result} title="result" style={{border:"none" , width:"100%" , height:"100%"}}  ></iframe>
               </div>

            </Panel>
          </PanelGroup>
        </section>
      </div>
    </>

    // <>

    //  <div className="w-full h-[90vh] relative">
    //  <div className="w-full h-[80%] bg-[#0f0f0f] overflow-hidden">
    //     <div className=" w-full h-[full]]  overflow-hidden">
    //       <SplitPane split="horizontal" maxSize={"50%"}  minSize={"50%"} defaultSize={"60%"}>
    //         <div>
    //         <SplitPane split="vertical" defaultSize={"70%"} minSize={500}>
    //           <SplitPane defaultSize={"50%"}>
    //             <div>
    //               <header className="text-[#9DAEBC]">
    //                 <div className="flex justify-between items-center">
    //                   <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
    //                     <FaHtml5 className="text-2xl text-red-500" />
    //                     <h3>HTML</h3>
    //                   </div>
    //                   <div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
    //                     <IoMdSettings />
    //                     <FaChevronDown />
    //                   </div>
    //                 </div>
    //               </header>
    //               <section className="w-full px-2">

    //                   <CodeMirror
    //                     value={html}
    //                    height="350px"
    //                     className="w-full h-full"
    //                     extensions={[javascript({ jsx: true })]}
    //                     theme={"dark"}
    //                     onChange={(value , viewUpdate) => setHtml(value)}
    //                   />

    //               </section>
    //             </div>
    //             <div>
    //               <header className="text-[#9DAEBC]">
    //                 <div className="flex justify-between items-center">
    //                   <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
    //                     <FaCss3 className="text-sky-500 text-2xl" />
    //                     <h3>CSS</h3>
    //                   </div>
    //                   <div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
    //                     <IoMdSettings />
    //                     <FaChevronDown />
    //                   </div>
    //                 </div>
    //               </header>
    //               <section className="w-full px-2">

    //                   <CodeMirror
    //                     value={css}
    //                    height="350px"
    //                     className="w-full h-full"
    //                     extensions={[javascript({ jsx: true })]}
    //                     theme={"dark"}
    //                     onChange={(value , viewUpdate) => setCss(value)}
    //                   />

    //               </section>
    //             </div>
    //           </SplitPane>
    //           <div>
    //             <header className="text-[#9DAEBC]">
    //               <div className="flex justify-between items-center">
    //                 <div className="flex items-center gap-1 w-[fit-content] bg-[#1D1E22] border-t-3 border-t-[#34363E] p-2">
    //                   <FaJsSquare className="text-yellow-300 text-2xl" />
    //                   <h3>JS</h3>
    //                 </div>
    //                 <div className="flex bg-[#1D1E22] gap-2 items-center border-t-[#34363E] border-t-3  py-3 p-2">
    //                   <IoMdSettings />
    //                   <FaChevronDown />
    //                 </div>
    //               </div>
    //             </header>
    //             <section className="w-full px-2">

    //                   <CodeMirror
    //                     value={js}
    //                    height="350px"
    //                     className="w-full h-full"
    //                     extensions={[javascript({ jsx: true })]}
    //                     theme={"dark"}
    //                     onChange={(value , viewUpdate) => setJs(value)}
    //                   />

    //               </section>
    //           </div>
    //         </SplitPane>
    //         </div>
    //         {/* wepage */}

    //           <div className="bg-[white] overflow-hidden h-full w-full">
    //             <iframe srcDoc={result} title="result" style={{border:"none" , width:"10%" , height:"100%"}}  frameborder="0"></iframe>
    //           </div>

    //       </SplitPane>
    //     </div>
    //   </div>
    //  </div>
    // </>
  );
};

export default PenEditor;
