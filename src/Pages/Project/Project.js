import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";
import { BiWebcam } from "react-icons/bi";
import LinkSubmitWarningModalBtn from "../../Components/Modal/LinkSubmitWarningModal";
import ProjectDummyData from "../../DummyData/Project.json";
import { CommentInput } from "../../Components/Inputs/Textarea";
import CommentList from "../../Components/List/CommentList";
import Comments from "../../DummyData/Comment.json";
import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";
import AddTimeLine from "./AddTimeLine";

import dummyData from "./dummyData.json";
import AccordianTimeLine from "../../Components/Accordion/TimeLineAccordion/AccordianTimeLine";
import Timeline from "./TimeLine";

const Project = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [creatingComment, setCreatingComment] = useState(false);
  const [creatingToDoListEle, setCreatingToDoListEle] = useState(false);

  const [isProjectActive, setIsProjectActive] = useState(false);
  const [project, setProject] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [discordURL, setDiscordURL] = useState("");
  const [openKakaoURL, setOpenKakaoURL] = useState("");

  const [changingPage, setChangingPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const { id } = useParams();

  const [buttonTitle, setButtonTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACK_URL}/projects/${id}`);
        const projectData = res.data;

        setProject(projectData);
        setIsLoading(false);
        if (projectData.projectStatus === "READY") {
          setButtonTitle("시작하기");
        } else if (projectData.projectStatus === "RUNNING") {
          setButtonTitle("종료하기");
        } else {
          setButtonTitle("이미 종료된 프로젝트입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [id]);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onChangePageNumber = async (e) => {
    if (e.target.id > 1) {
      if (!isLoggedIn) {
        return alert("로그인이 필요합니다.");
      }
    }
    await setChangingPage(true);
    setPageNumber(parseInt(e.target.id));
    await setChangingPage(false);
  };

  const settingBtn = async (e) => {
    console.log(project.projectStatus);
    console.log(project.projectStatus == "READY");
    if (project.projectStatus == "READY") {
      try {
        alert("프로젝트가 시작되었습니다.");
        const res = await axios.get(`${BACK_URL}/projects/${id}/start`);
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    } else if (project.projectStatus == "RUNNING") {
      try {
        alert("프로젝트가 완료되었습니다.");
        const res = await axios.get(`${BACK_URL}/projects/${id}/end`);
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("이미 종료된 프로젝트입니다.");
    }
    window.location.reload();
  };

  // **************************************************************************************************************************************************************************
  // const onCreateComment = async () => {
  //   await axios
  //     .post(`${BACK_URL}/projects/${id}/comment`, { comment })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   setCreatingComment(true);
  // };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-10">
            <div className="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
              {project.projectStatus == "END" ? (
                <>
                  <button className="btn btn-lg ms-3">{buttonTitle}</button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-lg ms-3"
                    onClick={settingBtn}
                  >
                    {buttonTitle}
                  </button>
                </>
              )}
            </div>
            <h2>{project.title}</h2>
            {/* <p className="lead">{project.summaryDescription}</p> */}
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
          isLoggedIn={isLoggedIn}
          changingPage={changingPage}
          project={project}
          pageNumber={pageNumber}
          comment={comment}
          comments={comments}
          todoList={todoList}
          discordURL={discordURL}
          openKakaoURL={openKakaoURL}
          candidates={candidates}
          creatingToDoListEle={creatingToDoListEle}
          isProjectActive={isProjectActive}
          onChangeComment={onChangeComment}
        />
      </>
    );
  }
};

const DetailPage = ({
  contents,
  isLoggedIn,
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
  // creatingComment,
  creatingToDoListEle,
  onChangeResultLink,
  onSubmitLink,
  onSubmitContent,
  // onCreateComment,
  onChangeContents,
}) => {
  if (changingPage) {
    return <div>Loading...</div>;
  } else {
    if (pageNumber === 0) {
      return <DetailPageZero project={project} isLoggedIn={isLoggedIn} />;
    } else if (pageNumber === 1) {
      return (
        <DetailPageOne
          comment={comment}
          comments={comments}
          isLoggedIn={isLoggedIn}
          // creatingComment={creatingComment}
          onChangeComment={onChangeComment}
          // onCreateComment={onCreateComment}
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
          onSubmitContent={onSubmitContent}
          contents={contents}
          onChangeContents={onChangeContents}
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
  const id = useParams().id;
  const [participatedUsers, setParticipatedUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [subtopic, setSubtopic] = useState("");
  const [shortDescription, setShortDescription] = useState();
  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${BACK_URL}/projects/${id}/manager`).then((res) => {
        setParticipatedUsers(res.data.appliedUserDtos);
        setIsLoading(false);
        console.log(res);

        return res;
      });
    };
    fetch();
  }, []);

  const onChangeSubtopic = (e) => {
    setSubtopic(e.target.value);
  };

  const onChangeShortDescription = (e) => {
    setShortDescription(e.target.value);
  };

  const onCreateSubtopic = () => {
    console.log(subtopic);
    console.log(shortDescription);
    let data = {
      jobTitle: subtopic,
      jobDescription: shortDescription,
    };
    console.log(data);
    axios.post(`${BACK_URL}/projects/${id}/members/jobs/add`, data);
    // window.location.reload();
  };

  const onClickPermitBtn = async (memberId) => {
    await axios
      .post(`${BACK_URL}/projects/${id}/permit?memberId=${memberId}`, null)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
    window.location.reload();
  };

  const onClickRejectBtn = async (memberId) => {
    await axios
      .post(`${BACK_URL}/projects/${id}/reject?memberId=${memberId}`, null)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
    window.location.reload();
  };

  if (isLoading) {
    return <>Loading...</>;
  }

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

        {participatedUsers &&
          participatedUsers.map((p) => {
            console.log(p.userId);
            return (
              <>
                <div className="row gx-5 mb-3 mt-3 justify-contents-center align-items-center">
                  <div className="col-lg-6">
                    <br />
                    <div className="col-md-8 align-text-center">
                      <div
                        className="btn btn-second"
                        onClick={() => {
                          window.location.assign(`/profile/${p.userId}`);
                        }}
                      >
                        지원 분야 : {p.detailField} 이름:
                        {p.name}
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        onClickPermitBtn(p.userId);
                      }}
                    >
                      참가 허락
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        onClickRejectBtn(p.userId);
                      }}
                    >
                      참가 거부
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>subtopic 생성하기</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3" />
        <div>
          <input
            name="subtopic"
            placeholder="추가할 기능을 적어넣으세요"
            onChange={onChangeSubtopic}
            value={subtopic}
          />
          <input
            name="shortDescription"
            placeholder="기능의 설명을 간략히 적어주세요."
            onChange={onChangeShortDescription}
            value={shortDescription}
          />
          <button onClick={onCreateSubtopic}>추가하기</button>
        </div>
        <Timeline dummyData={dummyData} projectId={id} />
      </div>
    );
  }
};

