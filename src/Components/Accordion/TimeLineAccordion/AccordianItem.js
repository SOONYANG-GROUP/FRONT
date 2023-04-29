import axios from "axios";
import { useState, useEffect } from "react";
import { BACK_URL } from "../../Constants/URL";

const AccordianItem = ({ title, id, flag }) => {
  const [timeLineURL, setTimeLineURL] = useState();
  const [descriptions, setDescriptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACK_URL}/projects/${id}/members/timelines/${title.timeLineId}`)
      .then((res) => {
        setTimeLineURL(res.data.url);
        setDescriptions(res.data.description);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id, title]);

  const onChangeIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          // data-bs-target={`#${p.timeLineId}`}
          aria-expanded={isExpanded}
          // aria-controls={p.timeLineId}
          onClick={onChangeIsExpanded}
        >
          {title.title}
        </button>
      </h2>
      <div
        // id={p.timeLineId}
        className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
        data-bs-parent={`#${title.timeLineId}`}
      >
        <div className="accordion-body">
          <div>{descriptions}</div>
          <div>{timeLineURL}</div>
        </div>
      </div>
    </div>
  );
};

export default AccordianItem;
