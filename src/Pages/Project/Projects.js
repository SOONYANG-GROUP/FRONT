import React, { useEffect, useState } from "react";
import useSyncExternalStore from "react";
import Loading from "../Loading";

import ProjectsDummyData from "../../DummyData/Projects.json";
import ProjectCards from "../../Components/Cards/Cards/ProjectCards";
import BuildTeam from "../../assets/images/BuildTeam.svg";

import { LoginModal } from "../../Components/Modal/LoginModal";

import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";

const Projects = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [projects2, setProjects2] = useState();
  const [recruitingProjects, setRecruitingProject] = useState([]);
  const [runningProjects, setRunningProjects] = useState([]);
  const [endProjects, setEndProjects] = useState([]);
  const categorizeProjects = () => {
    setRecruitingProject(
      projects2?.filter((item) => item.status === "READY") || []
    );
    setRunningProjects(
      projects2?.filter((item) => item.status === "RUNNING") || []
    );
    setEndProjects(projects2?.filter((item) => item.status === "END") || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/projects`);
        console.log(res.data);
        setProjects2(res.data.homeCardDtos);
        setIsLoading(false);
        return res;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    categorizeProjects();
  }, [projects2]);

  if (isLoading) {
    return <Loading />;
  } else if (projects2 && !isLoading) {
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
        {recruitingProjects.length > 0 ? (
          <>
            <section className="bg-light py-10" id="explore">
              <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                  <div className="col-lg-8">
                    <div className="text-center mb-10">
                      <div className="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
                        모집 중인 분야를 확인 후 지원해주세요.
                      </div>
                      <h2>현재 모집중인 프로젝트</h2>
                      <p className="lead">프로젝트를 참여하고 완성 시키세요.</p>
                    </div>
                  </div>
                </div>
              </div>
              <ProjectCards projects={recruitingProjects} />
            </section>
          </>
        ) : (
          <></>
        )}

        {runningProjects.length > 0 ? (
          <>
            <section className="bg-light py-10" id="explore">
              <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                  <div className="col-lg-8">
                    <div className="text-center mb-10">
                      <div className="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
                        진행 중인 프로젝트 입니다.
                      </div>
                      <h2>현재 진행 중인 프로젝트</h2>
                      <p className="lead">프로젝트가 진행중입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
              <ProjectCards projects={runningProjects} />
            </section>
          </>
        ) : (
          <></>
        )}

        {endProjects.length > 0 ? (
          <>
            <section className="bg-light py-10" id="explore">
              <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                  <div className="col-lg-8">
                    <div className="text-center mb-10">
                      <div className="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
                        종료된 프로젝트입니다.
                      </div>
                      <h2>완료된 프로젝트</h2>
                      <p className="lead">프로젝트가 완료되었습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
              <ProjectCards projects={endProjects} />
            </section>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default Projects;
