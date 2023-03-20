import React, { useState, useEffect } from "react";

const GPTPrint = ({
    words
}) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    // typeWriter
    useEffect(() => {
        if (index === words.length - 1 && subIndex === words[index].length) {
        return;
        }

        const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
                    150, parseInt(Math.random() * 350)));

        return () => clearTimeout(timeout);
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
        <p className="text-black text-bold">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </p>
        </>
    );
}

export default GPTPrint;