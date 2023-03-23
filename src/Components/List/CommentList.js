import React, { useState } from "react";

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
  const onButtonClick = () => {
    setIsExpanded(!isExpanded);
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
          <div>
            <SubCommentList subComments={comment.subComments} />
          </div>
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
