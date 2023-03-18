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