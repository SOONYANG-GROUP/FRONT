import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

import Profile from "./Pages/Profile/Profile";

import CreateProject from "./Pages/Project/CreateProject";
import Projects from "./Pages/Project/Projects";
import Project from "./Pages/Project/Project";

import CreateRoadmap from "./Pages/Roadmap/CreateRoadmap";
import CreateSkill from "./Pages/Roadmap/CreateSkill";
import Roadmaps from "./Pages/Roadmap/Roadmaps";
import Roadmap from "./Pages/Roadmap/Roadmap";
import Header from "./Layout/Header";
import Test2 from "./Test2";
import Test from "./Test";
import Skill from "./Pages/Roadmap/Skill";
import Login from "./Pages/Login";

import EditRoadmap from "./Pages/Roadmap/EditRoadmap";
import EditSkill from "./Pages/Roadmap/EditSkill";

import Test1 from "./Test1";

import axios from "axios";
import { useEffect } from "react";



function App() {

  

  // It's Okay to activate this section when Get request started
  axios.interceptors.request.use(
    async(config) => {
      const accessToken = await window.sessionStorage.getItem("accessToken");
      if(accessToken)
      {
        // There is an access token in session storage.
        config.headers["Authorization"] = await accessToken;
      }
      return config;
    },
    (error) => {
      console.log(`Promise Reject In Request: ${error}`);
      return Promise.reject(error)
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status }
      } = error;

      if(status === 401)
      {
        const originalRequest = config;
        const refreshToken = await sessionStorage.getItem("refreshToken");
        const { data } = await axios.post(
          "http://localhost:5000", {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization-refresh": refreshToken
            }
          }
        );
        sessionStorage.setItem("accessToken", data.data.accessToken);
        originalRequest.headers.Authorization = `${data.data.accessToken}`
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  )

  useEffect(() => {

  }, []);

  //const GetResponseWhenPostRefreshToken = async () => {
  //  let data = null;
  //  let headers = {
  //    "Content-Type": "application/json;charset=utf-8",
  //    "Authorization-refresh": ""
  //  };
//
  //  const refreshToken = sessionStorage.getItem("refreshToken");
  //  if(refreshToken !== "" || refreshToken !== undefined || refreshToken !== null)
  //  {
  //    headers["Authorization-refresh"] = refreshToken;
  //  }
//
  //  await axios.post("http://localhost:5000/", {}, {headers: headers})
  //  .then((res) => {
  //    console.log(`res in GetResponseWhenPostRefreshToken: ${res}`);
  //  })
  //  .catch((err) => {
  //    console.log(`err in GetResponseWhenPostRefreshToken: ${err}`);
  //  })
  //  return data;
  //}

  /*
  let refreshSubscribing = false;
  console.log("App.js");
  if (!window.sessionStorage.getItem("accessToken")) {
    console.log("로그인이 필요합니다.");
  } else {
    axios.interceptors.request.use(
      async (config) => {
        const accessToken = await window.sessionStorage.getItem("accessToken");
        // console.log(accessToken);

        if (!accessToken) {
          console.log("accessToken이 없습니다.");
          return; <- """"""""""""이부분이 잘못되었습니다.""""""""""""
        } else {
          console.log("accessToken이 있습니다.");
          // console.log(accessToken);
          config.headers["Authorization"] = await accessToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response, // 응답이 성공적인 경우 아무것도 하지 않음
      async (error) => {
        // 액세스 토큰이 만료됐다면
        error.preventDefault();
        console.log("액세스 토큰이 만료됐다면");
        console.log(error);
        if (error.response.status === 401) {
          console.log("401 에러");
          if (!refreshSubscribing) {
            refreshSubscribing = true;
            console.log("refresh true변경");
            const response = await postRefreshToken(); // 액세스토큰 갱신
            console.log("액세스토큰 갱신");

            // 갱신된 accessToken을 받으면
            if (response) {
              window.sessionStorage.setItem(
                "accessToken",
                response.accessToken
              ); // 새로운 토큰 sessionStorage 저장
              window.sessionStorage.setItem(
                "refreshToken",
                response.refreshToken
              );
              refreshSubscribing = false;
              console.log("refreshtoken false로 변경");
              error.config.headers["Authorization"] = response; // 원래 api 요청의 headers의 accessToken도 변경
              const originalResponse = axios.request(error.config); // 원래 api 요청하기
              return originalResponse; // 원래 api 요청의 response return
            }
            // 리프레시 토큰도 만료됐으면 로그인 페이지로 이동
            else {
              // window.sessionStorage.clear();
              // window.location.href = "/login";
            }
          }
        }

        return Promise.reject(error);
      }
    );

    async function postRefreshToken() {
      try {
        // 리프레쉬 토큰을 이용해 액세스 토큰을 갱신
        const refreshToken = window.sessionStorage.getItem("refreshToken");
        const headers = {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization-refresh": refreshToken,
        };
        console.log("리프레쉬 토큰을 이용해 액세스 토큰을 갱신");

        const { data } = await axios.post(
          `http://localhost:8080/jwt-test`,
          {},
          {
            headers: headers,
          }
        );

        // 서버로부터 받은 데이터
        if (data.flag === "success") {
          console.log("서버로부터 받은 데이터 success");
          return data.data[0];
        } else if (data.flag === "fail") {
          console.log("서버로부터 받은 데이터 false");
          return false; => null;
        } else {
          return false; => null;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  */


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/create/project" element={<CreateProject />} />
        <Route path="/create/" />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmap/:id" element={<Roadmap />} />
        <Route path="/skill/:id" element={<Skill />} />
        <Route path="/create/roadmap" element={<CreateRoadmap />} />
        <Route path="/create/skill" element={<CreateSkill />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit/skill/:id" element={<EditSkill />} />
        <Route path="/edit/roadmap/:id" element={<EditRoadmap />} />

        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
