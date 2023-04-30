import { useEffect, useState } from "react";
import "./TimeLine.css";
import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";
import ShowDetailTimelineModalBtn from "../../Components/Modal/ShowDetailTimelineModalBtn";
const Timeline = ({ projectId, flag, userName }) => {
  const [jobDTO, setJobDTO] = useState();

  useEffect(() => {
    axios.get(`${BACK_URL}/projects/${projectId}/members/jobs`).then((res) => {
      console.log(res.data);
      setJobDTO(res.data);
    });
  }, []);

  if (jobDTO) {
    return (
      <div className="timeline-container" style={{ border: "1px solid" }}>
        {jobDTO.map((data, idx) => (
          <TimelineItem
            data={data}
            key={idx}
            projectId={projectId}
            jobDTO={jobDTO}
            flag={flag}
            userName={userName}
          />
        ))}
      </div>
    );
  }
};

export default Timeline;

const TimelineItem = ({ data, projectId, jobDTO, flag, userName }) => {
  const [jobId, setJobId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState();

  useEffect(() => {
    setJobId(data.jobId);
    setJobTitle(data.jobTitle);
    setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return null;
  }
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="tag" style={{ background: "green" }}>
          {/* {data.category.tag} */}
        </span>
        <time>
          {data.startJobDate[0]}/{data.startJobDate[1]}/{data.startJobDate[2]}
        </time>
        <p>{jobTitle}</p>
        <p>{data.jobDescription}</p>
        <time>
          최근 업데이트 {data.updateJobDate[0]}/{data.updateJobDate[1]}/
          {data.updateJobDate[2]}
        </time>
        <p>
          <ShowDetailTimelineModalBtn
            projectId={projectId}
            jobId={jobId}
            jobTitle={jobTitle}
            jobDTO={jobDTO}
            flag={flag}
            userName={userName}
          />
        </p>
        <span className="circle" />
      </div>
    </div>
  );
};
