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