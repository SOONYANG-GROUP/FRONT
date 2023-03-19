import React, { useState } from "react";

const FieldListElement = ({
    index,
    field,
    onDeleteField
}) => {
    return(
        <div key={index} className="row mb-2">
            <div className="col-3">
                <select className="form-select" disabled>
                    <option>{field.field}</option>
                </select>
            </div>
            <div className="col-7">
                <select className="form-select" disabled>
                    <option>{field.detailField}</option>
                </select>
            </div>
            <div className="col">
                <button className="btn btn-danger" value={index} onClick={onDeleteField}>
                    <span><i className="fa-solid fa-trash"></i></span>
                </button>
            </div>
        </div>
    )
}

const FieldList = ({
    fields,
    totalFieldsNumber,
    setTotalFieldsNumber
}) => {
    
    const [ deleting, setDeleting ] = useState(false);
    
    const onDeleteField = async (e) => {
        e.preventDefault();
        await setDeleting(true);
        fields.splice(parseInt(e.target.value), 1);
        setTotalFieldsNumber(totalFieldsNumber - 1);
        await setDeleting(false);
    }

    if(fields.length == 0)
    {
        return(<></>)
    }
    else
    {
        if(deleting)
        {
            return(<div>deleting</div>)
        }
        else
        {
            return(
                fields.map((fieldEle, index) => {
                    return(
                        <FieldListElement 
                            field={fieldEle}
                            key={index}
                            index={index}
                            onDeleteField={onDeleteField}
                        />
                    )
                })
            )
        }
    }
}

export default FieldList;