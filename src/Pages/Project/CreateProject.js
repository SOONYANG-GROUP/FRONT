import React, { useEffect, useState } from "react";
import { ReferenceInput, TitleInput } from "../../Components/Inputs/Input";
import { FieldSelectTag } from "../../Components/Inputs/Select";
import { DescriptionInput } from "../../Components/Inputs/Textarea";
import FieldList from "../../Components/List/FieldList";
import Loading from "../Loading";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReferenceList from "../../Components/List/ReferenceList";

import axios from "axios";
import GPTPrint from "../../Components/GPT/GPTPrint";

// let SearchPreprocessedField = (fields) => {
//   let preprocessedFields = [];
//   let fieldNames = [];
//   let fieldDetailNames = [];
//   let fieldNumbers = [];
//   //Field 생성 하는 곳*************************************************************************************************************************
//   for (let index = 0; index < fields.length; ++index) {
//     const indexOfDetailFieldName = fieldDetailNames.findIndex(
//       (element) => element === fields[index].detailField
//     );
//     if (indexOfDetailFieldName !== -1) {
//       fieldNumbers[indexOfDetailFieldName] += 1;
//     } else {
//       fieldNames.push(fields[index].field);
//       fieldDetailNames.push(fields[index].detailField);
//       fieldNumbers.push(1);
//     }
//   }

//   for (let index = 0; index < fieldDetailNames.length; ++index) {
//     preprocessedFields.push({
//       field: fieldNames[index],
//       detailField: fieldDetailNames[index],
//       maxRecruit: fieldNumbers[index],
//     });
//   }

//   return preprocessedFields;
// };

