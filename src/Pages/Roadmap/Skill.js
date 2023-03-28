import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import frontendDeveloper from "../../assets/images/frontendDeveloper.svg";

import SkillsDummyData from "../../DummyData/Skills.json";

const Skill = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState(null);
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
        return skill;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    return skillForLoading;
  };

  console.log(skill)

  if (!isLoading && skill) {
    return (
      <div>
        <header class="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
          <div class="page-header-ui-content mb-n5">
            <div class="container px-5">
              <div class="row gx-5 justify-content-center align-items-center mt-5 pt-2 mb-5">
                <div
                  class="col-lg-6 aos-init aos-animate"
                  data-aos="fade-right"
                >
                  <h1 class="page-header-ui-title">{skill.name}란?</h1>
                  <p class="page-header-ui-text mb-5">
                    로그인 기능을 통해 해당 내용을 수정할 수 있습니다.
                  </p>
                  <div class="mb-5 mb-lg-0">
                    <a class="me-3" href={`/edit/skill/${skill._id}`}>
                      내용 수정 하기
                    </a>
                    <a href="#!">관리자 소환</a>
                    <div class="page-header-ui-text mt-2 text-xs font-italic">
                      최근 수정일
                    </div>
                  </div>
                </div>
                <div
                  class="col-lg-6 z-1 aos-init aos-animate"
                  data-aos="fade-left"
                >
                  <div class="device-wrapper mx-auto mb-n15">
                    <div
                      class="device"
                      data-device="iPhoneX"
                      data-orientation="portrait"
                      data-color="black"
                    >
                      <div class="screen">
                        <img
                          class="img-fluid"
                          src={skill.imageSecureUrl}
                          alt="..."
                          width={300}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="svg-border-waves text-white">이미지</div>
        </header>
        <section></section>
        <br />
        <br />
        <br />
      </div>
    );
  }
};

export default Skill;
