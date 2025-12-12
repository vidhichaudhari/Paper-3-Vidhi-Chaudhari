import React from "react";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", padding: "20px", marginTop: "40px", background: "#f2f2f2" }}>
      © {new Date().getFullYear()} Event Booking App
    </footer>
  );
};

export default Footer;
