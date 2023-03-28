import { useState } from "react";

export const TitleInput = ({
    creating,
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
            className="form-control"
            disabled={creating}
            autoFocus
        />
    )
}

export const NameInput = ({
    disabled,
    nameLabel = "",
    name,
    onChangeName
}) => {
    return(
        <input 
            type="text"
            value={name}
            onChange={onChangeName}
            placeholder="이름 입력"
            id={nameLabel}
            className="form-control"
            disabled={disabled}
        />
    )
}



export const ReferenceInput = ({
    creating,
    referenceLabel,
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
        <div className="row">
            <div className="col-10">
                <input 
                    type="text"
                    name="reference"
                    value={reference}
                    onChange={onChangeReference}
                    id={referenceLabel}
                    placeholder="https://..."
                    className="form-control"
                    disabled={creating}
                />
            </div>
            <div className="col">
                <button onClick={onAddReference} className="btn btn-primary" disabled={creating}>
                    <span><i className="fa-solid fa-plus"></i></span>
                </button>
            </div>
        </div>
    )
}

