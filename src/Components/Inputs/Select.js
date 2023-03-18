import { useState } from "react"
import { 
    FieldLists, 
    FrontendFieldLists,
    BackendFieldLists,
    SecurityFieldLists
} from "../Constants/Lists";

export const FieldSelectTag = ({
    totalFieldsNumber,
    setAddingField,
    setTotalFieldsNumber,
    fields
}) => {
    const [ field, setField ] = useState(FieldLists[0]);
    const [ detailField, setDetailField ] = useState(FrontendFieldLists[0]);

    const onChangeField = (e) => {
        setField(e.target.value);
    }

    const onChangeDetailField = (e) => {
        setDetailField(e.target.value);
    }

    const onAddField = async (e) => {
        e.preventDefault();
        await setAddingField(true);
        fields.push({
            field,
            detailField
        });
        await setTotalFieldsNumber(totalFieldsNumber + 1);
        await setAddingField(false);
    }


    return(
        <div>
            <div>
                <FieldSelect 
                    onChangeField={onChangeField}
                    totalFieldsNumber={totalFieldsNumber}
                />
            </div>
            <div>
                <DetailFieldSelect
                    detailField={detailField}
                    onChangeDetailField={onChangeDetailField}
                    totalFieldsNumber={totalFieldsNumber}
                />
            </div>
            <div>
                <button onClick={onAddField} disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}>
                    <p>
                        +
                    </p>
                </button>
            </div>
        </div>
    )
}

const FieldSelect = ({
    onChangeField,
    totalFieldsNumber
}) => {
    return(
        <select onChange={onChangeField} disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}>
            {FieldLists.map((FieldListEle, index) => {
                return(
                    <option value={FieldListEle} key={index}>
                        {FieldListEle}
                    </option>
                )
            })}        
        </select>
    )
}

const DetailFieldSelect = ({
    detailField,
    onChangeDetailField,
    totalFieldsNumber
}) => {
    if(detailField == FieldLists[0])
    {
        return(
            <select onChange={onChangeDetailField} disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}>
                {FrontendFieldLists.map((FrontendFieldEle, index) => {
                return(
                    <option value={FrontendFieldEle} key={index}>
                        {FrontendFieldEle}
                    </option>
                )
                })}
            </select>

        )
    }
    else if(detailField == FieldLists[1])
    {
        return(
            <select onChange={onChangeDetailField} disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}>
                {BackendFieldLists.map((BackendFieldEle, index) => {
                    return(
                        <option value={BackendFieldEle} key={index}>
                            {BackendFieldEle}
                        </option>
                    )
                })}
            </select>
        )
    }
    else if(detailField == FieldLists[1])
    {
        return(
            <select onChange={onChangeDetailField} disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}>
                {SecurityFieldLists.map((securityEle, index) => {
                    return(
                        <option value={securityEle} key={index}>
                            {securityEle}
                        </option>
                    )
                })}
            </select>
        )
    }
}