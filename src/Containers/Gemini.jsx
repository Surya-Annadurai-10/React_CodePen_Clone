import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { motion } from "motion/react";
import { MdSend } from "react-icons/md";
import { useAi } from "../config/GeminiConfig";
import ReactMarkdown from "react-markdown";
import { Cursor, Typewriter, useTypewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, geminiData, loggedIn } from "../slices/slice";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import LoadingGemini from "../Components/LoadingGemini";
import { FaRegMessage } from "react-icons/fa6";
import MessageCard from "../Components/CardMessage";
import GeminiCard from "../Components/GeminiCard";
import { Input } from "@mui/material";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Gemini = () => {
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);
  const [inputArr, setInputArr] = useState([]);
  // const [initial , setIntial] = useState(false);
  const stateUserData = useSelector((state) => state.codepenData.userData);
 let userName = stateUserData.displayName
  const dispatch = useDispatch();
  const stateGemini = useSelector((state) => state.codepenData.gemini);
  const [showLoading, setShowLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [text, setText] = useState("");
  const chatContainerRef = useRef(null);
const navigate = useNavigate();
  // const [texted] = useTypewriter({
  //   words: [`Surya,`],
  //   loop: 0,
  //   typeSpeed:150,
  //   deleteSpeed:150
    
  
  // });


     useEffect(() =>{
          let user = JSON.parse(localStorage.getItem("userData"))
          if(user){
            dispatch(loggedIn(true));
            dispatch(addUserData(user))
            
          }else  {
            dispatch(loggedIn(false))
            navigate("/home/trending")
          };
        },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Date.now() + "";
        console.log("Result", result);

        const obj = {
          id: id,
          question: input,
          answer: result,
        };

        console.log("obj,", obj);
        console.log("text,", text);

        dispatch(geminiData(obj));

        await setDoc(doc(firestore, "gemini", obj.id), obj);

        setResult("");
        // alert("obj stored")
      } catch (error) {
        console.log("error:", error);
      }
    };
    if (result) {
      fetchData();
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // inputRef.current.value = "";
    setShowUserName(true);
    setInput(inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setText("");
        setTyping(true);
        setShowLoading(true);
        console.log(input);
        setInputArr([...inputArr, input]);
        const { data: answer } = await useAi(input);

        // FOR REMOVING **
        const newArray = answer.split("**");
        let newStr = "";
        for (let i = 0; i < newArray.length; i++) {
          if (i % 2 == 1) {
            newStr += "<strong>" + newArray[i] + "</strong>";
          } else {
            newStr +=
              `<p className ="text-[#6b6b6b] text-[12px]">` +
              newArray[i] +
              "</p>";
          }
        }

        // For Removing *
        const newArray2 = newStr.split("*");
        let newStr2;

        for (let i = 0; i < newArray2.length; i++) {
          if (i % 2 == 1) {
            newStr2 += newArray2[i] + "<br />";
          } else {
            newStr2 += newArray2[i];
          }
        }
        console.log("newStr2", newArray2);

        setResult(newStr);
        // For typing effect
        const newArray3 = newStr2.split(" ");

        for (let i = 0; i < newArray3.length; i++) {
          if (newArray3[i] != "undefined") {
            const newStr = newArray3[i] + " ";
            delay(i, newStr);
          }
        }

        setShowLoading(false);
        setTimeout(() => {
          setTyping(false);
        }, 50 * newArray3.length);
        console.log("answer:", answer);
      } catch (error) {
        console.log("error : ", error);
        setText(error);
      }
    };

    if (input) {
      fetchData();
    }
  }, [input]);

  useEffect(() => {
    if (!typing) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [typing]);

  useEffect(() => {
    if (chatContainerRef.current) {
      // console.log("height:", chatContainerRef.current.scrollHeight);
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [text]);

  const delay = (i, str) => {
    setTimeout(() => {
      setText((prev) => prev + str);
      // chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50 * i);
  };

  const handleClose = () =>{
    console.log("closed");
    
  }

  // const askAi = async () => {

  //   const genAI = new GoogleGenerativeAI(apiKey);
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  //   const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  // };

  return (
    <div className="w-100% relative flex items-center justify-center h-[90.5%] bg-[#131417] text-white">
      <motion.div
        animate={{
          transition: {
            ease: "easeInOut",
            duration: 1,
          },
        }}
        // onMouseEnter={() => setExpand(true)}

        className={` ${
          expand ? `lg:w-[20%] md:w-[40%] w-[50%]` : `lg:w-[6%] md:w-[6%] w-[10%]`
        } h-[100%] absolute z-[10] left-0 bg-[#1c1c23]`}
      >
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
        className="flex items-start pl-2 md:pl-2 lg:pl-6 pt-5 justify-center flex-col gap-15">
          <IoMenu
            onClick={() => setExpand(!expand)}
            className="lg:text-3xl text-xl md:text-2xl text-[grey]"
          />
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

            onClick={() => {
              inputRef.current.focus()
              setExpand(false)
            }}
            className={`flex cursor-pointer items-center justify-center gap-1  py-1 ${
              expand ? `bg-[#353535] ` : null
            } rounded-3xl`}
          >
            <MdAddCircle className="lg:text-3xl  text-xl md:text-2xl text-[#adadad]" />
            {expand ? <h1 className="md:text-sm  pr-2  text-[#b3b3b3]">New Chat</h1> : null}
          </motion.div>
        </motion.div>

        {expand ? (
          <div className="pl-6 pt-5">
            <h1 className="px-3 py-1 md:text-sm  w-[fit-content] rounded-3xl bg-[#313131] text-[#aeaeae]">
              Recent
            </h1>
            {/* <MdClear
            onClick={handleClose}
            // onClick={() => setExpand(false)}
              className="absolute bg-white rounded-full text-2xl text-black p-1  top-6 right-5"
            /> */}
            <div className="mr-4 py-3 w-[100%] pr-4  h-[60vh] overflow-y-scroll message">
              {inputArr.map((ele, i) => {
                return <MessageCard ele={ele} i={i} />;
              })}
            </div>
          </div>
        ) : null}
      </motion.div>

      <div onClick={()=> setExpand(false)} className={`relative lg:w-[94%] md:w-[94%] w-[82%]  h-[100%]`}>
        <div
          ref={chatContainerRef}
          className="lg:w-[60%] md:w-[80%] leading-7.5 text-[#d0d0d0] h-[75%] mt-12 relative   m-auto overflow-y-scroll p-5 markdown"
        >

       {
        showUserName ? null :  <div className="flex  w-[100%] h-[100%]  justify-start gap-6 flex-col ">
          <motion.span 
          initial={{
            x:100,
            opacity: 0
          }}

          animate ={{
            x:0,
            opacity:1,
            transition:{
              duration : 1,
              ease:"easeInOut"
            }
          }}
         
          className="font-bold   lg:text-4xl md:text-2xl colorized">Hello   
            <Typewriter
            words={[` ${userName},`]}
            loop={0}
            cursor ={true}
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          
            
          />
          
          </motion.span>
     
          <motion.p
             initial={{
              x:100,
              opacity: 0
            }}
  
            animate ={{
              x:0,
              opacity:1,
              transition:{
                duration : 1,
                ease:"easeInOut"
              }
            }}
           className="lg:text-5xl md:text-2xl">How Can i Help you Today !</motion.p>
        </div>
       }

          <div className="w-[100%]">
            {typing ? null : (
              <>
                {stateGemini.map((ele, i) => {
                  return <GeminiCard key={ele.id} {...ele} />;
                })}
              </>
            )}
          </div>
          {typing ? (
            <div>
              <div className="flex items-start justify-start flex-col gap-4">
                <div className="flex items-center justify-start gap-4">
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
                  <div>
                    <h1 className="font-bold capitalize">{input}</h1>
                  </div>
                </div>
                {showLoading ? (
                  <LoadingGemini />
                ) : (
                  <div className="w-[100%] flex  items-start">
                    <div className="w-[8%] ">
                      <img
                        className="lg:w-[40px] w-[30px] md:w-[35px] image "
                        src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                        alt=""
                      />
                    </div>
                    <div
                      className="w-[92%]"
                      dangerouslySetInnerHTML={{ __html: text }}
                    ></div>

                    {/* <ReactMarkdown      >{text}</ReactMarkdown> */}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <motion.form
           initial={{
            y:-50,
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
          onSubmit={handleSubmit}
          className="lg:w-[60%] md:w-[80%] w-[92%]   flex items-center justify-center absolute md:bottom-[5%] lg:bottom-[8%] bottom-[4%]  left-[7%] md:left-[10%] lg:left-[20%]  h-[60px] bg-[#2a2929] rounded-4xl"
        >
          <input
            ref={inputRef}
            className="lg:w-[90%] md:w-[88%] w-[83%]  h-[100%] rounded-4xl outline-0 border-0 text-[#9b9a9a]"
            placeholder="Ask AI.."
            type="text"
          />
          <button>
            <MdSend className="text-2xl text-[#9b9a9a]" />
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Gemini;
