import React, { useEffect, useState } from "react";

import RoadmapCards from "../../Components/Cards/Cards/RoadmapCards";

import RoadmapDummyData from "../../DummyData/Roadmap.json";
import Loading from "../Loading";

const Roadmaps = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ generating, setGenerating ] = useState(false);
    const [ roadmaps, setRoadmaps ] = useState([]);

    useEffect(() => {
        if(GetRoadmaps())
        {
            setRoadmaps(RoadmapDummyData.roadmaps);
            setIsLoading(false)
        }
    }, []);

    const GetRoadmaps = () => {
        return RoadmapDummyData.roadmaps;
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div>
                <div class="container my-5">
                    <div class="bg-light p-5 rounded">
                        <div class="col-sm-8 py-5 mx-auto">
                            <h1 class="display-5 fw-normal"><i className="fa-solid fa-code"></i> 시행 착오 없이 성장하세요</h1>
                            <p class="fs-5">이론과 실전 경험 차이가 큰 개발 분야에서 길을 잃지 않도록 도와드립니다.</p>
                            <p>또는 누군가의 밝은 등불이 되어 길을 잃지 않도록 도와주세요</p>
                            <p>
                                <a className="btn btn-primary" href="/create/roadmap" role="button">
                                    로드맵 알려주기
                                </a>
                                <a className="btn btn-secondary ms-3" href="/create/skill">
                                    스킬 알려주기
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <RoadmapCards 
                        roadmaps={roadmaps}
                    />
                </div>
            </div>
        )
    }
}

export default Roadmaps;