import React, { useState } from "react";
import { NameInput } from "../../Components/Inputs/Input";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import SkillsList from "../../Components/List/SkillsList";
import { SkillModal, SkillModalBtn } from "../../Components/Modal/SkillModal";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ addingSkills, setAddingSkills ] = useState(false);

    const [ name, setName ] = useState("");
    const [ description, setDescription] = useState("");
    const [ skills, setSkills ] = useState([]);
    

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    return(
        <>
            <div>
                <div>
                    <NameInput
                        name={name}
                        onChangeName={onChangeName}
                    />
                </div>
                <div>
                    <DescriptionInput 
                        description={description}
                        onChangeDescription={onChangeDescription}
                    />
                </div>
                <div>
                    <SkillsList 
                        skills={skills}
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
                <div>
                    <button>
                        Create Roadmap
                    </button>
                </div>
            </div>

        </>
    )
}

export default CreateRoadmap;