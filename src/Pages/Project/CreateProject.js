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
            <>
                <div>
                    <TitleInput 
                        title={title}
                        onChangeTitle={onChangeTitle}
                    />
                </div>
                <div>
                    <DescriptionInput 
                        description={description}
                        onChangeDescription={onChangeDescription}
                    />
                </div>
                <div>
                    <DatePicker 
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                    />
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
            </>
        )
    }
}

export default CreateProject;