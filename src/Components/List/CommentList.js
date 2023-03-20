import React, { useState } from "react";


const SubCommentElement = ({
    subComment
}) => {
    return(
        <div>
            <div>
                <div>
                    {subComment.username}
                </div>
                <div>
                    {subComment.date}
                </div>
            </div>
            <div>
                {subComment.comment}
            </div>
        </div>
    )
}

const SubCommentList = ({
    subComments
}) => {
    return(
        <div>
            {subComments.map((subComment, index) => {
                return(
                <SubCommentElement 
                    key={index}
                    subComment={subComment}
                />)
            })}
        </div>
    )
}

const CommentListEle = ({
    comment
}) => {
    return(
        <div className="card card-body">
            <div>
                <div>
                    {comment.user}
                </div>
                <div>
                    {comment.date}
                </div>
            </div>
            <div>
                {comment.comment}
            </div>
            <div>
                <SubCommentList 
                    subComments={comment.subComments}
                />
            </div>
        </div>
    )
}

const CommentList = ({
    creatingComment,
    comments
}) => {
    return(
        comments.map((comment, index) => {
            return(
                <CommentListEle 
                    key={index}
                    comment={comment}
                />
            )
        })
    )
}

export default CommentList;