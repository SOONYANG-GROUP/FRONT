import React, { useEffect, useState } from "react";
import { CreateDownloadLibrary, CreateHelloWorld, CreateImageSection, CreateNameSection, CreateReferences } from "../../Components/Sections/CreateSection";

import Loading from "../Loading";

import axios from "axios";
import { SkillCategorySelectTag } from "../../Components/Inputs/Select";
import { SUB_BACK_URL } from "../../Components/Constants/URL";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ references, setReferences ] = useState([]);
    const [ helloworld, setHelloworld ] = useState("");
    const [ category, setCategory ] = useState("컴퓨터 언어");
    const [ downloadLibrary, setDownloadLibrary ] = useState("");

    const onChangeHelloworld = (e) => {
        setHelloworld(e.target.value);
    }

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeName = (e) => {
        setName(e.target.value);
    }


    const onCreateSkill = async (e) => {
        e.preventDefault();
        await setCreating(true);
        if(name === "" || references.length === 0 || image === null)
        {
            await setCreating(false);
        }
        else
        {
            try
            {
                await axios.post(`${SUB_BACK_URL}/skill/create`, {
                    name,
                    references,
                    image,
                    helloworld,
                    category,
                    downloadLibrary
                }, {})
                .then((res) => {
                    const _id = res.data._id;
                    window.location.replace(`/skill/${_id}`);
                })
                .catch((err) => {
                    console.error(err);
                })
            }
            catch(error)
            {
                console.error(error);
            }
        }
        await setCreating(false);
    }

    const handleImage = async (e) => {
        await setImageUploading(true);
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

    const onClickSkillCategory = (e) => {
        if(e.target.id === "computerLanguage")
        {
            setHelloworld("");
            setDownloadLibrary("");
            setCategory("컴퓨터 언어");
        }
        else if(e.target.id === "library")
        {
            setHelloworld("");
            setDownloadLibrary("");
            setCategory("라이브러리")
        }
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
        return(
            <div className="container px-5">
                <CreateImageSection 
                    title={"* 스킬 사진"}
                    description={"스킬과 어울리는 사진을 올려주세요"}
                    imageUploading={imageUploading}
                    image={image}
                    handleImage={handleImage}
                />
                <CreateNameSection 
                    title={"* 스킬 이름"}
                    description={"연구해야 할 스킬 이름을 적어주세요"}
                    name={name}
                    onChangeName={onChangeName}
                    creating={creating}
                />
                <SkillCategorySelectTag 
                    category={category}
                    onClickSkillCategory={onClickSkillCategory}
                />
                {category === "컴퓨터 언어" ? (
                    <CreateHelloWorld 
                        title={"Hello World 작성하기"}
                        helloworld={helloworld}
                        creating={creating}
                        onChangeHelloworld={onChangeHelloworld}
                    />
                ) : (<></>)}
                {category === "라이브러리" ? (
                    <CreateDownloadLibrary 
                        creating={creating}
                        downloadLibrary={downloadLibrary}
                        onChangeDownloadLibrary={onChangeDownloadLibrary}
                    />
                ) : (<></>)}
                <CreateReferences 
                    title={"* 스킬 연마 참고 자료"}
                    description={"스킬 연마에 도움이 되는 자료를 공유해 주세요"}
                    addingReference={addingReference}
                    references={references}
                    creating={creating}
                    setAddingReference={setAddingReference}
                />
                <div className="mb-2 pt-5" onClick={onCreateSkill}>
                    <button className="btn btn-primary w-100" disabled={creating}>
                        스킬 연구 추가하기
                    </button>
                </div>
            </div>
        )
    }
}


export default CreateSkill;