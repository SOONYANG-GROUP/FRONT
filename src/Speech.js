import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";

import axios from "axios";
import { SUB_BACK_URL } from "./Components/Constants/URL";

// 집중 모드
const Speech = () => {
    const speechRef = useRef();
    const [ status, setStatus ] = useState(0);
    const [ isAdding, setIsAdding ] = useState(false);
    let [ messages, setMessages ] = useState([]);


    const GetSpeechRef = useCallback(async () => {
        try
        {
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = "ko-KR"
            recognition.continuous = true;
            //recognition.interimResults = true;
            recognition.maxSpeedTime = 120;
            recognition.maxAge = 360;

            speechRef.current = recognition;

            speechRef.current.addEventListener("start", (event) => {
                setStatus(1);
            })

            speechRef.current.addEventListener("result", (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript
                setIsAdding(true)
                messages.push(transcript)
                setIsAdding(false)
            });

            speechRef.current.addEventListener("end", (event) => {
                setStatus(0);
            })
        }
        catch(e)
        {
            console.error(e);
        }
    } ,[]);

    useEffect(() => {
        GetSpeechRef();
        //speechRef.current.start();


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onStartTranscript = (event) => {
        speechRef.current.start();
    }

    const onEndTranscript = (event) => {
        speechRef.current.stop();
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try
        {
            await axios.post(`${SUB_BACK_URL}/gpt/transcript`, {messages: messages})
            .then((res) => {
                
            })
            .catch((err) => {

            });
        }
        catch(error)
        {
            console.error(error)
        }
    }

    console.log(messages);
    return(
        <div>
            
            <div>
                {status == 1 ? (<>start</>) : (<>end</>)}
            </div>
            <div>
                <button onClick={onStartTranscript}>Start</button>
            </div>
            <div>
                <button onClick={onEndTranscript}>End</button>
            </div>
            <div>
                <button onClick={onSubmit}>Submit Transcript</button>
            </div>
        </div>
    )
}

export default Speech;