import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

import ProjectDummyData from "../../DummyData/Project.json";

const Project = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProject = () => {
      const projectData = ProjectDummyData.project;
      setProject(projectData);
      setIsLoading(false);
    };
    getProject();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  } else {
    console.log(project);
    return (
      <>
        <div class="col-lg-8 mx-auto">
          <div class="text-center mb-10">
            <div class="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
              사이드 프로젝트
            </div>
            <h2>{project.title}</h2>
            <p class="lead">{project.summaryDescription}</p>
          </div>
        </div>
        <div class="col-lg-8 mx-auto text-center d-flex justify-content-center">
          <ul class="nav nav-tab ">
            <li class="nav-item">
              <a
                class="nav-link active text-decoration-none text-reset"
                aria-current="page"
                href="#!"
              >
                Active
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-decoration-none text-reset" href="#!">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-decoration-none text-reset" href="#!">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#!"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div class="container px-5">
          <div class="text-uppercase-expanded small mb-2 pt-5">
            <h4>모집 현황</h4>
          </div>
          <hr class="mt-0 mb-3 mt-3 " />
          <div class="row gx-5 mb-3 mt-3">
            <div class="col-lg-8">
              <h4 class="mb-0">Support field</h4>
              <br />
              <div class="support-fields">
                {project.fields.map((p) => {
                  return (
                    <div className="row support-field">
                      <div className="col-md-5 support-field-label">
                        {p.field}
                      </div>
                      <div className="col-md-7 support-field-value">
                        {p.recruited}/{p.limit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div class="col-lg-4 text-lg-end">
              <div class="text-gray-400 small">May 2018 - Present</div>
            </div>
          </div>
          <div class="text-uppercase-expanded small mb-2 pt-5">
            <h4>소개</h4>
          </div>
          <hr class="mt-0 mb-3 mt-3 " />
          <div class="row gx-5 mb-3 mt-3">
            <div class="col-lg-8">
              <h4 class="mb-0">1. 지원동기</h4>

              <p>{project.description}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="text-gray-400 small">August 2015 - May 2018</div>
            </div>
          </div>
          <div class="text-uppercase-expanded small mb-2 pt-5">
            <h4>기술/언어</h4>
          </div>
          <hr class="mt-0 mb-3 mt-3 " />
          <div class="row gx-5 mb-3 mt-3">
            <div class="col-lg-8">
              <h4 class="mb-0">구현하는데 필요한 스택</h4>
              <br />
              <p>{project.needs}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="text-gray-400 small">May 2018 - Present</div>
            </div>
          </div>
          <div class="text-uppercase-expanded small mb-2 pt-5">
            <h4>참고 링크</h4>
          </div>
          <hr class="mt-0 mb-3 mt-3 " />
          <div class="row gx-5">
            <div class="col-lg-8">
              <p>{project.reference}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <div class="text-gray-400 small">June 2011 - August 2015</div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Project;
