import React, { useEffect, useState } from "react";
import axios from "axios";

import { BACK_URL } from "../Constants/URL";
import ShowDetailTimelineModal from "./ShowDetailTimelineModal";
import AccordianTimeLine from "../Accordion/TimeLineAccordion/AccordianTimeLine";
import DetailTimeLineList from "../List/DetailTimelineList";
const ShowDetailTimelineModalBtn = ({
  jobId,
  projectId,
  jobTitle,
  flag,
  userName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailJobs, setDetailJobs] = useState();
  const [title, setTitle] = useState();

  const [isClicked, setIsClicked] = useState(false); // Add state to track if button has been clicked

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `${BACK_URL}/projects/${projectId}/members/jobs/${jobId}/timelines`
        )
        .then((res) => {
          setDetailJobs(res.data);
          setTitle(jobTitle);
          setIsLoading(false);
        });
    };
    fetch();
  }, [jobId, projectId, jobTitle]);

  if (isLoading) {
    return null;
  } else {
    console.log(detailJobs);
  }

  const show = () => {
    setIsClicked(true); // Set isClicked to true when button is clicked
  };

  if (flag === 1) {
    return (
      <DetailTimeLineList
        jobId={jobId}
        projectId={projectId}
        title={jobTitle}
        detailJobs={detailJobs}
        userName={userName}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-20"
        data-bs-toggle="modal"
        data-bs-target={`#${jobTitle.replaceAll(" ", "")}Modal`}
        onClick={show}
      >
        자세히 보기
      </button>

      <ShowDetailTimelineModal
        jobId={jobId}
        projectId={projectId}
        title={jobTitle}
        id={`${jobTitle.replaceAll(" ", "")}Modal`}
        detailJobs={detailJobs}
      />
    </>
  );
};

export default ShowDetailTimelineModalBtn;
