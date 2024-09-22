import { createContext, useState } from "react";
// import runChat from "../config/gemini";

async function runChat(prompt) {
    const apiUrl = 'http://localhost:8083/api/flows';
  
    const requestData = {
      customerId: "2121",
      request: prompt
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Assuming the API returns plain text as the response
      const responseData = await response.text();
      return responseData; // Return the response text
    } catch (error) {
      console.error('Error during API call:', error);
      return null; // Return null in case of an error
    }
  }
  
//   export default runChat;
  

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState([]);
    const [prevPrompts, setPrevPrompts] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    // const onSent = async (prompt) => {
    //     setResultData("")
    //     setLoading(true)
    //     setShowResult(true)
    //     let response;

    //     if (prompt !== undefined) {
    //         response = await runChat(prompt)
    //         setRecentPrompt(prompt)

    //     }
    //     else {
    //         setPrevPrompts(prev => [...prev, input])
    //         setRecentPrompt(input)
    //         response = await runChat(input)
    //     }

    //     let responseArray = response.split("**")
    //     let newResponse = "";
    //     for (let i = 0; i < responseArray.length; i++) {
    //         if (i === 0 || i % 2 !== 1) {
    //             newResponse += responseArray[i];
    //         } else {
    //             newResponse += "<b>" + responseArray[i] + "</b>";
    //         }
    //     }

    //     setResultData(newResponse)
    //     setLoading(false)
    //     setInput("")
    // }


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }

        // Check if response is not null before trying to process it
        if (response) {
            // let responseArray = response.split("**");
            // let newResponse = "";
            // for (let i = 0; i < responseArray.length; i++) {
            //     if (i === 0 || i % 2 !== 1) {
            //         newResponse += responseArray[i];
            //     } else {
            //         newResponse += "<b>" + responseArray[i] + "</b>";
            //     }
            // }
            // setResultData(newResponse);
            setResultData(response);
        } else {
            setResultData("Error: Could not fetch the data.");
        }

        setLoading(false);
        setInput("");
    };



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
        setInput,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider