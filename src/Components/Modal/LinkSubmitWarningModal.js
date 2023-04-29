import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { BACK_URL } from "../Constants/URL";
const LinkSubmitWarningModalBtn = ({
  resultLink,
  onSubmitLink,
  contents,
  projectStatus,
  addFunction,
  jobId,
}) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-100"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal4"
      >
        링크 제출하기
      </button>
      <LinkSubmitWarningModal
        resultLink={resultLink}
        onSubmitLink={onSubmitLink}
        contents={contents}
        projectStatus={projectStatus}
        addFunction={addFunction}
        jobId={jobId}
      />
    </>
  );
};

const LinkSubmitWarningModal = ({
  resultLink,
  onSubmitLink,
  contents,
  projectStatus,
  addFunction,
  jobId,
}) => {
  const projectId = useParams().id;

  const onSubmitLink2 = async (e) => {
    let data = {
      title: addFunction,
      url: resultLink,
      description: contents,
    };
    console.log(data);
    try {
      const res = await axios.post(
        `${BACK_URL}/projects/${projectId}/members/jobs/${jobId}/timelines`,
        data
      );
      console.log(res);
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  if (!jobId || jobId < 0) {
    return (
      <div
        className="modal fade"
        id="exampleModal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                타임라인 추가
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
                <h1>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </h1>
              </div>

              <div className="text-center">
                <p>세부 주제를 선택해주세요.</p>
              </div>
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
  }

  if (projectStatus == "END") {
    return (
      <div
        className="modal fade"
        id="exampleModal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                결과물 링크 제출
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
                <h1>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </h1>
              </div>

              <div className="text-center">
                <p>이미 완료된 프로젝트입니다.</p>
              </div>
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
  }

  if (projectStatus == "READY") {
    return (
      <div
        className="modal fade"
        id="exampleModal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                결과물 링크 제출
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
                <h1>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </h1>
              </div>

              <div className="text-center">
                <p>프로젝트 시작 후 링크 제출이 가능합니다.</p>
              </div>
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
  }

  return (
    <div
      className="modal fade"
      id="exampleModal4"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              타임라인 추가
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
              <h1>
                <i className="fa-solid fa-triangle-exclamation"></i>
              </h1>
            </div>

            <div className="text-center">
              <p>아래 로그를 제출하면 타임라인에 추가됩니다.</p>
              <p className="text-muted">{addFunction}</p>
              <p>제출하시겠습니까?</p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary w-100"
              data-bs-dismiss="modal"
            >
              <i className="fa-solid fa-x"></i> 취소
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={onSubmitLink2}
            >
              <i className="fa-solid fa-check"></i> 제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkSubmitWarningModalBtn;
