import React from "react";

const SkillModalBtn = ({
    addingSkill,
    loadedSkills,
    onAddSkill
}) => {
    return(
        <>
            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                스킬 추가하기
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
        <div className="col-4" id={index}>
            <button id={index} onClick={onAddSkill} className="card card-body w-100 shadow-sm">
                <div id={index}>
                    <img 
                        src={skill.imageSecureUrl}
                        id={index}
                        style={{width: "70%"}}
                    />
                </div>
                <div id={index} className="mt-3 w-100">
                    <h5 id={index}>{skill.name}</h5>
                </div>
            </button>
        </div>
    )
}

const SkillModal = ({
    addingSkill,
    loadedSkills,
    onAddSkill
}) => {
    return(
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">스킬 추가</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                {loadedSkills.map((loadedSkill, index) => {
                                    return(
                                        <SkillElement 
                                            key={index}
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
            </div>
        </div>
    )
}

export default SkillModalBtn;