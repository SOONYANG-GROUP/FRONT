import { useEffect, useState } from "react";
import "./TimeLine.css";
const DetailTimeline = ({ detailJobs }) => {
  if (detailJobs) {
    return (
      <div className="timeline-container">
        {detailJobs.map((data, idx) => (
          <DetailTimelineItem data={data} key={idx} jobDTO={detailJobs} />
        ))}
      </div>
    );
  }
};

export default DetailTimeline;

const DetailTimelineItem = ({ data, projectId, jobDTO }) => {
  const [jobId, setJobId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState();

  useEffect(() => {
    setJobId(data.jobId);
    setJobTitle(data.title);
    setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return null;
  }
  return (
    <div className="timeline-item" style={{ borderBottom: "1px solid" }}>
      <div className="timeline-item-content">
        <time>
          {data.createTimeLineDateTime[0]}/{data.createTimeLineDateTime[1]}/
          {data.createTimeLineDateTime[2]}
        </time>
        <div>{jobTitle}</div>
        <div>{data.description}</div>
        <a href={data.url}>{data.url}</a>
        <div>{data.memberName}</div>
      </div>
      <hr />
    </div>
  );
};
