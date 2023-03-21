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

function App() {
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
