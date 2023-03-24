import React, { useState, useEffect } from "react";
import ProjectCards from "../Components/Cards/Cards/ProjectCards";
import ProjectsDummyData from "../DummyData/Projects.json";
import TeamProject from "../assets/images/TeamProject.svg";

import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState();

  useEffect(() => {
    const fetch = () => {
      setProjects(ProjectsDummyData.projects);
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  } else if (!isLoading) {
    return (
      <>
        <div className="page-header-ui-content pt-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6" data-aos="fade-up">
                <h1 className="page-header-ui-title">이론보다는 실전!</h1>
                <p className="page-header-ui-text mb-5">
                  CampusCrew는 다양한 사이드프로젝트 추천과 로드맵을 함께
                  제공해드립니다.
                </p>
                <div className="d-flex flex-column flex-sm-row">
                  <a
                    className="btn btn-lg btn-soft fw-500 text-primary me-sm-3 mb-3 mb-sm-0"
                    href="/projects"
                  >
                    프로젝트 확인하러가기
                    <i className="ms-2" data-feather="arrow-right"></i>
                  </a>
                  <a
                    className="btn btn-lg btn-primary-soft text-primary fw-500"
                    href="/roadmaps"
                  >
                    로드맵 확인하러가기
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 d-none d-lg-block"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img className="img-fluid" src={TeamProject} alt="..." />
              </div>
            </div>
          </div>
        </div>

        <section className="bg-light py-10" id="explore">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8">
                <div className="text-center mb-10">
                  <div className="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
                    완성된 프로젝트들을 눈으로 직접 확인하세요
                  </div>
                  <h2>최근 모집중인 프로젝트</h2>
                  <p className="lead">
                    해당 프로젝트들을 참여해 새로운 스킬를 얻으세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ProjectCards projects={projects} flag={2} />
        </section>

        <section className="bg-white py-10 mt-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-8">
                <div className="text-center mb-10">
                  <h2>Campus Crew 현황</h2>
                  <p className="lead">
                    해당 사이트를 이용하시는 유저분들, 진행중인 프로젝트, <br />
                    완료된 프로젝트의 수를 확인하세요.
                  </p>
                </div>
              </div>
            </div>
            <div className="row gx-5">
              <div className="col-lg-4 text-center mb-5">
                <div className="display-1 fw-700 text-gray-400">00+</div>
                <div className="h5">현재 가입된 유저의 수</div>
              </div>
              <div className="col-lg-4 text-center mb-5">
                <div className="display-1 fw-700 text-gray-400">00+</div>
                <div className="h5">진행중인 사이드 프로젝트의 수</div>
              </div>
              <div className="col-lg-4 text-center mb-5">
                <div className="display-1 fw-700 text-gray-400">00+</div>
                <div className="h5">완료된 프로젝트의 수</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-center mb-10">
                <p className="lead">
                  회원 가입을 완료 후 멋진 팀원들과 함께 하세요.
                </p>
              </div>
              <a className="btn btn-primary fw-500" href="#!">
                회원등록하기
              </a>
            </div>
          </div>
          <div className="svg-border-rounded text-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 144.54 17.34"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
            </svg>
          </div>
        </section>
      </>
    );
  }
};

export default Home;
