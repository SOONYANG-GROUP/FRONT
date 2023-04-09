import React, { useState, useEffect } from "react";
import ProjectCards from "../Components/Cards/Cards/ProjectCards";
import ProjectsDummyData from "../DummyData/Projects.json";
import TeamProject from "../assets/images/TeamProject.svg";
import axios from "axios";
import CurrentSituation from "../Components/CurrentSituation/CurrentSituation";
import Loading from "./Loading";
import { BACK_URL } from "../Components/Constants/URL";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState();
  const [projects2, setProjects2] = useState();
  const [userCounter, setUserCounter] = useState();
  const [runningProject, setRunningProject] = useState();
  const [recruitingProject, setRecruitingProject] = useState();
  const [recruitProject, setRecruitProject] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BACK_URL}/projects`);
        const { countDto, countUser, homeCardDtos } = data;

        const projectCounts = countDto.reduce(
          (acc, { status, count }) => {
            if (status === "READY") {
              acc.recruiting += count;
            } else if (status === "RUNNING") {
              acc.running += count;
            }
            return acc;
          },
          { recruiting: 0, running: 0 }
        );

        setRecruitingProject(projectCounts.recruiting);
        setRunningProject(projectCounts.running);
        setUserCounter(countUser);
        setProjects2(homeCardDtos);
        setRecruitProject(
          projects2?.filter((item) => item.status === "READY") || []
        );
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const categorizeProjects = () => {
    setRecruitProject(
      projects2?.filter((item) => item.status === "READY") || []
    );
  };
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      await setProjects(ProjectsDummyData.projects);
      await setIsLoading(false);
    };
    categorizeProjects();
    fetch();
  }, [projects2]);

  if (isLoading) {
    return <Loading />;
  } else if (!isLoading && recruitProject) {
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
                    className="btn btn-lg btn-soft fw-500 text-primary me-sm-3 mb-3 mb-sm-0 animate__animated animate__fadeInUp"
                    href="/projects"
                  >
                    프로젝트 확인하러가기
                    <i className="ms-2" data-feather="arrow-right"></i>
                  </a>
                  <a
                    className="btn btn-lg btn-primary-soft text-primary fw-500 animate__animated animate__fadeInUp"
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
          <ProjectCards projects={recruitProject} />
        </section>

        <CurrentSituation
          recruitingProject={recruitingProject}
          runningProject={runningProject}
          userCounter={userCounter}
        />
      </>
    );
  }
};

export default Home;
