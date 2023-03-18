import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import { useParams } from "react-router-dom";


// Dummy Data
import ChampionsDummyData from "../../DummyData/Champion.json";
import DummyImage from "../../Images/AIDeveloper.png"


const Champion = (props) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ champion, setChampion ] = useState(null);
    const championId = useParams().id;
    
    useEffect(() => {
        if(GetChampion(championId))
        {
            setChampion(GetChampion(championId));
            setIsLoading(false);
        }

        return() => {
            GetChampion(championId);
        }
    }, [ championId ]);

    const GetChampion = (championId) => {
        return ChampionsDummyData.champions[parseInt(championId)]
    }
    
    if(isLoading || champion == null)
    {
        return(<Loading />)
    }   
    else
    {
        return(
            <div>
                <div>
                    <img 
                        src={DummyImage}
                        alt={champion.name}
                    />
                </div>
            </div>
        )
    } 
}

export default Champion;