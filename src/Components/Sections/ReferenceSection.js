import React, { useEffect, useState } from "react";
import queryString from "query-string";

const ReferenceSection = ({
    name,
    references
}) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isYoutubeChanging, setIsYoutubeChanging ] = useState(false);

    const [ youtubeCodes, setYoutubeCodes ] = useState([]);
    const [ selectedYoutubeCode, setSelectedYoutubeCode ] = useState("");
    
    useEffect(() => {
        GetYoutubeCodes(references);
        setIsLoading(false);
    }, []);

    const GetYoutubeCodes = (references) => {
        for(let index = 0; index < references.length; ++index)
        {
            if(references[index].includes("https://www.youtube.com/watch?"))
            {
                const query = queryString.parse(references[index]);
                const youtubeCode = query["https://www.youtube.com/watch?v"]
                youtubeCodes.push(youtubeCode);
                
            }
            if(youtubeCodes.length !== 0)
                setSelectedYoutubeCode(youtubeCodes[0])
        }
    }

    const onChangeSelectedYoutubeCode = (e) => {
        setIsYoutubeChanging(true);
        setSelectedYoutubeCode(e.target.id);
        setIsYoutubeChanging(false);
    }

    if(isLoading)
    {
        return(
            <div>
                로딩 중
            </div>
        )
    }
    else
    {
        return(
            <div>
                <div className="text-uppercase-expanded small mb-2 pt-5">
                    <h4 className="fw-bold">📜 참고 자료</h4>
                </div>
                <YoutubeReferencesSection 
                    isYoutubeChanging={isYoutubeChanging}
                    youtubeCodes={youtubeCodes}
                    selectedYoutubeCode={selectedYoutubeCode}
                    onChangeSelectedYoutubeCode={onChangeSelectedYoutubeCode}
                />
                <RestReferencesSection 
                    references={references}
                />
            </div>
        )
    }

}

const RestReferencesSection = ({
    references
}) => {
    return(
        <div className="mt-3">
            <div>
                <h5 className="fw-bold">▶️ 전체 참고 자료</h5>
            </div>
            <div className="mt-3 row">
                {references.map((referenceLink, index) => {
                    return(
                        <li className="col-md-6 mt-1 mb-1" key={index}>
                            <a style={{ textDecoration: "none" }} href={referenceLink}>
                                {referenceLink}
                            </a>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

const YoutubeReferencesSection = ({
    isYoutubeChanging,
    selectedYoutubeCode,
    youtubeCodes,
    onChangeSelectedYoutubeCode
}) => {
    return(
        <div className="mt-3">
            <div>
                <h5 className="fw-bold">▶️ Youtube 참고 자료</h5>
            </div>
            <div className="mt-3">
                {isYoutubeChanging ? (<div>바꾸는 중</div>) : (
                    <div>
                        <p align="center">
                        <iframe style={{ width: "100%"}} width="560" height="315" src={`https://www.youtube.com/embed/${selectedYoutubeCode}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <ul className="row">
                {youtubeCodes.map((youtubeCode, index) => {
                    return(
                        <li className="col-md-6 mt-1 mb-1" key={index} id={youtubeCode} onClick={onChangeSelectedYoutubeCode}>
                            <a style={{ textDecoration: "none" }} href="#!" key={index} id={youtubeCode}>
                                https://youtube.com?v={youtubeCode}
                            </a>
                        </li>
                    )
                })}
                </ul>
            </div>
        </div>
    )
}

export default ReferenceSection;