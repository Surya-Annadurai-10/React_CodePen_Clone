import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { motion } from "motion/react";
import { MdSend } from "react-icons/md";
import { useAi } from "../config/GeminiConfig";
import ReactMarkdown from "react-markdown";
import { useTypewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import { geminiData } from "../slices/slice";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import LoadingGemini from "../Components/LoadingGemini";
import { FaRegMessage } from "react-icons/fa6";
import MessageCard from "../Components/messageCard";
import GeminiCard from "../Components/GeminiCard";
import { Input } from "@mui/material";
import { MdClear } from "react-icons/md";

const Gemini = () => {
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);
  const [inputArr, setInputArr] = useState([]);
  // const [initial , setIntial] = useState(false);
  const stateUserData = useSelector((state) => state.codepenData.userData);
  const dispatch = useDispatch();
  const stateGemini = useSelector((state) => state.codepenData.gemini);
  const [showLoading, setShowLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const chatContainerRef = useRef(null);
  // const [text] = useTypewriter({
  //   words: [result],
  //   loop: 1,
  //   typeSpeed:1,
  //   deleteSpeed :0,
  //   // onLoopDone: () =>{
  //   //   if(result.length > 0){
  //   //     console.log("typing done");

  //   //   }
  //   // }
  // });

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
      console.log("height:", chatContainerRef.current.scrollHeight);
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

  //   const prompt = "Explain how AI works";

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
          expand ? `w-[20%]` : `w-[6%]`
        } h-[100%] absolute left-0 bg-[#1c1c23]`}
      >
        <div className="flex items-start pl-6 pt-5 justify-center flex-col gap-15">
          <IoMenu
            onClick={() => setExpand(!expand)}
            className="text-3xl text-[grey]"
          />
          <div
            className={`flex items-center justify-center gap-1 px-2 py-1 ${
              expand ? `bg-[#353535] ` : ``
            } rounded-3xl`}
          >
            <MdAddCircle className="text-3xl text-[#adadad]" />
            {expand ? <h1 className="text-[#b3b3b3]">New Chat</h1> : null}
          </div>
        </div>

        {expand ? (
          <div className="pl-6 pt-5">
            <h1 className="px-3 py-1 w-[fit-content] rounded-3xl bg-[#313131] text-[#aeaeae]">
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

      <div onClick={()=> setExpand(false)} className={`relative w-[94%]  h-[100%]`}>
        <div
          ref={chatContainerRef}
          className="w-[60%] leading-7.5 text-[#d0d0d0] h-[75%] mt-12   m-auto overflow-y-scroll p-5 markdown"
        >
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
                    <h1>{input}</h1>
                  </div>
                </div>
                {showLoading ? (
                  <LoadingGemini />
                ) : (
                  <div className="w-[100%] flex  items-start">
                    <div className="w-[8%]">
                      <img
                        className="w-[40px] image "
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

        <form
          onSubmit={handleSubmit}
          className="w-[60%] flex items-center justify-center absolute bottom-[8%] left-[20%]  h-[60px] bg-[#2a2929] rounded-4xl"
        >
          <input
            ref={inputRef}
            className="w-[90%] h-[100%] rounded-4xl outline-0 border-0 text-[#9b9a9a]"
            placeholder="Ask AI.."
            type="text"
          />
          <button>
            <MdSend className="text-2xl text-[#9b9a9a]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gemini;
