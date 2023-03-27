import React, { useEffect, useState } from "react";
import { NameInput, ReferenceInput } from "../../Components/Inputs/Input";
import { StudyTip } from "../../Components/Inputs/Textarea";
import ReferenceList from "../../Components/List/ReferenceList";
import Loading from "../Loading";

import axios from "axios";

const CreateSkill = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ studyTip, setStudyTip ] = useState("");
    const [ references, setReferences ] = useState([]);

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
        if(name === "" || studyTip === "" || references.length === 0)
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
                    image
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

    
    
    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div className="container px-5">
                <div className="text-uppercase-expanded small mb-2 pt-5">
                    <h4>* 스킬 이미지</h4>
                    <span className="text-muted">스킬과 어울리는 이미지를 올려주세요</span>
                    <div>
                        {imageUploading ? (<></>) : (
                            image && <img src={image} alt="skill_thumbnail" />
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
                        <h4>* 스킬 이름</h4>
                        <span className="text-muted">연구해야 할 스킬 이름을 적어주세요</span>
                    </div>
                    <NameInput 
                        name={name}
                        onChangeName={onChangeName}
                        disabled={creating}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 스킬 연마 방법</h4>
                        <span className="text-muted">스킬을 연구하는 방법에 대해 알려주세요</span>
                    </div>
                    <StudyTip 
                        studyTip={studyTip}
                        disabled={creating}
                        onChangeStudyTip={onChangeStudyTip}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 스킬 연마 참고 자료</h4>
                    </div>
                    <div>
                        <ReferenceList 
                            addingReference={addingReference}
                            references={references}
                        />
                    </div>
                    <div className="mt-2">
                        <ReferenceInput 
                            creating={creating}
                            references={references}
                            setAddingReference={setAddingReference}
                        />
                    </div>
                </div>
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