import axios from "axios";
import { useState } from "react";
import { BACK_URL } from "./Components/Constants/URL";

const Test = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = async () => {
    let data = {
      password: inputPw,
      email: inputId,
    };
    try {
      const res = await axios.post(`${BACK_URL}/login`, data);
      if (!sessionStorage.getItem("accessToken")) {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
      }
      window.location.replace("/");
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickLogin(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card glassmorphism p-4 rounded col-md-4">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 ">Login</h2>
          <form>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="input_id"
                name="input_id"
                className="form-control"
                placeholder=" "
                value={inputId}
                onChange={handleInputId}
              />
              <label htmlFor="input_id">Email :</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                id="input_pw"
                name="input_pw"
                className="form-control"
                placeholder=" "
                value={inputPw}
                onChange={handleInputPw}
                onKeyPress={handleOnKeyPress}
              />
              <label htmlFor="input_pw">Password :</label>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4 py-2"
                onClick={onClickLogin}
              >
                Login
              </button>
            </div>
            <hr className="my-4" />
            <div className="text-center">
              <span className="text-muted">Don't have an account?</span>
              <a href="/registration" className="ms-1">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test;
