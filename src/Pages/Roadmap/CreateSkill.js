import React, { useState } from "react";
import { NameInput } from "../../Components/Inputs/Input";
import Loading from "../Loading";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState();
    const [ creating, setCreating ] = useState(false);
    
    const [ name, setName ] = useState("");
    const [ studyTip, setStudyTip ] = useState("");
    const [ references, setReferences ] = useState([]);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeStudyTip = (e) => {
        setStudyTip(e.target.value);
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        if(creating)
        {
            return(
                <div>
                    Creating...
                </div>
            )
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
                    

                </div>
            )
        }
    }
}

export default CreateSkill;