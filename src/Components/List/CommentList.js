import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SubCommentElement = ({ subComment }) => {
  return (
    <div>
      <div>
        <div>{subComment.username}</div>
        <div>{subComment.date}</div>
      </div>
      <div>{subComment.comment}</div>
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
  return (
    <div className="card card-body mb-3">
      <div className="col-md-4 mb-3">
        <div className="fw-bold mb-2">{comment.username}</div>
        <div className="fw-normal">{comment.comment}</div>
        <div className="fw-light">{comment.date}</div>
      </div>
      {comment.subComments.length > 0 && (
        <div>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${comment._id}`}
            aria-expanded={isExpanded}
            aria-controls={`collapse-${comment._id}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            View {comment.subComments.length} subcomments
          </button>
          <div
            className={`collapse ${isExpanded ? "show" : ""}`}
            id={`collapse-${comment._id}`}
          >
            <SubCommentList subComments={comment.subComments} />
          </div>
        </div>
      )}
    </div>
  );
};

const CommentList = ({ creatingComment, comments }) => {
  return comments.map((comment, index) => {
    return <CommentListEle key={index} comment={comment} />;
  });
};

export default CommentList;
