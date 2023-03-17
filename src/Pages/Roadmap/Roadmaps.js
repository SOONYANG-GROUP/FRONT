import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const Roadmaps = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ roadmaps, setRoadmaps ] = useState([]);

    useEffect(() => {
        setIsLoading(false);
    }, [isLoading, roadmaps]);

    if(isLoading)
    {
        return(
            <Loading />
        )
    }
    else
    {
        return(
            <div>
    
            </div>
        )
    }
}

export default Roadmaps;