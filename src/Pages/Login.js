import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const params = new URLSearchParams(window.location.search);
  const [accessToken, setAccessToken] = useState(params.get("accessToken"));
  const [refreshToken, setRefreshToken] = useState(params.get("refreshToken"));

  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);

<<<<<<< HEAD

  useEffect(() => {
=======
  const onclickButton = () => {
>>>>>>> 0f6589f37608030ed98f5ceb26a4be37afc337f4
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
<<<<<<< HEAD
  }, []);

  const onSendToken = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/jwt-test", null, {
        headers: {
          "Content-Type": "application/json",
          "Authorization-refresh": refreshToken,
        },
      })
      .then((res) => {
        console.log(res);
      });
=======
>>>>>>> 0f6589f37608030ed98f5ceb26a4be37afc337f4
  };

  return (
    <>
      <button onClick={onclickButton}>send refreshToken</button>
    </>
  );
};

export default Login;
