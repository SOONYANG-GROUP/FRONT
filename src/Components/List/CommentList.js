import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
const SubCommentElement = ({ subComment }) => {
  const year = subComment.createDate[0];
  const month = subComment.createDate[1];
  const date = subComment.createDate[2];
  const hour = subComment.createDate[3];
  const min = subComment.createDate[4];
  console.log(year);
  return (
    <div className=" mb-3 px-3">
      <div className="fw-bold mb-2">{subComment.name}</div>
      <div className="fw-normal">{subComment.subComment}</div>
      <div className="fw-light">{`${year}년 ${month}월 ${date}일 ${hour}시 ${min}분 `}</div>
      <hr />
    </div>
  );
};

const SubCommentList = ({ subComments }) => {
  console.log(subComments);
  if (!subComments) {
    return <></>;
  }
  return (
    <div>
      {subComments.map((subComment, index) => {
        return <SubCommentElement key={index} subComment={subComment} />;
      })}
    </div>
  );
};

const CommentListEle = ({ comment }) => {
  console.log(comment);
  const [isExpanded, setIsExpanded] = useState(false);
  const [subComment, setSubComment] = useState();
  const [subComments, setSubComments] = useState();

  const year = comment.createDate[0];
  const month = comment.createDate[1];
  const date = comment.createDate[2];
  const hour = comment.createDate[3];
  const min = comment.createDate[4];

  const fetch = async () => {
    await axios
      .get(
        `http://localhost:8080/projects/${id}/comment/subcomment?commentId=${comment.commentId}`
      )
      .then((res) => {
        setSubComments(res.data);
        return res;
      })
      .catch((e) => {
        return e;
      });
  };

  const onButtonClick = async () => {
    setIsExpanded(!isExpanded);
    console.log(comment.commentId);
    await axios
      .get(
        `http://localhost:8080/projects/${id}/comment/subcomment?commentId=${comment.commentId}`
      )
      .then((res) => {
        console.log(res);
        setSubComments(res.data);
        console.log(subComments);
        return res;
      });
  };

  const onChangeSubComment = (e) => {
    setSubComment(e.target.value);
    console.log(subComment);
  };
  const id = useParams().id;
  const onSubmitSubcomment = async () => {
    await axios.post(
      `http://localhost:8080/projects/${id}/subcomment?commentId=${comment.commentId}`,
      { subComment }
    );
    fetch();
    console.log(subComment);
  };

  return (
    <div className="card card-body mb-3">
      {comment ? (
        <div className="col-md-4 mb-3">
          <div className="fw-bold mb-2">{comment.name}</div>
          <div className="fw-normal">{comment.content}</div>
          <div className="fw-light">{`${year}년 ${month}월 ${date}일 ${hour}시 ${min}분 `}</div>
        </div>
      ) : (
        <></>
      )}
      <div className="w-20">
        <>
          {comment.subCommentCount > 0 ? (
            <button
              type="button"
              className="btn btn-seconds mb-3"
              onClick={onButtonClick}
            >
              <div className="d-flex justify-content-center align-items-center">
                <div className="mx-2">
                  {comment.subCommentCount}개의 댓글 보기
                </div>
                {isExpanded ? (
                  <i class="fa-solid fa-chevron-up"></i>
                ) : (
                  <i class="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-seconds mb-3"
                onClick={onButtonClick}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <div className="mx-2">댓글 달기</div>
                  {isExpanded ? (
                    <i class="fa-solid fa-chevron-up"></i>
                  ) : (
                    <i class="fa-solid fa-chevron-down"></i>
                  )}
                </div>
              </button>
            </>
          )}
        </>
      </div>
      <>
        {isExpanded ? (
          <>
            <div>
              <SubCommentList subComments={subComments} />
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="댓글을 입력해주세요"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={onChangeSubComment}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={onSubmitSubcomment}
                >
                  등록
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

const CommentList = ({ creatingComment, comments }) => {
  if (!comments) {
    return null;
  }

  return comments.map((comment, index) => {
    return <CommentListEle key={index} comment={comment} />;
  });
};

export default CommentList;
