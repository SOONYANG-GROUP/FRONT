import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const SubCommentElement = ({ subComment }) => {
  return (
    <div className=" mb-3 px-3">
      <div className="fw-bold mb-2">{subComment.username}</div>
      <div className="fw-normal">{subComment.comment}</div>
      <div className="fw-light">{subComment.date}</div>
      <hr />
    </div>
  );
};

const SubCommentList = ({ subComments }) => {
  return (
    <div>
      {subComments.map((subComment, index) => {
        return <SubCommentElement key={index} subComment={subComment} />;
      })}
    </div>
  );
};

const CommentListEle = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subComment, setSubComment] = useState();

  const onButtonClick = async () => {
    // await axios
    //   .get("http://localhost:8080/projects/2/comment/subcomment?commentId=5")
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   });

    setIsExpanded(!isExpanded);
  };

  const onChangeSubComment = (e) => {
    setSubComment(e.target.value);
    console.log(subComment);
  };
  const id = useParams().id;
  const onSubmitSubcomment = async () => {
    await axios.post(
      `http://localhost:8080/projects/2/subcomment?commentId=5`,
      { subComment }
    );
    console.log(subComment);
  };

  return (
    <div className="card card-body mb-3">
      <div className="col-md-4 mb-3">
        <div className="fw-bold mb-2">{comment.username}</div>
        <div className="fw-normal">{comment.comment}</div>
        <div className="fw-light">{comment.date}</div>
      </div>
      <div className="w-20">
        <>
          {comment.subComments.length > 0 ? (
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={onButtonClick}
            >
              <div className="d-flex justify-content-center align-items-center">
                <div className="mx-2">
                  {comment.subComments.length}개의 댓글 보기
                </div>
                {isExpanded ? (
                  <i class="fa-solid fa-chevron-up"></i>
                ) : (
                  <i class="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </button>
          ) : (
            <></>
          )}
        </>
      </div>
      <>
        {isExpanded ? (
          <>
            <div>
              <SubCommentList subComments={comment.subComments} />
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
  return comments.map((comment, index) => {
    return <CommentListEle key={index} comment={comment} />;
  });
};

export default CommentList;
