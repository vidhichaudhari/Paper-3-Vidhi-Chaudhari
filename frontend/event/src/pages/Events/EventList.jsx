import React, { useEffect, useState } from "react";
import API from "../../Api/EventApi";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
useEffect(() => {
  API.get("/events")
  .then((res) => setEvents(res.data.events))
  .catch((err) => console.log(err));
}, []);
  const goToDetails = (id) => {
    navigate(`/event/${id}`);
  };

  return (

  <div className="page  all-events-container">
    <h2 className="title">All Events</h2>

    {events.length === 0 ? (
      <p>No events available</p>
    ) : (
      <div className="events-grid">
        {events.map((e) => (
          <div className="event-card" key={e._id}>
            
            <img 
              src={`/uploads/${e.image}`} 
              alt="Event" 
              className="event-img" 
            />

            <h3 className="event-title">{e.title}</h3>
            <p className="event-desc">{e.description.substring(0, 60)}...</p>

            <button 
              onClick={() => goToDetails(e._id)} 
              className="view-btn"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
};


export default EventList;
