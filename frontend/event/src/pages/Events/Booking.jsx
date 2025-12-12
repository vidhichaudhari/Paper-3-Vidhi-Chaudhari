import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {};

  const handleBooking = () => {
    navigate("/booking-success");
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">Booking Page</h2>

      <p className="event-detail">Event Title: {event?.title}</p>
      <p className="event-detail">Description: {event?.description}</p>

      <button onClick={handleBooking} className="confirm-btn">
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
