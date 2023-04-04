import React, { useEffect, useState } from "react";
import RoadmapCards from "../../Components/Cards/Cards/RoadmapCards";
import Loading from "../Loading";
import windows from "../../assets/images/windows.svg";
import SkillCards from "../../Components/Cards/Cards/SkillCards";

import axios from "axios";
import { SUB_BACK_URL } from "../../Components/Constants/URL";

const Roadmaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [ skills, setSkills ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(0);

  const promiseHandler = (callType, setStateType) => {
    callType.then((data) => {
      setStateType(data);
    })
  }

  useEffect(() => {
    promiseHandler(GetRoadmaps(), setRoadmaps);
    promiseHandler(GetSkills(), setSkills);
    setIsLoading(false);

    //if (GetRoadmaps() && GetSkills()) {
    //  setRoadmaps(RoadmapDummyData.roadmaps);
    //  setSkills(SkillsDummyData.skills);
    //  setIsLoading(false);
    //}
  }, []);


  const GetRoadmaps = async () => {
    // 더미 데이터
    // return RoadmapDummyData.roadmaps;

    // 서버를 통해 받아오기
    const roadmapsForLoading = await axios.get(`${SUB_BACK_URL}/roadmap/all`)
    .then(async(res) => {
      const roadmaps = await res.data.roadmaps;
      return roadmaps;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
    return roadmapsForLoading;
  };

  const GetSkills = async () => {
    // 더미 데이터
    // return SkillsDummyData.skills;

    // 서버를 통해 받아오기
    const skillsForLoading = await axios.get(`${SUB_BACK_URL}/skill/all`)
    .then(async (res) => {
        const skills = await res.data.skills;
        return skills;
    })
    .catch((err) => {
        console.error(err);
        return [];
    });

    return skillsForLoading;
  }

  const onClickPageNumber = async (e) => {
    e.preventDefault();
    await setGenerating(true);
    setPageNumber(parseInt(e.target.id));
    await setGenerating(false);
  }


  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="page-header-ui-content pt-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6" data-aos="fade-up">
                <h1 className="page-header-ui-title">이론보다는 실전!</h1>
                <p className="page-header-ui-text mb-5">
                  CampusCrew는 다양한 사이드프로젝트 추천과 로드맵을 함께
                  제공해드립니다.
                </p>
                <div className="d-flex flex-column flex-sm-row">
                  <a
                    className="btn btn-lg btn-primary fw-500 me-sm-3 mb-3 mb-sm-0 animate__animated animate__fadeInDown"
                    href="/create/roadmap"
                  >
                    로드맵 추가하기
                    <i className="ms-2" data-feather="arrow-right"></i>
                  </a>
                  <a
                    className="btn btn-lg btn-primary-soft text-primary fw-500 animate__animated animate__fadeInDown"
                    href="/create/skill"
                  >
                     스킬 추가하기
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 d-none d-lg-block"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img className="img-fluid" src={windows} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <RoadmapPage 
          roadmaps={roadmaps}
          skills={skills}
          generating={generating}
          pageNumber={pageNumber}
          onClickPageNumber={onClickPageNumber}
        />
      </>
    );
  }
};

const RoadmapsNav = ({
  pageNumber,
  onClickPageNumber
}) => {
  return(
    <div>
    <ul className="nav nav-pills justify-content-center">
      <li className="nav-item">
        <a 
          id={0}
          className={`nav-link ${pageNumber === 0 ? "active" : ""}`} 
          aria-current="page" 
          href="#!" 
          onClick={onClickPageNumber}
        >로드맵</a>
      </li>
      <li className="nav-item">
        <a 
          id={1}
          className={`nav-link ${pageNumber === 1 ? "active" : ""}`} 
          href="#"
          onClick={onClickPageNumber}  
        >스킬</a>
      </li>
    </ul>
  </div>
  )
}

const RoadmapPage = ({
  roadmaps,
  skills,
  generating,
  pageNumber,
  onClickPageNumber
}) => {
  if(generating)
  {
    return(
      <div>
        Generating
      </div>
    )
  }
  else
  {
    if(pageNumber === 0)
    {
      return(<RoadmapZeroPage 
        roadmaps={roadmaps} 
        pageNumber={pageNumber}
        onClickPageNumber={onClickPageNumber}
        />)
    }
    else if(pageNumber === 1)
    {
      return(<RoadmapOnePage 
        skills={skills} 
        pageNumber={pageNumber}
        onClickPageNumber={onClickPageNumber}
      />)
    }
    else
    {
      return(<></>)
    }
  }
}

const RoadmapOnePage = ({
  skills,
  pageNumber,
  onClickPageNumber
}) => {
  return(
    <div className="container mt-5">
      <RoadmapsNav 
        pageNumber={pageNumber}
        onClickPageNumber={onClickPageNumber}
      />
      <SkillCards 
        skills={skills}
      />
    </div>
  )
}

const RoadmapZeroPage = ({
  pageNumber,
  roadmaps,
  onClickPageNumber
}) => {
  return(
    <div className="container mt-5">
      <RoadmapsNav 
        pageNumber={pageNumber}
        onClickPageNumber={onClickPageNumber}
      />
      <RoadmapCards roadmaps={roadmaps} />
    </div>
  )
}

export default Roadmaps;
