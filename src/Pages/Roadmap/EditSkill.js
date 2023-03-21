import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StudyTip } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";

import Loading from "../Loading";

import SkillsDummyData from "../../DummyData/Skills.json";
import { NameInput, ReferenceInput } from "../../Components/Inputs/Input";

const EditSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);
    
    const [ name, setName ] = useState('');
    const [ studyTip, setStudyTip ] = useState('');
    const [ references, setReferences ] = useState([]);
    

    const id = useParams().id;

    useEffect(() => {
        if(GetSkill(id))
        {
            setName(GetSkill(id).name);
            setStudyTip(GetSkill(id).studyTip);
            setReferences(GetSkill(id).references);
            setIsLoading(false);
        }
    }, [ id ]);


    const GetSkill = (id) => {
        return SkillsDummyData.skills[id];
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeStudyTip = (e) => {
        setStudyTip(e.target.value);
    }

    const onEditSkill = (e) => {

    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        if(editing)
        {
            return(<div>Editing...</div>)
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
                            disabled={editing}
                        />
                    </div>
                    <div>
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 스킬 연구 방법</h4>
                            <span className="text-muted">스킬을 연구하는 방법에 대해 알려주세요</span>
                        </div>
                        <StudyTip
                            studyTip={studyTip}
                            disabled={editing}
                            onChangeStudyTip={onChangeStudyTip}
                        />
                    </div>
                    <div>
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 스킬 연구 참고 자료</h4>
                        </div>
                        <div>
                            <ReferenceList
                                addingReference={addingReference}
                                references={references}
                            />
                        </div>
                        <div className="mt-2">
                            <ReferenceInput 
                                creating={editing}
                                references={references}
                                setAddingReference={setAddingReference}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <button className="btn btn-primary w-100">
                            스킬 연구 고치기
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default EditSkill;