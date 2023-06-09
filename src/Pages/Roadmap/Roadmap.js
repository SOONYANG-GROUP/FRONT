import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { SUB_BACK_URL } from "../../Components/Constants/URL";

const Roadmap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const id = useParams().id;

  const promiseHandler = (callType, setStateType) => {
    callType.then((data) => {
      setStateType(data);
    });
  };

  useEffect(() => {
    // 더미 데이터
    // if (GetRoadmap(id)) {
    //   setRoadmap(GetRoadmap(id));
    //   setIsLoading(false);
    // }

    // 서버 용
    //promiseHandler(GetRoadmap(id), setRoadmap);
    promiseHandler(GetRoadmap(id), setRoadmap);

    setIsLoading(false);
  }, [id]);

  const GetRoadmap = async (id) => {
    // 더미 데이터
    // return RoadmapDummyData.roadmaps[id - 1];

    // 서버용
    const roadmapForLoading = await axios
      .get(`${SUB_BACK_URL}/roadmap/one/${id}`)
      .then(async (res) => {
        const roadmap = await res.data.roadmap;
        return roadmap;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    return roadmapForLoading;
  };

  if (!isLoading && roadmap !== null) {
    return (
      <div>
        <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
          <div className="page-header-ui-content mb-n5">
            <div className="container px-5">
              <div className="row gx-5 justify-content-center align-items-center mt-5 mb-5">
                <div
                  className="col-lg-4 z-1 aos-init aos-animate"
                  data-aos="fade-left"
                >
                  <div className="device-wrapper mx-auto mb-n15">
                    <div
                      class="device"
                      data-device="iPhoneX"
                      data-orientation="portrait"
                      data-color="black"
                    >
                      <div className="screen">
                        <div
                          style={{
                            background: `url(${roadmap.imageSecureUrl})`,
                            height: "350px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            border: "1px solid white",
                          }}
                          className="rounded-3 shadow-lg animate__animated animate__flipInY"
                        ></div>
                        {/* <img
                          className="img-fluid rounded-1"
                          src={roadmap.imageSecureUrl}
                          width="75%"
                          style={{ height: '380px'}}
                          alt="..."
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-8 aos-init aos-animate mt-3"
                  data-aos="fade-right"
                >
                  <h1 className="page-header-ui-title text-center animate__animated animate__fadeInDown">
                    {roadmap.name}
                  </h1>
                  <div className="mb-5 mb-lg-0 text-center animate__animated animate__fadeInDown">
                    <a
                      className="me-3"
                      style={{ textDecoration: "none" }}
                      href={`/edit/roadmap/${roadmap._id}`}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> 수정 하기
                    </a>
                  </div>

                  <section className="bg-white py-10 mt-5">
                    <div className="container px-5">
                      <div className="row gx-5 text-center">
                        <div className="col-lg-4 mb-3 mb-lg-0 animate__animated animate__fadeInUp">
                          <h5 className="font-weight-bold">
                            <i className="fa-solid fa-money-bill-simple-wave"></i>{" "}
                            평균 연봉
                          </h5>
                          <br />
                          <p className="mb-0 fs-3">{roadmap.averageSalary}</p>
                        </div>
                        <div className="col-lg-4 mb-3 mb-lg-0 animate__animated animate__fadeInUp">
                          <h5 className="font-weight-bold">
                            <i className="fa-solid fa-code"></i> 언어
                          </h5>
                          <br />
                          <p className="mb-0 fs-3">
                            {roadmap.computerLanguage}
                          </p>
                        </div>
                        <div className="col-lg-4 mb-3 mb-lg-0 animate__animated animate__fadeInUp">
                          <h5 className="font-weight-bold">
                            <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                            프레임 워크
                          </h5>
                          <br />
                          <p className="mb-0 fs-3">{roadmap.framework}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </header>
        <br />
        <section className="bg-white py-10" id="get-started">
          <div className="container px-5">
            <div className="row gx-5 text-center">
              <div className="text-uppercase-expanded small mb-2 pt-5 pb-5">
                <h3>필요한 기술 스택</h3>
              </div>
              {roadmap.skills.map((s, index) => {
                return (
                  <div className="col-lg-4 mb-5 mb-lg-0">
                    <a
                      href={`/skill/${s._id}`}
                      key={index}
                      className="text-black"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4">
                        <img
                          src={s.imageSecureUrl}
                          alt="..."
                          width="70"
                          height="70"
                        />
                      </div>
                      <h2>{s.name}</h2>
                      <p className="mb-0">{s.description}</p>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="svg-border-rounded text-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 144.54 17.34"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
            </svg>
          </div>
        </section>
      </div>
    );
  }
};

export default Roadmap;
