import React, { useEffect, useState } from "react";
import { NameInput, ThumbnailImageInput } from "../../Components/Inputs/Input";
import SkillList from "../../Components/List/SkillList";
import SkillModalBtn from "../../Components/Modal/SkillModal";

import axios from "axios";
import SkillsDummyData from "../../DummyData/Skills.json";
import Loading from "../Loading";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ deletingSkill, setDeletingSkill ] = useState(false);
    const [ addingSkill, setAddingSkill ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    
    const [ image, setImage ] = useState(null);

    const [ name, setName ] = useState("");
    const [ skills, setSkills ] = useState([]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    
    const [ framework, setFramework ] = useState("");
    const [ computerLanguage, setComputerLanguage ] = useState("");
    

    const promiseHandler = (callType, setStateType) => {
        callType.then((data) => {
            setStateType(data);
        })
    }

    useEffect(() => {
        promiseHandler(GetLoadedSkills(), setLoadedSkills);
        setIsLoading(false);
        
    }, []);

    const GetLoadedSkills = async () => {
        // 더미 데이터
        //return SkillsDummyData.skills;

        // 서버를 통해 받아오기
        const skillsForLoading = await axios.get("http://localhost:9999/skill/all")
        .then(async (res) => {
            const skills = await res.data.skills;
            return skills;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });

        return skillsForLoading;
    }

    console.log(loadedSkills)

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

    const onClickRoadmap = async (e) => {
        e.preventDefault();
        await setCreating(true);

        if(name === "" || framework === "" || computerLanguage === "")
        {
            console.log("error");
        }
        else
        {
            await axios.post("http://localhost:9999/roadmap/create", {
                name,
                skills,
                framework,
                computerLanguage,
                image
            }, {})
            .then((res) => {
                const _id = res.data._id;
                window.location.replace(`/roadmap/${_id}`);
            })
            .catch((err) => {
                console.error(err);
            });
        }
        await setCreating(false);
    }

    const handleImage = async (e) => {
        await setImageUploading(true);
        const file = e.target.files[0];
        if(file !== undefined)
        {
            setFileToBase(file);
        }
        else
        {
            setImage(null);
        }
        await setImageUploading(false);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        console.log(`file: ${file}`)
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    
    
    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        if(creating)
        {
            return(
                <div>
                    Creating...
                </div>
            )
        }
        else
        {
            return(
                <>
                    <div className="container px-5">
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 로드맵 사진</h4>
                            <span className="text-muted">개발 로드맵과 관련된 사진을 업로드 하세요.</span>
                            <div>
                                {imageUploading ? (<></>) : (
                                    image && <img src={image} alt="roadmap_thumbnail" />
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
                            <button className="btn btn-primary w-100" onClick={onClickRoadmap} disabled={creating}>
                                Create Roadmap
                            </button>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default CreateRoadmap;