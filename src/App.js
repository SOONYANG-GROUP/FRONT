import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

import CreateProject from "./Pages/Project/CreateProject";
import Projects from "./Pages/Project/Projects";
import Project from "./Pages/Project/Project";

import CreateRoadmap from "./Pages/Roadmap/CreateRoadmap";
import Roadmaps from "./Pages/Roadmap/Roadmaps";
import Roadmap from "./Pages/Roadmap/Roadmap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project/>} />
        <Route path="/create/project" element={<CreateProject/>} />
        <Route path="/roadmaps" element={<Roadmaps/>} />
        <Route path="/roadmap/:id" element={<Roadmap/>} />
        <Route path="/create/roadmap" element={<CreateRoadmap/>} />
      </Routes>
    </Router>
  );
}

export default App;
