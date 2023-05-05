import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import HomeThumbnail from "./HomeThumbnail.png";

// 출처
// https://bootstrapmade.com/herobiz-bootstrap-business-template/download/

const WebCamHome = () => {
  const location = useLocation();
  const projectId = location.state.projectId;
  const [roomName, setRoomName] = useState("");
  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(`/room/${projectId}`, "_blank");
  };

  return (
    <div className="container">
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="mt-5 animate__animated animate__fadeIn animate__slower"
      >
        <img
          src={HomeThumbnail}
          alt="thumbnail"
          className="img-fluid"
          style={{
            width: "40%",
            height: "40%",
          }}
        />
      </section>
      <section className="mt-5 text-center animate__animated animate__fadeInUp animate__slower">
        <h2>화상 채팅 앱에 오신 것을 환영합니다!</h2>
        <p className="text-muted">프로젝트 인원들과 원격으로 만나보세요 😘</p>
      </section>
      <section
        className="mt-3 animate__animated animate__fadeInUp animate__slower"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={onSubmit}>
          <div className="mt-2">
            <button className="btn btn-primary w-100">들어가기</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default WebCamHome;
