import React, { useEffect, useState } from "react";
import { CreateHelloWorld, CreateImageSection, CreateNameSection, CreateReferences, CreateStudyTip } from "../../Components/Sections/CreateSection";

import Loading from "../Loading";

import axios from "axios";
import { SkillCategorySelectTag } from "../../Components/Inputs/Select";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ studyTip, setStudyTip ] = useState("");
    const [ references, setReferences ] = useState([]);
    const [ helloworld, setHelloworld ] = useState("");
    const [ category, setCategory ] = useState("컴퓨터 언어");

    const onChangeHelloworld = (e) => {
        setHelloworld(e.target.value);
    }

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeStudyTip = (e) => {
        setStudyTip(e.target.value);
    }

    const onCreateSkill = async (e) => {
        e.preventDefault();
        await setCreating(true);
        if(name === "" || studyTip === "" || references.length === 0 || image === null)
        {
            await setCreating(false);
        }
        else
        {
            try
            {
                await axios.post(`http://localhost:9999/skill/create`, {
                    name,
                    references,
                    studyTip,
                    image,
                    helloworld,
                    category
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
            setCategory("컴퓨터 언어");
        }
        else if(e.target.id === "library")
        {
            setCategory("라이브러리")
        }
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
                <CreateStudyTip 
                    title={"* 스킬 연마 방법"}
                    description={"스킬을 연구하는 방법에 대해 알려주세요"}
                    studyTip={studyTip}
                    creating={creating}
                    onChangeStudyTip={onChangeStudyTip}
                />
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