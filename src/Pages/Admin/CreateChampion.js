import React, { useState } from "react";

const CreateChampion = () => {
    const [ championName, setChampionName ] = useState("");
    const [ championDescription, setChampionDescription] = useState("");
    const [ skills, setSkills ] = useState([]);

    
    const onChangeChampionName = (e) => {
        setChampionName(e.target.value);
    }

    const onChangeChampionDescription = (e) => {
        setChampionDescription(e.target.value);
    }

    return(
        <div>
            
        </div>
    )
}

export default CreateChampion;