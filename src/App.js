import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Profile from "./Pages/Profile/Profile";
import Home from './Pages/Home';
import Roadmap from './Pages/Roadmap/Roadmap';
import Roadmaps from './Pages/Roadmap/Roadmaps';

import BuildProject from './Pages/Project/BuildProject';
import Project from './Pages/Project/Project';
import Projects from './Pages/Project/Projects';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/build/project" element={<BuildProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/project' element={<Project />} />
        </Routes>
      </Router>
  );
}

export default App;
