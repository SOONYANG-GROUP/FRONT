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
    disabled,
    studyTip,
    studyTipLabel,
    onChangeStudyTip
}) => {
    return(
        <textarea
            name="studyTip"
            id={studyTipLabel}
            onChange={onChangeStudyTip}
            className="form-control"
            disabled={disabled}
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
            className="form-control"
        >
        </textarea>
    )
}