import React, { useState } from "react";
import { NameInput, ReferenceInput } from "../Inputs/Input";
import { StudyTip } from "../Inputs/Textarea";
import ReferenceList from "../List/ReferenceList";

const CreateSkillBtn = () => {
    return(
        <>
            <button type="button" className="btn btn-lg btn-primary-soft text-primary fw-500" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                스킬 추가하기
            </button>
            <CreateSkillModal />
        </>
    )
}

const CreateSkillModal = () => {
    const [ creating, setCreating ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    const [ studyTip, setStudyTip ] = useState("");
    const [ references, setReferences ] = useState([]);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeStudyTip = (e) => {
        setStudyTip(e.target.value);
    }

    const onCreateSkill = async (e) => {
        e.preventDefault();
        await setCreating(true);
    }
    
    return(
        <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">스킬 추가</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label className="form-label" htmlFor="skill_name">스킬 이름</label>
                            <NameInput 
                                name={name}
                                onChangeName={onChangeName}
                                nameLabel={"skill_name"}
                                disabled={creating}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="form-label" htmlFor="skill_study_tips">스킬 공부 팁</label>
                            <StudyTip 
                                studyTip={studyTip}
                                disabled={creating}
                                onChangeStudyTip={onChangeStudyTip}
                                studyTipLabel={"skill_study_tips"}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="form-label" htmlFor="skill_reference">참고 자료</label>
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
                                    referenceLabel={"skill_reference"}
                                    setAddingReference={setAddingReference}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <button 
                                className="btn btn-outline-primary w-100" 
                                disabled={creating}
                                onClick={onCreateSkill}    
                            >
                                {creating ? (
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>) : (<span>스킬 추가하기</span>)}
                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSkillBtn;