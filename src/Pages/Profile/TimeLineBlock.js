import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";
import { useEffect, useState } from "react";
import AccordianTimeLine from "../../Components/Accordion/TimeLineAccordion/AccordianTimeLine";
const TimeLineBlock = ({ log, index, projectId }) => {
  const [modalId, setModalId] = useState(`exampleModal-${index}`);
  const [timelines, setTimeLines] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BACK_URL}/users/profile/${log.id}/${log.participateUsersId}`)
      .then((res) => {
        console.log(res.data);
        setTimeLines(res.data);
        setIsLoading(false);
      });
  }, [log]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div
        className="card card-body mb-3"
        key={index}
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <span>
          <i className="fa-solid fa-terminal"></i>
          {log.title}
        </span>
      </div>
      <TimeLineModal
        title={log.title}
        modalId={modalId}
        projectId={projectId}
        timelines={timelines}
      />
    </>
  );
};
export default TimeLineBlock;

const TimeLineModal = ({ title, modalId, timelines, projectId }) => {
  const [timeLineURL, setTimeLineURL] = useState();
  const [descriptions, setDescriptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //   useEffect(() => {
  //     axios
  //       .get(`${BACK_URL}/projects/${projectId}/members/timelines/${timeLineId}`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setTimeLineURL(res.data.url);
  //         setDescriptions(res.data.description);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }, [modalId, title, projectId, timeLineId]);
  if (timelines) {
    console.log(projectId);
  }
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ width: "600px" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            <AccordianTimeLine
              timeLineDtos={timelines}
              flag={"profile"}
              id={projectId}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary w-100"
              data-bs-dismiss="modal"
            >
              <i className="fa-solid fa-x"></i> 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
