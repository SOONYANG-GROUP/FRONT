import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  if (!sessionStorage.getItem("accessToken")) {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  const onclickButton = () => {
    const fetch = async () => {
      console.log("요청");
      await axios
        .post("http://localhost:8080/jwt-test", null, {})
        .then((response) => {
          console.log("response입니다 ", response);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetch();
  };

  return (
    <>
      <button onClick={onclickButton}>send refreshToken</button>
    </>
  );
};

export default Login;
