import React, { useState } from "react";
import styled from "styled-components";
import programmer from "../assets/images/programming.svg";
const Home = () => {
  const [projects, setProjects] = useState([]);

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
                  href="#explore"
                >
                  모집중인 프로젝트
                  <i class="ms-2" data-feather="arrow-right"></i>
                </a>
                <a
                  class="btn btn-lg btn-primary-soft text-primary fw-500"
                  href="https://docs.startbootstrap.com/sb-ui-kit-pro/quickstart"
                  target="#"
                >
                  로드맵 확인하러가기
                </a>
              </div>
            </div>
            <div
              class="col-lg-6 d-none d-lg-block"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img class="img-fluid" src={programmer} alt="..." />
            </div>
          </div>
        </div>
      </div>

      <section class="bg-light py-10" id="explore">
        <div class="container px-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-8">
              <div class="text-center mb-10">
                <div class="badge rounded-pill bg-primary-soft text-primary badge-marketing mb-3">
                  완성된 프로젝트들을 눈으로 직접 확인하세요
                </div>
                <h2>완성된 프로젝트들</h2>
                <p class="lead">
                  해당 프로젝트들을 통해 새로운 아이디어를 얻으세요!
                </p>
              </div>
            </div>
          </div>
          <div class="row gx-5 text-center">
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 1 - Multipurpose</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-multipurpose.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-multipurpose.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 2 - Mobile App</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-app-mobile.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-app-mobile.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 3 - Desktop App</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-app-desktop.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-app-desktop.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 4 - Agency</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-agency.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-agency.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 5 - Lead Capture</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-lead-capture.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-lead-capture.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 6 - Press</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-press.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-press.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 7 - Directory</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-directory.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-directory.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 8 - Rental</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-rental.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-rental.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 9 - Real Estate</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-real-estate.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-real-estate.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 10 - Classifieds</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-classifieds.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-classifieds.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 11 - Resume</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-resume.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-resume.png"
                />
              </a>
            </div>
            <div class="col-lg-4 mb-5">
              <h6 class="mb-3">Demo 12 - Portfolio</h6>
              <a
                class="d-block rounded-3 lift lift-lg"
                href="landing-portfolio.html"
              >
                <img
                  class="img-fluid rounded-3"
                  src="https://assets.startbootstrap.com/img/screenshots-product-pages/sb-ui-kit-pro/landing-portfolio.png"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="svg-border-rounded text-white">
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

      <section class="bg-white py-10">
        <div class="container px-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-8">
              <div class="text-center mb-10">
                <h2>CampusCrew 현황</h2>
                <p class="lead">
                  해당 사이트를 이용하시는 유저분들, 진행중인 프로젝트, <br />
                  완료된 프로젝트의 수를 확인하세요.
                </p>
              </div>
            </div>
          </div>
          <div class="row gx-5">
            <div class="col-lg-4 text-center mb-5">
              <div class="display-1 fw-700 text-gray-400">00+</div>
              <div class="h5">현재 가입된 유저의 수</div>
              <p>
                We've extended and restyled Bootstrap's default components to
                create a this beautifully designed UI Toolkit.
              </p>
            </div>
            <div class="col-lg-4 text-center mb-5">
              <div class="display-1 fw-700 text-gray-400">00+</div>
              <div class="h5">진행중인 사이드 프로젝트의 수</div>
              <p>
                Pre-built page templates will save you hours of development
                time, allowing you to launch your project faster.
              </p>
            </div>
            <div class="col-lg-4 text-center mb-5">
              <div class="display-1 fw-700 text-gray-400">00+</div>
              <div class="h5">완료된 프로젝트의 수</div>
              <p>
                Extended and new utility classes will give you even more control
                over your content with minimal custom CSS.
              </p>
            </div>
          </div>
          <div class="text-center">
            <div class="text-center mb-10">
              <p class="lead">회원 가입을 완료 후 멋진 팀원들과 함께 하세요.</p>
            </div>
            <a class="btn btn-primary fw-500" href="#">
              회원등록하기
            </a>
          </div>
        </div>
        <div class="svg-border-rounded text-light">
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
    </>
  );
};

export default Home;
