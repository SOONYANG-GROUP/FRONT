import React, { useEffect, useState } from "react";
import { DateTimeInput, TitleInput } from "../../Components/Inputs/Input";
import { ChampionSelectTag } from "../../Components/Inputs/Select";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import ChampionList from "../../Components/List/ChampionList";
import Loading from "../Loading";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateBattle = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ addingChampion, setAddingChampion ] = useState(false);

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date());
    const [ champions, setChampions ] = useState([]);

    let [ totalChampionsNumber, setTotalChampionsNumber ] = useState(0); 

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    if(isLoading || creating)
    {
        return(isLoading ? (<Loading />) : (<></>))
    }
    else
    {
        return(
            <>
                <div>
                    <TitleInput 
                        title={title}
                        onChangeTitle={onChangeTitle}
                    />
                </div>
                <div>
                    <DescriptionInput 
                        description={description}
                        onChangeDescription={onChangeDescription}
                    />
                </div>
                <div>
                    <DatePicker 
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                    />
                </div>
                <div>
                    <ChampionList 
                        champions={champions}
                        totalChampionsNumber={totalChampionsNumber}
                        setTotalChampionsNumber={setTotalChampionsNumber}
                    />
                </div>
                <div>
                    <ChampionSelectTag 
                        setAddingChampion={setAddingChampion}
                        champions={champions}
                        totalChampionsNumber={totalChampionsNumber}
                        setTotalChampionsNumber={setTotalChampionsNumber}
                    />
                </div>
            </>
        )
    }
}

export default CreateBattle;