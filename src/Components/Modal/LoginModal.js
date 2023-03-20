import axios from "axios";
import React from "react";

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

const responseGoogle = async (response) => {
  console.log(1, response);
  let jwtToken = await axios.post(
    "http://localhost:8080/oauth/jwt/google",
    JSON.stringify(response),
    config
  );
  if (jwtToken.status === 200) {
    console.log(2, jwtToken.data);
    localStorage.setItem("jwtToken", jwtToken.data);
  }
};

export const LoginModalBtn = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        로그인
      </button>
      <LoginModal />
    </>
  );
};

const LoginModal = () => {
  const HandleButtonClick = async (e) => {
    console.log("asd");

    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    // axios
    //   .get("http://localhost:8080/oauth2/authorization/google")
    //   .then((response) => {
    //     console.log(response);
    //     const headerValue = response.headers["header-name"];
    //     console.log(headerValue);
    //     // do something with the header value
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // handle error
    //   });
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <button>LogOut</button>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h4 className="text-center">로그인 하기</h4>
            <div>
              <div>
                <button
                  className="w-100 mb-3 btn btn-primary"
                  onClick={HandleButtonClick}
                >
                  <span className="fs-5">
                    <i className="fa-brands fa-google"></i> 구글 로그인하기
                  </span>
                </button>
              </div>
              <div>
                <button className="w-100 mb-3 btn btn-success">
                  <span className="fs-5">
                    <i className="fa-solid fa-n"></i> 네이버 로그인하기
                  </span>
                </button>
              </div>
              <div>
                <button className="w-100 mb-3 btn btn-dark">
                  <span className="fs-5">
                    <i className="fa-brands fa-github"></i> 깃헙 로그인하기
                  </span>
                </button>
              </div>
              <div>
                <button className="w-100 btn btn btn-warning">
                  <span className="fs-5">
                    <i className="fa-solid fa-comment"></i> 카카오 로그인하기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
