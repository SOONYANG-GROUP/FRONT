import axios from "axios";
import React, { useState } from "react";

export const LoginModalBtn = ({ isLoggedIn }) => {
  const onLogOut = async (e) => {
    sessionStorage.clear();
    window.location.href = "/";
    await axios.get("http://localhost:8080/logout").then((res) => {
      return res;
    });
  };

  if (!isLoggedIn) {
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
  } else {
    return (
      <>
        <button type="button" className="btn btn-primary" onClick={onLogOut}>
          로그아웃
        </button>
      </>
    );
  }
};

export const LoginModal = () => {
  const HandleGoogleButtonClick = async (e) => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  const HandleNaverButtonClick = async (e) => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h4 className="text-center">로그인 하기</h4>
            <div>
              <div>
                <button
                  className="w-100 mb-3 btn btn-primary"
                  onClick={HandleGoogleButtonClick}
                >
                  <span className="fs-5">
                    <i className="fa-brands fa-google"></i> 구글 로그인하기
                  </span>
                </button>
              </div>
              <div>
                <button
                  className="w-100 mb-3 btn btn-success"
                  onClick={HandleNaverButtonClick}
                >
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
                <button className="w-100  mb-3 btn btn btn-warning">
                  <span className="fs-5">
                    <i className="fa-solid fa-comment"></i> 카카오 로그인하기
                  </span>
                </button>
              </div>
              <div>
                <a href="/test">
                  <button className="w-100  mb-3 btn btn btn-secondary">
                    <span className="fs-5">
                      <i className="fa-solid fa-user"></i> 일반 로그인
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
