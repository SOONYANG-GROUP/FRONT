import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import { FRONT_URL } from "../../Constants/URL";

const ProjectCard = React.memo(({ project }) => {
  //********************************************************프로젝트 시작시간, 남은 모집 시간 계산********************************************************
  // console.log(project.title);
  // Set the recruitment date
  // const testDate = new Date(2021, 11, 23);
  // console.log(testDate, "테스트 날짜입니다.");
  const recruitmentDate = new Date(
    project.recruitmentDate[0],
    project.recruitmentDate[1] - 1,
    project.recruitmentDate[2]
  );
  // console.log(recruitmentDate);
  // console.log(`${recruitmentDate} recruitmentDate Time`);
  // Get the current date
  const currentDate = new Date();
  // console.log(`${currentDate} currentTimeDate time`);
  // Calculate the time difference in milliseconds
  const starttimeDiff = recruitmentDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const startdaysLeft = Math.ceil(starttimeDiff / (1000 * 60 * 60 * 24));

  const calEndDate = () => {
    const endDate = new Date(
      project.endDate[0],
      project.endDate[1] - 1,
      project.endDate[2]
    );
    const timeDiff = endDate.getTime() - currentDate.getTime();

    // Convert milliseconds to days
    const enddaysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return enddaysLeft;
  };

  // Output the number of days left
  // console.log(`There are ${daysLeft} days left until the recruitment date.`);

  // ****************************************************************************************************************************************************
  // ********************************************************총 모집 인원 및 현재 참가한 인원 *************************************************************
  const totalRecruit = useMemo(
    () => project.recruitUserDtos.reduce((acc, cur) => acc + cur.maxRecruit, 0),
    [project]
  );
  const currentRecruit = useMemo(
    () =>
      project.recruitUserDtos.reduce((acc, cur) => acc + cur.currentRecruit, 0),
    [project]
  );
  // ****************************************************************************************************************************************************

  if (!totalRecruit) {
    return null;
  }
  return (
    <div className="col-lg-4 mb-5 mt-3">
      <a
        className="card lift h-100 text-secondary shadow-sm p-3 bg-body-tertiary rounded"
        href={`${FRONT_URL}/project/${project.id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="card-body">
          <h3 className="text-primary mb-0 text-dark">{project.title}</h3>
          <div className="small text-gray-800 fw-500 mt-3">
            {project.recruitUserDtos[0].detailField} 외 {totalRecruit}명 모집 중
          </div>
          {project.status == "END" ? (
            <></>
          ) : (
            <>
              {project.endDate ? (
                <>
                  <div className="small text-gray-500">
                    남은 시간 {calEndDate()}일
                  </div>
                </>
              ) : (
                <>
                  <div className="small text-gray-500">
                    남은 시간 {startdaysLeft}일
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
          <div className="small text-gray-500">
            {project.status == "END" ? (
              <>
                모집 완료 {currentRecruit} / {totalRecruit}
              </>
            ) : (
              <>
                모집 중 {currentRecruit} / {totalRecruit}
              </>
            )}
          </div>
          <div className="small text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
});

const ProjectCards = ({ projects, flag }) => {
  const isLoading = useMemo(() => !projects, [projects]);
  const [page, setPage] = useState(1); // 현재 페이지 번호를 저장하는 state 변수
  const pageSize = 6; // 한 페이지에 보여줄 프로젝트 수

  const totalPages = Math.ceil(projects.length / pageSize); // 전체 페이지 수

  const start = (page - 1) * pageSize; // 현재 페이지에 해당하는 첫 번째 프로젝트 인덱스
  const end = start + pageSize; // 현재 페이지에 해당하는 마지막 프로젝트 인덱스

  const currentProjects = projects.slice(start, end); // 현재 페이지에 해당하는 프로젝트들

  const handleClickPrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleClickNext = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log(projects);
  if (projects.length === 0) {
    return (
      <>
        <div className="d-flex justify-content-center test-center mx-auto mb-5 p-5">
          <h3 style={{ opacity: 0.5 }}>현재 진행중인 프로젝트가 없습니다...</h3>
        </div>
      </>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="container px-5">
        <div className="d-flex align-items-center justify-content-between mb-4"></div>
        <div className="row gx-5">
          {currentProjects.map((project, index) => {
            return <ProjectCard project={project} key={index} />;
          })}
        </div>
      </div>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className={`page-item${page === 1 ? " disabled" : ""}`}>
            <button className="page-link" onClick={handleClickPrev}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <li
                className={`page-item${page === pageNum ? " active" : ""}`}
                key={index}
              >
                <button className="page-link" onClick={() => setPage(pageNum)}>
                  {pageNum}
                </button>
              </li>
            );
          })}
          <li className={`page-item${page === totalPages ? " disabled" : ""}`}>
            <button className="page-link" onClick={handleClickNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default ProjectCards;
