import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import ProjectsDummyData from "../../DummyData/Projects.json";
import ProjectCards from "../../Components/Cards/Cards/ProjectCards";
import BuildTeam from "../../assets/images/BuildTeam.svg";

import { LoginModal } from "../../Components/Modal/LoginModal";

import axios from "axios";

const Projects = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projects2, setProjects2] = useState();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://localhost:8080/projects")
        .then((res) => {
          console.log(res.data.homeCardDtos);
          setProjects2(res.data.homeCardDtos);
          setIsLoading(false);
          return res;
        })
        .catch((e) => {
          return e;
        });
    };
    fetch();
    setProjects(GetProjects());
    setGenerating(false);
  }, [isLoggedIn]);
  console.log(projects);
  const GetProjects = () => {
    // console.log(ProjectsDummyData.projects);
    setGenerating(true);
    return ProjectsDummyData.projects;
  };

  if (isLoading) {
    return <Loading />;
  } else {
    console.log(projects2);
    return (
      <div>
        <div className="page-header-ui-content pt-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6" data-aos="fade-up">
                <h1 className="page-header-ui-title">
                  팀을 구해 사이드 프로젝트를 <br /> 진행하세요!
                </h1>
                <p className="page-header-ui-text mb-5">
                  CampusCrew는 다양한 사이드프로젝트 추천과 로드맵을 함께
                  제공해드립니다.
                </p>
                원하시는 주제가 없나요?
                <div className="d-flex flex-column flex-sm-row">
                  {isLoggedIn ? (
                    <>
                      <a
                        className="btn btn-lg btn-primary fw-500 me-sm-3 mb-3 mb-sm-0"
                        href="/create/project"
                      >
                        팀 만들기
                        <i className="ms-2" data-feather="arrow-right"></i>
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
                className="col-lg-6 d-none d-lg-block"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img className="img-fluid" src={BuildTeam} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <ProjectCards projects={projects2} />
      </div>
    );
  }
};

export default Projects;
