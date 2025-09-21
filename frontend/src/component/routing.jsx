import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./user";
import Login from "./login";
import LandingPage from "./landingPage";
import User from "./userDashboard";
import Merchant from "./merchantDashboar";

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
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
