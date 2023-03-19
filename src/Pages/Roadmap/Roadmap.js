import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// //후원 사이트

import RoadmapDummyData from "../../DummyData/Roadmap.json";


const Roadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ roadmap, setRoadmap ] = useState(null);
    const id = useParams().id;


    useEffect(() => {
        if(GetRoadmap(id))
        {
            setRoadmap(GetRoadmap(id));
            setIsLoading(false);
        }
    }, [ id ]);

    const GetRoadmap = (id) => {
        return RoadmapDummyData.roadmaps[id - 1];
    }

    console.log(roadmap)
    return(
        <div>

        </div>
    )
}

export default Roadmap;