import React from "react";
import GPTPrint from "../GPT/GPTPrint";

const DownloadLibrarySection = ({
    name,
    downloadLibrary
}) => {
    return(
        <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4 className="fw-bold"><i className="fa-solid fa-terminal"></i>다운로드 명령어</h4>
            <code className="fs-3">
                <GPTPrint 
                    words={[downloadLibrary]}
                />
            </code>
        </div>
    )
}

export default DownloadLibrarySection;