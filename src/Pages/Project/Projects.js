import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import ProjectsDummyData from "../../DummyData/Projects.json";
import ProjectCards from "../../Components/Cards/Cards/ProjectCards";

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

                <div class="container my-5">
                    <div class="bg-light p-5 rounded">
                        <div class="col-sm-8 py-5 mx-auto">
                            <h1 class="display-5 fw-normal"><i className="fa-solid fa-code"></i> 어제보다 더 나은 개발자로 성장하세요</h1>
                            <p class="fs-5">
                                이론과 실전을 겸비한 뛰어난 개발자가 되기 위해 프로젝트에 신청하세요
                            </p>
                            <p>또는 열정있는 미래의 개발자들에게 기회를 주세요</p>
                            <p>
                                <a className="btn btn-primary" href="/create/roadmap" role="button">
                                    사이드 프로젝트 계획하기
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <ProjectCards 
                    projects={projects}
                />
            </div>
        )
    }
}

export default Projects;