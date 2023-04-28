import LinkSubmitWarningModalBtn from "../../Components/Modal/LinkSubmitWarningModal";
import axios from "axios";
import { useState } from "react";
import { BACK_URL } from "../../Components/Constants/URL";

const AddTimeLine = ({ projectStatus }) => {
  const [resultLink, setResultLink] = useState("");
  const [contents, setContents] = useState("");
  const [addFunction, setAddFuction] = useState("");
  const onSubmitLink = async (e) => {
    try {
      const res = await axios.get(`${BACK_URL}/projects/members/`);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeAddFunction = (e) => {
    console.log(addFunction);
    setAddFuction(e.target.value);
  };

  const onChangeResultLink = (e) => {
    setResultLink(e.target.value);
  };

  const onChangeContents = (e) => {
    setContents(e.target.value);
    console.log(contents);
  };

  if (!projectStatus) {
    return <></>;
  }

  return (
    <div className="text-uppercase-expanded small mb-2 pt-5">
      <h4>프로젝트 타임라인 갱신</h4>
      <span className="text-muted">
        로그에 기록할 기능 및 설명을 제출해 주세요.
      </span>
      <hr className="mt-0 mb-3 mt-3" />
      <div className="d-flex flex-column">
        <div className="">
          <input
            type="text"
            name="addFunction"
            className="form-control p-2"
            value={addFunction}
            onChange={onChangeAddFunction}
            placeholder="추가할 기능을 입력하세요"
          />
        </div>
        <div className="">
          <input
            type="text"
            name="resultLink"
            className="form-control p-2"
            value={resultLink}
            onChange={onChangeResultLink}
            placeholder="Link를 입력하세요"
          />
        </div>
        <div className="">
          <input
            type="text"
            name="contents"
            className="form-control p-3"
            value={contents}
            onChange={onChangeContents}
            placeholder="설명을 추가하세요"
          />
        </div>
      </div>
      <div className="mt-3 mb-3">
        <LinkSubmitWarningModalBtn
          projectStatus={projectStatus}
          resultLink={resultLink}
          onSubmitLink={onSubmitLink}
          contents={contents}
          addFunction={addFunction}
        />
      </div>
    </div>
  );
};

export default AddTimeLine;
