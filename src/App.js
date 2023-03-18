import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import CreateBattle from './Pages/Battle/CreateBattle';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path='/create/battle' element={<CreateBattle />} />
          
        </Routes>
      </Router>
  );
}

export default App;
