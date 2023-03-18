import React, { useState } from "react";

const SkillListElement = ({
    index,
    skill,
    onDeleteSkill
}) => {
    return(
        <div>
            {skill.name}
            <div>
                <button id={index} onClick={onDeleteSkill}>
                    -
                </button>
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
            <div>
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
        )
    }
}

export default SkillList;