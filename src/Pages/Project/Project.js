import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

import ProjectDummyData from "../../DummyData/Project.json";
import { CommentInput } from "../../Components/Inputs/Textarea";
import CommentList from "../../Components/List/CommentList";
import Comments from "../../DummyData/Comment.json";
import LinkSubmitWarningModalBtn from "../../Components/Modal/LinkSubmitWarningModal";
import axios from "axios";
const Project = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [creatingComment, setCreatingComment] = useState(false);
  const [creatingToDoListEle, setCreatingToDoListEle] = useState(false);

  const [isProjectActive, setIsProjectActive] = useState(false);
  const [project, setProject] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [resultLink, setResultLink] = useState("");

  const [discordURL, setDiscordURL] = useState("");
  const [openKakaoURL, setOpenKakaoURL] = useState("");

  const [changingPage, setChangingPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetch = () => {
      axios.get(`http://localhost:8080/projects/${id}`).then((res) => {
        console.log(res.data);
        return res.data;
      });
    };

    fetch();

    const getProject = () => {
      const projectData = ProjectDummyData.project;

      setProject(projectData);
      setComments(Comments.comment);
      setTodoList(projectData.todoList);
      setOpenKakaoURL(projectData.openKakaoURL);
      setDiscordURL(projectData.discordURL);
      setCandidates(projectData.candidates);
      setCreatingComment(false);
      setIsLoading(false);
    };
    getProject();
  }, [id]);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onChangeResultLink = (e) => {
    setResultLink(e.target.value);
  };

  const onChangePageNumber = async (e) => {
    await setChangingPage(true);
    setPageNumber(parseInt(e.target.id));
    await setChangingPage(false);
    const fetch = () => {
      axios
        .get(`http://localhost:8080/project/${id}/comment`)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          return e;
        });
    };
    fetch();
  };

  const onSubmitLink = async (e) => {};

  const onCreateComment = async () => {
    await axios
      .post(`http://localhost:8080/projects/${id}/comment`, { comment })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCreatingComment(true);
  };

  if (isLoading) {
    return <Loading />;
  } else {
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

        <ul className="nav nav-tabs col-lg-8 mx-auto text-center d-flex justify-content-center">
          <li className="nav-item" id="0">
            <a
              className={`nav-link ${pageNumber === 0 ? "active" : ""}`}
              id="0"
              aria-current="page"
              href="#"
              onClick={onChangePageNumber}
            >
              프로젝트
            </a>
          </li>
          <li className="nav-item" id="1">
            <a
              className={`nav-link ${pageNumber === 1 ? "active" : ""}`}
              href="#"
              id="1"
              onClick={onChangePageNumber}
            >
              질문
            </a>
          </li>
          <li className="nav-item" id="2">
            <a
              className={`nav-link ${pageNumber === 2 ? "active" : ""}`}
              href="#"
              id="2"
              onClick={onChangePageNumber}
            >
              팀원
            </a>
          </li>
          <li className="nav-item" id="3">
            <a
              className={`nav-link ${pageNumber === 3 ? "active" : ""}`}
              id="3"
              onClick={onChangePageNumber}
            >
              매니저
            </a>
          </li>
        </ul>
        <DetailPage
          changingPage={changingPage}
          project={project}
          resultLink={resultLink}
          pageNumber={pageNumber}
          comment={comment}
          comments={comments}
          todoList={todoList}
          discordURL={discordURL}
          openKakaoURL={openKakaoURL}
          creatingComment={creatingComment}
          candidates={candidates}
          creatingToDoListEle={creatingToDoListEle}
          isProjectActive={isProjectActive}
          onSubmitLink={onSubmitLink}
          onChangeComment={onChangeComment}
          onChangeResultLink={onChangeResultLink}
          onCreateComment={onCreateComment}
        />
      </>
    );
  }
};

