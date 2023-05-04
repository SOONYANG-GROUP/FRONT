import React, { useCallback, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { AiFillCaretRight } from "react-icons/ai";

const DetailTimeLineList = ({
  jobId,
  projectId,
  title,
  detailJobs,
  userName,
}) => {
  const [isExtended, setIsExtended] = useState(false);

  const onHandleIsExtended = useCallback(() => {
    setIsExtended((prevIsExtended) => !prevIsExtended);
  }, []);

  if (detailJobs.length === 0) {
    return <div>현재 작성된 목록이 없습니다.</div>;
  }

  return (
    <>
      <ul
        className="list-group border"
        style={{ maxWidth: "400px", width: "80vw" }}
      >
        <div className="btn btn-lg bg-light" onClick={onHandleIsExtended}>
          {isExtended ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
        {isExtended &&
          detailJobs.map((p, i) => {
            const liClassName =
              p.memberName === userName
                ? "list-group-item bg-light"
                : "list-group-item bg-white";

            return (
              <React.Fragment key={p.id}>
                <li className={`d-flex align-items-center ${liClassName}`}>
                  <div
                    className={`badge me-2 rounded-pill ${
                      p.memberName === userName ? "bg-success" : "bg-secondary"
                    }`}
                  ></div>
                  <div>
                    <div className="mb-2">
                      <AiFillCaretRight />
                      제목 : {p.title}
                    </div>
                    <div className="mb-2">링크 : {p.url}</div>
                    <div className="mb-2">설명 : {p.description}</div>
                    <div className="mb-2">
                      업데이트 날짜 : {p.createTimeLineDateTime[0]} /{" "}
                      {p.createTimeLineDateTime[1]} /{" "}
                      {p.createTimeLineDateTime[2]}
                    </div>
                    <div className="mb-2">작성자 : {p.memberName}</div>
                  </div>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
    </>
  );
};

export default DetailTimeLineList;
