import React, { useEffect, useState } from "react";


export const SkillModalBtn = () => {
    return(
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                스킬 추가하기
            </button>
        </>
    )
}

const SkillModalElement = ({
    index,
    loadedSkill,
    onAddSkill
}) => {
    return(
        <div>
            <button 
                value={index} 
                type="button" 
                data-bs-dismiss="modal"
                onClick={onAddSkill}    
            >
                {loadedSkill.name}
            </button>
        </div>
    )
}

export const SkillModal = ({
    skills,
    addingSkills,
    setAddingSkills
}) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ loadedSkills, setLoadedSkills ] = useState([
        {name: "C++", description: "asdf"}, {name: "C", description: "adsf"}
    ]);
    
    useEffect(() => {
        setIsLoading(false);
    }, []);



    const onAddSkill = async (e) => {
        e.preventDefault();

        let isExisted = false;
        await setAddingSkills(true);

        if(skills.length == 0)
        {
            skills.push(loadedSkills[parseInt(e.target.value)])
        }
        else
        {
            const clickVal = loadedSkills[parseInt(e.target.value)].name;
            isExisted = skills.find(e => {return e.name === clickVal})
            if(!isExisted)
            {
                skills.push(loadedSkills[parseInt(e.target.value)])
            }
        }
        await setAddingSkills(false);
    }

    console.log(skills)

    return(
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {loadedSkills.map((loadedSkill, index) => {
                            return(
                                <SkillModalElement
                                    key={index}
                                    index={index}
                                    loadedSkill={loadedSkill}
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

