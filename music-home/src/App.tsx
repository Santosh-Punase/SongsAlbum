import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import './App.css'
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="mh-app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorised" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
