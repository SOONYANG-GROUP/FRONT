import React from "react";



const SkillCard = ({
    skill
}) => {
    return(
        <div className="col-md-3 animate__animated animate__fadeIn">
            <a href={`/skill/${skill._id}`}>
                <div className="card shadow-lg mb-3"
                    style={{
                        background: `url(${skill.imageSecureUrl})`,
                        height: '310px',
                        backgroundSize: 'cover',
                        border: '1px solid white'
                    }}
                ></div>
            </a>
        </div>
    )
}

const SkillCards = ({
    skills
}) => {
    return(
        <div className="album py-5">
            <div className="container">
                <div className="row">
                    {skills.map((skill, index) => {
                        return(
                            <SkillCard 
                                key={index}
                                skill={skill}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SkillCards;