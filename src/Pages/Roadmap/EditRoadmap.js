import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NameInput } from "../../Components/Inputs/Input";
import SkillModalBtn from "../../Components/Modal/SkillModal";


import SkillsDummyData from "../../DummyData/Skills.json";
import RoadmapDummyData from "../../DummyData/Roadmap.json";

import Loading from "../Loading";
import SkillList from "../../Components/List/SkillList";

const EditRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ deletingSkill, setDeletingSkill ] = useState(false);
    const [ addingSkill, setAddingSkill ] = useState(false);

    const [ name, setName ] = useState("");
    const [ skills, setSkills ] = useState([]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    
    const [ framework, setFramework ] = useState("");
    const [ computerLanguage, setComputerLanguage ] = useState("");

    const id = useParams().id;

    useEffect(() => {
        if(GetRoadmap(id) && GetSkills())
        {
            setName(GetRoadmap(id).name);
            setComputerLanguage(GetRoadmap(id).computerLanguage);
            setSkills(GetRoadmap(id).skills);
            setFramework(GetRoadmap(id).framework);
            setLoadedSkills(GetSkills());
        }
        setIsLoading(false);
    }, []);

    const GetRoadmap = (id) => {
        return RoadmapDummyData.roadmaps[id - 1];
    }

    const GetSkills = () => {
        return SkillsDummyData.skills;
    }

    const onChangeFramework = (e) => {
        setFramework(e.target.value);
    }

    const onChangeComputerLanguage = (e) => {
        setComputerLanguage(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onAddSkill = (e) => {

    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        if(editing)
        {
            return(<div></div>)
        }
        else
        {
            return(
                <div className="container px-5">
                    <div>
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 로드맵 이름</h4>
                            <span className="text-muted">개발 분야 이름을 적어주세요</span>
                        </div>
                        <NameInput 
                            disabled={editing}
                            name={name}
                            nameLabel={""}
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
                                <h4>* 로드맵 대표 언어</h4>
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
                            <SkillModalBtn 
                                loadedSkills={loadedSkills}
                                addingSkill={addingSkill}
                                onAddSkill={onAddSkill}
                            />
                        </div>
                        <SkillList 
                            skills={skills}
                            deletingSkill={deletingSkill}
                            setDeletingSkill={setDeletingSkill}
                        />
                    </div>
                    
                    <div className="mb-2 pt-5">
                        <button className="btn btn-primary w-100">
                            Edit Roadmap
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default EditRoadmap;