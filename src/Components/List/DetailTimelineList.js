const DetailTimeLineList = ({
  jobId,
  projectId,
  title,
  detailJobs,
  userName,
}) => {
  console.log(userName);
  return (
    <>
      <ul className="list-group">
        {detailJobs.map((p, index) => {
          let liClassName = "list-group-item";
          if (p.memberName === userName) {
            liClassName += " bg-primary text-white";
          }
          return (
            <li className={liClassName} key={index}>
              <p>{p.title}</p>
              <p>{p.url}</p>
              <p>{p.description}</p>
              <p>{p.memberName}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DetailTimeLineList;
