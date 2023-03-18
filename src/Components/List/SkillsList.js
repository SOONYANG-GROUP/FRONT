import React from "react";

const SkillListElement = ({
    index,
    skill
}) => {
    return(
        <div key={index}>
            <h3>
                {skill.name}
            </h3>
            <p>
                {skill.description}
            </p>
        </div>
    )
}

const SkillsList = ({
    skills
}) => {
    return(skills.map((skill, index) => {
        return(
            <SkillListElement 
                key={index}
                skill={skill}
            />
        )
    }))
}

export default SkillsList;