import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      console.log("세션스토리지에 accessToken이 없습니다.");
      let accessToken = params.get("accessToken");
      let refreshToken = params.get("refreshToken");
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      console.log(accessToken);
      console.log(refreshToken);
    }
    setIsLoading(false);
  }, [params]);

  const onClickButton = () => {
    const fetch = async () => {
      //토큰 발급 후 재발급
      console.log("요청");
      await axios
        .post("http://localhost:8080/jwt-test", null, {})
        .then((response) => {
          console.log("response입니다 ", response);
          // const params = new URLSearchParams(window.location.search);
          // let accessToken = params.get("accessToken");
          // let refreshToken = params.get("refreshToken");

          // window.sessionStorage.setItem("accessToken", { accessToken });
          // window.sessionStorage.setItem("refreshToken", { refreshToken });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetch();
  };
  if (!isLoading) {
    return (
      <>
        <button onClick={onClickButton}>send refreshToken</button>
      </>
    );
  }
};

export default Login;
