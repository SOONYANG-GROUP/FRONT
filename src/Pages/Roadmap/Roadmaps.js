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
                <div>
                    <a href="/create/roadmap">
                        Roadmap 만들기
                    </a>
                </div>
                <div>
                    <RoadmapCards 
                        roadmaps={roadmaps}
                    />
                </div>
            </div>
        )
    }
}

export default Roadmaps;