import axios from "axios";
import { useState, useEffect } from "react";
import FieldList from "./Components/List/FieldList";
import { FieldSelectTag } from "./Components/Inputs/Select";
import { BACK_URL } from "./Components/Constants/URL";
const Test = () => {
  const [age, setAge] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  let [totalFieldsNumber, setTotalFieldsNumber] = useState(0);
  let [theNumberOfRemain, setTheNumberOfRemain] = useState(5);
  const [addingField, setAddingField] = useState(false);
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
      age: age,
      password: password,
      email: email,
      nickname: nickname,
      name: name,
    };
    axios
      .post(`${BACK_URL}/join`, data)
      .then((res) => console.log(res))
      .catch();
    window.location.href("/");
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
        <label>AGE : </label>
        <input
          type="text"
          name="input_id"
          value={age}
          onChange={handleInputAge}
        />
      </div>
      <div>
        <label>PW : </label>
        <input
          type="text"
          name="input_id"
          value={password}
          onChange={handleInputPassword}
        />
      </div>
      <div>
        <label>EMAIL : </label>
        <input
          type="text"
          name="input_id"
          value={email}
          onChange={handleInputEmail}
        />
      </div>
      <div>
        <label>nickname : </label>
        <input
          type="text"
          name="input_id"
          value={nickname}
          onChange={handleInputNickname}
        />
      </div>
      <div>
        <label htmlFor="input_pw">name : </label>
        <input
          type="text"
          name="input_pw"
          value={name}
          onChange={handleInputName}
        />
      </div>
      <div className="row">
        <div>
          <FieldList
            fields={fields}
            theNumberOfRemain={theNumberOfRemain}
            setTheNumberOfRemain={setTheNumberOfRemain}
          />
        </div>
        <div>
          <FieldSelectTag
            theNumberOfRemain={theNumberOfRemain}
            setAddingField={setAddingField}
            fields={fields}
            totalFieldsNumber={totalFieldsNumber}
            setTotalFieldsNumber={setTotalFieldsNumber}
            setTheNumberOfRemain={setTheNumberOfRemain}
          />
        </div>
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
