import { useEffect, useState } from "react";
import "./TimeLine.css";
import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";
const Timeline = ({ projectId }) => {
  const [jobDTO, setJobDTO] = useState();

  useEffect(() => {
    axios.get(`${BACK_URL}/projects/${projectId}/members/jobs`).then((res) => {
      console.log(res.data);
      setJobDTO(res.data);
    });
  }, []);

  if (jobDTO) {
    return (
      <div className="timeline-container">
        {jobDTO.map((data, idx) => (
          <TimelineItem data={data} key={idx} />
        ))}
      </div>
    );
  }
};

export default Timeline;

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag" style={{ background: "green" }}>
        {/* {data.category.tag} */}
      </span>
      <time>
        {data.startJobDate[0]}/{data.startJobDate[1]}/{data.startJobDate[2]}
      </time>
      <p>{data.jobTitle}</p>
      <p>{data.jobDescription}</p>
      <time>
        최근 업데이트 {data.updateJobDate[0]}/{data.updateJobDate[1]}/
        {data.updateJobDate[2]}
      </time>
      <p>
        <a href="#" target="_blank" rel="noopener noreferrer">
          상세보기
        </a>
      </p>

      <span className="circle" />
    </div>
  </div>
);
