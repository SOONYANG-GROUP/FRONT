import React from "react";

const SkillCard = ({
    skill
}) => {
    return(
        <div className="col-md-4">
            <a 
                href={`/skill/${skill._id}`}
                style={{ textDecoration: "none"}}
                className="text-black shadow-sm"    
            >
                <div className="card mb-4 box-shadow h-100">
                    <div className="card-body p-5">
                        <div style={{
                            width: "45%",
                            margin: "0 auto"
                        }}>
                            <img 
                                style={{width: "100%"}}
                                src={skill.imageSecureUrl}
                                alt={skill.name}
                            />
                        </div>
                        <h3 className="card-text text-center mt-4">{skill.name}</h3>
                    </div>
                </div>
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