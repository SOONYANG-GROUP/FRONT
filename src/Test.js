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
      console.log(res);
      axios.get("http://localhost:8080/login").then((res) => {
        return res;
      });
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

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  // useEffect(
  //   () => {
  //     axios
  //       .get("/user_inform/login")
  //       .then((res) => console.log(res))
  //       .catch();
  //   },
  //   // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  //   []
  // );

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
