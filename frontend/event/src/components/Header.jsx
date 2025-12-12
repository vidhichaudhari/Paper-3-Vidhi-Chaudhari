import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <h2>Event Booking</h2>
      </div>

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
