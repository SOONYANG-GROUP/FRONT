import axios from "axios";
import { useEffect, useState } from "react";

const Testnode = () => {
  //   axios.interceptors.request.use(
  //     function (config) {
  //       console.log(config);
  //       return config;
  //     },
  //     function (error) {
  //       console.log(error);
  //       return Promise.reject(error);
  //     }
  //   );

  //   // 응답 인터셉터 추가
  //   axios.interceptors.response.use(
  //     function (response) {
  //       console.log(response);
  //       return response;
  //     },
  //     function (error) {
  //       console.log(error);
  //       return Promise.reject(error);
  //     }
  //   );

  const onClickGetButton = () => {
    console.log("onclickget");
    const fetch = async () => {
      await axios
        .post("http://localhost:3001", null, {})
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetch();
  };

  const onClickPostButton = () => {
    console.log("onclickpost");
    const fetch = async () => {
      await axios
        .post("http://localhost:3001", { name: "jk", alias: "Trash" }, {})
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetch();
  };

  return (
    <>
      <button onClick={onClickGetButton}>GET</button>
      <button onClick={onClickPostButton}>POST</button>
    </>
  );
};

export default Testnode;
