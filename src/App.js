import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Switch } from "react-router-dom"
import Navbar from "./components/Navbar.js";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
import UserUpdate from "./components/UserUpdate";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Users /> */}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route exact path="/create" element={<UserCreate />} />
        <Route exact path="/update/:id" element={<UserUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
