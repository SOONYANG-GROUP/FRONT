import React, { useEffect, useState } from "react";

import { 
    FrontendFieldLists,
    BackendFieldLists,
    SecurityFieldLists

} from "../Components/Constants/Lists";

import axios from "axios";



const JWTest = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fields, setFields ] = useState([]);
    const [ frontendFieldLists, setFrontendFieldLists ] = useState([]);
    const [ backendFieldLists, setBackendFieldLists] = useState([]);
    const [ securityFieldLists, setSecurityFieldLists ] = useState([]);

    const promiseHandler = (callType, setStateType) => {
        callType.then((data) => {
            setStateType(data);
        })
    }

    useEffect(() => {
        promiseHandler(GetFields(), setFields);
        setIsLoading(false);
    }, []);

    const GetFields = async () => {
        const result = await axios.get("http://localhost:9999/field/all")
        .then((res) => {
            setFrontendFieldLists(res.data.fields.filter((field) => field.name === "프론트 엔드"));
            setBackendFieldLists(res.data.fields.filter((field) => field.name === "백 엔드"));
            setSecurityFieldLists(res.data.fields.filter((field) => field.name === "해킹 및 보안"));
            return res.data.fields;
        })
        .catch((err) => {
            return [];
        });
        return result;
    }

    console.log(FrontendFieldLists());
    console.log(BackendFieldLists());
    console.log(SecurityFieldLists());

    if(isLoading)
    {
        return(
            <div>
                Loading
            </div>
        )
    }
    else
    {
        return(
            <div>

            </div>
        )
    }
}

export default JWTest;