const CreateProject = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [addingField, setAddingField] = useState(false);
  const [addingReference, setAddingReference] = useState(false);
  const [generatingIdea, setGeneratingIdea] = useState(false);
  const [useIdeaFeature, setUseIdeaFeature] = useState(false);

  const [openAIError, setOpenAIError] = useState(false);

  const [activeKakao, setActiveKakao] = useState(false);
  const [activeDiscord, setActiveDiscord] = useState(false);

  const [words, setWords] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [recruitmentDeadLine, setRecruitmentDeadLine] = useState(new Date());
  const [fields, setFields] = useState([]);
  const [references, setReferences] = useState([]);

  const [kakao, setKakao] = useState("");
  const [discord, setDiscord] = useState("");

  let [totalFieldsNumber, setTotalFieldsNumber] = useState(0);
  let [theNumberOfRemain, setTheNumberOfRemain] = useState(5);

  const [projectId, setProjectId] = useState();

  useEffect(() => {
    // const fetch = async () => {
    //   await axios
    //     .get("URL")
    //     .then((res) => {
    //       return res;
    //     })
    //     .catch((e) => {
    //       return e;
    //     });
    // };
    // fetch();
    setIsLoading(false);
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeActiveDiscord = (e) => {
    if (activeDiscord) {
      setDiscord("");
    }
    setActiveDiscord(!activeDiscord);
  };

  const onChangeActiveKakao = (e) => {
    if (activeKakao) {
      setKakao("");
    }
    setActiveKakao(!activeKakao);
  };

  const onChangeDiscord = (e) => {
    setDiscord(e.target.value);
  };

  const onChangeKakao = (e) => {
    setKakao(e.target.value);
  };

  const onClickGPTBtn = async (e) => {
    e.preventDefault();
    setGeneratingIdea(true);
    await axios
      .post(
        `http://localhost:5000/ask/idea`,
        {
          role: "user",
          content:
            "초보 개발자 5명이 14일동안 개발할 수 있는 재미있고 유용한 사이드 프로젝트 하나만 추천해줘",
        },
        {}
      )
      .then(async (res) => {
        console.log(res.data.data.choices[0].message.content);
        setWords([res.data.data.choices[0].message.content]);
      })
      .catch(async (err) => {
        await setOpenAIError(true);
        console.error(err);
      });

    await setUseIdeaFeature(true);
    await setGeneratingIdea(false);
  };

  const onCreateProject = async (e) => {
    const projectDate = {
      year: recruitmentDeadLine.getFullYear(),
      month: recruitmentDeadLine.getMonth() + 1,
      date: recruitmentDeadLine.getDate(),
    };

    const { year, month, date } = projectDate;

    let recruitmentDeadLine2 =
      String(year) +
      String(month).padStart(2, "0") +
      String(date).padStart(2, "0");

    recruitmentDeadLine2 = `${String(year)}-${String(month).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;

    console.log(recruitmentDeadLine2);
    //데이터 형식***************************************************************************************************
    // yyyy:mm:dd

    e.preventDefault();
    await setCreating(true);
    console.log(fields);
    // console.log(SearchPreprocessedField(fields));
    // try {
    //   await axios
    //     .post(
    //       `http://localhost:8080/projects/add`,
    //       {
    //         title: title,
    //         description: description,
    //         recruitmentDate: recruitmentDeadLine2,
    //         // startDate: "",
    //         // endDate: "",
    //         recruitUserDto: fields,
    //         references: references,
    //         openChatUrl: kakao,
    //         voiceChatUrl: discord,
    //       },
    //       {}
    //     )
    //     .then((res) => {
    //       // const id = res.data;
    //       // window.location.replace(`/project/${id}`);
    //       // console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    await setCreating(false);
  };

  if (isLoading || creating) {
    return isLoading ? <Loading /> : <></>;
  } else {
    return (
      <div className="container px-5">
        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* GPT에게 물어보기</h4>

            <span className="text-muted">
              GPT에게 사이드 프로젝트 아이디어를 질문하세요
            </span>
            {words.length === 0 ? <></> : <GPTPrint words={words} />}
          </div>
          {generatingIdea ? (
            <button className="btn btn-primary btn-sm" disabled>
              <div
                className="spinner-border text-light spinner-border-sm"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              disabled={useIdeaFeature}
              onClick={onClickGPTBtn}
            >
              아이디어 질문하기
            </button>
          )}
        </div>

        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 사이드 프로젝트명</h4>
            <span className="text-muted">
              직관적인 프로젝트명을 사용하면 클릭률이 올라갑니다
            </span>
          </div>
          <TitleInput title={title} onChangeTitle={onChangeTitle} />
        </div>
        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 사이드 프로젝트 설명</h4>
            <span className="text-muted">
              설명이 풍부할수록 프로젝트의 지원율이 높아집니다
            </span>
          </div>
          <DescriptionInput
            description={description}
            onChangeDescription={onChangeDescription}
          />
        </div>
        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 사이드 프로젝트 시작 기간</h4>
            <span className="text-muted">
              더 빠른 시간에 시작할수록, 프로젝트 성공 확률이 높아집니다.
            </span>
          </div>
          <DatePicker
            selected={recruitmentDeadLine}
            onChange={(date) => setRecruitmentDeadLine(date)}
            className="form-control"
          />
        </div>

        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 커뮤니티</h4>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="" style={{ display: "flex" }}>
                <div className="form-check form-switch">
                  <label
                    className="form-check-label text-muted"
                    htmlFor="flexSwitchCheckDefault1"
                  >
                    <i className="fa-brands fa-discord fa-lg"></i>
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault1"
                    onChange={onChangeActiveDiscord}
                  />
                </div>
              </div>
              <div className="col">
                <input
                  className="form-control"
                  disabled={!activeDiscord}
                  name="discord"
                  value={discord}
                  onChange={onChangeDiscord}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="" style={{ display: "flex" }}>
                <div className="form-check form-switch">
                  <label
                    className="form-check-label text-muted"
                    htmlFor="flexSwitchCheckDefault2"
                  >
                    <i className="fa-solid fa-comment fa-lg"></i>
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault2"
                    onChange={onChangeActiveKakao}
                  />
                </div>
              </div>
              <div className="col">
                <input
                  className="form-control"
                  disabled={!activeKakao}
                  name="kakao"
                  value={kakao}
                  onChange={onChangeKakao}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 모집 인원</h4>
            <span>최대 5명까지 지원이 가능합니다.</span>
          </div>
          <div>
            <FieldList
              fields={fields}
              theNumberOfRemain={theNumberOfRemain}
              setTheNumberOfRemain={setTheNumberOfRemain}
            />
          </div>
          <div>
            <FieldSelectTag
              theNumberOfRemain={theNumberOfRemain}
              setAddingField={setAddingField}
              fields={fields}
              totalFieldsNumber={totalFieldsNumber}
              setTotalFieldsNumber={setTotalFieldsNumber}
              setTheNumberOfRemain={setTheNumberOfRemain}
            />
          </div>
        </div>
        <div>
          <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 참고 자료</h4>
            <span>
              벤치마킹하는 서비스나, 프로젝트를 정리하신 자료의 웹주소를
              등록해주세요.
            </span>
          </div>
          <div>
            <ReferenceList
              references={references}
              addingReference={addingReference}
            />
          </div>
          <div className="mt-2">
            <ReferenceInput
              creating={creating}
              referenceLabel={""}
              references={references}
              setAddingReference={setAddingReference}
            />
          </div>
        </div>
        <div className="mb-2 pt-5">
          <button className="btn btn-primary w-100" onClick={onCreateProject}>
            Start Project
          </button>
        </div>
      </div>
    );
  }
};

export default CreateProject;
