import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/EventApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showManage, setShowManage] = useState(false);
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (showManage) {
      API.get("/events")
        .then((res) => setEvents(res.data.events))
        .catch((err) => console.log(err));
    }
  }, [showManage]);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    API.put(`/events/${selectedEvent._id}`, selectedEvent)
      .then(() => {
        alert("Event Updated Successfully");
        setEditMode(false);
        setShowManage(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li onClick={() => { setShowManage(false); setEditMode(false); }}>Dashboard</li>
          <li onClick={() => navigate("/add-event")}>Add Event</li>
          <li onClick={() => { setShowManage(true); setEditMode(false); }}>Manage Events</li>
          <li onClick={() => navigate("/events")}>View Events</li>
          <li
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h2>Welcome Admin</h2>
        </header>

        {!showManage && !editMode && (
          <div className="content-area">
            <h3>Dashboard Overview</h3>
            <p>Select "Manage Events" to view or update events</p>
          </div>
        )}

       
        {showManage && !editMode && (
          <div className="content-area">
            <h3>Manage Events</h3>

            <table className="events-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Seats</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id}>
                    <td>{ev.title}</td>
                    <td>{new Date(ev.date).toLocaleDateString()}</td>
                    <td>{ev.category}</td>
                    <td>{ev.price}</td>
                    <td>{ev.seats}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(ev)}>Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {editMode && (
          <div className="content-area">
            <h3>Edit Event</h3>

            <input type="text" name="title" value={selectedEvent.title} onChange={handleChange} />
            <input type="date" name="date" value={selectedEvent.date} onChange={handleChange} />
            <input type="text" name="category" value={selectedEvent.category} onChange={handleChange} />
            <input type="number" name="price" value={selectedEvent.price} onChange={handleChange} />
            <input type="number" name="seats" value={selectedEvent.seats} onChange={handleChange} />

            <button onClick={handleUpdate}>Update Event</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
