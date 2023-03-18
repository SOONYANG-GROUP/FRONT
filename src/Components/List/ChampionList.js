import React from "react";

const ChampionListElement = ({
    champion
}) => {
    return(
        <div>
            <p>
                {champion.championField}
            </p>
            <p>
                {champion.champion}
            </p>
        </div>
    )
}

const ChampionList = ({
    champions
}) => {
    if(champions.length == 0)
    {
        return(<></>)
    }
    else
    {
        return(
            champions.map((champion, index) => {
                return(
                    <ChampionListElement 
                        champion={champion}
                        key={index}
                    />
                )
            })
        )
    }
}

export default ChampionList;