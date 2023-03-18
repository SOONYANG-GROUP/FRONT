import React, { useState } from "react";
import { NameInput } from "../../Components/Inputs/Input";
import { StudyTip } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";

import Loading from "../Loading";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState();
    const [ creating, setCreating ] = useState(false);
    const [ addingReference, setAddingReference] = useState(false);
    
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
<main role="main" class="container">

<div class="starter-template">
  <h1>Bootstrap starter template</h1>
  <p class="lead">Use this document as a way to quickly start any new project.<br /> All you get is this text and a mostly barebones HTML document.</p>
</div>

</main>
                    <div>
                        <NameInput 
                            name={name}
                            onChangeName={onChangeName}
                        />
                    </div>
                    <div>
                        <StudyTip 
                            studyTip={studyTip}
                            onChangeStudyTip={onChangeStudyTip}
                        />
                    </div>
                    <div>
                        <ReferenceList 
                            addingReference={addingReference}
                            references={references}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default CreateSkill;