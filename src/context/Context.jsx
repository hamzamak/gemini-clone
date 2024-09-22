import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
   
   const [input , setInput] = useState("");
   const [recentPrompt , setRecentPrompt] = useState([]);
   const [prevPrompts,setPrevPrompts]= useState(false);
   const [showResult , setShowResult] = useState(false);
   const [loading , setLoading] = useState(false);
   const [resultData , setResultData] = useState("");

   const onSent = async (prompt) =>{
      setResultData("")
      setLoading(true)
      setShowResult(true)
      await runChat(input)
   }



    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput

    }

    return(
        <Context.Provider value={contextValue}>
            {props.childern}
        </Context.Provider>
    )
}

export default ContextProvider