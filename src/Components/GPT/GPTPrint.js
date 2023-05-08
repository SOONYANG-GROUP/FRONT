import React, { useState, useEffect } from "react";

const GPTPrint = ({
    words = ""
}) => {
    console.log(words)
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    // typeWriter
    useEffect(() => {
        if(words != undefined)
        {
            if (index === words.length - 1 && subIndex === words[index].length) {
                return;
                }
        
                const timeout = setTimeout(() => {
                setSubIndex((prev) => prev + (reverse ? -1 : 1));
                }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
                            150, parseInt(Math.random() * 350)));
        
                return () => clearTimeout(timeout);
        }
    }, [subIndex, index, reverse]);

    // blinker
    useEffect(() => {
        const timeout2 = setTimeout(() => {
        setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    return (
        <>
        <pre className="text-black text-bold" style={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all"
                    }}>
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </pre>
        </>
    );
}

export default GPTPrint;