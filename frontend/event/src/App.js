import React from "react";
import"./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login"; 
import Verifyemail from "./pages/Auth/Verify-email";
import EventList from "./pages/Events/EventList";
import Signup from "./pages/Auth/signup";
import EventDetails from "./pages/Events/EventsDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddEvents from "./pages/Dashboard/AddEvents";
import Booking from "./pages/Events/Booking";
import BookingSuccess from "./pages/Events/BookingSuccess";




const App = () => {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<Verifyemail />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id"  element={<EventDetails />} />
        <Route path="/add-event" element={<AddEvents />} />
        <Route path="/book-event/:id" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;