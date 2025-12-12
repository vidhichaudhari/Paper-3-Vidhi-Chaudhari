import React from "react";
import Header from "../components/Header";


const Home = () => {
  return (
    <>
      <Header />

      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/uploads/bg.jpg"})`
        }}
      >
        <div>
          <h1>Welcome to Event Booking Website</h1>
          <br/>
          <p>Explore and book your favourite events.</p>
        </div>
        
      </div>

    </>
  );
};

export default Home;
