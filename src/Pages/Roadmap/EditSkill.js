import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loading";
import axios from "axios";
import { CreateDownloadLibrary, CreateHelloWorld, CreateImageSection, CreateNameSection, CreateReferences } from "../../Components/Sections/CreateSection";
import { SkillCategorySelectTag } from "../../Components/Inputs/Select";

const EditSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ editing, setEditing ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    
    const [ skill, setSkill ] = useState(null);
    const [ name, setName ] = useState('');
    const [ references, setReferences ] = useState([]);

    const [ image, setImage ] = useState(false);
    const [ isChanged, setIsChanged ] = useState(false);
    const [ category, setCategory ] = useState("컴퓨터 언어");
    const [ helloworld, setHelloworld ] = useState("");
    const [ downloadLibrary, setDownloadLibrary ] = useState("");

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
            setReferences(skill.references);
            setImage(skill.imageSecureUrl);
            setCategory(skill.category);
            setHelloworld(skill.helloworld);
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
            if(name === "" || references.length === 0 || image === null)
            {
                setEditing(false);
            }
            else
            {
                await axios.post(`http://localhost:9999/skill/edit/${id}`, {
                    name,
                    references,
                    isChanged,
                    image,
                    category,
                    helloworld,
                    
                })
                .then((res) => {
                    const _id = res.data._id;
                    window.location.replace(`/skill/${_id}`);
                })
                .catch((err) => {
                    console.error(err);
                    setEditing(false);
                });
            }
        }
        catch(error)
        {
            console.error(error);
            setEditing(false);
        }
    }

    const onClickSkillCategory = (e) => {
        setHelloworld("");
        if(e.target.id === "computerLanguage")
        {
            setCategory("컴퓨터 언어");
        }
        else if(e.target.id === "library")
        {
            setCategory("라이브러리");
        }
    }

    const onChangeHelloworld = (e) => {
        setHelloworld(e.target.value);
    }

    const onChangeDownloadLibrary = (e) => {
        setDownloadLibrary(e.target.value);
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
                    <CreateImageSection 
                        title={"* 스킬 사진"}
                        description={"스킬과 어울리는 사진을 올려주세요"}
                        imageUploading={imageUploading}
                        image={image}
                        handleImage={handleImage}
                        creating={editing}
                    />
                    <CreateNameSection 
                        title={"* 스킬 이름"}
                        description={"연구해야 할 스킬 이름을 적어주세요"}
                        name={name}
                        onChangeName={onChangeName}
                        creating={editing}
                    />
                    <SkillCategorySelectTag 
                        category={category}
                        onClickSkillCategory={onClickSkillCategory}
                    />
                    {category === "컴퓨터 언어" ? (
                        <CreateHelloWorld 
                            title={"* Hello World 작성하기"}
                            helloworld={helloworld}
                            creating={editing}
                            onChangeHelloworld={onChangeHelloworld}
                        />
                    ) : (<></>)}
                    {category === "라이브러리" ? (
                        <CreateDownloadLibrary
                            creating={editing}
                            downloadLibrary={downloadLibrary}
                            onChangeDownloadLibrary={onChangeDownloadLibrary}
                        />
                    ) : (<></>)}
                    <CreateReferences 
                        title={"* 스킬 연마 참고 자료"}
                        description={"스킬 연마에 도움이 되는 자료를 공유해 주세요"}
                        addingReference={addingReference}
                        references={references}
                        creating={editing}
                        setAddingReference={setAddingReference}
                    />
                    <div className="mt-2">
                        <button 
                            className="btn btn-primary w-100" 
                            disabled={editing}
                            onClick={onEditSkill}
                        >
                            스킬 연구 고치기
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default EditSkill;