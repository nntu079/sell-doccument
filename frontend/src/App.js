import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Exam from './Pages/Upload/exam';
import Detail from './Pages/Detail';

import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/upload-exam" element={<Exam />} />
          <Route exact path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
