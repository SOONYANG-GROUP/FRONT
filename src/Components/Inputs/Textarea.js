export const DescriptionInput = ({
    description,
    onChangeDescription
}) => {
    return(
        <textarea
            name="description"
            value={description}
            onChange={onChangeDescription}
        >
        </textarea>
    )
}

export const StudyTip = ({
    studyTip,
    onChangeStudyTip
}) => {
    return(
        <textarea
            name="studyTip"
            value={studyTip}
            onChange={onChangeStudyTip}
        >
        </textarea>
    )
}

export const CommentInput = ({
    comment,
    onChangeComment
}) => {
    return(
        <textarea
            name="comment"
            value={comment}
            onChange={onChangeComment}
        >
        </textarea>
    )
}