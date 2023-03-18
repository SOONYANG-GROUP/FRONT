import React, { useState } from "react";

const FieldListElement = ({
    index,
    field,
    onDeleteField
}) => {
    return(
        <div key={index}>
            <p>
                {field.field}
            </p>
            <p>
                {field.detailField}
            </p>
            <div>
                <button value={index} onClick={onDeleteField}>
                    삭제
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