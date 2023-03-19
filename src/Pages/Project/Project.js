import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

import ProjectDummyData from "../../DummyData/Project.json";
import { CommentInput } from "../../Components/Inputs/Textarea";

const Project = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ creatingComment, setCreatingComment ] = useState(false);
  const [ creatingToDoListEle, setCreatingToDoListEle ] = useState(false);

  const [project, setProject] = useState({});
  const [ comment, setComment ] = useState("");
  const [ comments, setComments ] = useState([]);
  const [ todoList, setTodoList ] = useState([]);
  
  const [ discordURL, setDiscordURL ] = useState("");

  const [ changingPage, setChangingPage ] = useState(false);
  const [ pageNumber, setPageNumber ] = useState(0);
  

  const { id } = useParams();

  useEffect(() => {
    const getProject = () => {
      const projectData = ProjectDummyData.project;
      setProject(projectData);
      setComments(projectData.comments);
      setTodoList(projectData.todoList);
      setDiscordURL(projectData.discordURL);
      setIsLoading(false);
    };
    getProject();
  }, [id]);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const onChangePageNumber = async (e) => {
    await setChangingPage(true);
    setPageNumber(parseInt(e.target.id));
    await setChangingPage(false);
  }

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
            <a className={`nav-link ${pageNumber === 0 ? "active" : ""}`} id="0" aria-current="page" href="#" onClick={onChangePageNumber}>
              프로젝트
            </a>
          </li>
          <li className="nav-item" id="1">
            <a className={`nav-link ${pageNumber === 1 ? "active" : ""}`} href="#" id="1" onClick={onChangePageNumber}>
              질문
            </a>
          </li>
          <li className="nav-item" id="2">
            <a className={`nav-link ${pageNumber === 2 ? "active" : ""}`} href="#" id="2" onClick={onChangePageNumber}>
              팀원
            </a>
          </li>
          <li className="nav-item" id="3">
            <a className={`nav-link ${pageNumber === 3 ? "active" : ""}`} id="3" onClick={onChangePageNumber}>
              매니저
            </a>
          </li>
        </ul>

        <DetailPage 
          changingPage={changingPage}
          project={project}
          pageNumber={pageNumber}
          comment={comment}
          comments={comments}
          todoList={todoList}
          discordURL={discordURL}
          creatingComment={creatingComment}
          onChangeComment={onChangeComment}
        />


      </>
    );
  }
};

const DetailPage = ({
  discordURL,
  todoList,
  changingPage,
  project,
  pageNumber,
  comment,
  comments,
  onChangeComment,
  creatingComment,
  creatingToDoListEle
}) => {
  if(changingPage)
  {
    return(
      <div>Loading...</div>
    )
  }
  else
  {
    if(pageNumber === 0)
    {
      return(
        <DetailPageZero
          project={project}
        />
      )
    }
    else if(pageNumber === 1)
    {
      return(
        <DetailPageOne 
          comment={comment}
          comments={comments}
          creatingComment={creatingComment}
          onChangeComment={onChangeComment}
        />
      )
    }
    else if(pageNumber === 2)
    {
      return(
        <DetailPageTwo 
          discordURL={discordURL}
          todoList={todoList}
          creatingToDoListEle={creatingToDoListEle}
        />
      )
    }
  }
}

const DetailPageTwo = ({
  discordURL,
  todoList,
  creatingToDoListEle
}) => {
  return(
    <div className="container px-5">
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>To Do List</h4>
      </div>
      <hr class="mt-0 mb-3 mt-3 " />
      {creatingToDoListEle ? (<></>) : (
      <div>
        {todoList.map((toDoListEle, index) => {
          return(
            <div>
              <p key={index}>
                {toDoListEle.task}
              </p>
            </div>
          )
        })}
      </div>
      )}
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>Community URL</h4>
      </div>
      <hr class="mt-0 mb-3 mt-3 " />
      <div>
        <a href={discordURL}>Discord</a>
      </div>
    </div>
  )
}

const DetailPageOne = ({
  comment,
  comments,
  onChangeComment,
  creatingComment
}) => {
  return(
    <div className="container px-5">
      <div className="text-uppercase-expanded small mb-2 pt-5">
        <h4>질문하기</h4>
      </div>
      <hr class="mt-0 mb-3 mt-3 " />
      <div className="form-floating">
        <CommentInput 
          comment={comment}
          onChangeComment={onChangeComment}
        />
      </div>
      {creatingComment ? (<></>) : (
      <div>
        {comments.map((comment, index) => {
          return(
            <div>
              {comment.comment}
            </div>
          )
        })}
      </div>
      )}

    </div>
  )
}

const DetailPageZero = ({
  project
}) => {
  return(
    <>
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
  )
}

export default Project;
