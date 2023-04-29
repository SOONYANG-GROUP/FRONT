import { useEffect } from "react";
import AccordianItem from "./AccordianItem";

const AccordianTimeLine = ({ p, timeLineDtos, id, flag }) => {
  useEffect(() => {}, [timeLineDtos, flag]);
  if (flag === "profile") {
    console.log(timeLineDtos);
    return (
      <>
        {timeLineDtos.map((title) => {
          return (
            <div>
              <div className="accordion" id={title.timeLineId}>
                <AccordianItem title={title} id={id} flag={flag} />
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        {timeLineDtos.map((t) => {
          return (
            <div>
              {t.participatedUsersId === p.memberId ? (
                <>
                  <div>
                    {t.timeLineListTitleDtos.map((title) => {
                      console.log(title);
                      return (
                        <>
                          <div>
                            <div className="accordion" id={title.timeLineId}>
                              <AccordianItem title={title} id={id} />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </>
    );
  }
};

export default AccordianTimeLine;
