import React, { useEffect, useState } from "react";
import { TitleInput } from "../../Components/Inputs/Input";
import { FieldSelectTag } from "../../Components/Inputs/Select";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import FieldList from "../../Components/List/FieldList";
import Loading from "../Loading";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateProject = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ creating, setCreating ] = useState(false);
    const [ addingField, setAddingField ] = useState(false);

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date());
    const [ fields, setFields ] = useState([]);

    let [ totalFieldsNumber, setTotalFieldsNumber ] = useState(0); 

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }


    if(isLoading || creating)
    {
        return(isLoading ? (<Loading />) : (<></>))
    }
    else
    {
        return(
            <div className="container px-5">
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 사이드 프로젝트명</h4>
                        <span className="text-muted">직관적인 프로젝트명을 사용하면 클릭률이 올라갑니다</span>
                    </div>
                    <TitleInput 
                        title={title}
                        onChangeTitle={onChangeTitle}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 사이드 프로젝트 설명</h4>
                        <span className="text-muted">설명이 풍부할수록 프로젝트의 지원율이 높아집니다</span>
                    </div>
                    <DescriptionInput 
                        description={description}
                        onChangeDescription={onChangeDescription}
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 사이드 프로젝트 시작 기간</h4>
                        <span className="text-muted">더 빠른 시간에 시작할수록, 프로젝트 성공 확률이 높아집니다.</span>
                    </div>
                    <DatePicker 
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        className="form-control"
                    />
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 모집 인원</h4>
                        <span>최대 5명까지 지원이 가능합니다.</span>
                    </div>
                    <div>
                        <FieldList
                            fields={fields}
                            totalFieldsNumber={totalFieldsNumber}
                            setTotalFieldsNumber={setTotalFieldsNumber}
                        />
                    </div>
                    <div>
                        <FieldSelectTag 
                            setAddingField={setAddingField}
                            fields={fields}
                            totalFieldsNumber={totalFieldsNumber}
                            setTotalFieldsNumber={setTotalFieldsNumber}
                        />
                    </div>
                </div>
                <div>
                    <div className="text-uppercase-expanded small mb-2 pt-5">
                        <h4>* 참고 자료</h4>
                        <span>벤치마킹하는 서비스나, 프로젝트를 정리하신 자료의 웹주소를 등록해주세요.</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProject;