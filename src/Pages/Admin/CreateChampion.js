import React, { useState } from "react";
import { ChampionNameInput } from "../../Components/Inputs/Input";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import { SkillModal, SkillModalBtn } from "../../Components/Modal/SkillModal";

const CreateChampion = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ addingSkills, setAddingSkills ] = useState(false);

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
        <>
            <div>
                <div>
                    <ChampionNameInput 
                        championName={championName}
                        onChangeChampionName={onChangeChampionName}
                    />
                </div>
                <div>
                    <DescriptionInput 
                        description={championDescription}
                        onChangeDescription={onChangeChampionDescription}
                    />
                </div>
                <div>
                    <SkillModalBtn />
                    <SkillModal 
                        skills={skills}
                        addingSkills={addingSkills}
                        setAddingSkills={setAddingSkills}
                    />
                </div>
            </div>

        </>
    )
}

export default CreateChampion;