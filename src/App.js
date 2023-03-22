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
import TestNode from "./TestNode";

function App() {
  axios.interceptors.request.use(
    async (config) => {
      console.log(config);
      const accessToken = await window.sessionStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = await accessToken;
        console.log(config);
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async (response) => {
      return response;
    }, // 응답이 성공적인 경우 아무것도 하지 않음
    async (error) => {
      console.log(error);
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        console.log("401");
        const originalRequest = config;

        const refreshToken = await sessionStorage.getItem("refreshToken");
        console.log(`refreshToken : ${refreshToken}`);
        const { data } = await axios
          .post(
            "http://localhost:8080/jwt-test",
            {},
            {
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorizationrefresh: refreshToken,
              },
            }
          )
          .then((res) => {
            console.log(res.config.headers.Authorization);
            console.log(res.config.headers[0]);
          })
          .catch((e) => {
            console.log(e);
          });
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        sessionStorage.setItem("accessToken", data.data.accessToken);
        originalRequest.headers.Authorization = `${data.data.accessToken}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

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
        <Route path="/testnode" element={<TestNode />} />
      </Routes>
    </Router>
  );
}

export default App;
