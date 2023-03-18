import { useState } from "react"
import { 
    ChampionFieldLists, 
    FrontendFieldLists,
    BackendFieldLists
} from "../Constants/Lists";

export const ChampionSelectTag = ({
    totalChampionsNumber,
    setAddingChampion,
    setTotalChampionsNumber,
    champions
}) => {
    const [ championField, setChampionField ] = useState(ChampionFieldLists[0]);
    const [ champion, setChampion ] = useState(FrontendFieldLists[0]);

    const onChangeChampionField = (e) => {
        setChampionField(e.target.value);
    }

    const onChangeChampion = (e) => {
        setChampion(e.target.value);
    }

    const onAddChampion = async (e) => {
        e.preventDefault();
        await setAddingChampion(true);
        champions.push({
            championField,
            champion
        });
        setTotalChampionsNumber(totalChampionsNumber + 1);
        await setAddingChampion(false);
    }

    const onDeleteChampion = async (e) => {
        e.preventDefault();
        await setAddingChampion(true);
        
        await setAddingChampion(false);
    }

    if(totalChampionsNumber > 4 || totalChampionsNumber < 0)
    {
        return(<></>)
    }
    else
    {
        return(
            <div>
                <div>
                    <ChampionFieldSelect 
                        onChangeChampionField={onChangeChampionField}
                    />
                </div>
                <div>
                    <ChampionSelect
                        championField={championField}
                        onChangeChampion={onChangeChampion}
                    />
                </div>
                <div>
                    <button onClick={onAddChampion}>
                        <p>
                            +
                        </p>
                    </button>
                </div>
            </div>
        )
    }
}

const ChampionFieldSelect = ({
    onChangeChampionField
}) => {
    return(
        <select onChange={onChangeChampionField}>
            {ChampionFieldLists.map((ChampionFieldEle, index) => {
                return(
                    <option value={ChampionFieldEle} key={index}>
                        {ChampionFieldEle}
                    </option>
                )
            })}        
        </select>
    )
}

const ChampionSelect = ({
    championField,
    onChangeChampion
}) => {
    if(championField == ChampionFieldLists[0])
    {
        return(
            <select onChange={onChangeChampion}>
                {FrontendFieldLists.map((FrontendFieldEle, index) => {
                return(
                    <option value={FrontendFieldEle} key={index}>
                        {FrontendFieldEle}
                    </option>
                )
                })}
            </select>

        )
    }
    else if(championField == ChampionFieldLists[1])
    {
        return(
            <select onChange={onChangeChampion}>
                {BackendFieldLists.map((BackendFieldEle, index) => {
                    return(
                        <option value={BackendFieldEle} key={index}>
                            {BackendFieldEle}
                        </option>
                    )
                })}
            </select>
        )
    }
}