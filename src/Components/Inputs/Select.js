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
        await setTotalChampionsNumber(totalChampionsNumber + 1);
        await setAddingChampion(false);
    }


    return(
        <div>
            <div>
                <ChampionFieldSelect 
                    onChangeChampionField={onChangeChampionField}
                    totalChampionsNumber={totalChampionsNumber}
                />
            </div>
            <div>
                <ChampionSelect
                    championField={championField}
                    onChangeChampion={onChangeChampion}
                    totalChampionsNumber={totalChampionsNumber}
                />
            </div>
            <div>
                <button onClick={onAddChampion} disabled={totalChampionsNumber > 4 || totalChampionsNumber < 0}>
                    <p>
                        +
                    </p>
                </button>
            </div>
        </div>
    )
}

const ChampionFieldSelect = ({
    onChangeChampionField,
    totalChampionsNumber
}) => {
    return(
        <select onChange={onChangeChampionField} disabled={totalChampionsNumber > 4 || totalChampionsNumber < 0}>
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
    onChangeChampion,
    totalChampionsNumber
}) => {
    if(championField == ChampionFieldLists[0])
    {
        return(
            <select onChange={onChangeChampion} disabled={totalChampionsNumber > 4 || totalChampionsNumber < 0}>
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
            <select onChange={onChangeChampion} disabled={totalChampionsNumber > 4 || totalChampionsNumber < 0}>
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