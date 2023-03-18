import React, { useEffect, useState } from "react";
import { ReferenceInput, SkillNameInput } from "../../Components/Inputs/Input";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";
import Loading from "../Loading";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ skillName, setSkillName ] = useState("");
    const [ skillDescription, setSkillDescription ] = useState("");
    const [ skillImageUrl, setSkillImageUrl ] = useState("");
    const [ skillImageId, setSkillImageId ] = useState("");
    const [ references, setReferences ] = useState([]);
    

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeSkillName = (e) => {
        setSkillName(e.target.value);
    }

    const onChangeSkillDescription = (e) => {
        setSkillDescription(e.target.value);
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div>
                <div>
                    <SkillNameInput 
                        skillName={skillName}
                        onChangeSkillName={onChangeSkillName}
                    />
                </div>
                <div>
                    <DescriptionInput 
                        description={skillDescription}
                        onChangeDescription={onChangeSkillDescription}
                    />
                </div>
                <div>
                    <ReferenceList 
                        references={references}
                        addingReference={addingReference}
                    />
                </div>
                <div>
                    <ReferenceInput 
                        references={references}
                        setAddingReference={setAddingReference}
                    />
                </div>
                <div>
                    <button>
                        Create Skill
                    </button>
                </div>
            </div>
        )
    }
}

export default CreateSkill;