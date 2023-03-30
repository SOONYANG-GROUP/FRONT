import React from "react";
import GPTPrint from "../GPT/GPTPrint";

const HelloWorldSection = ({
    name,
    helloworld
}) => {
    return(
        <div className="text-uppercase-expanded small mb-2 pt-5 pb-5">
            <h4 className="fw-bold"><i className="fa-solid fa-code"></i>Hello World 출력하기</h4>
            <code className="fs-5">
                <GPTPrint 
                    words={[helloworld]}
                />
            </code>
        </div>
    )
}

export default HelloWorldSection;