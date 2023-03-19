import axios from "axios";
import { useState, useEffect } from "react";

const Test = () => {
  const [age, setAge] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputAge = (e) => {
    setAge(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    let data = {
      age: { age },
      password: { password },
      email: { email },
      nickname: { nickname },
      name: { name },
    };
    axios
      .post("http://localhost:8080/join", JSON.stringify(data))
      .then((res) => console.log(res))
      .catch();
  };

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(
    () => {},
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []
  );

  return (
    <div>
      <h2>resist</h2>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={age}
          onChange={handleInputAge}
        />
      </div>
      <div>
        <label htmlFor="input_id">PW : </label>
        <input
          type="text"
          name="input_id"
          value={password}
          onChange={handleInputPassword}
        />
      </div>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={email}
          onChange={handleInputEmail}
        />
      </div>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={nickname}
          onChange={handleInputNickname}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="text"
          name="input_pw"
          value={name}
          onChange={handleInputName}
        />
      </div>
      <div>
        <button type="button" onClick={onClickLogin}>
          Resist
        </button>
      </div>
    </div>
  );
};

export default Test;
