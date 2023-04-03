import React, { useEffect, useState } from "react";
import { SUB_BACK_URL } from "../../Components/Constants/URL";

import axios from "axios";
import Loading from "../Loading";

import { 
    FieldLists
} from "../../Components/Constants/Lists";
import { CreateImageSection, CreateNameSection, CreateReferences, CreateRepresentationInputs, CreateSkillTree } from "../../Components/Sections/CreateSection";
import { CreateRoadmapFieldSelectTag } from "../../Components/Inputs/Select";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ deletingSkill, setDeletingSkill ] = useState(false);
    const [ addingSkill, setAddingSkill ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);
    const [ selectedField, setSelectedField ] = useState("");

    const [ image, setImage ] = useState(null);

    const [ name, setName ] = useState("");
    const [ skills, setSkills ] = useState([]);
    const [ loadedSkills, setLoadedSkills ] = useState([]);
    
    const [ framework, setFramework ] = useState("");
    const [ computerLanguage, setComputerLanguage ] = useState("");
    const [ references, setReferences ] = useState([]);


    const promiseHandler = (callType, setStateType) => {
        callType.then((data) => {
            setStateType(data);
        })
    }

    useEffect(() => {
        promiseHandler(GetLoadedSkills(), setLoadedSkills);
        setSelectedField(FieldLists[0]);
        setIsLoading(false);
        
    }, []);

    const GetLoadedSkills = async () => {
        // 더미 데이터
        //return SkillsDummyData.skills;

        // 서버를 통해 받아오기
        const skillsForLoading = await axios.get(`${SUB_BACK_URL}/skill/all`)
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
        setCreating(true);

        await axios.post(`${SUB_BACK_URL}/field/create`, {
            fieldName: selectedField,
            name: name
        })
        .then(async (res) => {
            const field = res.data.field;
            await axios.post(`${SUB_BACK_URL}/roadmap/create`, {
                name: name,
                skills: skills,
                framework: framework,
                computerLanguage: computerLanguage,
                field: field,
                references: references,
                image: image
            })
            .then((res) => {
                window.location.replace(`/roadmap/${res.data._id}`);
            })
            .catch((err) => {
                console.error(err);
                setCreating(false);
            })
        })
        .catch((err) => {
            console.error(err);
            setCreating(false);
        })
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

    const onChangeSelectedField = (e) => {
        setSelectedField(e.target.value);
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
                        <div className="row">
                            <div className="col-md-6">
                                <CreateImageSection 
                                    title={"* 로드맵 사진"}
                                    description={"개발 로드맵과 관련된 사진을 업로드 하세요."}
                                    imageUploading={imageUploading}
                                    creating={creating}
                                    handleImage={handleImage}
                                    image={image}
                                />
                            </div>
                            <div className="col-md-6">

                                <CreateNameSection
                                    title={"* 로드맵 이름"}
                                    description={"개발 분야 이름을 적어주세요"}
                                    name={name}
                                    creating={creating}
                                    onChangeName={onChangeName}
                                />
                                <CreateRoadmapFieldSelectTag 
                                    editMode={false}
                                    selectedField={FieldLists[0]}
                                    creating={creating}
                                    onChangeSelectedField={onChangeSelectedField}
                                />
                                <CreateRepresentationInputs 
                                    computerLanguage={computerLanguage}
                                    framework={framework}
                                    onChangeFramework={onChangeFramework}
                                    onChangeComputerLanguage={onChangeComputerLanguage}
                                />
                                <CreateReferences
                                    title={"* 로드맵 참고 자료"}
                                    description={"로드맵을 위해 참고 자료를 공유해 주세요"}
                                    addingReference={addingReference}
                                    creating={creating}
                                    references={references}
                                    setAddingReference={setAddingReference}
                                />
                            </div>
                        </div>
                        <div className="border-top mt-5">
                            <CreateSkillTree
                                title={"* 로드맵 스킬 트리"}
                                description={"해당 직업을 얻기 위해 필요한 스킬을 추가하세요"}
                                addingSkill={addingSkill}
                                deletingSkill={deletingSkill}
                                loadedSkills={loadedSkills}
                                onAddSkill={onAddSkill}
                                setDeletingSkill={setDeletingSkill}
                                skills={skills}
                            />
                        </div>

                        <div className="mb-2 pt-5">
                            <button className="btn btn-primary w-100" onClick={onClickRoadmap} disabled={creating}>
                                로드맵 추가하기
                            </button>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default CreateRoadmap;