const DetailPage = ({
  isProjectActive,
  candidates,
  resultLink,
  discordURL,
  openKakaoURL,
  todoList,
  changingPage,
  project,
  pageNumber,
  comment,
  comments,
  onChangeComment,
  creatingComment,
  creatingToDoListEle,
  onChangeResultLink,
  onSubmitLink,
  onCreateComment,
}) => {
  if (changingPage) {
    return <div>Loading...</div>;
  } else {
    if (pageNumber === 0) {
      return <DetailPageZero project={project} />;
    } else if (pageNumber === 1) {
      return (
        <DetailPageOne
          comment={comment}
          comments={comments}
          creatingComment={creatingComment}
          onChangeComment={onChangeComment}
          onCreateComment={onCreateComment}
        />
      );
    } else if (pageNumber === 2) {
      return (
        <DetailPageTwo
          discordURL={discordURL}
          todoList={todoList}
          resultLink={resultLink}
          openKakaoURL={openKakaoURL}
          onChangeResultLink={onChangeResultLink}
          creatingToDoListEle={creatingToDoListEle}
          onSubmitLink={onSubmitLink}
        />
      );
    } else if (pageNumber === 3) {
      return (
        <DetailPageThree
          isProjectActive={isProjectActive}
          candidates={candidates}
        />
      );
    }
  }
};

const DetailPageThree = ({ isProjectActive, candidates }) => {
  if (isProjectActive) {
    return (
      <div className="container px-5">
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>프로젝트 진행 중...</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3" />
      </div>
    );
  } else {
    return (
      <div className="container px-5">
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>지원자</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3" />
      </div>
    );
  }
};

const DetailPageTwo = ({
  resultLink,
  discordURL,
  todoList,
  creatingToDoListEle,
  openKakaoURL,
  onChangeResultLink,
  onSubmitLink,
}) => {
  return (
    <div className="container px-5">
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>Community</h4>
        <span className="text-muted">
          팀원들과 대화를 공유할 수 있는 공간입니다.
        </span>
      </div>
      <hr className="mt-0 mb-3 mt-3" />
      <div className="row">
        <div className="col-md-6">
          <a
            href={discordURL}
            className="btn text-light w-100 m-1"
            style={{ backgroundColor: "#6f42c1" }}
          >
            <i className="fa-brands fa-discord"></i> DISCORD
          </a>
        </div>
        <div className="col-md-6">
          <a
            href={openKakaoURL}
            className="btn btn-warning text-light w-100 m-1"
            target="_blank"
          >
            <i className="fa-solid fa-comment"></i> KAKAO
          </a>
        </div>
      </div>

      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>결과물 링크 제출</h4>
        <span className="text-muted">
          로그에 기록할 결과물 링크 제출해 주세요.
        </span>
        <hr className="mt-0 mb-3 mt-3" />
        <div>
          <div>
            <input
              type="text"
              name="resultLink"
              className="form-control"
              value={resultLink}
              onChange={onChangeResultLink}
            />
          </div>
          <div className="mt-3 mb-3">
            <LinkSubmitWarningModalBtn
              resultLink={resultLink}
              onSubmitLink={onSubmitLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailPageOne = ({
  comment,
  comments,
  onChangeComment,
  creatingComment,
  onCreateComment,
}) => {
  const id = useParams().id;
  console.log("asd");

  // useEffect(() => {
  //   const fetch = async () => {
  //     await axios
  //       .get(`http://localhost:8080/projects/${id}/comment`)
  //       .then((res) => {
  //         console.log(res);
  //         return res;
  //       });
  //   };
  //   fetch();
  // });

  return (
    <div className="container px-5">
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>의견 & 질문하기</h4>
      </div>
      <hr class="mt-0 mb-3 mt-3 " />
      <div className="d-flex flex-row form-floating align-items-center">
        <div className="w-75 pe-2">
          <CommentInput comment={comment} onChangeComment={onChangeComment} />
        </div>
        <div className="">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onCreateComment}
          >
            등록
          </button>
        </div>
      </div>
      {creatingComment ? (
        <></>
      ) : (
        <div>
          <CommentList comments={comments} />
        </div>
      )}
    </div>
  );
};

const DetailPageZero = ({ project }) => {
  const onSupportButton = () => {
    console.log("지원하기");
    // axios
    //   .post("https://localhost:8080/login")
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  return (
    <div>
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
                  <div className="row support-field mb-3 d-flex flex-row align-items-center">
                    <div className="col-md-3 support-field-label">
                      {p.field}
                    </div>
                    <div className="col-md-3 support-field-value">
                      {p.recruited}/{p.limit}
                    </div>
                    <div className="col-md-3">
                      {p.recruited === p.limit ? (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                        >
                          완료
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={onSupportButton}
                        >
                          지원
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
        </div>
        <div class="text-uppercase-expanded small mb-2 pt-5">
          <h4>참고 링크</h4>
        </div>
        <hr class="mt-0 mb-3 mt-3 " />
        <div class="row gx-5">
          <div class="col-lg-8">
            <p>{project.reference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
