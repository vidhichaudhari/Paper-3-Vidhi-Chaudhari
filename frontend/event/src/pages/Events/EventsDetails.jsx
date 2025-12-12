import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../Api/EventApi";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.log(err));
  }, [id]);

  const handleBookNow = () => {
    
    const user = localStorage.getItem("token");

    if (!user) {
      navigate("/login", { state: { redirectTo: `/book-event/${id}` } });
    } else {
      navigate(`/book-event/${id}`, { state: { event } });
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="page-container event-details-page">
      <div style={{ 
        padding: "20px", 
        width: "350px", 
        textAlign: "center", 
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>

        <img
          src={`/uploads/${event.image}`}
          alt="Event"
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "8px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleBookNow}
          style={{
            padding: "14px",
            width: "100%",
            background: "blue",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
