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
        const selectedSkill = loadedSkills[parseInt(e.target.id)];
        
        const selectedEleInSkills = skills.find((e) => { return e.name === selectedSkill.name});
        if(selectedEleInSkills === undefined)
        {
            skills.push(selectedEleInSkills);
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