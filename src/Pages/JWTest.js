import React, { useEffect, useState } from "react";
import axios from "axios";
import { SUB_BACK_URL } from "../Components/Constants/URL";
import Loading from "./Loading";



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
        //promiseHandler(GetFields(), setFields);
        //setIsLoading(false);
    }, []);

    const GetFields = async () => {
        const result = await axios.get(`${SUB_BACK_URL}/field/all`)
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

    if(isLoading)
    {
        return(
            <div>
                <Loading />
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