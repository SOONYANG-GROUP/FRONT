import React, { useEffect, useState } from "react";
import { NameInput, ReferenceInput } from "../../Components/Inputs/Input";
import { StudyTip } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";
import Loading from "../Loading";

import axios from "axios";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    const [ studyTip, setStudyTip ] = useState("");
    const [ references, setReferences ] = useState([]);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeStudyTip = (e) => {
        setStudyTip(e.target.value);
    }

    const onCreateSkill = async (e) => {
        e.preventDefault();
        await setCreating(true);
        if(name === "" || studyTip === "" || references.length === 0)
        {
            await setCreating(false);
        }
        else
        {
            try
            {
                await axios.post(`http://localhost:5000/create/skill`, {
                    name,
                    references,
                    studyTip,
                    imageId: "",
                    imageUrl: "",
                    imageFormData: null
                }, {})
                .then((res) => {
                    window.location.replace(`/skill/${res.data.id}`);
                })
                .catch((err) => {
                    console.error(err);
                })
            }
            catch(error)
            {
                console.error(error);
            }
        }
        await setCreating(false);
    }
    
    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div className="container px-5">
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 스킬 이름</h4>
                        <span className="text-muted">연구해야 할 스킬 이름을 적어주세요</span>
                    </div>
                    <NameInput 
                        name={name}
                        onChangeName={onChangeName}
                        disabled={creating}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 스킬 연마 방법</h4>
                        <span className="text-muted">스킬을 연구하는 방법에 대해 알려주세요</span>
                    </div>
                    <StudyTip 
                        studyTip={studyTip}
                        disabled={creating}
                        onChangeStudyTip={onChangeStudyTip}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 스킬 연마 참고 자료</h4>
                    </div>
                    <div>
                        <ReferenceList 
                            addingReference={addingReference}
                            references={references}
                        />
                    </div>
                    <div className="mt-2">
                        <ReferenceInput 
                            creating={creating}
                            references={references}
                            setAddingReference={setAddingReference}
                        />
                    </div>
                </div>
                <div className="mb-2 pt-5" onClick={onCreateSkill}>
                    <button className="btn btn-primary w-100">
                        스킬 연구 추가하기
                    </button>
                </div>
            </div>
        )
    }
}


export default CreateSkill;