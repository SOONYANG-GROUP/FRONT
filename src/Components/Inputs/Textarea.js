
export const DownloadLibraryInput = ({
  creating,
  downloadLibrary,
  onChangeDownloadLibrary
}) => {
  return(
    <textarea
      name="downloadLibrary"
      value={downloadLibrary}
      onChange={onChangeDownloadLibrary}
      className="form-control"
      disabled={creating}
    >
    </textarea>
  )
}

export const DescriptionInput = ({
  creating,
  description,
  onChangeDescription,
}) => {
  return (
    <textarea
      name="description"
      value={description}
      onChange={onChangeDescription}
      className="form-control"
      disabled={creating}
    ></textarea>
  );
};

export const CommentInput = ({ comment, onChangeComment }) => {
  return (
    <textarea
      name="comment"
      value={comment}
      onChange={onChangeComment}
      className="form-control"
    ></textarea>
  );
};
