import React, { useEffect } from "react";
import { useState, useMemo } from "react";
const ProjectCard = React.memo(({ project }) => {
  //********************************************************프로젝트 시작시간, 남은 모집 시간 계산********************************************************
  const currentDate = new Date(); // current date
  const createdDateTime = new Date(
    project.createdDateTime[0],
    project.createdDateTime[1],
    project.createdDateTime[2]
  );
  console.log(createdDateTime);
  const deadlineDateTime = new Date();
  deadlineDateTime.setDate(deadlineDateTime.getDate() + 14);
  console.log(deadlineDateTime);
  const timeDiff = deadlineDateTime.getTime() - currentDate.getTime(); // difference in milliseconds
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  console.log(daysDiff);
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

  if (!totalRecruit) {
    return null;
  }
  return (
    <div className="col-lg-4 mb-5 mb-lg-0 mt-3">
      <a
        className="card lift h-100 text-secondary shadow-sm p-3 bg-body-tertiary rounded"
        href={`http://localhost:3000/project/${project.id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="card-body">
          <h3 className="text-primary mb-0 text-dark">{project.title}</h3>
          <div className="small text-gray-800 fw-500 mt-3">
            {project.recruitUserDtos[0].detailField} 외 {totalRecruit}명 모집 중
          </div>
          <div className="small text-gray-500">남은 시간 {daysDiff}일</div>
        </div>
        <div className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
          <div className="small text-gray-500">
            모집 중 {currentRecruit} / {totalRecruit}
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
  const isLoading = useMemo(() => !projects.length, [projects]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(projects);
  return (
    <section className="bg-white py-10">
      <div className="container px-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            {flag === 1 ? (
              <h2 className="mb-0">팀원 모집중인 프로젝트</h2>
            ) : (
              <></>
            )}
          </div>

          <>{flag === 2 ? <></> : <></>}</>
        </div>
        <div className="row gx-5">
          {projects.map((project, index) => {
            return <ProjectCard project={project} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectCards;
