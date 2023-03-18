import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import { useParams } from "react-router-dom";

// Dummy Data
import ChampionsDummyData from "../../DummyData/Champion.json";

const Champion = (props) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ champion, setChampion ] = useState(null);
    const championId = useParams().id;

    
    useEffect(() => {
        
        setChampion(GetChampion(championId));
        setIsLoading(false);
    }, []);

    const GetChampion = (championId) => {
        return ChampionsDummyData.champions[parseInt(championId)]
    }


    console.log(champion)

    if(isLoading)
    {
        return(<Loading />)
    }   
    else
    {
        return(
            <div>
                
            </div>
        )
    } 
}

export default Champion;