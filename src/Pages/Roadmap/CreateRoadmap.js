import React, { useState } from "react";
import { NameInput } from "../../Components/Inputs/Input";
import { DescriptionInput } from "../../Components/Inputs/Textarea";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);

    const [ name, setName ] = useState("");
    const [ description, setDescription] = useState("");
    
    const onChangeName = (e) => {
        setName(e.target.value);
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
                    <button>
                        Create Roadmap
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateRoadmap;