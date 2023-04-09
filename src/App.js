import "./App.css";
import "animate.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

import Profile from "./Pages/Profile/Profile";
import AptitudeTest from "./Pages/AptitudeTest/AptitudeTest";
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

import { useEffect, useState } from "react";

import JWTest from "./Pages/JWTest";
import EditProfile from "./Pages/Profile/EditProfile";
import RegistrationPage from "./Pages/Regist/Registration";

import VideoTest from "./Pages/VideoTest";
import UpdateProjectsStatus from "./Pages/UpdateProjectsStatus";
import { BACK_URL } from "./Components/Constants/URL";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [alarmCount, setAlarmCount] = useState(0);
  useEffect(() => {
    console.log("로그인이 되어 있는지 확인합니다.");
    setIsLoading(true);
    const fetch = () => {
      if (sessionStorage.getItem("refreshToken")) {
        setIsLoggedIn(true);
        console.log("로그인 되어 있습니다.");
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        console.log("로그인이 필요합니다.");
        sessionStorage.clear();
        setIsLoading(false);
      }
    };
    fetch();
    requestAlarm();
  }, [isLoggedIn]);

  const requestAlarm = () => {
    if (isLoggedIn) {
      try {
        axios.get(`${BACK_URL}/users/alarm/count`).then((res) => {
          setAlarmCount(res.data);
          console.log(res);
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  };

  axios.interceptors.request.use(
    async (config) => {
      const accessToken = await window.sessionStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = await accessToken;
      }
      return config;
    },
    (error) => {
      console.log("interceptor.request.error");

      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async (response) => {
      // console.log("interceptor.response.response");
      return response;
    }, // 응답이 성공적인 경우 아무것도 하지 않음
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        console.log(config);
        const originalRequest = config;

        const refreshToken = await sessionStorage.getItem("refreshToken");
        const { data } = await axios
          .post(
            `${BACK_URL}/jwt-test`,
            {},
            {
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorizationrefresh: refreshToken,
              },
            }
          )
          .then((res) => {
            return res;
          })
          .catch((e) => {
            console.dir(e);
            sessionStorage.clear();
            return e;
          });

        console.log(data);
        await sessionStorage.setItem(
          "accessToken",
          `Bearer ${data.accessToken}`
        );
        await sessionStorage.setItem(
          "refreshToken",
          `Bearer ${data.refreshToken}`
        );

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorizationrefresh = `Bearer ${data.refreshToken}`;

        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  if (isLoggedIn === null) {
    return <>로그인 확인중입니당</>;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} alarmCount={alarmCount} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/projects"
          element={<Projects isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/project/:id"
          element={<Project isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/create/project"
          element={<CreateProject isLoggedIn={isLoggedIn} />}
        />
        <Route path="/create/" />
        <Route
          path="/roadmaps"
          element={<Roadmaps isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/roadmap/:id"
          element={<Roadmap isLoggedIn={isLoggedIn} />}
        />
        <Route path="/skill/:id" element={<Skill isLoggedIn={isLoggedIn} />} />
        <Route
          path="/create/roadmap"
          element={<CreateRoadmap isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/create/skill"
          element={<CreateSkill isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/users/profile/:id"
          element={<Profile isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/users/profile/"
          element={<Profile isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/edit/skill/:id"
          element={<EditSkill isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/edit/roadmap/:id"
          element={<EditRoadmap isLoggedIn={isLoggedIn} />}
        />

        <Route path="/test" element={<Test isLoggedIn={isLoggedIn} />} />
        <Route path="/test2" element={<Test2 isLoggedIn={isLoggedIn} />} />
        <Route path="/test1" element={<Test1 isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route
          path="/aptitudeTest"
          element={<AptitudeTest isLoggedIn={isLoggedIn} />}
        />
        <Route path="/jwtest" element={<JWTest />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/updateprojectsstatus"
          element={<UpdateProjectsStatus />}
        />

        <Route path="/video/test/:id" element={<VideoTest />} />
      </Routes>
    </Router>
  );
}

export default App;
