import React, { useEffect, useState } from "react";
import { NameInput } from "../../Components/Inputs/Input";
import SkillList from "../../Components/List/SkillList";
import SkillModalBtn from "../../Components/Modal/SkillModal";

import SkillsDummyData from "../../DummyData/Skills.json";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ deletingSkill, setDeletingSkill ] = useState(false);
    const [ addingSkill, setAddingSkill ] = useState(false);

    const [ name, setName ] = useState("");
    const [ skills, setSkills ] = useState([

        {
            "_id": 3,
            "name": "C#",
            "studyTip": "",
            "imageId": "",
            "imageUrl": "https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
            "references": [
                {
                    "referenceLink": "https://www.naver.com"
                },
                {
                    "referenceLink": "https://www.disney.com"
                }
            ]
        }

    ]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    

    useEffect(() => {
        if(GetLoadedSkills())
        {
            setLoadedSkills(GetLoadedSkills());
            setIsLoading(false);
        }
    }, []);

    const GetLoadedSkills = () => {
        return SkillsDummyData.skills;
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onAddSkill = async (e) => {
        e.preventDefault();
        await setAddingSkill(true);

        let isExisted = false;
        const selectedSkill = loadedSkills[parseInt(e.target.id)];
        for(let i = 0; i < skills.length; ++i)
        {
            if(skills[i].name === selectedSkill.name)
            {
                isExisted = true;
            }
        }

        if(!isExisted)
        {
            skills.push(selectedSkill);
        }
        await setAddingSkill(false)
    }

    return(
        <>
            <div className="container px-5">
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 로드맵 이름</h4>
                        <span className="text-muted">반드시 직업 이름을 적어주세요</span>
                    </div>
                    <NameInput
                        name={name}
                        onChangeName={onChangeName}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 로드맵 스킬 트리</h4>
                        <span className="text-muted">해당 직업을 얻기 위해 필요한 스킬을 추가하세요</span>
                    </div>
                    <SkillList 
                        skills={skills}
                        deletingSkill={deletingSkill}
                        setDeletingSkill={setDeletingSkill}
                    />
                </div>
                <div>
                    <SkillModalBtn 
                        loadedSkills={loadedSkills}
                        addingSkill={addingSkill}
                        onAddSkill={onAddSkill}
                    />
                </div>
                <div>
                    <button>
                        Create Roadmap
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateRoadmap;