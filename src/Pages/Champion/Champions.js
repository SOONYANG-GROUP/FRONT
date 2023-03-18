import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import ChampionsDummyData from "../../DummyData/Champion.json";

const Champions = (props) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ champions, setChampions ] = useState([]);


    useEffect(() => {
        setChampions(ChampionsDummyData.champions);
        setIsLoading(false);
    }, []);

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

export default Champions;