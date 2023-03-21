import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const params = new URLSearchParams(window.location.search);
  let accessToken = params.get("accessToken");
  let refreshToken = params.get("refreshToken");

<<<<<<< Updated upstream
  sessionStorage.setItem("accessToken", { accessToken });
  sessionStorage.setItem("refreshToken", { refreshToken });
=======
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);
>>>>>>> Stashed changes

  useEffect(() => {
    const fetch = async () => {
      console.log("요청");
      await axios
        .post("http://localhost:8080/jwt-test", null, {})
        .then((response) => {
          console.log("response입니다 ", response);
        })
        .catch((e) => {
          console.error(e.message);
          // const throwException = async () => {
          //   console.log("throwExceoption");
          //   await axios
          //     .post("http://localhost:8080/jwt-test", null, {
          //       headers: {
          //         "Content-Type": "application/json",
          //         "Authorization-refresh": refreshToken,
          //         Authorization: accessToken,
          //       },
          //     })
          //     .then((res) => {
          //       console.log(res);
          //     });
          // };
          // throwException();
          // handle error
        });
    };
    fetch();
  }, []);

  // useEffect(() => {
  //   const fetch = async (e) => {
  //     await axios.interceptors.request.use();
  //   };
  // });

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
  };

  return (
    <>
      <button onClick={onSendToken}>send refreshToken</button>
    </>
  );
};

export default Login;
