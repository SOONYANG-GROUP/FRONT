import React, { useState } from "react";

const SkillListElement = ({
    index,
    skill,
    onDeleteSkill
}) => {
    return(
        <div className="col-md-4" id={index}>
            <div className="card card-body shadow-sm mb-3" id={index}>
                <div style={{
                    margin: "0 auto",
                    width: "50%"
                }} id={index}>
                    <img 
                        src={skill.imageUrl}
                        alt={skill.name}
                        style={{width: "100%"}}
                        id={index}
                    />
                </div>
                <div className="mt-3" id={index}>
                    <button id={index} onClick={onDeleteSkill} className="btn btn-danger w-100">
                        <i id={index} className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

const SkillList = ({
    skills,
    deletingSkill,
    setDeletingSkill
}) => {
    const onDeleteSkill = async (e) => {
        e.preventDefault();
        console.log(e.target.id)
        await setDeletingSkill(true);
        await skills.splice(parseInt(e.target.id), 1);
        await setDeletingSkill(false);
    }

    if(deletingSkill)
    {
        return(<></>)
    }
    else
    {
        return(
            <div className="album py-5">
                <div className="container">
                    <div className="row">
                        {skills.map((skill, index) => {
                            return(
                                <SkillListElement 
                                    skill={skill}
                                    key={index}
                                    index={index}
                                    onDeleteSkill={onDeleteSkill}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default SkillList;