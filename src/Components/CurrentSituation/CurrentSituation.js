const CurrentSituation = ({
  userCounter,
  runningProject,
  recruitingProject,
}) => {
  return (
    <>
      <section className="bg-white py-10 mt-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-10">
                <h2>Campus Crew 현황</h2>
                <p className="lead">
                  해당 사이트를 이용하시는 유저분들, 진행중인 프로젝트, <br />
                  완료된 프로젝트의 수를 확인하세요.
                </p>
              </div>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-lg-4 text-center mb-5 animate__animated animate__fadeInUp">
              <div className="display-1 fw-700 text-gray-400">
                {recruitingProject}+
              </div>
              <div className="h5">모집중인 프로젝트의 수</div>
            </div>
            <div className="col-lg-4 text-center mb-5 animate__animated animate__fadeInUp">
              <div className="display-1 fw-700 text-gray-400">
                {runningProject}+
              </div>
              <div className="h5">진행중인 사이드 프로젝트의 수</div>
            </div>
            <div className="col-lg-4 text-center mb-5 animate__animated animate__fadeInUp">
              <div className="display-1 fw-700 text-gray-400">
                {userCounter}+
              </div>
              <div className="h5">현재 가입된 유저의 수</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-center mb-10">
              <p className="lead">
                회원 가입을 완료 후 멋진 팀원들과 함께 하세요.
              </p>
            </div>
            <a className="btn btn-primary fw-500" href="/registration">
              회원등록하기
            </a>
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
    </>
  );
};

export default CurrentSituation;
