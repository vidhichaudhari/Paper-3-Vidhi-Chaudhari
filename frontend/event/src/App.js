import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login"; 
import Verifyemail from "./pages/Auth/Verify-email";
import EventList from "./pages/EventList";
import Signup from "./pages/Auth/signup";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<Verifyemail />} />
        <Route path="/events" element={<EventList />} />
      </Routes>
    </Router>
  );
};

export default App;