import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import CreateBattle from "./Pages/Battle/CreateBattle";
import Header from "./Components/Header/Header";
import Test from "./Test";

import Champions from "./Pages/Champion/Champions";

import Dashboard from "./Pages/Admin/Dashboard";
import CreateSkill from "./Pages/Admin/CreateSkill";
import CreateChampion from "./Pages/Admin/CreateChampion";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />

        <Route path="/create/battle" element={<CreateBattle />} />
        
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/create/skill" element={<CreateSkill />} />
        <Route path="/admin/create/champion" element={<CreateChampion />} />
        <Route path="/champions" element={<Champions />} />
      </Routes>
    </Router>
  );
}

export default App;
