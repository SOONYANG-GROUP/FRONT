import React, { useEffect, useState } from "react";

const RecruitsSelectTag = ({ 
    buildSelectedList,
    selectedElement,
    theNumberOfRecruit,
    setTheNumberOfRecruit,
    setSelectedElement,
    setDetailSelectedElement
}) => {
    const frontendSelectedList = [
        "웹 프론트", "유니티", "언리얼", "IOS", "안드로이드" , "웹 퍼블리셔", "크로스 플랫폼", "임베디드 SW"
    ]
    const backendSelectedList = [
        "웹 서버", "블록 체인", "AI", "DB/빅데이터/DS", "게임 서버"
    ]
    useEffect(() => {
    }, [])
    
    const onChangeTheNumberOfRecruit = (e) => {
        setTheNumberOfRecruit(e.target.value);
    }

    const onChangeSelect = (e) => {
        setSelectedElement(e.target.value);
        if(e.target.value == buildSelectedList[0])
        {
            setDetailSelectedElement(frontendSelectedList[0])
        }
        else if(e.target.value == buildSelectedList[1])
        {
            setDetailSelectedElement(backendSelectedList[0])
        }
    }

    const onChangeDetailSelectedElement = (e) => {
        setDetailSelectedElement(e.target.value);
    }

    return(
        <div>
            <div>
                <select onChange={onChangeSelect}>
                    {buildSelectedList.map((buildSelectedElement, index) => {
                        return(
                            <option value={buildSelectedElement} key={index}>
                                {buildSelectedElement}                                
                            </option>
                        )
                    })}
                </select>
            </div>
            <div>
                {(selectedElement == buildSelectedList[0]) ? (
                    <select onChange={onChangeDetailSelectedElement}>
                        {frontendSelectedList.map((frontendSelectedElement, index) => {
                            return(
                                <option value={frontendSelectedElement} key={index}>
                                    {frontendSelectedElement}
                                </option>
                            )
                        })}
                    </select>
                ) : (<></>)}
                {(selectedElement == buildSelectedList[1]) ? (
                    <select onChange={onChangeDetailSelectedElement}>
                        {backendSelectedList.map((backendSelectedElement, index) => {
                            return(
                                <option value={backendSelectedElement} key={index}>
                                    {backendSelectedElement}
                                </option>
                            )
                        })}
                    </select>
                ) : (<></>)}
            </div>
            <div>
                <input 
                    type="number" 
                    min="1" 
                    max="5"
                    value={theNumberOfRecruit} 
                    onChange={onChangeTheNumberOfRecruit} 
                />
            </div>
            
        </div>
    )
}

export default RecruitsSelectTag;