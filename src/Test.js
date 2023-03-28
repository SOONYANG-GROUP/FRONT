import axios from "axios";
import { useState, useEffect } from "react";

const Test = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = async () => {
    let data = {
      password: inputPw,
      email: inputId,
    };
    console.log(data);
    await axios.post("http://localhost:8080/login", data).then((res) => {
      if (!sessionStorage.getItem("accessToken")) {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        // window.location.replace("/");
      }
      return res;
    });
  };

  const onLogOut = async (e) => {
    sessionStorage.clear();
    window.location.href = "/";
    await axios.get("http://localhost:8080/logout").then((res) => {
      return res;
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>ID : </label>
        <input
          type="text"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
        />
      </div>
      <div>
        <label>PW : </label>
        <input
          type="password"
          name="input_pw"
          value={inputPw}
          onChange={handleInputPw}
        />
      </div>
      <div>
        <button type="button" onClick={onClickLogin}>
          Login
        </button>
        <button type="button" onClick={onLogOut}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Test;
