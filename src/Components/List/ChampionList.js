import React, { useState } from "react";

const ChampionListElement = ({
    index,
    champion,
    onDeleteChampion
}) => {
    return(
        <div key={index}>
            <p>
                {champion.championField}
            </p>
            <p>
                {champion.champion}
            </p>
            <div>
                <button value={index} onClick={onDeleteChampion}>
                    삭제
                </button>
            </div>
        </div>
    )
}

const ChampionList = ({
    champions,
    totalChampionsNumber,
    setTotalChampionsNumber
}) => {
    
    const [ deleting, setDeleting ] = useState(false);
    
    const onDeleteChampion = async (e) => {
        e.preventDefault();
        await setDeleting(true);
        champions.splice(parseInt(e.target.value), 1);
        setTotalChampionsNumber(totalChampionsNumber - 1);
        await setDeleting(false);
    }

    if(champions.length == 0)
    {
        return(<></>)
    }
    else
    {
        if(deleting)
        {
            return(<div>deleting</div>)
        }
        else
        {
            return(
                champions.map((champion, index) => {
                    return(
                        <ChampionListElement 
                            champion={champion}
                            key={index}
                            index={index}
                            onDeleteChampion={onDeleteChampion}
                        />
                    )
                })
            )
        }
    }
}

export default ChampionList;