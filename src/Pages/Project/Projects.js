import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import ProjectsDummyData from "../../DummyData/Projects.json";

const Projects = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ generating, setGenerating ] = useState(false);
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        if(GetProjects())
        {
            setProjects(GetProjects());
            setIsLoading(false);
        }
    }, []);

    const GetProjects = () => {
        return ProjectsDummyData.projects;
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div>
                <div>
                    <a href="/create/project">
                        사이드 프로젝트 만들기
                    </a>
                </div>
                {projects.map((projectEle, index) => {
                    return(
                        <div key={index}>
                            {projectEle.title}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Projects;