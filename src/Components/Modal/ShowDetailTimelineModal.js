import { useEffect } from "react";
import DetailTimeline from "../../Pages/Project/DetailTimeLine";

const ShowDetailTimelineModal = ({
  jobId,
  projectId,
  title,
  id,
  detailJobs,
}) => {
  useEffect(() => {}, [title, detailJobs]);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={title}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={title}>
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <DetailTimeline detailJobs={detailJobs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailTimelineModal;
