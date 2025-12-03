import React, { useEffect, useState } from "react";
import API from "../Api/EventApi";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get(`/events`, {
          params: { search, category, sort },
        });
        setEvents(res.data.events);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, [search, category, sort]);

  return (
    <div className="event-container">
      <h2>All Events</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Conference">Conference</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
          <option value="popularity">Sort by Popularity</option>
        </select>
      </div>

      {/* Event Cards */}
      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><b>Date:</b> {event.date?.slice(0, 10)}</p>
            <p><b>Price:</b> ₹{event.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
