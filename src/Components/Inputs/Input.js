import { useState } from "react";

export const TitleInput = ({
    title,
    onChangeTitle
}) => {
    return(
        <input 
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
        />
    )
}

export const NameInput = ({
    name,
    onChangeName
}) => {
    return(
        <input 
            type="text"
            value={name}
            onChange={onChangeName}
            placeholder="이름 입력"
        />
    )
}



export const ReferenceInput = ({
    references,
    setAddingReference
}) => {
    const [ reference, setReference ] = useState("");
    
    const onChangeReference = (e) => {
        setReference(e.target.value);
    }

    const onAddReference = async (e) => {
        e.preventDefault();
        await setAddingReference(true);
        if(reference !== "")
        {
            
            references.push(reference);
            setReference("");
        }
        await setAddingReference(false);
    }

    return(
        <div>
            <div>
                <input 
                    type="text"
                    name="reference"
                    value={reference}
                    onChange={onChangeReference}
                />
            </div>
            <div>
                <button onClick={onAddReference}>
                    +
                </button>
            </div>
        </div>
    )
}



export const RoadmapInput = ({
    curriculums
}) => {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ references, setReferences ] = useState([]);
    
    const onChangeTitle = () => {

    }

    const onChangeDescription = () => {

    }

    

}