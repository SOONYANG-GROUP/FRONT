import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-lg-4 mb-5 mb-lg-0 mt-3">
      <a
        className="card lift h-100 text-secondary shadow-sm p-3 bg-body-tertiary rounded"
        href={`http://localhost:3000/project/${project._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="card-body">
          <h3 className="text-primary mb-0 text-dark">{project.title}</h3>
          <div className="small text-gray-800 fw-500 mt-3">
            {project.fields[0]} 외 {project.fields.length - 1}명 모집 중
          </div>
          <div className="small text-gray-500">
            남은 시간 {project.remainingTime}일
          </div>
        </div>
        <div className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
          <div className="small text-gray-500">
            모집 중 {project.completedRecruitment} / {project.fields.length}
          </div>
          <div className="small text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

const ProjectCards = ({ projects, flag }) => {
  console.log(flag);
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

          <>
            {flag === 2 ? (
              <a
                className="btn btn-sm btn-primary d-inline-flex align-items-center"
                href="#!"
              >
                See more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-arrow-right ms-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            ) : (
              <></>
            )}
          </>
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
