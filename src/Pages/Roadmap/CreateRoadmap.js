import React, { useEffect, useState } from "react";
import { NameInput } from "../../Components/Inputs/Input";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import SkillList from "../../Components/List/SkillList";
import SkillModalBtn from "../../Components/Modal/SkillModal";

import SkillsDummyData from "../../DummyData/Skills.json";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ deletingSkill, setDeletingSkill ] = useState(false);
    const [ addingSkill, setAddingSkill ] = useState(false);

    const [ name, setName ] = useState("");
    const [ skills, setSkills ] = useState([]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    

    useEffect(() => {
        if(GetLoadedSkills())
        {
            setLoadedSkills(GetLoadedSkills());
            setIsLoading(false);
        }
    }, []);

    const GetLoadedSkills = () => {
        return SkillsDummyData.skills;
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onAddSkill = async (e) => {
        e.preventDefault();
        await setAddingSkill(true);

        await setAddingSkill(false)
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
                    <SkillList 
                        skills={skills}
                        deletingSkill={deletingSkill}
                        setDeletingSkill={setDeletingSkill}
                    />
                </div>
                <div>
                    <SkillModalBtn 
                        loadedSkills={loadedSkills}
                        addingSkill={addingSkill}
                        onAddSkill={onAddSkill}
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