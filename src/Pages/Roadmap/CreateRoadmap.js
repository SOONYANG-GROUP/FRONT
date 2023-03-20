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
    const [ skills, setSkills ] = useState([]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    
    const [ framework, setFramework ] = useState("");
    const [ computerLanguage, setComputerLanguage ] = useState("");

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

    const onChangeFramework = (e) => {
        setFramework(e.target.value);
    }

    const onChangeComputerLanguage = (e) => {
        setComputerLanguage(e.target.value);
    }

    return(
        <>
            <div className="container px-5">
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 로드맵 이름</h4>
                        <span className="text-muted">개발 분야 이름을 적어주세요</span>
                    </div>
                    <NameInput
                        name={name}
                        onChangeName={onChangeName}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 로드맵 대표 언어</h4>
                            <span className="text-muted">해당 개발 분야를 대표하는 언어</span>
                        </div>
                        <input 
                            type="text"
                            name="computerLanguage"
                            value={computerLanguage}
                            onChange={onChangeComputerLanguage}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 로그맵 대표 프레임워크</h4>
                            <span className="text-muted">해당 개발 분야를 대표하는 프레임워크</span>
                        </div>
                        <input 
                            type="text"
                            name="framework"
                            value={framework}
                            onChange={onChangeFramework}
                            className="form-control"
                        />
                    </div>
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 로드맵 스킬 트리</h4>
                        <span className="text-muted">해당 직업을 얻기 위해 필요한 스킬을 추가하세요</span>
                    </div>
                    <div>
                        <SkillModalBtn loadedSkills={loadedSkills} addingSkill={addingSkill} onAddSkill={onAddSkill} />
                    </div>
                    <SkillList 
                        skills={skills}
                        deletingSkill={deletingSkill}
                        setDeletingSkill={setDeletingSkill}
                    />
                </div>
                <div>
                    
                </div>
                <div className="mb-2 pt-5">
                    <button className="btn btn-primary w-100">
                        Create Roadmap
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateRoadmap;