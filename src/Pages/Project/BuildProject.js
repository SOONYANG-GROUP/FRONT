import React, { useEffect, useState } from "react";
import { DescriptionInput, RegionInput, TechInput, TitleInput } from "../../Components/Inputs";
import RecruitsSelectTag from "../../Components/Recruits";
import Loading from "../Loading";


const BuildProject = () => {
    const buildSelectedList = [
        "프론트엔드 개발",
        "백엔드 개발"
    ];
    
    const [ isLoading, setIsLoading ] = useState(true);
    const [ building, setBuilding ] = useState(false);
    const [ addingRecruits, setAddingRecruits ] = useState(false);
    const [ addingTech, setAddingTech ] = useState(false);
    const [ errorStatus, setErrorStatus ] = useState(false);

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ imageId, setImageId ] = useState("");
    const [ imageUrl, setImageUrl ] = useState("");
    const [ tech, setTech ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ region, setRegion ] = useState("온라인/오프라인 모두 가능")
    const [ detailSelectedElement, setDetailSelectedElement] = useState("웹 프론트");

    const [ recruits, setRecruits ] = useState([]);
    const [ techs, setTechs ] = useState([]);
    const [ selectedElement, setSelectedElement ] = useState(buildSelectedList[0]);

    const [ theNumberOfRecruit, setTheNumberOfRecruit ] = useState(1);

    let _id = 0;
    let [ totalNumberOfRecruits, setTotalNumberRecruits ] = useState(0);
    
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeRegion = (e) => {
        setRegion(e.target.value);
    }

    const onClickRecruits = async (e) => {
        e.preventDefault();
        await setAddingRecruits(true);
        let result = totalNumberOfRecruits + parseInt(theNumberOfRecruit)
        if(result < 5)
        {
            let isExisted = false;
            recruits.forEach((element) => {
                if(element.detailSelectedElement == detailSelectedElement)
                {
                    isExisted = true;
                }
            });
            if(!isExisted)
            {
                let element = {
                    _id,
                    selectedElement,
                    detailSelectedElement,
                    theNumberOfRecruit: parseInt(theNumberOfRecruit)
                };
                _id += 1;
                setTotalNumberRecruits(result);
                recruits.push(element);
            }
            else
            {
                setErrorStatus(true);
                setErrorMessage("초과입니다.")
            }
        }
        else
        {
            setErrorStatus(true);
            setErrorMessage("4명 초과입니다. 원활한 진행을 위해 4명 이하로 팀을 구성하세요.")
        }
        await setAddingRecruits(false);
    }

    const onDeleteRecruit = async (e) => {
        e.preventDefault();
        await setAddingRecruits(true);
        recruits.forEach(element => {
            if(element._id == parseInt(e.target.value))
            {
                recruits.splice(recruits.indexOf(parseInt(e.target.value)));
            }
        });
        setTotalNumberRecruits(totalNumberOfRecruits - 1);
        if(totalNumberOfRecruits < 5)
        {
            setErrorStatus(false);
            setErrorMessage("");
        }
        await setAddingRecruits(false);
    }

    const onChangeTech = (e) => {
        setTech(e.target.value);
    }

    const onClickTech = async (e) => {
        e.preventDefault();
        await setAddingTech(true);
        techs.push(tech);
        setTech("");
        await setAddingTech(false);
    }

    const onDeleteTech = async (e) => {
        e.preventDefault();
        await setAddingTech(true);
        techs.splice(techs.indexOf(e.target.value), 1)
        await setAddingTech(false);
    }

    const onCloseError = (e) => {
        e.preventDefault();
        setErrorStatus(false);
        setErrorMessage("");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await setBuilding(true);
        
        
        
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        if(building)
        {
            return(<> Building </>)
        }
        else
        {
            return(
                <>
                    <div>
                        <TitleInput title={title} onChangeTitle={onChangeTitle} />
                    </div>
                    <div>
                        <div>
                            <RecruitsSelectTag 
                                recruits={recruits} 
                                selectedElement={selectedElement}
                                detailSelectedElement={detailSelectedElement}
                                theNumberOfRecruit={theNumberOfRecruit}
                                buildSelectedList={buildSelectedList}
                                setTheNumberOfRecruit={setTheNumberOfRecruit} 
                                setSelectedElement={setSelectedElement}
                                setDetailSelectedElement={setDetailSelectedElement}
                            />
                        </div>
                        <div>
                            {addingRecruits ? (<>add</>) : (
                                recruits.map((recruit, index) => {
                                    return(
                                        <div key={index}>
                                            <div>
                                            {recruit.selectedElement}
                                            {recruit.detailSelectedElement}
                                            {recruit.theNumberOfRecruit}    
                                            </div>
                                            <div>
                                                <button value={recruit._id} onClick={onDeleteRecruit}>
                                                    요소 삭제
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            {errorStatus ? (<>
                                <img 
                                    src="https://ext.fmkorea.com/files/attach/new/20180329/4180795/959220363/997160609/669ee8db09e076447d2c98a3343d267b.jpg"
                                />
                            </>) : (<></>)}
                        </div>
                        <div>
                            <button onClick={onClickRecruits}>추가</button>
                        </div>
                    </div>
                    <div>
                        <RegionInput 
                            onChangeRegion={onChangeRegion}
                        />
                    </div>
                    <div>
                        <DescriptionInput description={description} onChangeDescription={onChangeDescription} />
                    </div>
                    <div>
                        <div>
                            <TechInput 
                                tech={tech}
                                onChangeTech={onChangeTech}
                            />
                        </div>
                        <div>
                            <button onClick={onClickTech}>
                                Tech 추가
                            </button>
                        </div>
                    </div>
                    <div>
                        {addingTech ? (<></>) : (
                            techs.map((techElement, index) => {
                                return(
                                    <div>
                                        <div>
                                            <p key={index}>
                                                {techElement}
                                            </p>
                                        </div>
                                        <div>
                                            <button value={techElement} onClick={onDeleteTech}>
                                                요소 삭제
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <div>
                        <button onClick={onSubmit}>
                            제출 하기
                        </button>
                    </div>
                </>
            )
        }
    }
}

export default BuildProject;