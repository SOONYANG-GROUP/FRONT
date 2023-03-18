import React, { useEffect, useState } from "react";
import { NameInput, ReferenceInput } from "../../Components/Inputs/Input";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";
import Loading from "../Loading";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    const [ references, setReferences ] = useState([]);
    

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeName = (e) => {
        setName(e.target.value);
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
                    <NameInput 
                        name={name}
                        onChangeName={onChangeName}
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