import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./user";
import Login from "./login";
import LandingPage from "./landingPage";
import User from "./userDashboard";
import Merchant from "./merchantDashboar";
import About from "./about";

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