const DetailPageTwo = ({
  addFunction,
  resultLink,
  discordURL,
  todoList,
  creatingToDoListEle,
  openKakaoURL,
  onChangeResultLink,
  onSubmitLink,
  onSubmitContent,
  onChangeContents,
  contents,
}) => {
  const id = useParams().id;

  const [voiceChatUrl, setVoiceChatUrl] = useState();
  const [openChatUrl, setOpenChatUrl] = useState();
  const [participatedUsers, setParticipatedUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [memberId, setMemberId] = useState();
  const [projectStatus, setProjectStatus] = useState();
  const [timeLineDtos, setTimeLineDtos] = useState("");
  // const [memberPageDtos, setMemberPageDtos] = useState();

  useEffect(() => {
    const fetchMemberData = async () => {
      await axios.get(`${BACK_URL}/projects/${id}/member`).then((res) => {
        const { memberPageDtos, timeLineListDtos } = res.data;
        if (memberPageDtos[0]) {
          setVoiceChatUrl(memberPageDtos[0].voiceChatUrl);
          setOpenChatUrl(memberPageDtos[0].openChatUrl);
          setParticipatedUsers(memberPageDtos[0].participatedUserDtos);
          setMemberId(memberPageDtos[0].memberId);
          setProjectStatus(memberPageDtos[0].projectStatus);
          setIsLoading(false);
        }
        setTimeLineDtos(timeLineListDtos);
      });
    };
    fetchMemberData();
  }, []);

  const moveProfile = (id) => {
    window.location.assign(`http://localhost:3000/users/profile/${id}`);
  };

  if (isLoading) {
    return <></>;
  }

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
        <div className="col-md-4">
          <a
            href={voiceChatUrl}
            className="btn text-light w-100 m-1"
            style={{ backgroundColor: "#6f42c1" }}
          >
            <i className="fa-brands fa-discord"></i> DISCORD
          </a>
        </div>
        <div className="col-md-4">
          <a
            href={openChatUrl}
            className="btn btn-warning text-light w-100 m-1"
            target="_blank"
          >
            <i className="fa-solid fa-comment"></i> KAKAO
          </a>
        </div>
        <div className="col-md-4">
          <a
            href="/webcamhome"
            className="btn text-light w-100 m-1"
            style={{ backgroundColor: "#131313" }}
          >
            <BiWebcam size={24} />
            미니 웹 엑스{" "}
          </a>
        </div>
      </div>
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>member log</h4>
        <span className="text-muted">팀원들의 로그입니다.</span>
        <div className="d-flex flex-column">
          {participatedUsers &&
            participatedUsers.map((p, index) => {
              if (p.status === "MANAGER") {
                return (
                  <div className="p-1" key={index}>
                    <hr />
                    <h4
                      onClick={() => {
                        moveProfile(p.id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      팀장 : {p.name}
                    </h4>
                    {/* <AccordianTimeLine
                    p={p}
                    index={index}
                    timeLineDtos={timeLineDtos}
                    id={id}
                  /> */}
                    <hr />
                  </div>
                );
              } else {
                return (
                  <div className="p-1" key={index}>
                    <hr />
                    <h4
                      onClick={() => {
                        moveProfile(p.id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      분야 : {p.detailField} 이름 : {p.name}
                    </h4>
                    {/* <AccordianTimeLine
                      p={p}
                      index={index}
                      timeLineDtos={timeLineDtos}
                      id={id}
                    /> */}
                    <hr />
                  </div>
                );
              }
            })}
          <Timeline projectId={id} />
          <AddTimeLine projectStatus={projectStatus} projectId={id} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

const DetailPageOne = ({
  comment,
  comments,
  onChangeComment,
  isLoggedIn,
  // creatingComment,
  // onCreateComment,
}) => {
  const [creatingComment, setCreatingComment] = useState(false);

  const id = useParams().id;

  const [comment2, setComment2] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    await axios
      .get(`${BACK_URL}/projects/${id}/comment`)
      .then((res) => {
        setComment2(res.data.commentDtos);
        setIsLoading(false);
        setCreatingComment(false);

        return res;
      })
      .catch((e) => {
        return e;
      });
  };

  const onCreateComment = async () => {
    await axios
      .post(`${BACK_URL}/projects/${id}/comment`, { comment })
      .then(function (response) {
        console.log(response);
        setCreatingComment(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch();
  };
  useEffect(() => {
    fetch();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="container px-5">
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>의견 & 질문하기</h4>
      </div>
      <hr className="mt-0 mb-3 mt-3" />
      <div className="d-flex flex-row form-floating align-items-center">
        <div className="w-75 pe-2 ">
          <CommentInput comment={comment} onChangeComment={onChangeComment} />
        </div>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
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
          <CommentList comments={comment2} />
        </div>
      )}
    </div>
  );
};

const DetailPageZero = ({ project, isLoggedIn }) => {
  const id = useParams().id;

  const onSupportButton = async (field, detailField) => {
    if (!isLoggedIn) {
      return alert("로그인이 필요합니다.");
    }
    console.log(detailField);
    let data = {
      field: field,
      detailField: detailField,
    };
    await axios
      .post(`${BACK_URL}/projects/${id}/join`, data)
      .then(function (response) {
        return alert("신청이 완료되었습니다.");
      })
      .catch(function (error) {
        return alert("이미 신청 완료된 프로젝트입니다.");
      });
  };

  return (
    <div>
      <div className="container px-5">
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>모집 현황</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3 " />
        <div className="row gx-5 mb-3 mt-3">
          <div className="col-lg-8">
            <h4 className="mb-0">Support field</h4>
            <br />
            <div className="support-fields">
              {project.recruitUserDtos.map((p, index) => {
                console.log(p.detailField);
                return (
                  <div
                    className="row support-field mb-3 d-flex flex-row align-items-center"
                    key={index}
                  >
                    <div className="col-md-3 support-field-label">
                      {p.detailField}
                    </div>
                    <div className="col-md-3 support-field-value">
                      {p.currentRecruit}/{p.maxRecruit}
                    </div>
                    <div className="col-md-3">
                      {p.currentRecruit >= p.maxRecruit ||
                      project.projectStatus == "END" ||
                      project.projectStatus == "RUNNING" ? (
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
                          onClick={() =>
                            onSupportButton(p.field, p.detailField)
                          }
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
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>소개</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3 " />
        <div className="row gx-5 mb-3 mt-3">
          <div className="col-lg-8">
            <h4 className="mb-0">1. 지원동기</h4>
            <p>{project.description}</p>
          </div>
        </div>
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>기술/언어</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3 " />
        <div className="row gx-5 mb-3 mt-3">
          <div className="col-lg-8">
            <h4 className="mb-0">구현하는데 필요한 스택</h4>
            <br />
            {/* <p>{project.needs}</p> */}
          </div>
        </div>
        <div className="text-uppercase-expanded small mb-2 pt-5">
          <h4>참고 링크</h4>
        </div>
        <hr className="mt-0 mb-3 mt-3 " />
        <div className="row gx-5">
          <div className="col-lg-8">
            {project.referenceDtos.map((p, index) => {
              return <p key={index}>참조링크{p.URL}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
