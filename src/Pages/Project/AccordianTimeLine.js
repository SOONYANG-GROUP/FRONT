import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";
import AccordianItem from "./AccordianItem";

const AccordianTimeLine = ({ p, timeLineDtos, id }) => {
  console.log("asd");

  return (
    <>
      {timeLineDtos.map((t) => {
        return (
          <div>
            {t.participatedUsersId === p.memberId ? (
              <>
                <div>
                  {t.timeLineListTitleDtos.map((title) => {
                    return (
                      <>
                        <div>
                          <div className="accordion" id={title.timeLineId}>
                            <AccordianItem title={title} p={p} id={id} />
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
};

export default AccordianTimeLine;
