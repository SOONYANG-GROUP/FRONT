import React, { useEffect, useState } from "react";

import RoadmapCards from "../../Components/Cards/Cards/RoadmapCards";

import RoadmapDummyData from "../../DummyData/Roadmap.json";
import Loading from "../Loading";
import windows from "../../assets/images/windows.svg";
import CreateSkillBtn from "../../Components/Modal/CreateSkillModal";
const Roadmaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    if (GetRoadmaps()) {
      setRoadmaps(RoadmapDummyData.roadmaps);
      setIsLoading(false);
    }
  }, []);

  const GetRoadmaps = () => {
    return RoadmapDummyData.roadmaps;
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div class="page-header-ui-content pt-5">
          <div class="container px-5">
            <div class="row gx-5 align-items-center">
              <div class="col-lg-6" data-aos="fade-up">
                <h1 class="page-header-ui-title">이론보다는 실전!</h1>
                <p class="page-header-ui-text mb-5">
                  CampusCrew는 다양한 사이드프로젝트 추천과 로드맵을 함께
                  제공해드립니다.
                </p>
                <div class="d-flex flex-column flex-sm-row">
                  <a
                    class="btn btn-lg btn-primary fw-500 me-sm-3 mb-3 mb-sm-0"
                    href="/create/roadmap"
                  >
                    로드맵 추가하기
                    <i class="ms-2" data-feather="arrow-right"></i>
                  </a>
                  <CreateSkillBtn />
                </div>
              </div>
              <div
                class="col-lg-6 d-none d-lg-block"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img class="img-fluid" src={windows} alt="..." />
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          {console.log(roadmaps)}
          <RoadmapCards roadmaps={roadmaps} />
        </div>
      </>
    );
  }
};

export default Roadmaps;
