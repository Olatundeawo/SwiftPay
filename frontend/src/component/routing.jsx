import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./user";
import Login from "./login";

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
