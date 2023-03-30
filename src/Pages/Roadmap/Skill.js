import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReferencesSection from "../../Components/Sections/ReferenceSection";
import HelloWorldSection from "../../Components/Sections/HelloWorldSection";

import DownloadLibrarySection from "../../Components/Sections/DownloadLibrarySection";
import GPTPrint from "../../Components/GPT/GPTPrint";

const Skill = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ generatingProblem, setGeneratingProblem ] = useState(false);
  const [ problem, setProblem ] = useState([]);
  const [ useProblemFeature, setUseProblemFeature ] = useState(false);
  
  const [skill, setSkill] = useState(null);
  const [ references, setReferences ] = useState([])
  const [ category, setCategory ] = useState("");
  

  const id = useParams().id;

  const promiseHandler = (callType, setStateType) => {
    callType.then((data) => {
      setStateType(data);
    });
  };

  useEffect(() => {
    // 더미 데이터
    // if (GetSkill(id)) {
    //   setSkill(GetSkill(id));
    //   setIsLoading(false);
    // }

    // 서버용
    promiseHandler(GetSkill(id), setSkill);
    setIsLoading(false);
  }, [id]);

  const GetSkill = async (id) => {
    // 더미 데이터
    // return SkillsDummyData.skills[id - 1];

    // 서버용
    const skillForLoading = await axios
      .get(`http://localhost:9999/skill/one/${id}`)
      .then(async (res) => {
        const skill = await res.data.skill;
        setReferences(skill.references);
        setCategory(skill.category);
        return skill;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    return skillForLoading;
  };

  const onClickGPTBtn = async (e) => {
    e.preventDefault();
    setGeneratingProblem(true);
    try
    {
      await axios
      .post("http://localhost:9999/gpt/skill/problem", {
        skillName: skill.name
      })
      .then(async(res) => {
        setProblem([res.data.data.choices[0].message.content]);
      })
      .catch(async(err) => {
        console.error(err);
      });
    }
    catch(error)
    {
      console.error(error);
    }
    setUseProblemFeature(true);
    setGeneratingProblem(false);
  }

  
  if (!isLoading && skill) {
    return (
      <div>
        <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
          <div className="page-header-ui-content mb-n5">
            <div className="container px-5">
              <div className="row gx-5 justify-content-center align-items-center mt-5 mb-5">
                <div
                  className="col-lg-6 aos-init aos-animate"
                  data-aos="fade-right"
                >
                  <h1 className="page-header-ui-title text-center">{skill.name}</h1>
                  <div className="mb-5 mb-lg-0 text-center">
                    <a className="me-3" style={{ textDecoration: "none"}} href={`/edit/skill/${skill._id}`}>
                      <i className="fa-solid fa-pen-to-square"></i> 수정 하기
                    </a>
                  </div>

                </div>
                <div
                  className="col-lg-6 z-1 aos-init aos-animate"
                  data-aos="fade-left"
                >
                  <div className="device-wrapper mx-auto mb-n15">
                    <div
                      className="device"
                      data-device="iPhoneX"
                      data-orientation="portrait"
                      data-color="black"
                    >
                      <div className="screen">
                        <img
                          className="img-fluid rounded-3"
                          src={skill.imageSecureUrl}
                          alt={skill.name}
                          width="100%"
                          style={{ height: '400px'}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="svg-border-waves text-white">이미지</div>
        </header>
        <section></section>
        
        <div className="container px-5">
            <div>
              {category === "컴퓨터 언어" ? (              
                <HelloWorldSection 
                  name={skill.name}
                  helloworld={skill.helloworld}
                />) : (<></>)}
              
              {category === "라이브러리" ? (
                <DownloadLibrarySection 
                  name={skill.name}
                  downloadLibrary={skill.downloadLibrary}
                />
              ) : (<></>)}
            </div>
            <div>
              <div className="text-uppercase-expanded small mb-2 pt-5">
                <h4 className="fw-bold">🤖 {skill.name}관련 문제 풀기</h4>
                <div>
                  <pre className="fs-4">
                    {problem.length === 0 ? <></> : <GPTPrint words={problem} />}
                  </pre>
                  {generatingProblem ? (
                  <button className="btn btn-sm btn-primary" disabled={generatingProblem}>
                    <div className="spinner-border text-light spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>) : (                  
                  <button disabled={useProblemFeature} className="btn btn-sm btn-primary" onClick={onClickGPTBtn}>
                    GPT에게 {skill.name} 관련 문제 물어보기
                  </button>)}
                </div>
              </div>
            </div>
          <ReferencesSection 
            name={skill.name}
            references={references}
          />
        </div>
      </div>
    );
  }
};

export default Skill;
