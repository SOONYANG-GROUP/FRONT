import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

import ProjectDummyData from "../../DummyData/Project.json";


const Project = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ project, setProject ] = useState([]);
    const id = useParams().id;

    useEffect(() => {
        if(setProject(GetProject(id)))
        {
            setProject(GetProject(id));
            setIsLoading(false);
        }
    }, [ id ]);

    const GetProject = (id) => {
        return ProjectDummyData.project;
    }

    if(isLoading)
    {
        return(
            <Loading />
        )
    }
    else
    {
        return(
            <></>
        );
    }
}

export default Project;