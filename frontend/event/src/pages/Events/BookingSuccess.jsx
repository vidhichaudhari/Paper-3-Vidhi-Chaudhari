import React from "react";

const BookingSuccess = () => {
  return (
    <div className="page-container">
      <div className="booking-success-container">
        <div className="booking-success-box">
          <h2 className="success-title">🎉 Booking Successful!</h2>
          <p className="success-text">Your seat has been confirmed.</p>

          <a href="/dashboard" className="success-btn">
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
