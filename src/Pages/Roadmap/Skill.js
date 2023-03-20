import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import frontendDeveloper from "../../assets/images/frontendDeveloper.svg";

import SkillsDummyData from "../../DummyData/Skills.json";

const Skill = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [skill, setSkill] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    if (GetSkill(id)) {
      setSkill(GetSkill(id));
      setIsLoading(false);
    }
  }, [id]);

  const GetSkill = (id) => {
    return SkillsDummyData.skills[id - 1];
  };

  if (!isLoading) {
    console.log(skill);
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
                    <a class="me-3" href="#!">
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
                          src={skill.imageUrl}
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
        <section class="bg-white py-10">
          <div class="container px-5">
            <div class="row gx-5 text-center">
              <div class="col-lg-4 mb-5 mb-lg-0">
                <h3>평균 연봉</h3>
                <br />
                asd
              </div>
              <div class="col-lg-4 mb-5 mb-lg-0">
                <h3>대표 언어</h3>
                <br />
                asd
              </div>
              <div class="col-lg-4 mb-5 mb-lg-0">
                <h3>대표 프레임 워크</h3>
                <br />
                asd
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
      </div>
    );
  }
};

export default Skill;
