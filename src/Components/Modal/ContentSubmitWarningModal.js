import React from "react";

const ContentSubmitWarningModalBtn = ({ resultLink, onSubmitLink }) => {
  return (
    <>
      <button
        disabled={resultLink === "" ? true : false}
        type="button"
        className="btn btn-primary w-100"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal4"
      >
        기록 제출하기
      </button>
      <ContentSubmitWarningModal
        resultLink={resultLink}
        onSubmitLink={onSubmitLink}
      />
    </>
  );
};

const ContentSubmitWarningModal = ({ resultLink, onSubmitLink }) => {
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
              기록 제출
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
              <p>아래 내용를 제출하면 더 이상 수정이 불가능합니다.</p>
              <p className="text-muted">{resultLink}</p>
              <p>링크 제출 링크가 맞습니까?</p>
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
            <button type="button" className="btn btn-primary w-100">
              <i className="fa-solid fa-check"></i> 제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSubmitWarningModalBtn;
