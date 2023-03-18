import React, { useState } from "react";

const ReferenceListElement = ({
    index,
    reference,
    onDeleteChampion
}) => {
    return(
        <div>
            <div>
                <a href={reference} key={index}>
                    {reference}
                </a>
            </div>
            <div>
                <button value={index} onClick={onDeleteChampion}>
                    삭제
                </button>
            </div>
        </div>
    )
}

const ReferenceList = ({
    references,
    addingReference
}) => {

    const [deleting, setDeleting ] = useState(false);
    
    const onDeleteChampion = async (e) => {
        e.preventDefault();
        await setDeleting(true);
        references.splice(parseInt(e.target.value), 1);
        await setDeleting(false);
    }

    if(references.length == 0)
    {
        return(<></>)
    }
    else
    {
        if(addingReference)
        {
            return(
                <div>
                    Adding..
                </div>
            )
        }
        else
        {
            return(references.map((reference, index) => {
                return(
                    <ReferenceListElement 
                        key={index}
                        index={index}
                        reference={reference}
                        onDeleteChampion={onDeleteChampion}
                    />
                )
            }))
        }
    }
}

export default ReferenceList;