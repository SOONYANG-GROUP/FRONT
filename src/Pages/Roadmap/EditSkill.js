import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StudyTip } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";

import Loading from "../Loading";

import SkillsDummyData from "../../DummyData/Skills.json";
import { NameInput, ReferenceInput } from "../../Components/Inputs/Input";
import axios from "axios";

const EditSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    
    const [ skill, setSkill ] = useState(null);
    const [ name, setName ] = useState('');
    const [ studyTip, setStudyTip ] = useState('');
    const [ references, setReferences ] = useState([]);

    const [ image, setImage ] = useState(false);
    const [ isChanged, setIsChanged ] = useState(false);

    const id = useParams().id;

    const promiseHandler = (callType, setStateType) => {
        callType.then((data) => {
            setStateType(data);
        })
    }

    useEffect(() => {
        promiseHandler(GetSkill(id), setSkill);
        setIsLoading(false);
    }, [ id ]);

    
    const GetSkill = async (id) => {
        const skillForLoading = await axios.get(`http://localhost:9999/skill/one/${id}`)
        .then(async(res) => {
            const skill = await res.data.skill;
            setName(skill.name);
            setStudyTip(skill.studyTip);
            setReferences(skill.references);
            setImage(skill.imageSecureUrl)
            return skill;
        })
        .catch((err) => {
            console.error(err);
            return null;
        })
        return skillForLoading;
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeStudyTip = (e) => {
        setStudyTip(e.target.value);
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

    const onEditSkill = async (e) => {
        e.preventDefault();
        setEditing(true);
        try
        {
            if(name === "" || studyTip === "" || references.length === 0 || image === null)
            {
                setEditing(false);
            }
            else
            {
                await axios.post(`http://localhost:9999/skill/edit/${id}`, {
                    name,
                    studyTip,
                    references,
                    image,
                    isChanged
                });
                
            }
        }
        catch(error)
        {
            console.error(error);
        }
        setEditing(false);
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        if(editing)
        {
            return(<div>Editing...</div>)
        }
        else
        {
            return(
                <div className="container px-5">
                    <div>
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 스킬 이미지</h4>
                            <span className="text-muted">스킬과 어울리는 이미지를 올려주세요</span>
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
                            <h4>* 스킬 이름</h4>
                            <span className="text-muted">연구해야 할 스킬 이름을 적어주세요</span>
                        </div>
                        <NameInput 
                            name={name}
                            onChangeName={onChangeName}
                            disabled={editing}
                        />
                    </div>
                    <div>
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 스킬 연구 방법</h4>
                            <span className="text-muted">스킬을 연구하는 방법에 대해 알려주세요</span>
                        </div>
                        <StudyTip
                            studyTip={studyTip}
                            disabled={editing}
                            onChangeStudyTip={onChangeStudyTip}
                        />
                    </div>
                    <div>
                        <div className="text-uppercase-expanded small mb-2 pt-5">
                            <h4>* 스킬 연구 참고 자료</h4>
                        </div>
                        <div>
                            <ReferenceList
                                addingReference={addingReference}
                                references={references}
                            />
                        </div>
                        <div className="mt-2">
                            <ReferenceInput 
                                creating={editing}
                                references={references}
                                setAddingReference={setAddingReference}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <button className="btn btn-primary w-100" disabled={editing}>
                            스킬 연구 고치기
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default EditSkill;