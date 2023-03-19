import React from "react";

const SkillModalBtn = ({
    addingSkill,
    loadedSkills,
    onAddSkill
}) => {
    return(
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Launch demo modal
            </button>
            <SkillModal 
                loadedSkills={loadedSkills}
                addingSkill={addingSkill}
                onAddSkill={onAddSkill}
            />
        </>
    )
}

const SkillElement = ({
    index,
    skill,
    onAddSkill
}) => {
    return(
        <button id={index} onClick={onAddSkill}>
            
        </button>
    )
}

const SkillModal = ({
    addingSkill,
    loadedSkills,
    onAddSkill
}) => {
    return(
        <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">스킬 추가</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {loadedSkills.map((loadedSkill, index) => {
                            return(
                                <SkillElement 
                                    index={index}
                                    skill={loadedSkill}
                                    onAddSkill={onAddSkill}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillModalBtn;