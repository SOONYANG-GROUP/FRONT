import { useEffect, useState } from "react";
import "./TimeLine.css";
import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";
import ShowDetailTimelineModalBtn from "../../Components/Modal/ShowDetailTimelineModalBtn";
const Timeline = ({ projectId, flag, userName }) => {
  const [jobDTO, setJobDTO] = useState();
  //flag 2 = 매니저 페이지
  useEffect(() => {
    axios.get(`${BACK_URL}/projects/${projectId}/members/jobs`).then((res) => {
      setJobDTO(res.data);
      console.log(res.data);
    });
  }, []);

  if (flag) {
    console.log(flag);
    console.log(userName);
  }

  if (jobDTO) {
    return (
      <div className="timeline-container">
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
  const [highlightedText, setHighlightedText] = useState();

  const deleteJob = () => {
    try {
      axios
        .delete(`${BACK_URL}/projects/${projectId}/members/jobs/${jobId}`)
        .then((res) => {
          console.log(res);
        });
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };
  useEffect(() => {
    setJobId(data.jobId);
    setJobTitle(data.jobTitle);
    setIsLoading(false);

    const description = data.jobDescription;
    const index = description.indexOf(userName);
    if (index > -1) {
      const firstPart = description.slice(0, index);
      const secondPart = description.slice(index + userName.length);
      setHighlightedText(
        <>
          {firstPart}
          <span style={{ color: "red", backgroundColor: "yellow" }}>
            {userName}
          </span>
          {secondPart}
        </>
      );
    } else {
      setHighlightedText(<>{description}</>);
    }
  }, [data, userName]);

  if (data.state === "OPINION") {
    return (
      <div className="timeline-item">
        <div className="timeline-item-content">
          <span className="tag" style={{ background: "green" }}>
            {/* {data.category.tag} */}
          </span>
          <time>
            {data.startJobDate[0]}/{data.startJobDate[1]}/{data.startJobDate[2]}
          </time>
          <p>회의 안건 : {jobTitle}</p>
          <p>회의 내용 : {highlightedText}</p>
          <time>
            최근 업데이트 : {data.updateJobDate[0]}/{data.updateJobDate[1]}/
            {data.updateJobDate[2]}
          </time>
          {flag === 2 ? <button onClick={deleteJob}>삭제</button> : <></>}
          <span className="circle" />
        </div>
      </div>
    );
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
        <p>{highlightedText}</p>
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
        {flag === 2 ? <button onClick={deleteJob}>삭제</button> : <></>}
        <span className="circle" />
      </div>
    </div>
  );
};
