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
            <main className="main">
                <section className="jumbotron text-center">
                    <div className="container">
                    <h1 className="jumbotron-heading">시행 착오 없이 성장하세요</h1>
                    <p className="lead text-muted">이론과 실전 경험 차이가 큰 개발 분야에서 길을 잃지 않도록 도와드립니다.</p>
                    <p>
                        <a href="/create/roadmap" className="btn btn-primary my-2">로드맵 추가하기</a>
                        <a href="/create/skill" className="btn btn-secondary my-2">스킬 추가하기</a>
                    </p>
                    </div>
                </section>
                <div className="container mt-5">
                    <RoadmapCards 
                        roadmaps={roadmaps}
                    />
                </div>
            </main>
        )
    }
}

export default Roadmaps;