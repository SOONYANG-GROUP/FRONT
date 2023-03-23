import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const params = new URLSearchParams(window.location.search);
  const [accessToken, setAccessToken] = useState(params.get("accessToken"));
  const [refreshToken, setRefreshToken] = useState(params.get("refreshToken"));

  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);

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
