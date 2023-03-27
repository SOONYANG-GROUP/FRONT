import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NameInput } from "../../Components/Inputs/Input";
import SkillModalBtn from "../../Components/Modal/SkillModal";

import SkillsDummyData from "../../DummyData/Skills.json";
import RoadmapDummyData from "../../DummyData/Roadmap.json";

import Loading from "../Loading";
import SkillList from "../../Components/List/SkillList";
import axios from "axios";

const EditRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ editing, setEditing ] = useState(false);
    const [ deletingSkill, setDeletingSkill ] = useState(false);
    const [ addingSkill, setAddingSkill ] = useState(false);
    const [ roadmap, setRoadmap ] = useState(null);
    const [ isChanged, setIsChanged ] = useState(false);
    const [ image, setImage ] = useState()

    const [ name, setName ] = useState("");
    const [ skills, setSkills ] = useState([]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    
    const [ framework, setFramework ] = useState("");
    const [ computerLanguage, setComputerLanguage ] = useState("");

    const id = useParams().id;

    const promiseHandler = (callType, setStateType) => {
        callType.then((data) => {
            setStateType(data);
        })
    }

    useEffect(() => {
        promiseHandler(GetRoadmap(id), setRoadmap);
        promiseHandler(GetLoadedSkills(), setLoadedSkills);
        setIsLoading(false);

    }, []);

    const GetRoadmap = async (id) => {
        // 더미 데이터 용
        //return RoadmapDummyData.roadmaps[id - 1];

        // Server 용
        const roadmapForLoading = await axios.get(`http://localhost:9999/roadmap/one/${id}`)
        .then(async (res) => {
            const roadmap = await res.data.roadmap;
            setName(roadmap.name);
            setFramework(roadmap.framework);
            setComputerLanguage(roadmap.computerLanguage);
            setSkills(roadmap.skills);
            setImage(roadmap.imageSecureUrl);
            return roadmap;
        })
        .catch((err) => {
            return {};
        });
        return roadmapForLoading;
    }

    const GetLoadedSkills = async () => {
        const skillsForLoading = await axios.get("http://localhost:9999/skill/all")
        .then(async (res) => {
            const skills = await res.data.skills;
            setLoadedSkills(skills);
            return skills;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
        return skillsForLoading;
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
        await setAddingSkill(false);
    }

    const onEditSkill = async (e) => {
        e.preventDefault();
        setEditing(true);
        try
        {
            await axios.post(`http://localhost:9999/roadmap/edit/${id}`, {
                name: name,
                computerLanguage: computerLanguage,
                framework: framework,
                skills: skills,
                image: image,
                isChanged: isChanged
            })
            .then((res) => {
                const _id = res.data._id;
                window.location.replace(`/roadmap/${_id}`);
            })
            .catch((err) => {
                console.error(err);
                setEditing(false);
            })
        }
        catch(error)
        {
            console.error(error);
            setEditing(false);
        }
    }

    const handleImage = async (e) => {
        await setImageUploading(true);
        if(!isChanged)
        {
            setIsChanged(true);
        }
        const file = e.target.files[0];
        setFileToBase(file);
        await setImageUploading(false);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
        };
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
                            <h4>* 로드맵</h4>
                            <span className="text-muted">로드맵과 어울리는 이미지를 올려주세요</span>
                            <div>
                                {imageUploading ? (<></>) : (
                                    image && <img style={{width: "100%"}} src={image} alt="skill_image" />
                                )}
                            </div>
                            <div>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                />
                            </div>
                        </div>
                    </div>
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
                        <button className="btn btn-primary w-100" disabled={editing} onClick={onEditSkill}>
                            Edit Roadmap
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default EditRoadmap;