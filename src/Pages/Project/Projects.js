import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import ProjectsDummyData from "../../DummyData/Projects.json";
import ProjectCards from "../../Components/Cards/Cards/ProjectCards";
import BuildTeam from "../../assets/images/BuildTeam.svg";

import { LoginModal } from "../../Components/Modal/LoginModal";

const Projects = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(GetProjects());
    setIsLoading(false);
  }, [isLoggedIn]);

  const GetProjects = () => {
    return ProjectsDummyData.projects;
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div class="page-header-ui-content pt-5">
          <div class="container px-5">
            <div class="row gx-5 align-items-center">
              <div class="col-lg-6" data-aos="fade-up">
                <h1 class="page-header-ui-title">
                  팀을 구해 사이드 프로젝트를 <br /> 진행하세요!
                </h1>
                <p class="page-header-ui-text mb-5">
                  CampusCrew는 다양한 사이드프로젝트 추천과 로드맵을 함께
                  제공해드립니다.
                </p>
                원하시는 주제가 없나요?
                <div class="d-flex flex-column flex-sm-row">
                  {isLoggedIn ? (
                    <>
                      <a
                        class="btn btn-lg btn-primary fw-500 me-sm-3 mb-3 mb-sm-0"
                        href="/create/project"
                      >
                        팀 만들기
                        <i class="ms-2" data-feather="arrow-right"></i>
                      </a>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        팀 만들기
                      </button>
                      <LoginModal />
                    </>
                  )}
                </div>
              </div>
              <div
                class="col-lg-6 d-none d-lg-block"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img class="img-fluid" src={BuildTeam} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <ProjectCards projects={projects} />
      </div>
    );
  }
};

export default Projects;
